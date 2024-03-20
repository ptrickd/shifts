import e from"@babel/runtime/helpers/esm/extends";import*as t from"react";import{unstable_useId as o,unstable_useForkRef as i}from"@mui/utils";import{e as s}from"../_/q-ZiAH4M.js";import{useListItem as n,ListContext as r}from"@mui/base/useList";import{useCompoundItem as u}from"#useCompound";"use client";function useOption(r){const{value:a,label:l,disabled:c,rootRef:p,id:d}=r;const{getRootProps:h,highlighted:m,selected:f}=n({item:a});const b=o(d);const g=t.useRef(null);const x=t.useMemo((()=>({disabled:c,label:l,value:a,ref:g,id:b})),[c,l,a,b]);const{index:O}=u(a,x);const C=i(p,g);return{getRootProps:(t={})=>{const o=s(t);return e({},t,h(o),{id:b,ref:C,role:"option","aria-selected":f})},highlighted:m,index:O,selected:f,rootRef:C}}"use client";
/**
 * Stabilizes the ListContext value for the Option component, so it doesn't change when sibling Options update.
 *
 * @param value The value of the Option.
 * @returns The stable ListContext value.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOptionContextStabilizer API](https://mui.com/base-ui/react-select/hooks-api/#use-option-context-stabilizer)
 */function useOptionContextStabilizer(e){const o=t.useContext(r);if(!o)throw new Error("Option: ListContext was not found.");const{getItemState:i,dispatch:s}=o;const{highlighted:n,selected:u,focusable:a}=i(e);const l=t.useCallback((t=>{if(t!==e)throw new Error(["Base UI Option: Tried to access the state of another Option.","This is unsupported when the Option uses the OptionContextStabilizer as a performance optimization."].join("/n"));return{highlighted:n,selected:u,focusable:a}}),[n,u,a,e]);const c=t.useMemo((()=>({dispatch:s,getItemState:l})),[s,l]);return{contextValue:c}}"use client";export{useOption,useOptionContextStabilizer};

