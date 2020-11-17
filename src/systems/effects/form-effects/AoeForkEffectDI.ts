// import { IEnumUnitProvider } from "providers/interfaces/IEnumUnitProvider";
// import { Unit } from "w3ts";
// import { FormContext, FormEffect } from "../base/FormEffect";
// import { SubstanceContext } from "../base/SubstanceEffect";

// /**
//  * FormEffect that provides targets by enumerating units within given radius of destination point.
//  */
// export class AoeForkEffect extends FormEffect {
    
//     private readonly provider: IEnumUnitProvider;

//     /**
//      * @param provider Object that handles enumeration.
//      * @param radius Enumeration radius of the effect.
//      * @param filter Filter which units will be added to targets.
//      */
//     constructor(
//         svc: {
//             EnumUnitProvider: IEnumUnitProvider,
//         },
//         private readonly radius: number,
//         private readonly filter?: (target: Unit, caster?: Unit) => boolean
//     ) {
//         super();
//         this.provider = svc.EnumUnitProvider;
//     }

//     public Resolve(): void {
        
//         print("AoeFork", 1)
//         if (!this.context) return;

//         print("AoeFork", 2, this.radius, this.filter?.toString())
//         let targets = this.provider.EnumUnitsInRange(this.context.destination, this.radius, this.filter);

//         print("AoeFork", 3, "targets", targets.length, this.context.destination.x, this.context.destination.y)
//         for (let t of targets) {
//             const context: FormContext | SubstanceContext = {
//                 origin: this.context.origin,
//                 destination: this.context.destination,
//                 sourceUnit: this.context.sourceUnit,
//                 focus: t
//             }
//             print("AoeFork hit")
//             this.ResolveChildren(context)
//         }
//     }
// }