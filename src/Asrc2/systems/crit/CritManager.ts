import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { DamageType } from "systems/damage/DamageType";
import { ActionOrder } from "../damage/ActionOrder";
import { Random } from "../random/Random";

export class CritManager {

    private critChance: Record<DamageType, number> = {
        [DamageType.Untyped]: 0,
        [DamageType.Crushing]: 0.2,
        [DamageType.Slashing]: 0.35,
        [DamageType.Piercing]: 0.5,
    };

    constructor(
        private damageEventHandler: IDamageEventHandler
    ) {
        damageEventHandler.Subscribe(ActionOrder.CritCalculation, e => {

            const resistances = e.target.resistances;

            let chance = 0;
            let totalDmg = e.amount;
            let critMulti = 1;
            let count = e.types.length;
            
            for (let d of e.types) {
                chance += this.critChance[d];
                totalDmg -= resistances[d];

                if (d == DamageType.Piercing) critMulti += 1;
            }
            chance /= count;
            
            if (Random.real() < chance) {
                e.amount *= critMulti;
                e.isCrit = true;
            }
        });
    }
}