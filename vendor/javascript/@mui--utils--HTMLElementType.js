function HTMLElementType(e,n,l,t,o){if(process.env.NODE_ENV==="production")return null;const r=e[n];const u=o||n;return r==null?null:r&&r.nodeType!==1?new Error(`Invalid ${t} \`${u}\` supplied to \`${l}\`. Expected an HTMLElement.`):null}export{HTMLElementType as default};

