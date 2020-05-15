
import ILogger from "systems/logger/ILogger";
import { Logger } from "systems/logger/Logger";
import { Config } from "Config";
import { TalentScreenVModel } from "ui/view-models/TalentScreenVModel";
import { GenerateTabView } from "ui/tab-screen/TabView";
import { TabViewModel } from "ui/tab-screen/TabViewModel";
import { FrameEventHandler } from "./event-handlers/implementations/FrameEventHandler";
import { TalentTreeViewModel } from "ui/talent-screen/TalentTreeViewModel";
import { GenerateTalentTreeView } from "ui/talent-screen/TalentTreeView";
import { TalentViewModel } from "ui/talent-screen/TalentViewModel";
import { GenerateTalentView, GenerateNTalentViews } from "ui/talent-screen/TalentView";
import { ITalentView } from "ui/talent-screen/interface/ITalentView";
import { TalentTree } from "systems/talents/TalentTree";
import { TestTalentTree } from "systems/talents/content/TestTalentTree";
import { Unit, MapPlayer, Trigger } from "w3ts/index";
import { TalentTreeViewModelBuilder } from "ui/talent-screen/TalentTreeViewModelBuilder";
import { AutoattackDamageEventProvider } from "providers/implementations/AutoattackDamageEventProvider";
import { DamageEventHandler } from "event-handlers/implementations/DamageEventHandler";
import { ActionOrder } from "systems/damage/ActionOrder";
import { UnitInfoPanelView } from "ui/unit-info-panel/UnitInfoPanelView";

abstract class Base {

    private logger: ILogger;
    constructor(logger: ILogger) {
        this.logger = logger;
        this.logger.info("Super works");
    }
}

class Ext extends Base {

    constructor(logger: ILogger) {
        super(logger);
    }
}

export class Bootstrapper {

    public static registerComponents() {
        
        const config = new Config();
        const logger: ILogger = new Logger(config);

        this.InitializeUI(config, logger);
        
        let damageHandler = new DamageEventHandler(logger);
        let autoattackProvider = new AutoattackDamageEventProvider(damageHandler);

        damageHandler.Subscribe(ActionOrder.Autoattack, (e) => {
            logger.info(e.source.name + " autoattacks " + e.target.name + " for " + e.amount + " " + e.type.toString());
        });

        // logger.info("Step", 6)
        // talentTabs.activeTabIndex = 0;
        
        // logger.info("START");
        // const damager = new DamageProvider();
        // const onDamaged = new OnUnitDamagedProvider();
        // const onSpellCast = new OnSpellCastProvider();
        // const unitEnum = new EnumUnitProvider();
        // const banishDummy = new DummySpellProvider(config, "banish", FourCC('A000'));
        // const fbDummy = new InstancedDummySpellProvider(config, "acidbomb", FourCC('A001'));
        // const fbProjectile = new TargetProjectileProvider(fbDummy, onDamaged, logger);
        // const eventAbilityUsed = new EventUnitUsedAbilityHandler();

        // let talentScreen = new TalentScreenVModel(config);
        
        // //     Provides context with targeted unit as Focus, its position as destination and caster and his position as origin
        // const fireball = new UnitTargetEffect(onSpellCast)
        //             // Enums units within range, filters and Resolves subcomponents for each target (as Focus)
        //     .Add(new AoeForkEffect(unitEnum, 400.0, (t, c) => true)
        //             // Dummy casts a projectile spell at Focus, Resolves subcomponents once it hits
        //         .Add(new ProjectileEffect(fbProjectile, logger)
        //                 // Dummy casts a banish on Focus
        //             .Add(new DummyCastEffect(banishDummy))
        //                 // Deals 50 damage to Focus
        //             .Add(new DamageEffect(50.0, DamageType.Magical, damager))
        //                 // Sets Origin to position of Focus
        //             .Add(new FocusAsOriginEffect()
        //                     // Sets caster unit as Focus
        //                 .Add(new CasterAsFocusEffect()
        //                         // Dummy casts a projectile spell at Focus, Resolves subcomponents once it hits
        //                     .Add(new ProjectileEffect(fbProjectile, logger)
        //                         // Deals 5 damage to Focus
        //                         .Add(new DamageEffect(5.0, DamageType.Magical, damager)))))));
                
        // eventAbilityUsed.Register(EventAbility.Effect, FourCC('A002'), () => fireball.Resolve());

        // const u = Unit.fromHandle(gg_unit_Hblm_0003);
        // u.addAbility(FourCC('A001'));

        // // BlzGetUnitAbility( gg_unit_Hblm_0003
        // const ab = u.getAbility(FourCC('A001'));

        // const t1 = CreateTrigger();
        // TriggerRegisterAnyUnitEventBJ(t1, EVENT_PLAYER_UNIT_DAMAGED);
        // TriggerAddAction(t1, () => {
            
        //     let damage = GetEventDamage();
        //     const source = GetEventDamageSource();
        //     const target = BlzGetEventDamageTarget();
        //     const attackType = BlzGetEventAttackType();

        //     const owner = GetOwningPlayer(source);
        //     let size = (damage / 60) * 3 + 8;

        //     let rgb = [ 100, 100, 100 ];
        //     if (attackType == ATTACK_TYPE_MELEE) rgb = [ 100, 75, 50 ];
        //     else if (attackType == ATTACK_TYPE_MAGIC) rgb = [ 40, 70, 100 ];

        //     // let dString = math.floor(damage).toString();
        //     // CreateTextTagUnitBJ(dString, target, 50.00, size, rgb[0], rgb[1], rgb[2], 0)
        //     let ang = math.random(45, 135) * bj_DEGTORAD;
        //     let dx = 0.086203125 * math.cos(ang);
        //     let dy = 0.086203125 * math.sin(ang);
        //     if (owner == GetLocalPlayer()) {
        //         let tt = CreateTextTagUnitBJ(damage.toString(), target, 35, size, rgb[0], rgb[1], rgb[2], 0)
        //         SetTextTagVelocity(tt, dx, dy)
        //         // SetTextTagLifespan(bj_lastCreatedTextTag, 2.5)
        //         SetTextTagLifespan(tt, 0.6)
        //         SetTextTagPermanent(tt, false)
        //         SetTextTagFadepoint(tt, 0.4)
        //     }
        // });
    }

