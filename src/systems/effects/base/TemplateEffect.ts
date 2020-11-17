// import { Effect } from "./Effect";
// import { FormEffect, FormContext } from "./FormEffect";
// import { Point, Unit } from "w3ts";

// export abstract class TemplateEffect implements Effect {

//     effects: FormEffect[] = [];

//     public Add(effect: FormEffect): TemplateEffect {
//         this.effects.push(effect);
//         return this;
//     }

//     protected ResolveChildren(context: FormContext): void {
//         for (let e of this.effects) {
//             e.context = context;
//             e.Resolve();
//         }
//     }

//     public abstract Resolve(): void;
// }
