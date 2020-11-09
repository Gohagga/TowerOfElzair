export class RecordEventHandler<EventCallback> {

    public readonly Subscriptions: Record<number, EventCallback> = {};

    public Subscribe(id: number, callback: EventCallback): void {
        
    }
}

export type GenericEventCallback = () => void;