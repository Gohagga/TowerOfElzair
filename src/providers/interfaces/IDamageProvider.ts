import { Unit } from "w3ts";
import { DamageType } from "../../systems/damage/DamageType";

export interface IDamageProvider {
    
    UnitDamageTarget(source: Unit, target: Unit, amount: number, type: DamageType): void;

    UnitHealTarget(source: Unit, target: Unit, amount: number, type: DamageType): void;
}