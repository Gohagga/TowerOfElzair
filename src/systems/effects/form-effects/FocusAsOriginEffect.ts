// import { FormEffect, FormContext } from "../base/FormEffect";
// import { SubstanceContext } from "../base/SubstanceEffect";

// export class FocusAsOriginEffect extends FormEffect {
    
//     public Resolve(): void {

//         print(FocusAsOriginEffect.name, 1)
        
//         if (!this.context) return;
        
//         print(FocusAsOriginEffect.name, 2)

//         const context: FormContext | SubstanceContext = {
//             origin: this.context.focus.point,
//             destination: this.context.destination,
//             sourceUnit: this.context.sourceUnit,
//             targetUnit: this.context.targetUnit,
//             focus: this.context.focus
//         }

//         print(FocusAsOriginEffect.name, 3)
//         this.ResolveChildren(context)
//     }
// }