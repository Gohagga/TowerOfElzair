import { Frame } from "w3ts/index";
import { ITabContent } from "./interface/ITabContent";
import { ITabViewConfig } from "./interface/ITabConfig";
import { ITabView, ITabSelectorView } from "./interface/ITabView";
import { FrameEventCallback, IFrameEventHandler, FrameEventType } from "../../event-handlers/interfaces/IFrameEventHandler";
import ILogger from "components/logger/ILogger";

export class TabViewModel {

    private _box: Frame;
    private _closeButton: Frame;
    private _title: Frame;
    private _tabSelectors: ITabSelectorView[];
    private _tabContent: ITabContent[] = [];
    
    private _activeTabIndex: number = 0;
    
    constructor(
        private logger: ILogger,
        private event: IFrameEventHandler,
        { box, closeButton, title, tabSelectors }: ITabView
    ) {
        
        this._box = box;
        this._closeButton = closeButton;
        this._title = title;
        this._tabSelectors = tabSelectors;

        // Need to draw stuff in here
        for (let i = 0; i < tabSelectors.length; i++) {
            const selector = tabSelectors[i];
            selector.mainButton.visible = false;
            selector.selectFrame.visible = false;

            let index = i;
            let msg = `Tab ${i} has been clicked`;
            event.Subscribe(FrameEventType.Click, selector.mainButton, () => {
                logger.info(msg);
                this.activeTabIndex = index;
            });
        }
    }

    public set activeTabIndex(index: number) {

        const i = this._activeTabIndex;
        if (this._tabContent[i]) {
            
            const selector = this._tabSelectors[i];
            selector.selectFrame.visible = false;
            this._tabContent[i].Hide(selector.mainImage);
        }
        
        if (this._tabContent[index]) {

            const selector = this._tabSelectors[index];
            selector.selectFrame.visible = true;
            this._tabContent[index].Show(selector.mainImage);
        }

        this._activeTabIndex = index;
        this._title.text = this._tabContent[index].tabHeader;
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
        this.logger.info("Opening tab...", t);
        this.activeTabIndex = t;
    }
    // public get tabContent(): ITabContent[] {
    //     return this._tabContent;
    // }
    public set tabContent(v: ITabContent[]) {

        let count = v.length;
        for (let i = 0; i < this._tabSelectors.length; i++) {
            
            if (i < count) {
                this._tabSelectors[i].mainButton.visible = true;
                // v[i].RenderButton(this._tabSelectors[i].mainImage);
                v[i].Hide(this._tabSelectors[i].mainImage);
            } else {
                this._tabSelectors[i].mainButton.visible = false;
            }
            this._tabSelectors[i].selectFrame.visible = false;
        }

        this._tabContent = v;
    }
}