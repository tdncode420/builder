import { re, qs, $in, hide} from "./utils.js";

export const Drag = class {
    dX = 0;
    dY = 0;
    justDropped = false;
    constructor(build, element){
        const self = this;
        const rect = re(element);

        this.build = build;
        this.element = element;
        this.clone = element.cloneNode(true);
        this.clone.style.pointerEvents = "none";
        this.clone.style.position = "absolute";
        this.clone.style.left = rect.left + "px";
        this.clone.style.top = rect.top + "px";
        this.clone.style.display = "none";
        document.body.appendChild(this.clone);

        let drag = (e) => {
            e.preventDefault();
            e.stopPropagation();
            self.build.state.dragging = true;
            self.build.setActiveDragObj(self);
            if (!$in(e, qs('#active_build'))) {
                self.build.setActiveParObj(null);
            };
            self.clone.style.display = "inherit";
            self.clone.style.left = e.clientX - (self.dX / 2) + "px";
            self.clone.style.top = e.clientY - (self.dY / 2) + "px";
        };


        const drop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            self.build.setActiveDragObj(null);
            self.clone.style.display = "none";
            self.clone.style.left = "110%";
            self.build.state.dragging = false;
            hide(qs("#highlight_box"));
            self.build.checkDrop(self.element);
            self.justDropped = true;
        };

        const down = (e) => {
            e.preventDefault();
            e.stopPropagation();
            self.build.setActiveEleObj(null);
            self.build.setActiveParObj(null);
            let rect = re(self.element);
            self.dX = e.x - rect.x;
            self.dY = e.clientY - rect.y;
            addEventListener('mousemove', drag);
            addEventListener('mouseup', (e) => {
                drop(e);
                removeEventListener('mousemove', drag);
            }, { once: true });
        };

        const over = (e) => {
            e.preventDefault();
            e.stopPropagation();
            self.element.style.border = "1px solid red";
            self.element.addEventListener('mouseout', (e) => {
                self.element.style.border = "none";
            }, {
                once: true
            })
        };

        element.onmousedown = down;
        element.onmouseover = over;
    }
}