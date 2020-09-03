import { TalentDepType } from "../../systems/talents/TalentDependency";
import { TalentTree } from "../../systems/talents/TalentTree";
import { Talent } from "../../systems/talents/Talent";
import { Unit } from "w3ts";
import ILogger from "../../systems/logger/ILogger";
import { IconPath } from "../../IconPath";
import { AbilityData, Ability } from "../../systems/ability/Ability";
import { AbilitySlot } from "../../systems/ability/AbilitySlot";
import { UnitSlotManager } from "../../systems/slottable/UnitSlotManager";



const { left, up, right, down } = TalentDepType;

export class Discipline extends TalentTree {

    protected slotManager: UnitSlotManager<AbilitySlot>;
    
    protected masteryFirstAbilities: Talent[] = [];
    protected masterySecondAbilities: Talent[] = [];
    
    public Initialize(): void {
        this.SetColumnsRows(1, 1);
        this.title = "Not set";
        this.pointsAvailable = 9999;
    }

    constructor(
        unit: Unit,
        logger: ILogger,
        UnitAbilitySlotManager: UnitSlotManager<AbilitySlot>,
        abilities: Record<string, Ability>
    ) {
        super(logger, unit);
        this.slotManager = UnitAbilitySlotManager;
    }
}