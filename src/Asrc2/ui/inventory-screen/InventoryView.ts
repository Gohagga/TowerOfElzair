import { Frame } from "w3ts/handles/frame";
import { FramePoint as Fp } from "../view-models/Frame";

export function GenerateInventoryView() {

    // Create the background texture
    const box = new Frame("SuspendDialog", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 0, 0);
    const title = Frame.fromName("SuspendTitleText", 0);
    const closeButton = Frame.fromName("SuspendDropPlayersButton", 0);
    const closeText = Frame.fromName("SuspendDropPlayersButtonText", 0);
    // const cancelButton = new Frame("ScriptDialogButton", box, 0, 0);
    // const cancelText = Frame.fromName("ScriptDialogButtonText", 0);

    // let showScreenButton = new Frame("ScriptDialogButton", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 0, 0);

    box.clearPoints();
    box.setLevel(5);
    box.setAbsPoint(Fp.C, 0.35, 0.34);
    box.setSize(0.3, 0.44);
    // box.visible = false;

    // title.text = "Talent Tree";
    title.visible = false;

    closeButton.visible = false;

    const r = 0.04;
    const pad = 0.0 * r;

    // Create the item slot frames
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            
            let x = i * (r + pad);
            let y = - j * (r + pad);

            let bgTex = "war3mapImported\\UIIcons.blp";
            // const button = new Frame("UIButton", box, 0)
            //     // .clearPoints()
            //     .setPoint(Fp.TL, box, Fp.TL, x, y)
            //     // .setLevel(8)
            //     .setSize(w, h);
            // const texture = Frame.fromName("UIButton_Texture", 0)
            //     .setTexture(bgTex, 0, true);

            // const highlight = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "AvailableImage", box.handle, "", 0));
            const buttonMain = new Frame("ScoreScreenBottomButtonTemplate", box, 0, 0);
            const buttonImage = Frame.fromName("ScoreScreenButtonBackdrop", 0);
            // const toolBox = new Frame("ListBoxWar3", buttonMain, 0, 0);
            // const toolText = Frame.fromHandle(BlzCreateFrameByType("TEXT", "StandardInfoTextTemplate", toolBox.handle, "StandardInfoTextTemplate", 0));
            const rankImage = Frame.fromHandle(BlzCreateFrameByType("BACKDROP", "Counter", buttonMain.handle, "", 0));
            const rankText = Frame.fromHandle(BlzCreateFrameByType("TEXT", "FaceFrameTooltip", buttonMain.handle, "", 0));

            BlzFrameSetTextAlignment(rankText.handle, TEXT_JUSTIFY_CENTER, TEXT_JUSTIFY_MIDDLE);

            buttonMain.setPoint(Fp.TL, box, Fp.TL, x, y)
                .setSize(r, r)
                .setLevel(2);
            
            buttonImage
                .setAllPoints(buttonMain);
                // .clearPoints()
                // .setPoint(Fp.TL, buttonMain, Fp.TL, 0, 0)
                // .setPoint(Fp.BR, buttonMain, Fp.BR, 0, 0);

            // let rx = -0.0006;
            // let ry = 0.0015;
            let rx = -0.0055;
            let ry = 0.0032;
            rankImage
                .clearPoints()
                .setPoint(Fp.BR, buttonMain, Fp.BR, rx, ry)
                .setSize(0.014, 0.014)
                .setTexture(bgTex, 0, true)
                .setLevel(3);
            
            rankText
                .clearPoints()
                .setPoint(Fp.C, rankImage, Fp.C, 0, 0)
                .setSize(0.01, 0.012)
                .setLevel(4)
                .text = "0";
            
            // highlight
            //     .setPoint(Fp.C, buttonMain, Fp.C, 0, 0)
            //     .setSize(cfg.highlight.width, cfg.highlight.height)
            //     .setTexture(cfg.highlight.texture, 0, true);

            buttonImage
                .setTexture(bgTex, 0, true);
        }
    }

    // Create the buttons for sorting, filtering etc.

    // Create the view for gold, wood and resources.

    // Create the item focus frame, title, tooltip and actions
    
}