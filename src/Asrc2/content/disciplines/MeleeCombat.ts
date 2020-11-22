import { Unit } from "Asrc2/models/Unit";
import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { AbilitySlot } from "Asrc2/systems/ability/AbilityEnums";
import { AbilitySlotManager } from "Asrc2/systems/ability/AbilitySlotManager";
import { UnitSlotManager } from "Asrc2/systems/slot/UnitSlotManager";
import { TalentDepType } from "Asrc2/systems/talent/TalentDependency";
import { IconPath } from "Asrc2/config/IconPath";
import { Bash } from "../abilities/melee-combat/Bash";
import { BattleRush } from "../abilities/melee-combat/BattleRush";
import { Charge } from "../abilities/melee-combat/Charge";
import { Cleave } from "../abilities/melee-combat/Cleave";
import { GroundSmash } from "../abilities/melee-combat/GroundSmash";
import { Slam } from "../abilities/melee-combat/Slam";
import { Sprint } from "../abilities/melee-combat/Sprint";
import { Swing } from "../abilities/melee-combat/Swing";
import { Discipline } from "../Discipline";
import { InputManager } from "Asrc2/systems/input/InputManager";

const { left, up, right, down } = TalentDepType;

export class MeleeCombat extends Discipline {
    
    public Initialize(): void {
        this.SetColumnsRows(5, 6);
        this.title = "Melee Combat";
        this.pointsAvailable = 9999;
        this.icon = IconPath.BTNOrcMeleeUpOne;
    }

    constructor(
        unit: Unit,
        slotManager: AbilitySlotManager,
        inputManager: InputManager,
        abilities: {
            bash: Bash, sprint: Sprint, slam: Slam, groundSmash: GroundSmash,
            swing: Swing, charge: Charge, cleave: Cleave, battleRush: BattleRush,

        }
    ) {
        super(unit, slotManager, inputManager);

        this.InitializeTier1(abilities.bash, abilities.sprint, abilities.slam, abilities.groundSmash,
            abilities.swing, abilities.charge, abilities.cleave, abilities.battleRush);

        this.InitializeTier2();
        
    }

    InitializeTier2() {
        let dmgBonus = 7.5;

        // Second mastery
        let mastery2 = this.AddTalent(0, 3, {
            Name: "Melee Combat 2",
            Cost: 1,
            Description: `Unlocks abilities and increases all physical damage done by ${dmgBonus}%.`,
            Icon: IconPath.BTNOrcMeleeUpTwo,
            Dependency: { [up]: 1 },
            OnAllocate: u => {
                for (let t of this.masterySecondAbilities) {
                    if (t.dependency) t.dependency[left] = 0;
                }
                this.SetTempTalentLevel(0, 3, 1);
                return true;
            },
            OnDeallocate: u => {
                for (let t of this.masterySecondAbilities) {
                    if (t.dependency) t.dependency[left] = -1;
                    let ab = t.tag as AbilityData;
                    this.slotManager.RemoveSlot(this.unit, ab.slot);
                }
                this.SetTalentLevel(0, 3, 0);
                return true;
            }
        });
    }

    InitializeTier1(bash: Bash, sprint: Sprint, slam: Slam, groundSmash: GroundSmash,
        swing: Swing, charge: Charge, cleave: Cleave, battleRush: BattleRush) {

        let dmgBonus = 7.5;
        let mastery1 = this.AddTalent(0, 5, {
            Name: "Melee Combat 1",
            Cost: 1,
            Description: `Unlocks abilities and increases all physical damage done by ${dmgBonus}%.`,
            Icon: IconPath.BTNOrcMeleeUpOne,
            OnAllocate: u => {
                for (let t of this.masteryFirstAbilities) {
                    if (t.dependency) t.dependency[left] = 0;
                }
                this.SetTempTalentLevel(0, 4, 1);
                return true;
            },
            OnDeallocate: u => {
                for (let t of this.masteryFirstAbilities) {
                    if (t.dependency) t.dependency[left] = -1;
                    let ab = t.tag as AbilityData;
                    this.slotManager.RemoveSlot(this.unit, ab.slot);
                }
                this.SetTalentLevel(0, 4, 0);
                return true;
            }
        });

        // Bash
        this.masteryFirstAbilities.push(this.AddTalent(1, 5, {
            Name: bash.name,
            Description: bash.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            // Requirements: (tree, unit) => this.slotManager
            Icon: bash.icon,
            IconDisabled: bash.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 5);
                const talent = this.talents[5 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                if (this.slotManager.ApplySlot(u, bash, u => {
                    bash.RemoveFromUnit(u);
                    this.SetTalentLevel(1, 5, 0);
                })) {
                    bash.AddToUnit(u);
                    this.SetTalentLevel(1, 5, 1);
                    return true;
                }
                return false;
            },
            Tag: bash
        }));

