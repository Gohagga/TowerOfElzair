import { IAbility } from "./IAbility";
import { Unit, Point } from "w3ts/index";
import { Ability, AbilityData } from "./Ability";
import { IAbilityEventHandler, EventAbility } from "events/ability/IAbilityEventHandler";
import { EffectData, EffectBuilder } from "systems/effects/EffectBuilder";
import { Effect } from "systems/effects/base/Effect";
import { CustomContextEffect } from "systems/effects/target-effects/CustomContextEffect";
import { FormEffect } from "systems/effects/base/FormEffect";
import { SimpleAbility } from "./SimpleAbility";

export class EffectAbility extends SimpleAbility {
    
    effect: CustomContextEffect;
    
    constructor(svc: {
        spellEvent: IAbilityEventHandler,
        EffectBuilder: EffectBuilder
    },  data: AbilityData) {
        super(svc, data);
        print("Ability constructor finished");
        
        // Parse the effect from effect builder and do stuff
        this.effect = new CustomContextEffect();
        
        if (!data.effect) return;
        this.effect.Add(svc.EffectBuilder.build(data.effect) as FormEffect);
    }
    
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): boolean {

        print(caster.name, "casts ", this.name, "at", target.name);
        this.effect.context = {
            sourceUnit: caster,
            origin: origin,
            destination: destination,
            targetUnit: target,
            focus: target || caster
        }
        this.effect.Resolve();
        return true;
    }
}
