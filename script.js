(()=>{"use strict";var r={911:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i},o=this&&this.__spreadArray||function(r,e,t){if(t||2===arguments.length)for(var n,o=0,a=e.length;o<a;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return r.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.parseDefinition=void 0;var a=t(143),i=t(822),u=t(883),l=t(231);e.parseDefinition=function(r,e){var t=n((0,i.parseSpaces)(r,e),2),p=t[0],c=t[1],s=n((0,u.parseName)(p,c),2),f=s[0],y=s[1],v=i.parseSpaces.apply(void 0,o([],n(y),!1)),d=l.parseString.apply(void 0,o([":="],n(v),!1)),m=i.parseSpaces.apply(void 0,o([],n(d),!1)),h=n(a.parseExpr.apply(void 0,o([],n(m),!1)),2),b=h[0],x=h[1],E=i.parseSpaces.apply(void 0,o([],n(x),!1));return[{name:f,value:b,meta:c},l.parseString.apply(void 0,o([";"],n(E),!1))]}},249:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i},o=this&&this.__spreadArray||function(r,e,t){if(t||2===arguments.length)for(var n,o=0,a=e.length;o<a;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return r.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.parseProgram=void 0;var a=t(911),i=t(635),u=t(822),l=t(143);e.parseProgram=function(r,e){var t=n((0,u.parseSpaces)(r,e),2),p=t[0],c=t[1],s=n((0,i.parseMany)(a.parseDefinition,p,c),2),f=s[0],y=s[1],v=n(l.parseExpr.apply(void 0,o([],n(y),!1)),2);return[{names:f,expr:v[0],meta:c},v[1]]}},752:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0}),e.parseApplicationExpr=void 0;var o=t(143),a=t(822),i=t(758),u=t(635);e.parseApplicationExpr=function(r,e){var t=n((0,a.parseSpaces)(r,e),2),l=t[0],p=t[1],c=n((0,u.parseMany)(o.parseSimpleExpr,l,p),2),s=c[0],f=c[1];if(s.length<2)throw(0,i.parseError)(p);var y=s.reduce((function(r,e){return{type:o.ExprType.APPLICATION,function:r,argument:e,meta:p}}));if(y.type!==o.ExprType.APPLICATION)throw new Error("unreachable");return[y,f]}},143:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i},o=this&&this.__spreadArray||function(r,e,t){if(t||2===arguments.length)for(var n,o=0,a=e.length;o<a;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return r.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.parseExpr=e.parseSimpleExpr=e.ExprType=void 0;var a,i=t(752),u=t(20),l=t(97),p=t(861),c=t(822),s=t(231);!function(r){r.STRING="string",r.NAME="name",r.APPLICATION="application",r.LAMBDA="lambda"}(a||(e.ExprType=a={})),e.parseSimpleExpr=function(r,t){try{return function(r,t){var a=n((0,c.parseSpaces)(r,t),2),i=a[0],u=a[1],l=(0,s.parseString)("(",i,u),p=n(e.parseExpr.apply(void 0,o([],n(l),!1)),2),f=p[0],y=p[1],v=c.parseSpaces.apply(void 0,o([],n(y),!1));return[f,s.parseString.apply(void 0,o([")"],n(v),!1))]}(r,t)}catch(e){try{return(0,l.parseStringExpr)(r,t)}catch(e){try{return(0,u.parseLambdaExpr)(r,t)}catch(e){return(0,p.parseNameExpr)(r,t)}}}},e.parseExpr=function(r,t){try{return(0,i.parseApplicationExpr)(r,t)}catch(n){return(0,e.parseSimpleExpr)(r,t)}}},20:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0}),e.parseLambdaExpr=void 0;var o=t(822),a=t(883),i=t(143),u=t(231);e.parseLambdaExpr=function(r,e){var t=n((0,o.parseSpaces)(r,e),2),l=t[0],p=t[1],c=n((0,u.parseString)("\\",l,p),2),s=c[0],f=c[1],y=n((0,o.parseSpaces)(s,f),2),v=y[0],d=y[1],m=n((0,a.parseName)(v,d),2),h=m[0],b=n(m[1],2),x=b[0],E=b[1],_=n((0,o.parseSpaces)(x,E),2),S=_[0],g=_[1],w=n((0,u.parseString)("->",S,g),2),P=w[0],A=w[1],T=n((0,i.parseExpr)(P,A),2),M=T[0],O=T[1];return[{type:i.ExprType.LAMBDA,parameter:h,body:M,meta:p},O]}},861:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0}),e.parseNameExpr=void 0;var o=t(883),a=t(143),i=t(822);e.parseNameExpr=function(r,e){var t=n((0,i.parseSpaces)(r,e),2),u=t[0],l=t[1],p=n((0,o.parseName)(u,l),2),c=p[0],s=p[1];return[{type:a.ExprType.NAME,name:c,meta:l},s]}},97:function(r,e,t){var n=this&&this.__values||function(r){var e="function"==typeof Symbol&&Symbol.iterator,t=e&&r[e],n=0;if(t)return t.call(r);if(r&&"number"==typeof r.length)return{next:function(){return r&&n>=r.length&&(r=void 0),{value:r&&r[n++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},o=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0}),e.parseStringExpr=e.parseStringValue=void 0;var a=t(822),i=t(758),u=t(143),l=t(220);e.parseStringValue=function(r,e){var t,o,a=[],u=0,l=!1;try{for(var p=n(r.substring(1,r.length-1)),c=p.next();!c.done;c=p.next()){var s=c.value;if(++u,l){switch(s){case'"':a.push('"');break;case"n":a.push("\n");break;case"\\":a.push("\\");break;default:throw(0,i.parseError)({row:e.row,column:e.column+u},'undefined control sequence "\\'.concat(s,'"'))}l=!1}else"\\"!==s?a.push(s):l=!0}}catch(r){t={error:r}}finally{try{c&&!c.done&&(o=p.return)&&o.call(p)}finally{if(t)throw t.error}}return a.join("")},e.parseStringExpr=function(r,t){var n=o((0,a.parseSpaces)(r,t),2),i=n[0],p=n[1],c=o((0,l.parseRegex)(/^"(?:\\.|[^"])*"/,i,p),2),s=c[0],f=c[1],y=(0,e.parseStringValue)(s,p);return[{type:u.ExprType.STRING,value:y,meta:p},f]}},25:function(r,e,t){var n=this&&this.__values||function(r){var e="function"==typeof Symbol&&Symbol.iterator,t=e&&r[e],n=0;if(t)return t.call(r);if(r&&"number"==typeof r.length)return{next:function(){return r&&n>=r.length&&(r=void 0),{value:r&&r[n++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.evaluateExpr=e.evaluate=e.lookupContext=e.expandContext=void 0;var o=t(143),a=t(758);e.expandContext=function(r,e){return{internalNames:{},names:e,previous:r}},e.lookupContext=function(r,t,n){if(r.names.hasOwnProperty(t))return r.names[t];if(r.internalNames.hasOwnProperty(t))return r.internalNames[t];if(void 0!==r.previous)return(0,e.lookupContext)(r.previous,t,n);throw(0,a.evalError)(n,'name "'.concat(t,"\" isn't present in context"))},e.evaluate=function(r,t){var o,i,u={};try{for(var l=n(t.names),p=l.next();!p.done;p=l.next()){var c=p.value,s=c.name,f=c.value,y=c.meta;if(s in u)throw(0,a.evalError)(y,"duplicated names are not supported");u[s]=(0,e.evaluateExpr)((0,e.expandContext)(r,u),f)}}catch(r){o={error:r}}finally{try{p&&!p.done&&(i=l.return)&&i.call(l)}finally{if(o)throw o.error}}return(0,e.evaluateExpr)((0,e.expandContext)(r,u),t.expr)},e.evaluateExpr=function(r,t){switch(t.type){case o.ExprType.STRING:return t.value;case o.ExprType.NAME:return(0,e.lookupContext)(r,t.name,t.meta);case o.ExprType.APPLICATION:var n=(0,e.evaluateExpr)(r,t.function),i=(0,e.evaluateExpr)(r,t.argument);if("function"!=typeof n)throw(0,a.evalError)(t.meta,"cannot apply value to non-function type");return n(i);case o.ExprType.LAMBDA:return function(n){var o;return(0,e.evaluateExpr)((0,e.expandContext)(r,((o={})[t.parameter]=n,o)),t.body)}}}},607:function(r,e,t){var n=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(e,"__esModule",{value:!0});var o=t(148),a=t(249),i=t(758),u=t(25),l={internalNames:{show:function(r){return"".concat(r)},alert,prompt,true:!0,false:!1,if:function(r,e,t){if(!0===r)return e;if(!1===r)return t;throw new Error("condition must evaluate to boolean")},parseNumber:function(r){if("string"!=typeof r)throw new Error("argument of parseNumber must be string");return+r},"+":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of + must be a number");return r+e}},"-":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of - must be a number");return r-e}},"*":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of * must be a number");return r*e}},"/":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of / must be a number");return r/e}},"%":function(r){return function(e){if("number"!=typeof r||"number"!=typeof e)throw new Error("argument of % must be a number");return r%e}}},names:{}};try{!function(){var r=document.getElementById("code"),e=document.getElementById("run");if(!(r instanceof HTMLTextAreaElement&&e instanceof HTMLButtonElement))throw Error("HTML elements not found");e.onclick=function(){try{var e=n((0,a.parseProgram)(r.value,(0,o.emptyPosition)()),2),t=e[0],p=n(e[1],2),c=p[0],s=p[1];if(""!==c.trim())throw(0,i.parseError)(s);alert((0,u.evaluate)(l,t))}catch(r){r instanceof Error&&alert(r.message),console.error(r)}}}()}catch(r){console.error(r)}},148:function(r,e){var t=this&&this.__values||function(r){var e="function"==typeof Symbol&&Symbol.iterator,t=e&&r[e],n=0;if(t)return t.call(r);if(r&&"number"==typeof r.length)return{next:function(){return r&&n>=r.length&&(r=void 0),{value:r&&r[n++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0}),e.textToPosition=e.printPosition=e.sumPositions=e.emptyPosition=void 0,e.emptyPosition=function(){return{row:0,column:0}},e.sumPositions=function(r,e){return{row:r.row+e.row,column:r.column+e.column}},e.printPosition=function(r){var e=r.row,t=r.column;return"".concat(e,":").concat(t)},e.textToPosition=function(r){var e,n,o=0,a=0;try{for(var i=t(r),u=i.next();!u.done;u=i.next())"\n"!==u.value?++a:(++o,a=0)}catch(r){e={error:r}}finally{try{u&&!u.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return{row:o,column:a}}},758:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.evalError=e.parseError=void 0;var n=t(148);e.parseError=function(r,e){return void 0===e&&(e="parsing error"),new Error("".concat(e," on ").concat((0,n.printPosition)(r)))},e.evalError=function(r,e){return void 0===e&&(e="evaluation error"),new Error("".concat(e," on ").concat((0,n.printPosition)(r)))}},635:function(r,e){var t=this&&this.__read||function(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,a=t.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=a.return)&&t.call(a)}finally{if(o)throw o.error}}return i},n=this&&this.__spreadArray||function(r,e,t){if(t||2===arguments.length)for(var n,o=0,a=e.length;o<a;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return r.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.parseMany=void 0,e.parseMany=function(r,e,o){for(var a=[],i=[e,o];;)try{var u=t(r.apply(void 0,n([],t(i),!1)),2),l=u[0],p=u[1];a.push(l),i=p}catch(r){break}return[a,i]}},883:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.parseName=void 0;var n=t(220);e.parseName=function(r,e){return(0,n.parseRegex)(/^[^;()\s]+/u,r,e)}},220:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.parseRegex=void 0;var n=t(148),o=t(758);e.parseRegex=function(r,e,t){var a=e.match(r);if(null===a)throw(0,o.parseError)(t);var i=a[0];return[i,[e.substring(i.length),(0,n.sumPositions)(t,(0,n.textToPosition)(i))]]}},822:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.parseSpaces=void 0;var n=t(148);e.parseSpaces=function(r,e){var t=r.match(/^\s*/);return null===t?[r,e]:[r.substring(t[0].length),(0,n.sumPositions)(e,(0,n.textToPosition)(t[0]))]}},231:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.parseString=void 0;var n=t(148),o=t(758);e.parseString=function(r,e,t){if(!e.startsWith(r))throw(0,o.parseError)(t);return[e.substring(r.length),(0,n.sumPositions)(t,(0,n.textToPosition)(r))]}}},e={};!function t(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return r[n].call(a.exports,a,a.exports,t),a.exports}(607)})();