import { TalentTree } from "systems/talents/TalentTree";
import { Unit } from "w3ts/index";
import ILogger from "systems/logger/ILogger";
import { IconPath } from "IconPath";

export class Pyromancy extends TalentTree {
    
    public Initialize(): void {
        this.SetColumnsRows(3, 5);

        this.AddMultirankTalent(0, 0, 3, (lvl) => {
            
            return {
                Name: "Fire Blast",
                Description: `Blasts enemy with fire for ${lvl * 5} damage.`,
                Icon: IconPath.BTNFireBolt,
                OnActivate: (unit) => {
                    unit.addAbility(FourCC('A000'));
                }
            }
        });
    }
}