import { qa, qs, splitStyle } from "./utils.js";

export const Styles = class {
    constructor(build){
        const self = this;
        this.build = build;

        const w = qs('[data-key="width"]');
        const mnw = qs('[data-key="min-width"]');
        const mxw = qs('[data-key="max-width"]');
        const wu = qs('[data-unitfor="width"]');
        const h = qs('[data-key="height"]');
        const mnh = qs('[data-key="min-height"]');
        const mxh = qs('[data-key="max-height"]');
        const hu = qs('[data-unitfor="height"]');
        const p = qs('[data-key="padding"]');
        const pl = qs('[data-key="padding-left"]');
        const pr = qs('[data-key="padding-right"]');
        const pt = qs('[data-key="padding-top"]');
        const pb = qs('[data-key="padding-bottom"]');
        const pu = qs('[data-unitfor="padding"]');
        const m = qs('[data-key="margin"]');
        const ml = qs('[data-key="margin-left"]');
        const mr = qs('[data-key="margin-right"]');
        const mt = qs('[data-key="margin-top"]');
        const mb = qs('[data-key="margin-bottom"]');
        const mu = qs('[data-unitfor="margin"]');
        const fs = qs('[data-key="font-size"]');
        const fsu = qs('[data-unitfor="font-size"]');
        const ff = qs('[data-key="font-family"]');
        const td = qs('[data-key="text-decoration"]');
        const c = qa('[data-key="color"]');

        [w,mnw,mxw,h,mnh,mxh,p,pl,pr,pt,pb,m,ml,mr,mt,mb,fs,ff,td].forEach(s => {
            let key = s.getAttribute(`data-key`);
            let unit = document.querySelector(`[data-unitfor="${key}"]`);
            s.oninput = (e) => {
                let actEle = self.build.getActiveEleObj();
                if(actEle === null) return;
                let val = s.value;
                if(unit !== null){
                    val += unit.value;
                }
                actEle.element.style[key] = val;
                actEle.update();
            };
        })

        const ca = qa('[data-key="casing"]');
        const bs = qs('[data-key="border-size"]');
        const br = qs('[data-key="border-radius"]');
        const bc = qa('[data-key="border-color"]');

        this.setStyles = () => {
            let actObj = self.build.getActiveEleObj();
            let ele = actObj.element;
            const rect = ele.getBoundingClientRect();

            function width() {
                const eleW = ele.style.width.trim();
                const eleMnw = ele.style.minWidth.trim();
                const eleMxw = ele.style.maxWidth.trim();
                if (eleW.length === 0) {
                    w.value = parseInt(rect.width.toFixed());
                } else {
                    let ss = splitStyle(eleW);
                    w.value = ss.val;
                    wu.value = ss.unit;
                };
                if (eleMnw.length === 0) {
                    mnw.value = "";
                } else {
                    let ss = splitStyle(eleMnw);
                    mnw.value = ss.val;
                };
                if (eleMxw.length === 0) {
                    mxw.value = "";
                } else {
                    let ss = splitStyle(eleMxw);
                    mxw.value = ss.val;
                };
            };

            function height() {
                const eleH = ele.style.height.trim();
                const eleMnh = ele.style.minHeight.trim();
                const eleMxh = ele.style.maxHeight.trim();
                if (eleH.length === 0) {
                    h.value = parseInt(rect.height.toFixed());
                } else {
                    let ss = splitStyle(eleH);
                    h.value = ss.val;
                    hu.value = ss.unit;
                };
                if (eleMnh.length === 0) {
                    mnh.value = "";
                } else {
                    let ss = splitStyle(eleMnh);
                    mnh.value = ss.val;
                };
                if (eleMxh.length === 0) {
                    mxh.value = "";
                } else {
                    let ss = splitStyle(eleMxh);
                    mxh.value = ss.val;
                };
            };

            function padding() {
            };

            function margin() {
            };

            function font() {
                let eleFs = ele.style.fontSize.trim();
                if(eleFs.length === 0){
                    fs.value = "16";
                    fsu.value = "px";
                } else {
                    let ss = splitStyle(eleMxh);
                    fs.value = ss.val;
                    fsu.value = ss.unit;
                }
            };

            function border() {
            };

            width();
            height();
            padding();
            margin();
            font();
            border();
        }
    }
    
};
