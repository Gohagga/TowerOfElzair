import { addScriptHook, MapPlayer, Timer, Unit } from 'w3ts';
import { InitializeSpells } from 'Spells/Spells';
import { SpellEvent } from 'Global/SpellEvent';
import { TriggeredMissile } from 'Global/TriggeredMissile';
import { SpellHelper } from 'Global/SpellHelper';
import { MagicianTalentTree } from 'Classes/MagicianTalentTree';
import { TalentTreeView } from 'UI/TalentTree/TalentTreeView';

function tsMain() {
  
  let dummyId = FourCC('nDUM');
  SpellEvent.init();
  SpellHelper.init(dummyId)
  TriggeredMissile.init(dummyId);
  
  new Timer().start(1.0, false, () => {
    InitializeSpells();
    TalentTreeView.init();

    let tree = new MagicianTalentTree(gg_unit_Hpal_0001);
    TalentTreeView.SetPlayerViewedTree(Player(0), tree);
  });

  print("Welcome to TypeScript!");
}

addScriptHook("main::after", tsMain);