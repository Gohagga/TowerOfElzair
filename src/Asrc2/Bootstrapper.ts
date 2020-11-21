import { Config } from "Asrc2/config/Config";
import { Frame, MapPlayer, Trigger } from "w3ts/index";
import { Bash } from "./content/abilities/melee-combat/Bash";
import { BattleRush } from "./content/abilities/melee-combat/BattleRush";
import { Charge } from "./content/abilities/melee-combat/Charge";
import { Cleave } from "./content/abilities/melee-combat/Cleave";
import { GroundSmash } from "./content/abilities/melee-combat/GroundSmash";
import { Slam } from "./content/abilities/melee-combat/Slam";
import { Sprint } from "./content/abilities/melee-combat/Sprint";
import { Swing } from "./content/abilities/melee-combat/Swing";
import { Fireball } from "./content/abilities/pyromancy/Fireball";
import { Firebolt } from "./content/abilities/pyromancy/Firebolt";
import { abilityDataRecord as abData } from "./content/AbilityData";
import { MeleeCombat } from "./content/disciplines/MeleeCombat";
import { ItemData } from "./content/items/ItemData";
import { AbilityEventHandler } from "./events/handlers/ability/AbilityEventHandler";
import { DamageEventHandler } from "./events/handlers/damage/DamageEventHandler";
import { FrameEventHandler } from "./events/handlers/frame/FrameEventHandler";
import { AbilityEventProvider } from "./events/providers/AbilityEventProvider";
import { AutoattackEventProvider } from "./events/providers/AutoattackEventProvider";
import { ItemEventProvider } from "./events/providers/ItemEventProvider";
import { Unit } from "./models/Unit";
import { DamageService } from "./services/implementations/DamageService";
import { EnumUnitService } from "./services/implementations/EnumUnitService";
import { AbilitySlotManager } from "./systems/ability/AbilitySlotManager";
import { AutoattackFactory } from "./systems/autoattack/AutoattackFactory";
import { CritManager } from "./systems/crit/CritManager";
import { DamageDisplayManager } from "./systems/damage-display/DamageDisplayManager";
import { BludgeonDamageManager } from "./systems/damage/type-specific/BludgeonDamageManager";
import { DummyManager } from "./systems/dummy/DummyManager";
import { InputManager } from "./systems/input/InputManager";
import { ItemManager } from "./systems/item/ItemManager";
import { MissileManager } from "./systems/missile/MissileManager";
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
        const bludgeonDamageManager = new BludgeonDamageManager(damageService, damageEventHandler);

        const inputManager = new InputManager(10);
        const missileManager = new MissileManager();
        const dummyManager = new DummyManager(config.dummyOwningPlayer, config.dummyUnitId);

        print(1)
        const abilityEventProvider = new AbilityEventProvider(abilityEvent);
    
        let abilities = {
            bash: new Bash(abData.bash, damageService, abilityEvent, enumService),
            sprint: new Sprint(abData.sprint, damageService),
            slam: new Slam(abData.slam, damageService, abilityEvent, enumService),
            groundSmash: new GroundSmash(abData.groundSmash, damageService, abilityEvent, enumService),

            swing: new Swing(abData.swing, damageService, abilityEvent, enumService),
            charge: new Charge(abData.charge, damageService, abilityEvent, enumService, damageEventHandler),
            cleave: new Cleave(abData.cleave, damageService, abilityEvent, enumService),
            battleRush: new BattleRush(abData.battleRush, damageService, abilityEvent, enumService),

            firebolt: new Fireball(abData.firebolt, damageService, abilityEvent, enumService, missileManager, dummyManager, inputManager),
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

        const slotManager = new AbilitySlotManager();
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

        // Factories
        const autoattackFactory = new AutoattackFactory(dummyManager, missileManager, damageService);

        //#region Items
        const itemDefs = ItemData.InitializeItemDefinitions(missileManager, autoattackFactory);
        const itemManager = new ItemManager(itemDefs);
        const itemEventProvider = new ItemEventProvider(itemManager);

        //#endregion

        abilities.firebolt.AddToUnit(Unit.from(gg_unit_Hpal_0002));
    }
    
    static OnMapInit() {
        
    }
}
