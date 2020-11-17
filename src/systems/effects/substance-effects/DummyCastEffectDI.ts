// import { SubstanceEffect } from "../base/SubstanceEffect";
// import { IDummySpellProvider } from "providers/interfaces/IDummySpellProvider";

// export class DummyCastEffect extends SubstanceEffect {
    
//     constructor(svc: {},
//         private readonly provider: IDummySpellProvider,
//     ) { super(); }
    
//     public Resolve(): void {
        
//         if (!this.context) return;
        
//         print("Casting dummy spell at", this.context.focus.name)
//         this.provider.CastAt(this.context.focus);
//     }
// }