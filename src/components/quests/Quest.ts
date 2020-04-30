import { IQuest } from "./IQuest";

export class Quest<T> implements IQuest<T> {
    
    state: Quest.State = Quest.State.NotAvailable;
    _context: T;
    
    constructor(context: T) {
        this._context = context;
    }
    
    Accept(): boolean {
        if (this.state == Quest.State.Available) {
            this.state = Quest.State.Accepted;
            // TODO: Fire quest accepted event
            return true;
        }
        return false;
    }

    Update(update: (state: T) => void): boolean {
        if (this.state == Quest.State.Accepted) {
            update(this._context);
            // TODO: Fire quest updated event
            return true;
        }
        return false;
    }

    Finalize(): boolean {
        if (this.state == Quest.State.Accepted) {
            this.state = Quest.State.Finalized;
            // TODO: Fire quest finalized event
            return true;
        }
        return false;
    }
}

export namespace Quest {
    export const enum State {
        NotAvailable,
        Available,
        Accepted,
        Finalized
    }
}
