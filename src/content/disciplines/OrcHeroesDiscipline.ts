import { Discipline } from "./Discipline";
import { Unit } from "w3ts";
import ILogger from "../../systems/logger/ILogger";
import { UnitSlotManager } from "../../systems/slottable/UnitSlotManager";
import { AbilitySlot } from "../../systems/ability/AbilitySlot";
import { Ability } from "../../systems/ability/Ability";
import { IAbility } from "systems/ability/IAbility";
import { IconPath } from "IconPath";
import { TalentDepType } from "systems/talents/TalentDependency";

const { left, up, right, down } = TalentDepType;

export class OrcHeroesDiscipline extends Discipline {
    
    public Initialize(): void {
        
        this.SetColumnsRows(5, 4);
        this.title = "Orc Discipline";
        this.pointsAvailable = 9999;
        this.icon = IconPath.BTNGrunt;
    }

    constructor(
        unit: Unit,
        logger: ILogger,
        slotManager: UnitSlotManager<AbilitySlot>,
        abilities: Record<string, IAbility>
    ) {
        super(unit, logger, slotManager, abilities);

        let mastery1 = this.AddTalent(0, 3, {
            Name: "Blademaster",
            Cost: 1,
            Description: `Unlocks abilities of the Blademaster.`,
            Icon: IconPath.BTNHeroBlademaster,
            OnAllocate: u => {
                for (let t of this.masteryFirstAbilities) {
                    if (t.dependency) t.dependency[left] = 0;
                }
            },
            OnDeallocate: u => {
                for (let t of this.masteryFirstAbilities) {
                    if (t.dependency) t.dependency[left] = -1;
                    this.slotManager.RemoveSlot(this.unit, (t.tag as IAbility).slot);
                }
            }
        });

        let mastery2 = this.AddTalent(0, 2, {
            Name: "Far Seer",
            Cost: 1,
            Dependency: { [up]: 1 },
            Description: `Unlocks abilities of the Far Seer.`,
            Icon: IconPath.BTNHeroFarseer,
            OnAllocate: u => {
                for (let t of this.masterySecondAbilities) {
                    if (t.dependency) t.dependency[left] = 0;
                }
            },
            OnDeallocate: u => {
                for (let t of this.masterySecondAbilities) {
                    if (t.dependency) t.dependency[left] = -1;
                    this.slotManager.RemoveSlot(this.unit, (t.tag as IAbility).slot);
                }
            }
        });

        let mastery3 = this.AddTalent(0, 1, {
            Name: "Tauren Cheiftain",
            Cost: 1,
            Dependency: { [up]: 1 },
            Description: `Unlocks abilities of the Tauren Cheiftain.`,
            Icon: IconPath.BTNHeroTaurenChieftain,
            OnAllocate: u => {
                for (let t of this.masteryThirdAbilities) {
                    if (t.dependency) t.dependency[left] = 0;
                }
            },
            OnDeallocate: u => {
                for (let t of this.masteryThirdAbilities) {
                    if (t.dependency) t.dependency[left] = -1;
                    this.slotManager.RemoveSlot(this.unit, (t.tag as IAbility).slot);
                }
            }
        });

        let mastery4 = this.AddTalent(0, 0, {
            Name: "Shadow Hunter",
            Cost: 1,
            Dependency: { [up]: 1 },
            Description: `Unlocks abilities of the Shadow Hunter.`,
            Icon: IconPath.BTNShadowHunter,
            OnAllocate: u => {
                for (let t of this.masteryFourthAbilities) {
                    if (t.dependency) t.dependency[left] = 0;
                }
            },
            OnDeallocate: u => {
                for (let t of this.masteryFourthAbilities) {
                    if (t.dependency) t.dependency[left] = -1;
                    this.slotManager.RemoveSlot(this.unit, (t.tag as IAbility).slot);
                }
            }
        });

        for (let i = 0; i < 4; i++) {
            for (let j = 4; j >= 1; j--) {

                let x = i;
                let y = j;
                let ability = this.abilities[abilityList.pop() || ""];

                let name = GetAbilityName(ability.id);
                let desc = BlzGetAbilityResearchExtendedTooltip(ability.id, 0);
                let icon = BlzGetAbilityIcon(ability.id);
                
                let mastery = [
                    this.masteryFourthAbilities,
                    this.masteryThirdAbilities,
                    this.masterySecondAbilities,
                    this.masteryFirstAbilities
                ][x];

                mastery.push(this.AddTalent(y, x, {
                    Name: name,
                    Description: desc,
                    Dependency: { [left]: -1 },
                    Requirements: (tree, unit) => {
                        let lvl = this.GetAllocatedTalentLevel(0, x);
                        let talent = this.talents[x * this.columns];
                        return [lvl > 0, talent.name];
                    },
                    Icon: ability.icon || icon,
                    IconDisabled: ability.iconDisabled,
                    OnAllocate: u => {
                        this.slotManager.ApplySlot(u, ability.slot, u => {
                            ability.RemoveFromUnit(u);
                            this.SetTalentLevel(y, x, 0);
                        });
                        ability.AddToUnit(u);
                        this.SetTalentLevel(y, x, 1);
                    },
                    Tag: ability
                }));
            }
        }
    }
}

const abilityList: string[] = [
    "WindWalk", "MirrorImage", "CriticalStrike", "Bladestorm",
    "ChainLightning", "FarSight", "FeralSpirit", "Earthquake",
    "Shockwave", "WarStomp", "EnduranceAura", "Reincarnation",
    "HealingWave", "SerpentWard", "Hex", "BigBadVoodoo"
]