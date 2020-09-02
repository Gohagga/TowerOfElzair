import { TemplateEffect } from "../base/TemplateEffect";
import { FormContext } from "../base/FormEffect";
import { Point } from "w3ts";

export class CustomContextEffect extends TemplateEffect {

    context?: FormContext;
    
    public Resolve(): void {

        if (!this.context) return;
        print("Resolve custom effect")
        this.ResolveChildren(this.context);
        print("Resolve custom effect 2")

    }
}