import { ITalentSlot } from "./interface/ITalentSlot";
import { ITalentView } from "./interface/ITalentView";
import { Frame } from "w3ts/index";
import { Talent } from "components/talents/Talent";
import { TalentState } from "components/talents/TalentState";

export class TalentViewModel implements ITalentSlot {

    private _view: ITalentView;
    private _visible: boolean = true;
    private _talent: Talent | null = null;
    private _state: TalentState = TalentState.Empty;
    private _errorText: string | null = null;

    public index: number = 0;
    
    // Direct frame changing methods
    
    private _rank: number = 0;
    private _name: string = "";
    private _available: boolean = false;
    // private _tooltipTitle: string = "";

    RenderView() {
        if (!this._talent) return;

        let t = this._talent;

        this.setTooltip(this._errorText, t.cost);
        this.rank = this._rank;
        print("State", this._state);
        switch (this._state) {
            case TalentState.Empty:
                this.visible = false;
                break;
            case TalentState.RequireDisabled:
                this.available = false;
                break;
            case TalentState.DependDisabled:
                this.available = false;
                break;
            case TalentState.Available:
                this.available = true;
                break;
            case TalentState.Maxed:
                this.SetMaxed();
                break;
        }
    }
    
    public set available(v : boolean) {
        this._available = v;
        if (!this._talent) return;
        // icon to disabled/enabled, button enable, highlight, tooltip
        let texture = v ? this._talent.iconEnabled : this._talent.iconDisabled;
        this._view.button.image.setTexture(texture, 0, true);
        this._view.button.main.enabled = v;
        this._view.highlight.visible = v;
        print(this._view.highlight.visible);
    }

    public setTooltip(requirements: string | null, cost: number | null) {

        if (!this._talent) return;
        
        let t = this._talent;
        let description = t.description;
        if (t.nextRank && t.previousRank) description = t.previousRank.description + "\n\nNext rank:\n" + description;

        let text = t.name + '\n\n';
        if (cost && cost > 0 && requirements)
            text += `|cffffc04d[Cost ${cost}]|r |cffff6450Requires: ${requirements}|r\n\n${description}`;
        else if (requirements)
            text += `|cffff6450Requires: ${requirements}|r\n\n${description}`;
        else
            text += `${description}`;

        this._view.tooltip.text.text = text;
    }

    public SetMaxed() {
        if (!this._talent) return;
        this._available = false;
        this._view.button.image.setTexture(this._talent.iconEnabled, 0, true);
        this._view.button.main.enabled = false;
        this._view.highlight.visible = false;
        this.setTooltip(null, null);
    }
    
    // public set tooltipTitle(v : string) {
    //     this._tooltipTitle = v;
    //     if (!this.talent) return;
    //     this._view.tooltip.text.text = v;
    // }
    
    public set name(v : string) {
        this._name = v;
        if (!this.talent) return;
    }
    
    
    constructor(view: ITalentView) {
        this._view = view;
    }

    setPoint(point: framepointtype, relative: Frame, relativePoint: framepointtype, x: number, y: number): void {
        this._view.button.main.setPoint(point, relative, relativePoint, x, y);
    }
    public get visible(): boolean {
        return this._visible;
    }
    public set visible(v: boolean) {
        this._visible = v;
        this._view.button.main.visible = v;
        this._view.highlight.visible = v && this._available;
    }
    public get talent(): Talent | null {
        return this._talent;
    }
    public set talent(v: Talent | null) {
        this._talent = v;
        this.RenderView();
    }
    public get rank(): number {
        return this.rank;
    }
    public set rank(v: number) {
        this._rank = v;
        if (!this.talent) return;
        this._view.rank.text.text = v.toString();
        this._view.tooltip.rank.text = `Rank ${v}/${this.talent.maxRank}`;
    }
    public get state() : TalentState {
        return this._state;
    }
    public set state(v : TalentState) {
        this._state = v;
        this.RenderView();
    }
    public set errorText(v: string | null) {
        this._errorText = v;
    }
}