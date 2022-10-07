import { qa, ce, re, rxy } from "./utils.js"

const elements = qa('.element');

elements.forEach(ele => ele.onmousedown = MouseDown);

function MouseDown(e){
    
}