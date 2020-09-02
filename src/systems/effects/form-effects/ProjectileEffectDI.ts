import { FormEffect, FormContext } from "../base/FormEffect";
import { ITargetProjectileProvider } from "providers/interfaces/ITargetProjectileProvider";
import { Unit } from "w3ts/index";
import { SubstanceContext } from "../base/SubstanceEffect";
import ILogger from "systems/logger/ILogger";

export class ProjectileEffect extends FormEffect {
    
    private readonly logger: ILogger
    
    constructor(svc: {
        logger: ILogger
    },
        private readonly provider: ITargetProjectileProvider,
    ) {
        super();
        this.logger = svc.logger;
    }
    
    public Resolve(): void {

        print("Projectile", 1)
        if (this.context == null) return;

        print("Projectile", 2)
        const context: FormContext | SubstanceContext = {
            origin: this.context.origin,
            destination: this.context.destination,
            sourceUnit: this.context.sourceUnit,
            targetUnit: this.context.targetUnit,
            focus: this.context.focus
        }
        
        print("Projectile", 3, (this.provider as any)?.name)
        this.logger.info("Shooting projectile", this.context.sourceUnit?.name, this.context.focus?.name);
        this.provider.Register({
            origin: this.context.origin,
            source: this.context.sourceUnit,
            target: this.context.focus,
            callback: () => {
                this.logger.info("Projectile hits");
                this.ResolveChildren(context);
            }
        })
        print("Finished shooting projectile")
    }
}