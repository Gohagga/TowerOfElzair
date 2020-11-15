export const enum DamageType {

    Untyped,

    /**Deals strain damage based on damage dealt.*/
    Crushing,
    /**On critical strike applies or increases a permanent bleed effect.*/
    Slashing,
    /**Deals 100% bonus damage on critical strike.*/
    Piercing,
}