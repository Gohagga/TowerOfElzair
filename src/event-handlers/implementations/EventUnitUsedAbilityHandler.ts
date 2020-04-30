import { IEventUnitUsedAbilityHandler, EventAbility } from "../interfaces/IEventUnitUsedAbilityHandler";
import { Trigger } from "w3ts";

export class EventUnitUsedAbilityHandler implements IEventUnitUsedAbilityHandler {
    
    spellCastTrigger: Trigger;
    spellEffectTrigger: Trigger;
    spellEndTrigger: Trigger;
    spellFinishTrigger: Trigger;
    
    active: boolean = true;

    private readonly handles: Record<EventAbility, Record<number, () => void>> = {
        [EventAbility.Cast]: {},
        [EventAbility.Effect]: {},
        [EventAbility.End]: {},
        [EventAbility.Finished]: {},
    };

    constructor() {
        this.spellCastTrigger = new Trigger();
        this.spellCastTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_CAST);
        this.spellCastTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.Cast]) this.handles[EventAbility.Cast][spellId]();
        });
        this.spellEffectTrigger = new Trigger();
        this.spellEffectTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_EFFECT);
        this.spellEffectTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.Effect]) this.handles[EventAbility.Effect][spellId]();
        });
        this.spellEndTrigger = new Trigger();
        this.spellEndTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_ENDCAST);
        this.spellEndTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.End]) this.handles[EventAbility.End][spellId]();
        });
        this.spellFinishTrigger = new Trigger();
        this.spellFinishTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_SPELL_FINISH);
        this.spellFinishTrigger.addAction(() => {
            const spellId = GetSpellAbilityId();
            if (spellId in this.handles[EventAbility.Finished]) this.handles[EventAbility.Finished][spellId]();
        });
    }

    Register(type: EventAbility, abilityId: number, callback: () => void): void {
        this.handles[type][abilityId] = callback;
    }
    Unregister(type: EventAbility, abilityId: number): void {
        
        if (abilityId in this.handles[type]) {
            delete this.handles[type][abilityId];
        }
    }
}