import { DamageType } from "Asrc2/systems/damage/DamageType";
import { WeaponItemFactory } from "Asrc2/systems/item/item-def-factories/WeaponItemDefinition";
import { ItemDefinition } from "Asrc2/systems/item/ItemDefinition";
import { Log } from "Asrc2/systems/log/Log";

export class ItemData {

    static InitializeItemDefinitions(): ItemDefinition[] {

        const weaponFactory = new WeaponItemFactory();

        const wep = weaponFactory.CreateDefinition({
            codeId: 'ratc',
            name: 'Claws of Attack +12',
            damageType: DamageType.Slashing,
            enabledDamageTypes: [DamageType.Slashing],
            OnAcquire: unit => unit.addAbility(FourCC('AItc')),
            OnRelease: unit => unit.removeAbility(FourCC('AItc'))
        });

        const items: ItemDefinition[] = [
            wep,
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