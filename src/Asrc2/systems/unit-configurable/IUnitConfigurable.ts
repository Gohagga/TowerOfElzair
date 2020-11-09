import { Unit } from "Asrc2/models/Unit";

export interface IUnitConfigurable<T> {

    GetUnitConfig(unit: Unit): T;

    UpdateUnitConfig(unit: Unit, cb: (config: T) => void): void;
}