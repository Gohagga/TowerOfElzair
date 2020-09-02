import { IAbility } from "systems/ability/IAbility";
import { Unit, Point } from "w3ts/index";
import { AbilityData, Ability } from "systems/ability/Ability";
import { IEventUnitUsedAbilityHandler, EventAbility } from "event-handlers/interfaces/IEventUnitUsedAbilityHandler";
import { IDamageProvider } from "providers/interfaces/IDamageProvider";
import { DamageType } from "systems/damage/DamageType";

export class Bash extends Ability {

    private damage: IDamageProvider;

    constructor(svc: {
        SpellEvent: IEventUnitUsedAbilityHandler,
        DamageProvider: IDamageProvider,
    },  data: AbilityData) {
        super(svc, data);
        this.damage = svc.DamageProvider;
    }
    
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): void {
        this.damage.UnitDamageTarget(caster, target, 50.0, DamageType.Blunt);
    }
}