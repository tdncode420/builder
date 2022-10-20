export const State = class {
    active = {
        _dragObj: null,
        _eleObj: null,
        _parObj: null,
        get dragObj(){
            return this._dragObj;
        },
        set dragObj(obj) {
            this._dragObj = obj;
        },
        get eleObj() {
            return this._eleObj;
        },
        set eleObj(obj) {
            this._eleObj = obj;
        },
        get parObj() {
            return this._parObj;
        },
        set parObj(obj) {
            this._parObj = obj;
        }
    }
}