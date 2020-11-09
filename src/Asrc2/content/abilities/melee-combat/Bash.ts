import { AbilityEvent } from "Asrc2/events/handlers/ability/AbilityEvent";
import { AbilityEventHandler } from "Asrc2/events/handlers/ability/AbilityEventHandler";
import { IAbilityEventHandler } from "Asrc2/events/handlers/ability/IAbilityEventHandler";
import { Unit } from "Asrc2/models/Unit";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { IEnumUnitService } from "Asrc2/services/interfaces/IEnumUnitService";
import { Ability } from "Asrc2/systems/ability/Ability";
import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";

export type BashConfig = {
    Damage: number,
    IsAoeAttack: boolean,
    Range: number
}

export class Bash extends Ability implements IUnitConfigurable<BashConfig> {

    private unitConfig = new UnitConfigurable<BashConfig>({
        Damage: 45,
        IsAoeAttack: false,
        Range: 0
    });

    constructor(
        data: AbilityData,
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private enumService: IEnumUnitService
    ) {
        super(data, damageService);
        abilityEvent.OnAbilityEffect(this.id, this.Execute);
    }

    Execute(e: AbilityEvent) {
        const data = this.GetUnitConfig(e.caster);

        if (data.IsAoeAttack) {

            let targets = this.enumService.EnumUnitsInRange(e.caster.point, data.Range, (target: Unit) => 
                    target.isAlive() &&
                    target.isUnitType(UNIT_TYPE_PEON)
            );

            for (let t of targets) {
                this.damageService.UnitDamageTarget(e.caster, t, data.Damage, DamageType.Magical);
            }
        }

        this.damageService.UnitDamageTarget(e.caster, e.targetUnit, data.Damage, DamageType.Blunt);

        this.UpdateUnitConfig(e.caster,
            config => config.Damage += 1);
    }

    GetUnitConfig = this.unitConfig.GetUnitConfig;
    UpdateUnitConfig = this.unitConfig.UpdateUnitConfig;
}