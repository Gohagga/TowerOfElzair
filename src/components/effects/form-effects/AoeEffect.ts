import { FormEffect, FormContext } from "../base/FormEffect";
import { IEnumUnitProvider } from "providers/interfaces/IEnumUnitProvider";
import { SubstanceContext } from "../base/SubstanceEffect";
import { Unit } from "w3ts";

/**
 * FormEffect that provides targets by enumerating units within given radius of destination point.
 */
export class AoeEffect extends FormEffect {
    
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
        
        const context: FormContext | SubstanceContext = {
            origin: this.context.origin,
            destination: this.context.destination,
            sourceUnit: this.context.sourceUnit,
            // targetUnit: this.context.targetUnit,
            targets: this.provider.EnumUnitsInRange(this.context.destination, this.radius, this.filter)
        }

        this.ResolveChildren(context)
    }
}