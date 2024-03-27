function memoize(e){var t=Object.create(null);return function(n){void 0===t[n]&&(t[n]=e(n));return t[n]}}export{memoize as default};

