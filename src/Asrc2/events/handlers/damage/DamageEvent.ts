import { Unit } from "Asrc2/models/Unit";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { DamageEventSubscription } from "./DamageEventSubscription";

export class DamageEvent {
    
    private _source: Unit;
    private _target: Unit;
    private _types: DamageType[];
    private _amount: number;
    private _isCrit: boolean;

    constructor(data: {
        source: Unit,
        target: Unit,
        types: DamageType[],
        amount: number,
        isCrit: boolean,
    }) { 
        this._source = data.source;
        this._target = data.target;
        this._types = data.types;
        this._amount = data.amount;
        this._isCrit = data.isCrit;
    }

    public get source(): Unit { return this._source; }
    public get target(): Unit { return this._target; }
    public get types(): DamageType[] { return this._types; }
    public get amount(): number { return this._amount; }
    public get isCrit(): boolean { return this._isCrit; }

    public set types(v: DamageType[]) {
        this._types = v;
        // BlzSetEventDamageType(v);
    }

    public set amount(v: number) {
        this._amount = v;
    }

    public set isCrit(v: boolean) {
        this._isCrit = v;
    }
}