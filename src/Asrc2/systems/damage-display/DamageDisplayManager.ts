import { DamageEvent } from "Asrc2/events/handlers/damage/DamageEvent";
import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { ActionOrder } from "systems/damage/ActionOrder";
import { Timer } from "w3ts/index";

export class DamageDisplayManager {

    constructor(
        private damageEventHandler: IDamageEventHandler
    ) {
        
        damageEventHandler.Subscribe(ActionOrder.DamageDisplay, e => {
            
            let damage = e.damage;
            const source = e.source;
            const target = e.targetUnit.handle;
            const owner = source.owner.handle;
            
            let size = (damage / 60) * 3 + 8;

            let rgb = [ 100, 70, 70];
            if (e.isCrit) {
                rgb = [100, 0, 100];
            } else if (damage == 0 && e.strain > 0) {
                rgb = [40, 40, 100];
                damage = e.strain;
            }

            // switch (e.types)
            // if (attackType == ATTACK_TYPE_MELEE) rgb = [ 100, 75, 50 ];
            // else if (attackType == ATTACK_TYPE_MAGIC) rgb = [ 40, 70, 100 ];

            // let dString = math.floor(damage).toString();
            // CreateTextTagUnitBJ(dString, target, 50.00, size, rgb[0], rgb[1], rgb[2], 0)
            let ang = math.random(45, 135) * bj_DEGTORAD;
            let dx = 0.086203125 * math.cos(ang);
            let dy = 0.086203125 * math.sin(ang);
            if (owner == GetLocalPlayer()) {
                let tt = CreateTextTagUnitBJ(damage.toString(), target, 35, size, rgb[0], rgb[1], rgb[2], 0);

                SetTextTagPermanent(tt, false);
                SetTextTagFadepoint(tt, 0.4);
                if (e.isCrit) {
                    let tim = new Timer();
                    let count = 12;
                    tim.start(0.015, true, () => {
                        if (count-- > 0) SetTextTagTextBJ(tt, damage.toString(), size++);
                        else tim.destroy();
                    });
                    SetTextTagVelocity(tt, dx * 0.3, dy * 0.3)
                    SetTextTagLifespan(tt, 0.5);
                } else {
                    SetTextTagVelocity(tt, dx, dy);
                    SetTextTagLifespan(tt, 0.6);
                }
            }
        });
    }
}