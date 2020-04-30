import { FormEffect, FormContext } from "../base/FormEffect";
import { SubstanceContext } from "../base/SubstanceEffect";

export class CasterAsFocusEffect extends FormEffect {
    
    constructor() {
        super();
    }

    public Resolve(): void {
        
        if (!this.context) return;
        
        const context: FormContext | SubstanceContext = {
            origin: this.context.origin,
            destination: this.context.destination,
            sourceUnit: this.context.sourceUnit,
            targetUnit: this.context.targetUnit,
            focus: this.context.sourceUnit
        }

        this.ResolveChildren(context)
    }
    
}