// import ILogger from "./ILogger";
// import { Config } from "Config";

// export class Logger extends ILogger {

//     constructor(config: ILogger.Config) {
//         super(config);
//     }

//     info(...msg: any[]) {
//         if (Number(this._level) > Number(ILogger.Level.Info)) return;
//         print("Info", ...msg);
//     }
    
//     error(...msg: any[]) {
//         print("ANYFUCKINGTHING")
//         if (Number(this._level) > Number(ILogger.Level.Info)) return;
//         print("Info", ...msg);
//         // if (Number(this._level) > Number(ILogger.Level.Error)) return;
//         // print(msg.join('\t'));
//         // let shown = '|cffff2222' + msg.join('\t') + '|r';
//         // print(shown);
//     }
// }