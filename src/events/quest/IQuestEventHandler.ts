// import { IEventHandler, IEventCallback } from "../../event-handlers/interfaces/IEventHandler";
// import { Quest } from "../../systems/quests/Quest";

// export interface IQuestEventHandler extends IEventHandler<QuestEventType, QuestEvent<any>, QuestEvent<any>, () => void> {}

// export type QuestEvent<T> = {
//     type: QuestEventType,
//     quest: Quest<T>,
// }

// export const enum QuestEventType {
//     Accepted,
//     Updated,
//     Completed,
//     Changed
// }

// export class QuestEventCallback implements IEventCallback<QuestEvent<any>> {
//     id: number = -1;
//     execute: (e: QuestEvent<any>) => void = () => null;
// }