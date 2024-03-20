import*as t from"react";"use client";let e=0;function useGlobalId(u){const[n,s]=t.useState(u);const o=u||n;t.useEffect((()=>{if(n==null){e+=1;s(`mui-${e}`)}}),[n]);return o}const u=t["useId".toString()];
/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */function useId(t){if(u!==void 0){const e=u();return t!=null?t:e}return useGlobalId(t)}export{useId as default};

