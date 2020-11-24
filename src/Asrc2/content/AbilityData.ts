import { AbilityData } from 'Asrc2/systems/ability/AbilityData';
import { AbilitySlot } from 'Asrc2/systems/ability/AbilityEnums';
import { AttackType } from 'Asrc2/systems/damage/AttackType';
import { IconPath } from 'Asrc2/config/IconPath';

export const abilityDataRecord = {
    bash: {
        codeId: 'A001',
        extCodeId: 'A00H',
        name: 'Bash',
        slot: AbilitySlot.Q,
        type: AttackType.Physical,
        icon: IconPath.BTNDeathPact
    },
    sprint: {
        codeId: 'A002',
        extCodeId: 'A00N',
        name: 'Sprint',
        slot: AbilitySlot.W,
        type: AttackType.Physical,
        icon: IconPath.BTNWindWalkOn
    },
    slam: {
        codeId: 'A003',
        extCodeId: 'A00M',
        name: 'Slam',
        slot: AbilitySlot.E,
        type: AttackType.Physical,
        icon: IconPath.BTNSpikedBarricades
    },
    groundSmash: {
        codeId: 'A004',
        name: 'Ground Smash',
        slot: AbilitySlot.R,
        type: AttackType.Physical,
        icon: IconPath.BTNEarthquake
    },

    swing: {
        codeId: 'A005',
        extCodeId: 'A00O',
        name: 'Swing',
        slot: AbilitySlot.Q,
        type: AttackType.Physical,
        icon: IconPath.BTNOrcMeleeUpOne
    },
    charge: {
        codeId: 'A006',
        extCodeId: 'A00P',
        name: 'Charge',
        slot: AbilitySlot.W,
        buffId: 'BOwk',
        auraId: '',
        type: AttackType.Physical,
        icon: IconPath.BTNUpgradeRegenerationAura
    },
    cleave: {
        codeId: 'A007',
        extCodeId: 'A00L',
        name: 'Cleave',
        slot: AbilitySlot.E,
        type: AttackType.Physical,
        icon: IconPath.BTNCleavingAttack
    },
    battleRush: {
        codeId: 'A008',
        name: 'BattleRush',
        slot: AbilitySlot.R,
        icon: IconPath.BTNGhoulFrenzy,
        type: AttackType.Physical,
    },

    firebolt: {
        codeId: 'A009',
        extCodeId: 'A00B',
        name: 'Firebolt',
        slot: AbilitySlot.Q,
        icon: IconPath.BTNFireBolt,
        type: AttackType.Magic,
    },
    fieryEscape: {
        codeId: 'A00C',
        extCodeId: 'A00D',
        name: 'Fiery Escape',
        slot: AbilitySlot.W,
        icon: IconPath.BTNBearBlink,
        type: AttackType.Magic,
    },
    ignition: {
        codeId: 'A00F',
        extCodeId: 'A00E',
        name: 'Ignition',
        slot: AbilitySlot.E,
        icon: IconPath.BTNFire,
        type: AttackType.Magic,
    },
    fireball: {
        codeId: 'A00A',
        name: 'Fireball',
        slot: AbilitySlot.R,
        icon: IconPath.BTNBreathOfFire,
        type: AttackType.Magic,
    },

    hellTouch: {
        codeId: 'A00G',
        extCodeId: 'A00I',
        name: 'Hell Touch',
        slot: AbilitySlot.Q,
        icon: IconPath.BTNImmolationOn,
        type: AttackType.Magic,
    },

    flameBlast: {
        codeId: 'A00K',
        extCodeId: 'A00J',
        name: 'Flame Blast',
        slot: AbilitySlot.Q,
        icon: IconPath.BTNWallOfFire,
        type: AttackType.Magic,
    },
    backburn: {
        codeId: 'A00Q',
        extCodeId: 'A00T',
        name: 'Backburn',
        slot: AbilitySlot.W,
        icon: IconPath.BTNDisenchant,
        type: AttackType.Magic,
    }
};

