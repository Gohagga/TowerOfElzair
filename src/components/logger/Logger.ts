import ILogger from "./ILogger";

export class Logger extends ILogger {

    constructor(config: ILogger.Config) {
        super(config);
    }

    info(...msg: any[]) {
        if (Number(this._level) > Number(ILogger.Level.Info)) return;
        print("Info", ...msg);
    }
    
    error(...msg: any[]) {
        if (Number(this._level) > Number(ILogger.Level.Error)) return;
        print('|cffff2222', ...msg);
    }
}