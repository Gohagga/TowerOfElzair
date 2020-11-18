import { Unit } from "Asrc2/models/Unit";
import { Log } from "../log/Log";
import { MissileType } from "./MissileType";

export class Missile {
    
    private _id: number;
    private _onUpdate?: (missile: Missile) => void;
    private _onDestroy?: (missile: Missile) => void;

    public alive: boolean = true;

    private missileBehavior = "none";

    private dx: number = -1;
    private dy: number = -1;
    private distance: number = -1;
    public angle: number = 0;

    constructor(
        private unit: Unit,
        public speed: number,
        public type: MissileType
    ) {
        this._id = unit.id;
        this.speed *= 0.03;
    }

    public get id() {
        return this._id;
    }

    Build() {

        Log.info("build", 1)
        // If missile travels certain distance
        if (this.distance != -1 && this.dx != -1 && this.dy != -1) {

        Log.info("build", 2)

            if (this._onUpdate && this._onDestroy) {

        Log.info("build", 2.1)

                let onDestroy = this._onDestroy;
                let onUpdate = this._onUpdate;
                this.Update = () => {
                    this.unit.x += this.dx;
                    this.unit.y += this.dy;
                    this.distance -= this.speed;
                    if (this.distance < 0) {
                        this.alive = false;
                        onDestroy(this);
                        this.unit.kill();
                        // tim.destroy();
                    }
                    onUpdate(this);
                }
            } else if (this._onDestroy) {

                Log.info("This one should run");
                // Only ondestroy case
                let onDestroy = this._onDestroy;
                this.Update = () => {
                    this.unit.x += this.dx;
                    this.unit.y += this.dy;
                    this.distance -= this.speed;
                    if (this.distance < 0) {
                        this.alive = false;
                        onDestroy(this);
                        this.unit.kill();
                    }
                }
            } else if (this._onUpdate) {
                // Only onupdate case

        Log.info("build", 2.3)

                let onUpdate = this._onUpdate;
                this.Update = () => {
                    this.unit.x += this.dx;
                    this.unit.y += this.dy;
                    this.distance -= this.speed;
                    if (this.distance < 0) {
                        this.alive = false;
                        this.unit.kill();
                    }
                    onUpdate(this);
                }
            }
        } else {
            Log.info("Destination not set!!!");
        }
        return this;
    }

    Update: () => void = () => null;

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

        return this.Build();
    }
}