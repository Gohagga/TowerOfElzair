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
import { Backburn } from "./content/abilities/pyromancy/Backburn";
import { FieryEscape } from "./content/abilities/pyromancy/FieryEscape";
import { Fireball } from "./content/abilities/pyromancy/Fireball";
import { Firebolt } from "./content/abilities/pyromancy/Firebolt";
import { FireShield } from "./content/abilities/pyromancy/FireShield";
import { FlameBlast } from "./content/abilities/pyromancy/FlameBlast";
import { HellTouch } from "./content/abilities/pyromancy/HellTouch";
import { IgniteWeapon } from "./content/abilities/pyromancy/IgniteWeapon";
import { Ignition } from "./content/abilities/pyromancy/Ignition";
import { abilityDataRecord as abData } from "./content/AbilityData";
import { MeleeCombat } from "./content/disciplines/MeleeCombat";
import { Pyromancy } from "./content/disciplines/Pyromancy";
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
import { GenerateCommandBarView } from "./ui/command-bar/CommandBarView";
import { GenerateTabView } from "./ui/tab-screen/TabView";
import { TabViewModel } from "./ui/tab-screen/TabViewModel";
import { ITalentView } from "./ui/talent-screen/interface/ITalentView";
import { GenerateTalentTreeView } from "./ui/talent-screen/TalentTreeView";
import { TalentTreeViewModelBuilder } from "./ui/talent-screen/TalentTreeViewModelBuilder";
import { GenerateNTalentViews } from "./ui/talent-screen/TalentView";
import { TalentViewModel } from "./ui/talent-screen/TalentViewModel";

export class Bootstrapper {
    
    static registerComponents() {
        
        const config = new Config();
    
        const damageDisplayManager = new DamageDisplayManager();

        const damageEventHandler = new DamageEventHandler();
        const abilityEvent = new AbilityEventHandler();
        const frameEvent = new FrameEventHandler();
        const damageService = new DamageService(damageEventHandler, damageDisplayManager);
        const enumService = new EnumUnitService();

        const critManager = new CritManager(damageEventHandler);
        const autoattackEventProvider = new AutoattackEventProvider(damageEventHandler, damageDisplayManager);
        const bludgeonDamageManager = new BludgeonDamageManager(damageService, damageEventHandler);

        const inputManager = new InputManager(10);
        const missileManager = new MissileManager();
        const dummyManager = new DummyManager(config.dummyOwningPlayer, config.dummyUnitId);

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

            firebolt: new Firebolt(abData.firebolt, damageService, abilityEvent, enumService, missileManager, dummyManager, inputManager),
            fieryEscape: new FieryEscape(abData.fieryEscape, damageService, abilityEvent, enumService, inputManager),
            ignition: new Ignition(abData.ignition, damageService, abilityEvent, enumService),
            fireball: new Fireball(abData.fireball, damageService, abilityEvent, enumService, missileManager, dummyManager, inputManager),

            hellTouch: new HellTouch(abData.hellTouch, damageService, abilityEvent),
            fireShield: new FireShield(abData.fireShield, damageService, abilityEvent, missileManager, enumService),
            igniteWeapon: new IgniteWeapon(abData.igniteWeapon, damageService, abilityEvent, enumService, inputManager, damageEventHandler),
            // 

            flameBlast: new FlameBlast(abData.flameBlast, damageService, abilityEvent, enumService, inputManager),
            backburn: new Backburn(abData.backburn, damageService, abilityEvent, enumService, missileManager),
        }


        let u = Unit.from(gg_unit_Hpal_0002);

        const talentTabView = GenerateTabView(config.TalentScreen);
        const talentTabs = new TabViewModel(MapPlayer.fromIndex(0), frameEvent, talentTabView);

        const talentTreeViewBuilder = new TalentTreeViewModelBuilder()
            .SetConfig(config.talentTree)
            .SetParentFrame(talentTabView.box)
            .SetFrameEventHandler(frameEvent)
            .SetBaseView(GenerateTalentTreeView(talentTabView.box, config.talentTree))
            .SetTalentViews(GenerateNTalentViews(config.talentTree.base.maxTalentSlots,
                talentTabView.box, config.talentTree.talent))
            .SetTalentViewModelFactory((view: ITalentView) => new TalentViewModel(view));

        const slotManager = new AbilitySlotManager();
        const tab1 = talentTreeViewBuilder.SetWatcher(MapPlayer.fromIndex(0)).Build();
        tab1.tree = new MeleeCombat(u, slotManager, inputManager, abilities);

        const tab2 = talentTreeViewBuilder.Build();
        tab2.tree = new Pyromancy(u, slotManager, inputManager, abilities);

        talentTabs.tabContent = [ tab1, tab2 ];
        talentTabs.activeTabIndex = 0;

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

        // Factories
        const autoattackFactory = new AutoattackFactory(dummyManager, missileManager, damageService);

        //#region Items
        const itemDefs = ItemData.InitializeItemDefinitions(missileManager, autoattackFactory);
        const itemManager = new ItemManager(itemDefs);
        const itemEventProvider = new ItemEventProvider(itemManager);

        //#endregion

        var hud = GenerateCommandBarView(config.playerUi);
    }
    
    static OnMapInit() {
        
    }
}
