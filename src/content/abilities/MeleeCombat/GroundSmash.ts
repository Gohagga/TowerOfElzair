import { SimpleAbility } from "systems/ability/SimpleAbility";
import { Unit, Point } from "w3ts/index";

export class GroundSmash extends SimpleAbility {
    
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): boolean {
        return true;
    }

}