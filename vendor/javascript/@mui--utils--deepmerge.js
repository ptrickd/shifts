import e from"@babel/runtime/helpers/esm/extends";function isPlainObject(e){if(typeof e!=="object"||e===null)return false;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function deepClone(e){if(!isPlainObject(e))return e;const t={};Object.keys(e).forEach((n=>{t[n]=deepClone(e[n])}));return t}function deepmerge(t,n,o={clone:true}){const i=o.clone?e({},t):t;isPlainObject(t)&&isPlainObject(n)&&Object.keys(n).forEach((e=>{e!=="__proto__"&&(isPlainObject(n[e])&&e in t&&isPlainObject(t[e])?i[e]=deepmerge(t[e],n[e],o):o.clone?i[e]=isPlainObject(n[e])?deepClone(n[e]):n[e]:i[e]=n[e])}));return i}export{deepmerge as default,isPlainObject};
