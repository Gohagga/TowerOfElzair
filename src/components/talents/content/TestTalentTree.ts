import { TalentTree } from "../TalentTree";
import ILogger from "components/logger/ILogger";
import { Unit } from "w3ts/index";

export class TestTalentTree extends TalentTree {
    
    constructor(
        logger: ILogger,
        unit: Unit,
        columns: number,
        rows: number
    ) {
        logger.info("super start");
        super(logger, unit, columns, rows);
        logger.info("super end");
    }

    public Initialize(): void {
        this.logger.info("initialize tree");
        this.title = "Test talent tree";
    }
}