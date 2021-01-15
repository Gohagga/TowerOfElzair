import { Unit } from "Asrc2/models/Unit";
import { DamageDisplayManager } from "Asrc2/systems/damage-display/DamageDisplayManager";
// import { Widget } from "Asrc2/models/Widget";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { Group, Trigger } from "w3ts/index";
import { DamageEvent } from "../handlers/damage/DamageEvent";
import { IDamageEventHandler } from "../handlers/damage/IDamageEventHandler";

export class AutoattackEventProvider {

    damageEventTrigger: Trigger;

    constructor(
        private damageEventHandler: IDamageEventHandler,
        private damageDisplayManager: DamageDisplayManager
    ) {

        this.damageEventTrigger = new Trigger();
        this.damageEventTrigger.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DAMAGING);
        this.damageEventTrigger.addAction(() => {
            
            const dmgType = BlzGetEventDamageType();
            if (dmgType != DAMAGE_TYPE_NORMAL) return;
            
            const source = Unit.from(GetEventDamageSource());
            const targetUnit = Unit.from(BlzGetEventDamageTarget());
            // const targetWidget = Widget.from(GetTriggerWidget());

            const event = new DamageEvent({
                source,
                targetUnit: targetUnit,
                // targetWidget: targetWidget,
                damageType: source.damageType,
                damageTypeCount: 1,
                attackType: AttackType.Autoattack,
                damage: GetEventDamage(),
                strain: 0,
                isCrit: false
            });
            
            // If it wasn't a melee attack but a ranged one instead, need to create a missile
            if (source.attackMethod) {
                if (!source.attackMethod(event))
                    return;
            }
            
            // If it was melee attack, need to recognize it and create a damage event
            this.damageEventHandler.Register(event);

            this.damageDisplayManager.DisplayDamageEvent(event);
        });
        
    }
}