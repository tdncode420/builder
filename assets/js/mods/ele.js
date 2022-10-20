import { qs } from "./utils.js";

export const Ele = class {
    constructor(build, element){
        const self = this;

        this.build = build;
        this.element = element;

        this.activate = function () {
            // set the "Active Element" first as the other functions depend on it's value
            self.build.setActiveEleObj(self);
            self.build.enInps();
            self.build.styles.setStyles();
            self.build.attrs.setVals();
            self.build.attrs.show();
            self.build.setActiveBox();
            qs('#active_box').style.display = "block";
        };

        this.update = function(){
            self.build.setActiveBox();
        };
        
        this.element.onmouseover = function(e){
            e.stopPropagation();
            e.preventDefault();
            if (!self.build.state.dragging) return;
            self.build.setActiveParObj(self);
        };

        this.element.onclick = function (e) {
            e.stopPropagation();
            e.preventDefault();
            self.activate();
        };
    }
}