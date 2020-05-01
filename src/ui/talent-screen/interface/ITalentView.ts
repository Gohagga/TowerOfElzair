import { Frame } from "w3ts";

export interface ITalentView {
    button: {
        main: Frame;
        image: Frame;
    };
    tooltip: {
        box: Frame;
        text: Frame;
        rank: Frame;
    };
    rank: {
        image: Frame;
        text: Frame;
    }
    highlight: Frame;
}