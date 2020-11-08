import { IDamageEvent, IDamageEventHandler } from "events/damage/IDamageEventHandler";
import { ActionOrder } from "systems/damage/ActionOrder";
import { Timer, Unit } from "w3ts/index";

export class Momentum {

    private _damageEvent: IDamageEventHandler<ActionOrder>;
    private _instances: Record<number, UnitMomentum> = {};

    constructor(svc: {
        IDamageEventHandler: IDamageEventHandler<ActionOrder>
    }) {
        this._damageEvent = svc.IDamageEventHandler;

        this._damageEvent.SubscribeTo(ActionOrder.Autoattack, (e: IDamageEvent) => {
            
            // Get the damage source unit
            const id = e.source.id;
            // Reset its momentum
            if (id in this._instances) {
                this.Reset(id);
            }
        });
    }

    public Reset(unitId: number) {
        const instance = this._instances[unitId];
        instance.current = instance.minimum;
        // this._instances[unitId] = instance;
    }

    public Register(unit: Unit, momentum: UnitMomentum) {
        this._instances[unit.id] = momentum;
    }
}

export class UnitMomentum {
    minimum: number = 0;
    current: number = 0;
    max: number = 1;

    unit: Unit;

    timer = new Timer();

    constructor(unit: Unit) {
        this.unit = unit;
        this.timer.start(0.1, true, () => {
            this.current += 0.045;

            let max = this.unit.maxLife;
            this.unit.life = max * 0.5 + (this.current / this.max) * max * 0.5;
        });
    }
}