import { AbilityData } from "Asrc2/systems/ability/AbilityData";
import { AbilitySlot } from "Asrc2/systems/ability/AbilityEnums";
import { AttackType } from "Asrc2/systems/damage/AttackType";
import { IconPath } from "Asrc2/config/IconPath";

export const abilityDataRecord = {
    bash: {
        codeId: "A001",
        name: "Bash",
        slot: AbilitySlot.Q,
        type: AttackType.Physical,
        icon: IconPath.BTNDeathPact
    },
    sprint: {
        codeId: "A002",
        name: "Sprint",
        slot: AbilitySlot.W,
        type: AttackType.Physical,
        icon: IconPath.BTNWindWalkOn
    },
    slam: {
        codeId: "A003",
        name: "Slam",
        slot: AbilitySlot.E,
        type: AttackType.Physical,
        icon: IconPath.BTNSpikedBarricades
    },
    groundSmash: {
        codeId: "A004",
        name: "Ground Smash",
        slot: AbilitySlot.R,
        type: AttackType.Physical,
        icon: IconPath.BTNEarthquake
    },

    swing: {
        codeId: "A005",
        name: "Swing",
        slot: AbilitySlot.Q,
        type: AttackType.Physical,
        icon: IconPath.BTNOrcMeleeUpOne
    },
    charge: {
        codeId: "A006",
        name: "Charge",
        slot: AbilitySlot.W,
        buffId: "BOwk",
        auraId: "",
        type: AttackType.Physical,
        icon: IconPath.BTNUpgradeRegenerationAura
    },
    cleave: {
        codeId: "A007",
        name: "Cleave",
        slot: AbilitySlot.E,
        type: AttackType.Physical,
        icon: IconPath.BTNCleavingAttack
    },
    battleRush: {
        codeId: "A008",
        name: "BattleRush",
        slot: AbilitySlot.R,
        icon: IconPath.BTNGhoulFrenzy,
        type: AttackType.Physical,
    },

    firebolt: {
        codeId: "A009",
        name: "Firebolt",
        slot: AbilitySlot.Q,
        icon: IconPath.BTNBreathOfFire,
        type: AttackType.Magic,
    }
};

// export const abilityData: AbilityData[] = [
//     {
//         codeId: "AHtb",
//         name: "StormBolt",
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: "AHtc",
//         name: "ThunderClap",
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: "AHbh",
//         name: "Bash",
//         icon: IconPath.BTNBash,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: "AHav",
//         name: "Avatar",
        
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: "AHfs",
//         name: "Flamestrike",
        
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: "AHbn",
//         name: "Banish",
        
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: "AHdr",
//         name: "SiphonMana",
        
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: "AHpx",
//         name: "Phoenix",
        
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: "AHbz",
//         name: "Blizzard",
        
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: "AHwe",
//         name: "SummonWaterElemental",
        
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: "AHab",
//         name: "BrillianceAura",
//         icon: IconPath.BTNBrilliance,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: "AHmt",
//         name: "MassTeleport",
        
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: "AHhb",
//         name: "HolyLight",
        
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: "AHds",
//         name: "DivineShield",
        
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: "AHad",
//         name: "DevotionAura",
//         icon: IconPath.BTNDevotion,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: "AHre",
//         name: "Resurrection",
        
//         slot: AbilitySlot.R,
//     },

//     {
//         codeId: "AOvd",
//         name: "BigBadVoodoo",
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: "AOcl",
//         name: "ChainLightning",
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: "AOww",
//         name: "Bladestorm",
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: "AOcr",
//         name: "CriticalStrike",
//         icon: IconPath.BTNCriticalStrike,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: "AOeq",
//         name: "Earthquake",
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: "AOae",
//         name: "EnduranceAura",
//         icon: IconPath.BTNCommand,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: "AOfs",
//         name: "FarSight",
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: "AOsf",
//         name: "FeralSpirit",
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: "AOhw",
//         name: "HealingWave",
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: "AOhx",
//         name: "Hex",
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: "AOmi",
//         name: "MirrorImage",
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: "AOre",
//         name: "Reincarnation",
//         icon: IconPath.BTNReincarnation,
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: "AOsw",
//         name: "SerpentWard",
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: "AOsh",
//         name: "Shockwave",
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: "AOws",
//         name: "WarStomp",
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: "AOwk",
//         name: "WindWalk",
//         slot: AbilitySlot.Q,
//     }
//     // {
//     //     codeId: "AF00",
//     //     name: "Bash",
//     //     controller: "Bash",
//     //     slot: AbilitySlot.Q,
//     //     effect: {
//     //         type: "Damage",
//     //         args: [25, 5]
//     //     }
//     // },
//     // {
//     //     codeId: "AF01",
//     //     name: "Sprint",
//     //     controller: "None",
//     //     slot: AbilitySlot.W,
//     // },
//     // {
//     //     slot: AbilitySlot.E,
//     //     codeId: "AF02",
//     //     controller: "EffectAbility",
//     //     name: "Slam",
//     //     effect: {
//     //         type: "Damage",
//     //         args: [50, 5]
//     //     }
//     // },
//     // {
//     //     name: "GroundSmash",
//     //     codeId: "AF03",
//     //     controller: "None",
//     //     slot: AbilitySlot.R,
//     // },
//     // {
//     //     name: "ExampleAbility",
//     //     codeId: 'A002',
//     //     controller: "EffectAbility",
//     //     slot: AbilitySlot.Q,
//     //     effect: {
//     //         type: "AoeFork",
//     //         args: [400.0, null],
//     //         then: [{
//     //             type: "Projectile",
//     //             args: ["DummyFireballProjectile"],
//     //             then: [{
//     //             //     type: "DummyCast",
//     //             //     args: ["DummyBanish"]
//     //             // }, {
//     //                 type: "Damage",
//     //                 args: [50.0, "Magical"]
//     //             }, {
//     //                 type: "FocusAsOrigin",
//     //                 then: [{
//     //                     type: "CasterAsFocus",
//     //                     then: [{
//     //                         type: "Projectile",
//     //                         args: ["DummyFireballProjectile"],
//     //                         then: [{
//     //                             type: "Damage",
//     //                             args: [6.0, "Magical"]
//     //                         }]
//     //                     }]
//     //                 }]
//     //             }]
//     //         }]
//     //     }
//     // }
// ]