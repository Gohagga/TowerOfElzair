import { Unit } from "Asrc2/models/Unit";
import { ITalentTree } from "./ITalentTree";
import { TalentDependency } from "./TalentDependency";

export type OnTalentStateChange = (unit: Unit) => boolean;
export type TalentRequirements = (tree: ITalentTree, unit: Unit) => [ boolean, string ];

export type TalentData = {
    Name?: string;
    Description?: string;
    Icon?: string;
    IconDisabled?: string;
    OnAllocate?: OnTalentStateChange;
    OnDeallocate?: OnTalentStateChange;
    OnActivate?: OnTalentStateChange
    OnDeactivate?: OnTalentStateChange;
    Dependency?: TalentDependency;
    Requirements?: TalentRequirements;
    StartingLevel?: number;
    Cost?: number;
    IsLink?: boolean;
    Tag?: any;
}

export class Talent {
    
    private _name: string = "";
    private _description: string = "";
    private _iconEnabled: string = "";
    private _iconDisabled: string = "";
    private _onAllocate: OnTalentStateChange = () => true;
    private _onDeallocate: OnTalentStateChange = () => true;
    private _onActivate: OnTalentStateChange = () => true;
    private _onDeactivate: OnTalentStateChange = () => true;
    private _dependency: TalentDependency = {};
    private _requirements: TalentRequirements = () => [true, ""];
    private _nextRank?: Talent;
    private _previousRank?: Talent;
    private _maxRank: number = 1;
    private _isLink: boolean = false;
    private _cost: number = 0;
    public tag: any;

    constructor(data?: TalentData) {
        if (data) {
            if (data.Name)                      this.name = data.Name;
            if (data.Description)               this.description = data.Description;
            if (data.Icon)              this.icon = data.Icon;
            if (data.IconDisabled)      this.iconDisabled = data.IconDisabled;
            if (data.OnActivate)        this.onActivate = data.OnActivate;
            if (data.OnDeactivate)      this.onDeactivate = data.OnDeactivate;
            if (data.OnAllocate)        this.onAllocate = data.OnAllocate;
            if (data.OnDeallocate)      this.onDeallocate = data.OnDeallocate;

            if (data.Requirements)      this.requirements = data.Requirements;
            if (data.Dependency)        this.dependency = data.Dependency;
            if (data.IsLink)            this.isLink = data.IsLink;
            if (data.Cost)              this.cost = data.Cost;
            if (data.Tag)               this.tag = data.Tag;
        }
    }
    
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
    public set onAllocate(v: OnTalentStateChange) {
        this._onAllocate = v;
    }

    public get onDeallocate() : OnTalentStateChange {
        return this._onDeallocate;
    }
    public set onDeallocate(v: OnTalentStateChange) {
        this._onDeallocate = v;
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
        Object.assign(this._dependency, v);
    }
    
    public get requirements() : TalentRequirements {
        return this._requirements;
    }
    public set requirements(v : TalentRequirements) {
        this._requirements = (tree: ITalentTree, unit: Unit) => v(tree, unit);
    }

    public get nextRank() : Talent {
        return this._nextRank || this;
    }
    public set nextRank(v : Talent) {
        this._nextRank = v;
        if (v.previousRank != this) v.previousRank = this;
        v.maxRank = this.maxRank + 1;
    }

    public get previousRank() : Talent | undefined {
        return this._previousRank;
    }
    public set previousRank(v : Talent | undefined) {
        this._previousRank = v;
    }
    
    public get maxRank() : number {
        return this._maxRank;
    }
    public set maxRank(v : number) {
        this._maxRank = v;
        if (this._previousRank) this._previousRank.maxRank = v;
    }

    public get isLink() : boolean {
        return this._isLink;
    }
    public set isLink(v : boolean) {
        this._isLink = v;
    }
    
    public get cost() : number {
        return this._cost;
    }
    public set cost(v : number) {
        this._cost = v;
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

// TalentScreenViewModel => ITalentTreeViewModel.Render() => loop TalentViewModel.Render(), this.isVisible = true => Frame.isVisible = true

// Talent.name = xyz, event.Fire() => TalentViewModel, eventTalent == this.talent && this.isVisible? .Render() => frames.Name.value = xyz