import"react";import e from"prop-types";import{CacheProvider as r}from"@emotion/react";import t from"@emotion/cache";import{jsx as o}from"react/jsx-runtime";"use client";let i;typeof document==="object"&&(i=t({key:"css",prepend:true}));function StyledEngineProvider(e){const{injectFirst:t,children:n}=e;return t&&i?o(r,{value:i,children:n}):n}process.env.NODE_ENV!=="production"?StyledEngineProvider.propTypes={children:e.node,injectFirst:e.bool}:void 0;"use client";export{StyledEngineProvider as default};
