import*as e from"react";function isMuiElement(l,i){var u,a;return e.isValidElement(l)&&i.indexOf((u=l.type.muiName)!=null?u:(a=l.type)==null||(a=a._payload)==null||(a=a.value)==null?void 0:a.muiName)!==-1}export{isMuiElement as default};

