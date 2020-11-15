import { DamageEvent } from "Asrc2/events/handlers/damage/DamageEvent";
import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { Unit } from "Asrc2/models/Unit";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { IDamageService } from "../interfaces/IDamageService";

export class DamageService implements IDamageService {

    constructor(
        private damageEventHandler: IDamageEventHandler
    ) { }

    UnitDamageTarget(source: Unit, target: Unit, amount: number, types: DamageType[], isCrit: boolean = false): void {
        let event = new DamageEvent({
            source: source,
            target: target,
            types: types,
            amount: amount,
            isCrit: isCrit
        });

        event = this.damageEventHandler.Register(event);
        source.damageTarget(event.target.handle, event.amount, 0, false, false, ATTACK_TYPE_CHAOS, DAMAGE_TYPE_UNIVERSAL, WEAPON_TYPE_WHOKNOWS);
    }

    UnitHealTarget(source: Unit, target: Unit, amount: number, types: DamageType[], isCrit: boolean = false): void {
        let event = new DamageEvent({
            source: source,
            target: target,
            types: types,
            amount: amount,
            isCrit: isCrit
        });

        event = this.damageEventHandler.Register(event);
        let targetUnit = event.target.handle;
        SetWidgetLife(targetUnit, GetWidgetLife(targetUnit) + event.amount);
    }
    
    private readonly attackTypes: Record<DamageType, attacktype> = {
        [DamageType.Untyped]: ATTACK_TYPE_CHAOS,
        [DamageType.Crushing]: ATTACK_TYPE_NORMAL,
        [DamageType.Slashing]: ATTACK_TYPE_NORMAL,
        [DamageType.Piercing]: ATTACK_TYPE_NORMAL
    }
    
    private readonly damageTypes: Record<DamageType, damagetype> = {
        [DamageType.Untyped]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Crushing]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Slashing]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Piercing]: DAMAGE_TYPE_UNIVERSAL
    }
}