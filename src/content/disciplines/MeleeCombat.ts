import { TalentDepType } from "../../systems/talents/TalentDependency";
import { TalentTree } from "../../systems/talents/TalentTree";
import { Talent } from "../../systems/talents/Talent";
import { Unit } from "w3ts";
import ILogger from "../../systems/logger/ILogger";
import { IconPath } from "../../IconPath";
import { AbilityData, Ability } from "../../systems/ability/Ability";
import { Discipline } from "./Discipline";
import { AbilitySlot } from "../../systems/ability/AbilitySlot";
import { UnitSlotManager } from "../../systems/slottable/UnitSlotManager";


const { left, up, right, down } = TalentDepType;

export class MeleeCombat extends Discipline {
    
    bash: Ability;

    public Initialize(): void {
        this.SetColumnsRows(5, 6);
        this.title = "Melee Combat";
        this.pointsAvailable = 9999;

        let dmgBonus = 7.5;

        let mastery1 = this.AddTalent(0, 5, {
            Name: "Melee Combat 1",
            Cost: 1,
            Description: `Unlocks abilities and increases all physical damage done by ${dmgBonus}%.`,
            Icon: IconPath.BTNGauntletsOfOgrePower,
            OnActivate: u => {
                for (let t of this.masteryFirstAbilities) {
                    if (t.dependency) t.dependency[left] = 0;
                }
            },
            OnDeactivate: u => {
                for (let t of this.masteryFirstAbilities) {
                    if (t.dependency) t.dependency[left] = -1;
                    if (t.tag) (t.tag as Ability).RemoveFromUnit(u);
                }
            }
        });

        this.AddTalent(1, 5, {
            Name: "Bash",
            Description: `Bashes the target in.`,
            Icon: IconPath.BTNHammer,
            // Dependency: { [left]: -1 },
            OnAllocate: u => {
                this.slotManager.ApplySlot(u, this.bash.slot, u => {
                    this.bash.RemoveFromUnit(u);
                    this.SetTalentLevel(1, 5, 0);
                });
                this.bash.AddToUnit(u);
                this.SetTalentLevel(1, 5, 1);
            }
        });
        
        this.AddTalent(2, 5, {
            Name: "Sprint",
            Description: `Sprint around.`,
            Icon: IconPath.BTNBoots,
            Dependency: { [left]: -1 },
            OnAllocate: u => {
                // bash.AddToUnit(u, x => {
                //     x.removeAbility(bash.id)
                //     this.SetTalentLevel(1, 6, 0);
                // });
            }
        });

        this.AddTalent(3, 5, {
            Name: "Slam",
            Description: `Slam someone.`,
            Icon: IconPath.BTNCallToArms,
            Dependency: { [left]: -1 },
            OnAllocate: u => {
                // bash.AddToUnit(u, x => {
                //     x.removeAbility(bash.id)
                //     this.SetTalentLevel(1, 6, 0);
                // });
            }
        });

        this.AddTalent(4, 5, {
            Name: "Ground Smash",
            Description: `Smash someone.`,
            Icon: IconPath.BTNCallToArms,
            Dependency: { [left]: -1 },
            OnAllocate: u => {
                // bash.AddToUnit(u, x => {
                //     x.removeAbility(bash.id)
                //     this.SetTalentLevel(1, 6, 0);
                // });
            }
        });

        this.AddTalent(0, 4, {
            IsLink: true,
            Dependency: { [up]: 0 },
        })

        this.AddTalent(1, 4, {
            Name: "Bash",
            Description: `Bashes the target in.`,
            Icon: IconPath.BTNHammer,
            // Dependency: { [left]: -1 },
            OnAllocate: u => {
                this.slotManager.ApplySlot(u, this.bash.slot, u => {
                    this.bash.RemoveFromUnit(u);
                    this.SetTalentLevel(1, 4, 0);
                });
                this.bash.AddToUnit(u);
                this.SetTalentLevel(1, 4, 1);
                // if (u.getAbilityLevel(this.bash.id) > 0) {
                // }
            }
        });
        
        this.AddTalent(2, 4, {
            Name: "Sprint",
            Description: `Sprint around.`,
            Icon: IconPath.BTNBoots,
            Dependency: { [left]: -1 },
            OnAllocate: u => {
                // bash.AddToUnit(u, x => {
                //     x.removeAbility(bash.id)
                //     this.SetTalentLevel(1, 6, 0);
                // });
            }
        });

        this.AddTalent(3, 4, {
            Name: "Slam",
            Description: `Slam someone.`,
            Icon: IconPath.BTNCallToArms,
            Dependency: { [left]: -1 },
            OnAllocate: u => {
                // bash.AddToUnit(u, x => {
                //     x.removeAbility(bash.id)
                //     this.SetTalentLevel(1, 6, 0);
                // });
            }
        });

        this.AddTalent(4, 4, {
            Name: "Ground Smash",
            Description: `Smash someone.`,
            Icon: IconPath.BTNCallToArms,
            Dependency: { [left]: -1 },
            OnAllocate: u => {
                // bash.AddToUnit(u, x => {
                //     x.removeAbility(bash.id)
                //     this.SetTalentLevel(1, 6, 0);
                // });
            }
        });
    }

    constructor(
        unit: Unit,
        logger: ILogger,
        slotManager: UnitSlotManager<AbilitySlot>,
        private abilities: Record<string, Ability>
    ) {
        super(unit, logger, slotManager, abilities);
        this.bash = abilities["Bash"];
    }
}