function createChainedFunction(...n){return n.reduce(((n,e)=>e==null?n:function chainedFunction(...t){n.apply(this,t);e.apply(this,t)}),(()=>{}))}export{createChainedFunction as default};

