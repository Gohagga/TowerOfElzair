import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { ActionOrder } from "../ActionOrder";
import { AttackType } from "../AttackType";
import { DamageType } from "../DamageType";

export class BludgeonDamageManager {

    constructor(
        private damageService: IDamageService,
        private damageEventHandler: IDamageEventHandler
    ) {
        
        this.damageEventHandler.Subscribe(ActionOrder.BludgeonDamage, (e, sub) => {
            
            // Damage specific effects
            if ((e.damageType & DamageType.Bludgeon) == DamageType.Bludgeon) {
                this.damageService.UnitCauseStrain(e.source, e.target, e.damage, AttackType.Physical);
            }
        });
    }
}