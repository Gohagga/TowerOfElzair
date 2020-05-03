import { Frame } from "w3ts/index";
import { FramePoint as Fp } from "ui/view-models/Frame";
import { TalentScreenViewConfig } from "ui/configs/TalentsConfig";

export type TalentScreenViewFrames = {
    box: Frame,
    title: Frame,
    confirmButton: Frame,
    confirmText: Frame,
    cancelButton: Frame,
    cancelText: Frame,
    showScreenButton: Frame,
    tabs: { 
        mainButton: Frame,
        mainImage: Frame,
        selectFrame: Frame
    }[]
}

export function GenerateTalentScreenView({ TalentTabButton: tab, Dialog }: TalentScreenViewConfig) {
    
    const retVal: TalentScreenViewFrames = Object.assign({ tabs: [] }, InitializeScreen(Dialog));

    for (let i = 0; i < 7; i++) {

        let x = tab.xOffset;
        let y = - i * tab.yPadding * tab.iconSize - tab.yOffset

        let mainButton = new Frame("ScoreScreenBottomButtonTemplate", retVal.box, 0, 0);
        let mainImage = Frame.fromName("ScoreScreenButtonBackdrop", 0);
        let selectFrame = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "SelectedTab", retVal.box.handle, "", 0));

        mainButton.setPoint(Fp.R, retVal.box, Fp.TL, x, y);
        mainButton.setSize(tab.iconSize, tab.iconSize);

        mainImage.setTexture(tab.defaultTexture, 0, true);

        selectFrame.setSize(tab.iconSize * tab.selectionScale, tab.iconSize * tab.selectionScale);
        selectFrame.setPoint(Fp.R, mainButton, Fp.L, tab.selectionOffX, 0);
        selectFrame.setTexture(tab.activeTabTexture, 0, true);

        retVal.tabs.push({
            mainButton: mainButton,
            mainImage: mainImage,
            selectFrame: selectFrame
        });
    }
    return retVal;
}

function InitializeScreen(cfg: TalentScreenViewConfig["Dialog"]) {

    const box = new Frame("SuspendDialog", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 0, 0);
    const title = Frame.fromName("SuspendTitleText", 0);
    const confirmButton = Frame.fromName("SuspendDropPlayersButton", 0);
    const confirmText = Frame.fromName("SuspendDropPlayersButtonText", 0);
    const cancelButton = new Frame("ScriptDialogButton", box, 0, 0);
    const cancelText = Frame.fromName("ScriptDialogButtonText", 0);

    let showScreenButton = new Frame("ScriptDialogButton", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 0, 0);

    box.clearPoints();
    box.setAbsPoint(Fp.C, 0.35, 0.34);
    box.setSize(0.3, 0.44);

    title.text = "Talent Tree";

    confirmButton.clearPoints();
    confirmButton.setPoint(Fp.BR, box, Fp.B, 0, cfg.confirm.y);
    confirmButton.setSize(cfg.confirm.width, cfg.confirm.height);
    confirmText.text = cfg.confirm.text;

    cancelButton.clearPoints();
    cancelButton.setPoint(Fp.BL, box, Fp.B, 0, cfg.cancel.y);
    cancelButton.setSize(cfg.cancel.width, cfg.cancel.height);
    cancelText.text = cfg.cancel.text;

    showScreenButton.setAbsPoint(Fp.C, cfg.showScreenButton.x, cfg.showScreenButton.y);
    showScreenButton.setSize(cfg.showScreenButton.size.width, cfg.showScreenButton.size.height);
    showScreenButton.text = cfg.showScreenButton.text;

    let retVal = {
        box,
        title,
        confirmButton,
        confirmText,
        cancelButton,
        cancelText,
        showScreenButton
    }
    return retVal;
}