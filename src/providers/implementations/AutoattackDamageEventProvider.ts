import { IDamageEventHandler, IDamageEvent, DamageEventData } from "event-handlers/interfaces/IDamageEventHandler";
import { ActionOrder } from "systems/damage/ActionOrder";
import { Trigger, Unit } from "w3ts/index";
import { DamageType } from "systems/damage/DamageType";

export class AutoattackDamageEventProvider {

    private _trig: Trigger;

    constructor(
        private _damageEventHandler: IDamageEventHandler<ActionOrder>
    ) {
        
        this._trig = new Trigger();
        this._trig.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DAMAGING);
        this._trig.addAction(() => {

            const dmgType = BlzGetEventDamageType();
            if (dmgType != DAMAGE_TYPE_NORMAL) return;

            const atkType = BlzGetEventAttackType();
            
            let e: DamageEventData = {
                source: Unit.fromHandle(GetEventDamageSource()),
                target: Unit.fromHandle(BlzGetEventDamageTarget()),
                type: atkType == ATTACK_TYPE_MAGIC ? DamageType.MagicalAutoattack : DamageType.PhysicalAutoattack,
                amount: GetEventDamage(),
            }
            this._damageEventHandler.Register(e);
        });
    }
}