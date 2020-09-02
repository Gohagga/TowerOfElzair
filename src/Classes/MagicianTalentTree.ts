import { TalentTree } from "UI/TalentTree/TalentTree";
import { IconPath } from "iconList";
import { MagicMissiles, MagicMissilesConfig } from "Spells/MagicMissiles";
import { Abilities } from "customConfig";

export class MagicianTalentTree extends TalentTree {
    readonly Id: number = 0;
    readonly Columns: number = 5;
    readonly Rows: number = 5;

    constructor(unit: unit, load?: string) {
        super(unit, load);
        
        this.title = "Fire Mage Talent tree";
        this.pointsAvailable = 999;

        const magicMissiles = this.AddTalent(0, 3, {
            Name: "Magic Missiles",
            Description: "Launches multiple arcane bolts that always hit their target.\nEach missile deals magic damage.",
            Icon: IconPath.BTNDispelMagic,
            Requirements: (tree: TalentTree, unit: unit) => [false, ""],
            OnActivate: (unit: unit) => { 
                UnitAddAbility(unit, Abilities.MagicMissiles.Id);
                MagicMissiles.UpdateUnitAbility(unit);
            },
            StartingLevel: 1,
        });

        // Power
        this.AddMultiRankTalent(1, 3, 5, (i: number) => {
            const count = [ 1, 1, 2, 2, 3 ];
            return {
                Name: "Power",
                Description: `Your Magic Missiles does ${i * 3}% more damage and shoots additional ${count[i - 1]} missiles.`,
                Icon: IconPath.BTNSpellSteal,
                Dependency: { left: 1 },
                OnActivate: (unit: unit) => {
                    MagicMissiles.UpdateUnitConfig<MagicMissilesConfig>(unit,
                        (cfg) => {
                            cfg.MissileCount = count[i - 1] + 2;
                            cfg.Damage += 0.03;
                        });
                    MagicMissiles.UpdateUnitAbility(unit);
                },
            }
        });

        // Cooldown
        this.AddMultiRankTalent(2, 3, 5, (i: number) => {
            const bonus = 0.5;
            return {
                Name: "Cooldown",
                Description: `Your Magic Missiles's cooldown is reduced by ${(i*bonus)}.`,
                Icon: IconPath.BTNPurge,
                Dependency: { left: 0 },
                OnActivate: (unit: unit) => {
                    print(i * bonus, "cd reduction", i)
                    MagicMissiles.UpdateUnitConfig<MagicMissilesConfig>(unit,
                        (cfg) => cfg.CooldownRed = bonus * i );
                    MagicMissiles.UpdateUnitAbility(unit);
                }
            }
        });

        const iceBolt = this.AddTalent(0, 2, {
            Name: "IceBolt",
            Description: "Pierces the target with a bolt of ice, dealing magic damage and  slowing them temporarily.",
            Icon: IconPath.BTNColdArrows,
            OnActivate: (unit: unit) => { 
                UnitAddAbility(unit, Abilities.IceBolt.Id);
            },
            StartingLevel: 1
        });

        // Power
        this.AddMultiRankTalent(1, 2, 3, (i: number) => {
            const bonus = 8;
            return {
                Name: "Power",
                Description: "Your Scorch has "+(i*10)+"% increased chance to critically strike.",
                Icon: IconPath.BTNSpellSteal,
                Dependency: { left: 1 },
                OnActivate: (unit: unit) => null
                    // Scorch.UpdateUnitConfig<ScorchConfig>(unit, (cfg) => cfg.BonusCrit = (i*10))
            }
        });

        // Cooldown
        this.AddMultiRankTalent(2, 2, 3, (i: number) => {
            const bonus = 8;
            return {
                Name: "Cooldown",
                Description: "Your Scorch has "+(i*10)+"% increased chance to critically strike.",
                Icon: IconPath.BTNPurge,
                Dependency: { left: 0 },
                OnActivate: (unit: unit) => null
                    // Scorch.UpdateUnitConfig<ScorchConfig>(unit, (cfg) => cfg.BonusCrit = (i*10))
            }
        });

        this.SaveTalentRankState()
    }
}