import { IDummySpellProvider } from "providers/interfaces/IDummySpellProvider";
import { Unit } from "w3ts";

export class InstancedDummySpellProvider implements IDummySpellProvider {

    dummy: Unit;

    constructor(
        private readonly config: IDummySpellProvider.Config,
        private readonly order: number | string,
        private readonly abilityId: number,
        private readonly level: number = 1)
    {
        this.dummy = this.RegenerateDummy();
    }

    public RegenerateDummy(): Unit {
 
        this.dummy = new Unit(this.config.dummyOwningPlayer, this.config.dummyUnitId, 0, 0, 0, 0);
        this.dummy.addAbility(this.abilityId);
        this.dummy.setAbilityLevel(this.abilityId, this.level);
        this.dummy.removeGuardPosition();
        this.dummy.applyTimedLife(FourCC('B000'), this.config.dummyDuration);
        // this.ability = this.dummy.getAbility(abilityId);
        return this.dummy;
    }

    // Modify(cb: (ability: ability) => void): void {
    //     cb(this.ability);
    // };

    CastAt(target: Unit): void {
        this.dummy.issueTargetOrder(this.order, target);
    }

    CastAtTargets(targets: Unit[]): void {
        for (let t of targets) {
            this.dummy.issueTargetOrder(this.order, t);
        }
    }
}