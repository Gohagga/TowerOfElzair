export interface IEventHandler<Type, EventData> {
    
    /**Subscribes to an event and returns a function used to unsubscribe. */
    Subscribe(type: Type, callback: (e: EventData) => void): UnsubscribeFunc;

    Register(type: Type, event: EventData);
}
export type UnsubscribeFunc = () => void;

export interface IEventCallback<EventData> {
    id: number;
    execute: (e: EventData) => void;
};
