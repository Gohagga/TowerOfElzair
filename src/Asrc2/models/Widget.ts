// import { DamageType } from "Asrc2/systems/damage/DamageType";
// import { Effect, Unit as ThUnit, Widget as ThWidget } from "w3ts/index";

// export class Widget extends ThWidget {

    
//     public static from(unit: widget): Widget {
//         return this.getObject(unit);
//     }
    
//     public static fromTrigger(): Widget {
//         return this.getObject(GetTriggerWidget());
//     }
    
//     private static damageTypes: Record<number, DamageType> = {};
//     public get damageType(): DamageType {
//         return Widget.damageTypes[this.id] || DamageType.Untyped;
//     }
//     public set damageType(v: DamageType) {
//         Widget.damageTypes[this.id] = v;
//     }
    
//     private static resistances: Record<number, Record<DamageType, number>> = {};
//     public get resistances(): Record<DamageType, number> {
//         return Widget.resistances[this.id] || {};
//     }
//     public set resistances(v: Record<DamageType, number>) {
//         Widget.resistances[this.id] = v;
//     }

//     addEffect(modelName: string, attachPointName: string) {
//         return new Effect(modelName, this, attachPointName);
//     }

// }