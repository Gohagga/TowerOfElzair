import { Unit, Point } from "w3ts/index";

export interface IAbility {

    id: number;

    name: string;

    AddToUnit(unit: Unit): boolean;

    RemoveFromUnit(unit: Unit): boolean;

    Execute(caster: Unit, origin: Point, destination: Point, target?: Unit): void;
}