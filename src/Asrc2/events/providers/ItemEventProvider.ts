import { Unit } from "Asrc2/models/Unit";
import { InventoryManager } from "Asrc2/systems/inventory/InventoryManager";
import { Item } from "Asrc2/systems/item/Item";
import { ItemManager } from "Asrc2/systems/item/ItemManager";
import { Log } from "Asrc2/systems/log/Log";
import { Trigger } from "w3ts/index";

export class ItemEventProvider {

    private acquireTrig = new Trigger();
    private dropTrig = new Trigger();
    
    constructor(
        private itemManager: ItemManager
    ) {
        this.acquireTrig.registerAnyUnitEvent(EVENT_PLAYER_UNIT_PICKUP_ITEM);
        this.acquireTrig.addAction(() => {
            Log.info("Item acquire");
            this.itemManager.UnitAcquire(Unit.fromTrigger(), Item.fromItemEvent());
        });

        this.dropTrig.registerAnyUnitEvent(EVENT_PLAYER_UNIT_DROP_ITEM);
        this.dropTrig.addAction(() => {
            Log.info("Item drop");
            this.itemManager.UnitRelease(Unit.fromTrigger(), Item.fromItemEvent());
        });
    }
}