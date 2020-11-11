import { TalentDepType } from "Asrc2/systems/talent/TalentDependency";
import { Frame } from "w3ts";

const{ left, up, right, down } = TalentDepType;

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
    links: {
        [left]: Frame;
        [up]: Frame;
        [right]: Frame;
        [down]: Frame;
    }
}