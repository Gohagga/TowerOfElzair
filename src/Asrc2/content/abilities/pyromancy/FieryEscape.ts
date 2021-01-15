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
import { Log } from "Asrc2/systems/log/Log";
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";
import { Effect } from "w3ts/index";

export type FieryEscapeConfig = {
    Damage: number,
    Radius: number,
    Cost: number,
    Cooldown: number,
    Speed: number,
}

export class FieryEscape extends Ability implements IUnitConfigurable<FieryEscapeConfig> {

    private unitConfig = new UnitConfigurable<FieryEscapeConfig>(() => { return {
        Damage: 20,
        Radius: 200,
        Cost: 13,
        Cooldown: 8,
        Speed: 1200,
    }});

    constructor(
        data: AbilityData,
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private enumService: IEnumUnitService,
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
        new Effect(ModelPath.Rocket, x, y).destroy();

        const targets = this.enumService.EnumUnitsInRange(caster.point, 200, target =>
            target.isAlly(owner) == false &&
            target.isAlive());

        if (targets.length > 0) {
            Log.info("targets", targets.length);
            for (let t of targets) {
                Log.info(t.name);
                this.damageService.UnitDamageTarget(caster, t, data.Damage, this.type, DamageType.Fire);
                t.addEffect(ModelPath.ArchmageFireball, "origin").destroy();
            }
        }

        if (this.inputManager.IsCtrlDown(caster.owner)) {
            Log.info("Ability casts in special way!");
        } else {
            Log.info("Ability casts normally");
        }
        
        this.ApplyCost(caster, data.Cost);
    }

    GenerateDescription(unit: Unit): string {
        const desc = 
`FieryEscapes the target in.`;
        return desc;
    }

    GetUnitConfig = (unit: Unit) => this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: FieryEscapeConfig) => void) => this.unitConfig.UpdateUnitConfig(unit, cb);

    AddToUnit(unit: Unit, extended?: boolean): boolean {
        const res = this.AddToUnitBase(unit, extended);
        if (res) {
            const data = this.GetUnitConfig(unit);
            const a = unit.getAbility(res);
            const tooltip = this.GenerateDescription(unit);

            unit.setAbilityCooldown(this.id, 0, data.Cooldown);
            BlzSetAbilityStringLevelField(a, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, 0, tooltip);
            return true;
        }
        return false;
    }
}