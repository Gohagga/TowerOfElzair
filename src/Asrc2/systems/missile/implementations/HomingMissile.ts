import { Unit } from "Asrc2/models/Unit";
import { Effect, Point } from "w3ts/index";
import { IMissile } from "../IMissile";
import { MissileType } from "../MissileType";

export class HomingMissile implements IMissile {
    
    private _id: number;
    private _onUpdate?: (missile: HomingMissile) => void;
    private _onDestroy?: (missile: HomingMissile) => void;

    public x: number;
    public y: number;
    public z: number;
    public speed: number;
    public type: number;
    public target: Unit;

    public arc: number = 0;
    private travelled: number = 0;
    private distance: number = 0;

    public get id() {
        return this._id;
    }
    public alive: boolean = true;

    constructor(
        private unit: Unit,
        target: Unit,
        z: number,
        speed: number,
        type: MissileType,
        public collision: number,
        public getTarget: () => { x: number, y: number },
        private effect?: Effect,
    ) {
        this._id = unit.id;
        this.target = target;
        this.speed = speed * 0.03;
        this.type = type;
        this.x = unit.x;
        this.y = unit.y;
        this.z = z;

        this.distance = DistanceBetweenPoints(unit.point.handle, new Point(this.x, this.y).handle);
    }

    Build() {

        if (this._onUpdate) {

            let onUpdate = this._onUpdate;
            this.Update = () => {
                
                // Recalculate dx/dy
                let { x, y } = this.getTarget();

                // Check for hit¸
                let dd = (x - this.x)*(x - this.x) + (y - this.y)*(y - this.y);
                if (dd < this.collision * this.collision) {
                    this.alive = false;
                    return;
                }

                // Move the missile
                let angle = math.atan(y - this.y, x - this.x);
                let dx = this.speed * math.cos(angle);
                let dy = this.speed * math.sin(angle);
                
                this.x += dx;
                this.y += dy;
                // this.z += 0;
                this.unit.x = this.x;
                this.unit.y = this.y;

                if (this.effect) {
                    this.effect.x = this.x;
                    this.effect.y = this.y;
                    this.effect.z = this.z;
                    this.effect.setYaw(angle);

                    // if (this.arc != 0) {
                    //     let cx = (x + this.x) * 0.5;
                    //     let cy = (y + this.y) * 0.5;
                    //     let cz = this.arc;
                    // }
                }

                onUpdate(this);
            }
        } else {
            let onUpdate = this._onUpdate;
            this.Update = () => {
                
                // Recalculate dx/dy
                let { x, y } = this.getTarget();

                // Check for hit
                let dd = (x - this.x)*(x - this.x) + (y - this.y)*(y - this.y);
                if (dd < this.collision * this.collision) {
                    this.alive = false;
                    return;
                }

                // Move the missile
                let angle = math.atan(y - this.y, x - this.x);
                let dx = this.speed * math.cos(angle);
                let dy = this.speed * math.sin(angle);
                
                this.x += dx;
                this.y += dy;
                // this.z += 0;
                this.unit.x = this.x;
                this.unit.y = this.y;

                if (this.effect) {
                    this.effect.x = this.x;
                    this.effect.y = this.y;
                    this.effect.z = this.z;
                    this.effect.setYaw(angle);
                }
            }
        }

        if (this._onDestroy) {

            let onDestroy = this._onDestroy;
            this.Destroy = () => {
                if (this.effect) this.effect.destroy();
                RemoveUnit(this.unit.handle);
                onDestroy(this);
            }
        } else {
            this.Destroy = () => {
                if (this.effect) this.effect.destroy();
                RemoveUnit(this.unit.handle);
            }
        }
        return this;
    }

    OnUpdate(action: (this: any, missile: HomingMissile) => void) {
        this._onUpdate = action.bind(this);
        return this;
    }

    OnDestroy(action: (this: any, missile: HomingMissile) => void) {
        this._onDestroy = action.bind(this);
        return this;
    }
    
    Update: () => void = () => null;

    Destroy: () => void = () => null;

}