// export const abilityData: AbilityData[] = [
//     {
//         codeId: 'AHtb',
//         name: 'StormBolt',
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: 'AHtc',
//         name: 'ThunderClap',
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: 'AHbh',
//         name: 'Bash',
//         icon: IconPath.BTNBash,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: 'AHav',
//         name: 'Avatar',
        
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: 'AHfs',
//         name: 'Flamestrike',
        
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: 'AHbn',
//         name: 'Banish',
        
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: 'AHdr',
//         name: 'SiphonMana',
        
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: 'AHpx',
//         name: 'Phoenix',
        
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: 'AHbz',
//         name: 'Blizzard',
        
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: 'AHwe',
//         name: 'SummonWaterElemental',
        
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: 'AHab',
//         name: 'BrillianceAura',
//         icon: IconPath.BTNBrilliance,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: 'AHmt',
//         name: 'MassTeleport',
        
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: 'AHhb',
//         name: 'HolyLight',
        
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: 'AHds',
//         name: 'DivineShield',
        
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: 'AHad',
//         name: 'DevotionAura',
//         icon: IconPath.BTNDevotion,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: 'AHre',
//         name: 'Resurrection',
        
//         slot: AbilitySlot.R,
//     },

//     {
//         codeId: 'AOvd',
//         name: 'BigBadVoodoo',
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: 'AOcl',
//         name: 'ChainLightning',
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: 'AOww',
//         name: 'Bladestorm',
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: 'AOcr',
//         name: 'CriticalStrike',
//         icon: IconPath.BTNCriticalStrike,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: 'AOeq',
//         name: 'Earthquake',
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: 'AOae',
//         name: 'EnduranceAura',
//         icon: IconPath.BTNCommand,
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: 'AOfs',
//         name: 'FarSight',
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: 'AOsf',
//         name: 'FeralSpirit',
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: 'AOhw',
//         name: 'HealingWave',
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: 'AOhx',
//         name: 'Hex',
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: 'AOmi',
//         name: 'MirrorImage',
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: 'AOre',
//         name: 'Reincarnation',
//         icon: IconPath.BTNReincarnation,
//         slot: AbilitySlot.R,
//     },
//     {
//         codeId: 'AOsw',
//         name: 'SerpentWard',
//         slot: AbilitySlot.E,
//     },
//     {
//         codeId: 'AOsh',
//         name: 'Shockwave',
//         slot: AbilitySlot.Q,
//     },
//     {
//         codeId: 'AOws',
//         name: 'WarStomp',
//         slot: AbilitySlot.W,
//     },
//     {
//         codeId: 'AOwk',
//         name: 'WindWalk',
//         slot: AbilitySlot.Q,
//     }
//     // {
//     //     codeId: 'AF00',
//     //     name: 'Bash',
//     //     controller: 'Bash',
//     //     slot: AbilitySlot.Q,
//     //     effect: {
//     //         type: 'Damage',
//     //         args: [25, 5]
//     //     }
//     // },
//     // {
//     //     codeId: 'AF01',
//     //     name: 'Sprint',
//     //     controller: 'None',
//     //     slot: AbilitySlot.W,
//     // },
//     // {
//     //     slot: AbilitySlot.E,
//     //     codeId: 'AF02',
//     //     controller: 'EffectAbility',
//     //     name: 'Slam',
//     //     effect: {
//     //         type: 'Damage',
//     //         args: [50, 5]
//     //     }
//     // },
//     // {
//     //     name: 'GroundSmash',
//     //     codeId: 'AF03',
//     //     controller: 'None',
//     //     slot: AbilitySlot.R,
//     // },
//     // {
//     //     name: 'ExampleAbility',
//     //     codeId: 'A002',
//     //     controller: 'EffectAbility',
//     //     slot: AbilitySlot.Q,
//     //     effect: {
//     //         type: 'AoeFork',
//     //         args: [400.0, null],
//     //         then: [{
//     //             type: 'Projectile',
//     //             args: ['DummyFireballProjectile'],
//     //             then: [{
//     //             //     type: 'DummyCast',
//     //             //     args: ['DummyBanish']
//     //             // }, {
//     //                 type: 'Damage',
//     //                 args: [50.0, 'Magical']
//     //             }, {
//     //                 type: 'FocusAsOrigin',
//     //                 then: [{
//     //                     type: 'CasterAsFocus',
//     //                     then: [{
//     //                         type: 'Projectile',
//     //                         args: ['DummyFireballProjectile'],
//     //                         then: [{
//     //                             type: 'Damage',
//     //                             args: [6.0, 'Magical']
//     //                         }]
//     //                     }]
//     //                 }]
//     //             }]
//     //         }]
//     //     }
//     // }
// ]