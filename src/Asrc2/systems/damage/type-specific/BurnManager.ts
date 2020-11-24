import { Unit } from "Asrc2/models/Unit";

export type Burn = {
}

export class BurnManager {

    private readonly instances: Record<number, Record<number, Burn>> = {};

    constructor() {
        
    }

    ApplyBurn(caster: Unit, target: Unit) {

        const casterId = caster.id;
        const targetId = target.id;

        let burns: Record<number, Burn>;

        if (casterId in this.instances == false) {
            this.instances[casterId] = burns = {};
        } else {
            burns = this.instances[casterId];
        }

        let burn: Burn;

        if (targetId in burns) {
            burn = burns[targetId];
        } else {
            burns[targetId] = burn = {};
        }

        // Do stuff with Burn
        // Stuff
    }
}