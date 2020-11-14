import { Unit } from "Asrc2/models/Unit";

export interface ItemDefinition {

    codeId: string;

    name: string;

    OnAcquire?: (unit: Unit) => void;

    OnRelease?: (unit: Unit) => void;

    OnEquip?: (unit: Unit) => void;

    OnUnequip?: (unit: Unit) => void;

    OnUse?: (unit: Unit) => void;
}