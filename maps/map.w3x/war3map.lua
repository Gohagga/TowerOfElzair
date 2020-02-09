gg_rct_FloorA = nil
gg_rct_FloorB = nil
gg_rct_Room1 = nil
gg_rct_Room2 = nil
gg_rct_Room3 = nil
gg_rct_Room4 = nil
gg_rct_Room5 = nil
gg_rct_Room6 = nil
gg_rct_RoomBoss = nil
gg_trg_Melee_Initialization = nil
function InitGlobals()
end

function CreateUnitsForPlayer0()
    local p = Player(0)
    local u
    local unitID
    local t
    local life
    u = BlzCreateUnitWithSkin(p, FourCC("Hpal"), -2567.2, -6814.1, 86.410, FourCC("Hpal"))
    u = BlzCreateUnitWithSkin(p, FourCC("hcth"), -2176.6, 547.8, 312.153, FourCC("hcth"))
    u = BlzCreateUnitWithSkin(p, FourCC("Hpal"), -1423.2, 1822.8, 233.181, FourCC("Hpal"))
end

function CreateNeutralPassive()
    local p = Player(PLAYER_NEUTRAL_PASSIVE)
    local u
    local unitID
    local t
    local life
    u = BlzCreateUnitWithSkin(p, FourCC("hprt"), -1741.4, 2105.8, 348.740, FourCC("hprt"))
end

function CreatePlayerBuildings()
end

function CreatePlayerUnits()
    CreateUnitsForPlayer0()
end

function CreateAllUnits()
    CreatePlayerBuildings()
    CreateNeutralPassive()
    CreatePlayerUnits()
end

function CreateRegions()
    local we
    gg_rct_FloorA = Rect(2048.0, -7168.0, 6656.0, -2560.0)
    gg_rct_FloorB = Rect(-3104.0, -7168.0, 1504.0, -2528.0)
    gg_rct_Room1 = Rect(-2208.0, -7200.0, -1024.0, -6144.0)
    gg_rct_Room2 = Rect(-1024.0, -7168.0, 160.0, -6112.0)
    gg_rct_Room3 = Rect(128.0, -7168.0, 1312.0, -5792.0)
    gg_rct_Room4 = Rect(128.0, -5792.0, 1280.0, -4416.0)
    gg_rct_Room5 = Rect(-32.0, -4384.0, 1408.0, -2816.0)
    gg_rct_Room6 = Rect(-2144.0, -3712.0, 0.0, -2688.0)
    gg_rct_RoomBoss = Rect(-2592.0, -5248.0, -640.0, -3712.0)
end

function Trig_Melee_Initialization_Actions()
    MeleeStartingVisibility()
    MeleeStartingHeroLimit()
    MeleeGrantHeroItems()
    MeleeStartingResources()
    MeleeClearExcessUnits()
    MeleeStartingUnits()
    MeleeStartingAI()
    MeleeInitVictoryDefeat()
end

function InitTrig_Melee_Initialization()
    gg_trg_Melee_Initialization = CreateTrigger()
    TriggerAddAction(gg_trg_Melee_Initialization, Trig_Melee_Initialization_Actions)
end

function InitCustomTriggers()
    InitTrig_Melee_Initialization()
end

function RunInitializationTriggers()
    ConditionalTriggerExecute(gg_trg_Melee_Initialization)
end

function InitCustomPlayerSlots()
    SetPlayerStartLocation(Player(0), 0)
    SetPlayerColor(Player(0), ConvertPlayerColor(0))
    SetPlayerRacePreference(Player(0), RACE_PREF_HUMAN)
    SetPlayerRaceSelectable(Player(0), true)
    SetPlayerController(Player(0), MAP_CONTROL_USER)
end

function InitCustomTeams()
    SetPlayerTeam(Player(0), 0)
end

function main()
    SetCameraBounds(-3328.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), -7680.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM), 7424.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), 3072.0 - GetCameraMargin(CAMERA_MARGIN_TOP), -3328.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), 3072.0 - GetCameraMargin(CAMERA_MARGIN_TOP), 7424.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), -7680.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM))
    SetDayNightModels("Environment\\DNC\\DNCLordaeron\\DNCLordaeronTerrain\\DNCLordaeronTerrain.mdl", "Environment\\DNC\\DNCLordaeron\\DNCLordaeronUnit\\DNCLordaeronUnit.mdl")
    NewSoundEnvironment("Default")
    SetAmbientDaySound("CityScapeDay")
    SetAmbientNightSound("CityScapeNight")
    SetMapMusic("Music", true, 0)
    CreateRegions()
    CreateAllUnits()
    InitBlizzard()
    InitGlobals()
    InitCustomTriggers()
    RunInitializationTriggers()
end

function config()
    SetMapName("TRIGSTR_003")
    SetMapDescription("TRIGSTR_005")
    SetPlayers(1)
    SetTeams(1)
    SetGamePlacement(MAP_PLACEMENT_USE_MAP_SETTINGS)
    DefineStartLocation(0, 576.0, 896.0)
    InitCustomPlayerSlots()
    SetPlayerSlotAvailable(Player(0), MAP_CONTROL_USER)
    InitGenericPlayerSlots()
end

