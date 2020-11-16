import { Unit } from "Asrc2/models/Unit";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { DamageEventSubscription } from "./DamageEventSubscription";

export class DamageEvent {
    
    private _source: Unit;
    private _target: Unit;
    private _damageType: DamageType;
    private _damageTypeCount: number;
    private _damage: number;
    private _isCrit: boolean;
    private _attackType: AttackType;
    private _strain: number;

    constructor(data: {
        source: Unit,
        target: Unit,
        damageType: DamageType,
        damageTypeCount: number,
        attackType: AttackType,
        damage: number,
        strain: number,
        isCrit: boolean,
    }) { 
        this._source = data.source;
        this._target = data.target;
        this._damageType = data.damageType;
        this._damageTypeCount = data.damageTypeCount;
        this._attackType = data.attackType;
        this._damage = data.damage;
        this._strain = data.strain;
        this._isCrit = data.isCrit;
    }

    public get source(): Unit { return this._source; }
    public get target(): Unit { return this._target; }
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

    public set isCrit(v: boolean) {
        this._isCrit = v;
    }
}