import { IDamageEventProvider } from "providers/interfaces/IDamageEventProvider";
import { InstancedDummySpellProvider } from "./InstancedDummySpellProvider";
import { Unit } from "w3ts/index";
import { ITargetProjectileProvider, ProjectileData } from "providers/interfaces/ITargetProjectileProvider";
import ILogger from "components/logger/ILogger";

export class TargetProjectileProvider implements ITargetProjectileProvider {

    /** data[dummyCaster][target] */
    // private readonly data: Record<number, Record<number, () => void>> = {};
    
    private readonly data: Record<number, ProjectileData> = {};
    
    constructor(
        private readonly dummyProvider: InstancedDummySpellProvider,
        private readonly dmgProvider: IDamageEventProvider,
        private readonly logger: ILogger
    ) {
        const t = this.dmgProvider.Register(() => {
            const sourceId = this.dmgProvider.GetSourceUnit().id;
            this.logger.info("Damage event", this.dmgProvider.GetSourceUnit().name), sourceId;
            // const targetId = this.dmgProvider.GetTargetUnit().id;
            if (sourceId in this.data) { // && targetId in this.data[sourceId]) {
                
                this.data[sourceId].callback();
                delete this.data[sourceId];
            }
        });
    }

    Register(data: ProjectileData) {

        this.logger.info(1)
        const proxy = this.dummyProvider.RegenerateDummy();
        this.logger.info(2)
        proxy.setPosition(data.origin.x, data.origin.y);
        this.logger.info(3, proxy.id)
        this.data[proxy.id] = data;
        this.dummyProvider.CastAt(data.target);
    }
}