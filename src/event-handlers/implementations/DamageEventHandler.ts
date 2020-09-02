import { IDamageEventHandler, IDamageEventSub, IDamageEvent, DamageEventData } from "../interfaces/IDamageEventHandler";
import { ActionOrder } from "../../systems/damage/ActionOrder";
import { Unit } from "w3ts/index";
import ILogger from "systems/logger/ILogger";

export class DamageEventHandler implements IDamageEventHandler<ActionOrder> {

    private _subscriptions: DamageEventSub[] = [];
    private logger: ILogger;

    constructor(svc: { 
        ILogger: ILogger
    }) {
        this.logger = svc.ILogger;
    }
    
    Subscribe(type: ActionOrder, callback: (e: IDamageEvent) => void): IDamageEventSub;
    Subscribe(type: ActionOrder, callback: (e: IDamageEvent) => void, filter: { source?: Unit, target?: Unit }): IDamageEventSub;
    Subscribe(type: ActionOrder, callback: (e: IDamageEvent) => void, filter?: { source?: Unit, target?: Unit }): IDamageEventSub {
        
        let sub: DamageEventSub;
        // If filter exists, apply the thing
        if (filter && filter.source && filter.target) {
            let src = filter.source.handle;
            let targ = filter.target.handle;
            sub = new DamageEventSub(Number(type), (e: IDamageEvent) => {
                if (filter.source?.handle == GetEventDamageSource() && filter.target?.handle == BlzGetEventDamageTarget())
                    return callback(e);
                return true;
            });
        } else if (filter && filter.source) {
            let src = filter.source.handle;
            sub = new DamageEventSub(Number(type), (e: IDamageEvent) => {
                if (src == GetEventDamageSource())
                    return callback(e);
                return true;
            });
        } else if (filter && filter.target) {
            let targ = filter.target.handle;
            sub = new DamageEventSub(Number(type), (e: IDamageEvent) => {
                if (targ == BlzGetEventDamageTarget())
                    return callback(e);
                return true;
            });
        } else {
            // If filter doesn't exist, just register the callback directly
            sub = new DamageEventSub(Number(type), callback);
        }

        // Insert the damage action into the action list
        this._subscriptions.push(sub);

        // Sort the damage actions based on priority
        this._subscriptions = this._subscriptions.sort((a, b) => a.priority - b.priority);

        return sub;
    }

    Register(data: DamageEventData) {
        
        if (!this._subscriptions || this._subscriptions.length == 0) return;
        let remaining: DamageEventSub[] = [];

        for (let sub of this._subscriptions) {

            let event: IDamageEvent = {
                source: data.source,
                target: data.target,
                type: data.type,
                amount: data.amount,
                subscription: sub
            }

            // Execute the callback.
            if (sub.alive) {
                sub.callback(event)
                remaining.push(sub);
            }
        }
        // Save the remaining to this._subscriptions
        this._subscriptions = remaining;
    }
}

export class DamageEventSub implements IDamageEventSub {
    
    private _priority: number;
    public callback: (e: IDamageEvent) => void;

    public alive = true;
    
    constructor(priority: number, callback: (e: IDamageEvent) => void) {
        this._priority = priority;
        this.callback = (e: IDamageEvent) => callback(e);
    }

    Unregister(): void {
        this.alive = false;
    }

    get priority() {
        return this._priority;
    }
    set priority(v: number) {
        this._priority = v;
    }
}