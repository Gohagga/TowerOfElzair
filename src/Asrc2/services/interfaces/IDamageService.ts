import { Unit } from "Asrc2/models/Unit";
// import { Widget } from "Asrc2/models/Widget";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { DamageType } from "Asrc2/systems/damage/DamageType";

export interface IDamageService {

    UnitDamageTarget(source: Unit, target: Unit, amount: number, attackType: AttackType, types: DamageType, isCrit?: boolean): void;

    UnitHealTarget(source: Unit, target: Unit, amount: number, attackType: AttackType, types: DamageType, isCrit?: boolean): void;

    UnitCauseStrain(source: Unit, target: Unit, amount: number, attackType: AttackType): void;
}