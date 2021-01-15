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
import { Firebolt } from "../abilities/pyromancy/Firebolt";
import { Fireball } from "../abilities/pyromancy/Fireball";
import { InputManager } from "Asrc2/systems/input/InputManager";
import { FieryEscape } from "../abilities/pyromancy/FieryEscape";
import { Ignition } from "../abilities/pyromancy/Ignition";
import { HellTouch } from "../abilities/pyromancy/HellTouch";
import { FlameBlast } from "../abilities/pyromancy/FlameBlast";
import { Log } from "Asrc2/systems/log/Log";
import { Backburn } from "../abilities/pyromancy/Backburn";
import { FireShield } from "../abilities/pyromancy/FireShield";
import { IgniteWeapon } from "../abilities/pyromancy/IgniteWeapon";

const { left, up, right, down } = TalentDepType;

export class Pyromancy extends Discipline {
    
    public Initialize(): void {
        this.SetColumnsRows(5, 6);
        this.title = "Pyromancy";
        this.pointsAvailable = 9999;
        this.icon = IconPath.BTNFireBolt;
    }

    constructor(
        unit: Unit,
        slotManager: AbilitySlotManager,
        inputManager: InputManager,
        abilities: {
            firebolt: Firebolt, fieryEscape: FieryEscape, ignition: Ignition, fireball: Fireball, 
            hellTouch: HellTouch, fireShield: FireShield, igniteWeapon: IgniteWeapon,
            flameBlast: FlameBlast, backburn: Backburn
        }
    ) {
        super(unit, slotManager, inputManager);

        this.InitializeTier1(abilities.firebolt, abilities.fieryEscape, abilities.ignition, abilities.fireball, 
            abilities.hellTouch, abilities.fireShield, abilities.igniteWeapon);

        this.InitializeTier2(abilities.flameBlast, abilities.backburn);
        
    }

    InitializeTier2(flameBlast: FlameBlast, backburn: Backburn) {
        let dmgBonus = 7.5;

        // Second mastery
        let mastery2 = this.AddTalent(0, 3, {
            Name: "Pyromancy 2",
            Cost: 1,
            Description: `Unlocks abilities and increases all physical damage done by ${dmgBonus}%.`,
            Icon: IconPath.BTNFireBolt,
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

        // Flame Blast
        this.masterySecondAbilities.push(this.AddTalent(1, 3, {
            Name: flameBlast.name,
            Description: flameBlast.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            // Requirements: (tree, unit) => this.slotManager
            Icon: flameBlast.icon,
            IconDisabled: flameBlast.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 3);
                const talent = this.talents[3 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                let slot = this.GetSlot(flameBlast);
                Log.info("slot", slot)
                if (this.slotManager.ApplySlot(u, flameBlast, u => {
                    Log.info("Removing FLAME BLAST");
                    flameBlast.RemoveFromUnit(u);
                    this.SetTalentLevel(1, 3, 0);
                    return true;
                }, slot)) {
                    flameBlast.AddToUnit(u, slot >= 4);
                    this.SetTalentLevel(1, 3, 1);
                    return true;
                }
                return false;
            },
            Tag: flameBlast
        }));

        // Backburn
        this.masterySecondAbilities.push(this.AddTalent(2, 3, {
            Name: backburn.name,
            Description: backburn.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            // Requirements: (tree, unit) => this.slotManager
            Icon: backburn.icon,
            IconDisabled: backburn.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 3);
                const talent = this.talents[3 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                let slot = this.GetSlot(backburn);
                if (this.slotManager.ApplySlot(u, backburn, u => {
                    Log.info("Removing FLAME BLAST");
                    backburn.RemoveFromUnit(u);
                    this.SetTalentLevel(2, 3, 0);
                    return true;
                }, slot)) {
                    backburn.AddToUnit(u, slot >= 4);
                    this.SetTalentLevel(2, 3, 1);
                    return true;
                }
                return false;
            },
            Tag: flameBlast
        }));
    }

    InitializeTier1(firebolt: Firebolt, fieryEscape: FieryEscape, ignition: Ignition, fireball: Fireball,
        hellTouch: HellTouch, fireShield: FireShield, igniteWeapon: IgniteWeapon) {

        let dmgBonus = 7.5;
        let mastery1 = this.AddTalent(0, 5, {
            Name: "Pyromancy 1",
            Cost: 1,
            Description: `Unlocks abilities and increases all physical damage done by ${dmgBonus}%.`,
            Icon: IconPath.BTNFireBolt,
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

        // Firebolt
        this.masteryFirstAbilities.push(this.AddTalent(1, 5, {
            Name: firebolt.name,
            Description: firebolt.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            // Requirements: (tree, unit) => this.slotManager
            Icon: firebolt.icon,
            IconDisabled: firebolt.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 5);
                const talent = this.talents[5 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                let slot = this.GetSlot(firebolt);
                if (this.slotManager.ApplySlot(u, firebolt, u => {
                    Log.info("Removing FIREBOLT");
                    firebolt.RemoveFromUnit(u);
                    this.SetTalentLevel(1, 5, 0);
                    return true;
                }, slot)) {
                    firebolt.AddToUnit(u, slot >= 4);
                    this.SetTalentLevel(1, 5, 1);
                    return true;
                }
                return false;
            },
            Tag: firebolt
        }));

        // Fiery Escape 2, 5
        this.masteryFirstAbilities.push(this.AddTalent(2, 5, {
            Name: fieryEscape.name,
            Description: fieryEscape.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: fieryEscape.icon,
            IconDisabled: fieryEscape.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 5);
                const talent = this.talents[5 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                let slot = this.GetSlot(fieryEscape);
                if (this.slotManager.ApplySlot(u, fieryEscape, u => {
                    fieryEscape.RemoveFromUnit(u);
                    this.SetTalentLevel(2, 5, 0);
                    return true;
                }, slot)) {
                    fieryEscape.AddToUnit(u, slot >= 4);
                    this.SetTalentLevel(2, 5, 1);
                    return true;
                }
                return false;
            },
            Tag: fieryEscape
        }));

        // Ignition
        this.masteryFirstAbilities.push(this.AddTalent(3, 5, {
            Name: ignition.name,
            Description: ignition.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: ignition.icon,
            IconDisabled: ignition.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 5);
                const talent = this.talents[5 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                let slot = this.GetSlot(ignition);
                if (this.slotManager.ApplySlot(u, ignition, u => {
                    ignition.RemoveFromUnit(u);
                    this.SetTalentLevel(3, 5, 0);
                    return true;
                }, slot)) {
                    ignition.AddToUnit(u, slot >= 4);
                    this.SetTalentLevel(3, 5, 1);
                    return true;
                }
                return false;
            },
            Tag: ignition
        }));

