/* INDEPENDENT UTILS */

// document object
const doc = document;

// query select
const qs = (x) => doc.querySelector(x);

// query select all
const qa = (x) => [...doc.querySelectorAll(x)];

// create an element
const ce = (x) => doc.createElement(x);

// get an element's bounding client rect
const re = (x) => x.getBoundingClientRect();

// get an element's parent element
const par = (x) => x.parentElement;

// style an Element
const $style = (x, y) => {
    for (let s in y) {
        x.style[s] = y[s];
    }
    return x;
};

// copy an Element
const copy = (element) => {
    let rect = re(element);
    let clone = element.cloneNode(true);
    clone.id = element.id;
    return $style(clone, {
        'position': 'absolute',
        'left': rect.left + 'px',
        'top': rect.top + 'px',
        'list-style': 'none',
        'border-style': 'none'
    })
};

// event within
const $in = function (ev, dom_element) {
    let rect = re(dom_element);
    return (
        ev.x > rect.x &&
        ev.x < rect.x + rect.width &&
        ev.y > rect.y &&
        ev.y < rect.y + rect.height
    );
};

// get the relative x and y coordinates
const rel = (e) => {
    return {
        x: e.target.offsetLeft - e.clientX,
        y: e.target.offsetTop - e.clientY
    }
};

// returns the absolute x and y coordinates
const abs = (e) => {
    return {
        x: e.target.clientX,
        y: e.target.clientY
    }
};

// create a UUID
const uuid = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return "a" + uuid;
};

const overlapped = (el1, el2) => {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    );
};

const convertRaw = (raw) => {
    const div = ce('div');
    div.innerHTML = raw;
    return div.children[0]
};

const setPos = (ele, [left, top]) => {
    ele.style.left = left;
    ele.style.top = top;
};

const setDims = (ele, [width, height]) => {
    ele.style.width = width;
    ele.style.height = height;
};

const show = (x) => x.style.removeProperty('display');

const show_bs = (x) => x.classList.remove('visually-hidden');

const hide = (x) => x.style.display = "none";

const hide_bs = (x) => x.classList.add('visually-hidden');

const splitStyle = (style) => {
    let val = "";
    let unit = "";
    let arr = style.split("");
    arr.forEach(a => {
        if(!isNaN(parseInt(a))){
            val += a;
        } else {
            unit += a;
        }
    });
    val = val.trim().length === 0 ? "0" : val;
    return {val: parseInt(val), unit: unit.trim()};
};

export { qs, qa, ce, re, par, copy, $in, rel, abs, uuid, overlapped, convertRaw, setPos, setDims, show, hide, show_bs, hide_bs, splitStyle };