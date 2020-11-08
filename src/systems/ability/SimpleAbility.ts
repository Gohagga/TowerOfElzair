import { AbilityEventData } from "events/ability/AbilityEventData";
import { EventAbility, IAbilityEventHandler } from "events/ability/IAbilityEventHandler";
import { Unit, Point } from "w3ts/index";
import { Ability, AbilityData } from "./Ability";
import { AbilitySlot } from "./AbilitySlot";
import { IAbility } from "./IAbility";

export abstract class SimpleAbility extends Ability {
    
    abilityEventHandler: IAbilityEventHandler;

    id: number;
    codeId: string;
    slot: AbilitySlot;

    public name: string;

    constructor(svc: {
        spellEvent: IAbilityEventHandler,
    },
        data: AbilityData,
    ) {
        
        super(data);
        this.abilityEventHandler = svc.spellEvent;

        this.codeId = data.codeId;
        this.slot = data.slot;
        this.id = FourCC(data.codeId);
        this.name = data.name;

        print("Constructing", Ability.name, this.codeId, this.slot, this.name);

        print("Registering spell cast", data.codeId);

        this.abilityEventHandler.Subscribe(EventAbility.Effect, this.id, (event: AbilityEventData) => {
            print("Ability was used", this.name);
            const caster = event.caster;
            const target = event.targetUnit;
            const destination = event.targetPoint || target.point;
            const origin = caster.point;
            const success = this.Execute(caster, origin, destination, target);
            print("success?", success);
            if (success) {
                this.ApplyCost(caster);
            }
        });
    } 
}