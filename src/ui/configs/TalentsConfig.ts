export interface TalentScreenModelConfig {
    TalentScreen: TalentScreenViewConfig,
}

export interface TalentScreenViewConfig {
    TalentTabButton: {
        iconSize: number,
        selectionScale: number,
        selectionOffX: number,
        xPadding: number,
        yPadding: number,
        xOffset: number,
        yOffset: number,
        defaultTexture: string,
        activeTabTexture: string,
    },
    Dialog: {
        width: number,
        height: number,
        sideMargin: number,
        verticalMargin: number,
        confirm: {
            width: number,
            height: number,
            y: number,
            text: string,
        },
        cancel: {
            width: number,
            height: number,
            y: number,
            text: string,
        },
        showScreenButton: {
            text: string,
            x: number,
            y: number,
            size: {
                width: number,
                height: number,
            }
        }
    }
}