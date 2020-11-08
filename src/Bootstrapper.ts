import ILogger from "systems/logger/ILogger";
import { Logger } from "systems/logger/Logger";
import { Config } from "Config";
import { InjectionContainer } from "providers/implementations/InjectionContainer";
import { DamageEventHandler } from "events/damage/DamageEventHandler";
import { AutoattackDamageEventProvider } from "providers/implementations/AutoattackDamageEventProvider";
import { DamageProvider } from "providers/implementations/DamageProvider";
import { OnUnitDamagedProvider } from "providers/implementations/OnUnitDamagedProvider";
import { OnSpellCastProvider } from "providers/implementations/OnSpellCastProvider";
import { EnumUnitProvider } from "providers/implementations/EnumUnitProvider";
import { DummySpellProvider } from "providers/implementations/DummySpellProvider";
import { InstancedDummySpellProvider } from "providers/implementations/InstancedDummySpellProvider";
import { TargetProjectileProvider } from "providers/implementations/TargetProjectileProvider";
import { EventUnitUsedAbilityHandler } from "events/ability/EventUnitUsedAbilityHandler";
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
import { abilityDataRecord } from "content/abilities/AbilityData";
import { Unit, MapPlayer, Trigger, Frame } from "w3ts/index";
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
import { NoEffectAbility } from "systems/ability/NoEffectAbility";
import { IAbility } from "systems/ability/IAbility";
import { TargetDamageAbility } from "content/abilities/general/TargetDamageAbility";
import { DamageType } from "systems/damage/DamageType";
import { Sprint } from "content/abilities/MeleeCombat/Sprint";
import { GroundSmash } from "content/abilities/MeleeCombat/GroundSmash";
import { Charge } from "content/abilities/MeleeCombat/Charge";
import { BattleRush } from "content/abilities/MeleeCombat/BattleRush";
import { GenerateProgressBarView } from "ui/progress-bar/ProgressBarView";
import { ProgressBarViewModel } from "ui/progress-bar/ProgressBarViewModel";
import { Momentum, UnitMomentum } from "systems/momentum/Momentum";

export class Bootstrapper {

    public static registerComponents() {
        
        let services = new InjectionContainer();
        
        const config = new Config();
        const logger: ILogger = new Logger(config);
        const originUi = Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0);

        const spellEvent = new EventUnitUsedAbilityHandler();
        const damageProvider = new DamageProvider();
        const dmgHandler = new DamageEventHandler({ ILogger: logger });

        const svc = { spellEvent, damageProvider, IDamageEventHandler: dmgHandler };
        
        const autoattackHandler = new AutoattackDamageEventProvider(svc);

        // Ability registration here
        const abilities: Record<string, IAbility> = {
            Bash: new TargetDamageAbility(svc, abilityDataRecord.Bash, DamageType.Blunt, () => 35),
            Sprint: new Sprint(abilityDataRecord.Sprint),
            Slam: new TargetDamageAbility(svc, abilityDataRecord.Slam, DamageType.Blunt, () => 50),
            GroundSmash: new GroundSmash(svc, abilityDataRecord.GroundSmash),

            Swing: new TargetDamageAbility(svc, abilityDataRecord.Swing, DamageType.Slashing, () => 40),
            Charge: new Charge(abilityDataRecord.Charge),
            Cleave: new TargetDamageAbility(svc, abilityDataRecord.Cleave, DamageType.Slashing, () => 25),
            BattleRush: new BattleRush(svc, abilityDataRecord.BattleRush),
            
        };

        let u = Unit.fromHandle(gg_unit_Hpal_0002);
        u.addType(UNIT_TYPE_PEON);
        const frameEvent = new FrameEventHandler(logger);
        const talentTabView = GenerateTabView(config.TalentScreen);
        const talentTabs = new TabViewModel(MapPlayer.fromIndex(0), logger, frameEvent, talentTabView);

        const talentTreeViewBuilder = new TalentTreeViewModelBuilder(logger)
            .SetConfig(config.talentTree)
            .SetParentFrame(talentTabView.box)
            .SetFrameEventHandler(frameEvent)
            .SetBaseView(GenerateTalentTreeView(talentTabView.box, config.talentTree))
            .SetTalentViews(GenerateNTalentViews(config.talentTree.base.maxTalentSlots, talentTabView.box, config.talentTree.talent))
            .SetTalentViewModelFactory((view: ITalentView) => new TalentViewModel(view));

        let slotManager = new UnitSlotManager<AbilitySlot>();
        const tab1 = talentTreeViewBuilder.SetWatcher(MapPlayer.fromIndex(0)).Build();
        print("main", 1);
        tab1.tree = new MeleeCombat(u, logger, slotManager, abilities);

        talentTabs.tabContent = [ tab1 ];
        talentTabs.activeTabIndex = 0;
        print("main", 5)
        

        let t = new Trigger();
        t.registerPlayerChatEvent(MapPlayer.fromIndex(0), '-tt', true);
        t.registerPlayerChatEvent(MapPlayer.fromIndex(1), '-tt', true);
        t.addAction(() => {
            switch (MapPlayer.fromEvent()) {
                case MapPlayer.fromIndex(0):
                    print("yes")
                    print(talentTabs);
                    talentTabs.visible = !talentTabs.visible;
                    break;
                // case MapPlayer.fromIndex(1):
                //     talentTabsBlue.visible = !talentTabsBlue.visible;
                //     break;
            }
        });
        
        const onUnitDamage = new OnUnitDamagedProvider();
        onUnitDamage.Register(() => {
            
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

        print("MOMENTUM", 1)
        let x = 0.5;
        const mom = new UnitMomentum(u);
        const momentum = new Momentum(svc);

        momentum.Register(u, mom);
        // const momentumView = GenerateProgressBarView(originUi, config.momentum.progressBar);
        // print("MOMENTUM", 2)
        // const momentumViewModel = new ProgressBarViewModel(momentumView, () => {
        //     print("MOMENTUM")
        //     x += GetRandomReal(0, 0.03);
        //     return x;
        // });
        // print("MOMENTUM", 3)

        print("MOMENTUM", 0)
        print(BlzLoadTOCFile("SimpleProgressBar.toc"));
    }

    static OnMapInit() {
        
    }
}