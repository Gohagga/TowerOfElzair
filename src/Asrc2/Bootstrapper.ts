import { Config } from "Config";
import { MapPlayer, Trigger } from "w3ts/index";
import { Bash } from "./content/abilities/melee-combat/Bash";
import { BattleRush } from "./content/abilities/melee-combat/BattleRush";
import { Charge } from "./content/abilities/melee-combat/Charge";
import { Cleave } from "./content/abilities/melee-combat/Cleave";
import { GroundSmash } from "./content/abilities/melee-combat/GroundSmash";
import { Slam } from "./content/abilities/melee-combat/Slam";
import { Sprint } from "./content/abilities/melee-combat/Sprint";
import { Swing } from "./content/abilities/melee-combat/Swing";
import { abilityDataRecord as abData } from "./content/AbilityData";
import { MeleeCombat } from "./content/disciplines/MeleeCombat";
import { ItemData } from "./content/items/ItemData";
import { AbilityEvent } from "./events/handlers/ability/AbilityEvent";
import { AbilityEventHandler } from "./events/handlers/ability/AbilityEventHandler";
import { DamageEventHandler } from "./events/handlers/damage/DamageEventHandler";
import { FrameEventHandler } from "./events/handlers/frame/FrameEventHandler";
import { AbilityEventProvider } from "./events/providers/AbilityEventProvider";
import { AutoattackEventProvider } from "./events/providers/AutoattackEventProvider";
import { ItemEventProvider } from "./events/providers/ItemEventProvider";
import { Unit } from "./models/Unit";
import { DamageService } from "./services/implementations/DamageService";
import { EnumUnitService } from "./services/implementations/EnumUnitService";
import { AbilityData } from "./systems/ability/AbilityData";
import { AbilitySlot, AbilityType } from "./systems/ability/AbilityEnums";
import { CritManager } from "./systems/crit/CritManager";
import { DamageDisplayManager } from "./systems/damage-display/DamageDisplayManager";
import { DamageType } from "./systems/damage/DamageType";
import { WeaponItemFactory } from "./systems/item/item-def-factories/WeaponItemDefinition";
import { ItemDefinition } from "./systems/item/ItemDefinition";
import { ItemManager } from "./systems/item/ItemManager";
import { Log } from "./systems/log/Log";
import { UnitSlotManager } from "./systems/slot/UnitSlotManager";
import { GenerateTabView } from "./ui/tab-screen/TabView";
import { TabViewModel } from "./ui/tab-screen/TabViewModel";
import { ITalentView } from "./ui/talent-screen/interface/ITalentView";
import { GenerateTalentTreeView } from "./ui/talent-screen/TalentTreeView";
import { TalentTreeViewModelBuilder } from "./ui/talent-screen/TalentTreeViewModelBuilder";
import { GenerateNTalentViews } from "./ui/talent-screen/TalentView";
import { TalentViewModel } from "./ui/talent-screen/TalentViewModel";

export class Bootstrapper {
    
    static registerComponents() {
        
        print(-1)
        const config = new Config();
    
        print(0)

        const damageEventHandler = new DamageEventHandler();
        print(0.1)
        const abilityEvent = new AbilityEventHandler();
        print(0.2)
        const frameEvent = new FrameEventHandler();
        print(0.3)
        const damageService = new DamageService(damageEventHandler);
        print(0.4)
        const enumService = new EnumUnitService();

        const critManager = new CritManager(damageEventHandler);
        const damageDisplayManager = new DamageDisplayManager(damageEventHandler);
        const autoattackEventProvider = new AutoattackEventProvider(damageEventHandler);

        print(1)
        const abilityEventProvider = new AbilityEventProvider(abilityEvent);
    
        let abilities = {
            bash: new Bash(abData.bash, damageService, abilityEvent, enumService),
            sprint: new Sprint(abData.sprint, damageService),
            slam: new Slam(abData.slam, damageService, abilityEvent, enumService),
            groundSmash: new GroundSmash(abData.groundSmash, damageService, abilityEvent, enumService),

            swing: new Swing(abData.swing, damageService, abilityEvent, enumService),
            charge: new Charge(abData.charge, damageService, abilityEvent, enumService),
            cleave: new Cleave(abData.cleave, damageService, abilityEvent, enumService),
            battleRush: new BattleRush(abData.battleRush, damageService, abilityEvent, enumService),
        }

        print(2)

        let u = Unit.from(gg_unit_Hpal_0002);

        print(3)

        const talentTabView = GenerateTabView(config.TalentScreen);
        const talentTabs = new TabViewModel(MapPlayer.fromIndex(0), frameEvent, talentTabView);

        print(4)

        const talentTreeViewBuilder = new TalentTreeViewModelBuilder()
            .SetConfig(config.talentTree)
            .SetParentFrame(talentTabView.box)
            .SetFrameEventHandler(frameEvent)
            .SetBaseView(GenerateTalentTreeView(talentTabView.box, config.talentTree))
            .SetTalentViews(GenerateNTalentViews(config.talentTree.base.maxTalentSlots,
                talentTabView.box, config.talentTree.talent))
            .SetTalentViewModelFactory((view: ITalentView) => new TalentViewModel(view));

        print(5)

        const slotManager = new UnitSlotManager<AbilitySlot>();
        const tab1 = talentTreeViewBuilder.SetWatcher(MapPlayer.fromIndex(0)).Build();
        print(6)
        tab1.tree = new MeleeCombat(u, slotManager, abilities);

        print(7)
        talentTabs.tabContent = [ tab1 ];
        talentTabs.activeTabIndex = 0;

        print(8)
        let t = new Trigger();
        t.registerPlayerChatEvent(MapPlayer.fromIndex(0), '-tt', true);
        t.registerPlayerChatEvent(MapPlayer.fromIndex(1), '-tt', true);
        t.addAction(() => {
            print("tt")
            switch (MapPlayer.fromEvent()) {
                case MapPlayer.fromIndex(0):
                    talentTabs.visible = !talentTabs.visible;
                    break;
            }
        });

        print(9)

        //#region Items
        // const itemDefs = ItemData.InitializeItemDefinitions();
        const weaponFactory = new WeaponItemFactory();

        const wep = weaponFactory.CreateDefinition({
            codeId: 'ratc',
            name: 'Claws of Attack +12',
            damageType: DamageType.Slashing,
            enabledDamageTypes: [DamageType.Slashing],
            OnAcquire: unit => unit.addAbility(FourCC('AItc')),
            OnRelease: unit => unit.removeAbility(FourCC('AItc'))
        });

        const itemDefs: ItemDefinition[] = [
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
        const itemManager = new ItemManager(itemDefs);
        const itemEventProvider = new ItemEventProvider(itemManager);

        //#endregion

        // bash.AddToUnit(Unit.fromHandle(gg_unit_Hpal_0002));
    }
    
    static OnMapInit() {
        
    }
}
