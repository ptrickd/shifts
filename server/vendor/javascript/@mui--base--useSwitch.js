import e from"@babel/runtime/helpers/esm/extends";import*as n from"react";import{unstable_useControlled as l,unstable_useIsFocusVisible as t,unstable_useForkRef as c}from"@mui/utils";"use client";function useSwitch(o){const{checked:r,defaultChecked:u,disabled:s,onBlur:a,onChange:i,onFocus:d,onFocusVisible:f,readOnly:h,required:m}=o;const[b,p]=l({controlled:r,default:Boolean(u),name:"Switch",state:"checked"});const createHandleInputChange=e=>n=>{var l;if(!n.nativeEvent.defaultPrevented){p(n.target.checked);i==null||i(n);(l=e.onChange)==null||l.call(e,n)}};const{isFocusVisibleRef:k,onBlur:B,onFocus:g,ref:v}=t();const[F,C]=n.useState(false);s&&F&&C(false);n.useEffect((()=>{k.current=F}),[F,k]);const y=n.useRef(null);const createHandleFocus=e=>n=>{var l;y.current||(y.current=n.currentTarget);g(n);if(k.current===true){C(true);f==null||f(n)}d==null||d(n);(l=e.onFocus)==null||l.call(e,n)};const createHandleBlur=e=>n=>{var l;B(n);k.current===false&&C(false);a==null||a(n);(l=e.onBlur)==null||l.call(e,n)};const S=c(v,y);const getInputProps=(n={})=>e({checked:r,defaultChecked:u,disabled:s,readOnly:h,ref:S,required:m,type:"checkbox"},n,{onChange:createHandleInputChange(n),onFocus:createHandleFocus(n),onBlur:createHandleBlur(n)});return{checked:b,disabled:Boolean(s),focusVisible:F,getInputProps:getInputProps,inputRef:S,readOnly:Boolean(h)}}"use client";export{useSwitch};
