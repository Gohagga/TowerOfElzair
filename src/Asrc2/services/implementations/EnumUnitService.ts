import { Point } from "Asrc2/models/Point";
import { Unit } from "Asrc2/models/Unit";
import { IEnumUnitService } from "../interfaces/IEnumUnitService";

export class EnumUnitService implements IEnumUnitService {

    group: group = CreateGroup();
    
    EnumUnitsInRange(origin: Point, radius: number, filter?: (target: Unit, caster?: Unit) => boolean, source?: Unit): Unit[] {
        GroupEnumUnitsInRange(this.group, origin.x, origin.y, radius, null);
        const units: Unit[] = [];
        let u: unit;
        while ((u = FirstOfGroup(this.group)) != null) {
            GroupRemoveUnit(this.group, u);
            let U = Unit.fromHandle(u);
            if (!filter || filter(U, source)) {
                units.push(U);
            }
        }
        return units;
    }

    EnumUnitsInCone(origin: Point, range: number, angle: number, filter?: (target: Unit, caster: Unit) => boolean): Unit[] {
        return [];
    }

    EnumUnitsInLine(origin: Point, destination: Point, width: number, filter?: (target: Unit, caster: Unit) => boolean): Unit[] {
        return [];
    }
}