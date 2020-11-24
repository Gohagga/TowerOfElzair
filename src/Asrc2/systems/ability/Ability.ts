import { Unit } from "Asrc2/models/Unit";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { AttackType } from "../damage/AttackType";
import { DamageType } from "../damage/DamageType";
import { Log } from "../log/Log";
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

    AddToUnit(unit: Unit, extended?: boolean): boolean {
        const res = this.AddToUnitBase(unit, extended);
        if (res) {
            const a = unit.getAbility(res);
            const tooltip = this.GenerateDescription(unit);
            BlzSetAbilityStringLevelField(a, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, 0, tooltip);
            return true;
        }
        return false;
    }

    AddToUnitBase(unit: Unit, extended?: boolean): number | false {
        if (extended && !this.extId) {
            Log.info("Extended ID not configured!");
            return false;
        }
        else if (extended && this.extId) return unit.addAbility(this.extId) && this.extId;
        return unit.addAbility(this.id) && this.id;
    }

    RemoveFromUnit(unit: Unit): boolean {
        if (unit.getAbilityLevel(this.id) > 0 || unit.getAbilityLevel(this.extId as number) > 0) {
            print(2);
            Log.info(this.extId);
            if (this.extId) Log.info(GetObjectName(this.extId));
            let res = unit.removeAbility(this.id);
            if (this.extId) res = unit.removeAbility(this.extId as number) || res;
            return res;
        }
        return false;
    }

    abstract GenerateDescription(unit: Unit): string;

    ApplyCost(unit: Unit, cost: number) {
        
        
    }
}