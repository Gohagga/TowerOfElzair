import { MapPlayer, Trigger } from "w3ts/index";

export class InputManager {

    private isCtrlDown: Record<number, boolean> = {};
    private shiftTrigger: Trigger = new Trigger();

    constructor(numberOfPlayers: number) {

        for (let i = 0; i < numberOfPlayers; i++) {

            this.shiftTrigger.registerPlayerKeyEvent(MapPlayer.fromIndex(i), OSKEY_LCONTROL, 2, true);
            this.shiftTrigger.registerPlayerKeyEvent(MapPlayer.fromIndex(i), OSKEY_LCONTROL, 0, false);
        }
        this.shiftTrigger.addAction(() => {

            let isDown = BlzGetTriggerPlayerIsKeyDown();
            let playerId = MapPlayer.fromEvent().id;
            this.isCtrlDown[playerId] = isDown;
            // print("Shift event", isDown);
        });
    }

    IsCtrlDown(player: MapPlayer) {
        return this.isCtrlDown[player.id];
    }
}