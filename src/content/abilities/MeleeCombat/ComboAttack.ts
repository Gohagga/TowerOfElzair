import { Ability } from "systems/ability/Ability";
import { Unit, Point } from "w3ts/index";

export class ComboAttack extends Ability {
    
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): boolean {
        throw new Error("Method not implemented.");
    }

}