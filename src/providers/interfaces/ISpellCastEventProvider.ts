import { Unit, Point } from "w3ts";

export interface ISpellCastEventProvider {

    GetCaster(): Unit;

    GetTargetUnit(): Unit;

    GetTargetPoint(): Point;

    GetAbilityId(): number;

    GetAbilityLevel(): number;
}