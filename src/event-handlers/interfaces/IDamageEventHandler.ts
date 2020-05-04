import { Unit } from "w3ts/index";
import { DamageType } from "systems/damage/DamageType";

export interface IDamageEventHandler<HandleType> {

    Subscribe(type: HandleType, callback: (e: IDamageEvent) => void): IDamageEventSub;
    Subscribe(type: HandleType, callback: (e: IDamageEvent) => void, filter: { source?: Unit, target?: Unit }): IDamageEventSub;

    Register(data: DamageEventData): void;
}

export interface IDamageEventSub {

    priority: number;
    callback: (e: IDamageEvent) => void;
    
    Unregister(): void;
}

export interface IDamageEvent {
    type: DamageType;
    amount: number;
    source: Unit;
    target: Unit;
    subscription: IDamageEventSub
}

export interface DamageEventData {
    type: DamageType;
    amount: number;
    source: Unit;
    target: Unit;
}