import r from"@mui/utils/formatMuiErrorMessage";function capitalize(t){if(typeof t!=="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":r(7));return t.charAt(0).toUpperCase()+t.slice(1)}export{capitalize as default};

