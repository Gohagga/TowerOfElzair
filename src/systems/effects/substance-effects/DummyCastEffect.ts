// import { SubstanceEffect } from "../base/SubstanceEffect";
// import { IDummySpellProvider } from "providers/interfaces/IDummySpellProvider";

// export class DummyCastEffect extends SubstanceEffect {
    
//     constructor(
//         private readonly provider: IDummySpellProvider,
//     ) { super(); }
    
//     public Resolve(): void {
        
//         if (!this.context) return;
        
//         this.provider.CastAt(this.context.focus);
//     }
// }