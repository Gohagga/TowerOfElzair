export const Abilities = {
    TemplateProjectile: {
        Id: FourCC('A000'),
        Base: FourCC('AEsh'),
        Data: [99999,99999,99999],
        undefined: ["","",""],
        Name: "TemplateProjectile",
        Rng: [9999,9999,9999],
        Cool: [0,0,0],
        Dur: [0.009999999776482582,0.009999999776482582,0.009999999776482582],
        Cost: [0,0,0],
        HeroDur: [0.009999999776482582,0.009999999776482582,0.009999999776482582],
        targs: ["air,enemies,friend,ground,neutral,organic","air,enemies,friend,ground,neutral,organic","air,enemies,friend,ground,neutral,organic"],
        hero: 0,
        race: "commoner",
        checkDep: 0,
        Orderon: "shadowstrike"
    },

    ProjectileMagicMissiles: {
        Id: FourCC('A002'),
        Base: FourCC('AEsh'),
        Data: [99999,99999,99999],
        undefined: ["","",""],
        Name: "ProjectileMagicMissiles",
        Rng: [9999,9999,9999],
        Cool: [0,0,0],
        Dur: [0.009999999776482582,0.009999999776482582,0.009999999776482582],
        Cost: [0,0,0],
        HeroDur: [0.009999999776482582,0.009999999776482582,0.009999999776482582],
        targs: ["air,enemies,friend,ground,neutral,organic","air,enemies,friend,ground,neutral,organic","air,enemies,friend,ground,neutral,organic"],
        hero: 0,
        race: "commoner",
        checkDep: 0,
        Missileart: "DragonHawkMissileBirthless.mdx",
        Orderon: "shadowstrike"
    },

    MagicMissiles: {
        Id: FourCC('A001'),
        Base: FourCC('ANcl'),
        Name: "MagicMissiles",
        EffectArt: "",
        Art: "ReplaceableTextures\\CommandButtons\\BTNDispelMagic.blp",
        ResearchArt: "ReplaceableTextures\\CommandButtons\\BTNDispelMagic.blp",
        CasterArt: "",
        TargetArt: "",
        Targetattach: "",
        Hotkey: "Q",
        undefined: ["B000","B000","B000"],
        Data: [1,1,1],
        Rng: [650,650,650],
        Cost: [20,20,20],
        Tip: ["Magic Missiles","Magic Missiles","Magic Missiles"],
        Ubertip: ["Launches 3 arcane bolts that always hit their target.\n\nEach missile deals 0.75 * |cff7878ffInt|r magic damage.","Launches 3 arcane bolts that always hit their target.\n\nEach missile deals 0.75 * |cff7878ffInt|r magic damage.","Launches 3 arcane bolts that always hit their target.\n\nEach missile deals 0.75 * |cff7878ffInt|r magic damage."],
        Researchhotkey: "Q",
        Buttonpos: 2,
        Cast: [0.20000000298023224,0.20000000298023224,0.20000000298023224],
        Cool: [6.5,6.5,6.5]
    },

    IceBolt: {
        Id: FourCC('A003'),
        Base: FourCC('ANcl'),
        Name: "IceBolt",
        EffectArt: "",
        Art: "ReplaceableTextures\\CommandButtons\\BTNColdArrows.blp",
        ResearchArt: "ReplaceableTextures\\CommandButtons\\BTNColdArrows.blp",
        CasterArt: "",
        TargetArt: "",
        Targetattach: "",
        Hotkey: "W",
        undefined: ["frenzy","frenzy","frenzy"],
        Data: [1,1,1],
        Rng: [650,650,650],
        Cost: [20,20,20],
        Tip: ["Magic Missiles","Magic Missiles","Magic Missiles"],
        Ubertip: ["Launches 3 arcane bolts that always hit their target.\n\nEach missile deals 0.75 * |cff7878ffInt|r magic damage.","Launches 3 arcane bolts that always hit their target.\n\nEach missile deals 0.75 * |cff7878ffInt|r magic damage.","Launches 3 arcane bolts that always hit their target.\n\nEach missile deals 0.75 * |cff7878ffInt|r magic damage."],
        Researchhotkey: "W",
        Buttonpos: 2
    },

    ProjectileIceBolt: {
        Id: FourCC('A004'),
        Base: FourCC('AEsh'),
        Data: [99999,99999,99999],
        undefined: ["","",""],
        Name: "ProjectileIceBolt",
        Rng: [9999,9999,9999],
        Cool: [0,0,0],
        Dur: [0.009999999776482582,0.009999999776482582,0.009999999776482582],
        Cost: [0,0,0],
        HeroDur: [0.009999999776482582,0.009999999776482582,0.009999999776482582],
        targs: ["air,enemies,friend,ground,neutral,organic","air,enemies,friend,ground,neutral,organic","air,enemies,friend,ground,neutral,organic"],
        hero: 0,
        race: "commoner",
        checkDep: 0,
        Missileart: "Abilities\\Weapons\\LichMissile\\LichMissile.mdl",
        Missilespeed: 1600,
        Orderon: "shadowstrike"
    },

    DummyFrostNova: {
        Id: FourCC('A005'),
        Base: FourCC('AUfn'),
        Name: "DummyFrostNova",
        EffectArt: "",
        Data: [0,0,0],
        Orderon: "frostnova",
        Area: [0,0,0],
        Rng: [99999,99999,99999],
        Cool: [0,0,0],
        Cost: [0,0,0],
        hero: 0,
        race: "commoner"
    },

    MagicBurst: {
        Id: FourCC('A006'),
        Base: FourCC('ANcl'),
        Name: "Magic Burst",
        EffectArt: "",
        Art: "ReplaceableTextures\\PassiveButtons\\PASBTNFeedBack.blp",
        ResearchArt: "ReplaceableTextures\\PassiveButtons\\PASBTNFeedBack.blp",
        CasterArt: "Abilities\\Spells\\Other\\HowlOfTerror\\HowlCaster.mdl",
        TargetArt: "",
        Targetattach: "",
        Hotkey: "R",
        undefined: ["thunderclap","thunderclap","thunderclap"],
        Data: [1,1,1],
        Rng: [0,0,0],
        Cost: [50,50,50],
        Tip: ["Magic Burst - Level 1","Magic Burst - Level 2","Magic Burst - Level 3"],
        Ubertip: ["Launches 3 arcane bolts that always hit their target.\n\nEach missile deals 0.75 * |cff7878ffInt|r magic damage.","Launches 3 arcane bolts that always hit their target.\n\nEach missile deals 0.75 * |cff7878ffInt|r magic damage.","Launches 3 arcane bolts that always hit their target.\n\nEach missile deals 0.75 * |cff7878ffInt|r magic damage."],
        Researchhotkey: "R",
        Buttonpos: 2,
        Cast: [0.10000000149011612,0.10000000149011612,0.10000000149011612],
        Researchbuttonpos: 3
    },
}
export const enum Icons {
}
export const enum Models {
    DragonHawkMissileBirthless 	= "DragonHawkMissileBirthless.mdx",
}
export const enum Textures {
}
