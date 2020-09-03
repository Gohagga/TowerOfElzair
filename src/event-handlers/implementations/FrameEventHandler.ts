import { IFrameEventHandler, FrameEventType, FrameEventCallback } from "../interfaces/IFrameEventHandler";
import { Frame, Trigger } from "w3ts";
import ILogger from "../../systems/logger/ILogger";

export class FrameEventHandler implements IFrameEventHandler {
    
    private _increment = 0;
    private _handles: Record<FrameEventType, Record<number, FrameEventCallback[]>> = {
        [FrameEventType.Click]: {}
    }
    private _frames: Record<number, boolean> = {};
    private _clickTrigger: Trigger;

    constructor(
        private logger: ILogger
    ) {
        this._clickTrigger = new Trigger();
        this._clickTrigger.addAction(() => {
            logger.info("Click event")
            this.Register(FrameEventType.Click, GetHandleId(BlzGetTriggerFrame()));
        });
    }

    Subscribe(type: FrameEventType, frame: Frame, cb: () => void) {
        
        const id = frame.id;
        const handles = this._handles[type][id] || [];

        const handle = {
            id: this._increment++,
            execute: cb
        };
        handles.push(handle);
        this._handles[type][id] = handles;

        // Register the trigger
        if (id in this._frames == false) {
            this._clickTrigger.triggerRegisterFrameEvent(frame, FRAMEEVENT_CONTROL_CLICK);
            this._frames[id] = true;
        }
        
        return () => {
            let index = this._handles[type][id].findIndex(x => handle.id);
            if (index != -1) {
                let last = this._handles[type][id].pop();
                if (last) this._handles[type][id][index] = last;
            }
        }
    }

    Register(type: FrameEventType, frameId: number): void {
        
        if (frameId in this._handles[type] == false) return;
        const handles = this._handles[type][frameId];

        for (let handle of handles) {
            handle.execute();
        }
    }
}