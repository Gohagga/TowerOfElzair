import ILogger from "systems/logger/ILogger";
import ITabViewConfig from "ui/tab-screen/interface/ITabConfig";
import { ITalentTreeConfig } from "ui/talent-screen/interface/ITalentTreeConfig";
import { IUnitInfoPanelConfig } from "ui/unit-info-panel/interface/IUnitInfoPanelConfig";
import { IDummySpellProviderConfig } from "providers/implementations/DummySpellProvider";
import { IProgressBarViewConfig } from "ui/progress-bar/IProgressBarViewConfig";
import { IconPath } from "IconPath";

export class Config implements ILogger.Config, IDummySpellProviderConfig { // 
    loggerLevel = ILogger.Level.None;
    
    dummyOwningPlayer = 0;
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