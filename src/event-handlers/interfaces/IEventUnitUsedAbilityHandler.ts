export interface IEventUnitUsedAbilityHandler {

    Register(type: EventAbility, abilityId: number, callback: () => void): void;

    Unregister(type: EventAbility, abilityId: number): void;
}

export const enum EventAbility {
    Cast,
    Effect,
    End,
    Finished
}