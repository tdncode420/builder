/*Build Class

    The root class for all objects

*/

import { convertRaw, hide, qs, qa, re, setPos, show, setDims } from "./utils.js";
import { State } from "./state.js";
import { Ele } from "./ele.js";
import { Drag } from "./drag.js";
import { Styles } from "./styles.js";
import { Attrs } from "./attrs.js";
import { updateTree } from "./tree.js";

export const Build = class {

    attrs = new Attrs(this);
    styles = new Styles(this);
    state = new State(this);

    constructor(){

        const self = this;
        const abox = qs('#active_box');
        const hbox = qs('#highlight_box');

        let eleObjs = [];

        this.setActiveDragObj = function (obj) {
            self.state.active.dragObj = obj;
        };
        this.setActiveEleObj = function (obj) {
            self.state.active.eleObj = obj;
        };
        this.setActiveParObj = function (obj) {
            self.state.active.parObj = obj;
            self.setHighlightBox();
        };

        this.getActiveDragObj = function () {
            return self.state.active.dragObj;
        };
        this.getActiveEleObj = function () {
            return self.state.active.eleObj;
        };
        this.getActiveParObj = function () {
            return self.state.active.parObj;
        };


        this.setActiveBox = function () {
            let obj = self.getActiveEleObj();
            let fn = obj === null ? 
            () => {
                setPos(abox, ['110%', "110%"]);
                hide(abox);
            } :
            () => {
                let rect = re(obj.element);
                setPos(abox, [rect.left + 'px', rect.top + "px"]);
                setDims(abox, [rect.width + "px", rect.height + "px"]);
                show(abox);
            };
            fn();
        };

        this.setHighlightBox = function () {
            let obj = self.getActiveParObj();
            obj === null ? 
            (()=>{
                setPos(hbox, ['110%', "110%"]);
                hide(hbox);
            })() :
            (()=>{
                let rect = re(obj.element);
                setPos(hbox, [rect.left + 'px', rect.top + "px"]);
                setDims(hbox, [rect.width + "px", rect.height + "px"]);
                show(hbox);
            })();
        };


        this.addEleObj = function (element) {
            let ele = convertRaw(element.getAttribute('data-html'))
            let eleObj = new Ele(self, ele);
            self.getActiveParObj().element.appendChild(eleObj.element);
            self.setActiveParObj(null);
            updateTree();
            eleObjs.push(eleObj);
            eleObj.activate();
            eleObj.element.click();
        };

        this.checkDrop = function (element) {
            if (self.getActiveParObj() !== null) {
                self.addEleObj(element);
            }
        };

        this.disInps = () => {
            [...qs('.style-tabs').querySelectorAll('input'), ...qs('.style-tabs').querySelectorAll('select'), ...qs('#attr-wrapper').querySelectorAll('input')].forEach(i => {
                i.value = "";
                i.setAttribute('disabled', true);
            });
        };

        this.enInps = () => {
            [...qs('.style-tabs').querySelectorAll('input'), ...qs('.style-tabs').querySelectorAll('select'), ...qs('#attr-wrapper').querySelectorAll('input')].forEach(i => {
                if (i.hasAttribute('disabled')) i.removeAttribute('disabled');
            });
        };
        
        this.deactivateAll = function(){
            console.log(this);
            self.setActiveEleObj(null);
            self.disInps();
            hide(abox);
        };



        qa('.element').forEach(e => new Drag(self, e));
        eleObjs.push(new Ele(this, qs('#active_build'), true));
        
    }
}