import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { DamageType } from "systems/damage/DamageType";
import { ActionOrder } from "../damage/ActionOrder";
import { Random } from "../random/Random";

export class CritManager {

    private dmgStats: { type: DamageType, critChance: number, critMulti: number }[] = [
        { type: DamageType.Untyped, critChance: 0, critMulti: 0 },
        { type: DamageType.Bludgeon, critChance: 0.2, critMulti: 0.5 },
        { type: DamageType.Slashing, critChance: 0.35, critMulti: 0.5 },
        { type: DamageType.Piercing, critChance: 0.5, critMulti: 1.5 },
        { type: DamageType.Fire, critChance: 0.0, critMulti: 0.5 },
    ]

    constructor(
        private damageEventHandler: IDamageEventHandler
    ) {
        damageEventHandler.Subscribe(ActionOrder.CritCalculation, e => {

            const resistances = e.targetUnit.resistances;
            let count = 0;
            
            print(1)
            if (e.isCrit == false) {

                print("false")
                let totalDmg = e.damage;
                let chance = 0;
                let critMulti = 1;

                for (let d of this.dmgStats) {
                    
                    print("d", d.type);
                    if ((e.damageType & d.type) == d.type) {
                        print("is d", e.damageType)
                        count++;
                        print(5)
                        let res = resistances[d.type] || 0;
                        chance += d.critChance * (1 - res / e.damage);
                        print(6)
                        totalDmg -= res;
        
                        print(6)
                        critMulti += d.critMulti;
                    }
                }
                print(7)

                chance /= count;
                
                if (Random.real() < chance) {
                    e.damage *= critMulti;
                    e.isCrit = true;
                }
            }
        });
    }
}