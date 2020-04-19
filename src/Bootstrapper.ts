import { AoeForkEffect } from "components/effects/form-effects/AoeForkEffect";
import { CasterAsFocusEffect } from "components/effects/form-effects/CasterEffect";
import { FocusAsOriginEffect } from "components/effects/form-effects/FocusAsOriginEffect";
import { ProjectileEffect } from "components/effects/form-effects/ProjectileEffect";
import { DummyCastEffect } from "components/effects/substance-effects/DummyCastEffect";
import { UnitTargetEffect } from "components/effects/target-effects/UnitTargetEffect";
import ILogger from "components/logger/ILogger";
import { Logger } from "components/logger/Logger";
import { Config } from "Config";
import { DamagedEventProvider } from "providers/implementations/DamagedEventProvider";
import { DamageProvider } from "providers/implementations/DamageProvider";
import DummySpellProvider from "providers/implementations/DummySpellProvider";
import { EnumUnitProvider } from "providers/implementations/EnumUnitProvider";
import { EventSpellCastProvider } from "providers/implementations/EventSpellCastProvider";
import { InstancedDummySpellProvider } from "providers/implementations/InstancedDummySpellProvider";
import { TargetProjectileProvider } from "providers/implementations/TargetProjectileProvider";
import { Unit } from "w3ts/index";

export class Bootstrapper {

    public static registerComponents() {
        
        const config = new Config();
        const logger: ILogger = new Logger(config);
        
        logger.info("START");
        const damager = new DamageProvider();
        const dmgEvent = new DamagedEventProvider();
        const spellEvent = new EventSpellCastProvider();
        const unitEnum = new EnumUnitProvider();
        const banishDummy = new DummySpellProvider(config, "banish", FourCC('A000'));
        const fbDummy = new InstancedDummySpellProvider(config, "acidbomb", FourCC('A001'));
        const fbProjectile = new TargetProjectileProvider(fbDummy, dmgEvent, logger);

        
        const fireball = new UnitTargetEffect(spellEvent)
            .Add(new AoeForkEffect(unitEnum, 400.0, (t, c) => true)
                .Add(new ProjectileEffect(fbProjectile, logger)
                    .Add(new DummyCastEffect(banishDummy))
                    .Add(new FocusAsOriginEffect()
                        .Add(new CasterAsFocusEffect()
                            .Add(new ProjectileEffect(fbProjectile, logger))))));

        let t = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(t, EVENT_PLAYER_UNIT_SPELL_EFFECT);
        TriggerAddAction(t, () => {

            if (GetSpellAbilityId() == FourCC('A002') && GetUnitTypeId(GetTriggerUnit()) != config.dummyUnitId)
                fireball.Resolve();
        });

        const u = Unit.fromHandle(gg_unit_Hblm_0003);
        u.addAbility(FourCC('A001'));

        // BlzGetUnitAbility( gg_unit_Hblm_0003
        const ab = u.getAbility(FourCC('A001'));

        const t1 = CreateTrigger();
        TriggerRegisterAnyUnitEventBJ(t1, EVENT_PLAYER_UNIT_DAMAGED);
        TriggerAddAction(t1, () => {
            
            let damage = GetEventDamage();
            const source = GetEventDamageSource();
            const target = BlzGetEventDamageTarget();
            const attackType = BlzGetEventAttackType();

            const owner = GetOwningPlayer(source);
            let size = (damage / 60) * 3 + 8;

            let rgb = [ 100, 100, 100 ];
            if (attackType == ATTACK_TYPE_MELEE) rgb = [ 100, 75, 50 ];
            else if (attackType == ATTACK_TYPE_MAGIC) rgb = [ 40, 70, 100 ];

            // let dString = math.floor(damage).toString();
            // CreateTextTagUnitBJ(dString, target, 50.00, size, rgb[0], rgb[1], rgb[2], 0)
            let ang = math.random(45, 135) * bj_DEGTORAD;
            let dx = 0.086203125 * math.cos(ang);
            let dy = 0.086203125 * math.sin(ang);
            if (owner == GetLocalPlayer()) {
                let tt = CreateTextTagUnitBJ(damage.toString(), target, 35, size, rgb[0], rgb[1], rgb[2], 0)
                SetTextTagVelocity(tt, dx, dy)
                // SetTextTagLifespan(bj_lastCreatedTextTag, 2.5)
                SetTextTagLifespan(tt, 0.6)
                SetTextTagPermanent(tt, false)
                SetTextTagFadepoint(tt, 0.4)
            }
        });
    }
}