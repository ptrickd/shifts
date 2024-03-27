import e from"react";var isCheckBoxInput=e=>e.type==="checkbox";var isDateObject=e=>e instanceof Date;var isNullOrUndefined=e=>e==null;const isObjectType=e=>typeof e==="object";var isObject=e=>!isNullOrUndefined(e)&&!Array.isArray(e)&&isObjectType(e)&&!isDateObject(e);var getEventValue=e=>isObject(e)&&e.target?isCheckBoxInput(e.target)?e.target.checked:e.target.value:e;var getNodeParentName=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e;var isNameInFieldArray=(e,t)=>e.has(getNodeParentName(t));var isPlainObject=e=>{const t=e.constructor&&e.constructor.prototype;return isObject(t)&&t.hasOwnProperty("isPrototypeOf")};var t=typeof window!=="undefined"&&typeof window.HTMLElement!=="undefined"&&typeof document!=="undefined";function cloneObject(e){let r;const s=Array.isArray(e);if(e instanceof Date)r=new Date(e);else if(e instanceof Set)r=new Set(e);else{if(t&&(e instanceof Blob||e instanceof FileList)||!s&&!isObject(e))return e;r=s?[]:{};if(s||isPlainObject(e))for(const t in e)e.hasOwnProperty(t)&&(r[t]=cloneObject(e[t]));else r=e}return r}var compact=e=>Array.isArray(e)?e.filter(Boolean):[];var isUndefined=e=>e===void 0;var get=(e,t,r)=>{if(!t||!isObject(e))return r;const s=compact(t.split(/[,[\].]+?/)).reduce(((e,t)=>isNullOrUndefined(e)?e:e[t]),e);return isUndefined(s)||s===e?isUndefined(e[t])?r:e[t]:s};var isBoolean=e=>typeof e==="boolean";const r={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"};const s={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"};const a={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};const n=e.createContext(null);
/**
 * This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop. To be used with {@link FormProvider}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @returns return all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */const useFormContext=()=>e.useContext(n)
/**
 * A provider component that propagates the `useForm` methods to all children components via [React Context](https://reactjs.org/docs/context.html) API. To be used with {@link useFormContext}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @param props - all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */;const FormProvider=t=>{const{children:r,...s}=t;return e.createElement(n.Provider,{value:s},r)};var getProxyFormState=(e,t,r,a=true)=>{const n={defaultValues:t._defaultValues};for(const o in e)Object.defineProperty(n,o,{get:()=>{const n=o;t._proxyFormState[n]!==s.all&&(t._proxyFormState[n]=!a||s.all);r&&(r[n]=true);return e[n]}});return n};var isEmptyObject=e=>isObject(e)&&!Object.keys(e).length;var shouldRenderFormState=(e,t,r,a)=>{r(e);const{name:n,...o}=e;return isEmptyObject(o)||Object.keys(o).length>=Object.keys(t).length||Object.keys(o).find((e=>t[e]===(!a||s.all)))};var convertToArrayPayload=e=>Array.isArray(e)?e:[e];var shouldSubscribeByName=(e,t,r)=>!e||!t||e===t||convertToArrayPayload(e).some((e=>e&&(r?e===t:e.startsWith(t)||t.startsWith(e))));function useSubscribe(t){const r=e.useRef(t);r.current=t;e.useEffect((()=>{const e=!t.disabled&&r.current.subject&&r.current.subject.subscribe({next:r.current.next});return()=>{e&&e.unsubscribe()}}),[t.disabled])}
