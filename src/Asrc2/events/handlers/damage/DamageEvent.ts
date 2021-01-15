import { Unit } from "Asrc2/models/Unit";
// import { Widget } from "Asrc2/models/Widget";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { DamageEventSubscription } from "./DamageEventSubscription";

export class DamageEvent {
    
    private _source: Unit;
    private _targetUnit: Unit;
    // private _targetWidget: Widget;
    private _damageType: DamageType;
    private _damageTypeCount: number;
    private _damage: number;
    private _isCrit: boolean;
    private _attackType: AttackType;
    private _strain: number;
    private _resistances: Record<DamageType, number>;

    constructor(data: {
        source: Unit,
        targetUnit: Unit,
        // targetWidget: Widget,
        damageType: DamageType,
        damageTypeCount: number,
        attackType: AttackType,
        damage: number,
        strain: number,
        isCrit: boolean,
    }) { 
        this._source = data.source;
        this._targetUnit = data.targetUnit;
        this._damageType = data.damageType;
        this._damageTypeCount = data.damageTypeCount;
        this._attackType = data.attackType;
        this._damage = data.damage;
        this._strain = data.strain;
        this._isCrit = data.isCrit;

        this._resistances = Object.assign({}, data.targetUnit.resistances)
        // this._targetWidget = data.targetWidget;
    }

    public get source(): Unit { return this._source; }
    public get targetUnit(): Unit { return this._targetUnit; }
    // public get targetWidget(): Widget { return this._targetWidget; }
    public get damageType(): DamageType { return this._damageType; }
    public get damageTypeCount(): number { return this._damageTypeCount; }
    public get attackType(): AttackType { return this._attackType; }
    public get damage(): number { return this._damage; }
    public get strain(): number { return this._strain; }
    public get isCrit(): boolean { return this._isCrit; }

    public set damageType(v: DamageType) {
        this._damageType = v;
        // BlzSetEventDamageType(v);
    }

    public set damage(v: number) {
        this._damage = v;
    }

    public set strain(v: number) {
        this._strain = v;
    }

    public set isCrit(v: boolean) {
        this._isCrit = v;
    }
}