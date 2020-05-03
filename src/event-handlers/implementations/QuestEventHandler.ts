import { IQuestEventHandler, QuestEvent, QuestEventType, QuestEventCallback } from "../interfaces/IQuestEventHandler";

export class QuestEventHandler implements IQuestEventHandler {
    
    private readonly handles: Record<QuestEventType, { increment: number, instances: QuestEventCallback[] }> = {
        [QuestEventType.Accepted]: { increment: 0, instances: [] },
        [QuestEventType.Updated]: { increment: 0, instances: [] },
        [QuestEventType.Completed]: { increment: 0, instances: [] },
        [QuestEventType.Changed]: { increment: 0, instances: [] },
    };

    Subscribe(type: QuestEventType, callback: (e: QuestEvent<any>) => void): () => void {
        
        const instance: QuestEventCallback = {
            id: this.handles[type].increment++,
            execute: (e: QuestEvent<any>) => callback(e)
        }
        this.handles[type].instances.push(instance);
        return () => {
            const index = this.handles[type].instances.findIndex(x => instance.id);
            let last = this.handles[type].instances.pop();
            if (last) this.handles[type].instances[index] = last;
        };
    }

    Register(type: QuestEventType, event: QuestEvent<any>) {
        const callbacks = this.handles[type].instances;

        for (let cb of callbacks) {
            cb.execute(event);
        }
    }
}

