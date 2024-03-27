import e from"@babel/runtime/helpers/esm/extends";import*as t from"react";import{unstable_useForkRef as n}from"@mui/utils";import{u as i}from"../_/WaaBe6Xc.js";import{a as l}from"../_/iQvgn3kC.js";import{e as s}from"../_/q-ZiAH4M.js";import{L as r}from"../_/oIkCyQjV.js";const o={blur:"list:blur",focus:"list:focus",itemClick:"list:itemClick",itemHover:"list:itemHover",itemsChange:"list:itemsChange",keyDown:"list:keyDown",resetHighlight:"list:resetHighlight",textNavigation:"list:textNavigation",clearSelection:"list:clearSelection"};
/**
 * Looks up the next valid item to highlight within the list.
 *
 * @param currentIndex The index of the start of the search.
 * @param lookupDirection Whether to look for the next or previous item.
 * @param items The array of items to search.
 * @param includeDisabledItems Whether to include disabled items in the search.
 * @param isItemDisabled A function that determines whether an item is disabled.
 * @param wrapAround Whether to wrap around the list when searching.
 * @returns The index of the next valid item to highlight or -1 if no valid item is found.
 */function findValidItemToHighlight(e,t,n,i,l,s){if(n.length===0||!i&&n.every(((e,t)=>l(e,t))))return-1;let r=e;for(;;){if(!s&&t==="next"&&r===n.length||!s&&t==="previous"&&r===-1)return-1;const e=!i&&l(n[r],r);if(!e)return r;r+=t==="next"?1:-1;s&&(r=(r+n.length)%n.length)}}
/**
 * Gets the next item to highlight based on the current highlighted item and the search direction.
 *
 * @param previouslyHighlightedValue The item from which to start the search for the next candidate.
 * @param offset The offset from the previously highlighted item to search for the next candidate or a special named value ('reset', 'start', 'end').
 * @param context The list action context.
 *
 * @returns The next item to highlight or null if no item is valid.
 */function moveHighlight(e,t,n){var i;const{items:l,isItemDisabled:s,disableListWrap:r,disabledItemsFocusable:o,itemComparer:a,focusManagement:u}=n;const c=u==="DOM"?0:-1;const h=l.length-1;const g=e==null?-1:l.findIndex((t=>a(t,e)));let d;let m;let f=!r;switch(t){case"reset":if(c===-1)return null;d=0;m="next";f=false;break;case"start":d=0;m="next";f=false;break;case"end":d=h;m="previous";f=false;break;default:{const e=g+t;if(e<0)if(!f&&g!==-1||Math.abs(t)>1){d=0;m="next"}else{d=h;m="previous"}else if(e>h)if(!f||Math.abs(t)>1){d=h;m="previous"}else{d=0;m="next"}else{d=e;m=t>=0?"next":"previous"}}}const v=findValidItemToHighlight(d,m,l,o,s,f);return v!==-1||e===null||s(e,g)?(i=l[v])!=null?i:null:e}
/**
 * Toggles the selection of an item.
 *
 * @param item Item to toggle.
 * @param selectedValues Already selected items.
 * @param selectionMode The number of items that can be simultanously selected.
 * @param itemComparer A custom item comparer function.
 *
 * @returns The new array of selected items.
 */function toggleSelection(e,t,n,i){return n==="none"?[]:n==="single"?i(t[0],e)?t:[e]:t.some((t=>i(t,e)))?t.filter((t=>!i(t,e))):[...t,e]}
