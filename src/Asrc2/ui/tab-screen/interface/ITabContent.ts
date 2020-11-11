import { Frame, MapPlayer } from "w3ts/index";

export interface ITabContent {

    watcher: MapPlayer;

    tabHeader: string;

    Show(button: Frame): void;

    Hide(button: Frame): void;

    RenderButton(image: Frame): void;
}