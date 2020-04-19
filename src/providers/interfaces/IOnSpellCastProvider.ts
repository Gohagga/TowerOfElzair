import { Unit, Point } from "w3ts";

export interface IOnSpellCastProvider {

    GetCaster(): Unit;

    GetTargetUnit(): Unit;

    GetTargetPoint(): Point;

    GetAbilityId(): number;

    GetAbilityLevel(): number;
}