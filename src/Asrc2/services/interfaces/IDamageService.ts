import { Unit } from "Asrc2/models/Unit";
import { DamageType } from "Asrc2/systems/damage/DamageType";

export interface IDamageService {

    UnitDamageTarget(source: Unit, target: Unit, amount: number, types: DamageType[]): void;

    UnitHealTarget(source: Unit, target: Unit, amount: number, types: DamageType[]): void;
}