import { AbilityEventData } from "events/ability/AbilityEventData";
import { IOnSpellCastProvider } from "providers/interfaces/IOnSpellCastProvider";
import { IEventHandler } from "../../event-handlers/interfaces/IEventHandler";

export interface IAbilityEventHandler extends IEventHandler<AbilitySubscribeData, AbilityEventData, AbilityEventData, () => void> {
    
    SubscribeTo(sub: AbilitySubscribeData, callback: (e: AbilityEventData) => void): () => void;

    Subscribe(type: EventAbility, abilityId: number, callback: (e: AbilityEventData) => void): () => void;

    Register(type: AbilitySubscribeData, event: AbilityEventData): void;
}

export interface AbilitySubscribeData {
    type: EventAbility,
    abilityId: number
}

export const enum EventAbility {
    Cast,
    Effect,
    End,
    Finished
}