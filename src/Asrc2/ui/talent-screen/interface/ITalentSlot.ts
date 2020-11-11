import { Talent } from "Asrc2/systems/talent/Talent";
import { TalentDepType } from "Asrc2/systems/talent/TalentDependency";
import { TalentState } from "Asrc2/systems/talent/TalentState";
import { Frame, MapPlayer } from "w3ts/index";

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