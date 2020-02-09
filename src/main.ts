import { addScriptHook, MapPlayer, Timer, Unit } from 'w3ts';
import { FireMageTalentTree } from 'Classes/FireMageTalentTree';
import { TalentTreeView } from 'UI/TalentTree/TalentTreeView';
import { TalentTree } from 'UI/TalentTree/TalentTree';

function tsMain() {
  const unit = new Unit(MapPlayer.fromIndex(0), FourCC("hfoo"), 0, 0, 270);
  unit.name = "TypeScript";

  TalentTreeView.init();

  TimerStart(CreateTimer(), 1.5, false, () => {
    let tree = new FireMageTalentTree(gg_unit_Hpal_0001, "0");
    TalentTreeView.SetPlayerViewedTree(Player(0), tree);
  });
  new Timer().start(1.0, false, () => {
      // KillUnit(gg_unit_Hpal_0001);
      // let tree = new FireMageTalentTree(gg_unit_Hpal_0001);
      
  });

  new Timer().start(1.00, true, () => {
    // unit.color = ConvertPlayerColor(math.random(0, bj_MAX_PLAYERS));

    // 
    // TalentTreeView.SetPlayerViewedTree(Player(0), tree);
  });

  print("Welcome to TypeScript!");
}

addScriptHook("main::after", tsMain);