import { Unit } from "w3ts/index";
import { IItem } from "../item/IItem";
import { Item } from "../item/Item";

export class InventoryManager {

    // unit id -> slot -> Item
    private instances: Record<number, Record<number, IItem>> = {};

    AddToUnit(unit: Unit, item: Item): boolean {

        // const unitId = unit.id;

        // if (unitId in this.instances == false)
        //     this.instances[unitId] = {};

        // const current = this.instances[unit.id][]

        return true;
    }

    RemoveFromUnit(unit: Unit, item: IItem): boolean {

        return false;
    }
}