import { SpellEvent } from "Global/SpellEvent";
import { SpellHelper } from "Global/SpellHelper";
import { TriggeredMissile } from "Global/TriggeredMissile";
import { DelayFunction } from "Global/DelayFunction";
import { UnitConfigurable } from "Libs/UnitConfigurable";
import { Abilities } from "customConfig";

export type MagicMissilesConfig = {
    Damage: number,
    MissileCount: number,
    BaseCooldown: number,
    ManaCost: number,
    CooldownRed: number,
}

export class MagicMissiles extends UnitConfigurable {
    static spell = Abilities.MagicMissiles;
    static auraId: number;
    static buffId: number;
    static dummySpell = Abilities.ProjectileMagicMissiles;
    static dummyOrder = "shadowstrike";

    private static DefaultConfig: MagicMissilesConfig = {
        Damage: 0.70,
        MissileCount: 2,
        BaseCooldown: 6.5,
        ManaCost: 20,
        CooldownRed: 0,
    }

    static init() {
        this.SetDefaultConfig<MagicMissilesConfig>(this.DefaultConfig);
        SpellEvent.RegisterSpellEffect(this.spell.Id, () => {

            const target = GetSpellTargetUnit();
            const caster = GetTriggerUnit();
            const data = this.GetUnitConfig<MagicMissilesConfig>(caster);
            const owner = GetOwningPlayer(caster);
            const level = GetUnitAbilityLevel(caster, this.spell.Id);

            let df = DelayFunction.SmoothRun(0.2, () => {
                let m = new TriggeredMissile(caster, this.dummySpell.Id, 1);
                m.CastAtTargetAndDo(target, this.dummyOrder, () => {
                    UnitDamageTarget(caster, target, GetHeroInt(caster, true) * 0.7, false, false,
                        ATTACK_TYPE_NORMAL, DAMAGE_TYPE_MAGIC, WEAPON_TYPE_WHOKNOWS);
                });
            })
            for (let i = 1; i < data.MissileCount; i++) {
                df = df.Then(0.2, () => {
                    let m = new TriggeredMissile(caster, this.dummySpell.Id, 1);
                    m.CastAtTargetAndDo(target, this.dummyOrder, () => {
                        UnitDamageTarget(caster, target, GetHeroInt(caster, true) * 0.7, false, false,
                            ATTACK_TYPE_NORMAL, DAMAGE_TYPE_MAGIC, WEAPON_TYPE_WHOKNOWS);
                    });
                });
            }
            
        });
    }

    static UpdateUnitAbility(unit: unit) {
        const data = this.GetUnitConfig<MagicMissilesConfig>(unit);
        let mm = BlzGetUnitAbility(unit, this.spell.Id);
        let lvl = GetUnitAbilityLevel(unit, this.spell.Id) - 1;
        const cd = data.BaseCooldown - data.CooldownRed;
        print(cd, "Cd");
        const dmg = string.format("%.2f", data.Damage);;
        
        let tooltip = 
`Launches ${data.MissileCount} arcane bolts that always hit their target.
Each missile deals ${dmg} * |cff7878ffInt|r magic damage.

Cooldown: ${cd}`
        BlzSetUnitAbilityCooldown(unit, this.spell.Id, lvl, cd);
        BlzSetUnitAbilityManaCost(unit, this.spell.Id, lvl, data.ManaCost);
        BlzSetAbilityStringLevelField(mm, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, lvl, tooltip);
    }
}