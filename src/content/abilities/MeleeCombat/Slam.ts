import { IAbility } from "systems/ability/IAbility";
import { Unit, Point } from "w3ts/index";
import { AbilityData, Ability } from "systems/ability/Ability";
import { IAbilityEventHandler, EventAbility } from "events/ability/IAbilityEventHandler";
import { IDamageProvider } from "providers/interfaces/IDamageProvider";
import { DamageType } from "systems/damage/DamageType";
import { AbilitySlot } from "systems/ability/AbilitySlot";
import { SimpleAbility } from "systems/ability/SimpleAbility";

export class Bash extends SimpleAbility {

    private damage: IDamageProvider;

    constructor(svc: {
        spellEvent: IAbilityEventHandler,
        damageProvider: IDamageProvider,
    },  data: AbilityData) {
        super(svc, data);
        this.damage = svc.damageProvider;
    }
    
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): boolean {
        const damage = 75;
        this.damage.UnitDamageTarget(caster, target, damage, DamageType.Blunt);
        return true;
    }
}