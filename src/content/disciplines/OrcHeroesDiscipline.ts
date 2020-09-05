import { Discipline } from "./Discipline";
import { Unit } from "w3ts";
import ILogger from "../../systems/logger/ILogger";
import { UnitSlotManager } from "../../systems/slottable/UnitSlotManager";
import { AbilitySlot } from "../../systems/ability/AbilitySlot";
import { Ability } from "../../systems/ability/Ability";
import { IAbility } from "systems/ability/IAbility";
import { IconPath } from "IconPath";

export class OrcHeroesDiscipline extends Discipline {
    
    public Initialize(): void {
        
        this.SetColumnsRows(4, 4);
        this.title = "Human Discipline";
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

        for (let i = 0; i < 4; i++) {
            for (let j = 3; j >= 0; j--) {

                let x = i;
                let y = j;
                let ability = this.abilities[abilityList.pop() || ""];

                let name = GetAbilityName(ability.id);
                let desc = BlzGetAbilityResearchExtendedTooltip(ability.id, 0);
                let icon = BlzGetAbilityIcon(ability.id);

                this.AddTalent(y, x, {
                    Name: name,
                    Description: desc,
                    Icon: ability.icon || icon,
                    IconDisabled: ability.iconDisabled,
                    OnAllocate: u => {
                        this.slotManager.ApplySlot(u, ability.slot, u => {
                            ability.RemoveFromUnit(u);
                            this.SetTalentLevel(y, x, 0);
                        });
                        ability.AddToUnit(u);
                        this.SetTalentLevel(y, x, 1);
                    }
                });
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