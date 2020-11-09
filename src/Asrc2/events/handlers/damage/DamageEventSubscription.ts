import { DamageEvent } from "./DamageEvent";

export class DamageEventSubscription {
    
    private _priority: number;
    public callback: (e: DamageEvent, sub: DamageEventSubscription) => void;

    public alive = true;
    
    constructor(priority: number, callback: (e: DamageEvent, sub: DamageEventSubscription) => void) {
        this._priority = priority;
        this.callback = (e: DamageEvent, sub: DamageEventSubscription) => callback(e, this);
    }

    Unregister(): void {
        this.alive = false;
    }

    get priority() {
        return this._priority;
    }
    set priority(v: number) {
        this._priority = v;
    }
}