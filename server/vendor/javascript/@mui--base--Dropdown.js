import"react";import o from"prop-types";import{exactProp as e}from"@mui/utils";import{D as p}from"../_/JZazQOKh.js";import{u as r}from"../_/q4DECihl.js";import{jsx as n}from"react/jsx-runtime";import"../_/WaaBe6Xc.js";import"@babel/runtime/helpers/esm/extends";import"../_/_aJ6rGLG.js";"use client";function Dropdown(o){const{children:e,open:t,defaultOpen:i,onOpenChange:s}=o;const{contextValue:m}=r({defaultOpen:i,onOpenChange:s,open:t});return n(p.Provider,{value:m,children:e})}process.env.NODE_ENV!=="production"?Dropdown.propTypes={children:o.node,defaultOpen:o.bool,onOpenChange:o.func,open:o.bool}:void 0;process.env.NODE_ENV!=="production"&&(Dropdown.propTypes=e(Dropdown.propTypes));export{Dropdown};
