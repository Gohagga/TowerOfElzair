// import { SubstanceEffect, SubstanceContext } from "../base/SubstanceEffect";
// import { FormEffect } from "../base/FormEffect";
// import { DamageType } from "systems/damage/DamageType";
// import { IDamageProvider } from "providers/interfaces/IDamageProvider";
// import { Unit } from "w3ts/index";

// export class UnitDamageEffect extends SubstanceEffect {

//     constructor(
//         private readonly amount: (source: Unit) => number,
//         private readonly type: DamageType,
//         private readonly provider: IDamageProvider
//     ) { super(); }

//     public Resolve(): void {
        
//         print("Resolve damage effect")
//         if (!this.context) return;
//         print("Resolve damage effect")
        
//         this.provider.UnitDamageTarget(this.context.sourceUnit, this.context.focus, this.amount(this.context.sourceUnit), this.type);
//     }
// }