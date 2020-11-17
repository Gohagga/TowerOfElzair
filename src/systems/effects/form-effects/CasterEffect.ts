// import { FormEffect, FormContext } from "../base/FormEffect";
// import { SubstanceContext } from "../base/SubstanceEffect";

// export class CasterAsFocusEffect extends FormEffect {
    
//     constructor() {
//         super();
//     }

//     public Resolve(): void {
        
//         print(CasterAsFocusEffect.name, 1)
//         if (!this.context || !this.context.sourceUnit) return;
//         print(CasterAsFocusEffect.name, 2)

//         const context: FormContext | SubstanceContext = {
//             origin: this.context.origin,
//             destination: this.context.destination,
//             sourceUnit: this.context.sourceUnit,
//             targetUnit: this.context.targetUnit,
//             focus: this.context.sourceUnit
//         }

//         print(CasterAsFocusEffect.name, 3)
//         this.ResolveChildren(context)
//     }
    
// }