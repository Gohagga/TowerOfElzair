import { SubstanceEffect, SubstanceContext } from "../base/SubstanceEffect";
import { FormEffect } from "../base/FormEffect";
import { IDamageProvider } from "providers/interfaces/IDamageProvider";
import { DamageType } from "components/damage/DamageType";

export class DamageEffect extends SubstanceEffect {

    constructor(
        private readonly amount: number,
        private readonly type: DamageType,
        private readonly provider: IDamageProvider
    ) { super(); }

    public Resolve(): void {
        
        if (!this.context) return;
        
        this.provider.UnitDamageTarget(this.context.sourceUnit, this.context.focus, this.amount, this.type);
    }
}