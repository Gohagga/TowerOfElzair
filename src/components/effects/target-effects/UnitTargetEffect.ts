import { TemplateEffect } from "../base/TemplateEffect";
import { FormContext } from "../base/FormEffect";
import { Point } from "w3ts";
import { ISpellCastEventProvider } from "providers/interfaces/ISpellCastEventProvider";

export class UnitTargetEffect extends TemplateEffect {

    private readonly event: ISpellCastEventProvider;
    constructor(
        onSpellCast: ISpellCastEventProvider
    ) {
        super();
        this.event = onSpellCast;
    }
    
    public Resolve(): void {

        const caster = this.event.GetCaster();
        const target = this.event.GetTargetUnit();
        const context: FormContext = {
            origin: this.event.GetCaster().point,
            destination: this.event.GetTargetPoint(),
            sourceUnit: caster,
            targetUnit: target,
            focus: target
        }
        this.ResolveChildren(context);
    }
}