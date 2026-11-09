var fv=Object.create;var Md=Object.defineProperty;var hv=Object.getOwnPropertyDescriptor;var dv=Object.getOwnPropertyNames;var pv=Object.getPrototypeOf,mv=Object.prototype.hasOwnProperty;var Ro=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),Do=(n,t)=>{for(var e in t)Md(n,e,{get:t[e],enumerable:!0})},gv=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of dv(t))!mv.call(n,r)&&r!==e&&Md(n,r,{get:()=>t[r],enumerable:!(i=hv(t,r))||i.enumerable});return n};var wg=(n,t,e)=>(e=n!=null?fv(pv(n)):{},gv(t||!n||!n.__esModule?Md(e,"default",{value:n,enumerable:!0}):e,n));var M_=Ro(ge=>{"use strict";var sn=typeof Symbol=="function"&&Symbol.for,Xp=sn?Symbol.for("react.element"):60103,qp=sn?Symbol.for("react.portal"):60106,If=sn?Symbol.for("react.fragment"):60107,Rf=sn?Symbol.for("react.strict_mode"):60108,Df=sn?Symbol.for("react.profiler"):60114,Pf=sn?Symbol.for("react.provider"):60109,Lf=sn?Symbol.for("react.context"):60110,Yp=sn?Symbol.for("react.async_mode"):60111,Ff=sn?Symbol.for("react.concurrent_mode"):60111,Bf=sn?Symbol.for("react.forward_ref"):60112,Of=sn?Symbol.for("react.suspense"):60113,QT=sn?Symbol.for("react.suspense_list"):60120,Uf=sn?Symbol.for("react.memo"):60115,Nf=sn?Symbol.for("react.lazy"):60116,tA=sn?Symbol.for("react.block"):60121,eA=sn?Symbol.for("react.fundamental"):60117,nA=sn?Symbol.for("react.responder"):60118,iA=sn?Symbol.for("react.scope"):60119;function Yn(n){if(typeof n=="object"&&n!==null){var t=n.$$typeof;switch(t){case Xp:switch(n=n.type,n){case Yp:case Ff:case If:case Df:case Rf:case Of:return n;default:switch(n=n&&n.$$typeof,n){case Lf:case Bf:case Nf:case Uf:case Pf:return n;default:return t}}case qp:return t}}}function S_(n){return Yn(n)===Ff}ge.AsyncMode=Yp;ge.ConcurrentMode=Ff;ge.ContextConsumer=Lf;ge.ContextProvider=Pf;ge.Element=Xp;ge.ForwardRef=Bf;ge.Fragment=If;ge.Lazy=Nf;ge.Memo=Uf;ge.Portal=qp;ge.Profiler=Df;ge.StrictMode=Rf;ge.Suspense=Of;ge.isAsyncMode=function(n){return S_(n)||Yn(n)===Yp};ge.isConcurrentMode=S_;ge.isContextConsumer=function(n){return Yn(n)===Lf};ge.isContextProvider=function(n){return Yn(n)===Pf};ge.isElement=function(n){return typeof n=="object"&&n!==null&&n.$$typeof===Xp};ge.isForwardRef=function(n){return Yn(n)===Bf};ge.isFragment=function(n){return Yn(n)===If};ge.isLazy=function(n){return Yn(n)===Nf};ge.isMemo=function(n){return Yn(n)===Uf};ge.isPortal=function(n){return Yn(n)===qp};ge.isProfiler=function(n){return Yn(n)===Df};ge.isStrictMode=function(n){return Yn(n)===Rf};ge.isSuspense=function(n){return Yn(n)===Of};ge.isValidElementType=function(n){return typeof n=="string"||typeof n=="function"||n===If||n===Ff||n===Df||n===Rf||n===Of||n===QT||typeof n=="object"&&n!==null&&(n.$$typeof===Nf||n.$$typeof===Uf||n.$$typeof===Pf||n.$$typeof===Lf||n.$$typeof===Bf||n.$$typeof===eA||n.$$typeof===nA||n.$$typeof===iA||n.$$typeof===tA)};ge.typeOf=Yn});var T_=Ro((QD,w_)=>{"use strict";w_.exports=M_()});var P_=Ro((tP,D_)=>{"use strict";var jp=T_(),rA={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},sA={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},oA={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},I_={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},$p={};$p[jp.ForwardRef]=oA;$p[jp.Memo]=I_;function A_(n){return jp.isMemo(n)?I_:$p[n.$$typeof]||rA}var aA=Object.defineProperty,lA=Object.getOwnPropertyNames,E_=Object.getOwnPropertySymbols,cA=Object.getOwnPropertyDescriptor,uA=Object.getPrototypeOf,C_=Object.prototype;function R_(n,t,e){if(typeof t!="string"){if(C_){var i=uA(t);i&&i!==C_&&R_(n,i,e)}var r=lA(t);E_&&(r=r.concat(E_(t)));for(var s=A_(n),o=A_(t),a=0;a<r.length;++a){var l=r[a];if(!sA[l]&&!(e&&e[l])&&!(o&&o[l])&&!(s&&s[l])){var c=cA(t,l);try{aA(n,l,c)}catch{}}}}return n}D_.exports=R_});var B_=Ro((eP,F_)=>{"use strict";var L_=Object.getOwnPropertySymbols,fA=Object.prototype.hasOwnProperty,hA=Object.prototype.propertyIsEnumerable;function dA(n){if(n==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(n)}function pA(){try{if(!Object.assign)return!1;var n=new String("abc");if(n[5]="de",Object.getOwnPropertyNames(n)[0]==="5")return!1;for(var t={},e=0;e<10;e++)t["_"+String.fromCharCode(e)]=e;var i=Object.getOwnPropertyNames(t).map(function(s){return t[s]});if(i.join("")!=="0123456789")return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(s){r[s]=s}),Object.keys(Object.assign({},r)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}F_.exports=pA()?Object.assign:function(n,t){for(var e,i=dA(n),r,s=1;s<arguments.length;s++){e=Object(arguments[s]);for(var o in e)fA.call(e,o)&&(i[o]=e[o]);if(L_){r=L_(e);for(var a=0;a<r.length;a++)hA.call(e,r[a])&&(i[r[a]]=e[r[a]])}}return i}});var Y_=Ro(ye=>{"use strict";var tm=B_(),Di=typeof Symbol=="function"&&Symbol.for,Al=Di?Symbol.for("react.element"):60103,mA=Di?Symbol.for("react.portal"):60106,gA=Di?Symbol.for("react.fragment"):60107,yA=Di?Symbol.for("react.strict_mode"):60108,_A=Di?Symbol.for("react.profiler"):60114,xA=Di?Symbol.for("react.provider"):60109,vA=Di?Symbol.for("react.context"):60110,bA=Di?Symbol.for("react.forward_ref"):60112,SA=Di?Symbol.for("react.suspense"):60113,MA=Di?Symbol.for("react.memo"):60115,wA=Di?Symbol.for("react.lazy"):60116,O_=typeof Symbol=="function"&&Symbol.iterator;function El(n){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+n,e=1;e<arguments.length;e++)t+="&args[]="+encodeURIComponent(arguments[e]);return"Minified React error #"+n+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var U_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N_={};function fa(n,t,e){this.props=n,this.context=t,this.refs=N_,this.updater=e||U_}fa.prototype.isReactComponent={};fa.prototype.setState=function(n,t){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error(El(85));this.updater.enqueueSetState(this,n,t,"setState")};fa.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function k_(){}k_.prototype=fa.prototype;function em(n,t,e){this.props=n,this.context=t,this.refs=N_,this.updater=e||U_}var nm=em.prototype=new k_;nm.constructor=em;tm(nm,fa.prototype);nm.isPureReactComponent=!0;var im={current:null},z_=Object.prototype.hasOwnProperty,V_={key:!0,ref:!0,__self:!0,__source:!0};function H_(n,t,e){var i,r={},s=null,o=null;if(t!=null)for(i in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(s=""+t.key),t)z_.call(t,i)&&!V_.hasOwnProperty(i)&&(r[i]=t[i]);var a=arguments.length-2;if(a===1)r.children=e;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Al,type:n,key:s,ref:o,props:r,_owner:im.current}}function TA(n,t){return{$$typeof:Al,type:n.type,key:t,ref:n.ref,props:n.props,_owner:n._owner}}function rm(n){return typeof n=="object"&&n!==null&&n.$$typeof===Al}function AA(n){var t={"=":"=0",":":"=2"};return"$"+(""+n).replace(/[=:]/g,function(e){return t[e]})}var G_=/\/+/g,kf=[];function W_(n,t,e,i){if(kf.length){var r=kf.pop();return r.result=n,r.keyPrefix=t,r.func=e,r.context=i,r.count=0,r}return{result:n,keyPrefix:t,func:e,context:i,count:0}}function X_(n){n.result=null,n.keyPrefix=null,n.func=null,n.context=null,n.count=0,10>kf.length&&kf.push(n)}function Jp(n,t,e,i){var r=typeof n;(r==="undefined"||r==="boolean")&&(n=null);var s=!1;if(n===null)s=!0;else switch(r){case"string":case"number":s=!0;break;case"object":switch(n.$$typeof){case Al:case mA:s=!0}}if(s)return e(i,n,t===""?"."+Zp(n,0):t),1;if(s=0,t=t===""?".":t+":",Array.isArray(n))for(var o=0;o<n.length;o++){r=n[o];var a=t+Zp(r,o);s+=Jp(r,a,e,i)}else if(n===null||typeof n!="object"?a=null:(a=O_&&n[O_]||n["@@iterator"],a=typeof a=="function"?a:null),typeof a=="function")for(n=a.call(n),o=0;!(r=n.next()).done;)r=r.value,a=t+Zp(r,o++),s+=Jp(r,a,e,i);else if(r==="object")throw e=""+n,Error(El(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e,""));return s}function Kp(n,t,e){return n==null?0:Jp(n,"",t,e)}function Zp(n,t){return typeof n=="object"&&n!==null&&n.key!=null?AA(n.key):t.toString(36)}function EA(n,t){n.func.call(n.context,t,n.count++)}function CA(n,t,e){var i=n.result,r=n.keyPrefix;n=n.func.call(n.context,t,n.count++),Array.isArray(n)?Qp(n,i,e,function(s){return s}):n!=null&&(rm(n)&&(n=TA(n,r+(!n.key||t&&t.key===n.key?"":(""+n.key).replace(G_,"$&/")+"/")+e)),i.push(n))}function Qp(n,t,e,i,r){var s="";e!=null&&(s=(""+e).replace(G_,"$&/")+"/"),t=W_(t,s,i,r),Kp(n,CA,t),X_(t)}var q_={current:null};function Tr(){var n=q_.current;if(n===null)throw Error(El(321));return n}var IA={ReactCurrentDispatcher:q_,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:im,IsSomeRendererActing:{current:!1},assign:tm};ye.Children={map:function(n,t,e){if(n==null)return n;var i=[];return Qp(n,i,null,t,e),i},forEach:function(n,t,e){if(n==null)return n;t=W_(null,null,t,e),Kp(n,EA,t),X_(t)},count:function(n){return Kp(n,function(){return null},null)},toArray:function(n){var t=[];return Qp(n,t,null,function(e){return e}),t},only:function(n){if(!rm(n))throw Error(El(143));return n}};ye.Component=fa;ye.Fragment=gA;ye.Profiler=_A;ye.PureComponent=em;ye.StrictMode=yA;ye.Suspense=SA;ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=IA;ye.cloneElement=function(n,t,e){if(n==null)throw Error(El(267,n));var i=tm({},n.props),r=n.key,s=n.ref,o=n._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,o=im.current),t.key!==void 0&&(r=""+t.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in t)z_.call(t,l)&&!V_.hasOwnProperty(l)&&(i[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)i.children=e;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Al,type:n.type,key:r,ref:s,props:i,_owner:o}};ye.createContext=function(n,t){return t===void 0&&(t=null),n={$$typeof:vA,_calculateChangedBits:t,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null},n.Provider={$$typeof:xA,_context:n},n.Consumer=n};ye.createElement=H_;ye.createFactory=function(n){var t=H_.bind(null,n);return t.type=n,t};ye.createRef=function(){return{current:null}};ye.forwardRef=function(n){return{$$typeof:bA,render:n}};ye.isValidElement=rm;ye.lazy=function(n){return{$$typeof:wA,_ctor:n,_status:-1,_result:null}};ye.memo=function(n,t){return{$$typeof:MA,type:n,compare:t===void 0?null:t}};ye.useCallback=function(n,t){return Tr().useCallback(n,t)};ye.useContext=function(n,t){return Tr().useContext(n,t)};ye.useDebugValue=function(){};ye.useEffect=function(n,t){return Tr().useEffect(n,t)};ye.useImperativeHandle=function(n,t,e){return Tr().useImperativeHandle(n,t,e)};ye.useLayoutEffect=function(n,t){return Tr().useLayoutEffect(n,t)};ye.useMemo=function(n,t){return Tr().useMemo(n,t)};ye.useReducer=function(n,t,e){return Tr().useReducer(n,t,e)};ye.useRef=function(n){return Tr().useRef(n)};ye.useState=function(n){return Tr().useState(n)};ye.version="16.14.0"});var $_=Ro((iP,j_)=>{"use strict";j_.exports=Y_()});var fs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},hs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kg=0,ip=1,Qg=2;var rp=1,ty=2,Qi=3,br=0,An=1,qn=2,Sr=0,Xs=1,sp=2,op=3,ap=4,ey=5,rs=100,ny=101,iy=102,ry=103,sy=104,oy=200,ay=201,ly=202,cy=203,ru=204,su=205,uy=206,fy=207,hy=208,dy=209,py=210,my=211,gy=212,yy=213,_y=214,Ru=0,Du=1,Pu=2,qs=3,Lu=4,Fu=5,Bu=6,Ou=7,lp=0,xy=1,vy=2,Mr=0,by=1,Sy=2,My=3,wy=4,Ty=5,Ay=6,Ey=7;var cp=300,$s=301,Zs=302,Uu=303,Nu=304,xl=306,ou=1e3,is=1001,au=1002,li=1003,Cy=1004;var vl=1005;var Ei=1006,ku=1007;var ds=1008;var Ri=1009,up=1010,fp=1011,na=1012,zu=1013,ps=1014,tr=1015,ia=1016,Vu=1017,Hu=1018,ra=1020,hp=35902,dp=35899,pp=1021,mp=1022,ui=1023,qo=1026,sa=1027,gp=1028,Gu=1029,yp=1030,Wu=1031;var Xu=1033,bl=33776,Sl=33777,Ml=33778,wl=33779,qu=35840,Yu=35841,ju=35842,$u=35843,Zu=36196,Ju=37492,Ku=37496,Qu=37808,tf=37809,ef=37810,nf=37811,rf=37812,sf=37813,of=37814,af=37815,lf=37816,cf=37817,uf=37818,ff=37819,hf=37820,df=37821,pf=36492,mf=36494,gf=36495,yf=36283,_f=36284,xf=36285,vf=36286;var ja=2300,lu=2301,iu=2302,jd=2400,$d=2401,Zd=2402;var Iy=3200,Ry=3201;var _p=0,Dy=1,wr="",Tn="srgb",Ys="srgb-linear",$a="linear",me="srgb";var Ws=7680;var Jd=519,Py=512,Ly=513,Fy=514,xp=515,By=516,Oy=517,Uy=518,Ny=519,Kd=35044;var vp="300 es",Ti=2e3,Za=2001;var Zi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let r=i[t];if(r!==void 0){let s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}},gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Tg=1234567,qa=Math.PI/180,Yo=180/Math.PI;function oa(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]+"-"+gn[t&255]+gn[t>>8&255]+"-"+gn[t>>16&15|64]+gn[t>>24&255]+"-"+gn[e&63|128]+gn[e>>8&255]+"-"+gn[e>>16&255]+gn[e>>24&255]+gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]).toLowerCase()}function re(n,t,e){return Math.max(t,Math.min(e,n))}function bp(n,t){return(n%t+t)%t}function yv(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function _v(n,t,e){return n!==t?(e-n)/(t-n):0}function Ya(n,t,e){return(1-e)*n+e*t}function xv(n,t,e,i){return Ya(n,t,1-Math.exp(-e*i))}function vv(n,t=1){return t-Math.abs(bp(n,t*2)-t)}function bv(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Sv(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Mv(n,t){return n+Math.floor(Math.random()*(t-n+1))}function wv(n,t){return n+Math.random()*(t-n)}function Tv(n){return n*(.5-Math.random())}function Av(n){n!==void 0&&(Tg=n);let t=Tg+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ev(n){return n*qa}function Cv(n){return n*Yo}function Iv(n){return(n&n-1)===0&&n!==0}function Rv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Dv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Pv(n,t,e,i,r){let s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+i)/2),u=o((t+i)/2),f=s((t-i)/2),h=o((t-i)/2),p=s((i-t)/2),g=o((i-t)/2);switch(r){case"XYX":n.set(a*u,l*f,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*f,a*c);break;case"ZXZ":n.set(l*f,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Wo(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function wn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Sp={DEG2RAD:qa,RAD2DEG:Yo,generateUUID:oa,clamp:re,euclideanModulo:bp,mapLinear:yv,inverseLerp:_v,lerp:Ya,damp:xv,pingpong:vv,smoothstep:bv,smootherstep:Sv,randInt:Mv,randFloat:wv,randFloatSpread:Tv,seededRandom:Av,degToRad:Ev,radToDeg:Cv,isPowerOfTwo:Iv,ceilPowerOfTwo:Rv,floorPowerOfTwo:Dv,setQuaternionFromProperEuler:Pv,normalize:wn,denormalize:Wo},kt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ci=class{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],h=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==h||c!==p||u!==g){let m=1-a,d=l*h+c*p+u*g+f*_,A=d>=0?1:-1,w=1-d*d;if(w>Number.EPSILON){let C=Math.sqrt(w),E=Math.atan2(C,d*A);m=Math.sin(m*E)/C,a=Math.sin(a*E)/C}let S=a*A;if(l=l*m+h*S,c=c*m+p*S,u=u*m+g*S,f=f*m+_*S,m===1-a){let C=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=C,c*=C,u*=C,f*=C}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],p=s[o+2],g=s[o+3];return t[e]=a*g+u*f+l*p-c*h,t[e+1]=l*g+u*h+c*f-a*p,t[e+2]=c*g+u*p+a*h-l*f,t[e+3]=u*g-a*f-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"YXZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"ZXY":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"ZYX":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"YZX":this._x=h*u*f+c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f-h*p*g;break;case"XZY":this._x=h*u*f-c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){let p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){let p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,r=this._y,s=this._z,o=this._w,a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ag.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ag.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),u=2*(a*e-s*r),f=2*(s*i-o*e);return this.x=e+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return wd.copy(this).projectOnVector(t),this.sub(wd)}reflect(t){return this.sub(wd.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},wd=new P,Ag=new ci,jt=class n{constructor(t,e,i,r,s,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){let u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],g=i[8],_=r[0],m=r[3],d=r[6],A=r[1],w=r[4],S=r[7],C=r[2],E=r[5],I=r[8];return s[0]=o*_+a*A+l*C,s[3]=o*m+a*w+l*E,s[6]=o*d+a*S+l*I,s[1]=c*_+u*A+f*C,s[4]=c*m+u*w+f*E,s[7]=c*d+u*S+f*I,s[2]=h*_+p*A+g*C,s[5]=h*m+p*w+g*E,s[8]=h*d+p*S+g*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,h=a*l-u*s,p=c*s-o*l,g=e*f+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=f*_,t[1]=(r*c-u*i)*_,t[2]=(a*i-r*o)*_,t[3]=h*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=p*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*s)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Td.makeScale(t,e)),this}rotate(t){return this.premultiply(Td.makeRotation(-t)),this}translate(t,e){return this.premultiply(Td.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Td=new jt;function Mp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ja(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ky(){let n=Ja("canvas");return n.style.display="block",n}var Eg={};function jo(n){n in Eg||(Eg[n]=!0,console.warn(n))}function zy(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}var Cg=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ig=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lv(){let n={enabled:!0,workingColorSpace:Ys,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===me&&(r.r=vr(r.r),r.g=vr(r.g),r.b=vr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===me&&(r.r=Xo(r.r),r.g=Xo(r.g),r.b=Xo(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===wr?$a:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return jo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return jo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ys]:{primaries:t,whitePoint:i,transfer:$a,toXYZ:Cg,fromXYZ:Ig,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Tn},outputColorSpaceConfig:{drawingBufferColorSpace:Tn}},[Tn]:{primaries:t,whitePoint:i,transfer:me,toXYZ:Cg,fromXYZ:Ig,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Tn}}}),n}var ue=Lv();function vr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Xo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Po,cu=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Po===void 0&&(Po=Ja("canvas")),Po.width=t.width,Po.height=t.height;let r=Po.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=Po}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ja("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=vr(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(vr(e[i]/255)*255):e[i]=vr(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Fv=0,$o=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fv++}),this.uuid=oa(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ad(r[o].image)):s.push(Ad(r[o]))}else s=Ad(r);i.url=s}return e||(t.images[this.uuid]=i),i}};function Ad(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?cu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Bv=0,Ed=new P,Gn=class n extends Zi{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=is,r=is,s=Ei,o=ds,a=ui,l=Ri,c=n.DEFAULT_ANISOTROPY,u=wr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bv++}),this.uuid=oa(),this.name="",this.source=new $o(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ed).x}get height(){return this.source.getSize(Ed).y}get depth(){return this.source.getSize(Ed).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==cp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ou:t.x=t.x-Math.floor(t.x);break;case is:t.x=t.x<0?0:1;break;case au:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ou:t.y=t.y-Math.floor(t.y);break;case is:t.y=t.y<0?0:1;break;case au:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=cp;Gn.DEFAULT_ANISOTROPY=1;var Ne=class n{constructor(t=0,e=0,i=0,r=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s,l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,S=(p+1)/2,C=(d+1)/2,E=(u+h)/4,I=(f+_)/4,B=(g+m)/4;return w>S&&w>C?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=E/i,s=I/i):S>C?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=B/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=I/s,r=B/s),this.set(i,r,s,e),this}let A=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(f-_)/A,this.z=(h-u)/A,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},uu=class extends Zi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ne(0,0,t,e),this.scissorTest=!1,this.viewport=new Ne(0,0,t,e);let r={width:t,height:e,depth:i.depth},s=new Gn(r);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let e={minFilter:Ei,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let r=Object.assign({},t.textures[e].image);this.textures[e].source=new $o(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ji=class extends uu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Ka=class extends Gn{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=li,this.minFilter=li,this.wrapR=is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var fu=class extends Gn{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=li,this.minFilter=li,this.wrapR=is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Wn=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Si.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Si.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Si.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Si):Si.fromBufferAttribute(s,o),Si.applyMatrix4(t.matrixWorld),this.expandByPoint(Si);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Fc.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fc.copy(i.boundingBox)),Fc.applyMatrix4(t.matrixWorld),this.union(Fc)}let r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Si),Si.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Va),Bc.subVectors(this.max,Va),Lo.subVectors(t.a,Va),Fo.subVectors(t.b,Va),Bo.subVectors(t.c,Va),Zr.subVectors(Fo,Lo),Jr.subVectors(Bo,Fo),zs.subVectors(Lo,Bo);let e=[0,-Zr.z,Zr.y,0,-Jr.z,Jr.y,0,-zs.z,zs.y,Zr.z,0,-Zr.x,Jr.z,0,-Jr.x,zs.z,0,-zs.x,-Zr.y,Zr.x,0,-Jr.y,Jr.x,0,-zs.y,zs.x,0];return!Cd(e,Lo,Fo,Bo,Bc)||(e=[1,0,0,0,1,0,0,0,1],!Cd(e,Lo,Fo,Bo,Bc))?!1:(Oc.crossVectors(Zr,Jr),e=[Oc.x,Oc.y,Oc.z],Cd(e,Lo,Fo,Bo,Bc))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Si).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Si).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(mr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),mr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),mr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),mr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),mr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),mr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),mr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),mr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(mr),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},mr=[new P,new P,new P,new P,new P,new P,new P,new P],Si=new P,Fc=new Wn,Lo=new P,Fo=new P,Bo=new P,Zr=new P,Jr=new P,zs=new P,Va=new P,Bc=new P,Oc=new P,Vs=new P;function Cd(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Vs.fromArray(n,s);let a=r.x*Math.abs(Vs.x)+r.y*Math.abs(Vs.y)+r.z*Math.abs(Vs.z),l=t.dot(Vs),c=e.dot(Vs),u=i.dot(Vs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var Ov=new Wn,Ha=new P,Id=new P,ss=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Ov.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ha.subVectors(t,this.center);let e=Ha.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Ha,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Id.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ha.copy(t.center).add(Id)),this.expandByPoint(Ha.copy(t.center).sub(Id))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},gr=new P,Rd=new P,Uc=new P,Kr=new P,Dd=new P,Nc=new P,Pd=new P,os=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,gr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=gr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(gr.copy(this.origin).addScaledVector(this.direction,e),gr.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Rd.copy(t).add(e).multiplyScalar(.5),Uc.copy(e).sub(t).normalize(),Kr.copy(this.origin).sub(Rd);let s=t.distanceTo(e)*.5,o=-this.direction.dot(Uc),a=Kr.dot(this.direction),l=-Kr.dot(Uc),c=Kr.lengthSq(),u=Math.abs(1-o*o),f,h,p,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){let _=1/u;f*=_,h*=_,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Rd).addScaledVector(Uc,h),p}intersectSphere(t,e){gr.subVectors(t.center,this.origin);let i=gr.dot(this.direction),r=gr.dot(gr)-i*i,s=t.radius*t.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,r=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,r=(t.min.x-h.x)*c),u>=0?(s=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,gr)!==null}intersectTriangle(t,e,i,r,s){Dd.subVectors(e,t),Nc.subVectors(i,t),Pd.crossVectors(Dd,Nc);let o=this.direction.dot(Pd),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Kr.subVectors(this.origin,t);let l=a*this.direction.dot(Nc.crossVectors(Kr,Nc));if(l<0)return null;let c=a*this.direction.dot(Dd.cross(Kr));if(c<0||l+c>o)return null;let u=-a*Kr.dot(Pd);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ie=class n{constructor(t,e,i,r,s,o,a,l,c,u,f,h,p,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,u,f,h,p,g,_,m)}set(t,e,i,r,s,o,a,l,c,u,f,h,p,g,_,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,r=1/Oo.setFromMatrixColumn(t,0).length(),s=1/Oo.setFromMatrixColumn(t,1).length(),o=1/Oo.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){let h=o*u,p=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=p+g*c,e[5]=h-_*c,e[9]=-a*l,e[2]=_-h*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let h=l*u,p=l*f,g=c*u,_=c*f;e[0]=h+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+h*a,e[10]=o*l}else if(t.order==="ZXY"){let h=l*u,p=l*f,g=c*u,_=c*f;e[0]=h-_*a,e[4]=-o*f,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let h=o*u,p=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=g*c-p,e[8]=h*c+_,e[1]=l*f,e[5]=_*c+h,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let h=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-h*f,e[8]=g*f+p,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*f+g,e[10]=h-_*f}else if(t.order==="XZY"){let h=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+_,e[5]=o*u,e[9]=p*f-g,e[2]=g*f-p,e[6]=a*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Uv,t,Nv)}lookAt(t,e,i){let r=this.elements;return Vn.subVectors(t,e),Vn.lengthSq()===0&&(Vn.z=1),Vn.normalize(),Qr.crossVectors(i,Vn),Qr.lengthSq()===0&&(Math.abs(i.z)===1?Vn.x+=1e-4:Vn.z+=1e-4,Vn.normalize(),Qr.crossVectors(i,Vn)),Qr.normalize(),kc.crossVectors(Vn,Qr),r[0]=Qr.x,r[4]=kc.x,r[8]=Vn.x,r[1]=Qr.y,r[5]=kc.y,r[9]=Vn.y,r[2]=Qr.z,r[6]=kc.z,r[10]=Vn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],A=i[3],w=i[7],S=i[11],C=i[15],E=r[0],I=r[4],B=r[8],b=r[12],v=r[1],R=r[5],N=r[9],V=r[13],W=r[2],Y=r[6],X=r[10],nt=r[14],H=r[3],ot=r[7],ft=r[11],wt=r[15];return s[0]=o*E+a*v+l*W+c*H,s[4]=o*I+a*R+l*Y+c*ot,s[8]=o*B+a*N+l*X+c*ft,s[12]=o*b+a*V+l*nt+c*wt,s[1]=u*E+f*v+h*W+p*H,s[5]=u*I+f*R+h*Y+p*ot,s[9]=u*B+f*N+h*X+p*ft,s[13]=u*b+f*V+h*nt+p*wt,s[2]=g*E+_*v+m*W+d*H,s[6]=g*I+_*R+m*Y+d*ot,s[10]=g*B+_*N+m*X+d*ft,s[14]=g*b+_*V+m*nt+d*wt,s[3]=A*E+w*v+S*W+C*H,s[7]=A*I+w*R+S*Y+C*ot,s[11]=A*B+w*N+S*X+C*ft,s[15]=A*b+w*V+S*nt+C*wt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*p-i*l*p)+_*(+e*l*p-e*c*h+s*o*h-r*o*p+r*c*u-s*l*u)+m*(+e*c*f-e*a*p-s*o*f+i*o*p+s*a*u-i*c*u)+d*(-r*a*u-e*l*f+e*a*h+r*o*f-i*o*h+i*l*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],A=f*m*c-_*h*c+_*l*p-a*m*p-f*l*d+a*h*d,w=g*h*c-u*m*c-g*l*p+o*m*p+u*l*d-o*h*d,S=u*_*c-g*f*c+g*a*p-o*_*p-u*a*d+o*f*d,C=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,E=e*A+i*w+r*S+s*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/E;return t[0]=A*I,t[1]=(_*h*s-f*m*s-_*r*p+i*m*p+f*r*d-i*h*d)*I,t[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*d+i*l*d)*I,t[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*p-i*l*p)*I,t[4]=w*I,t[5]=(u*m*s-g*h*s+g*r*p-e*m*p-u*r*d+e*h*d)*I,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*d-e*l*d)*I,t[7]=(o*h*s-u*l*s+u*r*c-e*h*c-o*r*p+e*l*p)*I,t[8]=S*I,t[9]=(g*f*s-u*_*s-g*i*p+e*_*p+u*i*d-e*f*d)*I,t[10]=(o*_*s-g*a*s+g*i*c-e*_*c-o*i*d+e*a*d)*I,t[11]=(u*a*s-o*f*s-u*i*c+e*f*c+o*i*p-e*a*p)*I,t[12]=C*I,t[13]=(u*_*r-g*f*r+g*i*h-e*_*h-u*i*m+e*f*m)*I,t[14]=(g*a*r-o*_*r-g*i*l+e*_*l+o*i*m-e*a*m)*I,t[15]=(o*f*r-u*a*r+u*i*l-e*f*l-o*i*h+e*a*h)*I,this}scale(t){let e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){let r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,f=a+a,h=s*c,p=s*u,g=s*f,_=o*u,m=o*f,d=a*f,A=l*c,w=l*u,S=l*f,C=i.x,E=i.y,I=i.z;return r[0]=(1-(_+d))*C,r[1]=(p+S)*C,r[2]=(g-w)*C,r[3]=0,r[4]=(p-S)*E,r[5]=(1-(h+d))*E,r[6]=(m+A)*E,r[7]=0,r[8]=(g+w)*I,r[9]=(m-A)*I,r[10]=(1-(h+_))*I,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){let r=this.elements,s=Oo.set(r[0],r[1],r[2]).length(),o=Oo.set(r[4],r[5],r[6]).length(),a=Oo.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Mi.copy(this);let c=1/s,u=1/o,f=1/a;return Mi.elements[0]*=c,Mi.elements[1]*=c,Mi.elements[2]*=c,Mi.elements[4]*=u,Mi.elements[5]*=u,Mi.elements[6]*=u,Mi.elements[8]*=f,Mi.elements[9]*=f,Mi.elements[10]*=f,e.setFromRotationMatrix(Mi),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=Ti,l=!1){let c=this.elements,u=2*s/(e-t),f=2*s/(i-r),h=(e+t)/(e-t),p=(i+r)/(i-r),g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===Ti)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Za)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=Ti,l=!1){let c=this.elements,u=2/(e-t),f=2/(i-r),h=-(e+t)/(e-t),p=-(i+r)/(i-r),g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===Ti)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Za)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Oo=new P,Mi=new Ie,Uv=new P(0,0,0),Nv=new P(1,1,1),Qr=new P,kc=new P,Vn=new P,Rg=new Ie,Dg=new ci,Ci=class n{constructor(t=0,e=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-re(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-re(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Rg.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rg,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Dg.setFromEuler(this),this.setFromQuaternion(Dg,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ci.DEFAULT_ORDER="XYZ";var Qa=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},kv=0,Pg=new P,Uo=new ci,yr=new Ie,zc=new P,Ga=new P,zv=new P,Vv=new ci,Lg=new P(1,0,0),Fg=new P(0,1,0),Bg=new P(0,0,1),Og={type:"added"},Hv={type:"removed"},No={type:"childadded",child:null},Ld={type:"childremoved",child:null},$e=class n extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kv++}),this.uuid=oa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new P,e=new Ci,i=new ci,r=new P(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ie},normalMatrix:{value:new jt}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Uo.setFromAxisAngle(t,e),this.quaternion.multiply(Uo),this}rotateOnWorldAxis(t,e){return Uo.setFromAxisAngle(t,e),this.quaternion.premultiply(Uo),this}rotateX(t){return this.rotateOnAxis(Lg,t)}rotateY(t){return this.rotateOnAxis(Fg,t)}rotateZ(t){return this.rotateOnAxis(Bg,t)}translateOnAxis(t,e){return Pg.copy(t).applyQuaternion(this.quaternion),this.position.add(Pg.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Lg,t)}translateY(t){return this.translateOnAxis(Fg,t)}translateZ(t){return this.translateOnAxis(Bg,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yr.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?zc.copy(t):zc.set(t,e,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Ga.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yr.lookAt(Ga,zc,this.up):yr.lookAt(zc,Ga,this.up),this.quaternion.setFromRotationMatrix(yr),r&&(yr.extractRotation(r.matrixWorld),Uo.setFromRotationMatrix(yr),this.quaternion.premultiply(Uo.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Og),No.child=t,this.dispatchEvent(No),No.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Hv),Ld.child=t,this.dispatchEvent(Ld),Ld.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yr.multiply(t.parent.matrixWorld)),t.applyMatrix4(yr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Og),No.child=t,this.dispatchEvent(No),No.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ga,t,zv),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ga,Vv,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let r=t.children[i];this.add(r.clone())}return this}};$e.DEFAULT_UP=new P(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wi=new P,_r=new P,Fd=new P,xr=new P,ko=new P,zo=new P,Ug=new P,Bd=new P,Od=new P,Ud=new P,Nd=new Ne,kd=new Ne,zd=new Ne,ns=class n{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),wi.subVectors(t,e),r.cross(wi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){wi.subVectors(r,e),_r.subVectors(i,e),Fd.subVectors(t,e);let o=wi.dot(wi),a=wi.dot(_r),l=wi.dot(Fd),c=_r.dot(_r),u=_r.dot(Fd),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;let h=1/f,p=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-p-g,g,p)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,xr)===null?!1:xr.x>=0&&xr.y>=0&&xr.x+xr.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,xr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,xr.x),l.addScaledVector(o,xr.y),l.addScaledVector(a,xr.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return Nd.setScalar(0),kd.setScalar(0),zd.setScalar(0),Nd.fromBufferAttribute(t,e),kd.fromBufferAttribute(t,i),zd.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Nd,s.x),o.addScaledVector(kd,s.y),o.addScaledVector(zd,s.z),o}static isFrontFacing(t,e,i,r){return wi.subVectors(i,e),_r.subVectors(t,e),wi.cross(_r).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wi.subVectors(this.c,this.b),_r.subVectors(this.a,this.b),wi.cross(_r).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return n.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,r=this.b,s=this.c,o,a;ko.subVectors(r,i),zo.subVectors(s,i),Bd.subVectors(t,i);let l=ko.dot(Bd),c=zo.dot(Bd);if(l<=0&&c<=0)return e.copy(i);Od.subVectors(t,r);let u=ko.dot(Od),f=zo.dot(Od);if(u>=0&&f<=u)return e.copy(r);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(ko,o);Ud.subVectors(t,s);let p=ko.dot(Ud),g=zo.dot(Ud);if(g>=0&&p<=g)return e.copy(s);let _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(zo,a);let m=u*g-p*f;if(m<=0&&f-u>=0&&p-g>=0)return Ug.subVectors(s,r),a=(f-u)/(f-u+(p-g)),e.copy(r).addScaledVector(Ug,a);let d=1/(m+_+h);return o=_*d,a=h*d,e.copy(i).addScaledVector(ko,o).addScaledVector(zo,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Vy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ts={h:0,s:0,l:0},Vc={h:0,s:0,l:0};function Vd(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Jt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Tn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ue.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=ue.workingColorSpace){return this.r=t,this.g=e,this.b=i,ue.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=ue.workingColorSpace){if(t=bp(t,1),e=re(e,0,1),i=re(i,0,1),e===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=Vd(o,s,t+1/3),this.g=Vd(o,s,t),this.b=Vd(o,s,t-1/3)}return ue.colorSpaceToWorking(this,r),this}setStyle(t,e=Tn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Tn){let i=Vy[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vr(t.r),this.g=vr(t.g),this.b=vr(t.b),this}copyLinearToSRGB(t){return this.r=Xo(t.r),this.g=Xo(t.g),this.b=Xo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Tn){return ue.workingToColorSpace(yn.copy(this),t),Math.round(re(yn.r*255,0,255))*65536+Math.round(re(yn.g*255,0,255))*256+Math.round(re(yn.b*255,0,255))}getHexString(t=Tn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ue.workingColorSpace){ue.workingToColorSpace(yn.copy(this),e);let i=yn.r,r=yn.g,s=yn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ue.workingColorSpace){return ue.workingToColorSpace(yn.copy(this),e),t.r=yn.r,t.g=yn.g,t.b=yn.b,t}getStyle(t=Tn){ue.workingToColorSpace(yn.copy(this),t);let e=yn.r,i=yn.g,r=yn.b;return t!==Tn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(ts),this.setHSL(ts.h+t,ts.s+e,ts.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ts),t.getHSL(Vc);let i=Ya(ts.h,Vc.h,e),r=Ya(ts.s,Vc.s,e),s=Ya(ts.l,Vc.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},yn=new Jt;Jt.NAMES=Vy;var Gv=0,Ki=class extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gv++}),this.uuid=oa(),this.name="",this.type="Material",this.blending=Xs,this.side=br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ru,this.blendDst=su,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ws,this.stencilZFail=Ws,this.stencilZPass=Ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Xs&&(i.blending=this.blending),this.side!==br&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ru&&(i.blendSrc=this.blendSrc),this.blendDst!==su&&(i.blendDst=this.blendDst),this.blendEquation!==rs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==qs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ws&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ws&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ws&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(e){let s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},as=class extends Ki{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.combine=lp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ye=new P,Hc=new kt,Wv=0,xn=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wv++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Kd,this.updateRanges=[],this.gpuType=tr,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Hc.fromBufferAttribute(this,e),Hc.applyMatrix3(t),this.setXY(e,Hc.x,Hc.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix3(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Wo(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=wn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Wo(e,this.array)),e}setX(t,e){return this.normalized&&(e=wn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Wo(e,this.array)),e}setY(t,e){return this.normalized&&(e=wn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Wo(e,this.array)),e}setZ(t,e){return this.normalized&&(e=wn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Wo(e,this.array)),e}setW(t,e){return this.normalized&&(e=wn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=wn(e,this.array),i=wn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=wn(e,this.array),i=wn(i,this.array),r=wn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=wn(e,this.array),i=wn(i,this.array),r=wn(r,this.array),s=wn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Kd&&(t.usage=this.usage),t}};var tl=class extends xn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var el=class extends xn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var We=class extends xn{constructor(t,e,i){super(new Float32Array(t),e,i)}},Xv=0,oi=new Ie,Hd=new $e,Vo=new P,Hn=new Wn,Wa=new Wn,nn=new P,rn=class n extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xv++}),this.uuid=oa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Mp(t)?el:tl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new jt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return oi.makeRotationFromQuaternion(t),this.applyMatrix4(oi),this}rotateX(t){return oi.makeRotationX(t),this.applyMatrix4(oi),this}rotateY(t){return oi.makeRotationY(t),this.applyMatrix4(oi),this}rotateZ(t){return oi.makeRotationZ(t),this.applyMatrix4(oi),this}translate(t,e,i){return oi.makeTranslation(t,e,i),this.applyMatrix4(oi),this}scale(t,e,i){return oi.makeScale(t,e,i),this.applyMatrix4(oi),this}lookAt(t){return Hd.lookAt(t),Hd.updateMatrix(),this.applyMatrix4(Hd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vo).negate(),this.translate(Vo.x,Vo.y,Vo.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let r=0,s=t.length;r<s;r++){let o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new We(i,3))}else{let i=Math.min(t.length,e.count);for(let r=0;r<i;r++){let s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){let s=e[i];Hn.setFromBufferAttribute(s),this.morphTargetsRelative?(nn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(nn),nn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(nn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ss);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let i=this.boundingSphere.center;if(Hn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];Wa.setFromBufferAttribute(a),this.morphTargetsRelative?(nn.addVectors(Hn.min,Wa.min),Hn.expandByPoint(nn),nn.addVectors(Hn.max,Wa.max),Hn.expandByPoint(nn)):(Hn.expandByPoint(Wa.min),Hn.expandByPoint(Wa.max))}Hn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)nn.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(nn));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)nn.fromBufferAttribute(a,c),l&&(Vo.fromBufferAttribute(t,c),nn.add(Vo)),r=Math.max(r,i.distanceToSquared(nn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let B=0;B<i.count;B++)a[B]=new P,l[B]=new P;let c=new P,u=new P,f=new P,h=new kt,p=new kt,g=new kt,_=new P,m=new P;function d(B,b,v){c.fromBufferAttribute(i,B),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,v),h.fromBufferAttribute(s,B),p.fromBufferAttribute(s,b),g.fromBufferAttribute(s,v),u.sub(c),f.sub(c),p.sub(h),g.sub(h);let R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(R),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),a[B].add(_),a[b].add(_),a[v].add(_),l[B].add(m),l[b].add(m),l[v].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let B=0,b=A.length;B<b;++B){let v=A[B],R=v.start,N=v.count;for(let V=R,W=R+N;V<W;V+=3)d(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let w=new P,S=new P,C=new P,E=new P;function I(B){C.fromBufferAttribute(r,B),E.copy(C);let b=a[B];w.copy(b),w.sub(C.multiplyScalar(C.dot(b))).normalize(),S.crossVectors(E,b);let R=S.dot(l[B])<0?-1:1;o.setXYZW(B,w.x,w.y,w.z,R)}for(let B=0,b=A.length;B<b;++B){let v=A[B],R=v.start,N=v.count;for(let V=R,W=R+N;V<W;V+=3)I(t.getX(V+0)),I(t.getX(V+1)),I(t.getX(V+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new xn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let r=new P,s=new P,o=new P,a=new P,l=new P,c=new P,u=new P,f=new P;if(t)for(let h=0,p=t.count;h<p;h+=3){let g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)nn.fromBufferAttribute(t,e),nn.normalize(),t.setXYZ(e,nn.x,nn.y,nn.z)}toNonIndexed(){function t(a,l){let c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u),p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let d=0;d<u;d++)h[g++]=c[p++]}return new xn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=t(l,i);e.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){let h=c[u],p=t(h,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let p=c[f];u.push(p.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let r=t.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(e))}let s=t.morphAttributes;for(let c in s){let u=[],f=s[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,u=o.length;c<u;c++){let f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ng=new Ie,Hs=new os,Gc=new ss,kg=new P,Wc=new P,Xc=new P,qc=new P,Gd=new P,Yc=new P,zg=new P,jc=new P,vn=class extends $e{constructor(t=new rn,e=new as){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);let a=this.morphTargetInfluences;if(s&&a){Yc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],f=s[l];u!==0&&(Gd.fromBufferAttribute(f,t),o?Yc.addScaledVector(Gd,u):Yc.addScaledVector(Gd.sub(e),u))}e.add(Yc)}return e}raycast(t,e){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Gc.copy(i.boundingSphere),Gc.applyMatrix4(s),Hs.copy(t.ray).recast(t.near),!(Gc.containsPoint(Hs.origin)===!1&&(Hs.intersectSphere(Gc,kg)===null||Hs.origin.distanceToSquared(kg)>(t.far-t.near)**2))&&(Ng.copy(s).invert(),Hs.copy(t.ray).applyMatrix4(Ng),!(i.boundingBox!==null&&Hs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Hs)))}_computeIntersections(t,e,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],d=o[m.materialIndex],A=Math.max(m.start,p.start),w=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=A,C=w;S<C;S+=3){let E=a.getX(S),I=a.getX(S+1),B=a.getX(S+2);r=$c(this,d,t,i,c,u,f,E,I,B),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){let A=a.getX(m),w=a.getX(m+1),S=a.getX(m+2);r=$c(this,o,t,i,c,u,f,A,w,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],d=o[m.materialIndex],A=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=A,C=w;S<C;S+=3){let E=S,I=S+1,B=S+2;r=$c(this,d,t,i,c,u,f,E,I,B),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){let A=m,w=m+1,S=m+2;r=$c(this,o,t,i,c,u,f,A,w,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}};function qv(n,t,e,i,r,s,o,a){let l;if(t.side===An?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===br,a),l===null)return null;jc.copy(a),jc.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(jc);return c<e.near||c>e.far?null:{distance:c,point:jc.clone(),object:n}}function $c(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,Wc),n.getVertexPosition(l,Xc),n.getVertexPosition(c,qc);let u=qv(n,t,e,i,Wc,Xc,qc,zg);if(u){let f=new P;ns.getBarycoord(zg,Wc,Xc,qc,f),r&&(u.uv=ns.getInterpolatedAttribute(r,a,l,c,f,new kt)),s&&(u.uv1=ns.getInterpolatedAttribute(s,a,l,c,f,new kt)),o&&(u.normal=ns.getInterpolatedAttribute(o,a,l,c,f,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new P,materialIndex:0};ns.getNormal(Wc,Xc,qc,h.normal),u.face=h,u.barycoord=f}return u}var Zo=class n extends rn{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],f=[],h=0,p=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,r,o,2),g("x","z","y",1,-1,t,i,-e,r,o,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(u,3)),this.setAttribute("uv",new We(f,2));function g(_,m,d,A,w,S,C,E,I,B,b){let v=S/I,R=C/B,N=S/2,V=C/2,W=E/2,Y=I+1,X=B+1,nt=0,H=0,ot=new P;for(let ft=0;ft<X;ft++){let wt=ft*R-V;for(let oe=0;oe<Y;oe++){let Me=oe*v-N;ot[_]=Me*A,ot[m]=wt*w,ot[d]=W,c.push(ot.x,ot.y,ot.z),ot[_]=0,ot[m]=0,ot[d]=E>0?1:-1,u.push(ot.x,ot.y,ot.z),f.push(oe/I),f.push(1-ft/B),nt+=1}}for(let ft=0;ft<B;ft++)for(let wt=0;wt<I;wt++){let oe=h+wt+Y*ft,Me=h+wt+Y*(ft+1),Le=h+(wt+1)+Y*(ft+1),de=h+(wt+1)+Y*ft;l.push(oe,Me,de),l.push(Me,Le,de),H+=6}a.addGroup(p,H,b),p+=H,h+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Js(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function bn(n){let t={};for(let e=0;e<n.length;e++){let i=Js(n[e]);for(let r in i)t[r]=i[r]}return t}function Yv(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function wp(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ue.workingColorSpace}var Hy={clone:Js,merge:bn},jv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$v=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ii=class extends Ki{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jv,this.fragmentShader=$v,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Js(t.uniforms),this.uniformsGroups=Yv(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},nl=class extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=Ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},es=new P,Vg=new kt,Hg=new kt,_n=class extends nl{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Yo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(qa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Yo*2*Math.atan(Math.tan(qa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){es.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(es.x,es.y).multiplyScalar(-t/es.z),es.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(es.x,es.y).multiplyScalar(-t/es.z)}getViewSize(t,e){return this.getViewBounds(t,Vg,Hg),e.subVectors(Hg,Vg)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(qa*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ho=-90,Go=1,hu=class extends $e{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new _n(Ho,Go,t,e);r.layers=this.layers,this.add(r);let s=new _n(Ho,Go,t,e);s.layers=this.layers,this.add(s);let o=new _n(Ho,Go,t,e);o.layers=this.layers,this.add(o);let a=new _n(Ho,Go,t,e);a.layers=this.layers,this.add(a);let l=new _n(Ho,Go,t,e);l.layers=this.layers,this.add(l);let c=new _n(Ho,Go,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(let c of e)this.remove(c);if(t===Ti)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Za)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(f,h,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},il=class extends Gn{constructor(t=[],e=$s,i,r,s,o,a,l,c,u){super(t,e,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},du=class extends Ji{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new il(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Zo(5,5,5),s=new Ii({name:"CubemapFromEquirect",uniforms:Js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:An,blending:Sr});s.uniforms.tEquirect.value=e;let o=new vn(r,s),a=e.minFilter;return e.minFilter===ds&&(e.minFilter=Ei),new hu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}},Ai=class extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}},Zv={type:"move"},Jo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Zv)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ai;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}};var rl=class extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ci,this.environmentIntensity=1,this.environmentRotation=new Ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Wd=new P,Jv=new P,Kv=new jt,ai=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let r=Wd.subVectors(i,e).cross(Jv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(Wd),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Kv.getNormalMatrix(t),r=this.coplanarPoint(Wd).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Gs=new ss,Qv=new kt(.5,.5),Zc=new P,Ko=class{constructor(t=new ai,e=new ai,i=new ai,r=new ai,s=new ai,o=new ai){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ti,i=!1){let r=this.planes,s=t.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],p=s[7],g=s[8],_=s[9],m=s[10],d=s[11],A=s[12],w=s[13],S=s[14],C=s[15];if(r[0].setComponents(c-o,p-u,d-g,C-A).normalize(),r[1].setComponents(c+o,p+u,d+g,C+A).normalize(),r[2].setComponents(c+a,p+f,d+_,C+w).normalize(),r[3].setComponents(c-a,p-f,d-_,C-w).normalize(),i)r[4].setComponents(l,h,m,S).normalize(),r[5].setComponents(c-l,p-h,d-m,C-S).normalize();else if(r[4].setComponents(c-l,p-h,d-m,C-S).normalize(),e===Ti)r[5].setComponents(c+l,p+h,d+m,C+S).normalize();else if(e===Za)r[5].setComponents(l,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Gs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Gs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Gs)}intersectsSprite(t){Gs.center.set(0,0,0);let e=Qv.distanceTo(t.center);return Gs.radius=.7071067811865476+e,Gs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Gs)}intersectsSphere(t){let e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let r=e[i];if(Zc.x=r.normal.x>0?t.max.x:t.min.x,Zc.y=r.normal.y>0?t.max.y:t.min.y,Zc.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Zc)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ls=class extends Ki{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},pu=new P,mu=new P,Gg=new Ie,Xa=new os,Jc=new ss,Xd=new P,Wg=new P,sl=class extends $e{constructor(t=new rn,e=new ls){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)pu.fromBufferAttribute(e,r-1),mu.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=pu.distanceTo(mu);t.setAttribute("lineDistance",new We(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Jc.copy(i.boundingSphere),Jc.applyMatrix4(r),Jc.radius+=s,t.ray.intersectsSphere(Jc)===!1)return;Gg.copy(r).invert(),Xa.copy(t.ray).applyMatrix4(Gg);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){let d=u.getX(_),A=u.getX(_+1),w=Kc(this,t,Xa,l,d,A,_);w&&e.push(w)}if(this.isLineLoop){let _=u.getX(g-1),m=u.getX(p),d=Kc(this,t,Xa,l,_,m,g-1);d&&e.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){let d=Kc(this,t,Xa,l,_,_+1,_);d&&e.push(d)}if(this.isLineLoop){let _=Kc(this,t,Xa,l,g-1,p,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Kc(n,t,e,i,r,s,o){let a=n.geometry.attributes.position;if(pu.fromBufferAttribute(a,r),mu.fromBufferAttribute(a,s),e.distanceSqToSegment(pu,mu,Xd,Wg)>i)return;Xd.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Xd);if(!(c<t.near||c>t.far))return{distance:c,point:Wg.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var Xg=new P,qg=new P,Qo=class extends sl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)Xg.fromBufferAttribute(e,r),qg.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Xg.distanceTo(qg);t.setAttribute("lineDistance",new We(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var ta=class extends Ki{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Yg=new Ie,Qd=new os,Qc=new ss,tu=new P,ol=class extends $e{constructor(t=new rn,e=new ta){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qc.copy(i.boundingSphere),Qc.applyMatrix4(r),Qc.radius+=s,t.ray.intersectsSphere(Qc)===!1)return;Yg.copy(r).invert(),Qd.copy(t.ray).applyMatrix4(Yg);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){let h=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=h,_=p;g<_;g++){let m=c.getX(g);tu.fromBufferAttribute(f,m),jg(tu,m,l,r,t,e,this)}}else{let h=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let g=h,_=p;g<_;g++)tu.fromBufferAttribute(f,g),jg(tu,g,l,r,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function jg(n,t,e,i,r,s,o){let a=Qd.distanceSqToPoint(n);if(a<e){let l=new P;Qd.closestPointToPoint(n,l),l.applyMatrix4(i);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var al=class extends Gn{constructor(t,e,i=ps,r,s,o,a=li,l=li,c,u=qo,f=1){if(u!==qo&&u!==sa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new $o(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ll=class extends Gn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var gu=class n extends rn{constructor(t=1,e=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],f=[],h=[],p=[],g=0,_=[],m=i/2,d=0;A(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new We(f,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(p,2));function A(){let S=new P,C=new P,E=0,I=(e-t)/i;for(let B=0;B<=s;B++){let b=[],v=B/s,R=v*(e-t)+t;for(let N=0;N<=r;N++){let V=N/r,W=V*l+a,Y=Math.sin(W),X=Math.cos(W);C.x=R*Y,C.y=-v*i+m,C.z=R*X,f.push(C.x,C.y,C.z),S.set(Y,I,X).normalize(),h.push(S.x,S.y,S.z),p.push(V,1-v),b.push(g++)}_.push(b)}for(let B=0;B<r;B++)for(let b=0;b<s;b++){let v=_[b][B],R=_[b+1][B],N=_[b+1][B+1],V=_[b][B+1];(t>0||b!==0)&&(u.push(v,R,V),E+=3),(e>0||b!==s-1)&&(u.push(R,N,V),E+=3)}c.addGroup(d,E,0),d+=E}function w(S){let C=g,E=new kt,I=new P,B=0,b=S===!0?t:e,v=S===!0?1:-1;for(let N=1;N<=r;N++)f.push(0,m*v,0),h.push(0,v,0),p.push(.5,.5),g++;let R=g;for(let N=0;N<=r;N++){let W=N/r*l+a,Y=Math.cos(W),X=Math.sin(W);I.x=b*X,I.y=m*v,I.z=b*Y,f.push(I.x,I.y,I.z),h.push(0,v,0),E.x=Y*.5+.5,E.y=X*.5*v+.5,p.push(E.x,E.y),g++}for(let N=0;N<r;N++){let V=C+N,W=R+N;S===!0?u.push(W,W+1,V):u.push(W+1,W,V),B+=3}c.addGroup(d,B,S===!0?1:2),d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},yu=class n extends gu{constructor(t=1,e=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var cl=class n extends rn{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};let s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=t/a,h=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){let A=d*h-o;for(let w=0;w<c;w++){let S=w*f-s;g.push(S,-A,0),_.push(0,0,1),m.push(w/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let A=0;A<a;A++){let w=A+c*d,S=A+c*(d+1),C=A+1+c*(d+1),E=A+1+c*d;p.push(w,S,E),p.push(S,C,E)}this.setIndex(p),this.setAttribute("position",new We(g,3)),this.setAttribute("normal",new We(_,3)),this.setAttribute("uv",new We(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var ul=class extends Ki{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_p,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var _u=class extends Ki{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Iy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},xu=class extends Ki{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function eu(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function tb(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var js=class{constructor(t,e,i,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,r=e[i],s=e[i-1];t:{e:{let o;n:{i:if(!(t<r)){for(let a=i+2;;){if(r===void 0){if(t<s)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=e[++i],t<r)break e}o=e.length;break n}if(!(t>=s)){let a=e[1];t<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=e[--i-1],t>=s)break e}o=i,i=0;break n}break t}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(r=e[i],s=e[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=t*r;for(let o=0;o!==r;++o)e[o]=i[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},vu=class extends js{constructor(t,e,i,r){super(t,e,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jd,endingEnd:jd}}intervalChanged_(t,e,i){let r=this.parameterPositions,s=t-2,o=t+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case $d:s=t,a=2*e-i;break;case Zd:s=r.length-2,a=e+r[s]-r[s+1];break;default:s=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case $d:o=t,l=2*i-e;break;case Zd:o=1,l=i+r[1]-r[0];break;default:o=t-1,l=e}let c=(i-e)*.5,u=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(t,e,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,p=this._weightNext,g=(i-e)/(r-e),_=g*g,m=_*g,d=-h*m+2*h*_-h*g,A=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,w=(-1-p)*m+(1.5+p)*_+.5*g,S=p*m-p*_;for(let C=0;C!==a;++C)s[C]=d*o[u+C]+A*o[c+C]+w*o[l+C]+S*o[f+C];return s}},bu=class extends js{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=(i-e)/(r-e),f=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*f+o[l+h]*u;return s}},Su=class extends js{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t){return this.copySampleValue_(t-1)}},Xn=class{constructor(t,e,i,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=eu(e,this.TimeBufferType),this.values=eu(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:eu(t.times,Array),values:eu(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(i.interpolation=r)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Su(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new bu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new vu(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ja:e=this.InterpolantFactoryMethodDiscrete;break;case lu:e=this.InterpolantFactoryMethodLinear;break;case iu:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ja;case this.InterpolantFactoryMethodLinear:return lu;case this.InterpolantFactoryMethodSmooth:return iu}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]*=t}return this}trim(t,e){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<t;)++s;for(;o!==-1&&i[o]>e;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(r!==void 0&&tb(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===iu,s=t.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=t[a],u=t[a+1];if(c!==u&&(a!==1||c!==t[0]))if(r)l=!0;else{let f=a*i,h=f-i,p=f+i;for(let g=0;g!==i;++g){let _=e[f+g];if(_!==e[h+g]||_!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let f=a*i,h=o*i;for(let p=0;p!==i;++p)e[h+p]=e[f+p]}++o}}if(s>0){t[o]=t[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,r=new i(this.name,t,e);return r.createInterpolant=this.createInterpolant,r}};Xn.prototype.ValueTypeName="";Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=lu;var cs=class extends Xn{constructor(t,e,i){super(t,e,i)}};cs.prototype.ValueTypeName="bool";cs.prototype.ValueBufferType=Array;cs.prototype.DefaultInterpolation=ja;cs.prototype.InterpolantFactoryMethodLinear=void 0;cs.prototype.InterpolantFactoryMethodSmooth=void 0;var Mu=class extends Xn{constructor(t,e,i,r){super(t,e,i,r)}};Mu.prototype.ValueTypeName="color";var wu=class extends Xn{constructor(t,e,i,r){super(t,e,i,r)}};wu.prototype.ValueTypeName="number";var Tu=class extends js{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(r-e),c=t*a;for(let u=c+a;c!==u;c+=4)ci.slerpFlat(s,0,o,c-a,o,c,l);return s}},fl=class extends Xn{constructor(t,e,i,r){super(t,e,i,r)}InterpolantFactoryMethodLinear(t){return new Tu(this.times,this.values,this.getValueSize(),t)}};fl.prototype.ValueTypeName="quaternion";fl.prototype.InterpolantFactoryMethodSmooth=void 0;var us=class extends Xn{constructor(t,e,i){super(t,e,i)}};us.prototype.ValueTypeName="string";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=ja;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var Au=class extends Xn{constructor(t,e,i,r){super(t,e,i,r)}};Au.prototype.ValueTypeName="vector";var Eu=class{constructor(t,e,i){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let p=c[f],g=c[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Gy=new Eu,Cu=class{constructor(t){this.manager=t!==void 0?t:Gy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(r,s){i.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Cu.DEFAULT_MATERIAL_NAME="__DEFAULT";var hl=class extends $e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},dl=class extends hl{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},qd=new Ie,$g=new P,Zg=new P,tp=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.mapType=Ri,this.map=null,this.mapPass=null,this.matrix=new Ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ko,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new Ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;$g.setFromMatrixPosition(t.matrixWorld),e.position.copy($g),Zg.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zg),e.updateMatrixWorld(),qd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qd,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(qd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var pl=class extends nl{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ep=class extends tp{constructor(){super(new pl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ml=class extends hl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new ep}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Iu=class extends _n{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Tp="\\[\\]\\.:\\/",eb=new RegExp("["+Tp+"]","g"),Ap="[^"+Tp+"]",nb="[^"+Tp.replace("\\.","")+"]",ib=/((?:WC+[\/:])*)/.source.replace("WC",Ap),rb=/(WCOD+)?/.source.replace("WCOD",nb),sb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ap),ob=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ap),ab=new RegExp("^"+ib+rb+sb+ob+"$"),lb=["material","materials","bones","map"],np=class{constructor(t,e,i){let r=i||Ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ce=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(eb,"")}static parseTrackName(t){let e=ab.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);lb.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},r=i(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)t[e++]=i[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,r=e.propertyName,s=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[r];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ce.Composite=np;Ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ce.prototype.GetterByBindingType=[Ce.prototype._getValue_direct,Ce.prototype._getValue_array,Ce.prototype._getValue_arrayElement,Ce.prototype._getValue_toArray];Ce.prototype.SetterByBindingTypeAndVersioning=[[Ce.prototype._setValue_direct,Ce.prototype._setValue_direct_setNeedsUpdate,Ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_array,Ce.prototype._setValue_array_setNeedsUpdate,Ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_arrayElement,Ce.prototype._setValue_arrayElement_setNeedsUpdate,Ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_fromArray,Ce.prototype._setValue_fromArray_setNeedsUpdate,Ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var RC=new Float32Array(1);var ea=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=re(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(re(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var gl=class extends Qo{constructor(t=10,e=10,i=4473924,r=8947848){i=new Jt(i),r=new Jt(r);let s=e/2,o=t/e,a=t/2,l=[],c=[];for(let h=0,p=0,g=-a;h<=e;h++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);let _=h===s?i:r;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}let u=new rn;u.setAttribute("position",new We(l,3)),u.setAttribute("color",new We(c,3));let f=new ls({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var Jg=new P,nu,Yd,yl=class extends $e{constructor(t=new P(0,0,1),e=new P(0,0,0),i=1,r=16776960,s=i*.2,o=s*.2){super(),this.type="ArrowHelper",nu===void 0&&(nu=new rn,nu.setAttribute("position",new We([0,0,0,0,1,0],3)),Yd=new yu(.5,1,5,1),Yd.translate(0,-.5,0)),this.position.copy(e),this.line=new sl(nu,new ls({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new vn(Yd,new as({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(i,s,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Jg.set(t.z,0,-t.x).normalize();let e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Jg,e)}}setLength(t,e=t*.2,i=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(i,e,i),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}};var _l=class extends Zi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Ep(n,t,e,i){let r=cb(i);switch(e){case pp:return n*t;case gp:return n*t/r.components*r.byteLength;case Gu:return n*t/r.components*r.byteLength;case yp:return n*t*2/r.components*r.byteLength;case Wu:return n*t*2/r.components*r.byteLength;case mp:return n*t*3/r.components*r.byteLength;case ui:return n*t*4/r.components*r.byteLength;case Xu:return n*t*4/r.components*r.byteLength;case bl:case Sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ml:case wl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Yu:case $u:return Math.max(n,16)*Math.max(t,8)/4;case qu:case ju:return Math.max(n,8)*Math.max(t,8)/2;case Zu:case Ju:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ku:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Qu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case tf:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ef:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case nf:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case rf:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case sf:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case of:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case af:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case lf:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case cf:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case uf:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ff:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case hf:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case df:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case pf:case mf:case gf:return Math.ceil(n/4)*Math.ceil(t/4)*16;case yf:case _f:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xf:case vf:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function cb(n){switch(n){case Ri:case up:return{byteLength:1,components:1};case na:case fp:case ia:return{byteLength:2,components:1};case Vu:case Hu:return{byteLength:2,components:4};case ps:case zu:case tr:return{byteLength:4,components:1};case hp:case dp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function d_(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function fb(n){let t=new WeakMap;function e(a,l){let c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){let u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<f.length;p++){let g=f[h],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let p=0,g=f.length;p<g;p++){let _=f[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var hb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,db=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_b=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vb=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,bb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ab=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Eb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ib=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Db=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Bb=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ob=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ub=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Nb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hb="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Xb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$b=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,eS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,rS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,sS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,oS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,aS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,uS=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,hS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,dS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_S=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,MS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,TS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,AS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ES=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,CS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,IS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,RS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,DS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,LS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,FS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,BS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,OS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,US=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,NS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,VS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,HS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,GS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,WS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,XS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,YS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,jS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$S=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ZS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,JS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,KS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,QS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,eM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,iM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,sM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,oM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,aM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,uM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_M=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,bM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,SM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,TM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,AM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,CM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,RM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,PM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,LM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,OM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,zM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,VM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,HM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,GM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,WM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qt={alphahash_fragment:hb,alphahash_pars_fragment:db,alphamap_fragment:pb,alphamap_pars_fragment:mb,alphatest_fragment:gb,alphatest_pars_fragment:yb,aomap_fragment:_b,aomap_pars_fragment:xb,batching_pars_vertex:vb,batching_vertex:bb,begin_vertex:Sb,beginnormal_vertex:Mb,bsdfs:wb,iridescence_fragment:Tb,bumpmap_pars_fragment:Ab,clipping_planes_fragment:Eb,clipping_planes_pars_fragment:Cb,clipping_planes_pars_vertex:Ib,clipping_planes_vertex:Rb,color_fragment:Db,color_pars_fragment:Pb,color_pars_vertex:Lb,color_vertex:Fb,common:Bb,cube_uv_reflection_fragment:Ob,defaultnormal_vertex:Ub,displacementmap_pars_vertex:Nb,displacementmap_vertex:kb,emissivemap_fragment:zb,emissivemap_pars_fragment:Vb,colorspace_fragment:Hb,colorspace_pars_fragment:Gb,envmap_fragment:Wb,envmap_common_pars_fragment:Xb,envmap_pars_fragment:qb,envmap_pars_vertex:Yb,envmap_physical_pars_fragment:rS,envmap_vertex:jb,fog_vertex:$b,fog_pars_vertex:Zb,fog_fragment:Jb,fog_pars_fragment:Kb,gradientmap_pars_fragment:Qb,lightmap_pars_fragment:tS,lights_lambert_fragment:eS,lights_lambert_pars_fragment:nS,lights_pars_begin:iS,lights_toon_fragment:sS,lights_toon_pars_fragment:oS,lights_phong_fragment:aS,lights_phong_pars_fragment:lS,lights_physical_fragment:cS,lights_physical_pars_fragment:uS,lights_fragment_begin:fS,lights_fragment_maps:hS,lights_fragment_end:dS,logdepthbuf_fragment:pS,logdepthbuf_pars_fragment:mS,logdepthbuf_pars_vertex:gS,logdepthbuf_vertex:yS,map_fragment:_S,map_pars_fragment:xS,map_particle_fragment:vS,map_particle_pars_fragment:bS,metalnessmap_fragment:SS,metalnessmap_pars_fragment:MS,morphinstance_vertex:wS,morphcolor_vertex:TS,morphnormal_vertex:AS,morphtarget_pars_vertex:ES,morphtarget_vertex:CS,normal_fragment_begin:IS,normal_fragment_maps:RS,normal_pars_fragment:DS,normal_pars_vertex:PS,normal_vertex:LS,normalmap_pars_fragment:FS,clearcoat_normal_fragment_begin:BS,clearcoat_normal_fragment_maps:OS,clearcoat_pars_fragment:US,iridescence_pars_fragment:NS,opaque_fragment:kS,packing:zS,premultiplied_alpha_fragment:VS,project_vertex:HS,dithering_fragment:GS,dithering_pars_fragment:WS,roughnessmap_fragment:XS,roughnessmap_pars_fragment:qS,shadowmap_pars_fragment:YS,shadowmap_pars_vertex:jS,shadowmap_vertex:$S,shadowmask_pars_fragment:ZS,skinbase_vertex:JS,skinning_pars_vertex:KS,skinning_vertex:QS,skinnormal_vertex:tM,specularmap_fragment:eM,specularmap_pars_fragment:nM,tonemapping_fragment:iM,tonemapping_pars_fragment:rM,transmission_fragment:sM,transmission_pars_fragment:oM,uv_pars_fragment:aM,uv_pars_vertex:lM,uv_vertex:cM,worldpos_vertex:uM,background_vert:fM,background_frag:hM,backgroundCube_vert:dM,backgroundCube_frag:pM,cube_vert:mM,cube_frag:gM,depth_vert:yM,depth_frag:_M,distanceRGBA_vert:xM,distanceRGBA_frag:vM,equirect_vert:bM,equirect_frag:SM,linedashed_vert:MM,linedashed_frag:wM,meshbasic_vert:TM,meshbasic_frag:AM,meshlambert_vert:EM,meshlambert_frag:CM,meshmatcap_vert:IM,meshmatcap_frag:RM,meshnormal_vert:DM,meshnormal_frag:PM,meshphong_vert:LM,meshphong_frag:FM,meshphysical_vert:BM,meshphysical_frag:OM,meshtoon_vert:UM,meshtoon_frag:NM,points_vert:kM,points_frag:zM,shadow_vert:VM,shadow_frag:HM,sprite_vert:GM,sprite_frag:WM},st={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},er={basic:{uniforms:bn([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:bn([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:bn([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:bn([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:bn([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:bn([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:bn([st.points,st.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:bn([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:bn([st.common,st.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:bn([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:bn([st.sprite,st.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:bn([st.common,st.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:bn([st.lights,st.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};er.physical={uniforms:bn([er.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};var bf={r:0,b:0,g:0},Ks=new Ci,XM=new Ie;function qM(n,t,e,i,r,s,o){let a=new Jt(0),l=s===!0?0:1,c,u,f=null,h=0,p=null;function g(w){let S=w.isScene===!0?w.background:null;return S&&S.isTexture&&(S=(w.backgroundBlurriness>0?e:t).get(S)),S}function _(w){let S=!1,C=g(w);C===null?d(a,l):C&&C.isColor&&(d(C,1),S=!0);let E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,S){let C=g(S);C&&(C.isCubeTexture||C.mapping===xl)?(u===void 0&&(u=new vn(new Zo(1,1,1),new Ii({name:"BackgroundCubeMaterial",uniforms:Js(er.backgroundCube.uniforms),vertexShader:er.backgroundCube.vertexShader,fragmentShader:er.backgroundCube.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,I,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ks.copy(S.backgroundRotation),Ks.x*=-1,Ks.y*=-1,Ks.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Ks.y*=-1,Ks.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(XM.makeRotationFromEuler(Ks)),u.material.toneMapped=ue.getTransfer(C.colorSpace)!==me,(f!==C||h!==C.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=C,h=C.version,p=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new vn(new cl(2,2),new Ii({name:"BackgroundMaterial",uniforms:Js(er.background.uniforms),vertexShader:er.background.vertexShader,fragmentShader:er.background.fragmentShader,side:br,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ue.getTransfer(C.colorSpace)!==me,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(f!==C||h!==C.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=C,h=C.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function d(w,S){w.getRGB(bf,wp(n)),i.buffers.color.setClear(bf.r,bf.g,bf.b,S,o)}function A(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,S=1){a.set(w),l=S,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,d(a,l)},render:_,addToRenderList:m,dispose:A}}function YM(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null),s=r,o=!1;function a(v,R,N,V,W){let Y=!1,X=f(V,N,R);s!==X&&(s=X,c(s.object)),Y=p(v,V,N,W),Y&&g(v,V,N,W),W!==null&&t.update(W,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,S(v,R,N,V),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function u(v){return n.deleteVertexArray(v)}function f(v,R,N){let V=N.wireframe===!0,W=i[v.id];W===void 0&&(W={},i[v.id]=W);let Y=W[R.id];Y===void 0&&(Y={},W[R.id]=Y);let X=Y[V];return X===void 0&&(X=h(l()),Y[V]=X),X}function h(v){let R=[],N=[],V=[];for(let W=0;W<e;W++)R[W]=0,N[W]=0,V[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:N,attributeDivisors:V,object:v,attributes:{},index:null}}function p(v,R,N,V){let W=s.attributes,Y=R.attributes,X=0,nt=N.getAttributes();for(let H in nt)if(nt[H].location>=0){let ft=W[H],wt=Y[H];if(wt===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(wt=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(wt=v.instanceColor)),ft===void 0||ft.attribute!==wt||wt&&ft.data!==wt.data)return!0;X++}return s.attributesNum!==X||s.index!==V}function g(v,R,N,V){let W={},Y=R.attributes,X=0,nt=N.getAttributes();for(let H in nt)if(nt[H].location>=0){let ft=Y[H];ft===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(ft=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(ft=v.instanceColor));let wt={};wt.attribute=ft,ft&&ft.data&&(wt.data=ft.data),W[H]=wt,X++}s.attributes=W,s.attributesNum=X,s.index=V}function _(){let v=s.newAttributes;for(let R=0,N=v.length;R<N;R++)v[R]=0}function m(v){d(v,0)}function d(v,R){let N=s.newAttributes,V=s.enabledAttributes,W=s.attributeDivisors;N[v]=1,V[v]===0&&(n.enableVertexAttribArray(v),V[v]=1),W[v]!==R&&(n.vertexAttribDivisor(v,R),W[v]=R)}function A(){let v=s.newAttributes,R=s.enabledAttributes;for(let N=0,V=R.length;N<V;N++)R[N]!==v[N]&&(n.disableVertexAttribArray(N),R[N]=0)}function w(v,R,N,V,W,Y,X){X===!0?n.vertexAttribIPointer(v,R,N,W,Y):n.vertexAttribPointer(v,R,N,V,W,Y)}function S(v,R,N,V){_();let W=V.attributes,Y=N.getAttributes(),X=R.defaultAttributeValues;for(let nt in Y){let H=Y[nt];if(H.location>=0){let ot=W[nt];if(ot===void 0&&(nt==="instanceMatrix"&&v.instanceMatrix&&(ot=v.instanceMatrix),nt==="instanceColor"&&v.instanceColor&&(ot=v.instanceColor)),ot!==void 0){let ft=ot.normalized,wt=ot.itemSize,oe=t.get(ot);if(oe===void 0)continue;let Me=oe.buffer,Le=oe.type,de=oe.bytesPerElement,j=Le===n.INT||Le===n.UNSIGNED_INT||ot.gpuType===zu;if(ot.isInterleavedBufferAttribute){let J=ot.data,pt=J.stride,Nt=ot.offset;if(J.isInstancedInterleavedBuffer){for(let Mt=0;Mt<H.locationSize;Mt++)d(H.location+Mt,J.meshPerAttribute);v.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Mt=0;Mt<H.locationSize;Mt++)m(H.location+Mt);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let Mt=0;Mt<H.locationSize;Mt++)w(H.location+Mt,wt/H.locationSize,Le,ft,pt*de,(Nt+wt/H.locationSize*Mt)*de,j)}else{if(ot.isInstancedBufferAttribute){for(let J=0;J<H.locationSize;J++)d(H.location+J,ot.meshPerAttribute);v.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let J=0;J<H.locationSize;J++)m(H.location+J);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let J=0;J<H.locationSize;J++)w(H.location+J,wt/H.locationSize,Le,ft,wt*de,wt/H.locationSize*J*de,j)}}else if(X!==void 0){let ft=X[nt];if(ft!==void 0)switch(ft.length){case 2:n.vertexAttrib2fv(H.location,ft);break;case 3:n.vertexAttrib3fv(H.location,ft);break;case 4:n.vertexAttrib4fv(H.location,ft);break;default:n.vertexAttrib1fv(H.location,ft)}}}}A()}function C(){B();for(let v in i){let R=i[v];for(let N in R){let V=R[N];for(let W in V)u(V[W].object),delete V[W];delete R[N]}delete i[v]}}function E(v){if(i[v.id]===void 0)return;let R=i[v.id];for(let N in R){let V=R[N];for(let W in V)u(V[W].object),delete V[W];delete R[N]}delete i[v.id]}function I(v){for(let R in i){let N=i[R];if(N[v.id]===void 0)continue;let V=N[v.id];for(let W in V)u(V[W].object),delete V[W];delete N[v.id]}}function B(){b(),o=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:B,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:m,disableUnusedAttributes:A}}function jM(n,t,e){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),e.update(u,i,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let p=0;for(let g=0;g<f;g++)p+=u[g];e.update(p,i,1)}function l(c,u,f,h){if(f===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function $M(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(I){return!(I!==ui&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let B=I===ia&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==Ri&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==tr&&!B)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:A,maxVaryings:w,maxFragmentUniforms:S,vertexTextures:C,maxSamples:E}}function ZM(n){let t=this,e=null,i=0,r=!1,s=!1,o=new ai,a=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,p){let g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{let A=s?0:i,w=A*4,S=d.clippingState||null;l.value=S,S=u(g,h,w,p);for(let C=0;C!==w;++C)S[C]=e[C];d.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,p,g){let _=f!==null?f.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let d=p+_*4,A=h.matrixWorldInverse;a.getNormalMatrix(A),(m===null||m.length<d)&&(m=new Float32Array(d));for(let w=0,S=p;w!==_;++w,S+=4)o.copy(f[w]).applyMatrix4(A,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function JM(n){let t=new WeakMap;function e(o,a){return a===Uu?o.mapping=$s:a===Nu&&(o.mapping=Zs),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Uu||a===Nu)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new du(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}var la=4,Wy=[.125,.215,.35,.446,.526,.582],eo=20,Cp=new pl,Xy=new Jt,Ip=null,Rp=0,Dp=0,Pp=!1,to=(1+Math.sqrt(5))/2,aa=1/to,qy=[new P(-to,aa,0),new P(to,aa,0),new P(-aa,0,to),new P(aa,0,to),new P(0,to,-aa),new P(0,to,aa),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],KM=new P,wf=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){let{size:o=256,position:a=KM}=s;Ip=this._renderer.getRenderTarget(),Rp=this._renderer.getActiveCubeFace(),Dp=this._renderer.getActiveMipmapLevel(),Pp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$y(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jy(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ip,Rp,Dp),this._renderer.xr.enabled=Pp,t.scissorTest=!1,Sf(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===$s||t.mapping===Zs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ip=this._renderer.getRenderTarget(),Rp=this._renderer.getActiveCubeFace(),Dp=this._renderer.getActiveMipmapLevel(),Pp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ei,minFilter:Ei,generateMipmaps:!1,type:ia,format:ui,colorSpace:Ys,depthBuffer:!1},r=Yy(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yy(t,e,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=QM(s)),this._blurMaterial=tw(s,t,e)}return r}_compileMaterial(t){let e=new vn(this._lodPlanes[0],t);this._renderer.compile(e,Cp)}_sceneToCubeUV(t,e,i,r,s){let l=new _n(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(Xy),f.toneMapping=Mr,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null));let _=new as({name:"PMREM.Background",side:An,depthWrite:!1,depthTest:!1}),m=new vn(new Zo,_),d=!1,A=t.background;A?A.isColor&&(_.color.copy(A),t.background=null,d=!0):(_.color.copy(Xy),d=!0);for(let w=0;w<6;w++){let S=w%3;S===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[w],s.y,s.z)):S===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[w]));let C=this._cubeSize;Sf(r,S*C,w>2?C:0,C,C),f.setRenderTarget(r),d&&f.render(m,l),f.render(t,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=p,f.autoClear=h,t.background=A}_textureToCubeUV(t,e){let i=this._renderer,r=t.mapping===$s||t.mapping===Zs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=$y()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jy());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new vn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;let l=this._cubeSize;Sf(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Cp)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=qy[(r-s-1)%qy.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,f=new vn(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*eo-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):eo;m>eo&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${eo}`);let d=[],A=0;for(let I=0;I<eo;++I){let B=I/_,b=Math.exp(-B*B/2);d.push(b),I===0?A+=b:I<m&&(A+=2*b)}for(let I=0;I<d.length;I++)d[I]=d[I]/A;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-i;let S=this._sizeLods[r],C=3*S*(r>w-la?r-w+la:0),E=4*(this._cubeSize-S);Sf(e,C,E,3*S,2*S),l.setRenderTarget(e),l.render(f,Cp)}};function QM(n){let t=[],e=[],i=[],r=n,s=n-la+1+Wy.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let l=1/a;o>n-la?l=Wy[o-n+la-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,g=6,_=3,m=2,d=1,A=new Float32Array(_*g*p),w=new Float32Array(m*g*p),S=new Float32Array(d*g*p);for(let E=0;E<p;E++){let I=E%3*2/3-1,B=E>2?0:-1,b=[I,B,0,I+2/3,B,0,I+2/3,B+1,0,I,B,0,I+2/3,B+1,0,I,B+1,0];A.set(b,_*g*E),w.set(h,m*g*E);let v=[E,E,E,E,E,E];S.set(v,d*g*E)}let C=new rn;C.setAttribute("position",new xn(A,_)),C.setAttribute("uv",new xn(w,m)),C.setAttribute("faceIndex",new xn(S,d)),t.push(C),r>la&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Yy(n,t,e){let i=new Ji(n,t,e);return i.texture.mapping=xl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Sf(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function tw(n,t,e){let i=new Float32Array(eo),r=new P(0,1,0);return new Ii({name:"SphericalGaussianBlur",defines:{n:eo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function jy(){return new Ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function $y(){return new Ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function Hp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ew(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Uu||l===Nu,u=l===$s||l===Zs;if(c||u){let f=t.get(a),h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new wf(n)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{let p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(e===null&&(e=new wf(n)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function nw(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let r=e(i);return r===null&&jo("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function iw(n,t,e,i){let r={},s=new WeakMap;function o(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];let p=s.get(h);p&&(t.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,e.memory.geometries++),h}function l(f){let h=f.attributes;for(let p in h)t.update(h[p],n.ARRAY_BUFFER)}function c(f){let h=[],p=f.index,g=f.attributes.position,_=0;if(p!==null){let A=p.array;_=p.version;for(let w=0,S=A.length;w<S;w+=3){let C=A[w+0],E=A[w+1],I=A[w+2];h.push(C,E,E,I,I,C)}}else if(g!==void 0){let A=g.array;_=g.version;for(let w=0,S=A.length/3-1;w<S;w+=3){let C=w+0,E=w+1,I=w+2;h.push(C,E,E,I,I,C)}}else return;let m=new(Mp(h)?el:tl)(h,1);m.version=_;let d=s.get(f);d&&t.remove(d),s.set(f,m)}function u(f){let h=s.get(f);if(h){let p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function rw(n,t,e){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,p){n.drawElements(i,p,s,h*o),e.update(p,i,1)}function c(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,h*o,g),e.update(p,i,g))}function u(h,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function f(h,p,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<h.length;d++)c(h[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,_,0,g);let d=0;for(let A=0;A<g;A++)d+=p[A]*_[A];e.update(d,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function sw(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function ow(n,t,e){let i=new WeakMap,r=new Ne;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,h=i.get(a);if(h===void 0||h.count!==f){let b=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],A=a.morphAttributes.color||[],w=0;p===!0&&(w=1),g===!0&&(w=2),_===!0&&(w=3);let S=a.attributes.position.count*w,C=1;S>t.maxTextureSize&&(C=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let E=new Float32Array(S*C*4*f),I=new Ka(E,S,C,f);I.type=tr,I.needsUpdate=!0;let B=w*4;for(let v=0;v<f;v++){let R=m[v],N=d[v],V=A[v],W=S*C*4*v;for(let Y=0;Y<R.count;Y++){let X=Y*B;p===!0&&(r.fromBufferAttribute(R,Y),E[W+X+0]=r.x,E[W+X+1]=r.y,E[W+X+2]=r.z,E[W+X+3]=0),g===!0&&(r.fromBufferAttribute(N,Y),E[W+X+4]=r.x,E[W+X+5]=r.y,E[W+X+6]=r.z,E[W+X+7]=0),_===!0&&(r.fromBufferAttribute(V,Y),E[W+X+8]=r.x,E[W+X+9]=r.y,E[W+X+10]=r.z,E[W+X+11]=V.itemSize===4?r.w:1)}}h={count:f,texture:I,size:new kt(S,C)},i.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function aw(n,t,e,i){let r=new WeakMap;function s(l){let c=i.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==c&&(t.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}var p_=new Gn,Zy=new al(1,1),m_=new Ka,g_=new fu,y_=new il,Jy=[],Ky=[],Qy=new Float32Array(16),t_=new Float32Array(9),e_=new Float32Array(4);function ua(n,t,e){let i=n[0];if(i<=0||i>0)return n;let r=t*e,s=Jy[r];if(s===void 0&&(s=new Float32Array(r),Jy[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function Ze(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Je(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Af(n,t){let e=Ky[t];e===void 0&&(e=new Int32Array(t),Ky[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function lw(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function cw(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;n.uniform2fv(this.addr,t),Je(e,t)}}function uw(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ze(e,t))return;n.uniform3fv(this.addr,t),Je(e,t)}}function fw(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;n.uniform4fv(this.addr,t),Je(e,t)}}function hw(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ze(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,i))return;e_.set(i),n.uniformMatrix2fv(this.addr,!1,e_),Je(e,i)}}function dw(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ze(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,i))return;t_.set(i),n.uniformMatrix3fv(this.addr,!1,t_),Je(e,i)}}function pw(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ze(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,i))return;Qy.set(i),n.uniformMatrix4fv(this.addr,!1,Qy),Je(e,i)}}function mw(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function gw(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;n.uniform2iv(this.addr,t),Je(e,t)}}function yw(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;n.uniform3iv(this.addr,t),Je(e,t)}}function _w(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;n.uniform4iv(this.addr,t),Je(e,t)}}function xw(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function vw(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;n.uniform2uiv(this.addr,t),Je(e,t)}}function bw(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;n.uniform3uiv(this.addr,t),Je(e,t)}}function Sw(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;n.uniform4uiv(this.addr,t),Je(e,t)}}function Mw(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Zy.compareFunction=xp,s=Zy):s=p_,e.setTexture2D(t||s,r)}function ww(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||g_,r)}function Tw(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||y_,r)}function Aw(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||m_,r)}function Ew(n){switch(n){case 5126:return lw;case 35664:return cw;case 35665:return uw;case 35666:return fw;case 35674:return hw;case 35675:return dw;case 35676:return pw;case 5124:case 35670:return mw;case 35667:case 35671:return gw;case 35668:case 35672:return yw;case 35669:case 35673:return _w;case 5125:return xw;case 36294:return vw;case 36295:return bw;case 36296:return Sw;case 35678:case 36198:case 36298:case 36306:case 35682:return Mw;case 35679:case 36299:case 36307:return ww;case 35680:case 36300:case 36308:case 36293:return Tw;case 36289:case 36303:case 36311:case 36292:return Aw}}function Cw(n,t){n.uniform1fv(this.addr,t)}function Iw(n,t){let e=ua(t,this.size,2);n.uniform2fv(this.addr,e)}function Rw(n,t){let e=ua(t,this.size,3);n.uniform3fv(this.addr,e)}function Dw(n,t){let e=ua(t,this.size,4);n.uniform4fv(this.addr,e)}function Pw(n,t){let e=ua(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Lw(n,t){let e=ua(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Fw(n,t){let e=ua(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Bw(n,t){n.uniform1iv(this.addr,t)}function Ow(n,t){n.uniform2iv(this.addr,t)}function Uw(n,t){n.uniform3iv(this.addr,t)}function Nw(n,t){n.uniform4iv(this.addr,t)}function kw(n,t){n.uniform1uiv(this.addr,t)}function zw(n,t){n.uniform2uiv(this.addr,t)}function Vw(n,t){n.uniform3uiv(this.addr,t)}function Hw(n,t){n.uniform4uiv(this.addr,t)}function Gw(n,t,e){let i=this.cache,r=t.length,s=Af(e,r);Ze(i,s)||(n.uniform1iv(this.addr,s),Je(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||p_,s[o])}function Ww(n,t,e){let i=this.cache,r=t.length,s=Af(e,r);Ze(i,s)||(n.uniform1iv(this.addr,s),Je(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||g_,s[o])}function Xw(n,t,e){let i=this.cache,r=t.length,s=Af(e,r);Ze(i,s)||(n.uniform1iv(this.addr,s),Je(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||y_,s[o])}function qw(n,t,e){let i=this.cache,r=t.length,s=Af(e,r);Ze(i,s)||(n.uniform1iv(this.addr,s),Je(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||m_,s[o])}function Yw(n){switch(n){case 5126:return Cw;case 35664:return Iw;case 35665:return Rw;case 35666:return Dw;case 35674:return Pw;case 35675:return Lw;case 35676:return Fw;case 5124:case 35670:return Bw;case 35667:case 35671:return Ow;case 35668:case 35672:return Uw;case 35669:case 35673:return Nw;case 5125:return kw;case 36294:return zw;case 36295:return Vw;case 36296:return Hw;case 35678:case 36198:case 36298:case 36306:case 35682:return Gw;case 35679:case 36299:case 36307:return Ww;case 35680:case 36300:case 36308:case 36293:return Xw;case 36289:case 36303:case 36311:case 36292:return qw}}var Fp=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ew(e.type)}},Bp=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Yw(e.type)}},Op=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(t,e[a.id],i)}}},Lp=/(\w+)(\])?(\[|\.)?/g;function n_(n,t){n.seq.push(t),n.map[t.id]=t}function jw(n,t,e){let i=n.name,r=i.length;for(Lp.lastIndex=0;;){let s=Lp.exec(i),o=Lp.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){n_(e,c===void 0?new Fp(a,n,t):new Bp(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new Op(a),n_(e,f)),e=f}}}var ca=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);jw(s,o,this)}}setValue(t,e,i,r){let s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){let r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){let a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){let i=[];for(let r=0,s=t.length;r!==s;++r){let o=t[r];o.id in e&&i.push(o)}return i}};function i_(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var $w=37297,Zw=0;function Jw(n,t){let e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var r_=new jt;function Kw(n){ue._getMatrix(r_,ue.workingColorSpace,n);let t=`mat3( ${r_.elements.map(e=>e.toFixed(4))} )`;switch(ue.getTransfer(n)){case $a:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function s_(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=(n.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Jw(n.getShaderSource(t),a)}else return s}function Qw(n,t){let e=Kw(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function tT(n,t){let e;switch(t){case by:e="Linear";break;case Sy:e="Reinhard";break;case My:e="Cineon";break;case wy:e="ACESFilmic";break;case Ay:e="AgX";break;case Ey:e="Neutral";break;case Ty:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Mf=new P;function eT(){ue.getLuminanceCoefficients(Mf);let n=Mf.x.toFixed(4),t=Mf.y.toFixed(4),e=Mf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nT(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Tl).join(`
`)}function iT(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function rT(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(t,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Tl(n){return n!==""}function o_(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function a_(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var sT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Up(n){return n.replace(sT,aT)}var oT=new Map;function aT(n,t){let e=Qt[t];if(e===void 0){let i=oT.get(t);if(i!==void 0)e=Qt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Up(e)}var lT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function l_(n){return n.replace(lT,cT)}function cT(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function c_(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function uT(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===rp?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===ty?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Qi&&(t="SHADOWMAP_TYPE_VSM"),t}function fT(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case $s:case Zs:t="ENVMAP_TYPE_CUBE";break;case xl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function hT(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Zs:t="ENVMAP_MODE_REFRACTION";break}return t}function dT(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case lp:t="ENVMAP_BLENDING_MULTIPLY";break;case xy:t="ENVMAP_BLENDING_MIX";break;case vy:t="ENVMAP_BLENDING_ADD";break}return t}function pT(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function mT(n,t,e,i){let r=n.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,l=uT(e),c=fT(e),u=hT(e),f=dT(e),h=pT(e),p=nT(e),g=iT(s),_=r.createProgram(),m,d,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Tl).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Tl).join(`
`),d.length>0&&(d+=`
`)):(m=[c_(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tl).join(`
`),d=[c_(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Mr?"#define TONE_MAPPING":"",e.toneMapping!==Mr?Qt.tonemapping_pars_fragment:"",e.toneMapping!==Mr?tT("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,Qw("linearToOutputTexel",e.outputColorSpace),eT(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Tl).join(`
`)),o=Up(o),o=o_(o,e),o=a_(o,e),a=Up(a),a=o_(a,e),a=a_(a,e),o=l_(o),a=l_(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===vp?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===vp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let w=A+m+o,S=A+d+a,C=i_(r,r.VERTEX_SHADER,w),E=i_(r,r.FRAGMENT_SHADER,S);r.attachShader(_,C),r.attachShader(_,E),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function I(R){if(n.debug.checkShaderErrors){let N=r.getProgramInfoLog(_)||"",V=r.getShaderInfoLog(C)||"",W=r.getShaderInfoLog(E)||"",Y=N.trim(),X=V.trim(),nt=W.trim(),H=!0,ot=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,C,E);else{let ft=s_(r,C,"vertex"),wt=s_(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+Y+`
`+ft+`
`+wt)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(X===""||nt==="")&&(ot=!1);ot&&(R.diagnostics={runnable:H,programLog:Y,vertexShader:{log:X,prefix:m},fragmentShader:{log:nt,prefix:d}})}r.deleteShader(C),r.deleteShader(E),B=new ca(r,_),b=rT(r,_)}let B;this.getUniforms=function(){return B===void 0&&I(this),B};let b;this.getAttributes=function(){return b===void 0&&I(this),b};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(_,$w)),v},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zw++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=E,this}var gT=0,Np=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new kp(t),e.set(t,i)),i}},kp=class{constructor(t){this.id=gT++,this.code=t,this.usedTimes=0}};function yT(n,t,e,i,r,s,o){let a=new Qa,l=new Np,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures,p=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,v,R,N,V){let W=N.fog,Y=V.geometry,X=b.isMeshStandardMaterial?N.environment:null,nt=(b.isMeshStandardMaterial?e:t).get(b.envMap||X),H=nt&&nt.mapping===xl?nt.image.height:null,ot=g[b.type];b.precision!==null&&(p=r.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let ft=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,wt=ft!==void 0?ft.length:0,oe=0;Y.morphAttributes.position!==void 0&&(oe=1),Y.morphAttributes.normal!==void 0&&(oe=2),Y.morphAttributes.color!==void 0&&(oe=3);let Me,Le,de,j;if(ot){let pe=er[ot];Me=pe.vertexShader,Le=pe.fragmentShader}else Me=b.vertexShader,Le=b.fragmentShader,l.update(b),de=l.getVertexShaderID(b),j=l.getFragmentShaderID(b);let J=n.getRenderTarget(),pt=n.state.buffers.depth.getReversed(),Nt=V.isInstancedMesh===!0,Mt=V.isBatchedMesh===!0,le=!!b.map,mn=!!b.matcap,T=!!nt,Fe=!!b.aoMap,Yt=!!b.lightMap,Pt=!!b.bumpMap,yt=!!b.normalMap,Be=!!b.displacementMap,_t=!!b.emissiveMap,Kt=!!b.metalnessMap,en=!!b.roughnessMap,Ge=b.anisotropy>0,M=b.clearcoat>0,y=b.dispersion>0,U=b.iridescence>0,q=b.sheen>0,Z=b.transmission>0,G=Ge&&!!b.anisotropyMap,St=M&&!!b.clearcoatMap,it=M&&!!b.clearcoatNormalMap,xt=M&&!!b.clearcoatRoughnessMap,vt=U&&!!b.iridescenceMap,tt=U&&!!b.iridescenceThicknessMap,ct=q&&!!b.sheenColorMap,Dt=q&&!!b.sheenRoughnessMap,bt=!!b.specularMap,at=!!b.specularColorMap,Zt=!!b.specularIntensityMap,D=Z&&!!b.transmissionMap,et=Z&&!!b.thicknessMap,rt=!!b.gradientMap,dt=!!b.alphaMap,K=b.alphaTest>0,$=!!b.alphaHash,gt=!!b.extensions,Wt=Mr;b.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Wt=n.toneMapping);let we={shaderID:ot,shaderType:b.type,shaderName:b.name,vertexShader:Me,fragmentShader:Le,defines:b.defines,customVertexShaderID:de,customFragmentShaderID:j,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:Mt,batchingColor:Mt&&V._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&V.instanceColor!==null,instancingMorph:Nt&&V.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:J===null?n.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ys,alphaToCoverage:!!b.alphaToCoverage,map:le,matcap:mn,envMap:T,envMapMode:T&&nt.mapping,envMapCubeUVHeight:H,aoMap:Fe,lightMap:Yt,bumpMap:Pt,normalMap:yt,displacementMap:h&&Be,emissiveMap:_t,normalMapObjectSpace:yt&&b.normalMapType===Dy,normalMapTangentSpace:yt&&b.normalMapType===_p,metalnessMap:Kt,roughnessMap:en,anisotropy:Ge,anisotropyMap:G,clearcoat:M,clearcoatMap:St,clearcoatNormalMap:it,clearcoatRoughnessMap:xt,dispersion:y,iridescence:U,iridescenceMap:vt,iridescenceThicknessMap:tt,sheen:q,sheenColorMap:ct,sheenRoughnessMap:Dt,specularMap:bt,specularColorMap:at,specularIntensityMap:Zt,transmission:Z,transmissionMap:D,thicknessMap:et,gradientMap:rt,opaque:b.transparent===!1&&b.blending===Xs&&b.alphaToCoverage===!1,alphaMap:dt,alphaTest:K,alphaHash:$,combine:b.combine,mapUv:le&&_(b.map.channel),aoMapUv:Fe&&_(b.aoMap.channel),lightMapUv:Yt&&_(b.lightMap.channel),bumpMapUv:Pt&&_(b.bumpMap.channel),normalMapUv:yt&&_(b.normalMap.channel),displacementMapUv:Be&&_(b.displacementMap.channel),emissiveMapUv:_t&&_(b.emissiveMap.channel),metalnessMapUv:Kt&&_(b.metalnessMap.channel),roughnessMapUv:en&&_(b.roughnessMap.channel),anisotropyMapUv:G&&_(b.anisotropyMap.channel),clearcoatMapUv:St&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:it&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&_(b.sheenRoughnessMap.channel),specularMapUv:bt&&_(b.specularMap.channel),specularColorMapUv:at&&_(b.specularColorMap.channel),specularIntensityMapUv:Zt&&_(b.specularIntensityMap.channel),transmissionMapUv:D&&_(b.transmissionMap.channel),thicknessMapUv:et&&_(b.thicknessMap.channel),alphaMapUv:dt&&_(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(yt||Ge),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Y.attributes.uv&&(le||dt),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:pt,skinning:V.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:oe,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Wt,decodeVideoTexture:le&&b.map.isVideoTexture===!0&&ue.getTransfer(b.map.colorSpace)===me,decodeVideoTextureEmissive:_t&&b.emissiveMap.isVideoTexture===!0&&ue.getTransfer(b.emissiveMap.colorSpace)===me,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===qn,flipSided:b.side===An,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:gt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&b.extensions.multiDraw===!0||Mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return we.vertexUv1s=c.has(1),we.vertexUv2s=c.has(2),we.vertexUv3s=c.has(3),c.clear(),we}function d(b){let v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(let R in b.defines)v.push(R),v.push(b.defines[R]);return b.isRawShaderMaterial===!1&&(A(v,b),w(v,b),v.push(n.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function A(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function w(b,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),v.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),b.push(a.mask)}function S(b){let v=g[b.type],R;if(v){let N=er[v];R=Hy.clone(N.uniforms)}else R=b.uniforms;return R}function C(b,v){let R;for(let N=0,V=u.length;N<V;N++){let W=u[N];if(W.cacheKey===v){R=W,++R.usedTimes;break}}return R===void 0&&(R=new mT(n,v,b,s),u.push(R)),R}function E(b){if(--b.usedTimes===0){let v=u.indexOf(b);u[v]=u[u.length-1],u.pop(),b.destroy()}}function I(b){l.remove(b)}function B(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:C,releaseProgram:E,releaseShaderCache:I,programs:u,dispose:B}}function _T(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function xT(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function u_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function f_(){let n=[],t=0,e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(f,h,p,g,_,m){let d=n[t];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[t]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=_,d.group=m),t++,d}function a(f,h,p,g,_,m){let d=o(f,h,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):e.push(d)}function l(f,h,p,g,_,m){let d=o(f,h,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):e.unshift(d)}function c(f,h){e.length>1&&e.sort(f||xT),i.length>1&&i.sort(h||u_),r.length>1&&r.sort(h||u_)}function u(){for(let f=t,h=n.length;f<h;f++){let p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function vT(){let n=new WeakMap;function t(i,r){let s=n.get(i),o;return s===void 0?(o=new f_,n.set(i,[o])):r>=s.length?(o=new f_,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function bT(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Jt};break;case"SpotLight":e={position:new P,direction:new P,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function ST(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var MT=0;function wT(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function TT(n){let t=new bT,e=ST(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let r=new P,s=new Ie,o=new Ie;function a(c){let u=0,f=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,A=0,w=0,S=0,C=0,E=0,I=0;c.sort(wT);for(let b=0,v=c.length;b<v;b++){let R=c[b],N=R.color,V=R.intensity,W=R.distance,Y=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=N.r*V,f+=N.g*V,h+=N.b*V;else if(R.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(R.sh.coefficients[X],V);I++}else if(R.isDirectionalLight){let X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let nt=R.shadow,H=e.get(R);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=Y,i.directionalShadowMatrix[p]=R.shadow.matrix,A++}i.directional[p]=X,p++}else if(R.isSpotLight){let X=t.get(R);X.position.setFromMatrixPosition(R.matrixWorld),X.color.copy(N).multiplyScalar(V),X.distance=W,X.coneCos=Math.cos(R.angle),X.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),X.decay=R.decay,i.spot[_]=X;let nt=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,nt.updateMatrices(R),R.castShadow&&E++),i.spotLightMatrix[_]=nt.matrix,R.castShadow){let H=e.get(R);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=Y,S++}_++}else if(R.isRectAreaLight){let X=t.get(R);X.color.copy(N).multiplyScalar(V),X.halfWidth.set(R.width*.5,0,0),X.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=X,m++}else if(R.isPointLight){let X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),X.distance=R.distance,X.decay=R.decay,R.castShadow){let nt=R.shadow,H=e.get(R);H.shadowIntensity=nt.intensity,H.shadowBias=nt.bias,H.shadowNormalBias=nt.normalBias,H.shadowRadius=nt.radius,H.shadowMapSize=nt.mapSize,H.shadowCameraNear=nt.camera.near,H.shadowCameraFar=nt.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=Y,i.pointShadowMatrix[g]=R.shadow.matrix,w++}i.point[g]=X,g++}else if(R.isHemisphereLight){let X=t.get(R);X.skyColor.copy(R.color).multiplyScalar(V),X.groundColor.copy(R.groundColor).multiplyScalar(V),i.hemi[d]=X,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=st.LTC_FLOAT_1,i.rectAreaLTC2=st.LTC_FLOAT_2):(i.rectAreaLTC1=st.LTC_HALF_1,i.rectAreaLTC2=st.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;let B=i.hash;(B.directionalLength!==p||B.pointLength!==g||B.spotLength!==_||B.rectAreaLength!==m||B.hemiLength!==d||B.numDirectionalShadows!==A||B.numPointShadows!==w||B.numSpotShadows!==S||B.numSpotMaps!==C||B.numLightProbes!==I)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+C-E,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=I,B.directionalLength=p,B.pointLength=g,B.spotLength=_,B.rectAreaLength=m,B.hemiLength=d,B.numDirectionalShadows=A,B.numPointShadows=w,B.numSpotShadows=S,B.numSpotMaps=C,B.numLightProbes=I,i.version=MT++)}function l(c,u){let f=0,h=0,p=0,g=0,_=0,m=u.matrixWorldInverse;for(let d=0,A=c.length;d<A;d++){let w=c[d];if(w.isDirectionalLight){let S=i.directional[f];S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),f++}else if(w.isSpotLight){let S=i.spot[p];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(w.isRectAreaLight){let S=i.rectArea[g];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(w.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let S=i.point[h];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),h++}else if(w.isHemisphereLight){let S=i.hemi[_];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function h_(n){let t=new TT(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function AT(n){let t=new WeakMap;function e(r,s=0){let o=t.get(r),a;return o===void 0?(a=new h_(n),t.set(r,[a])):s>=o.length?(a=new h_(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var ET=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,CT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function IT(n,t,e){let i=new Ko,r=new kt,s=new kt,o=new Ne,a=new _u({depthPacking:Ry}),l=new xu,c={},u=e.maxTextureSize,f={[br]:An,[An]:br,[qn]:qn},h=new Ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:ET,fragmentShader:CT}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let g=new rn;g.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new vn(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rp;let d=this.type;this.render=function(E,I,B){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let b=n.getRenderTarget(),v=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Sr),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let V=d!==Qi&&this.type===Qi,W=d===Qi&&this.type!==Qi;for(let Y=0,X=E.length;Y<X;Y++){let nt=E[Y],H=nt.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);let ot=H.getFrameExtents();if(r.multiply(ot),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ot.x),r.x=s.x*ot.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ot.y),r.y=s.y*ot.y,H.mapSize.y=s.y)),H.map===null||V===!0||W===!0){let wt=this.type!==Qi?{minFilter:li,magFilter:li}:{};H.map!==null&&H.map.dispose(),H.map=new Ji(r.x,r.y,wt),H.map.texture.name=nt.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();let ft=H.getViewportCount();for(let wt=0;wt<ft;wt++){let oe=H.getViewport(wt);o.set(s.x*oe.x,s.y*oe.y,s.x*oe.z,s.y*oe.w),N.viewport(o),H.updateMatrices(nt,wt),i=H.getFrustum(),S(I,B,H.camera,nt,this.type)}H.isPointLightShadow!==!0&&this.type===Qi&&A(H,B),H.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(b,v,R)};function A(E,I){let B=t.update(_);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ji(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(I,null,B,h,_,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(I,null,B,p,_,null)}function w(E,I,B,b){let v=null,R=B.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)v=R;else if(v=B.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let N=v.uuid,V=I.uuid,W=c[N];W===void 0&&(W={},c[N]=W);let Y=W[V];Y===void 0&&(Y=v.clone(),W[V]=Y,I.addEventListener("dispose",C)),v=Y}if(v.visible=I.visible,v.wireframe=I.wireframe,b===Qi?v.side=I.shadowSide!==null?I.shadowSide:I.side:v.side=I.shadowSide!==null?I.shadowSide:f[I.side],v.alphaMap=I.alphaMap,v.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,v.map=I.map,v.clipShadows=I.clipShadows,v.clippingPlanes=I.clippingPlanes,v.clipIntersection=I.clipIntersection,v.displacementMap=I.displacementMap,v.displacementScale=I.displacementScale,v.displacementBias=I.displacementBias,v.wireframeLinewidth=I.wireframeLinewidth,v.linewidth=I.linewidth,B.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let N=n.properties.get(v);N.light=B}return v}function S(E,I,B,b,v){if(E.visible===!1)return;if(E.layers.test(I.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===Qi)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld);let V=t.update(E),W=E.material;if(Array.isArray(W)){let Y=V.groups;for(let X=0,nt=Y.length;X<nt;X++){let H=Y[X],ot=W[H.materialIndex];if(ot&&ot.visible){let ft=w(E,ot,b,v);E.onBeforeShadow(n,E,I,B,V,ft,H),n.renderBufferDirect(B,null,V,ft,E,H),E.onAfterShadow(n,E,I,B,V,ft,H)}}}else if(W.visible){let Y=w(E,W,b,v);E.onBeforeShadow(n,E,I,B,V,Y,null),n.renderBufferDirect(B,null,V,Y,E,null),E.onAfterShadow(n,E,I,B,V,Y,null)}}let N=E.children;for(let V=0,W=N.length;V<W;V++)S(N[V],I,B,b,v)}function C(E){E.target.removeEventListener("dispose",C);for(let B in c){let b=c[B],v=E.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}var RT={[Ru]:Du,[Pu]:Bu,[Lu]:Ou,[qs]:Fu,[Du]:Ru,[Bu]:Pu,[Ou]:Lu,[Fu]:qs};function DT(n,t){function e(){let D=!1,et=new Ne,rt=null,dt=new Ne(0,0,0,0);return{setMask:function(K){rt!==K&&!D&&(n.colorMask(K,K,K,K),rt=K)},setLocked:function(K){D=K},setClear:function(K,$,gt,Wt,we){we===!0&&(K*=Wt,$*=Wt,gt*=Wt),et.set(K,$,gt,Wt),dt.equals(et)===!1&&(n.clearColor(K,$,gt,Wt),dt.copy(et))},reset:function(){D=!1,rt=null,dt.set(-1,0,0,0)}}}function i(){let D=!1,et=!1,rt=null,dt=null,K=null;return{setReversed:function($){if(et!==$){let gt=t.get("EXT_clip_control");$?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),et=$;let Wt=K;K=null,this.setClear(Wt)}},getReversed:function(){return et},setTest:function($){$?J(n.DEPTH_TEST):pt(n.DEPTH_TEST)},setMask:function($){rt!==$&&!D&&(n.depthMask($),rt=$)},setFunc:function($){if(et&&($=RT[$]),dt!==$){switch($){case Ru:n.depthFunc(n.NEVER);break;case Du:n.depthFunc(n.ALWAYS);break;case Pu:n.depthFunc(n.LESS);break;case qs:n.depthFunc(n.LEQUAL);break;case Lu:n.depthFunc(n.EQUAL);break;case Fu:n.depthFunc(n.GEQUAL);break;case Bu:n.depthFunc(n.GREATER);break;case Ou:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}dt=$}},setLocked:function($){D=$},setClear:function($){K!==$&&(et&&($=1-$),n.clearDepth($),K=$)},reset:function(){D=!1,rt=null,dt=null,K=null,et=!1}}}function r(){let D=!1,et=null,rt=null,dt=null,K=null,$=null,gt=null,Wt=null,we=null;return{setTest:function(pe){D||(pe?J(n.STENCIL_TEST):pt(n.STENCIL_TEST))},setMask:function(pe){et!==pe&&!D&&(n.stencilMask(pe),et=pe)},setFunc:function(pe,pr,$i){(rt!==pe||dt!==pr||K!==$i)&&(n.stencilFunc(pe,pr,$i),rt=pe,dt=pr,K=$i)},setOp:function(pe,pr,$i){($!==pe||gt!==pr||Wt!==$i)&&(n.stencilOp(pe,pr,$i),$=pe,gt=pr,Wt=$i)},setLocked:function(pe){D=pe},setClear:function(pe){we!==pe&&(n.clearStencil(pe),we=pe)},reset:function(){D=!1,et=null,rt=null,dt=null,K=null,$=null,gt=null,Wt=null,we=null}}}let s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap,u={},f={},h=new WeakMap,p=[],g=null,_=!1,m=null,d=null,A=null,w=null,S=null,C=null,E=null,I=new Jt(0,0,0),B=0,b=!1,v=null,R=null,N=null,V=null,W=null,Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,nt=0,H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=nt>=1):H.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=nt>=2);let ot=null,ft={},wt=n.getParameter(n.SCISSOR_BOX),oe=n.getParameter(n.VIEWPORT),Me=new Ne().fromArray(wt),Le=new Ne().fromArray(oe);function de(D,et,rt,dt){let K=new Uint8Array(4),$=n.createTexture();n.bindTexture(D,$),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let gt=0;gt<rt;gt++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(et,0,n.RGBA,1,1,dt,0,n.RGBA,n.UNSIGNED_BYTE,K):n.texImage2D(et+gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,K);return $}let j={};j[n.TEXTURE_2D]=de(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=de(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=de(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=de(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(n.DEPTH_TEST),o.setFunc(qs),Pt(!1),yt(ip),J(n.CULL_FACE),Fe(Sr);function J(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function pt(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function Nt(D,et){return f[D]!==et?(n.bindFramebuffer(D,et),f[D]=et,D===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=et),D===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=et),!0):!1}function Mt(D,et){let rt=p,dt=!1;if(D){rt=h.get(et),rt===void 0&&(rt=[],h.set(et,rt));let K=D.textures;if(rt.length!==K.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let $=0,gt=K.length;$<gt;$++)rt[$]=n.COLOR_ATTACHMENT0+$;rt.length=K.length,dt=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,dt=!0);dt&&n.drawBuffers(rt)}function le(D){return g!==D?(n.useProgram(D),g=D,!0):!1}let mn={[rs]:n.FUNC_ADD,[ny]:n.FUNC_SUBTRACT,[iy]:n.FUNC_REVERSE_SUBTRACT};mn[ry]=n.MIN,mn[sy]=n.MAX;let T={[oy]:n.ZERO,[ay]:n.ONE,[ly]:n.SRC_COLOR,[ru]:n.SRC_ALPHA,[py]:n.SRC_ALPHA_SATURATE,[hy]:n.DST_COLOR,[uy]:n.DST_ALPHA,[cy]:n.ONE_MINUS_SRC_COLOR,[su]:n.ONE_MINUS_SRC_ALPHA,[dy]:n.ONE_MINUS_DST_COLOR,[fy]:n.ONE_MINUS_DST_ALPHA,[my]:n.CONSTANT_COLOR,[gy]:n.ONE_MINUS_CONSTANT_COLOR,[yy]:n.CONSTANT_ALPHA,[_y]:n.ONE_MINUS_CONSTANT_ALPHA};function Fe(D,et,rt,dt,K,$,gt,Wt,we,pe){if(D===Sr){_===!0&&(pt(n.BLEND),_=!1);return}if(_===!1&&(J(n.BLEND),_=!0),D!==ey){if(D!==m||pe!==b){if((d!==rs||S!==rs)&&(n.blendEquation(n.FUNC_ADD),d=rs,S=rs),pe)switch(D){case Xs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case sp:n.blendFunc(n.ONE,n.ONE);break;case op:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ap:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Xs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case sp:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case op:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ap:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}A=null,w=null,C=null,E=null,I.set(0,0,0),B=0,m=D,b=pe}return}K=K||et,$=$||rt,gt=gt||dt,(et!==d||K!==S)&&(n.blendEquationSeparate(mn[et],mn[K]),d=et,S=K),(rt!==A||dt!==w||$!==C||gt!==E)&&(n.blendFuncSeparate(T[rt],T[dt],T[$],T[gt]),A=rt,w=dt,C=$,E=gt),(Wt.equals(I)===!1||we!==B)&&(n.blendColor(Wt.r,Wt.g,Wt.b,we),I.copy(Wt),B=we),m=D,b=!1}function Yt(D,et){D.side===qn?pt(n.CULL_FACE):J(n.CULL_FACE);let rt=D.side===An;et&&(rt=!rt),Pt(rt),D.blending===Xs&&D.transparent===!1?Fe(Sr):Fe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);let dt=D.stencilWrite;a.setTest(dt),dt&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_t(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?J(n.SAMPLE_ALPHA_TO_COVERAGE):pt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pt(D){v!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),v=D)}function yt(D){D!==Kg?(J(n.CULL_FACE),D!==R&&(D===ip?n.cullFace(n.BACK):D===Qg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pt(n.CULL_FACE),R=D}function Be(D){D!==N&&(X&&n.lineWidth(D),N=D)}function _t(D,et,rt){D?(J(n.POLYGON_OFFSET_FILL),(V!==et||W!==rt)&&(n.polygonOffset(et,rt),V=et,W=rt)):pt(n.POLYGON_OFFSET_FILL)}function Kt(D){D?J(n.SCISSOR_TEST):pt(n.SCISSOR_TEST)}function en(D){D===void 0&&(D=n.TEXTURE0+Y-1),ot!==D&&(n.activeTexture(D),ot=D)}function Ge(D,et,rt){rt===void 0&&(ot===null?rt=n.TEXTURE0+Y-1:rt=ot);let dt=ft[rt];dt===void 0&&(dt={type:void 0,texture:void 0},ft[rt]=dt),(dt.type!==D||dt.texture!==et)&&(ot!==rt&&(n.activeTexture(rt),ot=rt),n.bindTexture(D,et||j[D]),dt.type=D,dt.texture=et)}function M(){let D=ft[ot];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function y(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function vt(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ct(D){Me.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Me.copy(D))}function Dt(D){Le.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Le.copy(D))}function bt(D,et){let rt=c.get(et);rt===void 0&&(rt=new WeakMap,c.set(et,rt));let dt=rt.get(D);dt===void 0&&(dt=n.getUniformBlockIndex(et,D.name),rt.set(D,dt))}function at(D,et){let dt=c.get(et).get(D);l.get(et)!==dt&&(n.uniformBlockBinding(et,dt,D.__bindingPointIndex),l.set(et,dt))}function Zt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ot=null,ft={},f={},h=new WeakMap,p=[],g=null,_=!1,m=null,d=null,A=null,w=null,S=null,C=null,E=null,I=new Jt(0,0,0),B=0,b=!1,v=null,R=null,N=null,V=null,W=null,Me.set(0,0,n.canvas.width,n.canvas.height),Le.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:J,disable:pt,bindFramebuffer:Nt,drawBuffers:Mt,useProgram:le,setBlending:Fe,setMaterial:Yt,setFlipSided:Pt,setCullFace:yt,setLineWidth:Be,setPolygonOffset:_t,setScissorTest:Kt,activeTexture:en,bindTexture:Ge,unbindTexture:M,compressedTexImage2D:y,compressedTexImage3D:U,texImage2D:vt,texImage3D:tt,updateUBOMapping:bt,uniformBlockBinding:at,texStorage2D:it,texStorage3D:xt,texSubImage2D:q,texSubImage3D:Z,compressedTexSubImage2D:G,compressedTexSubImage3D:St,scissor:ct,viewport:Dt,reset:Zt}}function PT(n,t,e,i,r,s,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new kt,u=new WeakMap,f,h=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,y){return p?new OffscreenCanvas(M,y):Ja("canvas")}function _(M,y,U){let q=1,Z=Ge(M);if((Z.width>U||Z.height>U)&&(q=U/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){let G=Math.floor(q*Z.width),St=Math.floor(q*Z.height);f===void 0&&(f=g(G,St));let it=y?g(G,St):f;return it.width=G,it.height=St,it.getContext("2d").drawImage(M,0,0,G,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+G+"x"+St+")."),it}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),M;return M}function m(M){return M.generateMipmaps}function d(M){n.generateMipmap(M)}function A(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(M,y,U,q,Z=!1){if(M!==null){if(n[M]!==void 0)return n[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let G=y;if(y===n.RED&&(U===n.FLOAT&&(G=n.R32F),U===n.HALF_FLOAT&&(G=n.R16F),U===n.UNSIGNED_BYTE&&(G=n.R8)),y===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(G=n.R8UI),U===n.UNSIGNED_SHORT&&(G=n.R16UI),U===n.UNSIGNED_INT&&(G=n.R32UI),U===n.BYTE&&(G=n.R8I),U===n.SHORT&&(G=n.R16I),U===n.INT&&(G=n.R32I)),y===n.RG&&(U===n.FLOAT&&(G=n.RG32F),U===n.HALF_FLOAT&&(G=n.RG16F),U===n.UNSIGNED_BYTE&&(G=n.RG8)),y===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(G=n.RG8UI),U===n.UNSIGNED_SHORT&&(G=n.RG16UI),U===n.UNSIGNED_INT&&(G=n.RG32UI),U===n.BYTE&&(G=n.RG8I),U===n.SHORT&&(G=n.RG16I),U===n.INT&&(G=n.RG32I)),y===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(G=n.RGB8UI),U===n.UNSIGNED_SHORT&&(G=n.RGB16UI),U===n.UNSIGNED_INT&&(G=n.RGB32UI),U===n.BYTE&&(G=n.RGB8I),U===n.SHORT&&(G=n.RGB16I),U===n.INT&&(G=n.RGB32I)),y===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),U===n.UNSIGNED_INT&&(G=n.RGBA32UI),U===n.BYTE&&(G=n.RGBA8I),U===n.SHORT&&(G=n.RGBA16I),U===n.INT&&(G=n.RGBA32I)),y===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(G=n.R11F_G11F_B10F)),y===n.RGBA){let St=Z?$a:ue.getTransfer(q);U===n.FLOAT&&(G=n.RGBA32F),U===n.HALF_FLOAT&&(G=n.RGBA16F),U===n.UNSIGNED_BYTE&&(G=St===me?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function S(M,y){let U;return M?y===null||y===ps||y===ra?U=n.DEPTH24_STENCIL8:y===tr?U=n.DEPTH32F_STENCIL8:y===na&&(U=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ps||y===ra?U=n.DEPTH_COMPONENT24:y===tr?U=n.DEPTH_COMPONENT32F:y===na&&(U=n.DEPTH_COMPONENT16),U}function C(M,y){return m(M)===!0||M.isFramebufferTexture&&M.minFilter!==li&&M.minFilter!==Ei?Math.log2(Math.max(y.width,y.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?y.mipmaps.length:1}function E(M){let y=M.target;y.removeEventListener("dispose",E),B(y),y.isVideoTexture&&u.delete(y)}function I(M){let y=M.target;y.removeEventListener("dispose",I),v(y)}function B(M){let y=i.get(M);if(y.__webglInit===void 0)return;let U=M.source,q=h.get(U);if(q){let Z=q[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(M),Object.keys(q).length===0&&h.delete(U)}i.remove(M)}function b(M){let y=i.get(M);n.deleteTexture(y.__webglTexture);let U=M.source,q=h.get(U);delete q[y.__cacheKey],o.memory.textures--}function v(M){let y=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let Z=0;Z<y.__webglFramebuffer[q].length;Z++)n.deleteFramebuffer(y.__webglFramebuffer[q][Z]);else n.deleteFramebuffer(y.__webglFramebuffer[q]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)n.deleteFramebuffer(y.__webglFramebuffer[q]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let q=0;q<y.__webglColorRenderbuffer.length;q++)y.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let U=M.textures;for(let q=0,Z=U.length;q<Z;q++){let G=i.get(U[q]);G.__webglTexture&&(n.deleteTexture(G.__webglTexture),o.memory.textures--),i.remove(U[q])}i.remove(M)}let R=0;function N(){R=0}function V(){let M=R;return M>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),R+=1,M}function W(M){let y=[];return y.push(M.wrapS),y.push(M.wrapT),y.push(M.wrapR||0),y.push(M.magFilter),y.push(M.minFilter),y.push(M.anisotropy),y.push(M.internalFormat),y.push(M.format),y.push(M.type),y.push(M.generateMipmaps),y.push(M.premultiplyAlpha),y.push(M.flipY),y.push(M.unpackAlignment),y.push(M.colorSpace),y.join()}function Y(M,y){let U=i.get(M);if(M.isVideoTexture&&Kt(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&U.__version!==M.version){let q=M.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(U,M,y);return}}else M.isExternalTexture&&(U.__webglTexture=M.sourceTexture?M.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+y)}function X(M,y){let U=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){j(U,M,y);return}e.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+y)}function nt(M,y){let U=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){j(U,M,y);return}e.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+y)}function H(M,y){let U=i.get(M);if(M.version>0&&U.__version!==M.version){J(U,M,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+y)}let ot={[ou]:n.REPEAT,[is]:n.CLAMP_TO_EDGE,[au]:n.MIRRORED_REPEAT},ft={[li]:n.NEAREST,[Cy]:n.NEAREST_MIPMAP_NEAREST,[vl]:n.NEAREST_MIPMAP_LINEAR,[Ei]:n.LINEAR,[ku]:n.LINEAR_MIPMAP_NEAREST,[ds]:n.LINEAR_MIPMAP_LINEAR},wt={[Py]:n.NEVER,[Ny]:n.ALWAYS,[Ly]:n.LESS,[xp]:n.LEQUAL,[Fy]:n.EQUAL,[Uy]:n.GEQUAL,[By]:n.GREATER,[Oy]:n.NOTEQUAL};function oe(M,y){if(y.type===tr&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Ei||y.magFilter===ku||y.magFilter===vl||y.magFilter===ds||y.minFilter===Ei||y.minFilter===ku||y.minFilter===vl||y.minFilter===ds)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,ot[y.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,ot[y.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,ot[y.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,ft[y.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,ft[y.minFilter]),y.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,wt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===li||y.minFilter!==vl&&y.minFilter!==ds||y.type===tr&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");n.texParameterf(M,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Me(M,y){let U=!1;M.__webglInit===void 0&&(M.__webglInit=!0,y.addEventListener("dispose",E));let q=y.source,Z=h.get(q);Z===void 0&&(Z={},h.set(q,Z));let G=W(y);if(G!==M.__cacheKey){Z[G]===void 0&&(Z[G]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),Z[G].usedTimes++;let St=Z[M.__cacheKey];St!==void 0&&(Z[M.__cacheKey].usedTimes--,St.usedTimes===0&&b(y)),M.__cacheKey=G,M.__webglTexture=Z[G].texture}return U}function Le(M,y,U){return Math.floor(Math.floor(M/U)/y)}function de(M,y,U,q){let G=M.updateRanges;if(G.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,U,q,y.data);else{G.sort((tt,ct)=>tt.start-ct.start);let St=0;for(let tt=1;tt<G.length;tt++){let ct=G[St],Dt=G[tt],bt=ct.start+ct.count,at=Le(Dt.start,y.width,4),Zt=Le(ct.start,y.width,4);Dt.start<=bt+1&&at===Zt&&Le(Dt.start+Dt.count-1,y.width,4)===at?ct.count=Math.max(ct.count,Dt.start+Dt.count-ct.start):(++St,G[St]=Dt)}G.length=St+1;let it=n.getParameter(n.UNPACK_ROW_LENGTH),xt=n.getParameter(n.UNPACK_SKIP_PIXELS),vt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let tt=0,ct=G.length;tt<ct;tt++){let Dt=G[tt],bt=Math.floor(Dt.start/4),at=Math.ceil(Dt.count/4),Zt=bt%y.width,D=Math.floor(bt/y.width),et=at,rt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Zt),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),e.texSubImage2D(n.TEXTURE_2D,0,Zt,D,et,rt,U,q,y.data)}M.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,it),n.pixelStorei(n.UNPACK_SKIP_PIXELS,xt),n.pixelStorei(n.UNPACK_SKIP_ROWS,vt)}}function j(M,y,U){let q=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(q=n.TEXTURE_3D);let Z=Me(M,y),G=y.source;e.bindTexture(q,M.__webglTexture,n.TEXTURE0+U);let St=i.get(G);if(G.version!==St.__version||Z===!0){e.activeTexture(n.TEXTURE0+U);let it=ue.getPrimaries(ue.workingColorSpace),xt=y.colorSpace===wr?null:ue.getPrimaries(y.colorSpace),vt=y.colorSpace===wr||it===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let tt=_(y.image,!1,r.maxTextureSize);tt=en(y,tt);let ct=s.convert(y.format,y.colorSpace),Dt=s.convert(y.type),bt=w(y.internalFormat,ct,Dt,y.colorSpace,y.isVideoTexture);oe(q,y);let at,Zt=y.mipmaps,D=y.isVideoTexture!==!0,et=St.__version===void 0||Z===!0,rt=G.dataReady,dt=C(y,tt);if(y.isDepthTexture)bt=S(y.format===sa,y.type),et&&(D?e.texStorage2D(n.TEXTURE_2D,1,bt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,bt,tt.width,tt.height,0,ct,Dt,null));else if(y.isDataTexture)if(Zt.length>0){D&&et&&e.texStorage2D(n.TEXTURE_2D,dt,bt,Zt[0].width,Zt[0].height);for(let K=0,$=Zt.length;K<$;K++)at=Zt[K],D?rt&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,at.width,at.height,ct,Dt,at.data):e.texImage2D(n.TEXTURE_2D,K,bt,at.width,at.height,0,ct,Dt,at.data);y.generateMipmaps=!1}else D?(et&&e.texStorage2D(n.TEXTURE_2D,dt,bt,tt.width,tt.height),rt&&de(y,tt,ct,Dt)):e.texImage2D(n.TEXTURE_2D,0,bt,tt.width,tt.height,0,ct,Dt,tt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){D&&et&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,bt,Zt[0].width,Zt[0].height,tt.depth);for(let K=0,$=Zt.length;K<$;K++)if(at=Zt[K],y.format!==ui)if(ct!==null)if(D){if(rt)if(y.layerUpdates.size>0){let gt=Ep(at.width,at.height,y.format,y.type);for(let Wt of y.layerUpdates){let we=at.data.subarray(Wt*gt/at.data.BYTES_PER_ELEMENT,(Wt+1)*gt/at.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,Wt,at.width,at.height,1,ct,we)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,at.width,at.height,tt.depth,ct,at.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,bt,at.width,at.height,tt.depth,0,at.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?rt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,at.width,at.height,tt.depth,ct,Dt,at.data):e.texImage3D(n.TEXTURE_2D_ARRAY,K,bt,at.width,at.height,tt.depth,0,ct,Dt,at.data)}else{D&&et&&e.texStorage2D(n.TEXTURE_2D,dt,bt,Zt[0].width,Zt[0].height);for(let K=0,$=Zt.length;K<$;K++)at=Zt[K],y.format!==ui?ct!==null?D?rt&&e.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,at.width,at.height,ct,at.data):e.compressedTexImage2D(n.TEXTURE_2D,K,bt,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?rt&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,at.width,at.height,ct,Dt,at.data):e.texImage2D(n.TEXTURE_2D,K,bt,at.width,at.height,0,ct,Dt,at.data)}else if(y.isDataArrayTexture)if(D){if(et&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,bt,tt.width,tt.height,tt.depth),rt)if(y.layerUpdates.size>0){let K=Ep(tt.width,tt.height,y.format,y.type);for(let $ of y.layerUpdates){let gt=tt.data.subarray($*K/tt.data.BYTES_PER_ELEMENT,($+1)*K/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,tt.width,tt.height,1,ct,Dt,gt)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ct,Dt,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,bt,tt.width,tt.height,tt.depth,0,ct,Dt,tt.data);else if(y.isData3DTexture)D?(et&&e.texStorage3D(n.TEXTURE_3D,dt,bt,tt.width,tt.height,tt.depth),rt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ct,Dt,tt.data)):e.texImage3D(n.TEXTURE_3D,0,bt,tt.width,tt.height,tt.depth,0,ct,Dt,tt.data);else if(y.isFramebufferTexture){if(et)if(D)e.texStorage2D(n.TEXTURE_2D,dt,bt,tt.width,tt.height);else{let K=tt.width,$=tt.height;for(let gt=0;gt<dt;gt++)e.texImage2D(n.TEXTURE_2D,gt,bt,K,$,0,ct,Dt,null),K>>=1,$>>=1}}else if(Zt.length>0){if(D&&et){let K=Ge(Zt[0]);e.texStorage2D(n.TEXTURE_2D,dt,bt,K.width,K.height)}for(let K=0,$=Zt.length;K<$;K++)at=Zt[K],D?rt&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,ct,Dt,at):e.texImage2D(n.TEXTURE_2D,K,bt,ct,Dt,at);y.generateMipmaps=!1}else if(D){if(et){let K=Ge(tt);e.texStorage2D(n.TEXTURE_2D,dt,bt,K.width,K.height)}rt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct,Dt,tt)}else e.texImage2D(n.TEXTURE_2D,0,bt,ct,Dt,tt);m(y)&&d(q),St.__version=G.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function J(M,y,U){if(y.image.length!==6)return;let q=Me(M,y),Z=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+U);let G=i.get(Z);if(Z.version!==G.__version||q===!0){e.activeTexture(n.TEXTURE0+U);let St=ue.getPrimaries(ue.workingColorSpace),it=y.colorSpace===wr?null:ue.getPrimaries(y.colorSpace),xt=y.colorSpace===wr||St===it?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let vt=y.isCompressedTexture||y.image[0].isCompressedTexture,tt=y.image[0]&&y.image[0].isDataTexture,ct=[];for(let $=0;$<6;$++)!vt&&!tt?ct[$]=_(y.image[$],!0,r.maxCubemapSize):ct[$]=tt?y.image[$].image:y.image[$],ct[$]=en(y,ct[$]);let Dt=ct[0],bt=s.convert(y.format,y.colorSpace),at=s.convert(y.type),Zt=w(y.internalFormat,bt,at,y.colorSpace),D=y.isVideoTexture!==!0,et=G.__version===void 0||q===!0,rt=Z.dataReady,dt=C(y,Dt);oe(n.TEXTURE_CUBE_MAP,y);let K;if(vt){D&&et&&e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Zt,Dt.width,Dt.height);for(let $=0;$<6;$++){K=ct[$].mipmaps;for(let gt=0;gt<K.length;gt++){let Wt=K[gt];y.format!==ui?bt!==null?D?rt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,gt,0,0,Wt.width,Wt.height,bt,Wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,gt,Zt,Wt.width,Wt.height,0,Wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,gt,0,0,Wt.width,Wt.height,bt,at,Wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,gt,Zt,Wt.width,Wt.height,0,bt,at,Wt.data)}}}else{if(K=y.mipmaps,D&&et){K.length>0&&dt++;let $=Ge(ct[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Zt,$.width,$.height)}for(let $=0;$<6;$++)if(tt){D?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ct[$].width,ct[$].height,bt,at,ct[$].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Zt,ct[$].width,ct[$].height,0,bt,at,ct[$].data);for(let gt=0;gt<K.length;gt++){let we=K[gt].image[$].image;D?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,gt+1,0,0,we.width,we.height,bt,at,we.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,gt+1,Zt,we.width,we.height,0,bt,at,we.data)}}else{D?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,bt,at,ct[$]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Zt,bt,at,ct[$]);for(let gt=0;gt<K.length;gt++){let Wt=K[gt];D?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,gt+1,0,0,bt,at,Wt.image[$]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,gt+1,Zt,bt,at,Wt.image[$])}}}m(y)&&d(n.TEXTURE_CUBE_MAP),G.__version=Z.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function pt(M,y,U,q,Z,G){let St=s.convert(U.format,U.colorSpace),it=s.convert(U.type),xt=w(U.internalFormat,St,it,U.colorSpace),vt=i.get(y),tt=i.get(U);if(tt.__renderTarget=y,!vt.__hasExternalTextures){let ct=Math.max(1,y.width>>G),Dt=Math.max(1,y.height>>G);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,G,xt,ct,Dt,y.depth,0,St,it,null):e.texImage2D(Z,G,xt,ct,Dt,0,St,it,null)}e.bindFramebuffer(n.FRAMEBUFFER,M),_t(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,Z,tt.__webglTexture,0,Be(y)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,Z,tt.__webglTexture,G),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Nt(M,y,U){if(n.bindRenderbuffer(n.RENDERBUFFER,M),y.depthBuffer){let q=y.depthTexture,Z=q&&q.isDepthTexture?q.type:null,G=S(y.stencilBuffer,Z),St=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=Be(y);_t(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,it,G,y.width,y.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,it,G,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,G,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,St,n.RENDERBUFFER,M)}else{let q=y.textures;for(let Z=0;Z<q.length;Z++){let G=q[Z],St=s.convert(G.format,G.colorSpace),it=s.convert(G.type),xt=w(G.internalFormat,St,it,G.colorSpace),vt=Be(y);U&&_t(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,vt,xt,y.width,y.height):_t(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,vt,xt,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,xt,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Mt(M,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,M),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=i.get(y.depthTexture);q.__renderTarget=y,(!q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y(y.depthTexture,0);let Z=q.__webglTexture,G=Be(y);if(y.depthTexture.format===qo)_t(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(y.depthTexture.format===sa)_t(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function le(M){let y=i.get(M),U=M.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==M.depthTexture){let q=M.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),q){let Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=q}if(M.depthTexture&&!y.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");let q=M.texture.mipmaps;q&&q.length>0?Mt(y.__webglFramebuffer[0],M):Mt(y.__webglFramebuffer,M)}else if(U){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]===void 0)y.__webglDepthbuffer[q]=n.createRenderbuffer(),Nt(y.__webglDepthbuffer[q],M,!1);else{let Z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=y.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,G)}}else{let q=M.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),Nt(y.__webglDepthbuffer,M,!1);else{let Z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,G)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function mn(M,y,U){let q=i.get(M);y!==void 0&&pt(q.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&le(M)}function T(M){let y=M.texture,U=i.get(M),q=i.get(y);M.addEventListener("dispose",I);let Z=M.textures,G=M.isWebGLCubeRenderTarget===!0,St=Z.length>1;if(St||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=y.version,o.memory.textures++),G){U.__webglFramebuffer=[];for(let it=0;it<6;it++)if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer[it]=[];for(let xt=0;xt<y.mipmaps.length;xt++)U.__webglFramebuffer[it][xt]=n.createFramebuffer()}else U.__webglFramebuffer[it]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer=[];for(let it=0;it<y.mipmaps.length;it++)U.__webglFramebuffer[it]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(St)for(let it=0,xt=Z.length;it<xt;it++){let vt=i.get(Z[it]);vt.__webglTexture===void 0&&(vt.__webglTexture=n.createTexture(),o.memory.textures++)}if(M.samples>0&&_t(M)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let it=0;it<Z.length;it++){let xt=Z[it];U.__webglColorRenderbuffer[it]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[it]);let vt=s.convert(xt.format,xt.colorSpace),tt=s.convert(xt.type),ct=w(xt.internalFormat,vt,tt,xt.colorSpace,M.isXRRenderTarget===!0),Dt=Be(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,Dt,ct,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.RENDERBUFFER,U.__webglColorRenderbuffer[it])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Nt(U.__webglDepthRenderbuffer,M,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(G){e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),oe(n.TEXTURE_CUBE_MAP,y);for(let it=0;it<6;it++)if(y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)pt(U.__webglFramebuffer[it][xt],M,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,xt);else pt(U.__webglFramebuffer[it],M,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(y)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let it=0,xt=Z.length;it<xt;it++){let vt=Z[it],tt=i.get(vt),ct=n.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(ct=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,tt.__webglTexture),oe(ct,vt),pt(U.__webglFramebuffer,M,vt,n.COLOR_ATTACHMENT0+it,ct,0),m(vt)&&d(ct)}e.unbindTexture()}else{let it=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(it=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(it,q.__webglTexture),oe(it,y),y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)pt(U.__webglFramebuffer[xt],M,y,n.COLOR_ATTACHMENT0,it,xt);else pt(U.__webglFramebuffer,M,y,n.COLOR_ATTACHMENT0,it,0);m(y)&&d(it),e.unbindTexture()}M.depthBuffer&&le(M)}function Fe(M){let y=M.textures;for(let U=0,q=y.length;U<q;U++){let Z=y[U];if(m(Z)){let G=A(M),St=i.get(Z).__webglTexture;e.bindTexture(G,St),d(G),e.unbindTexture()}}}let Yt=[],Pt=[];function yt(M){if(M.samples>0){if(_t(M)===!1){let y=M.textures,U=M.width,q=M.height,Z=n.COLOR_BUFFER_BIT,G=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,St=i.get(M),it=y.length>1;if(it)for(let vt=0;vt<y.length;vt++)e.bindFramebuffer(n.FRAMEBUFFER,St.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,St.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);let xt=M.texture.mipmaps;xt&&xt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let vt=0;vt<y.length;vt++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),it){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,St.__webglColorRenderbuffer[vt]);let tt=i.get(y[vt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,tt,0)}n.blitFramebuffer(0,0,U,q,0,0,U,q,Z,n.NEAREST),l===!0&&(Yt.length=0,Pt.length=0,Yt.push(n.COLOR_ATTACHMENT0+vt),M.depthBuffer&&M.resolveDepthBuffer===!1&&(Yt.push(G),Pt.push(G),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Pt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Yt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),it)for(let vt=0;vt<y.length;vt++){e.bindFramebuffer(n.FRAMEBUFFER,St.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.RENDERBUFFER,St.__webglColorRenderbuffer[vt]);let tt=i.get(y[vt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,St.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.TEXTURE_2D,tt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){let y=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function Be(M){return Math.min(r.maxSamples,M.samples)}function _t(M){let y=i.get(M);return M.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Kt(M){let y=o.render.frame;u.get(M)!==y&&(u.set(M,y),M.update())}function en(M,y){let U=M.colorSpace,q=M.format,Z=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||U!==Ys&&U!==wr&&(ue.getTransfer(U)===me?(q!==ui||Z!==Ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),y}function Ge(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=N,this.setTexture2D=Y,this.setTexture2DArray=X,this.setTexture3D=nt,this.setTextureCube=H,this.rebindTextures=mn,this.setupRenderTarget=T,this.updateRenderTargetMipmap=Fe,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=_t}function LT(n,t){function e(i,r=wr){let s,o=ue.getTransfer(r);if(i===Ri)return n.UNSIGNED_BYTE;if(i===Vu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Hu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===hp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===dp)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===up)return n.BYTE;if(i===fp)return n.SHORT;if(i===na)return n.UNSIGNED_SHORT;if(i===zu)return n.INT;if(i===ps)return n.UNSIGNED_INT;if(i===tr)return n.FLOAT;if(i===ia)return n.HALF_FLOAT;if(i===pp)return n.ALPHA;if(i===mp)return n.RGB;if(i===ui)return n.RGBA;if(i===qo)return n.DEPTH_COMPONENT;if(i===sa)return n.DEPTH_STENCIL;if(i===gp)return n.RED;if(i===Gu)return n.RED_INTEGER;if(i===yp)return n.RG;if(i===Wu)return n.RG_INTEGER;if(i===Xu)return n.RGBA_INTEGER;if(i===bl||i===Sl||i===Ml||i===wl)if(o===me)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===bl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ml)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===bl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Sl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ml)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===qu||i===Yu||i===ju||i===$u)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===qu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ju)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$u)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Zu||i===Ju||i===Ku)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Zu||i===Ju)return o===me?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ku)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qu||i===tf||i===ef||i===nf||i===rf||i===sf||i===of||i===af||i===lf||i===cf||i===uf||i===ff||i===hf||i===df)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Qu)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===tf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ef)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===nf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===rf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===sf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===of)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===af)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===lf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===cf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===uf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ff)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===df)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===pf||i===mf||i===gf)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===pf)return o===me?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===mf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===gf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===yf||i===_f||i===xf||i===vf)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===yf)return s.COMPRESSED_RED_RGTC1_EXT;if(i===_f)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===vf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ra?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var FT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,BT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,zp=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new ll(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Ii({vertexShader:FT,fragmentShader:BT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new vn(new cl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Vp=class extends Zi{constructor(t,e){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,g=null,_=typeof XRWebGLBinding<"u",m=new zp,d={},A=e.getContextAttributes(),w=null,S=null,C=[],E=[],I=new kt,B=null,b=new _n;b.viewport=new Ne;let v=new _n;v.viewport=new Ne;let R=[b,v],N=new Iu,V=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let J=C[j];return J===void 0&&(J=new Jo,C[j]=J),J.getTargetRaySpace()},this.getControllerGrip=function(j){let J=C[j];return J===void 0&&(J=new Jo,C[j]=J),J.getGripSpace()},this.getHand=function(j){let J=C[j];return J===void 0&&(J=new Jo,C[j]=J),J.getHandSpace()};function Y(j){let J=E.indexOf(j.inputSource);if(J===-1)return;let pt=C[J];pt!==void 0&&(pt.update(j.inputSource,j.frame,c||o),pt.dispatchEvent({type:j.type,data:j.inputSource}))}function X(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",nt);for(let j=0;j<C.length;j++){let J=E[j];J!==null&&(E[j]=null,C[j].disconnect(J))}V=null,W=null,m.reset();for(let j in d)delete d[j];t.setRenderTarget(w),p=null,h=null,f=null,r=null,S=null,de.stop(),i.isPresenting=!1,t.setPixelRatio(B),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,e)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(w=t.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",X),r.addEventListener("inputsourceschange",nt),A.xrCompatible!==!0&&await e.makeXRCompatible(),B=t.getPixelRatio(),t.getSize(I),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Nt=null,Mt=null;A.depth&&(Mt=A.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=A.stencil?sa:qo,Nt=A.stencil?ra:ps);let le={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(le),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Ji(h.textureWidth,h.textureHeight,{format:ui,type:Ri,depthTexture:new al(h.textureWidth,h.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:A.stencil,colorSpace:t.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let pt={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,pt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Ji(p.framebufferWidth,p.framebufferHeight,{format:ui,type:Ri,colorSpace:t.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),de.setContext(r),de.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(j){for(let J=0;J<j.removed.length;J++){let pt=j.removed[J],Nt=E.indexOf(pt);Nt>=0&&(E[Nt]=null,C[Nt].disconnect(pt))}for(let J=0;J<j.added.length;J++){let pt=j.added[J],Nt=E.indexOf(pt);if(Nt===-1){for(let le=0;le<C.length;le++)if(le>=E.length){E.push(pt),Nt=le;break}else if(E[le]===null){E[le]=pt,Nt=le;break}if(Nt===-1)break}let Mt=C[Nt];Mt&&Mt.connect(pt)}}let H=new P,ot=new P;function ft(j,J,pt){H.setFromMatrixPosition(J.matrixWorld),ot.setFromMatrixPosition(pt.matrixWorld);let Nt=H.distanceTo(ot),Mt=J.projectionMatrix.elements,le=pt.projectionMatrix.elements,mn=Mt[14]/(Mt[10]-1),T=Mt[14]/(Mt[10]+1),Fe=(Mt[9]+1)/Mt[5],Yt=(Mt[9]-1)/Mt[5],Pt=(Mt[8]-1)/Mt[0],yt=(le[8]+1)/le[0],Be=mn*Pt,_t=mn*yt,Kt=Nt/(-Pt+yt),en=Kt*-Pt;if(J.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(en),j.translateZ(Kt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Mt[10]===-1)j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let Ge=mn+Kt,M=T+Kt,y=Be-en,U=_t+(Nt-en),q=Fe*T/M*Ge,Z=Yt*T/M*Ge;j.projectionMatrix.makePerspective(y,U,q,Z,Ge,M),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function wt(j,J){J===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(J.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let J=j.near,pt=j.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(pt=m.depthFar)),N.near=v.near=b.near=J,N.far=v.far=b.far=pt,(V!==N.near||W!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),V=N.near,W=N.far),N.layers.mask=j.layers.mask|6,b.layers.mask=N.layers.mask&3,v.layers.mask=N.layers.mask&5;let Nt=j.parent,Mt=N.cameras;wt(N,Nt);for(let le=0;le<Mt.length;le++)wt(Mt[le],Nt);Mt.length===2?ft(N,b,v):N.projectionMatrix.copy(b.projectionMatrix),oe(j,N,Nt)};function oe(j,J,pt){pt===null?j.matrix.copy(J.matrixWorld):(j.matrix.copy(pt.matrixWorld),j.matrix.invert(),j.matrix.multiply(J.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Yo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(j){return d[j]};let Me=null;function Le(j,J){if(u=J.getViewerPose(c||o),g=J,u!==null){let pt=u.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let Nt=!1;pt.length!==N.cameras.length&&(N.cameras.length=0,Nt=!0);for(let T=0;T<pt.length;T++){let Fe=pt[T],Yt=null;if(p!==null)Yt=p.getViewport(Fe);else{let yt=f.getViewSubImage(h,Fe);Yt=yt.viewport,T===0&&(t.setRenderTargetTextures(S,yt.colorTexture,yt.depthStencilTexture),t.setRenderTarget(S))}let Pt=R[T];Pt===void 0&&(Pt=new _n,Pt.layers.enable(T),Pt.viewport=new Ne,R[T]=Pt),Pt.matrix.fromArray(Fe.transform.matrix),Pt.matrix.decompose(Pt.position,Pt.quaternion,Pt.scale),Pt.projectionMatrix.fromArray(Fe.projectionMatrix),Pt.projectionMatrixInverse.copy(Pt.projectionMatrix).invert(),Pt.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),T===0&&(N.matrix.copy(Pt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Nt===!0&&N.cameras.push(Pt)}let Mt=r.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=i.getBinding();let T=f.getDepthInformation(pt[0]);T&&T.isValid&&T.texture&&m.init(T,r.renderState)}if(Mt&&Mt.includes("camera-access")&&_){t.state.unbindTexture(),f=i.getBinding();for(let T=0;T<pt.length;T++){let Fe=pt[T].camera;if(Fe){let Yt=d[Fe];Yt||(Yt=new ll,d[Fe]=Yt);let Pt=f.getCameraImage(Fe);Yt.sourceTexture=Pt}}}}for(let pt=0;pt<C.length;pt++){let Nt=E[pt],Mt=C[pt];Nt!==null&&Mt!==void 0&&Mt.update(Nt,J,c||o)}Me&&Me(j,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}let de=new d_;de.setAnimationLoop(Le),this.setAnimationLoop=function(j){Me=j},this.dispose=function(){}}},Qs=new Ci,OT=new Ie;function UT(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,wp(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,A,w,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,A,w):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===An&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===An&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let A=t.get(d),w=A.envMap,S=A.envMapRotation;w&&(m.envMap.value=w,Qs.copy(S),Qs.x*=-1,Qs.y*=-1,Qs.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Qs.y*=-1,Qs.z*=-1),m.envMapRotation.value.setFromMatrix4(OT.makeRotationFromEuler(Qs)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,A,w){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*A,m.scale.value=w*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,A){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===An&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){let A=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function NT(n,t,e,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,w){let S=w.program;i.uniformBlockBinding(A,S)}function c(A,w){let S=r[A.id];S===void 0&&(g(A),S=u(A),r[A.id]=S,A.addEventListener("dispose",m));let C=w.program;i.updateUBOMapping(A,C);let E=t.render.frame;s[A.id]!==E&&(h(A),s[A.id]=E)}function u(A){let w=f();A.__bindingPointIndex=w;let S=n.createBuffer(),C=A.__size,E=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,S),S}function f(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(A){let w=r[A.id],S=A.uniforms,C=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let E=0,I=S.length;E<I;E++){let B=Array.isArray(S[E])?S[E]:[S[E]];for(let b=0,v=B.length;b<v;b++){let R=B[b];if(p(R,E,b,C)===!0){let N=R.__offset,V=Array.isArray(R.value)?R.value:[R.value],W=0;for(let Y=0;Y<V.length;Y++){let X=V[Y],nt=_(X);typeof X=="number"||typeof X=="boolean"?(R.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,N+W,R.__data)):X.isMatrix3?(R.__data[0]=X.elements[0],R.__data[1]=X.elements[1],R.__data[2]=X.elements[2],R.__data[3]=0,R.__data[4]=X.elements[3],R.__data[5]=X.elements[4],R.__data[6]=X.elements[5],R.__data[7]=0,R.__data[8]=X.elements[6],R.__data[9]=X.elements[7],R.__data[10]=X.elements[8],R.__data[11]=0):(X.toArray(R.__data,W),W+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(A,w,S,C){let E=A.value,I=w+"_"+S;if(C[I]===void 0)return typeof E=="number"||typeof E=="boolean"?C[I]=E:C[I]=E.clone(),!0;{let B=C[I];if(typeof E=="number"||typeof E=="boolean"){if(B!==E)return C[I]=E,!0}else if(B.equals(E)===!1)return B.copy(E),!0}return!1}function g(A){let w=A.uniforms,S=0,C=16;for(let I=0,B=w.length;I<B;I++){let b=Array.isArray(w[I])?w[I]:[w[I]];for(let v=0,R=b.length;v<R;v++){let N=b[v],V=Array.isArray(N.value)?N.value:[N.value];for(let W=0,Y=V.length;W<Y;W++){let X=V[W],nt=_(X),H=S%C,ot=H%nt.boundary,ft=H+ot;S+=ot,ft!==0&&C-ft<nt.storage&&(S+=C-ft),N.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=S,S+=nt.storage}}}let E=S%C;return E>0&&(S+=C-E),A.__size=S,A.__cache={},this}function _(A){let w={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(w.boundary=4,w.storage=4):A.isVector2?(w.boundary=8,w.storage=8):A.isVector3||A.isColor?(w.boundary=16,w.storage=12):A.isVector4?(w.boundary=16,w.storage=16):A.isMatrix3?(w.boundary=48,w.storage=48):A.isMatrix4?(w.boundary=64,w.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),w}function m(A){let w=A.target;w.removeEventListener("dispose",m);let S=o.indexOf(w.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function d(){for(let A in r)n.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}var Tf=class{constructor(t={}){let{canvas:e=ky(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,d=null,A=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,C=!1;this._outputColorSpace=Tn;let E=0,I=0,B=null,b=-1,v=null,R=new Ne,N=new Ne,V=null,W=new Jt(0),Y=0,X=e.width,nt=e.height,H=1,ot=null,ft=null,wt=new Ne(0,0,X,nt),oe=new Ne(0,0,X,nt),Me=!1,Le=new Ko,de=!1,j=!1,J=new Ie,pt=new P,Nt=new Ne,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},le=!1;function mn(){return B===null?H:1}let T=i;function Fe(x,F){return e.getContext(x,F)}try{let x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",K,!1),T===null){let F="webgl2";if(T=Fe(F,x),T===null)throw Fe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Yt,Pt,yt,Be,_t,Kt,en,Ge,M,y,U,q,Z,G,St,it,xt,vt,tt,ct,Dt,bt,at,Zt;function D(){Yt=new nw(T),Yt.init(),bt=new LT(T,Yt),Pt=new $M(T,Yt,t,bt),yt=new DT(T,Yt),Pt.reversedDepthBuffer&&h&&yt.buffers.depth.setReversed(!0),Be=new sw(T),_t=new _T,Kt=new PT(T,Yt,yt,_t,Pt,bt,Be),en=new JM(S),Ge=new ew(S),M=new fb(T),at=new YM(T,M),y=new iw(T,M,Be,at),U=new aw(T,y,M,Be),tt=new ow(T,Pt,Kt),it=new ZM(_t),q=new yT(S,en,Ge,Yt,Pt,at,it),Z=new UT(S,_t),G=new vT,St=new AT(Yt),vt=new qM(S,en,Ge,yt,U,p,l),xt=new IT(S,U,Pt),Zt=new NT(T,Be,Pt,yt),ct=new jM(T,Yt,Be),Dt=new rw(T,Yt,Be),Be.programs=q.programs,S.capabilities=Pt,S.extensions=Yt,S.properties=_t,S.renderLists=G,S.shadowMap=xt,S.state=yt,S.info=Be}D();let et=new Vp(S,T);this.xr=et,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let x=Yt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=Yt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(X,nt,!1))},this.getSize=function(x){return x.set(X,nt)},this.setSize=function(x,F,k=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=x,nt=F,e.width=Math.floor(x*H),e.height=Math.floor(F*H),k===!0&&(e.style.width=x+"px",e.style.height=F+"px"),this.setViewport(0,0,x,F)},this.getDrawingBufferSize=function(x){return x.set(X*H,nt*H).floor()},this.setDrawingBufferSize=function(x,F,k){X=x,nt=F,H=k,e.width=Math.floor(x*k),e.height=Math.floor(F*k),this.setViewport(0,0,x,F)},this.getCurrentViewport=function(x){return x.copy(R)},this.getViewport=function(x){return x.copy(wt)},this.setViewport=function(x,F,k,z){x.isVector4?wt.set(x.x,x.y,x.z,x.w):wt.set(x,F,k,z),yt.viewport(R.copy(wt).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(oe)},this.setScissor=function(x,F,k,z){x.isVector4?oe.set(x.x,x.y,x.z,x.w):oe.set(x,F,k,z),yt.scissor(N.copy(oe).multiplyScalar(H).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(x){yt.setScissorTest(Me=x)},this.setOpaqueSort=function(x){ot=x},this.setTransparentSort=function(x){ft=x},this.getClearColor=function(x){return x.copy(vt.getClearColor())},this.setClearColor=function(){vt.setClearColor(...arguments)},this.getClearAlpha=function(){return vt.getClearAlpha()},this.setClearAlpha=function(){vt.setClearAlpha(...arguments)},this.clear=function(x=!0,F=!0,k=!0){let z=0;if(x){let O=!1;if(B!==null){let Q=B.texture.format;O=Q===Xu||Q===Wu||Q===Gu}if(O){let Q=B.texture.type,lt=Q===Ri||Q===ps||Q===na||Q===ra||Q===Vu||Q===Hu,mt=vt.getClearColor(),ht=vt.getClearAlpha(),Rt=mt.r,Lt=mt.g,At=mt.b;lt?(g[0]=Rt,g[1]=Lt,g[2]=At,g[3]=ht,T.clearBufferuiv(T.COLOR,0,g)):(_[0]=Rt,_[1]=Lt,_[2]=At,_[3]=ht,T.clearBufferiv(T.COLOR,0,_))}else z|=T.COLOR_BUFFER_BIT}F&&(z|=T.DEPTH_BUFFER_BIT),k&&(z|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",K,!1),vt.dispose(),G.dispose(),St.dispose(),_t.dispose(),en.dispose(),Ge.dispose(),U.dispose(),at.dispose(),Zt.dispose(),q.dispose(),et.dispose(),et.removeEventListener("sessionstart",$i),et.removeEventListener("sessionend",_g),Ns.stop()};function rt(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let x=Be.autoReset,F=xt.enabled,k=xt.autoUpdate,z=xt.needsUpdate,O=xt.type;D(),Be.autoReset=x,xt.enabled=F,xt.autoUpdate=k,xt.needsUpdate=z,xt.type=O}function K(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function $(x){let F=x.target;F.removeEventListener("dispose",$),gt(F)}function gt(x){Wt(x),_t.remove(x)}function Wt(x){let F=_t.get(x).programs;F!==void 0&&(F.forEach(function(k){q.releaseProgram(k)}),x.isShaderMaterial&&q.releaseShaderCache(x))}this.renderBufferDirect=function(x,F,k,z,O,Q){F===null&&(F=Mt);let lt=O.isMesh&&O.matrixWorld.determinant()<0,mt=sv(x,F,k,z,O);yt.setMaterial(z,lt);let ht=k.index,Rt=1;if(z.wireframe===!0){if(ht=y.getWireframeAttribute(k),ht===void 0)return;Rt=2}let Lt=k.drawRange,At=k.attributes.position,ae=Lt.start*Rt,ve=(Lt.start+Lt.count)*Rt;Q!==null&&(ae=Math.max(ae,Q.start*Rt),ve=Math.min(ve,(Q.start+Q.count)*Rt)),ht!==null?(ae=Math.max(ae,0),ve=Math.min(ve,ht.count)):At!=null&&(ae=Math.max(ae,0),ve=Math.min(ve,At.count));let Ve=ve-ae;if(Ve<0||Ve===1/0)return;at.setup(O,z,mt,k,ht);let Ee,Se=ct;if(ht!==null&&(Ee=M.get(ht),Se=Dt,Se.setIndex(Ee)),O.isMesh)z.wireframe===!0?(yt.setLineWidth(z.wireframeLinewidth*mn()),Se.setMode(T.LINES)):Se.setMode(T.TRIANGLES);else if(O.isLine){let Ct=z.linewidth;Ct===void 0&&(Ct=1),yt.setLineWidth(Ct*mn()),O.isLineSegments?Se.setMode(T.LINES):O.isLineLoop?Se.setMode(T.LINE_LOOP):Se.setMode(T.LINE_STRIP)}else O.isPoints?Se.setMode(T.POINTS):O.isSprite&&Se.setMode(T.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)jo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Se.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))Se.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Ct=O._multiDrawStarts,Oe=O._multiDrawCounts,fe=O._multiDrawCount,kn=ht?M.get(ht).bytesPerElement:1,Io=_t.get(z).currentProgram.getUniforms();for(let zn=0;zn<fe;zn++)Io.setValue(T,"_gl_DrawID",zn),Se.render(Ct[zn]/kn,Oe[zn])}else if(O.isInstancedMesh)Se.renderInstances(ae,Ve,O.count);else if(k.isInstancedBufferGeometry){let Ct=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Oe=Math.min(k.instanceCount,Ct);Se.renderInstances(ae,Ve,Oe)}else Se.render(ae,Ve)};function we(x,F,k){x.transparent===!0&&x.side===qn&&x.forceSinglePass===!1?(x.side=An,x.needsUpdate=!0,Lc(x,F,k),x.side=br,x.needsUpdate=!0,Lc(x,F,k),x.side=qn):Lc(x,F,k)}this.compile=function(x,F,k=null){k===null&&(k=x),d=St.get(k),d.init(F),w.push(d),k.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(d.pushLight(O),O.castShadow&&d.pushShadow(O))}),x!==k&&x.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(d.pushLight(O),O.castShadow&&d.pushShadow(O))}),d.setupLights();let z=new Set;return x.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let Q=O.material;if(Q)if(Array.isArray(Q))for(let lt=0;lt<Q.length;lt++){let mt=Q[lt];we(mt,k,O),z.add(mt)}else we(Q,k,O),z.add(Q)}),d=w.pop(),z},this.compileAsync=function(x,F,k=null){let z=this.compile(x,F,k);return new Promise(O=>{function Q(){if(z.forEach(function(lt){_t.get(lt).currentProgram.isReady()&&z.delete(lt)}),z.size===0){O(x);return}setTimeout(Q,10)}Yt.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let pe=null;function pr(x){pe&&pe(x)}function $i(){Ns.stop()}function _g(){Ns.start()}let Ns=new d_;Ns.setAnimationLoop(pr),typeof self<"u"&&Ns.setContext(self),this.setAnimationLoop=function(x){pe=x,et.setAnimationLoop(x),x===null?Ns.stop():Ns.start()},et.addEventListener("sessionstart",$i),et.addEventListener("sessionend",_g),this.render=function(x,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(F),F=et.getCamera()),x.isScene===!0&&x.onBeforeRender(S,x,F,B),d=St.get(x,w.length),d.init(F),w.push(d),J.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Le.setFromProjectionMatrix(J,Ti,F.reversedDepth),j=this.localClippingEnabled,de=it.init(this.clippingPlanes,j),m=G.get(x,A.length),m.init(),A.push(m),et.enabled===!0&&et.isPresenting===!0){let Q=S.xr.getDepthSensingMesh();Q!==null&&bd(Q,F,-1/0,S.sortObjects)}bd(x,F,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(ot,ft),le=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,le&&vt.addToRenderList(m,x),this.info.render.frame++,de===!0&&it.beginShadows();let k=d.state.shadowsArray;xt.render(k,x,F),de===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let z=m.opaque,O=m.transmissive;if(d.setupLights(),F.isArrayCamera){let Q=F.cameras;if(O.length>0)for(let lt=0,mt=Q.length;lt<mt;lt++){let ht=Q[lt];vg(z,O,x,ht)}le&&vt.render(x);for(let lt=0,mt=Q.length;lt<mt;lt++){let ht=Q[lt];xg(m,x,ht,ht.viewport)}}else O.length>0&&vg(z,O,x,F),le&&vt.render(x),xg(m,x,F);B!==null&&I===0&&(Kt.updateMultisampleRenderTarget(B),Kt.updateRenderTargetMipmap(B)),x.isScene===!0&&x.onAfterRender(S,x,F),at.resetDefaultState(),b=-1,v=null,w.pop(),w.length>0?(d=w[w.length-1],de===!0&&it.setGlobalState(S.clippingPlanes,d.state.camera)):d=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function bd(x,F,k,z){if(x.visible===!1)return;if(x.layers.test(F.layers)){if(x.isGroup)k=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(F);else if(x.isLight)d.pushLight(x),x.castShadow&&d.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Le.intersectsSprite(x)){z&&Nt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(J);let lt=U.update(x),mt=x.material;mt.visible&&m.push(x,lt,mt,k,Nt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Le.intersectsObject(x))){let lt=U.update(x),mt=x.material;if(z&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Nt.copy(x.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Nt.copy(lt.boundingSphere.center)),Nt.applyMatrix4(x.matrixWorld).applyMatrix4(J)),Array.isArray(mt)){let ht=lt.groups;for(let Rt=0,Lt=ht.length;Rt<Lt;Rt++){let At=ht[Rt],ae=mt[At.materialIndex];ae&&ae.visible&&m.push(x,lt,ae,k,Nt.z,At)}}else mt.visible&&m.push(x,lt,mt,k,Nt.z,null)}}let Q=x.children;for(let lt=0,mt=Q.length;lt<mt;lt++)bd(Q[lt],F,k,z)}function xg(x,F,k,z){let O=x.opaque,Q=x.transmissive,lt=x.transparent;d.setupLightsView(k),de===!0&&it.setGlobalState(S.clippingPlanes,k),z&&yt.viewport(R.copy(z)),O.length>0&&Pc(O,F,k),Q.length>0&&Pc(Q,F,k),lt.length>0&&Pc(lt,F,k),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function vg(x,F,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[z.id]===void 0&&(d.state.transmissionRenderTarget[z.id]=new Ji(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?ia:Ri,minFilter:ds,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ue.workingColorSpace}));let Q=d.state.transmissionRenderTarget[z.id],lt=z.viewport||R;Q.setSize(lt.z*S.transmissionResolutionScale,lt.w*S.transmissionResolutionScale);let mt=S.getRenderTarget(),ht=S.getActiveCubeFace(),Rt=S.getActiveMipmapLevel();S.setRenderTarget(Q),S.getClearColor(W),Y=S.getClearAlpha(),Y<1&&S.setClearColor(16777215,.5),S.clear(),le&&vt.render(k);let Lt=S.toneMapping;S.toneMapping=Mr;let At=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),d.setupLightsView(z),de===!0&&it.setGlobalState(S.clippingPlanes,z),Pc(x,k,z),Kt.updateMultisampleRenderTarget(Q),Kt.updateRenderTargetMipmap(Q),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let ae=!1;for(let ve=0,Ve=F.length;ve<Ve;ve++){let Ee=F[ve],Se=Ee.object,Ct=Ee.geometry,Oe=Ee.material,fe=Ee.group;if(Oe.side===qn&&Se.layers.test(z.layers)){let kn=Oe.side;Oe.side=An,Oe.needsUpdate=!0,bg(Se,k,z,Ct,Oe,fe),Oe.side=kn,Oe.needsUpdate=!0,ae=!0}}ae===!0&&(Kt.updateMultisampleRenderTarget(Q),Kt.updateRenderTargetMipmap(Q))}S.setRenderTarget(mt,ht,Rt),S.setClearColor(W,Y),At!==void 0&&(z.viewport=At),S.toneMapping=Lt}function Pc(x,F,k){let z=F.isScene===!0?F.overrideMaterial:null;for(let O=0,Q=x.length;O<Q;O++){let lt=x[O],mt=lt.object,ht=lt.geometry,Rt=lt.group,Lt=lt.material;Lt.allowOverride===!0&&z!==null&&(Lt=z),mt.layers.test(k.layers)&&bg(mt,F,k,ht,Lt,Rt)}}function bg(x,F,k,z,O,Q){x.onBeforeRender(S,F,k,z,O,Q),x.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),O.onBeforeRender(S,F,k,z,x,Q),O.transparent===!0&&O.side===qn&&O.forceSinglePass===!1?(O.side=An,O.needsUpdate=!0,S.renderBufferDirect(k,F,z,O,x,Q),O.side=br,O.needsUpdate=!0,S.renderBufferDirect(k,F,z,O,x,Q),O.side=qn):S.renderBufferDirect(k,F,z,O,x,Q),x.onAfterRender(S,F,k,z,O,Q)}function Lc(x,F,k){F.isScene!==!0&&(F=Mt);let z=_t.get(x),O=d.state.lights,Q=d.state.shadowsArray,lt=O.state.version,mt=q.getParameters(x,O.state,Q,F,k),ht=q.getProgramCacheKey(mt),Rt=z.programs;z.environment=x.isMeshStandardMaterial?F.environment:null,z.fog=F.fog,z.envMap=(x.isMeshStandardMaterial?Ge:en).get(x.envMap||z.environment),z.envMapRotation=z.environment!==null&&x.envMap===null?F.environmentRotation:x.envMapRotation,Rt===void 0&&(x.addEventListener("dispose",$),Rt=new Map,z.programs=Rt);let Lt=Rt.get(ht);if(Lt!==void 0){if(z.currentProgram===Lt&&z.lightsStateVersion===lt)return Mg(x,mt),Lt}else mt.uniforms=q.getUniforms(x),x.onBeforeCompile(mt,S),Lt=q.acquireProgram(mt,ht),Rt.set(ht,Lt),z.uniforms=mt.uniforms;let At=z.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(At.clippingPlanes=it.uniform),Mg(x,mt),z.needsLights=av(x),z.lightsStateVersion=lt,z.needsLights&&(At.ambientLightColor.value=O.state.ambient,At.lightProbe.value=O.state.probe,At.directionalLights.value=O.state.directional,At.directionalLightShadows.value=O.state.directionalShadow,At.spotLights.value=O.state.spot,At.spotLightShadows.value=O.state.spotShadow,At.rectAreaLights.value=O.state.rectArea,At.ltc_1.value=O.state.rectAreaLTC1,At.ltc_2.value=O.state.rectAreaLTC2,At.pointLights.value=O.state.point,At.pointLightShadows.value=O.state.pointShadow,At.hemisphereLights.value=O.state.hemi,At.directionalShadowMap.value=O.state.directionalShadowMap,At.directionalShadowMatrix.value=O.state.directionalShadowMatrix,At.spotShadowMap.value=O.state.spotShadowMap,At.spotLightMatrix.value=O.state.spotLightMatrix,At.spotLightMap.value=O.state.spotLightMap,At.pointShadowMap.value=O.state.pointShadowMap,At.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=Lt,z.uniformsList=null,Lt}function Sg(x){if(x.uniformsList===null){let F=x.currentProgram.getUniforms();x.uniformsList=ca.seqWithValue(F.seq,x.uniforms)}return x.uniformsList}function Mg(x,F){let k=_t.get(x);k.outputColorSpace=F.outputColorSpace,k.batching=F.batching,k.batchingColor=F.batchingColor,k.instancing=F.instancing,k.instancingColor=F.instancingColor,k.instancingMorph=F.instancingMorph,k.skinning=F.skinning,k.morphTargets=F.morphTargets,k.morphNormals=F.morphNormals,k.morphColors=F.morphColors,k.morphTargetsCount=F.morphTargetsCount,k.numClippingPlanes=F.numClippingPlanes,k.numIntersection=F.numClipIntersection,k.vertexAlphas=F.vertexAlphas,k.vertexTangents=F.vertexTangents,k.toneMapping=F.toneMapping}function sv(x,F,k,z,O){F.isScene!==!0&&(F=Mt),Kt.resetTextureUnits();let Q=F.fog,lt=z.isMeshStandardMaterial?F.environment:null,mt=B===null?S.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:Ys,ht=(z.isMeshStandardMaterial?Ge:en).get(z.envMap||lt),Rt=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Lt=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),At=!!k.morphAttributes.position,ae=!!k.morphAttributes.normal,ve=!!k.morphAttributes.color,Ve=Mr;z.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(Ve=S.toneMapping);let Ee=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Se=Ee!==void 0?Ee.length:0,Ct=_t.get(z),Oe=d.state.lights;if(de===!0&&(j===!0||x!==v)){let Mn=x===v&&z.id===b;it.setState(z,x,Mn)}let fe=!1;z.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Oe.state.version||Ct.outputColorSpace!==mt||O.isBatchedMesh&&Ct.batching===!1||!O.isBatchedMesh&&Ct.batching===!0||O.isBatchedMesh&&Ct.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ct.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ct.instancing===!1||!O.isInstancedMesh&&Ct.instancing===!0||O.isSkinnedMesh&&Ct.skinning===!1||!O.isSkinnedMesh&&Ct.skinning===!0||O.isInstancedMesh&&Ct.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ct.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ct.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ct.instancingMorph===!1&&O.morphTexture!==null||Ct.envMap!==ht||z.fog===!0&&Ct.fog!==Q||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==it.numPlanes||Ct.numIntersection!==it.numIntersection)||Ct.vertexAlphas!==Rt||Ct.vertexTangents!==Lt||Ct.morphTargets!==At||Ct.morphNormals!==ae||Ct.morphColors!==ve||Ct.toneMapping!==Ve||Ct.morphTargetsCount!==Se)&&(fe=!0):(fe=!0,Ct.__version=z.version);let kn=Ct.currentProgram;fe===!0&&(kn=Lc(z,F,O));let Io=!1,zn=!1,za=!1,Ue=kn.getUniforms(),ri=Ct.uniforms;if(yt.useProgram(kn.program)&&(Io=!0,zn=!0,za=!0),z.id!==b&&(b=z.id,zn=!0),Io||v!==x){yt.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),Ue.setValue(T,"projectionMatrix",x.projectionMatrix),Ue.setValue(T,"viewMatrix",x.matrixWorldInverse);let Rn=Ue.map.cameraPosition;Rn!==void 0&&Rn.setValue(T,pt.setFromMatrixPosition(x.matrixWorld)),Pt.logarithmicDepthBuffer&&Ue.setValue(T,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Ue.setValue(T,"isOrthographic",x.isOrthographicCamera===!0),v!==x&&(v=x,zn=!0,za=!0)}if(O.isSkinnedMesh){Ue.setOptional(T,O,"bindMatrix"),Ue.setOptional(T,O,"bindMatrixInverse");let Mn=O.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),Ue.setValue(T,"boneTexture",Mn.boneTexture,Kt))}O.isBatchedMesh&&(Ue.setOptional(T,O,"batchingTexture"),Ue.setValue(T,"batchingTexture",O._matricesTexture,Kt),Ue.setOptional(T,O,"batchingIdTexture"),Ue.setValue(T,"batchingIdTexture",O._indirectTexture,Kt),Ue.setOptional(T,O,"batchingColorTexture"),O._colorsTexture!==null&&Ue.setValue(T,"batchingColorTexture",O._colorsTexture,Kt));let si=k.morphAttributes;if((si.position!==void 0||si.normal!==void 0||si.color!==void 0)&&tt.update(O,k,kn),(zn||Ct.receiveShadow!==O.receiveShadow)&&(Ct.receiveShadow=O.receiveShadow,Ue.setValue(T,"receiveShadow",O.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(ri.envMap.value=ht,ri.flipEnvMap.value=ht.isCubeTexture&&ht.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&F.environment!==null&&(ri.envMapIntensity.value=F.environmentIntensity),zn&&(Ue.setValue(T,"toneMappingExposure",S.toneMappingExposure),Ct.needsLights&&ov(ri,za),Q&&z.fog===!0&&Z.refreshFogUniforms(ri,Q),Z.refreshMaterialUniforms(ri,z,H,nt,d.state.transmissionRenderTarget[x.id]),ca.upload(T,Sg(Ct),ri,Kt)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ca.upload(T,Sg(Ct),ri,Kt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Ue.setValue(T,"center",O.center),Ue.setValue(T,"modelViewMatrix",O.modelViewMatrix),Ue.setValue(T,"normalMatrix",O.normalMatrix),Ue.setValue(T,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let Mn=z.uniformsGroups;for(let Rn=0,Sd=Mn.length;Rn<Sd;Rn++){let ks=Mn[Rn];Zt.update(ks,kn),Zt.bind(ks,kn)}}return kn}function ov(x,F){x.ambientLightColor.needsUpdate=F,x.lightProbe.needsUpdate=F,x.directionalLights.needsUpdate=F,x.directionalLightShadows.needsUpdate=F,x.pointLights.needsUpdate=F,x.pointLightShadows.needsUpdate=F,x.spotLights.needsUpdate=F,x.spotLightShadows.needsUpdate=F,x.rectAreaLights.needsUpdate=F,x.hemisphereLights.needsUpdate=F}function av(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(x,F,k){let z=_t.get(x);z.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),_t.get(x.texture).__webglTexture=F,_t.get(x.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:k,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,F){let k=_t.get(x);k.__webglFramebuffer=F,k.__useDefaultFramebuffer=F===void 0};let lv=T.createFramebuffer();this.setRenderTarget=function(x,F=0,k=0){B=x,E=F,I=k;let z=!0,O=null,Q=!1,lt=!1;if(x){let ht=_t.get(x);if(ht.__useDefaultFramebuffer!==void 0)yt.bindFramebuffer(T.FRAMEBUFFER,null),z=!1;else if(ht.__webglFramebuffer===void 0)Kt.setupRenderTarget(x);else if(ht.__hasExternalTextures)Kt.rebindTextures(x,_t.get(x.texture).__webglTexture,_t.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let At=x.depthTexture;if(ht.__boundDepthTexture!==At){if(At!==null&&_t.has(At)&&(x.width!==At.image.width||x.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Kt.setupDepthRenderbuffer(x)}}let Rt=x.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(lt=!0);let Lt=_t.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Lt[F])?O=Lt[F][k]:O=Lt[F],Q=!0):x.samples>0&&Kt.useMultisampledRTT(x)===!1?O=_t.get(x).__webglMultisampledFramebuffer:Array.isArray(Lt)?O=Lt[k]:O=Lt,R.copy(x.viewport),N.copy(x.scissor),V=x.scissorTest}else R.copy(wt).multiplyScalar(H).floor(),N.copy(oe).multiplyScalar(H).floor(),V=Me;if(k!==0&&(O=lv),yt.bindFramebuffer(T.FRAMEBUFFER,O)&&z&&yt.drawBuffers(x,O),yt.viewport(R),yt.scissor(N),yt.setScissorTest(V),Q){let ht=_t.get(x.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+F,ht.__webglTexture,k)}else if(lt){let ht=F;for(let Rt=0;Rt<x.textures.length;Rt++){let Lt=_t.get(x.textures[Rt]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+Rt,Lt.__webglTexture,k,ht)}}else if(x!==null&&k!==0){let ht=_t.get(x.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,ht.__webglTexture,k)}b=-1},this.readRenderTargetPixels=function(x,F,k,z,O,Q,lt,mt=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ht=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&lt!==void 0&&(ht=ht[lt]),ht){yt.bindFramebuffer(T.FRAMEBUFFER,ht);try{let Rt=x.textures[mt],Lt=Rt.format,At=Rt.type;if(!Pt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pt.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=x.width-z&&k>=0&&k<=x.height-O&&(x.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+mt),T.readPixels(F,k,z,O,bt.convert(Lt),bt.convert(At),Q))}finally{let Rt=B!==null?_t.get(B).__webglFramebuffer:null;yt.bindFramebuffer(T.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(x,F,k,z,O,Q,lt,mt=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ht=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&lt!==void 0&&(ht=ht[lt]),ht)if(F>=0&&F<=x.width-z&&k>=0&&k<=x.height-O){yt.bindFramebuffer(T.FRAMEBUFFER,ht);let Rt=x.textures[mt],Lt=Rt.format,At=Rt.type;if(!Pt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pt.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ae=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,ae),T.bufferData(T.PIXEL_PACK_BUFFER,Q.byteLength,T.STREAM_READ),x.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+mt),T.readPixels(F,k,z,O,bt.convert(Lt),bt.convert(At),0);let ve=B!==null?_t.get(B).__webglFramebuffer:null;yt.bindFramebuffer(T.FRAMEBUFFER,ve);let Ve=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await zy(T,Ve,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,ae),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,Q),T.deleteBuffer(ae),T.deleteSync(Ve),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,F=null,k=0){let z=Math.pow(2,-k),O=Math.floor(x.image.width*z),Q=Math.floor(x.image.height*z),lt=F!==null?F.x:0,mt=F!==null?F.y:0;Kt.setTexture2D(x,0),T.copyTexSubImage2D(T.TEXTURE_2D,k,0,0,lt,mt,O,Q),yt.unbindTexture()};let cv=T.createFramebuffer(),uv=T.createFramebuffer();this.copyTextureToTexture=function(x,F,k=null,z=null,O=0,Q=null){Q===null&&(O!==0?(jo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=O,O=0):Q=0);let lt,mt,ht,Rt,Lt,At,ae,ve,Ve,Ee=x.isCompressedTexture?x.mipmaps[Q]:x.image;if(k!==null)lt=k.max.x-k.min.x,mt=k.max.y-k.min.y,ht=k.isBox3?k.max.z-k.min.z:1,Rt=k.min.x,Lt=k.min.y,At=k.isBox3?k.min.z:0;else{let si=Math.pow(2,-O);lt=Math.floor(Ee.width*si),mt=Math.floor(Ee.height*si),x.isDataArrayTexture?ht=Ee.depth:x.isData3DTexture?ht=Math.floor(Ee.depth*si):ht=1,Rt=0,Lt=0,At=0}z!==null?(ae=z.x,ve=z.y,Ve=z.z):(ae=0,ve=0,Ve=0);let Se=bt.convert(F.format),Ct=bt.convert(F.type),Oe;F.isData3DTexture?(Kt.setTexture3D(F,0),Oe=T.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Kt.setTexture2DArray(F,0),Oe=T.TEXTURE_2D_ARRAY):(Kt.setTexture2D(F,0),Oe=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,F.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,F.unpackAlignment);let fe=T.getParameter(T.UNPACK_ROW_LENGTH),kn=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Io=T.getParameter(T.UNPACK_SKIP_PIXELS),zn=T.getParameter(T.UNPACK_SKIP_ROWS),za=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,Ee.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Ee.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Rt),T.pixelStorei(T.UNPACK_SKIP_ROWS,Lt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,At);let Ue=x.isDataArrayTexture||x.isData3DTexture,ri=F.isDataArrayTexture||F.isData3DTexture;if(x.isDepthTexture){let si=_t.get(x),Mn=_t.get(F),Rn=_t.get(si.__renderTarget),Sd=_t.get(Mn.__renderTarget);yt.bindFramebuffer(T.READ_FRAMEBUFFER,Rn.__webglFramebuffer),yt.bindFramebuffer(T.DRAW_FRAMEBUFFER,Sd.__webglFramebuffer);for(let ks=0;ks<ht;ks++)Ue&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_t.get(x).__webglTexture,O,At+ks),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_t.get(F).__webglTexture,Q,Ve+ks)),T.blitFramebuffer(Rt,Lt,lt,mt,ae,ve,lt,mt,T.DEPTH_BUFFER_BIT,T.NEAREST);yt.bindFramebuffer(T.READ_FRAMEBUFFER,null),yt.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(O!==0||x.isRenderTargetTexture||_t.has(x)){let si=_t.get(x),Mn=_t.get(F);yt.bindFramebuffer(T.READ_FRAMEBUFFER,cv),yt.bindFramebuffer(T.DRAW_FRAMEBUFFER,uv);for(let Rn=0;Rn<ht;Rn++)Ue?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,si.__webglTexture,O,At+Rn):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,si.__webglTexture,O),ri?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Mn.__webglTexture,Q,Ve+Rn):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Mn.__webglTexture,Q),O!==0?T.blitFramebuffer(Rt,Lt,lt,mt,ae,ve,lt,mt,T.COLOR_BUFFER_BIT,T.NEAREST):ri?T.copyTexSubImage3D(Oe,Q,ae,ve,Ve+Rn,Rt,Lt,lt,mt):T.copyTexSubImage2D(Oe,Q,ae,ve,Rt,Lt,lt,mt);yt.bindFramebuffer(T.READ_FRAMEBUFFER,null),yt.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else ri?x.isDataTexture||x.isData3DTexture?T.texSubImage3D(Oe,Q,ae,ve,Ve,lt,mt,ht,Se,Ct,Ee.data):F.isCompressedArrayTexture?T.compressedTexSubImage3D(Oe,Q,ae,ve,Ve,lt,mt,ht,Se,Ee.data):T.texSubImage3D(Oe,Q,ae,ve,Ve,lt,mt,ht,Se,Ct,Ee):x.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,Q,ae,ve,lt,mt,Se,Ct,Ee.data):x.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,Q,ae,ve,Ee.width,Ee.height,Se,Ee.data):T.texSubImage2D(T.TEXTURE_2D,Q,ae,ve,lt,mt,Se,Ct,Ee);T.pixelStorei(T.UNPACK_ROW_LENGTH,fe),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,kn),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Io),T.pixelStorei(T.UNPACK_SKIP_ROWS,zn),T.pixelStorei(T.UNPACK_SKIP_IMAGES,za),Q===0&&F.generateMipmaps&&T.generateMipmap(Oe),yt.unbindTexture()},this.initRenderTarget=function(x){_t.get(x).__webglFramebuffer===void 0&&Kt.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Kt.setTextureCube(x,0):x.isData3DTexture?Kt.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Kt.setTexture2DArray(x,0):Kt.setTexture2D(x,0),yt.unbindTexture()},this.resetState=function(){E=0,I=0,B=null,yt.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ue._getDrawingBufferColorSpace(t),e.unpackColorSpace=ue._getUnpackColorSpace()}};var __={type:"change"},Wp={type:"start"},v_={type:"end"},Ef=new os,x_=new ai,zT=Math.cos(70*Sp.DEG2RAD),Ke=new P,Dn=2*Math.PI,be={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gp=1e-6,Cf=class extends _l{constructor(t,e=null){super(t,e),this.state=be.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:fs.ROTATE,MIDDLE:fs.DOLLY,RIGHT:fs.PAN},this.touches={ONE:hs.ROTATE,TWO:hs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new ci,this._lastTargetPosition=new P,this._quat=new ci().setFromUnitVectors(t.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ea,this._sphericalDelta=new ea,this._scale=1,this._panOffset=new P,this._rotateStart=new kt,this._rotateEnd=new kt,this._rotateDelta=new kt,this._panStart=new kt,this._panEnd=new kt,this._panDelta=new kt,this._dollyStart=new kt,this._dollyEnd=new kt,this._dollyDelta=new kt,this._dollyDirection=new P,this._mouse=new kt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=HT.bind(this),this._onPointerDown=VT.bind(this),this._onPointerUp=GT.bind(this),this._onContextMenu=ZT.bind(this),this._onMouseWheel=qT.bind(this),this._onKeyDown=YT.bind(this),this._onTouchStart=jT.bind(this),this._onTouchMove=$T.bind(this),this._onMouseDown=WT.bind(this),this._onMouseMove=XT.bind(this),this._interceptControlDown=JT.bind(this),this._interceptControlUp=KT.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(__),this.update(),this.state=be.NONE}update(t=null){let e=this.object.position;Ke.copy(e).sub(this.target),Ke.applyQuaternion(this._quat),this._spherical.setFromVector3(Ke),this.autoRotate&&this.state===be.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Dn:i>Math.PI&&(i-=Dn),r<-Math.PI?r+=Dn:r>Math.PI&&(r-=Dn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Ke.setFromSpherical(this._spherical),Ke.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ke),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ke.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){let a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;let c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ke.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ef.origin.copy(this.object.position),Ef.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ef.direction))<zT?this.object.lookAt(this.target):(x_.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ef.intersectPlane(x_,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Gp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gp||this._lastTargetPosition.distanceToSquared(this.target)>Gp?(this.dispatchEvent(__),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Dn/60*this.autoRotateSpeed*t:Dn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ke.setFromMatrixColumn(e,0),Ke.multiplyScalar(-t),this._panOffset.add(Ke)}_panUp(t,e){this.screenSpacePanning===!0?Ke.setFromMatrixColumn(e,1):(Ke.setFromMatrixColumn(e,0),Ke.crossVectors(this.object.up,Ke)),Ke.multiplyScalar(t),this._panOffset.add(Ke)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Ke.copy(r).sub(this.target);let s=Ke.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=t-i.left,s=e-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new kt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function VT(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function HT(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function GT(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(v_),this.state=be.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function WT(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case fs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=be.DOLLY;break;case fs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=be.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=be.ROTATE}break;case fs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=be.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=be.PAN}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Wp)}function XT(n){switch(this.state){case be.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case be.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case be.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function qT(n){this.enabled===!1||this.enableZoom===!1||this.state!==be.NONE||(n.preventDefault(),this.dispatchEvent(Wp),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(v_))}function YT(n){this.enabled!==!1&&this._handleKeyDown(n)}function jT(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case hs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=be.TOUCH_ROTATE;break;case hs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=be.TOUCH_PAN;break;default:this.state=be.NONE}break;case 2:switch(this.touches.TWO){case hs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=be.TOUCH_DOLLY_PAN;break;case hs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=be.TOUCH_DOLLY_ROTATE;break;default:this.state=be.NONE}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Wp)}function $T(n){switch(this._trackPointer(n),this.state){case be.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case be.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case be.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case be.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=be.NONE}}function ZT(n){this.enabled!==!1&&n.preventDefault()}function JT(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function KT(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function b_(n,t,e){n.up.copy(e);let i=new Cf(n,t);return i.enableDamping=!0,i}var hC=wg(P_()),F0=wg($_());function J_(n,t){var e={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&t.indexOf(i)<0&&(e[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(n);r<i.length;r++)t.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(e[i[r]]=n[i[r]]);return e}function ut(n,t,e,i){function r(s){return s instanceof e?s:new e(function(o){o(s)})}return new(e||(e=Promise))(function(s,o){function a(u){try{c(i.next(u))}catch(f){o(f)}}function l(u){try{c(i.throw(u))}catch(f){o(f)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((i=i.apply(n,t||[])).next())})}function Z_(n){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&n[t],i=0;if(e)return e.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function Ht(n){return this instanceof Ht?(this.v=n,this):new Ht(n)}function jn(n,t,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(n,t||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(p){return function(g){return Promise.resolve(g).then(p,f)}}function a(p,g){i[p]&&(r[p]=function(_){return new Promise(function(m,d){s.push([p,_,m,d])>1||l(p,_)})},g&&(r[p]=g(r[p])))}function l(p,g){try{c(i[p](g))}catch(_){h(s[0][3],_)}}function c(p){p.value instanceof Ht?Promise.resolve(p.value.v).then(u,f):h(s[0][2],p)}function u(p){l("next",p)}function f(p){l("throw",p)}function h(p,g){p(g),s.shift(),s.length&&l(s[0][0],s[0][1])}}function ha(n){var t,e;return t={},i("next"),i("throw",function(r){throw r}),i("return"),t[Symbol.iterator]=function(){return this},t;function i(r,s){t[r]=n[r]?function(o){return(e=!e)?{value:Ht(n[r](o)),done:!1}:s?s(o):o}:s}}function Pi(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=n[Symbol.asyncIterator],e;return t?t.call(n):(n=typeof Z_=="function"?Z_(n):n[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(s){e[s]=n[s]&&function(o){return new Promise(function(a,l){o=n[s](o),r(a,l,o.done,o.value)})}}function r(s,o,a,l){Promise.resolve(l).then(function(c){s({value:c,done:a})},o)}}var um={};Do(um,{compareArrayLike:()=>cm,joinUint8Arrays:()=>Zn,memcpy:()=>da,rebaseValueOffsets:()=>Rl,toArrayBufferView:()=>te,toArrayBufferViewAsyncIterator:()=>Fi,toArrayBufferViewIterator:()=>nr,toBigInt64Array:()=>OA,toBigUint64Array:()=>kA,toFloat32Array:()=>zA,toFloat32ArrayAsyncIterator:()=>nE,toFloat32ArrayIterator:()=>jA,toFloat64Array:()=>VA,toFloat64ArrayAsyncIterator:()=>iE,toFloat64ArrayIterator:()=>$A,toInt16Array:()=>BA,toInt16ArrayAsyncIterator:()=>KA,toInt16ArrayIterator:()=>WA,toInt32Array:()=>no,toInt32ArrayAsyncIterator:()=>QA,toInt32ArrayIterator:()=>XA,toInt8Array:()=>FA,toInt8ArrayAsyncIterator:()=>JA,toInt8ArrayIterator:()=>GA,toUint16Array:()=>UA,toUint16ArrayAsyncIterator:()=>tE,toUint16ArrayIterator:()=>qA,toUint32Array:()=>NA,toUint32ArrayAsyncIterator:()=>eE,toUint32ArrayIterator:()=>YA,toUint8Array:()=>zt,toUint8ArrayAsyncIterator:()=>lm,toUint8ArrayIterator:()=>am,toUint8ClampedArray:()=>HA,toUint8ClampedArrayAsyncIterator:()=>rE,toUint8ClampedArrayIterator:()=>ZA});var RA=new TextDecoder("utf-8"),Cl=n=>RA.decode(n),DA=new TextEncoder,ms=n=>DA.encode(n);var[oP,zf]=(()=>{let n=()=>{throw new Error("BigInt is not available in this environment")};function t(){throw n()}return t.asIntN=()=>{throw n()},t.asUintN=()=>{throw n()},typeof BigInt<"u"?[BigInt,!0]:[t,!1]})(),[fi,aP]=(()=>{let n=()=>{throw new Error("BigInt64Array is not available in this environment")};class t{static get BYTES_PER_ELEMENT(){return 8}static of(){throw n()}static from(){throw n()}constructor(){throw n()}}return typeof BigInt64Array<"u"?[BigInt64Array,!0]:[t,!1]})(),[hi,lP]=(()=>{let n=()=>{throw new Error("BigUint64Array is not available in this environment")};class t{static get BYTES_PER_ELEMENT(){return 8}static of(){throw n()}static from(){throw n()}constructor(){throw n()}}return typeof BigUint64Array<"u"?[BigUint64Array,!0]:[t,!1]})();var PA=n=>typeof n=="number",K_=n=>typeof n=="boolean",Qe=n=>typeof n=="function",En=n=>n!=null&&Object(n)===n,$n=n=>En(n)&&Qe(n.then);var Li=n=>En(n)&&Qe(n[Symbol.iterator]),di=n=>En(n)&&Qe(n[Symbol.asyncIterator]),Vf=n=>En(n)&&En(n.schema);var Hf=n=>En(n)&&"done"in n&&"value"in n;var Gf=n=>En(n)&&Qe(n.stat)&&PA(n.fd);var Wf=n=>En(n)&&Il(n.body),Xf=n=>"_getDOMStream"in n&&"_getNodeStream"in n,Q_=n=>En(n)&&Qe(n.abort)&&Qe(n.getWriter)&&!Xf(n),Il=n=>En(n)&&Qe(n.cancel)&&Qe(n.getReader)&&!Xf(n),tx=n=>En(n)&&Qe(n.end)&&Qe(n.write)&&K_(n.writable)&&!Xf(n),qf=n=>En(n)&&Qe(n.read)&&Qe(n.pipe)&&K_(n.readable)&&!Xf(n),ex=n=>En(n)&&Qe(n.clear)&&Qe(n.bytes)&&Qe(n.position)&&Qe(n.setPosition)&&Qe(n.capacity)&&Qe(n.getBufferIdentifier)&&Qe(n.createLong);var om=typeof SharedArrayBuffer<"u"?SharedArrayBuffer:ArrayBuffer;function LA(n){let t=n[0]?[n[0]]:[],e,i,r,s;for(let o,a,l=0,c=0,u=n.length;++l<u;){if(o=t[c],a=n[l],!o||!a||o.buffer!==a.buffer||a.byteOffset<o.byteOffset){a&&(t[++c]=a);continue}if({byteOffset:e,byteLength:r}=o,{byteOffset:i,byteLength:s}=a,e+r<i||i+s<e){a&&(t[++c]=a);continue}t[c]=new Uint8Array(o.buffer,e,i-e+s)}return t}function da(n,t,e=0,i=t.byteLength){let r=n.byteLength,s=new Uint8Array(n.buffer,n.byteOffset,r),o=new Uint8Array(t.buffer,t.byteOffset,Math.min(i,r));return s.set(o,e),n}function Zn(n,t){let e=LA(n),i=e.reduce((u,f)=>u+f.byteLength,0),r,s,o,a=0,l=-1,c=Math.min(t||Number.POSITIVE_INFINITY,i);for(let u=e.length;++l<u;){if(r=e[l],s=r.subarray(0,Math.min(r.length,c-a)),c<=a+s.length){s.length<r.length?e[l]=r.subarray(s.length):s.length===r.length&&l++,o?da(o,s,a):o=s;break}da(o||(o=new Uint8Array(c)),s,a),a+=s.length}return[o||new Uint8Array(0),e.slice(l),i-(o?o.byteLength:0)]}function te(n,t){let e=Hf(t)?t.value:t;return e instanceof n?n===Uint8Array?new n(e.buffer,e.byteOffset,e.byteLength):e:e?(typeof e=="string"&&(e=ms(e)),e instanceof ArrayBuffer?new n(e):e instanceof om?new n(e):ex(e)?te(n,e.bytes()):ArrayBuffer.isView(e)?e.byteLength<=0?new n(0):new n(e.buffer,e.byteOffset,e.byteLength/n.BYTES_PER_ELEMENT):n.from(e)):new n(0)}var FA=n=>te(Int8Array,n),BA=n=>te(Int16Array,n),no=n=>te(Int32Array,n),OA=n=>te(fi,n),zt=n=>te(Uint8Array,n),UA=n=>te(Uint16Array,n),NA=n=>te(Uint32Array,n),kA=n=>te(hi,n),zA=n=>te(Float32Array,n),VA=n=>te(Float64Array,n),HA=n=>te(Uint8ClampedArray,n),sm=n=>(n.next(),n);function*nr(n,t){let e=function*(r){yield r},i=typeof t=="string"||ArrayBuffer.isView(t)||t instanceof ArrayBuffer||t instanceof om?e(t):Li(t)?t:e(t);return yield*sm((function*(r){let s=null;do s=r.next(yield te(n,s));while(!s.done)})(i[Symbol.iterator]())),new n}var GA=n=>nr(Int8Array,n),WA=n=>nr(Int16Array,n),XA=n=>nr(Int32Array,n),am=n=>nr(Uint8Array,n),qA=n=>nr(Uint16Array,n),YA=n=>nr(Uint32Array,n),jA=n=>nr(Float32Array,n),$A=n=>nr(Float64Array,n),ZA=n=>nr(Uint8ClampedArray,n);function Fi(n,t){return jn(this,arguments,function*(){if($n(t))return yield Ht(yield Ht(yield*ha(Pi(Fi(n,yield Ht(t))))));let i=function(o){return jn(this,arguments,function*(){yield yield Ht(yield Ht(o))})},r=function(o){return jn(this,arguments,function*(){yield Ht(yield*ha(Pi(sm((function*(a){let l=null;do l=a.next(yield l?.value);while(!l.done)})(o[Symbol.iterator]())))))})},s=typeof t=="string"||ArrayBuffer.isView(t)||t instanceof ArrayBuffer||t instanceof om?i(t):Li(t)?r(t):di(t)?t:i(t);return yield Ht(yield*ha(Pi(sm((function(o){return jn(this,arguments,function*(){let a=null;do a=yield Ht(o.next(yield yield Ht(te(n,a))));while(!a.done)})})(s[Symbol.asyncIterator]()))))),yield Ht(new n)})}var JA=n=>Fi(Int8Array,n),KA=n=>Fi(Int16Array,n),QA=n=>Fi(Int32Array,n),lm=n=>Fi(Uint8Array,n),tE=n=>Fi(Uint16Array,n),eE=n=>Fi(Uint32Array,n),nE=n=>Fi(Float32Array,n),iE=n=>Fi(Float64Array,n),rE=n=>Fi(Uint8ClampedArray,n);function Rl(n,t,e){if(n!==0){e=e.slice(0,t+1);for(let i=-1;++i<=t;)e[i]+=n}return e}function cm(n,t){let e=0,i=n.length;if(i!==t.length)return!1;if(i>0)do if(n[e]!==t[e])return!1;while(++e<i);return!0}var un={fromIterable(n){return Yf(sE(n))},fromAsyncIterable(n){return Yf(oE(n))},fromDOMStream(n){return Yf(aE(n))},fromNodeStream(n){return Yf(lE(n))},toDOMStream(n,t){throw new Error('"toDOMStream" not available in this environment')},toNodeStream(n,t){throw new Error('"toNodeStream" not available in this environment')}},Yf=n=>(n.next(),n);function*sE(n){let t,e=!1,i=[],r,s,o,a=0;function l(){return s==="peek"?Zn(i,o)[0]:([r,i,a]=Zn(i,o),r)}({cmd:s,size:o}=yield null);let c=am(n)[Symbol.iterator]();try{do if({done:t,value:r}=Number.isNaN(o-a)?c.next():c.next(o-a),!t&&r.byteLength>0&&(i.push(r),a+=r.byteLength),t||o<=a)do({cmd:s,size:o}=yield l());while(o<a);while(!t)}catch(u){(e=!0)&&typeof c.throw=="function"&&c.throw(u)}finally{e===!1&&typeof c.return=="function"&&c.return(null)}return null}function oE(n){return jn(this,arguments,function*(){let e,i=!1,r=[],s,o,a,l=0;function c(){return o==="peek"?Zn(r,a)[0]:([s,r,l]=Zn(r,a),s)}({cmd:o,size:a}=yield yield Ht(null));let u=lm(n)[Symbol.asyncIterator]();try{do if({done:e,value:s}=Number.isNaN(a-l)?yield Ht(u.next()):yield Ht(u.next(a-l)),!e&&s.byteLength>0&&(r.push(s),l+=s.byteLength),e||a<=l)do({cmd:o,size:a}=yield yield Ht(c()));while(a<l);while(!e)}catch(f){(i=!0)&&typeof u.throw=="function"&&(yield Ht(u.throw(f)))}finally{i===!1&&typeof u.return=="function"&&(yield Ht(u.return(new Uint8Array(0))))}return yield Ht(null)})}function aE(n){return jn(this,arguments,function*(){let e=!1,i=!1,r=[],s,o,a,l=0;function c(){return o==="peek"?Zn(r,a)[0]:([s,r,l]=Zn(r,a),s)}({cmd:o,size:a}=yield yield Ht(null));let u=new hm(n);try{do if({done:e,value:s}=Number.isNaN(a-l)?yield Ht(u.read()):yield Ht(u.read(a-l)),!e&&s.byteLength>0&&(r.push(zt(s)),l+=s.byteLength),e||a<=l)do({cmd:o,size:a}=yield yield Ht(c()));while(a<l);while(!e)}catch(f){(i=!0)&&(yield Ht(u.cancel(f)))}finally{i===!1?yield Ht(u.cancel()):n.locked&&u.releaseLock()}return yield Ht(null)})}var hm=class{constructor(t){this.source=t,this.reader=null,this.reader=this.source.getReader(),this.reader.closed.catch(()=>{})}get closed(){return this.reader?this.reader.closed.catch(()=>{}):Promise.resolve()}releaseLock(){this.reader&&this.reader.releaseLock(),this.reader=null}cancel(t){return ut(this,void 0,void 0,function*(){let{reader:e,source:i}=this;e&&(yield e.cancel(t).catch(()=>{})),i&&i.locked&&this.releaseLock()})}read(t){return ut(this,void 0,void 0,function*(){if(t===0)return{done:this.reader==null,value:new Uint8Array(0)};let e=yield this.reader.read();return!e.done&&(e.value=zt(e)),e})}},fm=(n,t)=>{let e=r=>i([t,r]),i;return[t,e,new Promise(r=>(i=r)&&n.once(t,e))]};function lE(n){return jn(this,arguments,function*(){let e=[],i="error",r=!1,s=null,o,a,l=0,c=[],u;function f(){return o==="peek"?Zn(c,a)[0]:([u,c,l]=Zn(c,a),u)}if({cmd:o,size:a}=yield yield Ht(null),n.isTTY)return yield yield Ht(new Uint8Array(0)),yield Ht(null);try{e[0]=fm(n,"end"),e[1]=fm(n,"error");do{if(e[2]=fm(n,"readable"),[i,s]=yield Ht(Promise.race(e.map(p=>p[2]))),i==="error")break;if((r=i==="end")||(Number.isFinite(a-l)?(u=zt(n.read(a-l)),u.byteLength<a-l&&(u=zt(n.read()))):u=zt(n.read()),u.byteLength>0&&(c.push(u),l+=u.byteLength)),r||a<=l)do({cmd:o,size:a}=yield yield Ht(f()));while(a<l)}while(!r)}finally{yield Ht(h(e,i==="error"?s:null))}return yield Ht(null);function h(p,g){return u=c=null,new Promise((_,m)=>{for(let[d,A]of p)n.off(d,A);try{let d=n.destroy;d&&d.call(n,g),g=void 0}catch(d){g=d||g}finally{g!=null?m(g):_()}})}})}var on;(function(n){n[n.V1=0]="V1",n[n.V2=1]="V2",n[n.V3=2]="V3",n[n.V4=3]="V4",n[n.V5=4]="V5"})(on||(on={}));var ke;(function(n){n[n.Sparse=0]="Sparse",n[n.Dense=1]="Dense"})(ke||(ke={}));var Re;(function(n){n[n.HALF=0]="HALF",n[n.SINGLE=1]="SINGLE",n[n.DOUBLE=2]="DOUBLE"})(Re||(Re={}));var fn;(function(n){n[n.DAY=0]="DAY",n[n.MILLISECOND=1]="MILLISECOND"})(fn||(fn={}));var ie;(function(n){n[n.SECOND=0]="SECOND",n[n.MILLISECOND=1]="MILLISECOND",n[n.MICROSECOND=2]="MICROSECOND",n[n.NANOSECOND=3]="NANOSECOND"})(ie||(ie={}));var Cn;(function(n){n[n.YEAR_MONTH=0]="YEAR_MONTH",n[n.DAY_TIME=1]="DAY_TIME",n[n.MONTH_DAY_NANO=2]="MONTH_DAY_NANO"})(Cn||(Cn={}));var ce;(function(n){n[n.NONE=0]="NONE",n[n.Schema=1]="Schema",n[n.DictionaryBatch=2]="DictionaryBatch",n[n.RecordBatch=3]="RecordBatch",n[n.Tensor=4]="Tensor",n[n.SparseTensor=5]="SparseTensor"})(ce||(ce={}));var L;(function(n){n[n.NONE=0]="NONE",n[n.Null=1]="Null",n[n.Int=2]="Int",n[n.Float=3]="Float",n[n.Binary=4]="Binary",n[n.Utf8=5]="Utf8",n[n.Bool=6]="Bool",n[n.Decimal=7]="Decimal",n[n.Date=8]="Date",n[n.Time=9]="Time",n[n.Timestamp=10]="Timestamp",n[n.Interval=11]="Interval",n[n.List=12]="List",n[n.Struct=13]="Struct",n[n.Union=14]="Union",n[n.FixedSizeBinary=15]="FixedSizeBinary",n[n.FixedSizeList=16]="FixedSizeList",n[n.Map=17]="Map",n[n.Dictionary=-1]="Dictionary",n[n.Int8=-2]="Int8",n[n.Int16=-3]="Int16",n[n.Int32=-4]="Int32",n[n.Int64=-5]="Int64",n[n.Uint8=-6]="Uint8",n[n.Uint16=-7]="Uint16",n[n.Uint32=-8]="Uint32",n[n.Uint64=-9]="Uint64",n[n.Float16=-10]="Float16",n[n.Float32=-11]="Float32",n[n.Float64=-12]="Float64",n[n.DateDay=-13]="DateDay",n[n.DateMillisecond=-14]="DateMillisecond",n[n.TimestampSecond=-15]="TimestampSecond",n[n.TimestampMillisecond=-16]="TimestampMillisecond",n[n.TimestampMicrosecond=-17]="TimestampMicrosecond",n[n.TimestampNanosecond=-18]="TimestampNanosecond",n[n.TimeSecond=-19]="TimeSecond",n[n.TimeMillisecond=-20]="TimeMillisecond",n[n.TimeMicrosecond=-21]="TimeMicrosecond",n[n.TimeNanosecond=-22]="TimeNanosecond",n[n.DenseUnion=-23]="DenseUnion",n[n.SparseUnion=-24]="SparseUnion",n[n.IntervalDayTime=-25]="IntervalDayTime",n[n.IntervalYearMonth=-26]="IntervalYearMonth"})(L||(L={}));var pi;(function(n){n[n.OFFSET=0]="OFFSET",n[n.DATA=1]="DATA",n[n.VALIDITY=2]="VALIDITY",n[n.TYPE=3]="TYPE"})(pi||(pi={}));var Im={};Do(Im,{clampIndex:()=>QE,clampRange:()=>Fl,createElementComparator:()=>xs});var cE=void 0;function Bi(n){if(n===null)return"null";if(n===cE)return"undefined";switch(typeof n){case"number":return`${n}`;case"bigint":return`${n}`;case"string":return`"${n}"`}return typeof n[Symbol.toPrimitive]=="function"?n[Symbol.toPrimitive]("string"):ArrayBuffer.isView(n)?n instanceof fi||n instanceof hi?`[${[...n].map(t=>Bi(t))}]`:`[${n}]`:ArrayBuffer.isView(n)?`[${n}]`:JSON.stringify(n,(t,e)=>typeof e=="bigint"?`${e}`:e)}var pm={};Do(pm,{BN:()=>Pl,bignumToBigInt:()=>jf,bignumToString:()=>gs,isArrowBigNumSymbol:()=>nx});var nx=Symbol.for("isArrowBigNum");function Oi(n,...t){return t.length===0?Object.setPrototypeOf(te(this.TypedArray,n),this.constructor.prototype):Object.setPrototypeOf(new this.TypedArray(n,...t),this.constructor.prototype)}Oi.prototype[nx]=!0;Oi.prototype.toJSON=function(){return`"${gs(this)}"`};Oi.prototype.valueOf=function(){return ix(this)};Oi.prototype.toString=function(){return gs(this)};Oi.prototype[Symbol.toPrimitive]=function(n="default"){switch(n){case"number":return ix(this);case"string":return gs(this);case"default":return jf(this)}return gs(this)};function pa(...n){return Oi.apply(this,n)}function ma(...n){return Oi.apply(this,n)}function Dl(...n){return Oi.apply(this,n)}Object.setPrototypeOf(pa.prototype,Object.create(Int32Array.prototype));Object.setPrototypeOf(ma.prototype,Object.create(Uint32Array.prototype));Object.setPrototypeOf(Dl.prototype,Object.create(Uint32Array.prototype));Object.assign(pa.prototype,Oi.prototype,{constructor:pa,signed:!0,TypedArray:Int32Array,BigIntArray:fi});Object.assign(ma.prototype,Oi.prototype,{constructor:ma,signed:!1,TypedArray:Uint32Array,BigIntArray:hi});Object.assign(Dl.prototype,Oi.prototype,{constructor:Dl,signed:!0,TypedArray:Uint32Array,BigIntArray:hi});function ix(n){let{buffer:t,byteOffset:e,length:i,signed:r}=n,s=new hi(t,e,i),o=r&&s[s.length-1]&BigInt(1)<<BigInt(63),a=BigInt(o?1:0),l=BigInt(0);if(o){for(let c of s)a+=~c*(BigInt(1)<<BigInt(32)*l++);a*=BigInt(-1)}else for(let c of s)a+=c*(BigInt(1)<<BigInt(32)*l++);return a}var gs,jf;zf?(jf=(n=>n.byteLength===8?new n.BigIntArray(n.buffer,n.byteOffset,1)[0]:dm(n)),gs=(n=>n.byteLength===8?`${new n.BigIntArray(n.buffer,n.byteOffset,1)[0]}`:dm(n))):(gs=dm,jf=gs);function dm(n){let t="",e=new Uint32Array(2),i=new Uint16Array(n.buffer,n.byteOffset,n.byteLength/2),r=new Uint32Array((i=new Uint16Array(i).reverse()).buffer),s=-1,o=i.length-1;do{for(e[0]=i[s=0];s<o;)i[s++]=e[1]=e[0]/10,e[0]=(e[0]-e[1]*10<<16)+i[s];i[s]=e[1]=e[0]/10,e[0]=e[0]-e[1]*10,t=`${e[0]}${t}`}while(r[0]||r[1]||r[2]||r[3]);return t??"0"}var Pl=class n{static new(t,e){switch(e){case!0:return new pa(t);case!1:return new ma(t)}switch(t.constructor){case Int8Array:case Int16Array:case Int32Array:case fi:return new pa(t)}return t.byteLength===16?new Dl(t):new ma(t)}static signed(t){return new pa(t)}static unsigned(t){return new ma(t)}static decimal(t){return new Dl(t)}constructor(t,e){return n.new(t,e)}};var rx,sx,ox,ax,lx,cx,ux,fx,hx,dx,px,mx,gx,yx,_x,xx,vx,bx,Sx,Et=class n{static isNull(t){return t?.typeId===L.Null}static isInt(t){return t?.typeId===L.Int}static isFloat(t){return t?.typeId===L.Float}static isBinary(t){return t?.typeId===L.Binary}static isUtf8(t){return t?.typeId===L.Utf8}static isBool(t){return t?.typeId===L.Bool}static isDecimal(t){return t?.typeId===L.Decimal}static isDate(t){return t?.typeId===L.Date}static isTime(t){return t?.typeId===L.Time}static isTimestamp(t){return t?.typeId===L.Timestamp}static isInterval(t){return t?.typeId===L.Interval}static isList(t){return t?.typeId===L.List}static isStruct(t){return t?.typeId===L.Struct}static isUnion(t){return t?.typeId===L.Union}static isFixedSizeBinary(t){return t?.typeId===L.FixedSizeBinary}static isFixedSizeList(t){return t?.typeId===L.FixedSizeList}static isMap(t){return t?.typeId===L.Map}static isDictionary(t){return t?.typeId===L.Dictionary}static isDenseUnion(t){return n.isUnion(t)&&t.mode===ke.Dense}static isSparseUnion(t){return n.isUnion(t)&&t.mode===ke.Sparse}get typeId(){return L.NONE}};rx=Symbol.toStringTag;Et[rx]=(n=>(n.children=null,n.ArrayType=Array,n[Symbol.toStringTag]="DataType"))(Et.prototype);var In=class extends Et{toString(){return"Null"}get typeId(){return L.Null}};sx=Symbol.toStringTag;In[sx]=(n=>n[Symbol.toStringTag]="Null")(In.prototype);var Xe=class extends Et{constructor(t,e){super(),this.isSigned=t,this.bitWidth=e}get typeId(){return L.Int}get ArrayType(){switch(this.bitWidth){case 8:return this.isSigned?Int8Array:Uint8Array;case 16:return this.isSigned?Int16Array:Uint16Array;case 32:return this.isSigned?Int32Array:Uint32Array;case 64:return this.isSigned?fi:hi}throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`)}toString(){return`${this.isSigned?"I":"Ui"}nt${this.bitWidth}`}};ox=Symbol.toStringTag;Xe[ox]=(n=>(n.isSigned=null,n.bitWidth=null,n[Symbol.toStringTag]="Int"))(Xe.prototype);var $f=class extends Xe{constructor(){super(!0,8)}get ArrayType(){return Int8Array}},Zf=class extends Xe{constructor(){super(!0,16)}get ArrayType(){return Int16Array}},ir=class extends Xe{constructor(){super(!0,32)}get ArrayType(){return Int32Array}},Jf=class extends Xe{constructor(){super(!0,64)}get ArrayType(){return fi}},Kf=class extends Xe{constructor(){super(!1,8)}get ArrayType(){return Uint8Array}},Qf=class extends Xe{constructor(){super(!1,16)}get ArrayType(){return Uint16Array}},th=class extends Xe{constructor(){super(!1,32)}get ArrayType(){return Uint32Array}},eh=class extends Xe{constructor(){super(!1,64)}get ArrayType(){return hi}};Object.defineProperty($f.prototype,"ArrayType",{value:Int8Array});Object.defineProperty(Zf.prototype,"ArrayType",{value:Int16Array});Object.defineProperty(ir.prototype,"ArrayType",{value:Int32Array});Object.defineProperty(Jf.prototype,"ArrayType",{value:fi});Object.defineProperty(Kf.prototype,"ArrayType",{value:Uint8Array});Object.defineProperty(Qf.prototype,"ArrayType",{value:Uint16Array});Object.defineProperty(th.prototype,"ArrayType",{value:Uint32Array});Object.defineProperty(eh.prototype,"ArrayType",{value:hi});var Pn=class extends Et{constructor(t){super(),this.precision=t}get typeId(){return L.Float}get ArrayType(){switch(this.precision){case Re.HALF:return Uint16Array;case Re.SINGLE:return Float32Array;case Re.DOUBLE:return Float64Array}throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`)}toString(){return`Float${this.precision<<5||16}`}};ax=Symbol.toStringTag;Pn[ax]=(n=>(n.precision=null,n[Symbol.toStringTag]="Float"))(Pn.prototype);var nh=class extends Pn{constructor(){super(Re.HALF)}},ih=class extends Pn{constructor(){super(Re.SINGLE)}},rh=class extends Pn{constructor(){super(Re.DOUBLE)}};Object.defineProperty(nh.prototype,"ArrayType",{value:Uint16Array});Object.defineProperty(ih.prototype,"ArrayType",{value:Float32Array});Object.defineProperty(rh.prototype,"ArrayType",{value:Float64Array});var Ar=class extends Et{constructor(){super()}get typeId(){return L.Binary}toString(){return"Binary"}};lx=Symbol.toStringTag;Ar[lx]=(n=>(n.ArrayType=Uint8Array,n[Symbol.toStringTag]="Binary"))(Ar.prototype);var Er=class extends Et{constructor(){super()}get typeId(){return L.Utf8}toString(){return"Utf8"}};cx=Symbol.toStringTag;Er[cx]=(n=>(n.ArrayType=Uint8Array,n[Symbol.toStringTag]="Utf8"))(Er.prototype);var Cr=class extends Et{constructor(){super()}get typeId(){return L.Bool}toString(){return"Bool"}};ux=Symbol.toStringTag;Cr[ux]=(n=>(n.ArrayType=Uint8Array,n[Symbol.toStringTag]="Bool"))(Cr.prototype);var Ir=class extends Et{constructor(t,e,i=128){super(),this.scale=t,this.precision=e,this.bitWidth=i}get typeId(){return L.Decimal}toString(){return`Decimal[${this.precision}e${this.scale>0?"+":""}${this.scale}]`}};fx=Symbol.toStringTag;Ir[fx]=(n=>(n.scale=null,n.precision=null,n.ArrayType=Uint32Array,n[Symbol.toStringTag]="Decimal"))(Ir.prototype);var Rr=class extends Et{constructor(t){super(),this.unit=t}get typeId(){return L.Date}toString(){return`Date${(this.unit+1)*32}<${fn[this.unit]}>`}};hx=Symbol.toStringTag;Rr[hx]=(n=>(n.unit=null,n.ArrayType=Int32Array,n[Symbol.toStringTag]="Date"))(Rr.prototype);var Ui=class extends Et{constructor(t,e){super(),this.unit=t,this.bitWidth=e}get typeId(){return L.Time}toString(){return`Time${this.bitWidth}<${ie[this.unit]}>`}get ArrayType(){switch(this.bitWidth){case 32:return Int32Array;case 64:return fi}throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`)}};dx=Symbol.toStringTag;Ui[dx]=(n=>(n.unit=null,n.bitWidth=null,n[Symbol.toStringTag]="Time"))(Ui.prototype);var Dr=class extends Et{constructor(t,e){super(),this.unit=t,this.timezone=e}get typeId(){return L.Timestamp}toString(){return`Timestamp<${ie[this.unit]}${this.timezone?`, ${this.timezone}`:""}>`}};px=Symbol.toStringTag;Dr[px]=(n=>(n.unit=null,n.timezone=null,n.ArrayType=Int32Array,n[Symbol.toStringTag]="Timestamp"))(Dr.prototype);var Pr=class extends Et{constructor(t){super(),this.unit=t}get typeId(){return L.Interval}toString(){return`Interval<${Cn[this.unit]}>`}};mx=Symbol.toStringTag;Pr[mx]=(n=>(n.unit=null,n.ArrayType=Int32Array,n[Symbol.toStringTag]="Interval"))(Pr.prototype);var Ni=class extends Et{constructor(t){super(),this.children=[t]}get typeId(){return L.List}toString(){return`List<${this.valueType}>`}get valueType(){return this.children[0].type}get valueField(){return this.children[0]}get ArrayType(){return this.valueType.ArrayType}};gx=Symbol.toStringTag;Ni[gx]=(n=>(n.children=null,n[Symbol.toStringTag]="List"))(Ni.prototype);var Te=class extends Et{constructor(t){super(),this.children=t}get typeId(){return L.Struct}toString(){return`Struct<{${this.children.map(t=>`${t.name}:${t.type}`).join(", ")}}>`}};yx=Symbol.toStringTag;Te[yx]=(n=>(n.children=null,n[Symbol.toStringTag]="Struct"))(Te.prototype);var ki=class extends Et{constructor(t,e,i){super(),this.mode=t,this.children=i,this.typeIds=e=Int32Array.from(e),this.typeIdToChildIndex=e.reduce((r,s,o)=>(r[s]=o)&&r||r,Object.create(null))}get typeId(){return L.Union}toString(){return`${this[Symbol.toStringTag]}<${this.children.map(t=>`${t.type}`).join(" | ")}>`}};_x=Symbol.toStringTag;ki[_x]=(n=>(n.mode=null,n.typeIds=null,n.children=null,n.typeIdToChildIndex=null,n.ArrayType=Int8Array,n[Symbol.toStringTag]="Union"))(ki.prototype);var Lr=class extends Et{constructor(t){super(),this.byteWidth=t}get typeId(){return L.FixedSizeBinary}toString(){return`FixedSizeBinary[${this.byteWidth}]`}};xx=Symbol.toStringTag;Lr[xx]=(n=>(n.byteWidth=null,n.ArrayType=Uint8Array,n[Symbol.toStringTag]="FixedSizeBinary"))(Lr.prototype);var zi=class extends Et{constructor(t,e){super(),this.listSize=t,this.children=[e]}get typeId(){return L.FixedSizeList}get valueType(){return this.children[0].type}get valueField(){return this.children[0]}get ArrayType(){return this.valueType.ArrayType}toString(){return`FixedSizeList[${this.listSize}]<${this.valueType}>`}};vx=Symbol.toStringTag;zi[vx]=(n=>(n.children=null,n.listSize=null,n[Symbol.toStringTag]="FixedSizeList"))(zi.prototype);var Vi=class extends Et{constructor(t,e=!1){super(),this.children=[t],this.keysSorted=e}get typeId(){return L.Map}get keyType(){return this.children[0].type.children[0].type}get valueType(){return this.children[0].type.children[1].type}get childType(){return this.children[0].type}toString(){return`Map<{${this.children[0].type.children.map(t=>`${t.name}:${t.type}`).join(", ")}}>`}};bx=Symbol.toStringTag;Vi[bx]=(n=>(n.children=null,n.keysSorted=null,n[Symbol.toStringTag]="Map_"))(Vi.prototype);var uE=(n=>()=>++n)(-1),Jn=class extends Et{constructor(t,e,i,r){super(),this.indices=e,this.dictionary=t,this.isOrdered=r||!1,this.id=i==null?uE():typeof i=="number"?i:i.low}get typeId(){return L.Dictionary}get children(){return this.dictionary.children}get valueType(){return this.dictionary}get ArrayType(){return this.dictionary.ArrayType}toString(){return`Dictionary<${this.indices}, ${this.dictionary}>`}};Sx=Symbol.toStringTag;Jn[Sx]=(n=>(n.id=null,n.indices=null,n.isOrdered=null,n.dictionary=null,n[Symbol.toStringTag]="Dictionary"))(Jn.prototype);function Kn(n){let t=n;switch(n.typeId){case L.Decimal:return n.bitWidth/32;case L.Timestamp:return 2;case L.Date:return 1+t.unit;case L.Interval:return 1+t.unit;case L.FixedSizeList:return t.listSize;case L.FixedSizeBinary:return t.byteWidth;default:return 1}}var It=class{visitMany(t,...e){return t.map((i,r)=>this.visit(i,...e.map(s=>s[r])))}visit(...t){return this.getVisitFn(t[0],!1).apply(this,t)}getVisitFn(t,e=!0){return fE(this,t,e)}getVisitFnByTypeId(t,e=!0){return ga(this,t,e)}visitNull(t,...e){return null}visitBool(t,...e){return null}visitInt(t,...e){return null}visitFloat(t,...e){return null}visitUtf8(t,...e){return null}visitBinary(t,...e){return null}visitFixedSizeBinary(t,...e){return null}visitDate(t,...e){return null}visitTimestamp(t,...e){return null}visitTime(t,...e){return null}visitDecimal(t,...e){return null}visitList(t,...e){return null}visitStruct(t,...e){return null}visitUnion(t,...e){return null}visitDictionary(t,...e){return null}visitInterval(t,...e){return null}visitFixedSizeList(t,...e){return null}visitMap(t,...e){return null}};function fE(n,t,e=!0){return typeof t=="number"?ga(n,t,e):typeof t=="string"&&t in L?ga(n,L[t],e):t&&t instanceof Et?ga(n,Mx(t),e):t?.type&&t.type instanceof Et?ga(n,Mx(t.type),e):ga(n,L.NONE,e)}function ga(n,t,e=!0){let i=null;switch(t){case L.Null:i=n.visitNull;break;case L.Bool:i=n.visitBool;break;case L.Int:i=n.visitInt;break;case L.Int8:i=n.visitInt8||n.visitInt;break;case L.Int16:i=n.visitInt16||n.visitInt;break;case L.Int32:i=n.visitInt32||n.visitInt;break;case L.Int64:i=n.visitInt64||n.visitInt;break;case L.Uint8:i=n.visitUint8||n.visitInt;break;case L.Uint16:i=n.visitUint16||n.visitInt;break;case L.Uint32:i=n.visitUint32||n.visitInt;break;case L.Uint64:i=n.visitUint64||n.visitInt;break;case L.Float:i=n.visitFloat;break;case L.Float16:i=n.visitFloat16||n.visitFloat;break;case L.Float32:i=n.visitFloat32||n.visitFloat;break;case L.Float64:i=n.visitFloat64||n.visitFloat;break;case L.Utf8:i=n.visitUtf8;break;case L.Binary:i=n.visitBinary;break;case L.FixedSizeBinary:i=n.visitFixedSizeBinary;break;case L.Date:i=n.visitDate;break;case L.DateDay:i=n.visitDateDay||n.visitDate;break;case L.DateMillisecond:i=n.visitDateMillisecond||n.visitDate;break;case L.Timestamp:i=n.visitTimestamp;break;case L.TimestampSecond:i=n.visitTimestampSecond||n.visitTimestamp;break;case L.TimestampMillisecond:i=n.visitTimestampMillisecond||n.visitTimestamp;break;case L.TimestampMicrosecond:i=n.visitTimestampMicrosecond||n.visitTimestamp;break;case L.TimestampNanosecond:i=n.visitTimestampNanosecond||n.visitTimestamp;break;case L.Time:i=n.visitTime;break;case L.TimeSecond:i=n.visitTimeSecond||n.visitTime;break;case L.TimeMillisecond:i=n.visitTimeMillisecond||n.visitTime;break;case L.TimeMicrosecond:i=n.visitTimeMicrosecond||n.visitTime;break;case L.TimeNanosecond:i=n.visitTimeNanosecond||n.visitTime;break;case L.Decimal:i=n.visitDecimal;break;case L.List:i=n.visitList;break;case L.Struct:i=n.visitStruct;break;case L.Union:i=n.visitUnion;break;case L.DenseUnion:i=n.visitDenseUnion||n.visitUnion;break;case L.SparseUnion:i=n.visitSparseUnion||n.visitUnion;break;case L.Dictionary:i=n.visitDictionary;break;case L.Interval:i=n.visitInterval;break;case L.IntervalDayTime:i=n.visitIntervalDayTime||n.visitInterval;break;case L.IntervalYearMonth:i=n.visitIntervalYearMonth||n.visitInterval;break;case L.FixedSizeList:i=n.visitFixedSizeList;break;case L.Map:i=n.visitMap;break}if(typeof i=="function")return i;if(!e)return()=>null;throw new Error(`Unrecognized type '${L[t]}'`)}function Mx(n){switch(n.typeId){case L.Null:return L.Null;case L.Int:{let{bitWidth:t,isSigned:e}=n;switch(t){case 8:return e?L.Int8:L.Uint8;case 16:return e?L.Int16:L.Uint16;case 32:return e?L.Int32:L.Uint32;case 64:return e?L.Int64:L.Uint64}return L.Int}case L.Float:switch(n.precision){case Re.HALF:return L.Float16;case Re.SINGLE:return L.Float32;case Re.DOUBLE:return L.Float64}return L.Float;case L.Binary:return L.Binary;case L.Utf8:return L.Utf8;case L.Bool:return L.Bool;case L.Decimal:return L.Decimal;case L.Time:switch(n.unit){case ie.SECOND:return L.TimeSecond;case ie.MILLISECOND:return L.TimeMillisecond;case ie.MICROSECOND:return L.TimeMicrosecond;case ie.NANOSECOND:return L.TimeNanosecond}return L.Time;case L.Timestamp:switch(n.unit){case ie.SECOND:return L.TimestampSecond;case ie.MILLISECOND:return L.TimestampMillisecond;case ie.MICROSECOND:return L.TimestampMicrosecond;case ie.NANOSECOND:return L.TimestampNanosecond}return L.Timestamp;case L.Date:switch(n.unit){case fn.DAY:return L.DateDay;case fn.MILLISECOND:return L.DateMillisecond}return L.Date;case L.Interval:switch(n.unit){case Cn.DAY_TIME:return L.IntervalDayTime;case Cn.YEAR_MONTH:return L.IntervalYearMonth}return L.Interval;case L.Map:return L.Map;case L.List:return L.List;case L.Struct:return L.Struct;case L.Union:switch(n.mode){case ke.Dense:return L.DenseUnion;case ke.Sparse:return L.SparseUnion}return L.Union;case L.FixedSizeBinary:return L.FixedSizeBinary;case L.FixedSizeList:return L.FixedSizeList;case L.Dictionary:return L.Dictionary}throw new Error(`Unrecognized type '${L[n.typeId]}'`)}It.prototype.visitInt8=null;It.prototype.visitInt16=null;It.prototype.visitInt32=null;It.prototype.visitInt64=null;It.prototype.visitUint8=null;It.prototype.visitUint16=null;It.prototype.visitUint32=null;It.prototype.visitUint64=null;It.prototype.visitFloat16=null;It.prototype.visitFloat32=null;It.prototype.visitFloat64=null;It.prototype.visitDateDay=null;It.prototype.visitDateMillisecond=null;It.prototype.visitTimestampSecond=null;It.prototype.visitTimestampMillisecond=null;It.prototype.visitTimestampMicrosecond=null;It.prototype.visitTimestampNanosecond=null;It.prototype.visitTimeSecond=null;It.prototype.visitTimeMillisecond=null;It.prototype.visitTimeMicrosecond=null;It.prototype.visitTimeNanosecond=null;It.prototype.visitDenseUnion=null;It.prototype.visitSparseUnion=null;It.prototype.visitIntervalDayTime=null;It.prototype.visitIntervalYearMonth=null;var mm={};Do(mm,{float64ToUint16:()=>Ll,uint16ToFloat64:()=>sh});var wx=new Float64Array(1),ya=new Uint32Array(wx.buffer);function sh(n){let t=(n&31744)>>10,e=(n&1023)/1024,i=Math.pow(-1,(n&32768)>>15);switch(t){case 31:return i*(e?Number.NaN:1/0);case 0:return i*(e?6103515625e-14*e:0)}return i*Math.pow(2,t-15)*(1+e)}function Ll(n){if(n!==n)return 32256;wx[0]=n;let t=(ya[1]&2147483648)>>16&65535,e=ya[1]&2146435072,i=0;return e>=1089470464?ya[0]>0?e=31744:(e=(e&2080374784)>>16,i=(ya[1]&1048575)>>10):e<=1056964608?(i=1048576+(ya[1]&1048575),i=1048576+(i<<(e>>20)-998)>>21,e=0):(e=e-1056964608>>10,i=(ya[1]&1048575)+512>>10),t|e|i&65535}var Vt=class extends It{};function $t(n){return(t,e,i)=>{if(t.setValid(e,i!=null))return n(t,e,i)}}var hE=(n,t,e)=>{n[t]=Math.trunc(e/864e5)},gm=(n,t,e)=>{n[t]=Math.trunc(e%4294967296),n[t+1]=Math.trunc(e/4294967296)},dE=(n,t,e)=>{n[t]=Math.trunc(e*1e3%4294967296),n[t+1]=Math.trunc(e*1e3/4294967296)},pE=(n,t,e)=>{n[t]=Math.trunc(e*1e6%4294967296),n[t+1]=Math.trunc(e*1e6/4294967296)},Tx=(n,t,e,i)=>{if(e+1<t.length){let{[e]:r,[e+1]:s}=t;n.set(i.subarray(0,s-r),r)}},mE=({offset:n,values:t},e,i)=>{let r=n+e;i?t[r>>3]|=1<<r%8:t[r>>3]&=~(1<<r%8)},Fr=({values:n},t,e)=>{n[t]=e},ym=({values:n},t,e)=>{n[t]=e},Ax=({values:n},t,e)=>{n[t]=Ll(e)},gE=(n,t,e)=>{switch(n.type.precision){case Re.HALF:return Ax(n,t,e);case Re.SINGLE:case Re.DOUBLE:return ym(n,t,e)}},oh=({values:n},t,e)=>{hE(n,t,e.valueOf())},ah=({values:n},t,e)=>{gm(n,t*2,e.valueOf())},_m=({stride:n,values:t},e,i)=>{t.set(i.subarray(0,n),n*e)},yE=({values:n,valueOffsets:t},e,i)=>Tx(n,t,e,i),_E=({values:n,valueOffsets:t},e,i)=>{Tx(n,t,e,ms(i))},xm=(n,t,e)=>{n.type.unit===fn.DAY?oh(n,t,e):ah(n,t,e)},lh=({values:n},t,e)=>gm(n,t*2,e/1e3),ch=({values:n},t,e)=>gm(n,t*2,e),uh=({values:n},t,e)=>dE(n,t*2,e),fh=({values:n},t,e)=>pE(n,t*2,e),vm=(n,t,e)=>{switch(n.type.unit){case ie.SECOND:return lh(n,t,e);case ie.MILLISECOND:return ch(n,t,e);case ie.MICROSECOND:return uh(n,t,e);case ie.NANOSECOND:return fh(n,t,e)}},hh=({values:n},t,e)=>{n[t]=e},dh=({values:n},t,e)=>{n[t]=e},ph=({values:n},t,e)=>{n[t]=e},mh=({values:n},t,e)=>{n[t]=e},bm=(n,t,e)=>{switch(n.type.unit){case ie.SECOND:return hh(n,t,e);case ie.MILLISECOND:return dh(n,t,e);case ie.MICROSECOND:return ph(n,t,e);case ie.NANOSECOND:return mh(n,t,e)}},Sm=({values:n,stride:t},e,i)=>{n.set(i.subarray(0,t),t*e)},xE=(n,t,e)=>{let i=n.children[0],r=n.valueOffsets,s=hn.getVisitFn(i);if(Array.isArray(e))for(let o=-1,a=r[t],l=r[t+1];a<l;)s(i,a++,e[++o]);else for(let o=-1,a=r[t],l=r[t+1];a<l;)s(i,a++,e.get(++o))},vE=(n,t,e)=>{let i=n.children[0],{valueOffsets:r}=n,s=hn.getVisitFn(i),{[t]:o,[t+1]:a}=r,l=e instanceof Map?e.entries():Object.entries(e);for(let c of l)if(s(i,o,c),++o>=a)break},bE=(n,t)=>(e,i,r,s)=>i&&e(i,n,t[s]),SE=(n,t)=>(e,i,r,s)=>i&&e(i,n,t.get(s)),ME=(n,t)=>(e,i,r,s)=>i&&e(i,n,t.get(r.name)),wE=(n,t)=>(e,i,r,s)=>i&&e(i,n,t[r.name]),TE=(n,t,e)=>{let i=n.type.children.map(s=>hn.getVisitFn(s.type)),r=e instanceof Map?ME(t,e):e instanceof se?SE(t,e):Array.isArray(e)?bE(t,e):wE(t,e);n.type.children.forEach((s,o)=>r(i[o],n.children[o],s,o))},AE=(n,t,e)=>{n.type.mode===ke.Dense?Ex(n,t,e):Cx(n,t,e)},Ex=(n,t,e)=>{let i=n.type.typeIdToChildIndex[n.typeIds[t]],r=n.children[i];hn.visit(r,n.valueOffsets[t],e)},Cx=(n,t,e)=>{let i=n.type.typeIdToChildIndex[n.typeIds[t]],r=n.children[i];hn.visit(r,t,e)},EE=(n,t,e)=>{var i;(i=n.dictionary)===null||i===void 0||i.set(n.values[t],e)},Mm=(n,t,e)=>{n.type.unit===Cn.DAY_TIME?gh(n,t,e):yh(n,t,e)},gh=({values:n},t,e)=>{n.set(e.subarray(0,2),2*t)},yh=({values:n},t,e)=>{n[t]=e[0]*12+e[1]%12},CE=(n,t,e)=>{let{stride:i}=n,r=n.children[0],s=hn.getVisitFn(r);if(Array.isArray(e))for(let o=-1,a=t*i;++o<i;)s(r,a+o,e[o]);else for(let o=-1,a=t*i;++o<i;)s(r,a+o,e.get(o))};Vt.prototype.visitBool=$t(mE);Vt.prototype.visitInt=$t(Fr);Vt.prototype.visitInt8=$t(Fr);Vt.prototype.visitInt16=$t(Fr);Vt.prototype.visitInt32=$t(Fr);Vt.prototype.visitInt64=$t(Fr);Vt.prototype.visitUint8=$t(Fr);Vt.prototype.visitUint16=$t(Fr);Vt.prototype.visitUint32=$t(Fr);Vt.prototype.visitUint64=$t(Fr);Vt.prototype.visitFloat=$t(gE);Vt.prototype.visitFloat16=$t(Ax);Vt.prototype.visitFloat32=$t(ym);Vt.prototype.visitFloat64=$t(ym);Vt.prototype.visitUtf8=$t(_E);Vt.prototype.visitBinary=$t(yE);Vt.prototype.visitFixedSizeBinary=$t(_m);Vt.prototype.visitDate=$t(xm);Vt.prototype.visitDateDay=$t(oh);Vt.prototype.visitDateMillisecond=$t(ah);Vt.prototype.visitTimestamp=$t(vm);Vt.prototype.visitTimestampSecond=$t(lh);Vt.prototype.visitTimestampMillisecond=$t(ch);Vt.prototype.visitTimestampMicrosecond=$t(uh);Vt.prototype.visitTimestampNanosecond=$t(fh);Vt.prototype.visitTime=$t(bm);Vt.prototype.visitTimeSecond=$t(hh);Vt.prototype.visitTimeMillisecond=$t(dh);Vt.prototype.visitTimeMicrosecond=$t(ph);Vt.prototype.visitTimeNanosecond=$t(mh);Vt.prototype.visitDecimal=$t(Sm);Vt.prototype.visitList=$t(xE);Vt.prototype.visitStruct=$t(TE);Vt.prototype.visitUnion=$t(AE);Vt.prototype.visitDenseUnion=$t(Ex);Vt.prototype.visitSparseUnion=$t(Cx);Vt.prototype.visitDictionary=$t(EE);Vt.prototype.visitInterval=$t(Mm);Vt.prototype.visitIntervalDayTime=$t(gh);Vt.prototype.visitIntervalYearMonth=$t(yh);Vt.prototype.visitFixedSizeList=$t(CE);Vt.prototype.visitMap=$t(vE);var hn=new Vt;var Hi=Symbol.for("parent"),_a=Symbol.for("rowIndex"),ys=class{constructor(t,e){return this[Hi]=t,this[_a]=e,new Proxy(this,new Tm)}toArray(){return Object.values(this.toJSON())}toJSON(){let t=this[_a],e=this[Hi],i=e.type.children,r={};for(let s=-1,o=i.length;++s<o;)r[i[s].name]=je.visit(e.children[s],t);return r}toString(){return`{${[...this].map(([t,e])=>`${Bi(t)}: ${Bi(e)}`).join(", ")}}`}[Symbol.for("nodejs.util.inspect.custom")](){return this.toString()}[Symbol.iterator](){return new wm(this[Hi],this[_a])}},wm=class{constructor(t,e){this.childIndex=0,this.children=t.children,this.rowIndex=e,this.childFields=t.type.children,this.numChildren=this.childFields.length}[Symbol.iterator](){return this}next(){let t=this.childIndex;return t<this.numChildren?(this.childIndex=t+1,{done:!1,value:[this.childFields[t].name,je.visit(this.children[t],this.rowIndex)]}):{done:!0,value:null}}};Object.defineProperties(ys.prototype,{[Symbol.toStringTag]:{enumerable:!1,configurable:!1,value:"Row"},[Hi]:{writable:!0,enumerable:!1,configurable:!1,value:null},[_a]:{writable:!0,enumerable:!1,configurable:!1,value:-1}});var Tm=class{isExtensible(){return!1}deleteProperty(){return!1}preventExtensions(){return!0}ownKeys(t){return t[Hi].type.children.map(e=>e.name)}has(t,e){return t[Hi].type.children.findIndex(i=>i.name===e)!==-1}getOwnPropertyDescriptor(t,e){if(t[Hi].type.children.findIndex(i=>i.name===e)!==-1)return{writable:!0,enumerable:!0,configurable:!0}}get(t,e){if(Reflect.has(t,e))return t[e];let i=t[Hi].type.children.findIndex(r=>r.name===e);if(i!==-1){let r=je.visit(t[Hi].children[i],t[_a]);return Reflect.set(t,e,r),r}}set(t,e,i){let r=t[Hi].type.children.findIndex(s=>s.name===e);return r!==-1?(hn.visit(t[Hi].children[r],t[_a],i),Reflect.set(t,e,i)):Reflect.has(t,e)||typeof e=="symbol"?Reflect.set(t,e,i):!1}};var Ft=class extends It{};function Xt(n){return(t,e)=>t.getValid(e)?n(t,e):null}var IE=(n,t)=>864e5*n[t],Am=(n,t)=>4294967296*n[t+1]+(n[t]>>>0),RE=(n,t)=>4294967296*(n[t+1]/1e3)+(n[t]>>>0)/1e3,DE=(n,t)=>4294967296*(n[t+1]/1e6)+(n[t]>>>0)/1e6,Ix=n=>new Date(n),PE=(n,t)=>Ix(IE(n,t)),LE=(n,t)=>Ix(Am(n,t)),FE=(n,t)=>null,Rx=(n,t,e)=>{if(e+1>=t.length)return null;let i=t[e],r=t[e+1];return n.subarray(i,r)},BE=({offset:n,values:t},e)=>{let i=n+e;return(t[i>>3]&1<<i%8)!==0},Dx=({values:n},t)=>PE(n,t),Px=({values:n},t)=>LE(n,t*2),_s=({stride:n,values:t},e)=>t[n*e],OE=({stride:n,values:t},e)=>sh(t[n*e]),Lx=({values:n},t)=>n[t],UE=({stride:n,values:t},e)=>t.subarray(n*e,n*(e+1)),NE=({values:n,valueOffsets:t},e)=>Rx(n,t,e),kE=({values:n,valueOffsets:t},e)=>{let i=Rx(n,t,e);return i!==null?Cl(i):null},zE=({values:n},t)=>n[t],VE=({type:n,values:t},e)=>n.precision!==Re.HALF?t[e]:sh(t[e]),HE=(n,t)=>n.type.unit===fn.DAY?Dx(n,t):Px(n,t),Fx=({values:n},t)=>1e3*Am(n,t*2),Bx=({values:n},t)=>Am(n,t*2),Ox=({values:n},t)=>RE(n,t*2),Ux=({values:n},t)=>DE(n,t*2),GE=(n,t)=>{switch(n.type.unit){case ie.SECOND:return Fx(n,t);case ie.MILLISECOND:return Bx(n,t);case ie.MICROSECOND:return Ox(n,t);case ie.NANOSECOND:return Ux(n,t)}},Nx=({values:n},t)=>n[t],kx=({values:n},t)=>n[t],zx=({values:n},t)=>n[t],Vx=({values:n},t)=>n[t],WE=(n,t)=>{switch(n.type.unit){case ie.SECOND:return Nx(n,t);case ie.MILLISECOND:return kx(n,t);case ie.MICROSECOND:return zx(n,t);case ie.NANOSECOND:return Vx(n,t)}},XE=({values:n,stride:t},e)=>Pl.decimal(n.subarray(t*e,t*(e+1))),qE=(n,t)=>{let{valueOffsets:e,stride:i,children:r}=n,{[t*i]:s,[t*i+1]:o}=e,l=r[0].slice(s,o-s);return new se([l])},YE=(n,t)=>{let{valueOffsets:e,children:i}=n,{[t]:r,[t+1]:s}=e,o=i[0];return new rr(o.slice(r,s-r))},jE=(n,t)=>new ys(n,t),$E=(n,t)=>n.type.mode===ke.Dense?Hx(n,t):Gx(n,t),Hx=(n,t)=>{let e=n.type.typeIdToChildIndex[n.typeIds[t]],i=n.children[e];return je.visit(i,n.valueOffsets[t])},Gx=(n,t)=>{let e=n.type.typeIdToChildIndex[n.typeIds[t]],i=n.children[e];return je.visit(i,t)},ZE=(n,t)=>{var e;return(e=n.dictionary)===null||e===void 0?void 0:e.get(n.values[t])},JE=(n,t)=>n.type.unit===Cn.DAY_TIME?Wx(n,t):Xx(n,t),Wx=({values:n},t)=>n.subarray(2*t,2*(t+1)),Xx=({values:n},t)=>{let e=n[t],i=new Int32Array(2);return i[0]=Math.trunc(e/12),i[1]=Math.trunc(e%12),i},KE=(n,t)=>{let{stride:e,children:i}=n,s=i[0].slice(t*e,e);return new se([s])};Ft.prototype.visitNull=Xt(FE);Ft.prototype.visitBool=Xt(BE);Ft.prototype.visitInt=Xt(zE);Ft.prototype.visitInt8=Xt(_s);Ft.prototype.visitInt16=Xt(_s);Ft.prototype.visitInt32=Xt(_s);Ft.prototype.visitInt64=Xt(Lx);Ft.prototype.visitUint8=Xt(_s);Ft.prototype.visitUint16=Xt(_s);Ft.prototype.visitUint32=Xt(_s);Ft.prototype.visitUint64=Xt(Lx);Ft.prototype.visitFloat=Xt(VE);Ft.prototype.visitFloat16=Xt(OE);Ft.prototype.visitFloat32=Xt(_s);Ft.prototype.visitFloat64=Xt(_s);Ft.prototype.visitUtf8=Xt(kE);Ft.prototype.visitBinary=Xt(NE);Ft.prototype.visitFixedSizeBinary=Xt(UE);Ft.prototype.visitDate=Xt(HE);Ft.prototype.visitDateDay=Xt(Dx);Ft.prototype.visitDateMillisecond=Xt(Px);Ft.prototype.visitTimestamp=Xt(GE);Ft.prototype.visitTimestampSecond=Xt(Fx);Ft.prototype.visitTimestampMillisecond=Xt(Bx);Ft.prototype.visitTimestampMicrosecond=Xt(Ox);Ft.prototype.visitTimestampNanosecond=Xt(Ux);Ft.prototype.visitTime=Xt(WE);Ft.prototype.visitTimeSecond=Xt(Nx);Ft.prototype.visitTimeMillisecond=Xt(kx);Ft.prototype.visitTimeMicrosecond=Xt(zx);Ft.prototype.visitTimeNanosecond=Xt(Vx);Ft.prototype.visitDecimal=Xt(XE);Ft.prototype.visitList=Xt(qE);Ft.prototype.visitStruct=Xt(jE);Ft.prototype.visitUnion=Xt($E);Ft.prototype.visitDenseUnion=Xt(Hx);Ft.prototype.visitSparseUnion=Xt(Gx);Ft.prototype.visitDictionary=Xt(ZE);Ft.prototype.visitInterval=Xt(JE);Ft.prototype.visitIntervalDayTime=Xt(Wx);Ft.prototype.visitIntervalYearMonth=Xt(Xx);Ft.prototype.visitFixedSizeList=Xt(KE);Ft.prototype.visitMap=Xt(YE);var je=new Ft;var mi=Symbol.for("keys"),xa=Symbol.for("vals"),rr=class{constructor(t){return this[mi]=new se([t.children[0]]).memoize(),this[xa]=t.children[1],new Proxy(this,new Cm)}[Symbol.iterator](){return new Em(this[mi],this[xa])}get size(){return this[mi].length}toArray(){return Object.values(this.toJSON())}toJSON(){let t=this[mi],e=this[xa],i={};for(let r=-1,s=t.length;++r<s;)i[t.get(r)]=je.visit(e,r);return i}toString(){return`{${[...this].map(([t,e])=>`${Bi(t)}: ${Bi(e)}`).join(", ")}}`}[Symbol.for("nodejs.util.inspect.custom")](){return this.toString()}},Em=class{constructor(t,e){this.keys=t,this.vals=e,this.keyIndex=0,this.numKeys=t.length}[Symbol.iterator](){return this}next(){let t=this.keyIndex;return t===this.numKeys?{done:!0,value:null}:(this.keyIndex++,{done:!1,value:[this.keys.get(t),je.visit(this.vals,t)]})}},Cm=class{isExtensible(){return!1}deleteProperty(){return!1}preventExtensions(){return!0}ownKeys(t){return t[mi].toArray().map(String)}has(t,e){return t[mi].includes(e)}getOwnPropertyDescriptor(t,e){if(t[mi].indexOf(e)!==-1)return{writable:!0,enumerable:!0,configurable:!0}}get(t,e){if(Reflect.has(t,e))return t[e];let i=t[mi].indexOf(e);if(i!==-1){let r=je.visit(Reflect.get(t,xa),i);return Reflect.set(t,e,r),r}}set(t,e,i){let r=t[mi].indexOf(e);return r!==-1?(hn.visit(Reflect.get(t,xa),r,i),Reflect.set(t,e,i)):Reflect.has(t,e)?Reflect.set(t,e,i):!1}};Object.defineProperties(rr.prototype,{[Symbol.toStringTag]:{enumerable:!1,configurable:!1,value:"Row"},[mi]:{writable:!0,enumerable:!1,configurable:!1,value:null},[xa]:{writable:!0,enumerable:!1,configurable:!1,value:null}});function QE(n,t,e){let i=n.length,r=t>-1?t:i+t%i;return e?e(n,r):r}var qx;function Fl(n,t,e,i){let{length:r=0}=n,s=typeof t!="number"?0:t,o=typeof e!="number"?r:e;return s<0&&(s=(s%r+r)%r),o<0&&(o=(o%r+r)%r),o<s&&(qx=s,s=o,o=qx),o>r&&(o=r),i?i(n,s,o):[s,o]}var Yx=n=>n!==n;function xs(n){if(typeof n!=="object"||n===null)return Yx(n)?Yx:e=>e===n;if(n instanceof Date){let e=n.valueOf();return i=>i instanceof Date?i.valueOf()===e:!1}return ArrayBuffer.isView(n)?e=>e?cm(n,e):!1:n instanceof Map?e1(n):Array.isArray(n)?t1(n):n instanceof se?n1(n):i1(n,!0)}function t1(n){let t=[];for(let e=-1,i=n.length;++e<i;)t[e]=xs(n[e]);return _h(t)}function e1(n){let t=-1,e=[];for(let i of n.values())e[++t]=xs(i);return _h(e)}function n1(n){let t=[];for(let e=-1,i=n.length;++e<i;)t[e]=xs(n.get(e));return _h(t)}function i1(n,t=!1){let e=Object.keys(n);if(!t&&e.length===0)return()=>!1;let i=[];for(let r=-1,s=e.length;++r<s;)i[r]=xs(n[e[r]]);return _h(i,e)}function _h(n,t){return e=>{if(!e||typeof e!="object")return!1;switch(e.constructor){case Array:return r1(n,e);case Map:return jx(n,e,e.keys());case rr:case ys:case Object:case void 0:return jx(n,e,t||Object.keys(e))}return e instanceof se?s1(n,e):!1}}function r1(n,t){let e=n.length;if(t.length!==e)return!1;for(let i=-1;++i<e;)if(!n[i](t[i]))return!1;return!0}function s1(n,t){let e=n.length;if(t.length!==e)return!1;for(let i=-1;++i<e;)if(!n[i](t.get(i)))return!1;return!0}function jx(n,t,e){let i=e[Symbol.iterator](),r=t instanceof Map?t.keys():Object.keys(t)[Symbol.iterator](),s=t instanceof Map?t.values():Object.values(t)[Symbol.iterator](),o=0,a=n.length,l=s.next(),c=i.next(),u=r.next();for(;o<a&&!c.done&&!u.done&&!l.done&&!(c.value!==u.value||!n[o](l.value));++o,c=i.next(),u=r.next(),l=s.next());return o===a&&c.done&&u.done&&l.done?!0:(i.return&&i.return(),r.return&&r.return(),s.return&&s.return(),!1)}var Rm={};Do(Rm,{BitIterator:()=>io,getBit:()=>$x,getBool:()=>vh,packBools:()=>ro,popcnt_array:()=>Zx,popcnt_bit_range:()=>Bl,popcnt_uint32:()=>xh,setBool:()=>o1,truncateBitmap:()=>va});function vh(n,t,e,i){return(e&1<<i)!==0}function $x(n,t,e,i){return(e&1<<i)>>i}function o1(n,t,e){return e?!!(n[t>>3]|=1<<t%8)||!0:!(n[t>>3]&=~(1<<t%8))&&!1}function va(n,t,e){let i=e.byteLength+7&-8;if(n>0||e.byteLength<i){let r=new Uint8Array(i);return r.set(n%8===0?e.subarray(n>>3):ro(new io(e,n,t,null,vh)).subarray(0,i)),r}return e}function ro(n){let t=[],e=0,i=0,r=0;for(let o of n)o&&(r|=1<<i),++i===8&&(t[e++]=r,r=i=0);(e===0||i>0)&&(t[e++]=r);let s=new Uint8Array(t.length+7&-8);return s.set(t),s}var io=class{constructor(t,e,i,r,s){this.bytes=t,this.length=i,this.context=r,this.get=s,this.bit=e%8,this.byteIndex=e>>3,this.byte=t[this.byteIndex++],this.index=0}next(){return this.index<this.length?(this.bit===8&&(this.bit=0,this.byte=this.bytes[this.byteIndex++]),{value:this.get(this.context,this.index++,this.byte,this.bit++)}):{done:!0,value:null}}[Symbol.iterator](){return this}};function Bl(n,t,e){if(e-t<=0)return 0;if(e-t<8){let s=0;for(let o of new io(n,t,e-t,n,$x))s+=o;return s}let i=e>>3<<3,r=t+(t%8===0?0:8-t%8);return Bl(n,t,r)+Bl(n,i,e)+Zx(n,r>>3,i-r>>3)}function Zx(n,t,e){let i=0,r=Math.trunc(t),s=new DataView(n.buffer,n.byteOffset,n.byteLength),o=e===void 0?n.byteLength:r+e;for(;o-r>=4;)i+=xh(s.getUint32(r)),r+=4;for(;o-r>=2;)i+=xh(s.getUint16(r)),r+=2;for(;o-r>=1;)i+=xh(s.getUint8(r)),r+=1;return i}function xh(n){let t=Math.trunc(n);return t=t-(t>>>1&1431655765),t=(t&858993459)+(t>>>2&858993459),(t+(t>>>4)&252645135)*16843009>>>24}var a1=-1,_e=class n{constructor(t,e,i,r,s,o=[],a){this.type=t,this.children=o,this.dictionary=a,this.offset=Math.floor(Math.max(e||0,0)),this.length=Math.floor(Math.max(i||0,0)),this._nullCount=Math.floor(Math.max(r||0,-1));let l;s instanceof n?(this.stride=s.stride,this.values=s.values,this.typeIds=s.typeIds,this.nullBitmap=s.nullBitmap,this.valueOffsets=s.valueOffsets):(this.stride=Kn(t),s&&((l=s[0])&&(this.valueOffsets=l),(l=s[1])&&(this.values=l),(l=s[2])&&(this.nullBitmap=l),(l=s[3])&&(this.typeIds=l))),this.nullable=this._nullCount!==0&&this.nullBitmap&&this.nullBitmap.byteLength>0}get typeId(){return this.type.typeId}get ArrayType(){return this.type.ArrayType}get buffers(){return[this.valueOffsets,this.values,this.nullBitmap,this.typeIds]}get byteLength(){let t=0,{valueOffsets:e,values:i,nullBitmap:r,typeIds:s}=this;return e&&(t+=e.byteLength),i&&(t+=i.byteLength),r&&(t+=r.byteLength),s&&(t+=s.byteLength),this.children.reduce((o,a)=>o+a.byteLength,t)}get nullCount(){let t=this._nullCount,e;return t<=a1&&(e=this.nullBitmap)&&(this._nullCount=t=this.length-Bl(e,this.offset,this.offset+this.length)),t}getValid(t){if(this.nullable&&this.nullCount>0){let e=this.offset+t;return(this.nullBitmap[e>>3]&1<<e%8)!==0}return!0}setValid(t,e){if(!this.nullable)return e;if(!this.nullBitmap||this.nullBitmap.byteLength<=t>>3){let{nullBitmap:l}=this._changeLengthAndBackfillNullBitmap(this.length);Object.assign(this,{nullBitmap:l,_nullCount:0})}let{nullBitmap:i,offset:r}=this,s=r+t>>3,o=(r+t)%8,a=i[s]>>o&1;return e?a===0&&(i[s]|=1<<o,this._nullCount=this.nullCount+1):a===1&&(i[s]&=~(1<<o),this._nullCount=this.nullCount-1),e}clone(t=this.type,e=this.offset,i=this.length,r=this._nullCount,s=this,o=this.children){return new n(t,e,i,r,s,o,this.dictionary)}slice(t,e){let{stride:i,typeId:r,children:s}=this,o=+(this._nullCount===0)-1,a=r===16?i:1,l=this._sliceBuffers(t,e,i,r);return this.clone(this.type,this.offset+t,e,o,l,s.length===0||this.valueOffsets?s:this._sliceChildren(s,a*t,a*e))}_changeLengthAndBackfillNullBitmap(t){if(this.typeId===L.Null)return this.clone(this.type,0,t,0);let{length:e,nullCount:i}=this,r=new Uint8Array((t+63&-64)>>3).fill(255,0,e>>3);r[e>>3]=(1<<e-(e&-8))-1,i>0&&r.set(va(this.offset,e,this.nullBitmap),0);let s=this.buffers;return s[pi.VALIDITY]=r,this.clone(this.type,0,t,i+(t-e),s)}_sliceBuffers(t,e,i,r){let s,{buffers:o}=this;return(s=o[pi.TYPE])&&(o[pi.TYPE]=s.subarray(t,t+e)),(s=o[pi.OFFSET])&&(o[pi.OFFSET]=s.subarray(t,t+e+1))||(s=o[pi.DATA])&&(o[pi.DATA]=r===6?s:s.subarray(i*t,i*(t+e))),o}_sliceChildren(t,e,i){return t.map(r=>r.slice(e,i))}};_e.prototype.children=Object.freeze([]);var Dm=class n extends It{visit(t){return this.getVisitFn(t.type).call(this,t)}visitNull(t){let{["type"]:e,["offset"]:i=0,["length"]:r=0}=t;return new _e(e,i,r,0)}visitBool(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length>>3,["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitInt(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length,["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitFloat(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length,["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitUtf8(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.data),s=zt(t.nullBitmap),o=no(t.valueOffsets),{["length"]:a=o.length-1,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[o,r,s])}visitBinary(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.data),s=zt(t.nullBitmap),o=no(t.valueOffsets),{["length"]:a=o.length-1,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[o,r,s])}visitFixedSizeBinary(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Kn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitDate(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Kn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitTimestamp(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Kn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitTime(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Kn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitDecimal(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Kn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitList(t){let{["type"]:e,["offset"]:i=0,["child"]:r}=t,s=zt(t.nullBitmap),o=no(t.valueOffsets),{["length"]:a=o.length-1,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[o,void 0,s],[r])}visitStruct(t){let{["type"]:e,["offset"]:i=0,["children"]:r=[]}=t,s=zt(t.nullBitmap),{length:o=r.reduce((l,{length:c})=>Math.max(l,c),0),nullCount:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,void 0,s],r)}visitUnion(t){let{["type"]:e,["offset"]:i=0,["children"]:r=[]}=t,s=zt(t.nullBitmap),o=te(e.ArrayType,t.typeIds),{["length"]:a=o.length,["nullCount"]:l=t.nullBitmap?-1:0}=t;if(Et.isSparseUnion(e))return new _e(e,i,a,l,[void 0,void 0,s,o],r);let c=no(t.valueOffsets);return new _e(e,i,a,l,[c,void 0,s,o],r)}visitDictionary(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.indices.ArrayType,t.data),{["dictionary"]:o=new se([new n().visit({type:e.dictionary})])}=t,{["length"]:a=s.length,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[void 0,s,r],[],o)}visitInterval(t){let{["type"]:e,["offset"]:i=0}=t,r=zt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Kn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitFixedSizeList(t){let{["type"]:e,["offset"]:i=0,["child"]:r=new n().visit({type:e.valueType})}=t,s=zt(t.nullBitmap),{["length"]:o=r.length/Kn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,void 0,s],[r])}visitMap(t){let{["type"]:e,["offset"]:i=0,["child"]:r=new n().visit({type:e.childType})}=t,s=zt(t.nullBitmap),o=no(t.valueOffsets),{["length"]:a=o.length-1,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[o,void 0,s],[r])}};function Gt(n){return new Dm().visit(n)}var Ol=class{constructor(t=0,e){this.numChunks=t,this.getChunkIterator=e,this.chunkIndex=0,this.chunkIterator=this.getChunkIterator(0)}next(){for(;this.chunkIndex<this.numChunks;){let t=this.chunkIterator.next();if(!t.done)return t;++this.chunkIndex<this.numChunks&&(this.chunkIterator=this.getChunkIterator(this.chunkIndex))}return{done:!0,value:null}}[Symbol.iterator](){return this}};function bh(n){return n.reduce((t,e)=>t+e.nullCount,0)}function Sh(n){return n.reduce((t,e,i)=>(t[i+1]=t[i]+e.length,t),new Uint32Array(n.length+1))}function Mh(n,t,e,i){let r=[];for(let s=-1,o=n.length;++s<o;){let a=n[s],l=t[s],{length:c}=a;if(l>=i)break;if(e>=l+c)continue;if(l>=e&&l+c<=i){r.push(a);continue}let u=Math.max(0,e-l),f=Math.min(i-l,c);r.push(a.slice(u,f-u))}return r.length===0&&r.push(n[0].slice(0,0)),r}function Pm(n,t,e,i){let r=0,s=0,o=t.length-1;do{if(r>=o-1)return e<t[o]?i(n,r,e-t[r]):null;s=r+Math.trunc((o-r)*.5),e<t[s]?o=s:r=s}while(r<o)}function Ul(n,t){return n.getValid(t)}function vs(n){function t(e,i,r){return n(e[i],r)}return function(e){let i=this.data;return Pm(i,this._offsets,e,t)}}function wh(n){let t;function e(i,r,s){return n(i[r],s,t)}return function(i,r){let s=this.data;t=r;let o=Pm(s,this._offsets,i,e);return t=void 0,o}}function Th(n){let t;function e(i,r,s){let o=s,a=0,l=0;for(let c=r-1,u=i.length;++c<u;){let f=i[c];if(~(a=n(f,t,o)))return l+a;o=0,l+=f.length}return-1}return function(i,r){t=i;let s=this.data,o=typeof r!="number"?e(s,0,0):Pm(s,this._offsets,r,e);return t=void 0,o}}var Bt=class extends It{};function l1(n,t){return t===null&&n.length>0?0:-1}function c1(n,t){let{nullBitmap:e}=n;if(!e||n.nullCount<=0)return-1;let i=0;for(let r of new io(e,n.offset+(t||0),n.length,e,vh)){if(!r)return i;++i}return-1}function ee(n,t,e){if(t===void 0)return-1;if(t===null)return c1(n,e);let i=je.getVisitFn(n),r=xs(t);for(let s=(e||0)-1,o=n.length;++s<o;)if(r(i(n,s)))return s;return-1}function Jx(n,t,e){let i=je.getVisitFn(n),r=xs(t);for(let s=(e||0)-1,o=n.length;++s<o;)if(r(i(n,s)))return s;return-1}Bt.prototype.visitNull=l1;Bt.prototype.visitBool=ee;Bt.prototype.visitInt=ee;Bt.prototype.visitInt8=ee;Bt.prototype.visitInt16=ee;Bt.prototype.visitInt32=ee;Bt.prototype.visitInt64=ee;Bt.prototype.visitUint8=ee;Bt.prototype.visitUint16=ee;Bt.prototype.visitUint32=ee;Bt.prototype.visitUint64=ee;Bt.prototype.visitFloat=ee;Bt.prototype.visitFloat16=ee;Bt.prototype.visitFloat32=ee;Bt.prototype.visitFloat64=ee;Bt.prototype.visitUtf8=ee;Bt.prototype.visitBinary=ee;Bt.prototype.visitFixedSizeBinary=ee;Bt.prototype.visitDate=ee;Bt.prototype.visitDateDay=ee;Bt.prototype.visitDateMillisecond=ee;Bt.prototype.visitTimestamp=ee;Bt.prototype.visitTimestampSecond=ee;Bt.prototype.visitTimestampMillisecond=ee;Bt.prototype.visitTimestampMicrosecond=ee;Bt.prototype.visitTimestampNanosecond=ee;Bt.prototype.visitTime=ee;Bt.prototype.visitTimeSecond=ee;Bt.prototype.visitTimeMillisecond=ee;Bt.prototype.visitTimeMicrosecond=ee;Bt.prototype.visitTimeNanosecond=ee;Bt.prototype.visitDecimal=ee;Bt.prototype.visitList=ee;Bt.prototype.visitStruct=ee;Bt.prototype.visitUnion=ee;Bt.prototype.visitDenseUnion=Jx;Bt.prototype.visitSparseUnion=Jx;Bt.prototype.visitDictionary=ee;Bt.prototype.visitInterval=ee;Bt.prototype.visitIntervalDayTime=ee;Bt.prototype.visitIntervalYearMonth=ee;Bt.prototype.visitFixedSizeList=ee;Bt.prototype.visitMap=ee;var so=new Bt;var Ot=class extends It{};function qt(n){let{type:t}=n;if(n.nullCount===0&&n.stride===1&&(t.typeId===L.Timestamp||t instanceof Xe&&t.bitWidth!==64||t instanceof Ui&&t.bitWidth!==64||t instanceof Pn&&t.precision!==Re.HALF))return new Ol(n.data.length,i=>{let r=n.data[i];return r.values.subarray(0,r.length)[Symbol.iterator]()});let e=0;return new Ol(n.data.length,i=>{let s=n.data[i].length,o=n.slice(e,e+s);return e+=s,new Lm(o)})}var Lm=class{constructor(t){this.vector=t,this.index=0}next(){return this.index<this.vector.length?{value:this.vector.get(this.index++)}:{done:!0,value:null}}[Symbol.iterator](){return this}};Ot.prototype.visitNull=qt;Ot.prototype.visitBool=qt;Ot.prototype.visitInt=qt;Ot.prototype.visitInt8=qt;Ot.prototype.visitInt16=qt;Ot.prototype.visitInt32=qt;Ot.prototype.visitInt64=qt;Ot.prototype.visitUint8=qt;Ot.prototype.visitUint16=qt;Ot.prototype.visitUint32=qt;Ot.prototype.visitUint64=qt;Ot.prototype.visitFloat=qt;Ot.prototype.visitFloat16=qt;Ot.prototype.visitFloat32=qt;Ot.prototype.visitFloat64=qt;Ot.prototype.visitUtf8=qt;Ot.prototype.visitBinary=qt;Ot.prototype.visitFixedSizeBinary=qt;Ot.prototype.visitDate=qt;Ot.prototype.visitDateDay=qt;Ot.prototype.visitDateMillisecond=qt;Ot.prototype.visitTimestamp=qt;Ot.prototype.visitTimestampSecond=qt;Ot.prototype.visitTimestampMillisecond=qt;Ot.prototype.visitTimestampMicrosecond=qt;Ot.prototype.visitTimestampNanosecond=qt;Ot.prototype.visitTime=qt;Ot.prototype.visitTimeSecond=qt;Ot.prototype.visitTimeMillisecond=qt;Ot.prototype.visitTimeMicrosecond=qt;Ot.prototype.visitTimeNanosecond=qt;Ot.prototype.visitDecimal=qt;Ot.prototype.visitList=qt;Ot.prototype.visitStruct=qt;Ot.prototype.visitUnion=qt;Ot.prototype.visitDenseUnion=qt;Ot.prototype.visitSparseUnion=qt;Ot.prototype.visitDictionary=qt;Ot.prototype.visitInterval=qt;Ot.prototype.visitIntervalDayTime=qt;Ot.prototype.visitIntervalYearMonth=qt;Ot.prototype.visitFixedSizeList=qt;Ot.prototype.visitMap=qt;var ba=new Ot;var u1=(n,t)=>n+t,sr=class extends It{visitNull(t,e){return 0}visitInt(t,e){return t.type.bitWidth/8}visitFloat(t,e){return t.type.ArrayType.BYTES_PER_ELEMENT}visitBool(t,e){return 1/8}visitDecimal(t,e){return t.type.bitWidth/8}visitDate(t,e){return(t.type.unit+1)*4}visitTime(t,e){return t.type.bitWidth/8}visitTimestamp(t,e){return t.type.unit===ie.SECOND?4:8}visitInterval(t,e){return(t.type.unit+1)*4}visitStruct(t,e){return t.children.reduce((i,r)=>i+Qn.visit(r,e),0)}visitFixedSizeBinary(t,e){return t.type.byteWidth}visitMap(t,e){return 8+t.children.reduce((i,r)=>i+Qn.visit(r,e),0)}visitDictionary(t,e){var i;return t.type.indices.bitWidth/8+(((i=t.dictionary)===null||i===void 0?void 0:i.getByteLength(t.values[e]))||0)}},f1=({valueOffsets:n},t)=>8+(n[t+1]-n[t]),h1=({valueOffsets:n},t)=>8+(n[t+1]-n[t]),d1=({valueOffsets:n,stride:t,children:e},i)=>{let r=e[0],{[i*t]:s}=n,{[i*t+1]:o}=n,a=Qn.getVisitFn(r.type),l=r.slice(s,o-s),c=8;for(let u=-1,f=o-s;++u<f;)c+=a(l,u);return c},p1=({stride:n,children:t},e)=>{let i=t[0],r=i.slice(e*n,n),s=Qn.getVisitFn(i.type),o=0;for(let a=-1,l=r.length;++a<l;)o+=s(r,a);return o},m1=(n,t)=>n.type.mode===ke.Dense?Kx(n,t):Qx(n,t),Kx=({type:n,children:t,typeIds:e,valueOffsets:i},r)=>{let s=n.typeIdToChildIndex[e[r]];return 8+Qn.visit(t[s],i[r])},Qx=({children:n},t)=>4+Qn.visitMany(n,n.map(()=>t)).reduce(u1,0);sr.prototype.visitUtf8=f1;sr.prototype.visitBinary=h1;sr.prototype.visitList=d1;sr.prototype.visitFixedSizeList=p1;sr.prototype.visitUnion=m1;sr.prototype.visitDenseUnion=Kx;sr.prototype.visitSparseUnion=Qx;var Qn=new sr;var t0,e0={},n0={},se=class n{constructor(t){var e,i,r;let s=t[0]instanceof n?t.flatMap(a=>a.data):t;if(s.length===0||s.some(a=>!(a instanceof _e)))throw new TypeError("Vector constructor expects an Array of Data instances.");let o=(e=s[0])===null||e===void 0?void 0:e.type;switch(s.length){case 0:this._offsets=[0];break;case 1:{let{get:a,set:l,indexOf:c,byteLength:u}=e0[o.typeId],f=s[0];this.isValid=h=>Ul(f,h),this.get=h=>a(f,h),this.set=(h,p)=>l(f,h,p),this.indexOf=h=>c(f,h),this.getByteLength=h=>u(f,h),this._offsets=[0,f.length];break}default:Object.setPrototypeOf(this,n0[o.typeId]),this._offsets=Sh(s);break}this.data=s,this.type=o,this.stride=Kn(o),this.numChildren=(r=(i=o.children)===null||i===void 0?void 0:i.length)!==null&&r!==void 0?r:0,this.length=this._offsets[this._offsets.length-1]}get byteLength(){return this._byteLength===-1&&(this._byteLength=this.data.reduce((t,e)=>t+e.byteLength,0)),this._byteLength}get nullCount(){return this._nullCount===-1&&(this._nullCount=bh(this.data)),this._nullCount}get ArrayType(){return this.type.ArrayType}get[Symbol.toStringTag](){return`${this.VectorName}<${this.type[Symbol.toStringTag]}>`}get VectorName(){return`${L[this.type.typeId]}Vector`}isValid(t){return!1}get(t){return null}set(t,e){}indexOf(t,e){return-1}includes(t,e){return this.indexOf(t,e)>0}getByteLength(t){return 0}[Symbol.iterator](){return ba.visit(this)}concat(...t){return new n(this.data.concat(t.flatMap(e=>e.data).flat(Number.POSITIVE_INFINITY)))}slice(t,e){return new n(Fl(this,t,e,({data:i,_offsets:r},s,o)=>Mh(i,r,s,o)))}toJSON(){return[...this]}toArray(){let{type:t,data:e,length:i,stride:r,ArrayType:s}=this;switch(t.typeId){case L.Int:case L.Float:case L.Decimal:case L.Time:case L.Timestamp:switch(e.length){case 0:return new s;case 1:return e[0].values.subarray(0,i*r);default:return e.reduce((o,{values:a,length:l})=>(o.array.set(a.subarray(0,l*r),o.offset),o.offset+=l*r,o),{array:new s(i*r),offset:0}).array}}return[...this]}toString(){return`[${[...this].join(",")}]`}getChild(t){var e;return this.getChildAt((e=this.type.children)===null||e===void 0?void 0:e.findIndex(i=>i.name===t))}getChildAt(t){return t>-1&&t<this.numChildren?new n(this.data.map(({children:e})=>e[t])):null}get isMemoized(){return Et.isDictionary(this.type)?this.data[0].dictionary.isMemoized:!1}memoize(){if(Et.isDictionary(this.type)){let t=new Ah(this.data[0].dictionary),e=this.data.map(i=>{let r=i.clone();return r.dictionary=t,r});return new n(e)}return new Ah(this)}unmemoize(){if(Et.isDictionary(this.type)&&this.isMemoized){let t=this.data[0].dictionary.unmemoize(),e=this.data.map(i=>{let r=i.clone();return r.dictionary=t,r});return new n(e)}return this}};t0=Symbol.toStringTag;se[t0]=(n=>{n.type=Et.prototype,n.data=[],n.length=0,n.stride=1,n.numChildren=0,n._nullCount=-1,n._byteLength=-1,n._offsets=new Uint32Array([0]),n[Symbol.isConcatSpreadable]=!0;let t=Object.keys(L).map(e=>L[e]).filter(e=>typeof e=="number"&&e!==L.NONE);for(let e of t){let i=je.getVisitFnByTypeId(e),r=hn.getVisitFnByTypeId(e),s=so.getVisitFnByTypeId(e),o=Qn.getVisitFnByTypeId(e);e0[e]={get:i,set:r,indexOf:s,byteLength:o},n0[e]=Object.create(n,{isValid:{value:vs(Ul)},get:{value:vs(je.getVisitFnByTypeId(e))},set:{value:wh(hn.getVisitFnByTypeId(e))},indexOf:{value:Th(so.getVisitFnByTypeId(e))},getByteLength:{value:vs(Qn.getVisitFnByTypeId(e))}})}return"Vector"})(se.prototype);var Ah=class n extends se{constructor(t){super(t.data);let e=this.get,i=this.set,r=this.slice,s=new Array(this.length);Object.defineProperty(this,"get",{value(o){let a=s[o];if(a!==void 0)return a;let l=e.call(this,o);return s[o]=l,l}}),Object.defineProperty(this,"set",{value(o,a){i.call(this,o,a),s[o]=a}}),Object.defineProperty(this,"slice",{value:(o,a)=>new n(r.call(this,o,a))}),Object.defineProperty(this,"isMemoized",{value:!0}),Object.defineProperty(this,"unmemoize",{value:()=>new se(this.data)}),Object.defineProperty(this,"memoize",{value:()=>this})}};function i0(n){if(!n||n.length<=0)return function(r){return!0};let t="",e=n.filter(i=>i===i);return e.length>0&&(t=`
    switch (x) {${e.map(i=>`
        case ${g1(i)}:`).join("")}
            return false;
    }`),n.length!==e.length&&(t=`if (x !== x) return false;
${t}`),new Function("x",`${t}
return true;`)}function g1(n){return typeof n!="bigint"?Bi(n):zf?`${Bi(n)}n`:`"${Bi(n)}"`}var Fm=(n,t)=>(Math.ceil(n)*t+63&-64||64)/t,y1=(n,t=0)=>n.length>=t?n.subarray(0,t):da(new n.constructor(t),n,0),bs=class{constructor(t,e=1){this.buffer=t,this.stride=e,this.BYTES_PER_ELEMENT=t.BYTES_PER_ELEMENT,this.ArrayType=t.constructor,this._resize(this.length=Math.ceil(t.length/e))}get byteLength(){return Math.ceil(this.length*this.stride)*this.BYTES_PER_ELEMENT}get reservedLength(){return this.buffer.length/this.stride}get reservedByteLength(){return this.buffer.byteLength}set(t,e){return this}append(t){return this.set(this.length,t)}reserve(t){if(t>0){this.length+=t;let e=this.stride,i=this.length*e,r=this.buffer.length;i>=r&&this._resize(r===0?Fm(i*1,this.BYTES_PER_ELEMENT):Fm(i*2,this.BYTES_PER_ELEMENT))}return this}flush(t=this.length){t=Fm(t*this.stride,this.BYTES_PER_ELEMENT);let e=y1(this.buffer,t);return this.clear(),e}clear(){return this.length=0,this._resize(0),this}_resize(t){return this.buffer=da(new this.ArrayType(t),this.buffer)}};bs.prototype.offset=0;var Br=class extends bs{last(){return this.get(this.length-1)}get(t){return this.buffer[t]}set(t,e){return this.reserve(t-this.length+1),this.buffer[t*this.stride]=e,this}},Sa=class extends Br{constructor(t=new Uint8Array(0)){super(t,1/8),this.numValid=0}get numInvalid(){return this.length-this.numValid}get(t){return this.buffer[t>>3]>>t%8&1}set(t,e){let{buffer:i}=this.reserve(t-this.length+1),r=t>>3,s=t%8,o=i[r]>>s&1;return e?o===0&&(i[r]|=1<<s,++this.numValid):o===1&&(i[r]&=~(1<<s),--this.numValid),this}clear(){return this.numValid=0,super.clear()}},Ma=class extends Br{constructor(t=new Int32Array(1)){super(t,1)}append(t){return this.set(this.length-1,t)}set(t,e){let i=this.length-1,r=this.reserve(t-i+1).buffer;return i<t++&&r.fill(r[i],i,t),r[t]=r[t-1]+e,this}flush(t=this.length-1){return t>this.length&&this.set(t-1,0),super.flush(t+1)}};var De=class{constructor({type:t,nullValues:e}){this.length=0,this.finished=!1,this.type=t,this.children=[],this.nullValues=e,this.stride=Kn(t),this._nulls=new Sa,e&&e.length>0&&(this._isValid=i0(e))}static throughNode(t){throw new Error('"throughNode" not available in this environment')}static throughDOM(t){throw new Error('"throughDOM" not available in this environment')}toVector(){return new se([this.flush()])}get ArrayType(){return this.type.ArrayType}get nullCount(){return this._nulls.numInvalid}get numChildren(){return this.children.length}get byteLength(){let t=0,{_offsets:e,_values:i,_nulls:r,_typeIds:s,children:o}=this;return e&&(t+=e.byteLength),i&&(t+=i.byteLength),r&&(t+=r.byteLength),s&&(t+=s.byteLength),o.reduce((a,l)=>a+l.byteLength,t)}get reservedLength(){return this._nulls.reservedLength}get reservedByteLength(){let t=0;return this._offsets&&(t+=this._offsets.reservedByteLength),this._values&&(t+=this._values.reservedByteLength),this._nulls&&(t+=this._nulls.reservedByteLength),this._typeIds&&(t+=this._typeIds.reservedByteLength),this.children.reduce((e,i)=>e+i.reservedByteLength,t)}get valueOffsets(){return this._offsets?this._offsets.buffer:null}get values(){return this._values?this._values.buffer:null}get nullBitmap(){return this._nulls?this._nulls.buffer:null}get typeIds(){return this._typeIds?this._typeIds.buffer:null}append(t){return this.set(this.length,t)}isValid(t){return this._isValid(t)}set(t,e){return this.setValid(t,this.isValid(e))&&this.setValue(t,e),this}setValue(t,e){this._setValue(this,t,e)}setValid(t,e){return this.length=this._nulls.set(t,+e).length,e}addChild(t,e=`${this.numChildren}`){throw new Error(`Cannot append children to non-nested type "${this.type}"`)}getChildAt(t){return this.children[t]||null}flush(){let t,e,i,r,{type:s,length:o,nullCount:a,_typeIds:l,_offsets:c,_values:u,_nulls:f}=this;(e=l?.flush(o))?r=c?.flush(o):(r=c?.flush(o))?t=u?.flush(c.last()):t=u?.flush(o),a>0&&(i=f?.flush(o));let h=this.children.map(p=>p.flush());return this.clear(),Gt({type:s,length:o,nullCount:a,children:h,child:h[0],data:t,typeIds:e,nullBitmap:i,valueOffsets:r})}finish(){this.finished=!0;for(let t of this.children)t.finish();return this}clear(){var t,e,i,r;this.length=0,(t=this._nulls)===null||t===void 0||t.clear(),(e=this._values)===null||e===void 0||e.clear(),(i=this._offsets)===null||i===void 0||i.clear(),(r=this._typeIds)===null||r===void 0||r.clear();for(let s of this.children)s.clear();return this}};De.prototype.length=1;De.prototype.stride=1;De.prototype.children=null;De.prototype.finished=!1;De.prototype.nullValues=null;De.prototype._isValid=()=>!0;var an=class extends De{constructor(t){super(t),this._values=new Br(new this.ArrayType(0),this.stride)}setValue(t,e){let i=this._values;return i.reserve(t-i.length+1),super.setValue(t,e)}},or=class extends De{constructor(t){super(t),this._pendingLength=0,this._offsets=new Ma}setValue(t,e){let i=this._pending||(this._pending=new Map),r=i.get(t);r&&(this._pendingLength-=r.length),this._pendingLength+=e instanceof rr?e[mi].length:e.length,i.set(t,e)}setValid(t,e){return super.setValid(t,e)?!0:((this._pending||(this._pending=new Map)).set(t,void 0),!1)}clear(){return this._pendingLength=0,this._pending=void 0,super.clear()}flush(){return this._flush(),super.flush()}finish(){return this._flush(),super.finish()}_flush(){let t=this._pending,e=this._pendingLength;return this._pendingLength=0,this._pending=void 0,t&&t.size>0&&this._flushPending(t,e),this}};var oo=class{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}offset(){return this.bb.readInt64(this.bb_pos)}metaDataLength(){return this.bb.readInt32(this.bb_pos+8)}bodyLength(){return this.bb.readInt64(this.bb_pos+16)}static sizeOf(){return 24}static createBlock(t,e,i,r){return t.prep(8,24),t.writeInt64(r),t.pad(4),t.writeInt32(i),t.writeInt64(e),t.offset()}};var ar=new Int32Array(2),Eh=new Float32Array(ar.buffer),Ch=new Float64Array(ar.buffer),wa=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;var dn=class n{constructor(t,e){this.low=t|0,this.high=e|0}static create(t,e){return t==0&&e==0?n.ZERO:new n(t,e)}toFloat64(){return(this.low>>>0)+this.high*4294967296}equals(t){return this.low==t.low&&this.high==t.high}};dn.ZERO=new dn(0,0);var Nl;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(Nl||(Nl={}));var ti=class n{constructor(t){this.bytes_=t,this.position_=0}static allocate(t){return new n(new Uint8Array(t))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(t){this.position_=t}capacity(){return this.bytes_.length}readInt8(t){return this.readUint8(t)<<24>>24}readUint8(t){return this.bytes_[t]}readInt16(t){return this.readUint16(t)<<16>>16}readUint16(t){return this.bytes_[t]|this.bytes_[t+1]<<8}readInt32(t){return this.bytes_[t]|this.bytes_[t+1]<<8|this.bytes_[t+2]<<16|this.bytes_[t+3]<<24}readUint32(t){return this.readInt32(t)>>>0}readInt64(t){return new dn(this.readInt32(t),this.readInt32(t+4))}readUint64(t){return new dn(this.readUint32(t),this.readUint32(t+4))}readFloat32(t){return ar[0]=this.readInt32(t),Eh[0]}readFloat64(t){return ar[wa?0:1]=this.readInt32(t),ar[wa?1:0]=this.readInt32(t+4),Ch[0]}writeInt8(t,e){this.bytes_[t]=e}writeUint8(t,e){this.bytes_[t]=e}writeInt16(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8}writeUint16(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8}writeInt32(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8,this.bytes_[t+2]=e>>16,this.bytes_[t+3]=e>>24}writeUint32(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8,this.bytes_[t+2]=e>>16,this.bytes_[t+3]=e>>24}writeInt64(t,e){this.writeInt32(t,e.low),this.writeInt32(t+4,e.high)}writeUint64(t,e){this.writeUint32(t,e.low),this.writeUint32(t+4,e.high)}writeFloat32(t,e){Eh[0]=e,this.writeInt32(t,ar[0])}writeFloat64(t,e){Ch[0]=e,this.writeInt32(t,ar[wa?0:1]),this.writeInt32(t+4,ar[wa?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+4+4)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let t="";for(let e=0;e<4;e++)t+=String.fromCharCode(this.readInt8(this.position_+4+e));return t}__offset(t,e){let i=t-this.readInt32(t);return e<this.readInt16(i)?this.readInt16(i+e):0}__union(t,e){return t.bb_pos=e+this.readInt32(e),t.bb=this,t}__string(t,e){t+=this.readInt32(t);let i=this.readInt32(t),r="",s=0;if(t+=4,e===Nl.UTF8_BYTES)return this.bytes_.subarray(t,t+i);for(;s<i;){let o,a=this.readUint8(t+s++);if(a<192)o=a;else{let l=this.readUint8(t+s++);if(a<224)o=(a&31)<<6|l&63;else{let c=this.readUint8(t+s++);if(a<240)o=(a&15)<<12|(l&63)<<6|c&63;else{let u=this.readUint8(t+s++);o=(a&7)<<18|(l&63)<<12|(c&63)<<6|u&63}}}o<65536?r+=String.fromCharCode(o):(o-=65536,r+=String.fromCharCode((o>>10)+55296,(o&1023)+56320))}return r}__union_with_string(t,e){return typeof t=="string"?this.__string(e):this.__union(t,e)}__indirect(t){return t+this.readInt32(t)}__vector(t){return t+this.readInt32(t)+4}__vector_len(t){return this.readInt32(t+this.readInt32(t))}__has_identifier(t){if(t.length!=4)throw new Error("FlatBuffers: file identifier must be length "+4);for(let e=0;e<4;e++)if(t.charCodeAt(e)!=this.readInt8(this.position()+4+e))return!1;return!0}createLong(t,e){return dn.create(t,e)}createScalarList(t,e){let i=[];for(let r=0;r<e;++r)t(r)!==null&&i.push(t(r));return i}createObjList(t,e){let i=[];for(let r=0;r<e;++r){let s=t(r);s!==null&&i.push(s.unpack())}return i}};var ao=class n{constructor(t){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null;let e;t?e=t:e=1024,this.bb=ti.allocate(e),this.space=e}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(t){this.force_defaults=t}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(t,e){t>this.minalign&&(this.minalign=t);let i=~(this.bb.capacity()-this.space+e)+1&t-1;for(;this.space<i+t+e;){let r=this.bb.capacity();this.bb=n.growByteBuffer(this.bb),this.space+=this.bb.capacity()-r}this.pad(i)}pad(t){for(let e=0;e<t;e++)this.bb.writeInt8(--this.space,0)}writeInt8(t){this.bb.writeInt8(this.space-=1,t)}writeInt16(t){this.bb.writeInt16(this.space-=2,t)}writeInt32(t){this.bb.writeInt32(this.space-=4,t)}writeInt64(t){this.bb.writeInt64(this.space-=8,t)}writeFloat32(t){this.bb.writeFloat32(this.space-=4,t)}writeFloat64(t){this.bb.writeFloat64(this.space-=8,t)}addInt8(t){this.prep(1,0),this.writeInt8(t)}addInt16(t){this.prep(2,0),this.writeInt16(t)}addInt32(t){this.prep(4,0),this.writeInt32(t)}addInt64(t){this.prep(8,0),this.writeInt64(t)}addFloat32(t){this.prep(4,0),this.writeFloat32(t)}addFloat64(t){this.prep(8,0),this.writeFloat64(t)}addFieldInt8(t,e,i){(this.force_defaults||e!=i)&&(this.addInt8(e),this.slot(t))}addFieldInt16(t,e,i){(this.force_defaults||e!=i)&&(this.addInt16(e),this.slot(t))}addFieldInt32(t,e,i){(this.force_defaults||e!=i)&&(this.addInt32(e),this.slot(t))}addFieldInt64(t,e,i){(this.force_defaults||!e.equals(i))&&(this.addInt64(e),this.slot(t))}addFieldFloat32(t,e,i){(this.force_defaults||e!=i)&&(this.addFloat32(e),this.slot(t))}addFieldFloat64(t,e,i){(this.force_defaults||e!=i)&&(this.addFloat64(e),this.slot(t))}addFieldOffset(t,e,i){(this.force_defaults||e!=i)&&(this.addOffset(e),this.slot(t))}addFieldStruct(t,e,i){e!=i&&(this.nested(e),this.slot(t))}nested(t){if(t!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")}slot(t){this.vtable!==null&&(this.vtable[t]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(t){let e=t.capacity();if(e&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let i=e<<1,r=ti.allocate(i);return r.setPosition(i-e),r.bytes().set(t.bytes(),i-e),r}addOffset(t){this.prep(4,0),this.writeInt32(this.offset()-t+4)}startObject(t){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=t;for(let e=0;e<t;e++)this.vtable[e]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let t=this.offset(),e=this.vtable_in_use-1;for(;e>=0&&this.vtable[e]==0;e--);let i=e+1;for(;e>=0;e--)this.addInt16(this.vtable[e]!=0?t-this.vtable[e]:0);let r=2;this.addInt16(t-this.object_start);let s=(i+r)*2;this.addInt16(s);let o=0,a=this.space;t:for(e=0;e<this.vtables.length;e++){let l=this.bb.capacity()-this.vtables[e];if(s==this.bb.readInt16(l)){for(let c=2;c<s;c+=2)if(this.bb.readInt16(a+c)!=this.bb.readInt16(l+c))continue t;o=this.vtables[e];break}}return o?(this.space=this.bb.capacity()-t,this.bb.writeInt32(this.space,o-t)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-t,this.offset()-t)),this.isNested=!1,t}finish(t,e,i){let r=i?4:0;if(e){let s=e;if(this.prep(this.minalign,8+r),s.length!=4)throw new Error("FlatBuffers: file identifier must be length "+4);for(let o=3;o>=0;o--)this.writeInt8(s.charCodeAt(o))}this.prep(this.minalign,4+r),this.addOffset(t),r&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(t,e){this.finish(t,e,!0)}requiredField(t,e){let i=this.bb.capacity()-t,r=i-this.bb.readInt32(i);if(!(this.bb.readInt16(r+e)!=0))throw new Error("FlatBuffers: field "+e+" must be set")}startVector(t,e,i){this.notNested(),this.vector_num_elems=e,this.prep(4,t*e),this.prep(i,t*e)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(t){if(!t)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(t))return this.string_maps.get(t);let e=this.createString(t);return this.string_maps.set(t,e),e}createString(t){if(!t)return 0;let e;if(t instanceof Uint8Array)e=t;else{e=[];let i=0;for(;i<t.length;){let r,s=t.charCodeAt(i++);if(s<55296||s>=56320)r=s;else{let o=t.charCodeAt(i++);r=(s<<10)+o+-56613888}r<128?e.push(r):(r<2048?e.push(r>>6&31|192):(r<65536?e.push(r>>12&15|224):e.push(r>>18&7|240,r>>12&63|128),e.push(r>>6&63|128)),e.push(r&63|128))}}this.addInt8(0),this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length);for(let i=0,r=this.space,s=this.bb.bytes();i<e.length;i++)s[r++]=e[i];return this.endVector()}createLong(t,e){return dn.create(t,e)}createObjectOffset(t){return t===null?0:typeof t=="string"?this.createString(t):t.pack(this)}createObjectOffsetList(t){let e=[];for(let i=0;i<t.length;++i){let r=t[i];if(r!==null)e.push(this.createObjectOffset(r));else throw new Error("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return e}createStructOffsetList(t,e){return e(this,t.length),this.createObjectOffsetList(t),this.endVector()}};var tn=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsKeyValue(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKeyValue(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}key(t){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__string(this.bb_pos+e,t):null}value(t){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__string(this.bb_pos+e,t):null}static startKeyValue(t){t.startObject(2)}static addKey(t,e){t.addFieldOffset(0,e,0)}static addValue(t,e){t.addFieldOffset(1,e,0)}static endKeyValue(t){return t.endObject()}static createKeyValue(t,e,i){return n.startKeyValue(t),n.addKey(t,e),n.addValue(t,i),n.endKeyValue(t)}};var Ss;(function(n){n[n.V1=0]="V1",n[n.V2=1]="V2",n[n.V3=2]="V3",n[n.V4=3]="V4",n[n.V5=4]="V5"})(Ss||(Ss={}));var Ms;(function(n){n[n.Little=0]="Little",n[n.Big=1]="Big"})(Ms||(Ms={}));var kl;(function(n){n[n.DenseArray=0]="DenseArray"})(kl||(kl={}));var Wi=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsInt(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsInt(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}bitWidth(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt32(this.bb_pos+t):0}isSigned(){let t=this.bb.__offset(this.bb_pos,6);return t?!!this.bb.readInt8(this.bb_pos+t):!1}static startInt(t){t.startObject(2)}static addBitWidth(t,e){t.addFieldInt32(0,e,0)}static addIsSigned(t,e){t.addFieldInt8(1,+e,0)}static endInt(t){return t.endObject()}static createInt(t,e,i){return n.startInt(t),n.addBitWidth(t,e),n.addIsSigned(t,i),n.endInt(t)}};var lr=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDictionaryEncoding(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDictionaryEncoding(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}id(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt64(this.bb_pos+t):this.bb.createLong(0,0)}indexType(t){let e=this.bb.__offset(this.bb_pos,6);return e?(t||new Wi).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}isOrdered(){let t=this.bb.__offset(this.bb_pos,8);return t?!!this.bb.readInt8(this.bb_pos+t):!1}dictionaryKind(){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt16(this.bb_pos+t):kl.DenseArray}static startDictionaryEncoding(t){t.startObject(4)}static addId(t,e){t.addFieldInt64(0,e,t.createLong(0,0))}static addIndexType(t,e){t.addFieldOffset(1,e,0)}static addIsOrdered(t,e){t.addFieldInt8(2,+e,0)}static addDictionaryKind(t,e){t.addFieldInt16(3,e,kl.DenseArray)}static endDictionaryEncoding(t){return t.endObject()}};var zl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsBinary(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsBinary(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startBinary(t){t.startObject(0)}static endBinary(t){return t.endObject()}static createBinary(t){return n.startBinary(t),n.endBinary(t)}};var Vl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsBool(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsBool(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startBool(t){t.startObject(0)}static endBool(t){return t.endObject()}static createBool(t){return n.startBool(t),n.endBool(t)}};var Hl;(function(n){n[n.DAY=0]="DAY",n[n.MILLISECOND=1]="MILLISECOND"})(Hl||(Hl={}));var ws=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDate(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDate(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}unit(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Hl.MILLISECOND}static startDate(t){t.startObject(1)}static addUnit(t,e){t.addFieldInt16(0,e,Hl.MILLISECOND)}static endDate(t){return t.endObject()}static createDate(t,e){return n.startDate(t),n.addUnit(t,e),n.endDate(t)}};var cr=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDecimal(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDecimal(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}precision(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt32(this.bb_pos+t):0}scale(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt32(this.bb_pos+t):0}bitWidth(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt32(this.bb_pos+t):128}static startDecimal(t){t.startObject(3)}static addPrecision(t,e){t.addFieldInt32(0,e,0)}static addScale(t,e){t.addFieldInt32(1,e,0)}static addBitWidth(t,e){t.addFieldInt32(2,e,128)}static endDecimal(t){return t.endObject()}static createDecimal(t,e,i,r){return n.startDecimal(t),n.addPrecision(t,e),n.addScale(t,i),n.addBitWidth(t,r),n.endDecimal(t)}};var Ts;(function(n){n[n.SECOND=0]="SECOND",n[n.MILLISECOND=1]="MILLISECOND",n[n.MICROSECOND=2]="MICROSECOND",n[n.NANOSECOND=3]="NANOSECOND"})(Ts||(Ts={}));var As=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsFixedSizeBinary(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsFixedSizeBinary(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}byteWidth(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt32(this.bb_pos+t):0}static startFixedSizeBinary(t){t.startObject(1)}static addByteWidth(t,e){t.addFieldInt32(0,e,0)}static endFixedSizeBinary(t){return t.endObject()}static createFixedSizeBinary(t,e){return n.startFixedSizeBinary(t),n.addByteWidth(t,e),n.endFixedSizeBinary(t)}};var Es=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsFixedSizeList(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsFixedSizeList(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}listSize(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt32(this.bb_pos+t):0}static startFixedSizeList(t){t.startObject(1)}static addListSize(t,e){t.addFieldInt32(0,e,0)}static endFixedSizeList(t){return t.endObject()}static createFixedSizeList(t,e){return n.startFixedSizeList(t),n.addListSize(t,e),n.endFixedSizeList(t)}};var Gl;(function(n){n[n.HALF=0]="HALF",n[n.SINGLE=1]="SINGLE",n[n.DOUBLE=2]="DOUBLE"})(Gl||(Gl={}));var Cs=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsFloatingPoint(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsFloatingPoint(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}precision(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Gl.HALF}static startFloatingPoint(t){t.startObject(1)}static addPrecision(t,e){t.addFieldInt16(0,e,Gl.HALF)}static endFloatingPoint(t){return t.endObject()}static createFloatingPoint(t,e){return n.startFloatingPoint(t),n.addPrecision(t,e),n.endFloatingPoint(t)}};var Wl;(function(n){n[n.YEAR_MONTH=0]="YEAR_MONTH",n[n.DAY_TIME=1]="DAY_TIME",n[n.MONTH_DAY_NANO=2]="MONTH_DAY_NANO"})(Wl||(Wl={}));var Is=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsInterval(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsInterval(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}unit(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Wl.YEAR_MONTH}static startInterval(t){t.startObject(1)}static addUnit(t,e){t.addFieldInt16(0,e,Wl.YEAR_MONTH)}static endInterval(t){return t.endObject()}static createInterval(t,e){return n.startInterval(t),n.addUnit(t,e),n.endInterval(t)}};var Xl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsList(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsList(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startList(t){t.startObject(0)}static endList(t){return t.endObject()}static createList(t){return n.startList(t),n.endList(t)}};var Rs=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsMap(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMap(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}keysSorted(){let t=this.bb.__offset(this.bb_pos,4);return t?!!this.bb.readInt8(this.bb_pos+t):!1}static startMap(t){t.startObject(1)}static addKeysSorted(t,e){t.addFieldInt8(0,+e,0)}static endMap(t){return t.endObject()}static createMap(t,e){return n.startMap(t),n.addKeysSorted(t,e),n.endMap(t)}};var ql=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsNull(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNull(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startNull(t){t.startObject(0)}static endNull(t){return t.endObject()}static createNull(t){return n.startNull(t),n.endNull(t)}};var Yl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsStruct_(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsStruct_(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startStruct_(t){t.startObject(0)}static endStruct_(t){return t.endObject()}static createStruct_(t){return n.startStruct_(t),n.endStruct_(t)}};var Or=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsTime(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTime(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}unit(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Ts.MILLISECOND}bitWidth(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt32(this.bb_pos+t):32}static startTime(t){t.startObject(2)}static addUnit(t,e){t.addFieldInt16(0,e,Ts.MILLISECOND)}static addBitWidth(t,e){t.addFieldInt32(1,e,32)}static endTime(t){return t.endObject()}static createTime(t,e,i){return n.startTime(t),n.addUnit(t,e),n.addBitWidth(t,i),n.endTime(t)}};var Ur=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsTimestamp(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTimestamp(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}unit(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Ts.SECOND}timezone(t){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__string(this.bb_pos+e,t):null}static startTimestamp(t){t.startObject(2)}static addUnit(t,e){t.addFieldInt16(0,e,Ts.SECOND)}static addTimezone(t,e){t.addFieldOffset(1,e,0)}static endTimestamp(t){return t.endObject()}static createTimestamp(t,e,i){return n.startTimestamp(t),n.addUnit(t,e),n.addTimezone(t,i),n.endTimestamp(t)}};var jl;(function(n){n[n.Sparse=0]="Sparse",n[n.Dense=1]="Dense"})(jl||(jl={}));var Xi=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsUnion(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsUnion(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}mode(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):jl.Sparse}typeIds(t){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt32(this.bb.__vector(this.bb_pos+e)+t*4):0}typeIdsLength(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}typeIdsArray(){let t=this.bb.__offset(this.bb_pos,6);return t?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}static startUnion(t){t.startObject(2)}static addMode(t,e){t.addFieldInt16(0,e,jl.Sparse)}static addTypeIds(t,e){t.addFieldOffset(1,e,0)}static createTypeIdsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addInt32(e[i]);return t.endVector()}static startTypeIdsVector(t,e){t.startVector(4,e,4)}static endUnion(t){return t.endObject()}static createUnion(t,e,i){return n.startUnion(t),n.addMode(t,e),n.addTypeIds(t,i),n.endUnion(t)}};var $l=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsUtf8(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsUtf8(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startUtf8(t){t.startObject(0)}static endUtf8(t){return t.endObject()}static createUtf8(t){return n.startUtf8(t),n.endUtf8(t)}};var Pe;(function(n){n[n.NONE=0]="NONE",n[n.Null=1]="Null",n[n.Int=2]="Int",n[n.FloatingPoint=3]="FloatingPoint",n[n.Binary=4]="Binary",n[n.Utf8=5]="Utf8",n[n.Bool=6]="Bool",n[n.Decimal=7]="Decimal",n[n.Date=8]="Date",n[n.Time=9]="Time",n[n.Timestamp=10]="Timestamp",n[n.Interval=11]="Interval",n[n.List=12]="List",n[n.Struct_=13]="Struct_",n[n.Union=14]="Union",n[n.FixedSizeBinary=15]="FixedSizeBinary",n[n.FixedSizeList=16]="FixedSizeList",n[n.Map=17]="Map",n[n.Duration=18]="Duration",n[n.LargeBinary=19]="LargeBinary",n[n.LargeUtf8=20]="LargeUtf8",n[n.LargeList=21]="LargeList"})(Pe||(Pe={}));var Sn=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsField(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsField(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}name(t){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__string(this.bb_pos+e,t):null}nullable(){let t=this.bb.__offset(this.bb_pos,6);return t?!!this.bb.readInt8(this.bb_pos+t):!1}typeType(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readUint8(this.bb_pos+t):Pe.NONE}type(t){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__union(t,this.bb_pos+e):null}dictionary(t){let e=this.bb.__offset(this.bb_pos,12);return e?(t||new lr).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}children(t,e){let i=this.bb.__offset(this.bb_pos,14);return i?(e||new n).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}childrenLength(){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__vector_len(this.bb_pos+t):0}customMetadata(t,e){let i=this.bb.__offset(this.bb_pos,16);return i?(e||new tn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}customMetadataLength(){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__vector_len(this.bb_pos+t):0}static startField(t){t.startObject(7)}static addName(t,e){t.addFieldOffset(0,e,0)}static addNullable(t,e){t.addFieldInt8(1,+e,0)}static addTypeType(t,e){t.addFieldInt8(2,e,Pe.NONE)}static addType(t,e){t.addFieldOffset(3,e,0)}static addDictionary(t,e){t.addFieldOffset(4,e,0)}static addChildren(t,e){t.addFieldOffset(5,e,0)}static createChildrenVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startChildrenVector(t,e){t.startVector(4,e,4)}static addCustomMetadata(t,e){t.addFieldOffset(6,e,0)}static createCustomMetadataVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startCustomMetadataVector(t,e){t.startVector(4,e,4)}static endField(t){return t.endObject()}};var Ln=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsSchema(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSchema(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}endianness(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Ms.Little}fields(t,e){let i=this.bb.__offset(this.bb_pos,6);return i?(e||new Sn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}fieldsLength(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}customMetadata(t,e){let i=this.bb.__offset(this.bb_pos,8);return i?(e||new tn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}customMetadataLength(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}features(t){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt64(this.bb.__vector(this.bb_pos+e)+t*8):this.bb.createLong(0,0)}featuresLength(){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__vector_len(this.bb_pos+t):0}static startSchema(t){t.startObject(4)}static addEndianness(t,e){t.addFieldInt16(0,e,Ms.Little)}static addFields(t,e){t.addFieldOffset(1,e,0)}static createFieldsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startFieldsVector(t,e){t.startVector(4,e,4)}static addCustomMetadata(t,e){t.addFieldOffset(2,e,0)}static createCustomMetadataVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startCustomMetadataVector(t,e){t.startVector(4,e,4)}static addFeatures(t,e){t.addFieldOffset(3,e,0)}static createFeaturesVector(t,e){t.startVector(8,e.length,8);for(let i=e.length-1;i>=0;i--)t.addInt64(e[i]);return t.endVector()}static startFeaturesVector(t,e){t.startVector(8,e,8)}static endSchema(t){return t.endObject()}static finishSchemaBuffer(t,e){t.finish(e)}static finishSizePrefixedSchemaBuffer(t,e){t.finish(e,void 0,!0)}static createSchema(t,e,i,r,s){return n.startSchema(t),n.addEndianness(t,e),n.addFields(t,i),n.addCustomMetadata(t,r),n.addFeatures(t,s),n.endSchema(t)}};var ei=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsFooter(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsFooter(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}version(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Ss.V1}schema(t){let e=this.bb.__offset(this.bb_pos,6);return e?(t||new Ln).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}dictionaries(t,e){let i=this.bb.__offset(this.bb_pos,8);return i?(e||new oo).__init(this.bb.__vector(this.bb_pos+i)+t*24,this.bb):null}dictionariesLength(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}recordBatches(t,e){let i=this.bb.__offset(this.bb_pos,10);return i?(e||new oo).__init(this.bb.__vector(this.bb_pos+i)+t*24,this.bb):null}recordBatchesLength(){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__vector_len(this.bb_pos+t):0}customMetadata(t,e){let i=this.bb.__offset(this.bb_pos,12);return i?(e||new tn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}customMetadataLength(){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__vector_len(this.bb_pos+t):0}static startFooter(t){t.startObject(5)}static addVersion(t,e){t.addFieldInt16(0,e,Ss.V1)}static addSchema(t,e){t.addFieldOffset(1,e,0)}static addDictionaries(t,e){t.addFieldOffset(2,e,0)}static startDictionariesVector(t,e){t.startVector(24,e,8)}static addRecordBatches(t,e){t.addFieldOffset(3,e,0)}static startRecordBatchesVector(t,e){t.startVector(24,e,8)}static addCustomMetadata(t,e){t.addFieldOffset(4,e,0)}static createCustomMetadataVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startCustomMetadataVector(t,e){t.startVector(4,e,4)}static endFooter(t){return t.endObject()}static finishFooterBuffer(t,e){t.finish(e)}static finishSizePrefixedFooterBuffer(t,e){t.finish(e,void 0,!0)}};var he=class n{constructor(t=[],e,i){this.fields=t||[],this.metadata=e||new Map,i||(i=Bm(t)),this.dictionaries=i}get[Symbol.toStringTag](){return"Schema"}get names(){return this.fields.map(t=>t.name)}toString(){return`Schema<{ ${this.fields.map((t,e)=>`${e}: ${t}`).join(", ")} }>`}select(t){let e=new Set(t),i=this.fields.filter(r=>e.has(r.name));return new n(i,this.metadata)}selectAt(t){let e=t.map(i=>this.fields[i]).filter(Boolean);return new n(e,this.metadata)}assign(...t){let e=t[0]instanceof n?t[0]:Array.isArray(t[0])?new n(t[0]):new n(t),i=[...this.fields],r=Rh(Rh(new Map,this.metadata),e.metadata),s=e.fields.filter(a=>{let l=i.findIndex(c=>c.name===a.name);return~l?(i[l]=a.clone({metadata:Rh(Rh(new Map,i[l].metadata),a.metadata)}))&&!1:!0}),o=Bm(s,new Map);return new n([...i,...s],r,new Map([...this.dictionaries,...o]))}};he.prototype.fields=null;he.prototype.metadata=null;he.prototype.dictionaries=null;var ne=class n{constructor(t,e,i=!1,r){this.name=t,this.type=e,this.nullable=i,this.metadata=r||new Map}static new(...t){let[e,i,r,s]=t;return t[0]&&typeof t[0]=="object"&&({name:e}=t[0],i===void 0&&(i=t[0].type),r===void 0&&(r=t[0].nullable),s===void 0&&(s=t[0].metadata)),new n(`${e}`,i,r,s)}get typeId(){return this.type.typeId}get[Symbol.toStringTag](){return"Field"}toString(){return`${this.name}: ${this.type}`}clone(...t){let[e,i,r,s]=t;return!t[0]||typeof t[0]!="object"?[e=this.name,i=this.type,r=this.nullable,s=this.metadata]=t:{name:e=this.name,type:i=this.type,nullable:r=this.nullable,metadata:s=this.metadata}=t[0],n.new(e,i,r,s)}};ne.prototype.type=null;ne.prototype.name=null;ne.prototype.nullable=null;ne.prototype.metadata=null;function Rh(n,t){return new Map([...n||new Map,...t||new Map])}function Bm(n,t=new Map){for(let e=-1,i=n.length;++e<i;){let s=n[e].type;if(Et.isDictionary(s)){if(!t.has(s.id))t.set(s.id,s.dictionary);else if(t.get(s.id)!==s.dictionary)throw new Error("Cannot create Schema containing two different dictionaries with the same Id")}s.children&&s.children.length>0&&Bm(s.children,t)}return t}var r0=dn,_1=ao,x1=ti,Nr=class{constructor(t,e=on.V4,i,r){this.schema=t,this.version=e,i&&(this._recordBatches=i),r&&(this._dictionaryBatches=r)}static decode(t){t=new x1(zt(t));let e=ei.getRootAsFooter(t),i=he.decode(e.schema());return new Om(i,e)}static encode(t){let e=new _1,i=he.encode(e,t.schema);ei.startRecordBatchesVector(e,t.numRecordBatches);for(let o of[...t.recordBatches()].slice().reverse())kr.encode(e,o);let r=e.endVector();ei.startDictionariesVector(e,t.numDictionaries);for(let o of[...t.dictionaryBatches()].slice().reverse())kr.encode(e,o);let s=e.endVector();return ei.startFooter(e),ei.addSchema(e,i),ei.addVersion(e,on.V4),ei.addRecordBatches(e,r),ei.addDictionaries(e,s),ei.finishFooterBuffer(e,ei.endFooter(e)),e.asUint8Array()}get numRecordBatches(){return this._recordBatches.length}get numDictionaries(){return this._dictionaryBatches.length}*recordBatches(){for(let t,e=-1,i=this.numRecordBatches;++e<i;)(t=this.getRecordBatch(e))&&(yield t)}*dictionaryBatches(){for(let t,e=-1,i=this.numDictionaries;++e<i;)(t=this.getDictionaryBatch(e))&&(yield t)}getRecordBatch(t){return t>=0&&t<this.numRecordBatches&&this._recordBatches[t]||null}getDictionaryBatch(t){return t>=0&&t<this.numDictionaries&&this._dictionaryBatches[t]||null}};var Om=class extends Nr{constructor(t,e){super(t,e.version()),this._footer=e}get numRecordBatches(){return this._footer.recordBatchesLength()}get numDictionaries(){return this._footer.dictionariesLength()}getRecordBatch(t){if(t>=0&&t<this.numRecordBatches){let e=this._footer.recordBatches(t);if(e)return kr.decode(e)}return null}getDictionaryBatch(t){if(t>=0&&t<this.numDictionaries){let e=this._footer.dictionaries(t);if(e)return kr.decode(e)}return null}},kr=class n{constructor(t,e,i){this.metaDataLength=t,this.offset=typeof i=="number"?i:i.low,this.bodyLength=typeof e=="number"?e:e.low}static decode(t){return new n(t.metaDataLength(),t.bodyLength(),t.offset())}static encode(t,e){let{metaDataLength:i}=e,r=new r0(e.offset,0),s=new r0(e.bodyLength,0);return oo.createBlock(t,r,i,s)}};var Ae=Object.freeze({done:!0,value:void 0}),Zl=class{constructor(t){this._json=t}get schema(){return this._json.schema}get batches(){return this._json.batches||[]}get dictionaries(){return this._json.dictionaries||[]}},lo=class{tee(){return this._getDOMStream().tee()}pipe(t,e){return this._getNodeStream().pipe(t,e)}pipeTo(t,e){return this._getDOMStream().pipeTo(t,e)}pipeThrough(t,e){return this._getDOMStream().pipeThrough(t,e)}_getDOMStream(){return this._DOMStream||(this._DOMStream=this.toDOMStream())}_getNodeStream(){return this._nodeStream||(this._nodeStream=this.toNodeStream())}},Dh=class extends lo{constructor(){super(),this._values=[],this.resolvers=[],this._closedPromise=new Promise(t=>this._closedPromiseResolve=t)}get closed(){return this._closedPromise}cancel(t){return ut(this,void 0,void 0,function*(){yield this.return(t)})}write(t){this._ensureOpen()&&(this.resolvers.length<=0?this._values.push(t):this.resolvers.shift().resolve({done:!1,value:t}))}abort(t){this._closedPromiseResolve&&(this.resolvers.length<=0?this._error={error:t}:this.resolvers.shift().reject({done:!0,value:t}))}close(){if(this._closedPromiseResolve){let{resolvers:t}=this;for(;t.length>0;)t.shift().resolve(Ae);this._closedPromiseResolve(),this._closedPromiseResolve=void 0}}[Symbol.asyncIterator](){return this}toDOMStream(t){return un.toDOMStream(this._closedPromiseResolve||this._error?this:this._values,t)}toNodeStream(t){return un.toNodeStream(this._closedPromiseResolve||this._error?this:this._values,t)}throw(t){return ut(this,void 0,void 0,function*(){return yield this.abort(t),Ae})}return(t){return ut(this,void 0,void 0,function*(){return yield this.close(),Ae})}read(t){return ut(this,void 0,void 0,function*(){return(yield this.next(t,"read")).value})}peek(t){return ut(this,void 0,void 0,function*(){return(yield this.next(t,"peek")).value})}next(...t){return this._values.length>0?Promise.resolve({done:!1,value:this._values.shift()}):this._error?Promise.reject({done:!0,value:this._error.error}):this._closedPromiseResolve?new Promise((e,i)=>{this.resolvers.push({resolve:e,reject:i})}):Promise.resolve(Ae)}_ensureOpen(){if(this._closedPromiseResolve)return!0;throw new Error("AsyncQueue is closed")}};var ur=class extends Dh{write(t){if((t=zt(t)).byteLength>0)return super.write(t)}toString(t=!1){return t?Cl(this.toUint8Array(!0)):this.toUint8Array(!1).then(Cl)}toUint8Array(t=!1){return t?Zn(this._values)[0]:ut(this,void 0,void 0,function*(){var e,i;let r=[],s=0;try{for(var o=Pi(this),a;a=yield o.next(),!a.done;){let l=a.value;r.push(l),s+=l.byteLength}}catch(l){e={error:l}}finally{try{a&&!a.done&&(i=o.return)&&(yield i.call(o))}finally{if(e)throw e.error}}return Zn(r,s)[0]})}},fr=class{constructor(t){t&&(this.source=new Um(un.fromIterable(t)))}[Symbol.iterator](){return this}next(t){return this.source.next(t)}throw(t){return this.source.throw(t)}return(t){return this.source.return(t)}peek(t){return this.source.peek(t)}read(t){return this.source.read(t)}},yi=class n{constructor(t){t instanceof n?this.source=t.source:t instanceof ur?this.source=new zr(un.fromAsyncIterable(t)):qf(t)?this.source=new zr(un.fromNodeStream(t)):Il(t)?this.source=new zr(un.fromDOMStream(t)):Wf(t)?this.source=new zr(un.fromDOMStream(t.body)):Li(t)?this.source=new zr(un.fromIterable(t)):$n(t)?this.source=new zr(un.fromAsyncIterable(t)):di(t)&&(this.source=new zr(un.fromAsyncIterable(t)))}[Symbol.asyncIterator](){return this}next(t){return this.source.next(t)}throw(t){return this.source.throw(t)}return(t){return this.source.return(t)}get closed(){return this.source.closed}cancel(t){return this.source.cancel(t)}peek(t){return this.source.peek(t)}read(t){return this.source.read(t)}},Um=class{constructor(t){this.source=t}cancel(t){this.return(t)}peek(t){return this.next(t,"peek").value}read(t){return this.next(t,"read").value}next(t,e="read"){return this.source.next({cmd:e,size:t})}throw(t){return Object.create(this.source.throw&&this.source.throw(t)||Ae)}return(t){return Object.create(this.source.return&&this.source.return(t)||Ae)}},zr=class{constructor(t){this.source=t,this._closedPromise=new Promise(e=>this._closedPromiseResolve=e)}cancel(t){return ut(this,void 0,void 0,function*(){yield this.return(t)})}get closed(){return this._closedPromise}read(t){return ut(this,void 0,void 0,function*(){return(yield this.next(t,"read")).value})}peek(t){return ut(this,void 0,void 0,function*(){return(yield this.next(t,"peek")).value})}next(t,e="read"){return ut(this,void 0,void 0,function*(){return yield this.source.next({cmd:e,size:t})})}throw(t){return ut(this,void 0,void 0,function*(){let e=this.source.throw&&(yield this.source.throw(t))||Ae;return this._closedPromiseResolve&&this._closedPromiseResolve(),this._closedPromiseResolve=void 0,Object.create(e)})}return(t){return ut(this,void 0,void 0,function*(){let e=this.source.return&&(yield this.source.return(t))||Ae;return this._closedPromiseResolve&&this._closedPromiseResolve(),this._closedPromiseResolve=void 0,Object.create(e)})}};var Jl=class extends fr{constructor(t,e){super(),this.position=0,this.buffer=zt(t),this.size=typeof e>"u"?this.buffer.byteLength:e}readInt32(t){let{buffer:e,byteOffset:i}=this.readAt(t,4);return new DataView(e,i).getInt32(0,!0)}seek(t){return this.position=Math.min(t,this.size),t<this.size}read(t){let{buffer:e,size:i,position:r}=this;return e&&r<i?(typeof t!="number"&&(t=Number.POSITIVE_INFINITY),this.position=Math.min(i,r+Math.min(i-r,t)),e.subarray(r,this.position)):null}readAt(t,e){let i=this.buffer,r=Math.min(this.size,t+e);return i?i.subarray(t,r):new Uint8Array(e)}close(){this.buffer&&(this.buffer=null)}throw(t){return this.close(),{done:!0,value:t}}return(t){return this.close(),{done:!0,value:t}}},Ds=class extends yi{constructor(t,e){super(),this.position=0,this._handle=t,typeof e=="number"?this.size=e:this._pending=ut(this,void 0,void 0,function*(){this.size=(yield t.stat()).size,delete this._pending})}readInt32(t){return ut(this,void 0,void 0,function*(){let{buffer:e,byteOffset:i}=yield this.readAt(t,4);return new DataView(e,i).getInt32(0,!0)})}seek(t){return ut(this,void 0,void 0,function*(){return this._pending&&(yield this._pending),this.position=Math.min(t,this.size),t<this.size})}read(t){return ut(this,void 0,void 0,function*(){this._pending&&(yield this._pending);let{_handle:e,size:i,position:r}=this;if(e&&r<i){typeof t!="number"&&(t=Number.POSITIVE_INFINITY);let s=r,o=0,a=0,l=Math.min(i,s+Math.min(i-s,t)),c=new Uint8Array(Math.max(0,(this.position=l)-s));for(;(s+=a)<l&&(o+=a)<c.byteLength;)({bytesRead:a}=yield e.read(c,o,c.byteLength-o,s));return c}return null})}readAt(t,e){return ut(this,void 0,void 0,function*(){this._pending&&(yield this._pending);let{_handle:i,size:r}=this;if(i&&t+e<r){let s=Math.min(r,t+e),o=new Uint8Array(s-t);return(yield i.read(o,0,e,t)).buffer}return new Uint8Array(e)})}close(){return ut(this,void 0,void 0,function*(){let t=this._handle;this._handle=null,t&&(yield t.close())})}throw(t){return ut(this,void 0,void 0,function*(){return yield this.close(),{done:!0,value:t}})}return(t){return ut(this,void 0,void 0,function*(){return yield this.close(),{done:!0,value:t}})}};var km={};Do(km,{BaseInt64:()=>Kl,Int128:()=>Ql,Int64:()=>Vr,Uint64:()=>ze});function Ta(n){return n<0&&(n=4294967295+n+1),`0x${n.toString(16)}`}var Aa=8,Nm=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8],Kl=class{constructor(t){this.buffer=t}high(){return this.buffer[1]}low(){return this.buffer[0]}_times(t){let e=new Uint32Array([this.buffer[1]>>>16,this.buffer[1]&65535,this.buffer[0]>>>16,this.buffer[0]&65535]),i=new Uint32Array([t.buffer[1]>>>16,t.buffer[1]&65535,t.buffer[0]>>>16,t.buffer[0]&65535]),r=e[3]*i[3];this.buffer[0]=r&65535;let s=r>>>16;return r=e[2]*i[3],s+=r,r=e[3]*i[2]>>>0,s+=r,this.buffer[0]+=s<<16,this.buffer[1]=s>>>0<r?65536:0,this.buffer[1]+=s>>>16,this.buffer[1]+=e[1]*i[3]+e[2]*i[2]+e[3]*i[1],this.buffer[1]+=e[0]*i[3]+e[1]*i[2]+e[2]*i[1]+e[3]*i[0]<<16,this}_plus(t){let e=this.buffer[0]+t.buffer[0]>>>0;this.buffer[1]+=t.buffer[1],e<this.buffer[0]>>>0&&++this.buffer[1],this.buffer[0]=e}lessThan(t){return this.buffer[1]<t.buffer[1]||this.buffer[1]===t.buffer[1]&&this.buffer[0]<t.buffer[0]}equals(t){return this.buffer[1]===t.buffer[1]&&this.buffer[0]==t.buffer[0]}greaterThan(t){return t.lessThan(this)}hex(){return`${Ta(this.buffer[1])} ${Ta(this.buffer[0])}`}},ze=class n extends Kl{times(t){return this._times(t),this}plus(t){return this._plus(t),this}static from(t,e=new Uint32Array(2)){return n.fromString(typeof t=="string"?t:t.toString(),e)}static fromNumber(t,e=new Uint32Array(2)){return n.fromString(t.toString(),e)}static fromString(t,e=new Uint32Array(2)){let i=t.length,r=new n(e);for(let s=0;s<i;){let o=Aa<i-s?Aa:i-s,a=new n(new Uint32Array([Number.parseInt(t.slice(s,s+o),10),0])),l=new n(new Uint32Array([Nm[o],0]));r.times(l),r.plus(a),s+=o}return r}static convertArray(t){let e=new Uint32Array(t.length*2);for(let i=-1,r=t.length;++i<r;)n.from(t[i],new Uint32Array(e.buffer,e.byteOffset+2*i*4,2));return e}static multiply(t,e){return new n(new Uint32Array(t.buffer)).times(e)}static add(t,e){return new n(new Uint32Array(t.buffer)).plus(e)}},Vr=class n extends Kl{negate(){return this.buffer[0]=~this.buffer[0]+1,this.buffer[1]=~this.buffer[1],this.buffer[0]==0&&++this.buffer[1],this}times(t){return this._times(t),this}plus(t){return this._plus(t),this}lessThan(t){let e=this.buffer[1]<<0,i=t.buffer[1]<<0;return e<i||e===i&&this.buffer[0]<t.buffer[0]}static from(t,e=new Uint32Array(2)){return n.fromString(typeof t=="string"?t:t.toString(),e)}static fromNumber(t,e=new Uint32Array(2)){return n.fromString(t.toString(),e)}static fromString(t,e=new Uint32Array(2)){let i=t.startsWith("-"),r=t.length,s=new n(e);for(let o=i?1:0;o<r;){let a=Aa<r-o?Aa:r-o,l=new n(new Uint32Array([Number.parseInt(t.slice(o,o+a),10),0])),c=new n(new Uint32Array([Nm[a],0]));s.times(c),s.plus(l),o+=a}return i?s.negate():s}static convertArray(t){let e=new Uint32Array(t.length*2);for(let i=-1,r=t.length;++i<r;)n.from(t[i],new Uint32Array(e.buffer,e.byteOffset+2*i*4,2));return e}static multiply(t,e){return new n(new Uint32Array(t.buffer)).times(e)}static add(t,e){return new n(new Uint32Array(t.buffer)).plus(e)}},Ql=class n{constructor(t){this.buffer=t}high(){return new Vr(new Uint32Array(this.buffer.buffer,this.buffer.byteOffset+8,2))}low(){return new Vr(new Uint32Array(this.buffer.buffer,this.buffer.byteOffset,2))}negate(){return this.buffer[0]=~this.buffer[0]+1,this.buffer[1]=~this.buffer[1],this.buffer[2]=~this.buffer[2],this.buffer[3]=~this.buffer[3],this.buffer[0]==0&&++this.buffer[1],this.buffer[1]==0&&++this.buffer[2],this.buffer[2]==0&&++this.buffer[3],this}times(t){let e=new ze(new Uint32Array([this.buffer[3],0])),i=new ze(new Uint32Array([this.buffer[2],0])),r=new ze(new Uint32Array([this.buffer[1],0])),s=new ze(new Uint32Array([this.buffer[0],0])),o=new ze(new Uint32Array([t.buffer[3],0])),a=new ze(new Uint32Array([t.buffer[2],0])),l=new ze(new Uint32Array([t.buffer[1],0])),c=new ze(new Uint32Array([t.buffer[0],0])),u=ze.multiply(s,c);this.buffer[0]=u.low();let f=new ze(new Uint32Array([u.high(),0]));return u=ze.multiply(r,c),f.plus(u),u=ze.multiply(s,l),f.plus(u),this.buffer[1]=f.low(),this.buffer[3]=f.lessThan(u)?1:0,this.buffer[2]=f.high(),new ze(new Uint32Array(this.buffer.buffer,this.buffer.byteOffset+8,2)).plus(ze.multiply(i,c)).plus(ze.multiply(r,l)).plus(ze.multiply(s,a)),this.buffer[3]+=ze.multiply(e,c).plus(ze.multiply(i,l)).plus(ze.multiply(r,a)).plus(ze.multiply(s,o)).low(),this}plus(t){let e=new Uint32Array(4);return e[3]=this.buffer[3]+t.buffer[3]>>>0,e[2]=this.buffer[2]+t.buffer[2]>>>0,e[1]=this.buffer[1]+t.buffer[1]>>>0,e[0]=this.buffer[0]+t.buffer[0]>>>0,e[0]<this.buffer[0]>>>0&&++e[1],e[1]<this.buffer[1]>>>0&&++e[2],e[2]<this.buffer[2]>>>0&&++e[3],this.buffer[3]=e[3],this.buffer[2]=e[2],this.buffer[1]=e[1],this.buffer[0]=e[0],this}hex(){return`${Ta(this.buffer[3])} ${Ta(this.buffer[2])} ${Ta(this.buffer[1])} ${Ta(this.buffer[0])}`}static multiply(t,e){return new n(new Uint32Array(t.buffer)).times(e)}static add(t,e){return new n(new Uint32Array(t.buffer)).plus(e)}static from(t,e=new Uint32Array(4)){return n.fromString(typeof t=="string"?t:t.toString(),e)}static fromNumber(t,e=new Uint32Array(4)){return n.fromString(t.toString(),e)}static fromString(t,e=new Uint32Array(4)){let i=t.startsWith("-"),r=t.length,s=new n(e);for(let o=i?1:0;o<r;){let a=Aa<r-o?Aa:r-o,l=new n(new Uint32Array([Number.parseInt(t.slice(o,o+a),10),0,0,0])),c=new n(new Uint32Array([Nm[a],0,0,0]));s.times(c),s.plus(l),o+=a}return i?s.negate():s}static convertArray(t){let e=new Uint32Array(t.length*4);for(let i=-1,r=t.length;++i<r;)n.from(t[i],new Uint32Array(e.buffer,e.byteOffset+16*i,4));return e}};var tc=class extends It{constructor(t,e,i,r){super(),this.nodesIndex=-1,this.buffersIndex=-1,this.bytes=t,this.nodes=e,this.buffers=i,this.dictionaries=r}visit(t){return super.visit(t instanceof ne?t.type:t)}visitNull(t,{length:e}=this.nextFieldNode()){return Gt({type:t,length:e})}visitBool(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitInt(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitFloat(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitUtf8(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),valueOffsets:this.readOffsets(t),data:this.readData(t)})}visitBinary(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),valueOffsets:this.readOffsets(t),data:this.readData(t)})}visitFixedSizeBinary(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitDate(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitTimestamp(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitTime(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitDecimal(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitList(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),valueOffsets:this.readOffsets(t),child:this.visit(t.children[0])})}visitStruct(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),children:this.visitMany(t.children)})}visitUnion(t){return t.mode===ke.Sparse?this.visitSparseUnion(t):this.visitDenseUnion(t)}visitDenseUnion(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),typeIds:this.readTypeIds(t),valueOffsets:this.readOffsets(t),children:this.visitMany(t.children)})}visitSparseUnion(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),typeIds:this.readTypeIds(t),children:this.visitMany(t.children)})}visitDictionary(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t.indices),dictionary:this.readDictionary(t)})}visitInterval(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitFixedSizeList(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),child:this.visit(t.children[0])})}visitMap(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),valueOffsets:this.readOffsets(t),child:this.visit(t.children[0])})}nextFieldNode(){return this.nodes[++this.nodesIndex]}nextBufferRange(){return this.buffers[++this.buffersIndex]}readNullBitmap(t,e,i=this.nextBufferRange()){return e>0&&this.readData(t,i)||new Uint8Array(0)}readOffsets(t,e){return this.readData(t,e)}readTypeIds(t,e){return this.readData(t,e)}readData(t,{length:e,offset:i}=this.nextBufferRange()){return this.bytes.subarray(i,i+e)}readDictionary(t){return this.dictionaries.get(t.id)}},Ph=class extends tc{constructor(t,e,i,r){super(new Uint8Array(0),e,i,r),this.sources=t}readNullBitmap(t,e,{offset:i}=this.nextBufferRange()){return e<=0?new Uint8Array(0):ro(this.sources[i])}readOffsets(t,{offset:e}=this.nextBufferRange()){return te(Uint8Array,te(Int32Array,this.sources[e]))}readTypeIds(t,{offset:e}=this.nextBufferRange()){return te(Uint8Array,te(t.ArrayType,this.sources[e]))}readData(t,{offset:e}=this.nextBufferRange()){let{sources:i}=this;return Et.isTimestamp(t)?te(Uint8Array,Vr.convertArray(i[e])):(Et.isInt(t)||Et.isTime(t))&&t.bitWidth===64?te(Uint8Array,Vr.convertArray(i[e])):Et.isDate(t)&&t.unit===fn.MILLISECOND?te(Uint8Array,Vr.convertArray(i[e])):Et.isDecimal(t)?te(Uint8Array,Ql.convertArray(i[e])):Et.isBinary(t)||Et.isFixedSizeBinary(t)?v1(i[e]):Et.isBool(t)?ro(i[e]):Et.isUtf8(t)?ms(i[e].join("")):te(Uint8Array,te(t.ArrayType,i[e].map(r=>+r)))}};function v1(n){let t=n.join(""),e=new Uint8Array(t.length/2);for(let i=0;i<t.length;i+=2)e[i>>1]=Number.parseInt(t.slice(i,i+2),16);return e}var Ea=class extends or{constructor(t){super(t),this._values=new bs(new Uint8Array(0))}get byteLength(){let t=this._pendingLength+this.length*4;return this._offsets&&(t+=this._offsets.byteLength),this._values&&(t+=this._values.byteLength),this._nulls&&(t+=this._nulls.byteLength),t}setValue(t,e){return super.setValue(t,zt(e))}_flushPending(t,e){let i=this._offsets,r=this._values.reserve(e).buffer,s=0;for(let[o,a]of t)if(a===void 0)i.set(o,0);else{let l=a.length;r.set(a,s),i.set(o,l),s+=l}}};var Lh=class extends De{constructor(t){super(t),this._values=new Sa}setValue(t,e){this._values.set(t,+e)}};var co=class extends an{};co.prototype._setValue=xm;var ec=class extends co{};ec.prototype._setValue=oh;var nc=class extends co{};nc.prototype._setValue=ah;var ic=class extends an{};ic.prototype._setValue=Sm;var Fh=class extends De{constructor({type:t,nullValues:e,dictionaryHashFunction:i}){super({type:new Jn(t.dictionary,t.indices,t.id,t.isOrdered)}),this._nulls=null,this._dictionaryOffset=0,this._keysToIndices=Object.create(null),this.indices=uo({type:this.type.indices,nullValues:e}),this.dictionary=uo({type:this.type.dictionary,nullValues:null}),typeof i=="function"&&(this.valueToKey=i)}get values(){return this.indices.values}get nullCount(){return this.indices.nullCount}get nullBitmap(){return this.indices.nullBitmap}get byteLength(){return this.indices.byteLength+this.dictionary.byteLength}get reservedLength(){return this.indices.reservedLength+this.dictionary.reservedLength}get reservedByteLength(){return this.indices.reservedByteLength+this.dictionary.reservedByteLength}isValid(t){return this.indices.isValid(t)}setValid(t,e){let i=this.indices;return e=i.setValid(t,e),this.length=i.length,e}setValue(t,e){let i=this._keysToIndices,r=this.valueToKey(e),s=i[r];return s===void 0&&(i[r]=s=this._dictionaryOffset+this.dictionary.append(e).length-1),this.indices.setValue(t,s)}flush(){let t=this.type,e=this._dictionary,i=this.dictionary.toVector(),r=this.indices.flush().clone(t);return r.dictionary=e?e.concat(i):i,this.finished||(this._dictionaryOffset+=i.length),this._dictionary=r.dictionary,this.clear(),r}finish(){return this.indices.finish(),this.dictionary.finish(),this._dictionaryOffset=0,this._keysToIndices=Object.create(null),super.finish()}clear(){return this.indices.clear(),this.dictionary.clear(),super.clear()}valueToKey(t){return typeof t=="string"?t:`${t}`}};var rc=class extends an{};rc.prototype._setValue=_m;var Bh=class extends De{setValue(t,e){let[i]=this.children,r=t*this.stride;for(let s=-1,o=e.length;++s<o;)i.set(r+s,e[s])}addChild(t,e="0"){if(this.numChildren>0)throw new Error("FixedSizeListBuilder can only have one child.");let i=this.children.push(t);return this.type=new zi(this.type.listSize,new ne(e,t.type,!0)),i}};var fo=class extends an{setValue(t,e){this._values.set(t,e)}},Oh=class extends fo{setValue(t,e){super.setValue(t,Ll(e))}},Uh=class extends fo{},Nh=class extends fo{};var ho=class extends an{};ho.prototype._setValue=Mm;var sc=class extends ho{};sc.prototype._setValue=gh;var oc=class extends ho{};oc.prototype._setValue=yh;var _i=class extends an{setValue(t,e){this._values.set(t,e)}},kh=class extends _i{},zh=class extends _i{},Vh=class extends _i{},Hh=class extends _i{},Gh=class extends _i{},Wh=class extends _i{},Xh=class extends _i{},qh=class extends _i{};var Yh=class extends or{constructor(t){super(t),this._offsets=new Ma}addChild(t,e="0"){if(this.numChildren>0)throw new Error("ListBuilder can only have one child.");return this.children[this.numChildren]=t,this.type=new Ni(new ne(e,t.type,!0)),this.numChildren-1}_flushPending(t){let e=this._offsets,[i]=this.children;for(let[r,s]of t)if(typeof s>"u")e.set(r,0);else{let o=s.length,a=e.set(r,o).buffer[r];for(let l=-1;++l<o;)i.set(a+l,s[l])}}};var jh=class extends or{set(t,e){return super.set(t,e)}setValue(t,e){let i=e instanceof Map?e:new Map(Object.entries(e)),r=this._pending||(this._pending=new Map),s=r.get(t);s&&(this._pendingLength-=s.size),this._pendingLength+=i.size,r.set(t,i)}addChild(t,e=`${this.numChildren}`){if(this.numChildren>0)throw new Error("ListBuilder can only have one child.");return this.children[this.numChildren]=t,this.type=new Vi(new ne(e,t.type,!0),this.type.keysSorted),this.numChildren-1}_flushPending(t){let e=this._offsets,[i]=this.children;for(let[r,s]of t)if(s===void 0)e.set(r,0);else{let{[r]:o,[r+1]:a}=e.set(r,s.size).buffer;for(let l of s.entries())if(i.set(o,l),++o>=a)break}}};var $h=class extends De{setValue(t,e){}setValid(t,e){return this.length=Math.max(t+1,this.length),e}};var Zh=class extends De{setValue(t,e){let{children:i,type:r}=this;switch(Array.isArray(e)||e.constructor){case!0:return r.children.forEach((s,o)=>i[o].set(t,e[o]));case Map:return r.children.forEach((s,o)=>i[o].set(t,e.get(s.name)));default:return r.children.forEach((s,o)=>i[o].set(t,e[s.name]))}}setValid(t,e){return super.setValid(t,e)||this.children.forEach(i=>i.setValid(t,e)),e}addChild(t,e=`${this.numChildren}`){let i=this.children.push(t);return this.type=new Te([...this.type.children,new ne(e,t.type,!0)]),i}};var Hr=class extends an{};Hr.prototype._setValue=vm;var ac=class extends Hr{};ac.prototype._setValue=lh;var lc=class extends Hr{};lc.prototype._setValue=ch;var cc=class extends Hr{};cc.prototype._setValue=uh;var uc=class extends Hr{};uc.prototype._setValue=fh;var Gr=class extends an{};Gr.prototype._setValue=bm;var fc=class extends Gr{};fc.prototype._setValue=hh;var hc=class extends Gr{};hc.prototype._setValue=dh;var dc=class extends Gr{};dc.prototype._setValue=ph;var pc=class extends Gr{};pc.prototype._setValue=mh;var Ca=class extends De{constructor(t){super(t),this._typeIds=new Br(new Int8Array(0),1),typeof t.valueToChildTypeId=="function"&&(this._valueToChildTypeId=t.valueToChildTypeId)}get typeIdToChildIndex(){return this.type.typeIdToChildIndex}append(t,e){return this.set(this.length,t,e)}set(t,e,i){return i===void 0&&(i=this._valueToChildTypeId(this,e,t)),this.setValid(t,this.isValid(e))&&this.setValue(t,e,i),this}setValue(t,e,i){this._typeIds.set(t,i);let r=this.type.typeIdToChildIndex[i],s=this.children[r];s?.set(t,e)}addChild(t,e=`${this.children.length}`){let i=this.children.push(t),{type:{children:r,mode:s,typeIds:o}}=this,a=[...r,new ne(e,t.type)];return this.type=new ki(s,[...o,i],a),i}_valueToChildTypeId(t,e,i){throw new Error("Cannot map UnionBuilder value to child typeId. Pass the `childTypeId` as the second argument to unionBuilder.append(), or supply a `valueToChildTypeId` function as part of the UnionBuilder constructor options.")}},Jh=class extends Ca{},Kh=class extends Ca{constructor(t){super(t),this._offsets=new Br(new Int32Array(0))}setValue(t,e,i){let r=this._typeIds.set(t,i).buffer[t],s=this.getChildAt(this.type.typeIdToChildIndex[r]),o=this._offsets.set(t,s.length).buffer[t];s?.set(o,e)}};var mc=class extends or{constructor(t){super(t),this._values=new bs(new Uint8Array(0))}get byteLength(){let t=this._pendingLength+this.length*4;return this._offsets&&(t+=this._offsets.byteLength),this._values&&(t+=this._values.byteLength),this._nulls&&(t+=this._nulls.byteLength),t}setValue(t,e){return super.setValue(t,ms(e))}_flushPending(t,e){}};mc.prototype._flushPending=Ea.prototype._flushPending;var zm=class extends It{visitNull(){return $h}visitBool(){return Lh}visitInt(){return _i}visitInt8(){return kh}visitInt16(){return zh}visitInt32(){return Vh}visitInt64(){return Hh}visitUint8(){return Gh}visitUint16(){return Wh}visitUint32(){return Xh}visitUint64(){return qh}visitFloat(){return fo}visitFloat16(){return Oh}visitFloat32(){return Uh}visitFloat64(){return Nh}visitUtf8(){return mc}visitBinary(){return Ea}visitFixedSizeBinary(){return rc}visitDate(){return co}visitDateDay(){return ec}visitDateMillisecond(){return nc}visitTimestamp(){return Hr}visitTimestampSecond(){return ac}visitTimestampMillisecond(){return lc}visitTimestampMicrosecond(){return cc}visitTimestampNanosecond(){return uc}visitTime(){return Gr}visitTimeSecond(){return fc}visitTimeMillisecond(){return hc}visitTimeMicrosecond(){return dc}visitTimeNanosecond(){return pc}visitDecimal(){return ic}visitList(){return Yh}visitStruct(){return Zh}visitUnion(){return Ca}visitDenseUnion(){return Kh}visitSparseUnion(){return Jh}visitDictionary(){return Fh}visitInterval(){return ho}visitIntervalDayTime(){return sc}visitIntervalYearMonth(){return oc}visitFixedSizeList(){return Bh}visitMap(){return jh}},s0=new zm;var Ut=class extends It{compareSchemas(t,e){return t===e||e instanceof t.constructor&&this.compareManyFields(t.fields,e.fields)}compareManyFields(t,e){return t===e||Array.isArray(t)&&Array.isArray(e)&&t.length===e.length&&t.every((i,r)=>this.compareFields(i,e[r]))}compareFields(t,e){return t===e||e instanceof t.constructor&&t.name===e.name&&t.nullable===e.nullable&&this.visit(t.type,e.type)}};function Fn(n,t){return t instanceof n.constructor}function gc(n,t){return n===t||Fn(n,t)}function Wr(n,t){return n===t||Fn(n,t)&&n.bitWidth===t.bitWidth&&n.isSigned===t.isSigned}function Qh(n,t){return n===t||Fn(n,t)&&n.precision===t.precision}function b1(n,t){return n===t||Fn(n,t)&&n.byteWidth===t.byteWidth}function Vm(n,t){return n===t||Fn(n,t)&&n.unit===t.unit}function yc(n,t){return n===t||Fn(n,t)&&n.unit===t.unit&&n.timezone===t.timezone}function _c(n,t){return n===t||Fn(n,t)&&n.unit===t.unit&&n.bitWidth===t.bitWidth}function S1(n,t){return n===t||Fn(n,t)&&n.children.length===t.children.length&&hr.compareManyFields(n.children,t.children)}function M1(n,t){return n===t||Fn(n,t)&&n.children.length===t.children.length&&hr.compareManyFields(n.children,t.children)}function Hm(n,t){return n===t||Fn(n,t)&&n.mode===t.mode&&n.typeIds.every((e,i)=>e===t.typeIds[i])&&hr.compareManyFields(n.children,t.children)}function w1(n,t){return n===t||Fn(n,t)&&n.id===t.id&&n.isOrdered===t.isOrdered&&hr.visit(n.indices,t.indices)&&hr.visit(n.dictionary,t.dictionary)}function Gm(n,t){return n===t||Fn(n,t)&&n.unit===t.unit}function T1(n,t){return n===t||Fn(n,t)&&n.listSize===t.listSize&&n.children.length===t.children.length&&hr.compareManyFields(n.children,t.children)}function A1(n,t){return n===t||Fn(n,t)&&n.keysSorted===t.keysSorted&&n.children.length===t.children.length&&hr.compareManyFields(n.children,t.children)}Ut.prototype.visitNull=gc;Ut.prototype.visitBool=gc;Ut.prototype.visitInt=Wr;Ut.prototype.visitInt8=Wr;Ut.prototype.visitInt16=Wr;Ut.prototype.visitInt32=Wr;Ut.prototype.visitInt64=Wr;Ut.prototype.visitUint8=Wr;Ut.prototype.visitUint16=Wr;Ut.prototype.visitUint32=Wr;Ut.prototype.visitUint64=Wr;Ut.prototype.visitFloat=Qh;Ut.prototype.visitFloat16=Qh;Ut.prototype.visitFloat32=Qh;Ut.prototype.visitFloat64=Qh;Ut.prototype.visitUtf8=gc;Ut.prototype.visitBinary=gc;Ut.prototype.visitFixedSizeBinary=b1;Ut.prototype.visitDate=Vm;Ut.prototype.visitDateDay=Vm;Ut.prototype.visitDateMillisecond=Vm;Ut.prototype.visitTimestamp=yc;Ut.prototype.visitTimestampSecond=yc;Ut.prototype.visitTimestampMillisecond=yc;Ut.prototype.visitTimestampMicrosecond=yc;Ut.prototype.visitTimestampNanosecond=yc;Ut.prototype.visitTime=_c;Ut.prototype.visitTimeSecond=_c;Ut.prototype.visitTimeMillisecond=_c;Ut.prototype.visitTimeMicrosecond=_c;Ut.prototype.visitTimeNanosecond=_c;Ut.prototype.visitDecimal=gc;Ut.prototype.visitList=S1;Ut.prototype.visitStruct=M1;Ut.prototype.visitUnion=Hm;Ut.prototype.visitDenseUnion=Hm;Ut.prototype.visitSparseUnion=Hm;Ut.prototype.visitDictionary=w1;Ut.prototype.visitInterval=Gm;Ut.prototype.visitIntervalDayTime=Gm;Ut.prototype.visitIntervalYearMonth=Gm;Ut.prototype.visitFixedSizeList=T1;Ut.prototype.visitMap=A1;var hr=new Ut;function po(n,t){return hr.compareSchemas(n,t)}function o0(n,t){return hr.compareFields(n,t)}function a0(n,t){return hr.visit(n,t)}function uo(n){let t=n.type,e=new(s0.getVisitFn(t)())(n);if(t.children&&t.children.length>0){let i=n.children||[],r={nullValues:n.nullValues},s=Array.isArray(i)?((o,a)=>i[a]||r):(({name:o})=>i[o]||r);for(let[o,a]of t.children.entries()){let{type:l}=a,c=s(a,o);e.children.push(uo(Object.assign(Object.assign({},c),{type:l})))}}return e}function td(n,t){return E1(n,t.map(e=>e.data.concat()))}function E1(n,t){let e=[...n.fields],i=[],r={numBatches:t.reduce((f,h)=>Math.max(f,h.length),0)},s=0,o=0,a=-1,l=t.length,c,u=[];for(;r.numBatches-- >0;){for(o=Number.POSITIVE_INFINITY,a=-1;++a<l;)u[a]=c=t[a].shift(),o=Math.min(o,c?c.length:o);Number.isFinite(o)&&(u=C1(e,o,u,t,r),o>0&&(i[s++]=Gt({type:new Te(e),length:o,nullCount:0,children:u.slice()})))}return[n=n.assign(e),i.map(f=>new He(n,f))]}function C1(n,t,e,i,r){var s;let o=(t+63&-64)>>3;for(let a=-1,l=i.length;++a<l;){let c=e[a],u=c?.length;if(u>=t)u===t?e[a]=c:(e[a]=c.slice(0,t),r.numBatches=Math.max(r.numBatches,i[a].unshift(c.slice(t,u-t))));else{let f=n[a];n[a]=f.clone({nullable:!0}),e[a]=(s=c?._changeLengthAndBackfillNullBitmap(t))!==null&&s!==void 0?s:Gt({type:f.type,length:t,nullCount:t,nullBitmap:new Uint8Array(o)})}}return e}var l0,Bn=class n{constructor(...t){var e,i;if(t.length===0)return this.batches=[],this.schema=new he([]),this._offsets=[0],this;let r,s;t[0]instanceof he&&(r=t.shift()),t[t.length-1]instanceof Uint32Array&&(s=t.pop());let o=l=>{if(l){if(l instanceof He)return[l];if(l instanceof n)return l.batches;if(l instanceof _e){if(l.type instanceof Te)return[new He(new he(l.type.children),l)]}else{if(Array.isArray(l))return l.flatMap(c=>o(c));if(typeof l[Symbol.iterator]=="function")return[...l].flatMap(c=>o(c));if(typeof l=="object"){let c=Object.keys(l),u=c.map(p=>new se([l[p]])),f=new he(c.map((p,g)=>new ne(String(p),u[g].type))),[,h]=td(f,u);return h.length===0?[new He(l)]:h}}}return[]},a=t.flatMap(l=>o(l));if(r=(i=r??((e=a[0])===null||e===void 0?void 0:e.schema))!==null&&i!==void 0?i:new he([]),!(r instanceof he))throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");for(let l of a){if(!(l instanceof He))throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");if(!po(r,l.schema))throw new TypeError("Table and inner RecordBatch schemas must be equivalent.")}this.schema=r,this.batches=a,this._offsets=s??Sh(this.data)}get data(){return this.batches.map(({data:t})=>t)}get numCols(){return this.schema.fields.length}get numRows(){return this.data.reduce((t,e)=>t+e.length,0)}get nullCount(){return this._nullCount===-1&&(this._nullCount=bh(this.data)),this._nullCount}isValid(t){return!1}get(t){return null}set(t,e){}indexOf(t,e){return-1}getByteLength(t){return 0}[Symbol.iterator](){return this.batches.length>0?ba.visit(new se(this.data)):new Array(0)[Symbol.iterator]()}toArray(){return[...this]}toString(){return`[
  ${this.toArray().join(`,
  `)}
]`}concat(...t){let e=this.schema,i=this.data.concat(t.flatMap(({data:r})=>r));return new n(e,i.map(r=>new He(e,r)))}slice(t,e){let i=this.schema;[t,e]=Fl({length:this.numRows},t,e);let r=Mh(this.data,this._offsets,t,e);return new n(i,r.map(s=>new He(i,s)))}getChild(t){return this.getChildAt(this.schema.fields.findIndex(e=>e.name===t))}getChildAt(t){if(t>-1&&t<this.schema.fields.length){let e=this.data.map(i=>i.children[t]);if(e.length===0){let{type:i}=this.schema.fields[t],r=Gt({type:i,length:0,nullCount:0});e.push(r._changeLengthAndBackfillNullBitmap(this.numRows))}return new se(e)}return null}setChild(t,e){var i;return this.setChildAt((i=this.schema.fields)===null||i===void 0?void 0:i.findIndex(r=>r.name===t),e)}setChildAt(t,e){let i=this.schema,r=[...this.batches];if(t>-1&&t<this.numCols){e||(e=new se([Gt({type:new In,length:this.numRows})]));let s=i.fields.slice(),o=s[t].clone({type:e.type}),a=this.schema.fields.map((l,c)=>this.getChildAt(c));[s[t],a[t]]=[o,e],[i,r]=td(i,a)}return new n(i,r)}select(t){let e=this.schema.fields.reduce((i,r,s)=>i.set(r.name,s),new Map);return this.selectAt(t.map(i=>e.get(i)).filter(i=>i>-1))}selectAt(t){let e=this.schema.selectAt(t),i=this.batches.map(r=>r.selectAt(t));return new n(e,i)}assign(t){let e=this.schema.fields,[i,r]=t.schema.fields.reduce((a,l,c)=>{let[u,f]=a,h=e.findIndex(p=>p.name===l.name);return~h?f[h]=c:u.push(c),a},[[],[]]),s=this.schema.assign(t.schema),o=[...e.map((a,l)=>[l,r[l]]).map(([a,l])=>l===void 0?this.getChildAt(a):t.getChildAt(l)),...i.map(a=>t.getChildAt(a))].filter(Boolean);return new n(...td(s,o))}};l0=Symbol.toStringTag;Bn[l0]=(n=>(n.schema=null,n.batches=[],n._offsets=new Uint32Array([0]),n._nullCount=-1,n[Symbol.isConcatSpreadable]=!0,n.isValid=vs(Ul),n.get=vs(je.getVisitFn(L.Struct)),n.set=wh(hn.getVisitFn(L.Struct)),n.indexOf=Th(so.getVisitFn(L.Struct)),n.getByteLength=vs(Qn.getVisitFn(L.Struct)),"Table"))(Bn.prototype);var u0,He=class n{constructor(...t){switch(t.length){case 2:{if([this.schema]=t,!(this.schema instanceof he))throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");if([,this.data=Gt({nullCount:0,type:new Te(this.schema.fields),children:this.schema.fields.map(e=>Gt({type:e.type,nullCount:0}))})]=t,!(this.data instanceof _e))throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");[this.schema,this.data]=c0(this.schema,this.data.children);break}case 1:{let[e]=t,{fields:i,children:r,length:s}=Object.keys(e).reduce((l,c,u)=>(l.children[u]=e[c],l.length=Math.max(l.length,e[c].length),l.fields[u]=ne.new({name:c,type:e[c].type,nullable:!0}),l),{length:0,fields:new Array,children:new Array}),o=new he(i),a=Gt({type:new Te(i),length:s,children:r,nullCount:0});[this.schema,this.data]=c0(o,a.children,s);break}default:throw new TypeError("RecordBatch constructor expects an Object mapping names to child Data, or a [Schema, Data] pair.")}}get dictionaries(){return this._dictionaries||(this._dictionaries=f0(this.schema.fields,this.data.children))}get numCols(){return this.schema.fields.length}get numRows(){return this.data.length}get nullCount(){return this.data.nullCount}isValid(t){return this.data.getValid(t)}get(t){return je.visit(this.data,t)}set(t,e){return hn.visit(this.data,t,e)}indexOf(t,e){return so.visit(this.data,t,e)}getByteLength(t){return Qn.visit(this.data,t)}[Symbol.iterator](){return ba.visit(new se([this.data]))}toArray(){return[...this]}concat(...t){return new Bn(this.schema,[this,...t])}slice(t,e){let[i]=new se([this.data]).slice(t,e).data;return new n(this.schema,i)}getChild(t){var e;return this.getChildAt((e=this.schema.fields)===null||e===void 0?void 0:e.findIndex(i=>i.name===t))}getChildAt(t){return t>-1&&t<this.schema.fields.length?new se([this.data.children[t]]):null}setChild(t,e){var i;return this.setChildAt((i=this.schema.fields)===null||i===void 0?void 0:i.findIndex(r=>r.name===t),e)}setChildAt(t,e){let i=this.schema,r=this.data;if(t>-1&&t<this.numCols){e||(e=new se([Gt({type:new In,length:this.numRows})]));let s=i.fields.slice(),o=r.children.slice(),a=s[t].clone({type:e.type});[s[t],o[t]]=[a,e.data[0]],i=new he(s,new Map(this.schema.metadata)),r=Gt({type:new Te(s),children:o})}return new n(i,r)}select(t){let e=this.schema.select(t),i=new Te(e.fields),r=[];for(let s of t){let o=this.schema.fields.findIndex(a=>a.name===s);~o&&(r[o]=this.data.children[o])}return new n(e,Gt({type:i,length:this.numRows,children:r}))}selectAt(t){let e=this.schema.selectAt(t),i=t.map(s=>this.data.children[s]).filter(Boolean),r=Gt({type:new Te(e.fields),length:this.numRows,children:i});return new n(e,r)}};u0=Symbol.toStringTag;He[u0]=(n=>(n._nullCount=-1,n[Symbol.isConcatSpreadable]=!0,"RecordBatch"))(He.prototype);function c0(n,t,e=t.reduce((i,r)=>Math.max(i,r.length),0)){var i;let r=[...n.fields],s=[...t],o=(e+63&-64)>>3;for(let[a,l]of n.fields.entries()){let c=t[a];(!c||c.length!==e)&&(r[a]=l.clone({nullable:!0}),s[a]=(i=c?._changeLengthAndBackfillNullBitmap(e))!==null&&i!==void 0?i:Gt({type:l.type,length:e,nullCount:e,nullBitmap:new Uint8Array(o)}))}return[n.assign(r),Gt({type:new Te(r),length:e,children:s})]}function f0(n,t,e=new Map){for(let i=-1,r=n.length;++i<r;){let o=n[i].type,a=t[i];if(Et.isDictionary(o)){if(!e.has(o.id))a.dictionary&&e.set(o.id,a.dictionary);else if(e.get(o.id)!==a.dictionary)throw new Error("Cannot create Schema containing two different dictionaries with the same Id")}o.children&&o.children.length>0&&f0(o.children,a.children,e)}return e}var mo=class extends He{constructor(t){let e=t.fields.map(r=>Gt({type:r.type})),i=Gt({type:new Te(t.fields),nullCount:0,children:e});super(t,i)}};var xc;(function(n){n[n.BUFFER=0]="BUFFER"})(xc||(xc={}));var vc;(function(n){n[n.LZ4_FRAME=0]="LZ4_FRAME",n[n.ZSTD=1]="ZSTD"})(vc||(vc={}));var ed=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsBodyCompression(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsBodyCompression(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}codec(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):vc.LZ4_FRAME}method(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt8(this.bb_pos+t):xc.BUFFER}static startBodyCompression(t){t.startObject(2)}static addCodec(t,e){t.addFieldInt8(0,e,vc.LZ4_FRAME)}static addMethod(t,e){t.addFieldInt8(1,e,xc.BUFFER)}static endBodyCompression(t){return t.endObject()}static createBodyCompression(t,e,i){return n.startBodyCompression(t),n.addCodec(t,e),n.addMethod(t,i),n.endBodyCompression(t)}};var Ia=class{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}offset(){return this.bb.readInt64(this.bb_pos)}length(){return this.bb.readInt64(this.bb_pos+8)}static sizeOf(){return 16}static createBuffer(t,e,i){return t.prep(8,16),t.writeInt64(i),t.writeInt64(e),t.offset()}};var Ra=class{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}length(){return this.bb.readInt64(this.bb_pos)}nullCount(){return this.bb.readInt64(this.bb_pos+8)}static sizeOf(){return 16}static createFieldNode(t,e,i){return t.prep(8,16),t.writeInt64(i),t.writeInt64(e),t.offset()}};var ni=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsRecordBatch(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRecordBatch(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}length(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt64(this.bb_pos+t):this.bb.createLong(0,0)}nodes(t,e){let i=this.bb.__offset(this.bb_pos,6);return i?(e||new Ra).__init(this.bb.__vector(this.bb_pos+i)+t*16,this.bb):null}nodesLength(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}buffers(t,e){let i=this.bb.__offset(this.bb_pos,8);return i?(e||new Ia).__init(this.bb.__vector(this.bb_pos+i)+t*16,this.bb):null}buffersLength(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}compression(t){let e=this.bb.__offset(this.bb_pos,10);return e?(t||new ed).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}static startRecordBatch(t){t.startObject(4)}static addLength(t,e){t.addFieldInt64(0,e,t.createLong(0,0))}static addNodes(t,e){t.addFieldOffset(1,e,0)}static startNodesVector(t,e){t.startVector(16,e,8)}static addBuffers(t,e){t.addFieldOffset(2,e,0)}static startBuffersVector(t,e){t.startVector(16,e,8)}static addCompression(t,e){t.addFieldOffset(3,e,0)}static endRecordBatch(t){return t.endObject()}};var Xr=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDictionaryBatch(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDictionaryBatch(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}id(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt64(this.bb_pos+t):this.bb.createLong(0,0)}data(t){let e=this.bb.__offset(this.bb_pos,6);return e?(t||new ni).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}isDelta(){let t=this.bb.__offset(this.bb_pos,8);return t?!!this.bb.readInt8(this.bb_pos+t):!1}static startDictionaryBatch(t){t.startObject(3)}static addId(t,e){t.addFieldInt64(0,e,t.createLong(0,0))}static addData(t,e){t.addFieldOffset(1,e,0)}static addIsDelta(t,e){t.addFieldInt8(2,+e,0)}static endDictionaryBatch(t){return t.endObject()}};var Da;(function(n){n[n.NONE=0]="NONE",n[n.Schema=1]="Schema",n[n.DictionaryBatch=2]="DictionaryBatch",n[n.RecordBatch=3]="RecordBatch",n[n.Tensor=4]="Tensor",n[n.SparseTensor=5]="SparseTensor"})(Da||(Da={}));var qi=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsMessage(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMessage(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}version(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Ss.V1}headerType(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint8(this.bb_pos+t):Da.NONE}header(t){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__union(t,this.bb_pos+e):null}bodyLength(){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt64(this.bb_pos+t):this.bb.createLong(0,0)}customMetadata(t,e){let i=this.bb.__offset(this.bb_pos,12);return i?(e||new tn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}customMetadataLength(){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__vector_len(this.bb_pos+t):0}static startMessage(t){t.startObject(5)}static addVersion(t,e){t.addFieldInt16(0,e,Ss.V1)}static addHeaderType(t,e){t.addFieldInt8(1,e,Da.NONE)}static addHeader(t,e){t.addFieldOffset(2,e,0)}static addBodyLength(t,e){t.addFieldInt64(3,e,t.createLong(0,0))}static addCustomMetadata(t,e){t.addFieldOffset(4,e,0)}static createCustomMetadataVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startCustomMetadataVector(t,e){t.startVector(4,e,4)}static endMessage(t){return t.endObject()}static finishMessageBuffer(t,e){t.finish(e)}static finishSizePrefixedMessageBuffer(t,e){t.finish(e,void 0,!0)}static createMessage(t,e,i,r,s,o){return n.startMessage(t),n.addVersion(t,e),n.addHeaderType(t,i),n.addHeader(t,r),n.addBodyLength(t,s),n.addCustomMetadata(t,o),n.endMessage(t)}};var R1=dn,Wm=class extends It{visit(t,e){return t==null||e==null?void 0:super.visit(t,e)}visitNull(t,e){return ql.startNull(e),ql.endNull(e)}visitInt(t,e){return Wi.startInt(e),Wi.addBitWidth(e,t.bitWidth),Wi.addIsSigned(e,t.isSigned),Wi.endInt(e)}visitFloat(t,e){return Cs.startFloatingPoint(e),Cs.addPrecision(e,t.precision),Cs.endFloatingPoint(e)}visitBinary(t,e){return zl.startBinary(e),zl.endBinary(e)}visitBool(t,e){return Vl.startBool(e),Vl.endBool(e)}visitUtf8(t,e){return $l.startUtf8(e),$l.endUtf8(e)}visitDecimal(t,e){return cr.startDecimal(e),cr.addScale(e,t.scale),cr.addPrecision(e,t.precision),cr.addBitWidth(e,t.bitWidth),cr.endDecimal(e)}visitDate(t,e){return ws.startDate(e),ws.addUnit(e,t.unit),ws.endDate(e)}visitTime(t,e){return Or.startTime(e),Or.addUnit(e,t.unit),Or.addBitWidth(e,t.bitWidth),Or.endTime(e)}visitTimestamp(t,e){let i=t.timezone&&e.createString(t.timezone)||void 0;return Ur.startTimestamp(e),Ur.addUnit(e,t.unit),i!==void 0&&Ur.addTimezone(e,i),Ur.endTimestamp(e)}visitInterval(t,e){return Is.startInterval(e),Is.addUnit(e,t.unit),Is.endInterval(e)}visitList(t,e){return Xl.startList(e),Xl.endList(e)}visitStruct(t,e){return Yl.startStruct_(e),Yl.endStruct_(e)}visitUnion(t,e){Xi.startTypeIdsVector(e,t.typeIds.length);let i=Xi.createTypeIdsVector(e,t.typeIds);return Xi.startUnion(e),Xi.addMode(e,t.mode),Xi.addTypeIds(e,i),Xi.endUnion(e)}visitDictionary(t,e){let i=this.visit(t.indices,e);return lr.startDictionaryEncoding(e),lr.addId(e,new R1(t.id,0)),lr.addIsOrdered(e,t.isOrdered),i!==void 0&&lr.addIndexType(e,i),lr.endDictionaryEncoding(e)}visitFixedSizeBinary(t,e){return As.startFixedSizeBinary(e),As.addByteWidth(e,t.byteWidth),As.endFixedSizeBinary(e)}visitFixedSizeList(t,e){return Es.startFixedSizeList(e),Es.addListSize(e,t.listSize),Es.endFixedSizeList(e)}visitMap(t,e){return Rs.startMap(e),Rs.addKeysSorted(e,t.keysSorted),Rs.endMap(e)}},nd=new Wm;function m0(n,t=new Map){return new he(D1(n,t),id(n.customMetadata),t)}function Xm(n){return new pn(n.count,y0(n.columns),_0(n.columns))}function g0(n){return new Un(Xm(n.data),n.id,n.isDelta)}function D1(n,t){return(n.fields||[]).filter(Boolean).map(e=>ne.fromJSON(e,t))}function h0(n,t){return(n.children||[]).filter(Boolean).map(e=>ne.fromJSON(e,t))}function y0(n){return(n||[]).reduce((t,e)=>[...t,new Yi(e.count,P1(e.VALIDITY)),...y0(e.children)],[])}function _0(n,t=[]){for(let e=-1,i=(n||[]).length;++e<i;){let r=n[e];r.VALIDITY&&t.push(new On(t.length,r.VALIDITY.length)),r.TYPE&&t.push(new On(t.length,r.TYPE.length)),r.OFFSET&&t.push(new On(t.length,r.OFFSET.length)),r.DATA&&t.push(new On(t.length,r.DATA.length)),t=_0(r.children,t)}return t}function P1(n){return(n||[]).reduce((t,e)=>t+ +(e===0),0)}function x0(n,t){let e,i,r,s,o,a;return!t||!(s=n.dictionary)?(o=p0(n,h0(n,t)),r=new ne(n.name,o,n.nullable,id(n.customMetadata))):t.has(e=s.id)?(i=(i=s.indexType)?d0(i):new ir,a=new Jn(t.get(e),i,e,s.isOrdered),r=new ne(n.name,a,n.nullable,id(n.customMetadata))):(i=(i=s.indexType)?d0(i):new ir,t.set(e,o=p0(n,h0(n,t))),a=new Jn(o,i,e,s.isOrdered),r=new ne(n.name,a,n.nullable,id(n.customMetadata))),r||null}function id(n){return new Map(Object.entries(n||{}))}function d0(n){return new Xe(n.isSigned,n.bitWidth)}function p0(n,t){let e=n.type.name;switch(e){case"NONE":return new In;case"null":return new In;case"binary":return new Ar;case"utf8":return new Er;case"bool":return new Cr;case"list":return new Ni((t||[])[0]);case"struct":return new Te(t||[]);case"struct_":return new Te(t||[])}switch(e){case"int":{let i=n.type;return new Xe(i.isSigned,i.bitWidth)}case"floatingpoint":{let i=n.type;return new Pn(Re[i.precision])}case"decimal":{let i=n.type;return new Ir(i.scale,i.precision,i.bitWidth)}case"date":{let i=n.type;return new Rr(fn[i.unit])}case"time":{let i=n.type;return new Ui(ie[i.unit],i.bitWidth)}case"timestamp":{let i=n.type;return new Dr(ie[i.unit],i.timezone)}case"interval":{let i=n.type;return new Pr(Cn[i.unit])}case"union":{let i=n.type;return new ki(ke[i.mode],i.typeIds||[],t||[])}case"fixedsizebinary":{let i=n.type;return new Lr(i.byteWidth)}case"fixedsizelist":{let i=n.type;return new zi(i.listSize,(t||[])[0])}case"map":{let i=n.type;return new Vi((t||[])[0],i.keysSorted)}}throw new Error(`Unrecognized type: "${e}"`)}var go=dn,L1=ao,F1=ti,Nn=class n{constructor(t,e,i,r){this._version=e,this._headerType=i,this.body=new Uint8Array(0),r&&(this._createHeader=()=>r),this._bodyLength=typeof t=="number"?t:t.low}static fromJSON(t,e){let i=new n(0,on.V4,e);return i._createHeader=B1(t,e),i}static decode(t){t=new F1(zt(t));let e=qi.getRootAsMessage(t),i=e.bodyLength(),r=e.version(),s=e.headerType(),o=new n(i,r,s);return o._createHeader=O1(e,s),o}static encode(t){let e=new L1,i=-1;return t.isSchema()?i=he.encode(e,t.header()):t.isRecordBatch()?i=pn.encode(e,t.header()):t.isDictionaryBatch()&&(i=Un.encode(e,t.header())),qi.startMessage(e),qi.addVersion(e,on.V4),qi.addHeader(e,i),qi.addHeaderType(e,t.headerType),qi.addBodyLength(e,new go(t.bodyLength,0)),qi.finishMessageBuffer(e,qi.endMessage(e)),e.asUint8Array()}static from(t,e=0){if(t instanceof he)return new n(0,on.V4,ce.Schema,t);if(t instanceof pn)return new n(e,on.V4,ce.RecordBatch,t);if(t instanceof Un)return new n(e,on.V4,ce.DictionaryBatch,t);throw new Error(`Unrecognized Message header: ${t}`)}get type(){return this.headerType}get version(){return this._version}get headerType(){return this._headerType}get bodyLength(){return this._bodyLength}header(){return this._createHeader()}isSchema(){return this.headerType===ce.Schema}isRecordBatch(){return this.headerType===ce.RecordBatch}isDictionaryBatch(){return this.headerType===ce.DictionaryBatch}},pn=class{constructor(t,e,i){this._nodes=e,this._buffers=i,this._length=typeof t=="number"?t:t.low}get nodes(){return this._nodes}get length(){return this._length}get buffers(){return this._buffers}},Un=class{constructor(t,e,i=!1){this._data=t,this._isDelta=i,this._id=typeof e=="number"?e:e.low}get id(){return this._id}get data(){return this._data}get isDelta(){return this._isDelta}get length(){return this.data.length}get nodes(){return this.data.nodes}get buffers(){return this.data.buffers}},On=class{constructor(t,e){this.offset=typeof t=="number"?t:t.low,this.length=typeof e=="number"?e:e.low}},Yi=class{constructor(t,e){this.length=typeof t=="number"?t:t.low,this.nullCount=typeof e=="number"?e:e.low}};function B1(n,t){return(()=>{switch(t){case ce.Schema:return he.fromJSON(n);case ce.RecordBatch:return pn.fromJSON(n);case ce.DictionaryBatch:return Un.fromJSON(n)}throw new Error(`Unrecognized Message type: { name: ${ce[t]}, type: ${t} }`)})}function O1(n,t){return(()=>{switch(t){case ce.Schema:return he.decode(n.header(new Ln));case ce.RecordBatch:return pn.decode(n.header(new ni),n.version());case ce.DictionaryBatch:return Un.decode(n.header(new Xr),n.version())}throw new Error(`Unrecognized Message type: { name: ${ce[t]}, type: ${t} }`)})}ne.encode=Y1;ne.decode=X1;ne.fromJSON=x0;he.encode=q1;he.decode=U1;he.fromJSON=m0;pn.encode=j1;pn.decode=N1;pn.fromJSON=Xm;Un.encode=$1;Un.decode=k1;Un.fromJSON=g0;Yi.encode=Z1;Yi.decode=V1;On.encode=J1;On.decode=z1;function U1(n,t=new Map){let e=W1(n,t);return new he(e,rd(n),t)}function N1(n,t=on.V4){if(n.compression()!==null)throw new Error("Record batch compression not implemented");return new pn(n.length(),H1(n),G1(n,t))}function k1(n,t=on.V4){return new Un(pn.decode(n.data(),t),n.id(),n.isDelta())}function z1(n){return new On(n.offset(),n.length())}function V1(n){return new Yi(n.length(),n.nullCount())}function H1(n){let t=[];for(let e,i=-1,r=-1,s=n.nodesLength();++i<s;)(e=n.nodes(i))&&(t[++r]=Yi.decode(e));return t}function G1(n,t){let e=[];for(let i,r=-1,s=-1,o=n.buffersLength();++r<o;)(i=n.buffers(r))&&(t<on.V4&&(i.bb_pos+=8*(r+1)),e[++s]=On.decode(i));return e}function W1(n,t){let e=[];for(let i,r=-1,s=-1,o=n.fieldsLength();++r<o;)(i=n.fields(r))&&(e[++s]=ne.decode(i,t));return e}function v0(n,t){let e=[];for(let i,r=-1,s=-1,o=n.childrenLength();++r<o;)(i=n.children(r))&&(e[++s]=ne.decode(i,t));return e}function X1(n,t){let e,i,r,s,o,a;return!t||!(a=n.dictionary())?(r=S0(n,v0(n,t)),i=new ne(n.name(),r,n.nullable(),rd(n))):t.has(e=a.id().low)?(s=(s=a.indexType())?b0(s):new ir,o=new Jn(t.get(e),s,e,a.isOrdered()),i=new ne(n.name(),o,n.nullable(),rd(n))):(s=(s=a.indexType())?b0(s):new ir,t.set(e,r=S0(n,v0(n,t))),o=new Jn(r,s,e,a.isOrdered()),i=new ne(n.name(),o,n.nullable(),rd(n))),i||null}function rd(n){let t=new Map;if(n)for(let e,i,r=-1,s=Math.trunc(n.customMetadataLength());++r<s;)(e=n.customMetadata(r))&&(i=e.key())!=null&&t.set(i,e.value());return t}function b0(n){return new Xe(n.isSigned(),n.bitWidth())}function S0(n,t){let e=n.typeType();switch(e){case Pe.NONE:return new In;case Pe.Null:return new In;case Pe.Binary:return new Ar;case Pe.Utf8:return new Er;case Pe.Bool:return new Cr;case Pe.List:return new Ni((t||[])[0]);case Pe.Struct_:return new Te(t||[])}switch(e){case Pe.Int:{let i=n.type(new Wi);return new Xe(i.isSigned(),i.bitWidth())}case Pe.FloatingPoint:{let i=n.type(new Cs);return new Pn(i.precision())}case Pe.Decimal:{let i=n.type(new cr);return new Ir(i.scale(),i.precision(),i.bitWidth())}case Pe.Date:{let i=n.type(new ws);return new Rr(i.unit())}case Pe.Time:{let i=n.type(new Or);return new Ui(i.unit(),i.bitWidth())}case Pe.Timestamp:{let i=n.type(new Ur);return new Dr(i.unit(),i.timezone())}case Pe.Interval:{let i=n.type(new Is);return new Pr(i.unit())}case Pe.Union:{let i=n.type(new Xi);return new ki(i.mode(),i.typeIdsArray()||[],t||[])}case Pe.FixedSizeBinary:{let i=n.type(new As);return new Lr(i.byteWidth())}case Pe.FixedSizeList:{let i=n.type(new Es);return new zi(i.listSize(),(t||[])[0])}case Pe.Map:{let i=n.type(new Rs);return new Vi((t||[])[0],i.keysSorted())}}throw new Error(`Unrecognized type: "${Pe[e]}" (${e})`)}function q1(n,t){let e=t.fields.map(s=>ne.encode(n,s));Ln.startFieldsVector(n,e.length);let i=Ln.createFieldsVector(n,e),r=t.metadata&&t.metadata.size>0?Ln.createCustomMetadataVector(n,[...t.metadata].map(([s,o])=>{let a=n.createString(`${s}`),l=n.createString(`${o}`);return tn.startKeyValue(n),tn.addKey(n,a),tn.addValue(n,l),tn.endKeyValue(n)})):-1;return Ln.startSchema(n),Ln.addFields(n,i),Ln.addEndianness(n,K1?Ms.Little:Ms.Big),r!==-1&&Ln.addCustomMetadata(n,r),Ln.endSchema(n)}function Y1(n,t){let e=-1,i=-1,r=-1,s=t.type,o=t.typeId;Et.isDictionary(s)?(o=s.dictionary.typeId,r=nd.visit(s,n),i=nd.visit(s.dictionary,n)):i=nd.visit(s,n);let a=(s.children||[]).map(u=>ne.encode(n,u)),l=Sn.createChildrenVector(n,a),c=t.metadata&&t.metadata.size>0?Sn.createCustomMetadataVector(n,[...t.metadata].map(([u,f])=>{let h=n.createString(`${u}`),p=n.createString(`${f}`);return tn.startKeyValue(n),tn.addKey(n,h),tn.addValue(n,p),tn.endKeyValue(n)})):-1;return t.name&&(e=n.createString(t.name)),Sn.startField(n),Sn.addType(n,i),Sn.addTypeType(n,o),Sn.addChildren(n,l),Sn.addNullable(n,!!t.nullable),e!==-1&&Sn.addName(n,e),r!==-1&&Sn.addDictionary(n,r),c!==-1&&Sn.addCustomMetadata(n,c),Sn.endField(n)}function j1(n,t){let e=t.nodes||[],i=t.buffers||[];ni.startNodesVector(n,e.length);for(let o of e.slice().reverse())Yi.encode(n,o);let r=n.endVector();ni.startBuffersVector(n,i.length);for(let o of i.slice().reverse())On.encode(n,o);let s=n.endVector();return ni.startRecordBatch(n),ni.addLength(n,new go(t.length,0)),ni.addNodes(n,r),ni.addBuffers(n,s),ni.endRecordBatch(n)}function $1(n,t){let e=pn.encode(n,t.data);return Xr.startDictionaryBatch(n),Xr.addId(n,new go(t.id,0)),Xr.addIsDelta(n,t.isDelta),Xr.addData(n,e),Xr.endDictionaryBatch(n)}function Z1(n,t){return Ra.createFieldNode(n,new go(t.length,0),new go(t.nullCount,0))}function J1(n,t){return Ia.createBuffer(n,new go(t.offset,0),new go(t.length,0))}var K1=(()=>{let n=new ArrayBuffer(2);return new DataView(n).setInt16(0,256,!0),new Int16Array(n)[0]===256})();var Ym=n=>`Expected ${ce[n]} Message in stream, but was null or length 0.`,jm=n=>`Header pointer of flatbuffer-encoded ${ce[n]} Message is null or length 0.`,M0=(n,t)=>`Expected to read ${n} metadata bytes, but only read ${t}.`,w0=(n,t)=>`Expected to read ${n} bytes for message body, but only read ${t}.`,Pa=class{constructor(t){this.source=t instanceof fr?t:new fr(t)}[Symbol.iterator](){return this}next(){let t;return(t=this.readMetadataLength()).done?Ae:t.value===-1&&(t=this.readMetadataLength()).done?Ae:(t=this.readMetadata(t.value)).done?Ae:t}throw(t){return this.source.throw(t)}return(t){return this.source.return(t)}readMessage(t){let e;if((e=this.next()).done)return null;if(t!=null&&e.value.headerType!==t)throw new Error(Ym(t));return e.value}readMessageBody(t){if(t<=0)return new Uint8Array(0);let e=zt(this.source.read(t));if(e.byteLength<t)throw new Error(w0(t,e.byteLength));return e.byteOffset%8===0&&e.byteOffset+e.byteLength<=e.buffer.byteLength?e:e.slice()}readSchema(t=!1){let e=ce.Schema,i=this.readMessage(e),r=i?.header();if(t&&!r)throw new Error(jm(e));return r}readMetadataLength(){let t=this.source.read(sd),e=t&&new ti(t),i=e?.readInt32(0)||0;return{done:i===0,value:i}}readMetadata(t){let e=this.source.read(t);if(!e)return Ae;if(e.byteLength<t)throw new Error(M0(t,e.byteLength));return{done:!1,value:Nn.decode(e)}}},bc=class{constructor(t,e){this.source=t instanceof yi?t:Gf(t)?new Ds(t,e):new yi(t)}[Symbol.asyncIterator](){return this}next(){return ut(this,void 0,void 0,function*(){let t;return(t=yield this.readMetadataLength()).done?Ae:t.value===-1&&(t=yield this.readMetadataLength()).done?Ae:(t=yield this.readMetadata(t.value)).done?Ae:t})}throw(t){return ut(this,void 0,void 0,function*(){return yield this.source.throw(t)})}return(t){return ut(this,void 0,void 0,function*(){return yield this.source.return(t)})}readMessage(t){return ut(this,void 0,void 0,function*(){let e;if((e=yield this.next()).done)return null;if(t!=null&&e.value.headerType!==t)throw new Error(Ym(t));return e.value})}readMessageBody(t){return ut(this,void 0,void 0,function*(){if(t<=0)return new Uint8Array(0);let e=zt(yield this.source.read(t));if(e.byteLength<t)throw new Error(w0(t,e.byteLength));return e.byteOffset%8===0&&e.byteOffset+e.byteLength<=e.buffer.byteLength?e:e.slice()})}readSchema(t=!1){return ut(this,void 0,void 0,function*(){let e=ce.Schema,i=yield this.readMessage(e),r=i?.header();if(t&&!r)throw new Error(jm(e));return r})}readMetadataLength(){return ut(this,void 0,void 0,function*(){let t=yield this.source.read(sd),e=t&&new ti(t),i=e?.readInt32(0)||0;return{done:i===0,value:i}})}readMetadata(t){return ut(this,void 0,void 0,function*(){let e=yield this.source.read(t);if(!e)return Ae;if(e.byteLength<t)throw new Error(M0(t,e.byteLength));return{done:!1,value:Nn.decode(e)}})}},Sc=class extends Pa{constructor(t){super(new Uint8Array(0)),this._schema=!1,this._body=[],this._batchIndex=0,this._dictionaryIndex=0,this._json=t instanceof Zl?t:new Zl(t)}next(){let{_json:t}=this;if(!this._schema)return this._schema=!0,{done:!1,value:Nn.fromJSON(t.schema,ce.Schema)};if(this._dictionaryIndex<t.dictionaries.length){let e=t.dictionaries[this._dictionaryIndex++];return this._body=e.data.columns,{done:!1,value:Nn.fromJSON(e,ce.DictionaryBatch)}}if(this._batchIndex<t.batches.length){let e=t.batches[this._batchIndex++];return this._body=e.columns,{done:!1,value:Nn.fromJSON(e,ce.RecordBatch)}}return this._body=[],Ae}readMessageBody(t){return e(this._body);function e(i){return(i||[]).reduce((r,s)=>[...r,...s.VALIDITY&&[s.VALIDITY]||[],...s.TYPE&&[s.TYPE]||[],...s.OFFSET&&[s.OFFSET]||[],...s.DATA&&[s.DATA]||[],...e(s.children)],[])}}readMessage(t){let e;if((e=this.next()).done)return null;if(t!=null&&e.value.headerType!==t)throw new Error(Ym(t));return e.value}readSchema(){let t=ce.Schema,e=this.readMessage(t),i=e?.header();if(!e||!i)throw new Error(jm(t));return i}},sd=4,qm="ARROW1",La=new Uint8Array(qm.length);for(let n=0;n<qm.length;n+=1)La[n]=qm.codePointAt(n);function od(n,t=0){for(let e=-1,i=La.length;++e<i;)if(La[e]!==n[t+e])return!1;return!0}var Fa=La.length,$m=Fa+sd,T0=Fa*2+sd;var ii=class n extends lo{constructor(t){super(),this._impl=t}get closed(){return this._impl.closed}get schema(){return this._impl.schema}get autoDestroy(){return this._impl.autoDestroy}get dictionaries(){return this._impl.dictionaries}get numDictionaries(){return this._impl.numDictionaries}get numRecordBatches(){return this._impl.numRecordBatches}get footer(){return this._impl.isFile()?this._impl.footer:null}isSync(){return this._impl.isSync()}isAsync(){return this._impl.isAsync()}isFile(){return this._impl.isFile()}isStream(){return this._impl.isStream()}next(){return this._impl.next()}throw(t){return this._impl.throw(t)}return(t){return this._impl.return(t)}cancel(){return this._impl.cancel()}reset(t){return this._impl.reset(t),this._DOMStream=void 0,this._nodeStream=void 0,this}open(t){let e=this._impl.open(t);return $n(e)?e.then(()=>this):this}readRecordBatch(t){return this._impl.isFile()?this._impl.readRecordBatch(t):null}[Symbol.iterator](){return this._impl[Symbol.iterator]()}[Symbol.asyncIterator](){return this._impl[Symbol.asyncIterator]()}toDOMStream(){return un.toDOMStream(this.isSync()?{[Symbol.iterator]:()=>this}:{[Symbol.asyncIterator]:()=>this})}toNodeStream(){return un.toNodeStream(this.isSync()?{[Symbol.iterator]:()=>this}:{[Symbol.asyncIterator]:()=>this},{objectMode:!0})}static throughNode(t){throw new Error('"throughNode" not available in this environment')}static throughDOM(t,e){throw new Error('"throughDOM" not available in this environment')}static from(t){return t instanceof n?t:Vf(t)?tC(t):Gf(t)?iC(t):$n(t)?ut(this,void 0,void 0,function*(){return yield n.from(yield t)}):Wf(t)||Il(t)||qf(t)||di(t)?nC(new yi(t)):eC(new fr(t))}static readAll(t){return t instanceof n?t.isSync()?A0(t):E0(t):Vf(t)||ArrayBuffer.isView(t)||Li(t)||Hf(t)?A0(t):E0(t)}},qr=class extends ii{constructor(t){super(t),this._impl=t}readAll(){return[...this]}[Symbol.iterator](){return this._impl[Symbol.iterator]()}[Symbol.asyncIterator](){return jn(this,arguments,function*(){yield Ht(yield*ha(Pi(this[Symbol.iterator]())))})}},yo=class extends ii{constructor(t){super(t),this._impl=t}readAll(){var t,e;return ut(this,void 0,void 0,function*(){let i=new Array;try{for(var r=Pi(this),s;s=yield r.next(),!s.done;){let o=s.value;i.push(o)}}catch(o){t={error:o}}finally{try{s&&!s.done&&(e=r.return)&&(yield e.call(r))}finally{if(t)throw t.error}}return i})}[Symbol.iterator](){throw new Error("AsyncRecordBatchStreamReader is not Iterable")}[Symbol.asyncIterator](){return this._impl[Symbol.asyncIterator]()}},_o=class extends qr{constructor(t){super(t),this._impl=t}},ad=class extends yo{constructor(t){super(t),this._impl=t}},ld=class{constructor(t=new Map){this.closed=!1,this.autoDestroy=!0,this._dictionaryIndex=0,this._recordBatchIndex=0,this.dictionaries=t}get numDictionaries(){return this._dictionaryIndex}get numRecordBatches(){return this._recordBatchIndex}isSync(){return!1}isAsync(){return!1}isFile(){return!1}isStream(){return!1}reset(t){return this._dictionaryIndex=0,this._recordBatchIndex=0,this.schema=t,this.dictionaries=new Map,this}_loadRecordBatch(t,e){let i=this._loadVectors(t,e,this.schema.fields),r=Gt({type:new Te(this.schema.fields),length:t.length,children:i});return new He(this.schema,r)}_loadDictionaryBatch(t,e){let{id:i,isDelta:r}=t,{dictionaries:s,schema:o}=this,a=s.get(i);if(r||!a){let l=o.dictionaries.get(i),c=this._loadVectors(t.data,e,[l]);return(a&&r?a.concat(new se(c)):new se(c)).memoize()}return a.memoize()}_loadVectors(t,e,i){return new tc(e,t.nodes,t.buffers,this.dictionaries).visitMany(i)}},Ba=class extends ld{constructor(t,e){super(e),this._reader=Vf(t)?new Sc(this._handle=t):new Pa(this._handle=t)}isSync(){return!0}isStream(){return!0}[Symbol.iterator](){return this}cancel(){!this.closed&&(this.closed=!0)&&(this.reset()._reader.return(),this._reader=null,this.dictionaries=null)}open(t){return this.closed||(this.autoDestroy=C0(this,t),this.schema||(this.schema=this._reader.readSchema())||this.cancel()),this}throw(t){return!this.closed&&this.autoDestroy&&(this.closed=!0)?this.reset()._reader.throw(t):Ae}return(t){return!this.closed&&this.autoDestroy&&(this.closed=!0)?this.reset()._reader.return(t):Ae}next(){if(this.closed)return Ae;let t,{_reader:e}=this;for(;t=this._readNextMessageAndValidate();)if(t.isSchema())this.reset(t.header());else if(t.isRecordBatch()){this._recordBatchIndex++;let i=t.header(),r=e.readMessageBody(t.bodyLength);return{done:!1,value:this._loadRecordBatch(i,r)}}else if(t.isDictionaryBatch()){this._dictionaryIndex++;let i=t.header(),r=e.readMessageBody(t.bodyLength),s=this._loadDictionaryBatch(i,r);this.dictionaries.set(i.id,s)}return this.schema&&this._recordBatchIndex===0?(this._recordBatchIndex++,{done:!1,value:new mo(this.schema)}):this.return()}_readNextMessageAndValidate(t){return this._reader.readMessage(t)}},Oa=class extends ld{constructor(t,e){super(e),this._reader=new bc(this._handle=t)}isAsync(){return!0}isStream(){return!0}[Symbol.asyncIterator](){return this}cancel(){return ut(this,void 0,void 0,function*(){!this.closed&&(this.closed=!0)&&(yield this.reset()._reader.return(),this._reader=null,this.dictionaries=null)})}open(t){return ut(this,void 0,void 0,function*(){return this.closed||(this.autoDestroy=C0(this,t),this.schema||(this.schema=yield this._reader.readSchema())||(yield this.cancel())),this})}throw(t){return ut(this,void 0,void 0,function*(){return!this.closed&&this.autoDestroy&&(this.closed=!0)?yield this.reset()._reader.throw(t):Ae})}return(t){return ut(this,void 0,void 0,function*(){return!this.closed&&this.autoDestroy&&(this.closed=!0)?yield this.reset()._reader.return(t):Ae})}next(){return ut(this,void 0,void 0,function*(){if(this.closed)return Ae;let t,{_reader:e}=this;for(;t=yield this._readNextMessageAndValidate();)if(t.isSchema())yield this.reset(t.header());else if(t.isRecordBatch()){this._recordBatchIndex++;let i=t.header(),r=yield e.readMessageBody(t.bodyLength);return{done:!1,value:this._loadRecordBatch(i,r)}}else if(t.isDictionaryBatch()){this._dictionaryIndex++;let i=t.header(),r=yield e.readMessageBody(t.bodyLength),s=this._loadDictionaryBatch(i,r);this.dictionaries.set(i.id,s)}return this.schema&&this._recordBatchIndex===0?(this._recordBatchIndex++,{done:!1,value:new mo(this.schema)}):yield this.return()})}_readNextMessageAndValidate(t){return ut(this,void 0,void 0,function*(){return yield this._reader.readMessage(t)})}},cd=class extends Ba{constructor(t,e){super(t instanceof Jl?t:new Jl(t),e)}get footer(){return this._footer}get numDictionaries(){return this._footer?this._footer.numDictionaries:0}get numRecordBatches(){return this._footer?this._footer.numRecordBatches:0}isSync(){return!0}isFile(){return!0}open(t){if(!this.closed&&!this._footer){this.schema=(this._footer=this._readFooter()).schema;for(let e of this._footer.dictionaryBatches())e&&this._readDictionaryBatch(this._dictionaryIndex++)}return super.open(t)}readRecordBatch(t){var e;if(this.closed)return null;this._footer||this.open();let i=(e=this._footer)===null||e===void 0?void 0:e.getRecordBatch(t);if(i&&this._handle.seek(i.offset)){let r=this._reader.readMessage(ce.RecordBatch);if(r?.isRecordBatch()){let s=r.header(),o=this._reader.readMessageBody(r.bodyLength);return this._loadRecordBatch(s,o)}}return null}_readDictionaryBatch(t){var e;let i=(e=this._footer)===null||e===void 0?void 0:e.getDictionaryBatch(t);if(i&&this._handle.seek(i.offset)){let r=this._reader.readMessage(ce.DictionaryBatch);if(r?.isDictionaryBatch()){let s=r.header(),o=this._reader.readMessageBody(r.bodyLength),a=this._loadDictionaryBatch(s,o);this.dictionaries.set(s.id,a)}}}_readFooter(){let{_handle:t}=this,e=t.size-$m,i=t.readInt32(e),r=t.readAt(e-i,i);return Nr.decode(r)}_readNextMessageAndValidate(t){var e;if(this._footer||this.open(),this._footer&&this._recordBatchIndex<this.numRecordBatches){let i=(e=this._footer)===null||e===void 0?void 0:e.getRecordBatch(this._recordBatchIndex);if(i&&this._handle.seek(i.offset))return this._reader.readMessage(t)}return null}},Zm=class extends Oa{constructor(t,...e){let i=typeof e[0]!="number"?e.shift():void 0,r=e[0]instanceof Map?e.shift():void 0;super(t instanceof Ds?t:new Ds(t,i),r)}get footer(){return this._footer}get numDictionaries(){return this._footer?this._footer.numDictionaries:0}get numRecordBatches(){return this._footer?this._footer.numRecordBatches:0}isFile(){return!0}isAsync(){return!0}open(t){let e=Object.create(null,{open:{get:()=>super.open}});return ut(this,void 0,void 0,function*(){if(!this.closed&&!this._footer){this.schema=(this._footer=yield this._readFooter()).schema;for(let i of this._footer.dictionaryBatches())i&&(yield this._readDictionaryBatch(this._dictionaryIndex++))}return yield e.open.call(this,t)})}readRecordBatch(t){var e;return ut(this,void 0,void 0,function*(){if(this.closed)return null;this._footer||(yield this.open());let i=(e=this._footer)===null||e===void 0?void 0:e.getRecordBatch(t);if(i&&(yield this._handle.seek(i.offset))){let r=yield this._reader.readMessage(ce.RecordBatch);if(r?.isRecordBatch()){let s=r.header(),o=yield this._reader.readMessageBody(r.bodyLength);return this._loadRecordBatch(s,o)}}return null})}_readDictionaryBatch(t){var e;return ut(this,void 0,void 0,function*(){let i=(e=this._footer)===null||e===void 0?void 0:e.getDictionaryBatch(t);if(i&&(yield this._handle.seek(i.offset))){let r=yield this._reader.readMessage(ce.DictionaryBatch);if(r?.isDictionaryBatch()){let s=r.header(),o=yield this._reader.readMessageBody(r.bodyLength),a=this._loadDictionaryBatch(s,o);this.dictionaries.set(s.id,a)}}})}_readFooter(){return ut(this,void 0,void 0,function*(){let{_handle:t}=this;t._pending&&(yield t._pending);let e=t.size-$m,i=yield t.readInt32(e),r=yield t.readAt(e-i,i);return Nr.decode(r)})}_readNextMessageAndValidate(t){return ut(this,void 0,void 0,function*(){if(this._footer||(yield this.open()),this._footer&&this._recordBatchIndex<this.numRecordBatches){let e=this._footer.getRecordBatch(this._recordBatchIndex);if(e&&(yield this._handle.seek(e.offset)))return yield this._reader.readMessage(t)}return null})}},Jm=class extends Ba{constructor(t,e){super(t,e)}_loadVectors(t,e,i){return new Ph(e,t.nodes,t.buffers,this.dictionaries).visitMany(i)}};function C0(n,t){return t&&typeof t.autoDestroy=="boolean"?t.autoDestroy:n.autoDestroy}function*A0(n){let t=ii.from(n);try{if(!t.open({autoDestroy:!1}).closed)do yield t;while(!t.reset().open().closed)}finally{t.cancel()}}function E0(n){return jn(this,arguments,function*(){let e=yield Ht(ii.from(n));try{if(!(yield Ht(e.open({autoDestroy:!1}))).closed)do yield yield Ht(e);while(!(yield Ht(e.reset().open())).closed)}finally{yield Ht(e.cancel())}})}function tC(n){return new qr(new Jm(n))}function eC(n){let t=n.peek(Fa+7&-8);return t&&t.byteLength>=4?od(t)?new _o(new cd(n.read())):new qr(new Ba(n)):new qr(new Ba((function*(){})()))}function nC(n){return ut(this,void 0,void 0,function*(){let t=yield n.peek(Fa+7&-8);return t&&t.byteLength>=4?od(t)?new _o(new cd(yield n.read())):new yo(new Oa(n)):new yo(new Oa((function(){return jn(this,arguments,function*(){})})()))})}function iC(n){return ut(this,void 0,void 0,function*(){let{size:t}=yield n.stat(),e=new Ds(n,t);return t>=T0&&od(yield e.readAt(0,Fa+7&-8))?new ad(new Zm(e)):new yo(new Oa(e))})}var qe=class n extends It{constructor(){super(),this._byteLength=0,this._nodes=[],this._buffers=[],this._bufferRegions=[]}static assemble(...t){let e=r=>r.flatMap(s=>Array.isArray(s)?e(s):s instanceof He?s.data.children:s.data),i=new n;return i.visitMany(e(t)),i}visit(t){if(t instanceof se)return this.visitMany(t.data),this;let{type:e}=t;if(!Et.isDictionary(e)){let{length:i,nullCount:r}=t;if(i>2147483647)throw new RangeError("Cannot write arrays larger than 2^31 - 1 in length");Et.isNull(e)||ji.call(this,r<=0?new Uint8Array(0):va(t.offset,i,t.nullBitmap)),this.nodes.push(new Yi(i,r))}return super.visit(t)}visitNull(t){return this}visitDictionary(t){return this.visit(t.clone(t.type.indices))}get nodes(){return this._nodes}get buffers(){return this._buffers}get byteLength(){return this._byteLength}get bufferRegions(){return this._bufferRegions}};function ji(n){let t=n.byteLength+7&-8;return this.buffers.push(n),this.bufferRegions.push(new On(this._byteLength,t)),this._byteLength+=t,this}function rC(n){let{type:t,length:e,typeIds:i,valueOffsets:r}=n;if(ji.call(this,i),t.mode===ke.Sparse)return Km.call(this,n);if(t.mode===ke.Dense){if(n.offset<=0)return ji.call(this,r),Km.call(this,n);{let s=i.reduce((u,f)=>Math.max(u,f),i[0]),o=new Int32Array(s+1),a=new Int32Array(s+1).fill(-1),l=new Int32Array(e),c=Rl(-r[0],e,r);for(let u,f,h=-1;++h<e;)(f=a[u=i[h]])===-1&&(f=a[u]=c[u]),l[h]=c[h]-f,++o[u];ji.call(this,l);for(let u,f=-1,h=t.children.length;++f<h;)if(u=n.children[f]){let p=t.typeIds[f],g=Math.min(e,o[p]);this.visit(u.slice(a[p],g))}}}return this}function sC(n){let t;return n.nullCount>=n.length?ji.call(this,new Uint8Array(0)):(t=n.values)instanceof Uint8Array?ji.call(this,va(n.offset,n.length,t)):ji.call(this,ro(n.values))}function Ps(n){return ji.call(this,n.values.subarray(0,n.length*n.stride))}function I0(n){let{length:t,values:e,valueOffsets:i}=n,r=i[0],s=i[t],o=Math.min(s-r,e.byteLength-r);return ji.call(this,Rl(-i[0],t,i)),ji.call(this,e.subarray(r,r+o)),this}function Qm(n){let{length:t,valueOffsets:e}=n;return e&&ji.call(this,Rl(e[0],t,e)),this.visit(n.children[0])}function Km(n){return this.visitMany(n.type.children.map((t,e)=>n.children[e]).filter(Boolean))[0]}qe.prototype.visitBool=sC;qe.prototype.visitInt=Ps;qe.prototype.visitFloat=Ps;qe.prototype.visitUtf8=I0;qe.prototype.visitBinary=I0;qe.prototype.visitFixedSizeBinary=Ps;qe.prototype.visitDate=Ps;qe.prototype.visitTimestamp=Ps;qe.prototype.visitTime=Ps;qe.prototype.visitDecimal=Ps;qe.prototype.visitList=Qm;qe.prototype.visitStruct=Km;qe.prototype.visitUnion=rC;qe.prototype.visitInterval=Ps;qe.prototype.visitFixedSizeList=Qm;qe.prototype.visitMap=Qm;var xo=class extends lo{constructor(t){super(),this._position=0,this._started=!1,this._sink=new ur,this._schema=null,this._dictionaryBlocks=[],this._recordBatchBlocks=[],this._dictionaryDeltaOffsets=new Map,En(t)||(t={autoDestroy:!0,writeLegacyIpcFormat:!1}),this._autoDestroy=typeof t.autoDestroy=="boolean"?t.autoDestroy:!0,this._writeLegacyIpcFormat=typeof t.writeLegacyIpcFormat=="boolean"?t.writeLegacyIpcFormat:!1}static throughNode(t){throw new Error('"throughNode" not available in this environment')}static throughDOM(t,e){throw new Error('"throughDOM" not available in this environment')}toString(t=!1){return this._sink.toString(t)}toUint8Array(t=!1){return this._sink.toUint8Array(t)}writeAll(t){return $n(t)?t.then(e=>this.writeAll(e)):di(t)?eg(this,t):tg(this,t)}get closed(){return this._sink.closed}[Symbol.asyncIterator](){return this._sink[Symbol.asyncIterator]()}toDOMStream(t){return this._sink.toDOMStream(t)}toNodeStream(t){return this._sink.toNodeStream(t)}close(){return this.reset()._sink.close()}abort(t){return this.reset()._sink.abort(t)}finish(){return this._autoDestroy?this.close():this.reset(this._sink,this._schema),this}reset(t=this._sink,e=null){return t===this._sink||t instanceof ur?this._sink=t:(this._sink=new ur,t&&Q_(t)?this.toDOMStream({type:"bytes"}).pipeTo(t):t&&tx(t)&&this.toNodeStream({objectMode:!1}).pipe(t)),this._started&&this._schema&&this._writeFooter(this._schema),this._started=!1,this._dictionaryBlocks=[],this._recordBatchBlocks=[],this._dictionaryDeltaOffsets=new Map,(!e||!po(e,this._schema))&&(e==null?(this._position=0,this._schema=null):(this._started=!0,this._schema=e,this._writeSchema(e))),this}write(t){let e=null;if(this._sink){if(t==null)return this.finish()&&void 0;if(t instanceof Bn&&!(e=t.schema))return this.finish()&&void 0;if(t instanceof He&&!(e=t.schema))return this.finish()&&void 0}else throw new Error("RecordBatchWriter is closed");if(e&&!po(e,this._schema)){if(this._started&&this._autoDestroy)return this.close();this.reset(this._sink,e)}t instanceof He?t instanceof mo||this._writeRecordBatch(t):t instanceof Bn?this.writeAll(t.batches):Li(t)&&this.writeAll(t)}_writeMessage(t,e=8){let i=e-1,r=Nn.encode(t),s=r.byteLength,o=this._writeLegacyIpcFormat?4:8,a=s+o+i&~i,l=a-s-o;return t.headerType===ce.RecordBatch?this._recordBatchBlocks.push(new kr(a,t.bodyLength,this._position)):t.headerType===ce.DictionaryBatch&&this._dictionaryBlocks.push(new kr(a,t.bodyLength,this._position)),this._writeLegacyIpcFormat||this._write(Int32Array.of(-1)),this._write(Int32Array.of(a-o)),s>0&&this._write(r),this._writePadding(l)}_write(t){if(this._started){let e=zt(t);e&&e.byteLength>0&&(this._sink.write(e),this._position+=e.byteLength)}return this}_writeSchema(t){return this._writeMessage(Nn.from(t))}_writeFooter(t){return this._writeLegacyIpcFormat?this._write(Int32Array.of(0)):this._write(Int32Array.of(-1,0))}_writeMagic(){return this._write(La)}_writePadding(t){return t>0?this._write(new Uint8Array(t)):this}_writeRecordBatch(t){let{byteLength:e,nodes:i,bufferRegions:r,buffers:s}=qe.assemble(t),o=new pn(t.numRows,i,r),a=Nn.from(o,e);return this._writeDictionaries(t)._writeMessage(a)._writeBodyBuffers(s)}_writeDictionaryBatch(t,e,i=!1){this._dictionaryDeltaOffsets.set(e,t.length+(this._dictionaryDeltaOffsets.get(e)||0));let{byteLength:r,nodes:s,bufferRegions:o,buffers:a}=qe.assemble(new se([t])),l=new pn(t.length,s,o),c=new Un(l,e,i),u=Nn.from(c,r);return this._writeMessage(u)._writeBodyBuffers(a)}_writeBodyBuffers(t){let e,i,r;for(let s=-1,o=t.length;++s<o;)(e=t[s])&&(i=e.byteLength)>0&&(this._write(e),(r=(i+7&-8)-i)>0&&this._writePadding(r));return this}_writeDictionaries(t){for(let[e,i]of t.dictionaries){let r=this._dictionaryDeltaOffsets.get(e)||0;if(r===0||(i=i?.slice(r)).length>0)for(let s of i.data)this._writeDictionaryBatch(s,e,r>0),r+=s.length}return this}},vo=class n extends xo{static writeAll(t,e){let i=new n(e);return $n(t)?t.then(r=>i.writeAll(r)):di(t)?eg(i,t):tg(i,t)}},bo=class n extends xo{static writeAll(t){let e=new n;return $n(t)?t.then(i=>e.writeAll(i)):di(t)?eg(e,t):tg(e,t)}constructor(){super(),this._autoDestroy=!0}_writeSchema(t){return this._writeMagic()._writePadding(2)}_writeFooter(t){let e=Nr.encode(new Nr(t,on.V4,this._recordBatchBlocks,this._dictionaryBlocks));return super._writeFooter(t)._write(e)._write(Int32Array.of(e.byteLength))._writeMagic()}};function tg(n,t){let e=t;t instanceof Bn&&(e=t.batches,n.reset(void 0,t.schema));for(let i of e)n.write(i);return n.finish()}function eg(n,t){var e,i,r,s;return ut(this,void 0,void 0,function*(){try{for(e=Pi(t);i=yield e.next(),!i.done;){let o=i.value;n.write(o)}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=e.return)&&(yield s.call(e))}finally{if(r)throw r.error}}return n.finish()})}function R0(n,t){if(di(n))return aC(n,t);if(Li(n))return oC(n,t);throw new Error("toDOMStream() must be called with an Iterable or AsyncIterable")}function oC(n,t){let e=null,i=t?.type==="bytes"||!1,r=t?.highWaterMark||Math.pow(2,24);return new ReadableStream(Object.assign(Object.assign({},t),{start(o){s(o,e||(e=n[Symbol.iterator]()))},pull(o){e?s(o,e):o.close()},cancel(){(e?.return&&e.return()||!0)&&(e=null)}}),Object.assign({highWaterMark:i?r:void 0},t));function s(o,a){let l,c=null,u=o.desiredSize||null;for(;!(c=a.next(i?u:null)).done;)if(ArrayBuffer.isView(c.value)&&(l=zt(c.value))&&(u!=null&&i&&(u=u-l.byteLength+1),c.value=l),o.enqueue(c.value),u!=null&&--u<=0)return;o.close()}}function aC(n,t){let e=null,i=t?.type==="bytes"||!1,r=t?.highWaterMark||Math.pow(2,24);return new ReadableStream(Object.assign(Object.assign({},t),{start(o){return ut(this,void 0,void 0,function*(){yield s(o,e||(e=n[Symbol.asyncIterator]()))})},pull(o){return ut(this,void 0,void 0,function*(){e?yield s(o,e):o.close()})},cancel(){return ut(this,void 0,void 0,function*(){(e?.return&&(yield e.return())||!0)&&(e=null)})}}),Object.assign({highWaterMark:i?r:void 0},t));function s(o,a){return ut(this,void 0,void 0,function*(){let l,c=null,u=o.desiredSize||null;for(;!(c=yield a.next(i?u:null)).done;)if(ArrayBuffer.isView(c.value)&&(l=zt(c.value))&&(u!=null&&i&&(u=u-l.byteLength+1),c.value=l),o.enqueue(c.value),u!=null&&--u<=0)return;o.close()})}}function L0(n){return new ng(n)}var ng=class{constructor(t){this._numChunks=0,this._finished=!1,this._bufferedSize=0;let{["readableStrategy"]:e,["writableStrategy"]:i,["queueingStrategy"]:r="count"}=t,s=J_(t,["readableStrategy","writableStrategy","queueingStrategy"]);this._controller=null,this._builder=uo(s),this._getSize=r!=="bytes"?D0:P0;let{["highWaterMark"]:o=r==="bytes"?Math.pow(2,14):1e3}=Object.assign({},e),{["highWaterMark"]:a=r==="bytes"?Math.pow(2,14):1e3}=Object.assign({},i);this.readable=new ReadableStream({cancel:()=>{this._builder.clear()},pull:l=>{this._maybeFlush(this._builder,this._controller=l)},start:l=>{this._maybeFlush(this._builder,this._controller=l)}},{highWaterMark:o,size:r!=="bytes"?D0:P0}),this.writable=new WritableStream({abort:()=>{this._builder.clear()},write:()=>{this._maybeFlush(this._builder,this._controller)},close:()=>{this._maybeFlush(this._builder.finish(),this._controller)}},{highWaterMark:a,size:l=>this._writeValueAndReturnChunkSize(l)})}_writeValueAndReturnChunkSize(t){let e=this._bufferedSize;return this._bufferedSize=this._getSize(this._builder.append(t)),this._bufferedSize-e}_maybeFlush(t,e){e!=null&&(this._bufferedSize>=e.desiredSize&&++this._numChunks&&this._enqueue(e,t.toVector()),t.finished&&((t.length>0||this._numChunks===0)&&++this._numChunks&&this._enqueue(e,t.toVector()),!this._finished&&(this._finished=!0)&&this._enqueue(e,null)))}_enqueue(t,e){this._bufferedSize=0,this._controller=null,e==null?t.close():t.enqueue(e)}},D0=n=>{var t;return(t=n?.length)!==null&&t!==void 0?t:0},P0=n=>{var t;return(t=n?.byteLength)!==null&&t!==void 0?t:0};function ud(n,t){let e=new ur,i=null,r=new ReadableStream({cancel(){return ut(this,void 0,void 0,function*(){yield e.close()})},start(a){return ut(this,void 0,void 0,function*(){yield o(a,i||(i=yield s()))})},pull(a){return ut(this,void 0,void 0,function*(){i?yield o(a,i):a.close()})}});return{writable:new WritableStream(e,Object.assign({highWaterMark:Math.pow(2,14)},n)),readable:r};function s(){return ut(this,void 0,void 0,function*(){return yield(yield ii.from(e)).open(t)})}function o(a,l){return ut(this,void 0,void 0,function*(){let c=a.desiredSize,u=null;for(;!(u=yield l.next()).done;)if(a.enqueue(u.value),c!=null&&--c<=0)return;a.close()})}}function fd(n,t){let e=new this(n),i=new yi(e),r=new ReadableStream({cancel(){return ut(this,void 0,void 0,function*(){yield i.cancel()})},pull(o){return ut(this,void 0,void 0,function*(){yield s(o)})},start(o){return ut(this,void 0,void 0,function*(){yield s(o)})}},Object.assign({highWaterMark:Math.pow(2,14)},t));return{writable:new WritableStream(e,n),readable:r};function s(o){return ut(this,void 0,void 0,function*(){let a=null,l=o.desiredSize;for(;a=yield i.read(l||null);)if(o.enqueue(a),l!=null&&(l-=a.byteLength)<=0)return;o.close()})}}function Ls(n){let t=ii.from(n);return $n(t)?t.then(e=>Ls(e)):t.isAsync()?t.readAll().then(e=>new Bn(e)):new Bn(t.readAll())}function Ua(n,t="stream"){return(t==="stream"?vo:bo).writeAll(n).toUint8Array(!0)}var lC=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},pm),km),Rm),mm),um),Im),{compareSchemas:po,compareFields:o0,compareTypes:a0});un.toDOMStream=R0;De.throughDOM=L0;ii.throughDOM=ud;_o.throughDOM=ud;qr.throughDOM=ud;xo.throughDOM=fd;bo.throughDOM=fd;vo.throughDOM=fd;var hd=(function(){function n(t,e,i,r){var s=this;this.getCell=function(o,a){var l=o<s.headerRows&&a<s.headerColumns,c=o>=s.headerRows&&a<s.headerColumns,u=o<s.headerRows&&a>=s.headerColumns;if(l){var f=["blank"];return a>0&&f.push("level"+o),{type:"blank",classNames:f.join(" "),content:""}}else if(u){var h=a-s.headerColumns,f=["col_heading","level"+o,"col"+h];return{type:"columns",classNames:f.join(" "),content:s.getContent(s.columnsTable,h,o)}}else if(c){var p=o-s.headerRows,f=["row_heading","level"+a,"row"+p];return{type:"index",id:"T_".concat(s.uuid,"level").concat(a,"_row").concat(p),classNames:f.join(" "),content:s.getContent(s.indexTable,p,a)}}else{var p=o-s.headerRows,h=a-s.headerColumns,f=["data","row"+p,"col"+h],g=s.styler?s.getContent(s.styler.displayValuesTable,p,h):s.getContent(s.dataTable,p,h);return{type:"data",id:"T_".concat(s.uuid,"row").concat(p,"_col").concat(h),classNames:f.join(" "),content:g}}},this.getContent=function(o,a,l){var c=o.getChildAt(l);if(c===null)return"";var u=s.getColumnTypeId(o,l);switch(u){case L.Timestamp:return s.nanosToDate(c.get(a));default:return c.get(a)}},this.dataTable=Ls(t),this.indexTable=Ls(e),this.columnsTable=Ls(i),this.styler=r?{caption:r.caption,displayValuesTable:Ls(r.displayValues),styles:r.styles,uuid:r.uuid}:void 0}return Object.defineProperty(n.prototype,"rows",{get:function(){return this.indexTable.numRows+this.columnsTable.numCols},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"columns",{get:function(){return this.indexTable.numCols+this.columnsTable.numRows},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"headerRows",{get:function(){return this.rows-this.dataRows},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"headerColumns",{get:function(){return this.columns-this.dataColumns},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"dataRows",{get:function(){return this.dataTable.numRows},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"dataColumns",{get:function(){return this.dataTable.numCols},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"uuid",{get:function(){return this.styler&&this.styler.uuid},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"caption",{get:function(){return this.styler&&this.styler.caption},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"styles",{get:function(){return this.styler&&this.styler.styles},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"table",{get:function(){return this.dataTable},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"index",{get:function(){return this.indexTable},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"columnTable",{get:function(){return this.columnsTable},enumerable:!1,configurable:!0}),n.prototype.serialize=function(){return{data:Ua(this.dataTable),index:Ua(this.indexTable),columns:Ua(this.columnsTable)}},n.prototype.getColumnTypeId=function(t,e){return t.schema.fields[e].type.typeId},n.prototype.nanosToDate=function(t){return new Date(t/1e6)},n})();var Mc=function(){return Mc=Object.assign||function(n){for(var t,e=1,i=arguments.length;e<i;e++){t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},Mc.apply(this,arguments)},wc;(function(n){n.COMPONENT_READY="streamlit:componentReady",n.SET_COMPONENT_VALUE="streamlit:setComponentValue",n.SET_FRAME_HEIGHT="streamlit:setFrameHeight"})(wc||(wc={}));var xi=(function(){function n(){}return n.API_VERSION=1,n.RENDER_EVENT="streamlit:render",n.events=new EventTarget,n.registeredMessageListener=!1,n.setComponentReady=function(){n.registeredMessageListener||(window.addEventListener("message",n.onMessageEvent),n.registeredMessageListener=!0),n.sendBackMsg(wc.COMPONENT_READY,{apiVersion:n.API_VERSION})},n.setFrameHeight=function(t){t===void 0&&(t=document.body.scrollHeight),t!==n.lastFrameHeight&&(n.lastFrameHeight=t,n.sendBackMsg(wc.SET_FRAME_HEIGHT,{height:t}))},n.setComponentValue=function(t){var e;t instanceof hd?(e="dataframe",t=t.serialize()):uC(t)?(e="bytes",t=new Uint8Array(t.buffer)):t instanceof ArrayBuffer?(e="bytes",t=new Uint8Array(t)):e="json",n.sendBackMsg(wc.SET_COMPONENT_VALUE,{value:t,dataType:e})},n.onMessageEvent=function(t){var e=t.data.type;switch(e){case n.RENDER_EVENT:n.onRenderMessage(t.data);break}},n.onRenderMessage=function(t){var e=t.args;e==null&&(console.error("Got null args in onRenderMessage. This should never happen"),e={});var i=t.dfs&&t.dfs.length>0?n.argsDataframeToObject(t.dfs):{};e=Mc(Mc({},e),i);var r=!!t.disabled,s=t.theme;s&&cC(s);var o={disabled:r,args:e,theme:s},a=new CustomEvent(n.RENDER_EVENT,{detail:o});n.events.dispatchEvent(a)},n.argsDataframeToObject=function(t){var e=t.map(function(i){var r=i.key,s=i.value;return[r,n.toArrowTable(s)]});return Object.fromEntries(e)},n.toArrowTable=function(t){var e,i=(e=t.data,e.data),r=e.index,s=e.columns,o=e.styler;return new hd(i,r,s,o)},n.sendBackMsg=function(t,e){window.parent.postMessage(Mc({isStreamlitMessage:!0,type:t},e),"*")},n})(),cC=function(n){var t=document.createElement("style");document.head.appendChild(t),t.innerHTML=`
    :root {
      --primary-color: `.concat(n.primaryColor,`;
      --background-color: `).concat(n.backgroundColor,`;
      --secondary-background-color: `).concat(n.secondaryBackgroundColor,`;
      --text-color: `).concat(n.textColor,`;
      --font: `).concat(n.font,`;
    }

    body {
      background-color: var(--background-color);
      color: var(--text-color);
    }
  `)};function uC(n){var t=!1;try{t=n instanceof BigInt64Array||n instanceof BigUint64Array}catch{}return n instanceof Int8Array||n instanceof Uint8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array||t}var fC=(function(){var n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(i,r){i.__proto__=r}||function(i,r){for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[s]=r[s])},n(t,e)};return function(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");n(t,e);function i(){this.constructor=t}t.prototype=e===null?Object.create(e):(i.prototype=e.prototype,new i)}})(),dC=(function(n){fC(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.componentDidMount=function(){xi.setFrameHeight()},t.prototype.componentDidUpdate=function(){xi.setFrameHeight()},t})(F0.default.PureComponent);var B0=(n,t,e=[])=>{let i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(t).forEach(r=>{i.setAttribute(r,String(t[r]))}),e.length&&e.forEach(r=>{let s=B0(...r);i.appendChild(s)}),i},O0=([n,t,e])=>B0(n,t,e);var pC=n=>Array.from(n.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}),mC=n=>typeof n=="string"?n:!n||!n.class?"":n.class&&typeof n.class=="string"?n.class.split(" "):n.class&&Array.isArray(n.class)?n.class:"",gC=n=>n.flatMap(mC).map(e=>e.trim()).filter(Boolean).filter((e,i,r)=>r.indexOf(e)===i).join(" "),yC=n=>n.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,i)=>e.toUpperCase()+i.toLowerCase()),ig=(n,{nameAttr:t,icons:e,attrs:i})=>{let r=n.getAttribute(t);if(r==null)return;let s=yC(r),o=e[s];if(!o)return console.warn(`${n.outerHTML} icon name was not found in the provided icons object.`);let a=pC(n),[l,c,u]=o,f={...c,"data-lucide":r,...i,...a},h=gC(["lucide",`lucide-${r}`,a,i]);h&&Object.assign(f,{class:h});let p=O0([l,f,u]);return n.parentNode?.replaceChild(p,n)};var dd={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var rg=["svg",dd,[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]]];var sg=["svg",dd,[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]]];var U0=({icons:n={},nameAttr:t="data-lucide",attrs:e={}}={})=>{if(!Object.values(n).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");let i=document.querySelectorAll(`[${t}]`);if(Array.from(i).forEach(r=>ig(r,{nameAttr:t,icons:n,attrs:e})),t==="data-lucide"){let r=document.querySelectorAll("[icon-name]");r.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(r).forEach(s=>ig(s,{nameAttr:"icon-name",icons:n,attrs:e})))}};function N0(n,t,e,i=[0,0,0]){return e.map((r,s)=>r+(t-1)*(r-n.center[s])+i[s])}function k0(n,t,e,i={}){let r=new Map(n.map(o=>[o.part_id,o])),s=Object.fromEntries(n.map(o=>[String(o.part_id),[0,0,0]]));for(let o of e){let a=r.get(o.parent_id),l=r.get(o.child_id);s[String(l.part_id)]=o.anchor.map((c,u)=>(t[String(a.part_id)]-1)*(c-a.center[u])+s[String(a.part_id)][u]-(t[String(l.part_id)]-1)*(c-l.center[u]))}return Object.fromEntries(n.map(o=>{let a=String(o.part_id);return[a,s[a].map((l,c)=>l+(i[a]?.[c]??0))]}))}function z0(n,t,e){return Object.fromEntries(n.filter(i=>i.center).map(i=>{let r=t[String(i.part_id)];return[String(i.part_id),{scale:r,shift:i.center.map((s,o)=>(1-r)*s+e[String(i.part_id)][o])}]}))}function _C(n,t,e,i){let r=n.vertices[t],s=e[String(n.part_id)],o=r.map((l,c)=>s.scale*l+s.shift[c]),a=[...o];for(let l of i?.influences??[]){let c=l.weights[t];if(!c)continue;let u=e[String(l.reference_part_id)];for(let f=0;f<3;f+=1)a[f]+=c*(u.scale*r[f]+u.shift[f]-o[f])}return a}function V0(n,t,e,i){let r=t[String(n.part_id)];for(let s=0;s<n.vertices.length;s+=1){let o=n.vertices[s];for(let a=0;a<3;a+=1){let l=r.scale*o[a]+r.shift[a],c=l;for(let u of e.influences){let f=t[String(u.reference_part_id)];c+=u.weights[s]*(f.scale*o[a]+f.shift[a]-l)}i[s*3+a]=c-n.center[a]}}}function H0(n,t,e,i,r){let s=t.get(n.part_id),o=[0,0,0];for(let[a,l]of n.indices.entries()){let c=_C(s,l,e,i.parts[String(s.part_id)]);for(let u=0;u<3;u+=1)o[u]+=n.weights[a]*c[u]}return o.map((a,l)=>a+r[String(s.part_id)][l])}function G0(n,t){if(n==null)return{parts:{},anchors:{}};let e=new Map(t.map(o=>[o.part_id,o])),i=n.parts??{},r=n.anchors??{},s=()=>{throw new Error("\u5883\u754C\u306A\u3058\u307E\u305B\u306E\u9802\u70B9\u5BFE\u5FDC\u307E\u305F\u306F\u91CD\u307F\u304C\u4E0D\u6B63\u3067\u3059\u3002")};for(let[o,a]of Object.entries(i)){let l=e.get(Number(o));(!l?.center||!Array.isArray(a?.influences))&&s();let c=new Float64Array(l.vertices.length),u=new Set;for(let f of a.influences){(!e.get(f.reference_part_id)?.center||u.has(f.reference_part_id)||!Array.isArray(f.weights)||f.weights.length!==l.vertices.length)&&s(),u.add(f.reference_part_id);for(let[h,p]of f.weights.entries())(typeof p!="number"||!Number.isFinite(p)||p<0||p>1)&&s(),c[h]+=p,c[h]>1+1e-8&&s()}}for(let o of Object.values(r)){(!Array.isArray(o)||o.length!==2)&&s();for(let a of o){let l=e.get(a?.part_id);(!l?.center||!Array.isArray(a.indices)||!a.indices.length||!Array.isArray(a.weights)||a.indices.length!==a.weights.length)&&s();let c=0;for(let[u,f]of a.indices.entries()){let h=a.weights[u];(!Number.isInteger(f)||f<0||f>=l.vertices.length||typeof h!="number"||!Number.isFinite(h)||h<0)&&s(),c+=h}Math.abs(c-1)>1e-8&&s()}}return{...n,parts:i,anchors:r}}function og(n,t){return t.basis.map(e=>e.reduce((i,r,s)=>i+r*n[s],0))}function xC(n,t){return[0,1,2].map(e=>n.reduce((i,r,s)=>i+r*t.basis[s][e],0))}function W0(n,t,e,i){let r=og(n,i);return r[t]=e,xC(r,i)}function X0(n,t){let e={};for(let i of t){let r=String(i.part_id),s=n?.[r]??{basis:[[1,0,0],[0,1,0],[0,0,1]],labels:["X","Y","Z"],method:"input_xyz"},o=s.basis,a=()=>{throw new Error("\u30D1\u30FC\u30C4\u306E\u79FB\u52D5\u8EF8\u304C\u4E0D\u6B63\u3067\u3059\u3002")};(!Array.isArray(o)||o.length!==3||!Array.isArray(s.labels)||s.labels.length!==3||!s.labels.every(h=>typeof h=="string"))&&a();for(let h of o)(!Array.isArray(h)||h.length!==3||!h.every(p=>typeof p=="number"&&Number.isFinite(p)))&&a();for(let h=0;h<3;h+=1)for(let p=0;p<3;p+=1){let g=o[h].reduce((_,m,d)=>_+m*o[p][d],0);Math.abs(g-(h===p?1:0))>1e-7&&a()}let[l,c,u]=o,f=l[0]*(c[1]*u[2]-c[2]*u[1])-l[1]*(c[0]*u[2]-c[2]*u[0])+l[2]*(c[0]*u[1]-c[1]*u[0]);Math.abs(f-1)>1e-7&&a(),e[r]=s}return e}function q0(n,t){let e={};for(let i of t){let r=n?.[String(i.part_id)]??[];if(!Array.isArray(r)||!r.every(s=>Number.isInteger(s)&&s>=0&&s<i.faces.length/3))throw new Error("\u91CD\u306A\u308A\u8868\u793A\u306EFace\u5BFE\u5FDC\u304C\u4E0D\u6B63\u3067\u3059\u3002");e[String(i.part_id)]=r}return e}function Y0(n,t,e,i=new Float32Array(e.length*9)){let r=0;for(let s of e)for(let o=0;o<3;o+=1){let a=t[s*3+o]*3;for(let l=0;l<3;l+=1)i[r++]=n[a+l]}return i}function Tc(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)?n:{}}function vC(n){let t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let s of n)for(let o of s.vertices)for(let a=0;a<3;a+=1)t[a]=Math.min(t[a],o[a]),e[a]=Math.max(e[a],o[a]);let i=Math.max(...e.map((s,o)=>s-t[o])),r=Number.isFinite(i)&&i>0?i:1;return{limit:r,step:r/1e3}}function j0(n){let t=Tc(n);if(!Array.isArray(t.parts)||!t.parts.length||typeof t.source_key!="string"||!t.source_key)throw new Error("\u7DE8\u96C6\u7528\u306E\u30D1\u30FC\u30C4\u30C7\u30FC\u30BF\u3092\u53D7\u3051\u53D6\u308C\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u753B\u9762\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002");let e=Tc(t.scales),i=Tc(t.offsets),r={},s={};for(let f of t.parts){let h=String(f.part_id),p=e[h]??1,g=i[h]??[0,0,0];if(typeof p!="number"||!Number.isFinite(p)||p<.1||p>3)throw new Error("\u30D1\u30FC\u30C4\u306E\u500D\u7387\u304C\u4E0D\u6B63\u3067\u3059\u3002");if(!Array.isArray(g)||g.length!==3||!g.every(_=>typeof _=="number"&&Number.isFinite(_)))throw new Error("\u30D1\u30FC\u30C4\u306EX/Y/Z\u79FB\u52D5\u91CF\u304C\u4E0D\u6B63\u3067\u3059\u3002");r[h]=p,s[h]=[...g]}let o=Tc(t.movement),a=Number.isFinite(o.limit)&&o.limit>0&&Number.isFinite(o.step)&&o.step>0,l=a?{limit:o.limit,step:o.step}:vC(t.parts),c=Tc(t.layout),u={...c,connections:Array.isArray(c.connections)?c.connections:[],attachments:Array.isArray(c.attachments)?c.attachments:[]};return{...t,scales:r,offsets:s,movement:l,layout:u,blending:G0(t.blending,t.parts),movement_frames:X0(t.movement_frames,t.parts),movement_key:t.movement_key??"input_xyz",show_movement_axes:t.show_movement_axes===!0,overlap_faces:q0(t.overlap_faces,t.parts),show_overlaps:t.show_overlaps===!0,overlap_status:typeof t.overlap_status=="string"?t.overlap_status:"",blending_key:t.blending_key??"legacy",source_key:t.source_key,sequence:Number.isInteger(t.sequence)&&t.sequence>=0?t.sequence:0,layout_key:t.layout_key??JSON.stringify(u),up_dir:/^[+-][XYZ]$/.test(t.up_dir)?t.up_dir:"+Z",follow:t.follow===!0,show_anchors:t.show_anchors===!0,supports_movement:a&&t.offsets!==null&&typeof t.offsets=="object"&&!Array.isArray(t.offsets)}}var ag={source_to_z_up:{"+X":[[0,0,-1],[0,1,0],[1,0,0]],"-X":[[0,0,1],[0,1,0],[-1,0,0]],"+Y":[[1,0,0],[0,0,-1],[0,1,0]],"-Y":[[1,0,0],[0,0,1],[0,-1,0]],"+Z":[[1,0,0],[0,1,0],[0,0,1]],"-Z":[[1,0,0],[0,-1,0],[0,0,-1]]},camera_eye:[1.5,-2,1.5]};var $0=[0,0,1],Z0=ag.camera_eye;function lg(n){let t=ag.source_to_z_up[n];if(!t)throw new Error("\u30E2\u30C7\u30EB\u306E\u4E0A\u65B9\u5411\u304C\u4E0D\u6B63\u3067\u3059\u3002");return new Ie().set(...t[0],0,...t[1],0,...t[2],0,0,0,0,1)}function J0(n,t){n.quaternion.setFromRotationMatrix(lg(t)),n.updateMatrixWorld(!0)}var cg=document.getElementById("viewport"),K0=document.getElementById("sliders"),md=document.getElementById("error"),SC=.1,MC=3,gd=null,Ic=0,$r={},dr={},Bs={limit:1,step:.001},Ac={},Q0=null,pd=new Map,dg=!1,pg={},Ec=new Map,yd=!1,mg="",Co=!1,Eo=!1,Na=!0,tv=0,wo=new P,Os=new Map,ka=new Map,Yr=null,Fs=[],To={connections:[],attachments:[]},ug=null,Cc={parts:{},anchors:{}},ev=null,nv=null,gg=!1,_d=!1,vi=null,So=null,Mo=null,iv=1,cn,Ao,ln,bi,Us,jr;U0({icons:{RotateCcw:sg,Focus:rg}});function fg(n){console.error("Part editor render failed",n),md.hidden=!1,md.textContent=`3D\u8868\u793A\u3092\u958B\u59CB\u3067\u304D\u307E\u305B\u3093\uFF1A${n.message||n}`,xi.setFrameHeight(document.getElementById("workspace").offsetHeight+4)}try{cn=new Tf({antialias:!0,preserveDrawingBuffer:!0}),cn.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),cn.setClearColor(16317179),cn.outputColorSpace=Tn,cg.appendChild(cn.domElement),cn.domElement.setAttribute("aria-label","\u30D1\u30FC\u30C4\u7DE8\u96C6\u306E3D\u8868\u793A"),cn.domElement.addEventListener("webglcontextlost",n=>{n.preventDefault(),fg(new Error("WebGL\u306E\u63A5\u7D9A\u304C\u5931\u308F\u308C\u307E\u3057\u305F\u3002\u753B\u9762\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002"))}),Ao=new rl,ln=new _n(38,1,.001,1e4),Ao.add(new dl(16777215,12898518,2.3));for(let[n,t]of[[[3,-4,5],2.8],[[-4,2,1],1.2]]){let e=new ml(16777215,t);e.position.set(...n),Ao.add(e)}Us=new Ai,jr=new Ai,jr.add(Us),Ao.add(jr),ln.position.set(3,-4,3)}catch(n){fg(n)}function Rc(){if(!cn||!bi||!Os.size)return;Us.updateWorldMatrix(!0,!0);let n=new Wn().setFromObject(Us),t=n.getCenter(new P),e=Math.max(n.getSize(new P).length()/2,1e-8),i=ln.position.clone().sub(bi.target).normalize();i.lengthSq()||i.set(1,-1,.8).normalize();let r=Math.min(ln.fov*Math.PI/360,Math.atan(Math.tan(ln.fov*Math.PI/360)*ln.aspect)),s=e/Math.sin(r)*1.25;ln.position.copy(t).addScaledVector(i,s),ln.near=e/1e3,ln.far=e*1e3,ln.updateProjectionMatrix(),bi.target.copy(t),bi.minDistance=e/20,bi.maxDistance=e*100,bi.update(),tv=e,Na=!0}function wC(){if(!cn||!bi||!Os.size)return;Us.updateWorldMatrix(!0,!0);let n=new Wn().setFromObject(Us);n.getSize(new P).length()/2+n.getCenter(new P).distanceTo(bi.target)>tv*1.25&&Rc()}function Dc(){let n=k0(Fs,$r,gg?To.attachments:[]),t=Object.fromEntries(Fs.map(r=>{let s=String(r.part_id);return[s,n[s].map((o,a)=>o+dr[s][a])]})),e=z0(Fs,$r,n),i=new Map(Fs.map(r=>[r.part_id,r]));for(let r of Fs){let s=pd.get(String(r.part_id));s&&(s.position.set(...r.center).add(new P(...t[String(r.part_id)])).sub(wo),s.visible=dg)}for(let r of Fs){let s=Os.get(String(r.part_id));if(!s)continue;let o=String(r.part_id),a=Cc.parts[o];if(a){let l=s.geometry.getAttribute("position");V0(r,e,a,l.array),l.needsUpdate=!0,s.geometry.computeVertexNormals(),s.geometry.computeBoundingBox(),s.geometry.computeBoundingSphere(),s.scale.setScalar(1),s.position.set(...r.center).add(new P(...dr[o])).sub(wo)}else s.scale.setScalar($r[o]),s.position.set(...r.center).add(new P(...t[o])).sub(wo)}if(vi){let r=vi.getAttribute("position"),s=vi.getAttribute("color");for(let[o,a]of To.connections.entries()){let l=Cc.anchors[String(a.connection_id)],c=l?l.map(h=>H0(h,i,e,Cc,dr)):[a.part_a,a.part_b].map(h=>N0(i.get(h),$r[String(h)],a.anchor,t[String(h)])),u=new P(...c[0]).distanceTo(new P(...c[1])),f=new Jt(u<=iv*1e-7?555107:14377010);for(let h=0;h<2;h+=1){let p=new P(...c[h]).sub(wo);r.setXYZ(o*2+h,p.x,p.y,p.z),s.setXYZ(o*2+h,f.r,f.g,f.b)}}r.needsUpdate=!0,s.needsUpdate=!0,vi.computeBoundingSphere(),So.visible=_d,Mo.visible=_d}TC(),Na=!0,wC()}function TC(){for(let t of Fs){let e=String(t.part_id),i=Os.get(e),r=pg[e]??[];if(!i)continue;let s=Ec.get(e);if(!r.length){s&&(s.removeFromParent(),s.geometry.dispose(),s.material.dispose(),Ec.delete(e));continue}s||(s=new vn(new rn,new as({color:14756661,side:qn,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),s.renderOrder=10,i.add(s),Ec.set(e,s)),s.geometry.getAttribute("position")?.count!==r.length*3&&(s.geometry.dispose(),s.geometry=new rn,s.geometry.setAttribute("position",new xn(new Float32Array(r.length*9),3)));let o=s.geometry.getAttribute("position");Y0(i.geometry.getAttribute("position").array,t.faces,r,o.array),o.needsUpdate=!0,s.geometry.computeBoundingBox(),s.geometry.computeBoundingSphere(),s.visible=yd&&!Co}let n=document.getElementById("overlap-status");n.textContent=yd&&Co?"\u64CD\u4F5C\u7D42\u4E86\u5F8C\u306B\u91CD\u306A\u308A\u8868\u793A\u3092\u66F4\u65B0\u3057\u307E\u3059":mg}function xd(n,t,e=!0){let i=String(n);$r[i]=t;let r=ka.get(i);r&&(r.input.value=String(t),r.output.value=`${t.toFixed(2)}\xD7`),e&&(Co=!0,Dc())}function AC(n){return`${n>0?"+":""}${Number(n.toPrecision(6))}`}function EC(n,t,e,i=!0){let r=String(n);dr[r]=W0(dr[r],t,e,Ac[r]),vd(r),i&&(Co=!0,Dc())}function vd(n){let t=ka.get(n);if(t){let e=og(dr[n],Ac[n]);for(let i=0;i<3;i+=1){let r=e[i],s=Math.max(Bs.limit,Math.ceil(Math.abs(r)/Bs.step)*Bs.step);t.moveInputs[i].min=String(-s),t.moveInputs[i].max=String(s),t.moveInputs[i].value=String(r),t.moveOutputs[i].value=AC(r)}}}function hg(){gd&&(Eo=!1,Ic+=1,xi.setComponentValue({source_key:gd,sequence:Ic,scales:{...$r},offsets:Object.fromEntries(Object.entries(dr).map(([n,t])=>[n,[...t]]))}))}function CC(n){gd=n.source_key,Ic=Number(n.sequence)||0,$r={...n.scales},dr=Object.fromEntries(n.parts.map(r=>[String(r.part_id),[...n.offsets?.[String(r.part_id)]??[0,0,0]]])),Bs=n.movement,Ac=n.movement_frames,Q0=n.movement_key,dg=n.show_movement_axes,pg=n.overlap_faces,yd=n.show_overlaps,mg=n.overlap_status,Co=!1,Fs=n.parts,To=n.layout,ug=n.layout_key,Cc=n.blending,ev=n.blending_key,nv=n.up_dir,gg=n.follow,_d=n.show_anchors,ka.clear(),K0.replaceChildren();for(let r of Ec.values())r.removeFromParent(),r.geometry.dispose(),r.material.dispose();Ec.clear();for(let r of Os.values())Us?.remove(r),r.geometry.dispose(),r.material.dispose();Os.clear();for(let r of pd.values()){jr.remove(r);for(let s of r.children)s.line.material.dispose(),s.cone.material.dispose()}pd.clear(),vi&&(jr.remove(So,Mo),vi.dispose(),So.material.dispose(),Mo.material.dispose(),vi=So=Mo=null),Yr&&(Ao.remove(Yr),Yr.geometry.dispose(),Yr.material.dispose(),Yr=null);let t=new Wn;for(let r of n.parts)for(let s of r.vertices)t.expandByPoint(new P(...s));wo=t.getCenter(new P);let e=lg(n.up_dir),i=new P(...$0);jr&&J0(jr,n.up_dir),ln&&(ln.up.copy(i),ln.position.set(...Z0),bi?.dispose(),bi=b_(ln,cn.domElement,i),bi.addEventListener("change",()=>{Na=!0}));for(let r of n.parts){let s=String(r.part_id),o=!r.faces.length,a=document.createElement("div");a.className=o?"part empty":"part",a.dataset.partId=s;let l=document.createElement("div");l.className="part-heading";let c=document.createElement("span");c.className="swatch",c.style.backgroundColor=r.color;let u=document.createElement("label");u.className="part-name",u.textContent=r.name,u.htmlFor=`scale-${s}`;let f=document.createElement("output");f.htmlFor=`scale-${s}`;let h=document.createElement("input");if(h.type="range",h.id=`scale-${s}`,h.min=String(SC),h.max=String(MC),h.step="0.01",h.value=String($r[s]??1),h.disabled=o,h.setAttribute("aria-label",r.name),h.addEventListener("pointerdown",()=>{Eo=!0}),h.addEventListener("input",()=>xd(s,Number(h.value))),h.addEventListener("change",hg),h.addEventListener("pointercancel",()=>{Eo=!1}),l.append(c,u,f),a.append(l,h),o){let m=document.createElement("div");m.className="empty-label",m.textContent="\u9762\u306A\u3057",a.appendChild(m)}let p=document.createElement("div");p.className="endpoints";for(let m of["0.10","3.00"]){let d=document.createElement("span");d.textContent=m,p.appendChild(d)}a.appendChild(p);let g=[],_=[];for(let[m,d]of["X","Y","Z"].entries()){let A=Ac[s].labels[m],w=document.createElement("div");w.className="translation",w.dataset.axis=d;let S=document.createElement("div");S.className="translation-heading";let C=document.createElement("label");C.textContent=`${A} \u79FB\u52D5`,C.htmlFor=`move-${s}-${d}`;let E=document.createElement("output");E.htmlFor=C.htmlFor;let I=document.createElement("input");I.type="range",I.id=C.htmlFor,I.min=String(-Bs.limit),I.max=String(Bs.limit),I.step=String(Bs.step),I.disabled=o,I.setAttribute("aria-label",`${r.name} ${A}\u79FB\u52D5`),I.addEventListener("pointerdown",()=>{Eo=!0}),I.addEventListener("input",()=>EC(s,m,Number(I.value))),I.addEventListener("change",hg),S.append(C,E),w.append(S,I),a.appendChild(w),g.push(I),_.push(E)}if(K0.appendChild(a),ka.set(s,{input:h,output:f,empty:o,moveInputs:g,moveOutputs:_}),!o&&cn){let m=new P(...r.center),d=new Float32Array(r.vertices.length*3);r.vertices.forEach((B,b)=>{d[b*3]=B[0]-m.x,d[b*3+1]=B[1]-m.y,d[b*3+2]=B[2]-m.z});let A=new rn;A.setAttribute("position",new xn(d,3)),A.setIndex(r.faces),A.computeVertexNormals();let w=new ul({color:r.color,metalness:.02,roughness:.8,side:qn}),S=new vn(A,w);S.name=r.name,S.position.copy(m).sub(wo),S.userData.partId=r.part_id,Us.add(S),Os.set(s,S);let C=new Ai,E=new Wn().setFromPoints(r.vertices.map(B=>new P(...B))),I=Math.max(E.getSize(new P).length()*.25,Bs.limit*.02);Ac[s].basis.forEach((B,b)=>{let v=new yl(new P(...B),new P,I,[11749448,2653010,3501488][b]);for(let R of[v.line,v.cone])R.material.depthTest=!1,R.material.depthWrite=!1,R.renderOrder=30;C.add(v)}),jr.add(C),pd.set(s,C)}xd(s,Number($r[s]??1),!1),vd(s)}if(cn){let r=Math.max(t.getSize(new P).length(),1e-8);iv=r,To.connections.length&&(vi=new rn,vi.setAttribute("position",new We(new Float32Array(To.connections.length*6),3)),vi.setAttribute("color",new We(new Float32Array(To.connections.length*6),3)),So=new ol(vi,new ta({size:9,sizeAttenuation:!1,vertexColors:!0,depthTest:!1,depthWrite:!1})),Mo=new Qo(vi,new ls({vertexColors:!0,depthTest:!1,depthWrite:!1})),So.renderOrder=21,Mo.renderOrder=20,jr.add(So,Mo)),Yr=new gl(r*1.6,12,12964824,15002092),Yr.quaternion.setFromUnitVectors(new P(0,1,0),i);let s=1/0;for(let o of n.parts)for(let a of o.vertices)s=Math.min(s,new P(...a).sub(wo).applyMatrix4(e).z);Yr.position.copy(i).multiplyScalar(s-r*.015),Ao.add(Yr),Dc(),yg(),Rc()}}function yg(){if(cn){let n=Math.max(cg.clientWidth,1),t=Math.max(cg.clientHeight,1);cn.setSize(n,t,!1);let e=Math.abs(ln.aspect-n/t)>.01;ln.aspect=n/t,ln.updateProjectionMatrix(),e&&Os.size&&Rc(),Na=!0}xi.setFrameHeight(document.getElementById("workspace").offsetHeight+4)}document.getElementById("reset").addEventListener("click",()=>{for(let n of ka.keys())xd(n,1,!1),dr[n]=[0,0,0],vd(n);Co=!0,Dc(),hg()});document.getElementById("fit").addEventListener("click",Rc);window.addEventListener("pointerup",()=>{Eo=!1});window.addEventListener("pointercancel",()=>{Eo=!1});new ResizeObserver(yg).observe(document.getElementById("workspace"));xi.events.addEventListener(xi.RENDER_EVENT,n=>{try{let t=j0(n.detail?.args);if(t.source_key!==gd||t.blending_key!==ev||t.up_dir!==nv||t.movement_key!==Q0)CC(t);else{let i=ug!==t.layout_key;if(To=t.layout,ug=t.layout_key,gg=t.follow,_d=t.show_anchors,Cc=t.blending,dg=t.show_movement_axes,!Eo&&Number(t.sequence)>=Ic){Ic=Number(t.sequence);for(let[r,s]of Object.entries(t.scales))xd(r,Number(s),!1);for(let[r,s]of Object.entries(t.offsets))dr[r]=[...s],vd(r);pg=t.overlap_faces,yd=t.show_overlaps,mg=t.overlap_status,Co=!1}Dc(),i&&Rc()}for(let i of ka.values()){i.input.disabled=i.empty||!!n.detail.disabled;for(let r of i.moveInputs)r.disabled=i.empty||!!n.detail.disabled||!t.supports_movement}let e=document.getElementById("compatibility");e.hidden=t.supports_movement,e.textContent=t.supports_movement?"":"\u79FB\u52D5\u6A5F\u80FD\u306E\u66F4\u65B0\u304C\u53CD\u6620\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002Windows\u5074\u306EStreamlit\u3092\u518D\u8D77\u52D5\u3057\u3001\u753B\u9762\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002",cn&&!cn.getContext().isContextLost()&&(md.hidden=!0,md.textContent=""),yg()}catch(t){fg(t)}});function rv(){requestAnimationFrame(rv),cn&&(bi?.update(),Na&&(cn.render(Ao,ln),Na=!1))}rv();xi.setComponentReady();xi.setFrameHeight(540);
/*! For license information please see editor.js.LEGAL.txt */
