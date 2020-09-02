// import { SpellHelper } from "Global/SpellHelper";
import { MagicMissiles } from "./MagicMissiles";
import { Abilities } from "customConfig";
import { IceBolt } from "./IceBolt";
import { MagicBurst } from "./MagicBurst";

export function InitializeSpells() {

    // init(MagicMissiles, "second", "third");
    MagicMissiles.init();
    IceBolt.init();
    MagicBurst.init();

    // Paladin
}

export function PreloadSpells() {
    // SpellHelper.ExecuteSpellPreload();
}