import e from"@babel/runtime/helpers/esm/extends";
/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param {object} defaultProps
 * @param {object} props
 * @returns {object} resolved props
 */function resolveProps(s,o){const t=e({},o);Object.keys(s).forEach((r=>{if(r.toString().match(/^(components|slots)$/))t[r]=e({},s[r],t[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const c=s[r]||{};const n=o[r];t[r]={};if(n&&Object.keys(n))if(c&&Object.keys(c)){t[r]=e({},n);Object.keys(c).forEach((e=>{t[r][e]=resolveProps(c[e],n[e])}))}else t[r]=n;else t[r]=c}else t[r]===void 0&&(t[r]=s[r])}));return t}export{resolveProps as default};

