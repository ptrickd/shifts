function deprecatedPropType(e,n){return process.env.NODE_ENV==="production"?()=>null:(e,r,o,t,p)=>{const d=o||"<<anonymous>>";const u=p||r;return typeof e[r]!=="undefined"?new Error(`The ${t} \`${u}\` of \`${d}\` is deprecated. ${n}`):null}}export{deprecatedPropType as default};

