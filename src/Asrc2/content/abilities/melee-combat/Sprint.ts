import { Unit } from "Asrc2/models/Unit";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { Ability } from "Asrc2/systems/ability/Ability";
import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";

export type SprintConfig = {

}

export class Sprint extends Ability implements IUnitConfigurable<SprintConfig> {

    private unitConfig = new UnitConfigurable<SprintConfig>({
        
    });

    constructor(
        data: AbilityData,
        damageService: IDamageService
    ) {
        super(data, damageService);
        
    }

    GetUnitConfig = (unit: Unit) => 
        this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: SprintConfig) => void) => 
        this.unitConfig.UpdateUnitConfig(unit, cb);
    
    GenerateDescription(unit: Unit): string {
        return "";
    }
}