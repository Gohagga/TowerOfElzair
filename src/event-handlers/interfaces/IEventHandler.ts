export interface IEventHandler<Type, EventData, EventRegisterData, UnsubscribeObj> {
    
    /**Subscribes to an event and returns a function used to unsubscribe. */
    SubscribeTo(type: Type, callback: (e: EventData) => void): UnsubscribeObj;

    Register(type: Type, event: EventRegisterData): void;
}

export interface IEventCallback<EventData> {
    id: number;
    execute: (e: EventData) => void;
};
