import { Unit } from "Asrc2/models/Unit";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { DamageType } from "Asrc2/systems/damage/DamageType";

export interface IDamageService {

    UnitDamageTarget(source: Unit, target: Unit, amount: number, attackType: AttackType, types: DamageType): void;

    UnitHealTarget(source: Unit, target: Unit, amount: number, attackType: AttackType, types: DamageType): void;

    UnitCauseStrain(source: Unit, target: Unit, amount: number, attackType: AttackType): void;
}