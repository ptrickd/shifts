import e from"@babel/runtime/helpers/esm/extends";import*as t from"react";import{unstable_useForkRef as n,unstable_useId as r,unstable_useEnhancedEffect as l}from"@mui/utils";import{ListActionTypes as o,listReducer as u,useList as s}from"@mui/base/useList";import{D as i}from"../_/JZazQOKh.js";import{DropdownActionTypes as a}from"@mui/base/useDropdown";import{useCompoundParent as c}from"#useCompound";import{c as m}from"../_/1TTNQAt_.js";import{e as d}from"../_/q-ZiAH4M.js";export{M as MenuProvider}from"../_/U_tn6Scb.js";import"../_/oIkCyQjV.js";import"react/jsx-runtime";function menuReducer(t,n){if(n.type===o.itemHover)return t;const r=u(t,n);if(r.highlightedValue===null&&n.context.items.length>0)return e({},r,{highlightedValue:n.context.items[0]});if(n.type===o.keyDown&&n.event.key==="Escape")return e({},r,{open:false});if(n.type===o.blur){var l;if(!((l=n.context.listboxRef.current)!=null&&l.contains(n.event.relatedTarget))){var s,i;const t=(s=n.context.listboxRef.current)==null?void 0:s.getAttribute("id");const l=(i=n.event.relatedTarget)==null?void 0:i.getAttribute("aria-controls");return t&&l&&t===l?r:e({},r,{open:false,highlightedValue:n.context.items[0]})}}return r}"use client";const g={dispatch:()=>{},popupId:"",registerPopup:()=>{},registerTrigger:()=>{},state:{open:true},triggerElement:null};function useMenu(o={}){var u,f;const{listboxRef:p,onItemsChange:h,id:b,disabledItemsFocusable:v=true,disableListWrap:x=false}=o;const y=t.useRef(null);const R=n(y,p);const V=(u=r(b))!=null?u:"";const{state:{open:M},dispatch:D,triggerElement:I,registerPopup:E}=(f=t.useContext(i))!=null?f:g;const C=t.useRef(M);const{subitems:k,contextValue:P}=c();const j=t.useMemo((()=>Array.from(k.keys())),[k]);const T=t.useCallback((e=>{var t,n;return e==null?null:(t=(n=k.get(e))==null?void 0:n.ref.current)!=null?t:null}),[k]);const w=t.useCallback((e=>{var t;return(k==null||(t=k.get(e))==null?void 0:t.disabled)||false}),[k]);const A=t.useCallback((e=>{var t,n;return((t=k.get(e))==null?void 0:t.label)||((n=k.get(e))==null||(n=n.ref.current)==null?void 0:n.innerText)}),[k]);const _=t.useMemo((()=>({listboxRef:y})),[y]);const{dispatch:L,getRootProps:K,contextValue:B,state:{highlightedValue:F},rootRef:S}=s({disabledItemsFocusable:v,disableListWrap:x,focusManagement:"DOM",getItemDomElement:T,getInitialState:()=>({selectedValues:[],highlightedValue:null}),isItemDisabled:w,items:j,getItemAsString:A,rootRef:R,onItemsChange:h,reducerActionContext:_,selectionMode:"none",stateReducer:menuReducer});l((()=>{E(V)}),[V,E]);t.useEffect((()=>{if(M&&F===j[0]&&!C.current){var e;(e=k.get(j[0]))==null||(e=e.ref)==null||(e=e.current)==null||e.focus()}}),[M,F,k,j]);t.useEffect((()=>{var e;if((e=y.current)!=null&&e.contains(document.activeElement)&&F!==null){var t;k==null||(t=k.get(F))==null||(t=t.ref.current)==null||t.focus()}}),[F,k]);const createHandleBlur=e=>t=>{var n,r;(n=e.onBlur)==null||n.call(e,t);t.defaultMuiPrevented||(r=y.current)!=null&&r.contains(t.relatedTarget)||t.relatedTarget===I||D({type:a.blur,event:t})};const createHandleKeyDown=e=>t=>{var n;(n=e.onKeyDown)==null||n.call(e,t);t.defaultMuiPrevented||t.key==="Escape"&&D({type:a.escapeKeyDown,event:t})};const getOwnListboxHandlers=(e={})=>({onBlur:createHandleBlur(e),onKeyDown:createHandleKeyDown(e)});const getListboxProps=(t={})=>{const n=m(getOwnListboxHandlers,K);const r=d(t);return e({},t,r,n(r),{id:V,role:"menu"})};t.useDebugValue({subitems:k,highlightedValue:F});return{contextValue:e({},P,B),dispatch:L,getListboxProps:getListboxProps,highlightedValue:F,listboxRef:S,menuItems:k,open:M,triggerElement:I}}"use client";export{useMenu};
