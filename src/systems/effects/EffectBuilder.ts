import { Effect } from "./base/Effect";
import ILogger from "systems/logger/ILogger";
import { FormEffect } from "./base/FormEffect";
import { SubstanceEffect } from "./base/SubstanceEffect";
import { UnitTargetEffect } from "./target-effects/UnitTargetEffect";
import { EventUnitUsedAbilityHandler } from "event-handlers/implementations/EventUnitUsedAbilityHandler";
import { EventAbility } from "event-handlers/interfaces/IEventUnitUsedAbilityHandler";
import { OnSpellCastProvider } from "providers/implementations/OnSpellCastProvider";

export class EffectBuilder {

    private _services: Record<string, any>;
    private _logger: ILogger;
    private effect: Record<string, new (...args: any[]) => Effect> = {};

    constructor(svc: {
        logger: ILogger,
        CreateEffect: Record<string, new (...args: any[]) => Effect>,
        SpellEvent: EventUnitUsedAbilityHandler,
        OnSpellCastProvider: OnSpellCastProvider
    }) {
        this._services = svc;
        this._logger = svc.logger;
        this.effect = svc.CreateEffect;

        svc.logger.info("Number of services:", Object.keys(this._services).length);
        svc.logger.info("Number of Effects:", Object.keys(this.effect).length);
    }

    register(c: new (...args: any[]) => Effect) {
        this.effect[c.name] = c;
    }

    build(data: EffectData): Effect {

        const type = data.type + "Effect";

        // Try find constructor from data.type
        if (!this.effect[type]) {
            this._logger.info("Could not instantiate", data.type);
            throw new Error("Could not instantiate");
        }

        let component: Effect | null = null;

        // If there are no args needed, just instantiate it and return
        if (!data.args) {
            print("Instantiating", type);
            component = new (this.effect[type])(this._services);
        }
        else {
            const params: any[] = [];
    
            // Else, first loop through the arguments
            for (let arg of data.args) {

                if (typeof(arg) == "string") {
                    print("It is string");
                    // If parameter is a string, split it by dot "."
                    const split = arg.split('.');

                    print(...split);
        
                    // Look for the first part in the services' keys
                    if (this._services[split[0]]) {
        
                        // If it exists and there are multiple parts
                        // Get the last member after the dots
                        print(split[0], split.length)
                        let i = 0;
                        let next = this._services[split[i]];
                        while (split[++i]) {
                            if (!next[split[i]]) this._logger.info("Missing argument", arg);
                            else next = next[split[i]];
                        }
                        print(next.name);
                        params.push(next);
                    } else {
                        params.push(arg);
                    }
                } else {
                    // If parameter does not exist, pass it as a param
                    params.push(arg);
                }
            }
    
            // Instantiate the component using gotten args
            print("Instantiating", type, ...params);
            component = new (this.effect[type])(this._services, ...params);
        }

        // Recurse for .then
        if (data.then && data.then.length > 0) {

            for (let child of data.then) {
                const subcomponent = this.build(child) as FormEffect | SubstanceEffect;
                (component as FormEffect).Add(subcomponent);
            }
        }

        // Return
        return component;
    }
}

export interface EffectData {
    type: string,
    args?: any[],
    then?: EffectData[]
}