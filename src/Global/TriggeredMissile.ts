import { Unit } from "node_modules/w3ts/src/handles/unit";
import { MapPlayer } from "node_modules/w3ts/src/handles/player";
import { Widget } from "node_modules/w3ts/src/handles/widget";

export type TriggeredMissileCallback = (data: TriggeredMissile) => void;

export class TriggeredMissile {
    private static _missileData: Record<number, TriggeredMissile> = {};
    private static DummyId: number;

    public caster: unit;
    public level: number;
    public spellId: number;
    private doCallback: TriggeredMissileCallback = () => null;

    constructor(caster: unit, spellId: number, level: number) {
        this.caster = caster;
        this.level = level;
        this.spellId = spellId;
    }

    public CastAtTargetAndDo(target: unit, order: string, doCallback: TriggeredMissileCallback): void {

        const owner = GetOwningPlayer(this.caster);
        const dummy = CreateUnit(owner, TriggeredMissile.DummyId, GetUnitX(this.caster), GetUnitY(this.caster), 0);
        UnitApplyTimedLife(dummy, FourCC('B000'), 0.5);
        RemoveGuardPosition(dummy);
        UnitAddAbility(dummy, this.spellId);
        SetUnitAbilityLevel(dummy, this.spellId, this.level);
        TriggeredMissile._missileData[GetHandleId(dummy)] = this;
        
        this.doCallback = doCallback;
        IssueTargetOrder(dummy, order, target);
    }

    public static init(dummyId: number) {
        this.DummyId = dummyId;

        const t = CreateTrigger()
        TriggerRegisterAnyUnitEventBJ(t, EVENT_PLAYER_UNIT_DAMAGED)
        TriggerAddAction(t, () => {
            const sourceId = GetHandleId(GetEventDamageSource())
            if (sourceId in TriggeredMissile._missileData) {
                const data = TriggeredMissile._missileData[sourceId];
                data.doCallback(data)
                delete TriggeredMissile._missileData[sourceId];
            }
        });
    }
}