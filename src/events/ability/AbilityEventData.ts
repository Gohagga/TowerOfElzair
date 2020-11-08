import { Point, Unit } from "w3ts/index";

export class AbilityEventData {

    public get caster(): Unit {
        return Unit.fromEvent();
    }

    public get targetUnit(): Unit {
        return Unit.fromHandle(GetSpellTargetUnit());
    }

    public get targetPoint(): Point {
        const target = GetSpellTargetUnit();
        if (target) return new Point(GetUnitX(target), GetUnitY(target));
        return new Point(GetSpellTargetX(), GetSpellTargetY());
    }

    public get abilityId(): number {
        return GetSpellAbilityId();
    }

    public get abilityLevel(): number {
        return GetUnitAbilityLevel(GetTriggerUnit(), GetSpellAbilityId());
    }
}