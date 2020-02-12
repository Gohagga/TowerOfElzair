import { SpellEvent } from "Global/SpellEvent";
import { SpellHelper } from "Global/SpellHelper";
import { Abilities } from "customConfig";
import { TriggeredMissile } from "Global/TriggeredMissile";

export class IceBolt {
    static spell = Abilities.IceBolt;
    static auraId: number;
    static buffId: number;
    static dummySpell = Abilities.ProjectileIceBolt;
    static buffSpell = Abilities.DummyFrostNova;

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
}