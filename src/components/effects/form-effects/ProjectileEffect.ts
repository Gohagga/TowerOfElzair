import { FormEffect, FormContext } from "../base/FormEffect";
import { ITargetProjectileProvider } from "providers/interfaces/ITargetProjectileProvider";
import { Unit } from "w3ts/index";
import { SubstanceContext } from "../base/SubstanceEffect";
import ILogger from "components/logger/ILogger";

export class ProjectileEffect extends FormEffect {
    
    
    constructor(
        private readonly provider: ITargetProjectileProvider,
        private readonly logger: ILogger
    ) { super(); }
    
    public Resolve(): void {
        this.logger.info("Projectile resolve");
        const targets: Unit[] = [];
        if (this.context.targetUnit) targets.push(this.context.targetUnit);
        if (this.context.targets) targets.push(...this.context.targets);

        this.logger.info(targets.length, "number of targets");

        for (let t of targets) {
            const context: FormContext | SubstanceContext = {
                origin: this.context.origin,
                destination: t.point,
                sourceUnit: this.context.sourceUnit,
                targetUnit: this.context.targetUnit,
                targets: [t]
            }
            this.logger.info("Shooting projectile", this.context.sourceUnit.name, t.name);
            this.provider.Register({
                origin: this.context.origin,
                source: this.context.sourceUnit,
                target: t,
                callback: () => {
                    this.logger.info("Projectile hits");
                    this.ResolveChildren(context);
                }
            })
        }
    }
}