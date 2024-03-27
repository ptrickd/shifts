import r from"./typeof.js";import t from"./toPrimitive.js";function toPropertyKey(o){var e=t(o,"string");return"symbol"==r(e)?e:e+""}export{toPropertyKey as default};

