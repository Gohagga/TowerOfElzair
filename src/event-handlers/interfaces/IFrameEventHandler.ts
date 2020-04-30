import { IEventHandler } from "./IEventHandler";
import { Frame } from "w3ts";

export interface IFrameEventHandler {

    Subscribe(type: FrameEventType, frame: Frame, cb: () => void): void;

    Register(type: FrameEventType, frameId: number): void;
}

export const enum FrameEventType {
    Click
}


export type FrameEventCallback = {
    id: number,
    execute: () => void;
}