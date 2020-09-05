import { Point, Unit } from "w3ts/index";
import { AbilityData } from "./Ability";
import { AbilitySlot } from "./AbilitySlot";
import { IAbility } from "./IAbility";

export class NoEffectAbility implements IAbility {
    
    codeId: string;
    slot: AbilitySlot;
    id: number;
    name: string;
    icon?: string;
    iconDisabled?: string;

    constructor(data: AbilityData) {
        print("constructor")
        this.codeId = data.codeId;
        this.slot = data.slot;
        this.id = FourCC(data.codeId);
        this.name = data.name;
        this.icon = data.icon;
        this.iconDisabled = data.iconDisabled;
    }
    
    AddToUnit(unit: Unit): boolean {
        return unit.addAbility(this.id);
    }
    RemoveFromUnit(unit: Unit): boolean {
        return unit.removeAbility(this.id);
    }
    
    Execute(caster: Unit, origin: Point, destination: Point, target: Unit): void {}
}
