import { Frame } from "w3ts/index";
import { Talent } from "components/talents/Talent";
import { TalentState } from "components/talents/TalentState";

export interface ITalentSlot {
    
    visible: boolean;
    talent: Talent | null;
    rank: number;
    index: number;

    state: TalentState;
    errorText: string | null;
    
    setPoint(point: framepointtype, relative: Frame, relativePoint: framepointtype, x: number, y: number): void;
}