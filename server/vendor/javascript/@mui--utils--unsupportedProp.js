function unsupportedProp(e,r,o,n,p){if(process.env.NODE_ENV==="production")return null;const t=p||r;return typeof e[r]!=="undefined"?new Error(`The prop \`${t}\` is not supported. Please remove it.`):null}export{unsupportedProp as default};

