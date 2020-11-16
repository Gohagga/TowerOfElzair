import { Unit } from "Asrc2/models/Unit";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { Log } from "Asrc2/systems/log/Log";
import { ItemDefinition } from "../ItemDefinition";

export class WeaponItemFactory {

    private upgrades: Record<number, number> = {
        [DamageType.Bludgeon]: FourCC('R0W0'),
        [DamageType.Slashing]: FourCC('R0W1'),
        [DamageType.Piercing]: FourCC('R0W2')
    };
    
    constructor() {
        
    }

    private ResetDamageType(unit: Unit) {
        unit.owner.decTechResearched(this.upgrades[DamageType.Bludgeon], 1);
        unit.owner.decTechResearched(this.upgrades[DamageType.Slashing], 1);
        unit.owner.decTechResearched(this.upgrades[DamageType.Piercing], 1);
    }

    // private AppendCallback(actions: (unit: Unit) => void, current?: (this: any, unit: Unit) => void): (this: any, unit: Unit) => void {
    //     if (current) {
    //         let cb = current;
    //         return unit => {
    //             (u: Unit) => actions(unit);
    //             cb(unit);
    //         };
    //     } else {
    //         return (u: Unit) => actions(u);
    //     }
    // }

    public CreateDefinition(def: {
        damageType: DamageType,
        enabledDamageTypes: DamageType[]
    } & ItemDefinition): ItemDefinition {

        // def.OnAcquire = this.AppendCallback(actions, def.OnAcquire);
        // def.OnRelease = this.AppendCallback(actions, def.OnRelease);
        let cbAcq = def.OnAcquire;
        def.OnAcquire = unit => {
            this.ResetDamageType(unit);
            for (let d of def.enabledDamageTypes) {
                if (Number(d) in this.upgrades) unit.owner.addTechResearched(this.upgrades[Number(d)], 1);
                Log.info(Number(d).toString(), unit.owner.getTechCount(this.upgrades[Number(d)], true));
            }
            unit.damageType = def.damageType;
            if (cbAcq) cbAcq(unit);
        }

        let cbRel = def.OnRelease;
        def.OnRelease = unit => {
            this.ResetDamageType(unit);
            if (cbRel) cbRel(unit);
        }

        return def;
    }



            // switch (def.damageType) {
        //     case DamageType.Blunt:
        //     case DamageType.Piercing:
        //     case DamageType.Slashing:
                
        //         break;
        
        //     default:
        //         break;
        // }

}