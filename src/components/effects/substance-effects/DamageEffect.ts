import { SubstanceEffect, SubstanceContext } from "../base/SubstanceEffect";
import { FormEffect } from "../base/FormEffect";
import { IDamageProvider } from "providers/interfaces/IDamageProvider";
import { DamageType } from "components/damage/DamageType";

export class DamageEffect implements SubstanceEffect {

    constructor(
        private readonly amount: number,
        private readonly type: DamageType,
        private readonly provider: IDamageProvider
    ) {}

    context: SubstanceContext;

    public Resolve(): void {
        
        for (let u of this.context.targets) {
            this.provider.UnitDamageTarget(this.context.sourceUnit, u, this.amount, this.type);
        }
    }
}