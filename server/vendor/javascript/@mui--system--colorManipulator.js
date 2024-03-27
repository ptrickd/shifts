import*as e from"@babel/runtime/helpers/interopRequireDefault";import*as o from"@mui/utils/formatMuiErrorMessage";import*as a from"@mui/utils/clamp";var t=e;try{"default"in e&&(t=e.default)}catch(e){}var r=o;try{"default"in o&&(r=o.default)}catch(e){}var n=a;try{"default"in a&&(n=a.default)}catch(e){}var s={};var l=t;Object.defineProperty(s,"__esModule",{value:true});s.alpha=alpha;s.blend=blend;s.colorChannel=void 0;s.darken=darken;s.decomposeColor=decomposeColor;s.emphasize=emphasize;s.getContrastRatio=getContrastRatio;s.getLuminance=getLuminance;s.hexToRgb=hexToRgb;s.hslToRgb=hslToRgb;s.lighten=lighten;s.private_safeAlpha=private_safeAlpha;s.private_safeColorChannel=void 0;s.private_safeDarken=private_safeDarken;s.private_safeEmphasize=private_safeEmphasize;s.private_safeLighten=private_safeLighten;s.recomposeColor=recomposeColor;s.rgbToHex=rgbToHex;var i=l(r);var p=l(n);
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */function clampWrapper(e,o=0,a=1){return(0,p.default)(e,o,a)}
/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */function hexToRgb(e){e=e.slice(1);const o=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let a=e.match(o);a&&a[0].length===1&&(a=a.map((e=>e+e)));return a?`rgb${a.length===4?"a":""}(${a.map(((e,o)=>o<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3)).join(", ")})`:""}function intToHex(e){const o=e.toString(16);return o.length===1?`0${o}`:o}
/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */function decomposeColor(e){if(e.type)return e;if(e.charAt(0)==="#")return decomposeColor(hexToRgb(e));const o=e.indexOf("(");const a=e.substring(0,o);if(["rgb","rgba","hsl","hsla","color"].indexOf(a)===-1)throw new Error((0,i.default)(9,e));let t=e.substring(o+1,e.length-1);let r;if(a==="color"){t=t.split(" ");r=t.shift();t.length===4&&t[3].charAt(0)==="/"&&(t[3]=t[3].slice(1));if(["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(r)===-1)throw new Error((0,i.default)(10,r))}else t=t.split(",");t=t.map((e=>parseFloat(e)));return{type:a,values:t,colorSpace:r}}
/**
 * Returns a channel created from the input color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {string} - The channel for the color, that can be used in rgba or hsla colors
 */const colorChannel=e=>{const o=decomposeColor(e);return o.values.slice(0,3).map(((e,a)=>o.type.indexOf("hsl")!==-1&&a!==0?`${e}%`:e)).join(" ")};s.colorChannel=colorChannel;const private_safeColorChannel=(e,o)=>{try{return colorChannel(e)}catch(a){o&&false;return e}};
/**
 * Converts a color object with type and values to a string.
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla', 'color'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */s.private_safeColorChannel=private_safeColorChannel;function recomposeColor(e){const{type:o,colorSpace:a}=e;let{values:t}=e;if(o.indexOf("rgb")!==-1)t=t.map(((e,o)=>o<3?parseInt(e,10):e));else if(o.indexOf("hsl")!==-1){t[1]=`${t[1]}%`;t[2]=`${t[2]}%`}t=o.indexOf("color")!==-1?`${a} ${t.join(" ")}`:`${t.join(", ")}`;return`${o}(${t})`}
/**
 * Converts a color from CSS rgb format to CSS hex format.
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
 */function rgbToHex(e){if(e.indexOf("#")===0)return e;const{values:o}=decomposeColor(e);return`#${o.map(((e,o)=>intToHex(o===3?Math.round(255*e):e))).join("")}`}
/**
 * Converts a color from hsl format to rgb format.
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */function hslToRgb(e){e=decomposeColor(e);const{values:o}=e;const a=o[0];const t=o[1]/100;const r=o[2]/100;const n=t*Math.min(r,1-r);const f=(e,o=(e+a/30)%12)=>r-n*Math.max(Math.min(o-3,9-o,1),-1);let s="rgb";const l=[Math.round(f(0)*255),Math.round(f(8)*255),Math.round(f(4)*255)];if(e.type==="hsla"){s+="a";l.push(o[3])}return recomposeColor({type:s,values:l})}
/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */function getLuminance(e){e=decomposeColor(e);let o=e.type==="hsl"||e.type==="hsla"?decomposeColor(hslToRgb(e)).values:e.values;o=o.map((o=>{e.type!=="color"&&(o/=255);return o<=.03928?o/12.92:((o+.055)/1.055)**2.4}));return Number((.2126*o[0]+.7152*o[1]+.0722*o[2]).toFixed(3))}
/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */function getContrastRatio(e,o){const a=getLuminance(e);const t=getLuminance(o);return(Math.max(a,t)+.05)/(Math.min(a,t)+.05)}
/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */function alpha(e,o){e=decomposeColor(e);o=clampWrapper(o);e.type!=="rgb"&&e.type!=="hsl"||(e.type+="a");e.type==="color"?e.values[3]=`/${o}`:e.values[3]=o;return recomposeColor(e)}function private_safeAlpha(e,o,a){try{return alpha(e,o)}catch(o){a&&false;return e}}
/**
 * Darkens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */function darken(e,o){e=decomposeColor(e);o=clampWrapper(o);if(e.type.indexOf("hsl")!==-1)e.values[2]*=1-o;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let a=0;a<3;a+=1)e.values[a]*=1-o;return recomposeColor(e)}function private_safeDarken(e,o,a){try{return darken(e,o)}catch(o){a&&false;return e}}
/**
 * Lightens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */function lighten(e,o){e=decomposeColor(e);o=clampWrapper(o);if(e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*o;else if(e.type.indexOf("rgb")!==-1)for(let a=0;a<3;a+=1)e.values[a]+=(255-e.values[a])*o;else if(e.type.indexOf("color")!==-1)for(let a=0;a<3;a+=1)e.values[a]+=(1-e.values[a])*o;return recomposeColor(e)}function private_safeLighten(e,o,a){try{return lighten(e,o)}catch(o){a&&false;return e}}
/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */function emphasize(e,o=.15){return getLuminance(e)>.5?darken(e,o):lighten(e,o)}function private_safeEmphasize(e,o,a){try{return private_safeEmphasize(e,o)}catch(o){a&&false;return e}}
/**
 * Blend a transparent overlay color with a background color, resulting in a single
 * RGB color.
 * @param {string} background - CSS color
 * @param {string} overlay - CSS color
 * @param {number} opacity - Opacity multiplier in the range 0 - 1
 * @param {number} [gamma=1.0] - Gamma correction factor. For gamma-correct blending, 2.2 is usual.
 */function blend(e,o,a,t=1){const blendChannel=(e,o)=>Math.round((e**(1/t)*(1-a)+o**(1/t)*a)**t);const r=decomposeColor(e);const n=decomposeColor(o);const s=[blendChannel(r.values[0],n.values[0]),blendChannel(r.values[1],n.values[1]),blendChannel(r.values[2],n.values[2])];return recomposeColor({type:"rgb",values:s})}const c=s.__esModule;const u=s.alpha,h=s.blend,m=s.colorChannel,g=s.darken,d=s.decomposeColor,v=s.emphasize,C=s.getContrastRatio,b=s.getLuminance,x=s.hexToRgb,y=s.hslToRgb,_=s.lighten,R=s.private_safeAlpha,T=s.private_safeColorChannel,M=s.private_safeDarken,O=s.private_safeEmphasize,$=s.private_safeLighten,L=s.recomposeColor,k=s.rgbToHex;export{c as __esModule,u as alpha,h as blend,m as colorChannel,g as darken,d as decomposeColor,s as default,v as emphasize,C as getContrastRatio,b as getLuminance,x as hexToRgb,y as hslToRgb,_ as lighten,R as private_safeAlpha,T as private_safeColorChannel,M as private_safeDarken,O as private_safeEmphasize,$ as private_safeLighten,L as recomposeColor,k as rgbToHex};

