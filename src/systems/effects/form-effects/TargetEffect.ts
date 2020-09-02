import { FormEffect, FormContext } from "../base/FormEffect";
import { SubstanceContext } from "../base/SubstanceEffect";

export class TargetEffect extends FormEffect {
    
    constructor() {
        super();
    }

    public Resolve(): void {
        
        print("Resolve targeeet effect")
        if (!(this.context && this.context.targetUnit)) return;
        print("Resolve targeeet effect")

        const context: FormContext | SubstanceContext = {
            origin: this.context.origin,
            destination: this.context.destination,
            sourceUnit: this.context.sourceUnit,
            targetUnit: this.context.targetUnit,
            focus: this.context.targetUnit
        }

        this.ResolveChildren(context)
    }
    
}