        // Fireball
        this.masteryFirstAbilities.push(this.AddTalent(4, 5, {
            Name: fireball.name,
            Description: fireball.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: fireball.icon,
            IconDisabled: fireball.iconDisabled,
            Requirements: (tree, u) => {
                const lvl = this.GetAllocatedTalentLevel(0, 5);
                const talent = this.talents[5 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                if (this.slotManager.ApplySlot(u, fireball, u => {
                    fireball.RemoveFromUnit(u);
                    this.SetTalentLevel(4, 5, 0);
                    return true;
                })) {
                    fireball.AddToUnit(u);
                    this.SetTalentLevel(4, 5, 1);
                    return true;
                }
                return false;
            },
            Tag: fireball
        }));

        this.AddTalent(0, 4, {
            Name: "Pyromancy 1",
            IsLink: true,
            Dependency: { [up]: 1 },
        });

        // Hell Touch
        this.masteryFirstAbilities.push(this.AddTalent(1, 4, {
            Name: hellTouch.name,
            Description: hellTouch.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: hellTouch.icon,
            IconDisabled: hellTouch.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 4);
                const talent = this.talents[4 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                let slot = this.GetSlot(hellTouch);
                if (this.slotManager.ApplySlot(u, hellTouch, u => {
                    hellTouch.RemoveFromUnit(u);
                    this.SetTalentLevel(1, 4, 0);
                    return true;
                }, slot)) {
                    hellTouch.AddToUnit(u, slot >= 4);
                    this.SetTalentLevel(1, 4, 1);
                    return true;
                }
                return false;
            },
            Tag: hellTouch
        }));

        // Fire Shield
        this.masteryFirstAbilities.push(this.AddTalent(2, 4, {
            Name: fireShield.name,
            Description: fireShield.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: fireShield.icon,
            IconDisabled: fireShield.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 4);
                const talent = this.talents[4 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                let slot = this.GetSlot(fireShield);
                if (this.slotManager.ApplySlot(u, fireShield, u => {
                    fireShield.RemoveFromUnit(u);
                    this.SetTalentLevel(2, 4, 0);
                    return true;
                }, slot)) {
                    fireShield.AddToUnit(u, slot >= 4);
                    this.SetTalentLevel(2, 4, 1);
                    return true;
                }
                return false;
            },
            Tag: fireShield
        }));

        // Ignite Weapon
        this.masteryFirstAbilities.push(this.AddTalent(3, 4, {
            Name: igniteWeapon.name,
            Description: igniteWeapon.GenerateDescription(this.unit),
            Dependency: { [left]: -1 },
            Icon: igniteWeapon.icon,
            IconDisabled: igniteWeapon.iconDisabled,
            Requirements: () => {
                const lvl = this.GetAllocatedTalentLevel(0, 4);
                const talent = this.talents[4 * this.columns];
                return [lvl > 0, talent.name];
            },
            OnAllocate: u => {
                let slot = this.GetSlot(igniteWeapon);
                if (this.slotManager.ApplySlot(u, igniteWeapon, u => {
                    igniteWeapon.RemoveFromUnit(u);
                    this.SetTalentLevel(3, 4, 0);
                    return true;
                }, slot)) {
                    igniteWeapon.AddToUnit(u, slot >= 4);
                    this.SetTalentLevel(3, 4, 1);
                    return true;
                }
                return false;
            },
            Tag: igniteWeapon
        }));

        // // Battle Rush
        // this.masteryFirstAbilities.push(this.AddTalent(4, 4, {
        //     Name: battleRush.name,
        //     Description: battleRush.GenerateDescription(this.unit),
        //     Dependency: { [left]: -1 },
        //     Icon: battleRush.icon,
        //     IconDisabled: battleRush.iconDisabled,
        //     Requirements: () => {
        //         const lvl = this.GetAllocatedTalentLevel(0, 4);
        //         const talent = this.talents[4 * this.columns];
        //         return [lvl > 0, talent.name];
        //     },
        //     OnAllocate: u => {
        //         if (this.slotManager.ApplySlot(u, battleRush, u => {
        //             battleRush.RemoveFromUnit(u);
        //             this.SetTalentLevel(4, 4, 0);
        //         })) {
        //             battleRush.AddToUnit(u);
        //             this.SetTalentLevel(4, 4, 1);
        //             return true;
        //         }
        //         return false;
        //     },
        //     Tag: battleRush
        // }));
    }
}