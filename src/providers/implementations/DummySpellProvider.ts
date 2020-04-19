import { IDummySpellProvider } from "providers/interfaces/IDummySpellProvider";
import { Unit } from "w3ts";

export class DummySpellProvider implements IDummySpellProvider {

    private readonly dummy: Unit;
    private readonly ability: ability;

    constructor(
        private readonly config: DummySpellProvider.Config,
        private readonly order: number | string,
        abilityId: number,
        level: number = 1)
    {
        this.dummy = new Unit(config.dummyOwningPlayer, config.dummyUnitId, 0, 0, 0, 0);
        this.dummy.addAbility(abilityId);
        this.dummy.setAbilityLevel(abilityId, level);
        this.dummy.removeGuardPosition();
        this.ability = this.dummy.getAbility(abilityId);
    }

    Modify(cb: (ability: ability) => void): void {
        cb(this.ability);
    };

    CastAt(target: Unit): void {
        this.dummy.setPosition(target.x, target.y);
        this.dummy.issueTargetOrder(this.order, target);
    }

    CastAtTargets(targets: Unit[]): void {
        for (let t of targets) {
            this.dummy.setPosition(t.x, t.y);
            this.dummy.issueTargetOrder(this.order, t);
        }
    }
}

export namespace DummySpellProvider {
    export interface Config {
        dummyOwningPlayer: number,
        dummyUnitId: number,
    }
}
export default DummySpellProvider;