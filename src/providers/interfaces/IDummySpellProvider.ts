import { Unit } from "w3ts";

export interface IDummySpellProvider {

    CastAt(target: Unit): void;

    CastAtTargets(targets: Unit[]): void;
}

export namespace IDummySpellProvider {
    export interface Config {
        dummyOwningPlayer: number,
        dummyUnitId: number,
        dummyDuration: number,
    }
}
export default IDummySpellProvider;