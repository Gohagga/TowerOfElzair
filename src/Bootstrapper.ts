
import ILogger from "components/logger/ILogger";
import { Logger } from "components/logger/Logger";
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
import { TalentTree } from "components/talents/TalentTree";
import { TestTalentTree } from "components/talents/content/TestTalentTree";
import { Unit } from "w3ts/index";

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
        
        let u = Unit.fromHandle(gg_unit_Hblm_0003);

        const config = new Config();
        const logger: ILogger = new Logger(config);

        const frameEvent = new FrameEventHandler(logger);

        const talentTabView = GenerateTabView(config.TalentScreen);
        const talentTabs = new TabViewModel(logger, frameEvent, talentTabView);
        const talentViews = GenerateNTalentViews(24, talentTabView.box, config.talentTree.talent);
        const talentVMFactory = (view: ITalentView) => 
            new TalentViewModel(view);

        const talentTreeView = GenerateTalentTreeView(talentTabView.box, config.talentTree);
        const tab1 = new TalentTreeViewModel(talentTabView.box,talentTreeView, talentViews, config.talentTree, talentVMFactory, logger);
        tab1.tree = new TestTalentTree(logger, u, 2, 4);
        const tab2 = new TalentTreeViewModel(talentTabView.box,talentTreeView, talentViews, config.talentTree, talentVMFactory, logger);
        tab2.tree = new TestTalentTree(logger, u, 4, 6);
        const tab3 = new TalentTreeViewModel(talentTabView.box,talentTreeView, talentViews, config.talentTree, talentVMFactory, logger);
        tab3.tree = new TestTalentTree(logger, u, 3, 7);
        
        talentTabs.tabContent = [ tab1, tab2, tab3 ];
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
}