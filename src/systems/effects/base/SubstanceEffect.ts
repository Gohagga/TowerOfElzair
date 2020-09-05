import { Effect } from "./Effect";
import { Unit } from "w3ts";

export abstract class SubstanceEffect implements Effect {

    context: SubstanceContext | null = null;
    
    public abstract Resolve(): void;
}

export interface SubstanceContext {
    sourceUnit: Unit;
    /**Baseline unit upon which Effects will act upon. */
    focus: Unit;
}