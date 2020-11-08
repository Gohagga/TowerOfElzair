import { IAbilityEventHandler } from "events/ability/IAbilityEventHandler";
import { IDamageProvider } from "providers/interfaces/IDamageProvider";
import { AbilityData } from "systems/ability/Ability";
import { SimpleAbility } from "systems/ability/SimpleAbility";
import { DamageType } from "systems/damage/DamageType";
import { Unit, Point } from "w3ts/index";
import { TargetDamageAbility } from "../general/TargetDamageAbility";

export class Swing extends SimpleAbility {
    
    damage: IDamageProvider;

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