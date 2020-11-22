import { IFrameEventHandler } from "Asrc2/events/handlers/frame/IFrameEventHandler";
import { Talent } from "Asrc2/systems/talent/Talent";
import { TalentDepType } from "Asrc2/systems/talent/TalentDependency";
import { TalentState } from "Asrc2/systems/talent/TalentState";
import { TalentTree } from "Asrc2/systems/talent/TalentTree";
import { Frame, MapPlayer } from "w3ts/index";
import { ITabContent } from "../tab-screen/interface/ITabContent";
import { FramePoint } from "../view-models/Frame";
import { ITalentSlot } from "./interface/ITalentSlot";
import { ITalentTreeConfig } from "./interface/ITalentTreeConfig";
import { ITalentTreeButtonView, ITalentTreeView } from "./interface/ITalentTreeView";
import { ITalentView } from "./interface/ITalentView";

export class TalentTreeViewModel implements ITabContent {
    
    private _tabHeader: string = "Talent Tree";
    private _tree: TalentTree | null = null;

    private _confirm: ITalentTreeButtonView;
    private _cancel: ITalentTreeButtonView;
    private _slots: ITalentSlot[] = [];
    private _watched = false;

    private _config: ITalentTreeConfig;
    private _parent: Frame;
    private _frameEventHandler: IFrameEventHandler;
    
    private _watcher: MapPlayer = MapPlayer.fromIndex(12);

    constructor(
        watcher: MapPlayer,
        parent: Frame,
        treeView: ITalentTreeView,
        frameEventHandler: IFrameEventHandler,
        talentViews: ITalentView[],
        config: ITalentTreeConfig,
        slotFactory: (view: ITalentView) => ITalentSlot,
    ) {
        this._watcher = watcher;
        this._config = config;
        this._frameEventHandler = frameEventHandler;
        this._confirm = treeView.confirm;
        this._cancel = treeView.cancel;
        this._parent = parent;
        
        for (let i = 0; i < talentViews.length && i < config.base.maxTalentSlots; i++) {
            let view = talentViews[i];
            let slot = slotFactory(view);
            let index = i;
            slot.watcher = watcher;
            this._slots.push(slot);
            
            frameEventHandler.SubscribeClick(view.button.main, () => this.OnTalentClicked(slot, index));
        }

        frameEventHandler.SubscribeClick(treeView.confirm.mainButton, () => this.OnConfirm());
        frameEventHandler.SubscribeClick(treeView.cancel.mainButton, () => this.OnCancel());
    }

    OnTalentClicked(slot: ITalentSlot, index: number) {
        
        print(this.tree?.title, this._watched, slot.talent)
        if (!this._watched || !slot.talent || !this._tree) return;

        print(2)
        let tempState = this._tree.tempRankState[index];
        if (this._tree.pointsAvailable >= slot.talent.cost && tempState < slot.talent.maxRank) {

            this._tree.ApplyTalentTemporary(index);
            tempState = this._tree.tempRankState[index];
            this.ResetTalentViewModels();
            // this.UpdateTalentSlot(slot, slot.talent, this._tree, index);
        }
    }

    OnConfirm() {

        if (MapPlayer.fromEvent() != this._watcher) return;
        if (!this._tree || !this._watched) return;

        print("Saving talent choices");

        this._tree.SaveTalentRankState();

        this.ResetTalentViewModels();

        if (GetTriggerPlayer() == GetLocalPlayer()) {
            // this._confirm.mainButton.setFocus(false);
            this._confirm.mainButton.enabled = false;
            this._confirm.mainButton.enabled = true;
        }
    }

    OnCancel() {

        if (MapPlayer.fromEvent() != this._watcher) return;
        if (!this._tree || !this._watched) return;

        print("Cancelling talent choices");

        const tempState = this._tree.tempRankState;
        this._tree.ResetTempRankState();
        this.ResetTalentViewModels();

        if (GetTriggerPlayer() == GetLocalPlayer()) {
            // this._confirm.mainButton.setFocus(false);
            this._cancel.mainButton.enabled = false;
            this._cancel.mainButton.enabled = true;
        }
    }

    ResetTalentViewModels() {

        const talents = this._tree?.talents;
        for (let i = 0; i < this._slots.length; i++) {

            let slot = this._slots[i];
            if (this._tree && talents && talents[i]) {
                slot.talent = talents[i];
                this.UpdateTalentSlot(slot, talents[i], this._tree, i);
            } else {
                slot.state = TalentState.Empty;
            }
        }
    }

