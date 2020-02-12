import { Abilities } from "customConfig";
const a: any = Abilities;

export const Spells = {

    // Magician
    MagicMissiles:                      a.MagicMissiles.Id,
    IceBolt:                            a.IceBolt.Id,
    MageArmor:                          a.MageArmor.Id,
    MagicBurst:                         a.MagicBurst.Id,
    ManaInfusion:                       a.ManaInfusion.Id,
    ExtradimensionalPocket:             a.ExtradimensionalPocket.Id,

    // Fighter
    PowerAttack:                        a.PowerAttack.Id,
    Hamstring:                          a.Hamstring.Id,
    CombatExpertise:                    a.CombatExpertise.Id,
    CleavingStrike:                     a.CleavingStrike.Id,

    // Cleric
    Smite:                              a.Smite.Id,
    Heal:                               a.Heal.Id,
    Purify:                             a.Purify.Id,
    Rejuvenate:                         a.Rejuvenate.Id,

    // Archer
    PoisonedArrow:                      a.PoisonedArrow,
    RapidShot:                          a.RapidShot,
    ExplosiveArrows:                    a.ExplosiveArrows,
    RainOfArrows:                       a.RainOfArrows
}

export const Auras = {
    
}

export const Units = {
    Dummy:                               FourCC('nDUM')
}