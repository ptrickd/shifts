var e="-ms-";var r="-moz-";var a="-webkit-";var c="comm";var t="rule";var n="decl";var s="@page";var i="@media";var l="@import";var u="@charset";var o="@viewport";var p="@supports";var f="@document";var h="@namespace";var d="@keyframes";var v="@font-face";var m="@counter-style";var b="@font-feature-values";var k="@layer";
/**
 * @param {number}
 * @return {number}
 */var w=Math.abs;
/**
 * @param {number}
 * @return {string}
 */var x=String.fromCharCode;
/**
 * @param {object}
 * @return {object}
 */var g=Object.assign;
/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */function hash(e,r){return 45^charat(e,0)?(((r<<2^charat(e,0))<<2^charat(e,1))<<2^charat(e,2))<<2^charat(e,3):0}
/**
 * @param {string} value
 * @return {string}
 */function trim(e){return e.trim()}
/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */function match(e,r){return(e=r.exec(e))?e[0]:e}
/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */function replace(e,r,a){return e.replace(r,a)}
/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */function indexof(e,r){return e.indexOf(r)}
/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */function charat(e,r){return 0|e.charCodeAt(r)}
/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */function substr(e,r,a){return e.slice(r,a)}
/**
 * @param {string} value
 * @return {number}
 */function strlen(e){return e.length}
/**
 * @param {any[]} value
 * @return {number}
 */function sizeof(e){return e.length}
/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */function append(e,r){return r.push(e),e}
/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */function combine(e,r){return e.map(r).join("")}var $=1;var z=1;var y=0;var j=0;var C=0;var O="";
/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */function node(e,r,a,c,t,n,s){return{value:e,root:r,parent:a,type:c,props:t,children:n,line:$,column:z,length:s,return:""}}
/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */function copy(e,r){return g(node("",null,null,"",null,null,0),e,{length:-e.length},r)}function char(){return C}function prev(){C=j>0?charat(O,--j):0;(z--,10===C)&&(z=1,$--);return C}function next(){C=j<y?charat(O,j++):0;(z++,10===C)&&(z=1,$++);return C}function peek(){return charat(O,j)}function caret(){return j}
/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */function slice(e,r){return substr(O,e,r)}
/**
 * @param {number} type
 * @return {number}
 */function token(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}
/**
 * @param {string} value
 * @return {any[]}
 */function alloc(e){return $=z=1,y=strlen(O=e),j=0,[]}
/**
 * @param {any} value
 * @return {any}
 */function dealloc(e){return O="",e}
/**
 * @param {number} type
 * @return {string}
 */function delimit(e){return trim(slice(j-1,delimiter(91===e?e+2:40===e?e+1:e)))}
/**
 * @param {string} value
 * @return {string[]}
 */function tokenize(e){return dealloc(tokenizer(alloc(e)))}
/**
 * @param {number} type
 * @return {string}
 */function whitespace(e){while(C=peek()){if(!(C<33))break;next()}return token(e)>2||token(C)>3?"":" "}
/**
 * @param {string[]} children
 * @return {string[]}
 */function tokenizer(e){while(next())switch(token(C)){case 0:append(identifier(j-1),e);break;case 2:append(delimit(C),e);break;default:append(x(C),e)}return e}
/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */function escaping(e,r){while(--r&&next())if(C<48||C>102||C>57&&C<65||C>70&&C<97)break;return slice(e,caret()+(r<6&&32==peek()&&32==next()))}
/**
 * @param {number} type
 * @return {number}
 */function delimiter(e){while(next())switch(C){case e:return j;case 34:case 39:34!==e&&39!==e&&delimiter(C);break;case 40:41===e&&delimiter(e);break;case 92:next();break}return j}
/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */function commenter(e,r){while(next()){if(e+C===57)break;if(e+C===84&&47===peek())break}return"/*"+slice(r,j-1)+"*"+x(47===e?e:next())}
/**
 * @param {number} index
 * @return {string}
 */function identifier(e){while(!token(peek()))next();return slice(e,j)}
/**
 * @param {string} value
 * @return {object[]}
 */function compile(e){return dealloc(parse("",null,null,null,[""],e=alloc(e),0,[0],e))}
