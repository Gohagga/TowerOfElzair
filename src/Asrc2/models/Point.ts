import { Point as ThPoint } from "w3ts/index";

export class Point extends ThPoint {

    static fromSpellTarget() {
        return Point.fromHandle(GetSpellTargetLoc());
    }
}