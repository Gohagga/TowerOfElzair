import { Unit } from "Asrc2/models/Unit";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { AttackType } from "../damage/AttackType";
import { DamageType } from "../damage/DamageType";
import { AbilityData } from "./AbilityData";
import { AbilitySlot, AbilityType } from "./AbilityEnums";

export abstract class Ability implements AbilityData {

    id: number;
    extId?: number;
    codeId: string;
    slot: AbilitySlot;
    name: string;
    type: AttackType;
    icon: string;
    iconDisabled?: string;

    constructor(
        data: AbilityData,
        protected damageService: IDamageService
    ) {
        this.id = FourCC(data.codeId);
        if (data.extCodeId) this.extId = FourCC(data.extCodeId);
        this.codeId = data.codeId;
        this.slot = data.slot;
        this.name = data.name;
        this.type = data.type;
        this.icon = data.icon;
        this.iconDisabled = data.iconDisabled;
    }

    AddToUnit(unit: Unit): boolean {
        const res = unit.addAbility(this.id);
        if (res) {
            const a = unit.getAbility(this.id);
            const tooltip = this.GenerateDescription(unit);
            BlzSetAbilityStringLevelField(a, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, 0, tooltip);
        }
        return res;
    }

    AddToUnitBase(unit: Unit, extended?: boolean) {
        if (extended && !this.extId) print("Extended ID not configured!");
        else if (extended && this.extId) return unit.addAbility(this.extId);
        return unit.addAbility(this.id);
    }

    RemoveFromUnit(unit: Unit): boolean {
        if (unit.getAbilityLevel(this.id) > 0) {
            const res = unit.removeAbility(this.id);
            return res;
        }
        return false;
    }

    abstract GenerateDescription(unit: Unit): string;

    ApplyCost(unit: Unit, cost: number) {
        
        
    }
}