import { Unit, Point } from "w3ts";
import { AbilitySlot } from "./AbilitySlot";
import { EventAbility, IEventUnitUsedAbilityHandler } from "event-handlers/interfaces/IEventUnitUsedAbilityHandler";
import { IAbility } from "./IAbility";
import { IOnSpellCastProvider } from "providers/interfaces/IOnSpellCastProvider";
import { EffectData } from "systems/effects/EffectBuilder";

export abstract class Ability implements IAbility {

    id: number;
    codeId: string;
    slot: AbilitySlot;

    private abilityUsedHandler: IEventUnitUsedAbilityHandler;

    public name: string;

    constructor(svc: {
        SpellEvent: IEventUnitUsedAbilityHandler,
    },
        data: AbilityData,
    ) {
        this.abilityUsedHandler = svc.SpellEvent;

        this.codeId = data.codeId;
        this.slot = data.slot;
        this.id = FourCC(data.codeId);
        this.name = data.name;

        print("Constructing", Ability.name, this.codeId, this.slot, this.name);

        print("Registering spell cast", data.codeId);
        this.abilityUsedHandler.Register(EventAbility.Effect, this.id, (event: IOnSpellCastProvider) => {
            print("Ability was used", this.name);
            const caster = event.GetCaster();
            const target = event.GetTargetUnit();
            const destination = event.GetTargetPoint() || target.point;
            const origin = caster.point;
            this.Execute(caster, origin, destination, target);
        });
    }

    abstract Execute(caster: Unit, origin: Point, destination: Point, target: Unit): void;

    AddToUnit(unit: Unit): boolean {
        return unit.addAbility(this.id);
    }

    RemoveFromUnit(unit: Unit): boolean {
        if (unit.getAbilityLevel(this.id) > 0) {
            return unit.removeAbility(this.id);
        }
        return false;
    }
}

export type AbilityData = {
    
    /**Id of wc3 ability. */
    codeId: string,

    /**Ability slot of the skill. QWER... */
    slot: AbilitySlot,

    name: string,

    controller: string,

    effect?: EffectData,
}