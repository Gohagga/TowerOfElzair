import { Frame } from "w3ts/index";
import { FrameEventType } from "./FrameEventType";

export interface IFrameEventHandler {

    SubscribeClick(frame: Frame, callback: () => void): void;
    
    Register(type: FrameEventType, frameId: number): void;
}