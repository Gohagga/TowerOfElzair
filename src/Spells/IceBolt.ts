import { SpellEvent } from "Global/SpellEvent";
import { SpellHelper } from "Global/SpellHelper";
import { Abilities } from "customConfig";
import { TriggeredMissile } from "Global/TriggeredMissile";
import { UnitConfigurable } from "Libs/UnitConfigurable";

export type IceBoltConfig = {
    Damage: number,
    BaseCooldown: number,
    CooldownRed: number,
    ManaCost: number,
    /**
     * Specifies in level of dummy ability
     */
    Duration: number
}

export class IceBolt extends UnitConfigurable {
    static spell = Abilities.IceBolt;
    static auraId: number;
    static buffId: number;
    static dummySpell = Abilities.ProjectileIceBolt;
    static buffSpell = Abilities.DummyFrostNova;

    private static DefaultConfig: IceBoltConfig = {
        Damage: 1.5,
        BaseCooldown: 6.5,
        ManaCost: 35,
        CooldownRed: 0,
        Duration: 0
    }

    static init() {
        
        SpellEvent.RegisterSpellEffect(this.spell.Id, () => {

            const target = GetSpellTargetUnit();
            const caster = GetTriggerUnit();
            const owner = GetOwningPlayer(caster);
            const level = GetUnitAbilityLevel(caster, this.spell.Id);

            new TriggeredMissile(caster, this.dummySpell.Id, 1)
                .CastAtTargetAndDo(target, this.dummySpell.Orderon, () => {

                    UnitDamageTarget(caster, target, GetHeroInt(caster, true) * 1.2, false, false,
                        ATTACK_TYPE_NORMAL, DAMAGE_TYPE_MAGIC, WEAPON_TYPE_WHOKNOWS);
                    SpellHelper.DummyCastTarget(owner, GetUnitX(caster), GetUnitY(caster), target,
                        this.buffSpell.Id, level, this.buffSpell.Orderon);
                });
        });
    }

    static UpdateUnitAbility(unit: unit) {
        const data = this.GetUnitConfig<IceBoltConfig>(unit);
        let ab = BlzGetUnitAbility(unit, this.spell.Id);
        let lvl = GetUnitAbilityLevel(unit, this.spell.Id) - 1;
        const cd = data.BaseCooldown - data.CooldownRed;
        const dur = string.format("%.2f", this.buffSpell.Dur[data.Duration]);
        const dmg = string.format("%.2f", data.Damage);;
        
        let tooltip = 
`Pierces the target with a bolt of ice, dealing ${dmg} magic damage and slowing them temporarily for ${dur}

Cooldown: ${cd}.`
        BlzSetUnitAbilityCooldown(unit, this.spell.Id, lvl, cd);
        BlzSetUnitAbilityManaCost(unit, this.spell.Id, lvl, data.ManaCost);
        BlzSetAbilityStringLevelField(ab, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, lvl, tooltip);
    }
}