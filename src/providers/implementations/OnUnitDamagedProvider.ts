import { IOnDamageProvider } from "providers/interfaces/IOnDamageProvider";
import { Trigger, Unit } from "w3ts/index";
import { damageTypes, attackTypes } from "./DamageProvider";
import { DamageType } from "systems/damage/DamageType";

export class OnUnitDamagedProvider implements IOnDamageProvider {

    constructor() { }
    
    Register(action: () => void): Trigger {
        const t = new Trigger();
        t.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DAMAGED);
        t.addAction(() => action());
        return t;
    }

    GetSourceUnit(): Unit {
        return Unit.fromHandle(GetEventDamageSource());
    }

    GetTargetUnit(): Unit {
        return Unit.fromHandle(BlzGetEventDamageTarget());
    }

    GetDamageAmount(): number {
        return GetEventDamage();
    }

    GetDamageType(): DamageType {
        return DamageType.Untyped;
    }

    SetDamageAmount(value: number): void {
        BlzSetEventDamage(value);
    }

    SetDamageType(value: DamageType): void {
        // BlzSetEventAttackType(attackTypes[value]);
        // BlzSetEventDamageType(damageTypes[value]);
    }
}