import { ITabContent } from "ui/tab-screen/interface/ITabContent";
import { TalentTree } from "components/talents/TalentTree";
import { ITalentTreeView, ITalentTreeButtonView } from "./interface/ITalentTreeView";
import { Frame } from "w3ts/index";
import ILogger from "components/logger/ILogger";

export class TalentTreeViewModel implements ITabContent {
    
    private _tabHeader: string = "Tree ";
    private _tree: TalentTree | null = null;

    private _confirm: ITalentTreeButtonView;
    private _cancel: ITalentTreeButtonView;

    constructor(
        { confirm, cancel }: ITalentTreeView, 
        private logger: ILogger,
        private code: string) {
        this._confirm = confirm;
        this._cancel = cancel;
    }
    
    Show(button: Frame): void {
        this._confirm.text.text = this.code;
        this._cancel.text.text = this.code;
        this._confirm.mainButton.visible = true;
        this._cancel.mainButton.visible = true;
    }
    Hide(button: Frame): void {
        this._confirm.text.text = "";
        this._cancel.text.text = "";
        this._confirm.mainButton.visible = false;
        this._cancel.mainButton.visible = false;
    }

    RenderButton(image: Frame): void {
        throw new Error("Method not implemented.");
    }
    
    public get tabHeader(): string {
        return this._tabHeader + " " + this.code;
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
