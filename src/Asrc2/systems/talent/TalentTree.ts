import { Unit } from "Asrc2/models/Unit";
import { Talent, TalentData } from "./Talent";
import { TalentDependency, TalentDependencyIndex, TalentDepType } from "./TalentDependency";
import { TalentState } from "./TalentState";

export type TalentGenerator = (rank: number) => TalentData

export abstract class TalentTree {

    private _unit: Unit;
    private _title: string = "";
    private _pointsAvailable: number = 0;
    private _talents: Talent[] = [];
    private _rankState: number[] = [];
    private _tempRankState?: number[];
    private _icon : string | null = null;

    private _columns = 4;
    private _rows = 7;
    private _maxTalents : number = 27;
    
    constructor(unit: Unit) {
        this.Initialize();
        this._unit = unit;
    }

    public abstract Initialize(): void;

    // public CheckDependencies(state: number[], index: number, player: Player): [boolean, string] {

    //     const talent = this._talents[index];
    //     if (!talent || !talent.dependency) return [true, ""];

    //     const dep = talent.dependency;
    //     const toShow = [];
    //     const toDisable = [];
    //     let isOk = true;
    //     let error = "";


    // }

    public CheckDependencyKey(state: number[], dep: TalentDependency, key: TalentDepType, index: number) {
        let linkIndex: number | null = null;
        let linkOrient: number | null = null;
        let linkAction: string | null = null;
        let errorText: string | null = null;
        let ok: boolean = true;

        const enum Action { enabled = "enabled", disabled = "disabled" }

        if (dep[key]) {

            const [depIndex, linkOrient] = TalentDependencyIndex[key](index, this._columns);
            const talent = this.talents[depIndex];
            const lvl = dep[key];
            
            linkIndex = depIndex;
            linkAction = Action.enabled;

            if (lvl == -1) {
                linkAction = Action.disabled;
            }
            if (talent && state[depIndex] && state[depIndex] < lvl) {
                ok = false;
                errorText = "";
                if (lvl != -1) {
                    errorText += talent.name;

                    if (talent.maxRank && talent.maxRank > 1) errorText += " (" + lvl + ")";
                }
                linkAction = Action.disabled;
            }
        }
        const retVal = {
            linkIndex,
            linkAction,
            errorText,
            ok
        }
        return retVal;
    }

    public AddTalent(x: number, y: number, data?: TalentData) {

        let i = x + y * this._columns;
        let talent = new Talent(data);
        
        if (this._talents[i]) {
            let existing = this._talents[i];
            existing.nextRank = talent;
        } else {
            this._talents[i] = talent;
            this._rankState[i] = 0;
        }

        let startingLevel = data?.StartingLevel || 0;
        this.tempRankState[i] = startingLevel;

        return talent;
    }

    public AddMultirankTalent(x: number, y: number, maxRanks: number, generator: TalentGenerator): Talent[] {

        const talents = [];
        let t = this.AddTalent(x, y, generator(1));
        talents.push(t);

        for (let i = 2; i < maxRanks + 1; i++) {
            let data = generator(i);
            t.nextRank = new Talent(data);
            t = t.nextRank;
            talents.push(t);
        }
        const data = generator(maxRanks);
        talents.push(t.SetFinalDescription(data));
        return talents;
    }
    
    public ApplyTalentTemporary(index: number) {
        
        let talent: Talent = this._talents[index];
        let state = this.tempRankState;

        if (state[index] < talent.maxRank) {
            this.pointsAvailable -= talent.cost;
            state[index]++;

            // Fire talent allocate event
            if (talent.onAllocate && talent.onAllocate(this.unit)) {

                if (talent.nextRank) {
                    this._talents[index] = talent.nextRank;
                }
            } else {
                // Rollback
                this.pointsAvailable += talent.cost;
                state[index]--;
            }

        }
    }

