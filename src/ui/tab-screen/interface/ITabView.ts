import { Frame } from "w3ts";

export interface ITabView {
    box: Frame,
    title: Frame,
    closeButton: Frame,
    closeText: Frame,
    tabSelectors: ITabSelectorView[]
}

export interface ITabSelectorView {
    mainButton: Frame,
    mainImage: Frame,
    selectFrame: Frame
}