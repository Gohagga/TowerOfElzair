export interface ICommandBarConfig {
    commandBar: {
        tocFile: string,
        frameName: string,
        texture: string,
        x: number,
        y: number
    },

    portrait: {
        x: number,
        y: number,
        windowTexture: string,
        boxTexture: string,
    },

    character: {
        x: number,
        y: number,
        texture: string,
        backdropB: {
            texture: string
        },
        button: UiButton,
        armor: {
            texture: string
        },
        face: {
            texture: string
        },
        hair: {
            texture: string
        }
    }

    talents: {
        button: UiButton
    },

    questlog: {
        button: UiButton
    },

    crafting: {
        button: UiButton
    },

    menu: {
        button: UiButton
    }
}

export interface UiButton {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    texture: string
}