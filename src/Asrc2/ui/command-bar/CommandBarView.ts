import { Frame } from "w3ts/handles/frame";
import { FramePoint as Fp } from "../view-models/Frame";
import { ICommandBarConfig, UiButton } from "./interface/ICommandBarConfig";

export function GenerateCommandBarView(cfg: ICommandBarConfig) {

    const consoleUi = Frame.fromName("ConsoleUI", 0);
    const consoleUiBackdrop = Frame.fromName("ConsoleUIBackdrop", 0);
    const gameUi = Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0);
    const world = Frame.fromOrigin(ORIGIN_FRAME_WORLD_FRAME, 0);
    const model = Frame.fromHandle(BlzCreateFrameByType("SPRITE", "model", gameUi.handle, "", 0));
    const hiddenParent = Frame.fromHandle(BlzCreateFrameByType("SIMPLEFRAME", "", consoleUi.handle, "", 0));
    const visibleParent = Frame.fromHandle(BlzCreateFrameByType("SIMPLEFRAME", "", consoleUi.handle, "", 0));
    const bottomUi = consoleUi.getChild(1);
    const heroBar = Frame.fromOrigin(ORIGIN_FRAME_HERO_BAR, 0);
    
    print("Hide origin frames");
    Frame.hideOrigin(true);
    print("Set world to gameui");
    world.setAllPoints(gameUi);
    
    Frame.fromName("InventoryText", 0)
    .setText(" ");
    
    // // Command bar
    BlzLoadTOCFile(cfg.commandBar.tocFile);
    Frame.fromHandle(BlzCreateSimpleFrame(cfg.commandBar.frameName, gameUi.handle, 0))
    .setAbsPoint(Fp.C, cfg.commandBar.x, cfg.commandBar.y);
    
    Frame.fromName("TestTextureValue", 0)
    .setTexture(cfg.commandBar.texture, 0, true);
    
    heroBar.visible = true;
    Frame.fromName("UpperButtonBarFrame", 0).visible = false;
    
    hiddenParent.visible = false;
    visibleParent.visible = true;
    consoleUi.getChild(5).visible = false;
    bottomUi.visible = true;
    bottomUi.getChild(0).setParent(hiddenParent);
    
    const goldHeader = Frame.fromName("GoldHeader", 0);
    goldHeader.setParent(visibleParent);

    consoleUiBackdrop.visible = false;

    //#region Inventory buttons

    const inv0 = Frame.fromName("InventoryButton_0", 0);
    const inv1 = Frame.fromName("InventoryButton_1", 0);
    const inv2 = Frame.fromName("InventoryButton_2", 0);
    const inv3 = Frame.fromName("InventoryButton_3", 0);
    const inv4 = Frame.fromName("InventoryButton_4", 0);
    const inv5 = Frame.fromName("InventoryButton_5", 0);

    inv0.parent.setParent(Frame.fromOrigin(ORIGIN_FRAME_COMMAND_BUTTON, 0).parent);

    inv0.clearPoints()
        .setAbsPoint(Fp.BL, 0.199, 0.045)
        .setAbsPoint(Fp.TR, 0.216, 0.062)
        .setScale(0.6)
        .setVisible(true);

    inv1.clearPoints()
        .setAbsPoint(Fp.BL, 0.220, 0.045)
        .setAbsPoint(Fp.TR, 0.237, 0.062)
        .setScale(0.6)
        .setVisible(true);

    inv2.clearPoints()
        .setAbsPoint(Fp.BL, 0.241, 0.045)
        .setAbsPoint(Fp.TR, 0.258, 0.062)
        .setScale(0.6)
        .setVisible(true);

    inv3.clearPoints()
        .setAbsPoint(Fp.BL, 0.199, 0.024)
        .setAbsPoint(Fp.TR, 0.216, 0.041)
        .setScale(0.6)
        .setVisible(true);

    inv4.clearPoints()
        .setAbsPoint(Fp.BL, 0.220, 0.024)
        .setAbsPoint(Fp.TR, 0.237, 0.041)
        .setScale(0.6)
        .setVisible(true);

    inv5.clearPoints()
        .setAbsPoint(Fp.BL, 0.241, 0.024)
        .setAbsPoint(Fp.TR, 0.258, 0.041)
        .setScale(0.6)
        .setVisible(true);

    //#endregion

    //#region UI Buttons

    // Character Button
    InitUiButton(gameUi, cfg.character.button, 1);

    // Talents Button
    InitUiButton(gameUi, cfg.talents.button, 2);

    // Questlog Button
    InitUiButton(gameUi, cfg.questlog.button, 3);

    // Crafting Button
    InitUiButton(gameUi, cfg.crafting.button, 4);
    
    // Menu Button
    InitUiButton(gameUi, cfg.menu.button, 5);
    
    //#endregion

    //#region Command Buttons

    // The first four
    for (let i = 0; i < 4; i++) {

        let frame = Frame.fromName(`CommandButton_${i}`, 0);
        InitCharacterActionButton(frame, {
            x1: 0.546 + i * 0.021,
            y1: 0.045,
            x2: 0.563 + i * 0.021,
            y2: 0.062,
            texture: "",
            scale: i < 6 ? 0.66 : 0.95
        });
    }

    // The spellbook
    let frame = Frame.fromName(`CommandButton_${4}`, 0);
    InitCharacterActionButton(frame, {
        x1: 0.546,
        y1: 0.024,
        x2: 0.563,
        y2: 0.041,
        texture: "",
        scale: 0.66
    });

    // The command buttons
    for (let i = 0; i + 5 < 12; i++) {
        let frame = Frame.fromName(`CommandButton_${i + 5}`, 0);
        InitCharacterActionButton(frame, {
            x1: 0.264 + i * 0.04,
            y1: 0.045,
            x2: 0.3 + i * 0.04,
            y2: 0.061,
            texture: "",
            scale: 0.95
        });
    }

    //#endregion

    //#region Portrait and character
    // Portrait window
    // new Frame("PortraitWindow", gameUi, 0)
    //     .setAbsPoint(Fp.C, cfg.portrait.x, cfg.portrait.y)
    //     .setLevel(7)
    //     // .setVisible(false);
    // Frame.fromName("PortraitWindow_Texture", 0)
    //     .setTexture(cfg.portrait.windowTexture, 0, true);

    // // Portrait text
    // new Frame("PortraitTextBox", gameUi, 0)
    //     .setAbsPoint(Fp.C, cfg.portrait.x, cfg.portrait.y)
    //     .setLevel(6)
    //     // .setVisible(false);
    // Frame.fromName("PortraitBox_Texture", 0)
    //     .setTexture(cfg.portrait.boxTexture, 0, true);

    // // Character backdrop
    // new Frame("CharacterBackdrop", gameUi, 0)
    //     .setAbsPoint(Fp.C, cfg.character.x, cfg.character.y)
    //     .setLevel(3)
    //     // .setVisible(false);
    // Frame.fromName("CharacterBackdrop_Texture", 0)
    //     .setTexture(cfg.character.texture, 0, true);

    // Character Armor
    new Frame("CharacterArmor", gameUi, 0)
        .setAbsPoint(Fp.C, 0.307, 0.343)
        .setLevel(4)
        // .setVisible(false);
    Frame.fromName("CharacterArmor_Texture", 0)
        .setTexture(cfg.character.armor.texture, 0, true);

    // Character Face
    new Frame("CharacterFace", gameUi, 0)
        .setAbsPoint(Fp.C, 0.3074, 0.4215)
        .setLevel(5)
        // .setVisible(false);
    Frame.fromName("CharacterFace_Texture", 0)
        .setTexture(cfg.character.face.texture, 0, true);

    // Character Hair
    new Frame("CharacterHair", gameUi, 0)
        .setAbsPoint(Fp.C, 0.3074, 0.4155)
        .setLevel(6)
        // .setVisible(false);
    Frame.fromName("CharacterHair_Texture", 0)
        .setTexture(cfg.character.hair.texture, 0, true);

    // // Character Backdrop B
    // new Frame("CharacterBackdrop_B", gameUi, 0)
    //     .setAbsPoint(Fp.C, 0.55, 0.3516)
    //     .setLevel(2)
    //     // .setVisible(false);
    // Frame.fromName("CharacterBackdrop_B_Texture", 0)
    //     .setTexture(cfg.character.backdropB.texture, 0, true);

    //#endregion

    //#region HERO BUTTON BARS

}

function InitUiButton(parentFrame: Frame, cfg: UiButton, context: number) {
    const button = new Frame("UIButton", parentFrame, context)
        .setAbsPoint(Fp.BL, cfg.x1, cfg.y1)
        .setAbsPoint(Fp.TR, cfg.x2, cfg.y2)
        .setScale(0.66)
        .setLevel(8);
    const texture = Frame.fromName("UIButton_Texture", context)
        .setTexture(cfg.texture, 0, true);
    
    return {
        button,
        texture
    }
}

function InitCharacterActionButton(frame: Frame, cfg: UiButton & { scale: number }) {
    frame.clearPoints()
        .setAbsPoint(Fp.BL, cfg.x1, cfg.x2)
        .setAbsPoint(Fp.TR, cfg.x2, cfg.y2)
        .setScale(cfg.scale);
}