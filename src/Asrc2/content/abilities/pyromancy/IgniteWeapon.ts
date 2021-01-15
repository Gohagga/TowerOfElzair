import { ModelPath } from "Asrc2/config/ModelPath";
import { AbilityEvent } from "Asrc2/events/handlers/ability/AbilityEvent";
import { IAbilityEventHandler } from "Asrc2/events/handlers/ability/IAbilityEventHandler";
import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { Unit } from "Asrc2/models/Unit";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { IEnumUnitService } from "Asrc2/services/interfaces/IEnumUnitService";
import { Ability } from "Asrc2/systems/ability/Ability";
import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { ActionOrder } from "Asrc2/systems/damage/ActionOrder";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { InputManager } from "Asrc2/systems/input/InputManager";
import { Log } from "Asrc2/systems/log/Log";
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";
import { Effect, Timer } from "w3ts/index";

export type IgniteWeaponConfig = {
    Damage: number,
    Radius: number,
    Cost: number,
    Cooldown: number,
    Speed: number,
    Timer: Timer,
}

export class IgniteWeapon extends Ability implements IUnitConfigurable<IgniteWeaponConfig> {

    private unitConfig = new UnitConfigurable<IgniteWeaponConfig>(() => { return {
        Damage: 20,
        Radius: 200,
        Cost: 13,
        Cooldown: 8,
        Speed: 1200,
        Timer: new Timer()
    }});

    constructor(
        data: AbilityData,
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private enumService: IEnumUnitService,
        private inputManager: InputManager,
        private damageEventHandler: IDamageEventHandler
    ) {
        super(data, damageService);
        print("start ignite weapon")
        abilityEvent.OnAbilityEffect(this.id, e => this.Execute(e));
        if (this.extId) abilityEvent.OnAbilityEffect(this.extId, e => this.Execute(e));
        print("made ignite weapon");
    }

    Execute(e: AbilityEvent) {
        
        const caster = e.caster;
        const target = e.targetUnit;
        const owner = caster.owner;
        const data = this.GetUnitConfig(e.caster);

        // Remove effects
        data.Timer.pause();

        print(target.name);
        let ef = target.addEffect(ModelPath.Ember, "weapon");
        let sub = this.damageEventHandler.Subscribe(ActionOrder.EnchantDamageType, e => {
            print("it happens", e.source.damageType);
            e.source.damageType = e.source.damageType | DamageType.Fire;
        }, { source: target });

        data.Timer.start(10, false, () => {
            ef.destroy();
            sub.alive = false;
        });

        if (this.inputManager.IsCtrlDown(caster.owner)) {
            Log.info("Ability casts in special way!");
        } else {
            Log.info("Ability casts normally");
        }
        
        this.ApplyCost(caster, data.Cost);
    }

    GenerateDescription(unit: Unit): string {
        const desc = 
`IgniteWeapons the target in.`;
        return desc;
    }

    GetUnitConfig = (unit: Unit) => this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: IgniteWeaponConfig) => void) => this.unitConfig.UpdateUnitConfig(unit, cb);

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