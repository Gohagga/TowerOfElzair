// import { SubstanceEffect, SubstanceContext } from "./SubstanceEffect";
// import { Effect } from "./Effect";
// import { Point, Unit } from "w3ts";

// export abstract class FormEffect implements Effect {

//     context: FormContext | null = null;
//     effects: (FormEffect | SubstanceEffect)[] = [];

//     protected ResolveChildren(context: FormContext | SubstanceContext): void {
//         for (let e of this.effects) {
//             e.context = context;
//             e.Resolve();
//         }
//     }

//     public Add(effect: FormEffect | SubstanceEffect): FormEffect {
//         this.effects.push(effect);
//         return this;
//     }

//     public abstract Resolve(): void;
// }

// export interface FormContext {
//     origin: Point;
//     sourceUnit: Unit;
//     destination: Point;
//     targetUnit?: Unit;
//     /**Baseline unit upon which Effects will act upon. */
//     focus: Unit;
// }