import { Unit } from "Asrc2/models/Unit";
import { IUnitConfigurable } from "./IUnitConfigurable";

export class UnitConfigurable<T> implements IUnitConfigurable<T>{

    private instances: Record<number, T> = {};

    constructor(
        private defaultValue: () => T
    ) { }

    public GetUnitConfig(unit: Unit): T {
        const id = unit.id;
        if (id in this.instances == false) {
            // return this.instances[id];
        // } else {
            this.instances[id] = this.defaultValue();
        }
        return this.instances[id];
    }

    public UpdateUnitConfig(unit: Unit, cb: (config: T) => void) {
        const id = unit.id;
        let config;
        if (!(id in this.instances)) {
            config = this.defaultValue();// Object.assign({}, this.defaultValue);
        } else {
            config = this.instances[id];
        }
        cb(this.instances[id]);
        this.instances[id] = config;
    }
}