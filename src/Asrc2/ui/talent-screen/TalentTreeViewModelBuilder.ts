import { Frame, MapPlayer } from "w3ts/index";
import { ITalentTreeView } from "./interface/ITalentTreeView";
import { ITalentView } from "./interface/ITalentView";
import { ITalentSlot } from "./interface/ITalentSlot";
import { ITalentTreeConfig } from "./interface/ITalentTreeConfig";
import { TalentTreeViewModel } from "./TalentTreeViewModel";
import { IFrameEventHandler } from "Asrc2/events/handlers/frame/IFrameEventHandler";

export class TalentTreeViewModelBuilder {

    private _config?: ITalentTreeConfig;
    private _parentFrame?: Frame;
    private _baseView?: ITalentTreeView;
    private _clickHandler?: IFrameEventHandler;
    private _talentViews?: ITalentView[];
    private _talentVMFactory?: (this: void, view: ITalentView) => ITalentSlot;
    private _watcher: MapPlayer = MapPlayer.fromIndex(12);

    constructor(
    ) {}

    Build(): TalentTreeViewModel {

        if (!this._parentFrame) {
            print("|cffff2222Parent frame missing.|r")
            throw new Error("Parent frame missing.");
        }
        
        if (!this._baseView) {
            print("|cffff2222Talent tree view missing.|r")
            throw new Error("Talent tree view missing.");
        }

        if (!this._clickHandler) {
            print("|cffff2222Frame event handler missing.|r")
            throw new Error("Frame event handler missing.");
        }
        
        if (!this._talentViews) {
            print("|cffff2222Talent views missing.|r")
            throw new Error("Talent views missing.");
        }
        
        if (!this._config) {
            print("|cffff2222Configuration missing.|r")
            throw new Error("Configuration missing.");
        }
        
        if (!this._talentVMFactory) {
            print("|cffff2222Talent slot factory missing.|r")
            throw new Error("Talent slot factory missing.");
        }

        if (!this._watcher) {
            print("|cffff2222Watching player missing.|r")
            throw new Error("Watching player missing.");
        }
        
        const built = new TalentTreeViewModel(this._watcher, this._parentFrame, this._baseView, this._clickHandler, this._talentViews, this._config, 
            this._talentVMFactory);
        return built;
    }

    SetParentFrame(parent: Frame) {
        this._parentFrame = parent;
        return this;
    }

    SetBaseView(view: ITalentTreeView) {
        this._baseView = view;
        return this;
    }

    SetFrameEventHandler(handler: IFrameEventHandler) {
        this._clickHandler = handler;
        return this;
    }

    SetTalentViews(views: ITalentView[]) {
        this._talentViews = views;
        return this;
    }

    SetConfig(config: ITalentTreeConfig) {
        this._config = config;
        return this;
    }

    SetTalentViewModelFactory(method: (this: void, view: ITalentView) => ITalentSlot) {
        this._talentVMFactory = method;
        return this;
    }

    SetWatcher(player: MapPlayer) {
        this._watcher = player;
        return this;
    }
}