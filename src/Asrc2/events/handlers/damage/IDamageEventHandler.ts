import { Unit } from "Asrc2/models/Unit";
import { ActionOrder } from "Asrc2/systems/damage/ActionOrder";
import { DamageEvent } from "./DamageEvent";
import { DamageEventSubscription } from "./DamageEventSubscription";

export interface IDamageEventHandler {

    Subscribe(type: ActionOrder, callback: (e: DamageEvent, sub: DamageEventSubscription) => void): DamageEventSubscription;
    Subscribe(type: ActionOrder, callback: (e: DamageEvent, sub: DamageEventSubscription) => void, filter: { source?: Unit, target?: Unit }): DamageEventSubscription;

    Register(event: DamageEvent): DamageEvent;
}