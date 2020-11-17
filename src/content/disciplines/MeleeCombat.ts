// import { TalentDepType } from "../../systems/talents/TalentDependency";
// import { TalentTree } from "../../systems/talents/TalentTree";
// import { Talent } from "../../systems/talents/Talent";
// import { Unit } from "w3ts";
// import ILogger from "../../systems/logger/ILogger";
// import { IconPath } from "../../IconPath";
// import { AbilityData, Ability } from "../../systems/ability/Ability";
// import { Discipline } from "./Discipline";
// import { AbilitySlot } from "../../systems/ability/AbilitySlot";
// import { UnitSlotManager } from "../../systems/slottable/UnitSlotManager";
// import { IAbility } from "systems/ability/IAbility";

// const { left, up, right, down } = TalentDepType;

// export class MeleeCombat extends Discipline {
    
//     public Initialize(): void {
        
//         this.SetColumnsRows(5, 6);
//         this.title = "Melee Combat";
//         this.pointsAvailable = 9999;
//         this.icon = IconPath.BTNOrcMeleeUpOne;
//     }

//     constructor(
//         unit: Unit,
//         logger: ILogger,
//         slotManager: UnitSlotManager<AbilitySlot>,
//         abilities: Record<string, IAbility>
//     ) {
//         super(unit, logger, slotManager, abilities);
//         print("MELEE COMBAT")
//         let [a1, b1, c1, d1] = [abilities.Bash, abilities.Sprint, abilities.Slam, abilities.GroundSmash];
//         let [a2, b2, c2, d2] = [abilities.Swing, abilities.Charge, abilities.Cleave, abilities.BattleRush];
//         // let [a3, b3, c3, d3] = [abilities.HolyLight, abilities.DivineShield, abilities.DevotionAura, abilities.Resurrection];

//         let dmgBonus = 7.5;

//         let mastery1 = this.AddTalent(0, 5, {
//             Name: "Melee Combat 1",
//             Cost: 1,
//             Description: `Unlocks abilities and increases all physical damage done by ${dmgBonus}%.`,
//             Icon: IconPath.BTNOrcMeleeUpOne,
//             OnAllocate: u => {
//                 for (let t of this.masteryFirstAbilities) {
//                     if (t.dependency) t.dependency[left] = 0;
//                 }
//                 this.SetTempTalentLevel(0, 4, 1);
//             },
//             OnDeallocate: u => {
//                 for (let t of this.masteryFirstAbilities) {
//                     if (t.dependency) t.dependency[left] = -1;
//                     let ab = t.tag as IAbility;
//                     this.slotManager.RemoveSlot(this.unit, ab.slot);
//                 }
//                 this.SetTalentLevel(0, 4, 0);
//             }
//         });

//         // Bash
//         this.masteryFirstAbilities.push(this.SetupTalent(a1, 1, 5));
        
//         // Sprint
//         this.masteryFirstAbilities.push(this.SetupTalent(b1, 2, 5));

//         // Slam
//         this.masteryFirstAbilities.push(this.SetupTalent(c1, 3, 5));

//         // Ground Smash
//         this.masteryFirstAbilities.push(this.SetupTalent(d1, 4, 5));

//         this.AddTalent(0, 4, {
//             Name: "Melee Combat 1",
//             IsLink: true,
//             Dependency: { [up]: 1 },
//         });

//         // Bash
//         this.masteryFirstAbilities.push(this.SetupTalent(a2, 1, 4));
                
//         // Sprint
//         this.masteryFirstAbilities.push(this.SetupTalent(b2, 2, 4));

//         // Slam
//         this.masteryFirstAbilities.push(this.SetupTalent(c2, 3, 4));

//         // Ground Smash
//         this.masteryFirstAbilities.push(this.SetupTalent(d2, 4, 4));

//         // Second mastery
//         let mastery2 = this.AddTalent(0, 3, {
//             Name: "Melee Combat 2",
//             Cost: 1,
//             Description: `Unlocks abilities and increases all physical damage done by ${dmgBonus}%.`,
//             Icon: IconPath.BTNOrcMeleeUpTwo,
//             Dependency: { [up]: 1 },
//             OnAllocate: u => {
//                 for (let t of this.masterySecondAbilities) {
//                     if (t.dependency) t.dependency[left] = 0;
//                 }
//                 this.SetTempTalentLevel(0, 3, 1);
//             },
//             OnDeallocate: u => {
//                 for (let t of this.masterySecondAbilities) {
//                     if (t.dependency) t.dependency[left] = -1;
//                     let ab = t.tag as IAbility;
//                     this.slotManager.RemoveSlot(this.unit, ab.slot);
//                 }
//                 this.SetTalentLevel(0, 3, 0);
//             }
//         });

//         // Bash
//         // this.masterySecondAbilities.push(this.SetupTalent(a3, 1, 3));
                
//         // // Sprint
//         // this.masterySecondAbilities.push(this.SetupTalent(b3, 2, 3));

//         // // Slam
//         // this.masterySecondAbilities.push(this.SetupTalent(c3, 3, 3));

//         // // Ground Smash
//         // this.masterySecondAbilities.push(this.SetupTalent(d3, 4, 3));

//         print("END MELEE COMBAT")
//     }

//     private SetupTalent(ability: IAbility, col: number, row: number): Talent {
        
//         let name = GetAbilityName(ability.id);
//         let desc = BlzGetAbilityResearchExtendedTooltip(ability.id, 0);
//         let icon = BlzGetAbilityIcon(ability.id);

//         let x = col;
//         let y = row;
        
//         let talent = this.AddTalent(x, y, {
//             Name: name,
//             Description: desc,
//             Dependency: { [left]: -1 },
//             Icon: ability.icon || icon,
//             IconDisabled: ability.iconDisabled,
//             Requirements: (tree, unit) => {
//                 let lvl = this.GetAllocatedTalentLevel(0, y);
//                 let talent = this.talents[y * this.columns];
//                 return [lvl > 0, talent.name];
//             },
//             OnAllocate: u => {
//                 this.slotManager.ApplySlot(u, ability.slot, u => {
//                     print("Remove from unit", name);
//                     ability.RemoveFromUnit(u);
//                     this.SetTalentLevel(x, y, 0);
//                 });
//                 print("Add to unit", name);
//                 ability.AddToUnit(u);
//                 this.SetTalentLevel(x, y, 1);
//             },
//             Tag: ability
//         });

//         return talent;
//     }
// }