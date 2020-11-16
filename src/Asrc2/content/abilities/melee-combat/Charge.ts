import { AbilityEvent } from "Asrc2/events/handlers/ability/AbilityEvent";
import { AbilityEventHandler } from "Asrc2/events/handlers/ability/AbilityEventHandler";
import { IAbilityEventHandler } from "Asrc2/events/handlers/ability/IAbilityEventHandler";
import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { Unit } from "Asrc2/models/Unit";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { IEnumUnitService } from "Asrc2/services/interfaces/IEnumUnitService";
import { Ability } from "Asrc2/systems/ability/Ability";
import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { ActionOrder } from "Asrc2/systems/damage/ActionOrder";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { Log } from "Asrc2/systems/log/Log";
import { IUnitConfigurable } from "Asrc2/systems/unit-configurable/IUnitConfigurable";
import { UnitConfigurable } from "Asrc2/systems/unit-configurable/UnitConfigurable";
import { Timer } from "w3ts/handles/timer";

export type ChargeConfig = {
    Damage: number,
    Duration: number,
    Cost: number,
    Cooldown: number,
}

export class Charge extends Ability implements IUnitConfigurable<ChargeConfig> {

    // private auraId: number;
    private buffId: number;
    private timers: Record<number, Timer> = {};

    private unitConfig = new UnitConfigurable<ChargeConfig>({
        Damage: 12,
        Duration: 5,
        Cost: 12,
        Cooldown: 7,
    });

    constructor(
        data: AbilityData & { 
            buffId: string,
            auraId: string
        },
        damageService: IDamageService,
        abilityEvent: IAbilityEventHandler,
        private enumService: IEnumUnitService,
        private damageEventHandler: IDamageEventHandler,
    ) {
        super(data, damageService);
        this.buffId = FourCC(data.buffId);
        // this.auraId = FourCC(data.auraId);
        abilityEvent.OnAbilityEffect(this.id, e => this.Execute(e));
    }

    Execute(e: AbilityEvent) {
        
        const caster = e.caster;
        const casterId = caster.id;
        const data = this.GetUnitConfig(e.caster);
        // Fetch the current timer, pause it if it exists and create if it doesn't
        if (casterId in this.timers) this.timers[casterId].pause();
        const tim = this.timers[casterId] || new Timer();
        this.timers[casterId] = tim;

        const bonus = data.Damage;
        // caster.addAbility(this.auraId);

        const sub = this.damageEventHandler.Subscribe(ActionOrder.ChargeBonus, (e, sub) => {
            Log.info("Charge damage event");

            let physDmg = DamageType.Bludgeon | DamageType.Piercing | DamageType.Slashing;            
            if ((e.damageType & physDmg) == physDmg) {
                Log.info("Is physical damage type");
                e.damage += bonus;
                e.source.removeAbility(this.buffId);
                sub.alive = false;
            }
        }, { source: caster });

        tim.start(data.Duration, false, () => {
            caster.removeAbility(this.buffId);
            sub.alive = false;
        });

        this.ApplyCost(caster, data.Cost);
    }

    GetUnitConfig = (unit: Unit) => this.unitConfig.GetUnitConfig(unit);
    UpdateUnitConfig = (unit: Unit, cb: (config: ChargeConfig) => void) => this.unitConfig.UpdateUnitConfig(unit, cb);

    GenerateDescription(unit: Unit): string {
        const desc = 
`Chargees the target in.`;
        return desc;
    }
}