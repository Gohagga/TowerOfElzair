import { SubstanceEffect } from "../base/SubstanceEffect";
import { IDummySpellProvider } from "providers/interfaces/IDummySpellProvider";

export class DummyCastEffect extends SubstanceEffect {
    
    constructor(
        private readonly provider: IDummySpellProvider,
    ) { super(); }
    
    public Resolve(): void {
        
        this.provider.CastAt(this.context.focus);
    }
}