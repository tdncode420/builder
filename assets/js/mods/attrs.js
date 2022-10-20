import { ce, hide_bs, qa, qs, show_bs } from "./utils.js";

export const Attrs = class {
    constructor(build){

        /* A frozen "instance" reference */
        const self = this;

        /* DOM Selectors */

        const idIn = qs('#id_in');
        const clsIn = qs('#cls_in');
        const attrsIn = qa('.attr_in');
        const rowTog = qs('#attr_row_toggle');
        const wrapper = qs('#attr-wrapper');
        const innerWrapper = qs('#build-wrapper-inner');
        const attrList = qs('#attr_list');
        const addAttrRow = qs('#add_attr_row');


        /* Class Props */
        this.build = build;
        this.open = false;

        /* Class Methods */

        this.show = () => {
            innerWrapper.classList.remove('full-height');
            show_bs(wrapper)
        };

        this.hide = () => {
            innerWrapper.classList.add('full-height');
            hide_bs(wrapper)
        };

        this.addItem = (key="", val="") => {
            function makeItem(){
                let li = ce('li');
                li.classList.add('attr-item');
                let div1 = ce('div');
                let div2 = ce('div');
                div1.classList.add('attr-key');
                div2.classList.add('attr-val');
                let inp1 = ce('input');
                let inp2 = ce('input');
                inp1.type = inp2.type = "text";
                inp1.setAttribute('data-attr', 'key');
                inp1.setAttribute('placeholder', 'attribute key...');
                inp1.value = key;
                inp2.setAttribute('data-attr', 'val');
                inp2.setAttribute('placeholder', 'attribute value...');
                inp2.value = val;
                let span = ce('span');
                span.classList('clear-attr')
                span.textContent = "X";

                div1.appendChild(inp1);
                div2.appendChild(inp2);
                li.appendChild(div1);
                li.appendChild(div2);
                return li;
            }
            let item = makeItem();
            attrList.appendChild(item);
            attrList.appendChild(qs('.attr-add'));
        };

        this.setVals = () => {
            let actObj = self.build.getActiveEleObj();
            let actEle = actObj.element;
            idIn.value = actEle.id;
            clsIn.value = actEle.classList.toString().replaceAll(" " ,",");
            let attrs = [...actEle.attributes].filter(a => {
                if(typeof a === "string"){
                    !["class", "id", "style"].includes(a.split('=')[0].trim());
                }
            })
            if(attrs.length > 0){
                attrs.forEach(a => {
                    let arr = a.replaceAll('"', "").split('=').map(e => e.trim());
                    let key = arr[0];
                    let val = arr.length > 1 ? arr[1] : "";
                    self.addItem(key, val);
                });
            }
        };


        /* Setup Event Listeners */

        rowTog.onclick = () => {
            if(self.open){
                self.hide();
                self.open = false;
            } else {
                self.show();
                self.open = true;
            }
        };

        addAttrRow.onclick = () => {
            qa('.attr_in').forEach(inp => {
                inp.blur();
            })
            if ([...qs('#attr_list').children].at(-2).querySelector('input').value.trim().length === 0) return;
            self.addItem();
        };

        idIn.oninput = (e) => {
            let actObj = self.build.getActiveEleObj();
            let actEle = actObj.element;
            actEle.id = idIn.value;
        };

        clsIn.oninput = (e) => {
            let actObj = self.build.getActiveEleObj();
            let actEle = actObj.element;
            let clist = clsIn.split(',').map(e => e.trim());
            clist.forEach(c => {
                actEle.classList.add(c);
            });
        };

        attrsIn.forEach(a => a.onclick = () => {
            let actObj = self.build.getActiveEleObj();
            let actEle = actObj.element;
            let typ = a.getAttribute('data-attr');
            if(typ === "value"){
                let kVal = a.parentElement.previousElementSibling.children[0].value;
                if (kVal.trim().length === 0) return
                actEle.setAttribute(kVal, a.value)
            } else {
                let vVal = a.parentElement.nextElementSibling.children[0].value;
                actEle.setAttribute(a.value, vVal);
            }
        })
    }
}