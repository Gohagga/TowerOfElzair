import { FormEffect, FormContext } from "../base/FormEffect";
import { SubstanceContext } from "../base/SubstanceEffect";

export class CasterEffect extends FormEffect {
    
    constructor() {
        super();
    }

    public Resolve(): void {
        
        const context: FormContext | SubstanceContext = {
            origin: this.context.origin,
            destination: this.context.destination,
            sourceUnit: this.context.sourceUnit,
            targetUnit: null,
            targets: [this.context.sourceUnit]
        }

        this.ResolveChildren(context)
    }
    
}