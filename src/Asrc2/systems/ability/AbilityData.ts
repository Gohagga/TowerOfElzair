import { AttackType } from "../damage/AttackType";
import { AbilitySlot, AbilityType } from "./AbilityEnums";

export type AbilityData = {
    
    /**Id of wc3 ability. */
    codeId: string,

    /**Id of wc3 ability for extended slot. */
    extCodeId?: string,

    /**Ability slot of the skill. QWER... */
    slot: AbilitySlot,

    name: string,

    type: AttackType,

    icon: string,

    iconDisabled?: string,
}