export interface ITalentTreeConfig {
    box: ITalentTreeConfig.Box,
    confirm: ITalentTreeConfig.Button,
    cancel: ITalentTreeConfig.Button,
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
        sideMargin: number,
        verticalMargin: number,
    }
}