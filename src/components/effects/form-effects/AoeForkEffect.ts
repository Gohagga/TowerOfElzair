import { IEnumUnitProvider } from "providers/interfaces/IEnumUnitProvider";
import { Unit } from "w3ts";
import { FormContext, FormEffect } from "../base/FormEffect";
import { SubstanceContext } from "../base/SubstanceEffect";

/**
 * FormEffect that provides targets by enumerating units within given radius of destination point.
 */
export class AoeForkEffect extends FormEffect {
    
    /**
     * @param provider Object that handles enumeration.
     * @param radius Enumeration radius of the effect.
     * @param filter Filter which units will be added to targets.
     */
    constructor(
        private readonly provider: IEnumUnitProvider,
        private readonly radius: number,
        private readonly filter?: (target: Unit, caster: Unit) => boolean,
    ) { super(); }

    public Resolve(): void {
        
        let targets = this.provider.EnumUnitsInRange(this.context.destination, this.radius, this.filter);

        for (let t of targets) {
            const context: FormContext | SubstanceContext = {
                origin: this.context.origin,
                destination: this.context.destination,
                sourceUnit: this.context.sourceUnit,
                focus: t
            }
            this.ResolveChildren(context)
        }
    }
}