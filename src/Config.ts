import ILogger from "components/logger/ILogger";
import { TalentScreenModelConfig, TalentScreenViewConfig } from "ui/configs/TalentsConfig";
import ITabViewConfig from "ui/tab-screen/interface/ITabConfig";
import { ITalentTreeView } from "ui/talent-screen/interface/ITalentTreeView";
import { ITalentTreeConfig } from "ui/talent-screen/interface/ITalentTreeConfig";

export class Config implements ILogger.Config {  //IDummySpellProvider.Config { // 
    loggerLevel = ILogger.Level.All;
    
    dummyOwningPlayer = 0;
    dummyUnitId = FourCC('nDUM');
    dummyDuration = 0.5;


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
            width: 2,
            height: 2,
            sideMargin: 1,
            verticalMargin: 1
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