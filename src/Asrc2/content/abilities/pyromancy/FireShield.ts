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

export type FireShieldConfig = {
    Damage: number,
    Radius: number,
    DashDistance: number,
    MovementDistanceBonus: number,
    Duration: number,
    Cost: number,
    Cooldown: number,
    Timer: Timer,
}

export class FireShield extends Ability implements IUnitConfigurable<FireShieldConfig> {

    public unitConfig = new UnitConfigurable<FireShieldConfig>(() => { return {
        Damage: 25,
        Radius: 150,
        DashDistance: 80,
        MovementDistanceBonus: 0.5,
        Duration: 7,
        Cost: 20,
        Cooldown: 3,
        Timer: new Timer()
    }});

    // private buffId: number;

    constructor(
        data: AbilityData & {
            // buffId: number,
        },
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private missileManager: MissileManager,
        private enumService: IEnumUnitService
    ) {
        super(data, damageService);
        // this.buffId = data.buffId;
        abilityEvent.OnAbilityEffect(this.id, e => this.Execute(e));
        if (this.extId) abilityEvent.OnAbilityEffect(this.extId, e => this.Execute(e));
    }

    Execute(e: AbilityEvent) {
        
        const caster = e.caster;
        const owner = caster.owner;
        const data = this.GetUnitConfig(e.caster);

        data.Timer.pause();
        this.RemoveEffects(caster);

        let { x, y } = caster;
        let eff = caster.addEffect(ModelPath.Immolation, "chest");
        let shield: IMissile;
        shield = {
            id: caster.id,
            alive: true,
            type: MissileType.Fire,
            x: x,
            y: y,
            Update: () => {

                shield.x = caster.x;
                shield.y = caster.y;
                // let targets = this.enumService.EnumUnitsInRangeRect(p, 190);
                let targets = this.missileManager.GetMissilesInRange(shield.x, shield.y, 120, m =>
                    m.type == MissileType.Fire &&
                    m != shield);

                if (targets.length > 0) {
                    // print(targets[0].target?.name);
                    targets[0].alive = false;
                    targets[0].target = caster;
                    shield.alive = false;

                    print(targets[0].id, targets[0].alive, targets[0].target.name)
                }
            },
            Destroy: () => {
                // Remove effects in here
                // this.RemoveEffects(caster);
                eff.destroy();
            },
        }
        this.missileManager.Fire(shield);

        data.Timer.start(data.Duration, false, () => {
            shield.alive = false;
            // this.RemoveEffects(caster);
            eff.destroy();
        });

        this.ApplyCost(caster, data.Cost);
    }

    ApplyEffects(unit: Unit) {
        unit.addEffect(ModelPath.Immolation, "origin");
    }

    RemoveEffects(unit: Unit) {

        // if (unit.getAbilityLevel(this.buffId) > 0) {
        //     unit.removeAbility(this.buffId);
        // }
    }

    GenerateDescription(unit: Unit): string {
        const desc = 
`FireShields the target in.`;
        return desc;
    }

    GetUnitConfig = (unit: Unit) => this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: FireShieldConfig) => void) => this.unitConfig.UpdateUnitConfig(unit, cb);

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