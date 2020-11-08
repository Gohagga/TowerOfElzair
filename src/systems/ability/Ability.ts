import { Unit, Point } from "w3ts";
import { AbilitySlot } from "./AbilitySlot";
import { EventAbility, IAbilityEventHandler } from "events/ability/IAbilityEventHandler";
import { IAbility } from "./IAbility";
import { IOnSpellCastProvider } from "providers/interfaces/IOnSpellCastProvider";
import { EffectData } from "systems/effects/EffectBuilder";
import { AbilityEventData } from "events/ability/AbilityEventData";
import { attackTypes, damageTypes } from "providers/implementations/DamageProvider";
import { DamageType } from "systems/damage/DamageType";

export abstract class Ability implements IAbility {

    id: number;
    codeId: string;
    slot: AbilitySlot;
    type: AbilityType;
    cost: number;

    public name: string;

    constructor(data: AbilityData) {

        this.codeId = data.codeId;
        this.slot = data.slot;
        this.id = FourCC(data.codeId);
        this.name = data.name;
        this.type = data.type;
        this.cost = data.cost;
    }

    abstract Execute(caster: Unit, origin: Point, destination: Point, target: Unit): boolean;

    AddToUnit(unit: Unit): boolean {
        return unit.addAbility(this.id);
    }

    RemoveFromUnit(unit: Unit): boolean {
        if (unit.getAbilityLevel(this.id) > 0) {
            return unit.removeAbility(this.id);
        }
        return false;
    }

    ApplyCost(unit: Unit) {
        
        const max = unit.maxMana;
        const curr = unit.mana;
        const overflow = curr + this.cost - max;

        if (overflow > 0) {
            unit.mana = max;

            // Handle overflow
            if (this.type == AbilityType.Magic) {
                // Dummy cast something
            } else {
                // True damage
                const attackType = attackTypes[DamageType.Untyped];
                const damageType = damageTypes[DamageType.Untyped];
                unit.damageTarget(unit.handle, overflow, 0, false, false, attackType, damageType, WEAPON_TYPE_WHOKNOWS);
            }

        } else {
            unit.mana += this.cost;
        }
    }
}

export interface AbilityData {
    
    /**Id of wc3 ability. */
    codeId: string,

    /**Ability slot of the skill. QWER... */
    slot: AbilitySlot,

    name: string,

    type: AbilityType,

    cost: number,

    icon?: string,

    iconDisabled?: string,

    controller?: string,

    effect?: EffectData,
}

export const enum AbilityType {
    Magic,
    Physical,
    Hybrid
}