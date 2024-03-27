import s from"./hasClass.js";function addClass(a,l){a.classList?a.classList.add(l):s(a,l)||("string"===typeof a.className?a.className=a.className+" "+l:a.setAttribute("class",(a.className&&a.className.baseVal||"")+" "+l))}export default addClass;

