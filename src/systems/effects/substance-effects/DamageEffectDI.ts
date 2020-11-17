// import { SubstanceEffect, SubstanceContext } from "../base/SubstanceEffect";
// import { FormEffect } from "../base/FormEffect";
// import { IDamageProvider } from "providers/interfaces/IDamageProvider";
// import { DamageType } from "systems/damage/DamageType";

// export class DamageEffect extends SubstanceEffect {

//     private readonly provider: IDamageProvider;

//     constructor(svc: {
//         DamageProvider: IDamageProvider
//     },
//         private readonly amount: number,
//         private readonly type: DamageType,
//     ) {
//         super();
//         this.provider = svc.DamageProvider;
//     }

//     public Resolve(): void {
        
//         if (!this.context) return;
        
//         this.provider.UnitDamageTarget(this.context.sourceUnit, this.context.focus, this.amount, this.type);
//     }
// }