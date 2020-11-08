import { ITalentTreeConfig } from "./interface/ITalentTreeConfig";
import { FramePoint } from "../view-models/Frame";
import { Frame } from "w3ts";
import { ITalentTreeView } from "./interface/ITalentTreeView";
import { ITalentView } from "./interface/ITalentView";
import { TalentDepType } from "systems/talents/TalentDependency";

export function GenerateNTalentViews(amount: number, parent: Frame, cfg: ITalentTreeConfig.Talent): ITalentView[] {
    
    const views: ITalentView[] = [];
    for (let i = 0; i < amount; i++) {
        views.push(GenerateTalentView(parent, cfg));
    }
    return views;
}

export function GenerateTalentView(parent: Frame, cfg: ITalentTreeConfig.Talent): ITalentView {

    const links = [
        Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "LeftLink", parent.handle, "", 0)),
        Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "UpLink", parent.handle, "", 0)),
        Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "RightLink", parent.handle, "", 0)),
        Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "DownLink", parent.handle, "", 0))
    ];

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

    buttonMain.setPoint(FramePoint.C, parent, FramePoint.C, 0, 0)
        .setSize(cfg.buttonWidth, cfg.buttonHeight)
        .setLevel(2);

    toolBox
        .setPoint(FramePoint.TL, parent, FramePoint.TR, 0, 0)
        .setSize(cfg.tooltip.width, cfg.tooltip.height);

    toolText.clearPoints()
        .setPoint(FramePoint.C, toolBox, FramePoint.C, cfg.tooltip.textY, cfg.tooltip.textY)
        .setSize(cfg.tooltip.textWidth, cfg.tooltip.textHeight)
        .text = cfg.tooltip.defaultText;

    rankImage
        .setPoint(FramePoint.BR, buttonMain, FramePoint.BR, cfg.rank.x, cfg.rank.y)
        .setSize(cfg.rank.size.width, cfg.rank.size.height)
        .setTexture(cfg.rank.texture, 0, true);
    
    rankText
        .clearPoints()
        .setPoint(FramePoint.C, rankImage, FramePoint.C, 0, 0)
        .setSize(0.01, 0.012)
        .text = "0";
    
    highlight
        .setPoint(FramePoint.C, buttonMain, FramePoint.C, 0, 0)
        .setSize(cfg.highlight.width, cfg.highlight.height)
        .setTexture(cfg.highlight.texture, 0, true);

    buttonImage
        .setTexture(cfg.buttonTexture, 0, true);
    
    toolRank
        .clearPoints()
        .setPoint(FramePoint.T, toolBox, FramePoint.T, 0.0, -0.015)
        .setSize(cfg.tooltip.width - 0.03, cfg.tooltip.height - 0.03)
        .text = "Rank 1/3";

    for (let link of links) {
        link
            .setPoint(FramePoint.C, parent, FramePoint.C, 0, 0)
            .setSize(cfg.link.width, cfg.link.width)
            .setTexture(cfg.link.inactiveTexture, 0, true)
            .setLevel(1)
            .visible = false;
    }
    //  { point: true, pos: { pointSelf: FRAMEPOINT_BOTTOM, frameOther: this.frames.box, pointOther: FRAMEPOINT_CENTER, p: { x: xOffset, y: yOffset }}, size: { x: this.TalentWidth*0.10, y: yIncrem }, texture: this.InactiveLinkTexture };
    // config.horizontalLink = { point: true, pos: { pointSelf: FRAMEPOINT_LEFT, frameOther: this.frames.box, pointOther: FRAMEPOINT_CENTER, p: { x: xOffset, y: yOffset }}, size: { x: xIncrem, y: this.TalentHeight*0.10 }, texture: this.InactiveLinkTexture };

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
        highlight: highlight,
        links: {
            left: links[0],
            up: links[1],
            right: links[2],
            down: links[3],
        }
    }
    return retVal;
}