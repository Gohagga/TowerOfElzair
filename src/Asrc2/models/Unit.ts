import { DamageType } from "Asrc2/systems/damage/DamageType";
import { Effect, Unit as ThUnit, Widget } from "w3ts/index";
import { AttackMethod } from "./AttackMethod";
import { WeaponAnimationName } from "./WeaponAnimationName";

export class Unit extends ThUnit {

    
    public static from(unit: unit): Unit {
        return this.getObject(unit);
    }
    
    public static fromTrigger(): Unit {
        return this.getObject(GetTriggerUnit());
    }
    
    private static damageTypes: Record<number, DamageType> = {};
    public get damageType(): DamageType {
        return Unit.damageTypes[this.id] || DamageType.Untyped;
    }
    public set damageType(v: DamageType) {
        Unit.damageTypes[this.id] = v;
    }
    
    private static resistances: Record<number, Record<DamageType, number>> = {};
    public get resistances(): Record<DamageType, number> {
        if (this.id in Unit.resistances == false)
            Unit.resistances[this.id] = {};
        return Unit.resistances[this.id];
    }

    public set resistances(v: Record<DamageType, number>) {
        Unit.resistances[this.id] = v;
    }

    addEffect(modelName: string, attachPointName: string) {
        return new Effect(modelName, this, attachPointName);
    }


    // Animation
    private _weaponAnimationName: WeaponAnimationName = WeaponAnimationName.None;
    public get weaponAnimationName(): WeaponAnimationName {
        return this._weaponAnimationName;
    }
    public set weaponAnimationName(value: WeaponAnimationName) {
        AddUnitAnimationProperties(this.handle, this._weaponAnimationName, false);
        this._weaponAnimationName = value;
        if (this._weaponAnimationName != WeaponAnimationName.None)
            AddUnitAnimationProperties(this.handle, this._weaponAnimationName, true);
    }

    // Attack range
    private _attackRange: number = 0;
    public get attackRange() {
        return this._attackRange;
    }
    public set attackRange(value: number) {
        
        let newLevel = math.floor(value * 0.01 + 0.5) * 10;
        let newRange = newLevel * 10;
        this._attackRange = newRange;

        newLevel = math.max(newLevel - 10, 0);
        this.owner.setTechResearched(FourCC('R000'), newLevel);
    }

    // Attack method
    // private _attackMethod: AttackMethod = AttackMethod.Basic;
    private _attackMethod: null | ((p: any) => boolean | void) = null;
    public set attackMethod(value: ((p: any) => boolean | void) | null) {
        this._attackMethod = value;
    }
    public get attackMethod() {
        return this._attackMethod;
    }
}