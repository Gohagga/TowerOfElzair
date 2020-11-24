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
import { Log } from "Asrc2/systems/log/Log";
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";

export type CleaveConfig = {
    Damage: number,
    Range: number,
    AngleRange: number,
    Cost: number,
    Cooldown: number,
}

export class Cleave extends Ability implements IUnitConfigurable<CleaveConfig> {

    private unitConfig = new UnitConfigurable<CleaveConfig>({
        Damage: 30,
        Range: 200,
        AngleRange: 120,
        Cost: 30,
        Cooldown: 4,
    });

    constructor(
        data: AbilityData,
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private enumService: IEnumUnitService
    ) {
        super(data, damageService);
        abilityEvent.OnAbilityEffect(this.id, e => this.Execute(e));
    }

    Execute(e: AbilityEvent) {
        
        const caster = e.caster;
        const owner = caster.owner;
        const target = e.targetUnit;
        const data = this.GetUnitConfig(e.caster);
        const angleTarget = math.atan(caster.y - target.y, caster.x - target.x) + math.pi;

        let targets = this.enumService.EnumUnitsInCone(e.caster.point, data.Range, angleTarget, data.AngleRange * bj_DEGTORAD, (t: Unit) =>
            t.isEnemy(owner) &&
            t.isAlive()
        );

        for (let t of targets) {
            this.damageService.UnitDamageTarget(e.caster, e.targetUnit, AttackType.Physical, data.Damage, DamageType.Slashing);
        }
        this.ApplyCost(caster, data.Cost);
    }

    GetUnitConfig = (unit: Unit) => this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: CleaveConfig) => void) => this.unitConfig.UpdateUnitConfig(unit, cb);

    GenerateDescription(unit: Unit): string {
        const desc = 
`Cleaves the targets in.`;
        return desc;
    }

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