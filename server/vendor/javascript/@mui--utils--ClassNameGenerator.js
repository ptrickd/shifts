const defaultGenerator=e=>e;const createClassNameGenerator=()=>{let e=defaultGenerator;return{configure(t){e=t},generate(t){return e(t)},reset(){e=defaultGenerator}}};const e=createClassNameGenerator();export{e as default};