/**
 * Handles item selection in a list.
 *
 * @param item - The item to be selected.
 * @param state - The current state of the list.
 * @param context - The context of the list action.
 * @returns The new state of the list after the item has been selected, or the original state if the item is disabled.
 */function handleItemSelection(t,n,i){const{itemComparer:l,isItemDisabled:s,selectionMode:r,items:o}=i;const{selectedValues:a}=n;const u=o.findIndex((e=>l(t,e)));if(s(t,u))return n;const c=toggleSelection(t,a,r,l);return e({},n,{selectedValues:c,highlightedValue:t})}function handleKeyDown(t,n,i){const l=n.highlightedValue;const{orientation:s,pageSize:r}=i;switch(t){case"Home":return e({},n,{highlightedValue:moveHighlight(l,"start",i)});case"End":return e({},n,{highlightedValue:moveHighlight(l,"end",i)});case"PageUp":return e({},n,{highlightedValue:moveHighlight(l,-r,i)});case"PageDown":return e({},n,{highlightedValue:moveHighlight(l,r,i)});case"ArrowUp":if(s!=="vertical")break;return e({},n,{highlightedValue:moveHighlight(l,-1,i)});case"ArrowDown":if(s!=="vertical")break;return e({},n,{highlightedValue:moveHighlight(l,1,i)});case"ArrowLeft":{if(s==="vertical")break;const t=s==="horizontal-ltr"?-1:1;return e({},n,{highlightedValue:moveHighlight(l,t,i)})}case"ArrowRight":{if(s==="vertical")break;const t=s==="horizontal-ltr"?1:-1;return e({},n,{highlightedValue:moveHighlight(l,t,i)})}case"Enter":case" ":return n.highlightedValue===null?n:handleItemSelection(n.highlightedValue,n,i);default:break}return n}function handleBlur(t,n){return n.focusManagement==="DOM"?t:e({},t,{highlightedValue:null})}function textCriteriaMatches(e,t,n){var i;const l=(i=n(e))==null?void 0:i.trim().toLowerCase();return!(!l||l.length===0)&&l.indexOf(t)===0}function handleTextNavigation(t,n,i){const{items:l,isItemDisabled:s,disabledItemsFocusable:r,getItemAsString:o}=i;const a=n.length>1;let u=a?t.highlightedValue:moveHighlight(t.highlightedValue,1,i);for(let c=0;c<l.length;c+=1){if(!u||!a&&t.highlightedValue===u)return t;if(textCriteriaMatches(u,n,o)&&(!s(u,l.indexOf(u))||r))return e({},t,{highlightedValue:u});u=moveHighlight(u,1,i)}return t}function handleItemsChange(t,n,i,l){var s;const{itemComparer:r,focusManagement:o}=l;let a=null;if(i.highlightedValue!=null){var u;a=(u=t.find((e=>r(e,i.highlightedValue))))!=null?u:null}else o==="DOM"&&n.length===0&&(a=moveHighlight(null,"reset",l));const c=(s=i.selectedValues)!=null?s:[];const h=c.filter((e=>t.some((t=>r(t,e)))));return e({},i,{highlightedValue:a,selectedValues:h})}function handleResetHighlight(t,n){return e({},t,{highlightedValue:moveHighlight(null,"reset",n)})}function handleClearSelection(t,n){return e({},t,{selectedValues:[],highlightedValue:moveHighlight(null,"reset",n)})}function listReducer(e,t){const{type:n,context:i}=t;switch(n){case o.keyDown:return handleKeyDown(t.key,e,i);case o.itemClick:return handleItemSelection(t.item,e,i);case o.blur:return handleBlur(e,i);case o.textNavigation:return handleTextNavigation(e,t.searchString,i);case o.itemsChange:return handleItemsChange(t.items,t.previousItems,e,i);case o.resetHighlight:return handleResetHighlight(e,i);case o.clearSelection:return handleClearSelection(e,i);default:return e}}"use client";const a=500;
/**
 * @ignore - internal hook.
 *
 * Provides a handler for text navigation.
 * It's used to navigate a list by typing the first letters of the options.
 *
 * @param callback A function to be called when the navigation should be performed.
 * @returns A function to be used in a keydown event handler.
 */function useTextNavigation(e){const n=t.useRef({searchString:"",lastTime:null});return t.useCallback((t=>{if(t.key.length===1&&t.key!==" "){const i=n.current;const l=t.key.toLowerCase();const s=performance.now();i.searchString.length>0&&i.lastTime&&s-i.lastTime>a?i.searchString=l:i.searchString.length===1&&l===i.searchString||(i.searchString+=l);i.lastTime=s;e(i.searchString,t)}}),[e])}"use client";const u={};const NOOP=()=>{};const defaultItemComparer=(e,t)=>e===t;const defaultIsItemDisabled=()=>false;const defaultItemStringifier=e=>typeof e==="string"?e:String(e);const defaultGetInitialState=()=>({highlightedValue:null,selectedValues:[]})
