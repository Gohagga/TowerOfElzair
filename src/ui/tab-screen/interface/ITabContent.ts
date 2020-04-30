import { Frame } from "w3ts/index";

export interface ITabContent {

    tabHeader: string;

    Show(button: Frame): void;

    Hide(button: Frame): void;

    RenderButton(image: Frame): void;
}