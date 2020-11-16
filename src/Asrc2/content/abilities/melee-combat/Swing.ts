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
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";

export type SwingConfig = {
    Damage: number,
    IsAoeAttack: boolean,
    Range: number,
    Cost: number,
    Cooldown: number,
}

export class Swing extends Ability implements IUnitConfigurable<SwingConfig> {

    private unitConfig = new UnitConfigurable<SwingConfig>({
        Damage: 45,
        IsAoeAttack: false,
        Range: 0,
        Cost: 45,
        Cooldown: 2
    });

    constructor(
        data: AbilityData,
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private enumService: IEnumUnitService
    ) {
        super(data, damageService);
        print(this.id);
        abilityEvent.OnAbilityEffect(this.id, e => this.Execute(e));
    }

    Execute(e: AbilityEvent) {
        
        const caster = e.caster;
        const data = this.GetUnitConfig(e.caster);
        
        this.damageService.UnitDamageTarget(e.caster, e.targetUnit, AttackType.Physical, data.Damage, DamageType.Slashing);
        this.ApplyCost(caster, data.Cost);
    }

    GetUnitConfig = (unit: Unit) => this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: SwingConfig) => void) => this.unitConfig.UpdateUnitConfig(unit, cb);

    GenerateDescription(unit: Unit): string {
        const desc = 
`Swinges the target in.`;
        return desc;
    }

    AddToUnit(unit: Unit): boolean {
        const res = unit.addAbility(this.id);
        if (res) {
            const data = this.GetUnitConfig(unit);
            const a = unit.getAbility(this.id);
            const tooltip = this.GenerateDescription(unit);

            unit.setAbilityCooldown(this.id, 0, data.Cooldown);
            BlzSetAbilityStringLevelField(a, ABILITY_SLF_TOOLTIP_NORMAL_EXTENDED, 0, tooltip);
        }
        return res;
    }
}