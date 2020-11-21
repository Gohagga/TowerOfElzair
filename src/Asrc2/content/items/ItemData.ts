import { ModelPath } from "Asrc2/config/ModelPath";
import { DamageEvent } from "Asrc2/events/handlers/damage/DamageEvent";
import { WeaponAnimationName } from "Asrc2/models/WeaponAnimationName";
import { IDamageService } from "Asrc2/services/interfaces/IDamageService";
import { AutoattackFactory } from "Asrc2/systems/autoattack/AutoattackFactory";
import { DamageType } from "Asrc2/systems/damage/DamageType";
import { DummyManager } from "Asrc2/systems/dummy/DummyManager";
import { WeaponItemFactory } from "Asrc2/systems/item/item-def-factories/WeaponItemDefinition";
import { ItemDefinition } from "Asrc2/systems/item/ItemDefinition";
import { Log } from "Asrc2/systems/log/Log";
import { HomingMissile } from "Asrc2/systems/missile/implementations/HomingMissile";
import { MissileManager } from "Asrc2/systems/missile/MissileManager";
import { MissileType } from "Asrc2/systems/missile/MissileType";
import { Effect } from "w3ts/index";

export class ItemData {

    static InitializeItemDefinitions(missileManager: MissileManager, autoattackFactory: AutoattackFactory): ItemDefinition[] {

        const weaponFactory = new WeaponItemFactory();

        const items: ItemDefinition[] = [
            weaponFactory.CreateDefinition({
                codeId: 'I000',
                name: 'Great Hammer',
                damageType: DamageType.Bludgeon,
                enabledDamageTypes: [DamageType.Bludgeon],
                weaponAnimationName: WeaponAnimationName.Lumber,
                attackRange: 150,
                OnAcquire: unit => {
                    unit.addAbility(FourCC('AIt9'))
                },
                OnRelease: unit => {
                    unit.removeAbility(FourCC('AIt9'))
                }
            }),
            weaponFactory.CreateDefinition({
                codeId: 'I001',
                name: 'Iron Sword',
                damageType: DamageType.Slashing,
                enabledDamageTypes: [DamageType.Slashing],
                weaponAnimationName: WeaponAnimationName.Gold,
                attackRange: 600,
                OnAcquire: unit => {

                    unit.attackMethod = autoattackFactory.CreateMissileAutoattack({
                        type: MissileType.Fire,
                        collision: 30,
                        model: ModelPath.ArchmageFireball,
                        speed: 1000,
                        height: 60
                    });
                    
                    // (e: DamageEvent) => {
                    //     print("ATTACKJ");

                    //     let d = dummyManager.GetMissileDummy();
                    //     let efft = d.addEffect(ModelPath.RainOfFire, "origin");
                    //     missileManager.Fire(new HomingMissile(d, 800, MissileType.Fire, 50, () => e.target)
                    //         .OnDestroy(miss => {
                    //             efft.destroy();
                    //             // damageService.UnitDamageTarget(e.source, e.target, e.damage, e.attackType, e.damageType)
                    //         })
                    //         .Build());
                    // };

                    unit.addAbility(FourCC('AIt6'));
                },
                OnRelease: unit => {
                    unit.removeAbility(FourCC('AIt6'))
                }
            }),
            {
                codeId: 'rde1',
                name: 'Ring of Protection +2',
                OnAcquire: unit => unit.addAbility(FourCC('AId2')),
                OnRelease: unit => unit.removeAbility(FourCC('AId2')),
                OnEquip: unit => Log.info("Equipped item rop2"),
                OnUnequip: unit => Log.info("Unequipped item rop2"),
                OnUse: unit => Log.info("Used item Rop2")
            }
        ];

        return items;
    }
}