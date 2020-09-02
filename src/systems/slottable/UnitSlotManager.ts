import { ISlotManager } from "./ISlotManager";
import { ISlottable } from "./ISlottable";
import { Unit } from "w3ts";

export class UnitSlotManager<SlotType extends number> implements ISlotManager<Unit, SlotType> {
    
    private _instances: Record<number, Record<SlotType, ISlottable<Unit>>> = {};

    constructor() {
        
    }

    ApplySlot(owner: Unit, slot: SlotType, item: ISlottable<Unit>): void {
        
        let x = {};
        let unitSlots = this._instances[owner.id] || {} as Record<SlotType, ISlottable<Unit>>;
        
        if (slot in unitSlots) unitSlots[slot](owner);

        unitSlots[slot] = item;
        this._instances[owner.id] = unitSlots;
    }

    GetSlot(owner: Unit, slot: SlotType): ISlottable<Unit> | null {
        if (owner.id in this._instances == false) return null;
        return this._instances[owner.id][slot];
    }

    RemoveSlot(owner: Unit, slot: SlotType): boolean {
        
        const id = owner.id;
        if (id in this._instances == false) return false;
        if (slot in this._instances[id]) {
            this._instances[id][slot](owner);
            delete this._instances[id][slot];
            return true;
        }
        return false;
    }
}