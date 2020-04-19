import { DamageType } from "components/damage/DamageType";
import { Unit, Trigger } from "w3ts/index";

export interface IOnDamageProvider {

    Register(action: () => void): Trigger;

    GetSourceUnit(): Unit;

    GetTargetUnit(): Unit;

    GetDamageAmount(): number;

    GetDamageType(): DamageType;

    SetDamageAmount(value: number): void;

    SetDamageType(value: DamageType): void;
}

// export interface DamageEventInstance {
//     sourceUnit?: Unit,
//     targetUnit?: Unit,

// }