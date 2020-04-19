import { Unit, Point } from "w3ts/index";

export interface ITargetProjectileProvider {

    Register(data: ProjectileData): void;
}

export interface ProjectileData {
    origin: Point,
    source: Unit,
    target: Unit,
    readonly proxy?: Unit,
    callback: () => void
}