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
import { MissileManager } from "Asrc2/systems/missile/MissileManager";
import { MissileType } from "Asrc2/systems/missile/MissileType";
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";
import { Effect } from "w3ts/index";

export type BackburnConfig = {
    Damage: number,
    Radius: number,
    DashDistance: number,
    DashDuration: number,
    Cost: number,
    Cooldown: number,
}

export class Backburn extends Ability implements IUnitConfigurable<BackburnConfig> {

    public unitConfig = new UnitConfigurable<BackburnConfig>({
        Damage: 25,
        Radius: 150,
        DashDistance: 180,
        DashDuration: 1.5,
        Cost: 20,
        Cooldown: 3,
    });

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

        let angle = (caster.facing - 180) * bj_DEGTORAD;
        let dur = 0.6;
        let deccel = 0.8;
        let cosa = math.cos(angle);
        let sina = math.sin(angle);

        let totalMoves = math.floor(dur * 30);
        let speed = data.DashDistance / totalMoves;

        let factor = 5;

        caster.issueImmediateOrder("stop");

        let casterMissile: IMissile;
        casterMissile = {
            id: caster.id,
            alive: true,
            type: MissileType.Person,
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