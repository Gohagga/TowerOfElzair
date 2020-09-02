import { IEventUnitUsedAbilityHandler, EventAbility } from "../interfaces/IEventUnitUsedAbilityHandler";
import { Trigger } from "w3ts";
import { IOnSpellCastProvider } from "providers/interfaces/IOnSpellCastProvider";

export class EventUnitUsedAbilityHandler implements IEventUnitUsedAbilityHandler {
    
    private spellCastEvent: IOnSpellCastProvider;

    spellCastTrigger: Trigger;
    spellEffectTrigger: Trigger;
    spellEndTrigger: Trigger;
    spellFinishTrigger: Trigger;
    
    active: boolean = true;

    private readonly handles: Record<EventAbility, Record<number, (event: IOnSpellCastProvider) => void>> = {
        [EventAbility.Cast]: {},
        [EventAbility.Effect]: {},
        [EventAbility.End]: {},
        [EventAbility.Finished]: {},
    };

    constructor(svc: {
        OnSpellCastProvider: IOnSpellCastProvider
    }) {
        this.spellCastEvent = svc.OnSpellCastProvider;

        this.spellCastTrigger = new Trigger();
        this.spellCastTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_CAST);
        this.spellCastTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.Cast]) this.handles[EventAbility.Cast][spellId](this.spellCastEvent);
        });
        this.spellEffectTrigger = new Trigger();
        this.spellEffectTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);
        this.spellEffectTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.Effect]) this.handles[EventAbility.Effect][spellId](this.spellCastEvent);
        });
        this.spellEndTrigger = new Trigger();
        this.spellEndTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_ENDCAST);
        this.spellEndTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.End]) this.handles[EventAbility.End][spellId](this.spellCastEvent);
        });
        this.spellFinishTrigger = new Trigger();
        this.spellFinishTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_FINISH);
        this.spellFinishTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.Finished]) this.handles[EventAbility.Finished][spellId](this.spellCastEvent);
        });
    }

    Register(type: EventAbility, abilityId: number, callback: (event: IOnSpellCastProvider) => void): void {
        this.handles[type][abilityId] = callback;
    }
    Unregister(type: EventAbility, abilityId: number): void {
        
        if (abilityId in this.handles[type]) {
            delete this.handles[type][abilityId];
        }
    }
}