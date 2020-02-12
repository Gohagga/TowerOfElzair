import { SpellEvent } from "Global/SpellEvent";
import { SpellHelper, SpellGroup } from "Global/SpellHelper";
import { Abilities } from "customConfig";
import { TriggeredMissile } from "Global/TriggeredMissile";

export class MagicBurst {
    static spell = Abilities.MagicBurst;
    static auraId: number;
    static buffId: number;

    public static Filter(target: unit, owner: player) {
        return (IsUnitType(target, UNIT_TYPE_STRUCTURE) == false) && 
                (IsUnitAlly(target, owner) == false) &&
                (GetWidgetLife(target) > 0.405);
    }

    static init() {
        
        SpellEvent.RegisterSpellEffect(this.spell.Id, () => {

            const target = GetSpellTargetUnit();
            const caster = GetTriggerUnit();
            const owner = GetOwningPlayer(caster);
            const level = GetUnitAbilityLevel(caster, this.spell.Id);
            const radius = 300;

            GroupEnumUnitsInRange(SpellGroup, GetUnitX(caster), GetUnitY(caster), radius, null);

            let u: unit;
            while ((u = FirstOfGroup(SpellGroup)) != null) {
                GroupRemoveUnit(SpellGroup, u);
                if (this.Filter(u, owner)) {
                    UnitDamageTarget(caster, u, GetHeroInt(caster, true), false, false,
                        ATTACK_TYPE_NORMAL, DAMAGE_TYPE_MAGIC, WEAPON_TYPE_WHOKNOWS);
                }
            }
        });
    }
}