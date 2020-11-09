import { Unit } from "Asrc2/models/Unit";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { DamageType } from "../damage/DamageType";
import { AbilityData } from "./AbilityData";
import { AbilitySlot, AbilityType } from "./AbilityEnums";

export abstract class Ability implements AbilityData {

    id: number;
    codeId: string;
    slot: AbilitySlot;
    name: string;
    type: AbilityType;
    icon?: string;
    iconDisabled?: string;

    constructor(
        data: AbilityData,
        protected damageService: IDamageService
    ) {
        this.id = FourCC(data.codeId);
        this.codeId = data.codeId;
        this.slot = data.slot;
        this.name = data.name;
        this.type = data.type;
        this.icon = data.icon;
        this.iconDisabled = data.iconDisabled;
    }

    AddToUnit(unit: Unit): boolean {
        return unit.addAbility(this.id);
    }

    RemoveFromUnit(unit: Unit): boolean {
        if (unit.getAbilityLevel(this.id) > 0) {
            return unit.removeAbility(this.id);
        }
        return false;
    }

    ApplyCost(unit: Unit, cost: number) {
        
        const max = unit.maxMana;
        const curr = unit.mana;
        const overflow = curr + cost - max;

        if (overflow > 0) {
            unit.mana = max;

            // Handle overflow
            if (this.type == AbilityType.Magic) {
                // Dummy cast something
            } else {
                // True damage
                this.damageService.UnitDamageTarget(unit, unit, overflow, DamageType.Untyped);
            }

        } else {
            unit.mana += cost;
        }
    }
}