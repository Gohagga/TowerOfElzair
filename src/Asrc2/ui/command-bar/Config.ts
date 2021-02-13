import { IProgressBarViewConfig } from "Asrc2/ui/progress-bar/IProgressBarViewConfig";
import ITabViewConfig from "Asrc2/ui/tab-screen/interface/ITabConfig";
import { ITalentTreeConfig } from "Asrc2/ui/talent-screen/interface/ITalentTreeConfig";
import { IUnitInfoPanelConfig } from "Asrc2/ui/unit-info-panel/interface/IUnitInfoPanelConfig";
import { IconPath } from "Asrc2/config/IconPath";
import { MapPlayer } from "w3ts/index";
import { ICommandBarConfig } from "Asrc2/ui/command-bar/interface/ICommandBarConfig";

export class Config { // 
    
    dummyOwningPlayer = MapPlayer.fromIndex(0);
    dummyUnitId = FourCC('nDUM');
    dummyDuration = 1;

    gameUI: IUnitInfoPanelConfig = {
        
    }

    TalentScreen: ITabViewConfig = {
        tab: {
            iconSize: 0.037,
            selectionScale: 0.6,
            selectionOffX: 0.01,
            xOffset: 0.005,
            yOffset: 0.02,
            activeTabTexture: "ui\\widgets\\escmenu\\human\\slider-knob.dds",
            defaultTexture: "ReplaceableTextures/CommandButtons/BTNPeasant.blp",
            xPadding: 0,
            yPadding: 0.85,
        },
        box: {
            width: 0.3,
            height: 0.44,
            sideMargin: 0.1,
            verticalMargin: 0.1,
            closeButton: {
                width: 0.03,
                height: 0.03,
                // y: 0.02,
                y: 0.394,
                x: 0.134,
                text: "X",
            }
        }
    };

    talentTree: ITalentTreeConfig = {
        cancel: {
            width: 0.12,
            height: 0.03,
            y: 0.02,
            x: 0,
            text: "Cancel"
        },
        confirm: {
            width: 0.12,
            height: 0.03,
            y: 0.02,
            x: 0,
            text: "Confirm"
        },
        box: {
            width: 0.3,
            height: 0.44,
        },
        base: {
            columns: 5,
            rows: 7,
            maxTalentSlots: 35,
            sideMargin: 0.1,
            verticalMargin: 0.15
        },
        talent: {
            buttonWidth: 0.04,
            buttonHeight: 0.04,
            buttonTexture: "ReplaceableTextures/CommandButtons/BTNPeasant.blp",
            tooltip: {
                width: 0.28,
                height: 0.16,
                textX: 0,
                textY: 0,
                textWidth: 0.25,
                textHeight: 0.13,
                defaultText: "Default talent name \n\nDefault talent description",
            },
            rank: {
                x: -0.0006,
                y: 0.0015,
                size: {
                    width: 0.014,
                    height: 0.014
                },
                texture: "UI/Widgets/Console/Human/human-transport-slot.blp",
            },
            highlight: {
                width: 0.036,
                height: 0.036,
                texture: "UI/Widgets/Console/Human/CommandButton/human-activebutton.blp"
            },
            link: {
                activeTexture: "Textures/Water00.blp",
                inactiveTexture: "UI/Widgets/Console/Human/human-inventory-slotfiller.blp",
                width: 0.004
            }
        }
    }

    momentum: { progressBar: IProgressBarViewConfig } = {
        progressBar: {
            x: 0.5,
            y: 0.4,
            height: 0.08,
            width: 0.08,
            isBorderOnTop: false,
            textureBorder: IconPath.BTNArthas,
            textureFill: IconPath.BTNHeroDeathKnight
        }
    };

    playerUi: ICommandBarConfig = {
        commandBar: {
            tocFile: "war3mapImported\\MySimpleButton.toc",
            frameName: "TestTextureAlphaMod",
            texture: "war3mapImported\\UIbarsingle3_V3.blp",
            x: 0.4,
            y: 0.123,
        },
    
        portrait: {
            x: -11,
            y: -11,
            windowTexture: "war3mapImported\\UITextPortraitBackdrop.blp",
            boxTexture: "war3mapImported\\UITextboxBackdrop1.blp",
        },
    
        character: {
            x: 0.335,
            y: 0.35,
            texture: "war3mapImported\\UI_Char_Backdrop.blp",
            backdropB: {
                texture: "war3mapImported\\UI_Char_Backdrop_B.blp"
            },
            button: {
                x1: 0.178,
                y1: 0.045,
                x2: 0.195,
                y2: 0.062,
                texture: "ReplaceableTextures\\CommandButtons\\BTN_UI_Character.blp"
            },
            armor: {
                texture: "war3mapImported\\ARM_EV_UA.blp"
            },
            face: {
                texture: "war3mapImported\\Face1.blp"
            },
            hair: {
                texture: "war3mapImported\\hair1.blp"
            }
        },

        talents: {
            button: {
                x1: 0.178,
                y1: 0.024,
                x2: 0.195,
                y2: 0.041,
                texture: "ReplaceableTextures\\CommandButtons\\BTN_UI_Talents.blp",
            }
        },

        questlog: {
            button: {
                x1: 0.567,
                y1: 0.024,
                x2: 0.584,
                y2: 0.041,
                texture: "ReplaceableTextures\\CommandButtons\\BTN_UI_Questlog.blp"
            }
        },

        crafting: {
            button: {
                x1: 0.588,
                y1: 0.024,
                x2: 0.605,
                y2: 0.041,
                texture: "ReplaceableTextures\\CommandButtons\\BTN_UI_Crafting.blp"
            }
        },

        menu: {
            button: {
                x1: 0.609,
                y1: 0.024,
                x2: 0.626,
                y2: 0.041,
                texture: "ReplaceableTextures\\CommandButtons\\BTN_UI_Menu.blp"
            }
        }
    }
}



// tab: {
//     iconSize: 0.037,
//     selectionScale: 0.6,
//     selectionOffX: 0.01,
//     xOffset: 0.005,
//     yOffset: 0.02,
//     activeTabTexture: "ui\\widgets\\escmenu\\human\\slider-knob.dds",
//     defaultTexture: "ReplaceableTextures/CommandButtons/BTNPeasant.blp",
//     xPadding: 0,
//     yPadding: 0.85,
// },
// box: {
//     width: 0.3,
//     height: 0.44,
//     sideMargin: 0.1,
//     verticalMargin: 0.1,
//     cancel: {
//         width: 0.12,
//         height: 0.03,
//         y: 0.02,
//         text: "Cancel",
//     },
//     confirm: {
//         width: 0.12,
//         height: 0.03,
//         y: 0.02,
//         text: "Confirm",
//     },
//     showScreenButton: {
//         text: "Skills",
//         x: 0.24,
//         y: 0.143,
//         size: {
//             width: 0.075,
//             height: 0.027
//         }
//     }
// }