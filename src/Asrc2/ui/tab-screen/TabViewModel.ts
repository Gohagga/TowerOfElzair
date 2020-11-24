import { Frame, MapPlayer } from "w3ts/index";
import { ITabContent } from "./interface/ITabContent";
import { ITabViewConfig } from "./interface/ITabConfig";
import { ITabView, ITabSelectorView } from "./interface/ITabView";
import { IFrameEventHandler } from "Asrc2/events/handlers/frame/IFrameEventHandler";

export class TabViewModel {

    private _box: Frame;
    private _closeButton: Frame;
    private _title: Frame;
    private _tabSelectors: ITabSelectorView[];
    private _tabContent: ITabContent[] = [];
    
    private _activeTabIndex: number = 0;
    private _watcher: MapPlayer;
    private _visible: boolean = false;
    
    constructor(
        watcher: MapPlayer,
        frameEvent: IFrameEventHandler,
        { box, closeButton, title, tabSelectors }: ITabView
    ) {
        this._watcher = watcher;
        this._box = box;
        this._closeButton = closeButton;
        this._title = title;
        this._tabSelectors = tabSelectors;

        // Need to draw stuff in here
        for (let i = 0; i < tabSelectors.length; i++) {
            const selector = tabSelectors[i];
            
            let index = i;
            let msg = `Tab ${i} has been clicked`;
            selector.mainButton
            frameEvent.SubscribeClick(selector.mainButton, () => {

                this.activeTabIndex = index;

                selector.mainButton.enabled = false;
                selector.mainButton.enabled = true;
            });

            if (MapPlayer.fromLocal().id != this._watcher.id) continue;
            selector.mainButton.visible = false;
            selector.selectFrame.visible = false;
        }

        frameEvent.SubscribeClick(closeButton, () => this.CloseView());
    }

    public CloseView() {

        if (MapPlayer.fromLocal().id != this._watcher.id) return;
        this.visible = false;
    }

    public get visible() {
        return this._visible;
    }
    public set visible(v: boolean) {

        this._visible = v;
        // this.logger.info(MapPlayer.fromLocal().id, "LOCAL ID - WATCHER", this._watcher.id);
        if (MapPlayer.fromLocal().id != this._watcher.id) return;
        // this.logger.info("Setting visible to box?", v);
        this._box.visible = v;
        // this.logger.info("Is selector visible?", this._tabSelectors[0].mainButton.visible);
    }

    public set activeTabIndex(index: number) {

        const i = this._activeTabIndex;
        // print("Swapping tab", i, "to", index);

        let hideSelector: ITabSelectorView | null = null;
        let showSelector: ITabSelectorView | null = null;

        if (this._tabContent[i]) {
            
            hideSelector = this._tabSelectors[i];
            this._tabContent[i].Hide(hideSelector.mainImage);
        }
        
        if (this._tabContent[index]) {

            showSelector = this._tabSelectors[index];
            this._tabContent[index].Show(showSelector.mainImage);
        }
        
        this._activeTabIndex = index;

        if (MapPlayer.fromLocal() == this._watcher) {
            this._title.text = this._tabContent[index].tabHeader;
            if (hideSelector) hideSelector.selectFrame.visible = false;
            if (showSelector) showSelector.selectFrame.visible = true;
        }
    }
    public get activeTab() {
        return this._tabContent[this._activeTabIndex];
    }
    public set activeTab(v: ITabContent) {
        let t = this._tabContent.findIndex((x) => x == v);
        if (t == -1) {
            this._tabContent.push(v);
            t = this._tabContent.length - 1;
        }
        // this.logger.info("Opening tab...", t);
        this.activeTabIndex = t;
    }
    // public get tabContent(): ITabContent[] {
    //     return this._tabContent;
    // }
    public set tabContent(v: ITabContent[]) {

        let count = v.length;
        for (let i = 0; i < this._tabSelectors.length; i++) {
            
            let butt = false;
            if (i < count) {
                butt = true;
                v[i].watcher = this._watcher;
                v[i].Hide(this._tabSelectors[i].mainImage);
            } else {
                butt = false;
            }
            if (MapPlayer.fromLocal() == this._watcher) {
                this._tabSelectors[i].mainButton.visible = butt;
                this._tabSelectors[i].selectFrame.visible = false;
                if (v[i]) v[i].RenderButton(this._tabSelectors[i].mainImage);
            }
        }

        this._tabContent = v;
    }
}