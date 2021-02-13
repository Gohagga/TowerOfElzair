/**Player specific  */
export class InventoryModelView {

    // Takes a view, watcher player
    constructor() {
        
    }

    private _inventoryManager: string | null = null;
    public get inventoryManager(): string | null {
        return this._inventoryManager;
    }
    public set inventoryManager(v: string | null) {
        this._inventoryManager = v;
    }
    
    public Show() {

        // If _inventoryManager is null, don't do anything.
        if (!this._inventoryManager) return;

        // Render inventory on Show
        
    }
}