/**
 * The useList is a lower-level utility that is used to build list-like components.
 * It's used to manage the state of the list and its items.
 *
 * Supports highlighting a single item and selecting an arbitrary number of items.
 *
 * The state of the list is managed by a controllable reducer - that is a reducer that can have its state
 * controlled from outside.
 *
 * By default, the state consists of `selectedValues` and `highlightedValue` but can be extended by the caller of the hook.
 * Also the actions that can be dispatched and the reducer function can be defined externally.
 *
 * @template ItemValue The type of the item values.
 * @template State The type of the list state. This should be a subtype of `ListState<ItemValue>`.
 * @template CustomAction The type of the actions that can be dispatched (besides the standard ListAction).
 * @template CustomActionContext The shape of additional properties that will be added to actions when dispatched.
 *
 * @ignore - internal hook.
 */;function useList(r){const{controlledProps:a=u,disabledItemsFocusable:c=false,disableListWrap:h=false,focusManagement:g="activeDescendant",getInitialState:d=defaultGetInitialState,getItemDomElement:m,getItemId:f,isItemDisabled:v=defaultIsItemDisabled,rootRef:p,onStateChange:b=NOOP,items:I,itemComparer:V=defaultItemComparer,getItemAsString:w=defaultItemStringifier,onChange:C,onHighlightChange:D,onItemsChange:k,orientation:S="vertical",pageSize:x=5,reducerActionContext:H=u,selectionMode:M="single",stateReducer:y}=r;if(process.env.NODE_ENV!=="production"){if(g==="DOM"&&m==null)throw new Error("useList: The `getItemDomElement` prop is required when using the `DOM` focus management.");if(g==="activeDescendant"&&f==null)throw new Error("useList: The `getItemId` prop is required when using the `activeDescendant` focus management.")}const E=t.useRef(null);const L=n(p,E);const R=t.useCallback(((e,t,n)=>{D==null||D(e,t,n);if(g==="DOM"&&t!=null&&(n===o.itemClick||n===o.keyDown||n===o.textNavigation)){var i;m==null||(i=m(t))==null||i.focus()}}),[m,D,g]);const T=t.useMemo((()=>({highlightedValue:V,selectedValues:(e,t)=>l(e,t,V)})),[V]);const O=t.useCallback(((e,t,n,i,l)=>{b==null||b(e,t,n,i,l);switch(t){case"highlightedValue":R(e,n,i);break;case"selectedValues":C==null||C(e,n,i);break;default:break}}),[R,C,b]);const N=t.useMemo((()=>({disabledItemsFocusable:c,disableListWrap:h,focusManagement:g,isItemDisabled:v,itemComparer:V,items:I,getItemAsString:w,onHighlightChange:R,orientation:S,pageSize:x,selectionMode:M,stateComparers:T})),[c,h,g,v,V,I,w,R,S,x,M,T]);const P=d();const A=y!=null?y:listReducer;const _=t.useMemo((()=>e({},H,N)),[H,N]);const[j,U]=i({reducer:A,actionContext:_,initialState:P,controlledProps:a,stateComparers:T,onStateChange:O});const{highlightedValue:z,selectedValues:B}=j;const F=useTextNavigation(((e,t)=>U({type:o.textNavigation,event:t,searchString:e})));const K=t.useRef([]);t.useEffect((()=>{if(!l(K.current,I,V)){U({type:o.itemsChange,event:null,items:I,previousItems:K.current});K.current=I;k==null||k(I)}}),[I,V,U,k]);const createHandleKeyDown=e=>t=>{var n;(n=e.onKeyDown)==null||n.call(e,t);if(t.defaultMuiPrevented)return;const i=["Home","End","PageUp","PageDown"];S==="vertical"?i.push("ArrowUp","ArrowDown"):i.push("ArrowLeft","ArrowRight");g==="activeDescendant"&&i.push(" ","Enter");i.includes(t.key)&&t.preventDefault();U({type:o.keyDown,key:t.key,event:t});F(t)};const createHandleBlur=e=>t=>{var n,i;(n=e.onBlur)==null||n.call(e,t);t.defaultMuiPrevented||(i=E.current)!=null&&i.contains(t.relatedTarget)||U({type:o.blur,event:t})};const getRootProps=(t={})=>{const n=s(t);return e({},t,{"aria-activedescendant":g==="activeDescendant"&&z!=null?f(z):void 0,tabIndex:g==="DOM"?-1:0,ref:L},n,{onBlur:createHandleBlur(n),onKeyDown:createHandleKeyDown(n)})};const W=t.useCallback((e=>{const t=(B!=null?B:[]).some((t=>t!=null&&V(e,t)));const n=z!=null&&V(e,z);const i=g==="DOM";return{focusable:i,highlighted:n,selected:t}}),[V,B,z,g]);const q=t.useMemo((()=>({dispatch:U,getItemState:W})),[U,W]);t.useDebugValue({state:j});return{contextValue:q,dispatch:U,getRootProps:getRootProps,rootRef:L,state:j}}"use client";
/**
 * Contains the logic for an item of a list-like component (e.g. Select, Menu, etc.).
 * It handles the item's mouse events and tab index.
 *
 * @template ItemValue The type of the item's value. This should be consistent with the type of useList's `items` parameter.
 * @ignore - internal hook.
 */function useListItem(n){const{handlePointerOverEvents:i=false,item:l}=n;const a=t.useContext(r);if(!a)throw new Error("useListItem must be used within a ListProvider");const{dispatch:u,getItemState:c}=a;const{highlighted:h,selected:g,focusable:d}=c(l);const m=t.useCallback((e=>t=>{var n;(n=e.onClick)==null||n.call(e,t);if(!t.defaultPrevented){if(process.env.NODE_ENV!=="production"&&l===void 0)throw new Error(["MUI: The `item` provided to useListItem() is undefined.","This should happen only during server-side rendering under React 17."].join("\n"));u({type:o.itemClick,item:l,event:t})}}),[u,l]);const f=t.useCallback((e=>t=>{var n;(n=e.onMouseOver)==null||n.call(e,t);if(!t.defaultPrevented){if(process.env.NODE_ENV!=="production"&&l===void 0)throw new Error(["MUI: The `item` provided to useListItem() is undefined.","This should happen only during server-side rendering under React 17."].join("\n"));u({type:o.itemHover,item:l,event:t})}}),[u,l]);let v;d&&(v=h?0:-1);const getRootProps=(t={})=>{const n=s(t);return e({},t,{onClick:m(n),onPointerOver:i?f(n):void 0,tabIndex:v})};return{getRootProps:getRootProps,highlighted:h,selected:g}}"use client";export{o as ListActionTypes,r as ListContext,handleItemSelection,listReducer,moveHighlight,toggleSelection,useList,useListItem};

