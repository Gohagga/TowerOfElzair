import { Unit } from "w3ts/index";
import { DamageType } from "systems/damage/DamageType";
import { IEventHandler } from "../../event-handlers/interfaces/IEventHandler";
import { IDamageProvider } from "providers/interfaces/IDamageProvider";
import { IOnDamageProvider } from "providers/interfaces/IOnDamageProvider";

export interface IDamageEventHandler<HandleType> extends IEventHandler<HandleType, DamageEventData, DamageEventData, IDamageEventSub> {

    SubscribeTo(type: HandleType, callback: (e: IDamageEvent) => void): IDamageEventSub;
    SubscribeTo(type: HandleType, callback: (e: IDamageEvent) => void, filter: { source?: Unit, target?: Unit }): IDamageEventSub;

    Register(type: HandleType, data: DamageEventData): void;

    RegisterDamageInstance(data: DamageEventData): void;
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