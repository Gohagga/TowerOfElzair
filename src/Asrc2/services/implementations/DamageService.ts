import { DamageEvent } from "Asrc2/events/handlers/damage/DamageEvent";
import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { Unit } from "Asrc2/models/Unit";
import { DamageDisplayManager } from "Asrc2/systems/damage-display/DamageDisplayManager";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { Log } from "Asrc2/systems/log/Log";
import { IDamageService } from "../interfaces/IDamageService";

export class DamageService implements IDamageService {

    constructor(
        private damageEventHandler: IDamageEventHandler,
        private damageDisplayManager: DamageDisplayManager
    ) { }

    UnitCauseStrain(source: Unit, target: Unit, amount: number, attackType: AttackType = AttackType.Untyped): void {
        Log.info("Unit cause strain");
        let event = this.CreateDamageEvent({
            source: source,
            target: target,
            damageType: DamageType.Untyped,
            attackType: attackType,
            damage: 0,
            strain: amount,
            isCrit: false
        });

        event = this.damageEventHandler.Register(event);
        event.strain = math.floor(event.strain + 0.5);

        // Try to increase the guy's value
        const max = target.maxMana;
        const curr = target.mana;
        let overflow = curr + event.strain - max;

        if (overflow > 0) {
            target.mana = max;

            // Handle overflow
            if (event.attackType == AttackType.Magic) {
                // Dummy cast something
            } else if (event.attackType == AttackType.Physical) {
                // True damage, never change this damage type to Bludgeon because of an infinite loop
                Log.info("Causing damage to unit", overflow)
                this.UnitDamageTarget(target, target, overflow, AttackType.Untyped, DamageType.Strain, false);
                // source.damageTarget(target.handle, overflow, 0, false, false, ATTACK_TYPE_CHAOS, DAMAGE_TYPE_UNIVERSAL, WEAPON_TYPE_WHOKNOWS);
            }
        } else {
            target.mana += event.strain;
        }
        this.damageDisplayManager.DisplayDamageEvent(event);
    }

    CreateDamageEvent({
        source,
        target,
        damage,
        strain = 0,
        attackType = AttackType.Untyped,
        damageType = DamageType.Untyped,
        isCrit = false
    }: {
        source: Unit,
        target: Unit,
        damage: number,
        strain?: number,
        attackType?: AttackType,
        damageType?: DamageType,
        isCrit?: boolean
    }): DamageEvent {

        let count = 0;
        if ((damageType & DamageType.Bludgeon) == DamageType.Bludgeon) count++;
        if ((damageType & DamageType.Slashing) == DamageType.Slashing) count++;
        if ((damageType & DamageType.Piercing) == DamageType.Piercing) count++;


        let event = new DamageEvent({
            source: source,
            targetUnit: target,
            damageType: damageType,
            damageTypeCount: count,
            attackType: attackType,
            damage: damage,
            strain: strain,
            isCrit: isCrit
        });
        return event;
    }

    UnitDamageTarget(source: Unit, target: Unit, amount: number, attackType: AttackType, damageType: DamageType, isCrit: boolean = false): void {
        
        Log.info("Called UnitDamageTarget");
        let event = this.CreateDamageEvent({
            source,
            target,
            damage: amount,
            attackType,
            damageType,
            isCrit
        });

        event = this.damageEventHandler.Register(event);
        // Log.info("DAMAGING TARGET FOR", event.damage);
        event.damage = math.ceil(event.damage);
        // print("CEIL OF 0 " , math.ceil(0));
        source.damageTarget(event.targetUnit.handle, event.damage, false, false, ATTACK_TYPE_CHAOS, DAMAGE_TYPE_UNIVERSAL, WEAPON_TYPE_WHOKNOWS);
        this.damageDisplayManager.DisplayDamageEvent(event);
    }

    UnitHealTarget(source: Unit, target: Unit, amount: number, attackType: AttackType, damageType: DamageType, isCrit: boolean = false): void {
        let event = this.CreateDamageEvent({
            source,
            target,
            damage: -amount,
            damageType,
            attackType,
            isCrit
        });

        event = this.damageEventHandler.Register(event);
        let targetUnit = event.targetUnit.handle;
        event.damage = math.floor(event.damage + 0.5);
        SetWidgetLife(targetUnit, GetWidgetLife(targetUnit) - event.damage);
    }
}