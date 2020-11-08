import { SimpleAbility } from "systems/ability/SimpleAbility";
import { Unit, Point } from "w3ts/index";

export class Dash extends SimpleAbility {
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): boolean {
        throw new Error("Method not implemented.");
    }

}