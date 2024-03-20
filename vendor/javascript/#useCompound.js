import*as e from"react";import{unstable_useEnhancedEffect as t}from"@mui/utils";"use client";const n=e.createContext(null);n.displayName="CompoundComponentContext";function sortSubitems(e){const t=Array.from(e.keys()).map((t=>{const n=e.get(t);return{key:t,subitem:n}}));t.sort(((e,t)=>{const n=e.subitem.ref.current;const o=t.subitem.ref.current;return n===null||o===null||n===o?0:n.compareDocumentPosition(o)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}));return new Map(t.map((e=>[e.key,e.subitem])))}function useCompoundParent(){const[t,n]=e.useState(new Map);const o=e.useRef(new Set);const u=e.useCallback((function deregisterItem(e){o.current.delete(e);n((t=>{const n=new Map(t);n.delete(e);return n}))}),[]);const r=e.useCallback((function registerItem(e,t){let r;r=typeof e==="function"?e(o.current):e;o.current.add(r);n((e=>{const n=new Map(e);n.set(r,t);return n}));return{id:r,deregister:()=>u(r)}}),[u]);const s=e.useMemo((()=>sortSubitems(t)),[t]);const i=e.useCallback((function getItemIndex(e){return Array.from(s.keys()).indexOf(e)}),[s]);const m=e.useMemo((()=>({getItemIndex:i,registerItem:r,totalSubitemCount:t.size})),[i,r,t.size]);return{contextValue:m,subitems:s}}"use client";
/**
 * Registers a child component with the parent component.
 *
 * @param id A unique key for the child component. If the `id` is `undefined`, the registration logic will not run (this can sometimes be the case during SSR).
 *   This can be either a value, or a function that generates a value based on already registered siblings' ids.
 * @param itemMetadata Arbitrary metadata to pass to the parent component. This should be a stable reference (e.g. a memoized object), to avoid unnecessary re-registrations.
 * @param missingKeyGenerator A function that generates a unique id for the item.
 *   It is called with the set of the ids of all the items that have already been registered.
 *   Return `existingKeys.size` if you want to use the index of the new item as the id.
 *
 * @ignore - internal hook.
 */function useCompoundItem(o,u){const r=e.useContext(n);if(r===null)throw new Error("useCompoundItem must be used within a useCompoundParent");const{registerItem:s}=r;const[i,m]=e.useState(typeof o==="function"?void 0:o);t((()=>{const{id:e,deregister:t}=s(o,u);m(e);return t}),[s,u,o]);return{id:i,index:i!==void 0?r.getItemIndex(i):-1,totalItemCount:r.totalSubitemCount}}"use client";export{n as CompoundComponentContext,useCompoundItem,useCompoundParent};

