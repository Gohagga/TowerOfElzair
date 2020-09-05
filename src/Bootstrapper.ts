import ILogger from "systems/logger/ILogger";
import { Logger } from "systems/logger/Logger";
import { Config } from "Config";
import { InjectionContainer } from "providers/implementations/InjectionContainer";
import { DamageEventHandler } from "event-handlers/implementations/DamageEventHandler";
import { AutoattackDamageEventProvider } from "providers/implementations/AutoattackDamageEventProvider";
import { DamageProvider } from "providers/implementations/DamageProvider";
import { OnUnitDamagedProvider } from "providers/implementations/OnUnitDamagedProvider";
import { OnSpellCastProvider } from "providers/implementations/OnSpellCastProvider";
import { EnumUnitProvider } from "providers/implementations/EnumUnitProvider";
import { DummySpellProvider } from "providers/implementations/DummySpellProvider";
import { InstancedDummySpellProvider } from "providers/implementations/InstancedDummySpellProvider";
import { TargetProjectileProvider } from "providers/implementations/TargetProjectileProvider";
import { EventUnitUsedAbilityHandler } from "event-handlers/implementations/EventUnitUsedAbilityHandler";
import { UnitSlotManager } from "systems/slottable/UnitSlotManager";
import { AbilitySlot } from "systems/ability/AbilitySlot";
import { Effect as SpellEffect } from "systems/effects/base/Effect";
import { AoeForkEffect } from "systems/effects/form-effects/AoeForkEffectDI";
import { ProjectileEffect } from "systems/effects/form-effects/ProjectileEffectDI";
import { DummyCastEffect } from "systems/effects/substance-effects/DummyCastEffectDI";
import { DamageEffect } from "systems/effects/substance-effects/DamageEffectDI";
import { FocusAsOriginEffect } from "systems/effects/form-effects/FocusAsOriginEffect";
import { CasterAsFocusEffect } from "systems/effects/form-effects/CasterEffect";
import { EffectBuilder } from "systems/effects/EffectBuilder";
import { EffectAbility } from "systems/ability/EffectAbility";
import { AbilityData, Ability } from "systems/ability/Ability";
import { AbilityBuilder } from "content/abilities/AbilityBuilder";
import { Bash } from "content/abilities/MeleeCombat/Bash";
import { abilityData } from "content/abilities/AbilityData";
import { Unit, MapPlayer, Trigger } from "w3ts/index";
import { FrameEventHandler } from "event-handlers/implementations/FrameEventHandler";
import { GenerateTabView } from "ui/tab-screen/TabView";
import { TabViewModel } from "ui/tab-screen/TabViewModel";
import { TalentTreeViewModelBuilder } from "ui/talent-screen/TalentTreeViewModelBuilder";
import { GenerateTalentTreeView } from "ui/talent-screen/TalentTreeView";
import { GenerateNTalentViews } from "ui/talent-screen/TalentView";
import { ITalentView } from "ui/talent-screen/interface/ITalentView";
import { TalentViewModel } from "ui/talent-screen/TalentViewModel";
import { MeleeCombat } from "content/disciplines/MeleeCombat";
import { HumanHeroesDiscipline } from "content/disciplines/HumanHeroesDiscipline";
import { OrcHeroesDiscipline } from "content/disciplines/OrcHeroesDiscipline";

export class Bootstrapper {

