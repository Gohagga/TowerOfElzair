import { ModelPath } from "Asrc2/config/ModelPath";
import { AbilityEvent } from "Asrc2/events/handlers/ability/AbilityEvent";
import { AbilityEventHandler } from "Asrc2/events/handlers/ability/AbilityEventHandler";
import { IAbilityEventHandler } from "Asrc2/events/handlers/ability/IAbilityEventHandler";
import { Unit } from "Asrc2/models/Unit";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { IEnumUnitService } from "Asrc2/services/interfaces/IEnumUnitService";
import { Ability } from "Asrc2/systems/ability/Ability";
import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { DummyManager } from "Asrc2/systems/dummy/DummyManager";
import { InputManager } from "Asrc2/systems/input/InputManager";
import { Log } from "Asrc2/systems/log/Log";
import { Missile } from "Asrc2/systems/missile/Missile";
import { MissileManager } from "Asrc2/systems/missile/MissileManager";
import { MissileType } from "Asrc2/systems/missile/MissileType";
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";
import { Effect, Timer } from "w3ts/index";

export type FireboltConfig = {
    Damage: number,
    Range: number,
    Cost: number,
    Cooldown: number,
    Speed: number,
}

export class Firebolt extends Ability implements IUnitConfigurable<FireboltConfig> {

    public unitConfig = new UnitConfigurable<FireboltConfig>({
        Damage: 20,
        Range: 1000,
        Cost: 13,
        Cooldown: 1.75,
        Speed: 1200,
    });

    constructor(
        data: AbilityData,
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private enumService: IEnumUnitService,
        private missileManager: MissileManager,
        private dummyManager: DummyManager,
        private inputManager: InputManager,
    ) {
        super(data, damageService);
        abilityEvent.OnAbilityEffect(this.id, e => this.Execute(e));
        if (this.extId) abilityEvent.OnAbilityEffect(this.extId, e => this.Execute(e));
    }

    Execute(e: AbilityEvent) {
        
        const caster = e.caster;
        const owner = caster.owner;
        const data = this.GetUnitConfig(e.caster);

        let { x, y } = caster;
        // let angle = math.atan(y - e.targetPoint.y, x - e.targetPoint.x);
        let angle = math.atan(e.targetPoint.y - y, e.targetPoint.x - x);
        let dummy = this.dummyManager.GetMissileDummy();
        // let effect = dummy.addEffect(ModelPath.RainOfFire, "origin");
        let effect = new Effect(ModelPath.DeathlessRainOfFire, x, y);
        effect.setYaw(angle);
        dummy.x = x;
        dummy.y = y;
        // dummy.setScale(0.3, 0.3, 0.3);
        let m = new Missile(dummy, data.Speed, MissileType.Fire)
            .OnUpdate(miss => {

                const targets = this.enumService.EnumUnitsInRange(miss.point, 60, target =>
                    target.isAlly(owner) == false &&
                    target.isAlive());

                let ex = dummy.x;
                let ey = dummy.y;
                effect.x = ex;
                effect.y = ey;
                    
                if (targets.length > 0) {
                    this.damageService.UnitDamageTarget(caster, targets[0], data.Damage, this.type, DamageType.Fire);
                    effect.destroy();
                    new Effect(ModelPath.RainOfFire, ex, ey).destroy();
                    miss.alive = false;
                }
            })
            .OnDestroy(miss => {
                effect.destroy();
            })
            .SetDestination(e.targetPoint.x, e.targetPoint.y, data.Range);

        this.missileManager.Fire(m);
        
        dummy.setFacingEx(m.angle * bj_RADTODEG);
        dummy.setflyHeight(60, 0);


        if (this.inputManager.IsCtrlDown(caster.owner)) {
            Log.info("Ability casts in special way!");
        } else {
            Log.info("Ability casts normally");
        }
        
        this.damageService.UnitDamageTarget(e.caster, e.targetUnit, AttackType.Physical, data.Damage, DamageType.Bludgeon);
        this.ApplyCost(caster, data.Cost);
    }

    GenerateDescription(unit: Unit): string {
        const desc = 
`Firebolts the target in.`;
        return desc;
    }

    GetUnitConfig = (unit: Unit) => this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: FireboltConfig) => void) => this.unitConfig.UpdateUnitConfig(unit, cb);

    AddToUnit(unit: Unit, extended?: boolean): boolean {
        const res = this.AddToUnitBase(unit, extended);
        if (res) {
            const data = this.GetUnitConfig(unit);
            const a = unit.getAbility(res);
            const tooltip = this.GenerateDescription(unit);

            unit.setAbilityCooldown(res, 0, data.Cooldown);
            BlzSetAbilityStringLevelField(a, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, 0, tooltip);
            return true;
        }
        return false;
    }
}