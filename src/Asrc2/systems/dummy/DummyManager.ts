import { Unit } from "Asrc2/models/Unit";
import { MapPlayer } from "w3ts/index";

export class DummyManager {

    constructor(
        private owner: MapPlayer,
        private unitId: number,
    ) {
        
    }

    GetMissileDummy() {
        let dummy = new Unit(this.owner, this.unitId, 0, 0, 0, 0);
        // dummy.addAbility(this.abilityId);
        // dummy.setAbilityLevel(this.abilityId, this.level);
        // dummy.removeGuardPosition();
        // dummy.applyTimedLife(FourCC('B000'), this.config.dummyDuration);
        return dummy;
    }
}