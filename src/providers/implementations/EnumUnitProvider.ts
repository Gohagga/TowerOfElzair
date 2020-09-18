import { IEnumUnitProvider } from "providers/interfaces/IEnumUnitProvider";
import { Point, Unit } from "w3ts";

export class EnumUnitProvider implements IEnumUnitProvider {

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