import { FramePoint } from "../view-models/Frame";
import { Frame } from "w3ts";
import { IUnitInfoPanelConfig } from "./interface/IUnitInfoPanelConfig";
import { IUnitInfoPanelView } from "./interface/IUnitInfoPanelView";

export function UnitInfoPanelView(cfg: IUnitInfoPanelConfig): IUnitInfoPanelView {
    
    // BlzHideOriginFrames(true);
    
    const gameUi = BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0);
    // const worldUi = BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0);
    // BlzFrameSetAllPoints(worldUi, gameUi);

    // let frame = BlzGetFrameByName("ConsoleUI", 0);
    // BlzFrameClearAllPoints(frame);
    // BlzFrameSetAllPoints(frame, gameUI);

    // // BlzFrameSetVisible(gameUi, true);
    // BlzFrameSetVisible(BlzGetFrameByName("ConsoleUIBackdrop", 0), false)

    // let parent = BlzFrameGetParent(BlzGetOriginFrame(ORIGIN_FRAME_ITEM_BUTTON, 0));
    // for (let i = 0; i < 6; i++) {
    //     let frame = BlzGetOriginFrame(ORIGIN_FRAME_ITEM_BUTTON, i);
    //     // BlzFrameClearAllPoints(frame);
    //     // BlzFrameSetPoint(frame, FRAMEPOINT_BOTTOM, gameUI, FRAMEPOINT_BOTTOM, -1, -1);
    //     BlzFrameSetVisible(frame, true);
    // }
    // print(parent == null, "parent of items is null");
    // BlzFrameSetVisible(parent, true);
    hide(gameUi);

    const retVal: IUnitInfoPanelView = {

    }
    return retVal;
}

function hide(gameUI: framehandle) {
    let black = Frame.fromName("ConsoleUIBackdrop", 0);
    black.visible = true;
    black.clearPoints();
    black.setAbsPoint(FRAMEPOINT_TOP, 0.33, 0);
    black.setSize(0.1, 0.01);

    hideBlackBars(gameUI);
    hideConsole(gameUI);
    hidePortrait(gameUI);
    hideInventory(gameUI, black);
    positionCommandButtons(gameUI, black);
}

function hideBlackBars(gameUI: framehandle) {
    BlzFrameSetAllPoints(BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0), gameUI);
}

function positionCommandButtons(gameUI: framehandle, black: Frame){ //, black: Frame) {

    let parent = Frame.fromOrigin(ORIGIN_FRAME_COMMAND_BUTTON, 0).parent;
    parent.clearPoints();
    BlzFrameSetAllPoints(parent.handle, gameUI);
    // parent.setTexture("UI/Widgets/Console/Human/human-inventory-slotfiller.blp", 0, true);
    // BlzFrameSetPoint(parent.handle, FRAMEPOINT_BOTTOM, gameUI, FRAMEPOINT_BOTTOM, 0, 0.15);
    // parent.height = 0.038;
    // parent.width = 0.48;
    // parent.setAbsPoint(FRAMEPOINT_BOTTOM, 0, 0.05);

    TimerStart(CreateTimer(), 2, false, () => {
        let indices = [8, 9, 10, 11, 4, 5, 6, 7, 1, 2, 3, 0]
        for (let i = 0; i < indices.length; i++) {
            let name = "CommandButton_" + indices[i];
            // let button = Frame.fromOrigin(ORIGIN_FRAME_COMMAND_BUTTON, i);
            let button = Frame.fromName(name, 0);
            // print("Framename", BlzFrameGetName(button.handle), button == null);
            
            // let p = button.parent;
            // p.setAllPoints(parent);
            // p.visible = true;
            // button.visible = true;
            
            button.clearPoints();
            // button.setPoint(FRAMEPOINT_TOPLEFT, Frame.fromHandle(gameUI), FRAMEPOINT_BOTTOMLEFT, 0.2 + 0.04 * i, 0.05);
            button.setAbsPoint(FRAMEPOINT_CENTER, 0.2 + 0.042 * i, 0.035);
            // button.setSize(0.034, 0.034);
            button.visible = true;
            // button.setScale(0.1);
            // button.setAllPoints(backdrop);

            let backdrop = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "LeftLink", black.handle, "", 0))
            backdrop.setAllPoints(button);
            // backdrop.clearPoints();
            // backdrop.setSize(0.039, 0.039);
            // backdrop.setPoint(FRAMEPOINT_CENTER, button, FRAMEPOINT_CENTER, 0, 0);
            // backdrop.setAbsPoint(FRAMEPOINT_CENTER, 0.25 + 0.037 * i, 0.02);
            backdrop.setTexture("UI/Widgets/Console/Human/human-inventory-slotfiller.blp", 0, false);
            backdrop.visible = true;
        }
    })
}

function hideInventory(gameUI: framehandle, black: Frame) {
    for (let i = 0; i < 6; i++) {
        let frame = Frame.fromOrigin(ORIGIN_FRAME_ITEM_BUTTON, i);
        // let backdrop = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "LeftLink", black.handle, "", 0))
        // backdrop.clearPoints();
        // backdrop.setSize(0.04, 0.04);
        // backdrop.setPoint(FRAMEPOINT_CENTER, frame, FRAMEPOINT_CENTER, 0, 0);
        // // backdrop.setTexture("UI/Widgets/Console/Human/human-inventory-slotfiller.blp", 0, false);
        // backdrop.setTexture("war3mapImported\\actionbarSlot.blp", 0, false);
        // backdrop.visible = true;
        // backdrop.setLevel(-1);

        frame.clearPoints();
        frame.setAbsPoint(FRAMEPOINT_CENTER, 0.3 + 0.046 * i, 0.03);
        frame.setSize(0.04, 0.04);
        frame.visible = true;
        // backdrop.setLevel(3);
    }
}

function hidePortrait(gameUI: framehandle) {
    let frame = BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0);
    BlzFrameClearAllPoints(frame);
    BlzFrameSetPoint(frame, FRAMEPOINT_BOTTOM, gameUI, FRAMEPOINT_BOTTOM, -1, -1);
    BlzFrameSetSize(frame, BlzFrameGetWidth(frame) * 0.8, BlzFrameGetHeight(frame) * 0.8);
}

function hideConsole(gameUI: framehandle) {
    let frame = BlzGetFrameByName("ConsoleUI", 0);
    BlzFrameClearAllPoints(frame);
    BlzFrameSetAllPoints(frame, gameUI);
    // BlzFrameSetVisible(BlzGetFrameByName("ConsoleUIBackdrop", 0), false)
    // BlzFrameSetVisible(frame, false);
    BlzFrameSetPoint(frame, FRAMEPOINT_BOTTOM, gameUI, FRAMEPOINT_BOTTOM, -1, -1);

}

//   BlzGetFrameByName(`CommandButton_${index}`, 0)