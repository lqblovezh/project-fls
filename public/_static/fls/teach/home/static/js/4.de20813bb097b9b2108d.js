/*!
 * {
 *   "buildtime": "2019-06-17 15:13:29",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "ecb058dd8",
 *     "message": [
 *       "commit ecb058dd8be16255580b36968fc3831fa41d5989",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Mon Jun 17 15:12:32 2019 +0800",
 *       "    'xxxxx'"
 *     ],
 *     "user": "YangZai",
 *     "email": "552396385@qq.com",
 *     "remote": [
 *       "origin http://gitlab.kf.gli.cn/xcloud/x-book4.git (fetch)",
 *       "origin http://gitlab.kf.gli.cn/xcloud/x-book4.git (push)"
 *     ]
 *   }
 * }
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{563:function(t,e,r){(function(t){var n=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),r={},n=0;n<e.length;n++)r[e[n]]=Object.getOwnPropertyDescriptor(t,e[n]);return r},o=/%[sdj%]/g;e.format=function(t){if(!b(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(c(arguments[r]));return e.join(" ")}r=1;for(var n=arguments,i=n.length,u=String(t).replace(o,function(t){if("%%"===t)return"%";if(r>=i)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return t}}),a=n[r];r<i;a=n[++r])h(a)||!w(a)?u+=" "+a:u+=" "+c(a);return u},e.deprecate=function(r,n){if(void 0!==t&&!0===t.noDeprecation)return r;if(void 0===t)return function(){return e.deprecate(r,n).apply(this,arguments)};var o=!1;return function(){if(!o){if(t.throwDeprecation)throw new Error(n);t.traceDeprecation?console.trace(n):console.error(n),o=!0}return r.apply(this,arguments)}};var i,u={};function c(t,r){var n={seen:[],stylize:f};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),g(r)?n.showHidden=r:r&&e._extend(n,r),m(n.showHidden)&&(n.showHidden=!1),m(n.depth)&&(n.depth=2),m(n.colors)&&(n.colors=!1),m(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=a),s(n,t,n.depth)}function a(t,e){var r=c.styles[e];return r?"["+c.colors[r][0]+"m"+t+"["+c.colors[r][1]+"m":t}function f(t,e){return t}function s(t,r,n){if(t.customInspect&&r&&j(r.inspect)&&r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var o=r.inspect(n,t);return b(o)||(o=s(t,o,n)),o}var i=function(t,e){if(m(e))return t.stylize("undefined","undefined");if(b(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}if(d(e))return t.stylize(""+e,"number");if(g(e))return t.stylize(""+e,"boolean");if(h(e))return t.stylize("null","null")}(t,r);if(i)return i;var u=Object.keys(r),c=function(t){var e={};return t.forEach(function(t,r){e[t]=!0}),e}(u);if(t.showHidden&&(u=Object.getOwnPropertyNames(r)),E(r)&&(u.indexOf("message")>=0||u.indexOf("description")>=0))return l(r);if(0===u.length){if(j(r)){var a=r.name?": "+r.name:"";return t.stylize("[Function"+a+"]","special")}if(v(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(O(r))return t.stylize(Date.prototype.toString.call(r),"date");if(E(r))return l(r)}var f,w="",S=!1,x=["{","}"];(y(r)&&(S=!0,x=["[","]"]),j(r))&&(w=" [Function"+(r.name?": "+r.name:"")+"]");return v(r)&&(w=" "+RegExp.prototype.toString.call(r)),O(r)&&(w=" "+Date.prototype.toUTCString.call(r)),E(r)&&(w=" "+l(r)),0!==u.length||S&&0!=r.length?n<0?v(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),f=S?function(t,e,r,n,o){for(var i=[],u=0,c=e.length;u<c;++u)q(e,String(u))?i.push(p(t,e,r,n,String(u),!0)):i.push("");return o.forEach(function(o){o.match(/^\d+$/)||i.push(p(t,e,r,n,o,!0))}),i}(t,r,n,c,u):u.map(function(e){return p(t,r,n,c,e,S)}),t.seen.pop(),function(t,e,r){if(t.reduce(function(t,e){return 0,e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60)return r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1];return r[0]+e+" "+t.join(", ")+" "+r[1]}(f,w,x)):x[0]+w+x[1]}function l(t){return"["+Error.prototype.toString.call(t)+"]"}function p(t,e,r,n,o,i){var u,c,a;if((a=Object.getOwnPropertyDescriptor(e,o)||{value:e[o]}).get?c=a.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):a.set&&(c=t.stylize("[Setter]","special")),q(n,o)||(u="["+o+"]"),c||(t.seen.indexOf(a.value)<0?(c=h(r)?s(t,a.value,null):s(t,a.value,r-1)).indexOf("\n")>-1&&(c=i?c.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+c.split("\n").map(function(t){return"   "+t}).join("\n")):c=t.stylize("[Circular]","special")),m(u)){if(i&&o.match(/^\d+$/))return c;(u=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(u=u.substr(1,u.length-2),u=t.stylize(u,"name")):(u=u.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),u=t.stylize(u,"string"))}return u+": "+c}function y(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function h(t){return null===t}function d(t){return"number"==typeof t}function b(t){return"string"==typeof t}function m(t){return void 0===t}function v(t){return w(t)&&"[object RegExp]"===S(t)}function w(t){return"object"==typeof t&&null!==t}function O(t){return w(t)&&"[object Date]"===S(t)}function E(t){return w(t)&&("[object Error]"===S(t)||t instanceof Error)}function j(t){return"function"==typeof t}function S(t){return Object.prototype.toString.call(t)}function x(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(r){if(m(i)&&(i=t.env.NODE_DEBUG||""),r=r.toUpperCase(),!u[r])if(new RegExp("\\b"+r+"\\b","i").test(i)){var n=t.pid;u[r]=function(){var t=e.format.apply(e,arguments);console.error("%s %d: %s",r,n,t)}}else u[r]=function(){};return u[r]},e.inspect=c,c.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},c.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=y,e.isBoolean=g,e.isNull=h,e.isNullOrUndefined=function(t){return null==t},e.isNumber=d,e.isString=b,e.isSymbol=function(t){return"symbol"==typeof t},e.isUndefined=m,e.isRegExp=v,e.isObject=w,e.isDate=O,e.isError=E,e.isFunction=j,e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t},e.isBuffer=r(808);var T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function q(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){var t,r;t=new Date,r=[x(t.getHours()),x(t.getMinutes()),x(t.getSeconds())].join(":"),[t.getDate(),T[t.getMonth()],r].join(" "),e.format.apply(e,arguments)},e.inherits=r(809),e._extend=function(t,e){if(!e||!w(e))return t;for(var r=Object.keys(e),n=r.length;n--;)t[r[n]]=e[r[n]];return t};var k="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function P(t,e){if(!t){var r=new Error("Promise was rejected with a falsy value");r.reason=t,t=r}return e(t)}e.promisify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');if(k&&t[k]){var e;if("function"!=typeof(e=t[k]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,k,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var e,r,n=new Promise(function(t,n){e=t,r=n}),o=[],i=0;i<arguments.length;i++)o.push(arguments[i]);o.push(function(t,n){t?r(t):e(n)});try{t.apply(this,o)}catch(t){r(t)}return n}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),k&&Object.defineProperty(e,k,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,n(t))},e.promisify.custom=k,e.callbackify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');function r(){for(var r=[],n=0;n<arguments.length;n++)r.push(arguments[n]);var o=r.pop();if("function"!=typeof o)throw new TypeError("The last argument must be of type Function");var i=this,u=function(){return o.apply(i,arguments)};e.apply(this,r).then(function(e){t.nextTick(u,null,e)},function(e){t.nextTick(P,e,u)})}return Object.setPrototypeOf(r,Object.getPrototypeOf(e)),Object.defineProperties(r,n(e)),r}}).call(this,r(807))},744:function(t,e,r){"use strict";(function(e){var n=r(806);
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */function o(t,e){if(t===e)return 0;for(var r=t.length,n=e.length,o=0,i=Math.min(r,n);o<i;++o)if(t[o]!==e[o]){r=t[o],n=e[o];break}return r<n?-1:n<r?1:0}function i(t){return e.Buffer&&"function"==typeof e.Buffer.isBuffer?e.Buffer.isBuffer(t):!(null==t||!t._isBuffer)}var u=r(563),c=Object.prototype.hasOwnProperty,a=Array.prototype.slice,f="foo"===function(){}.name;function s(t){return Object.prototype.toString.call(t)}function l(t){return!i(t)&&("function"==typeof e.ArrayBuffer&&("function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):!!t&&(t instanceof DataView||!!(t.buffer&&t.buffer instanceof ArrayBuffer))))}var p=t.exports=m,y=/\s*function\s+([^\(\s]*)\s*/;function g(t){if(u.isFunction(t)){if(f)return t.name;var e=t.toString().match(y);return e&&e[1]}}function h(t,e){return"string"==typeof t?t.length<e?t:t.slice(0,e):t}function d(t){if(f||!u.isFunction(t))return u.inspect(t);var e=g(t);return"[Function"+(e?": "+e:"")+"]"}function b(t,e,r,n,o){throw new p.AssertionError({message:r,actual:t,expected:e,operator:n,stackStartFunction:o})}function m(t,e){t||b(t,!0,e,"==",p.ok)}function v(t,e,r,n){if(t===e)return!0;if(i(t)&&i(e))return 0===o(t,e);if(u.isDate(t)&&u.isDate(e))return t.getTime()===e.getTime();if(u.isRegExp(t)&&u.isRegExp(e))return t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase;if(null!==t&&"object"==typeof t||null!==e&&"object"==typeof e){if(l(t)&&l(e)&&s(t)===s(e)&&!(t instanceof Float32Array||t instanceof Float64Array))return 0===o(new Uint8Array(t.buffer),new Uint8Array(e.buffer));if(i(t)!==i(e))return!1;var c=(n=n||{actual:[],expected:[]}).actual.indexOf(t);return-1!==c&&c===n.expected.indexOf(e)||(n.actual.push(t),n.expected.push(e),function(t,e,r,n){if(null===t||void 0===t||null===e||void 0===e)return!1;if(u.isPrimitive(t)||u.isPrimitive(e))return t===e;if(r&&Object.getPrototypeOf(t)!==Object.getPrototypeOf(e))return!1;var o=w(t),i=w(e);if(o&&!i||!o&&i)return!1;if(o)return t=a.call(t),e=a.call(e),v(t,e,r);var c,f,s=j(t),l=j(e);if(s.length!==l.length)return!1;for(s.sort(),l.sort(),f=s.length-1;f>=0;f--)if(s[f]!==l[f])return!1;for(f=s.length-1;f>=0;f--)if(c=s[f],!v(t[c],e[c],r,n))return!1;return!0}(t,e,r,n))}return r?t===e:t==e}function w(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function O(t,e){if(!t||!e)return!1;if("[object RegExp]"==Object.prototype.toString.call(e))return e.test(t);try{if(t instanceof e)return!0}catch(t){}return!Error.isPrototypeOf(e)&&!0===e.call({},t)}function E(t,e,r,n){var o;if("function"!=typeof e)throw new TypeError('"block" argument must be a function');"string"==typeof r&&(n=r,r=null),o=function(t){var e;try{t()}catch(t){e=t}return e}(e),n=(r&&r.name?" ("+r.name+").":".")+(n?" "+n:"."),t&&!o&&b(o,r,"Missing expected exception"+n);var i="string"==typeof n,c=!t&&u.isError(o),a=!t&&o&&!r;if((c&&i&&O(o,r)||a)&&b(o,r,"Got unwanted exception"+n),t&&o&&r&&!O(o,r)||!t&&o)throw o}p.AssertionError=function(t){var e;this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=h(d((e=this).actual),128)+" "+e.operator+" "+h(d(e.expected),128),this.generatedMessage=!0);var r=t.stackStartFunction||b;if(Error.captureStackTrace)Error.captureStackTrace(this,r);else{var n=new Error;if(n.stack){var o=n.stack,i=g(r),u=o.indexOf("\n"+i);if(u>=0){var c=o.indexOf("\n",u+1);o=o.substring(c+1)}this.stack=o}}},u.inherits(p.AssertionError,Error),p.fail=b,p.ok=m,p.equal=function(t,e,r){t!=e&&b(t,e,r,"==",p.equal)},p.notEqual=function(t,e,r){t==e&&b(t,e,r,"!=",p.notEqual)},p.deepEqual=function(t,e,r){v(t,e,!1)||b(t,e,r,"deepEqual",p.deepEqual)},p.deepStrictEqual=function(t,e,r){v(t,e,!0)||b(t,e,r,"deepStrictEqual",p.deepStrictEqual)},p.notDeepEqual=function(t,e,r){v(t,e,!1)&&b(t,e,r,"notDeepEqual",p.notDeepEqual)},p.notDeepStrictEqual=function t(e,r,n){v(e,r,!0)&&b(e,r,n,"notDeepStrictEqual",t)},p.strictEqual=function(t,e,r){t!==e&&b(t,e,r,"===",p.strictEqual)},p.notStrictEqual=function(t,e,r){t===e&&b(t,e,r,"!==",p.notStrictEqual)},p.throws=function(t,e,r){E(!0,t,e,r)},p.doesNotThrow=function(t,e,r){E(!1,t,e,r)},p.ifError=function(t){if(t)throw t},p.strict=n(function t(e,r){e||b(e,!0,r,"==",t)},p,{equal:p.strictEqual,deepEqual:p.deepStrictEqual,notEqual:p.notStrictEqual,notDeepEqual:p.notDeepStrictEqual}),p.strict.strict=p.strict;var j=Object.keys||function(t){var e=[];for(var r in t)c.call(t,r)&&e.push(r);return e}}).call(this,r(4))},806:function(t,e,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(t){n[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var r,u,c=function(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(t),a=1;a<arguments.length;a++){for(var f in r=Object(arguments[a]))o.call(r,f)&&(c[f]=r[f]);if(n){u=n(r);for(var s=0;s<u.length;s++)i.call(r,u[s])&&(c[u[s]]=r[u[s]])}}return c}},807:function(t,e){var r,n,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function c(t){if(r===setTimeout)return setTimeout(t,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(t){r=i}try{n="function"==typeof clearTimeout?clearTimeout:u}catch(t){n=u}}();var a,f=[],s=!1,l=-1;function p(){s&&a&&(s=!1,a.length?f=a.concat(f):l=-1,f.length&&y())}function y(){if(!s){var t=c(p);s=!0;for(var e=f.length;e;){for(a=f,f=[];++l<e;)a&&a[l].run();l=-1,e=f.length}a=null,s=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===u||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function g(t,e){this.fun=t,this.array=e}function h(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];f.push(new g(t,e)),1!==f.length||s||c(y)},g.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},808:function(t,e){t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},809:function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}}}]);