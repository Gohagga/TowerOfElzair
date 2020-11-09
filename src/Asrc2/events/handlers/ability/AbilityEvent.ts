import { Point } from "Asrc2/models/Point";
import { Unit } from "Asrc2/models/Unit";

export class AbilityEvent {

    public get caster(): Unit {
        return Unit.fromEvent();
    }

    public get targetUnit(): Unit {
        return Unit.fromHandle(GetSpellTargetUnit());
    }

    public get targetPoint(): Point {
        return Point.fromSpellTarget();
    }

    public get abilityId(): number {
        return GetSpellAbilityId();
    }

    public get abilityLevel(): number {
        return GetUnitAbilityLevel(GetTriggerUnit(), GetSpellAbilityId());
    }
}

export class AbilityFinishEvent extends AbilityEvent {
    public get caster(): Unit { return Unit.fromEvent(); }
    public get targetUnit(): Unit { return Unit.fromHandle(GetSpellTargetUnit()); }
    public get abilityId(): number { return GetSpellAbilityId(); }
    public get abilityLevel(): number { return GetUnitAbilityLevel(GetTriggerUnit(), GetSpellAbilityId()); }
}