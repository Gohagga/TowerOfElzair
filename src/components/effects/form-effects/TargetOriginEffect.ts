import { FormEffect, FormContext } from "../base/FormEffect";
import { SubstanceContext } from "../base/SubstanceEffect";

export class TargetOriginEffect extends FormEffect {
    
    public Resolve(): void {
        
        let t = this.context.targets[0] || this.context.targetUnit;
        const context: FormContext | SubstanceContext = {
            origin: t.point,
            destination: this.context.destination,
            sourceUnit: this.context.sourceUnit,
            targetUnit: this.context.targetUnit,
            targets: this.context.targets
        }

        this.ResolveChildren(context)
    }
}