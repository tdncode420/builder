/* UTILS */

// document object
export const doc = document;

// query select
export const qs = (x) => doc.querySelector(x);

// query select all
export const qa = (x) => [...doc.querySelectorAll(x)];

// create an element
export const ce = (x) => doc.createElement(x);

// get an element's bounding client rect
export const re = (x) => x.getBoundingClientRect();

// get the real x and y coordinates of an event 
// based off offset calculations
export const rxy = (e) => {
    return {
        x: e.target.offsetLeft - e.clientX,
        y: e.target.offsetTop - e.clientY
    }
}