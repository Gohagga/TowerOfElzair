import { AbilitySlot } from "systems/ability/AbilitySlot";
import { AbilityData } from "systems/ability/Ability";

export const abilityData: AbilityData[] = [
    {
        codeId: "AF00",
        name: "Bash",
        controller: "EffectAbility",
        slot: AbilitySlot.Q,
        effect: {
            type: "Damage",
            args: [25, 5]
        }
    },
    {
        codeId: "AF01",
        name: "Sprint",
        controller: "None",
        slot: AbilitySlot.W,
    },
    {
        slot: AbilitySlot.E,
        codeId: "AF02",
        controller: "EffectAbility",
        name: "Slam",
        effect: {
            type: "Damage",
            args: [50, 5]
        }
    },
    {
        name: "GroundSmash",
        codeId: "AF03",
        controller: "None",
        slot: AbilitySlot.R,
    },
    {
        name: "ExampleAbility",
        codeId: 'A002',
        controller: "EffectAbility",
        slot: AbilitySlot.Q,
        effect: {
            type: "AoeFork",
            args: [400.0, null],
            then: [{
                type: "Projectile",
                args: ["DummyFireballProjectile"],
                then: [{
                //     type: "DummyCast",
                //     args: ["DummyBanish"]
                // }, {
                    type: "Damage",
                    args: [50.0, "Magical"]
                }, {
                    type: "FocusAsOrigin",
                    then: [{
                        type: "CasterAsFocus",
                        then: [{
                            type: "Projectile",
                            args: ["DummyFireballProjectile"],
                            then: [{
                                type: "Damage",
                                args: [6.0, "Magical"]
                            }]
                        }]
                    }]
                }]
            }]
        }
    }
]