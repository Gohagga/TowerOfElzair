import { DamageEvent } from "Asrc2/events/handlers/damage/DamageEvent";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { Effect } from "w3ts/index";
import { DummyManager } from "../dummy/DummyManager";
import { HomingMissile } from "../missile/implementations/HomingMissile";
import { MissileManager } from "../missile/MissileManager";
import { MissileType } from "../missile/MissileType";

export class AutoattackFactory {
    
    constructor(
        private dummyManager: DummyManager,
        private missileManager: MissileManager,
        private damageService: IDamageService
    ) {
        
    }

    CreateMissileAutoattack({
        model,
        speed,
        type,
        collision = 30,
        height = 50,
        arc = 0,
    }: {
        model: string,
        speed: number,
        type: MissileType,
        collision?: number,
        height?: number
        arc?: number
    }): (((p: any) => boolean | void) | null) {

        let func = (e: DamageEvent) => {

            BlzSetEventDamage(0);
            let { x, y } = e.source;
            let dummy = this.dummyManager.GetMissileDummy();
            dummy.x = x;
            dummy.y = y;
            let effect = new Effect(model, x, y);

            let missile = new HomingMissile(dummy, height, speed, type, collision, () => e.targetUnit, effect)
                .OnDestroy(() => {
                    this.damageService.UnitDamageTarget(e.source, e.targetUnit, e.damage, e.attackType, e.damageType);
                })
                .Build();

            missile.arc = arc;
            this.missileManager.Fire(missile);
        };

        return func;
    }
}