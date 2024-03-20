function composeClasses(s,e,o=void 0){const c={};Object.keys(s).forEach((t=>{c[t]=s[t].reduce(((s,c)=>{if(c){const t=e(c);t!==""&&s.push(t);o&&o[c]&&s.push(o[c])}return s}),[]).join(" ")}));return c}export{composeClasses as default};