    public static registerComponents() {
        
        let services = new InjectionContainer();
        
        const config = new Config();
        const logger: ILogger = new Logger(config);
        services.register(config, "config");
        services.register(logger, "logger");

        services.registerConsumer(DamageEventHandler).as("IDamageEventHandler", "IDamageEventHandler<ActionOrder>");
        services.registerConsumer(AutoattackDamageEventProvider);
        services.registerProvider(DamageProvider).as("IDamageProvider");
        services.registerProvider(OnUnitDamagedProvider);
        services.registerProvider(OnSpellCastProvider);
        services.registerProvider(EnumUnitProvider);
        services.registerConsumer(DummySpellProvider, "banish", FourCC('A000')).as("DummyBanish");
        services.registerConsumer(InstancedDummySpellProvider, "acidbomb", FourCC('A001')).as("DummyFireball");
        services.registerConsumer(TargetProjectileProvider, services.get("DummyFireball")).as("DummyFireballProjectile");
        services.registerConsumer(EventUnitUsedAbilityHandler).as("SpellEvent");
        services.register(new UnitSlotManager<AbilitySlot>(), "UnitAbilitySlotManager");

        // const targetProjProvider = services.resolve(TargetProjectileProvider);

        const effectConstructors: Record<string, new (...args: any[]) => SpellEffect> = {
            AoeForkEffect,
            ProjectileEffect,
            DummyCastEffect,
            DamageEffect,
            FocusAsOriginEffect,
            CasterAsFocusEffect,
        };
        services.register(effectConstructors, "CreateEffect");

        services.registerConsumer(EffectBuilder);

        // let effAbility = services.resolve(EffectAbility, testAb);
        services.get<EffectBuilder>(EffectBuilder.name);
        const abilityBuilder = services.resolve<AbilityBuilder>(AbilityBuilder);
        abilityBuilder.registerAll([
            Bash,
            EffectAbility
        ]);
        const abilities = abilityBuilder.buildAll(abilityData);

        // damageHandler.Subscribe(ActionOrder.Autoattack, (e) => {
            //     logger.info(e.source.name + " autoattacks " + e.target.name + " for " + e.amount + " " + e.type.toString());
            // });
        

        // print(2)
        // let bash = new UnitTargetEffect(onSpellCast).Add(new TargetEffect().Add(new UnitDamageEffect(u => 50, DamageType.Blunt, damager)));
        // const effects: Record<string, () => void> = {
        //     "bash": bash.Resolve,
        // }

        // print(3)

        // const abilityBuilder = new AbilityBuilder(eventAbilityUsed, abilitySlotManager, effects);
        // const abilities = abilityBuilder.BuildAll([abilityData[0]]);

        // print(4)

        const abilityRecord = abilities.reduce((obj: any, item) => {
            obj[item.name] = item;
            return obj;
        }, {}) as Record<string, Ability>;

        for (const x in abilityRecord) {
            print(abilityRecord[x].name, x);
        }

        print(5)
        
        let u = Unit.fromHandle(gg_unit_Hblm_0003);
        const frameEvent = new FrameEventHandler(logger);
        const talentTabView = GenerateTabView(config.TalentScreen);
        const talentTabs = new TabViewModel(MapPlayer.fromIndex(0), logger, frameEvent, talentTabView);
        
        print(6)

        const talentTreeViewBuilder = new TalentTreeViewModelBuilder(logger)
            .SetConfig(config.talentTree)
            .SetParentFrame(talentTabView.box)
            .SetFrameEventHandler(frameEvent)
            .SetBaseView(GenerateTalentTreeView(talentTabView.box, config.talentTree))
            .SetTalentViews(GenerateNTalentViews(config.talentTree.base.maxTalentSlots, talentTabView.box, config.talentTree.talent))
            .SetTalentViewModelFactory((view: ITalentView) => new TalentViewModel(view));

        print(7)

        let slotManager = services.get<UnitSlotManager<AbilitySlot>>("UnitAbilitySlotManager");
        const tab1 = talentTreeViewBuilder.SetWatcher(MapPlayer.fromIndex(0)).Build();
        // let sharedTree = new MeleeCombat(u, logger, services.get<UnitSlotManager<AbilitySlot>>("UnitAbilitySlotManager"), abilityRecord);
        tab1.tree = new HumanHeroesDiscipline(u, logger, slotManager, abilityRecord);

        const tab2 = talentTreeViewBuilder.Build();
        tab2.tree = new OrcHeroesDiscipline(u, logger, slotManager, abilityRecord);
        talentTabs.tabContent = [ tab1, tab2 ];

        talentTabs.activeTabIndex = 0;
        // const tab1 = talentTreeViewBuilder.SetWatcher(MapPlayer.fromIndex(0)).Build();
        // let sharedTree = new TestTalentTree(logger, u, 2, 4);
        // tab1.tree = sharedTree;

        // print(8)

        // const tab2 = talentTreeViewBuilder.Build();
        // tab2.tree =  new MeleeCombat(u, logger, abilityRecord);

        // print(9)

        // // const tab3 = talentTreeViewBuilder.Build();
        // // tab3.tree = new TestTalentTree(logger, u, 3, 7);
        

        // // For blue now
        // // const talentTabsBlue = new TabViewModel(MapPlayer.fromIndex(1), logger, frameEvent, talentTabView);
        // // talentTreeViewBuilder.SetWatcher(MapPlayer.fromIndex(1));
        // // const tabb1 = talentTreeViewBuilder.Build();
        // // tabb1.tree = new TestTalentTree(logger, u, 2, 4);
        // // // const tabb2 = talentTreeViewBuilder.Build();
        // // // tabb2.tree = sharedTree;

        // // talentTabsBlue.tabContent = [ tabb1 ];

        // print(10)

        let t = new Trigger();
        t.registerPlayerChatEvent(MapPlayer.fromIndex(0), '-tt', true);
        t.registerPlayerChatEvent(MapPlayer.fromIndex(1), '-tt', true);
        t.addAction(() => {
            switch (MapPlayer.fromEvent()) {
                case MapPlayer.fromIndex(0):
                    talentTabs.visible = !talentTabs.visible;
                    break;
                // case MapPlayer.fromIndex(1):
                //     talentTabsBlue.visible = !talentTabsBlue.visible;
                //     break;
            }
        });
        // let talentScreen = new TalentScreenVModel(config);
        
        //     Provides context with targeted unit as Focus, its position as destination and caster and his position as origin
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

        services.get<OnUnitDamagedProvider>("OnUnitDamagedProvider").Register(() => {
            
            let damage = GetEventDamage();
            const source = GetEventDamageSource();
            const target = BlzGetEventDamageTarget();
            const attackType = BlzGetEventAttackType();

            const owner = GetOwningPlayer(source);
            let size = (damage / 60) * 3 + 8;

            let rgb = [ 100, 100, 100 ];
            if (attackType == ATTACK_TYPE_MELEE) rgb = [ 100, 75, 50 ];
            else if (attackType == ATTACK_TYPE_MAGIC) rgb = [ 40, 70, 100 ];

            // let dString = math.floor(damage).toString();
            // CreateTextTagUnitBJ(dString, target, 50.00, size, rgb[0], rgb[1], rgb[2], 0)
            let ang = math.random(45, 135) * bj_DEGTORAD;
            let dx = 0.086203125 * math.cos(ang);
            let dy = 0.086203125 * math.sin(ang);
            if (owner == GetLocalPlayer()) {
                let tt = CreateTextTagUnitBJ(damage.toString(), target, 35, size, rgb[0], rgb[1], rgb[2], 0)
                SetTextTagVelocity(tt, dx, dy)
                // SetTextTagLifespan(bj_lastCreatedTextTag, 2.5)
                SetTextTagLifespan(tt, 0.6)
                SetTextTagPermanent(tt, false)
                SetTextTagFadepoint(tt, 0.4)
            }
        });
    }

    static OnMapInit() {
        // const config = new Config();
        // UnitInfoPanelView(config.gameUI);
    }
}