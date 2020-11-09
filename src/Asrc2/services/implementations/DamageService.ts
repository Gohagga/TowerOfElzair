import { DamageEvent } from "Asrc2/events/handlers/damage/DamageEvent";
import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { Unit } from "Asrc2/models/Unit";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { IDamageService } from "../interfaces/IDamageService";

export class DamageService implements IDamageService {

    constructor(
        private damageEventHandler: IDamageEventHandler
    ) { }

    UnitDamageTarget(source: Unit, target: Unit, amount: number, type: DamageType): void {
        let event = new DamageEvent({
            source: source,
            target: target,
            type: type,
            amount: amount
        });

        event = this.damageEventHandler.Register(event);
        source.damageTarget(event.target.handle, event.amount, 0, false, false, this.attackTypes[event.type], this.damageTypes[event.type], WEAPON_TYPE_WHOKNOWS);
    }

    UnitHealTarget(source: Unit, target: Unit, amount: number, type: DamageType): void {
        let event = new DamageEvent({
            source: source,
            target: target,
            type: type,
            amount: amount
        });

        event = this.damageEventHandler.Register(event);
        let targetUnit = event.target.handle;
        SetWidgetLife(targetUnit, GetWidgetLife(targetUnit) + event.amount);
    }
    
    private readonly attackTypes: Record<DamageType, attacktype> = {
        [DamageType.PhysicalAutoattack]: ATTACK_TYPE_NORMAL,
        [DamageType.MagicalAutoattack]: ATTACK_TYPE_MAGIC,
        [DamageType.Physical]: ATTACK_TYPE_NORMAL,
        [DamageType.Magical]: ATTACK_TYPE_NORMAL,
        [DamageType.Untyped]: ATTACK_TYPE_CHAOS,
        [DamageType.Blunt]: ATTACK_TYPE_NORMAL,
        [DamageType.Slashing]: ATTACK_TYPE_NORMAL,
        [DamageType.Piercing]: ATTACK_TYPE_NORMAL
    }
    
    private readonly damageTypes: Record<DamageType, damagetype> = {
        [DamageType.PhysicalAutoattack]: DAMAGE_TYPE_NORMAL,
        [DamageType.MagicalAutoattack]: DAMAGE_TYPE_NORMAL,
        [DamageType.Physical]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Magical]: DAMAGE_TYPE_MAGIC,
        [DamageType.Untyped]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Blunt]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Slashing]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Piercing]: DAMAGE_TYPE_UNIVERSAL
    }
}