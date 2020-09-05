import { Unit, Point } from "w3ts/index";
import { AbilitySlot } from "./AbilitySlot";
import { AbilityData } from "./Ability";

export interface IAbility extends AbilityData {

    id: number;

    codeId: string;

    slot: AbilitySlot;

    name: string;

    AddToUnit(unit: Unit): boolean;

    RemoveFromUnit(unit: Unit): boolean;

    Execute(caster: Unit, origin: Point, destination: Point, target?: Unit): void;
}