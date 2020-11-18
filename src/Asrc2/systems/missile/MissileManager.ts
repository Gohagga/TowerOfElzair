import { Unit } from "Asrc2/models/Unit";
import { Timer } from "w3ts/index";
import { Missile } from "./Missile";
import { MissileType } from "./MissileType";

export class MissileManager {

    private instances: Record<number, Missile> = {};
    private updateList: Missile[] = [];

    private timer: Timer = new Timer();

    constructor() {
        this.timer.start(0.03, true, () => this.Update());
    }

    GetType(unit: Unit): MissileType {
        let id = unit.id;
        if (id in this.instances) return this.instances[unit.id].type
        return MissileType.None;
    }

    Fire(missile: Missile) {
        if (missile.id in this.instances) {
            // Handle destroy logic?
        }

        this.instances[missile.id] = missile;
        this.updateList.push(missile);
    }

    Update() {

        let last = this.updateList.length - 1;
        for (let i = this.updateList.length - 1; i >= 0; i--) {

            let m = this.updateList[i];
            if (m.Update) m.Update();
            if (m.alive == false) {

                print(last);
                this.updateList[i] = this.updateList[--last];
                this.updateList.pop();
                delete this.instances[m.id];
            }
        }
    }
}