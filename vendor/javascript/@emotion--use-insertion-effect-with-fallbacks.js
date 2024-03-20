import*as r from"react";var e=function syncFallback(r){return r()};var t=!!r.useInsertionEffect&&r.useInsertionEffect;var a=t||e;var f=t||r.useLayoutEffect;export{a as useInsertionEffectAlwaysWithSyncFallback,f as useInsertionEffectWithLayoutFallback};

