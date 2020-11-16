import { Unit } from "Asrc2/models/Unit";
import { Log } from "Asrc2/systems/log/Log";
import { ActionOrder } from "../../../systems/damage/ActionOrder";
import { DamageEvent } from "./DamageEvent";
import { DamageEventSubscription } from "./DamageEventSubscription";
import { IDamageEventHandler } from "./IDamageEventHandler";

export class DamageEventHandler implements IDamageEventHandler {

    private handles: DamageEventSubscription[] = [];

    Subscribe(type: ActionOrder, callback: (e: DamageEvent, sub: DamageEventSubscription) => void): DamageEventSubscription;
    Subscribe(type: ActionOrder, callback: (e: DamageEvent, sub: DamageEventSubscription) => void, filter: { source?: Unit, target?: Unit }): DamageEventSubscription;
    Subscribe(type: ActionOrder, callback: (e: DamageEvent, sub: DamageEventSubscription) => void, filter?: { source?: Unit, target?: Unit }): DamageEventSubscription {
        
        print("Subscription")
        let newSubscription: DamageEventSubscription;
        // If filter exists, apply the thing
        if (filter && filter.source && filter.target) {
            let src = filter.source.handle;
            let targ = filter.target.handle;
            newSubscription = new DamageEventSubscription(Number(type), (e: DamageEvent, sub: DamageEventSubscription) => {
                if (filter.source?.handle == GetEventDamageSource() && filter.target?.handle == BlzGetEventDamageTarget())
                    return callback(e, sub);
                return true;
            });
        } else if (filter && filter.source) {
            Log.info("Source filter");
            let src = filter.source.handle;
            newSubscription = new DamageEventSubscription(Number(type), (e: DamageEvent, sub: DamageEventSubscription) => {
                if (src == GetEventDamageSource())
                    return callback(e, sub);
                return true;
            });
        } else if (filter && filter.target) {
            let targ = filter.target.handle;
            newSubscription = new DamageEventSubscription(Number(type), (e: DamageEvent, sub: DamageEventSubscription) => {
                if (targ == BlzGetEventDamageTarget())
                    return callback(e, sub);
                return true;
            });
        } else {
            // If filter doesn't exist, just register the callback directly
            newSubscription = new DamageEventSubscription(Number(type), callback);
        }

        // Insert the damage action into the action list
        this.handles.push(newSubscription);

        // Sort the damage actions based on priority
        this.handles = this.handles.sort((a, b) => a.priority - b.priority);

        return newSubscription;
    }
    
    Register(event: DamageEvent): DamageEvent {
        
        if (!this.handles || this.handles.length == 0) return event;
        let remaining: DamageEventSubscription[] = [];

        for (let sub of this.handles) {

            // Execute the callback.
            if (sub.alive) {
                sub.callback(event, sub);
                remaining.push(sub);
            }
        }

        // If someone modified the event, reflect those changes in the game
        BlzSetEventDamage(event.damage);
        // BlzSetEventDamageType()
        // BlzSetEventAttackType()

        // Save the remaining to this._subscriptions
        this.handles = remaining;
        return event;
    }
}