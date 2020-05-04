export abstract class ILogger {

    protected _level: ILogger.Level;
    
    /**
     * Creates instance of a logger that provides methods for logging.
     * @param level Highest level of logging type that will be shown.
     */
    constructor(config: ILogger.Config) {
        this._level = config.loggerLevel;
    }

    abstract info(...msg: any[]): void;
    
    abstract error(...msg: any[]): void;
}
export namespace ILogger {
    
    export interface Config {
        loggerLevel: ILogger.Level
    }

    export enum Level {
        All,
        Info,
        Warning,
        Error,
        None
    }
}

export default ILogger;