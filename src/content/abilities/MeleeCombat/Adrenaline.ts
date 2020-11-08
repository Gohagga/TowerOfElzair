import { Ability } from "systems/ability/Ability";
import { Unit, Point } from "w3ts/index";

export class Adrenaline extends Ability {
    
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): boolean {
        throw new Error("Method not implemented.");
    }

}