import { Unit } from "Asrc2/models/Unit";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { Group, Trigger } from "w3ts/index";
import { DamageEvent } from "../handlers/damage/DamageEvent";
import { IDamageEventHandler } from "../handlers/damage/IDamageEventHandler";

export class AutoattackEventProvider {

    damageEventTrigger: Trigger;

    constructor(
        private damageEventHandler: IDamageEventHandler
    ) {

        this.damageEventTrigger = new Trigger();
        this.damageEventTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DAMAGING);
        this.damageEventTrigger.addAction(() => {
            
            const dmgType = BlzGetEventDamageType();
            if (dmgType != DAMAGE_TYPE_NORMAL) return;
            
            const source = Unit.from(GetEventDamageSource());
            const target = Unit.from(BlzGetEventDamageTarget());

            const event = new DamageEvent({
                source,
                target,
                types: [source.damageType],
                amount: GetEventDamage(),
                isCrit: false
            })

            this.damageEventHandler.Register(event);
        });
        
    }
}