function debounce(e,o=166){let t;function debounced(...u){const later=()=>{e.apply(this,u)};clearTimeout(t);t=setTimeout(later,o)}debounced.clear=()=>{clearTimeout(t)};return debounced}export{debounce as default};

