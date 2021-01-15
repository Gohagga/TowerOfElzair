import { ModelPath } from "Asrc2/config/ModelPath";
import { AbilityEvent } from "Asrc2/events/handlers/ability/AbilityEvent";
import { IAbilityEventHandler } from "Asrc2/events/handlers/ability/IAbilityEventHandler";
import { Unit } from "Asrc2/models/Unit";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { IEnumUnitService } from "Asrc2/services/interfaces/IEnumUnitService";
import { Ability } from "Asrc2/systems/ability/Ability";
import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { InputManager } from "Asrc2/systems/input/InputManager";
import { IMissile } from "Asrc2/systems/missile/IMissile";
import { HomingMissile } from "Asrc2/systems/missile/implementations/HomingMissile";
import { Missile } from "Asrc2/systems/missile/Missile";
import { MissileManager } from "Asrc2/systems/missile/MissileManager";
import { MissileType } from "Asrc2/systems/missile/MissileType";
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";
import { Effect, Point, Timer } from "w3ts/index";

export type BackburnConfig = {
    Damage: number,
    Radius: number,
    DashDistance: number,
    MovementDistanceBonus: number,
    DashDuration: number,
    Cost: number,
    Cooldown: number,
}

export class Backburn extends Ability implements IUnitConfigurable<BackburnConfig> {

    public unitConfig = new UnitConfigurable<BackburnConfig>(() => { return {
        Damage: 25,
        Radius: 150,
        DashDistance: 80,
        MovementDistanceBonus: 0.5,
        DashDuration: 1.5,
        Cost: 20,
        Cooldown: 3,
    }});

    constructor(
        data: AbilityData,
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private enumService: IEnumUnitService,
        private missileManager: MissileManager,
        // private inputManager: InputManager,
    ) {
        super(data, damageService);
        abilityEvent.OnAbilityEffect(this.id, e => this.Execute(e));
        if (this.extId) abilityEvent.OnAbilityEffect(this.extId, e => this.Execute(e));
    }

    Execute(e: AbilityEvent) {
        
        const caster = e.caster;
        const owner = caster.owner;
        const data = this.GetUnitConfig(e.caster);

        // let targets = this.enumService.EnumUnitsInRange(e.targetPoint, data.Radius, target => 
        //     target.isAlly(owner) == false &&
        //     target.isAlive());
        
        // let eff = new Effect(ModelPath.FlamestrikeMythic06, x, y);
        // eff.scale = 0.8;
        // eff.destroy();

        // Calculate aoe damage for a single unit
        // let damage = data.Damage / math.max(targets.length, 2);

        // for (let t of targets) {
        //     this.damageService.UnitDamageTarget(e.caster, t, this.type, damage, DamageType.Fire);
        // }

        let angle = caster.facing * bj_DEGTORAD;
        let angleCaster = (caster.facing - 180) * bj_DEGTORAD;
        let dur = 0.6;
        let deccel = 0.8;
        let cosa = math.cos(angleCaster);
        let sina = math.sin(angleCaster);

        let totalMoves = math.floor(dur * 30);
        let speed = (data.DashDistance + caster.moveSpeed * data.MovementDistanceBonus) / totalMoves;

        let factor = 5;

        caster.issueImmediateOrder("stop");

        let casterMissile: IMissile;
        casterMissile = {
            id: caster.id,
            alive: true,
            type: MissileType.Person,
            x: caster.x,
            y: caster.y,
            Update: () => {

                factor = factor * deccel;
                let spd = speed * factor;
                let dx = spd * cosa;
                let dy = spd * sina;
                
                let { x, y } = caster;
                if (spd <= 5) {
                    casterMissile.alive = false;
                } else if (spd <= 10) {
                    caster.setPosition(x + dx, y + dy);
                } else {
                    caster.x = x + dx;
                    caster.y = y + dy;
                }
            }
        }
        this.missileManager.Fire(casterMissile)

        let ef = new Effect(ModelPath.Ember, caster.x, caster.y);
        ef.scale = 2;
        ef.setOrientation(angle, -90 * bj_DEGTORAD, 0);
        ef.z = 60;
        let dmgMissile: IMissile;
        let missileDistance = caster.moveSpeed * data.MovementDistanceBonus + 60;
        let mSpeed = missileDistance * 0.06;
        let dx = math.cos(angle) * mSpeed;
        let dy = math.sin(angle) * mSpeed;
        let efPoint = caster.point;
        let tim = new Timer();
        dmgMissile = {
            id: 0,
            alive: true,
            type: MissileType.Fire,
            x: efPoint.x,
            y: efPoint.y,
            Update: () => {
                
                efPoint.x += dx;
                efPoint.y += dy;
                ef.setPoint(efPoint);
                // ef.x += dx;
                // ef.y += dy;
                ef.z = 60;
                
                missileDistance -= mSpeed;
                if (missileDistance < 0) {
                    print("Destroying");
                    dmgMissile.alive = false;
                    ef.destroy();
                }
            }
        }
        let ticks = 3;
        let instanceDmg = data.Damage / ticks;
        tim.start(0.2, true, () => {
            print("timer tick");
            // let p = new Point(ef.x, ef.y);
            print(efPoint.x, efPoint.y);
            let targets = this.enumService.EnumUnitsInRange(efPoint, 150, target =>
                target.isAlly(owner) == false &&
                target.isAlive());
            
            let damage = instanceDmg / math.max(targets.length, 2);
            for (let t of targets) {
                this.damageService.UnitDamageTarget(caster, t, damage, this.type, DamageType.Fire);
            }

            if (--ticks <= 0) {
                tim.pause();
                tim.destroy();
                efPoint.destroy();
            }
        });
        this.missileManager.Fire(dmgMissile);
        
        this.ApplyCost(caster, data.Cost);
    }

    GenerateDescription(unit: Unit): string {
        const desc = 
`Backburns the target in.`;
        return desc;
    }

    GetUnitConfig = (unit: Unit) => this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: BackburnConfig) => void) => this.unitConfig.UpdateUnitConfig(unit, cb);

    AddToUnit(unit: Unit, extended?: boolean): boolean {
        const res = this.AddToUnitBase(unit, extended);
        if (res) {
            const data = this.GetUnitConfig(unit);
            const a = unit.getAbility(res);
            const tooltip = this.GenerateDescription(unit);

            unit.setAbilityCooldown(res, 0, data.Cooldown);
            BlzSetAbilityStringLevelField(a, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, 0, tooltip);
            // BlzSetAbilityRealLevelField(a, ABILITY_RLF_AREA_OF_EFFECT, 0, data.Radius);

            return true;
        }
        return false;
    }
}