import { AbilitySlot, AbilityType } from "./AbilityEnums";

export type AbilityData = {
    
    /**Id of wc3 ability. */
    codeId: string,

    /**Ability slot of the skill. QWER... */
    slot: AbilitySlot,

    name: string,

    type: AbilityType,

    icon?: string,

    iconDisabled?: string,
}