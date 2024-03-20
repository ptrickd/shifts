import*as e from"react";import{T as t}from"../_/gWQU0yvF.js";import"../_/a5a3stJ0.js";import"../_/swjvTJuN.js";"use client";let n=true;let r=false;const i=new t;const o={text:true,search:true,url:true,tel:true,email:true,password:true,number:true,date:true,month:true,week:true,time:true,datetime:true,"datetime-local":true};
/**
 * Computes whether the given element should automatically trigger the
 * `focus-visible` class being added, i.e. whether it should always match
 * `:focus-visible` when focused.
 * @param {Element} node
 * @returns {boolean}
 */function focusTriggersKeyboardModality(e){const{type:t,tagName:n}=e;return!(n!=="INPUT"||!o[t]||e.readOnly)||(n==="TEXTAREA"&&!e.readOnly||!!e.isContentEditable)}
/**
 * Keep track of our keyboard modality state with `hadKeyboardEvent`.
 * If the most recent user interaction was via the keyboard;
 * and the key press did not include a meta, alt/option, or control key;
 * then the modality is keyboard. Otherwise, the modality is not keyboard.
 * @param {KeyboardEvent} event
 */function handleKeyDown(e){e.metaKey||e.altKey||e.ctrlKey||(n=true)}function handlePointerDown(){n=false}function handleVisibilityChange(){this.visibilityState==="hidden"&&r&&(n=true)}function prepare(e){e.addEventListener("keydown",handleKeyDown,true);e.addEventListener("mousedown",handlePointerDown,true);e.addEventListener("pointerdown",handlePointerDown,true);e.addEventListener("touchstart",handlePointerDown,true);e.addEventListener("visibilitychange",handleVisibilityChange,true)}function teardown(e){e.removeEventListener("keydown",handleKeyDown,true);e.removeEventListener("mousedown",handlePointerDown,true);e.removeEventListener("pointerdown",handlePointerDown,true);e.removeEventListener("touchstart",handlePointerDown,true);e.removeEventListener("visibilitychange",handleVisibilityChange,true)}function isFocusVisible(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch(e){}return n||focusTriggersKeyboardModality(t)}function useIsFocusVisible(){const t=e.useCallback((e=>{e!=null&&prepare(e.ownerDocument)}),[]);const n=e.useRef(false);function handleBlurVisible(){if(n.current){r=true;i.start(100,(()=>{r=false}));n.current=false;return true}return false}function handleFocusVisible(e){if(isFocusVisible(e)){n.current=true;return true}return false}return{isFocusVisibleRef:n,onFocus:handleFocusVisible,onBlur:handleBlurVisible,ref:t}}export{useIsFocusVisible as default,teardown};

