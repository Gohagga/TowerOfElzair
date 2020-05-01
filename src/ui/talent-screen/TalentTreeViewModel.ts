import { ITabContent } from "ui/tab-screen/interface/ITabContent";
import { TalentTree } from "components/talents/TalentTree";
import { ITalentTreeView, ITalentTreeButtonView } from "./interface/ITalentTreeView";
import { Frame } from "w3ts/index";
import ILogger from "components/logger/ILogger";
import { ITalentSlot } from "./interface/ITalentSlot";
import { ITalentTreeConfig } from "./interface/ITalentTreeConfig";
import { ITalentView } from "./interface/ITalentView";
import { FramePoint } from "ui/view-models/Frame";

export class TalentTreeViewModel implements ITabContent {
    
    private _tabHeader: string = "Talent Tree";
    private _tree: TalentTree | null = null;

    private _confirm: ITalentTreeButtonView;
    private _cancel: ITalentTreeButtonView;
    private _slots: ITalentSlot[] = [];

    private _config: ITalentTreeConfig;
    private _parent: Frame;

    constructor(
        parent: Frame,
        treeView: ITalentTreeView,
        talentViews: ITalentView[],
        config: ITalentTreeConfig,
        slotFactory: (view: ITalentView) => ITalentSlot,
        private logger: ILogger
    ) {
        this._config = config;
        this._confirm = treeView.confirm;
        this._cancel = treeView.cancel;
        this._parent = parent;

        for (let i = 0; i < talentViews.length && i < config.base.maxTalentSlots; i++) {
            let slot = slotFactory(talentViews[i]);
            this._slots.push(slot);
        }
    }
    
    Show(button: Frame): void {
        this._confirm.mainButton.visible = true;
        this._cancel.mainButton.visible = true;

        this.logger.info("Confirm and cancel buttons shown.");

        if (!this._tree) return;

        this.logger.info("Tree exists, we will not return...");
        // Reorganize the talents
        const tree = this._tree;
        const talents = tree.talents;
        const cols = tree.columns;
        const rows = tree.rows;

        let xIncrem = (this._config.box.width * (1 - this._config.base.sideMargin)) / (cols + 1);
        let yIncrem = (this._config.box.height * (1 - this._config.base.verticalMargin)) / (rows + 1);

        this.logger.info("Increments calculated", xIncrem, yIncrem);

        // Get max talent count
        let maxTalents = this._slots.length
        maxTalents = maxTalents > cols * rows ? cols * rows : maxTalents;

        for (let i = 0; i < maxTalents; i++) {
            
            let slot = this._slots[i];

            const xPos = math.floor(math.fmod(i, cols));
            const yPos = math.floor((i) / cols);
            let x = xPos * xIncrem - ((cols - 1) * 0.5) * xIncrem;
            let y = yPos * yIncrem - ((rows - 1) * 0.5) * yIncrem;

            slot.setPoint(FramePoint.C, this._parent, FramePoint.C, x, y);

            // let talent = talents[i];
            // if (!talent) {
            //     slot.visible = false;
            //     continue;
            // }
            slot.visible = true;
        }
    }
    Hide(button: Frame): void {
        this._confirm.mainButton.visible = false;
        this._cancel.mainButton.visible = false;

        for (let i = 0; i < this._slots.length; i++) {
            this._slots[i].visible = false;
        }
    }

    RenderButton(image: Frame): void {
        throw new Error("Method not implemented.");
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
    }
}