/**
 * This custom hook allows you to subscribe to each form state, and isolate the re-render at the custom hook level. It has its scope in terms of form state subscription, so it would not affect other useFormState and useForm. Using this hook can reduce the re-render impact on large and complex form application.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformstate) • [Demo](https://codesandbox.io/s/useformstate-75xly)
 *
 * @param props - include options on specify fields to subscribe. {@link UseFormStateReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, control } = useForm({
 *     defaultValues: {
 *     firstName: "firstName"
 *   }});
 *   const { dirtyFields } = useFormState({
 *     control
 *   });
 *   const onSubmit = (data) => console.log(data);
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register("firstName")} placeholder="First Name" />
 *       {dirtyFields.firstName && <p>Field is dirty.</p>}
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */function useFormState(t){const r=useFormContext();const{control:s=r.control,disabled:a,name:n,exact:o}=t||{};const[i,l]=e.useState(s._formState);const u=e.useRef(true);const c=e.useRef({isDirty:false,isLoading:false,dirtyFields:false,touchedFields:false,validatingFields:false,isValidating:false,isValid:false,errors:false});const d=e.useRef(n);d.current=n;useSubscribe({disabled:a,next:e=>u.current&&shouldSubscribeByName(d.current,e.name,o)&&shouldRenderFormState(e,c.current,s._updateFormState)&&l({...s._formState,...e}),subject:s._subjects.state});e.useEffect((()=>{u.current=true;c.current.isValid&&s._updateValid(true);return()=>{u.current=false}}),[s]);return getProxyFormState(i,s,c.current,false)}var isString=e=>typeof e==="string";var generateWatchOutput=(e,t,r,s,a)=>{if(isString(e)){s&&t.watch.add(e);return get(r,e,a)}if(Array.isArray(e))return e.map((e=>(s&&t.watch.add(e),get(r,e))));s&&(t.watchAll=true);return r};function useWatch(t){const r=useFormContext();const{control:s=r.control,name:a,defaultValue:n,disabled:o,exact:i}=t||{};const l=e.useRef(a);l.current=a;useSubscribe({disabled:o,subject:s._subjects.values,next:e=>{shouldSubscribeByName(l.current,e.name,i)&&c(cloneObject(generateWatchOutput(l.current,s._names,e.values||s._formValues,false,n)))}});const[u,c]=e.useState(s._getWatch(a,n));e.useEffect((()=>s._removeUnmounted()));return u}var isKey=e=>/^\w*$/.test(e);var stringToPath=e=>compact(e.replace(/["|']|\]/g,"").split(/\.|\[/));var set=(e,t,r)=>{let s=-1;const a=isKey(t)?[t]:stringToPath(t);const n=a.length;const o=n-1;while(++s<n){const t=a[s];let n=r;if(s!==o){const r=e[t];n=isObject(r)||Array.isArray(r)?r:isNaN(+a[s+1])?{}:[]}e[t]=n;e=e[t]}return e};
/**
 * Custom hook to work with controlled component, this function provide you with both form and field level state. Re-render is isolated at the hook level.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller) • [Demo](https://codesandbox.io/s/usecontroller-0o8px)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns field properties, field and form state. {@link UseControllerReturn}
 *
 * @example
 * ```tsx
 * function Input(props) {
 *   const { field, fieldState, formState } = useController(props);
 *   return (
 *     <div>
 *       <input {...field} placeholder={props.name} />
 *       <p>{fieldState.isTouched && "Touched"}</p>
 *       <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *     </div>
 *   );
 * }
 * ```
 */function useController(t){const s=useFormContext();const{name:a,disabled:n,control:o=s.control,shouldUnregister:i}=t;const l=isNameInFieldArray(o._names.array,a);const u=useWatch({control:o,name:a,defaultValue:get(o._formValues,a,get(o._defaultValues,a,t.defaultValue)),exact:true});const c=useFormState({control:o,name:a});const d=e.useRef(o.register(a,{...t.rules,value:u,...isBoolean(t.disabled)?{disabled:t.disabled}:{}}));e.useEffect((()=>{const e=o._options.shouldUnregister||i;const updateMounted=(e,t)=>{const r=get(o._fields,e);r&&(r._f.mount=t)};updateMounted(a,true);if(e){const e=cloneObject(get(o._options.defaultValues,a));set(o._defaultValues,a,e);isUndefined(get(o._formValues,a))&&set(o._formValues,a,e)}return()=>{(l?e&&!o._state.action:e)?o.unregister(a):updateMounted(a,false)}}),[a,o,l,i]);e.useEffect((()=>{get(o._fields,a)&&o._updateDisabledField({disabled:n,fields:o._fields,name:a,value:get(o._fields,a)._f.value})}),[n,a,o]);return{field:{name:a,value:u,...isBoolean(n)||c.disabled?{disabled:c.disabled||n}:{},onChange:e.useCallback((e=>d.current.onChange({target:{value:getEventValue(e),name:a},type:r.CHANGE})),[a]),onBlur:e.useCallback((()=>d.current.onBlur({target:{value:get(o._formValues,a),name:a},type:r.BLUR})),[a,o]),ref:e=>{const t=get(o._fields,a);t&&e&&(t._f.ref={focus:()=>e.focus(),select:()=>e.select(),setCustomValidity:t=>e.setCustomValidity(t),reportValidity:()=>e.reportValidity()})}},formState:c,fieldState:Object.defineProperties({},{invalid:{enumerable:true,get:()=>!!get(c.errors,a)},isDirty:{enumerable:true,get:()=>!!get(c.dirtyFields,a)},isTouched:{enumerable:true,get:()=>!!get(c.touchedFields,a)},isValidating:{enumerable:true,get:()=>!!get(c.validatingFields,a)},error:{enumerable:true,get:()=>get(c.errors,a)}})}}
/**
 * Component based on `useController` hook to work with controlled component.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller/controller) • [Demo](https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw) • [Video](https://www.youtube.com/watch?v=N2UNk_UCVyA)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns provide field handler functions, field and form state.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control } = useForm<FormValues>({
 *     defaultValues: {
 *       test: ""
 *     }
 *   });
 *
 *   return (
 *     <form>
 *       <Controller
 *         control={control}
 *         name="test"
 *         render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
 *           <>
 *             <input
 *               onChange={onChange} // send value to hook form
 *               onBlur={onBlur} // notify when input is touched
 *               value={value} // return updated value
 *               ref={ref} // set ref for focus management
 *             />
 *             <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *             <p>{fieldState.isTouched ? "touched" : ""}</p>
 *           </>
 *         )}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */const Controller=e=>e.render(useController(e));const o="post";
/**
 * Form component to manage submission.
 *
 * @param props - to setup submission detail. {@link FormProps}
 *
 * @returns form component or headless render prop.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control, formState: { errors } } = useForm();
 *
 *   return (
 *     <Form action="/api" control={control}>
 *       <input {...register("name")} />
 *       <p>{errors?.root?.server && 'Server error'}</p>
 *       <button>Submit</button>
 *     </Form>
 *   );
 * }
 * ```
 */function Form(t){const r=useFormContext();const[s,a]=e.useState(false);const{control:n=r.control,onSubmit:i,children:l,action:u,method:c=o,headers:d,encType:f,onError:m,render:y,onSuccess:v,validateStatus:g,...p}=t;const submit=async e=>{let r=false;let s="";await n.handleSubmit((async t=>{const a=new FormData;let o="";try{o=JSON.stringify(t)}catch(e){}for(const e of n._names.mount)a.append(e,get(t,e));i&&await i({data:t,event:e,method:c,formData:a,formDataJson:o});if(u)try{const e=[d&&d["Content-Type"],f].some((e=>e&&e.includes("json")));const t=await fetch(u,{method:c,headers:{...d,...f?{"Content-Type":f}:{}},body:e?o:a});if(t&&(g?!g(t.status):t.status<200||t.status>=300)){r=true;m&&m({response:t});s=String(t.status)}else v&&v({response:t})}catch(e){r=true;m&&m({error:e})}}))(e);if(r&&t.control){t.control._subjects.state.next({isSubmitSuccessful:false});t.control.setError("root.server",{type:s})}};e.useEffect((()=>{a(true)}),[]);return y?e.createElement(e.Fragment,null,y({submit:submit})):e.createElement("form",{noValidate:s,action:u,method:c,encType:f,onSubmit:submit,...p},l)}var appendErrors=(e,t,r,s,a)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[s]:a||true}}:{};var generateId=()=>{const e=typeof performance==="undefined"?Date.now():performance.now()*1e3;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(t=>{const r=(Math.random()*16+e)%16|0;return(t=="x"?r:r&3|8).toString(16)}))};var getFocusFieldName=(e,t,r={})=>r.shouldFocus||isUndefined(r.shouldFocus)?r.focusName||`${e}.${isUndefined(r.focusIndex)?t:r.focusIndex}.`:"";var getValidationModes=e=>({isOnSubmit:!e||e===s.onSubmit,isOnBlur:e===s.onBlur,isOnChange:e===s.onChange,isOnAll:e===s.all,isOnTouch:e===s.onTouched});var isWatched=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some((t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length)))));const iterateFieldsByAction=(e,t,r,s)=>{for(const a of r||Object.keys(e)){const r=get(e,a);if(r){const{_f:e,...n}=r;if(e){if(e.refs&&e.refs[0]&&t(e.refs[0],a)&&!s)break;if(e.ref&&t(e.ref,e.name)&&!s)break;iterateFieldsByAction(n,t)}else isObject(n)&&iterateFieldsByAction(n,t)}}};var updateFieldArrayRootError=(e,t,r)=>{const s=compact(get(e,r));set(s,"root",t[r]);set(e,r,s);return e};var isFileInput=e=>e.type==="file";var isFunction=e=>typeof e==="function";var isHTMLElement=e=>{if(!t)return false;const r=e?e.ownerDocument:0;return e instanceof(r&&r.defaultView?r.defaultView.HTMLElement:HTMLElement)};var isMessage=e=>isString(e);var isRadioInput=e=>e.type==="radio";var isRegex=e=>e instanceof RegExp;const i={value:false,isValid:false};const l={value:true,isValid:true};var getCheckboxValue=e=>{if(Array.isArray(e)){if(e.length>1){const t=e.filter((e=>e&&e.checked&&!e.disabled)).map((e=>e.value));return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!isUndefined(e[0].attributes.value)?isUndefined(e[0].value)||e[0].value===""?l:{value:e[0].value,isValid:true}:l:i}return i};const u={isValid:false,value:null};var getRadioValue=e=>Array.isArray(e)?e.reduce(((e,t)=>t&&t.checked&&!t.disabled?{isValid:true,value:t.value}:e),u):u;function getValidateError(e,t,r="validate"){if(isMessage(e)||Array.isArray(e)&&e.every(isMessage)||isBoolean(e)&&!e)return{type:r,message:isMessage(e)?e:"",ref:t}}var getValueAndMessage=e=>isObject(e)&&!isRegex(e)?e:{value:e,message:""};var validateField=async(e,t,r,s,n)=>{const{ref:o,refs:i,required:l,maxLength:u,minLength:c,min:d,max:f,pattern:m,validate:y,name:v,valueAsNumber:g,mount:p,disabled:b}=e._f;const h=get(t,v);if(!p||b)return{};const _=i?i[0]:o;const setCustomValidity=e=>{if(s&&_.reportValidity){_.setCustomValidity(isBoolean(e)?"":e||"");_.reportValidity()}};const F={};const V=isRadioInput(o);const A=isCheckBoxInput(o);const x=V||A;const S=(g||isFileInput(o))&&isUndefined(o.value)&&isUndefined(h)||isHTMLElement(o)&&o.value===""||h===""||Array.isArray(h)&&!h.length;const D=appendErrors.bind(null,v,r,F);const getMinMaxMessage=(e,t,r,s=a.maxLength,n=a.minLength)=>{const i=e?t:r;F[v]={type:e?s:n,message:i,ref:o,...D(e?s:n,i)}};if(n?!Array.isArray(h)||!h.length:l&&(!x&&(S||isNullOrUndefined(h))||isBoolean(h)&&!h||A&&!getCheckboxValue(i).isValid||V&&!getRadioValue(i).isValid)){const{value:e,message:t}=isMessage(l)?{value:!!l,message:l}:getValueAndMessage(l);if(e){F[v]={type:a.required,message:t,ref:_,...D(a.required,t)};if(!r){setCustomValidity(t);return F}}}if(!S&&(!isNullOrUndefined(d)||!isNullOrUndefined(f))){let e;let t;const s=getValueAndMessage(f);const n=getValueAndMessage(d);if(isNullOrUndefined(h)||isNaN(h)){const r=o.valueAsDate||new Date(h);const convertTimeToDate=e=>new Date((new Date).toDateString()+" "+e);const a=o.type=="time";const i=o.type=="week";isString(s.value)&&h&&(e=a?convertTimeToDate(h)>convertTimeToDate(s.value):i?h>s.value:r>new Date(s.value));isString(n.value)&&h&&(t=a?convertTimeToDate(h)<convertTimeToDate(n.value):i?h<n.value:r<new Date(n.value))}else{const r=o.valueAsNumber||(h?+h:h);isNullOrUndefined(s.value)||(e=r>s.value);isNullOrUndefined(n.value)||(t=r<n.value)}if(e||t){getMinMaxMessage(!!e,s.message,n.message,a.max,a.min);if(!r){setCustomValidity(F[v].message);return F}}}if((u||c)&&!S&&(isString(h)||n&&Array.isArray(h))){const e=getValueAndMessage(u);const t=getValueAndMessage(c);const s=!isNullOrUndefined(e.value)&&h.length>+e.value;const a=!isNullOrUndefined(t.value)&&h.length<+t.value;if(s||a){getMinMaxMessage(s,e.message,t.message);if(!r){setCustomValidity(F[v].message);return F}}}if(m&&!S&&isString(h)){const{value:e,message:t}=getValueAndMessage(m);if(isRegex(e)&&!h.match(e)){F[v]={type:a.pattern,message:t,ref:o,...D(a.pattern,t)};if(!r){setCustomValidity(t);return F}}}if(y)if(isFunction(y)){const e=await y(h,t);const s=getValidateError(e,_);if(s){F[v]={...s,...D(a.validate,s.message)};if(!r){setCustomValidity(s.message);return F}}}else if(isObject(y)){let e={};for(const s in y){if(!isEmptyObject(e)&&!r)break;const a=getValidateError(await y[s](h,t),_,s);if(a){e={...a,...D(s,a.message)};setCustomValidity(a.message);r&&(F[v]=e)}}if(!isEmptyObject(e)){F[v]={ref:_,...e};if(!r)return F}}setCustomValidity(true);return F};var appendAt=(e,t)=>[...e,...convertToArrayPayload(t)];var fillEmptyArray=e=>Array.isArray(e)?e.map((()=>{})):void 0;function insert(e,t,r){return[...e.slice(0,t),...convertToArrayPayload(r),...e.slice(t)]}var moveArrayAt=(e,t,r)=>{if(!Array.isArray(e))return[];isUndefined(e[r])&&(e[r]=void 0);e.splice(r,0,e.splice(t,1)[0]);return e};var prependAt=(e,t)=>[...convertToArrayPayload(t),...convertToArrayPayload(e)];function removeAtIndexes(e,t){let r=0;const s=[...e];for(const e of t){s.splice(e-r,1);r++}return compact(s).length?s:[]}var removeArrayAt=(e,t)=>isUndefined(t)?[]:removeAtIndexes(e,convertToArrayPayload(t).sort(((e,t)=>e-t)));var swapArrayAt=(e,t,r)=>{[e[t],e[r]]=[e[r],e[t]]};function baseGet(e,t){const r=t.slice(0,-1).length;let s=0;while(s<r)e=isUndefined(e)?s++:e[t[s++]];return e}function isEmptyArray(e){for(const t in e)if(e.hasOwnProperty(t)&&!isUndefined(e[t]))return false;return true}function unset(e,t){const r=Array.isArray(t)?t:isKey(t)?[t]:stringToPath(t);const s=r.length===1?e:baseGet(e,r);const a=r.length-1;const n=r[a];s&&delete s[n];a!==0&&(isObject(s)&&isEmptyObject(s)||Array.isArray(s)&&isEmptyArray(s))&&unset(e,r.slice(0,-1));return e}var updateAt=(e,t,r)=>{e[t]=r;return e};
/**
 * A custom hook that exposes convenient methods to perform operations with a list of dynamic inputs that need to be appended, updated, removed etc. • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn) • [Video](https://youtu.be/4MrbfGSFY2A)
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usefieldarray) • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn)
 *
 * @param props - useFieldArray props
 *
 * @returns methods - functions to manipulate with the Field Arrays (dynamic inputs) {@link UseFieldArrayReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, control, handleSubmit, reset, trigger, setError } = useForm({
 *     defaultValues: {
 *       test: []
 *     }
 *   });
 *   const { fields, append } = useFieldArray({
 *     control,
 *     name: "test"
 *   });
 *
 *   return (
 *     <form onSubmit={handleSubmit(data => console.log(data))}>
 *       {fields.map((item, index) => (
 *          <input key={item.id} {...register(`test.${index}.firstName`)}  />
 *       ))}
 *       <button type="button" onClick={() => append({ firstName: "bill" })}>
 *         append
 *       </button>
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */function useFieldArray(t){const r=useFormContext();const{control:a=r.control,name:n,keyName:o="id",shouldUnregister:i}=t;const[l,u]=e.useState(a._getFieldArray(n));const c=e.useRef(a._getFieldArray(n).map(generateId));const d=e.useRef(l);const f=e.useRef(n);const m=e.useRef(false);f.current=n;d.current=l;a._names.array.add(n);t.rules&&a.register(n,t.rules);useSubscribe({next:({values:e,name:t})=>{if(t===f.current||!t){const t=get(e,f.current);if(Array.isArray(t)){u(t);c.current=t.map(generateId)}}},subject:a._subjects.array});const y=e.useCallback((e=>{m.current=true;a._updateFieldArray(n,e)}),[a,n]);const append=(e,t)=>{const r=convertToArrayPayload(cloneObject(e));const s=appendAt(a._getFieldArray(n),r);a._names.focus=getFocusFieldName(n,s.length-1,t);c.current=appendAt(c.current,r.map(generateId));y(s);u(s);a._updateFieldArray(n,s,appendAt,{argA:fillEmptyArray(e)})};const prepend=(e,t)=>{const r=convertToArrayPayload(cloneObject(e));const s=prependAt(a._getFieldArray(n),r);a._names.focus=getFocusFieldName(n,0,t);c.current=prependAt(c.current,r.map(generateId));y(s);u(s);a._updateFieldArray(n,s,prependAt,{argA:fillEmptyArray(e)})};const remove=e=>{const t=removeArrayAt(a._getFieldArray(n),e);c.current=removeArrayAt(c.current,e);y(t);u(t);a._updateFieldArray(n,t,removeArrayAt,{argA:e})};const insert$1=(e,t,r)=>{const s=convertToArrayPayload(cloneObject(t));const o=insert(a._getFieldArray(n),e,s);a._names.focus=getFocusFieldName(n,e,r);c.current=insert(c.current,e,s.map(generateId));y(o);u(o);a._updateFieldArray(n,o,insert,{argA:e,argB:fillEmptyArray(t)})};const swap=(e,t)=>{const r=a._getFieldArray(n);swapArrayAt(r,e,t);swapArrayAt(c.current,e,t);y(r);u(r);a._updateFieldArray(n,r,swapArrayAt,{argA:e,argB:t},false)};const move=(e,t)=>{const r=a._getFieldArray(n);moveArrayAt(r,e,t);moveArrayAt(c.current,e,t);y(r);u(r);a._updateFieldArray(n,r,moveArrayAt,{argA:e,argB:t},false)};const update=(e,t)=>{const r=cloneObject(t);const s=updateAt(a._getFieldArray(n),e,r);c.current=[...s].map(((t,r)=>t&&r!==e?c.current[r]:generateId()));y(s);u([...s]);a._updateFieldArray(n,s,updateAt,{argA:e,argB:r},true,false)};const replace=e=>{const t=convertToArrayPayload(cloneObject(e));c.current=t.map(generateId);y([...t]);u([...t]);a._updateFieldArray(n,[...t],(e=>e),{},true,false)};e.useEffect((()=>{a._state.action=false;isWatched(n,a._names)&&a._subjects.state.next({...a._formState});if(m.current&&(!getValidationModes(a._options.mode).isOnSubmit||a._formState.isSubmitted))if(a._options.resolver)a._executeSchema([n]).then((e=>{const t=get(e.errors,n);const r=get(a._formState.errors,n);if(r?!t&&r.type||t&&(r.type!==t.type||r.message!==t.message):t&&t.type){t?set(a._formState.errors,n,t):unset(a._formState.errors,n);a._subjects.state.next({errors:a._formState.errors})}}));else{const e=get(a._fields,n);!e||!e._f||getValidationModes(a._options.reValidateMode).isOnSubmit&&getValidationModes(a._options.mode).isOnSubmit||validateField(e,a._formValues,a._options.criteriaMode===s.all,a._options.shouldUseNativeValidation,true).then((e=>!isEmptyObject(e)&&a._subjects.state.next({errors:updateFieldArrayRootError(a._formState.errors,e,n)})))}a._subjects.values.next({name:n,values:{...a._formValues}});a._names.focus&&iterateFieldsByAction(a._fields,((e,t)=>{if(a._names.focus&&t.startsWith(a._names.focus)&&e.focus){e.focus();return 1}}));a._names.focus="";a._updateValid();m.current=false}),[l,n,a]);e.useEffect((()=>{!get(a._formValues,n)&&a._updateFieldArray(n);return()=>{(a._options.shouldUnregister||i)&&a.unregister(n)}}),[n,a,o,i]);return{swap:e.useCallback(swap,[y,n,a]),move:e.useCallback(move,[y,n,a]),prepend:e.useCallback(prepend,[y,n,a]),append:e.useCallback(append,[y,n,a]),remove:e.useCallback(remove,[y,n,a]),insert:e.useCallback(insert$1,[y,n,a]),update:e.useCallback(update,[y,n,a]),replace:e.useCallback(replace,[y,n,a]),fields:e.useMemo((()=>l.map(((e,t)=>({...e,[o]:c.current[t]||generateId()})))),[l,o])}}var createSubject=()=>{let e=[];const next=t=>{for(const r of e)r.next&&r.next(t)};const subscribe=t=>{e.push(t);return{unsubscribe:()=>{e=e.filter((e=>e!==t))}}};const unsubscribe=()=>{e=[]};return{get observers(){return e},next:next,subscribe:subscribe,unsubscribe:unsubscribe}};var isPrimitive=e=>isNullOrUndefined(e)||!isObjectType(e);function deepEqual(e,t){if(isPrimitive(e)||isPrimitive(t))return e===t;if(isDateObject(e)&&isDateObject(t))return e.getTime()===t.getTime();const r=Object.keys(e);const s=Object.keys(t);if(r.length!==s.length)return false;for(const a of r){const r=e[a];if(!s.includes(a))return false;if(a!=="ref"){const e=t[a];if(isDateObject(r)&&isDateObject(e)||isObject(r)&&isObject(e)||Array.isArray(r)&&Array.isArray(e)?!deepEqual(r,e):r!==e)return false}}return true}var isMultipleSelect=e=>e.type==="select-multiple";var isRadioOrCheckbox=e=>isRadioInput(e)||isCheckBoxInput(e);var live=e=>isHTMLElement(e)&&e.isConnected;var objectHasTruthyValue=e=>isObject(e)&&Object.values(e).some((e=>e));var objectHasFunction=e=>{for(const t in e)if(isFunction(e[t]))return true;return false};function markFieldsDirty(e,t={}){const r=Array.isArray(e);if(isObject(e)||r)for(const r in e)if(Array.isArray(e[r])||isObject(e[r])&&!objectHasFunction(e[r])){t[r]=Array.isArray(e[r])?[]:{};markFieldsDirty(e[r],t[r])}else isNullOrUndefined(e[r])||(t[r]=true);return t}function getDirtyFieldsFromDefaultValues(e,t,r){const s=Array.isArray(e);if(isObject(e)||s)for(const s in e)Array.isArray(e[s])||isObject(e[s])&&!objectHasFunction(e[s])?isUndefined(t)||isPrimitive(r[s])?r[s]=Array.isArray(e[s])?markFieldsDirty(e[s],[]):{...markFieldsDirty(e[s])}:getDirtyFieldsFromDefaultValues(e[s],isNullOrUndefined(t)?{}:t[s],r[s]):r[s]=!deepEqual(e[s],t[s]);return r}var getDirtyFields=(e,t)=>getDirtyFieldsFromDefaultValues(e,t,markFieldsDirty(t));var getFieldValueAs=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:s})=>isUndefined(e)?e:t?e===""?NaN:e?+e:e:r&&isString(e)?new Date(e):s?s(e):e;function getFieldValue(e){const t=e.ref;if(!(e.refs?e.refs.every((e=>e.disabled)):t.disabled))return isFileInput(t)?t.files:isRadioInput(t)?getRadioValue(e.refs).value:isMultipleSelect(t)?[...t.selectedOptions].map((({value:e})=>e)):isCheckBoxInput(t)?getCheckboxValue(e.refs).value:getFieldValueAs(isUndefined(t.value)?e.ref.value:t.value,e)}var getResolverOptions=(e,t,r,s)=>{const a={};for(const r of e){const e=get(t,r);e&&set(a,r,e._f)}return{criteriaMode:r,names:[...e],fields:a,shouldUseNativeValidation:s}};var getRuleValue=e=>isUndefined(e)?e:isRegex(e)?e.source:isObject(e)?isRegex(e.value)?e.value.source:e.value:e;var hasValidation=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function schemaErrorLookup(e,t,r){const s=get(e,r);if(s||isKey(r))return{error:s,name:r};const a=r.split(".");while(a.length){const s=a.join(".");const n=get(t,s);const o=get(e,s);if(n&&!Array.isArray(n)&&r!==s)return{name:r};if(o&&o.type)return{name:s,error:o};a.pop()}return{name:r}}var skipValidation=(e,t,r,s,a)=>!a.isOnAll&&(!r&&a.isOnTouch?!(t||e):(r?s.isOnBlur:a.isOnBlur)?!e:!(r?s.isOnChange:a.isOnChange)||e);var unsetEmptyArray=(e,t)=>!compact(get(e,t)).length&&unset(e,t);const c={mode:s.onSubmit,reValidateMode:s.onChange,shouldFocusError:true};function createFormControl(e={}){let a={...c,...e};let n={submitCount:0,isDirty:false,isLoading:isFunction(a.defaultValues),isValidating:false,isSubmitted:false,isSubmitting:false,isSubmitSuccessful:false,isValid:false,touchedFields:{},dirtyFields:{},validatingFields:{},errors:a.errors||{},disabled:a.disabled||false};let o={};let i=(isObject(a.defaultValues)||isObject(a.values))&&cloneObject(a.defaultValues||a.values)||{};let l=a.shouldUnregister?{}:cloneObject(i);let u={action:false,mount:false,watch:false};let d={mount:new Set,unMount:new Set,array:new Set,watch:new Set};let f;let m=0;const y={isDirty:false,dirtyFields:false,validatingFields:false,touchedFields:false,isValidating:false,isValid:false,errors:false};const v={values:createSubject(),array:createSubject(),state:createSubject()};const g=getValidationModes(a.mode);const p=getValidationModes(a.reValidateMode);const b=a.criteriaMode===s.all;const debounce=e=>t=>{clearTimeout(m);m=setTimeout(e,t)};const _updateValid=async e=>{if(y.isValid||e){const e=a.resolver?isEmptyObject((await _executeSchema()).errors):await executeBuiltInValidation(o,true);e!==n.isValid&&v.state.next({isValid:e})}};const _updateIsValidating=(e,t)=>{if(y.isValidating||y.validatingFields){t.forEach((t=>{set(n.validatingFields,t,e)}));n.isValidating=objectHasTruthyValue(n.validatingFields);v.state.next({validatingFields:n.validatingFields,isValidating:n.isValidating})}};const _updateFieldArray=(e,t=[],r,s,a=true,c=true)=>{if(s&&r){u.action=true;if(c&&Array.isArray(get(o,e))){const t=r(get(o,e),s.argA,s.argB);a&&set(o,e,t)}if(c&&Array.isArray(get(n.errors,e))){const t=r(get(n.errors,e),s.argA,s.argB);a&&set(n.errors,e,t);unsetEmptyArray(n.errors,e)}if(y.touchedFields&&c&&Array.isArray(get(n.touchedFields,e))){const t=r(get(n.touchedFields,e),s.argA,s.argB);a&&set(n.touchedFields,e,t)}y.dirtyFields&&(n.dirtyFields=getDirtyFields(i,l));v.state.next({name:e,isDirty:_getDirty(e,t),dirtyFields:n.dirtyFields,errors:n.errors,isValid:n.isValid})}else set(l,e,t)};const updateErrors=(e,t)=>{set(n.errors,e,t);v.state.next({errors:n.errors})};const _setErrors=e=>{n.errors=e;v.state.next({errors:n.errors,isValid:false})};const updateValidAndValue=(e,t,r,s)=>{const a=get(o,e);if(a){const n=get(l,e,isUndefined(r)?get(i,e):r);isUndefined(n)||s&&s.defaultChecked||t?set(l,e,t?n:getFieldValue(a._f)):setFieldValue(e,n);u.mount&&_updateValid()}};const updateTouchAndDirty=(e,t,r,s,a)=>{let l=false;let u=false;const c={name:e};const d=!!(get(o,e)&&get(o,e)._f.disabled);if(!r||s){if(y.isDirty){u=n.isDirty;n.isDirty=c.isDirty=_getDirty();l=u!==c.isDirty}const r=d||deepEqual(get(i,e),t);u=!!(!d&&get(n.dirtyFields,e));r||d?unset(n.dirtyFields,e):set(n.dirtyFields,e,true);c.dirtyFields=n.dirtyFields;l=l||y.dirtyFields&&u!==!r}if(r){const t=get(n.touchedFields,e);if(!t){set(n.touchedFields,e,r);c.touchedFields=n.touchedFields;l=l||y.touchedFields&&t!==r}}l&&a&&v.state.next(c);return l?c:{}};const shouldRenderByError=(t,r,s,a)=>{const o=get(n.errors,t);const i=y.isValid&&isBoolean(r)&&n.isValid!==r;if(e.delayError&&s){f=debounce((()=>updateErrors(t,s)));f(e.delayError)}else{clearTimeout(m);f=null;s?set(n.errors,t,s):unset(n.errors,t)}if((s?!deepEqual(o,s):o)||!isEmptyObject(a)||i){const e={...a,...i&&isBoolean(r)?{isValid:r}:{},errors:n.errors,name:t};n={...n,...e};v.state.next(e)}_updateIsValidating(false,Object.keys(n.validatingFields).filter((e=>e===t)))};const _executeSchema=async e=>a.resolver(l,a.context,getResolverOptions(e||d.mount,o,a.criteriaMode,a.shouldUseNativeValidation));const executeSchemaAndUpdateState=async e=>{const{errors:t}=await _executeSchema(e);if(e)for(const r of e){const e=get(t,r);e?set(n.errors,r,e):unset(n.errors,r)}else n.errors=t;return t};const executeBuiltInValidation=async(e,t,r={valid:true})=>{for(const s in e){const o=e[s];if(o){const{_f:e,...s}=o;if(e){const s=d.array.has(e.name);const i=await validateField(o,l,b,a.shouldUseNativeValidation&&!t,s);if(i[e.name]){r.valid=false;if(t)break}!t&&(get(i,e.name)?s?updateFieldArrayRootError(n.errors,i,e.name):set(n.errors,e.name,i[e.name]):unset(n.errors,e.name))}s&&await executeBuiltInValidation(s,t,r)}}return r.valid};const _removeUnmounted=()=>{for(const e of d.unMount){const t=get(o,e);t&&(t._f.refs?t._f.refs.every((e=>!live(e))):!live(t._f.ref))&&unregister(e)}d.unMount=new Set};const _getDirty=(e,t)=>(e&&t&&set(l,e,t),!deepEqual(getValues(),i));const _getWatch=(e,t,r)=>generateWatchOutput(e,d,{...u.mount?l:isUndefined(t)?i:isString(e)?{[e]:t}:t},r,t);const _getFieldArray=t=>compact(get(u.mount?l:i,t,e.shouldUnregister?get(i,t,[]):[]));const setFieldValue=(e,t,r={})=>{const s=get(o,e);let a=t;if(s){const r=s._f;if(r){!r.disabled&&set(l,e,getFieldValueAs(t,r));a=isHTMLElement(r.ref)&&isNullOrUndefined(t)?"":t;if(isMultipleSelect(r.ref))[...r.ref.options].forEach((e=>e.selected=a.includes(e.value)));else if(r.refs)isCheckBoxInput(r.ref)?r.refs.length>1?r.refs.forEach((e=>(!e.defaultChecked||!e.disabled)&&(e.checked=Array.isArray(a)?!!a.find((t=>t===e.value)):a===e.value))):r.refs[0]&&(r.refs[0].checked=!!a):r.refs.forEach((e=>e.checked=e.value===a));else if(isFileInput(r.ref))r.ref.value="";else{r.ref.value=a;r.ref.type||v.values.next({name:e,values:{...l}})}}}(r.shouldDirty||r.shouldTouch)&&updateTouchAndDirty(e,a,r.shouldTouch,r.shouldDirty,true);r.shouldValidate&&trigger(e)};const setValues=(e,t,r)=>{for(const s in t){const a=t[s];const n=`${e}.${s}`;const i=get(o,n);!d.array.has(e)&&isPrimitive(a)&&(!i||i._f)||isDateObject(a)?setFieldValue(n,a,r):setValues(n,a,r)}};const setValue=(e,t,r={})=>{const s=get(o,e);const a=d.array.has(e);const c=cloneObject(t);set(l,e,c);if(a){v.array.next({name:e,values:{...l}});(y.isDirty||y.dirtyFields)&&r.shouldDirty&&v.state.next({name:e,dirtyFields:getDirtyFields(i,l),isDirty:_getDirty(e,c)})}else!s||s._f||isNullOrUndefined(c)?setFieldValue(e,c,r):setValues(e,c,r);isWatched(e,d)&&v.state.next({...n});v.values.next({name:u.mount?e:void 0,values:{...l}})};const onChange=async e=>{const t=e.target;let s=t.name;let i=true;const u=get(o,s);const getCurrentFieldValue=()=>t.type?getFieldValue(u._f):getEventValue(e);const _updateIsFieldValueUpdated=e=>{i=Number.isNaN(e)||e===get(l,s,e)};if(u){let t;let c;const m=getCurrentFieldValue();const h=e.type===r.BLUR||e.type===r.FOCUS_OUT;const _=!hasValidation(u._f)&&!a.resolver&&!get(n.errors,s)&&!u._f.deps||skipValidation(h,get(n.touchedFields,s),n.isSubmitted,p,g);const F=isWatched(s,d,h);set(l,s,m);if(h){u._f.onBlur&&u._f.onBlur(e);f&&f(0)}else u._f.onChange&&u._f.onChange(e);const V=updateTouchAndDirty(s,m,h,false);const A=!isEmptyObject(V)||F;!h&&v.values.next({name:s,type:e.type,values:{...l}});if(_){y.isValid&&_updateValid();return A&&v.state.next({name:s,...F?{}:V})}!h&&F&&v.state.next({...n});_updateIsValidating(true,[s]);if(a.resolver){const{errors:e}=await _executeSchema([s]);_updateIsFieldValueUpdated(m);if(i){const r=schemaErrorLookup(n.errors,o,s);const a=schemaErrorLookup(e,o,r.name||s);t=a.error;s=a.name;c=isEmptyObject(e)}}else{t=(await validateField(u,l,b,a.shouldUseNativeValidation))[s];_updateIsFieldValueUpdated(m);i&&(t?c=false:y.isValid&&(c=await executeBuiltInValidation(o,true)))}if(i){u._f.deps&&trigger(u._f.deps);shouldRenderByError(s,c,t,V)}}};const _focusInput=(e,t)=>{if(get(n.errors,t)&&e.focus){e.focus();return 1}};const trigger=async(e,t={})=>{let r;let s;const i=convertToArrayPayload(e);_updateIsValidating(true,i);if(a.resolver){const t=await executeSchemaAndUpdateState(isUndefined(e)?e:i);r=isEmptyObject(t);s=e?!i.some((e=>get(t,e))):r}else if(e){s=(await Promise.all(i.map((async e=>{const t=get(o,e);return await executeBuiltInValidation(t&&t._f?{[e]:t}:t)})))).every(Boolean);!(!s&&!n.isValid)&&_updateValid()}else s=r=await executeBuiltInValidation(o);v.state.next({...!isString(e)||y.isValid&&r!==n.isValid?{}:{name:e},...a.resolver||!e?{isValid:r}:{},errors:n.errors,isValidating:false});t.shouldFocus&&!s&&iterateFieldsByAction(o,_focusInput,e?i:d.mount);return s};const getValues=e=>{const t={...i,...u.mount?l:{}};return isUndefined(e)?t:isString(e)?get(t,e):e.map((e=>get(t,e)))};const getFieldState=(e,t)=>({invalid:!!get((t||n).errors,e),isDirty:!!get((t||n).dirtyFields,e),isTouched:!!get((t||n).touchedFields,e),isValidating:!!get((t||n).validatingFields,e),error:get((t||n).errors,e)});const clearErrors=e=>{e&&convertToArrayPayload(e).forEach((e=>unset(n.errors,e)));v.state.next({errors:e?n.errors:{}})};const setError=(e,t,r)=>{const s=(get(o,e,{_f:{}})._f||{}).ref;set(n.errors,e,{...t,ref:s});v.state.next({name:e,errors:n.errors,isValid:false});r&&r.shouldFocus&&s&&s.focus&&s.focus()};const watch=(e,t)=>isFunction(e)?v.values.subscribe({next:r=>e(_getWatch(void 0,t),r)}):_getWatch(e,t,true);const unregister=(e,t={})=>{for(const r of e?convertToArrayPayload(e):d.mount){d.mount.delete(r);d.array.delete(r);if(!t.keepValue){unset(o,r);unset(l,r)}!t.keepError&&unset(n.errors,r);!t.keepDirty&&unset(n.dirtyFields,r);!t.keepTouched&&unset(n.touchedFields,r);!t.keepIsValidating&&unset(n.validatingFields,r);!a.shouldUnregister&&!t.keepDefaultValue&&unset(i,r)}v.values.next({values:{...l}});v.state.next({...n,...t.keepDirty?{isDirty:_getDirty()}:{}});!t.keepIsValid&&_updateValid()};const _updateDisabledField=({disabled:e,name:t,field:r,fields:s,value:a})=>{if(isBoolean(e)){const n=e?void 0:isUndefined(a)?getFieldValue(r?r._f:get(s,t)._f):a;set(l,t,n);updateTouchAndDirty(t,n,false,false,true)}};const register=(e,t={})=>{let r=get(o,e);const s=isBoolean(t.disabled);set(o,e,{...r||{},_f:{...r&&r._f?r._f:{ref:{name:e}},name:e,mount:true,...t}});d.mount.add(e);r?_updateDisabledField({field:r,disabled:t.disabled,name:e,value:t.value}):updateValidAndValue(e,true,t.value);return{...s?{disabled:t.disabled}:{},...a.progressive?{required:!!t.required,min:getRuleValue(t.min),max:getRuleValue(t.max),minLength:getRuleValue(t.minLength),maxLength:getRuleValue(t.maxLength),pattern:getRuleValue(t.pattern)}:{},name:e,onChange:onChange,onBlur:onChange,ref:s=>{if(s){register(e,t);r=get(o,e);const a=isUndefined(s.value)&&s.querySelectorAll&&s.querySelectorAll("input,select,textarea")[0]||s;const n=isRadioOrCheckbox(a);const l=r._f.refs||[];if(n?l.find((e=>e===a)):a===r._f.ref)return;set(o,e,{_f:{...r._f,...n?{refs:[...l.filter(live),a,...Array.isArray(get(i,e))?[{}]:[]],ref:{type:a.type,name:e}}:{ref:a}}});updateValidAndValue(e,false,void 0,a)}else{r=get(o,e,{});r._f&&(r._f.mount=false);(a.shouldUnregister||t.shouldUnregister)&&!(isNameInFieldArray(d.array,e)&&u.action)&&d.unMount.add(e)}}}};const _focusError=()=>a.shouldFocusError&&iterateFieldsByAction(o,_focusInput,d.mount);const _disableForm=e=>{if(isBoolean(e)){v.state.next({disabled:e});iterateFieldsByAction(o,((t,r)=>{let s=e;const a=get(o,r);a&&isBoolean(a._f.disabled)&&(s||(s=a._f.disabled));t.disabled=s}),0,false)}};const handleSubmit=(e,t)=>async r=>{let s;if(r){r.preventDefault&&r.preventDefault();r.persist&&r.persist()}let i=cloneObject(l);v.state.next({isSubmitting:true});if(a.resolver){const{errors:e,values:t}=await _executeSchema();n.errors=e;i=t}else await executeBuiltInValidation(o);unset(n.errors,"root");if(isEmptyObject(n.errors)){v.state.next({errors:{}});try{await e(i,r)}catch(e){s=e}}else{t&&await t({...n.errors},r);_focusError();setTimeout(_focusError)}v.state.next({isSubmitted:true,isSubmitting:false,isSubmitSuccessful:isEmptyObject(n.errors)&&!s,submitCount:n.submitCount+1,errors:n.errors});if(s)throw s};const resetField=(e,t={})=>{if(get(o,e)){if(isUndefined(t.defaultValue))setValue(e,cloneObject(get(i,e)));else{setValue(e,t.defaultValue);set(i,e,cloneObject(t.defaultValue))}t.keepTouched||unset(n.touchedFields,e);if(!t.keepDirty){unset(n.dirtyFields,e);n.isDirty=t.defaultValue?_getDirty(e,cloneObject(get(i,e))):_getDirty()}if(!t.keepError){unset(n.errors,e);y.isValid&&_updateValid()}v.state.next({...n})}};const _reset=(r,s={})=>{const a=r?cloneObject(r):i;const c=cloneObject(a);const f=isEmptyObject(r);const m=f?i:c;s.keepDefaultValues||(i=a);if(!s.keepValues){if(s.keepDirtyValues)for(const e of d.mount)get(n.dirtyFields,e)?set(m,e,get(l,e)):setValue(e,get(m,e));else{if(t&&isUndefined(r))for(const e of d.mount){const t=get(o,e);if(t&&t._f){const e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;if(isHTMLElement(e)){const t=e.closest("form");if(t){t.reset();break}}}}o={}}l=e.shouldUnregister?s.keepDefaultValues?cloneObject(i):{}:cloneObject(m);v.array.next({values:{...m}});v.values.next({values:{...m}})}d={mount:s.keepDirtyValues?d.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:false,focus:""};u.mount=!y.isValid||!!s.keepIsValid||!!s.keepDirtyValues;u.watch=!!e.shouldUnregister;v.state.next({submitCount:s.keepSubmitCount?n.submitCount:0,isDirty:!f&&(s.keepDirty?n.isDirty:!!(s.keepDefaultValues&&!deepEqual(r,i))),isSubmitted:!!s.keepIsSubmitted&&n.isSubmitted,dirtyFields:f?[]:s.keepDirtyValues?s.keepDefaultValues&&l?getDirtyFields(i,l):n.dirtyFields:s.keepDefaultValues&&r?getDirtyFields(i,r):{},touchedFields:s.keepTouched?n.touchedFields:{},errors:s.keepErrors?n.errors:{},isSubmitSuccessful:!!s.keepIsSubmitSuccessful&&n.isSubmitSuccessful,isSubmitting:false})};const reset=(e,t)=>_reset(isFunction(e)?e(l):e,t);const setFocus=(e,t={})=>{const r=get(o,e);const s=r&&r._f;if(s){const e=s.refs?s.refs[0]:s.ref;if(e.focus){e.focus();t.shouldSelect&&e.select()}}};const _updateFormState=e=>{n={...n,...e}};const _resetDefaultValues=()=>isFunction(a.defaultValues)&&a.defaultValues().then((e=>{reset(e,a.resetOptions);v.state.next({isLoading:false})}));return{control:{register:register,unregister:unregister,getFieldState:getFieldState,handleSubmit:handleSubmit,setError:setError,_executeSchema:_executeSchema,_getWatch:_getWatch,_getDirty:_getDirty,_updateValid:_updateValid,_removeUnmounted:_removeUnmounted,_updateFieldArray:_updateFieldArray,_updateDisabledField:_updateDisabledField,_getFieldArray:_getFieldArray,_reset:_reset,_resetDefaultValues:_resetDefaultValues,_updateFormState:_updateFormState,_disableForm:_disableForm,_subjects:v,_proxyFormState:y,_setErrors:_setErrors,get _fields(){return o},get _formValues(){return l},get _state(){return u},set _state(e){u=e},get _defaultValues(){return i},get _names(){return d},set _names(e){d=e},get _formState(){return n},set _formState(e){n=e},get _options(){return a},set _options(e){a={...a,...e}}},trigger:trigger,register:register,handleSubmit:handleSubmit,watch:watch,setValue:setValue,getValues:getValues,reset:reset,resetField:resetField,clearErrors:clearErrors,unregister:unregister,setError:setError,setFocus:setFocus,getFieldState:getFieldState}}
/**
 * Custom hook to manage the entire form.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useform) • [Demo](https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm) • [Video](https://www.youtube.com/watch?v=RkXv4AXXC_4)
 *
 * @param props - form configuration and validation parameters.
 *
 * @returns methods - individual functions to manage the form state. {@link UseFormReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, watch, formState: { errors } } = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   console.log(watch("example"));
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input defaultValue="test" {...register("example")} />
 *       <input {...register("exampleRequired", { required: true })} />
 *       {errors.exampleRequired && <span>This field is required</span>}
 *       <button>Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */function useForm(t={}){const r=e.useRef();const s=e.useRef();const[a,n]=e.useState({isDirty:false,isValidating:false,isLoading:isFunction(t.defaultValues),isSubmitted:false,isSubmitting:false,isSubmitSuccessful:false,isValid:false,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:t.errors||{},disabled:t.disabled||false,defaultValues:isFunction(t.defaultValues)?void 0:t.defaultValues});r.current||(r.current={...createFormControl(t),formState:a});const o=r.current.control;o._options=t;useSubscribe({subject:o._subjects.state,next:e=>{shouldRenderFormState(e,o._proxyFormState,o._updateFormState,true)&&n({...o._formState})}});e.useEffect((()=>o._disableForm(t.disabled)),[o,t.disabled]);e.useEffect((()=>{if(o._proxyFormState.isDirty){const e=o._getDirty();e!==a.isDirty&&o._subjects.state.next({isDirty:e})}}),[o,a.isDirty]);e.useEffect((()=>{if(t.values&&!deepEqual(t.values,s.current)){o._reset(t.values,o._options.resetOptions);s.current=t.values;n((e=>({...e})))}else o._resetDefaultValues()}),[t.values,o]);e.useEffect((()=>{t.errors&&o._setErrors(t.errors)}),[t.errors,o]);e.useEffect((()=>{if(!o._state.mount){o._updateValid();o._state.mount=true}if(o._state.watch){o._state.watch=false;o._subjects.state.next({...o._formState})}o._removeUnmounted()}));e.useEffect((()=>{t.shouldUnregister&&o._subjects.values.next({values:o._getWatch()})}),[t.shouldUnregister,o]);r.current.formState=getProxyFormState(a,o);return r.current}export{Controller,Form,FormProvider,appendErrors,get,set,useController,useFieldArray,useForm,useFormContext,useFormState,useWatch};

