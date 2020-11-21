import { MissileType } from "./MissileType";

export interface IMissile {

    id: number;
    Update?: () => void;
    Destroy?: () => void;
    alive: boolean;

    type: MissileType;
}