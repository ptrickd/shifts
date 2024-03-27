/**
 * WARNING: Don't import this directly.
 * Use `MuiError` from `@mui/internal-babel-macros/MuiError.macro` instead.
 * @param {number} code
 */
function formatMuiErrorMessage(r){let e="https://mui.com/production-error/?code="+r;for(let r=1;r<arguments.length;r+=1)e+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+r+"; visit "+e+" for the full message."}export{formatMuiErrorMessage as default};

