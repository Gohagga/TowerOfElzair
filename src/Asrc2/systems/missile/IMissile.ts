import { Unit } from "Asrc2/models/Unit";
import { MissileType } from "./MissileType";

export interface IMissile {

    id: number;
    Update?: () => void;
    Destroy?: () => void;
    alive: boolean;

    type: MissileType;
    x: number,
    y: number,
    target?: Unit;
}