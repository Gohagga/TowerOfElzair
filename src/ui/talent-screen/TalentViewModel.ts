import { ITalentSlot } from "./interface/ITalentSlot";
import { ITalentView } from "./interface/ITalentView";
import { Frame, MapPlayer } from "w3ts/index";
import { Talent } from "systems/talents/Talent";
import { TalentState } from "systems/talents/TalentState";
import { FramePoint } from "ui/view-models/Frame";
import { TalentDepType } from "systems/talents/TalentDependency";

export class TalentViewModel implements ITalentSlot {

    private _view: ITalentView;
    private _visible: boolean = true;
    private _talent: Talent | null = null;
    private _state: TalentState = TalentState.Empty;
    private _errorText: string | null = null;
    
    public index: number = 0;
    public watcher: MapPlayer = MapPlayer.fromIndex(12);
    
    // Direct frame changing methods
    
    private _rank: number = 0;
    private _name: string = "";
    private _available: boolean = false;
    private _linkVisibility = {
        [TalentDepType.left]: false,
        [TalentDepType.up]: false,
        [TalentDepType.right]: false,
        [TalentDepType.down]: false,
    }
    // private _tooltipTitle: string = "";

    /**Calls local blocks.*/
    RenderView() {
        if (!this._talent) return;

        let t = this._talent;

        this.setTooltip(this._errorText, t.cost);
        this.rank = this._rank;
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
        
        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        this._view.button.image.setTexture(texture, 0, true);
        this._view.button.main.enabled = v;
        this._view.highlight.visible = v;
    }

    public setTooltip(requirements: string | null, cost: number | null) {

        if (MapPlayer.fromLocal().id != this.watcher.id || !this._talent) return;
        
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
        this.setTooltip(null, null);

        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        this._view.button.image.setTexture(this._talent.iconEnabled, 0, true);
        this._view.button.main.enabled = false;
        this._view.highlight.visible = false;
    }
    
    public set name(v : string) {
        this._name = v;
        if (!this.talent) return;
    }    
    
    constructor(view: ITalentView) {
        this._view = view;
    }
    
    renderLinks(as: Record<TalentDepType, string | null>): void {
        
        this.linkLeft = as.left != null;
        this.linkUp = as.up != null;
        this.linkRight = as.right != null;
        this.linkDown = as.down != null;

        if (MapPlayer.fromLocal() != this.watcher) return;
        if (as.left) this._view.links.left.setTexture(as.left, 0, true);
        if (as.up) this._view.links.up.setTexture(as.up, 0, true);
        if (as.right) this._view.links.right.setTexture(as.right, 0, true);
        if (as.down) this._view.links.down.setTexture(as.down, 0, true);
    }

    moveTo(point: framepointtype, relative: Frame, relativePoint: framepointtype, x: number, y: number, linkWidth: number, linkHeight: number): void {

        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        this._view.button.main.setPoint(point, relative, relativePoint, x, y);
        this._view.links.left.clearPoints();
        this._view.links.left.setPoint(FramePoint.R, this._view.button.main, FramePoint.C, 0, 0);
        this._view.links.left.width = linkWidth; 
        this._view.links.up.clearPoints();
        this._view.links.up.setPoint(FramePoint.B, this._view.button.main, FramePoint.C, 0, 0);
        this._view.links.up.height = linkHeight;
        this._view.links.right.clearPoints();
        this._view.links.right.setPoint(FramePoint.L, this._view.button.main, FramePoint.C, 0, 0);
        this._view.links.right.width = linkWidth;
        this._view.links.down.clearPoints();
        this._view.links.down.setPoint(FramePoint.T, this._view.button.main, FramePoint.C, 0, 0);
        this._view.links.down.height = linkHeight;
    }
    public get visible(): boolean {
        return this._visible;
    }
    /**Changes view. */
    public set visible(v: boolean) {
        this._visible = v;

        if (MapPlayer.fromLocal().id != this.watcher.id) return;

        this._view.button.main.visible = v;
        this._view.highlight.visible = v && this._available;

        this._view.links.down.visible = this._linkVisibility.down;
        this._view.links.right.visible = this._linkVisibility.right;
        this._view.links.up.visible = this._linkVisibility.up;
        this._view.links.left.visible = this._linkVisibility.left;
    }
    public get talent(): Talent | null {
        return this._talent;
    }
    /**Changes view. */
    public set talent(v: Talent | null) {
        this._talent = v;
        this.RenderView();
    }
    public get rank(): number {
        return this.rank;
    }
    /**Changes view. */
    public set rank(v: number) {
        this._rank = v;
        if (!this.talent) return;
        let tooltip = `Rank ${v}/${this.talent.maxRank}`;
        let rankText = v.toString();

        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        this._view.rank.text.text = rankText;
        this._view.tooltip.rank.text = tooltip;
    }
    public get state() : TalentState {
        return this._state;
    }
    /**Changes view. */
    public set state(v : TalentState) {
        this._state = v;
        this.RenderView();
    }
    public set errorText(v: string | null) {
        this._errorText = v;
    }
    /**Changes view. */
    public set linkLeft(v: boolean) {
        this._linkVisibility.left = v;
        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        this._view.links.left.visible = this._linkVisibility.left;
    }
    /**Changes view. */
    public set linkUp(v: boolean) {
        this._linkVisibility.up = v;
        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        this._view.links.up.visible = this._linkVisibility.up;
    }
    /**Changes view. */
    public set linkRight(v: boolean) {
        this._linkVisibility.right = v;
        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        this._view.links.right.visible = this._linkVisibility.right;
    }
    /**Changes view. */
    public set linkDown(v: boolean) {
        this._linkVisibility.down = v;
        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        this._view.links.down.visible = this._linkVisibility.down;
    }
}