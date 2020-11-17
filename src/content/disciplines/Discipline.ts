// import { TalentDepType } from "../../systems/talents/TalentDependency";
// import { TalentTree } from "../../systems/talents/TalentTree";
// import { Talent } from "../../systems/talents/Talent";
// import { Unit } from "w3ts";
// import ILogger from "../../systems/logger/ILogger";
// import { IconPath } from "../../IconPath";
// import { AbilityData, Ability } from "../../systems/ability/Ability";
// import { AbilitySlot } from "../../systems/ability/AbilitySlot";
// import { UnitSlotManager } from "../../systems/slottable/UnitSlotManager";
// import { IAbility } from "systems/ability/IAbility";



// const { left, up, right, down } = TalentDepType;

// export abstract class Discipline extends TalentTree {

//     protected slotManager: UnitSlotManager<AbilitySlot>;
    
//     protected masteryFirstAbilities: Talent[] = [];
//     protected masterySecondAbilities: Talent[] = [];
//     protected masteryThirdAbilities: Talent[] = [];
//     protected masteryFourthAbilities: Talent[] = [];
    
//     constructor(
//         unit: Unit,
//         logger: ILogger,
//         UnitAbilitySlotManager: UnitSlotManager<AbilitySlot>,
//         protected abilities: Record<string, IAbility>
//     ) {
//         super(logger, unit);
//         this.slotManager = UnitAbilitySlotManager;
//     }
// }