import { Unit } from "Asrc2/models/Unit";
import { Log } from "../log/Log";
import { IItem } from "./IItem";
import { InventoryManager } from "../inventory/InventoryManager";
import { Item } from "./Item";
import { ItemDefinition } from "./ItemDefinition";

export class ItemManager {
    
    private definitions: Record<number, ItemDefinition> = {};
    private instances: Record<number, IItem> = {};

    constructor(
        itemDefs: ItemDefinition[],
        // private inventoryManager: InventoryManager
    ) {
        for (let def of itemDefs) {
            if (!def.codeId || def.codeId == "") Log.info("Code id not defined on an item definition.");
            this.definitions[FourCC(def.codeId)] = def;
        }
    }

    private RegisterItem(itemId: number, itemTypeId: number) {
        
        Log.info(5)
        let def = this.definitions[itemTypeId];
        if (itemTypeId in this.definitions) {
            Log.info(5.1)
            let it = {
                OnAcquire: def.OnAcquire,
                OnRelease: def.OnRelease,
                OnEquip: def.OnEquip,
                OnUnequip: def.OnUnequip,
                OnUse: def.OnUse
            };
            this.instances[itemId] = it;
        } else {
            Log.info(5.2)
            this.instances[itemId] = {};
        }
    }

    UnitAcquire(unit: Unit, item: Item) {
        Log.info(4)
        const itemId = item.id;
        Log.info(4)
        if (itemId in this.instances == false) this.RegisterItem(itemId, item.typeId);
        
        let callback = this.instances[itemId].OnAcquire;
        if (callback) callback(unit);
    }

    UnitRelease(unit: Unit, item: Item) {
        const itemId = item.id;
        if (itemId in this.instances == false) this.RegisterItem(itemId, item.typeId);
        
        let callback = this.instances[itemId].OnRelease;
        if (callback) callback(unit);
    }

    UnitEquip(unit: Unit, item: Item) {
        const itemId = item.id;
        if (itemId in this.instances == false) this.RegisterItem(itemId, item.typeId);
        
        let callback = this.instances[itemId].OnEquip;
        if (callback) callback(unit);
    }

    UnitUnequip(unit: Unit, item: Item) {
        const itemId = item.id;
        if (itemId in this.instances == false) this.RegisterItem(itemId, item.typeId);
        
        let callback = this.instances[itemId].OnUnequip;
        if (callback) callback(unit);
    }
}