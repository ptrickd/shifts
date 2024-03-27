function chainPropTypes(n,e){return process.env.NODE_ENV==="production"?()=>null:function validate(...r){return n(...r)||e(...r)}}export{chainPropTypes as default};

