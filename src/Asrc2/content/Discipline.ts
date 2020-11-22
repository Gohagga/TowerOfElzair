import { Unit } from "Asrc2/models/Unit";
import { Ability } from "Asrc2/systems/ability/Ability";
import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { AbilitySlot } from "Asrc2/systems/ability/AbilityEnums";
import { AbilitySlotManager } from "Asrc2/systems/ability/AbilitySlotManager";
import { InputManager } from "Asrc2/systems/input/InputManager";
import { Log } from "Asrc2/systems/log/Log";
import { UnitSlotManager } from "Asrc2/systems/slot/UnitSlotManager";
import { Talent } from "Asrc2/systems/talent/Talent";
import { TalentDepType } from "Asrc2/systems/talent/TalentDependency";
import { TalentTree } from "Asrc2/systems/talent/TalentTree";

const { left, up, right, down } = TalentDepType;

export abstract class Discipline extends TalentTree {

    protected masteryFirstAbilities: Talent[] = [];
    protected masterySecondAbilities: Talent[] = [];
    protected masteryThirdAbilities: Talent[] = [];
    protected masteryFourthAbilities: Talent[] = [];
    
    constructor(
        unit: Unit,
        protected slotManager: AbilitySlotManager,
        protected inputManager: InputManager,
    ) {
        super(unit);
    }

    protected GetSlot(ability: Ability) {
        if (this.inputManager.IsCtrlDown(this.owner)) {
            Log.info("CONTROL DOWN");
            if (ability.slot == AbilitySlot.Q){
                Log.info("X1");
                return AbilitySlot.X1;
            } else if (ability.slot == AbilitySlot.W) {
                Log.info("X2");
                return AbilitySlot.X2;
            } else if (ability.slot == AbilitySlot.E) {
                Log.info("X3");
                return AbilitySlot.X3;
            }
        }
        return ability.slot;
    }
}