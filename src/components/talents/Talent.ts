import { Unit } from "w3ts/index";
import { TalentTree } from "../../ModuleLoader";

export type OnTalentStateChange = (unit: Unit) => void;
export type TalentDependency = { left?: number, up?: number, right?: number, down?: number }
export type TalentRequirements = (tree: TalentTree, unit: Unit) => [ boolean, string ];

export type TalentData = {
    Name?: string;
    Description?: string;
    Icon?: string;
    IconDisabled?: string;
    OnAllocate?: (unit: Unit) => void;
    OnActivate?: (unit: Unit) => void;
    OnDeactivate?: (unit: Unit) => void;
    Dependency?: TalentDependency;
    Requirements?: TalentRequirements;
    StartingLevel?: number;
    Cost?: number;
    IsLink?: boolean;
}

export class Talent {
    
    private _name : string;
    private _description : string;
    private _iconEnabled : string;
    private _iconDisabled : string;
    private _onAllocate : OnTalentStateChange;
    private _onActivate : OnTalentStateChange;
    private _onDeactivate : OnTalentStateChange;
    private _dependency : TalentDependency;
    private _requirements : TalentRequirements;
    private _nextRank : Talent;
    private _previousRank : Talent;
    private _maxRank : number;
    
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }
    
    public get description() : string {
        return this._description;
    }
    public set description(v : string) {
        this._description = v;
    }
    
    public get iconEnabled() : string {
        return this._iconEnabled;
    }
    public set iconEnabled(v : string) {
        this._iconEnabled = v;
    }
    
    public get iconDisabled() : string {
        return this._iconDisabled;
    }
    public set iconDisabled(v : string) {
        this._iconDisabled = v;
    }

    public set icon(v: string) {
        this.iconEnabled = v;
        [this.iconDisabled] = string.gsub(v, "CommandButtons\\", "CommandButtonsDisabled\\DIS");
        if (this._iconDisabled == v) this.iconDisabled = 'ReplaceableTextures\\CommandButtonsDisabled\\DIS' + v;
    }
    
    public get onAllocate() : OnTalentStateChange {
        return this._onAllocate;
    }
    public set onAllocate(v : OnTalentStateChange) {
        this._onAllocate = v;
    }
    
    
    public get onActivate() : OnTalentStateChange {
        return this._onActivate;
    }
    public set onActivate(v : OnTalentStateChange) {
        this._onActivate = v;
    }
    
    public get onDeactivate() : OnTalentStateChange {
        return this._onDeactivate;
    }
    public set onDeactivate(v : OnTalentStateChange) {
        this._onDeactivate = v;
    }
    
    public get dependency() : TalentDependency {
        return this._dependency;
    }
    public set dependency(v : TalentDependency) {
        if (!this._dependency) this._dependency = {};
        if (v.left) this.dependency.left = v.left;
        if (v.up) this.dependency.up = v.up;
        if (v.right) this.dependency.right = v.right;
        if (v.down) this.dependency.down = v.down;
    }
    
    public get requirements() : TalentRequirements {
        return this._requirements;
    }
    public set requirements(v : TalentRequirements) {
        this._requirements = v;
    }

    public get nextRank() : Talent {
        return this._nextRank || this;
    }
    public set nextRank(v : Talent) {
        this._nextRank = v;
        if (v.previousRank != this) v.previousRank = this;
        v.maxRank = this.maxRank + 1;
    }

    public get previousRank() : Talent {
        return this._previousRank;
    }
    public set previousRank(v : Talent) {
        this._previousRank = v;
    }
    
    public get maxRank() : number {
        return this._maxRank;
    }
    public set maxRank(v : number) {
        this._maxRank = v;
        if (this._previousRank) this._previousRank.maxRank = v;
    }
    
    public SetFinalDescription(data?: TalentData): Talent {
        const t = new Talent();
        if (data) {
            if (data.Name)          t.name = data.Name;
            if (data.Description)   t.description = data.Description;
            if (data.Icon)          t.icon = data.Icon;
            if (data.IconDisabled)  t.iconDisabled = data.IconDisabled;
        }
        this.nextRank = t;
        t.maxRank = this._maxRank;
        t.dependency = Object.assign({}, this.dependency);
        return t
    }

    public ActivateRecursively(unit: Unit, count: number) {
        if (this._previousRank && count > 1) {
            this._previousRank.ActivateRecursively(unit, count - 1);
        }
        this.onActivate(unit);
    }
}

// TalentScreenViewModel => TalentTreeViewModel.Render() => loop TalentViewModel.Render(), this.isVisible = true => Frame.isVisible = true

// Talent.name = xyz, event.Fire() => TalentViewModel, eventTalent == this.talent && this.isVisible? .Render() => frames.Name.value = xyz