import e from"@babel/runtime/helpers/esm/extends";import a from"@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";import*as t from"react";import l from"prop-types";import r from"clsx";import{chainPropTypes as n}from"@mui/utils";import{i as o}from"../_/Q-vwna0-.js";import{unstable_composeClasses as s}from"@mui/base/composeClasses";import{generateUtilityClasses as i}from"@mui/base/generateUtilityClasses";import{generateUtilityClass as u}from"@mui/base/generateUtilityClass";import{useSlider as m,valueToPercent as c}from"@mui/base/useSlider";import{u as b,r as p}from"../_/TEKcw71P.js";import{useClassNamesOverride as d}from"../utils/ClassNameConfigurator.js";import{jsx as f,jsxs as v}from"react/jsx-runtime";import"../_/q-ZiAH4M.js";function getSliderUtilityClass(e){return u("MuiSlider",e)}const y=i("MuiSlider",["root","active","focusVisible","disabled","dragging","marked","vertical","trackInverted","trackFalse","rail","track","mark","markActive","markLabel","markLabelActive","thumb"]);"use client";const g=["aria-label","aria-valuetext","aria-labelledby","className","disableSwap","disabled","getAriaLabel","getAriaValueText","marks","max","min","name","onChange","onChangeCommitted","orientation","scale","step","tabIndex","track","value","valueLabelFormat","isRtl","defaultValue","slotProps","slots"];function Identity(e){return e}const useUtilityClasses=e=>{const{disabled:a,dragging:t,marked:l,orientation:r,track:n}=e;const o={root:["root",a&&"disabled",t&&"dragging",l&&"marked",r==="vertical"&&"vertical",n==="inverted"&&"trackInverted",n===false&&"trackFalse"],rail:["rail"],track:["track"],mark:["mark"],markActive:["markActive"],markLabel:["markLabel"],markLabelActive:["markLabelActive"],valueLabel:["valueLabel"],thumb:["thumb",a&&"disabled"],active:["active"],disabled:["disabled"],focusVisible:["focusVisible"]};return s(o,d(getSliderUtilityClass))};const k=t.forwardRef((function Slider(l,n){var s,i,u,d,y,k;const{"aria-label":x,"aria-valuetext":h,"aria-labelledby":T,className:S,disableSwap:L=false,disabled:A=false,getAriaLabel:P,getAriaValueText:O,marks:w=false,max:N=100,min:V=0,orientation:C="horizontal",scale:j=Identity,step:I=1,track:F="normal",valueLabelFormat:R=Identity,isRtl:U=false,defaultValue:E,slotProps:M={},slots:_={}}=l,z=a(l,g);const Y=e({},l,{marks:w,disabled:A,disableSwap:L,isRtl:U,defaultValue:E,max:N,min:V,orientation:C,scale:j,step:I,track:F,valueLabelFormat:R});const{axisProps:q,getRootProps:D,getHiddenInputProps:H,getThumbProps:W,active:B,axis:G,range:J,focusedThumbIndex:K,dragging:Q,marks:X,values:Z,trackOffset:$,trackLeap:ee,getThumbStyle:ae}=m(e({},Y,{rootRef:n}));const te=e({},Y,{marked:X.length>0&&X.some((e=>e.label)),dragging:Q,focusedThumbIndex:K,activeThumbIndex:B});const le=useUtilityClasses(te);const re=(s=_.root)!=null?s:"span";const ne=b({elementType:re,getSlotProps:D,externalSlotProps:M.root,externalForwardedProps:z,ownerState:te,className:[le.root,S]});const oe=(i=_.rail)!=null?i:"span";const se=b({elementType:oe,externalSlotProps:M.rail,ownerState:te,className:le.rail});const ie=(u=_.track)!=null?u:"span";const ue=b({elementType:ie,externalSlotProps:M.track,additionalProps:{style:e({},q[G].offset($),q[G].leap(ee))},ownerState:te,className:le.track});const me=(d=_.thumb)!=null?d:"span";const ce=b({elementType:me,getSlotProps:W,externalSlotProps:M.thumb,ownerState:te,skipResolvingSlotProps:true});const be=_.valueLabel;const pe=b({elementType:be,externalSlotProps:M.valueLabel,ownerState:te});const de=(y=_.mark)!=null?y:"span";const fe=b({elementType:de,externalSlotProps:M.mark,ownerState:te,className:le.mark});const ve=(k=_.markLabel)!=null?k:"span";const ye=b({elementType:ve,externalSlotProps:M.markLabel,ownerState:te});const ge=_.input||"input";const ke=b({elementType:ge,getSlotProps:H,externalSlotProps:M.input,ownerState:te});return v(re,e({},ne,{children:[f(oe,e({},se)),f(ie,e({},ue)),X.filter((e=>e.value>=V&&e.value<=N)).map(((a,l)=>{const n=c(a.value,V,N);const s=q[G].offset(n);let i;i=F===false?Z.indexOf(a.value)!==-1:F==="normal"&&(J?a.value>=Z[0]&&a.value<=Z[Z.length-1]:a.value<=Z[0])||F==="inverted"&&(J?a.value<=Z[0]||a.value>=Z[Z.length-1]:a.value>=Z[0]);return v(t.Fragment,{children:[f(de,e({"data-index":l},fe,!o(de)&&{markActive:i},{style:e({},s,fe.style),className:r(fe.className,i&&le.markActive)})),a.label!=null?f(ve,e({"aria-hidden":true,"data-index":l},ye,!o(ve)&&{markLabelActive:i},{style:e({},s,ye.style),className:r(le.markLabel,ye.className,i&&le.markLabelActive),children:a.label})):null]},l)})),Z.map(((a,t)=>{const l=c(a,V,N);const n=q[G].offset(l);const s=p(M.thumb,te,{index:t,focused:K===t,active:B===t});return v(me,e({"data-index":t},ce,s,{className:r(le.thumb,ce.className,s==null?void 0:s.className,B===t&&le.active,K===t&&le.focusVisible),style:e({},n,ae(t),ce.style,s==null?void 0:s.style),children:[f(ge,e({"data-index":t,"aria-label":P?P(t):x,"aria-valuenow":j(a),"aria-labelledby":T,"aria-valuetext":O?O(j(a),t):h,value:Z[t]},ke)),be?f(be,e({},!o(be)&&{valueLabelFormat:R,index:t,disabled:A},pe,{children:typeof R==="function"?R(j(a),t):R})):null]}),t)}))]}))}));process.env.NODE_ENV!=="production"?k.propTypes={"aria-label":n(l.string,(e=>{const a=Array.isArray(e.value||e.defaultValue);return a&&e["aria-label"]!=null?new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider."):null})),"aria-labelledby":l.string,"aria-valuetext":n(l.string,(e=>{const a=Array.isArray(e.value||e.defaultValue);return a&&e["aria-valuetext"]!=null?new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider."):null})),defaultValue:l.oneOfType([l.arrayOf(l.number),l.number]),disabled:l.bool,disableSwap:l.bool,
/**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
getAriaLabel:l.func,
/**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
getAriaValueText:l.func,isRtl:l.bool,marks:l.oneOfType([l.arrayOf(l.shape({label:l.node,value:l.number.isRequired})),l.bool]),max:l.number,min:l.number,name:l.string,
/**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
onChange:l.func,
/**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
onChangeCommitted:l.func,orientation:l.oneOf(["horizontal","vertical"]),
/**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
scale:l.func,slotProps:l.shape({input:l.oneOfType([l.func,l.object]),mark:l.oneOfType([l.func,l.object]),markLabel:l.oneOfType([l.func,l.object]),rail:l.oneOfType([l.func,l.object]),root:l.oneOfType([l.func,l.object]),thumb:l.oneOfType([l.func,l.object]),track:l.oneOfType([l.func,l.object]),valueLabel:l.oneOfType([l.any,l.func])}),slots:l.shape({input:l.elementType,mark:l.elementType,markLabel:l.elementType,rail:l.elementType,root:l.elementType,thumb:l.elementType,track:l.elementType,valueLabel:l.elementType}),step:l.number,tabIndex:l.number,track:l.oneOf(["inverted","normal",false]),value:l.oneOfType([l.arrayOf(l.number),l.number]),
/**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
valueLabelFormat:l.oneOfType([l.func,l.string])}:void 0;"use client";export{k as Slider,getSliderUtilityClass,y as sliderClasses};

