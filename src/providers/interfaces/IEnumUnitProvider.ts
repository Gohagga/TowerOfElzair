import { Unit, Point } from "w3ts";

export interface IEnumUnitProvider {

    EnumUnitsInRange(origin: Point, radius: number, filter?: (target: Unit, caster?: Unit) => boolean, source?: Unit): Unit[];

    EnumUnitsInCone(origin: Point, range: number, angle: number, filter?: (target: Unit, caster: Unit, source?: Unit) => boolean): Unit[];

    EnumUnitsInLine(origin: Point, destination: Point, width: number, filter?: (target: Unit, caster: Unit, source?: Unit) => boolean): Unit[];
}