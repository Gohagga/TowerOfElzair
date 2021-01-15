import { Unit } from "Asrc2/models/Unit";
import { Log } from "../log/Log";
import { IMissile } from "./IMissile";
import { MissileType } from "./MissileType";

export class Missile implements IMissile {
    
    private _id: number;
    private _onUpdate?: (missile: Missile) => void;
    private _onDestroy?: (missile: Missile) => void;

    public alive: boolean = true;

    private dx: number = -1;
    private dy: number = -1;
    private distance: number = -1;
    public angle: number = 0;

    public x: number;
    public y: number;
    public type: MissileType;
    public speed: number;
    public target?: Unit;

    constructor(
        private unit: Unit,
        speed: number,
        type: MissileType,
    ) {
        this._id = unit.id;
        print(speed);
        this.speed = speed * 0.03;
        this.type = type;
        this.x = unit.x;
        this.y = unit.y;

        print(type, this.type, "type", speed);
    }

    public get id() {
        return this._id;
    }

    public get point() {
        return this.unit.point;
    }

    Build() {

        this.x = this.unit.x;
        this.y = this.unit.y;

        // If missile travels certain distance
        if (this.distance != -1 && this.dx != -1 && this.dy != -1) {

            if (this._onUpdate && this._onDestroy) {
                let onDestroy = this._onDestroy;
                let onUpdate = this._onUpdate;
                this.Update = () => {
                    this.x += this.dx;
                    this.y += this.dy;
                    this.unit.x = this.x;
                    this.unit.y = this.y;
                    this.distance -= this.speed;
                    if (this.distance < 0) {
                        this.alive = false;
                    }
                    onUpdate(this);
                }

                this.Destroy = () => {
                    RemoveUnit(this.unit.handle);
                    onDestroy(this);
                }
            } else if (this._onDestroy) {

                // Only ondestroy case
                let onDestroy = this._onDestroy;
                this.Update = () => {
                    this.x += this.dx;
                    this.y += this.dy;
                    this.unit.x = this.x;
                    this.unit.y = this.y;
                    this.distance -= this.speed;
                    if (this.distance < 0) {
                        this.alive = false;
                    }
                }
                this.Destroy = () => {
                    RemoveUnit(this.unit.handle);
                    onDestroy(this);
                }
            } else if (this._onUpdate) {
                // Only onupdate case

                let onUpdate = this._onUpdate;
                this.Update = () => {
                    this.x += this.dx;
                    this.y += this.dy;
                    this.unit.x = this.x;
                    this.unit.y = this.y;
                    this.distance -= this.speed;
                    if (this.distance < 0) {
                        this.alive = false;
                    }
                    onUpdate(this);
                }
                this.Destroy = () => {
                    RemoveUnit(this.unit.handle);
                }
            }
        } else {
            Log.info("Destination not set!!!");
        }
        return this;
    }

    Update: () => void = () => null;

    Destroy: () => void = () => null;

    OnUpdate(action: (this: any, missile: Missile) => void) {
        this._onUpdate = action.bind(this);
        return this;
    }

    OnDestroy(action: (this: any, missile: Missile) => void) {
        this._onDestroy = action.bind(this);
        return this;
    }

    SetDestination(x: number, y: number, distance?: number) {
        let speed = this.speed;
        this.angle = math.atan(y - this.unit.y, x - this.unit.x);

        if (!distance) {
            let x1x2 = x - this.unit.x;
            let y1y2 = y - this.unit.y;
            distance = (x1x2 * x1x2 + y1y2 * y1y2)^0.5;
        }

        this.dx = math.cos(this.angle) * speed;
        this.dy = math.sin(this.angle) * speed;
        this.distance = distance;

        print(this.type, "type");
        return this.Build();
    }
}