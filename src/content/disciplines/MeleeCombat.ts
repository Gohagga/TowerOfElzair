import { TalentTree } from "systems/talents/TalentTree";
import { IconPath } from "IconPath";
import { Talent } from "systems/talents/Talent";
import ILogger from "systems/logger/ILogger";
import { Unit } from "w3ts/index";
import { ISlotManager } from "systems/slottable/ISlotManager";
import { AbilitySlot } from "systems/ability/AbilitySlot";
import { TalentDepType } from "systems/talents/TalentDependency";
import { Ability } from "systems/ability/Ability";

const { left, up, right, down } = TalentDepType;

export class MeleeCombat extends TalentTree {
    
    masteryFirstAbilities: Talent[] = [];
    masterySecondAbilities: Talent[] = [];
    
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
                this.bash.AddToUnit(u, x => {
                    x.removeAbility(this.bash.id)
                    this.SetTalentLevel(1, 6, 0);
                });
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
                this.bash.AddToUnit(u, x => {
                    x.removeAbility(this.bash.id)
                    this.SetTalentLevel(1, 6, 0);
                });
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
        abilities: Record<string, Ability>
    ) {
        super(logger, unit);
        this.bash = abilities["Bash"];
    }
}