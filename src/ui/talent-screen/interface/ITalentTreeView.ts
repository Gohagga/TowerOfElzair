import { Frame } from "w3ts";

export interface ITalentTreeView {
    confirm: ITalentTreeButtonView,
    cancel: ITalentTreeButtonView
}

export interface ITalentTreeButtonView {
    mainButton: Frame,
    text: Frame
}