    static OnMapInit() {
        // const config = new Config();
        // UnitInfoPanelView(config.gameUI);
    }

    static InitializeUI(config: Config, logger: ILogger) {
        
        let u = Unit.fromHandle(gg_unit_Hblm_0003);

        // TimerStart(CreateTimer(), 1.0, false, () => );
        // UnitInfoPanelView(config.gameUI);

        const frameEvent = new FrameEventHandler(logger);
        const talentTabView = GenerateTabView(config.TalentScreen);
        const talentTabs = new TabViewModel(MapPlayer.fromIndex(0), logger, frameEvent, talentTabView);
        
        const talentTreeViewBuilder = new TalentTreeViewModelBuilder(logger)
            .SetConfig(config.talentTree)
            .SetParentFrame(talentTabView.box)
            .SetFrameEventHandler(frameEvent)
            .SetBaseView(GenerateTalentTreeView(talentTabView.box, config.talentTree))
            .SetTalentViews(GenerateNTalentViews(24, talentTabView.box, config.talentTree.talent))
            .SetTalentViewModelFactory((view: ITalentView) => new TalentViewModel(view));

        const tab1 = talentTreeViewBuilder.SetWatcher(MapPlayer.fromIndex(0)).Build();
        let sharedTree = new TestTalentTree(logger, u, 2, 4);
        tab1.tree = sharedTree;

        // const tab2 = talentTreeViewBuilder.Build();
        // tab2.tree = new TestTalentTree(logger, u, 4, 6);

        // const tab3 = talentTreeViewBuilder.Build();
        // tab3.tree = new TestTalentTree(logger, u, 3, 7);
        
        talentTabs.tabContent = [ tab1 ];

        // For blue now
        const talentTabsBlue = new TabViewModel(MapPlayer.fromIndex(1), logger, frameEvent, talentTabView);
        talentTreeViewBuilder.SetWatcher(MapPlayer.fromIndex(1));
        const tabb1 = talentTreeViewBuilder.Build();
        tabb1.tree = new TestTalentTree(logger, u, 2, 4);
        // const tabb2 = talentTreeViewBuilder.Build();
        // tabb2.tree = sharedTree;

        talentTabsBlue.tabContent = [ tabb1 ];

        let t = new Trigger();
        t.registerPlayerChatEvent(MapPlayer.fromIndex(0), '-tt', true);
        t.registerPlayerChatEvent(MapPlayer.fromIndex(1), '-tt', true);
        t.addAction(() => {
            switch (MapPlayer.fromEvent()) {
                case MapPlayer.fromIndex(0):
                    talentTabs.visible = !talentTabs.visible;
                    break;
                case MapPlayer.fromIndex(1):
                    talentTabsBlue.visible = !talentTabsBlue.visible;
                    break;
            }
        });
    }
}