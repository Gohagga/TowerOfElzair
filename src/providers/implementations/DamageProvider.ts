import { IDamageProvider } from "../interfaces/IDamageProvider";
import { Unit } from "w3ts";
import { DamageType } from "../../components/damage/DamageType";

export class DamageProvider implements IDamageProvider {
    
    UnitDamageTarget(source: Unit, target: Unit, amount: number, type: DamageType): void {
        source.damageTarget(target.handle, amount, 0, false, false, attackTypes[type], damageTypes[type], WEAPON_TYPE_WHOKNOWS);
    }

    UnitHealTarget(source: Unit, target: Unit, amount: number, type: DamageType): void {
        SetWidgetLife(target.handle, GetWidgetLife(target.handle) + amount);
    }
}

export const attackTypes = {
    [DamageType.PhysicalAutoattack]: ATTACK_TYPE_NORMAL,
    [DamageType.MagicalAutoattack]: ATTACK_TYPE_MAGIC,
    [DamageType.Physical]: ATTACK_TYPE_NORMAL,
    [DamageType.Magical]: ATTACK_TYPE_NORMAL,
    [DamageType.Untyped]: ATTACK_TYPE_CHAOS,
}

export const damageTypes = {
    [DamageType.PhysicalAutoattack]: DAMAGE_TYPE_NORMAL,
    [DamageType.MagicalAutoattack]: DAMAGE_TYPE_NORMAL,
    [DamageType.Physical]: DAMAGE_TYPE_UNIVERSAL,
    [DamageType.Magical]: DAMAGE_TYPE_MAGIC,
    [DamageType.Untyped]: DAMAGE_TYPE_UNIVERSAL,
}

// export const damageTypeMapping: Record<number, Record<number, DamageType>> = {}
// damageTypeMapping[Number(ATTACK_TYPE_NORMAL)][Number(DAMAGE_TYPE_NORMAL)] = DamageType.PhysicalAutoattack;
// damageTypeMapping[Number(ATTACK_TYPE_MAGIC)][Number(DAMAGE_TYPE_NORMAL)] = DamageType.MagicalAutoattack;
// damageTypeMapping[Number(ATTACK_TYPE_NORMAL)][Number(DAMAGE_TYPE_UNIVERSAL)] = DamageType.Physical;
// damageTypeMapping[Number(ATTACK_TYPE_NORMAL)][Number(DAMAGE_TYPE_MAGIC)] = DamageType.Magical;
// damageTypeMapping[Number(ATTACK_TYPE_CHAOS)][Number(DAMAGE_TYPE_UNIVERSAL)] = DamageType.Untyped;