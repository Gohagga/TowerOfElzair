import { Ability, AbilityData } from "systems/ability/Ability";
import { ISlotManager } from "systems/slottable/ISlotManager";
import { AbilitySlot } from "systems/ability/AbilitySlot";
import { Unit } from "w3ts";
import { EventUnitUsedAbilityHandler } from "event-handlers/implementations/EventUnitUsedAbilityHandler";
import { InjectionContainer } from "providers/implementations/InjectionContainer";
import { IEventUnitUsedAbilityHandler } from "event-handlers/interfaces/IEventUnitUsedAbilityHandler";

export class AbilityBuilder {

    private container: Record<string, new (svc: Record<string, any>, abilityData: AbilityData, ...args: any[]) => Ability> = {};
    private svc: Record<string, any>;
    private spellEvent: IEventUnitUsedAbilityHandler;

    constructor(svc: {
        SpellEvent: IEventUnitUsedAbilityHandler
    }) {
        this.svc = svc;
        this.spellEvent = svc.SpellEvent;
    }

    register(c: new (container: any, abilityData: AbilityData) => Ability): AbilityBuilder;
    register(c: new (container: any, abilityData: AbilityData, ...args: any[]) => Ability): AbilityBuilder;
    register(c: new (container: any, abilityData: AbilityData, ...args: any[]) => Ability): AbilityBuilder {
        this.container[c.name] = c;
        return this;
    }

    registerAll(cList: (new (container: any, abilityData: AbilityData, ...args: any[]) => Ability)[]): AbilityBuilder {
        for (let c of cList) {
            this.container[c.name] = c;
        }
        return this;
    }

    build(data: AbilityData) {

        if (data.controller in this.container == false) {
            print("Error - ability controller missing for", data.name);
            return;
        }
        
        const constr = this.container[data.controller];
        let ability = new constr(this.svc, data);
        return ability;
    }

    buildAll(data: AbilityData[]) {

        const abilities: Ability[] = [];

        for (let d of data) {
            if (d.controller in this.container == false) {
                print("Error - ability controller missing for", d.name);
            } else {
                const constr = this.container[d.controller];
                let ability = new constr(this.svc, d);
                abilities.push(ability);
            }
        }

        return abilities;
    }
}