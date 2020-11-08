import { TemplateEffect } from "../base/TemplateEffect";
import { FormContext } from "../base/FormEffect";
import { IOnSpellCastProvider } from "providers/interfaces/IOnSpellCastProvider";

export class UnitTargetEffect extends TemplateEffect {

    private readonly event: IOnSpellCastProvider;
    constructor(svc: {
        OnSpellCastProvider: IOnSpellCastProvider
    }) {
        super();
        this.event = svc.OnSpellCastProvider;
    }
    
    public Resolve(): void {

        print("Resolve target effect")
        const caster = this.event.GetCaster();
        const target = this.event.GetTargetUnit();
        print("Resolve target effect 2")
        const context: FormContext = {
            origin: caster.point,
            destination: this.event.GetTargetPoint(),
            sourceUnit: caster,
            targetUnit: target,
            focus: target
        }
        print("Resolve target effect 3")
        this.ResolveChildren(context);
        print("Resolve target effect 4")

    }
}