export interface IEventUnitUsedAbilityHandler {

    Register(type: EventAbility, abilityId: number, callback: () => void);

    Unregister(type: EventAbility, abilityId: number);
}

export const enum EventAbility {
    Cast,
    Effect,
    End,
    Finished
}