/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */function parse(e,r,a,c,t,n,s,i,l){var u=0;var o=0;var p=s;var f=0;var h=0;var d=0;var v=1;var m=1;var b=1;var k=0;var w="";var g=t;var $=n;var z=c;var y=w;while(m)switch(d=k,k=next()){case 40:if(108!=d&&58==charat(y,p-1)){-1!=indexof(y+=replace(delimit(k),"&","&\f"),"&\f")&&(b=-1);break}case 34:case 39:case 91:y+=delimit(k);break;case 9:case 10:case 13:case 32:y+=whitespace(d);break;case 92:y+=escaping(caret()-1,7);continue;case 47:switch(peek()){case 42:case 47:append(comment(commenter(next(),caret()),r,a),l);break;default:y+="/"}break;case 123*v:i[u++]=strlen(y)*b;case 125*v:case 59:case 0:switch(k){case 0:case 125:m=0;case 59+o:-1==b&&(y=replace(y,/\f/g,""));h>0&&strlen(y)-p&&append(h>32?declaration(y+";",c,a,p-1):declaration(replace(y," ","")+";",c,a,p-2),l);break;case 59:y+=";";default:append(z=ruleset(y,r,a,u,o,t,i,w,g=[],$=[],p),n);if(123===k)if(0===o)parse(y,r,z,z,g,n,p,i,$);else switch(99===f&&110===charat(y,3)?100:f){case 100:case 108:case 109:case 115:parse(e,z,z,c&&append(ruleset(e,z,z,0,0,t,i,w,t,g=[],p),$),t,$,p,i,c?g:$);break;default:parse(y,z,z,z,[""],$,0,i,$)}}u=o=h=0,v=b=1,w=y="",p=s;break;case 58:p=1+strlen(y),h=d;default:if(v<1)if(123==k)--v;else if(125==k&&0==v++&&125==prev())continue;switch(y+=x(k),k*v){case 38:b=o>0?1:(y+="\f",-1);break;case 44:i[u++]=(strlen(y)-1)*b,b=1;break;case 64:45===peek()&&(y+=delimit(next()));f=peek(),o=p=strlen(w=y+=identifier(caret())),k++;break;case 45:45===d&&2==strlen(y)&&(v=0)}}return n}
/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */function ruleset(e,r,a,c,n,s,i,l,u,o,p){var f=n-1;var h=0===n?s:[""];var d=sizeof(h);for(var v=0,m=0,b=0;v<c;++v)for(var k=0,x=substr(e,f+1,f=w(m=i[v])),g=e;k<d;++k)(g=trim(m>0?h[k]+" "+x:replace(x,/&\f/g,h[k])))&&(u[b++]=g);return node(e,r,a,0===n?t:l,u,o,p)}
/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */function comment(e,r,a){return node(e,r,a,c,x(char()),substr(e,2,-2),0)}
/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */function declaration(e,r,a,c){return node(e,r,a,n,substr(e,0,c),substr(e,c+1,-1),c)}
/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */function prefix(c,t,n){switch(hash(c,t)){case 5103:return a+"print-"+c+c;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return a+c+c;case 4789:return r+c+c;case 5349:case 4246:case 4810:case 6968:case 2756:return a+c+r+c+e+c+c;case 5936:switch(charat(c,t+11)){case 114:return a+c+e+replace(c,/[svh]\w+-[tblr]{2}/,"tb")+c;case 108:return a+c+e+replace(c,/[svh]\w+-[tblr]{2}/,"tb-rl")+c;case 45:return a+c+e+replace(c,/[svh]\w+-[tblr]{2}/,"lr")+c}case 6828:case 4268:case 2903:return a+c+e+c+c;case 6165:return a+c+e+"flex-"+c+c;case 5187:return a+c+replace(c,/(\w+).+(:[^]+)/,a+"box-$1$2"+e+"flex-$1$2")+c;case 5443:return a+c+e+"flex-item-"+replace(c,/flex-|-self/g,"")+(match(c,/flex-|baseline/)?"":e+"grid-row-"+replace(c,/flex-|-self/g,""))+c;case 4675:return a+c+e+"flex-line-pack"+replace(c,/align-content|flex-|-self/g,"")+c;case 5548:return a+c+e+replace(c,"shrink","negative")+c;case 5292:return a+c+e+replace(c,"basis","preferred-size")+c;case 6060:return a+"box-"+replace(c,"-grow","")+a+c+e+replace(c,"grow","positive")+c;case 4554:return a+replace(c,/([^-])(transform)/g,"$1"+a+"$2")+c;case 6187:return replace(replace(replace(c,/(zoom-|grab)/,a+"$1"),/(image-set)/,a+"$1"),c,"")+c;case 5495:case 3959:return replace(c,/(image-set\([^]*)/,a+"$1$`$1");case 4968:return replace(replace(c,/(.+:)(flex-)?(.*)/,a+"box-pack:$3"+e+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+a+c+c;case 4200:if(!match(c,/flex-|baseline/))return e+"grid-column-align"+substr(c,t)+c;break;case 2592:case 3360:return e+replace(c,"template-","")+c;case 4384:case 3616:return n&&n.some((function(e,r){return t=r,match(e.props,/grid-\w+-end/)}))?~indexof(c+(n=n[t].value),"span")?c:e+replace(c,"-start","")+c+e+"grid-row-span:"+(~indexof(n,"span")?match(n,/\d+/):+match(n,/\d+/)-+match(c,/\d+/))+";":e+replace(c,"-start","")+c;case 4896:case 4128:return n&&n.some((function(e){return match(e.props,/grid-\w+-start/)}))?c:e+replace(replace(c,"-end","-span"),"span ","")+c;case 4095:case 3583:case 4068:case 2532:return replace(c,/(.+)-inline(.+)/,a+"$1$2")+c;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(strlen(c)-1-t>6)switch(charat(c,t+1)){case 109:if(45!==charat(c,t+4))break;case 102:return replace(c,/(.+:)(.+)-([^]+)/,"$1"+a+"$2-$3$1"+r+(108==charat(c,t+3)?"$3":"$2-$3"))+c;case 115:return~indexof(c,"stretch")?prefix(replace(c,"stretch","fill-available"),t,n)+c:c}break;case 5152:case 5920:return replace(c,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,(function(r,a,t,n,s,i,l){return e+a+":"+t+l+(n?e+a+"-span:"+(s?i:+i-+t)+l:"")+c}));case 4949:if(121===charat(c,t+6))return replace(c,":",":"+a)+c;break;case 6444:switch(charat(c,45===charat(c,14)?18:11)){case 120:return replace(c,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+a+(45===charat(c,14)?"inline-":"")+"box$3$1"+a+"$2$3$1"+e+"$2box$3")+c;case 100:return replace(c,":",":"+e)+c}break;case 5719:case 2647:case 2135:case 3927:case 2391:return replace(c,"scroll-","scroll-snap-")+c}return c}
/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */function serialize(e,r){var a="";var c=sizeof(e);for(var t=0;t<c;t++)a+=r(e[t],t,e,r)||"";return a}
/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */function stringify(e,r,a,s){switch(e.type){case k:if(e.children.length)break;case l:case n:return e.return=e.return||e.value;case c:return"";case d:return e.return=e.value+"{"+serialize(e.children,s)+"}";case t:e.value=e.props.join(",")}return strlen(a=serialize(e.children,s))?e.return=e.value+"{"+a+"}":""}
/**
 * @param {function[]} collection
 * @return {function}
 */function middleware(e){var r=sizeof(e);return function(a,c,t,n){var s="";for(var i=0;i<r;i++)s+=e[i](a,c,t,n)||"";return s}}
/**
 * @param {function} callback
 * @return {function}
 */function rulesheet(e){return function(r){r.root||(r=r.return)&&e(r)}}
/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */function prefixer(c,s,i,l){if(c.length>-1&&!c.return)switch(c.type){case n:c.return=prefix(c.value,c.length,i);return;case d:return serialize([copy(c,{value:replace(c.value,"@","@"+a)})],l);case t:if(c.length)return combine(c.props,(function(t){switch(match(t,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return serialize([copy(c,{props:[replace(t,/:(read-\w+)/,":"+r+"$1")]})],l);case"::placeholder":return serialize([copy(c,{props:[replace(t,/:(plac\w+)/,":"+a+"input-$1")]}),copy(c,{props:[replace(t,/:(plac\w+)/,":"+r+"$1")]}),copy(c,{props:[replace(t,/:(plac\w+)/,e+"input-$1")]})],l)}return""}))}}
/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */function namespace(e){switch(e.type){case t:e.props=e.props.map((function(r){return combine(tokenize(r),(function(r,a,c){switch(charat(r,0)){case 12:return substr(r,1,strlen(r));case 0:case 40:case 43:case 62:case 126:return r;case 58:"global"===c[++a]&&(c[a]="",c[++a]="\f"+substr(c[a],a=1,-1));case 32:return 1===a?"":r;default:switch(a){case 0:e=r;return sizeof(c)>1?"":r;case a=sizeof(c)-1:case 2:return 2===a?r+e+e:r+e;default:return r}}}))}))}}export{u as CHARSET,c as COMMENT,m as COUNTER_STYLE,n as DECLARATION,f as DOCUMENT,v as FONT_FACE,b as FONT_FEATURE_VALUES,l as IMPORT,d as KEYFRAMES,k as LAYER,i as MEDIA,r as MOZ,e as MS,h as NAMESPACE,s as PAGE,t as RULESET,p as SUPPORTS,o as VIEWPORT,a as WEBKIT,w as abs,alloc,append,g as assign,caret,char,C as character,O as characters,charat,z as column,combine,comment,commenter,compile,copy,dealloc,declaration,delimit,delimiter,escaping,x as from,hash,identifier,indexof,y as length,$ as line,match,middleware,namespace,next,node,parse,peek,j as position,prefix,prefixer,prev,replace,ruleset,rulesheet,serialize,sizeof,slice,stringify,strlen,substr,token,tokenize,tokenizer,trim,whitespace};

