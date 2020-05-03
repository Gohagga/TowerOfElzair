import { Frame, MapPlayer } from "w3ts/index";
import { Talent } from "components/talents/Talent";
import { TalentState } from "components/talents/TalentState";
import { TalentDepType } from "components/talents/TalentDependency";

export interface ITalentSlot {
    
    visible: boolean;
    talent: Talent | null;
    rank: number;
    index: number;
    watcher: MapPlayer

    state: TalentState;
    errorText: string | null;
    
    moveTo(point: framepointtype, relative: Frame, relativePoint: framepointtype, x: number, y: number, linkWidth: number, linkHeight: number): void;

    renderLinks(as: Record<TalentDepType, string | null>): void;
}