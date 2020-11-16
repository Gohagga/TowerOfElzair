import { DamageEvent } from "Asrc2/events/handlers/damage/DamageEvent";
import { IDamageEventHandler } from "Asrc2/events/handlers/damage/IDamageEventHandler";
import { Unit } from "Asrc2/models/Unit";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { Log } from "Asrc2/systems/log/Log";
import { damageTypes } from "providers/implementations/DamageProvider";
import { IDamageService } from "../interfaces/IDamageService";

export class DamageService implements IDamageService {

    constructor(
        private damageEventHandler: IDamageEventHandler
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

        // Try to increase the guy's value
        const max = target.maxMana;
        const curr = target.mana;
        let overflow = curr + event.strain - max;

        print("overflow: ", overflow);
        
        if (overflow > 0) {
            print(1)
            target.mana = max;

            print(2)
            // Handle overflow
            if (event.attackType == AttackType.Magic) {
                print(2.1)
                // Dummy cast something
            } else if (event.attackType == AttackType.Physical) {
                print(2.2)
                // True damage, never change this damage type to Bludgeon because of an infinite loop
                Log.info("Causing damage to unit", overflow)
                this.UnitDamageTarget(target, target, overflow, AttackType.Untyped, DamageType.Strain, false);
                // source.damageTarget(target.handle, overflow, 0, false, false, ATTACK_TYPE_CHAOS, DAMAGE_TYPE_UNIVERSAL, WEAPON_TYPE_WHOKNOWS);
            }
        } else {
            target.mana += event.strain;
        }
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
            target: target,
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
        print("DAMAGING TARGET FOR", event.damage);
        source.damageTarget(event.target.handle, event.damage, 0, false, false, ATTACK_TYPE_CHAOS, DAMAGE_TYPE_UNIVERSAL, WEAPON_TYPE_WHOKNOWS);
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
        let targetUnit = event.target.handle;
        SetWidgetLife(targetUnit, GetWidgetLife(targetUnit) - event.damage);
    }
    
    private readonly attackTypes: Record<DamageType, attacktype> = {
        [DamageType.Untyped]: ATTACK_TYPE_CHAOS,
        [DamageType.Bludgeon]: ATTACK_TYPE_NORMAL,
        [DamageType.Slashing]: ATTACK_TYPE_NORMAL,
        [DamageType.Piercing]: ATTACK_TYPE_NORMAL,
    }
    
    private readonly damageTypes: Record<DamageType, damagetype> = {
        [DamageType.Untyped]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Bludgeon]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Slashing]: DAMAGE_TYPE_UNIVERSAL,
        [DamageType.Piercing]: DAMAGE_TYPE_UNIVERSAL,
    }
}