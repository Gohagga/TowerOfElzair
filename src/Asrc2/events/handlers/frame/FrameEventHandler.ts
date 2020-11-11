import { Frame, Trigger } from "w3ts/index";
import { RecordEventHandler } from "../generic/RecordEventHandler";
import { FrameEventType } from "./FrameEventType";

export class FrameEventHandler {

    private readonly handles: Record<FrameEventType, RecordEventHandler<() => void>> = {
        [FrameEventType.Click]: new RecordEventHandler<() => void>(),
    }

    private readonly clickTrigger = new Trigger();

    constructor() {
        this.clickTrigger.addAction(() => {

            const id = Frame.fromEvent().id;
            if (id in this.handles[FrameEventType.Click].Subscriptions) {
                this.handles[FrameEventType.Click].Subscriptions[id]();
            }
        });
    }

    SubscribeClick(frame: Frame, callback: () => void) {

        const id = frame.id;
        this.handles[FrameEventType.Click].Subscribe(id, callback);

        this.clickTrigger.triggerRegisterFrameEvent(frame, FRAMEEVENT_CONTROL_CLICK);
    }

    Register(type: FrameEventType, frameId: number) {

        if (frameId in this.handles[type]) {
            this.handles[type].Subscriptions[frameId]();
        }
    }
}