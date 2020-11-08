import { IconPath } from "IconPath";
import { FramePoint } from "ui/view-models/Frame";
import { Frame } from "w3ts/index";
import { IProgressBarView } from "./IProgressBarView";
import { IProgressBarViewConfig } from "./IProgressBarViewConfig";

export function GenerateProgressBarView(parent: Frame, cfg: IProgressBarViewConfig): IProgressBarView {

    let fill: Frame;
    let border: Frame;

    const bar = Frame.fromHandle(BlzCreateSimpleFrame("MyBar", parent.handle, 0));
    const text = Frame.fromHandle(BlzGetFrameByName("MyBarText", 0));
    const background = Frame.fromHandle(BlzGetFrameByName("MyBarBackground", 0));

    bar
        .setAbsPoint(FramePoint.C, cfg.x, cfg.y)
        .setValue(50)
        .setTexture(cfg.textureFill, 0, true)
        .setSize(cfg.width, cfg.height);
    
    text
        .setText("Momentum");

    background
        .setTexture(cfg.textureBorder, 0, true);

    return {
        border: background,
        fill: bar
    }

    // if (cfg.isBorderOnTop) {
        
    //     fill = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "AvailableImage", parent.handle, "", 0));
    //     border = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "AvailableImage", parent.handle, "", 0));
    // } else {

    //     border = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "AvailableImage", parent.handle, "", 0));
    //     fill = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "AvailableImage", parent.handle, "", 0));
    // }
    
    // fill
    //     .setPoint(FramePoint.C, parent, FramePoint.C, cfg.x, cfg.y)
    //     .setSize(cfg.width, cfg.height)
    //     .setTexture(cfg.textureFill, 0, true);

    // border
    //     .setPoint(FramePoint.C, parent, FramePoint.C, cfg.x, cfg.y)
    //     .setSize(cfg.width, cfg.height)
    //     .setTexture(cfg.textureBorder, 0, true);
        
    // return {
    //     fill,
    //     border
    // };
}