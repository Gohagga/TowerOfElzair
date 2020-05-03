export interface ITabViewConfig {
    tab: ITabViewConfig.Tab;
    box: ITabViewConfig.Box;
}

export namespace ITabViewConfig {
    export interface Tab {
        iconSize: number,
        selectionScale: number,
        selectionOffX: number,
        xPadding: number,
        yPadding: number,
        xOffset: number,
        yOffset: number,
        defaultTexture: string,
        activeTabTexture: string,
    }
    export interface Box {
        width: number,
        height: number,
        sideMargin: number,
        verticalMargin: number,
        closeButton: {
            width: number,
            height: number,
            x: number,
            y: number,
            text: string,
        },
    }
}
export default ITabViewConfig;