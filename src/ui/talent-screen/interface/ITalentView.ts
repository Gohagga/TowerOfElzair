import { Frame } from "w3ts";
import { TalentDepType } from "components/talents/TalentDependency";

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