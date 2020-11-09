import { Unit } from "Asrc2/models/Unit";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { DamageEventSubscription } from "./DamageEventSubscription";

export class DamageEvent {
    
    private _source: Unit;
    private _target: Unit;
    private _type: DamageType;
    private _amount: number;

    constructor(data: {
        source: Unit,
        target: Unit,
        type: DamageType,
        amount: number,
    }) { 
        this._source = data.source;
        this._target = data.target;
        this._type = data.type;
        this._amount = data.amount;
    }

    public get source(): Unit { return this._source; }
    public get target(): Unit { return this._target; }
    public get type(): DamageType { return this._type; }
    public get amount(): number { return this._amount; }

    public set type(v: DamageType) {
        this._type = v;
        // BlzSetEventDamageType(v);
    }

    public set amount(v: number) {
        this._amount = v;
    }
}