import { EffectData } from "systems/effects/EffectBuilder";
import { Point, Unit } from "w3ts/index";
import { AbilityData, AbilityType } from "./Ability";
import { AbilitySlot } from "./AbilitySlot";
import { IAbility } from "./IAbility";

export class NoEffectAbility implements IAbility {
    
    codeId: string;
    slot: AbilitySlot;
    id: number;
    name: string;
    icon?: string;
    iconDisabled?: string;
    type: AbilityType;
    cost: number;

    constructor(data: AbilityData) {
        print("constructor")
        this.codeId = data.codeId;
        this.slot = data.slot;
        this.id = FourCC(data.codeId);
        this.type = data.type;
        this.cost = data.cost;
        this.name = data.name;
        this.icon = data.icon;
        this.iconDisabled = data.iconDisabled;
    }
    controller?: string | undefined;
    effect?: EffectData | undefined;
    
    AddToUnit(unit: Unit): boolean {
        return unit.addAbility(this.id);
    }
    RemoveFromUnit(unit: Unit): boolean {
        return unit.removeAbility(this.id);
    }
    
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): boolean { return true; }
}
