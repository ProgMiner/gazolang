(()=>{"use strict";var r={911:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i},o=this&&this.__spreadArray||function(r,e,t){if(t||2===arguments.length)for(var n,o=0,a=e.length;o<a;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return r.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.parseDefinition=void 0;var a=t(143),i=t(822),u=t(883),l=t(231);e.parseDefinition=function(r,e){var t=n((0,i.parseSpaces)(r,e),2),s=t[0],c=t[1],f=n((0,u.parseName)(s,c),2),p=f[0],y=f[1],v=i.parseSpaces.apply(void 0,o([],n(y),!1)),m=l.parseString.apply(void 0,o([":="],n(v),!1)),d=i.parseSpaces.apply(void 0,o([],n(m),!1)),h=n(a.parseExpr.apply(void 0,o([],n(d),!1)),2),b=h[0],g=h[1],S=i.parseSpaces.apply(void 0,o([],n(g),!1));return[{name:p,value:b,meta:c},l.parseString.apply(void 0,o([";"],n(S),!1))]}},249:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i},o=this&&this.__spreadArray||function(r,e,t){if(t||2===arguments.length)for(var n,o=0,a=e.length;o<a;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return r.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.parseProgram=void 0;var a=t(911),i=t(635),u=t(822),l=t(143);e.parseProgram=function(r,e){var t=n((0,u.parseSpaces)(r,e),2),s=t[0],c=t[1],f=n((0,i.parseMany)(a.parseDefinition,s,c),2),p=f[0],y=f[1],v=n(l.parseExpr.apply(void 0,o([],n(y),!1)),2);return[{names:p,expr:v[0],meta:c},v[1]]}},752:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0}),e.parseApplicationExpr=void 0;var o=t(148),a=t(143),i=t(822),u=t(758),l=t(635);e.parseApplicationExpr=function(r,e){var t=n((0,i.parseSpaces)(r,e),2),s=t[0],c=t[1],f=n((0,l.parseMany)(a.parseSimpleExpr,s,c),2),p=f[0],y=f[1];if(p.length<2)throw(0,u.parseError)(c);var v=(0,o.positionTo)(c,y[1]),m=p.reduce((function(r,e){return{type:a.ExprType.APPLICATION,function:r,argument:e,meta:v}}));if(m.type!==a.ExprType.APPLICATION)throw new Error("unreachable");return[m,y]}},143:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i},o=this&&this.__spreadArray||function(r,e,t){if(t||2===arguments.length)for(var n,o=0,a=e.length;o<a;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return r.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.parseExpr=e.parseSimpleExpr=e.ExprType=void 0;var a,i=t(752),u=t(20),l=t(97),s=t(231),c=t(822),f=t(861);!function(r){r.STRING="string",r.NAME="name",r.APPLICATION="application",r.LAMBDA="lambda"}(a||(e.ExprType=a={})),e.parseSimpleExpr=function(r,t){try{return function(r,t){var a=n((0,c.parseSpaces)(r,t),2),i=a[0],u=a[1],l=(0,s.parseString)("(",i,u),f=n(e.parseExpr.apply(void 0,o([],n(l),!1)),2),p=f[0],y=f[1],v=c.parseSpaces.apply(void 0,o([],n(y),!1));return[p,s.parseString.apply(void 0,o([")"],n(v),!1))]}(r,t)}catch(e){try{return(0,l.parseStringExpr)(r,t)}catch(e){try{return(0,u.parseLambdaExpr)(r,t)}catch(e){return(0,f.parseNameExpr)(r,t)}}}},e.parseExpr=function(r,t){try{return(0,i.parseApplicationExpr)(r,t)}catch(n){return(0,e.parseSimpleExpr)(r,t)}}},20:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0}),e.parseLambdaExpr=void 0;var o=t(148),a=t(143),i=t(822),u=t(231),l=t(883);e.parseLambdaExpr=function(r,e){var t=n((0,i.parseSpaces)(r,e),2),s=t[0],c=t[1],f=n((0,u.parseString)("\\",s,c),2),p=f[0],y=f[1],v=n((0,i.parseSpaces)(p,y),2),m=v[0],d=v[1],h=n((0,l.parseName)(m,d),2),b=h[0],g=n(h[1],2),S=g[0],x=g[1],w=n((0,i.parseSpaces)(S,x),2),E=w[0],_=w[1],P=n((0,u.parseString)("->",E,_),2),T=P[0],O=P[1],A=n((0,a.parseExpr)(T,O),2),M=A[0],N=A[1];return[{type:a.ExprType.LAMBDA,parameter:b,body:M,meta:(0,o.positionTo)(c,N[1])},N]}},861:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0}),e.parseNameExpr=void 0;var o=t(148),a=t(822),i=t(883),u=t(143);e.parseNameExpr=function(r,e){var t=n((0,a.parseSpaces)(r,e),2),l=t[0],s=t[1],c=n((0,i.parseName)(l,s),2),f=c[0],p=c[1];return[{type:u.ExprType.NAME,name:f,meta:(0,o.positionTo)(s,p[1])},p]}},97:function(r,e,t){var n=this&&this.__values||function(r){var e="function"==typeof Symbol&&Symbol.iterator,t=e&&r[e],n=0;if(t)return t.call(r);if(r&&"number"==typeof r.length)return{next:function(){return r&&n>=r.length&&(r=void 0),{value:r&&r[n++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},o=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0}),e.parseStringExpr=e.parseStringValue=void 0;var a=t(148),i=t(822),u=t(220),l=t(758),s=t(143);e.parseStringValue=function(r,e){var t,o,a=[],i=0,u=[],s=!1,c=!1;try{for(var f=n(r.substring(1,r.length-1)),p=f.next();!p.done;p=f.next()){var y=p.value;if(++i,c)u.push(y),u.length>=4&&(a.push(String.fromCharCode(+"0x".concat(u.join("")))),u=[],c=!1);else if(s){switch(y){case'"':a.push('"');break;case"r":a.push("\r");break;case"n":a.push("\n");break;case"t":a.push("\t");break;case"f":a.push("\f");break;case"v":a.push("\v");break;case"u":c=!0;break;case"\\":a.push("\\");break;default:var v={row:e.row,column:e.column+i,fromStart:e.fromStart+i,length:1};throw(0,l.parseError)(v,'undefined control sequence "\\'.concat(y,'"'))}s=!1}else"\\"!==y?a.push(y):s=!0}}catch(r){t={error:r}}finally{try{p&&!p.done&&(o=f.return)&&o.call(f)}finally{if(t)throw t.error}}if(s||c)throw v={row:e.row,column:e.column+i,fromStart:e.fromStart+i,length:1},console.error((0,l.parseError)(v,"unexpected closing quote ".concat(r))),(0,l.parseError)(v,"unexpected closing quote");return a.join("")},e.parseStringExpr=function(r,t){var n=o((0,i.parseSpaces)(r,t),2),l=n[0],c=n[1],f=o((0,u.parseRegex)(/^"(?:\\.|[^"])*"/,l,c),2),p=f[0],y=f[1],v=(0,e.parseStringValue)(p,c);return[{type:s.ExprType.STRING,value:v,meta:(0,a.positionTo)(c,y[1])},y]}},25:function(r,e,t){var n=this&&this.__values||function(r){var e="function"==typeof Symbol&&Symbol.iterator,t=e&&r[e],n=0;if(t)return t.call(r);if(r&&"number"==typeof r.length)return{next:function(){return r&&n>=r.length&&(r=void 0),{value:r&&r[n++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.evaluateExpr=e.evaluate=e.lookupContext=e.expandContext=void 0;var o=t(143),a=t(758);e.expandContext=function(r,e){return{internalNames:{},names:e,previous:r}},e.lookupContext=function(r,t,n){if(r.names.hasOwnProperty(t))return r.names[t];if(r.internalNames.hasOwnProperty(t))return r.internalNames[t];if(void 0!==r.previous)return(0,e.lookupContext)(r.previous,t,n);throw(0,a.evalError)(n,'name "'.concat(t,"\" isn't present in context"))},e.evaluate=function(r,t){var o,i,u={};try{for(var l=n(t.names),s=l.next();!s.done;s=l.next()){var c=s.value,f=c.name,p=c.value,y=c.meta;if(f in u)throw(0,a.evalError)(y,"duplicated names are not supported");u[f]=(0,e.evaluateExpr)((0,e.expandContext)(r,u),p)}}catch(r){o={error:r}}finally{try{s&&!s.done&&(i=l.return)&&i.call(l)}finally{if(o)throw o.error}}return(0,e.evaluateExpr)((0,e.expandContext)(r,u),t.expr)},e.evaluateExpr=function(r,t){switch(t.type){case o.ExprType.STRING:return t.value;case o.ExprType.NAME:return(0,e.lookupContext)(r,t.name,t.meta);case o.ExprType.APPLICATION:var n=(0,e.evaluateExpr)(r,t.function),i=(0,e.evaluateExpr)(r,t.argument);if("function"!=typeof n)throw(0,a.evalError)(t.meta,"cannot apply value to non-function type");return n(i);case o.ExprType.LAMBDA:return function(n){var o;return(0,e.evaluateExpr)((0,e.expandContext)(r,((o={})[t.parameter]=n,o)),t.body)}}}},607:function(r,e,t){var n=this&&this.__awaiter||function(r,e,t,n){return new(t||(t=Promise))((function(o,a){function i(r){try{l(n.next(r))}catch(r){a(r)}}function u(r){try{l(n.throw(r))}catch(r){a(r)}}function l(r){var e;r.done?o(r.value):(e=r.value,e instanceof t?e:new t((function(r){r(e)}))).then(i,u)}l((n=n.apply(r,e||[])).next())}))},o=this&&this.__generator||function(r,e){var t,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(u){return function(l){return function(u){if(t)throw new TypeError("Generator is already executing.");for(;a&&(a=0,u[0]&&(i=0)),i;)try{if(t=1,n&&(o=2&u[0]?n.return:u[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,u[1])).done)return o;switch(n=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,n=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=e.call(r,i)}catch(r){u=[6,r],n=0}finally{t=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,l])}}},a=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0});var i=t(148),u=t(758),l=t(25),s=t(249),c={internalNames:{show:function(r){return"".concat(r)},alert,prompt,confirm,true:!0,false:!1,undefined:void 0,if:function(r){return function(e){return function(t){if(!0===r)return e;if(!1===r)return t;throw new Error("condition must evaluate to boolean")}}},parseNumber:function(r){if("string"!=typeof r)throw new Error("argument of parseNumber must be string");return+r},toString:function(r){return"".concat(r)},"+":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of + must be a number");return r+e}},"-":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of - must be a number");return r-e}},"*":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of * must be a number");return r*e}},"/":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of / must be a number");return r/e}},"%":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of % must be a number");return r%e}},asList:function(r){if("string"!=typeof r&&!Array.isArray(r))throw new Error("argument of asList must be string or list");for(var e=function(r){return function(r){return function(){return r}}},t=function(t){var n=e;e=function(e){return function(o){return function(){return e(r[t])(n(e)(o))}}}},n=r.length-1;n>=0;--n)t(n);return e},asArray:function(r){var e=[];return r((function(r){return function(t){t(),e.unshift(r)}}))(void 0)(),e},join:function(r){return function(e){return e.join(r)}},chr:function(r){if("number"!=typeof r)throw new Error("argument of chr must be a number");return String.fromCharCode(r)},"==":function(r){return function(e){return r===e}},"!=":function(r){return function(e){return r!==e}},"<":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of < must be a number");return r<e}},"<=":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of <= must be a number");return r<=e}},">":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of > must be a number");return r>e}},">=":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of >= must be a number");return r>=e}}},names:{}};try{!function(){var r,e=document.getElementById("code"),t=document.getElementById("run");if(!(e instanceof HTMLTextAreaElement&&t instanceof HTMLButtonElement))throw Error("HTML elements not found");e.value=null!==(r=localStorage.getItem("code"))&&void 0!==r?r:"",e.onkeydown=function(r){var t,n;if("Tab"===r.key){var o=e.value,u=e.selectionStart,l=(0,i.textToPosition)(o.substring(0,u)).column,s=o.substring(0,u),c=o.substring(u);return e.value=s+"    ".substring(l%4)+c,e.selectionStart=e.selectionEnd=u+(4-l%4),void r.preventDefault()}if("Backspace"===r.key&&r.ctrlKey){o=e.value,u=e.selectionStart,l=(0,i.textToPosition)(o.substring(0,u)).column;var f=o.substring(0,u),p=f.trimEnd();if(f.length!==p.length&&l>0){var y=u-Math.min(f.length-p.length,l);return e.value=o.substring(0,y)+o.substring(u),e.selectionStart=e.selectionEnd=y,void r.preventDefault()}}if("KeyZ"===r.code&&r.ctrlKey){var v=JSON.parse(null!==(t=localStorage.getItem("undo"))&&void 0!==t?t:"[]"),m=JSON.parse(null!==(n=localStorage.getItem("redo"))&&void 0!==n?n:"[]");if(r.shiftKey){if(m.length>0){var d=a(m.pop(),2);o=d[0],l=d[1],v.push([e.value,e.selectionStart]),e.value=o,e.selectionStart=e.selectionEnd=l,localStorage.setItem("code",o)}}else if(v.length>0){var h=a(v.pop(),2);o=h[0],l=h[1],m.push([e.value,e.selectionStart]),e.value=o,e.selectionStart=e.selectionEnd=l,localStorage.setItem("code",o)}return localStorage.setItem("undo",JSON.stringify(v)),localStorage.setItem("redo",JSON.stringify(m)),void r.preventDefault()}};var f=0;e.onkeyup=function(){var r,t,n=null!==(r=localStorage.getItem("code"))&&void 0!==r?r:"",o=e.value;if(n!==o){localStorage.setItem("code",o);var a=JSON.parse(null!==(t=localStorage.getItem("undo"))&&void 0!==t?t:"[]");a.push([n,f]),a.length>100&&a.shift(),localStorage.setItem("undo",JSON.stringify(a)),localStorage.removeItem("redo")}f=e.selectionStart},e.onclick=function(){f=e.selectionStart},t.onclick=function(){return n(void 0,void 0,void 0,(function(){var r,n,f,p,y,v,m,d,h;return o(this,(function(o){switch(o.label){case 0:return t.disabled=!0,t.innerText="Парсинг...",[4,new Promise((function(r){return setTimeout(r,0)}))];case 1:o.sent(),r=performance.now(),o.label=2;case 2:if(o.trys.push([2,4,,5]),n=a((0,s.parseProgram)(e.value,(0,i.emptyPosition)()),2),f=n[0],p=a(n[1],2),y=p[0],v=p[1],""!==y.trim())throw(0,u.parseError)(v);return console.log("Parsing took ".concat(performance.now()-r)),t.innerText="Выполнение...",[4,new Promise((function(r){return setTimeout(r,0)}))];case 3:return o.sent(),m=performance.now(),d=(0,l.evaluate)(c,f),console.log("Evaluation took ".concat(performance.now()-m)),void 0!==d&&alert(d),[3,5];case 4:return(h=o.sent())instanceof Error&&alert(h.message),h instanceof u.PositionedError&&(e.focus({preventScroll:!0}),e.selectionStart=h.position.fromStart,(0,i.isPositionRange)(h.position)?e.selectionEnd=h.position.fromStart+h.position.length:e.selectionEnd=h.position.fromStart),console.error(h),[3,5];case 5:return t.innerText="Запуск",t.disabled=!1,[2]}}))}))}}()}catch(r){console.error(r)}},148:function(r,e){var t=this&&this.__assign||function(){return t=Object.assign||function(r){for(var e,t=1,n=arguments.length;t<n;t++)for(var o in e=arguments[t])Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r},t.apply(this,arguments)},n=this&&this.__values||function(r){var e="function"==typeof Symbol&&Symbol.iterator,t=e&&r[e],n=0;if(t)return t.call(r);if(r&&"number"==typeof r.length)return{next:function(){return r&&n>=r.length&&(r=void 0),{value:r&&r[n++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.isPositionRange=e.positionTo=e.textToPosition=e.printPosition=e.sumPositions=e.emptyPosition=void 0,e.emptyPosition=function(){return{row:0,column:0,fromStart:0}},e.sumPositions=function(r,e){return{row:r.row+e.row,column:0===e.row?r.column+e.column:e.column,fromStart:r.fromStart+e.fromStart}},e.printPosition=function(r){var e=r.row,t=r.column;return"".concat(e,":").concat(t)},e.textToPosition=function(r){var e,t,o=0,a=0;try{for(var i=n(r),u=i.next();!u.done;u=i.next())"\n"!==u.value?++a:(++o,a=0)}catch(r){e={error:r}}finally{try{u&&!u.done&&(t=i.return)&&t.call(i)}finally{if(e)throw e.error}}return{row:o,column:a,fromStart:r.length}},e.positionTo=function(r,e){return t(t({},r),{length:e.fromStart-r.fromStart})},e.isPositionRange=function(r){return"length"in r}},758:function(r,e,t){var n,o=this&&this.__extends||(n=function(r,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])},n(r,e)},function(r,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function t(){this.constructor=r}n(r,e),r.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)});Object.defineProperty(e,"__esModule",{value:!0}),e.evalError=e.parseError=e.PositionedError=void 0;var a=t(148),i=function(r){function e(t,n){var o=r.call(this,"".concat(t," on ").concat((0,a.printPosition)(n)))||this;return o.position=n,Object.setPrototypeOf(o,e.prototype),o}return o(e,r),e}(Error);e.PositionedError=i,e.parseError=function(r,e){return void 0===e&&(e="parsing error"),new i(e,r)},e.evalError=function(r,e){return void 0===e&&(e="evaluation error"),new i(e,r)}},635:function(r,e){var t=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i},n=this&&this.__spreadArray||function(r,e,t){if(t||2===arguments.length)for(var n,o=0,a=e.length;o<a;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return r.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.parseMany=void 0,e.parseMany=function(r,e,o){for(var a=[],i=[e,o];;)try{var u=t(r.apply(void 0,n([],t(i),!1)),2),l=u[0],s=u[1];a.push(l),i=s}catch(r){break}return[a,i]}},883:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.parseName=void 0;var n=t(220);e.parseName=function(r,e){return(0,n.parseRegex)(/^[^;()"\\\s]+/u,r,e)}},220:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.parseRegex=void 0;var n=t(148),o=t(758);e.parseRegex=function(r,e,t){var a=e.match(r);if(null===a)throw(0,o.parseError)(t);var i=a[0];return[i,[e.substring(i.length),(0,n.sumPositions)(t,(0,n.textToPosition)(i))]]}},822:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.parseSpaces=void 0;var n=t(148);e.parseSpaces=function(r,e){var t=r.match(/^(?:\s|--.*(?:\n|$))*/);return null===t?[r,e]:[r.substring(t[0].length),(0,n.sumPositions)(e,(0,n.textToPosition)(t[0]))]}},231:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.parseString=void 0;var n=t(148),o=t(758);e.parseString=function(r,e,t){if(!e.startsWith(r))throw(0,o.parseError)(t);return[e.substring(r.length),(0,n.sumPositions)(t,(0,n.textToPosition)(r))]}}},e={};!function t(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return r[n].call(a.exports,a,a.exports,t),a.exports}(607)})();