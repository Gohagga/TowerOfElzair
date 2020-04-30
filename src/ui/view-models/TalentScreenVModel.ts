import { TalentScreenModelConfig } from "ui/configs/TalentsConfig";
import { TalentScreenViewFrames } from "ui/views/TalentScreenView";
import { TalentTree } from "../../components/talents/TalentTree";
import { MapPlayer } from "w3ts/handles/player";

export class TalentScreenVModel {

    _player: MapPlayer;
    _playerId: number;
    _visible: boolean = false;
    _frames: TalentScreenViewFrames;

    _talentTrees: TalentTree[] = [];
    // _displayedTree: TalentTree;

    constructor(player: MapPlayer, frames: TalentScreenViewFrames, { TalentScreen }: TalentScreenModelConfig) {
        this._frames = frames;
        this._player = player;
        this._playerId = player.id;
    }

    public AddTree(tree: TalentTree) {

        this._talentTrees.push(tree);
        // if (this._talentTrees.length == 1) this._displayedTree = tree;
    }

    // Logic for switching tabs
}