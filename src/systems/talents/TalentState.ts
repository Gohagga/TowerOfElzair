export const enum TalentState {
    /**Talent does not exist in this slot.*/
    Empty = 0,
    /**Talent in this slot cannot be taken due to missing requirements.*/
    RequireDisabled = 1,
    /**Talent in this slot requires certain level of another adjacent talent.*/
    DependDisabled = 2,
    /**Talent in this slot only acts as a link.*/
    Link = 3,
    /**Talent is available to take points in.*/
    Available = 4,
    /**Talent in this slot is disabled due to being maxed out in levels.*/
    Maxed = 5
}