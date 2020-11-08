import { ITalentTreeConfig } from "./interface/ITalentTreeConfig";
import { FramePoint } from "../view-models/Frame";
import { Frame } from "w3ts";
import { ITalentTreeView } from "./interface/ITalentTreeView";

export function GenerateTalentTreeView(parent: Frame, cfg: ITalentTreeConfig): ITalentTreeView {

    const confirmButton = new Frame("ScriptDialogButton", parent, 0, 0);
    const confirmText = Frame.fromName("ScriptDialogButtonText", 0);
    const cancelButton = new Frame("ScriptDialogButton", parent, 0, 0);
    const cancelText = Frame.fromName("ScriptDialogButtonText", 0);

    confirmButton
        .clearPoints()
        .setPoint(FramePoint.BR, parent, FramePoint.B, 0, cfg.confirm.y)
        .setSize(cfg.confirm.width, cfg.confirm.height)
        .text = cfg.confirm.text;

    cancelButton.clearPoints()
        .setPoint(FramePoint.BL, parent, FramePoint.B, 0, cfg.cancel.y)
        .setSize(cfg.cancel.width, cfg.cancel.height)
        .text = cfg.cancel.text;

    const retVal: ITalentTreeView = {
        confirm: {
            mainButton: confirmButton,
            text: confirmText
        },
        cancel: {
            mainButton: cancelButton,
            text: cancelText
        }
    }
    return retVal;
}