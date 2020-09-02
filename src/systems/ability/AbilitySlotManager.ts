// import { ISlotManager } from "../slottable/ISlotManager";
// import { Unit } from 'w3ts'
// import { Ability } from "./Ability";
// import { IAbilitySlotManager } from "./IAbilitySlotManager";

// export class AbilitySlotManager implements IAbilitySlotManager {
    
//     private _instances: Record<number, Record<AbilitySlot, Ability | null>> = {};

//     ApplySlot(owner: Unit, slot: AbilitySlot, item: Ability): void {
        
//         const unitId = owner.id;
//         let unitSlots: Record<AbilitySlot, Ability> =  this._instances[unitId] ||
//             { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null };
        
//         if (slot in unitSlots) unitSlots[slot].RemoveSlot(owner);
//         item.ApplySlot(owner);

//         unitSlots[slot] = item;
//         this._instances[unitId] = unitSlots;
//     }

//     GetSlot(owner: Unit, slot: AbilitySlot): Ability | null {
//         if (owner.id in this._instances == false) return null;
//         return this._instances[owner.id][slot];
//     }

//     RemoveSlot(owner: Unit, slot: AbilitySlot): boolean {
        
//         const id = owner.id;
//         if (owner.id in this._instances == false) return false;
//         if (slot in this._instances[id]) {
//             this._instances[id][slot].RemoveSlot(owner);
//             return true;
//         }
//     }
// }
