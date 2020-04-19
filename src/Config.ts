import { ILogger } from "./components/logger/ILogger";
import { IDummySpellProvider } from "providers/interfaces/IDummySpellProvider";

export class Config implements ILogger.Config, IDummySpellProvider.Config {
    loggerLevel = ILogger.Level.None;
    
    dummyOwningPlayer = 0;
    dummyUnitId = FourCC('nDUM');
    dummyDuration = 0.5;
}