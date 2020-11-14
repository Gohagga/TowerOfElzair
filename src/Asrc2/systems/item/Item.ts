import { Item as ThItem } from "w3ts/index";
import { IItem } from "./IItem";
import { InventoryManager } from "../inventory/InventoryManager";

export abstract class Item extends ThItem {
    
    private static instances: Record<number, Item> = {};
    
    public static fromItemEvent() {
        return this.fromHandle(GetManipulatedItem());
    }

}