    public ResetTempRankState() {

        if (!this._tempRankState) return;
        for (let i = 0; i < this.maxTalents; i++) {

            let talent = this._talents[i];
            if (talent && this._rankState[i] != this._tempRankState[i]) {

                for (let j = this._tempRankState[i]; j > this._rankState[i]; j--) {
                    talent.onDeallocate(this.unit);
                    if (talent.previousRank) {
                        talent = talent.previousRank;
                        this.pointsAvailable += talent.cost;
                    }
                }
                this._talents[i] = talent;
            }
        }
        this._tempRankState = undefined;
    }

    public SaveTalentRankState() {

        if (!this._tempRankState) return;
        for (let i = 0; i < this.maxTalents; i++) {
            const t = this._talents[i];
            
            if (t) {
                const state = this._rankState[i];
                const tempState = this._tempRankState[i];
                if (state && state != tempState) {

                    let prevRank = t.previousRank;
                    if (prevRank) {
                        prevRank.ActivateRecursively(this.unit, tempState - state);
                    } else {
                        t.ActivateRecursively(this.unit, tempState - state);
                    }
                    this._rankState[i] = tempState;
                }
            }
        }
        this._tempRankState = undefined;
    }

    public AllocateTalent(x: number, y: number, level: number) {

        let index = x + y * this._columns;
        for (let i = 0; i < level; i++) {
            this.ApplyTalentTemporary(index);
        }
    }

    protected SetTalentLevel(x: number, y: number, level: number) {

        let i = x + y * this._columns;

        if (this._tempRankState) this._tempRankState[i] = level;
        this._rankState[i] = level;
    }

    protected SetTempTalentLevel(x: number, y: number, level: number) {

        let i = x + y * this._columns;

        this.tempRankState[i] = level;
    }

    protected GetAllocatedTalentLevel(x: number, y: number) {
        
        let i = x + y * this._columns;
        if (this._tempRankState)
            return this._tempRankState[i];
        return this._rankState[i];
    }

    protected TalentLevelRequirement(x: number, y: number, level: number): [boolean, string] {

        let retVal: [boolean, string] = [false, ""];
        const state = this.tempRankState;
        let i = x + y * this._columns;

        if (state[i] >= level) {
            retVal[0] = true;
        } else {
            retVal[1] = this._talents[i].name;
            if (level > 1) retVal[1] = " " + level;
        }
        return retVal;
    }

    // Actions that Fire events
    public set unit(v : Unit) {
        this._unit = v;
    }
    public set title(v : string) {
        this._title = v;
    }
    public set pointsAvailable(v : number) {
        this._pointsAvailable = v;
    }
    public set icon(v: string | null) {
        this._icon = v;
    }
    
    public get title(): string {
        return this._title;
    }
    public get unit(): Unit {
        return this._unit;
    }
    public get pointsAvailable(): number {
        return this._pointsAvailable;
    }
    public get talents(): Talent[] {
        return this._talents;
    }
    public get icon(): string | null {
        return this._icon;
    }
    public get tempRankState(): number[] {
        if (!this._tempRankState) {
            this._tempRankState = [];
            for (let i = 0; i < this.maxTalents; i++) {
                this._tempRankState[i] = this._rankState[i];
            }
        }
        return this._tempRankState;
    }
    public get maxTalents(): number {
        return this._maxTalents;
    }
    public get columns(): number {
        return this._columns;
    }
    public get rows(): number {
        return this._rows;
    }
    protected SetColumnsRows(columns: number, rows: number) {
        this._columns = columns;
        this._rows = rows;
        this._maxTalents = columns * rows;
    }    
    
    // public talent = new Proxy(this._talents, {
    //     get: (target: Talent[], x: number, y: number) => target[x + y * this._columns],
    //     set: (target: Talent[], x: number, y: number, value: Talent) => {
    //         this.logger.info("Trying to set something");
    //         const index = x + y * this._columns;
    //         target[index] = value
    //         this.logger.info("Successfully set something");
    //         return true;
    //     } 
    // });
}