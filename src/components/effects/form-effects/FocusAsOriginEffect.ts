import { FormEffect, FormContext } from "../base/FormEffect";
import { SubstanceContext } from "../base/SubstanceEffect";

export class FocusAsOriginEffect extends FormEffect {
    
    public Resolve(): void {
        
        const context: FormContext | SubstanceContext = {
            origin: this.context.focus.point,
            destination: this.context.destination,
            sourceUnit: this.context.sourceUnit,
            targetUnit: this.context.targetUnit,
            focus: this.context.focus
        }

        this.ResolveChildren(context)
    }
}