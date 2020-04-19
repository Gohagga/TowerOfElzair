import { ISpellCastEventProvider } from "../interfaces/ISpellCastEventProvider";
import { Unit, Point } from "w3ts";

export class EventSpellCastProvider implements ISpellCastEventProvider {
    
    GetCaster(): Unit {
        return Unit.fromHandle(GetTriggerUnit());
    }

    GetTargetUnit(): Unit {
        return Unit.fromHandle(GetSpellTargetUnit());
    }

    GetTargetPoint(): Point {
        const target = GetSpellTargetUnit();
        if (target) return new Point(GetUnitX(target), GetUnitY(target));
        return new Point(GetSpellTargetX(), GetSpellTargetY());
    }

    GetAbilityId(): number {
        return GetSpellAbilityId();
    }

    GetAbilityLevel(): number {
        return GetUnitAbilityLevel(GetTriggerUnit(), GetSpellAbilityId());
    }
}