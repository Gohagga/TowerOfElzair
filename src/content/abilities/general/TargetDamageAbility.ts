import { IAbility } from "systems/ability/IAbility";
import { Unit, Point } from "w3ts/index";
import { AbilityData, Ability } from "systems/ability/Ability";
import { IAbilityEventHandler, EventAbility } from "events/ability/IAbilityEventHandler";
import { IDamageProvider } from "providers/interfaces/IDamageProvider";
import { DamageType } from "systems/damage/DamageType";
import { AbilitySlot } from "systems/ability/AbilitySlot";
import { SimpleAbility } from "systems/ability/SimpleAbility";

export class TargetDamageAbility extends SimpleAbility {

    private damage: IDamageProvider;

    constructor(svc: {
        spellEvent: IAbilityEventHandler,
        damageProvider: IDamageProvider,
    },  
        data: AbilityData,
        private damageType: DamageType,
        private amount: (caster: Unit, target: Unit) => number
    ) {
        super(svc, data);
        this.damage = svc.damageProvider;
    }
    
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): boolean {
        this.damage.UnitDamageTarget(caster, target, this.amount(caster, target), this.damageType);
        return true;
    }
}