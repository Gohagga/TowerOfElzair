// import { Ability, AbilityData } from "systems/ability/Ability";
// import { ISlotManager } from "systems/slottable/ISlotManager";
// import { NoEffectAbility } from "systems/ability/NoEffectAbility";
// import { Unit } from "w3ts";
// import { EventUnitUsedAbilityHandler } from "events/ability/EventUnitUsedAbilityHandler";
// import { InjectionContainer } from "providers/implementations/InjectionContainer";
// import { IAbilityEventHandler } from "events/ability/IAbilityEventHandler";
// import { IAbility } from "systems/ability/IAbility";

// export class AbilityBuilder {

//     private container: Record<string, new (svc: Record<string, any>, abilityData: AbilityData, ...args: any[]) => Ability> = {};
//     private svc: Record<string, any>;
//     private spellEvent: IAbilityEventHandler;

//     constructor(svc: {
//         SpellEvent: IAbilityEventHandler
//     }) {
//         this.svc = svc;
//         this.spellEvent = svc.SpellEvent;
//     }

//     register(c: new (container: any, abilityData: AbilityData) => Ability): AbilityBuilder;
//     register(c: new (container: any, abilityData: AbilityData, ...args: any[]) => Ability): AbilityBuilder;
//     register(c: new (container: any, abilityData: AbilityData, ...args: any[]) => Ability): AbilityBuilder {
//         this.container[c.name] = c;
//         return this;
//     }

//     registerAll(cList: (new (container: any, abilityData: AbilityData, ...args: any[]) => Ability)[]): AbilityBuilder {
//         for (let c of cList) {
//             this.container[c.name] = c;
//         }
//         return this;
//     }

//     build(data: AbilityData) {

//         if (data.controller && data.controller in this.container == false) {
//             print("Error - ability controller missing for", data.name);
//             return;
//         }
        
//         print("building ability");
//         let ability: IAbility;
//         if (data.controller) {
//             const constr = this.container[data.controller];
//             ability = new constr(this.svc, data);
//         } else {
//             ability = new NoEffectAbility(data);
//         }
//         return ability;
//     }

//     buildAll(data: AbilityData[]) {

//         const abilities: IAbility[] = [];

//         for (let d of data) {
//             if (d.controller && d.controller in this.container == false) {
//                 print("Error - ability controller missing for", d.name);
//             } else if (d.controller) {
//                 const constr = this.container[d.controller];
//                 let ability = new constr(this.svc, d);
//                 abilities.push(ability);
//             } else {
//                 let ability = new NoEffectAbility(d);
//                 abilities.push(ability);
//             }
//         }

//         return abilities;
//     }
// }