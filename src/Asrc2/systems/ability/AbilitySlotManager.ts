import { Constants } from "Asrc2/config/Constants";
import { Unit } from "Asrc2/models/Unit";
import { Timer } from "w3ts/index";
import { Log } from "../log/Log";
import { ISlotManager } from "../slot/ISlotManager";
import { ISlottable } from "../slot/ISlottable";
import { UnitSlotManager } from "../slot/UnitSlotManager";
import { Ability } from "./Ability";
import { AbilitySlot } from "./AbilityEnums";

export type AbilitySlotItem = { release: ISlottable<Unit>, ability: Ability };

export class AbilitySlotManager {

    protected _instances: Record<number, Record<AbilitySlot, AbilitySlotItem>> = {};

    CanApply(owner: Unit, ability: Ability) {
        let slot = ability.slot;
        if (owner.id in this._instances == false) return true;
        if (slot in this._instances[owner.id]) {
            let ability = this._instances[owner.id][slot].ability;
            return owner.getAbilityCooldownRemaining(ability.id, 0) < 10;
        }
    }

    ApplySlot(owner: Unit, ability: Ability, release: ISlottable<Unit>, slot: AbilitySlot = ability.slot): boolean {

        if (this.CanApply(owner, ability) == false) return false;
        let item: AbilitySlotItem = {
            ability,
            release
        };

        Log.info("SLOT", slot);

        // if (!slot) slot = ability.slot;
        let unitSlots = this._instances[owner.id] || {} as Record<AbilitySlot, AbilitySlotItem>;
        if (slot in unitSlots) {
            if (unitSlots[slot].release(owner) == false) return false;
        }

        unitSlots[slot] = item;
        this._instances[owner.id] = unitSlots;
        
        // Start all unit's ability cooldown with 10 seconds
        new Timer().start(0, false, () => {
            let slots = Object.keys(unitSlots) as unknown as AbilitySlot[];
            for (let s of slots) {
                let extId = unitSlots[s].ability.extId;
                let abilityId = s >= 4 && extId ? extId : unitSlots[s].ability.id;

                if (owner.getAbilityCooldownRemaining(abilityId, 0) < Constants.AbilitySwapCooldown) {
                    owner.startAbilityCooldown(abilityId, Constants.AbilitySwapCooldown);
                }
            }
        });

        return true;
    }

    GetSlot(owner: Unit, slot: AbilitySlot):  Ability | null {
        if (owner.id in this._instances == false) return null;
        return this._instances[owner.id][slot] && this._instances[owner.id][slot].ability;
    }

    RemoveSlot(owner: Unit, slot: AbilitySlot): boolean {
        
        const id = owner.id;
        if (id in this._instances == false) return false;
        if (slot in this._instances[id]) {
            this._instances[id][slot].release(owner);
            delete this._instances[id][slot];
            return true;
        }
        return false;
    }
}