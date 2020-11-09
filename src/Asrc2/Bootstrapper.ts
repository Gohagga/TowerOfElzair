import { Bash } from "./content/abilities/melee-combat/Bash";
import { AbilityEvent } from "./events/handlers/ability/AbilityEvent";
import { AbilityEventHandler } from "./events/handlers/ability/AbilityEventHandler";
import { DamageEventHandler } from "./events/handlers/damage/DamageEventHandler";
import { DamageService } from "./services/implementations/DamageService";
import { EnumUnitService } from "./services/implementations/EnumUnitService";
import { AbilitySlot, AbilityType } from "./systems/ability/AbilityEnums";

export function registerComponents() {
    

    const damageEventHandler = new DamageEventHandler();
    const damageService = new DamageService(damageEventHandler);
    const abilityEvent = new AbilityEventHandler();
    const enumService = new EnumUnitService();

    const bash = new Bash({
        codeId: "123",
        name: "bash",
        slot: AbilitySlot.Q,
        type: AbilityType.Physical,
    }, 
        damageService,
        abilityEvent,
        enumService
    );
}