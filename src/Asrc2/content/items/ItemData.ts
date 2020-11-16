import { DamageType } from "Asrc2/systems/damage/DamageType";
import { WeaponItemFactory } from "Asrc2/systems/item/item-def-factories/WeaponItemDefinition";
import { ItemDefinition } from "Asrc2/systems/item/ItemDefinition";
import { Log } from "Asrc2/systems/log/Log";

export class ItemData {

    static InitializeItemDefinitions(): ItemDefinition[] {

        const weaponFactory = new WeaponItemFactory();

        const items: ItemDefinition[] = [
            weaponFactory.CreateDefinition({
                codeId: 'I000',
                name: 'Great Hammer',
                damageType: DamageType.Bludgeon,
                enabledDamageTypes: [DamageType.Bludgeon],
                OnAcquire: unit => unit.addAbility(FourCC('AIt9')),
                OnRelease: unit => unit.removeAbility(FourCC('AIt9'))
            }),
            weaponFactory.CreateDefinition({
                codeId: 'I001',
                name: 'Iron Sword',
                damageType: DamageType.Slashing,
                enabledDamageTypes: [DamageType.Slashing],
                OnAcquire: unit => unit.addAbility(FourCC('AIt6')),
                OnRelease: unit => unit.removeAbility(FourCC('AIt6'))
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