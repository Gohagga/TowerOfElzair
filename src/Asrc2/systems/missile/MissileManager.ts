import { Unit } from "Asrc2/models/Unit";
import { Missile } from "./Missile";
import { MissileType } from "./MissileType";

export class MissileManager {

    private instances: Record<number, MissileType> = {};

    constructor() {
        
    }

    GetType(unit: Unit): MissileType {
        return this.instances[unit.id] || MissileType.None;
    }
}