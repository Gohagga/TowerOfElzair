import ILogger from "components/logger/ILogger";
import { TalentScreenModelConfig, TalentScreenViewConfig } from "ui/configs/TalentsConfig";

export class Config implements ILogger.Config, TalentScreenModelConfig {  //IDummySpellProvider.Config { // 
    loggerLevel = ILogger.Level.None;
    
    dummyOwningPlayer = 0;
    dummyUnitId = FourCC('nDUM');
    dummyDuration = 0.5;

    
    TalentScreen: TalentScreenViewConfig = {
        TalentTabButton: {
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
        Dialog: {
            width: 0.3,
            height: 0.44,
            sideMargin: 0.1,
            verticalMargin: 0.1,
            cancel: {
                width: 0.12,
                height: 0.03,
                y: 0.02,
                text: "Cancel",
            },
            confirm: {
                width: 0.12,
                height: 0.03,
                y: 0.02,
                text: "Confirm",
            },
            showScreenButton: {
                text: "Skills",
                x: 0.24,
                y: 0.143,
                size: {
                    width: 0.075,
                    height: 0.027
                }
            }
        }
    };
}