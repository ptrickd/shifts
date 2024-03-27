import*as e from"react";import r from"@mui/utils/setRef";"use client";function useForkRef(...u){return e.useMemo((()=>u.every((e=>e==null))?null:e=>{u.forEach((u=>{r(u,e)}))}),u)}export{useForkRef as default};

