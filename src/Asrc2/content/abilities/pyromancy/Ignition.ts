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

export type IgnitionConfig = {
    Damage: number,
    Radius: number,
    Cost: number,
    Cooldown: number,
    Speed: number,
}

export class Ignition extends Ability implements IUnitConfigurable<IgnitionConfig> {

    public unitConfig = new UnitConfigurable<IgnitionConfig>({
        Damage: 20,
        Radius: 250,
        Cost: 13,
        Cooldown: 1.75,
        Speed: 1200,
    });

    constructor(
        data: AbilityData,
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private enumService: IEnumUnitService
    ) {
        super(data, damageService);
        abilityEvent.OnAbilityEffect(this.id, e => this.Execute(e));
        if (this.extId) abilityEvent.OnAbilityEffect(this.extId, e => this.Execute(e));
    }

    Execute(e: AbilityEvent) {
        
        const caster = e.caster;
        const owner = caster.owner;
        const data = this.GetUnitConfig(e.caster);

        let { x, y } = e.targetPoint;
        let effect = new Effect(ModelPath.Damnation, x, y);
        this.damageService.UnitDamageTarget(e.caster, e.targetUnit, AttackType.Physical, data.Damage, DamageType.Bludgeon);
        this.ApplyCost(caster, data.Cost);
    }

    GenerateDescription(unit: Unit): string {
        const desc = 
`Ignitions the target in.`;
        return desc;
    }

    GetUnitConfig = (unit: Unit) => this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: IgnitionConfig) => void) => this.unitConfig.UpdateUnitConfig(unit, cb);

    AddToUnit(unit: Unit, extended?: boolean): boolean {
        const res = this.AddToUnitBase(unit, extended);
        if (res) {
            const data = this.GetUnitConfig(unit);
            const a = unit.getAbility(res);
            const tooltip = this.GenerateDescription(unit);

            unit.setAbilityCooldown(res, 0, data.Cooldown);
            BlzSetAbilityStringLevelField(a, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, 0, tooltip);
            BlzSetAbilityRealLevelField(a, ABILITY_RLF_AREA_OF_EFFECT, 0, data.Radius);
            return true;
        }
        return false;
    }
}