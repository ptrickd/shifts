import e from"@babel/runtime/helpers/esm/extends";import*as t from"react";import{unstable_useId as o,unstable_useForkRef as s}from"@mui/utils";import{useButton as i}from"@mui/base/useButton";import{useListItem as n,ListContext as r}from"@mui/base/useList";import{DropdownActionTypes as u}from"@mui/base/useDropdown";import{D as l}from"../_/JZazQOKh.js";import{c as a}from"../_/1TTNQAt_.js";import{useCompoundItem as m}from"#useCompound";import{e as c}from"../_/q-ZiAH4M.js";"use client";function idGenerator(e){return`menu-item-${e.size}`}const d={dispatch:()=>{},popupId:"",registerPopup:()=>{},registerTrigger:()=>{},state:{open:true},triggerElement:null};function useMenuItem(r){var f;const{disabled:h=false,id:p,rootRef:g,label:b}=r;const I=o(p);const C=t.useRef(null);const x=t.useMemo((()=>({disabled:h,id:I!=null?I:"",label:b,ref:C})),[h,I,b]);const{dispatch:M}=(f=t.useContext(l))!=null?f:d;const{getRootProps:R,highlighted:P}=n({item:I});const{index:w,totalItemCount:V}=m(I!=null?I:idGenerator,x);const{getRootProps:v,focusVisible:z,rootRef:S}=i({disabled:h,focusableWhenDisabled:true});const j=s(S,g,C);t.useDebugValue({id:I,highlighted:P,disabled:h,label:b});const createHandleClick=e=>t=>{var o;(o=e.onClick)==null||o.call(e,t);t.defaultMuiPrevented||M({type:u.close,event:t})};const getOwnHandlers=(t={})=>e({},t,{onClick:createHandleClick(t)});function getRootProps(t={}){const o=c(t);const s=a(getOwnHandlers,a(v,R));return e({},t,o,s(o),{id:I,ref:j,role:"menuitem"})}return I===void 0?{getRootProps:getRootProps,disabled:false,focusVisible:z,highlighted:false,index:-1,totalItemCount:0,rootRef:j}:{getRootProps:getRootProps,disabled:h,focusVisible:z,highlighted:P,index:w,totalItemCount:V,rootRef:j}}"use client";
/**
 * Stabilizes the ListContext value for the MenuItem component, so it doesn't change when sibling items update.
 *
 * @param id The id of the MenuItem. If undefined, it will be generated with useId.
 * @returns The stable ListContext value and the id of the MenuItem.
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuItemContextStabilizer API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu-item-context-stabilizer)
 */function useMenuItemContextStabilizer(e){const s=t.useContext(r);if(!s)throw new Error("MenuItem: ListContext was not found.");const i=o(e);const{getItemState:n,dispatch:u}=s;let l;l=i!=null?n(i):{focusable:true,highlighted:false,selected:false};const{highlighted:a,selected:m,focusable:c}=l;const d=t.useCallback((e=>{if(e!==i)throw new Error(["Base UI MenuItem: Tried to access the state of another MenuItem.",`itemValue: ${e} | id: ${i}`,"This is unsupported when the MenuItem uses the MenuItemContextStabilizer as a performance optimization."].join("/n"));return{highlighted:a,selected:m,focusable:c}}),[a,m,c,i]);const f=t.useMemo((()=>({dispatch:u,getItemState:d})),[u,d]);return{contextValue:f,id:i}}"use client";export{useMenuItem,useMenuItemContextStabilizer};

