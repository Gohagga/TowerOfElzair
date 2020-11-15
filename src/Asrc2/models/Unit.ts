import { DamageType } from "Asrc2/systems/damage/DamageType";
import { Unit as ThUnit, Widget } from "w3ts/index";

export class Unit extends ThUnit {

    private static damageTypes: Record<number, DamageType> = {};
    private static resistances: Record<number, Record<DamageType, number>> = {};

    public static from(unit: unit): Unit {
        return this.getObject(unit);
    }

    public static fromTrigger(): Unit {
        return this.getObject(GetTriggerUnit());
    }

    public get damageType(): DamageType {
        return Unit.damageTypes[this.id] || DamageType.Untyped;
    }

    public set damageType(v: DamageType) {
        Unit.damageTypes[this.id] = v;
    }

    public get resistances(): Record<DamageType, number> {
        return Unit.resistances[this.id] || {
            [DamageType.Crushing]: 0,
            [DamageType.Slashing]: 0,
            [DamageType.Piercing]: 0,
            [DamageType.Untyped]: 0
        };
    }

    public set resistances(v: Record<DamageType, number>) {
        Unit.resistances[this.id] = v;
    }
}