        // Sprint 2, 5
        this.masteryFirstAbilities.push(this.AddTalent(2, 5, {
            Name: sprint.name,
            Description: sprint.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: sprint.icon,
            IconDisabled: sprint.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 5);
                const talent = this.talents[5 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                if (this.slotManager.ApplySlot(u, sprint, u => {
                    sprint.RemoveFromUnit(u);
                    this.SetTalentLevel(2, 5, 0);
                })) {
                    sprint.AddToUnit(u);
                    this.SetTalentLevel(2, 5, 1);
                    return true;
                }
                return false;
            },
            Tag: sprint
        }));

        // Slam
        this.masteryFirstAbilities.push(this.AddTalent(3, 5, {
            Name: slam.name,
            Description: slam.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: slam.icon,
            IconDisabled: slam.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 5);
                const talent = this.talents[5 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                if (this.slotManager.ApplySlot(u, slam, u => {
                    slam.RemoveFromUnit(u);
                    this.SetTalentLevel(3, 5, 0);
                })) {
                    slam.AddToUnit(u);
                    this.SetTalentLevel(3, 5, 1);
                    return true;
                }
                return false;
            },
            Tag: slam
        }));

        // Ground Smash
        this.masteryFirstAbilities.push(this.AddTalent(4, 5, {
            Name: groundSmash.name,
            Description: groundSmash.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: groundSmash.icon,
            IconDisabled: groundSmash.iconDisabled,
            Requirements: (tree, u) => {
                const lvl = this.GetAllocatedTalentLevel(0, 5);
                const talent = this.talents[5 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                if (this.slotManager.ApplySlot(u, groundSmash, u => {
                    groundSmash.RemoveFromUnit(u);
                    print("Remove from unit");
                    this.SetTalentLevel(4, 5, 0);
                })) {
                    print("Add to unit");
                    groundSmash.AddToUnit(u);
                    this.SetTalentLevel(4, 5, 1);
                    return true;
                }
                return false;
            },
            Tag: groundSmash
        }));

        this.AddTalent(0, 4, {
            Name: "Melee Combat 1",
            IsLink: true,
            Dependency: { [up]: 1 },
        });

        // Swing
        this.masteryFirstAbilities.push(this.AddTalent(1, 4, {
            Name: swing.name,
            Description: swing.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: swing.icon,
            IconDisabled: swing.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 4);
                const talent = this.talents[4 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                if (this.slotManager.ApplySlot(u, swing, u => {
                    swing.RemoveFromUnit(u);
                    this.SetTalentLevel(1, 4, 0);
                })) {
                    swing.AddToUnit(u);
                    this.SetTalentLevel(1, 4, 1);
                    return true;
                }
                return false;
            },
            Tag: swing
        }));

        // Charge
        this.masteryFirstAbilities.push(this.AddTalent(2, 4, {
            Name: charge.name,
            Description: charge.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: charge.icon,
            IconDisabled: charge.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 4);
                const talent = this.talents[4 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                if (this.slotManager.ApplySlot(u, charge, u => {
                    charge.RemoveFromUnit(u);
                    this.SetTalentLevel(2, 4, 0);
                })) {
                    charge.AddToUnit(u);
                    this.SetTalentLevel(2, 4, 1);
                    return true;
                }
                return false;
            },
            Tag: charge
        }));

        // Cleave
        this.masteryFirstAbilities.push(this.AddTalent(3, 4, {
            Name: cleave.name,
            Description: cleave.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: cleave.icon,
            IconDisabled: cleave.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 4);
                const talent = this.talents[4 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                if (this.slotManager.ApplySlot(u, cleave, u => {
                    cleave.RemoveFromUnit(u);
                    this.SetTalentLevel(3, 4, 0);
                })) {
                    cleave.AddToUnit(u);
                    this.SetTalentLevel(3, 4, 1);
                    return true;
                };
                return false;
            },
            Tag: cleave
        }));

        // Battle Rush
        this.masteryFirstAbilities.push(this.AddTalent(4, 4, {
            Name: battleRush.name,
            Description: battleRush.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: battleRush.icon,
            IconDisabled: battleRush.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 4);
                const talent = this.talents[4 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                if (this.slotManager.ApplySlot(u, battleRush, u => {
                    battleRush.RemoveFromUnit(u);
                    this.SetTalentLevel(4, 4, 0);
                })) {
                    battleRush.AddToUnit(u);
                    this.SetTalentLevel(4, 4, 1);
                    return true;
                }
                return false;
            },
            Tag: battleRush
        }));
    }
}