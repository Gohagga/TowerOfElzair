// import { FramePoint } from "../view-models/Frame";
// import { Frame } from "w3ts";
// import { IUnitInfoPanelConfig } from "./interface/IUnitInfoPanelConfig";
// import { IUnitInfoPanelView } from "./interface/IUnitInfoPanelView";

// export function UnitInfoPanelView(parent: Frame, cfg: IUnitInfoPanelConfig): IUnitInfoPanelView {

    
    
//     const retVal: IUnitInfoPanelView = {

        
//     }
//     return retVal;
// }



// // static hide() {
// //     this.hideBlackBars();
// //     this.hideConsole();
// //     this.hidePortrait();
// //     this.hideInventory();
// //   }
  
// //   static hideBlackBars() {
// //     BlzFrameSetAllPoints(BlzGetOriginFrame(ORIGIN_FRAME_WORLD_FRAME, 0), this.gameUI);
// //   }
  
// //   static hideInventory() {
// //     for (let i = 0; i < 6; i++) {
// //       let frame = BlzGetOriginFrame(ORIGIN_FRAME_ITEM_BUTTON, i);
// //       BlzFrameClearAllPoints(frame);
// //       BlzFrameSetPoint(frame, FRAMEPOINT_BOTTOM, this.gameUI, FRAMEPOINT_BOTTOM, -1, -1);
// //       BlzFrameSetVisible(frame, false);
// //     }
// //   }
  
// //   static hidePortrait() {
// //     let frame = BlzGetOriginFrame(ORIGIN_FRAME_PORTRAIT, 0);
// //     BlzFrameClearAllPoints(frame);
// //     BlzFrameSetPoint(frame, FRAMEPOINT_BOTTOM, this.gameUI, FRAMEPOINT_BOTTOM, -1, -1);
// //     BlzFrameSetSize(frame, BlzFrameGetWidth(frame) * 0.8, BlzFrameGetHeight(frame) * 0.8);
// //   }
  
// //   static hideConsole() {
// //     let frame = BlzGetFrameByName("ConsoleUI", 0);
// //     BlzFrameClearAllPoints(frame);
// //     BlzFrameSetAllPoints(frame, this.gameUI);
// //     BlzFrameSetPoint(frame, FRAMEPOINT_BOTTOM, this.gameUI, FRAMEPOINT_BOTTOM, -1, -1);
// //   }
// //   Command buttons are 
// //   BlzGetFrameByName(`CommandButton_${index}`, 0)