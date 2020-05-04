import { TalentTree } from "../TalentTree";
import ILogger from "components/logger/ILogger";
import { Unit } from "w3ts/index";
import { IconPath } from "IconPath";
import { TalentDepType } from "../TalentDependency";


const { left, up, right, down } = TalentDepType;

export class TestTalentTree extends TalentTree {
    
    constructor(
        logger: ILogger,
        unit: Unit,
        columns: number,
        rows: number
    ) { super(logger, unit, columns, rows); }

    public Initialize(): void {
        this.logger.info("initialize tree");
        this.title = "Test talent tree " + this.rows + " - " + this.columns;

        this.pointsAvailable = 9999;

        if (this.columns == 2 && this.rows == 4) {
            this.logger.info("Making talent tree,")
            this.GetTalentsForCol2Row4();
        }
    }

    GetTalentsForCol2Row4() {
        
        this.AddTalent(0, 0, {
            Name: "Tier 1 Peasant",
            Description: "Summons a loyal peasant into your service.",
            Icon: IconPath.BTNPeasant,
            OnActivate: target => {
                new Unit(target.owner, FourCC('hpea'), target.x, target.y, target.facing);
            }
        });

        this.AddTalent(1, 0, {
            Name: "Tier 1 Peasant",
            Description: "Summons a loyal peasant into your service.",
            Icon: IconPath.BTNPeasant,
            Dependency: { [left]: 1 },
            OnActivate: target => {
                new Unit(target.owner, FourCC('hpea'), target.x, target.y, target.facing);
            }
        });

        this.AddTalent(0, 1, {
            Name: "Tier 1 Footman",
            Description: "Summons a loyal footman into your service.",
            Icon: IconPath.BTNFootman,
            Dependency: { [down]: 1 },
            OnActivate: target => {
                new Unit(target.owner, FourCC('hfoo'), target.x, target.y, target.facing);
            }
        });

        this.AddTalent(1, 1, {
            Name: "Tier 1 Footman",
            Description: "Summons a loyal footman into your service.",
            Icon: IconPath.BTNFootman,
            Dependency: { [down]: 1, [left]: 1 },
            OnActivate: target => {
                new Unit(target.owner, FourCC('hfoo'), target.x, target.y, target.facing);
            }
        });

        this.AddTalent(0, 2, {
            Name: "Tier 2 Peasant",
            Description: "Summons two loyal peasants into your service.",
            Icon: IconPath.BTNPeasant,
            Dependency: { [down]: 1 },
            OnActivate: target => {
                new Unit(target.owner, FourCC('hpea'), target.x, target.y, target.facing);
                new Unit(target.owner, FourCC('hpea'), target.x, target.y, target.facing);
            }
        });

        this.AddTalent(1, 2, {
            Name: "Tier 2 Peasant",
            Description: "Summons two loyal peasants into your service.",
            Icon: IconPath.BTNPeasant,
            Dependency: { [down]: 1, [left]: 1 },
            OnActivate: target => {
                new Unit(target.owner, FourCC('hpea'), target.x, target.y, target.facing);
                new Unit(target.owner, FourCC('hpea'), target.x, target.y, target.facing);
            }
        });

        this.AddTalent(0, 3, {
            Name: "Tier 2 Footman",
            Description: "Summons two loyal footmen into your service.",
            Icon: IconPath.BTNFootman,
            Dependency: { [down]: 1 },
            OnActivate: target => {
                new Unit(target.owner, FourCC('hfoo'), target.x, target.y, target.facing);
                new Unit(target.owner, FourCC('hfoo'), target.x, target.y, target.facing);
            }
        });

        this.AddTalent(1, 3, {
            Name: "Tier 2 Footman",
            Description: "Summons two loyal footmen into your service.",
            Icon: IconPath.BTNFootman,
            Dependency: { [down]: 1, [left]: 1 },
            OnActivate: target => {
                new Unit(target.owner, FourCC('hfoo'), target.x, target.y, target.facing);
                new Unit(target.owner, FourCC('hfoo'), target.x, target.y, target.facing);
            }
        });
    }
}
