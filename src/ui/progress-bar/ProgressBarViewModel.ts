import { Timer, Trigger } from "w3ts/index";
import { IProgressBarView } from "./IProgressBarView";

export class ProgressBarViewModel {

    private _view: IProgressBarView;
    private _value: (this: void) => number;
    private _timer: Timer;
    
    constructor(view: IProgressBarView, value: () => number) {
        this._view = view;
        this._value = value;
        this._timer = new Timer();
        this._view.fill.setMinMaxValue(0, 1);
    }

    public Start() {
        this._timer.pause();
        this._timer.start(0.1, true, () => {

            this._view.fill.value = this._value();
        });
    }
}