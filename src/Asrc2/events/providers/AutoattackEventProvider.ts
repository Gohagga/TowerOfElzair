import { Unit } from "Asrc2/models/Unit";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { Trigger } from "w3ts/index";
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

            const atkType = BlzGetEventAttackType();
            
            const event = new DamageEvent({
                source: Unit.from(GetEventDamageSource()),
                target: Unit.from(BlzGetEventDamageTarget()),
                type: atkType == ATTACK_TYPE_MAGIC ? DamageType.MagicalAutoattack : DamageType.PhysicalAutoattack,
                amount: GetEventDamage(),
            })

            this.damageEventHandler.Register(event);
        });
    }
}