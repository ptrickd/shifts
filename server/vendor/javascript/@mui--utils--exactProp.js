import e from"@babel/runtime/helpers/esm/extends";const r="exact-prop: ​";function exactProp(o){return process.env.NODE_ENV==="production"?o:e({},o,{[r]:e=>{const r=Object.keys(e).filter((e=>!o.hasOwnProperty(e)));return r.length>0?new Error(`The following props are not supported: ${r.map((e=>`\`${e}\``)).join(", ")}. Please remove them.`):null}})}export{exactProp as default};