    public UpdateTalentSlot(slot: ITalentSlot, talent: Talent, tree: TalentTree, index: number): void {
        
        let tempState = tree.tempRankState[index];
        let state = TalentState.Available;
        let dep = false;
        let req = false

        slot.rank = tempState;
        
        let depLeft = tree.CheckDependencyKey(tree.tempRankState, talent.dependency, TalentDepType.left, index);
        let depUp = tree.CheckDependencyKey(tree.tempRankState, talent.dependency, TalentDepType.up, index);
        let depRight = tree.CheckDependencyKey(tree.tempRankState, talent.dependency, TalentDepType.right, index);
        let depDown = tree.CheckDependencyKey(tree.tempRankState, talent.dependency, TalentDepType.down, index);

        let linkTexture: Record<string, string> = { 
            enabled: this._config.talent.link.activeTexture,
            disabled: this._config.talent.link.inactiveTexture
        };

        // print('RENDER LINKS:', depLeft.linkAction, depUp.linkAction, depRight.linkAction, depDown.linkAction);
        slot.renderLinks({
            left: depLeft.linkAction != null ? linkTexture[depLeft.linkAction] : null,
            up: depUp.linkAction != null ? linkTexture[depUp.linkAction] : null,
            right: depRight.linkAction != null ? linkTexture[depRight.linkAction] : null,
            down: depDown.linkAction != null ? linkTexture[depDown.linkAction] : null,
        });

        // If talent is link, just render it empty
        if (talent.isLink) {
            slot.state = TalentState.Link;
            return;
        }
        
        slot.errorText = null;
        let depOk = true;
        let reqOk = true;

        let depError = "";
        let reqError = "";
        
        // Check talent dependency errors and set message
        if (depLeft.ok && depUp.ok && depRight.ok && depDown.ok) {
            depOk = true;
        } else {
            
            depOk = false;
            depError += [ depLeft.errorText, depUp.errorText, depRight.errorText, depDown.errorText ]
            .filter(x => x != null)
            .join(',');
        }
        
        // Check talent requirements error and set message
        [reqOk, reqError] = talent.requirements(tree, tree.unit);
        
        if (depOk && reqOk) {

            if (tempState == talent.maxRank) slot.state = TalentState.Maxed;
            else slot.state = TalentState.Available;
        } else {
            
            slot.errorText = depError + reqError;
            
            if (!req) slot.state = TalentState.RequireDisabled;
            else if (!dep) slot.state = TalentState.DependDisabled;
        }
    }
    
    Show(button: Frame): void {

        this._watched = true;
        print(this._tree?.title, "watched?", this._watched);
        if (!this._tree) return;
        
        print("Tree exists, we will not return...");
        // Reorganize the talents
        const tree = this._tree;
        const talents = tree.talents;
        const cols = tree.columns;
        const rows = tree.rows;
        
        let xIncrem = (this._config.box.width * (1 - this._config.base.sideMargin)) / (cols + 1);
        let yIncrem = (this._config.box.height * (1 - this._config.base.verticalMargin)) / (rows + 1);
        
        print("Increments calculated", xIncrem, yIncrem);
        
        // Get max talent count
        let maxTalents = this._slots.length
        maxTalents = maxTalents > cols * rows ? cols * rows : maxTalents;
        
        for (let i = 0; i < maxTalents; i++) {
            
            let slot = this._slots[i];
            
            const xPos = math.floor(math.fmod(i, cols));
            const yPos = math.floor((i) / cols);
            let x = xPos * xIncrem - ((cols - 1) * 0.5) * xIncrem;
            let y = yPos * yIncrem - ((rows - 1) * 0.5) * yIncrem;
            
            slot.moveTo(FramePoint.C, this._parent, FramePoint.C, x, y, xIncrem, yIncrem);
            
            let talent = talents[i];
            if (talent) {
                slot.visible = true;
            }
        }

        this.ResetTalentViewModels();
        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        
        this._confirm.mainButton.visible = true;
        this._cancel.mainButton.visible = true;
        print("Confirm and cancel buttons shown.");
    }

    Hide(button: Frame): void {
        this._watched = false;
        print(this._tree?.title, "watched?", this._watched);

        for (let i = 0; i < this._slots.length; i++) {
            this._slots[i].visible = false;
        }

        if (MapPlayer.fromLocal().id != this.watcher.id) return;
        this._confirm.mainButton.visible = false;
        this._cancel.mainButton.visible = false;
    }

    RenderButton(image: Frame): void {
        let tex = this._tree && this._tree.icon;
        if (tex) image.setTexture(tex, 0, true);
    }
    
    public get tabHeader(): string {
        return this._tabHeader;
    }
    public set tabHeader(v: string) {
        this._tabHeader = v;
    }
    public get tree(): TalentTree | null {
        return this._tree;
    }
    public set tree(v: TalentTree | null) {
        this._tree = v;
        if (v) this._tabHeader = v.title;
        this.ResetTalentViewModels();
    }
    public get watcher() {
        return this._watcher;
    }
    public set watcher(v: MapPlayer) {
        this._watcher = v;

        for (let t of this._slots) {
            t.watcher = v;
        }
    }
}
