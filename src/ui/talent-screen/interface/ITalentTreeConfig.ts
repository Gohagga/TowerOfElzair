export interface ITalentTreeConfig {
    box: ITalentTreeConfig.Box,
    confirm: ITalentTreeConfig.Button,
    cancel: ITalentTreeConfig.Button,
    base: ITalentTreeConfig.Base,
    talent: ITalentTreeConfig.Talent
}

export namespace ITalentTreeConfig {
    export interface Button {
        width: number,
        height: number,
        x: number,
        y: number,
        text: string
    }
    export interface Box {
        width: number,
        height: number,
    }
    export interface Base {
        rows: number,
        columns: number,
        maxTalentSlots: number,
        sideMargin: number,
        verticalMargin: number,
    }
    export interface Talent {
        buttonWidth: number,
        buttonHeight: number,
        buttonTexture: string,
        tooltip: {
            width: number,
            height: number,
            textX: number,
            textY: number,
            textWidth: number,
            textHeight: number,
            defaultText: string,
        },
        rank: {
            x: number,
            y: number,
            size: {
                width: number,
                height: number
            },
            texture: string,
        },
        highlight: {
            width: number,
            height: number,
            texture: string
        }
    }
}