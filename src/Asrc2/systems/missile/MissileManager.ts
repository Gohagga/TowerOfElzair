import { Unit } from "Asrc2/models/Unit";
import { Timer } from "w3ts/index";
import { IMissile } from "./IMissile";
import { Missile } from "./Missile";
import { MissileType } from "./MissileType";

export class MissileManager {

    private instances: Record<number, IMissile> = {};
    private updateList: IMissile[] = [];

    private timer: Timer = new Timer();

    constructor() {
        this.timer.start(0.03, true, () => this.Update());
    }

    GetType(unit: Unit): MissileType {
        let id = unit.id;
        if (id in this.instances) return this.instances[id].type
        return MissileType.None;
    }

    GetMissile(unit: Unit): IMissile | null {
        let id = unit.id;
        if (id in this.instances) return this.instances[id];
        return null;
    }

    GetMissiles(filter: (missile: IMissile) => boolean) {
        let retVal: IMissile[] = [];
        for (let m of this.updateList) {
            if (filter(m))
                retVal.push(m);
        }
        return retVal;
    }

    GetMissilesInRange(x: number, y: number, range: number, filter?: (missile: IMissile) => boolean) {
        let retVal: IMissile[] = [];
        for (let m of this.updateList) {
            let dist = (x-m.x)*(x-m.x) + (y-m.y)*(y-m.y);
            if (dist < range * range) {
                if (!filter || filter(m))
                    retVal.push(m);
            }
        }
        return retVal;
    }

    Fire(missile: IMissile) {
        if (missile.id in this.instances) {
            // Handle destroy logic?
        }

        print(missile.type);

        this.instances[missile.id] = missile;
        this.updateList.push(missile);
    }

    Update() {

        let last = this.updateList.length;
        for (let i = this.updateList.length - 1; i >= 0; i--) {

            let m = this.updateList[i];
            if (m.Update) m.Update();
            if (m.alive == false) {

                if (m.Destroy) m.Destroy();
                this.updateList[i] = this.updateList[--last];
                this.updateList.pop();
                delete this.instances[m.id];
            }
        }
    }
}