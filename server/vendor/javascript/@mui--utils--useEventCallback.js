import*as e from"react";import t from"@mui/utils/useEnhancedEffect";"use client";function useEventCallback(r){const u=e.useRef(r);t((()=>{u.current=r}));return e.useRef(((...e)=>(0,u.current)(...e))).current}export{useEventCallback as default};

