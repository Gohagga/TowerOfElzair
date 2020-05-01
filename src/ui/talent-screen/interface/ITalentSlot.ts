import { Frame } from "w3ts/index";

export interface ITalentSlot {
    
    visible: boolean;
    setPoint(point: framepointtype, relative: Frame, relativePoint: framepointtype, x: number, y: number): void;
}