import { ITalentSlot } from "./interface/ITalentSlot";
import { ITalentView } from "./interface/ITalentView";
import { Frame } from "w3ts/index";

export class TalentViewModel implements ITalentSlot {

    private _view: ITalentView;
    private _visible: boolean = true;

    constructor(view: ITalentView) {
        this._view = view;
    }

    public get visible(): boolean {
        return this._visible;
    }
    public set visible(v: boolean) {
        this._visible = v;
        this._view.button.main.visible = v;
        this._view.highlight.visible = v;
    }
    setPoint(point: framepointtype, relative: Frame, relativePoint: framepointtype, x: number, y: number): void {
        this._view.button.main.setPoint(point, relative, relativePoint, x, y);
    }
}