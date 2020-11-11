import { Unit } from "Asrc2/models/Unit";
import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { AbilitySlot } from "Asrc2/systems/ability/AbilityEnums";
import { UnitSlotManager } from "Asrc2/systems/slot/UnitSlotManager";
import { Talent } from "Asrc2/systems/talent/Talent";
import { TalentDepType } from "Asrc2/systems/talent/TalentDependency";
import { TalentTree } from "Asrc2/systems/talent/TalentTree";

const { left, up, right, down } = TalentDepType;

export abstract class Discipline extends TalentTree {

    protected slotManager: UnitSlotManager<AbilitySlot>;
    
    protected masteryFirstAbilities: Talent[] = [];
    protected masterySecondAbilities: Talent[] = [];
    protected masteryThirdAbilities: Talent[] = [];
    protected masteryFourthAbilities: Talent[] = [];
    
    constructor(
        unit: Unit,
        UnitAbilitySlotManager: UnitSlotManager<AbilitySlot>
    ) {
        super(unit);
        this.slotManager = UnitAbilitySlotManager;
    }
}