var e=function weakMemoize(e){var r=new WeakMap;return function(a){if(r.has(a))return r.get(a);var t=e(a);r.set(a,t);return t}};export{e as default};

