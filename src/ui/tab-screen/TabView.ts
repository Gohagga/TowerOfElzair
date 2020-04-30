import { ITabViewConfig } from "./interface/ITabConfig";
import { Frame } from "w3ts/index";
import { FramePoint as Fp } from "ui/view-models/Frame";
import { ITabView, ITabSelectorView } from "./interface/ITabView";

export function GenerateTabView({ box: boxConf, tab: tabConf }: ITabViewConfig): ITabView {
    
    // const retVal: TalentScreenViewFrames = Object.assign({ tabs: [] }, InitializeScreen(Dialog));
    const { box, closeButton, closeText, title } = GenerateTabBox(boxConf);
    const selectors: ITabSelectorView[] = [];

    for (let i = 0; i < 7; i++) {
        const selector = GenerateTabSelector(i, box, tabConf);
        selectors.push(selector);
    }
    const retVal: ITabView = {
        box,
        title,
        closeButton,
        closeText,
        tabSelectors: selectors,
    }
    return retVal;
}

function GenerateTabBox(cfg: ITabViewConfig.Box) {

    const box = new Frame("SuspendDialog", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 0, 0);
    const title = Frame.fromName("SuspendTitleText", 0);
    const closeButton = Frame.fromName("SuspendDropPlayersButton", 0);
    const closeText = Frame.fromName("SuspendDropPlayersButtonText", 0);
    // const cancelButton = new Frame("ScriptDialogButton", box, 0, 0);
    // const cancelText = Frame.fromName("ScriptDialogButtonText", 0);

    // let showScreenButton = new Frame("ScriptDialogButton", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 0, 0);

    box.clearPoints();
    box.setAbsPoint(Fp.C, 0.35, 0.34);
    box.setSize(0.3, 0.44);

    title.text = "Talent Tree";

    closeButton.clearPoints();
    closeButton.setPoint(Fp.BR, box, Fp.B, cfg.closeButton.x, cfg.closeButton.y);
    closeButton.setSize(cfg.closeButton.width, cfg.closeButton.height);
    closeText.text = cfg.closeButton.text;

    let retVal = {
        box,
        title,
        closeButton,
        closeText
    }
    return retVal;
}

function GenerateTabSelector(i: number, parent: Frame, cfg: ITabViewConfig.Tab): ITabSelectorView {

    let x = cfg.xOffset;
    let y = - i * cfg.yPadding * cfg.iconSize - cfg.yOffset

    let mainButton = new Frame("ScoreScreenBottomButtonTemplate", parent, 0, 0);
    let mainImage = Frame.fromName("ScoreScreenButtonBackdrop", 0);
    let selectFrame = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "Selectedcfg", parent.handle, "", 0));

    mainButton.setPoint(Fp.R, parent, Fp.TL, x, y);
    mainButton.setSize(cfg.iconSize, cfg.iconSize);

    mainImage.setTexture(cfg.defaultTexture, 0, true);

    selectFrame.setSize(cfg.iconSize * cfg.selectionScale, cfg.iconSize * cfg.selectionScale);
    selectFrame.setPoint(Fp.R, mainButton, Fp.L, cfg.selectionOffX, 0);
    selectFrame.setTexture(cfg.activeTabTexture, 0, true);

    const retVal: ITabSelectorView = {
        mainButton: mainButton,
        mainImage: mainImage,
        selectFrame: selectFrame
    };
    return retVal;
}