import { IAbilityEventHandler, EventAbility, AbilitySubscribeData } from "./IAbilityEventHandler";
import { Trigger } from "w3ts";
import { AbilityEventData } from "./AbilityEventData";

export class EventUnitUsedAbilityHandler implements IAbilityEventHandler {

    abilityEventData: AbilityEventData;
    
    spellCastTrigger: Trigger;
    spellEffectTrigger: Trigger;
    spellEndTrigger: Trigger;
    spellFinishTrigger: Trigger;
    
    active: boolean = true;

    private readonly handles: Record<EventAbility, Record<number, (event: AbilityEventData) => void>> = {
        [EventAbility.Cast]: {},
        [EventAbility.Effect]: {},
        [EventAbility.End]: {},
        [EventAbility.Finished]: {},
    };

    constructor() {

        this.abilityEventData = new AbilityEventData();

        this.spellCastTrigger = new Trigger();
        this.spellCastTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_CAST);
        this.spellCastTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.Cast]) this.handles[EventAbility.Cast][spellId](this.abilityEventData);
        });
        this.spellEffectTrigger = new Trigger();
        this.spellEffectTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);
        this.spellEffectTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.Effect]) {
                this.handles[EventAbility.Effect][spellId](this.abilityEventData);
            }
        });
        this.spellEndTrigger = new Trigger();
        this.spellEndTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_ENDCAST);
        this.spellEndTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.End]) this.handles[EventAbility.End][spellId](this.abilityEventData);
        });
        this.spellFinishTrigger = new Trigger();
        this.spellFinishTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_FINISH);
        this.spellFinishTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.Finished]) this.handles[EventAbility.Finished][spellId](this.abilityEventData);
        });
    }

    Subscribe(type: EventAbility, abilityId: number, callback: (e: AbilityEventData) => void): () => void {
        this.handles[type][abilityId] = callback;
        return () => this.Unregister(type, abilityId);
    }

    SubscribeTo(sub: AbilitySubscribeData, callback: (e: AbilityEventData) => void): () => void {
        this.handles[sub.type][sub.abilityId] = callback;
        return () => this.Unregister(sub.type, sub.abilityId);
    }

    Register(type: AbilitySubscribeData, event: AbilityEventData): void {
        
        if (this.handles[type.type][type.abilityId]) {
            this.handles[type.type][type.abilityId](event);
        }
    }

    Unregister(type: EventAbility, abilityId: number): void {
        
        if (abilityId in this.handles[type]) {
            delete this.handles[type][abilityId];
        }
    }
}