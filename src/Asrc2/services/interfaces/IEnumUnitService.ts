import { Point } from "Asrc2/models/Point";
import { Unit } from "Asrc2/models/Unit";

export interface IEnumUnitService {

    EnumUnitsInRange(origin: Point, radius: number, filter?: (target: Unit, caster?: Unit) => boolean, source?: Unit): Unit[];

    EnumUnitsInCone(origin: Point, range: number, angle: number, filter?: (target: Unit, caster: Unit, source?: Unit) => boolean): Unit[];

    EnumUnitsInLine(origin: Point, destination: Point, width: number, filter?: (target: Unit, caster: Unit, source?: Unit) => boolean): Unit[];
}