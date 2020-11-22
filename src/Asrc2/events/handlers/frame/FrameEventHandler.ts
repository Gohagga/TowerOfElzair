import { Frame, Trigger } from "w3ts/index";
import { FrameEventType } from "./FrameEventType";

export class FrameEventHandler {

    private _increment = 0;

    private frames: Record<number, boolean> = {};
    private readonly _handles: Record<FrameEventType, Record<number, {id: number, execute: () => void}[]>> = {
        [FrameEventType.Click]: {}
    }

    private readonly clickTrigger = new Trigger();

    constructor() {
        this.clickTrigger.addAction(() => {
            this.Register(FrameEventType.Click, GetHandleId(BlzGetTriggerFrame()));
        });
    }

    SubscribeClick(frame: Frame, callback: () => void) {

        const type = FrameEventType.Click;

        const id = frame.id;
        const handles = this._handles[type][id] || [];

        const handle = {
            id: this._increment++,
            execute: callback
        };
        handles.push(handle);
        this._handles[type][id] = handles;

        // Register the trigger
        if (id in this.frames == false) {
            this.clickTrigger.triggerRegisterFrameEvent(frame, FRAMEEVENT_CONTROL_CLICK);
            this.frames[id] = true;
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
