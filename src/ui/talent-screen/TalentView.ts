import { ITalentTreeConfig } from "./interface/ITalentTreeConfig";
import { FramePoint } from "../view-models/Frame";
import { Frame } from "w3ts";
import { ITalentTreeView } from "./interface/ITalentTreeView";
import { ITalentView } from "./interface/ITalentView";

export function GenerateNTalentViews(amount: number, parent: Frame, cfg: ITalentTreeConfig.Talent): ITalentView[] {
    
    const views: ITalentView[] = [];
    for (let i = 0; i < amount; i++) {
        views.push(GenerateTalentView(parent, cfg));
    }
    return views;
}

export function GenerateTalentView(parent: Frame, cfg: ITalentTreeConfig.Talent): ITalentView {

    const highlight = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "AvailableImage", parent.handle, "", 0));
    const buttonMain = new Frame("ScoreScreenBottomButtonTemplate", parent, 0, 0);
    const buttonImage = Frame.fromName("ScoreScreenButtonBackdrop", 0);
    const toolBox = new Frame("ListBoxWar3", buttonMain, 0, 0);
    const toolText = Frame.fromHandle(BlzCreateFrameByType("TEXT", "StandardInfoTextTemplate", toolBox.handle, "StandardInfoTextTemplate", 0));
    const rankImage = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "Counter", buttonMain.handle, "", 0));
    const rankText = Frame.fromHandle(BlzCreateFrameByType("TEXT", "FaceFrameTooltip", buttonMain.handle, "", 0));
    const toolRank = Frame.fromHandle(BlzCreateFrameByType("TEXT", "FaceFrameTooltip", toolBox.handle, "", 0));

    buttonMain.setTooltip(toolBox);
    BlzFrameSetTextAlignment(rankText.handle, TEXT_JUSTIFY_CENTER, TEXT_JUSTIFY_MIDDLE);
    BlzFrameSetTextAlignment(toolRank.handle, TEXT_JUSTIFY_TOP, TEXT_JUSTIFY_RIGHT);

    buttonMain.setPoint(FramePoint.C, parent, FramePoint.C, 0, 0);
    buttonMain.setSize(cfg.buttonWidth, cfg.buttonHeight);

    toolBox.setPoint(FramePoint.TL, parent, FramePoint.TR, 0, 0);
    toolBox.setSize(cfg.tooltip.width, cfg.tooltip.height);

    toolText.clearPoints();
    toolText.setPoint(FramePoint.C, toolBox, FramePoint.C, cfg.tooltip.textY, cfg.tooltip.textY)
    toolText.setSize(cfg.tooltip.textWidth, cfg.tooltip.textHeight);
    toolText.text = cfg.tooltip.defaultText;

    rankImage.setPoint(FramePoint.BR, buttonMain, FramePoint.BR, cfg.rank.x, cfg.rank.y);
    rankImage.setSize(cfg.rank.size.width, cfg.rank.size.height);
    rankImage.setTexture(cfg.rank.texture, 0, true);
    
    rankText.clearPoints();
    rankText.setPoint(FramePoint.C, rankImage, FramePoint.C, 0, 0);
    rankText.setSize(0.01, 0.012);
    rankText.text = "0";
    
    highlight.setPoint(FramePoint.C, buttonMain, FramePoint.C, 0, 0);
    highlight.setSize(cfg.highlight.width, cfg.highlight.height);
    highlight.setTexture(cfg.highlight.texture, 0, true);

    buttonImage.setTexture(cfg.buttonTexture, 0, true);
    
    toolRank.clearPoints();
    toolRank.setPoint(FramePoint.T, toolBox, FramePoint.T, 0.0, -0.015);
    toolRank.setSize(cfg.tooltip.width - 0.03, cfg.tooltip.height - 0.03);
    toolRank.text = "Rank 1/3";

    // config.verticalLink = { point: true, pos: { pointSelf: FRAMEPOINT_BOTTOM, frameOther: this.frames.box, pointOther: FRAMEPOINT_CENTER, p: { x: xOffset, y: yOffset }}, size: { x: this.TalentWidth*0.10, y: yIncrem }, texture: this.InactiveLinkTexture };
    // config.horizontalLink = { point: true, pos: { pointSelf: FRAMEPOINT_LEFT, frameOther: this.frames.box, pointOther: FRAMEPOINT_CENTER, p: { x: xOffset, y: yOffset }}, size: { x: xIncrem, y: this.TalentHeight*0.10 }, texture: this.InactiveLinkTexture };
    // config.tooltipRank = { clear: true, point: true, pos: { pointSelf: FRAMEPOINT_TOP, frameOther: tf.tooltipBox, pointOther: FRAMEPOINT_TOP, p: { x: 0.0, y: -0.015 }}, size: { x: this.TooltipBoxWidth-0.03, y: this.TooltipBoxHeight-0.03 }, text: "Rank 1/3"};

    // confirmButton.clearPoints();
    // confirmButton.setPoint(FramePoint.BR, parent, FramePoint.B, 0, cfg.confirm.y);
    // confirmButton.setSize(cfg.confirm.width, cfg.confirm.height);
    // confirmText.text = cfg.confirm.text;

    // cancelButton.clearPoints();
    // cancelButton.setPoint(FramePoint.BL, parent, FramePoint.B, 0, cfg.cancel.y);
    // cancelButton.setSize(cfg.cancel.width, cfg.cancel.height);
    // cancelText.text = cfg.cancel.text;

    const retVal: ITalentView = {
        button: {
            main: buttonMain,
            image: buttonImage
        },
        tooltip: {
            box: toolBox,
            text: toolText,
            rank: toolRank
        },
        rank: {
            image: rankImage,
            text: rankText
        },
        highlight: highlight
    }
    return retVal;
}