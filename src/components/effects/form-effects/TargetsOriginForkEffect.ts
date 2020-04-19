import { FormEffect, FormContext } from "../base/FormEffect";
import { SubstanceContext } from "../base/SubstanceEffect";
import { Unit } from "w3ts/index";

export class TargetsOriginForkEffect extends FormEffect {
    
    public Resolve(): void {

        for (let t of this.context.targets) {
            const context: FormContext | SubstanceContext = {
                origin: t.point,
                destination: this.context.destination,
                sourceUnit: this.context.sourceUnit,
                targetUnit: this.context.targetUnit,
                targets: this.context.targets
            }
            this.ResolveChildren(context);
        }
    }
}