var N0=Object.create;var pd=Object.defineProperty;var k0=Object.getOwnPropertyDescriptor;var z0=Object.getOwnPropertyNames;var V0=Object.getPrototypeOf,H0=Object.prototype.hasOwnProperty;var wo=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),To=(n,t)=>{for(var e in t)pd(n,e,{get:t[e],enumerable:!0})},G0=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of z0(t))!H0.call(n,r)&&r!==e&&pd(n,r,{get:()=>t[r],enumerable:!(i=k0(t,r))||i.enumerable});return n};var lg=(n,t,e)=>(e=n!=null?N0(V0(n)):{},G0(t||!n||!n.__esModule?pd(e,"default",{value:n,enumerable:!0}):e,n));var o_=wo(ge=>{"use strict";var nn=typeof Symbol=="function"&&Symbol.for,Bp=nn?Symbol.for("react.element"):60103,Up=nn?Symbol.for("react.portal"):60106,vf=nn?Symbol.for("react.fragment"):60107,bf=nn?Symbol.for("react.strict_mode"):60108,Sf=nn?Symbol.for("react.profiler"):60114,Mf=nn?Symbol.for("react.provider"):60109,wf=nn?Symbol.for("react.context"):60110,Op=nn?Symbol.for("react.async_mode"):60111,Tf=nn?Symbol.for("react.concurrent_mode"):60111,Af=nn?Symbol.for("react.forward_ref"):60112,Ef=nn?Symbol.for("react.suspense"):60113,AT=nn?Symbol.for("react.suspense_list"):60120,Cf=nn?Symbol.for("react.memo"):60115,If=nn?Symbol.for("react.lazy"):60116,ET=nn?Symbol.for("react.block"):60121,CT=nn?Symbol.for("react.fundamental"):60117,IT=nn?Symbol.for("react.responder"):60118,RT=nn?Symbol.for("react.scope"):60119;function Xn(n){if(typeof n=="object"&&n!==null){var t=n.$$typeof;switch(t){case Bp:switch(n=n.type,n){case Op:case Tf:case vf:case Sf:case bf:case Ef:return n;default:switch(n=n&&n.$$typeof,n){case wf:case Af:case If:case Cf:case Mf:return n;default:return t}}case Up:return t}}}function s_(n){return Xn(n)===Tf}ge.AsyncMode=Op;ge.ConcurrentMode=Tf;ge.ContextConsumer=wf;ge.ContextProvider=Mf;ge.Element=Bp;ge.ForwardRef=Af;ge.Fragment=vf;ge.Lazy=If;ge.Memo=Cf;ge.Portal=Up;ge.Profiler=Sf;ge.StrictMode=bf;ge.Suspense=Ef;ge.isAsyncMode=function(n){return s_(n)||Xn(n)===Op};ge.isConcurrentMode=s_;ge.isContextConsumer=function(n){return Xn(n)===wf};ge.isContextProvider=function(n){return Xn(n)===Mf};ge.isElement=function(n){return typeof n=="object"&&n!==null&&n.$$typeof===Bp};ge.isForwardRef=function(n){return Xn(n)===Af};ge.isFragment=function(n){return Xn(n)===vf};ge.isLazy=function(n){return Xn(n)===If};ge.isMemo=function(n){return Xn(n)===Cf};ge.isPortal=function(n){return Xn(n)===Up};ge.isProfiler=function(n){return Xn(n)===Sf};ge.isStrictMode=function(n){return Xn(n)===bf};ge.isSuspense=function(n){return Xn(n)===Ef};ge.isValidElementType=function(n){return typeof n=="string"||typeof n=="function"||n===vf||n===Tf||n===Sf||n===bf||n===Ef||n===AT||typeof n=="object"&&n!==null&&(n.$$typeof===If||n.$$typeof===Cf||n.$$typeof===Mf||n.$$typeof===wf||n.$$typeof===Af||n.$$typeof===CT||n.$$typeof===IT||n.$$typeof===RT||n.$$typeof===ET)};ge.typeOf=Xn});var l_=wo((TD,a_)=>{"use strict";a_.exports=o_()});var m_=wo((AD,p_)=>{"use strict";var Np=l_(),DT={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},PT={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},LT={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},h_={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},kp={};kp[Np.ForwardRef]=LT;kp[Np.Memo]=h_;function c_(n){return Np.isMemo(n)?h_:kp[n.$$typeof]||DT}var FT=Object.defineProperty,BT=Object.getOwnPropertyNames,u_=Object.getOwnPropertySymbols,UT=Object.getOwnPropertyDescriptor,OT=Object.getPrototypeOf,f_=Object.prototype;function d_(n,t,e){if(typeof t!="string"){if(f_){var i=OT(t);i&&i!==f_&&d_(n,i,e)}var r=BT(t);u_&&(r=r.concat(u_(t)));for(var s=c_(n),o=c_(t),a=0;a<r.length;++a){var l=r[a];if(!PT[l]&&!(e&&e[l])&&!(o&&o[l])&&!(s&&s[l])){var c=UT(t,l);try{FT(n,l,c)}catch{}}}}return n}p_.exports=d_});var __=wo((ED,y_)=>{"use strict";var g_=Object.getOwnPropertySymbols,NT=Object.prototype.hasOwnProperty,kT=Object.prototype.propertyIsEnumerable;function zT(n){if(n==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(n)}function VT(){try{if(!Object.assign)return!1;var n=new String("abc");if(n[5]="de",Object.getOwnPropertyNames(n)[0]==="5")return!1;for(var t={},e=0;e<10;e++)t["_"+String.fromCharCode(e)]=e;var i=Object.getOwnPropertyNames(t).map(function(s){return t[s]});if(i.join("")!=="0123456789")return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(s){r[s]=s}),Object.keys(Object.assign({},r)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}y_.exports=VT()?Object.assign:function(n,t){for(var e,i=zT(n),r,s=1;s<arguments.length;s++){e=Object(arguments[s]);for(var o in e)NT.call(e,o)&&(i[o]=e[o]);if(g_){r=g_(e);for(var a=0;a<r.length;a++)kT.call(e,r[a])&&(i[r[a]]=e[r[a]])}}return i}});var R_=wo(ye=>{"use strict";var Wp=__(),Ri=typeof Symbol=="function"&&Symbol.for,bl=Ri?Symbol.for("react.element"):60103,HT=Ri?Symbol.for("react.portal"):60106,GT=Ri?Symbol.for("react.fragment"):60107,WT=Ri?Symbol.for("react.strict_mode"):60108,XT=Ri?Symbol.for("react.profiler"):60114,qT=Ri?Symbol.for("react.provider"):60109,YT=Ri?Symbol.for("react.context"):60110,jT=Ri?Symbol.for("react.forward_ref"):60112,$T=Ri?Symbol.for("react.suspense"):60113,ZT=Ri?Symbol.for("react.memo"):60115,JT=Ri?Symbol.for("react.lazy"):60116,x_=typeof Symbol=="function"&&Symbol.iterator;function Sl(n){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+n,e=1;e<arguments.length;e++)t+="&args[]="+encodeURIComponent(arguments[e]);return"Minified React error #"+n+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var v_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b_={};function sa(n,t,e){this.props=n,this.context=t,this.refs=b_,this.updater=e||v_}sa.prototype.isReactComponent={};sa.prototype.setState=function(n,t){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error(Sl(85));this.updater.enqueueSetState(this,n,t,"setState")};sa.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function S_(){}S_.prototype=sa.prototype;function Xp(n,t,e){this.props=n,this.context=t,this.refs=b_,this.updater=e||v_}var qp=Xp.prototype=new S_;qp.constructor=Xp;Wp(qp,sa.prototype);qp.isPureReactComponent=!0;var Yp={current:null},M_=Object.prototype.hasOwnProperty,w_={key:!0,ref:!0,__self:!0,__source:!0};function T_(n,t,e){var i,r={},s=null,o=null;if(t!=null)for(i in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(s=""+t.key),t)M_.call(t,i)&&!w_.hasOwnProperty(i)&&(r[i]=t[i]);var a=arguments.length-2;if(a===1)r.children=e;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:bl,type:n,key:s,ref:o,props:r,_owner:Yp.current}}function KT(n,t){return{$$typeof:bl,type:n.type,key:t,ref:n.ref,props:n.props,_owner:n._owner}}function jp(n){return typeof n=="object"&&n!==null&&n.$$typeof===bl}function QT(n){var t={"=":"=0",":":"=2"};return"$"+(""+n).replace(/[=:]/g,function(e){return t[e]})}var A_=/\/+/g,Rf=[];function E_(n,t,e,i){if(Rf.length){var r=Rf.pop();return r.result=n,r.keyPrefix=t,r.func=e,r.context=i,r.count=0,r}return{result:n,keyPrefix:t,func:e,context:i,count:0}}function C_(n){n.result=null,n.keyPrefix=null,n.func=null,n.context=null,n.count=0,10>Rf.length&&Rf.push(n)}function Vp(n,t,e,i){var r=typeof n;(r==="undefined"||r==="boolean")&&(n=null);var s=!1;if(n===null)s=!0;else switch(r){case"string":case"number":s=!0;break;case"object":switch(n.$$typeof){case bl:case HT:s=!0}}if(s)return e(i,n,t===""?"."+zp(n,0):t),1;if(s=0,t=t===""?".":t+":",Array.isArray(n))for(var o=0;o<n.length;o++){r=n[o];var a=t+zp(r,o);s+=Vp(r,a,e,i)}else if(n===null||typeof n!="object"?a=null:(a=x_&&n[x_]||n["@@iterator"],a=typeof a=="function"?a:null),typeof a=="function")for(n=a.call(n),o=0;!(r=n.next()).done;)r=r.value,a=t+zp(r,o++),s+=Vp(r,a,e,i);else if(r==="object")throw e=""+n,Error(Sl(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e,""));return s}function Hp(n,t,e){return n==null?0:Vp(n,"",t,e)}function zp(n,t){return typeof n=="object"&&n!==null&&n.key!=null?QT(n.key):t.toString(36)}function tA(n,t){n.func.call(n.context,t,n.count++)}function eA(n,t,e){var i=n.result,r=n.keyPrefix;n=n.func.call(n.context,t,n.count++),Array.isArray(n)?Gp(n,i,e,function(s){return s}):n!=null&&(jp(n)&&(n=KT(n,r+(!n.key||t&&t.key===n.key?"":(""+n.key).replace(A_,"$&/")+"/")+e)),i.push(n))}function Gp(n,t,e,i,r){var s="";e!=null&&(s=(""+e).replace(A_,"$&/")+"/"),t=E_(t,s,i,r),Hp(n,eA,t),C_(t)}var I_={current:null};function wr(){var n=I_.current;if(n===null)throw Error(Sl(321));return n}var nA={ReactCurrentDispatcher:I_,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:Yp,IsSomeRendererActing:{current:!1},assign:Wp};ye.Children={map:function(n,t,e){if(n==null)return n;var i=[];return Gp(n,i,null,t,e),i},forEach:function(n,t,e){if(n==null)return n;t=E_(null,null,t,e),Hp(n,tA,t),C_(t)},count:function(n){return Hp(n,function(){return null},null)},toArray:function(n){var t=[];return Gp(n,t,null,function(e){return e}),t},only:function(n){if(!jp(n))throw Error(Sl(143));return n}};ye.Component=sa;ye.Fragment=GT;ye.Profiler=XT;ye.PureComponent=Xp;ye.StrictMode=WT;ye.Suspense=$T;ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nA;ye.cloneElement=function(n,t,e){if(n==null)throw Error(Sl(267,n));var i=Wp({},n.props),r=n.key,s=n.ref,o=n._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,o=Yp.current),t.key!==void 0&&(r=""+t.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in t)M_.call(t,l)&&!w_.hasOwnProperty(l)&&(i[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)i.children=e;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:bl,type:n.type,key:r,ref:s,props:i,_owner:o}};ye.createContext=function(n,t){return t===void 0&&(t=null),n={$$typeof:YT,_calculateChangedBits:t,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null},n.Provider={$$typeof:qT,_context:n},n.Consumer=n};ye.createElement=T_;ye.createFactory=function(n){var t=T_.bind(null,n);return t.type=n,t};ye.createRef=function(){return{current:null}};ye.forwardRef=function(n){return{$$typeof:jT,render:n}};ye.isValidElement=jp;ye.lazy=function(n){return{$$typeof:JT,_ctor:n,_status:-1,_result:null}};ye.memo=function(n,t){return{$$typeof:ZT,type:n,compare:t===void 0?null:t}};ye.useCallback=function(n,t){return wr().useCallback(n,t)};ye.useContext=function(n,t){return wr().useContext(n,t)};ye.useDebugValue=function(){};ye.useEffect=function(n,t){return wr().useEffect(n,t)};ye.useImperativeHandle=function(n,t,e){return wr().useImperativeHandle(n,t,e)};ye.useLayoutEffect=function(n,t){return wr().useLayoutEffect(n,t)};ye.useMemo=function(n,t){return wr().useMemo(n,t)};ye.useReducer=function(n,t,e){return wr().useReducer(n,t,e)};ye.useRef=function(n){return wr().useRef(n)};ye.useState=function(n){return wr().useState(n)};ye.version="16.14.0"});var P_=wo((ID,D_)=>{"use strict";D_.exports=R_()});var ls={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bg=0,Yd=1,Ug=2;var jd=1,Og=2,Ki=3,vr=0,wn=1,ci=2,br=0,ks=1,$d=2,Zd=3,Jd=4,Ng=5,is=100,kg=101,zg=102,Vg=103,Hg=104,Gg=200,Wg=201,Xg=202,qg=203,Zc=204,Jc=205,Yg=206,jg=207,$g=208,Zg=209,Jg=210,Kg=211,Qg=212,ty=213,ey=214,bu=0,Su=1,Mu=2,zs=3,wu=4,Tu=5,Au=6,Eu=7,Kd=0,ny=1,iy=2,Sr=0,ry=1,sy=2,oy=3,ay=4,ly=5,cy=6,uy=7;var Qd=300,Ws=301,Xs=302,Cu=303,Iu=304,pl=306,Kc=1e3,ns=1001,Qc=1002,oi=1003,fy=1004;var ml=1005;var Ai=1006,Ru=1007;var us=1008;var Ii=1009,tp=1010,ep=1011,Zo=1012,Du=1013,fs=1014,Qi=1015,Jo=1016,Pu=1017,Lu=1018,Ko=1020,np=35902,ip=35899,rp=1021,sp=1022,ui=1023,zo=1026,Qo=1027,op=1028,Fu=1029,ap=1030,Bu=1031;var Uu=1033,gl=33776,yl=33777,_l=33778,xl=33779,Ou=35840,Nu=35841,ku=35842,zu=35843,Vu=36196,Hu=37492,Gu=37496,Wu=37808,Xu=37809,qu=37810,Yu=37811,ju=37812,$u=37813,Zu=37814,Ju=37815,Ku=37816,Qu=37817,tf=37818,ef=37819,nf=37820,rf=37821,sf=36492,of=36494,af=36495,lf=36283,cf=36284,uf=36285,ff=36286;var Wa=2300,tu=2301,$c=2302,Nd=2400,kd=2401,zd=2402;var hy=3200,dy=3201;var lp=0,py=1,Mr="",Sn="srgb",Vs="srgb-linear",Xa="linear",me="srgb";var Ns=7680;var Vd=519,my=512,gy=513,yy=514,cp=515,_y=516,xy=517,vy=518,by=519,Hd=35044;var up="300 es",Ti=2e3,qa=2001;var $i=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let r=i[t];if(r!==void 0){let s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}},mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cg=1234567,Ha=Math.PI/180,Vo=180/Math.PI;function ta(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]+"-"+mn[t&255]+mn[t>>8&255]+"-"+mn[t>>16&15|64]+mn[t>>24&255]+"-"+mn[e&63|128]+mn[e>>8&255]+"-"+mn[e>>16&255]+mn[e>>24&255]+mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]).toLowerCase()}function re(n,t,e){return Math.max(t,Math.min(e,n))}function fp(n,t){return(n%t+t)%t}function W0(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function X0(n,t,e){return n!==t?(e-n)/(t-n):0}function Ga(n,t,e){return(1-e)*n+e*t}function q0(n,t,e,i){return Ga(n,t,1-Math.exp(-e*i))}function Y0(n,t=1){return t-Math.abs(fp(n,t*2)-t)}function j0(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function $0(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Z0(n,t){return n+Math.floor(Math.random()*(t-n+1))}function J0(n,t){return n+Math.random()*(t-n)}function K0(n){return n*(.5-Math.random())}function Q0(n){n!==void 0&&(cg=n);let t=cg+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function tv(n){return n*Ha}function ev(n){return n*Vo}function nv(n){return(n&n-1)===0&&n!==0}function iv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function rv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function sv(n,t,e,i,r){let s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+i)/2),u=o((t+i)/2),f=s((t-i)/2),h=o((t-i)/2),p=s((i-t)/2),g=o((i-t)/2);switch(r){case"XYX":n.set(a*u,l*f,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*f,a*c);break;case"ZXZ":n.set(l*f,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function No(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var hp={DEG2RAD:Ha,RAD2DEG:Vo,generateUUID:ta,clamp:re,euclideanModulo:fp,mapLinear:W0,inverseLerp:X0,lerp:Ga,damp:q0,pingpong:Y0,smoothstep:j0,smootherstep:$0,randInt:Z0,randFloat:J0,randFloatSpread:K0,seededRandom:Q0,degToRad:tv,radToDeg:ev,isPowerOfTwo:nv,ceilPowerOfTwo:iv,floorPowerOfTwo:rv,setQuaternionFromProperEuler:sv,normalize:bn,denormalize:No},Vt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ai=class{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],h=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==h||c!==p||u!==g){let m=1-a,d=l*h+c*p+u*g+f*_,A=d>=0?1:-1,w=1-d*d;if(w>Number.EPSILON){let E=Math.sqrt(w),C=Math.atan2(E,d*A);m=Math.sin(m*C)/E,a=Math.sin(a*C)/E}let S=a*A;if(l=l*m+h*S,c=c*m+p*S,u=u*m+g*S,f=f*m+_*S,m===1-a){let E=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=E,c*=E,u*=E,f*=E}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],p=s[o+2],g=s[o+3];return t[e]=a*g+u*f+l*p-c*h,t[e+1]=l*g+u*h+c*f-a*p,t[e+2]=c*g+u*p+a*h-l*f,t[e+3]=u*g-a*f-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"YXZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"ZXY":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"ZYX":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"YZX":this._x=h*u*f+c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f-h*p*g;break;case"XZY":this._x=h*u*f-c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){let p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){let p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(re(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,r=this._y,s=this._z,o=this._w,a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ug.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ug.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),u=2*(a*e-s*r),f=2*(s*i-o*e);return this.x=e+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return md.copy(this).projectOnVector(t),this.sub(md)}reflect(t){return this.sub(md.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},md=new R,ug=new ai,jt=class n{constructor(t,e,i,r,s,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){let u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],g=i[8],_=r[0],m=r[3],d=r[6],A=r[1],w=r[4],S=r[7],E=r[2],C=r[5],L=r[8];return s[0]=o*_+a*A+l*E,s[3]=o*m+a*w+l*C,s[6]=o*d+a*S+l*L,s[1]=c*_+u*A+f*E,s[4]=c*m+u*w+f*C,s[7]=c*d+u*S+f*L,s[2]=h*_+p*A+g*E,s[5]=h*m+p*w+g*C,s[8]=h*d+p*S+g*L,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,h=a*l-u*s,p=c*s-o*l,g=e*f+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=f*_,t[1]=(r*c-u*i)*_,t[2]=(a*i-r*o)*_,t[3]=h*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=p*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*s)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(gd.makeScale(t,e)),this}rotate(t){return this.premultiply(gd.makeRotation(-t)),this}translate(t,e){return this.premultiply(gd.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},gd=new jt;function dp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ya(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Sy(){let n=Ya("canvas");return n.style.display="block",n}var fg={};function Ho(n){n in fg||(fg[n]=!0,console.warn(n))}function My(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}var hg=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dg=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ov(){let n={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===me&&(r.r=xr(r.r),r.g=xr(r.g),r.b=xr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===me&&(r.r=ko(r.r),r.g=ko(r.g),r.b=ko(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Mr?Xa:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ho("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ho("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Vs]:{primaries:t,whitePoint:i,transfer:Xa,toXYZ:hg,fromXYZ:dg,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:t,whitePoint:i,transfer:me,toXYZ:hg,fromXYZ:dg,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),n}var ue=ov();function xr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ko(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ao,eu=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ao===void 0&&(Ao=Ya("canvas")),Ao.width=t.width,Ao.height=t.height;let r=Ao.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=Ao}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ya("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=xr(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(xr(e[i]/255)*255):e[i]=xr(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},av=0,Go=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:av++}),this.uuid=ta(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(yd(r[o].image)):s.push(yd(r[o]))}else s=yd(r);i.url=s}return e||(t.images[this.uuid]=i),i}};function yd(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?eu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var lv=0,_d=new R,Gn=class n extends $i{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=ns,r=ns,s=Ai,o=us,a=ui,l=Ii,c=n.DEFAULT_ANISOTROPY,u=Mr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lv++}),this.uuid=ta(),this.name="",this.source=new Go(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(_d).x}get height(){return this.source.getSize(_d).y}get depth(){return this.source.getSize(_d).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Qd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Kc:t.x=t.x-Math.floor(t.x);break;case ns:t.x=t.x<0?0:1;break;case Qc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Kc:t.y=t.y-Math.floor(t.y);break;case ns:t.y=t.y<0?0:1;break;case Qc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=Qd;Gn.DEFAULT_ANISOTROPY=1;var Ne=class n{constructor(t=0,e=0,i=0,r=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s,l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,S=(p+1)/2,E=(d+1)/2,C=(u+h)/4,L=(f+_)/4,O=(g+m)/4;return w>S&&w>E?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=C/i,s=L/i):S>E?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=C/r,s=O/r):E<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),i=L/s,r=O/s),this.set(i,r,s,e),this}let A=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(f-_)/A,this.z=(h-u)/A,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=re(this.x,t.x,e.x),this.y=re(this.y,t.y,e.y),this.z=re(this.z,t.z,e.z),this.w=re(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=re(this.x,t,e),this.y=re(this.y,t,e),this.z=re(this.z,t,e),this.w=re(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(re(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},nu=class extends $i{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ne(0,0,t,e),this.scissorTest=!1,this.viewport=new Ne(0,0,t,e);let r={width:t,height:e,depth:i.depth},s=new Gn(r);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let e={minFilter:Ai,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let r=Object.assign({},t.textures[e].image);this.textures[e].source=new Go(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zi=class extends nu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},ja=class extends Gn{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=oi,this.minFilter=oi,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var iu=class extends Gn{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=oi,this.minFilter=oi,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var li=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Si.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Si.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Si.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Si):Si.fromBufferAttribute(s,o),Si.applyMatrix4(t.matrixWorld),this.expandByPoint(Si);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ec.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ec.copy(i.boundingBox)),Ec.applyMatrix4(t.matrixWorld),this.union(Ec)}let r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Si),Si.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Oa),Cc.subVectors(this.max,Oa),Eo.subVectors(t.a,Oa),Co.subVectors(t.b,Oa),Io.subVectors(t.c,Oa),$r.subVectors(Co,Eo),Zr.subVectors(Io,Co),Fs.subVectors(Eo,Io);let e=[0,-$r.z,$r.y,0,-Zr.z,Zr.y,0,-Fs.z,Fs.y,$r.z,0,-$r.x,Zr.z,0,-Zr.x,Fs.z,0,-Fs.x,-$r.y,$r.x,0,-Zr.y,Zr.x,0,-Fs.y,Fs.x,0];return!xd(e,Eo,Co,Io,Cc)||(e=[1,0,0,0,1,0,0,0,1],!xd(e,Eo,Co,Io,Cc))?!1:(Ic.crossVectors($r,Zr),e=[Ic.x,Ic.y,Ic.z],xd(e,Eo,Co,Io,Cc))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Si).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Si).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(dr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),dr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),dr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),dr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),dr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),dr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),dr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),dr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(dr),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},dr=[new R,new R,new R,new R,new R,new R,new R,new R],Si=new R,Ec=new li,Eo=new R,Co=new R,Io=new R,$r=new R,Zr=new R,Fs=new R,Oa=new R,Cc=new R,Ic=new R,Bs=new R;function xd(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Bs.fromArray(n,s);let a=r.x*Math.abs(Bs.x)+r.y*Math.abs(Bs.y)+r.z*Math.abs(Bs.z),l=t.dot(Bs),c=e.dot(Bs),u=i.dot(Bs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var cv=new li,Na=new R,vd=new R,rs=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):cv.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Na.subVectors(t,this.center);let e=Na.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Na,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(vd.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Na.copy(t.center).add(vd)),this.expandByPoint(Na.copy(t.center).sub(vd))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},pr=new R,bd=new R,Rc=new R,Jr=new R,Sd=new R,Dc=new R,Md=new R,ss=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,pr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=pr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(pr.copy(this.origin).addScaledVector(this.direction,e),pr.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){bd.copy(t).add(e).multiplyScalar(.5),Rc.copy(e).sub(t).normalize(),Jr.copy(this.origin).sub(bd);let s=t.distanceTo(e)*.5,o=-this.direction.dot(Rc),a=Jr.dot(this.direction),l=-Jr.dot(Rc),c=Jr.lengthSq(),u=Math.abs(1-o*o),f,h,p,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){let _=1/u;f*=_,h*=_,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(bd).addScaledVector(Rc,h),p}intersectSphere(t,e){pr.subVectors(t.center,this.origin);let i=pr.dot(this.direction),r=pr.dot(pr)-i*i,s=t.radius*t.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,r=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,r=(t.min.x-h.x)*c),u>=0?(s=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,pr)!==null}intersectTriangle(t,e,i,r,s){Sd.subVectors(e,t),Dc.subVectors(i,t),Md.crossVectors(Sd,Dc);let o=this.direction.dot(Md),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Jr.subVectors(this.origin,t);let l=a*this.direction.dot(Dc.crossVectors(Jr,Dc));if(l<0)return null;let c=a*this.direction.dot(Sd.cross(Jr));if(c<0||l+c>o)return null;let u=-a*Jr.dot(Md);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Oe=class n{constructor(t,e,i,r,s,o,a,l,c,u,f,h,p,g,_,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,u,f,h,p,g,_,m)}set(t,e,i,r,s,o,a,l,c,u,f,h,p,g,_,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,r=1/Ro.setFromMatrixColumn(t,0).length(),s=1/Ro.setFromMatrixColumn(t,1).length(),o=1/Ro.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){let h=o*u,p=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=p+g*c,e[5]=h-_*c,e[9]=-a*l,e[2]=_-h*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let h=l*u,p=l*f,g=c*u,_=c*f;e[0]=h+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+h*a,e[10]=o*l}else if(t.order==="ZXY"){let h=l*u,p=l*f,g=c*u,_=c*f;e[0]=h-_*a,e[4]=-o*f,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let h=o*u,p=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=g*c-p,e[8]=h*c+_,e[1]=l*f,e[5]=_*c+h,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let h=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-h*f,e[8]=g*f+p,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*f+g,e[10]=h-_*f}else if(t.order==="XZY"){let h=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+_,e[5]=o*u,e[9]=p*f-g,e[2]=g*f-p,e[6]=a*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(uv,t,fv)}lookAt(t,e,i){let r=this.elements;return Vn.subVectors(t,e),Vn.lengthSq()===0&&(Vn.z=1),Vn.normalize(),Kr.crossVectors(i,Vn),Kr.lengthSq()===0&&(Math.abs(i.z)===1?Vn.x+=1e-4:Vn.z+=1e-4,Vn.normalize(),Kr.crossVectors(i,Vn)),Kr.normalize(),Pc.crossVectors(Vn,Kr),r[0]=Kr.x,r[4]=Pc.x,r[8]=Vn.x,r[1]=Kr.y,r[5]=Pc.y,r[9]=Vn.y,r[2]=Kr.z,r[6]=Pc.z,r[10]=Vn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],A=i[3],w=i[7],S=i[11],E=i[15],C=r[0],L=r[4],O=r[8],b=r[12],v=r[1],D=r[5],z=r[9],G=r[13],q=r[2],$=r[6],X=r[10],nt=r[14],V=r[3],ot=r[7],ft=r[11],wt=r[15];return s[0]=o*C+a*v+l*q+c*V,s[4]=o*L+a*D+l*$+c*ot,s[8]=o*O+a*z+l*X+c*ft,s[12]=o*b+a*G+l*nt+c*wt,s[1]=u*C+f*v+h*q+p*V,s[5]=u*L+f*D+h*$+p*ot,s[9]=u*O+f*z+h*X+p*ft,s[13]=u*b+f*G+h*nt+p*wt,s[2]=g*C+_*v+m*q+d*V,s[6]=g*L+_*D+m*$+d*ot,s[10]=g*O+_*z+m*X+d*ft,s[14]=g*b+_*G+m*nt+d*wt,s[3]=A*C+w*v+S*q+E*V,s[7]=A*L+w*D+S*$+E*ot,s[11]=A*O+w*z+S*X+E*ft,s[15]=A*b+w*G+S*nt+E*wt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*p-i*l*p)+_*(+e*l*p-e*c*h+s*o*h-r*o*p+r*c*u-s*l*u)+m*(+e*c*f-e*a*p-s*o*f+i*o*p+s*a*u-i*c*u)+d*(-r*a*u-e*l*f+e*a*h+r*o*f-i*o*h+i*l*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],A=f*m*c-_*h*c+_*l*p-a*m*p-f*l*d+a*h*d,w=g*h*c-u*m*c-g*l*p+o*m*p+u*l*d-o*h*d,S=u*_*c-g*f*c+g*a*p-o*_*p-u*a*d+o*f*d,E=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,C=e*A+i*w+r*S+s*E;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/C;return t[0]=A*L,t[1]=(_*h*s-f*m*s-_*r*p+i*m*p+f*r*d-i*h*d)*L,t[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*d+i*l*d)*L,t[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*p-i*l*p)*L,t[4]=w*L,t[5]=(u*m*s-g*h*s+g*r*p-e*m*p-u*r*d+e*h*d)*L,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*d-e*l*d)*L,t[7]=(o*h*s-u*l*s+u*r*c-e*h*c-o*r*p+e*l*p)*L,t[8]=S*L,t[9]=(g*f*s-u*_*s-g*i*p+e*_*p+u*i*d-e*f*d)*L,t[10]=(o*_*s-g*a*s+g*i*c-e*_*c-o*i*d+e*a*d)*L,t[11]=(u*a*s-o*f*s-u*i*c+e*f*c+o*i*p-e*a*p)*L,t[12]=E*L,t[13]=(u*_*r-g*f*r+g*i*h-e*_*h-u*i*m+e*f*m)*L,t[14]=(g*a*r-o*_*r-g*i*l+e*_*l+o*i*m-e*a*m)*L,t[15]=(o*f*r-u*a*r+u*i*l-e*f*l-o*i*h+e*a*h)*L,this}scale(t){let e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){let r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,f=a+a,h=s*c,p=s*u,g=s*f,_=o*u,m=o*f,d=a*f,A=l*c,w=l*u,S=l*f,E=i.x,C=i.y,L=i.z;return r[0]=(1-(_+d))*E,r[1]=(p+S)*E,r[2]=(g-w)*E,r[3]=0,r[4]=(p-S)*C,r[5]=(1-(h+d))*C,r[6]=(m+A)*C,r[7]=0,r[8]=(g+w)*L,r[9]=(m-A)*L,r[10]=(1-(h+_))*L,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){let r=this.elements,s=Ro.set(r[0],r[1],r[2]).length(),o=Ro.set(r[4],r[5],r[6]).length(),a=Ro.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Mi.copy(this);let c=1/s,u=1/o,f=1/a;return Mi.elements[0]*=c,Mi.elements[1]*=c,Mi.elements[2]*=c,Mi.elements[4]*=u,Mi.elements[5]*=u,Mi.elements[6]*=u,Mi.elements[8]*=f,Mi.elements[9]*=f,Mi.elements[10]*=f,e.setFromRotationMatrix(Mi),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=Ti,l=!1){let c=this.elements,u=2*s/(e-t),f=2*s/(i-r),h=(e+t)/(e-t),p=(i+r)/(i-r),g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===Ti)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===qa)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=Ti,l=!1){let c=this.elements,u=2/(e-t),f=2/(i-r),h=-(e+t)/(e-t),p=-(i+r)/(i-r),g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===Ti)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===qa)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ro=new R,Mi=new Oe,uv=new R(0,0,0),fv=new R(1,1,1),Kr=new R,Pc=new R,Vn=new R,pg=new Oe,mg=new ai,Ei=class n{constructor(t=0,e=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-re(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-re(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return pg.makeRotationFromQuaternion(t),this.setFromRotationMatrix(pg,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return mg.setFromEuler(this),this.setFromQuaternion(mg,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ei.DEFAULT_ORDER="XYZ";var $a=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},hv=0,gg=new R,Do=new ai,mr=new Oe,Lc=new R,ka=new R,dv=new R,pv=new ai,yg=new R(1,0,0),_g=new R(0,1,0),xg=new R(0,0,1),vg={type:"added"},mv={type:"removed"},Po={type:"childadded",child:null},wd={type:"childremoved",child:null},en=class n extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hv++}),this.uuid=ta(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new R,e=new Ei,i=new ai,r=new R(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Oe},normalMatrix:{value:new jt}}),this.matrix=new Oe,this.matrixWorld=new Oe,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Do.setFromAxisAngle(t,e),this.quaternion.multiply(Do),this}rotateOnWorldAxis(t,e){return Do.setFromAxisAngle(t,e),this.quaternion.premultiply(Do),this}rotateX(t){return this.rotateOnAxis(yg,t)}rotateY(t){return this.rotateOnAxis(_g,t)}rotateZ(t){return this.rotateOnAxis(xg,t)}translateOnAxis(t,e){return gg.copy(t).applyQuaternion(this.quaternion),this.position.add(gg.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(yg,t)}translateY(t){return this.translateOnAxis(_g,t)}translateZ(t){return this.translateOnAxis(xg,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(mr.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Lc.copy(t):Lc.set(t,e,i);let r=this.parent;this.updateWorldMatrix(!0,!1),ka.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mr.lookAt(ka,Lc,this.up):mr.lookAt(Lc,ka,this.up),this.quaternion.setFromRotationMatrix(mr),r&&(mr.extractRotation(r.matrixWorld),Do.setFromRotationMatrix(mr),this.quaternion.premultiply(Do.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vg),Po.child=t,this.dispatchEvent(Po),Po.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(mv),wd.child=t,this.dispatchEvent(wd),wd.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),mr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),mr.multiply(t.parent.matrixWorld)),t.applyMatrix4(mr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vg),Po.child=t,this.dispatchEvent(Po),Po.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ka,t,dv),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ka,pv,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let r=t.children[i];this.add(r.clone())}return this}};en.DEFAULT_UP=new R(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wi=new R,gr=new R,Td=new R,yr=new R,Lo=new R,Fo=new R,bg=new R,Ad=new R,Ed=new R,Cd=new R,Id=new Ne,Rd=new Ne,Dd=new Ne,es=class n{constructor(t=new R,e=new R,i=new R){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),wi.subVectors(t,e),r.cross(wi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){wi.subVectors(r,e),gr.subVectors(i,e),Td.subVectors(t,e);let o=wi.dot(wi),a=wi.dot(gr),l=wi.dot(Td),c=gr.dot(gr),u=gr.dot(Td),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;let h=1/f,p=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-p-g,g,p)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,yr)===null?!1:yr.x>=0&&yr.y>=0&&yr.x+yr.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,yr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,yr.x),l.addScaledVector(o,yr.y),l.addScaledVector(a,yr.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return Id.setScalar(0),Rd.setScalar(0),Dd.setScalar(0),Id.fromBufferAttribute(t,e),Rd.fromBufferAttribute(t,i),Dd.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Id,s.x),o.addScaledVector(Rd,s.y),o.addScaledVector(Dd,s.z),o}static isFrontFacing(t,e,i,r){return wi.subVectors(i,e),gr.subVectors(t,e),wi.cross(gr).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wi.subVectors(this.c,this.b),gr.subVectors(this.a,this.b),wi.cross(gr).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return n.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,r=this.b,s=this.c,o,a;Lo.subVectors(r,i),Fo.subVectors(s,i),Ad.subVectors(t,i);let l=Lo.dot(Ad),c=Fo.dot(Ad);if(l<=0&&c<=0)return e.copy(i);Ed.subVectors(t,r);let u=Lo.dot(Ed),f=Fo.dot(Ed);if(u>=0&&f<=u)return e.copy(r);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Lo,o);Cd.subVectors(t,s);let p=Lo.dot(Cd),g=Fo.dot(Cd);if(g>=0&&p<=g)return e.copy(s);let _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Fo,a);let m=u*g-p*f;if(m<=0&&f-u>=0&&p-g>=0)return bg.subVectors(s,r),a=(f-u)/(f-u+(p-g)),e.copy(r).addScaledVector(bg,a);let d=1/(m+_+h);return o=_*d,a=h*d,e.copy(i).addScaledVector(Lo,o).addScaledVector(Fo,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},wy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qr={h:0,s:0,l:0},Fc={h:0,s:0,l:0};function Pd(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Jt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ue.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=ue.workingColorSpace){return this.r=t,this.g=e,this.b=i,ue.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=ue.workingColorSpace){if(t=fp(t,1),e=re(e,0,1),i=re(i,0,1),e===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=Pd(o,s,t+1/3),this.g=Pd(o,s,t),this.b=Pd(o,s,t-1/3)}return ue.colorSpaceToWorking(this,r),this}setStyle(t,e=Sn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Sn){let i=wy[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=xr(t.r),this.g=xr(t.g),this.b=xr(t.b),this}copyLinearToSRGB(t){return this.r=ko(t.r),this.g=ko(t.g),this.b=ko(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Sn){return ue.workingToColorSpace(gn.copy(this),t),Math.round(re(gn.r*255,0,255))*65536+Math.round(re(gn.g*255,0,255))*256+Math.round(re(gn.b*255,0,255))}getHexString(t=Sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ue.workingColorSpace){ue.workingToColorSpace(gn.copy(this),e);let i=gn.r,r=gn.g,s=gn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ue.workingColorSpace){return ue.workingToColorSpace(gn.copy(this),e),t.r=gn.r,t.g=gn.g,t.b=gn.b,t}getStyle(t=Sn){ue.workingToColorSpace(gn.copy(this),t);let e=gn.r,i=gn.g,r=gn.b;return t!==Sn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Qr),this.setHSL(Qr.h+t,Qr.s+e,Qr.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Qr),t.getHSL(Fc);let i=Ga(Qr.h,Fc.h,e),r=Ga(Qr.s,Fc.s,e),s=Ga(Qr.l,Fc.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},gn=new Jt;Jt.NAMES=wy;var gv=0,Ji=class extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gv++}),this.uuid=ta(),this.name="",this.type="Material",this.blending=ks,this.side=vr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zc,this.blendDst=Jc,this.blendEquation=is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ns,this.stencilZFail=Ns,this.stencilZPass=Ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(i.blending=this.blending),this.side!==vr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Zc&&(i.blendSrc=this.blendSrc),this.blendDst!==Jc&&(i.blendDst=this.blendDst),this.blendEquation!==is&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ns&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ns&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ns&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(e){let s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Za=class extends Ji{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Kd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var qe=new R,Bc=new Vt,yv=0,Mn=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yv++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Hd,this.updateRanges=[],this.gpuType=Qi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Bc.fromBufferAttribute(this,e),Bc.applyMatrix3(t),this.setXY(e,Bc.x,Bc.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix3(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=No(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=bn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=No(e,this.array)),e}setX(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=No(e,this.array)),e}setY(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=No(e,this.array)),e}setZ(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=No(e,this.array)),e}setW(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=bn(e,this.array),i=bn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=bn(e,this.array),i=bn(i,this.array),r=bn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=bn(e,this.array),i=bn(i,this.array),r=bn(r,this.array),s=bn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Hd&&(t.usage=this.usage),t}};var Ja=class extends Mn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Ka=class extends Mn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ln=class extends Mn{constructor(t,e,i){super(new Float32Array(t),e,i)}},_v=0,ri=new Oe,Ld=new en,Bo=new R,Hn=new li,za=new li,tn=new R,In=class n extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_v++}),this.uuid=ta(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(dp(t)?Ka:Ja)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new jt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ri.makeRotationFromQuaternion(t),this.applyMatrix4(ri),this}rotateX(t){return ri.makeRotationX(t),this.applyMatrix4(ri),this}rotateY(t){return ri.makeRotationY(t),this.applyMatrix4(ri),this}rotateZ(t){return ri.makeRotationZ(t),this.applyMatrix4(ri),this}translate(t,e,i){return ri.makeTranslation(t,e,i),this.applyMatrix4(ri),this}scale(t,e,i){return ri.makeScale(t,e,i),this.applyMatrix4(ri),this}lookAt(t){return Ld.lookAt(t),Ld.updateMatrix(),this.applyMatrix4(Ld.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bo).negate(),this.translate(Bo.x,Bo.y,Bo.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let r=0,s=t.length;r<s;r++){let o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ln(i,3))}else{let i=Math.min(t.length,e.count);for(let r=0;r<i;r++){let s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){let s=e[i];Hn.setFromBufferAttribute(s),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let i=this.boundingSphere.center;if(Hn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];za.setFromBufferAttribute(a),this.morphTargetsRelative?(tn.addVectors(Hn.min,za.min),Hn.expandByPoint(tn),tn.addVectors(Hn.max,za.max),Hn.expandByPoint(tn)):(Hn.expandByPoint(za.min),Hn.expandByPoint(za.max))}Hn.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)tn.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(tn));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)tn.fromBufferAttribute(a,c),l&&(Bo.fromBufferAttribute(t,c),tn.add(Bo)),r=Math.max(r,i.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let O=0;O<i.count;O++)a[O]=new R,l[O]=new R;let c=new R,u=new R,f=new R,h=new Vt,p=new Vt,g=new Vt,_=new R,m=new R;function d(O,b,v){c.fromBufferAttribute(i,O),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,v),h.fromBufferAttribute(s,O),p.fromBufferAttribute(s,b),g.fromBufferAttribute(s,v),u.sub(c),f.sub(c),p.sub(h),g.sub(h);let D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(D),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(D),a[O].add(_),a[b].add(_),a[v].add(_),l[O].add(m),l[b].add(m),l[v].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let O=0,b=A.length;O<b;++O){let v=A[O],D=v.start,z=v.count;for(let G=D,q=D+z;G<q;G+=3)d(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let w=new R,S=new R,E=new R,C=new R;function L(O){E.fromBufferAttribute(r,O),C.copy(E);let b=a[O];w.copy(b),w.sub(E.multiplyScalar(E.dot(b))).normalize(),S.crossVectors(C,b);let D=S.dot(l[O])<0?-1:1;o.setXYZW(O,w.x,w.y,w.z,D)}for(let O=0,b=A.length;O<b;++O){let v=A[O],D=v.start,z=v.count;for(let G=D,q=D+z;G<q;G+=3)L(t.getX(G+0)),L(t.getX(G+1)),L(t.getX(G+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Mn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let r=new R,s=new R,o=new R,a=new R,l=new R,c=new R,u=new R,f=new R;if(t)for(let h=0,p=t.count;h<p;h+=3){let g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)tn.fromBufferAttribute(t,e),tn.normalize(),t.setXYZ(e,tn.x,tn.y,tn.z)}toNonIndexed(){function t(a,l){let c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u),p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let d=0;d<u;d++)h[g++]=c[p++]}return new Mn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=t(l,i);e.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){let h=c[u],p=t(h,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let p=c[f];u.push(p.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let r=t.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(e))}let s=t.morphAttributes;for(let c in s){let u=[],f=s[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,u=o.length;c<u;c++){let f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Sg=new Oe,Us=new ss,Uc=new rs,Mg=new R,Oc=new R,Nc=new R,kc=new R,Fd=new R,zc=new R,wg=new R,Vc=new R,Rn=class extends en{constructor(t=new In,e=new Za){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);let a=this.morphTargetInfluences;if(s&&a){zc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],f=s[l];u!==0&&(Fd.fromBufferAttribute(f,t),o?zc.addScaledVector(Fd,u):zc.addScaledVector(Fd.sub(e),u))}e.add(zc)}return e}raycast(t,e){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Uc.copy(i.boundingSphere),Uc.applyMatrix4(s),Us.copy(t.ray).recast(t.near),!(Uc.containsPoint(Us.origin)===!1&&(Us.intersectSphere(Uc,Mg)===null||Us.origin.distanceToSquared(Mg)>(t.far-t.near)**2))&&(Sg.copy(s).invert(),Us.copy(t.ray).applyMatrix4(Sg),!(i.boundingBox!==null&&Us.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Us)))}_computeIntersections(t,e,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],d=o[m.materialIndex],A=Math.max(m.start,p.start),w=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=A,E=w;S<E;S+=3){let C=a.getX(S),L=a.getX(S+1),O=a.getX(S+2);r=Hc(this,d,t,i,c,u,f,C,L,O),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){let A=a.getX(m),w=a.getX(m+1),S=a.getX(m+2);r=Hc(this,o,t,i,c,u,f,A,w,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],d=o[m.materialIndex],A=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=A,E=w;S<E;S+=3){let C=S,L=S+1,O=S+2;r=Hc(this,d,t,i,c,u,f,C,L,O),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){let A=m,w=m+1,S=m+2;r=Hc(this,o,t,i,c,u,f,A,w,S),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}};function xv(n,t,e,i,r,s,o,a){let l;if(t.side===wn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===vr,a),l===null)return null;Vc.copy(a),Vc.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Vc);return c<e.near||c>e.far?null:{distance:c,point:Vc.clone(),object:n}}function Hc(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,Oc),n.getVertexPosition(l,Nc),n.getVertexPosition(c,kc);let u=xv(n,t,e,i,Oc,Nc,kc,wg);if(u){let f=new R;es.getBarycoord(wg,Oc,Nc,kc,f),r&&(u.uv=es.getInterpolatedAttribute(r,a,l,c,f,new Vt)),s&&(u.uv1=es.getInterpolatedAttribute(s,a,l,c,f,new Vt)),o&&(u.normal=es.getInterpolatedAttribute(o,a,l,c,f,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:l,c,normal:new R,materialIndex:0};es.getNormal(Oc,Nc,kc,h.normal),u.face=h,u.barycoord=f}return u}var Wo=class n extends In{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],f=[],h=0,p=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,r,o,2),g("x","z","y",1,-1,t,i,-e,r,o,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ln(c,3)),this.setAttribute("normal",new ln(u,3)),this.setAttribute("uv",new ln(f,2));function g(_,m,d,A,w,S,E,C,L,O,b){let v=S/L,D=E/O,z=S/2,G=E/2,q=C/2,$=L+1,X=O+1,nt=0,V=0,ot=new R;for(let ft=0;ft<X;ft++){let wt=ft*D-G;for(let oe=0;oe<$;oe++){let Me=oe*v-z;ot[_]=Me*A,ot[m]=wt*w,ot[d]=q,c.push(ot.x,ot.y,ot.z),ot[_]=0,ot[m]=0,ot[d]=C>0?1:-1,u.push(ot.x,ot.y,ot.z),f.push(oe/L),f.push(1-ft/O),nt+=1}}for(let ft=0;ft<O;ft++)for(let wt=0;wt<L;wt++){let oe=h+wt+$*ft,Me=h+wt+$*(ft+1),Pe=h+(wt+1)+$*(ft+1),de=h+(wt+1)+$*ft;l.push(oe,Me,de),l.push(Me,Pe,de),V+=6}a.addGroup(p,V,b),p+=V,h+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function qs(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function _n(n){let t={};for(let e=0;e<n.length;e++){let i=qs(n[e]);for(let r in i)t[r]=i[r]}return t}function vv(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function pp(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ue.workingColorSpace}var Ty={clone:qs,merge:_n},bv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ci=class extends Ji{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bv,this.fragmentShader=Sv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qs(t.uniforms),this.uniformsGroups=vv(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Qa=class extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Oe,this.projectionMatrix=new Oe,this.projectionMatrixInverse=new Oe,this.coordinateSystem=Ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ts=new R,Tg=new Vt,Ag=new Vt,yn=class extends Qa{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Vo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ha*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Vo*2*Math.atan(Math.tan(Ha*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ts.x,ts.y).multiplyScalar(-t/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ts.x,ts.y).multiplyScalar(-t/ts.z)}getViewSize(t,e){return this.getViewBounds(t,Tg,Ag),e.subVectors(Ag,Tg)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ha*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Uo=-90,Oo=1,ru=class extends en{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new yn(Uo,Oo,t,e);r.layers=this.layers,this.add(r);let s=new yn(Uo,Oo,t,e);s.layers=this.layers,this.add(s);let o=new yn(Uo,Oo,t,e);o.layers=this.layers,this.add(o);let a=new yn(Uo,Oo,t,e);a.layers=this.layers,this.add(a);let l=new yn(Uo,Oo,t,e);l.layers=this.layers,this.add(l);let c=new yn(Uo,Oo,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(let c of e)this.remove(c);if(t===Ti)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===qa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(f,h,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},tl=class extends Gn{constructor(t=[],e=Ws,i,r,s,o,a,l,c,u){super(t,e,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},su=class extends Zi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new tl(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Wo(5,5,5),s=new Ci({name:"CubemapFromEquirect",uniforms:qs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:wn,blending:br});s.uniforms.tEquirect.value=e;let o=new Rn(r,s),a=e.minFilter;return e.minFilter===us&&(e.minFilter=Ai),new ru(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}},_r=class extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}},Mv={type:"move"},Xo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Mv)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new _r;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}};var el=class extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Bd=new R,wv=new R,Tv=new jt,si=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let r=Bd.subVectors(i,e).cross(wv.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(Bd),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Tv.getNormalMatrix(t),r=this.coplanarPoint(Bd).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Os=new rs,Av=new Vt(.5,.5),Gc=new R,qo=class{constructor(t=new si,e=new si,i=new si,r=new si,s=new si,o=new si){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ti,i=!1){let r=this.planes,s=t.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],p=s[7],g=s[8],_=s[9],m=s[10],d=s[11],A=s[12],w=s[13],S=s[14],E=s[15];if(r[0].setComponents(c-o,p-u,d-g,E-A).normalize(),r[1].setComponents(c+o,p+u,d+g,E+A).normalize(),r[2].setComponents(c+a,p+f,d+_,E+w).normalize(),r[3].setComponents(c-a,p-f,d-_,E-w).normalize(),i)r[4].setComponents(l,h,m,S).normalize(),r[5].setComponents(c-l,p-h,d-m,E-S).normalize();else if(r[4].setComponents(c-l,p-h,d-m,E-S).normalize(),e===Ti)r[5].setComponents(c+l,p+h,d+m,E+S).normalize();else if(e===qa)r[5].setComponents(l,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Os.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(t){Os.center.set(0,0,0);let e=Av.distanceTo(t.center);return Os.radius=.7071067811865476+e,Os.applyMatrix4(t.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(t){let e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let r=e[i];if(Gc.x=r.normal.x>0?t.max.x:t.min.x,Gc.y=r.normal.y>0?t.max.y:t.min.y,Gc.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Gc)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Hs=class extends Ji{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ou=new R,au=new R,Eg=new Oe,Va=new ss,Wc=new rs,Ud=new R,Cg=new R,lu=class extends en{constructor(t=new In,e=new Hs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)ou.fromBufferAttribute(e,r-1),au.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=ou.distanceTo(au);t.setAttribute("lineDistance",new ln(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wc.copy(i.boundingSphere),Wc.applyMatrix4(r),Wc.radius+=s,t.ray.intersectsSphere(Wc)===!1)return;Eg.copy(r).invert(),Va.copy(t.ray).applyMatrix4(Eg);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){let d=u.getX(_),A=u.getX(_+1),w=Xc(this,t,Va,l,d,A,_);w&&e.push(w)}if(this.isLineLoop){let _=u.getX(g-1),m=u.getX(p),d=Xc(this,t,Va,l,_,m,g-1);d&&e.push(d)}}else{let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){let d=Xc(this,t,Va,l,_,_+1,_);d&&e.push(d)}if(this.isLineLoop){let _=Xc(this,t,Va,l,g-1,p,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Xc(n,t,e,i,r,s,o){let a=n.geometry.attributes.position;if(ou.fromBufferAttribute(a,r),au.fromBufferAttribute(a,s),e.distanceSqToSegment(ou,au,Ud,Cg)>i)return;Ud.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Ud);if(!(c<t.near||c>t.far))return{distance:c,point:Cg.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var Ig=new R,Rg=new R,Yo=class extends lu{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)Ig.fromBufferAttribute(e,r),Rg.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Ig.distanceTo(Rg);t.setAttribute("lineDistance",new ln(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var jo=class extends Ji{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Dg=new Oe,Gd=new ss,qc=new rs,Yc=new R,nl=class extends en{constructor(t=new In,e=new jo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qc.copy(i.boundingSphere),qc.applyMatrix4(r),qc.radius+=s,t.ray.intersectsSphere(qc)===!1)return;Dg.copy(r).invert(),Gd.copy(t.ray).applyMatrix4(Dg);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){let h=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=h,_=p;g<_;g++){let m=c.getX(g);Yc.fromBufferAttribute(f,m),Pg(Yc,m,l,r,t,e,this)}}else{let h=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let g=h,_=p;g<_;g++)Yc.fromBufferAttribute(f,g),Pg(Yc,g,l,r,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Pg(n,t,e,i,r,s,o){let a=Gd.distanceSqToPoint(n);if(a<e){let l=new R;Gd.closestPointToPoint(n,l),l.applyMatrix4(i);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var il=class extends Gn{constructor(t,e,i=fs,r,s,o,a=oi,l=oi,c,u=zo,f=1){if(u!==zo&&u!==Qo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Go(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},rl=class extends Gn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var sl=class n extends In{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};let s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=t/a,h=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){let A=d*h-o;for(let w=0;w<c;w++){let S=w*f-s;g.push(S,-A,0),_.push(0,0,1),m.push(w/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let A=0;A<a;A++){let w=A+c*d,S=A+c*(d+1),E=A+1+c*(d+1),C=A+1+c*d;p.push(w,S,C),p.push(S,E,C)}this.setIndex(p),this.setAttribute("position",new ln(g,3)),this.setAttribute("normal",new ln(_,3)),this.setAttribute("uv",new ln(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var ol=class extends Ji{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lp,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var cu=class extends Ji{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},uu=class extends Ji{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function jc(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Ev(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Gs=class{constructor(t,e,i,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,r=e[i],s=e[i-1];t:{e:{let o;n:{i:if(!(t<r)){for(let a=i+2;;){if(r===void 0){if(t<s)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=e[++i],t<r)break e}o=e.length;break n}if(!(t>=s)){let a=e[1];t<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=e[--i-1],t>=s)break e}o=i,i=0;break n}break t}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(r=e[i],s=e[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=t*r;for(let o=0;o!==r;++o)e[o]=i[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},fu=class extends Gs{constructor(t,e,i,r){super(t,e,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nd,endingEnd:Nd}}intervalChanged_(t,e,i){let r=this.parameterPositions,s=t-2,o=t+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case kd:s=t,a=2*e-i;break;case zd:s=r.length-2,a=e+r[s]-r[s+1];break;default:s=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case kd:o=t,l=2*i-e;break;case zd:o=1,l=i+r[1]-r[0];break;default:o=t-1,l=e}let c=(i-e)*.5,u=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(t,e,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,p=this._weightNext,g=(i-e)/(r-e),_=g*g,m=_*g,d=-h*m+2*h*_-h*g,A=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,w=(-1-p)*m+(1.5+p)*_+.5*g,S=p*m-p*_;for(let E=0;E!==a;++E)s[E]=d*o[u+E]+A*o[c+E]+w*o[l+E]+S*o[f+E];return s}},hu=class extends Gs{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=(i-e)/(r-e),f=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*f+o[l+h]*u;return s}},du=class extends Gs{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t){return this.copySampleValue_(t-1)}},Wn=class{constructor(t,e,i,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=jc(e,this.TimeBufferType),this.values=jc(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:jc(t.times,Array),values:jc(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(i.interpolation=r)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new du(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new hu(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new fu(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Wa:e=this.InterpolantFactoryMethodDiscrete;break;case tu:e=this.InterpolantFactoryMethodLinear;break;case $c:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Wa;case this.InterpolantFactoryMethodLinear:return tu;case this.InterpolantFactoryMethodSmooth:return $c}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,r=e.length;i!==r;++i)e[i]*=t}return this}trim(t,e){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<t;)++s;for(;o!==-1&&i[o]>e;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(r!==void 0&&Ev(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===$c,s=t.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=t[a],u=t[a+1];if(c!==u&&(a!==1||c!==t[0]))if(r)l=!0;else{let f=a*i,h=f-i,p=f+i;for(let g=0;g!==i;++g){let _=e[f+g];if(_!==e[h+g]||_!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let f=a*i,h=o*i;for(let p=0;p!==i;++p)e[h+p]=e[f+p]}++o}}if(s>0){t[o]=t[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,r=new i(this.name,t,e);return r.createInterpolant=this.createInterpolant,r}};Wn.prototype.ValueTypeName="";Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=tu;var os=class extends Wn{constructor(t,e,i){super(t,e,i)}};os.prototype.ValueTypeName="bool";os.prototype.ValueBufferType=Array;os.prototype.DefaultInterpolation=Wa;os.prototype.InterpolantFactoryMethodLinear=void 0;os.prototype.InterpolantFactoryMethodSmooth=void 0;var pu=class extends Wn{constructor(t,e,i,r){super(t,e,i,r)}};pu.prototype.ValueTypeName="color";var mu=class extends Wn{constructor(t,e,i,r){super(t,e,i,r)}};mu.prototype.ValueTypeName="number";var gu=class extends Gs{constructor(t,e,i,r){super(t,e,i,r)}interpolate_(t,e,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(r-e),c=t*a;for(let u=c+a;c!==u;c+=4)ai.slerpFlat(s,0,o,c-a,o,c,l);return s}},al=class extends Wn{constructor(t,e,i,r){super(t,e,i,r)}InterpolantFactoryMethodLinear(t){return new gu(this.times,this.values,this.getValueSize(),t)}};al.prototype.ValueTypeName="quaternion";al.prototype.InterpolantFactoryMethodSmooth=void 0;var as=class extends Wn{constructor(t,e,i){super(t,e,i)}};as.prototype.ValueTypeName="string";as.prototype.ValueBufferType=Array;as.prototype.DefaultInterpolation=Wa;as.prototype.InterpolantFactoryMethodLinear=void 0;as.prototype.InterpolantFactoryMethodSmooth=void 0;var yu=class extends Wn{constructor(t,e,i,r){super(t,e,i,r)}};yu.prototype.ValueTypeName="vector";var _u=class{constructor(t,e,i){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let p=c[f],g=c[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Ay=new _u,xu=class{constructor(t){this.manager=t!==void 0?t:Ay,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(r,s){i.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};xu.DEFAULT_MATERIAL_NAME="__DEFAULT";var ll=class extends en{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},cl=class extends ll{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Od=new Oe,Lg=new R,Fg=new R,Wd=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.mapType=Ii,this.map=null,this.mapPass=null,this.matrix=new Oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qo,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new Ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Lg.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lg),Fg.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Fg),e.updateMatrixWorld(),Od.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Od,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Od)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var ul=class extends Qa{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Xd=class extends Wd{constructor(){super(new ul(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},fl=class extends ll{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.target=new en,this.shadow=new Xd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var vu=class extends yn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var mp="\\[\\]\\.:\\/",Cv=new RegExp("["+mp+"]","g"),gp="[^"+mp+"]",Iv="[^"+mp.replace("\\.","")+"]",Rv=/((?:WC+[\/:])*)/.source.replace("WC",gp),Dv=/(WCOD+)?/.source.replace("WCOD",Iv),Pv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gp),Lv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gp),Fv=new RegExp("^"+Rv+Dv+Pv+Lv+"$"),Bv=["material","materials","bones","map"],qd=class{constructor(t,e,i){let r=i||Ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ce=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Cv,"")}static parseTrackName(t){let e=Fv.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);Bv.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},r=i(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)t[e++]=i[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,r=e.propertyName,s=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[r];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ce.Composite=qd;Ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ce.prototype.GetterByBindingType=[Ce.prototype._getValue_direct,Ce.prototype._getValue_array,Ce.prototype._getValue_arrayElement,Ce.prototype._getValue_toArray];Ce.prototype.SetterByBindingTypeAndVersioning=[[Ce.prototype._setValue_direct,Ce.prototype._setValue_direct_setNeedsUpdate,Ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_array,Ce.prototype._setValue_array_setNeedsUpdate,Ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_arrayElement,Ce.prototype._setValue_arrayElement_setNeedsUpdate,Ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_fromArray,Ce.prototype._setValue_fromArray_setNeedsUpdate,Ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Q1=new Float32Array(1);var $o=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=re(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(re(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var hl=class extends Yo{constructor(t=10,e=10,i=4473924,r=8947848){i=new Jt(i),r=new Jt(r);let s=e/2,o=t/e,a=t/2,l=[],c=[];for(let h=0,p=0,g=-a;h<=e;h++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);let _=h===s?i:r;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}let u=new In;u.setAttribute("position",new ln(l,3)),u.setAttribute("color",new ln(c,3));let f=new Hs({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var dl=class extends $i{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function yp(n,t,e,i){let r=Uv(i);switch(e){case rp:return n*t;case op:return n*t/r.components*r.byteLength;case Fu:return n*t/r.components*r.byteLength;case ap:return n*t*2/r.components*r.byteLength;case Bu:return n*t*2/r.components*r.byteLength;case sp:return n*t*3/r.components*r.byteLength;case ui:return n*t*4/r.components*r.byteLength;case Uu:return n*t*4/r.components*r.byteLength;case gl:case yl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case _l:case xl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Nu:case zu:return Math.max(n,16)*Math.max(t,8)/4;case Ou:case ku:return Math.max(n,8)*Math.max(t,8)/2;case Vu:case Hu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Gu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Wu:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Xu:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case qu:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Yu:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ju:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case $u:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Zu:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Ju:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ku:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Qu:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case tf:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ef:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case nf:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case rf:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case sf:case of:case af:return Math.ceil(n/4)*Math.ceil(t/4)*16;case lf:case cf:return Math.ceil(n/4)*Math.ceil(t/4)*8;case uf:case ff:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Uv(n){switch(n){case Ii:case tp:return{byteLength:1,components:1};case Zo:case ep:case Jo:return{byteLength:2,components:1};case Pu:case Lu:return{byteLength:2,components:4};case fs:case Du:case Qi:return{byteLength:4,components:1};case np:case ip:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Zy(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function Nv(n){let t=new WeakMap;function e(a,l){let c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){let u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<f.length;p++){let g=f[h],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let p=0,g=f.length;p<g;p++){let _=f[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var kv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zv=`#ifdef USE_ALPHAHASH
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
#endif`,Vv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xv=`#ifdef USE_AOMAP
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
#endif`,qv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yv=`#ifdef USE_BATCHING
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
#endif`,jv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$v=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kv=`#ifdef USE_IRIDESCENCE
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
#endif`,Qv=`#ifdef USE_BUMPMAP
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
#endif`,tb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,eb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ib=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ob=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ab=`#if defined( USE_COLOR_ALPHA )
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
#endif`,lb=`#define PI 3.141592653589793
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
} // validated`,cb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ub=`vec3 transformedNormal = objectNormal;
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
#endif`,fb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,db=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mb="gl_FragColor = linearToOutputTexel( gl_FragColor );",gb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yb=`#ifdef USE_ENVMAP
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
#endif`,_b=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xb=`#ifdef USE_ENVMAP
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
#endif`,vb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bb=`#ifdef USE_ENVMAP
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
#endif`,Sb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ab=`#ifdef USE_GRADIENTMAP
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
}`,Eb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ib=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rb=`uniform bool receiveShadow;
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
#endif`,Db=`#ifdef USE_ENVMAP
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
#endif`,Pb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ub=`PhysicalMaterial material;
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
#endif`,Ob=`struct PhysicalMaterial {
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
}`,Nb=`
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
#endif`,kb=`#if defined( RE_IndirectDiffuse )
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
#endif`,zb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jb=`#if defined( USE_POINTS_UV )
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
#endif`,$b=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tS=`#ifdef USE_MORPHTARGETS
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
#endif`,eS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,iS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,rS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,aS=`#ifdef USE_NORMALMAP
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
#endif`,lS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_S=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,SS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,MS=`float getShadowMask() {
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
}`,wS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,TS=`#ifdef USE_SKINNING
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
#endif`,AS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ES=`#ifdef USE_SKINNING
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
#endif`,CS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,IS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,RS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,DS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,PS=`#ifdef USE_TRANSMISSION
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
#endif`,LS=`#ifdef USE_TRANSMISSION
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
#endif`,FS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,BS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,US=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,OS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,NS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kS=`uniform sampler2D t2D;
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
}`,zS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,HS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,GS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WS=`#include <common>
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
}`,XS=`#if DEPTH_PACKING == 3200
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
}`,qS=`#define DISTANCE
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
}`,YS=`#define DISTANCE
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
}`,jS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$S=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZS=`uniform float scale;
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
}`,JS=`uniform vec3 diffuse;
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
}`,KS=`#include <common>
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
}`,QS=`uniform vec3 diffuse;
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
}`,tM=`#define LAMBERT
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
}`,eM=`#define LAMBERT
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
}`,nM=`#define MATCAP
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
}`,iM=`#define MATCAP
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
}`,rM=`#define NORMAL
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
}`,sM=`#define NORMAL
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
}`,oM=`#define PHONG
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
}`,aM=`#define PHONG
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
}`,lM=`#define STANDARD
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
}`,cM=`#define STANDARD
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
}`,uM=`#define TOON
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
}`,fM=`#define TOON
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
}`,hM=`uniform float size;
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
}`,dM=`uniform vec3 diffuse;
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
}`,pM=`#include <common>
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
}`,mM=`uniform vec3 color;
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
}`,gM=`uniform float rotation;
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
}`,yM=`uniform vec3 diffuse;
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
}`,Qt={alphahash_fragment:kv,alphahash_pars_fragment:zv,alphamap_fragment:Vv,alphamap_pars_fragment:Hv,alphatest_fragment:Gv,alphatest_pars_fragment:Wv,aomap_fragment:Xv,aomap_pars_fragment:qv,batching_pars_vertex:Yv,batching_vertex:jv,begin_vertex:$v,beginnormal_vertex:Zv,bsdfs:Jv,iridescence_fragment:Kv,bumpmap_pars_fragment:Qv,clipping_planes_fragment:tb,clipping_planes_pars_fragment:eb,clipping_planes_pars_vertex:nb,clipping_planes_vertex:ib,color_fragment:rb,color_pars_fragment:sb,color_pars_vertex:ob,color_vertex:ab,common:lb,cube_uv_reflection_fragment:cb,defaultnormal_vertex:ub,displacementmap_pars_vertex:fb,displacementmap_vertex:hb,emissivemap_fragment:db,emissivemap_pars_fragment:pb,colorspace_fragment:mb,colorspace_pars_fragment:gb,envmap_fragment:yb,envmap_common_pars_fragment:_b,envmap_pars_fragment:xb,envmap_pars_vertex:vb,envmap_physical_pars_fragment:Db,envmap_vertex:bb,fog_vertex:Sb,fog_pars_vertex:Mb,fog_fragment:wb,fog_pars_fragment:Tb,gradientmap_pars_fragment:Ab,lightmap_pars_fragment:Eb,lights_lambert_fragment:Cb,lights_lambert_pars_fragment:Ib,lights_pars_begin:Rb,lights_toon_fragment:Pb,lights_toon_pars_fragment:Lb,lights_phong_fragment:Fb,lights_phong_pars_fragment:Bb,lights_physical_fragment:Ub,lights_physical_pars_fragment:Ob,lights_fragment_begin:Nb,lights_fragment_maps:kb,lights_fragment_end:zb,logdepthbuf_fragment:Vb,logdepthbuf_pars_fragment:Hb,logdepthbuf_pars_vertex:Gb,logdepthbuf_vertex:Wb,map_fragment:Xb,map_pars_fragment:qb,map_particle_fragment:Yb,map_particle_pars_fragment:jb,metalnessmap_fragment:$b,metalnessmap_pars_fragment:Zb,morphinstance_vertex:Jb,morphcolor_vertex:Kb,morphnormal_vertex:Qb,morphtarget_pars_vertex:tS,morphtarget_vertex:eS,normal_fragment_begin:nS,normal_fragment_maps:iS,normal_pars_fragment:rS,normal_pars_vertex:sS,normal_vertex:oS,normalmap_pars_fragment:aS,clearcoat_normal_fragment_begin:lS,clearcoat_normal_fragment_maps:cS,clearcoat_pars_fragment:uS,iridescence_pars_fragment:fS,opaque_fragment:hS,packing:dS,premultiplied_alpha_fragment:pS,project_vertex:mS,dithering_fragment:gS,dithering_pars_fragment:yS,roughnessmap_fragment:_S,roughnessmap_pars_fragment:xS,shadowmap_pars_fragment:vS,shadowmap_pars_vertex:bS,shadowmap_vertex:SS,shadowmask_pars_fragment:MS,skinbase_vertex:wS,skinning_pars_vertex:TS,skinning_vertex:AS,skinnormal_vertex:ES,specularmap_fragment:CS,specularmap_pars_fragment:IS,tonemapping_fragment:RS,tonemapping_pars_fragment:DS,transmission_fragment:PS,transmission_pars_fragment:LS,uv_pars_fragment:FS,uv_pars_vertex:BS,uv_vertex:US,worldpos_vertex:OS,background_vert:NS,background_frag:kS,backgroundCube_vert:zS,backgroundCube_frag:VS,cube_vert:HS,cube_frag:GS,depth_vert:WS,depth_frag:XS,distanceRGBA_vert:qS,distanceRGBA_frag:YS,equirect_vert:jS,equirect_frag:$S,linedashed_vert:ZS,linedashed_frag:JS,meshbasic_vert:KS,meshbasic_frag:QS,meshlambert_vert:tM,meshlambert_frag:eM,meshmatcap_vert:nM,meshmatcap_frag:iM,meshnormal_vert:rM,meshnormal_frag:sM,meshphong_vert:oM,meshphong_frag:aM,meshphysical_vert:lM,meshphysical_frag:cM,meshtoon_vert:uM,meshtoon_frag:fM,points_vert:hM,points_frag:dM,shadow_vert:pM,shadow_frag:mM,sprite_vert:gM,sprite_frag:yM},st={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},tr={basic:{uniforms:_n([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:_n([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:_n([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:_n([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:_n([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:_n([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:_n([st.points,st.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:_n([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:_n([st.common,st.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:_n([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:_n([st.sprite,st.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:_n([st.common,st.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:_n([st.lights,st.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};tr.physical={uniforms:_n([tr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};var hf={r:0,b:0,g:0},Ys=new Ei,_M=new Oe;function xM(n,t,e,i,r,s,o){let a=new Jt(0),l=s===!0?0:1,c,u,f=null,h=0,p=null;function g(w){let S=w.isScene===!0?w.background:null;return S&&S.isTexture&&(S=(w.backgroundBlurriness>0?e:t).get(S)),S}function _(w){let S=!1,E=g(w);E===null?d(a,l):E&&E.isColor&&(d(E,1),S=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,S){let E=g(S);E&&(E.isCubeTexture||E.mapping===pl)?(u===void 0&&(u=new Rn(new Wo(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:qs(tr.backgroundCube.uniforms),vertexShader:tr.backgroundCube.vertexShader,fragmentShader:tr.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,L,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ys.copy(S.backgroundRotation),Ys.x*=-1,Ys.y*=-1,Ys.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ys.y*=-1,Ys.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(_M.makeRotationFromEuler(Ys)),u.material.toneMapped=ue.getTransfer(E.colorSpace)!==me,(f!==E||h!==E.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=E,h=E.version,p=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Rn(new sl(2,2),new Ci({name:"BackgroundMaterial",uniforms:qs(tr.background.uniforms),vertexShader:tr.background.vertexShader,fragmentShader:tr.background.fragmentShader,side:vr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ue.getTransfer(E.colorSpace)!==me,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||h!==E.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=E,h=E.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function d(w,S){w.getRGB(hf,pp(n)),i.buffers.color.setClear(hf.r,hf.g,hf.b,S,o)}function A(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,S=1){a.set(w),l=S,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,d(a,l)},render:_,addToRenderList:m,dispose:A}}function vM(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null),s=r,o=!1;function a(v,D,z,G,q){let $=!1,X=f(G,z,D);s!==X&&(s=X,c(s.object)),$=p(v,G,z,q),$&&g(v,G,z,q),q!==null&&t.update(q,n.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,S(v,D,z,G),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function u(v){return n.deleteVertexArray(v)}function f(v,D,z){let G=z.wireframe===!0,q=i[v.id];q===void 0&&(q={},i[v.id]=q);let $=q[D.id];$===void 0&&($={},q[D.id]=$);let X=$[G];return X===void 0&&(X=h(l()),$[G]=X),X}function h(v){let D=[],z=[],G=[];for(let q=0;q<e;q++)D[q]=0,z[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:z,attributeDivisors:G,object:v,attributes:{},index:null}}function p(v,D,z,G){let q=s.attributes,$=D.attributes,X=0,nt=z.getAttributes();for(let V in nt)if(nt[V].location>=0){let ft=q[V],wt=$[V];if(wt===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(wt=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(wt=v.instanceColor)),ft===void 0||ft.attribute!==wt||wt&&ft.data!==wt.data)return!0;X++}return s.attributesNum!==X||s.index!==G}function g(v,D,z,G){let q={},$=D.attributes,X=0,nt=z.getAttributes();for(let V in nt)if(nt[V].location>=0){let ft=$[V];ft===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(ft=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(ft=v.instanceColor));let wt={};wt.attribute=ft,ft&&ft.data&&(wt.data=ft.data),q[V]=wt,X++}s.attributes=q,s.attributesNum=X,s.index=G}function _(){let v=s.newAttributes;for(let D=0,z=v.length;D<z;D++)v[D]=0}function m(v){d(v,0)}function d(v,D){let z=s.newAttributes,G=s.enabledAttributes,q=s.attributeDivisors;z[v]=1,G[v]===0&&(n.enableVertexAttribArray(v),G[v]=1),q[v]!==D&&(n.vertexAttribDivisor(v,D),q[v]=D)}function A(){let v=s.newAttributes,D=s.enabledAttributes;for(let z=0,G=D.length;z<G;z++)D[z]!==v[z]&&(n.disableVertexAttribArray(z),D[z]=0)}function w(v,D,z,G,q,$,X){X===!0?n.vertexAttribIPointer(v,D,z,q,$):n.vertexAttribPointer(v,D,z,G,q,$)}function S(v,D,z,G){_();let q=G.attributes,$=z.getAttributes(),X=D.defaultAttributeValues;for(let nt in $){let V=$[nt];if(V.location>=0){let ot=q[nt];if(ot===void 0&&(nt==="instanceMatrix"&&v.instanceMatrix&&(ot=v.instanceMatrix),nt==="instanceColor"&&v.instanceColor&&(ot=v.instanceColor)),ot!==void 0){let ft=ot.normalized,wt=ot.itemSize,oe=t.get(ot);if(oe===void 0)continue;let Me=oe.buffer,Pe=oe.type,de=oe.bytesPerElement,Y=Pe===n.INT||Pe===n.UNSIGNED_INT||ot.gpuType===Du;if(ot.isInterleavedBufferAttribute){let J=ot.data,pt=J.stride,Nt=ot.offset;if(J.isInstancedInterleavedBuffer){for(let Mt=0;Mt<V.locationSize;Mt++)d(V.location+Mt,J.meshPerAttribute);v.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Mt=0;Mt<V.locationSize;Mt++)m(V.location+Mt);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let Mt=0;Mt<V.locationSize;Mt++)w(V.location+Mt,wt/V.locationSize,Pe,ft,pt*de,(Nt+wt/V.locationSize*Mt)*de,Y)}else{if(ot.isInstancedBufferAttribute){for(let J=0;J<V.locationSize;J++)d(V.location+J,ot.meshPerAttribute);v.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let J=0;J<V.locationSize;J++)m(V.location+J);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let J=0;J<V.locationSize;J++)w(V.location+J,wt/V.locationSize,Pe,ft,wt*de,wt/V.locationSize*J*de,Y)}}else if(X!==void 0){let ft=X[nt];if(ft!==void 0)switch(ft.length){case 2:n.vertexAttrib2fv(V.location,ft);break;case 3:n.vertexAttrib3fv(V.location,ft);break;case 4:n.vertexAttrib4fv(V.location,ft);break;default:n.vertexAttrib1fv(V.location,ft)}}}}A()}function E(){O();for(let v in i){let D=i[v];for(let z in D){let G=D[z];for(let q in G)u(G[q].object),delete G[q];delete D[z]}delete i[v]}}function C(v){if(i[v.id]===void 0)return;let D=i[v.id];for(let z in D){let G=D[z];for(let q in G)u(G[q].object),delete G[q];delete D[z]}delete i[v.id]}function L(v){for(let D in i){let z=i[D];if(z[v.id]===void 0)continue;let G=z[v.id];for(let q in G)u(G[q].object),delete G[q];delete z[v.id]}}function O(){b(),o=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:O,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:C,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:m,disableUnusedAttributes:A}}function bM(n,t,e){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),e.update(u,i,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let p=0;for(let g=0;g<f;g++)p+=u[g];e.update(p,i,1)}function l(c,u,f,h){if(f===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function SM(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let L=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(L){return!(L!==ui&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){let O=L===Jo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==Ii&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Qi&&!O)}function l(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:A,maxVaryings:w,maxFragmentUniforms:S,vertexTextures:E,maxSamples:C}}function MM(n){let t=this,e=null,i=0,r=!1,s=!1,o=new si,a=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,p){let g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{let A=s?0:i,w=A*4,S=d.clippingState||null;l.value=S,S=u(g,h,w,p);for(let E=0;E!==w;++E)S[E]=e[E];d.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,p,g){let _=f!==null?f.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let d=p+_*4,A=h.matrixWorldInverse;a.getNormalMatrix(A),(m===null||m.length<d)&&(m=new Float32Array(d));for(let w=0,S=p;w!==_;++w,S+=4)o.copy(f[w]).applyMatrix4(A,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function wM(n){let t=new WeakMap;function e(o,a){return a===Cu?o.mapping=Ws:a===Iu&&(o.mapping=Xs),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Cu||a===Iu)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new su(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}var na=4,Ey=[.125,.215,.35,.446,.526,.582],Zs=20,_p=new ul,Cy=new Jt,xp=null,vp=0,bp=0,Sp=!1,$s=(1+Math.sqrt(5))/2,ea=1/$s,Iy=[new R(-$s,ea,0),new R($s,ea,0),new R(-ea,0,$s),new R(ea,0,$s),new R(0,$s,-ea),new R(0,$s,ea),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],TM=new R,mf=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){let{size:o=256,position:a=TM}=s;xp=this._renderer.getRenderTarget(),vp=this._renderer.getActiveCubeFace(),bp=this._renderer.getActiveMipmapLevel(),Sp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Py(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dy(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(xp,vp,bp),this._renderer.xr.enabled=Sp,t.scissorTest=!1,df(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ws||t.mapping===Xs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xp=this._renderer.getRenderTarget(),vp=this._renderer.getActiveCubeFace(),bp=this._renderer.getActiveMipmapLevel(),Sp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ai,minFilter:Ai,generateMipmaps:!1,type:Jo,format:ui,colorSpace:Vs,depthBuffer:!1},r=Ry(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ry(t,e,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=AM(s)),this._blurMaterial=EM(s,t,e)}return r}_compileMaterial(t){let e=new Rn(this._lodPlanes[0],t);this._renderer.compile(e,_p)}_sceneToCubeUV(t,e,i,r,s){let l=new yn(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(Cy),f.toneMapping=Sr,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null));let _=new Za({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1}),m=new Rn(new Wo,_),d=!1,A=t.background;A?A.isColor&&(_.color.copy(A),t.background=null,d=!0):(_.color.copy(Cy),d=!0);for(let w=0;w<6;w++){let S=w%3;S===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[w],s.y,s.z)):S===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[w]));let E=this._cubeSize;df(r,S*E,w>2?E:0,E,E),f.setRenderTarget(r),d&&f.render(m,l),f.render(t,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=p,f.autoClear=h,t.background=A}_textureToCubeUV(t,e){let i=this._renderer,r=t.mapping===Ws||t.mapping===Xs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Py()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dy());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new Rn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;let l=this._cubeSize;df(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,_p)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Iy[(r-s-1)%Iy.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,f=new Rn(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Zs-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Zs;m>Zs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zs}`);let d=[],A=0;for(let L=0;L<Zs;++L){let O=L/_,b=Math.exp(-O*O/2);d.push(b),L===0?A+=b:L<m&&(A+=2*b)}for(let L=0;L<d.length;L++)d[L]=d[L]/A;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-i;let S=this._sizeLods[r],E=3*S*(r>w-na?r-w+na:0),C=4*(this._cubeSize-S);df(e,E,C,3*S,2*S),l.setRenderTarget(e),l.render(f,_p)}};function AM(n){let t=[],e=[],i=[],r=n,s=n-na+1+Ey.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let l=1/a;o>n-na?l=Ey[o-n+na-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,g=6,_=3,m=2,d=1,A=new Float32Array(_*g*p),w=new Float32Array(m*g*p),S=new Float32Array(d*g*p);for(let C=0;C<p;C++){let L=C%3*2/3-1,O=C>2?0:-1,b=[L,O,0,L+2/3,O,0,L+2/3,O+1,0,L,O,0,L+2/3,O+1,0,L,O+1,0];A.set(b,_*g*C),w.set(h,m*g*C);let v=[C,C,C,C,C,C];S.set(v,d*g*C)}let E=new In;E.setAttribute("position",new Mn(A,_)),E.setAttribute("uv",new Mn(w,m)),E.setAttribute("faceIndex",new Mn(S,d)),t.push(E),r>na&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Ry(n,t,e){let i=new Zi(n,t,e);return i.texture.mapping=pl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function df(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function EM(n,t,e){let i=new Float32Array(Zs),r=new R(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:Zs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Pp(),fragmentShader:`

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
		`,blending:br,depthTest:!1,depthWrite:!1})}function Dy(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pp(),fragmentShader:`

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
		`,blending:br,depthTest:!1,depthWrite:!1})}function Py(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function Pp(){return`

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
	`}function CM(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Cu||l===Iu,u=l===Ws||l===Xs;if(c||u){let f=t.get(a),h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new mf(n)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{let p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(e===null&&(e=new mf(n)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function IM(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let r=e(i);return r===null&&Ho("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function RM(n,t,e,i){let r={},s=new WeakMap;function o(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];let p=s.get(h);p&&(t.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,e.memory.geometries++),h}function l(f){let h=f.attributes;for(let p in h)t.update(h[p],n.ARRAY_BUFFER)}function c(f){let h=[],p=f.index,g=f.attributes.position,_=0;if(p!==null){let A=p.array;_=p.version;for(let w=0,S=A.length;w<S;w+=3){let E=A[w+0],C=A[w+1],L=A[w+2];h.push(E,C,C,L,L,E)}}else if(g!==void 0){let A=g.array;_=g.version;for(let w=0,S=A.length/3-1;w<S;w+=3){let E=w+0,C=w+1,L=w+2;h.push(E,C,C,L,L,E)}}else return;let m=new(dp(h)?Ka:Ja)(h,1);m.version=_;let d=s.get(f);d&&t.remove(d),s.set(f,m)}function u(f){let h=s.get(f);if(h){let p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function DM(n,t,e){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,p){n.drawElements(i,p,s,h*o),e.update(p,i,1)}function c(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,h*o,g),e.update(p,i,g))}function u(h,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function f(h,p,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<h.length;d++)c(h[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,_,0,g);let d=0;for(let A=0;A<g;A++)d+=p[A]*_[A];e.update(d,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function PM(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function LM(n,t,e){let i=new WeakMap,r=new Ne;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0,h=i.get(a);if(h===void 0||h.count!==f){let b=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],A=a.morphAttributes.color||[],w=0;p===!0&&(w=1),g===!0&&(w=2),_===!0&&(w=3);let S=a.attributes.position.count*w,E=1;S>t.maxTextureSize&&(E=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let C=new Float32Array(S*E*4*f),L=new ja(C,S,E,f);L.type=Qi,L.needsUpdate=!0;let O=w*4;for(let v=0;v<f;v++){let D=m[v],z=d[v],G=A[v],q=S*E*4*v;for(let $=0;$<D.count;$++){let X=$*O;p===!0&&(r.fromBufferAttribute(D,$),C[q+X+0]=r.x,C[q+X+1]=r.y,C[q+X+2]=r.z,C[q+X+3]=0),g===!0&&(r.fromBufferAttribute(z,$),C[q+X+4]=r.x,C[q+X+5]=r.y,C[q+X+6]=r.z,C[q+X+7]=0),_===!0&&(r.fromBufferAttribute(G,$),C[q+X+8]=r.x,C[q+X+9]=r.y,C[q+X+10]=r.z,C[q+X+11]=G.itemSize===4?r.w:1)}}h={count:f,texture:L,size:new Vt(S,E)},i.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];let g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function FM(n,t,e,i){let r=new WeakMap;function s(l){let c=i.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==c&&(t.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}var Jy=new Gn,Ly=new il(1,1),Ky=new ja,Qy=new iu,t_=new tl,Fy=[],By=[],Uy=new Float32Array(16),Oy=new Float32Array(9),Ny=new Float32Array(4);function ra(n,t,e){let i=n[0];if(i<=0||i>0)return n;let r=t*e,s=Fy[r];if(s===void 0&&(s=new Float32Array(r),Fy[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function je(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function $e(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function yf(n,t){let e=By[t];e===void 0&&(e=new Int32Array(t),By[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function BM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function UM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(je(e,t))return;n.uniform2fv(this.addr,t),$e(e,t)}}function OM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(je(e,t))return;n.uniform3fv(this.addr,t),$e(e,t)}}function NM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(je(e,t))return;n.uniform4fv(this.addr,t),$e(e,t)}}function kM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(je(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),$e(e,t)}else{if(je(e,i))return;Ny.set(i),n.uniformMatrix2fv(this.addr,!1,Ny),$e(e,i)}}function zM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(je(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),$e(e,t)}else{if(je(e,i))return;Oy.set(i),n.uniformMatrix3fv(this.addr,!1,Oy),$e(e,i)}}function VM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(je(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),$e(e,t)}else{if(je(e,i))return;Uy.set(i),n.uniformMatrix4fv(this.addr,!1,Uy),$e(e,i)}}function HM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function GM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(je(e,t))return;n.uniform2iv(this.addr,t),$e(e,t)}}function WM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(je(e,t))return;n.uniform3iv(this.addr,t),$e(e,t)}}function XM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(je(e,t))return;n.uniform4iv(this.addr,t),$e(e,t)}}function qM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function YM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(je(e,t))return;n.uniform2uiv(this.addr,t),$e(e,t)}}function jM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(je(e,t))return;n.uniform3uiv(this.addr,t),$e(e,t)}}function $M(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(je(e,t))return;n.uniform4uiv(this.addr,t),$e(e,t)}}function ZM(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ly.compareFunction=cp,s=Ly):s=Jy,e.setTexture2D(t||s,r)}function JM(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Qy,r)}function KM(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||t_,r)}function QM(n,t,e){let i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Ky,r)}function tw(n){switch(n){case 5126:return BM;case 35664:return UM;case 35665:return OM;case 35666:return NM;case 35674:return kM;case 35675:return zM;case 35676:return VM;case 5124:case 35670:return HM;case 35667:case 35671:return GM;case 35668:case 35672:return WM;case 35669:case 35673:return XM;case 5125:return qM;case 36294:return YM;case 36295:return jM;case 36296:return $M;case 35678:case 36198:case 36298:case 36306:case 35682:return ZM;case 35679:case 36299:case 36307:return JM;case 35680:case 36300:case 36308:case 36293:return KM;case 36289:case 36303:case 36311:case 36292:return QM}}function ew(n,t){n.uniform1fv(this.addr,t)}function nw(n,t){let e=ra(t,this.size,2);n.uniform2fv(this.addr,e)}function iw(n,t){let e=ra(t,this.size,3);n.uniform3fv(this.addr,e)}function rw(n,t){let e=ra(t,this.size,4);n.uniform4fv(this.addr,e)}function sw(n,t){let e=ra(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function ow(n,t){let e=ra(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function aw(n,t){let e=ra(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function lw(n,t){n.uniform1iv(this.addr,t)}function cw(n,t){n.uniform2iv(this.addr,t)}function uw(n,t){n.uniform3iv(this.addr,t)}function fw(n,t){n.uniform4iv(this.addr,t)}function hw(n,t){n.uniform1uiv(this.addr,t)}function dw(n,t){n.uniform2uiv(this.addr,t)}function pw(n,t){n.uniform3uiv(this.addr,t)}function mw(n,t){n.uniform4uiv(this.addr,t)}function gw(n,t,e){let i=this.cache,r=t.length,s=yf(e,r);je(i,s)||(n.uniform1iv(this.addr,s),$e(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Jy,s[o])}function yw(n,t,e){let i=this.cache,r=t.length,s=yf(e,r);je(i,s)||(n.uniform1iv(this.addr,s),$e(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Qy,s[o])}function _w(n,t,e){let i=this.cache,r=t.length,s=yf(e,r);je(i,s)||(n.uniform1iv(this.addr,s),$e(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||t_,s[o])}function xw(n,t,e){let i=this.cache,r=t.length,s=yf(e,r);je(i,s)||(n.uniform1iv(this.addr,s),$e(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Ky,s[o])}function vw(n){switch(n){case 5126:return ew;case 35664:return nw;case 35665:return iw;case 35666:return rw;case 35674:return sw;case 35675:return ow;case 35676:return aw;case 5124:case 35670:return lw;case 35667:case 35671:return cw;case 35668:case 35672:return uw;case 35669:case 35673:return fw;case 5125:return hw;case 36294:return dw;case 36295:return pw;case 36296:return mw;case 35678:case 36198:case 36298:case 36306:case 35682:return gw;case 35679:case 36299:case 36307:return yw;case 35680:case 36300:case 36308:case 36293:return _w;case 36289:case 36303:case 36311:case 36292:return xw}}var wp=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=tw(e.type)}},Tp=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=vw(e.type)}},Ap=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(t,e[a.id],i)}}},Mp=/(\w+)(\])?(\[|\.)?/g;function ky(n,t){n.seq.push(t),n.map[t.id]=t}function bw(n,t,e){let i=n.name,r=i.length;for(Mp.lastIndex=0;;){let s=Mp.exec(i),o=Mp.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){ky(e,c===void 0?new wp(a,n,t):new Tp(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new Ap(a),ky(e,f)),e=f}}}var ia=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);bw(s,o,this)}}setValue(t,e,i,r){let s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){let r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){let a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){let i=[];for(let r=0,s=t.length;r!==s;++r){let o=t[r];o.id in e&&i.push(o)}return i}};function zy(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var Sw=37297,Mw=0;function ww(n,t){let e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var Vy=new jt;function Tw(n){ue._getMatrix(Vy,ue.workingColorSpace,n);let t=`mat3( ${Vy.elements.map(e=>e.toFixed(4))} )`;switch(ue.getTransfer(n)){case Xa:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Hy(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=(n.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+ww(n.getShaderSource(t),a)}else return s}function Aw(n,t){let e=Tw(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Ew(n,t){let e;switch(t){case ry:e="Linear";break;case sy:e="Reinhard";break;case oy:e="Cineon";break;case ay:e="ACESFilmic";break;case cy:e="AgX";break;case uy:e="Neutral";break;case ly:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var pf=new R;function Cw(){ue.getLuminanceCoefficients(pf);let n=pf.x.toFixed(4),t=pf.y.toFixed(4),e=pf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Iw(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vl).join(`
`)}function Rw(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Dw(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(t,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function vl(n){return n!==""}function Gy(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wy(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Pw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ep(n){return n.replace(Pw,Fw)}var Lw=new Map;function Fw(n,t){let e=Qt[t];if(e===void 0){let i=Lw.get(t);if(i!==void 0)e=Qt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ep(e)}var Bw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xy(n){return n.replace(Bw,Uw)}function Uw(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function qy(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Ow(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===jd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Og?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ki&&(t="SHADOWMAP_TYPE_VSM"),t}function Nw(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ws:case Xs:t="ENVMAP_TYPE_CUBE";break;case pl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function kw(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Xs:t="ENVMAP_MODE_REFRACTION";break}return t}function zw(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Kd:t="ENVMAP_BLENDING_MULTIPLY";break;case ny:t="ENVMAP_BLENDING_MIX";break;case iy:t="ENVMAP_BLENDING_ADD";break}return t}function Vw(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Hw(n,t,e,i){let r=n.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Ow(e),c=Nw(e),u=kw(e),f=zw(e),h=Vw(e),p=Iw(e),g=Rw(s),_=r.createProgram(),m,d,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vl).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vl).join(`
`),d.length>0&&(d+=`
`)):(m=[qy(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vl).join(`
`),d=[qy(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Sr?"#define TONE_MAPPING":"",e.toneMapping!==Sr?Qt.tonemapping_pars_fragment:"",e.toneMapping!==Sr?Ew("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,Aw("linearToOutputTexel",e.outputColorSpace),Cw(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vl).join(`
`)),o=Ep(o),o=Gy(o,e),o=Wy(o,e),a=Ep(a),a=Gy(a,e),a=Wy(a,e),o=Xy(o),a=Xy(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===up?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===up?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let w=A+m+o,S=A+d+a,E=zy(r,r.VERTEX_SHADER,w),C=zy(r,r.FRAGMENT_SHADER,S);r.attachShader(_,E),r.attachShader(_,C),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function L(D){if(n.debug.checkShaderErrors){let z=r.getProgramInfoLog(_)||"",G=r.getShaderInfoLog(E)||"",q=r.getShaderInfoLog(C)||"",$=z.trim(),X=G.trim(),nt=q.trim(),V=!0,ot=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,E,C);else{let ft=Hy(r,E,"vertex"),wt=Hy(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+$+`
`+ft+`
`+wt)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(X===""||nt==="")&&(ot=!1);ot&&(D.diagnostics={runnable:V,programLog:$,vertexShader:{log:X,prefix:m},fragmentShader:{log:nt,prefix:d}})}r.deleteShader(E),r.deleteShader(C),O=new ia(r,_),b=Dw(r,_)}let O;this.getUniforms=function(){return O===void 0&&L(this),O};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(_,Sw)),v},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Mw++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=C,this}var Gw=0,Cp=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Ip(t),e.set(t,i)),i}},Ip=class{constructor(t){this.id=Gw++,this.code=t,this.usedTimes=0}};function Ww(n,t,e,i,r,s,o){let a=new $a,l=new Cp,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures,p=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,v,D,z,G){let q=z.fog,$=G.geometry,X=b.isMeshStandardMaterial?z.environment:null,nt=(b.isMeshStandardMaterial?e:t).get(b.envMap||X),V=nt&&nt.mapping===pl?nt.image.height:null,ot=g[b.type];b.precision!==null&&(p=r.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let ft=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,wt=ft!==void 0?ft.length:0,oe=0;$.morphAttributes.position!==void 0&&(oe=1),$.morphAttributes.normal!==void 0&&(oe=2),$.morphAttributes.color!==void 0&&(oe=3);let Me,Pe,de,Y;if(ot){let pe=tr[ot];Me=pe.vertexShader,Pe=pe.fragmentShader}else Me=b.vertexShader,Pe=b.fragmentShader,l.update(b),de=l.getVertexShaderID(b),Y=l.getFragmentShaderID(b);let J=n.getRenderTarget(),pt=n.state.buffers.depth.getReversed(),Nt=G.isInstancedMesh===!0,Mt=G.isBatchedMesh===!0,le=!!b.map,pn=!!b.matcap,T=!!nt,Le=!!b.aoMap,Yt=!!b.lightMap,Pt=!!b.bumpMap,yt=!!b.normalMap,Fe=!!b.displacementMap,_t=!!b.emissiveMap,Kt=!!b.metalnessMap,Qe=!!b.roughnessMap,Ge=b.anisotropy>0,M=b.clearcoat>0,y=b.dispersion>0,U=b.iridescence>0,W=b.sheen>0,Z=b.transmission>0,H=Ge&&!!b.anisotropyMap,St=M&&!!b.clearcoatMap,it=M&&!!b.clearcoatNormalMap,xt=M&&!!b.clearcoatRoughnessMap,vt=U&&!!b.iridescenceMap,tt=U&&!!b.iridescenceThicknessMap,ct=W&&!!b.sheenColorMap,Dt=W&&!!b.sheenRoughnessMap,bt=!!b.specularMap,at=!!b.specularColorMap,Zt=!!b.specularIntensityMap,I=Z&&!!b.transmissionMap,et=Z&&!!b.thicknessMap,rt=!!b.gradientMap,dt=!!b.alphaMap,K=b.alphaTest>0,j=!!b.alphaHash,gt=!!b.extensions,Wt=Sr;b.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Wt=n.toneMapping);let we={shaderID:ot,shaderType:b.type,shaderName:b.name,vertexShader:Me,fragmentShader:Pe,defines:b.defines,customVertexShaderID:de,customFragmentShaderID:Y,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:Mt,batchingColor:Mt&&G._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&G.instanceColor!==null,instancingMorph:Nt&&G.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:J===null?n.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Vs,alphaToCoverage:!!b.alphaToCoverage,map:le,matcap:pn,envMap:T,envMapMode:T&&nt.mapping,envMapCubeUVHeight:V,aoMap:Le,lightMap:Yt,bumpMap:Pt,normalMap:yt,displacementMap:h&&Fe,emissiveMap:_t,normalMapObjectSpace:yt&&b.normalMapType===py,normalMapTangentSpace:yt&&b.normalMapType===lp,metalnessMap:Kt,roughnessMap:Qe,anisotropy:Ge,anisotropyMap:H,clearcoat:M,clearcoatMap:St,clearcoatNormalMap:it,clearcoatRoughnessMap:xt,dispersion:y,iridescence:U,iridescenceMap:vt,iridescenceThicknessMap:tt,sheen:W,sheenColorMap:ct,sheenRoughnessMap:Dt,specularMap:bt,specularColorMap:at,specularIntensityMap:Zt,transmission:Z,transmissionMap:I,thicknessMap:et,gradientMap:rt,opaque:b.transparent===!1&&b.blending===ks&&b.alphaToCoverage===!1,alphaMap:dt,alphaTest:K,alphaHash:j,combine:b.combine,mapUv:le&&_(b.map.channel),aoMapUv:Le&&_(b.aoMap.channel),lightMapUv:Yt&&_(b.lightMap.channel),bumpMapUv:Pt&&_(b.bumpMap.channel),normalMapUv:yt&&_(b.normalMap.channel),displacementMapUv:Fe&&_(b.displacementMap.channel),emissiveMapUv:_t&&_(b.emissiveMap.channel),metalnessMapUv:Kt&&_(b.metalnessMap.channel),roughnessMapUv:Qe&&_(b.roughnessMap.channel),anisotropyMapUv:H&&_(b.anisotropyMap.channel),clearcoatMapUv:St&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:it&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&_(b.sheenRoughnessMap.channel),specularMapUv:bt&&_(b.specularMap.channel),specularColorMapUv:at&&_(b.specularColorMap.channel),specularIntensityMapUv:Zt&&_(b.specularIntensityMap.channel),transmissionMapUv:I&&_(b.transmissionMap.channel),thicknessMapUv:et&&_(b.thicknessMap.channel),alphaMapUv:dt&&_(b.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(yt||Ge),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!$.attributes.uv&&(le||dt),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:pt,skinning:G.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:oe,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Wt,decodeVideoTexture:le&&b.map.isVideoTexture===!0&&ue.getTransfer(b.map.colorSpace)===me,decodeVideoTextureEmissive:_t&&b.emissiveMap.isVideoTexture===!0&&ue.getTransfer(b.emissiveMap.colorSpace)===me,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ci,flipSided:b.side===wn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:gt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&b.extensions.multiDraw===!0||Mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return we.vertexUv1s=c.has(1),we.vertexUv2s=c.has(2),we.vertexUv3s=c.has(3),c.clear(),we}function d(b){let v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)v.push(D),v.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(A(v,b),w(v,b),v.push(n.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function A(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function w(b,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),v.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),b.push(a.mask)}function S(b){let v=g[b.type],D;if(v){let z=tr[v];D=Ty.clone(z.uniforms)}else D=b.uniforms;return D}function E(b,v){let D;for(let z=0,G=u.length;z<G;z++){let q=u[z];if(q.cacheKey===v){D=q,++D.usedTimes;break}}return D===void 0&&(D=new Hw(n,v,b,s),u.push(D)),D}function C(b){if(--b.usedTimes===0){let v=u.indexOf(b);u[v]=u[u.length-1],u.pop(),b.destroy()}}function L(b){l.remove(b)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:E,releaseProgram:C,releaseShaderCache:L,programs:u,dispose:O}}function Xw(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function qw(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Yy(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function jy(){let n=[],t=0,e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(f,h,p,g,_,m){let d=n[t];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[t]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=_,d.group=m),t++,d}function a(f,h,p,g,_,m){let d=o(f,h,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):e.push(d)}function l(f,h,p,g,_,m){let d=o(f,h,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):e.unshift(d)}function c(f,h){e.length>1&&e.sort(f||qw),i.length>1&&i.sort(h||Yy),r.length>1&&r.sort(h||Yy)}function u(){for(let f=t,h=n.length;f<h;f++){let p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Yw(){let n=new WeakMap;function t(i,r){let s=n.get(i),o;return s===void 0?(o=new jy,n.set(i,[o])):r>=s.length?(o=new jy,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function jw(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new Jt};break;case"SpotLight":e={position:new R,direction:new R,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new R,halfWidth:new R,halfHeight:new R};break}return n[t.id]=e,e}}}function $w(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Zw=0;function Jw(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Kw(n){let t=new jw,e=$w(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);let r=new R,s=new Oe,o=new Oe;function a(c){let u=0,f=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,A=0,w=0,S=0,E=0,C=0,L=0;c.sort(Jw);for(let b=0,v=c.length;b<v;b++){let D=c[b],z=D.color,G=D.intensity,q=D.distance,$=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=z.r*G,f+=z.g*G,h+=z.b*G;else if(D.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(D.sh.coefficients[X],G);L++}else if(D.isDirectionalLight){let X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let nt=D.shadow,V=e.get(D);V.shadowIntensity=nt.intensity,V.shadowBias=nt.bias,V.shadowNormalBias=nt.normalBias,V.shadowRadius=nt.radius,V.shadowMapSize=nt.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=$,i.directionalShadowMatrix[p]=D.shadow.matrix,A++}i.directional[p]=X,p++}else if(D.isSpotLight){let X=t.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(z).multiplyScalar(G),X.distance=q,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,i.spot[_]=X;let nt=D.shadow;if(D.map&&(i.spotLightMap[E]=D.map,E++,nt.updateMatrices(D),D.castShadow&&C++),i.spotLightMatrix[_]=nt.matrix,D.castShadow){let V=e.get(D);V.shadowIntensity=nt.intensity,V.shadowBias=nt.bias,V.shadowNormalBias=nt.normalBias,V.shadowRadius=nt.radius,V.shadowMapSize=nt.mapSize,i.spotShadow[_]=V,i.spotShadowMap[_]=$,S++}_++}else if(D.isRectAreaLight){let X=t.get(D);X.color.copy(z).multiplyScalar(G),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=X,m++}else if(D.isPointLight){let X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){let nt=D.shadow,V=e.get(D);V.shadowIntensity=nt.intensity,V.shadowBias=nt.bias,V.shadowNormalBias=nt.normalBias,V.shadowRadius=nt.radius,V.shadowMapSize=nt.mapSize,V.shadowCameraNear=nt.camera.near,V.shadowCameraFar=nt.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=D.shadow.matrix,w++}i.point[g]=X,g++}else if(D.isHemisphereLight){let X=t.get(D);X.skyColor.copy(D.color).multiplyScalar(G),X.groundColor.copy(D.groundColor).multiplyScalar(G),i.hemi[d]=X,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=st.LTC_FLOAT_1,i.rectAreaLTC2=st.LTC_FLOAT_2):(i.rectAreaLTC1=st.LTC_HALF_1,i.rectAreaLTC2=st.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;let O=i.hash;(O.directionalLength!==p||O.pointLength!==g||O.spotLength!==_||O.rectAreaLength!==m||O.hemiLength!==d||O.numDirectionalShadows!==A||O.numPointShadows!==w||O.numSpotShadows!==S||O.numSpotMaps!==E||O.numLightProbes!==L)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+E-C,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=L,O.directionalLength=p,O.pointLength=g,O.spotLength=_,O.rectAreaLength=m,O.hemiLength=d,O.numDirectionalShadows=A,O.numPointShadows=w,O.numSpotShadows=S,O.numSpotMaps=E,O.numLightProbes=L,i.version=Zw++)}function l(c,u){let f=0,h=0,p=0,g=0,_=0,m=u.matrixWorldInverse;for(let d=0,A=c.length;d<A;d++){let w=c[d];if(w.isDirectionalLight){let S=i.directional[f];S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),f++}else if(w.isSpotLight){let S=i.spot[p];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(w.isRectAreaLight){let S=i.rectArea[g];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(w.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let S=i.point[h];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),h++}else if(w.isHemisphereLight){let S=i.hemi[_];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function $y(n){let t=new Kw(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Qw(n){let t=new WeakMap;function e(r,s=0){let o=t.get(r),a;return o===void 0?(a=new $y(n),t.set(r,[a])):s>=o.length?(a=new $y(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var tT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,eT=`uniform sampler2D shadow_pass;
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
}`;function nT(n,t,e){let i=new qo,r=new Vt,s=new Vt,o=new Ne,a=new cu({depthPacking:dy}),l=new uu,c={},u=e.maxTextureSize,f={[vr]:wn,[wn]:vr,[ci]:ci},h=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:tT,fragmentShader:eT}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let g=new In;g.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Rn(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jd;let d=this.type;this.render=function(C,L,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let b=n.getRenderTarget(),v=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),z=n.state;z.setBlending(br),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let G=d!==Ki&&this.type===Ki,q=d===Ki&&this.type!==Ki;for(let $=0,X=C.length;$<X;$++){let nt=C[$],V=nt.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);let ot=V.getFrameExtents();if(r.multiply(ot),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ot.x),r.x=s.x*ot.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ot.y),r.y=s.y*ot.y,V.mapSize.y=s.y)),V.map===null||G===!0||q===!0){let wt=this.type!==Ki?{minFilter:oi,magFilter:oi}:{};V.map!==null&&V.map.dispose(),V.map=new Zi(r.x,r.y,wt),V.map.texture.name=nt.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();let ft=V.getViewportCount();for(let wt=0;wt<ft;wt++){let oe=V.getViewport(wt);o.set(s.x*oe.x,s.y*oe.y,s.x*oe.z,s.y*oe.w),z.viewport(o),V.updateMatrices(nt,wt),i=V.getFrustum(),S(L,O,V.camera,nt,this.type)}V.isPointLightShadow!==!0&&this.type===Ki&&A(V,O),V.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(b,v,D)};function A(C,L){let O=t.update(_);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Zi(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(L,null,O,h,_,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(L,null,O,p,_,null)}function w(C,L,O,b){let v=null,D=O.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)v=D;else if(v=O.isPointLight===!0?l:a,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let z=v.uuid,G=L.uuid,q=c[z];q===void 0&&(q={},c[z]=q);let $=q[G];$===void 0&&($=v.clone(),q[G]=$,L.addEventListener("dispose",E)),v=$}if(v.visible=L.visible,v.wireframe=L.wireframe,b===Ki?v.side=L.shadowSide!==null?L.shadowSide:L.side:v.side=L.shadowSide!==null?L.shadowSide:f[L.side],v.alphaMap=L.alphaMap,v.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,v.map=L.map,v.clipShadows=L.clipShadows,v.clippingPlanes=L.clippingPlanes,v.clipIntersection=L.clipIntersection,v.displacementMap=L.displacementMap,v.displacementScale=L.displacementScale,v.displacementBias=L.displacementBias,v.wireframeLinewidth=L.wireframeLinewidth,v.linewidth=L.linewidth,O.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let z=n.properties.get(v);z.light=O}return v}function S(C,L,O,b,v){if(C.visible===!1)return;if(C.layers.test(L.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===Ki)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,C.matrixWorld);let G=t.update(C),q=C.material;if(Array.isArray(q)){let $=G.groups;for(let X=0,nt=$.length;X<nt;X++){let V=$[X],ot=q[V.materialIndex];if(ot&&ot.visible){let ft=w(C,ot,b,v);C.onBeforeShadow(n,C,L,O,G,ft,V),n.renderBufferDirect(O,null,G,ft,C,V),C.onAfterShadow(n,C,L,O,G,ft,V)}}}else if(q.visible){let $=w(C,q,b,v);C.onBeforeShadow(n,C,L,O,G,$,null),n.renderBufferDirect(O,null,G,$,C,null),C.onAfterShadow(n,C,L,O,G,$,null)}}let z=C.children;for(let G=0,q=z.length;G<q;G++)S(z[G],L,O,b,v)}function E(C){C.target.removeEventListener("dispose",E);for(let O in c){let b=c[O],v=C.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}var iT={[bu]:Su,[Mu]:Au,[wu]:Eu,[zs]:Tu,[Su]:bu,[Au]:Mu,[Eu]:wu,[Tu]:zs};function rT(n,t){function e(){let I=!1,et=new Ne,rt=null,dt=new Ne(0,0,0,0);return{setMask:function(K){rt!==K&&!I&&(n.colorMask(K,K,K,K),rt=K)},setLocked:function(K){I=K},setClear:function(K,j,gt,Wt,we){we===!0&&(K*=Wt,j*=Wt,gt*=Wt),et.set(K,j,gt,Wt),dt.equals(et)===!1&&(n.clearColor(K,j,gt,Wt),dt.copy(et))},reset:function(){I=!1,rt=null,dt.set(-1,0,0,0)}}}function i(){let I=!1,et=!1,rt=null,dt=null,K=null;return{setReversed:function(j){if(et!==j){let gt=t.get("EXT_clip_control");j?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),et=j;let Wt=K;K=null,this.setClear(Wt)}},getReversed:function(){return et},setTest:function(j){j?J(n.DEPTH_TEST):pt(n.DEPTH_TEST)},setMask:function(j){rt!==j&&!I&&(n.depthMask(j),rt=j)},setFunc:function(j){if(et&&(j=iT[j]),dt!==j){switch(j){case bu:n.depthFunc(n.NEVER);break;case Su:n.depthFunc(n.ALWAYS);break;case Mu:n.depthFunc(n.LESS);break;case zs:n.depthFunc(n.LEQUAL);break;case wu:n.depthFunc(n.EQUAL);break;case Tu:n.depthFunc(n.GEQUAL);break;case Au:n.depthFunc(n.GREATER);break;case Eu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}dt=j}},setLocked:function(j){I=j},setClear:function(j){K!==j&&(et&&(j=1-j),n.clearDepth(j),K=j)},reset:function(){I=!1,rt=null,dt=null,K=null,et=!1}}}function r(){let I=!1,et=null,rt=null,dt=null,K=null,j=null,gt=null,Wt=null,we=null;return{setTest:function(pe){I||(pe?J(n.STENCIL_TEST):pt(n.STENCIL_TEST))},setMask:function(pe){et!==pe&&!I&&(n.stencilMask(pe),et=pe)},setFunc:function(pe,hr,ji){(rt!==pe||dt!==hr||K!==ji)&&(n.stencilFunc(pe,hr,ji),rt=pe,dt=hr,K=ji)},setOp:function(pe,hr,ji){(j!==pe||gt!==hr||Wt!==ji)&&(n.stencilOp(pe,hr,ji),j=pe,gt=hr,Wt=ji)},setLocked:function(pe){I=pe},setClear:function(pe){we!==pe&&(n.clearStencil(pe),we=pe)},reset:function(){I=!1,et=null,rt=null,dt=null,K=null,j=null,gt=null,Wt=null,we=null}}}let s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap,u={},f={},h=new WeakMap,p=[],g=null,_=!1,m=null,d=null,A=null,w=null,S=null,E=null,C=null,L=new Jt(0,0,0),O=0,b=!1,v=null,D=null,z=null,G=null,q=null,$=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,nt=0,V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(V)[1]),X=nt>=1):V.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),X=nt>=2);let ot=null,ft={},wt=n.getParameter(n.SCISSOR_BOX),oe=n.getParameter(n.VIEWPORT),Me=new Ne().fromArray(wt),Pe=new Ne().fromArray(oe);function de(I,et,rt,dt){let K=new Uint8Array(4),j=n.createTexture();n.bindTexture(I,j),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let gt=0;gt<rt;gt++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(et,0,n.RGBA,1,1,dt,0,n.RGBA,n.UNSIGNED_BYTE,K):n.texImage2D(et+gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,K);return j}let Y={};Y[n.TEXTURE_2D]=de(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=de(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=de(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=de(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(n.DEPTH_TEST),o.setFunc(zs),Pt(!1),yt(Yd),J(n.CULL_FACE),Le(br);function J(I){u[I]!==!0&&(n.enable(I),u[I]=!0)}function pt(I){u[I]!==!1&&(n.disable(I),u[I]=!1)}function Nt(I,et){return f[I]!==et?(n.bindFramebuffer(I,et),f[I]=et,I===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=et),I===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=et),!0):!1}function Mt(I,et){let rt=p,dt=!1;if(I){rt=h.get(et),rt===void 0&&(rt=[],h.set(et,rt));let K=I.textures;if(rt.length!==K.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let j=0,gt=K.length;j<gt;j++)rt[j]=n.COLOR_ATTACHMENT0+j;rt.length=K.length,dt=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,dt=!0);dt&&n.drawBuffers(rt)}function le(I){return g!==I?(n.useProgram(I),g=I,!0):!1}let pn={[is]:n.FUNC_ADD,[kg]:n.FUNC_SUBTRACT,[zg]:n.FUNC_REVERSE_SUBTRACT};pn[Vg]=n.MIN,pn[Hg]=n.MAX;let T={[Gg]:n.ZERO,[Wg]:n.ONE,[Xg]:n.SRC_COLOR,[Zc]:n.SRC_ALPHA,[Jg]:n.SRC_ALPHA_SATURATE,[$g]:n.DST_COLOR,[Yg]:n.DST_ALPHA,[qg]:n.ONE_MINUS_SRC_COLOR,[Jc]:n.ONE_MINUS_SRC_ALPHA,[Zg]:n.ONE_MINUS_DST_COLOR,[jg]:n.ONE_MINUS_DST_ALPHA,[Kg]:n.CONSTANT_COLOR,[Qg]:n.ONE_MINUS_CONSTANT_COLOR,[ty]:n.CONSTANT_ALPHA,[ey]:n.ONE_MINUS_CONSTANT_ALPHA};function Le(I,et,rt,dt,K,j,gt,Wt,we,pe){if(I===br){_===!0&&(pt(n.BLEND),_=!1);return}if(_===!1&&(J(n.BLEND),_=!0),I!==Ng){if(I!==m||pe!==b){if((d!==is||S!==is)&&(n.blendEquation(n.FUNC_ADD),d=is,S=is),pe)switch(I){case ks:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $d:n.blendFunc(n.ONE,n.ONE);break;case Zd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Jd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case ks:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $d:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Zd:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jd:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}A=null,w=null,E=null,C=null,L.set(0,0,0),O=0,m=I,b=pe}return}K=K||et,j=j||rt,gt=gt||dt,(et!==d||K!==S)&&(n.blendEquationSeparate(pn[et],pn[K]),d=et,S=K),(rt!==A||dt!==w||j!==E||gt!==C)&&(n.blendFuncSeparate(T[rt],T[dt],T[j],T[gt]),A=rt,w=dt,E=j,C=gt),(Wt.equals(L)===!1||we!==O)&&(n.blendColor(Wt.r,Wt.g,Wt.b,we),L.copy(Wt),O=we),m=I,b=!1}function Yt(I,et){I.side===ci?pt(n.CULL_FACE):J(n.CULL_FACE);let rt=I.side===wn;et&&(rt=!rt),Pt(rt),I.blending===ks&&I.transparent===!1?Le(br):Le(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);let dt=I.stencilWrite;a.setTest(dt),dt&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),_t(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?J(n.SAMPLE_ALPHA_TO_COVERAGE):pt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pt(I){v!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),v=I)}function yt(I){I!==Bg?(J(n.CULL_FACE),I!==D&&(I===Yd?n.cullFace(n.BACK):I===Ug?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pt(n.CULL_FACE),D=I}function Fe(I){I!==z&&(X&&n.lineWidth(I),z=I)}function _t(I,et,rt){I?(J(n.POLYGON_OFFSET_FILL),(G!==et||q!==rt)&&(n.polygonOffset(et,rt),G=et,q=rt)):pt(n.POLYGON_OFFSET_FILL)}function Kt(I){I?J(n.SCISSOR_TEST):pt(n.SCISSOR_TEST)}function Qe(I){I===void 0&&(I=n.TEXTURE0+$-1),ot!==I&&(n.activeTexture(I),ot=I)}function Ge(I,et,rt){rt===void 0&&(ot===null?rt=n.TEXTURE0+$-1:rt=ot);let dt=ft[rt];dt===void 0&&(dt={type:void 0,texture:void 0},ft[rt]=dt),(dt.type!==I||dt.texture!==et)&&(ot!==rt&&(n.activeTexture(rt),ot=rt),n.bindTexture(I,et||Y[I]),dt.type=I,dt.texture=et)}function M(){let I=ft[ot];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function y(){try{n.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function W(){try{n.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Z(){try{n.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function St(){try{n.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function it(){try{n.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xt(){try{n.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function vt(){try{n.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function tt(){try{n.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ct(I){Me.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Me.copy(I))}function Dt(I){Pe.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Pe.copy(I))}function bt(I,et){let rt=c.get(et);rt===void 0&&(rt=new WeakMap,c.set(et,rt));let dt=rt.get(I);dt===void 0&&(dt=n.getUniformBlockIndex(et,I.name),rt.set(I,dt))}function at(I,et){let dt=c.get(et).get(I);l.get(et)!==dt&&(n.uniformBlockBinding(et,dt,I.__bindingPointIndex),l.set(et,dt))}function Zt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ot=null,ft={},f={},h=new WeakMap,p=[],g=null,_=!1,m=null,d=null,A=null,w=null,S=null,E=null,C=null,L=new Jt(0,0,0),O=0,b=!1,v=null,D=null,z=null,G=null,q=null,Me.set(0,0,n.canvas.width,n.canvas.height),Pe.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:J,disable:pt,bindFramebuffer:Nt,drawBuffers:Mt,useProgram:le,setBlending:Le,setMaterial:Yt,setFlipSided:Pt,setCullFace:yt,setLineWidth:Fe,setPolygonOffset:_t,setScissorTest:Kt,activeTexture:Qe,bindTexture:Ge,unbindTexture:M,compressedTexImage2D:y,compressedTexImage3D:U,texImage2D:vt,texImage3D:tt,updateUBOMapping:bt,uniformBlockBinding:at,texStorage2D:it,texStorage3D:xt,texSubImage2D:W,texSubImage3D:Z,compressedTexSubImage2D:H,compressedTexSubImage3D:St,scissor:ct,viewport:Dt,reset:Zt}}function sT(n,t,e,i,r,s,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Vt,u=new WeakMap,f,h=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,y){return p?new OffscreenCanvas(M,y):Ya("canvas")}function _(M,y,U){let W=1,Z=Ge(M);if((Z.width>U||Z.height>U)&&(W=U/Math.max(Z.width,Z.height)),W<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){let H=Math.floor(W*Z.width),St=Math.floor(W*Z.height);f===void 0&&(f=g(H,St));let it=y?g(H,St):f;return it.width=H,it.height=St,it.getContext("2d").drawImage(M,0,0,H,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+H+"x"+St+")."),it}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),M;return M}function m(M){return M.generateMipmaps}function d(M){n.generateMipmap(M)}function A(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(M,y,U,W,Z=!1){if(M!==null){if(n[M]!==void 0)return n[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let H=y;if(y===n.RED&&(U===n.FLOAT&&(H=n.R32F),U===n.HALF_FLOAT&&(H=n.R16F),U===n.UNSIGNED_BYTE&&(H=n.R8)),y===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(H=n.R8UI),U===n.UNSIGNED_SHORT&&(H=n.R16UI),U===n.UNSIGNED_INT&&(H=n.R32UI),U===n.BYTE&&(H=n.R8I),U===n.SHORT&&(H=n.R16I),U===n.INT&&(H=n.R32I)),y===n.RG&&(U===n.FLOAT&&(H=n.RG32F),U===n.HALF_FLOAT&&(H=n.RG16F),U===n.UNSIGNED_BYTE&&(H=n.RG8)),y===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(H=n.RG8UI),U===n.UNSIGNED_SHORT&&(H=n.RG16UI),U===n.UNSIGNED_INT&&(H=n.RG32UI),U===n.BYTE&&(H=n.RG8I),U===n.SHORT&&(H=n.RG16I),U===n.INT&&(H=n.RG32I)),y===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(H=n.RGB8UI),U===n.UNSIGNED_SHORT&&(H=n.RGB16UI),U===n.UNSIGNED_INT&&(H=n.RGB32UI),U===n.BYTE&&(H=n.RGB8I),U===n.SHORT&&(H=n.RGB16I),U===n.INT&&(H=n.RGB32I)),y===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(H=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(H=n.RGBA16UI),U===n.UNSIGNED_INT&&(H=n.RGBA32UI),U===n.BYTE&&(H=n.RGBA8I),U===n.SHORT&&(H=n.RGBA16I),U===n.INT&&(H=n.RGBA32I)),y===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(H=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(H=n.R11F_G11F_B10F)),y===n.RGBA){let St=Z?Xa:ue.getTransfer(W);U===n.FLOAT&&(H=n.RGBA32F),U===n.HALF_FLOAT&&(H=n.RGBA16F),U===n.UNSIGNED_BYTE&&(H=St===me?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(H=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(H=n.RGB5_A1)}return(H===n.R16F||H===n.R32F||H===n.RG16F||H===n.RG32F||H===n.RGBA16F||H===n.RGBA32F)&&t.get("EXT_color_buffer_float"),H}function S(M,y){let U;return M?y===null||y===fs||y===Ko?U=n.DEPTH24_STENCIL8:y===Qi?U=n.DEPTH32F_STENCIL8:y===Zo&&(U=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===fs||y===Ko?U=n.DEPTH_COMPONENT24:y===Qi?U=n.DEPTH_COMPONENT32F:y===Zo&&(U=n.DEPTH_COMPONENT16),U}function E(M,y){return m(M)===!0||M.isFramebufferTexture&&M.minFilter!==oi&&M.minFilter!==Ai?Math.log2(Math.max(y.width,y.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?y.mipmaps.length:1}function C(M){let y=M.target;y.removeEventListener("dispose",C),O(y),y.isVideoTexture&&u.delete(y)}function L(M){let y=M.target;y.removeEventListener("dispose",L),v(y)}function O(M){let y=i.get(M);if(y.__webglInit===void 0)return;let U=M.source,W=h.get(U);if(W){let Z=W[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(M),Object.keys(W).length===0&&h.delete(U)}i.remove(M)}function b(M){let y=i.get(M);n.deleteTexture(y.__webglTexture);let U=M.source,W=h.get(U);delete W[y.__cacheKey],o.memory.textures--}function v(M){let y=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(y.__webglFramebuffer[W]))for(let Z=0;Z<y.__webglFramebuffer[W].length;Z++)n.deleteFramebuffer(y.__webglFramebuffer[W][Z]);else n.deleteFramebuffer(y.__webglFramebuffer[W]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[W])}else{if(Array.isArray(y.__webglFramebuffer))for(let W=0;W<y.__webglFramebuffer.length;W++)n.deleteFramebuffer(y.__webglFramebuffer[W]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let W=0;W<y.__webglColorRenderbuffer.length;W++)y.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[W]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let U=M.textures;for(let W=0,Z=U.length;W<Z;W++){let H=i.get(U[W]);H.__webglTexture&&(n.deleteTexture(H.__webglTexture),o.memory.textures--),i.remove(U[W])}i.remove(M)}let D=0;function z(){D=0}function G(){let M=D;return M>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),D+=1,M}function q(M){let y=[];return y.push(M.wrapS),y.push(M.wrapT),y.push(M.wrapR||0),y.push(M.magFilter),y.push(M.minFilter),y.push(M.anisotropy),y.push(M.internalFormat),y.push(M.format),y.push(M.type),y.push(M.generateMipmaps),y.push(M.premultiplyAlpha),y.push(M.flipY),y.push(M.unpackAlignment),y.push(M.colorSpace),y.join()}function $(M,y){let U=i.get(M);if(M.isVideoTexture&&Kt(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&U.__version!==M.version){let W=M.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(U,M,y);return}}else M.isExternalTexture&&(U.__webglTexture=M.sourceTexture?M.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+y)}function X(M,y){let U=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){Y(U,M,y);return}e.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+y)}function nt(M,y){let U=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){Y(U,M,y);return}e.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+y)}function V(M,y){let U=i.get(M);if(M.version>0&&U.__version!==M.version){J(U,M,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+y)}let ot={[Kc]:n.REPEAT,[ns]:n.CLAMP_TO_EDGE,[Qc]:n.MIRRORED_REPEAT},ft={[oi]:n.NEAREST,[fy]:n.NEAREST_MIPMAP_NEAREST,[ml]:n.NEAREST_MIPMAP_LINEAR,[Ai]:n.LINEAR,[Ru]:n.LINEAR_MIPMAP_NEAREST,[us]:n.LINEAR_MIPMAP_LINEAR},wt={[my]:n.NEVER,[by]:n.ALWAYS,[gy]:n.LESS,[cp]:n.LEQUAL,[yy]:n.EQUAL,[vy]:n.GEQUAL,[_y]:n.GREATER,[xy]:n.NOTEQUAL};function oe(M,y){if(y.type===Qi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Ai||y.magFilter===Ru||y.magFilter===ml||y.magFilter===us||y.minFilter===Ai||y.minFilter===Ru||y.minFilter===ml||y.minFilter===us)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,ot[y.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,ot[y.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,ot[y.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,ft[y.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,ft[y.minFilter]),y.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,wt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===oi||y.minFilter!==ml&&y.minFilter!==us||y.type===Qi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");n.texParameterf(M,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Me(M,y){let U=!1;M.__webglInit===void 0&&(M.__webglInit=!0,y.addEventListener("dispose",C));let W=y.source,Z=h.get(W);Z===void 0&&(Z={},h.set(W,Z));let H=q(y);if(H!==M.__cacheKey){Z[H]===void 0&&(Z[H]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),Z[H].usedTimes++;let St=Z[M.__cacheKey];St!==void 0&&(Z[M.__cacheKey].usedTimes--,St.usedTimes===0&&b(y)),M.__cacheKey=H,M.__webglTexture=Z[H].texture}return U}function Pe(M,y,U){return Math.floor(Math.floor(M/U)/y)}function de(M,y,U,W){let H=M.updateRanges;if(H.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,U,W,y.data);else{H.sort((tt,ct)=>tt.start-ct.start);let St=0;for(let tt=1;tt<H.length;tt++){let ct=H[St],Dt=H[tt],bt=ct.start+ct.count,at=Pe(Dt.start,y.width,4),Zt=Pe(ct.start,y.width,4);Dt.start<=bt+1&&at===Zt&&Pe(Dt.start+Dt.count-1,y.width,4)===at?ct.count=Math.max(ct.count,Dt.start+Dt.count-ct.start):(++St,H[St]=Dt)}H.length=St+1;let it=n.getParameter(n.UNPACK_ROW_LENGTH),xt=n.getParameter(n.UNPACK_SKIP_PIXELS),vt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let tt=0,ct=H.length;tt<ct;tt++){let Dt=H[tt],bt=Math.floor(Dt.start/4),at=Math.ceil(Dt.count/4),Zt=bt%y.width,I=Math.floor(bt/y.width),et=at,rt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Zt),n.pixelStorei(n.UNPACK_SKIP_ROWS,I),e.texSubImage2D(n.TEXTURE_2D,0,Zt,I,et,rt,U,W,y.data)}M.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,it),n.pixelStorei(n.UNPACK_SKIP_PIXELS,xt),n.pixelStorei(n.UNPACK_SKIP_ROWS,vt)}}function Y(M,y,U){let W=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(W=n.TEXTURE_3D);let Z=Me(M,y),H=y.source;e.bindTexture(W,M.__webglTexture,n.TEXTURE0+U);let St=i.get(H);if(H.version!==St.__version||Z===!0){e.activeTexture(n.TEXTURE0+U);let it=ue.getPrimaries(ue.workingColorSpace),xt=y.colorSpace===Mr?null:ue.getPrimaries(y.colorSpace),vt=y.colorSpace===Mr||it===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let tt=_(y.image,!1,r.maxTextureSize);tt=Qe(y,tt);let ct=s.convert(y.format,y.colorSpace),Dt=s.convert(y.type),bt=w(y.internalFormat,ct,Dt,y.colorSpace,y.isVideoTexture);oe(W,y);let at,Zt=y.mipmaps,I=y.isVideoTexture!==!0,et=St.__version===void 0||Z===!0,rt=H.dataReady,dt=E(y,tt);if(y.isDepthTexture)bt=S(y.format===Qo,y.type),et&&(I?e.texStorage2D(n.TEXTURE_2D,1,bt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,bt,tt.width,tt.height,0,ct,Dt,null));else if(y.isDataTexture)if(Zt.length>0){I&&et&&e.texStorage2D(n.TEXTURE_2D,dt,bt,Zt[0].width,Zt[0].height);for(let K=0,j=Zt.length;K<j;K++)at=Zt[K],I?rt&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,at.width,at.height,ct,Dt,at.data):e.texImage2D(n.TEXTURE_2D,K,bt,at.width,at.height,0,ct,Dt,at.data);y.generateMipmaps=!1}else I?(et&&e.texStorage2D(n.TEXTURE_2D,dt,bt,tt.width,tt.height),rt&&de(y,tt,ct,Dt)):e.texImage2D(n.TEXTURE_2D,0,bt,tt.width,tt.height,0,ct,Dt,tt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){I&&et&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,bt,Zt[0].width,Zt[0].height,tt.depth);for(let K=0,j=Zt.length;K<j;K++)if(at=Zt[K],y.format!==ui)if(ct!==null)if(I){if(rt)if(y.layerUpdates.size>0){let gt=yp(at.width,at.height,y.format,y.type);for(let Wt of y.layerUpdates){let we=at.data.subarray(Wt*gt/at.data.BYTES_PER_ELEMENT,(Wt+1)*gt/at.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,Wt,at.width,at.height,1,ct,we)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,at.width,at.height,tt.depth,ct,at.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,bt,at.width,at.height,tt.depth,0,at.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?rt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,at.width,at.height,tt.depth,ct,Dt,at.data):e.texImage3D(n.TEXTURE_2D_ARRAY,K,bt,at.width,at.height,tt.depth,0,ct,Dt,at.data)}else{I&&et&&e.texStorage2D(n.TEXTURE_2D,dt,bt,Zt[0].width,Zt[0].height);for(let K=0,j=Zt.length;K<j;K++)at=Zt[K],y.format!==ui?ct!==null?I?rt&&e.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,at.width,at.height,ct,at.data):e.compressedTexImage2D(n.TEXTURE_2D,K,bt,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?rt&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,at.width,at.height,ct,Dt,at.data):e.texImage2D(n.TEXTURE_2D,K,bt,at.width,at.height,0,ct,Dt,at.data)}else if(y.isDataArrayTexture)if(I){if(et&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,bt,tt.width,tt.height,tt.depth),rt)if(y.layerUpdates.size>0){let K=yp(tt.width,tt.height,y.format,y.type);for(let j of y.layerUpdates){let gt=tt.data.subarray(j*K/tt.data.BYTES_PER_ELEMENT,(j+1)*K/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,tt.width,tt.height,1,ct,Dt,gt)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ct,Dt,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,bt,tt.width,tt.height,tt.depth,0,ct,Dt,tt.data);else if(y.isData3DTexture)I?(et&&e.texStorage3D(n.TEXTURE_3D,dt,bt,tt.width,tt.height,tt.depth),rt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ct,Dt,tt.data)):e.texImage3D(n.TEXTURE_3D,0,bt,tt.width,tt.height,tt.depth,0,ct,Dt,tt.data);else if(y.isFramebufferTexture){if(et)if(I)e.texStorage2D(n.TEXTURE_2D,dt,bt,tt.width,tt.height);else{let K=tt.width,j=tt.height;for(let gt=0;gt<dt;gt++)e.texImage2D(n.TEXTURE_2D,gt,bt,K,j,0,ct,Dt,null),K>>=1,j>>=1}}else if(Zt.length>0){if(I&&et){let K=Ge(Zt[0]);e.texStorage2D(n.TEXTURE_2D,dt,bt,K.width,K.height)}for(let K=0,j=Zt.length;K<j;K++)at=Zt[K],I?rt&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,ct,Dt,at):e.texImage2D(n.TEXTURE_2D,K,bt,ct,Dt,at);y.generateMipmaps=!1}else if(I){if(et){let K=Ge(tt);e.texStorage2D(n.TEXTURE_2D,dt,bt,K.width,K.height)}rt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct,Dt,tt)}else e.texImage2D(n.TEXTURE_2D,0,bt,ct,Dt,tt);m(y)&&d(W),St.__version=H.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function J(M,y,U){if(y.image.length!==6)return;let W=Me(M,y),Z=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+U);let H=i.get(Z);if(Z.version!==H.__version||W===!0){e.activeTexture(n.TEXTURE0+U);let St=ue.getPrimaries(ue.workingColorSpace),it=y.colorSpace===Mr?null:ue.getPrimaries(y.colorSpace),xt=y.colorSpace===Mr||St===it?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let vt=y.isCompressedTexture||y.image[0].isCompressedTexture,tt=y.image[0]&&y.image[0].isDataTexture,ct=[];for(let j=0;j<6;j++)!vt&&!tt?ct[j]=_(y.image[j],!0,r.maxCubemapSize):ct[j]=tt?y.image[j].image:y.image[j],ct[j]=Qe(y,ct[j]);let Dt=ct[0],bt=s.convert(y.format,y.colorSpace),at=s.convert(y.type),Zt=w(y.internalFormat,bt,at,y.colorSpace),I=y.isVideoTexture!==!0,et=H.__version===void 0||W===!0,rt=Z.dataReady,dt=E(y,Dt);oe(n.TEXTURE_CUBE_MAP,y);let K;if(vt){I&&et&&e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Zt,Dt.width,Dt.height);for(let j=0;j<6;j++){K=ct[j].mipmaps;for(let gt=0;gt<K.length;gt++){let Wt=K[gt];y.format!==ui?bt!==null?I?rt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,0,0,Wt.width,Wt.height,bt,Wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,Zt,Wt.width,Wt.height,0,Wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,0,0,Wt.width,Wt.height,bt,at,Wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt,Zt,Wt.width,Wt.height,0,bt,at,Wt.data)}}}else{if(K=y.mipmaps,I&&et){K.length>0&&dt++;let j=Ge(ct[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Zt,j.width,j.height)}for(let j=0;j<6;j++)if(tt){I?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ct[j].width,ct[j].height,bt,at,ct[j].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Zt,ct[j].width,ct[j].height,0,bt,at,ct[j].data);for(let gt=0;gt<K.length;gt++){let we=K[gt].image[j].image;I?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,0,0,we.width,we.height,bt,at,we.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,Zt,we.width,we.height,0,bt,at,we.data)}}else{I?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,bt,at,ct[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Zt,bt,at,ct[j]);for(let gt=0;gt<K.length;gt++){let Wt=K[gt];I?rt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,0,0,bt,at,Wt.image[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,gt+1,Zt,bt,at,Wt.image[j])}}}m(y)&&d(n.TEXTURE_CUBE_MAP),H.__version=Z.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function pt(M,y,U,W,Z,H){let St=s.convert(U.format,U.colorSpace),it=s.convert(U.type),xt=w(U.internalFormat,St,it,U.colorSpace),vt=i.get(y),tt=i.get(U);if(tt.__renderTarget=y,!vt.__hasExternalTextures){let ct=Math.max(1,y.width>>H),Dt=Math.max(1,y.height>>H);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?e.texImage3D(Z,H,xt,ct,Dt,y.depth,0,St,it,null):e.texImage2D(Z,H,xt,ct,Dt,0,St,it,null)}e.bindFramebuffer(n.FRAMEBUFFER,M),_t(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,Z,tt.__webglTexture,0,Fe(y)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,Z,tt.__webglTexture,H),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Nt(M,y,U){if(n.bindRenderbuffer(n.RENDERBUFFER,M),y.depthBuffer){let W=y.depthTexture,Z=W&&W.isDepthTexture?W.type:null,H=S(y.stencilBuffer,Z),St=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=Fe(y);_t(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,it,H,y.width,y.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,it,H,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,H,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,St,n.RENDERBUFFER,M)}else{let W=y.textures;for(let Z=0;Z<W.length;Z++){let H=W[Z],St=s.convert(H.format,H.colorSpace),it=s.convert(H.type),xt=w(H.internalFormat,St,it,H.colorSpace),vt=Fe(y);U&&_t(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,vt,xt,y.width,y.height):_t(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,vt,xt,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,xt,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Mt(M,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,M),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=i.get(y.depthTexture);W.__renderTarget=y,(!W.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),$(y.depthTexture,0);let Z=W.__webglTexture,H=Fe(y);if(y.depthTexture.format===zo)_t(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(y.depthTexture.format===Qo)_t(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function le(M){let y=i.get(M),U=M.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==M.depthTexture){let W=M.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),W){let Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,W.removeEventListener("dispose",Z)};W.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=W}if(M.depthTexture&&!y.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");let W=M.texture.mipmaps;W&&W.length>0?Mt(y.__webglFramebuffer[0],M):Mt(y.__webglFramebuffer,M)}else if(U){y.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[W]),y.__webglDepthbuffer[W]===void 0)y.__webglDepthbuffer[W]=n.createRenderbuffer(),Nt(y.__webglDepthbuffer[W],M,!1);else{let Z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=y.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,H)}}else{let W=M.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),Nt(y.__webglDepthbuffer,M,!1);else{let Z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,H)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function pn(M,y,U){let W=i.get(M);y!==void 0&&pt(W.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&le(M)}function T(M){let y=M.texture,U=i.get(M),W=i.get(y);M.addEventListener("dispose",L);let Z=M.textures,H=M.isWebGLCubeRenderTarget===!0,St=Z.length>1;if(St||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=y.version,o.memory.textures++),H){U.__webglFramebuffer=[];for(let it=0;it<6;it++)if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer[it]=[];for(let xt=0;xt<y.mipmaps.length;xt++)U.__webglFramebuffer[it][xt]=n.createFramebuffer()}else U.__webglFramebuffer[it]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer=[];for(let it=0;it<y.mipmaps.length;it++)U.__webglFramebuffer[it]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(St)for(let it=0,xt=Z.length;it<xt;it++){let vt=i.get(Z[it]);vt.__webglTexture===void 0&&(vt.__webglTexture=n.createTexture(),o.memory.textures++)}if(M.samples>0&&_t(M)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let it=0;it<Z.length;it++){let xt=Z[it];U.__webglColorRenderbuffer[it]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[it]);let vt=s.convert(xt.format,xt.colorSpace),tt=s.convert(xt.type),ct=w(xt.internalFormat,vt,tt,xt.colorSpace,M.isXRRenderTarget===!0),Dt=Fe(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,Dt,ct,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.RENDERBUFFER,U.__webglColorRenderbuffer[it])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Nt(U.__webglDepthRenderbuffer,M,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(H){e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),oe(n.TEXTURE_CUBE_MAP,y);for(let it=0;it<6;it++)if(y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)pt(U.__webglFramebuffer[it][xt],M,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,xt);else pt(U.__webglFramebuffer[it],M,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(y)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let it=0,xt=Z.length;it<xt;it++){let vt=Z[it],tt=i.get(vt),ct=n.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(ct=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,tt.__webglTexture),oe(ct,vt),pt(U.__webglFramebuffer,M,vt,n.COLOR_ATTACHMENT0+it,ct,0),m(vt)&&d(ct)}e.unbindTexture()}else{let it=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(it=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(it,W.__webglTexture),oe(it,y),y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)pt(U.__webglFramebuffer[xt],M,y,n.COLOR_ATTACHMENT0,it,xt);else pt(U.__webglFramebuffer,M,y,n.COLOR_ATTACHMENT0,it,0);m(y)&&d(it),e.unbindTexture()}M.depthBuffer&&le(M)}function Le(M){let y=M.textures;for(let U=0,W=y.length;U<W;U++){let Z=y[U];if(m(Z)){let H=A(M),St=i.get(Z).__webglTexture;e.bindTexture(H,St),d(H),e.unbindTexture()}}}let Yt=[],Pt=[];function yt(M){if(M.samples>0){if(_t(M)===!1){let y=M.textures,U=M.width,W=M.height,Z=n.COLOR_BUFFER_BIT,H=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,St=i.get(M),it=y.length>1;if(it)for(let vt=0;vt<y.length;vt++)e.bindFramebuffer(n.FRAMEBUFFER,St.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,St.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);let xt=M.texture.mipmaps;xt&&xt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let vt=0;vt<y.length;vt++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),it){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,St.__webglColorRenderbuffer[vt]);let tt=i.get(y[vt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,tt,0)}n.blitFramebuffer(0,0,U,W,0,0,U,W,Z,n.NEAREST),l===!0&&(Yt.length=0,Pt.length=0,Yt.push(n.COLOR_ATTACHMENT0+vt),M.depthBuffer&&M.resolveDepthBuffer===!1&&(Yt.push(H),Pt.push(H),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Pt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Yt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),it)for(let vt=0;vt<y.length;vt++){e.bindFramebuffer(n.FRAMEBUFFER,St.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.RENDERBUFFER,St.__webglColorRenderbuffer[vt]);let tt=i.get(y[vt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,St.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.TEXTURE_2D,tt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){let y=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function Fe(M){return Math.min(r.maxSamples,M.samples)}function _t(M){let y=i.get(M);return M.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Kt(M){let y=o.render.frame;u.get(M)!==y&&(u.set(M,y),M.update())}function Qe(M,y){let U=M.colorSpace,W=M.format,Z=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||U!==Vs&&U!==Mr&&(ue.getTransfer(U)===me?(W!==ui||Z!==Ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),y}function Ge(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=z,this.setTexture2D=$,this.setTexture2DArray=X,this.setTexture3D=nt,this.setTextureCube=V,this.rebindTextures=pn,this.setupRenderTarget=T,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=_t}function oT(n,t){function e(i,r=Mr){let s,o=ue.getTransfer(r);if(i===Ii)return n.UNSIGNED_BYTE;if(i===Pu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Lu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===np)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ip)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===tp)return n.BYTE;if(i===ep)return n.SHORT;if(i===Zo)return n.UNSIGNED_SHORT;if(i===Du)return n.INT;if(i===fs)return n.UNSIGNED_INT;if(i===Qi)return n.FLOAT;if(i===Jo)return n.HALF_FLOAT;if(i===rp)return n.ALPHA;if(i===sp)return n.RGB;if(i===ui)return n.RGBA;if(i===zo)return n.DEPTH_COMPONENT;if(i===Qo)return n.DEPTH_STENCIL;if(i===op)return n.RED;if(i===Fu)return n.RED_INTEGER;if(i===ap)return n.RG;if(i===Bu)return n.RG_INTEGER;if(i===Uu)return n.RGBA_INTEGER;if(i===gl||i===yl||i===_l||i===xl)if(o===me)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===gl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===_l)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===xl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===gl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===_l)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===xl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ou||i===Nu||i===ku||i===zu)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ou)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Nu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ku)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===zu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Vu||i===Hu||i===Gu)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Vu||i===Hu)return o===me?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Gu)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Wu||i===Xu||i===qu||i===Yu||i===ju||i===$u||i===Zu||i===Ju||i===Ku||i===Qu||i===tf||i===ef||i===nf||i===rf)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Wu)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xu)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===qu)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yu)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ju)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===$u)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Zu)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ju)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ku)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qu)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===tf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ef)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===nf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===rf)return o===me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sf||i===of||i===af)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===sf)return o===me?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===of)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===af)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===lf||i===cf||i===uf||i===ff)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===lf)return s.COMPRESSED_RED_RGTC1_EXT;if(i===cf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===uf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ff)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ko?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var aT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lT=`
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

}`,Rp=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new rl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Ci({vertexShader:aT,fragmentShader:lT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Rn(new sl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Dp=class extends $i{constructor(t,e){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,g=null,_=typeof XRWebGLBinding<"u",m=new Rp,d={},A=e.getContextAttributes(),w=null,S=null,E=[],C=[],L=new Vt,O=null,b=new yn;b.viewport=new Ne;let v=new yn;v.viewport=new Ne;let D=[b,v],z=new vu,G=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let J=E[Y];return J===void 0&&(J=new Xo,E[Y]=J),J.getTargetRaySpace()},this.getControllerGrip=function(Y){let J=E[Y];return J===void 0&&(J=new Xo,E[Y]=J),J.getGripSpace()},this.getHand=function(Y){let J=E[Y];return J===void 0&&(J=new Xo,E[Y]=J),J.getHandSpace()};function $(Y){let J=C.indexOf(Y.inputSource);if(J===-1)return;let pt=E[J];pt!==void 0&&(pt.update(Y.inputSource,Y.frame,c||o),pt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",nt);for(let Y=0;Y<E.length;Y++){let J=C[Y];J!==null&&(C[Y]=null,E[Y].disconnect(J))}G=null,q=null,m.reset();for(let Y in d)delete d[Y];t.setRenderTarget(w),p=null,h=null,f=null,r=null,S=null,de.stop(),i.isPresenting=!1,t.setPixelRatio(O),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,e)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(w=t.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",X),r.addEventListener("inputsourceschange",nt),A.xrCompatible!==!0&&await e.makeXRCompatible(),O=t.getPixelRatio(),t.getSize(L),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Nt=null,Mt=null;A.depth&&(Mt=A.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=A.stencil?Qo:zo,Nt=A.stencil?Ko:fs);let le={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(le),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Zi(h.textureWidth,h.textureHeight,{format:ui,type:Ii,depthTexture:new il(h.textureWidth,h.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:A.stencil,colorSpace:t.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let pt={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,pt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Zi(p.framebufferWidth,p.framebufferHeight,{format:ui,type:Ii,colorSpace:t.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),de.setContext(r),de.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(Y){for(let J=0;J<Y.removed.length;J++){let pt=Y.removed[J],Nt=C.indexOf(pt);Nt>=0&&(C[Nt]=null,E[Nt].disconnect(pt))}for(let J=0;J<Y.added.length;J++){let pt=Y.added[J],Nt=C.indexOf(pt);if(Nt===-1){for(let le=0;le<E.length;le++)if(le>=C.length){C.push(pt),Nt=le;break}else if(C[le]===null){C[le]=pt,Nt=le;break}if(Nt===-1)break}let Mt=E[Nt];Mt&&Mt.connect(pt)}}let V=new R,ot=new R;function ft(Y,J,pt){V.setFromMatrixPosition(J.matrixWorld),ot.setFromMatrixPosition(pt.matrixWorld);let Nt=V.distanceTo(ot),Mt=J.projectionMatrix.elements,le=pt.projectionMatrix.elements,pn=Mt[14]/(Mt[10]-1),T=Mt[14]/(Mt[10]+1),Le=(Mt[9]+1)/Mt[5],Yt=(Mt[9]-1)/Mt[5],Pt=(Mt[8]-1)/Mt[0],yt=(le[8]+1)/le[0],Fe=pn*Pt,_t=pn*yt,Kt=Nt/(-Pt+yt),Qe=Kt*-Pt;if(J.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Qe),Y.translateZ(Kt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Mt[10]===-1)Y.projectionMatrix.copy(J.projectionMatrix),Y.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let Ge=pn+Kt,M=T+Kt,y=Fe-Qe,U=_t+(Nt-Qe),W=Le*T/M*Ge,Z=Yt*T/M*Ge;Y.projectionMatrix.makePerspective(y,U,W,Z,Ge,M),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function wt(Y,J){J===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(J.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let J=Y.near,pt=Y.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(pt=m.depthFar)),z.near=v.near=b.near=J,z.far=v.far=b.far=pt,(G!==z.near||q!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),G=z.near,q=z.far),z.layers.mask=Y.layers.mask|6,b.layers.mask=z.layers.mask&3,v.layers.mask=z.layers.mask&5;let Nt=Y.parent,Mt=z.cameras;wt(z,Nt);for(let le=0;le<Mt.length;le++)wt(Mt[le],Nt);Mt.length===2?ft(z,b,v):z.projectionMatrix.copy(b.projectionMatrix),oe(Y,z,Nt)};function oe(Y,J,pt){pt===null?Y.matrix.copy(J.matrixWorld):(Y.matrix.copy(pt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(J.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(J.projectionMatrix),Y.projectionMatrixInverse.copy(J.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Vo*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(Y){return d[Y]};let Me=null;function Pe(Y,J){if(u=J.getViewerPose(c||o),g=J,u!==null){let pt=u.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let Nt=!1;pt.length!==z.cameras.length&&(z.cameras.length=0,Nt=!0);for(let T=0;T<pt.length;T++){let Le=pt[T],Yt=null;if(p!==null)Yt=p.getViewport(Le);else{let yt=f.getViewSubImage(h,Le);Yt=yt.viewport,T===0&&(t.setRenderTargetTextures(S,yt.colorTexture,yt.depthStencilTexture),t.setRenderTarget(S))}let Pt=D[T];Pt===void 0&&(Pt=new yn,Pt.layers.enable(T),Pt.viewport=new Ne,D[T]=Pt),Pt.matrix.fromArray(Le.transform.matrix),Pt.matrix.decompose(Pt.position,Pt.quaternion,Pt.scale),Pt.projectionMatrix.fromArray(Le.projectionMatrix),Pt.projectionMatrixInverse.copy(Pt.projectionMatrix).invert(),Pt.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),T===0&&(z.matrix.copy(Pt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Nt===!0&&z.cameras.push(Pt)}let Mt=r.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=i.getBinding();let T=f.getDepthInformation(pt[0]);T&&T.isValid&&T.texture&&m.init(T,r.renderState)}if(Mt&&Mt.includes("camera-access")&&_){t.state.unbindTexture(),f=i.getBinding();for(let T=0;T<pt.length;T++){let Le=pt[T].camera;if(Le){let Yt=d[Le];Yt||(Yt=new rl,d[Le]=Yt);let Pt=f.getCameraImage(Le);Yt.sourceTexture=Pt}}}}for(let pt=0;pt<E.length;pt++){let Nt=C[pt],Mt=E[pt];Nt!==null&&Mt!==void 0&&Mt.update(Nt,J,c||o)}Me&&Me(Y,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}let de=new Zy;de.setAnimationLoop(Pe),this.setAnimationLoop=function(Y){Me=Y},this.dispose=function(){}}},js=new Ei,cT=new Oe;function uT(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,pp(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,A,w,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,A,w):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===wn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===wn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let A=t.get(d),w=A.envMap,S=A.envMapRotation;w&&(m.envMap.value=w,js.copy(S),js.x*=-1,js.y*=-1,js.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(js.y*=-1,js.z*=-1),m.envMapRotation.value.setFromMatrix4(cT.makeRotationFromEuler(js)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,A,w){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*A,m.scale.value=w*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,A){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===wn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){let A=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function fT(n,t,e,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,w){let S=w.program;i.uniformBlockBinding(A,S)}function c(A,w){let S=r[A.id];S===void 0&&(g(A),S=u(A),r[A.id]=S,A.addEventListener("dispose",m));let E=w.program;i.updateUBOMapping(A,E);let C=t.render.frame;s[A.id]!==C&&(h(A),s[A.id]=C)}function u(A){let w=f();A.__bindingPointIndex=w;let S=n.createBuffer(),E=A.__size,C=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,E,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,S),S}function f(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(A){let w=r[A.id],S=A.uniforms,E=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let C=0,L=S.length;C<L;C++){let O=Array.isArray(S[C])?S[C]:[S[C]];for(let b=0,v=O.length;b<v;b++){let D=O[b];if(p(D,C,b,E)===!0){let z=D.__offset,G=Array.isArray(D.value)?D.value:[D.value],q=0;for(let $=0;$<G.length;$++){let X=G[$],nt=_(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,z+q,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,q),q+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,z,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(A,w,S,E){let C=A.value,L=w+"_"+S;if(E[L]===void 0)return typeof C=="number"||typeof C=="boolean"?E[L]=C:E[L]=C.clone(),!0;{let O=E[L];if(typeof C=="number"||typeof C=="boolean"){if(O!==C)return E[L]=C,!0}else if(O.equals(C)===!1)return O.copy(C),!0}return!1}function g(A){let w=A.uniforms,S=0,E=16;for(let L=0,O=w.length;L<O;L++){let b=Array.isArray(w[L])?w[L]:[w[L]];for(let v=0,D=b.length;v<D;v++){let z=b[v],G=Array.isArray(z.value)?z.value:[z.value];for(let q=0,$=G.length;q<$;q++){let X=G[q],nt=_(X),V=S%E,ot=V%nt.boundary,ft=V+ot;S+=ot,ft!==0&&E-ft<nt.storage&&(S+=E-ft),z.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=S,S+=nt.storage}}}let C=S%E;return C>0&&(S+=E-C),A.__size=S,A.__cache={},this}function _(A){let w={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(w.boundary=4,w.storage=4):A.isVector2?(w.boundary=8,w.storage=8):A.isVector3||A.isColor?(w.boundary=16,w.storage=12):A.isVector4?(w.boundary=16,w.storage=16):A.isMatrix3?(w.boundary=48,w.storage=48):A.isMatrix4?(w.boundary=64,w.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),w}function m(A){let w=A.target;w.removeEventListener("dispose",m);let S=o.indexOf(w.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function d(){for(let A in r)n.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}var gf=class{constructor(t={}){let{canvas:e=Sy(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,d=null,A=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Sr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,E=!1;this._outputColorSpace=Sn;let C=0,L=0,O=null,b=-1,v=null,D=new Ne,z=new Ne,G=null,q=new Jt(0),$=0,X=e.width,nt=e.height,V=1,ot=null,ft=null,wt=new Ne(0,0,X,nt),oe=new Ne(0,0,X,nt),Me=!1,Pe=new qo,de=!1,Y=!1,J=new Oe,pt=new R,Nt=new Ne,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},le=!1;function pn(){return O===null?V:1}let T=i;function Le(x,F){return e.getContext(x,F)}try{let x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",K,!1),T===null){let F="webgl2";if(T=Le(F,x),T===null)throw Le(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Yt,Pt,yt,Fe,_t,Kt,Qe,Ge,M,y,U,W,Z,H,St,it,xt,vt,tt,ct,Dt,bt,at,Zt;function I(){Yt=new IM(T),Yt.init(),bt=new oT(T,Yt),Pt=new SM(T,Yt,t,bt),yt=new rT(T,Yt),Pt.reversedDepthBuffer&&h&&yt.buffers.depth.setReversed(!0),Fe=new PM(T),_t=new Xw,Kt=new sT(T,Yt,yt,_t,Pt,bt,Fe),Qe=new wM(S),Ge=new CM(S),M=new Nv(T),at=new vM(T,M),y=new RM(T,M,Fe,at),U=new FM(T,y,M,Fe),tt=new LM(T,Pt,Kt),it=new MM(_t),W=new Ww(S,Qe,Ge,Yt,Pt,at,it),Z=new uT(S,_t),H=new Yw,St=new Qw(Yt),vt=new xM(S,Qe,Ge,yt,U,p,l),xt=new nT(S,U,Pt),Zt=new fT(T,Fe,Pt,yt),ct=new bM(T,Yt,Fe),Dt=new DM(T,Yt,Fe),Fe.programs=W.programs,S.capabilities=Pt,S.extensions=Yt,S.properties=_t,S.renderLists=H,S.shadowMap=xt,S.state=yt,S.info=Fe}I();let et=new Dp(S,T);this.xr=et,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let x=Yt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=Yt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(x){x!==void 0&&(V=x,this.setSize(X,nt,!1))},this.getSize=function(x){return x.set(X,nt)},this.setSize=function(x,F,N=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=x,nt=F,e.width=Math.floor(x*V),e.height=Math.floor(F*V),N===!0&&(e.style.width=x+"px",e.style.height=F+"px"),this.setViewport(0,0,x,F)},this.getDrawingBufferSize=function(x){return x.set(X*V,nt*V).floor()},this.setDrawingBufferSize=function(x,F,N){X=x,nt=F,V=N,e.width=Math.floor(x*N),e.height=Math.floor(F*N),this.setViewport(0,0,x,F)},this.getCurrentViewport=function(x){return x.copy(D)},this.getViewport=function(x){return x.copy(wt)},this.setViewport=function(x,F,N,k){x.isVector4?wt.set(x.x,x.y,x.z,x.w):wt.set(x,F,N,k),yt.viewport(D.copy(wt).multiplyScalar(V).round())},this.getScissor=function(x){return x.copy(oe)},this.setScissor=function(x,F,N,k){x.isVector4?oe.set(x.x,x.y,x.z,x.w):oe.set(x,F,N,k),yt.scissor(z.copy(oe).multiplyScalar(V).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(x){yt.setScissorTest(Me=x)},this.setOpaqueSort=function(x){ot=x},this.setTransparentSort=function(x){ft=x},this.getClearColor=function(x){return x.copy(vt.getClearColor())},this.setClearColor=function(){vt.setClearColor(...arguments)},this.getClearAlpha=function(){return vt.getClearAlpha()},this.setClearAlpha=function(){vt.setClearAlpha(...arguments)},this.clear=function(x=!0,F=!0,N=!0){let k=0;if(x){let B=!1;if(O!==null){let Q=O.texture.format;B=Q===Uu||Q===Bu||Q===Fu}if(B){let Q=O.texture.type,lt=Q===Ii||Q===fs||Q===Zo||Q===Ko||Q===Pu||Q===Lu,mt=vt.getClearColor(),ht=vt.getClearAlpha(),Rt=mt.r,Lt=mt.g,At=mt.b;lt?(g[0]=Rt,g[1]=Lt,g[2]=At,g[3]=ht,T.clearBufferuiv(T.COLOR,0,g)):(_[0]=Rt,_[1]=Lt,_[2]=At,_[3]=ht,T.clearBufferiv(T.COLOR,0,_))}else k|=T.COLOR_BUFFER_BIT}F&&(k|=T.DEPTH_BUFFER_BIT),N&&(k|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",K,!1),vt.dispose(),H.dispose(),St.dispose(),_t.dispose(),Qe.dispose(),Ge.dispose(),U.dispose(),at.dispose(),Zt.dispose(),W.dispose(),et.dispose(),et.removeEventListener("sessionstart",ji),et.removeEventListener("sessionend",ng),Ps.stop()};function rt(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let x=Fe.autoReset,F=xt.enabled,N=xt.autoUpdate,k=xt.needsUpdate,B=xt.type;I(),Fe.autoReset=x,xt.enabled=F,xt.autoUpdate=N,xt.needsUpdate=k,xt.type=B}function K(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function j(x){let F=x.target;F.removeEventListener("dispose",j),gt(F)}function gt(x){Wt(x),_t.remove(x)}function Wt(x){let F=_t.get(x).programs;F!==void 0&&(F.forEach(function(N){W.releaseProgram(N)}),x.isShaderMaterial&&W.releaseShaderCache(x))}this.renderBufferDirect=function(x,F,N,k,B,Q){F===null&&(F=Mt);let lt=B.isMesh&&B.matrixWorld.determinant()<0,mt=P0(x,F,N,k,B);yt.setMaterial(k,lt);let ht=N.index,Rt=1;if(k.wireframe===!0){if(ht=y.getWireframeAttribute(N),ht===void 0)return;Rt=2}let Lt=N.drawRange,At=N.attributes.position,ae=Lt.start*Rt,ve=(Lt.start+Lt.count)*Rt;Q!==null&&(ae=Math.max(ae,Q.start*Rt),ve=Math.min(ve,(Q.start+Q.count)*Rt)),ht!==null?(ae=Math.max(ae,0),ve=Math.min(ve,ht.count)):At!=null&&(ae=Math.max(ae,0),ve=Math.min(ve,At.count));let Ve=ve-ae;if(Ve<0||Ve===1/0)return;at.setup(B,k,mt,N,ht);let Ee,Se=ct;if(ht!==null&&(Ee=M.get(ht),Se=Dt,Se.setIndex(Ee)),B.isMesh)k.wireframe===!0?(yt.setLineWidth(k.wireframeLinewidth*pn()),Se.setMode(T.LINES)):Se.setMode(T.TRIANGLES);else if(B.isLine){let Ct=k.linewidth;Ct===void 0&&(Ct=1),yt.setLineWidth(Ct*pn()),B.isLineSegments?Se.setMode(T.LINES):B.isLineLoop?Se.setMode(T.LINE_LOOP):Se.setMode(T.LINE_STRIP)}else B.isPoints?Se.setMode(T.POINTS):B.isSprite&&Se.setMode(T.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Ho("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Se.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))Se.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Ct=B._multiDrawStarts,Be=B._multiDrawCounts,fe=B._multiDrawCount,kn=ht?M.get(ht).bytesPerElement:1,Mo=_t.get(k).currentProgram.getUniforms();for(let zn=0;zn<fe;zn++)Mo.setValue(T,"_gl_DrawID",zn),Se.render(Ct[zn]/kn,Be[zn])}else if(B.isInstancedMesh)Se.renderInstances(ae,Ve,B.count);else if(N.isInstancedBufferGeometry){let Ct=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,Be=Math.min(N.instanceCount,Ct);Se.renderInstances(ae,Ve,Be)}else Se.render(ae,Ve)};function we(x,F,N){x.transparent===!0&&x.side===ci&&x.forceSinglePass===!1?(x.side=wn,x.needsUpdate=!0,Ac(x,F,N),x.side=vr,x.needsUpdate=!0,Ac(x,F,N),x.side=ci):Ac(x,F,N)}this.compile=function(x,F,N=null){N===null&&(N=x),d=St.get(N),d.init(F),w.push(d),N.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(d.pushLight(B),B.castShadow&&d.pushShadow(B))}),x!==N&&x.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(d.pushLight(B),B.castShadow&&d.pushShadow(B))}),d.setupLights();let k=new Set;return x.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let Q=B.material;if(Q)if(Array.isArray(Q))for(let lt=0;lt<Q.length;lt++){let mt=Q[lt];we(mt,N,B),k.add(mt)}else we(Q,N,B),k.add(Q)}),d=w.pop(),k},this.compileAsync=function(x,F,N=null){let k=this.compile(x,F,N);return new Promise(B=>{function Q(){if(k.forEach(function(lt){_t.get(lt).currentProgram.isReady()&&k.delete(lt)}),k.size===0){B(x);return}setTimeout(Q,10)}Yt.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let pe=null;function hr(x){pe&&pe(x)}function ji(){Ps.stop()}function ng(){Ps.start()}let Ps=new Zy;Ps.setAnimationLoop(hr),typeof self<"u"&&Ps.setContext(self),this.setAnimationLoop=function(x){pe=x,et.setAnimationLoop(x),x===null?Ps.stop():Ps.start()},et.addEventListener("sessionstart",ji),et.addEventListener("sessionend",ng),this.render=function(x,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(F),F=et.getCamera()),x.isScene===!0&&x.onBeforeRender(S,x,F,O),d=St.get(x,w.length),d.init(F),w.push(d),J.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Pe.setFromProjectionMatrix(J,Ti,F.reversedDepth),Y=this.localClippingEnabled,de=it.init(this.clippingPlanes,Y),m=H.get(x,A.length),m.init(),A.push(m),et.enabled===!0&&et.isPresenting===!0){let Q=S.xr.getDepthSensingMesh();Q!==null&&hd(Q,F,-1/0,S.sortObjects)}hd(x,F,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(ot,ft),le=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,le&&vt.addToRenderList(m,x),this.info.render.frame++,de===!0&&it.beginShadows();let N=d.state.shadowsArray;xt.render(N,x,F),de===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let k=m.opaque,B=m.transmissive;if(d.setupLights(),F.isArrayCamera){let Q=F.cameras;if(B.length>0)for(let lt=0,mt=Q.length;lt<mt;lt++){let ht=Q[lt];rg(k,B,x,ht)}le&&vt.render(x);for(let lt=0,mt=Q.length;lt<mt;lt++){let ht=Q[lt];ig(m,x,ht,ht.viewport)}}else B.length>0&&rg(k,B,x,F),le&&vt.render(x),ig(m,x,F);O!==null&&L===0&&(Kt.updateMultisampleRenderTarget(O),Kt.updateRenderTargetMipmap(O)),x.isScene===!0&&x.onAfterRender(S,x,F),at.resetDefaultState(),b=-1,v=null,w.pop(),w.length>0?(d=w[w.length-1],de===!0&&it.setGlobalState(S.clippingPlanes,d.state.camera)):d=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function hd(x,F,N,k){if(x.visible===!1)return;if(x.layers.test(F.layers)){if(x.isGroup)N=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(F);else if(x.isLight)d.pushLight(x),x.castShadow&&d.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Pe.intersectsSprite(x)){k&&Nt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(J);let lt=U.update(x),mt=x.material;mt.visible&&m.push(x,lt,mt,N,Nt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Pe.intersectsObject(x))){let lt=U.update(x),mt=x.material;if(k&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Nt.copy(x.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Nt.copy(lt.boundingSphere.center)),Nt.applyMatrix4(x.matrixWorld).applyMatrix4(J)),Array.isArray(mt)){let ht=lt.groups;for(let Rt=0,Lt=ht.length;Rt<Lt;Rt++){let At=ht[Rt],ae=mt[At.materialIndex];ae&&ae.visible&&m.push(x,lt,ae,N,Nt.z,At)}}else mt.visible&&m.push(x,lt,mt,N,Nt.z,null)}}let Q=x.children;for(let lt=0,mt=Q.length;lt<mt;lt++)hd(Q[lt],F,N,k)}function ig(x,F,N,k){let B=x.opaque,Q=x.transmissive,lt=x.transparent;d.setupLightsView(N),de===!0&&it.setGlobalState(S.clippingPlanes,N),k&&yt.viewport(D.copy(k)),B.length>0&&Tc(B,F,N),Q.length>0&&Tc(Q,F,N),lt.length>0&&Tc(lt,F,N),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function rg(x,F,N,k){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[k.id]===void 0&&(d.state.transmissionRenderTarget[k.id]=new Zi(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?Jo:Ii,minFilter:us,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ue.workingColorSpace}));let Q=d.state.transmissionRenderTarget[k.id],lt=k.viewport||D;Q.setSize(lt.z*S.transmissionResolutionScale,lt.w*S.transmissionResolutionScale);let mt=S.getRenderTarget(),ht=S.getActiveCubeFace(),Rt=S.getActiveMipmapLevel();S.setRenderTarget(Q),S.getClearColor(q),$=S.getClearAlpha(),$<1&&S.setClearColor(16777215,.5),S.clear(),le&&vt.render(N);let Lt=S.toneMapping;S.toneMapping=Sr;let At=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),d.setupLightsView(k),de===!0&&it.setGlobalState(S.clippingPlanes,k),Tc(x,N,k),Kt.updateMultisampleRenderTarget(Q),Kt.updateRenderTargetMipmap(Q),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let ae=!1;for(let ve=0,Ve=F.length;ve<Ve;ve++){let Ee=F[ve],Se=Ee.object,Ct=Ee.geometry,Be=Ee.material,fe=Ee.group;if(Be.side===ci&&Se.layers.test(k.layers)){let kn=Be.side;Be.side=wn,Be.needsUpdate=!0,sg(Se,N,k,Ct,Be,fe),Be.side=kn,Be.needsUpdate=!0,ae=!0}}ae===!0&&(Kt.updateMultisampleRenderTarget(Q),Kt.updateRenderTargetMipmap(Q))}S.setRenderTarget(mt,ht,Rt),S.setClearColor(q,$),At!==void 0&&(k.viewport=At),S.toneMapping=Lt}function Tc(x,F,N){let k=F.isScene===!0?F.overrideMaterial:null;for(let B=0,Q=x.length;B<Q;B++){let lt=x[B],mt=lt.object,ht=lt.geometry,Rt=lt.group,Lt=lt.material;Lt.allowOverride===!0&&k!==null&&(Lt=k),mt.layers.test(N.layers)&&sg(mt,F,N,ht,Lt,Rt)}}function sg(x,F,N,k,B,Q){x.onBeforeRender(S,F,N,k,B,Q),x.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),B.onBeforeRender(S,F,N,k,x,Q),B.transparent===!0&&B.side===ci&&B.forceSinglePass===!1?(B.side=wn,B.needsUpdate=!0,S.renderBufferDirect(N,F,k,B,x,Q),B.side=vr,B.needsUpdate=!0,S.renderBufferDirect(N,F,k,B,x,Q),B.side=ci):S.renderBufferDirect(N,F,k,B,x,Q),x.onAfterRender(S,F,N,k,B,Q)}function Ac(x,F,N){F.isScene!==!0&&(F=Mt);let k=_t.get(x),B=d.state.lights,Q=d.state.shadowsArray,lt=B.state.version,mt=W.getParameters(x,B.state,Q,F,N),ht=W.getProgramCacheKey(mt),Rt=k.programs;k.environment=x.isMeshStandardMaterial?F.environment:null,k.fog=F.fog,k.envMap=(x.isMeshStandardMaterial?Ge:Qe).get(x.envMap||k.environment),k.envMapRotation=k.environment!==null&&x.envMap===null?F.environmentRotation:x.envMapRotation,Rt===void 0&&(x.addEventListener("dispose",j),Rt=new Map,k.programs=Rt);let Lt=Rt.get(ht);if(Lt!==void 0){if(k.currentProgram===Lt&&k.lightsStateVersion===lt)return ag(x,mt),Lt}else mt.uniforms=W.getUniforms(x),x.onBeforeCompile(mt,S),Lt=W.acquireProgram(mt,ht),Rt.set(ht,Lt),k.uniforms=mt.uniforms;let At=k.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(At.clippingPlanes=it.uniform),ag(x,mt),k.needsLights=F0(x),k.lightsStateVersion=lt,k.needsLights&&(At.ambientLightColor.value=B.state.ambient,At.lightProbe.value=B.state.probe,At.directionalLights.value=B.state.directional,At.directionalLightShadows.value=B.state.directionalShadow,At.spotLights.value=B.state.spot,At.spotLightShadows.value=B.state.spotShadow,At.rectAreaLights.value=B.state.rectArea,At.ltc_1.value=B.state.rectAreaLTC1,At.ltc_2.value=B.state.rectAreaLTC2,At.pointLights.value=B.state.point,At.pointLightShadows.value=B.state.pointShadow,At.hemisphereLights.value=B.state.hemi,At.directionalShadowMap.value=B.state.directionalShadowMap,At.directionalShadowMatrix.value=B.state.directionalShadowMatrix,At.spotShadowMap.value=B.state.spotShadowMap,At.spotLightMatrix.value=B.state.spotLightMatrix,At.spotLightMap.value=B.state.spotLightMap,At.pointShadowMap.value=B.state.pointShadowMap,At.pointShadowMatrix.value=B.state.pointShadowMatrix),k.currentProgram=Lt,k.uniformsList=null,Lt}function og(x){if(x.uniformsList===null){let F=x.currentProgram.getUniforms();x.uniformsList=ia.seqWithValue(F.seq,x.uniforms)}return x.uniformsList}function ag(x,F){let N=_t.get(x);N.outputColorSpace=F.outputColorSpace,N.batching=F.batching,N.batchingColor=F.batchingColor,N.instancing=F.instancing,N.instancingColor=F.instancingColor,N.instancingMorph=F.instancingMorph,N.skinning=F.skinning,N.morphTargets=F.morphTargets,N.morphNormals=F.morphNormals,N.morphColors=F.morphColors,N.morphTargetsCount=F.morphTargetsCount,N.numClippingPlanes=F.numClippingPlanes,N.numIntersection=F.numClipIntersection,N.vertexAlphas=F.vertexAlphas,N.vertexTangents=F.vertexTangents,N.toneMapping=F.toneMapping}function P0(x,F,N,k,B){F.isScene!==!0&&(F=Mt),Kt.resetTextureUnits();let Q=F.fog,lt=k.isMeshStandardMaterial?F.environment:null,mt=O===null?S.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Vs,ht=(k.isMeshStandardMaterial?Ge:Qe).get(k.envMap||lt),Rt=k.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Lt=!!N.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),At=!!N.morphAttributes.position,ae=!!N.morphAttributes.normal,ve=!!N.morphAttributes.color,Ve=Sr;k.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Ve=S.toneMapping);let Ee=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Se=Ee!==void 0?Ee.length:0,Ct=_t.get(k),Be=d.state.lights;if(de===!0&&(Y===!0||x!==v)){let vn=x===v&&k.id===b;it.setState(k,x,vn)}let fe=!1;k.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Be.state.version||Ct.outputColorSpace!==mt||B.isBatchedMesh&&Ct.batching===!1||!B.isBatchedMesh&&Ct.batching===!0||B.isBatchedMesh&&Ct.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ct.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ct.instancing===!1||!B.isInstancedMesh&&Ct.instancing===!0||B.isSkinnedMesh&&Ct.skinning===!1||!B.isSkinnedMesh&&Ct.skinning===!0||B.isInstancedMesh&&Ct.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ct.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ct.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ct.instancingMorph===!1&&B.morphTexture!==null||Ct.envMap!==ht||k.fog===!0&&Ct.fog!==Q||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==it.numPlanes||Ct.numIntersection!==it.numIntersection)||Ct.vertexAlphas!==Rt||Ct.vertexTangents!==Lt||Ct.morphTargets!==At||Ct.morphNormals!==ae||Ct.morphColors!==ve||Ct.toneMapping!==Ve||Ct.morphTargetsCount!==Se)&&(fe=!0):(fe=!0,Ct.__version=k.version);let kn=Ct.currentProgram;fe===!0&&(kn=Ac(k,F,B));let Mo=!1,zn=!1,Ua=!1,Ue=kn.getUniforms(),ni=Ct.uniforms;if(yt.useProgram(kn.program)&&(Mo=!0,zn=!0,Ua=!0),k.id!==b&&(b=k.id,zn=!0),Mo||v!==x){yt.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),Ue.setValue(T,"projectionMatrix",x.projectionMatrix),Ue.setValue(T,"viewMatrix",x.matrixWorldInverse);let Cn=Ue.map.cameraPosition;Cn!==void 0&&Cn.setValue(T,pt.setFromMatrixPosition(x.matrixWorld)),Pt.logarithmicDepthBuffer&&Ue.setValue(T,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Ue.setValue(T,"isOrthographic",x.isOrthographicCamera===!0),v!==x&&(v=x,zn=!0,Ua=!0)}if(B.isSkinnedMesh){Ue.setOptional(T,B,"bindMatrix"),Ue.setOptional(T,B,"bindMatrixInverse");let vn=B.skeleton;vn&&(vn.boneTexture===null&&vn.computeBoneTexture(),Ue.setValue(T,"boneTexture",vn.boneTexture,Kt))}B.isBatchedMesh&&(Ue.setOptional(T,B,"batchingTexture"),Ue.setValue(T,"batchingTexture",B._matricesTexture,Kt),Ue.setOptional(T,B,"batchingIdTexture"),Ue.setValue(T,"batchingIdTexture",B._indirectTexture,Kt),Ue.setOptional(T,B,"batchingColorTexture"),B._colorsTexture!==null&&Ue.setValue(T,"batchingColorTexture",B._colorsTexture,Kt));let ii=N.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&tt.update(B,N,kn),(zn||Ct.receiveShadow!==B.receiveShadow)&&(Ct.receiveShadow=B.receiveShadow,Ue.setValue(T,"receiveShadow",B.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(ni.envMap.value=ht,ni.flipEnvMap.value=ht.isCubeTexture&&ht.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&F.environment!==null&&(ni.envMapIntensity.value=F.environmentIntensity),zn&&(Ue.setValue(T,"toneMappingExposure",S.toneMappingExposure),Ct.needsLights&&L0(ni,Ua),Q&&k.fog===!0&&Z.refreshFogUniforms(ni,Q),Z.refreshMaterialUniforms(ni,k,V,nt,d.state.transmissionRenderTarget[x.id]),ia.upload(T,og(Ct),ni,Kt)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(ia.upload(T,og(Ct),ni,Kt),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Ue.setValue(T,"center",B.center),Ue.setValue(T,"modelViewMatrix",B.modelViewMatrix),Ue.setValue(T,"normalMatrix",B.normalMatrix),Ue.setValue(T,"modelMatrix",B.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let vn=k.uniformsGroups;for(let Cn=0,dd=vn.length;Cn<dd;Cn++){let Ls=vn[Cn];Zt.update(Ls,kn),Zt.bind(Ls,kn)}}return kn}function L0(x,F){x.ambientLightColor.needsUpdate=F,x.lightProbe.needsUpdate=F,x.directionalLights.needsUpdate=F,x.directionalLightShadows.needsUpdate=F,x.pointLights.needsUpdate=F,x.pointLightShadows.needsUpdate=F,x.spotLights.needsUpdate=F,x.spotLightShadows.needsUpdate=F,x.rectAreaLights.needsUpdate=F,x.hemisphereLights.needsUpdate=F}function F0(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(x,F,N){let k=_t.get(x);k.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),_t.get(x.texture).__webglTexture=F,_t.get(x.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:N,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,F){let N=_t.get(x);N.__webglFramebuffer=F,N.__useDefaultFramebuffer=F===void 0};let B0=T.createFramebuffer();this.setRenderTarget=function(x,F=0,N=0){O=x,C=F,L=N;let k=!0,B=null,Q=!1,lt=!1;if(x){let ht=_t.get(x);if(ht.__useDefaultFramebuffer!==void 0)yt.bindFramebuffer(T.FRAMEBUFFER,null),k=!1;else if(ht.__webglFramebuffer===void 0)Kt.setupRenderTarget(x);else if(ht.__hasExternalTextures)Kt.rebindTextures(x,_t.get(x.texture).__webglTexture,_t.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let At=x.depthTexture;if(ht.__boundDepthTexture!==At){if(At!==null&&_t.has(At)&&(x.width!==At.image.width||x.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Kt.setupDepthRenderbuffer(x)}}let Rt=x.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(lt=!0);let Lt=_t.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Lt[F])?B=Lt[F][N]:B=Lt[F],Q=!0):x.samples>0&&Kt.useMultisampledRTT(x)===!1?B=_t.get(x).__webglMultisampledFramebuffer:Array.isArray(Lt)?B=Lt[N]:B=Lt,D.copy(x.viewport),z.copy(x.scissor),G=x.scissorTest}else D.copy(wt).multiplyScalar(V).floor(),z.copy(oe).multiplyScalar(V).floor(),G=Me;if(N!==0&&(B=B0),yt.bindFramebuffer(T.FRAMEBUFFER,B)&&k&&yt.drawBuffers(x,B),yt.viewport(D),yt.scissor(z),yt.setScissorTest(G),Q){let ht=_t.get(x.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+F,ht.__webglTexture,N)}else if(lt){let ht=F;for(let Rt=0;Rt<x.textures.length;Rt++){let Lt=_t.get(x.textures[Rt]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+Rt,Lt.__webglTexture,N,ht)}}else if(x!==null&&N!==0){let ht=_t.get(x.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,ht.__webglTexture,N)}b=-1},this.readRenderTargetPixels=function(x,F,N,k,B,Q,lt,mt=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ht=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&lt!==void 0&&(ht=ht[lt]),ht){yt.bindFramebuffer(T.FRAMEBUFFER,ht);try{let Rt=x.textures[mt],Lt=Rt.format,At=Rt.type;if(!Pt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pt.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=x.width-k&&N>=0&&N<=x.height-B&&(x.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+mt),T.readPixels(F,N,k,B,bt.convert(Lt),bt.convert(At),Q))}finally{let Rt=O!==null?_t.get(O).__webglFramebuffer:null;yt.bindFramebuffer(T.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(x,F,N,k,B,Q,lt,mt=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ht=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&lt!==void 0&&(ht=ht[lt]),ht)if(F>=0&&F<=x.width-k&&N>=0&&N<=x.height-B){yt.bindFramebuffer(T.FRAMEBUFFER,ht);let Rt=x.textures[mt],Lt=Rt.format,At=Rt.type;if(!Pt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pt.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ae=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,ae),T.bufferData(T.PIXEL_PACK_BUFFER,Q.byteLength,T.STREAM_READ),x.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+mt),T.readPixels(F,N,k,B,bt.convert(Lt),bt.convert(At),0);let ve=O!==null?_t.get(O).__webglFramebuffer:null;yt.bindFramebuffer(T.FRAMEBUFFER,ve);let Ve=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await My(T,Ve,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,ae),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,Q),T.deleteBuffer(ae),T.deleteSync(Ve),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,F=null,N=0){let k=Math.pow(2,-N),B=Math.floor(x.image.width*k),Q=Math.floor(x.image.height*k),lt=F!==null?F.x:0,mt=F!==null?F.y:0;Kt.setTexture2D(x,0),T.copyTexSubImage2D(T.TEXTURE_2D,N,0,0,lt,mt,B,Q),yt.unbindTexture()};let U0=T.createFramebuffer(),O0=T.createFramebuffer();this.copyTextureToTexture=function(x,F,N=null,k=null,B=0,Q=null){Q===null&&(B!==0?(Ho("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=B,B=0):Q=0);let lt,mt,ht,Rt,Lt,At,ae,ve,Ve,Ee=x.isCompressedTexture?x.mipmaps[Q]:x.image;if(N!==null)lt=N.max.x-N.min.x,mt=N.max.y-N.min.y,ht=N.isBox3?N.max.z-N.min.z:1,Rt=N.min.x,Lt=N.min.y,At=N.isBox3?N.min.z:0;else{let ii=Math.pow(2,-B);lt=Math.floor(Ee.width*ii),mt=Math.floor(Ee.height*ii),x.isDataArrayTexture?ht=Ee.depth:x.isData3DTexture?ht=Math.floor(Ee.depth*ii):ht=1,Rt=0,Lt=0,At=0}k!==null?(ae=k.x,ve=k.y,Ve=k.z):(ae=0,ve=0,Ve=0);let Se=bt.convert(F.format),Ct=bt.convert(F.type),Be;F.isData3DTexture?(Kt.setTexture3D(F,0),Be=T.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Kt.setTexture2DArray(F,0),Be=T.TEXTURE_2D_ARRAY):(Kt.setTexture2D(F,0),Be=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,F.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,F.unpackAlignment);let fe=T.getParameter(T.UNPACK_ROW_LENGTH),kn=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Mo=T.getParameter(T.UNPACK_SKIP_PIXELS),zn=T.getParameter(T.UNPACK_SKIP_ROWS),Ua=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,Ee.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Ee.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Rt),T.pixelStorei(T.UNPACK_SKIP_ROWS,Lt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,At);let Ue=x.isDataArrayTexture||x.isData3DTexture,ni=F.isDataArrayTexture||F.isData3DTexture;if(x.isDepthTexture){let ii=_t.get(x),vn=_t.get(F),Cn=_t.get(ii.__renderTarget),dd=_t.get(vn.__renderTarget);yt.bindFramebuffer(T.READ_FRAMEBUFFER,Cn.__webglFramebuffer),yt.bindFramebuffer(T.DRAW_FRAMEBUFFER,dd.__webglFramebuffer);for(let Ls=0;Ls<ht;Ls++)Ue&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_t.get(x).__webglTexture,B,At+Ls),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,_t.get(F).__webglTexture,Q,Ve+Ls)),T.blitFramebuffer(Rt,Lt,lt,mt,ae,ve,lt,mt,T.DEPTH_BUFFER_BIT,T.NEAREST);yt.bindFramebuffer(T.READ_FRAMEBUFFER,null),yt.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(B!==0||x.isRenderTargetTexture||_t.has(x)){let ii=_t.get(x),vn=_t.get(F);yt.bindFramebuffer(T.READ_FRAMEBUFFER,U0),yt.bindFramebuffer(T.DRAW_FRAMEBUFFER,O0);for(let Cn=0;Cn<ht;Cn++)Ue?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ii.__webglTexture,B,At+Cn):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,ii.__webglTexture,B),ni?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,vn.__webglTexture,Q,Ve+Cn):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,vn.__webglTexture,Q),B!==0?T.blitFramebuffer(Rt,Lt,lt,mt,ae,ve,lt,mt,T.COLOR_BUFFER_BIT,T.NEAREST):ni?T.copyTexSubImage3D(Be,Q,ae,ve,Ve+Cn,Rt,Lt,lt,mt):T.copyTexSubImage2D(Be,Q,ae,ve,Rt,Lt,lt,mt);yt.bindFramebuffer(T.READ_FRAMEBUFFER,null),yt.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else ni?x.isDataTexture||x.isData3DTexture?T.texSubImage3D(Be,Q,ae,ve,Ve,lt,mt,ht,Se,Ct,Ee.data):F.isCompressedArrayTexture?T.compressedTexSubImage3D(Be,Q,ae,ve,Ve,lt,mt,ht,Se,Ee.data):T.texSubImage3D(Be,Q,ae,ve,Ve,lt,mt,ht,Se,Ct,Ee):x.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,Q,ae,ve,lt,mt,Se,Ct,Ee.data):x.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,Q,ae,ve,Ee.width,Ee.height,Se,Ee.data):T.texSubImage2D(T.TEXTURE_2D,Q,ae,ve,lt,mt,Se,Ct,Ee);T.pixelStorei(T.UNPACK_ROW_LENGTH,fe),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,kn),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Mo),T.pixelStorei(T.UNPACK_SKIP_ROWS,zn),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ua),Q===0&&F.generateMipmaps&&T.generateMipmap(Be),yt.unbindTexture()},this.initRenderTarget=function(x){_t.get(x).__webglFramebuffer===void 0&&Kt.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Kt.setTextureCube(x,0):x.isData3DTexture?Kt.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Kt.setTexture2DArray(x,0):Kt.setTexture2D(x,0),yt.unbindTexture()},this.resetState=function(){C=0,L=0,O=null,yt.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ue._getDrawingBufferColorSpace(t),e.unpackColorSpace=ue._getUnpackColorSpace()}};var e_={type:"change"},Fp={type:"start"},i_={type:"end"},_f=new ss,n_=new si,dT=Math.cos(70*hp.DEG2RAD),Ze=new R,Dn=2*Math.PI,be={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lp=1e-6,xf=class extends dl{constructor(t,e=null){super(t,e),this.state=be.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ls.ROTATE,MIDDLE:ls.DOLLY,RIGHT:ls.PAN},this.touches={ONE:cs.ROTATE,TWO:cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new ai,this._lastTargetPosition=new R,this._quat=new ai().setFromUnitVectors(t.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new $o,this._sphericalDelta=new $o,this._scale=1,this._panOffset=new R,this._rotateStart=new Vt,this._rotateEnd=new Vt,this._rotateDelta=new Vt,this._panStart=new Vt,this._panEnd=new Vt,this._panDelta=new Vt,this._dollyStart=new Vt,this._dollyEnd=new Vt,this._dollyDelta=new Vt,this._dollyDirection=new R,this._mouse=new Vt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=mT.bind(this),this._onPointerDown=pT.bind(this),this._onPointerUp=gT.bind(this),this._onContextMenu=MT.bind(this),this._onMouseWheel=xT.bind(this),this._onKeyDown=vT.bind(this),this._onTouchStart=bT.bind(this),this._onTouchMove=ST.bind(this),this._onMouseDown=yT.bind(this),this._onMouseMove=_T.bind(this),this._interceptControlDown=wT.bind(this),this._interceptControlUp=TT.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(e_),this.update(),this.state=be.NONE}update(t=null){let e=this.object.position;Ze.copy(e).sub(this.target),Ze.applyQuaternion(this._quat),this._spherical.setFromVector3(Ze),this.autoRotate&&this.state===be.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Dn:i>Math.PI&&(i-=Dn),r<-Math.PI?r+=Dn:r>Math.PI&&(r-=Dn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Ze.setFromSpherical(this._spherical),Ze.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ze),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ze.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){let a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ze.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(_f.origin.copy(this.object.position),_f.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_f.direction))<dT?this.object.lookAt(this.target):(n_.setFromNormalAndCoplanarPoint(this.object.up,this.target),_f.intersectPlane(n_,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Lp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lp||this._lastTargetPosition.distanceToSquared(this.target)>Lp?(this.dispatchEvent(e_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Dn/60*this.autoRotateSpeed*t:Dn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ze.setFromMatrixColumn(e,0),Ze.multiplyScalar(-t),this._panOffset.add(Ze)}_panUp(t,e){this.screenSpacePanning===!0?Ze.setFromMatrixColumn(e,1):(Ze.setFromMatrixColumn(e,0),Ze.crossVectors(this.object.up,Ze)),Ze.multiplyScalar(t),this._panOffset.add(Ze)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Ze.copy(r).sub(this.target);let s=Ze.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=t-i.left,s=e-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Dn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(i,r)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),r=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Dn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Dn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Vt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function pT(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function mT(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function gT(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(i_),this.state=be.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function yT(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case ls.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=be.DOLLY;break;case ls.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=be.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=be.ROTATE}break;case ls.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=be.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=be.PAN}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Fp)}function _T(n){switch(this.state){case be.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case be.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case be.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function xT(n){this.enabled===!1||this.enableZoom===!1||this.state!==be.NONE||(n.preventDefault(),this.dispatchEvent(Fp),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(i_))}function vT(n){this.enabled!==!1&&this._handleKeyDown(n)}function bT(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case cs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=be.TOUCH_ROTATE;break;case cs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=be.TOUCH_PAN;break;default:this.state=be.NONE}break;case 2:switch(this.touches.TWO){case cs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=be.TOUCH_DOLLY_PAN;break;case cs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=be.TOUCH_DOLLY_ROTATE;break;default:this.state=be.NONE}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Fp)}function ST(n){switch(this._trackPointer(n),this.state){case be.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case be.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case be.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case be.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=be.NONE}}function MT(n){this.enabled!==!1&&n.preventDefault()}function wT(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function TT(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function r_(n,t,e){n.up.copy(e);let i=new xf(n,t);return i.enableDamping=!0,i}var k1=lg(m_()),y0=lg(P_());function F_(n,t){var e={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&t.indexOf(i)<0&&(e[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(n);r<i.length;r++)t.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(e[i[r]]=n[i[r]]);return e}function ut(n,t,e,i){function r(s){return s instanceof e?s:new e(function(o){o(s)})}return new(e||(e=Promise))(function(s,o){function a(u){try{c(i.next(u))}catch(f){o(f)}}function l(u){try{c(i.throw(u))}catch(f){o(f)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((i=i.apply(n,t||[])).next())})}function L_(n){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&n[t],i=0;if(e)return e.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function Ht(n){return this instanceof Ht?(this.v=n,this):new Ht(n)}function qn(n,t,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(n,t||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(p){return function(g){return Promise.resolve(g).then(p,f)}}function a(p,g){i[p]&&(r[p]=function(_){return new Promise(function(m,d){s.push([p,_,m,d])>1||l(p,_)})},g&&(r[p]=g(r[p])))}function l(p,g){try{c(i[p](g))}catch(_){h(s[0][3],_)}}function c(p){p.value instanceof Ht?Promise.resolve(p.value.v).then(u,f):h(s[0][2],p)}function u(p){l("next",p)}function f(p){l("throw",p)}function h(p,g){p(g),s.shift(),s.length&&l(s[0][0],s[0][1])}}function oa(n){var t,e;return t={},i("next"),i("throw",function(r){throw r}),i("return"),t[Symbol.iterator]=function(){return this},t;function i(r,s){t[r]=n[r]?function(o){return(e=!e)?{value:Ht(n[r](o)),done:!1}:s?s(o):o}:s}}function Di(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=n[Symbol.asyncIterator],e;return t?t.call(n):(n=typeof L_=="function"?L_(n):n[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(s){e[s]=n[s]&&function(o){return new Promise(function(a,l){o=n[s](o),r(a,l,o.done,o.value)})}}function r(s,o,a,l){Promise.resolve(l).then(function(c){s({value:c,done:a})},o)}}var tm={};To(tm,{compareArrayLike:()=>Qp,joinUint8Arrays:()=>jn,memcpy:()=>aa,rebaseValueOffsets:()=>Tl,toArrayBufferView:()=>te,toArrayBufferViewAsyncIterator:()=>Li,toArrayBufferViewIterator:()=>er,toBigInt64Array:()=>cA,toBigUint64Array:()=>hA,toFloat32Array:()=>dA,toFloat32ArrayAsyncIterator:()=>IA,toFloat32ArrayIterator:()=>bA,toFloat64Array:()=>pA,toFloat64ArrayAsyncIterator:()=>RA,toFloat64ArrayIterator:()=>SA,toInt16Array:()=>lA,toInt16ArrayAsyncIterator:()=>TA,toInt16ArrayIterator:()=>yA,toInt32Array:()=>Js,toInt32ArrayAsyncIterator:()=>AA,toInt32ArrayIterator:()=>_A,toInt8Array:()=>aA,toInt8ArrayAsyncIterator:()=>wA,toInt8ArrayIterator:()=>gA,toUint16Array:()=>uA,toUint16ArrayAsyncIterator:()=>EA,toUint16ArrayIterator:()=>xA,toUint32Array:()=>fA,toUint32ArrayAsyncIterator:()=>CA,toUint32ArrayIterator:()=>vA,toUint8Array:()=>kt,toUint8ArrayAsyncIterator:()=>Kp,toUint8ArrayIterator:()=>Jp,toUint8ClampedArray:()=>mA,toUint8ClampedArrayAsyncIterator:()=>DA,toUint8ClampedArrayIterator:()=>MA});var iA=new TextDecoder("utf-8"),Ml=n=>iA.decode(n),rA=new TextEncoder,hs=n=>rA.encode(n);var[PD,Df]=(()=>{let n=()=>{throw new Error("BigInt is not available in this environment")};function t(){throw n()}return t.asIntN=()=>{throw n()},t.asUintN=()=>{throw n()},typeof BigInt<"u"?[BigInt,!0]:[t,!1]})(),[fi,LD]=(()=>{let n=()=>{throw new Error("BigInt64Array is not available in this environment")};class t{static get BYTES_PER_ELEMENT(){return 8}static of(){throw n()}static from(){throw n()}constructor(){throw n()}}return typeof BigInt64Array<"u"?[BigInt64Array,!0]:[t,!1]})(),[hi,FD]=(()=>{let n=()=>{throw new Error("BigUint64Array is not available in this environment")};class t{static get BYTES_PER_ELEMENT(){return 8}static of(){throw n()}static from(){throw n()}constructor(){throw n()}}return typeof BigUint64Array<"u"?[BigUint64Array,!0]:[t,!1]})();var sA=n=>typeof n=="number",B_=n=>typeof n=="boolean",Je=n=>typeof n=="function",Tn=n=>n!=null&&Object(n)===n,Yn=n=>Tn(n)&&Je(n.then);var Pi=n=>Tn(n)&&Je(n[Symbol.iterator]),di=n=>Tn(n)&&Je(n[Symbol.asyncIterator]),Pf=n=>Tn(n)&&Tn(n.schema);var Lf=n=>Tn(n)&&"done"in n&&"value"in n;var Ff=n=>Tn(n)&&Je(n.stat)&&sA(n.fd);var Bf=n=>Tn(n)&&wl(n.body),Uf=n=>"_getDOMStream"in n&&"_getNodeStream"in n,U_=n=>Tn(n)&&Je(n.abort)&&Je(n.getWriter)&&!Uf(n),wl=n=>Tn(n)&&Je(n.cancel)&&Je(n.getReader)&&!Uf(n),O_=n=>Tn(n)&&Je(n.end)&&Je(n.write)&&B_(n.writable)&&!Uf(n),Of=n=>Tn(n)&&Je(n.read)&&Je(n.pipe)&&B_(n.readable)&&!Uf(n),N_=n=>Tn(n)&&Je(n.clear)&&Je(n.bytes)&&Je(n.position)&&Je(n.setPosition)&&Je(n.capacity)&&Je(n.getBufferIdentifier)&&Je(n.createLong);var Zp=typeof SharedArrayBuffer<"u"?SharedArrayBuffer:ArrayBuffer;function oA(n){let t=n[0]?[n[0]]:[],e,i,r,s;for(let o,a,l=0,c=0,u=n.length;++l<u;){if(o=t[c],a=n[l],!o||!a||o.buffer!==a.buffer||a.byteOffset<o.byteOffset){a&&(t[++c]=a);continue}if({byteOffset:e,byteLength:r}=o,{byteOffset:i,byteLength:s}=a,e+r<i||i+s<e){a&&(t[++c]=a);continue}t[c]=new Uint8Array(o.buffer,e,i-e+s)}return t}function aa(n,t,e=0,i=t.byteLength){let r=n.byteLength,s=new Uint8Array(n.buffer,n.byteOffset,r),o=new Uint8Array(t.buffer,t.byteOffset,Math.min(i,r));return s.set(o,e),n}function jn(n,t){let e=oA(n),i=e.reduce((u,f)=>u+f.byteLength,0),r,s,o,a=0,l=-1,c=Math.min(t||Number.POSITIVE_INFINITY,i);for(let u=e.length;++l<u;){if(r=e[l],s=r.subarray(0,Math.min(r.length,c-a)),c<=a+s.length){s.length<r.length?e[l]=r.subarray(s.length):s.length===r.length&&l++,o?aa(o,s,a):o=s;break}aa(o||(o=new Uint8Array(c)),s,a),a+=s.length}return[o||new Uint8Array(0),e.slice(l),i-(o?o.byteLength:0)]}function te(n,t){let e=Lf(t)?t.value:t;return e instanceof n?n===Uint8Array?new n(e.buffer,e.byteOffset,e.byteLength):e:e?(typeof e=="string"&&(e=hs(e)),e instanceof ArrayBuffer?new n(e):e instanceof Zp?new n(e):N_(e)?te(n,e.bytes()):ArrayBuffer.isView(e)?e.byteLength<=0?new n(0):new n(e.buffer,e.byteOffset,e.byteLength/n.BYTES_PER_ELEMENT):n.from(e)):new n(0)}var aA=n=>te(Int8Array,n),lA=n=>te(Int16Array,n),Js=n=>te(Int32Array,n),cA=n=>te(fi,n),kt=n=>te(Uint8Array,n),uA=n=>te(Uint16Array,n),fA=n=>te(Uint32Array,n),hA=n=>te(hi,n),dA=n=>te(Float32Array,n),pA=n=>te(Float64Array,n),mA=n=>te(Uint8ClampedArray,n),$p=n=>(n.next(),n);function*er(n,t){let e=function*(r){yield r},i=typeof t=="string"||ArrayBuffer.isView(t)||t instanceof ArrayBuffer||t instanceof Zp?e(t):Pi(t)?t:e(t);return yield*$p((function*(r){let s=null;do s=r.next(yield te(n,s));while(!s.done)})(i[Symbol.iterator]())),new n}var gA=n=>er(Int8Array,n),yA=n=>er(Int16Array,n),_A=n=>er(Int32Array,n),Jp=n=>er(Uint8Array,n),xA=n=>er(Uint16Array,n),vA=n=>er(Uint32Array,n),bA=n=>er(Float32Array,n),SA=n=>er(Float64Array,n),MA=n=>er(Uint8ClampedArray,n);function Li(n,t){return qn(this,arguments,function*(){if(Yn(t))return yield Ht(yield Ht(yield*oa(Di(Li(n,yield Ht(t))))));let i=function(o){return qn(this,arguments,function*(){yield yield Ht(yield Ht(o))})},r=function(o){return qn(this,arguments,function*(){yield Ht(yield*oa(Di($p((function*(a){let l=null;do l=a.next(yield l?.value);while(!l.done)})(o[Symbol.iterator]())))))})},s=typeof t=="string"||ArrayBuffer.isView(t)||t instanceof ArrayBuffer||t instanceof Zp?i(t):Pi(t)?r(t):di(t)?t:i(t);return yield Ht(yield*oa(Di($p((function(o){return qn(this,arguments,function*(){let a=null;do a=yield Ht(o.next(yield yield Ht(te(n,a))));while(!a.done)})})(s[Symbol.asyncIterator]()))))),yield Ht(new n)})}var wA=n=>Li(Int8Array,n),TA=n=>Li(Int16Array,n),AA=n=>Li(Int32Array,n),Kp=n=>Li(Uint8Array,n),EA=n=>Li(Uint16Array,n),CA=n=>Li(Uint32Array,n),IA=n=>Li(Float32Array,n),RA=n=>Li(Float64Array,n),DA=n=>Li(Uint8ClampedArray,n);function Tl(n,t,e){if(n!==0){e=e.slice(0,t+1);for(let i=-1;++i<=t;)e[i]+=n}return e}function Qp(n,t){let e=0,i=n.length;if(i!==t.length)return!1;if(i>0)do if(n[e]!==t[e])return!1;while(++e<i);return!0}var cn={fromIterable(n){return Nf(PA(n))},fromAsyncIterable(n){return Nf(LA(n))},fromDOMStream(n){return Nf(FA(n))},fromNodeStream(n){return Nf(BA(n))},toDOMStream(n,t){throw new Error('"toDOMStream" not available in this environment')},toNodeStream(n,t){throw new Error('"toNodeStream" not available in this environment')}},Nf=n=>(n.next(),n);function*PA(n){let t,e=!1,i=[],r,s,o,a=0;function l(){return s==="peek"?jn(i,o)[0]:([r,i,a]=jn(i,o),r)}({cmd:s,size:o}=yield null);let c=Jp(n)[Symbol.iterator]();try{do if({done:t,value:r}=Number.isNaN(o-a)?c.next():c.next(o-a),!t&&r.byteLength>0&&(i.push(r),a+=r.byteLength),t||o<=a)do({cmd:s,size:o}=yield l());while(o<a);while(!t)}catch(u){(e=!0)&&typeof c.throw=="function"&&c.throw(u)}finally{e===!1&&typeof c.return=="function"&&c.return(null)}return null}function LA(n){return qn(this,arguments,function*(){let e,i=!1,r=[],s,o,a,l=0;function c(){return o==="peek"?jn(r,a)[0]:([s,r,l]=jn(r,a),s)}({cmd:o,size:a}=yield yield Ht(null));let u=Kp(n)[Symbol.asyncIterator]();try{do if({done:e,value:s}=Number.isNaN(a-l)?yield Ht(u.next()):yield Ht(u.next(a-l)),!e&&s.byteLength>0&&(r.push(s),l+=s.byteLength),e||a<=l)do({cmd:o,size:a}=yield yield Ht(c()));while(a<l);while(!e)}catch(f){(i=!0)&&typeof u.throw=="function"&&(yield Ht(u.throw(f)))}finally{i===!1&&typeof u.return=="function"&&(yield Ht(u.return(new Uint8Array(0))))}return yield Ht(null)})}function FA(n){return qn(this,arguments,function*(){let e=!1,i=!1,r=[],s,o,a,l=0;function c(){return o==="peek"?jn(r,a)[0]:([s,r,l]=jn(r,a),s)}({cmd:o,size:a}=yield yield Ht(null));let u=new nm(n);try{do if({done:e,value:s}=Number.isNaN(a-l)?yield Ht(u.read()):yield Ht(u.read(a-l)),!e&&s.byteLength>0&&(r.push(kt(s)),l+=s.byteLength),e||a<=l)do({cmd:o,size:a}=yield yield Ht(c()));while(a<l);while(!e)}catch(f){(i=!0)&&(yield Ht(u.cancel(f)))}finally{i===!1?yield Ht(u.cancel()):n.locked&&u.releaseLock()}return yield Ht(null)})}var nm=class{constructor(t){this.source=t,this.reader=null,this.reader=this.source.getReader(),this.reader.closed.catch(()=>{})}get closed(){return this.reader?this.reader.closed.catch(()=>{}):Promise.resolve()}releaseLock(){this.reader&&this.reader.releaseLock(),this.reader=null}cancel(t){return ut(this,void 0,void 0,function*(){let{reader:e,source:i}=this;e&&(yield e.cancel(t).catch(()=>{})),i&&i.locked&&this.releaseLock()})}read(t){return ut(this,void 0,void 0,function*(){if(t===0)return{done:this.reader==null,value:new Uint8Array(0)};let e=yield this.reader.read();return!e.done&&(e.value=kt(e)),e})}},em=(n,t)=>{let e=r=>i([t,r]),i;return[t,e,new Promise(r=>(i=r)&&n.once(t,e))]};function BA(n){return qn(this,arguments,function*(){let e=[],i="error",r=!1,s=null,o,a,l=0,c=[],u;function f(){return o==="peek"?jn(c,a)[0]:([u,c,l]=jn(c,a),u)}if({cmd:o,size:a}=yield yield Ht(null),n.isTTY)return yield yield Ht(new Uint8Array(0)),yield Ht(null);try{e[0]=em(n,"end"),e[1]=em(n,"error");do{if(e[2]=em(n,"readable"),[i,s]=yield Ht(Promise.race(e.map(p=>p[2]))),i==="error")break;if((r=i==="end")||(Number.isFinite(a-l)?(u=kt(n.read(a-l)),u.byteLength<a-l&&(u=kt(n.read()))):u=kt(n.read()),u.byteLength>0&&(c.push(u),l+=u.byteLength)),r||a<=l)do({cmd:o,size:a}=yield yield Ht(f()));while(a<l)}while(!r)}finally{yield Ht(h(e,i==="error"?s:null))}return yield Ht(null);function h(p,g){return u=c=null,new Promise((_,m)=>{for(let[d,A]of p)n.off(d,A);try{let d=n.destroy;d&&d.call(n,g),g=void 0}catch(d){g=d||g}finally{g!=null?m(g):_()}})}})}var rn;(function(n){n[n.V1=0]="V1",n[n.V2=1]="V2",n[n.V3=2]="V3",n[n.V4=3]="V4",n[n.V5=4]="V5"})(rn||(rn={}));var ke;(function(n){n[n.Sparse=0]="Sparse",n[n.Dense=1]="Dense"})(ke||(ke={}));var Ie;(function(n){n[n.HALF=0]="HALF",n[n.SINGLE=1]="SINGLE",n[n.DOUBLE=2]="DOUBLE"})(Ie||(Ie={}));var un;(function(n){n[n.DAY=0]="DAY",n[n.MILLISECOND=1]="MILLISECOND"})(un||(un={}));var ie;(function(n){n[n.SECOND=0]="SECOND",n[n.MILLISECOND=1]="MILLISECOND",n[n.MICROSECOND=2]="MICROSECOND",n[n.NANOSECOND=3]="NANOSECOND"})(ie||(ie={}));var An;(function(n){n[n.YEAR_MONTH=0]="YEAR_MONTH",n[n.DAY_TIME=1]="DAY_TIME",n[n.MONTH_DAY_NANO=2]="MONTH_DAY_NANO"})(An||(An={}));var ce;(function(n){n[n.NONE=0]="NONE",n[n.Schema=1]="Schema",n[n.DictionaryBatch=2]="DictionaryBatch",n[n.RecordBatch=3]="RecordBatch",n[n.Tensor=4]="Tensor",n[n.SparseTensor=5]="SparseTensor"})(ce||(ce={}));var P;(function(n){n[n.NONE=0]="NONE",n[n.Null=1]="Null",n[n.Int=2]="Int",n[n.Float=3]="Float",n[n.Binary=4]="Binary",n[n.Utf8=5]="Utf8",n[n.Bool=6]="Bool",n[n.Decimal=7]="Decimal",n[n.Date=8]="Date",n[n.Time=9]="Time",n[n.Timestamp=10]="Timestamp",n[n.Interval=11]="Interval",n[n.List=12]="List",n[n.Struct=13]="Struct",n[n.Union=14]="Union",n[n.FixedSizeBinary=15]="FixedSizeBinary",n[n.FixedSizeList=16]="FixedSizeList",n[n.Map=17]="Map",n[n.Dictionary=-1]="Dictionary",n[n.Int8=-2]="Int8",n[n.Int16=-3]="Int16",n[n.Int32=-4]="Int32",n[n.Int64=-5]="Int64",n[n.Uint8=-6]="Uint8",n[n.Uint16=-7]="Uint16",n[n.Uint32=-8]="Uint32",n[n.Uint64=-9]="Uint64",n[n.Float16=-10]="Float16",n[n.Float32=-11]="Float32",n[n.Float64=-12]="Float64",n[n.DateDay=-13]="DateDay",n[n.DateMillisecond=-14]="DateMillisecond",n[n.TimestampSecond=-15]="TimestampSecond",n[n.TimestampMillisecond=-16]="TimestampMillisecond",n[n.TimestampMicrosecond=-17]="TimestampMicrosecond",n[n.TimestampNanosecond=-18]="TimestampNanosecond",n[n.TimeSecond=-19]="TimeSecond",n[n.TimeMillisecond=-20]="TimeMillisecond",n[n.TimeMicrosecond=-21]="TimeMicrosecond",n[n.TimeNanosecond=-22]="TimeNanosecond",n[n.DenseUnion=-23]="DenseUnion",n[n.SparseUnion=-24]="SparseUnion",n[n.IntervalDayTime=-25]="IntervalDayTime",n[n.IntervalYearMonth=-26]="IntervalYearMonth"})(P||(P={}));var pi;(function(n){n[n.OFFSET=0]="OFFSET",n[n.DATA=1]="DATA",n[n.VALIDITY=2]="VALIDITY",n[n.TYPE=3]="TYPE"})(pi||(pi={}));var xm={};To(xm,{clampIndex:()=>AE,clampRange:()=>Il,createElementComparator:()=>gs});var UA=void 0;function Fi(n){if(n===null)return"null";if(n===UA)return"undefined";switch(typeof n){case"number":return`${n}`;case"bigint":return`${n}`;case"string":return`"${n}"`}return typeof n[Symbol.toPrimitive]=="function"?n[Symbol.toPrimitive]("string"):ArrayBuffer.isView(n)?n instanceof fi||n instanceof hi?`[${[...n].map(t=>Fi(t))}]`:`[${n}]`:ArrayBuffer.isView(n)?`[${n}]`:JSON.stringify(n,(t,e)=>typeof e=="bigint"?`${e}`:e)}var rm={};To(rm,{BN:()=>El,bignumToBigInt:()=>kf,bignumToString:()=>ds,isArrowBigNumSymbol:()=>k_});var k_=Symbol.for("isArrowBigNum");function Bi(n,...t){return t.length===0?Object.setPrototypeOf(te(this.TypedArray,n),this.constructor.prototype):Object.setPrototypeOf(new this.TypedArray(n,...t),this.constructor.prototype)}Bi.prototype[k_]=!0;Bi.prototype.toJSON=function(){return`"${ds(this)}"`};Bi.prototype.valueOf=function(){return z_(this)};Bi.prototype.toString=function(){return ds(this)};Bi.prototype[Symbol.toPrimitive]=function(n="default"){switch(n){case"number":return z_(this);case"string":return ds(this);case"default":return kf(this)}return ds(this)};function la(...n){return Bi.apply(this,n)}function ca(...n){return Bi.apply(this,n)}function Al(...n){return Bi.apply(this,n)}Object.setPrototypeOf(la.prototype,Object.create(Int32Array.prototype));Object.setPrototypeOf(ca.prototype,Object.create(Uint32Array.prototype));Object.setPrototypeOf(Al.prototype,Object.create(Uint32Array.prototype));Object.assign(la.prototype,Bi.prototype,{constructor:la,signed:!0,TypedArray:Int32Array,BigIntArray:fi});Object.assign(ca.prototype,Bi.prototype,{constructor:ca,signed:!1,TypedArray:Uint32Array,BigIntArray:hi});Object.assign(Al.prototype,Bi.prototype,{constructor:Al,signed:!0,TypedArray:Uint32Array,BigIntArray:hi});function z_(n){let{buffer:t,byteOffset:e,length:i,signed:r}=n,s=new hi(t,e,i),o=r&&s[s.length-1]&BigInt(1)<<BigInt(63),a=BigInt(o?1:0),l=BigInt(0);if(o){for(let c of s)a+=~c*(BigInt(1)<<BigInt(32)*l++);a*=BigInt(-1)}else for(let c of s)a+=c*(BigInt(1)<<BigInt(32)*l++);return a}var ds,kf;Df?(kf=(n=>n.byteLength===8?new n.BigIntArray(n.buffer,n.byteOffset,1)[0]:im(n)),ds=(n=>n.byteLength===8?`${new n.BigIntArray(n.buffer,n.byteOffset,1)[0]}`:im(n))):(ds=im,kf=ds);function im(n){let t="",e=new Uint32Array(2),i=new Uint16Array(n.buffer,n.byteOffset,n.byteLength/2),r=new Uint32Array((i=new Uint16Array(i).reverse()).buffer),s=-1,o=i.length-1;do{for(e[0]=i[s=0];s<o;)i[s++]=e[1]=e[0]/10,e[0]=(e[0]-e[1]*10<<16)+i[s];i[s]=e[1]=e[0]/10,e[0]=e[0]-e[1]*10,t=`${e[0]}${t}`}while(r[0]||r[1]||r[2]||r[3]);return t??"0"}var El=class n{static new(t,e){switch(e){case!0:return new la(t);case!1:return new ca(t)}switch(t.constructor){case Int8Array:case Int16Array:case Int32Array:case fi:return new la(t)}return t.byteLength===16?new Al(t):new ca(t)}static signed(t){return new la(t)}static unsigned(t){return new ca(t)}static decimal(t){return new Al(t)}constructor(t,e){return n.new(t,e)}};var V_,H_,G_,W_,X_,q_,Y_,j_,$_,Z_,J_,K_,Q_,tx,ex,nx,ix,rx,sx,Et=class n{static isNull(t){return t?.typeId===P.Null}static isInt(t){return t?.typeId===P.Int}static isFloat(t){return t?.typeId===P.Float}static isBinary(t){return t?.typeId===P.Binary}static isUtf8(t){return t?.typeId===P.Utf8}static isBool(t){return t?.typeId===P.Bool}static isDecimal(t){return t?.typeId===P.Decimal}static isDate(t){return t?.typeId===P.Date}static isTime(t){return t?.typeId===P.Time}static isTimestamp(t){return t?.typeId===P.Timestamp}static isInterval(t){return t?.typeId===P.Interval}static isList(t){return t?.typeId===P.List}static isStruct(t){return t?.typeId===P.Struct}static isUnion(t){return t?.typeId===P.Union}static isFixedSizeBinary(t){return t?.typeId===P.FixedSizeBinary}static isFixedSizeList(t){return t?.typeId===P.FixedSizeList}static isMap(t){return t?.typeId===P.Map}static isDictionary(t){return t?.typeId===P.Dictionary}static isDenseUnion(t){return n.isUnion(t)&&t.mode===ke.Dense}static isSparseUnion(t){return n.isUnion(t)&&t.mode===ke.Sparse}get typeId(){return P.NONE}};V_=Symbol.toStringTag;Et[V_]=(n=>(n.children=null,n.ArrayType=Array,n[Symbol.toStringTag]="DataType"))(Et.prototype);var En=class extends Et{toString(){return"Null"}get typeId(){return P.Null}};H_=Symbol.toStringTag;En[H_]=(n=>n[Symbol.toStringTag]="Null")(En.prototype);var We=class extends Et{constructor(t,e){super(),this.isSigned=t,this.bitWidth=e}get typeId(){return P.Int}get ArrayType(){switch(this.bitWidth){case 8:return this.isSigned?Int8Array:Uint8Array;case 16:return this.isSigned?Int16Array:Uint16Array;case 32:return this.isSigned?Int32Array:Uint32Array;case 64:return this.isSigned?fi:hi}throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`)}toString(){return`${this.isSigned?"I":"Ui"}nt${this.bitWidth}`}};G_=Symbol.toStringTag;We[G_]=(n=>(n.isSigned=null,n.bitWidth=null,n[Symbol.toStringTag]="Int"))(We.prototype);var zf=class extends We{constructor(){super(!0,8)}get ArrayType(){return Int8Array}},Vf=class extends We{constructor(){super(!0,16)}get ArrayType(){return Int16Array}},nr=class extends We{constructor(){super(!0,32)}get ArrayType(){return Int32Array}},Hf=class extends We{constructor(){super(!0,64)}get ArrayType(){return fi}},Gf=class extends We{constructor(){super(!1,8)}get ArrayType(){return Uint8Array}},Wf=class extends We{constructor(){super(!1,16)}get ArrayType(){return Uint16Array}},Xf=class extends We{constructor(){super(!1,32)}get ArrayType(){return Uint32Array}},qf=class extends We{constructor(){super(!1,64)}get ArrayType(){return hi}};Object.defineProperty(zf.prototype,"ArrayType",{value:Int8Array});Object.defineProperty(Vf.prototype,"ArrayType",{value:Int16Array});Object.defineProperty(nr.prototype,"ArrayType",{value:Int32Array});Object.defineProperty(Hf.prototype,"ArrayType",{value:fi});Object.defineProperty(Gf.prototype,"ArrayType",{value:Uint8Array});Object.defineProperty(Wf.prototype,"ArrayType",{value:Uint16Array});Object.defineProperty(Xf.prototype,"ArrayType",{value:Uint32Array});Object.defineProperty(qf.prototype,"ArrayType",{value:hi});var Pn=class extends Et{constructor(t){super(),this.precision=t}get typeId(){return P.Float}get ArrayType(){switch(this.precision){case Ie.HALF:return Uint16Array;case Ie.SINGLE:return Float32Array;case Ie.DOUBLE:return Float64Array}throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`)}toString(){return`Float${this.precision<<5||16}`}};W_=Symbol.toStringTag;Pn[W_]=(n=>(n.precision=null,n[Symbol.toStringTag]="Float"))(Pn.prototype);var Yf=class extends Pn{constructor(){super(Ie.HALF)}},jf=class extends Pn{constructor(){super(Ie.SINGLE)}},$f=class extends Pn{constructor(){super(Ie.DOUBLE)}};Object.defineProperty(Yf.prototype,"ArrayType",{value:Uint16Array});Object.defineProperty(jf.prototype,"ArrayType",{value:Float32Array});Object.defineProperty($f.prototype,"ArrayType",{value:Float64Array});var Tr=class extends Et{constructor(){super()}get typeId(){return P.Binary}toString(){return"Binary"}};X_=Symbol.toStringTag;Tr[X_]=(n=>(n.ArrayType=Uint8Array,n[Symbol.toStringTag]="Binary"))(Tr.prototype);var Ar=class extends Et{constructor(){super()}get typeId(){return P.Utf8}toString(){return"Utf8"}};q_=Symbol.toStringTag;Ar[q_]=(n=>(n.ArrayType=Uint8Array,n[Symbol.toStringTag]="Utf8"))(Ar.prototype);var Er=class extends Et{constructor(){super()}get typeId(){return P.Bool}toString(){return"Bool"}};Y_=Symbol.toStringTag;Er[Y_]=(n=>(n.ArrayType=Uint8Array,n[Symbol.toStringTag]="Bool"))(Er.prototype);var Cr=class extends Et{constructor(t,e,i=128){super(),this.scale=t,this.precision=e,this.bitWidth=i}get typeId(){return P.Decimal}toString(){return`Decimal[${this.precision}e${this.scale>0?"+":""}${this.scale}]`}};j_=Symbol.toStringTag;Cr[j_]=(n=>(n.scale=null,n.precision=null,n.ArrayType=Uint32Array,n[Symbol.toStringTag]="Decimal"))(Cr.prototype);var Ir=class extends Et{constructor(t){super(),this.unit=t}get typeId(){return P.Date}toString(){return`Date${(this.unit+1)*32}<${un[this.unit]}>`}};$_=Symbol.toStringTag;Ir[$_]=(n=>(n.unit=null,n.ArrayType=Int32Array,n[Symbol.toStringTag]="Date"))(Ir.prototype);var Ui=class extends Et{constructor(t,e){super(),this.unit=t,this.bitWidth=e}get typeId(){return P.Time}toString(){return`Time${this.bitWidth}<${ie[this.unit]}>`}get ArrayType(){switch(this.bitWidth){case 32:return Int32Array;case 64:return fi}throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`)}};Z_=Symbol.toStringTag;Ui[Z_]=(n=>(n.unit=null,n.bitWidth=null,n[Symbol.toStringTag]="Time"))(Ui.prototype);var Rr=class extends Et{constructor(t,e){super(),this.unit=t,this.timezone=e}get typeId(){return P.Timestamp}toString(){return`Timestamp<${ie[this.unit]}${this.timezone?`, ${this.timezone}`:""}>`}};J_=Symbol.toStringTag;Rr[J_]=(n=>(n.unit=null,n.timezone=null,n.ArrayType=Int32Array,n[Symbol.toStringTag]="Timestamp"))(Rr.prototype);var Dr=class extends Et{constructor(t){super(),this.unit=t}get typeId(){return P.Interval}toString(){return`Interval<${An[this.unit]}>`}};K_=Symbol.toStringTag;Dr[K_]=(n=>(n.unit=null,n.ArrayType=Int32Array,n[Symbol.toStringTag]="Interval"))(Dr.prototype);var Oi=class extends Et{constructor(t){super(),this.children=[t]}get typeId(){return P.List}toString(){return`List<${this.valueType}>`}get valueType(){return this.children[0].type}get valueField(){return this.children[0]}get ArrayType(){return this.valueType.ArrayType}};Q_=Symbol.toStringTag;Oi[Q_]=(n=>(n.children=null,n[Symbol.toStringTag]="List"))(Oi.prototype);var Te=class extends Et{constructor(t){super(),this.children=t}get typeId(){return P.Struct}toString(){return`Struct<{${this.children.map(t=>`${t.name}:${t.type}`).join(", ")}}>`}};tx=Symbol.toStringTag;Te[tx]=(n=>(n.children=null,n[Symbol.toStringTag]="Struct"))(Te.prototype);var Ni=class extends Et{constructor(t,e,i){super(),this.mode=t,this.children=i,this.typeIds=e=Int32Array.from(e),this.typeIdToChildIndex=e.reduce((r,s,o)=>(r[s]=o)&&r||r,Object.create(null))}get typeId(){return P.Union}toString(){return`${this[Symbol.toStringTag]}<${this.children.map(t=>`${t.type}`).join(" | ")}>`}};ex=Symbol.toStringTag;Ni[ex]=(n=>(n.mode=null,n.typeIds=null,n.children=null,n.typeIdToChildIndex=null,n.ArrayType=Int8Array,n[Symbol.toStringTag]="Union"))(Ni.prototype);var Pr=class extends Et{constructor(t){super(),this.byteWidth=t}get typeId(){return P.FixedSizeBinary}toString(){return`FixedSizeBinary[${this.byteWidth}]`}};nx=Symbol.toStringTag;Pr[nx]=(n=>(n.byteWidth=null,n.ArrayType=Uint8Array,n[Symbol.toStringTag]="FixedSizeBinary"))(Pr.prototype);var ki=class extends Et{constructor(t,e){super(),this.listSize=t,this.children=[e]}get typeId(){return P.FixedSizeList}get valueType(){return this.children[0].type}get valueField(){return this.children[0]}get ArrayType(){return this.valueType.ArrayType}toString(){return`FixedSizeList[${this.listSize}]<${this.valueType}>`}};ix=Symbol.toStringTag;ki[ix]=(n=>(n.children=null,n.listSize=null,n[Symbol.toStringTag]="FixedSizeList"))(ki.prototype);var zi=class extends Et{constructor(t,e=!1){super(),this.children=[t],this.keysSorted=e}get typeId(){return P.Map}get keyType(){return this.children[0].type.children[0].type}get valueType(){return this.children[0].type.children[1].type}get childType(){return this.children[0].type}toString(){return`Map<{${this.children[0].type.children.map(t=>`${t.name}:${t.type}`).join(", ")}}>`}};rx=Symbol.toStringTag;zi[rx]=(n=>(n.children=null,n.keysSorted=null,n[Symbol.toStringTag]="Map_"))(zi.prototype);var OA=(n=>()=>++n)(-1),$n=class extends Et{constructor(t,e,i,r){super(),this.indices=e,this.dictionary=t,this.isOrdered=r||!1,this.id=i==null?OA():typeof i=="number"?i:i.low}get typeId(){return P.Dictionary}get children(){return this.dictionary.children}get valueType(){return this.dictionary}get ArrayType(){return this.dictionary.ArrayType}toString(){return`Dictionary<${this.indices}, ${this.dictionary}>`}};sx=Symbol.toStringTag;$n[sx]=(n=>(n.id=null,n.indices=null,n.isOrdered=null,n.dictionary=null,n[Symbol.toStringTag]="Dictionary"))($n.prototype);function Zn(n){let t=n;switch(n.typeId){case P.Decimal:return n.bitWidth/32;case P.Timestamp:return 2;case P.Date:return 1+t.unit;case P.Interval:return 1+t.unit;case P.FixedSizeList:return t.listSize;case P.FixedSizeBinary:return t.byteWidth;default:return 1}}var It=class{visitMany(t,...e){return t.map((i,r)=>this.visit(i,...e.map(s=>s[r])))}visit(...t){return this.getVisitFn(t[0],!1).apply(this,t)}getVisitFn(t,e=!0){return NA(this,t,e)}getVisitFnByTypeId(t,e=!0){return ua(this,t,e)}visitNull(t,...e){return null}visitBool(t,...e){return null}visitInt(t,...e){return null}visitFloat(t,...e){return null}visitUtf8(t,...e){return null}visitBinary(t,...e){return null}visitFixedSizeBinary(t,...e){return null}visitDate(t,...e){return null}visitTimestamp(t,...e){return null}visitTime(t,...e){return null}visitDecimal(t,...e){return null}visitList(t,...e){return null}visitStruct(t,...e){return null}visitUnion(t,...e){return null}visitDictionary(t,...e){return null}visitInterval(t,...e){return null}visitFixedSizeList(t,...e){return null}visitMap(t,...e){return null}};function NA(n,t,e=!0){return typeof t=="number"?ua(n,t,e):typeof t=="string"&&t in P?ua(n,P[t],e):t&&t instanceof Et?ua(n,ox(t),e):t?.type&&t.type instanceof Et?ua(n,ox(t.type),e):ua(n,P.NONE,e)}function ua(n,t,e=!0){let i=null;switch(t){case P.Null:i=n.visitNull;break;case P.Bool:i=n.visitBool;break;case P.Int:i=n.visitInt;break;case P.Int8:i=n.visitInt8||n.visitInt;break;case P.Int16:i=n.visitInt16||n.visitInt;break;case P.Int32:i=n.visitInt32||n.visitInt;break;case P.Int64:i=n.visitInt64||n.visitInt;break;case P.Uint8:i=n.visitUint8||n.visitInt;break;case P.Uint16:i=n.visitUint16||n.visitInt;break;case P.Uint32:i=n.visitUint32||n.visitInt;break;case P.Uint64:i=n.visitUint64||n.visitInt;break;case P.Float:i=n.visitFloat;break;case P.Float16:i=n.visitFloat16||n.visitFloat;break;case P.Float32:i=n.visitFloat32||n.visitFloat;break;case P.Float64:i=n.visitFloat64||n.visitFloat;break;case P.Utf8:i=n.visitUtf8;break;case P.Binary:i=n.visitBinary;break;case P.FixedSizeBinary:i=n.visitFixedSizeBinary;break;case P.Date:i=n.visitDate;break;case P.DateDay:i=n.visitDateDay||n.visitDate;break;case P.DateMillisecond:i=n.visitDateMillisecond||n.visitDate;break;case P.Timestamp:i=n.visitTimestamp;break;case P.TimestampSecond:i=n.visitTimestampSecond||n.visitTimestamp;break;case P.TimestampMillisecond:i=n.visitTimestampMillisecond||n.visitTimestamp;break;case P.TimestampMicrosecond:i=n.visitTimestampMicrosecond||n.visitTimestamp;break;case P.TimestampNanosecond:i=n.visitTimestampNanosecond||n.visitTimestamp;break;case P.Time:i=n.visitTime;break;case P.TimeSecond:i=n.visitTimeSecond||n.visitTime;break;case P.TimeMillisecond:i=n.visitTimeMillisecond||n.visitTime;break;case P.TimeMicrosecond:i=n.visitTimeMicrosecond||n.visitTime;break;case P.TimeNanosecond:i=n.visitTimeNanosecond||n.visitTime;break;case P.Decimal:i=n.visitDecimal;break;case P.List:i=n.visitList;break;case P.Struct:i=n.visitStruct;break;case P.Union:i=n.visitUnion;break;case P.DenseUnion:i=n.visitDenseUnion||n.visitUnion;break;case P.SparseUnion:i=n.visitSparseUnion||n.visitUnion;break;case P.Dictionary:i=n.visitDictionary;break;case P.Interval:i=n.visitInterval;break;case P.IntervalDayTime:i=n.visitIntervalDayTime||n.visitInterval;break;case P.IntervalYearMonth:i=n.visitIntervalYearMonth||n.visitInterval;break;case P.FixedSizeList:i=n.visitFixedSizeList;break;case P.Map:i=n.visitMap;break}if(typeof i=="function")return i;if(!e)return()=>null;throw new Error(`Unrecognized type '${P[t]}'`)}function ox(n){switch(n.typeId){case P.Null:return P.Null;case P.Int:{let{bitWidth:t,isSigned:e}=n;switch(t){case 8:return e?P.Int8:P.Uint8;case 16:return e?P.Int16:P.Uint16;case 32:return e?P.Int32:P.Uint32;case 64:return e?P.Int64:P.Uint64}return P.Int}case P.Float:switch(n.precision){case Ie.HALF:return P.Float16;case Ie.SINGLE:return P.Float32;case Ie.DOUBLE:return P.Float64}return P.Float;case P.Binary:return P.Binary;case P.Utf8:return P.Utf8;case P.Bool:return P.Bool;case P.Decimal:return P.Decimal;case P.Time:switch(n.unit){case ie.SECOND:return P.TimeSecond;case ie.MILLISECOND:return P.TimeMillisecond;case ie.MICROSECOND:return P.TimeMicrosecond;case ie.NANOSECOND:return P.TimeNanosecond}return P.Time;case P.Timestamp:switch(n.unit){case ie.SECOND:return P.TimestampSecond;case ie.MILLISECOND:return P.TimestampMillisecond;case ie.MICROSECOND:return P.TimestampMicrosecond;case ie.NANOSECOND:return P.TimestampNanosecond}return P.Timestamp;case P.Date:switch(n.unit){case un.DAY:return P.DateDay;case un.MILLISECOND:return P.DateMillisecond}return P.Date;case P.Interval:switch(n.unit){case An.DAY_TIME:return P.IntervalDayTime;case An.YEAR_MONTH:return P.IntervalYearMonth}return P.Interval;case P.Map:return P.Map;case P.List:return P.List;case P.Struct:return P.Struct;case P.Union:switch(n.mode){case ke.Dense:return P.DenseUnion;case ke.Sparse:return P.SparseUnion}return P.Union;case P.FixedSizeBinary:return P.FixedSizeBinary;case P.FixedSizeList:return P.FixedSizeList;case P.Dictionary:return P.Dictionary}throw new Error(`Unrecognized type '${P[n.typeId]}'`)}It.prototype.visitInt8=null;It.prototype.visitInt16=null;It.prototype.visitInt32=null;It.prototype.visitInt64=null;It.prototype.visitUint8=null;It.prototype.visitUint16=null;It.prototype.visitUint32=null;It.prototype.visitUint64=null;It.prototype.visitFloat16=null;It.prototype.visitFloat32=null;It.prototype.visitFloat64=null;It.prototype.visitDateDay=null;It.prototype.visitDateMillisecond=null;It.prototype.visitTimestampSecond=null;It.prototype.visitTimestampMillisecond=null;It.prototype.visitTimestampMicrosecond=null;It.prototype.visitTimestampNanosecond=null;It.prototype.visitTimeSecond=null;It.prototype.visitTimeMillisecond=null;It.prototype.visitTimeMicrosecond=null;It.prototype.visitTimeNanosecond=null;It.prototype.visitDenseUnion=null;It.prototype.visitSparseUnion=null;It.prototype.visitIntervalDayTime=null;It.prototype.visitIntervalYearMonth=null;var sm={};To(sm,{float64ToUint16:()=>Cl,uint16ToFloat64:()=>Zf});var ax=new Float64Array(1),fa=new Uint32Array(ax.buffer);function Zf(n){let t=(n&31744)>>10,e=(n&1023)/1024,i=Math.pow(-1,(n&32768)>>15);switch(t){case 31:return i*(e?Number.NaN:1/0);case 0:return i*(e?6103515625e-14*e:0)}return i*Math.pow(2,t-15)*(1+e)}function Cl(n){if(n!==n)return 32256;ax[0]=n;let t=(fa[1]&2147483648)>>16&65535,e=fa[1]&2146435072,i=0;return e>=1089470464?fa[0]>0?e=31744:(e=(e&2080374784)>>16,i=(fa[1]&1048575)>>10):e<=1056964608?(i=1048576+(fa[1]&1048575),i=1048576+(i<<(e>>20)-998)>>21,e=0):(e=e-1056964608>>10,i=(fa[1]&1048575)+512>>10),t|e|i&65535}var zt=class extends It{};function $t(n){return(t,e,i)=>{if(t.setValid(e,i!=null))return n(t,e,i)}}var kA=(n,t,e)=>{n[t]=Math.trunc(e/864e5)},om=(n,t,e)=>{n[t]=Math.trunc(e%4294967296),n[t+1]=Math.trunc(e/4294967296)},zA=(n,t,e)=>{n[t]=Math.trunc(e*1e3%4294967296),n[t+1]=Math.trunc(e*1e3/4294967296)},VA=(n,t,e)=>{n[t]=Math.trunc(e*1e6%4294967296),n[t+1]=Math.trunc(e*1e6/4294967296)},lx=(n,t,e,i)=>{if(e+1<t.length){let{[e]:r,[e+1]:s}=t;n.set(i.subarray(0,s-r),r)}},HA=({offset:n,values:t},e,i)=>{let r=n+e;i?t[r>>3]|=1<<r%8:t[r>>3]&=~(1<<r%8)},Lr=({values:n},t,e)=>{n[t]=e},am=({values:n},t,e)=>{n[t]=e},cx=({values:n},t,e)=>{n[t]=Cl(e)},GA=(n,t,e)=>{switch(n.type.precision){case Ie.HALF:return cx(n,t,e);case Ie.SINGLE:case Ie.DOUBLE:return am(n,t,e)}},Jf=({values:n},t,e)=>{kA(n,t,e.valueOf())},Kf=({values:n},t,e)=>{om(n,t*2,e.valueOf())},lm=({stride:n,values:t},e,i)=>{t.set(i.subarray(0,n),n*e)},WA=({values:n,valueOffsets:t},e,i)=>lx(n,t,e,i),XA=({values:n,valueOffsets:t},e,i)=>{lx(n,t,e,hs(i))},cm=(n,t,e)=>{n.type.unit===un.DAY?Jf(n,t,e):Kf(n,t,e)},Qf=({values:n},t,e)=>om(n,t*2,e/1e3),th=({values:n},t,e)=>om(n,t*2,e),eh=({values:n},t,e)=>zA(n,t*2,e),nh=({values:n},t,e)=>VA(n,t*2,e),um=(n,t,e)=>{switch(n.type.unit){case ie.SECOND:return Qf(n,t,e);case ie.MILLISECOND:return th(n,t,e);case ie.MICROSECOND:return eh(n,t,e);case ie.NANOSECOND:return nh(n,t,e)}},ih=({values:n},t,e)=>{n[t]=e},rh=({values:n},t,e)=>{n[t]=e},sh=({values:n},t,e)=>{n[t]=e},oh=({values:n},t,e)=>{n[t]=e},fm=(n,t,e)=>{switch(n.type.unit){case ie.SECOND:return ih(n,t,e);case ie.MILLISECOND:return rh(n,t,e);case ie.MICROSECOND:return sh(n,t,e);case ie.NANOSECOND:return oh(n,t,e)}},hm=({values:n,stride:t},e,i)=>{n.set(i.subarray(0,t),t*e)},qA=(n,t,e)=>{let i=n.children[0],r=n.valueOffsets,s=fn.getVisitFn(i);if(Array.isArray(e))for(let o=-1,a=r[t],l=r[t+1];a<l;)s(i,a++,e[++o]);else for(let o=-1,a=r[t],l=r[t+1];a<l;)s(i,a++,e.get(++o))},YA=(n,t,e)=>{let i=n.children[0],{valueOffsets:r}=n,s=fn.getVisitFn(i),{[t]:o,[t+1]:a}=r,l=e instanceof Map?e.entries():Object.entries(e);for(let c of l)if(s(i,o,c),++o>=a)break},jA=(n,t)=>(e,i,r,s)=>i&&e(i,n,t[s]),$A=(n,t)=>(e,i,r,s)=>i&&e(i,n,t.get(s)),ZA=(n,t)=>(e,i,r,s)=>i&&e(i,n,t.get(r.name)),JA=(n,t)=>(e,i,r,s)=>i&&e(i,n,t[r.name]),KA=(n,t,e)=>{let i=n.type.children.map(s=>fn.getVisitFn(s.type)),r=e instanceof Map?ZA(t,e):e instanceof se?$A(t,e):Array.isArray(e)?jA(t,e):JA(t,e);n.type.children.forEach((s,o)=>r(i[o],n.children[o],s,o))},QA=(n,t,e)=>{n.type.mode===ke.Dense?ux(n,t,e):fx(n,t,e)},ux=(n,t,e)=>{let i=n.type.typeIdToChildIndex[n.typeIds[t]],r=n.children[i];fn.visit(r,n.valueOffsets[t],e)},fx=(n,t,e)=>{let i=n.type.typeIdToChildIndex[n.typeIds[t]],r=n.children[i];fn.visit(r,t,e)},tE=(n,t,e)=>{var i;(i=n.dictionary)===null||i===void 0||i.set(n.values[t],e)},dm=(n,t,e)=>{n.type.unit===An.DAY_TIME?ah(n,t,e):lh(n,t,e)},ah=({values:n},t,e)=>{n.set(e.subarray(0,2),2*t)},lh=({values:n},t,e)=>{n[t]=e[0]*12+e[1]%12},eE=(n,t,e)=>{let{stride:i}=n,r=n.children[0],s=fn.getVisitFn(r);if(Array.isArray(e))for(let o=-1,a=t*i;++o<i;)s(r,a+o,e[o]);else for(let o=-1,a=t*i;++o<i;)s(r,a+o,e.get(o))};zt.prototype.visitBool=$t(HA);zt.prototype.visitInt=$t(Lr);zt.prototype.visitInt8=$t(Lr);zt.prototype.visitInt16=$t(Lr);zt.prototype.visitInt32=$t(Lr);zt.prototype.visitInt64=$t(Lr);zt.prototype.visitUint8=$t(Lr);zt.prototype.visitUint16=$t(Lr);zt.prototype.visitUint32=$t(Lr);zt.prototype.visitUint64=$t(Lr);zt.prototype.visitFloat=$t(GA);zt.prototype.visitFloat16=$t(cx);zt.prototype.visitFloat32=$t(am);zt.prototype.visitFloat64=$t(am);zt.prototype.visitUtf8=$t(XA);zt.prototype.visitBinary=$t(WA);zt.prototype.visitFixedSizeBinary=$t(lm);zt.prototype.visitDate=$t(cm);zt.prototype.visitDateDay=$t(Jf);zt.prototype.visitDateMillisecond=$t(Kf);zt.prototype.visitTimestamp=$t(um);zt.prototype.visitTimestampSecond=$t(Qf);zt.prototype.visitTimestampMillisecond=$t(th);zt.prototype.visitTimestampMicrosecond=$t(eh);zt.prototype.visitTimestampNanosecond=$t(nh);zt.prototype.visitTime=$t(fm);zt.prototype.visitTimeSecond=$t(ih);zt.prototype.visitTimeMillisecond=$t(rh);zt.prototype.visitTimeMicrosecond=$t(sh);zt.prototype.visitTimeNanosecond=$t(oh);zt.prototype.visitDecimal=$t(hm);zt.prototype.visitList=$t(qA);zt.prototype.visitStruct=$t(KA);zt.prototype.visitUnion=$t(QA);zt.prototype.visitDenseUnion=$t(ux);zt.prototype.visitSparseUnion=$t(fx);zt.prototype.visitDictionary=$t(tE);zt.prototype.visitInterval=$t(dm);zt.prototype.visitIntervalDayTime=$t(ah);zt.prototype.visitIntervalYearMonth=$t(lh);zt.prototype.visitFixedSizeList=$t(eE);zt.prototype.visitMap=$t(YA);var fn=new zt;var Vi=Symbol.for("parent"),ha=Symbol.for("rowIndex"),ps=class{constructor(t,e){return this[Vi]=t,this[ha]=e,new Proxy(this,new mm)}toArray(){return Object.values(this.toJSON())}toJSON(){let t=this[ha],e=this[Vi],i=e.type.children,r={};for(let s=-1,o=i.length;++s<o;)r[i[s].name]=Ye.visit(e.children[s],t);return r}toString(){return`{${[...this].map(([t,e])=>`${Fi(t)}: ${Fi(e)}`).join(", ")}}`}[Symbol.for("nodejs.util.inspect.custom")](){return this.toString()}[Symbol.iterator](){return new pm(this[Vi],this[ha])}},pm=class{constructor(t,e){this.childIndex=0,this.children=t.children,this.rowIndex=e,this.childFields=t.type.children,this.numChildren=this.childFields.length}[Symbol.iterator](){return this}next(){let t=this.childIndex;return t<this.numChildren?(this.childIndex=t+1,{done:!1,value:[this.childFields[t].name,Ye.visit(this.children[t],this.rowIndex)]}):{done:!0,value:null}}};Object.defineProperties(ps.prototype,{[Symbol.toStringTag]:{enumerable:!1,configurable:!1,value:"Row"},[Vi]:{writable:!0,enumerable:!1,configurable:!1,value:null},[ha]:{writable:!0,enumerable:!1,configurable:!1,value:-1}});var mm=class{isExtensible(){return!1}deleteProperty(){return!1}preventExtensions(){return!0}ownKeys(t){return t[Vi].type.children.map(e=>e.name)}has(t,e){return t[Vi].type.children.findIndex(i=>i.name===e)!==-1}getOwnPropertyDescriptor(t,e){if(t[Vi].type.children.findIndex(i=>i.name===e)!==-1)return{writable:!0,enumerable:!0,configurable:!0}}get(t,e){if(Reflect.has(t,e))return t[e];let i=t[Vi].type.children.findIndex(r=>r.name===e);if(i!==-1){let r=Ye.visit(t[Vi].children[i],t[ha]);return Reflect.set(t,e,r),r}}set(t,e,i){let r=t[Vi].type.children.findIndex(s=>s.name===e);return r!==-1?(fn.visit(t[Vi].children[r],t[ha],i),Reflect.set(t,e,i)):Reflect.has(t,e)||typeof e=="symbol"?Reflect.set(t,e,i):!1}};var Ft=class extends It{};function Xt(n){return(t,e)=>t.getValid(e)?n(t,e):null}var nE=(n,t)=>864e5*n[t],gm=(n,t)=>4294967296*n[t+1]+(n[t]>>>0),iE=(n,t)=>4294967296*(n[t+1]/1e3)+(n[t]>>>0)/1e3,rE=(n,t)=>4294967296*(n[t+1]/1e6)+(n[t]>>>0)/1e6,hx=n=>new Date(n),sE=(n,t)=>hx(nE(n,t)),oE=(n,t)=>hx(gm(n,t)),aE=(n,t)=>null,dx=(n,t,e)=>{if(e+1>=t.length)return null;let i=t[e],r=t[e+1];return n.subarray(i,r)},lE=({offset:n,values:t},e)=>{let i=n+e;return(t[i>>3]&1<<i%8)!==0},px=({values:n},t)=>sE(n,t),mx=({values:n},t)=>oE(n,t*2),ms=({stride:n,values:t},e)=>t[n*e],cE=({stride:n,values:t},e)=>Zf(t[n*e]),gx=({values:n},t)=>n[t],uE=({stride:n,values:t},e)=>t.subarray(n*e,n*(e+1)),fE=({values:n,valueOffsets:t},e)=>dx(n,t,e),hE=({values:n,valueOffsets:t},e)=>{let i=dx(n,t,e);return i!==null?Ml(i):null},dE=({values:n},t)=>n[t],pE=({type:n,values:t},e)=>n.precision!==Ie.HALF?t[e]:Zf(t[e]),mE=(n,t)=>n.type.unit===un.DAY?px(n,t):mx(n,t),yx=({values:n},t)=>1e3*gm(n,t*2),_x=({values:n},t)=>gm(n,t*2),xx=({values:n},t)=>iE(n,t*2),vx=({values:n},t)=>rE(n,t*2),gE=(n,t)=>{switch(n.type.unit){case ie.SECOND:return yx(n,t);case ie.MILLISECOND:return _x(n,t);case ie.MICROSECOND:return xx(n,t);case ie.NANOSECOND:return vx(n,t)}},bx=({values:n},t)=>n[t],Sx=({values:n},t)=>n[t],Mx=({values:n},t)=>n[t],wx=({values:n},t)=>n[t],yE=(n,t)=>{switch(n.type.unit){case ie.SECOND:return bx(n,t);case ie.MILLISECOND:return Sx(n,t);case ie.MICROSECOND:return Mx(n,t);case ie.NANOSECOND:return wx(n,t)}},_E=({values:n,stride:t},e)=>El.decimal(n.subarray(t*e,t*(e+1))),xE=(n,t)=>{let{valueOffsets:e,stride:i,children:r}=n,{[t*i]:s,[t*i+1]:o}=e,l=r[0].slice(s,o-s);return new se([l])},vE=(n,t)=>{let{valueOffsets:e,children:i}=n,{[t]:r,[t+1]:s}=e,o=i[0];return new ir(o.slice(r,s-r))},bE=(n,t)=>new ps(n,t),SE=(n,t)=>n.type.mode===ke.Dense?Tx(n,t):Ax(n,t),Tx=(n,t)=>{let e=n.type.typeIdToChildIndex[n.typeIds[t]],i=n.children[e];return Ye.visit(i,n.valueOffsets[t])},Ax=(n,t)=>{let e=n.type.typeIdToChildIndex[n.typeIds[t]],i=n.children[e];return Ye.visit(i,t)},ME=(n,t)=>{var e;return(e=n.dictionary)===null||e===void 0?void 0:e.get(n.values[t])},wE=(n,t)=>n.type.unit===An.DAY_TIME?Ex(n,t):Cx(n,t),Ex=({values:n},t)=>n.subarray(2*t,2*(t+1)),Cx=({values:n},t)=>{let e=n[t],i=new Int32Array(2);return i[0]=Math.trunc(e/12),i[1]=Math.trunc(e%12),i},TE=(n,t)=>{let{stride:e,children:i}=n,s=i[0].slice(t*e,e);return new se([s])};Ft.prototype.visitNull=Xt(aE);Ft.prototype.visitBool=Xt(lE);Ft.prototype.visitInt=Xt(dE);Ft.prototype.visitInt8=Xt(ms);Ft.prototype.visitInt16=Xt(ms);Ft.prototype.visitInt32=Xt(ms);Ft.prototype.visitInt64=Xt(gx);Ft.prototype.visitUint8=Xt(ms);Ft.prototype.visitUint16=Xt(ms);Ft.prototype.visitUint32=Xt(ms);Ft.prototype.visitUint64=Xt(gx);Ft.prototype.visitFloat=Xt(pE);Ft.prototype.visitFloat16=Xt(cE);Ft.prototype.visitFloat32=Xt(ms);Ft.prototype.visitFloat64=Xt(ms);Ft.prototype.visitUtf8=Xt(hE);Ft.prototype.visitBinary=Xt(fE);Ft.prototype.visitFixedSizeBinary=Xt(uE);Ft.prototype.visitDate=Xt(mE);Ft.prototype.visitDateDay=Xt(px);Ft.prototype.visitDateMillisecond=Xt(mx);Ft.prototype.visitTimestamp=Xt(gE);Ft.prototype.visitTimestampSecond=Xt(yx);Ft.prototype.visitTimestampMillisecond=Xt(_x);Ft.prototype.visitTimestampMicrosecond=Xt(xx);Ft.prototype.visitTimestampNanosecond=Xt(vx);Ft.prototype.visitTime=Xt(yE);Ft.prototype.visitTimeSecond=Xt(bx);Ft.prototype.visitTimeMillisecond=Xt(Sx);Ft.prototype.visitTimeMicrosecond=Xt(Mx);Ft.prototype.visitTimeNanosecond=Xt(wx);Ft.prototype.visitDecimal=Xt(_E);Ft.prototype.visitList=Xt(xE);Ft.prototype.visitStruct=Xt(bE);Ft.prototype.visitUnion=Xt(SE);Ft.prototype.visitDenseUnion=Xt(Tx);Ft.prototype.visitSparseUnion=Xt(Ax);Ft.prototype.visitDictionary=Xt(ME);Ft.prototype.visitInterval=Xt(wE);Ft.prototype.visitIntervalDayTime=Xt(Ex);Ft.prototype.visitIntervalYearMonth=Xt(Cx);Ft.prototype.visitFixedSizeList=Xt(TE);Ft.prototype.visitMap=Xt(vE);var Ye=new Ft;var mi=Symbol.for("keys"),da=Symbol.for("vals"),ir=class{constructor(t){return this[mi]=new se([t.children[0]]).memoize(),this[da]=t.children[1],new Proxy(this,new _m)}[Symbol.iterator](){return new ym(this[mi],this[da])}get size(){return this[mi].length}toArray(){return Object.values(this.toJSON())}toJSON(){let t=this[mi],e=this[da],i={};for(let r=-1,s=t.length;++r<s;)i[t.get(r)]=Ye.visit(e,r);return i}toString(){return`{${[...this].map(([t,e])=>`${Fi(t)}: ${Fi(e)}`).join(", ")}}`}[Symbol.for("nodejs.util.inspect.custom")](){return this.toString()}},ym=class{constructor(t,e){this.keys=t,this.vals=e,this.keyIndex=0,this.numKeys=t.length}[Symbol.iterator](){return this}next(){let t=this.keyIndex;return t===this.numKeys?{done:!0,value:null}:(this.keyIndex++,{done:!1,value:[this.keys.get(t),Ye.visit(this.vals,t)]})}},_m=class{isExtensible(){return!1}deleteProperty(){return!1}preventExtensions(){return!0}ownKeys(t){return t[mi].toArray().map(String)}has(t,e){return t[mi].includes(e)}getOwnPropertyDescriptor(t,e){if(t[mi].indexOf(e)!==-1)return{writable:!0,enumerable:!0,configurable:!0}}get(t,e){if(Reflect.has(t,e))return t[e];let i=t[mi].indexOf(e);if(i!==-1){let r=Ye.visit(Reflect.get(t,da),i);return Reflect.set(t,e,r),r}}set(t,e,i){let r=t[mi].indexOf(e);return r!==-1?(fn.visit(Reflect.get(t,da),r,i),Reflect.set(t,e,i)):Reflect.has(t,e)?Reflect.set(t,e,i):!1}};Object.defineProperties(ir.prototype,{[Symbol.toStringTag]:{enumerable:!1,configurable:!1,value:"Row"},[mi]:{writable:!0,enumerable:!1,configurable:!1,value:null},[da]:{writable:!0,enumerable:!1,configurable:!1,value:null}});function AE(n,t,e){let i=n.length,r=t>-1?t:i+t%i;return e?e(n,r):r}var Ix;function Il(n,t,e,i){let{length:r=0}=n,s=typeof t!="number"?0:t,o=typeof e!="number"?r:e;return s<0&&(s=(s%r+r)%r),o<0&&(o=(o%r+r)%r),o<s&&(Ix=s,s=o,o=Ix),o>r&&(o=r),i?i(n,s,o):[s,o]}var Rx=n=>n!==n;function gs(n){if(typeof n!=="object"||n===null)return Rx(n)?Rx:e=>e===n;if(n instanceof Date){let e=n.valueOf();return i=>i instanceof Date?i.valueOf()===e:!1}return ArrayBuffer.isView(n)?e=>e?Qp(n,e):!1:n instanceof Map?CE(n):Array.isArray(n)?EE(n):n instanceof se?IE(n):RE(n,!0)}function EE(n){let t=[];for(let e=-1,i=n.length;++e<i;)t[e]=gs(n[e]);return ch(t)}function CE(n){let t=-1,e=[];for(let i of n.values())e[++t]=gs(i);return ch(e)}function IE(n){let t=[];for(let e=-1,i=n.length;++e<i;)t[e]=gs(n.get(e));return ch(t)}function RE(n,t=!1){let e=Object.keys(n);if(!t&&e.length===0)return()=>!1;let i=[];for(let r=-1,s=e.length;++r<s;)i[r]=gs(n[e[r]]);return ch(i,e)}function ch(n,t){return e=>{if(!e||typeof e!="object")return!1;switch(e.constructor){case Array:return DE(n,e);case Map:return Dx(n,e,e.keys());case ir:case ps:case Object:case void 0:return Dx(n,e,t||Object.keys(e))}return e instanceof se?PE(n,e):!1}}function DE(n,t){let e=n.length;if(t.length!==e)return!1;for(let i=-1;++i<e;)if(!n[i](t[i]))return!1;return!0}function PE(n,t){let e=n.length;if(t.length!==e)return!1;for(let i=-1;++i<e;)if(!n[i](t.get(i)))return!1;return!0}function Dx(n,t,e){let i=e[Symbol.iterator](),r=t instanceof Map?t.keys():Object.keys(t)[Symbol.iterator](),s=t instanceof Map?t.values():Object.values(t)[Symbol.iterator](),o=0,a=n.length,l=s.next(),c=i.next(),u=r.next();for(;o<a&&!c.done&&!u.done&&!l.done&&!(c.value!==u.value||!n[o](l.value));++o,c=i.next(),u=r.next(),l=s.next());return o===a&&c.done&&u.done&&l.done?!0:(i.return&&i.return(),r.return&&r.return(),s.return&&s.return(),!1)}var vm={};To(vm,{BitIterator:()=>Ks,getBit:()=>Px,getBool:()=>fh,packBools:()=>Qs,popcnt_array:()=>Lx,popcnt_bit_range:()=>Rl,popcnt_uint32:()=>uh,setBool:()=>LE,truncateBitmap:()=>pa});function fh(n,t,e,i){return(e&1<<i)!==0}function Px(n,t,e,i){return(e&1<<i)>>i}function LE(n,t,e){return e?!!(n[t>>3]|=1<<t%8)||!0:!(n[t>>3]&=~(1<<t%8))&&!1}function pa(n,t,e){let i=e.byteLength+7&-8;if(n>0||e.byteLength<i){let r=new Uint8Array(i);return r.set(n%8===0?e.subarray(n>>3):Qs(new Ks(e,n,t,null,fh)).subarray(0,i)),r}return e}function Qs(n){let t=[],e=0,i=0,r=0;for(let o of n)o&&(r|=1<<i),++i===8&&(t[e++]=r,r=i=0);(e===0||i>0)&&(t[e++]=r);let s=new Uint8Array(t.length+7&-8);return s.set(t),s}var Ks=class{constructor(t,e,i,r,s){this.bytes=t,this.length=i,this.context=r,this.get=s,this.bit=e%8,this.byteIndex=e>>3,this.byte=t[this.byteIndex++],this.index=0}next(){return this.index<this.length?(this.bit===8&&(this.bit=0,this.byte=this.bytes[this.byteIndex++]),{value:this.get(this.context,this.index++,this.byte,this.bit++)}):{done:!0,value:null}}[Symbol.iterator](){return this}};function Rl(n,t,e){if(e-t<=0)return 0;if(e-t<8){let s=0;for(let o of new Ks(n,t,e-t,n,Px))s+=o;return s}let i=e>>3<<3,r=t+(t%8===0?0:8-t%8);return Rl(n,t,r)+Rl(n,i,e)+Lx(n,r>>3,i-r>>3)}function Lx(n,t,e){let i=0,r=Math.trunc(t),s=new DataView(n.buffer,n.byteOffset,n.byteLength),o=e===void 0?n.byteLength:r+e;for(;o-r>=4;)i+=uh(s.getUint32(r)),r+=4;for(;o-r>=2;)i+=uh(s.getUint16(r)),r+=2;for(;o-r>=1;)i+=uh(s.getUint8(r)),r+=1;return i}function uh(n){let t=Math.trunc(n);return t=t-(t>>>1&1431655765),t=(t&858993459)+(t>>>2&858993459),(t+(t>>>4)&252645135)*16843009>>>24}var FE=-1,_e=class n{constructor(t,e,i,r,s,o=[],a){this.type=t,this.children=o,this.dictionary=a,this.offset=Math.floor(Math.max(e||0,0)),this.length=Math.floor(Math.max(i||0,0)),this._nullCount=Math.floor(Math.max(r||0,-1));let l;s instanceof n?(this.stride=s.stride,this.values=s.values,this.typeIds=s.typeIds,this.nullBitmap=s.nullBitmap,this.valueOffsets=s.valueOffsets):(this.stride=Zn(t),s&&((l=s[0])&&(this.valueOffsets=l),(l=s[1])&&(this.values=l),(l=s[2])&&(this.nullBitmap=l),(l=s[3])&&(this.typeIds=l))),this.nullable=this._nullCount!==0&&this.nullBitmap&&this.nullBitmap.byteLength>0}get typeId(){return this.type.typeId}get ArrayType(){return this.type.ArrayType}get buffers(){return[this.valueOffsets,this.values,this.nullBitmap,this.typeIds]}get byteLength(){let t=0,{valueOffsets:e,values:i,nullBitmap:r,typeIds:s}=this;return e&&(t+=e.byteLength),i&&(t+=i.byteLength),r&&(t+=r.byteLength),s&&(t+=s.byteLength),this.children.reduce((o,a)=>o+a.byteLength,t)}get nullCount(){let t=this._nullCount,e;return t<=FE&&(e=this.nullBitmap)&&(this._nullCount=t=this.length-Rl(e,this.offset,this.offset+this.length)),t}getValid(t){if(this.nullable&&this.nullCount>0){let e=this.offset+t;return(this.nullBitmap[e>>3]&1<<e%8)!==0}return!0}setValid(t,e){if(!this.nullable)return e;if(!this.nullBitmap||this.nullBitmap.byteLength<=t>>3){let{nullBitmap:l}=this._changeLengthAndBackfillNullBitmap(this.length);Object.assign(this,{nullBitmap:l,_nullCount:0})}let{nullBitmap:i,offset:r}=this,s=r+t>>3,o=(r+t)%8,a=i[s]>>o&1;return e?a===0&&(i[s]|=1<<o,this._nullCount=this.nullCount+1):a===1&&(i[s]&=~(1<<o),this._nullCount=this.nullCount-1),e}clone(t=this.type,e=this.offset,i=this.length,r=this._nullCount,s=this,o=this.children){return new n(t,e,i,r,s,o,this.dictionary)}slice(t,e){let{stride:i,typeId:r,children:s}=this,o=+(this._nullCount===0)-1,a=r===16?i:1,l=this._sliceBuffers(t,e,i,r);return this.clone(this.type,this.offset+t,e,o,l,s.length===0||this.valueOffsets?s:this._sliceChildren(s,a*t,a*e))}_changeLengthAndBackfillNullBitmap(t){if(this.typeId===P.Null)return this.clone(this.type,0,t,0);let{length:e,nullCount:i}=this,r=new Uint8Array((t+63&-64)>>3).fill(255,0,e>>3);r[e>>3]=(1<<e-(e&-8))-1,i>0&&r.set(pa(this.offset,e,this.nullBitmap),0);let s=this.buffers;return s[pi.VALIDITY]=r,this.clone(this.type,0,t,i+(t-e),s)}_sliceBuffers(t,e,i,r){let s,{buffers:o}=this;return(s=o[pi.TYPE])&&(o[pi.TYPE]=s.subarray(t,t+e)),(s=o[pi.OFFSET])&&(o[pi.OFFSET]=s.subarray(t,t+e+1))||(s=o[pi.DATA])&&(o[pi.DATA]=r===6?s:s.subarray(i*t,i*(t+e))),o}_sliceChildren(t,e,i){return t.map(r=>r.slice(e,i))}};_e.prototype.children=Object.freeze([]);var bm=class n extends It{visit(t){return this.getVisitFn(t.type).call(this,t)}visitNull(t){let{["type"]:e,["offset"]:i=0,["length"]:r=0}=t;return new _e(e,i,r,0)}visitBool(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length>>3,["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitInt(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length,["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitFloat(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length,["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitUtf8(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.data),s=kt(t.nullBitmap),o=Js(t.valueOffsets),{["length"]:a=o.length-1,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[o,r,s])}visitBinary(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.data),s=kt(t.nullBitmap),o=Js(t.valueOffsets),{["length"]:a=o.length-1,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[o,r,s])}visitFixedSizeBinary(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Zn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitDate(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Zn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitTimestamp(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Zn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitTime(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Zn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitDecimal(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Zn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitList(t){let{["type"]:e,["offset"]:i=0,["child"]:r}=t,s=kt(t.nullBitmap),o=Js(t.valueOffsets),{["length"]:a=o.length-1,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[o,void 0,s],[r])}visitStruct(t){let{["type"]:e,["offset"]:i=0,["children"]:r=[]}=t,s=kt(t.nullBitmap),{length:o=r.reduce((l,{length:c})=>Math.max(l,c),0),nullCount:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,void 0,s],r)}visitUnion(t){let{["type"]:e,["offset"]:i=0,["children"]:r=[]}=t,s=kt(t.nullBitmap),o=te(e.ArrayType,t.typeIds),{["length"]:a=o.length,["nullCount"]:l=t.nullBitmap?-1:0}=t;if(Et.isSparseUnion(e))return new _e(e,i,a,l,[void 0,void 0,s,o],r);let c=Js(t.valueOffsets);return new _e(e,i,a,l,[c,void 0,s,o],r)}visitDictionary(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.indices.ArrayType,t.data),{["dictionary"]:o=new se([new n().visit({type:e.dictionary})])}=t,{["length"]:a=s.length,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[void 0,s,r],[],o)}visitInterval(t){let{["type"]:e,["offset"]:i=0}=t,r=kt(t.nullBitmap),s=te(e.ArrayType,t.data),{["length"]:o=s.length/Zn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,s,r])}visitFixedSizeList(t){let{["type"]:e,["offset"]:i=0,["child"]:r=new n().visit({type:e.valueType})}=t,s=kt(t.nullBitmap),{["length"]:o=r.length/Zn(e),["nullCount"]:a=t.nullBitmap?-1:0}=t;return new _e(e,i,o,a,[void 0,void 0,s],[r])}visitMap(t){let{["type"]:e,["offset"]:i=0,["child"]:r=new n().visit({type:e.childType})}=t,s=kt(t.nullBitmap),o=Js(t.valueOffsets),{["length"]:a=o.length-1,["nullCount"]:l=t.nullBitmap?-1:0}=t;return new _e(e,i,a,l,[o,void 0,s],[r])}};function Gt(n){return new bm().visit(n)}var Dl=class{constructor(t=0,e){this.numChunks=t,this.getChunkIterator=e,this.chunkIndex=0,this.chunkIterator=this.getChunkIterator(0)}next(){for(;this.chunkIndex<this.numChunks;){let t=this.chunkIterator.next();if(!t.done)return t;++this.chunkIndex<this.numChunks&&(this.chunkIterator=this.getChunkIterator(this.chunkIndex))}return{done:!0,value:null}}[Symbol.iterator](){return this}};function hh(n){return n.reduce((t,e)=>t+e.nullCount,0)}function dh(n){return n.reduce((t,e,i)=>(t[i+1]=t[i]+e.length,t),new Uint32Array(n.length+1))}function ph(n,t,e,i){let r=[];for(let s=-1,o=n.length;++s<o;){let a=n[s],l=t[s],{length:c}=a;if(l>=i)break;if(e>=l+c)continue;if(l>=e&&l+c<=i){r.push(a);continue}let u=Math.max(0,e-l),f=Math.min(i-l,c);r.push(a.slice(u,f-u))}return r.length===0&&r.push(n[0].slice(0,0)),r}function Sm(n,t,e,i){let r=0,s=0,o=t.length-1;do{if(r>=o-1)return e<t[o]?i(n,r,e-t[r]):null;s=r+Math.trunc((o-r)*.5),e<t[s]?o=s:r=s}while(r<o)}function Pl(n,t){return n.getValid(t)}function ys(n){function t(e,i,r){return n(e[i],r)}return function(e){let i=this.data;return Sm(i,this._offsets,e,t)}}function mh(n){let t;function e(i,r,s){return n(i[r],s,t)}return function(i,r){let s=this.data;t=r;let o=Sm(s,this._offsets,i,e);return t=void 0,o}}function gh(n){let t;function e(i,r,s){let o=s,a=0,l=0;for(let c=r-1,u=i.length;++c<u;){let f=i[c];if(~(a=n(f,t,o)))return l+a;o=0,l+=f.length}return-1}return function(i,r){t=i;let s=this.data,o=typeof r!="number"?e(s,0,0):Sm(s,this._offsets,r,e);return t=void 0,o}}var Bt=class extends It{};function BE(n,t){return t===null&&n.length>0?0:-1}function UE(n,t){let{nullBitmap:e}=n;if(!e||n.nullCount<=0)return-1;let i=0;for(let r of new Ks(e,n.offset+(t||0),n.length,e,fh)){if(!r)return i;++i}return-1}function ee(n,t,e){if(t===void 0)return-1;if(t===null)return UE(n,e);let i=Ye.getVisitFn(n),r=gs(t);for(let s=(e||0)-1,o=n.length;++s<o;)if(r(i(n,s)))return s;return-1}function Fx(n,t,e){let i=Ye.getVisitFn(n),r=gs(t);for(let s=(e||0)-1,o=n.length;++s<o;)if(r(i(n,s)))return s;return-1}Bt.prototype.visitNull=BE;Bt.prototype.visitBool=ee;Bt.prototype.visitInt=ee;Bt.prototype.visitInt8=ee;Bt.prototype.visitInt16=ee;Bt.prototype.visitInt32=ee;Bt.prototype.visitInt64=ee;Bt.prototype.visitUint8=ee;Bt.prototype.visitUint16=ee;Bt.prototype.visitUint32=ee;Bt.prototype.visitUint64=ee;Bt.prototype.visitFloat=ee;Bt.prototype.visitFloat16=ee;Bt.prototype.visitFloat32=ee;Bt.prototype.visitFloat64=ee;Bt.prototype.visitUtf8=ee;Bt.prototype.visitBinary=ee;Bt.prototype.visitFixedSizeBinary=ee;Bt.prototype.visitDate=ee;Bt.prototype.visitDateDay=ee;Bt.prototype.visitDateMillisecond=ee;Bt.prototype.visitTimestamp=ee;Bt.prototype.visitTimestampSecond=ee;Bt.prototype.visitTimestampMillisecond=ee;Bt.prototype.visitTimestampMicrosecond=ee;Bt.prototype.visitTimestampNanosecond=ee;Bt.prototype.visitTime=ee;Bt.prototype.visitTimeSecond=ee;Bt.prototype.visitTimeMillisecond=ee;Bt.prototype.visitTimeMicrosecond=ee;Bt.prototype.visitTimeNanosecond=ee;Bt.prototype.visitDecimal=ee;Bt.prototype.visitList=ee;Bt.prototype.visitStruct=ee;Bt.prototype.visitUnion=ee;Bt.prototype.visitDenseUnion=Fx;Bt.prototype.visitSparseUnion=Fx;Bt.prototype.visitDictionary=ee;Bt.prototype.visitInterval=ee;Bt.prototype.visitIntervalDayTime=ee;Bt.prototype.visitIntervalYearMonth=ee;Bt.prototype.visitFixedSizeList=ee;Bt.prototype.visitMap=ee;var to=new Bt;var Ut=class extends It{};function qt(n){let{type:t}=n;if(n.nullCount===0&&n.stride===1&&(t.typeId===P.Timestamp||t instanceof We&&t.bitWidth!==64||t instanceof Ui&&t.bitWidth!==64||t instanceof Pn&&t.precision!==Ie.HALF))return new Dl(n.data.length,i=>{let r=n.data[i];return r.values.subarray(0,r.length)[Symbol.iterator]()});let e=0;return new Dl(n.data.length,i=>{let s=n.data[i].length,o=n.slice(e,e+s);return e+=s,new Mm(o)})}var Mm=class{constructor(t){this.vector=t,this.index=0}next(){return this.index<this.vector.length?{value:this.vector.get(this.index++)}:{done:!0,value:null}}[Symbol.iterator](){return this}};Ut.prototype.visitNull=qt;Ut.prototype.visitBool=qt;Ut.prototype.visitInt=qt;Ut.prototype.visitInt8=qt;Ut.prototype.visitInt16=qt;Ut.prototype.visitInt32=qt;Ut.prototype.visitInt64=qt;Ut.prototype.visitUint8=qt;Ut.prototype.visitUint16=qt;Ut.prototype.visitUint32=qt;Ut.prototype.visitUint64=qt;Ut.prototype.visitFloat=qt;Ut.prototype.visitFloat16=qt;Ut.prototype.visitFloat32=qt;Ut.prototype.visitFloat64=qt;Ut.prototype.visitUtf8=qt;Ut.prototype.visitBinary=qt;Ut.prototype.visitFixedSizeBinary=qt;Ut.prototype.visitDate=qt;Ut.prototype.visitDateDay=qt;Ut.prototype.visitDateMillisecond=qt;Ut.prototype.visitTimestamp=qt;Ut.prototype.visitTimestampSecond=qt;Ut.prototype.visitTimestampMillisecond=qt;Ut.prototype.visitTimestampMicrosecond=qt;Ut.prototype.visitTimestampNanosecond=qt;Ut.prototype.visitTime=qt;Ut.prototype.visitTimeSecond=qt;Ut.prototype.visitTimeMillisecond=qt;Ut.prototype.visitTimeMicrosecond=qt;Ut.prototype.visitTimeNanosecond=qt;Ut.prototype.visitDecimal=qt;Ut.prototype.visitList=qt;Ut.prototype.visitStruct=qt;Ut.prototype.visitUnion=qt;Ut.prototype.visitDenseUnion=qt;Ut.prototype.visitSparseUnion=qt;Ut.prototype.visitDictionary=qt;Ut.prototype.visitInterval=qt;Ut.prototype.visitIntervalDayTime=qt;Ut.prototype.visitIntervalYearMonth=qt;Ut.prototype.visitFixedSizeList=qt;Ut.prototype.visitMap=qt;var ma=new Ut;var OE=(n,t)=>n+t,rr=class extends It{visitNull(t,e){return 0}visitInt(t,e){return t.type.bitWidth/8}visitFloat(t,e){return t.type.ArrayType.BYTES_PER_ELEMENT}visitBool(t,e){return 1/8}visitDecimal(t,e){return t.type.bitWidth/8}visitDate(t,e){return(t.type.unit+1)*4}visitTime(t,e){return t.type.bitWidth/8}visitTimestamp(t,e){return t.type.unit===ie.SECOND?4:8}visitInterval(t,e){return(t.type.unit+1)*4}visitStruct(t,e){return t.children.reduce((i,r)=>i+Jn.visit(r,e),0)}visitFixedSizeBinary(t,e){return t.type.byteWidth}visitMap(t,e){return 8+t.children.reduce((i,r)=>i+Jn.visit(r,e),0)}visitDictionary(t,e){var i;return t.type.indices.bitWidth/8+(((i=t.dictionary)===null||i===void 0?void 0:i.getByteLength(t.values[e]))||0)}},NE=({valueOffsets:n},t)=>8+(n[t+1]-n[t]),kE=({valueOffsets:n},t)=>8+(n[t+1]-n[t]),zE=({valueOffsets:n,stride:t,children:e},i)=>{let r=e[0],{[i*t]:s}=n,{[i*t+1]:o}=n,a=Jn.getVisitFn(r.type),l=r.slice(s,o-s),c=8;for(let u=-1,f=o-s;++u<f;)c+=a(l,u);return c},VE=({stride:n,children:t},e)=>{let i=t[0],r=i.slice(e*n,n),s=Jn.getVisitFn(i.type),o=0;for(let a=-1,l=r.length;++a<l;)o+=s(r,a);return o},HE=(n,t)=>n.type.mode===ke.Dense?Bx(n,t):Ux(n,t),Bx=({type:n,children:t,typeIds:e,valueOffsets:i},r)=>{let s=n.typeIdToChildIndex[e[r]];return 8+Jn.visit(t[s],i[r])},Ux=({children:n},t)=>4+Jn.visitMany(n,n.map(()=>t)).reduce(OE,0);rr.prototype.visitUtf8=NE;rr.prototype.visitBinary=kE;rr.prototype.visitList=zE;rr.prototype.visitFixedSizeList=VE;rr.prototype.visitUnion=HE;rr.prototype.visitDenseUnion=Bx;rr.prototype.visitSparseUnion=Ux;var Jn=new rr;var Ox,Nx={},kx={},se=class n{constructor(t){var e,i,r;let s=t[0]instanceof n?t.flatMap(a=>a.data):t;if(s.length===0||s.some(a=>!(a instanceof _e)))throw new TypeError("Vector constructor expects an Array of Data instances.");let o=(e=s[0])===null||e===void 0?void 0:e.type;switch(s.length){case 0:this._offsets=[0];break;case 1:{let{get:a,set:l,indexOf:c,byteLength:u}=Nx[o.typeId],f=s[0];this.isValid=h=>Pl(f,h),this.get=h=>a(f,h),this.set=(h,p)=>l(f,h,p),this.indexOf=h=>c(f,h),this.getByteLength=h=>u(f,h),this._offsets=[0,f.length];break}default:Object.setPrototypeOf(this,kx[o.typeId]),this._offsets=dh(s);break}this.data=s,this.type=o,this.stride=Zn(o),this.numChildren=(r=(i=o.children)===null||i===void 0?void 0:i.length)!==null&&r!==void 0?r:0,this.length=this._offsets[this._offsets.length-1]}get byteLength(){return this._byteLength===-1&&(this._byteLength=this.data.reduce((t,e)=>t+e.byteLength,0)),this._byteLength}get nullCount(){return this._nullCount===-1&&(this._nullCount=hh(this.data)),this._nullCount}get ArrayType(){return this.type.ArrayType}get[Symbol.toStringTag](){return`${this.VectorName}<${this.type[Symbol.toStringTag]}>`}get VectorName(){return`${P[this.type.typeId]}Vector`}isValid(t){return!1}get(t){return null}set(t,e){}indexOf(t,e){return-1}includes(t,e){return this.indexOf(t,e)>0}getByteLength(t){return 0}[Symbol.iterator](){return ma.visit(this)}concat(...t){return new n(this.data.concat(t.flatMap(e=>e.data).flat(Number.POSITIVE_INFINITY)))}slice(t,e){return new n(Il(this,t,e,({data:i,_offsets:r},s,o)=>ph(i,r,s,o)))}toJSON(){return[...this]}toArray(){let{type:t,data:e,length:i,stride:r,ArrayType:s}=this;switch(t.typeId){case P.Int:case P.Float:case P.Decimal:case P.Time:case P.Timestamp:switch(e.length){case 0:return new s;case 1:return e[0].values.subarray(0,i*r);default:return e.reduce((o,{values:a,length:l})=>(o.array.set(a.subarray(0,l*r),o.offset),o.offset+=l*r,o),{array:new s(i*r),offset:0}).array}}return[...this]}toString(){return`[${[...this].join(",")}]`}getChild(t){var e;return this.getChildAt((e=this.type.children)===null||e===void 0?void 0:e.findIndex(i=>i.name===t))}getChildAt(t){return t>-1&&t<this.numChildren?new n(this.data.map(({children:e})=>e[t])):null}get isMemoized(){return Et.isDictionary(this.type)?this.data[0].dictionary.isMemoized:!1}memoize(){if(Et.isDictionary(this.type)){let t=new yh(this.data[0].dictionary),e=this.data.map(i=>{let r=i.clone();return r.dictionary=t,r});return new n(e)}return new yh(this)}unmemoize(){if(Et.isDictionary(this.type)&&this.isMemoized){let t=this.data[0].dictionary.unmemoize(),e=this.data.map(i=>{let r=i.clone();return r.dictionary=t,r});return new n(e)}return this}};Ox=Symbol.toStringTag;se[Ox]=(n=>{n.type=Et.prototype,n.data=[],n.length=0,n.stride=1,n.numChildren=0,n._nullCount=-1,n._byteLength=-1,n._offsets=new Uint32Array([0]),n[Symbol.isConcatSpreadable]=!0;let t=Object.keys(P).map(e=>P[e]).filter(e=>typeof e=="number"&&e!==P.NONE);for(let e of t){let i=Ye.getVisitFnByTypeId(e),r=fn.getVisitFnByTypeId(e),s=to.getVisitFnByTypeId(e),o=Jn.getVisitFnByTypeId(e);Nx[e]={get:i,set:r,indexOf:s,byteLength:o},kx[e]=Object.create(n,{isValid:{value:ys(Pl)},get:{value:ys(Ye.getVisitFnByTypeId(e))},set:{value:mh(fn.getVisitFnByTypeId(e))},indexOf:{value:gh(to.getVisitFnByTypeId(e))},getByteLength:{value:ys(Jn.getVisitFnByTypeId(e))}})}return"Vector"})(se.prototype);var yh=class n extends se{constructor(t){super(t.data);let e=this.get,i=this.set,r=this.slice,s=new Array(this.length);Object.defineProperty(this,"get",{value(o){let a=s[o];if(a!==void 0)return a;let l=e.call(this,o);return s[o]=l,l}}),Object.defineProperty(this,"set",{value(o,a){i.call(this,o,a),s[o]=a}}),Object.defineProperty(this,"slice",{value:(o,a)=>new n(r.call(this,o,a))}),Object.defineProperty(this,"isMemoized",{value:!0}),Object.defineProperty(this,"unmemoize",{value:()=>new se(this.data)}),Object.defineProperty(this,"memoize",{value:()=>this})}};function zx(n){if(!n||n.length<=0)return function(r){return!0};let t="",e=n.filter(i=>i===i);return e.length>0&&(t=`
    switch (x) {${e.map(i=>`
        case ${GE(i)}:`).join("")}
            return false;
    }`),n.length!==e.length&&(t=`if (x !== x) return false;
${t}`),new Function("x",`${t}
return true;`)}function GE(n){return typeof n!="bigint"?Fi(n):Df?`${Fi(n)}n`:`"${Fi(n)}"`}var wm=(n,t)=>(Math.ceil(n)*t+63&-64||64)/t,WE=(n,t=0)=>n.length>=t?n.subarray(0,t):aa(new n.constructor(t),n,0),_s=class{constructor(t,e=1){this.buffer=t,this.stride=e,this.BYTES_PER_ELEMENT=t.BYTES_PER_ELEMENT,this.ArrayType=t.constructor,this._resize(this.length=Math.ceil(t.length/e))}get byteLength(){return Math.ceil(this.length*this.stride)*this.BYTES_PER_ELEMENT}get reservedLength(){return this.buffer.length/this.stride}get reservedByteLength(){return this.buffer.byteLength}set(t,e){return this}append(t){return this.set(this.length,t)}reserve(t){if(t>0){this.length+=t;let e=this.stride,i=this.length*e,r=this.buffer.length;i>=r&&this._resize(r===0?wm(i*1,this.BYTES_PER_ELEMENT):wm(i*2,this.BYTES_PER_ELEMENT))}return this}flush(t=this.length){t=wm(t*this.stride,this.BYTES_PER_ELEMENT);let e=WE(this.buffer,t);return this.clear(),e}clear(){return this.length=0,this._resize(0),this}_resize(t){return this.buffer=aa(new this.ArrayType(t),this.buffer)}};_s.prototype.offset=0;var Fr=class extends _s{last(){return this.get(this.length-1)}get(t){return this.buffer[t]}set(t,e){return this.reserve(t-this.length+1),this.buffer[t*this.stride]=e,this}},ga=class extends Fr{constructor(t=new Uint8Array(0)){super(t,1/8),this.numValid=0}get numInvalid(){return this.length-this.numValid}get(t){return this.buffer[t>>3]>>t%8&1}set(t,e){let{buffer:i}=this.reserve(t-this.length+1),r=t>>3,s=t%8,o=i[r]>>s&1;return e?o===0&&(i[r]|=1<<s,++this.numValid):o===1&&(i[r]&=~(1<<s),--this.numValid),this}clear(){return this.numValid=0,super.clear()}},ya=class extends Fr{constructor(t=new Int32Array(1)){super(t,1)}append(t){return this.set(this.length-1,t)}set(t,e){let i=this.length-1,r=this.reserve(t-i+1).buffer;return i<t++&&r.fill(r[i],i,t),r[t]=r[t-1]+e,this}flush(t=this.length-1){return t>this.length&&this.set(t-1,0),super.flush(t+1)}};var Re=class{constructor({type:t,nullValues:e}){this.length=0,this.finished=!1,this.type=t,this.children=[],this.nullValues=e,this.stride=Zn(t),this._nulls=new ga,e&&e.length>0&&(this._isValid=zx(e))}static throughNode(t){throw new Error('"throughNode" not available in this environment')}static throughDOM(t){throw new Error('"throughDOM" not available in this environment')}toVector(){return new se([this.flush()])}get ArrayType(){return this.type.ArrayType}get nullCount(){return this._nulls.numInvalid}get numChildren(){return this.children.length}get byteLength(){let t=0,{_offsets:e,_values:i,_nulls:r,_typeIds:s,children:o}=this;return e&&(t+=e.byteLength),i&&(t+=i.byteLength),r&&(t+=r.byteLength),s&&(t+=s.byteLength),o.reduce((a,l)=>a+l.byteLength,t)}get reservedLength(){return this._nulls.reservedLength}get reservedByteLength(){let t=0;return this._offsets&&(t+=this._offsets.reservedByteLength),this._values&&(t+=this._values.reservedByteLength),this._nulls&&(t+=this._nulls.reservedByteLength),this._typeIds&&(t+=this._typeIds.reservedByteLength),this.children.reduce((e,i)=>e+i.reservedByteLength,t)}get valueOffsets(){return this._offsets?this._offsets.buffer:null}get values(){return this._values?this._values.buffer:null}get nullBitmap(){return this._nulls?this._nulls.buffer:null}get typeIds(){return this._typeIds?this._typeIds.buffer:null}append(t){return this.set(this.length,t)}isValid(t){return this._isValid(t)}set(t,e){return this.setValid(t,this.isValid(e))&&this.setValue(t,e),this}setValue(t,e){this._setValue(this,t,e)}setValid(t,e){return this.length=this._nulls.set(t,+e).length,e}addChild(t,e=`${this.numChildren}`){throw new Error(`Cannot append children to non-nested type "${this.type}"`)}getChildAt(t){return this.children[t]||null}flush(){let t,e,i,r,{type:s,length:o,nullCount:a,_typeIds:l,_offsets:c,_values:u,_nulls:f}=this;(e=l?.flush(o))?r=c?.flush(o):(r=c?.flush(o))?t=u?.flush(c.last()):t=u?.flush(o),a>0&&(i=f?.flush(o));let h=this.children.map(p=>p.flush());return this.clear(),Gt({type:s,length:o,nullCount:a,children:h,child:h[0],data:t,typeIds:e,nullBitmap:i,valueOffsets:r})}finish(){this.finished=!0;for(let t of this.children)t.finish();return this}clear(){var t,e,i,r;this.length=0,(t=this._nulls)===null||t===void 0||t.clear(),(e=this._values)===null||e===void 0||e.clear(),(i=this._offsets)===null||i===void 0||i.clear(),(r=this._typeIds)===null||r===void 0||r.clear();for(let s of this.children)s.clear();return this}};Re.prototype.length=1;Re.prototype.stride=1;Re.prototype.children=null;Re.prototype.finished=!1;Re.prototype.nullValues=null;Re.prototype._isValid=()=>!0;var sn=class extends Re{constructor(t){super(t),this._values=new Fr(new this.ArrayType(0),this.stride)}setValue(t,e){let i=this._values;return i.reserve(t-i.length+1),super.setValue(t,e)}},sr=class extends Re{constructor(t){super(t),this._pendingLength=0,this._offsets=new ya}setValue(t,e){let i=this._pending||(this._pending=new Map),r=i.get(t);r&&(this._pendingLength-=r.length),this._pendingLength+=e instanceof ir?e[mi].length:e.length,i.set(t,e)}setValid(t,e){return super.setValid(t,e)?!0:((this._pending||(this._pending=new Map)).set(t,void 0),!1)}clear(){return this._pendingLength=0,this._pending=void 0,super.clear()}flush(){return this._flush(),super.flush()}finish(){return this._flush(),super.finish()}_flush(){let t=this._pending,e=this._pendingLength;return this._pendingLength=0,this._pending=void 0,t&&t.size>0&&this._flushPending(t,e),this}};var eo=class{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}offset(){return this.bb.readInt64(this.bb_pos)}metaDataLength(){return this.bb.readInt32(this.bb_pos+8)}bodyLength(){return this.bb.readInt64(this.bb_pos+16)}static sizeOf(){return 24}static createBlock(t,e,i,r){return t.prep(8,24),t.writeInt64(r),t.pad(4),t.writeInt32(i),t.writeInt64(e),t.offset()}};var or=new Int32Array(2),_h=new Float32Array(or.buffer),xh=new Float64Array(or.buffer),_a=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;var hn=class n{constructor(t,e){this.low=t|0,this.high=e|0}static create(t,e){return t==0&&e==0?n.ZERO:new n(t,e)}toFloat64(){return(this.low>>>0)+this.high*4294967296}equals(t){return this.low==t.low&&this.high==t.high}};hn.ZERO=new hn(0,0);var Ll;(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(Ll||(Ll={}));var Kn=class n{constructor(t){this.bytes_=t,this.position_=0}static allocate(t){return new n(new Uint8Array(t))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(t){this.position_=t}capacity(){return this.bytes_.length}readInt8(t){return this.readUint8(t)<<24>>24}readUint8(t){return this.bytes_[t]}readInt16(t){return this.readUint16(t)<<16>>16}readUint16(t){return this.bytes_[t]|this.bytes_[t+1]<<8}readInt32(t){return this.bytes_[t]|this.bytes_[t+1]<<8|this.bytes_[t+2]<<16|this.bytes_[t+3]<<24}readUint32(t){return this.readInt32(t)>>>0}readInt64(t){return new hn(this.readInt32(t),this.readInt32(t+4))}readUint64(t){return new hn(this.readUint32(t),this.readUint32(t+4))}readFloat32(t){return or[0]=this.readInt32(t),_h[0]}readFloat64(t){return or[_a?0:1]=this.readInt32(t),or[_a?1:0]=this.readInt32(t+4),xh[0]}writeInt8(t,e){this.bytes_[t]=e}writeUint8(t,e){this.bytes_[t]=e}writeInt16(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8}writeUint16(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8}writeInt32(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8,this.bytes_[t+2]=e>>16,this.bytes_[t+3]=e>>24}writeUint32(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8,this.bytes_[t+2]=e>>16,this.bytes_[t+3]=e>>24}writeInt64(t,e){this.writeInt32(t,e.low),this.writeInt32(t+4,e.high)}writeUint64(t,e){this.writeUint32(t,e.low),this.writeUint32(t+4,e.high)}writeFloat32(t,e){_h[0]=e,this.writeInt32(t,or[0])}writeFloat64(t,e){xh[0]=e,this.writeInt32(t,or[_a?0:1]),this.writeInt32(t+4,or[_a?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+4+4)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let t="";for(let e=0;e<4;e++)t+=String.fromCharCode(this.readInt8(this.position_+4+e));return t}__offset(t,e){let i=t-this.readInt32(t);return e<this.readInt16(i)?this.readInt16(i+e):0}__union(t,e){return t.bb_pos=e+this.readInt32(e),t.bb=this,t}__string(t,e){t+=this.readInt32(t);let i=this.readInt32(t),r="",s=0;if(t+=4,e===Ll.UTF8_BYTES)return this.bytes_.subarray(t,t+i);for(;s<i;){let o,a=this.readUint8(t+s++);if(a<192)o=a;else{let l=this.readUint8(t+s++);if(a<224)o=(a&31)<<6|l&63;else{let c=this.readUint8(t+s++);if(a<240)o=(a&15)<<12|(l&63)<<6|c&63;else{let u=this.readUint8(t+s++);o=(a&7)<<18|(l&63)<<12|(c&63)<<6|u&63}}}o<65536?r+=String.fromCharCode(o):(o-=65536,r+=String.fromCharCode((o>>10)+55296,(o&1023)+56320))}return r}__union_with_string(t,e){return typeof t=="string"?this.__string(e):this.__union(t,e)}__indirect(t){return t+this.readInt32(t)}__vector(t){return t+this.readInt32(t)+4}__vector_len(t){return this.readInt32(t+this.readInt32(t))}__has_identifier(t){if(t.length!=4)throw new Error("FlatBuffers: file identifier must be length "+4);for(let e=0;e<4;e++)if(t.charCodeAt(e)!=this.readInt8(this.position()+4+e))return!1;return!0}createLong(t,e){return hn.create(t,e)}createScalarList(t,e){let i=[];for(let r=0;r<e;++r)t(r)!==null&&i.push(t(r));return i}createObjList(t,e){let i=[];for(let r=0;r<e;++r){let s=t(r);s!==null&&i.push(s.unpack())}return i}};var no=class n{constructor(t){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null;let e;t?e=t:e=1024,this.bb=Kn.allocate(e),this.space=e}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(t){this.force_defaults=t}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(t,e){t>this.minalign&&(this.minalign=t);let i=~(this.bb.capacity()-this.space+e)+1&t-1;for(;this.space<i+t+e;){let r=this.bb.capacity();this.bb=n.growByteBuffer(this.bb),this.space+=this.bb.capacity()-r}this.pad(i)}pad(t){for(let e=0;e<t;e++)this.bb.writeInt8(--this.space,0)}writeInt8(t){this.bb.writeInt8(this.space-=1,t)}writeInt16(t){this.bb.writeInt16(this.space-=2,t)}writeInt32(t){this.bb.writeInt32(this.space-=4,t)}writeInt64(t){this.bb.writeInt64(this.space-=8,t)}writeFloat32(t){this.bb.writeFloat32(this.space-=4,t)}writeFloat64(t){this.bb.writeFloat64(this.space-=8,t)}addInt8(t){this.prep(1,0),this.writeInt8(t)}addInt16(t){this.prep(2,0),this.writeInt16(t)}addInt32(t){this.prep(4,0),this.writeInt32(t)}addInt64(t){this.prep(8,0),this.writeInt64(t)}addFloat32(t){this.prep(4,0),this.writeFloat32(t)}addFloat64(t){this.prep(8,0),this.writeFloat64(t)}addFieldInt8(t,e,i){(this.force_defaults||e!=i)&&(this.addInt8(e),this.slot(t))}addFieldInt16(t,e,i){(this.force_defaults||e!=i)&&(this.addInt16(e),this.slot(t))}addFieldInt32(t,e,i){(this.force_defaults||e!=i)&&(this.addInt32(e),this.slot(t))}addFieldInt64(t,e,i){(this.force_defaults||!e.equals(i))&&(this.addInt64(e),this.slot(t))}addFieldFloat32(t,e,i){(this.force_defaults||e!=i)&&(this.addFloat32(e),this.slot(t))}addFieldFloat64(t,e,i){(this.force_defaults||e!=i)&&(this.addFloat64(e),this.slot(t))}addFieldOffset(t,e,i){(this.force_defaults||e!=i)&&(this.addOffset(e),this.slot(t))}addFieldStruct(t,e,i){e!=i&&(this.nested(e),this.slot(t))}nested(t){if(t!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")}slot(t){this.vtable!==null&&(this.vtable[t]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(t){let e=t.capacity();if(e&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let i=e<<1,r=Kn.allocate(i);return r.setPosition(i-e),r.bytes().set(t.bytes(),i-e),r}addOffset(t){this.prep(4,0),this.writeInt32(this.offset()-t+4)}startObject(t){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=t;for(let e=0;e<t;e++)this.vtable[e]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let t=this.offset(),e=this.vtable_in_use-1;for(;e>=0&&this.vtable[e]==0;e--);let i=e+1;for(;e>=0;e--)this.addInt16(this.vtable[e]!=0?t-this.vtable[e]:0);let r=2;this.addInt16(t-this.object_start);let s=(i+r)*2;this.addInt16(s);let o=0,a=this.space;t:for(e=0;e<this.vtables.length;e++){let l=this.bb.capacity()-this.vtables[e];if(s==this.bb.readInt16(l)){for(let c=2;c<s;c+=2)if(this.bb.readInt16(a+c)!=this.bb.readInt16(l+c))continue t;o=this.vtables[e];break}}return o?(this.space=this.bb.capacity()-t,this.bb.writeInt32(this.space,o-t)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-t,this.offset()-t)),this.isNested=!1,t}finish(t,e,i){let r=i?4:0;if(e){let s=e;if(this.prep(this.minalign,8+r),s.length!=4)throw new Error("FlatBuffers: file identifier must be length "+4);for(let o=3;o>=0;o--)this.writeInt8(s.charCodeAt(o))}this.prep(this.minalign,4+r),this.addOffset(t),r&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(t,e){this.finish(t,e,!0)}requiredField(t,e){let i=this.bb.capacity()-t,r=i-this.bb.readInt32(i);if(!(this.bb.readInt16(r+e)!=0))throw new Error("FlatBuffers: field "+e+" must be set")}startVector(t,e,i){this.notNested(),this.vector_num_elems=e,this.prep(4,t*e),this.prep(i,t*e)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(t){if(!t)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(t))return this.string_maps.get(t);let e=this.createString(t);return this.string_maps.set(t,e),e}createString(t){if(!t)return 0;let e;if(t instanceof Uint8Array)e=t;else{e=[];let i=0;for(;i<t.length;){let r,s=t.charCodeAt(i++);if(s<55296||s>=56320)r=s;else{let o=t.charCodeAt(i++);r=(s<<10)+o+-56613888}r<128?e.push(r):(r<2048?e.push(r>>6&31|192):(r<65536?e.push(r>>12&15|224):e.push(r>>18&7|240,r>>12&63|128),e.push(r>>6&63|128)),e.push(r&63|128))}}this.addInt8(0),this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length);for(let i=0,r=this.space,s=this.bb.bytes();i<e.length;i++)s[r++]=e[i];return this.endVector()}createLong(t,e){return hn.create(t,e)}createObjectOffset(t){return t===null?0:typeof t=="string"?this.createString(t):t.pack(this)}createObjectOffsetList(t){let e=[];for(let i=0;i<t.length;++i){let r=t[i];if(r!==null)e.push(this.createObjectOffset(r));else throw new Error("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return e}createStructOffsetList(t,e){return e(this,t.length),this.createObjectOffsetList(t),this.endVector()}};var Ke=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsKeyValue(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsKeyValue(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}key(t){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__string(this.bb_pos+e,t):null}value(t){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__string(this.bb_pos+e,t):null}static startKeyValue(t){t.startObject(2)}static addKey(t,e){t.addFieldOffset(0,e,0)}static addValue(t,e){t.addFieldOffset(1,e,0)}static endKeyValue(t){return t.endObject()}static createKeyValue(t,e,i){return n.startKeyValue(t),n.addKey(t,e),n.addValue(t,i),n.endKeyValue(t)}};var xs;(function(n){n[n.V1=0]="V1",n[n.V2=1]="V2",n[n.V3=2]="V3",n[n.V4=3]="V4",n[n.V5=4]="V5"})(xs||(xs={}));var vs;(function(n){n[n.Little=0]="Little",n[n.Big=1]="Big"})(vs||(vs={}));var Fl;(function(n){n[n.DenseArray=0]="DenseArray"})(Fl||(Fl={}));var Gi=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsInt(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsInt(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}bitWidth(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt32(this.bb_pos+t):0}isSigned(){let t=this.bb.__offset(this.bb_pos,6);return t?!!this.bb.readInt8(this.bb_pos+t):!1}static startInt(t){t.startObject(2)}static addBitWidth(t,e){t.addFieldInt32(0,e,0)}static addIsSigned(t,e){t.addFieldInt8(1,+e,0)}static endInt(t){return t.endObject()}static createInt(t,e,i){return n.startInt(t),n.addBitWidth(t,e),n.addIsSigned(t,i),n.endInt(t)}};var ar=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDictionaryEncoding(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDictionaryEncoding(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}id(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt64(this.bb_pos+t):this.bb.createLong(0,0)}indexType(t){let e=this.bb.__offset(this.bb_pos,6);return e?(t||new Gi).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}isOrdered(){let t=this.bb.__offset(this.bb_pos,8);return t?!!this.bb.readInt8(this.bb_pos+t):!1}dictionaryKind(){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt16(this.bb_pos+t):Fl.DenseArray}static startDictionaryEncoding(t){t.startObject(4)}static addId(t,e){t.addFieldInt64(0,e,t.createLong(0,0))}static addIndexType(t,e){t.addFieldOffset(1,e,0)}static addIsOrdered(t,e){t.addFieldInt8(2,+e,0)}static addDictionaryKind(t,e){t.addFieldInt16(3,e,Fl.DenseArray)}static endDictionaryEncoding(t){return t.endObject()}};var Bl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsBinary(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsBinary(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startBinary(t){t.startObject(0)}static endBinary(t){return t.endObject()}static createBinary(t){return n.startBinary(t),n.endBinary(t)}};var Ul=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsBool(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsBool(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startBool(t){t.startObject(0)}static endBool(t){return t.endObject()}static createBool(t){return n.startBool(t),n.endBool(t)}};var Ol;(function(n){n[n.DAY=0]="DAY",n[n.MILLISECOND=1]="MILLISECOND"})(Ol||(Ol={}));var bs=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDate(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDate(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}unit(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Ol.MILLISECOND}static startDate(t){t.startObject(1)}static addUnit(t,e){t.addFieldInt16(0,e,Ol.MILLISECOND)}static endDate(t){return t.endObject()}static createDate(t,e){return n.startDate(t),n.addUnit(t,e),n.endDate(t)}};var lr=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDecimal(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDecimal(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}precision(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt32(this.bb_pos+t):0}scale(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt32(this.bb_pos+t):0}bitWidth(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt32(this.bb_pos+t):128}static startDecimal(t){t.startObject(3)}static addPrecision(t,e){t.addFieldInt32(0,e,0)}static addScale(t,e){t.addFieldInt32(1,e,0)}static addBitWidth(t,e){t.addFieldInt32(2,e,128)}static endDecimal(t){return t.endObject()}static createDecimal(t,e,i,r){return n.startDecimal(t),n.addPrecision(t,e),n.addScale(t,i),n.addBitWidth(t,r),n.endDecimal(t)}};var Ss;(function(n){n[n.SECOND=0]="SECOND",n[n.MILLISECOND=1]="MILLISECOND",n[n.MICROSECOND=2]="MICROSECOND",n[n.NANOSECOND=3]="NANOSECOND"})(Ss||(Ss={}));var Ms=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsFixedSizeBinary(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsFixedSizeBinary(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}byteWidth(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt32(this.bb_pos+t):0}static startFixedSizeBinary(t){t.startObject(1)}static addByteWidth(t,e){t.addFieldInt32(0,e,0)}static endFixedSizeBinary(t){return t.endObject()}static createFixedSizeBinary(t,e){return n.startFixedSizeBinary(t),n.addByteWidth(t,e),n.endFixedSizeBinary(t)}};var ws=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsFixedSizeList(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsFixedSizeList(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}listSize(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt32(this.bb_pos+t):0}static startFixedSizeList(t){t.startObject(1)}static addListSize(t,e){t.addFieldInt32(0,e,0)}static endFixedSizeList(t){return t.endObject()}static createFixedSizeList(t,e){return n.startFixedSizeList(t),n.addListSize(t,e),n.endFixedSizeList(t)}};var Nl;(function(n){n[n.HALF=0]="HALF",n[n.SINGLE=1]="SINGLE",n[n.DOUBLE=2]="DOUBLE"})(Nl||(Nl={}));var Ts=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsFloatingPoint(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsFloatingPoint(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}precision(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Nl.HALF}static startFloatingPoint(t){t.startObject(1)}static addPrecision(t,e){t.addFieldInt16(0,e,Nl.HALF)}static endFloatingPoint(t){return t.endObject()}static createFloatingPoint(t,e){return n.startFloatingPoint(t),n.addPrecision(t,e),n.endFloatingPoint(t)}};var kl;(function(n){n[n.YEAR_MONTH=0]="YEAR_MONTH",n[n.DAY_TIME=1]="DAY_TIME",n[n.MONTH_DAY_NANO=2]="MONTH_DAY_NANO"})(kl||(kl={}));var As=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsInterval(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsInterval(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}unit(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):kl.YEAR_MONTH}static startInterval(t){t.startObject(1)}static addUnit(t,e){t.addFieldInt16(0,e,kl.YEAR_MONTH)}static endInterval(t){return t.endObject()}static createInterval(t,e){return n.startInterval(t),n.addUnit(t,e),n.endInterval(t)}};var zl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsList(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsList(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startList(t){t.startObject(0)}static endList(t){return t.endObject()}static createList(t){return n.startList(t),n.endList(t)}};var Es=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsMap(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMap(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}keysSorted(){let t=this.bb.__offset(this.bb_pos,4);return t?!!this.bb.readInt8(this.bb_pos+t):!1}static startMap(t){t.startObject(1)}static addKeysSorted(t,e){t.addFieldInt8(0,+e,0)}static endMap(t){return t.endObject()}static createMap(t,e){return n.startMap(t),n.addKeysSorted(t,e),n.endMap(t)}};var Vl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsNull(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNull(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startNull(t){t.startObject(0)}static endNull(t){return t.endObject()}static createNull(t){return n.startNull(t),n.endNull(t)}};var Hl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsStruct_(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsStruct_(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startStruct_(t){t.startObject(0)}static endStruct_(t){return t.endObject()}static createStruct_(t){return n.startStruct_(t),n.endStruct_(t)}};var Br=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsTime(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTime(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}unit(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Ss.MILLISECOND}bitWidth(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt32(this.bb_pos+t):32}static startTime(t){t.startObject(2)}static addUnit(t,e){t.addFieldInt16(0,e,Ss.MILLISECOND)}static addBitWidth(t,e){t.addFieldInt32(1,e,32)}static endTime(t){return t.endObject()}static createTime(t,e,i){return n.startTime(t),n.addUnit(t,e),n.addBitWidth(t,i),n.endTime(t)}};var Ur=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsTimestamp(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsTimestamp(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}unit(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Ss.SECOND}timezone(t){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__string(this.bb_pos+e,t):null}static startTimestamp(t){t.startObject(2)}static addUnit(t,e){t.addFieldInt16(0,e,Ss.SECOND)}static addTimezone(t,e){t.addFieldOffset(1,e,0)}static endTimestamp(t){return t.endObject()}static createTimestamp(t,e,i){return n.startTimestamp(t),n.addUnit(t,e),n.addTimezone(t,i),n.endTimestamp(t)}};var Gl;(function(n){n[n.Sparse=0]="Sparse",n[n.Dense=1]="Dense"})(Gl||(Gl={}));var Wi=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsUnion(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsUnion(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}mode(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):Gl.Sparse}typeIds(t){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt32(this.bb.__vector(this.bb_pos+e)+t*4):0}typeIdsLength(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}typeIdsArray(){let t=this.bb.__offset(this.bb_pos,6);return t?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}static startUnion(t){t.startObject(2)}static addMode(t,e){t.addFieldInt16(0,e,Gl.Sparse)}static addTypeIds(t,e){t.addFieldOffset(1,e,0)}static createTypeIdsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addInt32(e[i]);return t.endVector()}static startTypeIdsVector(t,e){t.startVector(4,e,4)}static endUnion(t){return t.endObject()}static createUnion(t,e,i){return n.startUnion(t),n.addMode(t,e),n.addTypeIds(t,i),n.endUnion(t)}};var Wl=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsUtf8(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsUtf8(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static startUtf8(t){t.startObject(0)}static endUtf8(t){return t.endObject()}static createUtf8(t){return n.startUtf8(t),n.endUtf8(t)}};var De;(function(n){n[n.NONE=0]="NONE",n[n.Null=1]="Null",n[n.Int=2]="Int",n[n.FloatingPoint=3]="FloatingPoint",n[n.Binary=4]="Binary",n[n.Utf8=5]="Utf8",n[n.Bool=6]="Bool",n[n.Decimal=7]="Decimal",n[n.Date=8]="Date",n[n.Time=9]="Time",n[n.Timestamp=10]="Timestamp",n[n.Interval=11]="Interval",n[n.List=12]="List",n[n.Struct_=13]="Struct_",n[n.Union=14]="Union",n[n.FixedSizeBinary=15]="FixedSizeBinary",n[n.FixedSizeList=16]="FixedSizeList",n[n.Map=17]="Map",n[n.Duration=18]="Duration",n[n.LargeBinary=19]="LargeBinary",n[n.LargeUtf8=20]="LargeUtf8",n[n.LargeList=21]="LargeList"})(De||(De={}));var xn=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsField(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsField(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}name(t){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__string(this.bb_pos+e,t):null}nullable(){let t=this.bb.__offset(this.bb_pos,6);return t?!!this.bb.readInt8(this.bb_pos+t):!1}typeType(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readUint8(this.bb_pos+t):De.NONE}type(t){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__union(t,this.bb_pos+e):null}dictionary(t){let e=this.bb.__offset(this.bb_pos,12);return e?(t||new ar).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}children(t,e){let i=this.bb.__offset(this.bb_pos,14);return i?(e||new n).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}childrenLength(){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__vector_len(this.bb_pos+t):0}customMetadata(t,e){let i=this.bb.__offset(this.bb_pos,16);return i?(e||new Ke).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}customMetadataLength(){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__vector_len(this.bb_pos+t):0}static startField(t){t.startObject(7)}static addName(t,e){t.addFieldOffset(0,e,0)}static addNullable(t,e){t.addFieldInt8(1,+e,0)}static addTypeType(t,e){t.addFieldInt8(2,e,De.NONE)}static addType(t,e){t.addFieldOffset(3,e,0)}static addDictionary(t,e){t.addFieldOffset(4,e,0)}static addChildren(t,e){t.addFieldOffset(5,e,0)}static createChildrenVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startChildrenVector(t,e){t.startVector(4,e,4)}static addCustomMetadata(t,e){t.addFieldOffset(6,e,0)}static createCustomMetadataVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startCustomMetadataVector(t,e){t.startVector(4,e,4)}static endField(t){return t.endObject()}};var Ln=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsSchema(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsSchema(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}endianness(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):vs.Little}fields(t,e){let i=this.bb.__offset(this.bb_pos,6);return i?(e||new xn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}fieldsLength(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}customMetadata(t,e){let i=this.bb.__offset(this.bb_pos,8);return i?(e||new Ke).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}customMetadataLength(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}features(t){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt64(this.bb.__vector(this.bb_pos+e)+t*8):this.bb.createLong(0,0)}featuresLength(){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__vector_len(this.bb_pos+t):0}static startSchema(t){t.startObject(4)}static addEndianness(t,e){t.addFieldInt16(0,e,vs.Little)}static addFields(t,e){t.addFieldOffset(1,e,0)}static createFieldsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startFieldsVector(t,e){t.startVector(4,e,4)}static addCustomMetadata(t,e){t.addFieldOffset(2,e,0)}static createCustomMetadataVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startCustomMetadataVector(t,e){t.startVector(4,e,4)}static addFeatures(t,e){t.addFieldOffset(3,e,0)}static createFeaturesVector(t,e){t.startVector(8,e.length,8);for(let i=e.length-1;i>=0;i--)t.addInt64(e[i]);return t.endVector()}static startFeaturesVector(t,e){t.startVector(8,e,8)}static endSchema(t){return t.endObject()}static finishSchemaBuffer(t,e){t.finish(e)}static finishSizePrefixedSchemaBuffer(t,e){t.finish(e,void 0,!0)}static createSchema(t,e,i,r,s){return n.startSchema(t),n.addEndianness(t,e),n.addFields(t,i),n.addCustomMetadata(t,r),n.addFeatures(t,s),n.endSchema(t)}};var Qn=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsFooter(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsFooter(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}version(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):xs.V1}schema(t){let e=this.bb.__offset(this.bb_pos,6);return e?(t||new Ln).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}dictionaries(t,e){let i=this.bb.__offset(this.bb_pos,8);return i?(e||new eo).__init(this.bb.__vector(this.bb_pos+i)+t*24,this.bb):null}dictionariesLength(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}recordBatches(t,e){let i=this.bb.__offset(this.bb_pos,10);return i?(e||new eo).__init(this.bb.__vector(this.bb_pos+i)+t*24,this.bb):null}recordBatchesLength(){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__vector_len(this.bb_pos+t):0}customMetadata(t,e){let i=this.bb.__offset(this.bb_pos,12);return i?(e||new Ke).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}customMetadataLength(){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__vector_len(this.bb_pos+t):0}static startFooter(t){t.startObject(5)}static addVersion(t,e){t.addFieldInt16(0,e,xs.V1)}static addSchema(t,e){t.addFieldOffset(1,e,0)}static addDictionaries(t,e){t.addFieldOffset(2,e,0)}static startDictionariesVector(t,e){t.startVector(24,e,8)}static addRecordBatches(t,e){t.addFieldOffset(3,e,0)}static startRecordBatchesVector(t,e){t.startVector(24,e,8)}static addCustomMetadata(t,e){t.addFieldOffset(4,e,0)}static createCustomMetadataVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startCustomMetadataVector(t,e){t.startVector(4,e,4)}static endFooter(t){return t.endObject()}static finishFooterBuffer(t,e){t.finish(e)}static finishSizePrefixedFooterBuffer(t,e){t.finish(e,void 0,!0)}};var he=class n{constructor(t=[],e,i){this.fields=t||[],this.metadata=e||new Map,i||(i=Tm(t)),this.dictionaries=i}get[Symbol.toStringTag](){return"Schema"}get names(){return this.fields.map(t=>t.name)}toString(){return`Schema<{ ${this.fields.map((t,e)=>`${e}: ${t}`).join(", ")} }>`}select(t){let e=new Set(t),i=this.fields.filter(r=>e.has(r.name));return new n(i,this.metadata)}selectAt(t){let e=t.map(i=>this.fields[i]).filter(Boolean);return new n(e,this.metadata)}assign(...t){let e=t[0]instanceof n?t[0]:Array.isArray(t[0])?new n(t[0]):new n(t),i=[...this.fields],r=bh(bh(new Map,this.metadata),e.metadata),s=e.fields.filter(a=>{let l=i.findIndex(c=>c.name===a.name);return~l?(i[l]=a.clone({metadata:bh(bh(new Map,i[l].metadata),a.metadata)}))&&!1:!0}),o=Tm(s,new Map);return new n([...i,...s],r,new Map([...this.dictionaries,...o]))}};he.prototype.fields=null;he.prototype.metadata=null;he.prototype.dictionaries=null;var ne=class n{constructor(t,e,i=!1,r){this.name=t,this.type=e,this.nullable=i,this.metadata=r||new Map}static new(...t){let[e,i,r,s]=t;return t[0]&&typeof t[0]=="object"&&({name:e}=t[0],i===void 0&&(i=t[0].type),r===void 0&&(r=t[0].nullable),s===void 0&&(s=t[0].metadata)),new n(`${e}`,i,r,s)}get typeId(){return this.type.typeId}get[Symbol.toStringTag](){return"Field"}toString(){return`${this.name}: ${this.type}`}clone(...t){let[e,i,r,s]=t;return!t[0]||typeof t[0]!="object"?[e=this.name,i=this.type,r=this.nullable,s=this.metadata]=t:{name:e=this.name,type:i=this.type,nullable:r=this.nullable,metadata:s=this.metadata}=t[0],n.new(e,i,r,s)}};ne.prototype.type=null;ne.prototype.name=null;ne.prototype.nullable=null;ne.prototype.metadata=null;function bh(n,t){return new Map([...n||new Map,...t||new Map])}function Tm(n,t=new Map){for(let e=-1,i=n.length;++e<i;){let s=n[e].type;if(Et.isDictionary(s)){if(!t.has(s.id))t.set(s.id,s.dictionary);else if(t.get(s.id)!==s.dictionary)throw new Error("Cannot create Schema containing two different dictionaries with the same Id")}s.children&&s.children.length>0&&Tm(s.children,t)}return t}var Vx=hn,XE=no,qE=Kn,Or=class{constructor(t,e=rn.V4,i,r){this.schema=t,this.version=e,i&&(this._recordBatches=i),r&&(this._dictionaryBatches=r)}static decode(t){t=new qE(kt(t));let e=Qn.getRootAsFooter(t),i=he.decode(e.schema());return new Am(i,e)}static encode(t){let e=new XE,i=he.encode(e,t.schema);Qn.startRecordBatchesVector(e,t.numRecordBatches);for(let o of[...t.recordBatches()].slice().reverse())Nr.encode(e,o);let r=e.endVector();Qn.startDictionariesVector(e,t.numDictionaries);for(let o of[...t.dictionaryBatches()].slice().reverse())Nr.encode(e,o);let s=e.endVector();return Qn.startFooter(e),Qn.addSchema(e,i),Qn.addVersion(e,rn.V4),Qn.addRecordBatches(e,r),Qn.addDictionaries(e,s),Qn.finishFooterBuffer(e,Qn.endFooter(e)),e.asUint8Array()}get numRecordBatches(){return this._recordBatches.length}get numDictionaries(){return this._dictionaryBatches.length}*recordBatches(){for(let t,e=-1,i=this.numRecordBatches;++e<i;)(t=this.getRecordBatch(e))&&(yield t)}*dictionaryBatches(){for(let t,e=-1,i=this.numDictionaries;++e<i;)(t=this.getDictionaryBatch(e))&&(yield t)}getRecordBatch(t){return t>=0&&t<this.numRecordBatches&&this._recordBatches[t]||null}getDictionaryBatch(t){return t>=0&&t<this.numDictionaries&&this._dictionaryBatches[t]||null}};var Am=class extends Or{constructor(t,e){super(t,e.version()),this._footer=e}get numRecordBatches(){return this._footer.recordBatchesLength()}get numDictionaries(){return this._footer.dictionariesLength()}getRecordBatch(t){if(t>=0&&t<this.numRecordBatches){let e=this._footer.recordBatches(t);if(e)return Nr.decode(e)}return null}getDictionaryBatch(t){if(t>=0&&t<this.numDictionaries){let e=this._footer.dictionaries(t);if(e)return Nr.decode(e)}return null}},Nr=class n{constructor(t,e,i){this.metaDataLength=t,this.offset=typeof i=="number"?i:i.low,this.bodyLength=typeof e=="number"?e:e.low}static decode(t){return new n(t.metaDataLength(),t.bodyLength(),t.offset())}static encode(t,e){let{metaDataLength:i}=e,r=new Vx(e.offset,0),s=new Vx(e.bodyLength,0);return eo.createBlock(t,r,i,s)}};var Ae=Object.freeze({done:!0,value:void 0}),Xl=class{constructor(t){this._json=t}get schema(){return this._json.schema}get batches(){return this._json.batches||[]}get dictionaries(){return this._json.dictionaries||[]}},io=class{tee(){return this._getDOMStream().tee()}pipe(t,e){return this._getNodeStream().pipe(t,e)}pipeTo(t,e){return this._getDOMStream().pipeTo(t,e)}pipeThrough(t,e){return this._getDOMStream().pipeThrough(t,e)}_getDOMStream(){return this._DOMStream||(this._DOMStream=this.toDOMStream())}_getNodeStream(){return this._nodeStream||(this._nodeStream=this.toNodeStream())}},Sh=class extends io{constructor(){super(),this._values=[],this.resolvers=[],this._closedPromise=new Promise(t=>this._closedPromiseResolve=t)}get closed(){return this._closedPromise}cancel(t){return ut(this,void 0,void 0,function*(){yield this.return(t)})}write(t){this._ensureOpen()&&(this.resolvers.length<=0?this._values.push(t):this.resolvers.shift().resolve({done:!1,value:t}))}abort(t){this._closedPromiseResolve&&(this.resolvers.length<=0?this._error={error:t}:this.resolvers.shift().reject({done:!0,value:t}))}close(){if(this._closedPromiseResolve){let{resolvers:t}=this;for(;t.length>0;)t.shift().resolve(Ae);this._closedPromiseResolve(),this._closedPromiseResolve=void 0}}[Symbol.asyncIterator](){return this}toDOMStream(t){return cn.toDOMStream(this._closedPromiseResolve||this._error?this:this._values,t)}toNodeStream(t){return cn.toNodeStream(this._closedPromiseResolve||this._error?this:this._values,t)}throw(t){return ut(this,void 0,void 0,function*(){return yield this.abort(t),Ae})}return(t){return ut(this,void 0,void 0,function*(){return yield this.close(),Ae})}read(t){return ut(this,void 0,void 0,function*(){return(yield this.next(t,"read")).value})}peek(t){return ut(this,void 0,void 0,function*(){return(yield this.next(t,"peek")).value})}next(...t){return this._values.length>0?Promise.resolve({done:!1,value:this._values.shift()}):this._error?Promise.reject({done:!0,value:this._error.error}):this._closedPromiseResolve?new Promise((e,i)=>{this.resolvers.push({resolve:e,reject:i})}):Promise.resolve(Ae)}_ensureOpen(){if(this._closedPromiseResolve)return!0;throw new Error("AsyncQueue is closed")}};var cr=class extends Sh{write(t){if((t=kt(t)).byteLength>0)return super.write(t)}toString(t=!1){return t?Ml(this.toUint8Array(!0)):this.toUint8Array(!1).then(Ml)}toUint8Array(t=!1){return t?jn(this._values)[0]:ut(this,void 0,void 0,function*(){var e,i;let r=[],s=0;try{for(var o=Di(this),a;a=yield o.next(),!a.done;){let l=a.value;r.push(l),s+=l.byteLength}}catch(l){e={error:l}}finally{try{a&&!a.done&&(i=o.return)&&(yield i.call(o))}finally{if(e)throw e.error}}return jn(r,s)[0]})}},ur=class{constructor(t){t&&(this.source=new Em(cn.fromIterable(t)))}[Symbol.iterator](){return this}next(t){return this.source.next(t)}throw(t){return this.source.throw(t)}return(t){return this.source.return(t)}peek(t){return this.source.peek(t)}read(t){return this.source.read(t)}},yi=class n{constructor(t){t instanceof n?this.source=t.source:t instanceof cr?this.source=new kr(cn.fromAsyncIterable(t)):Of(t)?this.source=new kr(cn.fromNodeStream(t)):wl(t)?this.source=new kr(cn.fromDOMStream(t)):Bf(t)?this.source=new kr(cn.fromDOMStream(t.body)):Pi(t)?this.source=new kr(cn.fromIterable(t)):Yn(t)?this.source=new kr(cn.fromAsyncIterable(t)):di(t)&&(this.source=new kr(cn.fromAsyncIterable(t)))}[Symbol.asyncIterator](){return this}next(t){return this.source.next(t)}throw(t){return this.source.throw(t)}return(t){return this.source.return(t)}get closed(){return this.source.closed}cancel(t){return this.source.cancel(t)}peek(t){return this.source.peek(t)}read(t){return this.source.read(t)}},Em=class{constructor(t){this.source=t}cancel(t){this.return(t)}peek(t){return this.next(t,"peek").value}read(t){return this.next(t,"read").value}next(t,e="read"){return this.source.next({cmd:e,size:t})}throw(t){return Object.create(this.source.throw&&this.source.throw(t)||Ae)}return(t){return Object.create(this.source.return&&this.source.return(t)||Ae)}},kr=class{constructor(t){this.source=t,this._closedPromise=new Promise(e=>this._closedPromiseResolve=e)}cancel(t){return ut(this,void 0,void 0,function*(){yield this.return(t)})}get closed(){return this._closedPromise}read(t){return ut(this,void 0,void 0,function*(){return(yield this.next(t,"read")).value})}peek(t){return ut(this,void 0,void 0,function*(){return(yield this.next(t,"peek")).value})}next(t,e="read"){return ut(this,void 0,void 0,function*(){return yield this.source.next({cmd:e,size:t})})}throw(t){return ut(this,void 0,void 0,function*(){let e=this.source.throw&&(yield this.source.throw(t))||Ae;return this._closedPromiseResolve&&this._closedPromiseResolve(),this._closedPromiseResolve=void 0,Object.create(e)})}return(t){return ut(this,void 0,void 0,function*(){let e=this.source.return&&(yield this.source.return(t))||Ae;return this._closedPromiseResolve&&this._closedPromiseResolve(),this._closedPromiseResolve=void 0,Object.create(e)})}};var ql=class extends ur{constructor(t,e){super(),this.position=0,this.buffer=kt(t),this.size=typeof e>"u"?this.buffer.byteLength:e}readInt32(t){let{buffer:e,byteOffset:i}=this.readAt(t,4);return new DataView(e,i).getInt32(0,!0)}seek(t){return this.position=Math.min(t,this.size),t<this.size}read(t){let{buffer:e,size:i,position:r}=this;return e&&r<i?(typeof t!="number"&&(t=Number.POSITIVE_INFINITY),this.position=Math.min(i,r+Math.min(i-r,t)),e.subarray(r,this.position)):null}readAt(t,e){let i=this.buffer,r=Math.min(this.size,t+e);return i?i.subarray(t,r):new Uint8Array(e)}close(){this.buffer&&(this.buffer=null)}throw(t){return this.close(),{done:!0,value:t}}return(t){return this.close(),{done:!0,value:t}}},Cs=class extends yi{constructor(t,e){super(),this.position=0,this._handle=t,typeof e=="number"?this.size=e:this._pending=ut(this,void 0,void 0,function*(){this.size=(yield t.stat()).size,delete this._pending})}readInt32(t){return ut(this,void 0,void 0,function*(){let{buffer:e,byteOffset:i}=yield this.readAt(t,4);return new DataView(e,i).getInt32(0,!0)})}seek(t){return ut(this,void 0,void 0,function*(){return this._pending&&(yield this._pending),this.position=Math.min(t,this.size),t<this.size})}read(t){return ut(this,void 0,void 0,function*(){this._pending&&(yield this._pending);let{_handle:e,size:i,position:r}=this;if(e&&r<i){typeof t!="number"&&(t=Number.POSITIVE_INFINITY);let s=r,o=0,a=0,l=Math.min(i,s+Math.min(i-s,t)),c=new Uint8Array(Math.max(0,(this.position=l)-s));for(;(s+=a)<l&&(o+=a)<c.byteLength;)({bytesRead:a}=yield e.read(c,o,c.byteLength-o,s));return c}return null})}readAt(t,e){return ut(this,void 0,void 0,function*(){this._pending&&(yield this._pending);let{_handle:i,size:r}=this;if(i&&t+e<r){let s=Math.min(r,t+e),o=new Uint8Array(s-t);return(yield i.read(o,0,e,t)).buffer}return new Uint8Array(e)})}close(){return ut(this,void 0,void 0,function*(){let t=this._handle;this._handle=null,t&&(yield t.close())})}throw(t){return ut(this,void 0,void 0,function*(){return yield this.close(),{done:!0,value:t}})}return(t){return ut(this,void 0,void 0,function*(){return yield this.close(),{done:!0,value:t}})}};var Im={};To(Im,{BaseInt64:()=>Yl,Int128:()=>jl,Int64:()=>zr,Uint64:()=>ze});function xa(n){return n<0&&(n=4294967295+n+1),`0x${n.toString(16)}`}var va=8,Cm=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8],Yl=class{constructor(t){this.buffer=t}high(){return this.buffer[1]}low(){return this.buffer[0]}_times(t){let e=new Uint32Array([this.buffer[1]>>>16,this.buffer[1]&65535,this.buffer[0]>>>16,this.buffer[0]&65535]),i=new Uint32Array([t.buffer[1]>>>16,t.buffer[1]&65535,t.buffer[0]>>>16,t.buffer[0]&65535]),r=e[3]*i[3];this.buffer[0]=r&65535;let s=r>>>16;return r=e[2]*i[3],s+=r,r=e[3]*i[2]>>>0,s+=r,this.buffer[0]+=s<<16,this.buffer[1]=s>>>0<r?65536:0,this.buffer[1]+=s>>>16,this.buffer[1]+=e[1]*i[3]+e[2]*i[2]+e[3]*i[1],this.buffer[1]+=e[0]*i[3]+e[1]*i[2]+e[2]*i[1]+e[3]*i[0]<<16,this}_plus(t){let e=this.buffer[0]+t.buffer[0]>>>0;this.buffer[1]+=t.buffer[1],e<this.buffer[0]>>>0&&++this.buffer[1],this.buffer[0]=e}lessThan(t){return this.buffer[1]<t.buffer[1]||this.buffer[1]===t.buffer[1]&&this.buffer[0]<t.buffer[0]}equals(t){return this.buffer[1]===t.buffer[1]&&this.buffer[0]==t.buffer[0]}greaterThan(t){return t.lessThan(this)}hex(){return`${xa(this.buffer[1])} ${xa(this.buffer[0])}`}},ze=class n extends Yl{times(t){return this._times(t),this}plus(t){return this._plus(t),this}static from(t,e=new Uint32Array(2)){return n.fromString(typeof t=="string"?t:t.toString(),e)}static fromNumber(t,e=new Uint32Array(2)){return n.fromString(t.toString(),e)}static fromString(t,e=new Uint32Array(2)){let i=t.length,r=new n(e);for(let s=0;s<i;){let o=va<i-s?va:i-s,a=new n(new Uint32Array([Number.parseInt(t.slice(s,s+o),10),0])),l=new n(new Uint32Array([Cm[o],0]));r.times(l),r.plus(a),s+=o}return r}static convertArray(t){let e=new Uint32Array(t.length*2);for(let i=-1,r=t.length;++i<r;)n.from(t[i],new Uint32Array(e.buffer,e.byteOffset+2*i*4,2));return e}static multiply(t,e){return new n(new Uint32Array(t.buffer)).times(e)}static add(t,e){return new n(new Uint32Array(t.buffer)).plus(e)}},zr=class n extends Yl{negate(){return this.buffer[0]=~this.buffer[0]+1,this.buffer[1]=~this.buffer[1],this.buffer[0]==0&&++this.buffer[1],this}times(t){return this._times(t),this}plus(t){return this._plus(t),this}lessThan(t){let e=this.buffer[1]<<0,i=t.buffer[1]<<0;return e<i||e===i&&this.buffer[0]<t.buffer[0]}static from(t,e=new Uint32Array(2)){return n.fromString(typeof t=="string"?t:t.toString(),e)}static fromNumber(t,e=new Uint32Array(2)){return n.fromString(t.toString(),e)}static fromString(t,e=new Uint32Array(2)){let i=t.startsWith("-"),r=t.length,s=new n(e);for(let o=i?1:0;o<r;){let a=va<r-o?va:r-o,l=new n(new Uint32Array([Number.parseInt(t.slice(o,o+a),10),0])),c=new n(new Uint32Array([Cm[a],0]));s.times(c),s.plus(l),o+=a}return i?s.negate():s}static convertArray(t){let e=new Uint32Array(t.length*2);for(let i=-1,r=t.length;++i<r;)n.from(t[i],new Uint32Array(e.buffer,e.byteOffset+2*i*4,2));return e}static multiply(t,e){return new n(new Uint32Array(t.buffer)).times(e)}static add(t,e){return new n(new Uint32Array(t.buffer)).plus(e)}},jl=class n{constructor(t){this.buffer=t}high(){return new zr(new Uint32Array(this.buffer.buffer,this.buffer.byteOffset+8,2))}low(){return new zr(new Uint32Array(this.buffer.buffer,this.buffer.byteOffset,2))}negate(){return this.buffer[0]=~this.buffer[0]+1,this.buffer[1]=~this.buffer[1],this.buffer[2]=~this.buffer[2],this.buffer[3]=~this.buffer[3],this.buffer[0]==0&&++this.buffer[1],this.buffer[1]==0&&++this.buffer[2],this.buffer[2]==0&&++this.buffer[3],this}times(t){let e=new ze(new Uint32Array([this.buffer[3],0])),i=new ze(new Uint32Array([this.buffer[2],0])),r=new ze(new Uint32Array([this.buffer[1],0])),s=new ze(new Uint32Array([this.buffer[0],0])),o=new ze(new Uint32Array([t.buffer[3],0])),a=new ze(new Uint32Array([t.buffer[2],0])),l=new ze(new Uint32Array([t.buffer[1],0])),c=new ze(new Uint32Array([t.buffer[0],0])),u=ze.multiply(s,c);this.buffer[0]=u.low();let f=new ze(new Uint32Array([u.high(),0]));return u=ze.multiply(r,c),f.plus(u),u=ze.multiply(s,l),f.plus(u),this.buffer[1]=f.low(),this.buffer[3]=f.lessThan(u)?1:0,this.buffer[2]=f.high(),new ze(new Uint32Array(this.buffer.buffer,this.buffer.byteOffset+8,2)).plus(ze.multiply(i,c)).plus(ze.multiply(r,l)).plus(ze.multiply(s,a)),this.buffer[3]+=ze.multiply(e,c).plus(ze.multiply(i,l)).plus(ze.multiply(r,a)).plus(ze.multiply(s,o)).low(),this}plus(t){let e=new Uint32Array(4);return e[3]=this.buffer[3]+t.buffer[3]>>>0,e[2]=this.buffer[2]+t.buffer[2]>>>0,e[1]=this.buffer[1]+t.buffer[1]>>>0,e[0]=this.buffer[0]+t.buffer[0]>>>0,e[0]<this.buffer[0]>>>0&&++e[1],e[1]<this.buffer[1]>>>0&&++e[2],e[2]<this.buffer[2]>>>0&&++e[3],this.buffer[3]=e[3],this.buffer[2]=e[2],this.buffer[1]=e[1],this.buffer[0]=e[0],this}hex(){return`${xa(this.buffer[3])} ${xa(this.buffer[2])} ${xa(this.buffer[1])} ${xa(this.buffer[0])}`}static multiply(t,e){return new n(new Uint32Array(t.buffer)).times(e)}static add(t,e){return new n(new Uint32Array(t.buffer)).plus(e)}static from(t,e=new Uint32Array(4)){return n.fromString(typeof t=="string"?t:t.toString(),e)}static fromNumber(t,e=new Uint32Array(4)){return n.fromString(t.toString(),e)}static fromString(t,e=new Uint32Array(4)){let i=t.startsWith("-"),r=t.length,s=new n(e);for(let o=i?1:0;o<r;){let a=va<r-o?va:r-o,l=new n(new Uint32Array([Number.parseInt(t.slice(o,o+a),10),0,0,0])),c=new n(new Uint32Array([Cm[a],0,0,0]));s.times(c),s.plus(l),o+=a}return i?s.negate():s}static convertArray(t){let e=new Uint32Array(t.length*4);for(let i=-1,r=t.length;++i<r;)n.from(t[i],new Uint32Array(e.buffer,e.byteOffset+16*i,4));return e}};var $l=class extends It{constructor(t,e,i,r){super(),this.nodesIndex=-1,this.buffersIndex=-1,this.bytes=t,this.nodes=e,this.buffers=i,this.dictionaries=r}visit(t){return super.visit(t instanceof ne?t.type:t)}visitNull(t,{length:e}=this.nextFieldNode()){return Gt({type:t,length:e})}visitBool(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitInt(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitFloat(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitUtf8(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),valueOffsets:this.readOffsets(t),data:this.readData(t)})}visitBinary(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),valueOffsets:this.readOffsets(t),data:this.readData(t)})}visitFixedSizeBinary(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitDate(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitTimestamp(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitTime(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitDecimal(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitList(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),valueOffsets:this.readOffsets(t),child:this.visit(t.children[0])})}visitStruct(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),children:this.visitMany(t.children)})}visitUnion(t){return t.mode===ke.Sparse?this.visitSparseUnion(t):this.visitDenseUnion(t)}visitDenseUnion(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),typeIds:this.readTypeIds(t),valueOffsets:this.readOffsets(t),children:this.visitMany(t.children)})}visitSparseUnion(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),typeIds:this.readTypeIds(t),children:this.visitMany(t.children)})}visitDictionary(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t.indices),dictionary:this.readDictionary(t)})}visitInterval(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),data:this.readData(t)})}visitFixedSizeList(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),child:this.visit(t.children[0])})}visitMap(t,{length:e,nullCount:i}=this.nextFieldNode()){return Gt({type:t,length:e,nullCount:i,nullBitmap:this.readNullBitmap(t,i),valueOffsets:this.readOffsets(t),child:this.visit(t.children[0])})}nextFieldNode(){return this.nodes[++this.nodesIndex]}nextBufferRange(){return this.buffers[++this.buffersIndex]}readNullBitmap(t,e,i=this.nextBufferRange()){return e>0&&this.readData(t,i)||new Uint8Array(0)}readOffsets(t,e){return this.readData(t,e)}readTypeIds(t,e){return this.readData(t,e)}readData(t,{length:e,offset:i}=this.nextBufferRange()){return this.bytes.subarray(i,i+e)}readDictionary(t){return this.dictionaries.get(t.id)}},Mh=class extends $l{constructor(t,e,i,r){super(new Uint8Array(0),e,i,r),this.sources=t}readNullBitmap(t,e,{offset:i}=this.nextBufferRange()){return e<=0?new Uint8Array(0):Qs(this.sources[i])}readOffsets(t,{offset:e}=this.nextBufferRange()){return te(Uint8Array,te(Int32Array,this.sources[e]))}readTypeIds(t,{offset:e}=this.nextBufferRange()){return te(Uint8Array,te(t.ArrayType,this.sources[e]))}readData(t,{offset:e}=this.nextBufferRange()){let{sources:i}=this;return Et.isTimestamp(t)?te(Uint8Array,zr.convertArray(i[e])):(Et.isInt(t)||Et.isTime(t))&&t.bitWidth===64?te(Uint8Array,zr.convertArray(i[e])):Et.isDate(t)&&t.unit===un.MILLISECOND?te(Uint8Array,zr.convertArray(i[e])):Et.isDecimal(t)?te(Uint8Array,jl.convertArray(i[e])):Et.isBinary(t)||Et.isFixedSizeBinary(t)?YE(i[e]):Et.isBool(t)?Qs(i[e]):Et.isUtf8(t)?hs(i[e].join("")):te(Uint8Array,te(t.ArrayType,i[e].map(r=>+r)))}};function YE(n){let t=n.join(""),e=new Uint8Array(t.length/2);for(let i=0;i<t.length;i+=2)e[i>>1]=Number.parseInt(t.slice(i,i+2),16);return e}var ba=class extends sr{constructor(t){super(t),this._values=new _s(new Uint8Array(0))}get byteLength(){let t=this._pendingLength+this.length*4;return this._offsets&&(t+=this._offsets.byteLength),this._values&&(t+=this._values.byteLength),this._nulls&&(t+=this._nulls.byteLength),t}setValue(t,e){return super.setValue(t,kt(e))}_flushPending(t,e){let i=this._offsets,r=this._values.reserve(e).buffer,s=0;for(let[o,a]of t)if(a===void 0)i.set(o,0);else{let l=a.length;r.set(a,s),i.set(o,l),s+=l}}};var wh=class extends Re{constructor(t){super(t),this._values=new ga}setValue(t,e){this._values.set(t,+e)}};var ro=class extends sn{};ro.prototype._setValue=cm;var Zl=class extends ro{};Zl.prototype._setValue=Jf;var Jl=class extends ro{};Jl.prototype._setValue=Kf;var Kl=class extends sn{};Kl.prototype._setValue=hm;var Th=class extends Re{constructor({type:t,nullValues:e,dictionaryHashFunction:i}){super({type:new $n(t.dictionary,t.indices,t.id,t.isOrdered)}),this._nulls=null,this._dictionaryOffset=0,this._keysToIndices=Object.create(null),this.indices=so({type:this.type.indices,nullValues:e}),this.dictionary=so({type:this.type.dictionary,nullValues:null}),typeof i=="function"&&(this.valueToKey=i)}get values(){return this.indices.values}get nullCount(){return this.indices.nullCount}get nullBitmap(){return this.indices.nullBitmap}get byteLength(){return this.indices.byteLength+this.dictionary.byteLength}get reservedLength(){return this.indices.reservedLength+this.dictionary.reservedLength}get reservedByteLength(){return this.indices.reservedByteLength+this.dictionary.reservedByteLength}isValid(t){return this.indices.isValid(t)}setValid(t,e){let i=this.indices;return e=i.setValid(t,e),this.length=i.length,e}setValue(t,e){let i=this._keysToIndices,r=this.valueToKey(e),s=i[r];return s===void 0&&(i[r]=s=this._dictionaryOffset+this.dictionary.append(e).length-1),this.indices.setValue(t,s)}flush(){let t=this.type,e=this._dictionary,i=this.dictionary.toVector(),r=this.indices.flush().clone(t);return r.dictionary=e?e.concat(i):i,this.finished||(this._dictionaryOffset+=i.length),this._dictionary=r.dictionary,this.clear(),r}finish(){return this.indices.finish(),this.dictionary.finish(),this._dictionaryOffset=0,this._keysToIndices=Object.create(null),super.finish()}clear(){return this.indices.clear(),this.dictionary.clear(),super.clear()}valueToKey(t){return typeof t=="string"?t:`${t}`}};var Ql=class extends sn{};Ql.prototype._setValue=lm;var Ah=class extends Re{setValue(t,e){let[i]=this.children,r=t*this.stride;for(let s=-1,o=e.length;++s<o;)i.set(r+s,e[s])}addChild(t,e="0"){if(this.numChildren>0)throw new Error("FixedSizeListBuilder can only have one child.");let i=this.children.push(t);return this.type=new ki(this.type.listSize,new ne(e,t.type,!0)),i}};var oo=class extends sn{setValue(t,e){this._values.set(t,e)}},Eh=class extends oo{setValue(t,e){super.setValue(t,Cl(e))}},Ch=class extends oo{},Ih=class extends oo{};var ao=class extends sn{};ao.prototype._setValue=dm;var tc=class extends ao{};tc.prototype._setValue=ah;var ec=class extends ao{};ec.prototype._setValue=lh;var _i=class extends sn{setValue(t,e){this._values.set(t,e)}},Rh=class extends _i{},Dh=class extends _i{},Ph=class extends _i{},Lh=class extends _i{},Fh=class extends _i{},Bh=class extends _i{},Uh=class extends _i{},Oh=class extends _i{};var Nh=class extends sr{constructor(t){super(t),this._offsets=new ya}addChild(t,e="0"){if(this.numChildren>0)throw new Error("ListBuilder can only have one child.");return this.children[this.numChildren]=t,this.type=new Oi(new ne(e,t.type,!0)),this.numChildren-1}_flushPending(t){let e=this._offsets,[i]=this.children;for(let[r,s]of t)if(typeof s>"u")e.set(r,0);else{let o=s.length,a=e.set(r,o).buffer[r];for(let l=-1;++l<o;)i.set(a+l,s[l])}}};var kh=class extends sr{set(t,e){return super.set(t,e)}setValue(t,e){let i=e instanceof Map?e:new Map(Object.entries(e)),r=this._pending||(this._pending=new Map),s=r.get(t);s&&(this._pendingLength-=s.size),this._pendingLength+=i.size,r.set(t,i)}addChild(t,e=`${this.numChildren}`){if(this.numChildren>0)throw new Error("ListBuilder can only have one child.");return this.children[this.numChildren]=t,this.type=new zi(new ne(e,t.type,!0),this.type.keysSorted),this.numChildren-1}_flushPending(t){let e=this._offsets,[i]=this.children;for(let[r,s]of t)if(s===void 0)e.set(r,0);else{let{[r]:o,[r+1]:a}=e.set(r,s.size).buffer;for(let l of s.entries())if(i.set(o,l),++o>=a)break}}};var zh=class extends Re{setValue(t,e){}setValid(t,e){return this.length=Math.max(t+1,this.length),e}};var Vh=class extends Re{setValue(t,e){let{children:i,type:r}=this;switch(Array.isArray(e)||e.constructor){case!0:return r.children.forEach((s,o)=>i[o].set(t,e[o]));case Map:return r.children.forEach((s,o)=>i[o].set(t,e.get(s.name)));default:return r.children.forEach((s,o)=>i[o].set(t,e[s.name]))}}setValid(t,e){return super.setValid(t,e)||this.children.forEach(i=>i.setValid(t,e)),e}addChild(t,e=`${this.numChildren}`){let i=this.children.push(t);return this.type=new Te([...this.type.children,new ne(e,t.type,!0)]),i}};var Vr=class extends sn{};Vr.prototype._setValue=um;var nc=class extends Vr{};nc.prototype._setValue=Qf;var ic=class extends Vr{};ic.prototype._setValue=th;var rc=class extends Vr{};rc.prototype._setValue=eh;var sc=class extends Vr{};sc.prototype._setValue=nh;var Hr=class extends sn{};Hr.prototype._setValue=fm;var oc=class extends Hr{};oc.prototype._setValue=ih;var ac=class extends Hr{};ac.prototype._setValue=rh;var lc=class extends Hr{};lc.prototype._setValue=sh;var cc=class extends Hr{};cc.prototype._setValue=oh;var Sa=class extends Re{constructor(t){super(t),this._typeIds=new Fr(new Int8Array(0),1),typeof t.valueToChildTypeId=="function"&&(this._valueToChildTypeId=t.valueToChildTypeId)}get typeIdToChildIndex(){return this.type.typeIdToChildIndex}append(t,e){return this.set(this.length,t,e)}set(t,e,i){return i===void 0&&(i=this._valueToChildTypeId(this,e,t)),this.setValid(t,this.isValid(e))&&this.setValue(t,e,i),this}setValue(t,e,i){this._typeIds.set(t,i);let r=this.type.typeIdToChildIndex[i],s=this.children[r];s?.set(t,e)}addChild(t,e=`${this.children.length}`){let i=this.children.push(t),{type:{children:r,mode:s,typeIds:o}}=this,a=[...r,new ne(e,t.type)];return this.type=new Ni(s,[...o,i],a),i}_valueToChildTypeId(t,e,i){throw new Error("Cannot map UnionBuilder value to child typeId. Pass the `childTypeId` as the second argument to unionBuilder.append(), or supply a `valueToChildTypeId` function as part of the UnionBuilder constructor options.")}},Hh=class extends Sa{},Gh=class extends Sa{constructor(t){super(t),this._offsets=new Fr(new Int32Array(0))}setValue(t,e,i){let r=this._typeIds.set(t,i).buffer[t],s=this.getChildAt(this.type.typeIdToChildIndex[r]),o=this._offsets.set(t,s.length).buffer[t];s?.set(o,e)}};var uc=class extends sr{constructor(t){super(t),this._values=new _s(new Uint8Array(0))}get byteLength(){let t=this._pendingLength+this.length*4;return this._offsets&&(t+=this._offsets.byteLength),this._values&&(t+=this._values.byteLength),this._nulls&&(t+=this._nulls.byteLength),t}setValue(t,e){return super.setValue(t,hs(e))}_flushPending(t,e){}};uc.prototype._flushPending=ba.prototype._flushPending;var Rm=class extends It{visitNull(){return zh}visitBool(){return wh}visitInt(){return _i}visitInt8(){return Rh}visitInt16(){return Dh}visitInt32(){return Ph}visitInt64(){return Lh}visitUint8(){return Fh}visitUint16(){return Bh}visitUint32(){return Uh}visitUint64(){return Oh}visitFloat(){return oo}visitFloat16(){return Eh}visitFloat32(){return Ch}visitFloat64(){return Ih}visitUtf8(){return uc}visitBinary(){return ba}visitFixedSizeBinary(){return Ql}visitDate(){return ro}visitDateDay(){return Zl}visitDateMillisecond(){return Jl}visitTimestamp(){return Vr}visitTimestampSecond(){return nc}visitTimestampMillisecond(){return ic}visitTimestampMicrosecond(){return rc}visitTimestampNanosecond(){return sc}visitTime(){return Hr}visitTimeSecond(){return oc}visitTimeMillisecond(){return ac}visitTimeMicrosecond(){return lc}visitTimeNanosecond(){return cc}visitDecimal(){return Kl}visitList(){return Nh}visitStruct(){return Vh}visitUnion(){return Sa}visitDenseUnion(){return Gh}visitSparseUnion(){return Hh}visitDictionary(){return Th}visitInterval(){return ao}visitIntervalDayTime(){return tc}visitIntervalYearMonth(){return ec}visitFixedSizeList(){return Ah}visitMap(){return kh}},Hx=new Rm;var Ot=class extends It{compareSchemas(t,e){return t===e||e instanceof t.constructor&&this.compareManyFields(t.fields,e.fields)}compareManyFields(t,e){return t===e||Array.isArray(t)&&Array.isArray(e)&&t.length===e.length&&t.every((i,r)=>this.compareFields(i,e[r]))}compareFields(t,e){return t===e||e instanceof t.constructor&&t.name===e.name&&t.nullable===e.nullable&&this.visit(t.type,e.type)}};function Fn(n,t){return t instanceof n.constructor}function fc(n,t){return n===t||Fn(n,t)}function Gr(n,t){return n===t||Fn(n,t)&&n.bitWidth===t.bitWidth&&n.isSigned===t.isSigned}function Wh(n,t){return n===t||Fn(n,t)&&n.precision===t.precision}function jE(n,t){return n===t||Fn(n,t)&&n.byteWidth===t.byteWidth}function Dm(n,t){return n===t||Fn(n,t)&&n.unit===t.unit}function hc(n,t){return n===t||Fn(n,t)&&n.unit===t.unit&&n.timezone===t.timezone}function dc(n,t){return n===t||Fn(n,t)&&n.unit===t.unit&&n.bitWidth===t.bitWidth}function $E(n,t){return n===t||Fn(n,t)&&n.children.length===t.children.length&&fr.compareManyFields(n.children,t.children)}function ZE(n,t){return n===t||Fn(n,t)&&n.children.length===t.children.length&&fr.compareManyFields(n.children,t.children)}function Pm(n,t){return n===t||Fn(n,t)&&n.mode===t.mode&&n.typeIds.every((e,i)=>e===t.typeIds[i])&&fr.compareManyFields(n.children,t.children)}function JE(n,t){return n===t||Fn(n,t)&&n.id===t.id&&n.isOrdered===t.isOrdered&&fr.visit(n.indices,t.indices)&&fr.visit(n.dictionary,t.dictionary)}function Lm(n,t){return n===t||Fn(n,t)&&n.unit===t.unit}function KE(n,t){return n===t||Fn(n,t)&&n.listSize===t.listSize&&n.children.length===t.children.length&&fr.compareManyFields(n.children,t.children)}function QE(n,t){return n===t||Fn(n,t)&&n.keysSorted===t.keysSorted&&n.children.length===t.children.length&&fr.compareManyFields(n.children,t.children)}Ot.prototype.visitNull=fc;Ot.prototype.visitBool=fc;Ot.prototype.visitInt=Gr;Ot.prototype.visitInt8=Gr;Ot.prototype.visitInt16=Gr;Ot.prototype.visitInt32=Gr;Ot.prototype.visitInt64=Gr;Ot.prototype.visitUint8=Gr;Ot.prototype.visitUint16=Gr;Ot.prototype.visitUint32=Gr;Ot.prototype.visitUint64=Gr;Ot.prototype.visitFloat=Wh;Ot.prototype.visitFloat16=Wh;Ot.prototype.visitFloat32=Wh;Ot.prototype.visitFloat64=Wh;Ot.prototype.visitUtf8=fc;Ot.prototype.visitBinary=fc;Ot.prototype.visitFixedSizeBinary=jE;Ot.prototype.visitDate=Dm;Ot.prototype.visitDateDay=Dm;Ot.prototype.visitDateMillisecond=Dm;Ot.prototype.visitTimestamp=hc;Ot.prototype.visitTimestampSecond=hc;Ot.prototype.visitTimestampMillisecond=hc;Ot.prototype.visitTimestampMicrosecond=hc;Ot.prototype.visitTimestampNanosecond=hc;Ot.prototype.visitTime=dc;Ot.prototype.visitTimeSecond=dc;Ot.prototype.visitTimeMillisecond=dc;Ot.prototype.visitTimeMicrosecond=dc;Ot.prototype.visitTimeNanosecond=dc;Ot.prototype.visitDecimal=fc;Ot.prototype.visitList=$E;Ot.prototype.visitStruct=ZE;Ot.prototype.visitUnion=Pm;Ot.prototype.visitDenseUnion=Pm;Ot.prototype.visitSparseUnion=Pm;Ot.prototype.visitDictionary=JE;Ot.prototype.visitInterval=Lm;Ot.prototype.visitIntervalDayTime=Lm;Ot.prototype.visitIntervalYearMonth=Lm;Ot.prototype.visitFixedSizeList=KE;Ot.prototype.visitMap=QE;var fr=new Ot;function lo(n,t){return fr.compareSchemas(n,t)}function Gx(n,t){return fr.compareFields(n,t)}function Wx(n,t){return fr.visit(n,t)}function so(n){let t=n.type,e=new(Hx.getVisitFn(t)())(n);if(t.children&&t.children.length>0){let i=n.children||[],r={nullValues:n.nullValues},s=Array.isArray(i)?((o,a)=>i[a]||r):(({name:o})=>i[o]||r);for(let[o,a]of t.children.entries()){let{type:l}=a,c=s(a,o);e.children.push(so(Object.assign(Object.assign({},c),{type:l})))}}return e}function Xh(n,t){return t1(n,t.map(e=>e.data.concat()))}function t1(n,t){let e=[...n.fields],i=[],r={numBatches:t.reduce((f,h)=>Math.max(f,h.length),0)},s=0,o=0,a=-1,l=t.length,c,u=[];for(;r.numBatches-- >0;){for(o=Number.POSITIVE_INFINITY,a=-1;++a<l;)u[a]=c=t[a].shift(),o=Math.min(o,c?c.length:o);Number.isFinite(o)&&(u=e1(e,o,u,t,r),o>0&&(i[s++]=Gt({type:new Te(e),length:o,nullCount:0,children:u.slice()})))}return[n=n.assign(e),i.map(f=>new He(n,f))]}function e1(n,t,e,i,r){var s;let o=(t+63&-64)>>3;for(let a=-1,l=i.length;++a<l;){let c=e[a],u=c?.length;if(u>=t)u===t?e[a]=c:(e[a]=c.slice(0,t),r.numBatches=Math.max(r.numBatches,i[a].unshift(c.slice(t,u-t))));else{let f=n[a];n[a]=f.clone({nullable:!0}),e[a]=(s=c?._changeLengthAndBackfillNullBitmap(t))!==null&&s!==void 0?s:Gt({type:f.type,length:t,nullCount:t,nullBitmap:new Uint8Array(o)})}}return e}var Xx,Bn=class n{constructor(...t){var e,i;if(t.length===0)return this.batches=[],this.schema=new he([]),this._offsets=[0],this;let r,s;t[0]instanceof he&&(r=t.shift()),t[t.length-1]instanceof Uint32Array&&(s=t.pop());let o=l=>{if(l){if(l instanceof He)return[l];if(l instanceof n)return l.batches;if(l instanceof _e){if(l.type instanceof Te)return[new He(new he(l.type.children),l)]}else{if(Array.isArray(l))return l.flatMap(c=>o(c));if(typeof l[Symbol.iterator]=="function")return[...l].flatMap(c=>o(c));if(typeof l=="object"){let c=Object.keys(l),u=c.map(p=>new se([l[p]])),f=new he(c.map((p,g)=>new ne(String(p),u[g].type))),[,h]=Xh(f,u);return h.length===0?[new He(l)]:h}}}return[]},a=t.flatMap(l=>o(l));if(r=(i=r??((e=a[0])===null||e===void 0?void 0:e.schema))!==null&&i!==void 0?i:new he([]),!(r instanceof he))throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");for(let l of a){if(!(l instanceof He))throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");if(!lo(r,l.schema))throw new TypeError("Table and inner RecordBatch schemas must be equivalent.")}this.schema=r,this.batches=a,this._offsets=s??dh(this.data)}get data(){return this.batches.map(({data:t})=>t)}get numCols(){return this.schema.fields.length}get numRows(){return this.data.reduce((t,e)=>t+e.length,0)}get nullCount(){return this._nullCount===-1&&(this._nullCount=hh(this.data)),this._nullCount}isValid(t){return!1}get(t){return null}set(t,e){}indexOf(t,e){return-1}getByteLength(t){return 0}[Symbol.iterator](){return this.batches.length>0?ma.visit(new se(this.data)):new Array(0)[Symbol.iterator]()}toArray(){return[...this]}toString(){return`[
  ${this.toArray().join(`,
  `)}
]`}concat(...t){let e=this.schema,i=this.data.concat(t.flatMap(({data:r})=>r));return new n(e,i.map(r=>new He(e,r)))}slice(t,e){let i=this.schema;[t,e]=Il({length:this.numRows},t,e);let r=ph(this.data,this._offsets,t,e);return new n(i,r.map(s=>new He(i,s)))}getChild(t){return this.getChildAt(this.schema.fields.findIndex(e=>e.name===t))}getChildAt(t){if(t>-1&&t<this.schema.fields.length){let e=this.data.map(i=>i.children[t]);if(e.length===0){let{type:i}=this.schema.fields[t],r=Gt({type:i,length:0,nullCount:0});e.push(r._changeLengthAndBackfillNullBitmap(this.numRows))}return new se(e)}return null}setChild(t,e){var i;return this.setChildAt((i=this.schema.fields)===null||i===void 0?void 0:i.findIndex(r=>r.name===t),e)}setChildAt(t,e){let i=this.schema,r=[...this.batches];if(t>-1&&t<this.numCols){e||(e=new se([Gt({type:new En,length:this.numRows})]));let s=i.fields.slice(),o=s[t].clone({type:e.type}),a=this.schema.fields.map((l,c)=>this.getChildAt(c));[s[t],a[t]]=[o,e],[i,r]=Xh(i,a)}return new n(i,r)}select(t){let e=this.schema.fields.reduce((i,r,s)=>i.set(r.name,s),new Map);return this.selectAt(t.map(i=>e.get(i)).filter(i=>i>-1))}selectAt(t){let e=this.schema.selectAt(t),i=this.batches.map(r=>r.selectAt(t));return new n(e,i)}assign(t){let e=this.schema.fields,[i,r]=t.schema.fields.reduce((a,l,c)=>{let[u,f]=a,h=e.findIndex(p=>p.name===l.name);return~h?f[h]=c:u.push(c),a},[[],[]]),s=this.schema.assign(t.schema),o=[...e.map((a,l)=>[l,r[l]]).map(([a,l])=>l===void 0?this.getChildAt(a):t.getChildAt(l)),...i.map(a=>t.getChildAt(a))].filter(Boolean);return new n(...Xh(s,o))}};Xx=Symbol.toStringTag;Bn[Xx]=(n=>(n.schema=null,n.batches=[],n._offsets=new Uint32Array([0]),n._nullCount=-1,n[Symbol.isConcatSpreadable]=!0,n.isValid=ys(Pl),n.get=ys(Ye.getVisitFn(P.Struct)),n.set=mh(fn.getVisitFn(P.Struct)),n.indexOf=gh(to.getVisitFn(P.Struct)),n.getByteLength=ys(Jn.getVisitFn(P.Struct)),"Table"))(Bn.prototype);var Yx,He=class n{constructor(...t){switch(t.length){case 2:{if([this.schema]=t,!(this.schema instanceof he))throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");if([,this.data=Gt({nullCount:0,type:new Te(this.schema.fields),children:this.schema.fields.map(e=>Gt({type:e.type,nullCount:0}))})]=t,!(this.data instanceof _e))throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");[this.schema,this.data]=qx(this.schema,this.data.children);break}case 1:{let[e]=t,{fields:i,children:r,length:s}=Object.keys(e).reduce((l,c,u)=>(l.children[u]=e[c],l.length=Math.max(l.length,e[c].length),l.fields[u]=ne.new({name:c,type:e[c].type,nullable:!0}),l),{length:0,fields:new Array,children:new Array}),o=new he(i),a=Gt({type:new Te(i),length:s,children:r,nullCount:0});[this.schema,this.data]=qx(o,a.children,s);break}default:throw new TypeError("RecordBatch constructor expects an Object mapping names to child Data, or a [Schema, Data] pair.")}}get dictionaries(){return this._dictionaries||(this._dictionaries=jx(this.schema.fields,this.data.children))}get numCols(){return this.schema.fields.length}get numRows(){return this.data.length}get nullCount(){return this.data.nullCount}isValid(t){return this.data.getValid(t)}get(t){return Ye.visit(this.data,t)}set(t,e){return fn.visit(this.data,t,e)}indexOf(t,e){return to.visit(this.data,t,e)}getByteLength(t){return Jn.visit(this.data,t)}[Symbol.iterator](){return ma.visit(new se([this.data]))}toArray(){return[...this]}concat(...t){return new Bn(this.schema,[this,...t])}slice(t,e){let[i]=new se([this.data]).slice(t,e).data;return new n(this.schema,i)}getChild(t){var e;return this.getChildAt((e=this.schema.fields)===null||e===void 0?void 0:e.findIndex(i=>i.name===t))}getChildAt(t){return t>-1&&t<this.schema.fields.length?new se([this.data.children[t]]):null}setChild(t,e){var i;return this.setChildAt((i=this.schema.fields)===null||i===void 0?void 0:i.findIndex(r=>r.name===t),e)}setChildAt(t,e){let i=this.schema,r=this.data;if(t>-1&&t<this.numCols){e||(e=new se([Gt({type:new En,length:this.numRows})]));let s=i.fields.slice(),o=r.children.slice(),a=s[t].clone({type:e.type});[s[t],o[t]]=[a,e.data[0]],i=new he(s,new Map(this.schema.metadata)),r=Gt({type:new Te(s),children:o})}return new n(i,r)}select(t){let e=this.schema.select(t),i=new Te(e.fields),r=[];for(let s of t){let o=this.schema.fields.findIndex(a=>a.name===s);~o&&(r[o]=this.data.children[o])}return new n(e,Gt({type:i,length:this.numRows,children:r}))}selectAt(t){let e=this.schema.selectAt(t),i=t.map(s=>this.data.children[s]).filter(Boolean),r=Gt({type:new Te(e.fields),length:this.numRows,children:i});return new n(e,r)}};Yx=Symbol.toStringTag;He[Yx]=(n=>(n._nullCount=-1,n[Symbol.isConcatSpreadable]=!0,"RecordBatch"))(He.prototype);function qx(n,t,e=t.reduce((i,r)=>Math.max(i,r.length),0)){var i;let r=[...n.fields],s=[...t],o=(e+63&-64)>>3;for(let[a,l]of n.fields.entries()){let c=t[a];(!c||c.length!==e)&&(r[a]=l.clone({nullable:!0}),s[a]=(i=c?._changeLengthAndBackfillNullBitmap(e))!==null&&i!==void 0?i:Gt({type:l.type,length:e,nullCount:e,nullBitmap:new Uint8Array(o)}))}return[n.assign(r),Gt({type:new Te(r),length:e,children:s})]}function jx(n,t,e=new Map){for(let i=-1,r=n.length;++i<r;){let o=n[i].type,a=t[i];if(Et.isDictionary(o)){if(!e.has(o.id))a.dictionary&&e.set(o.id,a.dictionary);else if(e.get(o.id)!==a.dictionary)throw new Error("Cannot create Schema containing two different dictionaries with the same Id")}o.children&&o.children.length>0&&jx(o.children,a.children,e)}return e}var co=class extends He{constructor(t){let e=t.fields.map(r=>Gt({type:r.type})),i=Gt({type:new Te(t.fields),nullCount:0,children:e});super(t,i)}};var pc;(function(n){n[n.BUFFER=0]="BUFFER"})(pc||(pc={}));var mc;(function(n){n[n.LZ4_FRAME=0]="LZ4_FRAME",n[n.ZSTD=1]="ZSTD"})(mc||(mc={}));var qh=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsBodyCompression(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsBodyCompression(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}codec(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):mc.LZ4_FRAME}method(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt8(this.bb_pos+t):pc.BUFFER}static startBodyCompression(t){t.startObject(2)}static addCodec(t,e){t.addFieldInt8(0,e,mc.LZ4_FRAME)}static addMethod(t,e){t.addFieldInt8(1,e,pc.BUFFER)}static endBodyCompression(t){return t.endObject()}static createBodyCompression(t,e,i){return n.startBodyCompression(t),n.addCodec(t,e),n.addMethod(t,i),n.endBodyCompression(t)}};var Ma=class{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}offset(){return this.bb.readInt64(this.bb_pos)}length(){return this.bb.readInt64(this.bb_pos+8)}static sizeOf(){return 16}static createBuffer(t,e,i){return t.prep(8,16),t.writeInt64(i),t.writeInt64(e),t.offset()}};var wa=class{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}length(){return this.bb.readInt64(this.bb_pos)}nullCount(){return this.bb.readInt64(this.bb_pos+8)}static sizeOf(){return 16}static createFieldNode(t,e,i){return t.prep(8,16),t.writeInt64(i),t.writeInt64(e),t.offset()}};var ti=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsRecordBatch(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsRecordBatch(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}length(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt64(this.bb_pos+t):this.bb.createLong(0,0)}nodes(t,e){let i=this.bb.__offset(this.bb_pos,6);return i?(e||new wa).__init(this.bb.__vector(this.bb_pos+i)+t*16,this.bb):null}nodesLength(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}buffers(t,e){let i=this.bb.__offset(this.bb_pos,8);return i?(e||new Ma).__init(this.bb.__vector(this.bb_pos+i)+t*16,this.bb):null}buffersLength(){let t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}compression(t){let e=this.bb.__offset(this.bb_pos,10);return e?(t||new qh).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}static startRecordBatch(t){t.startObject(4)}static addLength(t,e){t.addFieldInt64(0,e,t.createLong(0,0))}static addNodes(t,e){t.addFieldOffset(1,e,0)}static startNodesVector(t,e){t.startVector(16,e,8)}static addBuffers(t,e){t.addFieldOffset(2,e,0)}static startBuffersVector(t,e){t.startVector(16,e,8)}static addCompression(t,e){t.addFieldOffset(3,e,0)}static endRecordBatch(t){return t.endObject()}};var Wr=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDictionaryBatch(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDictionaryBatch(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}id(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt64(this.bb_pos+t):this.bb.createLong(0,0)}data(t){let e=this.bb.__offset(this.bb_pos,6);return e?(t||new ti).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}isDelta(){let t=this.bb.__offset(this.bb_pos,8);return t?!!this.bb.readInt8(this.bb_pos+t):!1}static startDictionaryBatch(t){t.startObject(3)}static addId(t,e){t.addFieldInt64(0,e,t.createLong(0,0))}static addData(t,e){t.addFieldOffset(1,e,0)}static addIsDelta(t,e){t.addFieldInt8(2,+e,0)}static endDictionaryBatch(t){return t.endObject()}};var Ta;(function(n){n[n.NONE=0]="NONE",n[n.Schema=1]="Schema",n[n.DictionaryBatch=2]="DictionaryBatch",n[n.RecordBatch=3]="RecordBatch",n[n.Tensor=4]="Tensor",n[n.SparseTensor=5]="SparseTensor"})(Ta||(Ta={}));var Xi=class n{constructor(){this.bb=null,this.bb_pos=0}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsMessage(t,e){return(e||new n).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMessage(t,e){return t.setPosition(t.position()+4),(e||new n).__init(t.readInt32(t.position())+t.position(),t)}version(){let t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt16(this.bb_pos+t):xs.V1}headerType(){let t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint8(this.bb_pos+t):Ta.NONE}header(t){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__union(t,this.bb_pos+e):null}bodyLength(){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt64(this.bb_pos+t):this.bb.createLong(0,0)}customMetadata(t,e){let i=this.bb.__offset(this.bb_pos,12);return i?(e||new Ke).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+t*4),this.bb):null}customMetadataLength(){let t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__vector_len(this.bb_pos+t):0}static startMessage(t){t.startObject(5)}static addVersion(t,e){t.addFieldInt16(0,e,xs.V1)}static addHeaderType(t,e){t.addFieldInt8(1,e,Ta.NONE)}static addHeader(t,e){t.addFieldOffset(2,e,0)}static addBodyLength(t,e){t.addFieldInt64(3,e,t.createLong(0,0))}static addCustomMetadata(t,e){t.addFieldOffset(4,e,0)}static createCustomMetadataVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startCustomMetadataVector(t,e){t.startVector(4,e,4)}static endMessage(t){return t.endObject()}static finishMessageBuffer(t,e){t.finish(e)}static finishSizePrefixedMessageBuffer(t,e){t.finish(e,void 0,!0)}static createMessage(t,e,i,r,s,o){return n.startMessage(t),n.addVersion(t,e),n.addHeaderType(t,i),n.addHeader(t,r),n.addBodyLength(t,s),n.addCustomMetadata(t,o),n.endMessage(t)}};var i1=hn,Fm=class extends It{visit(t,e){return t==null||e==null?void 0:super.visit(t,e)}visitNull(t,e){return Vl.startNull(e),Vl.endNull(e)}visitInt(t,e){return Gi.startInt(e),Gi.addBitWidth(e,t.bitWidth),Gi.addIsSigned(e,t.isSigned),Gi.endInt(e)}visitFloat(t,e){return Ts.startFloatingPoint(e),Ts.addPrecision(e,t.precision),Ts.endFloatingPoint(e)}visitBinary(t,e){return Bl.startBinary(e),Bl.endBinary(e)}visitBool(t,e){return Ul.startBool(e),Ul.endBool(e)}visitUtf8(t,e){return Wl.startUtf8(e),Wl.endUtf8(e)}visitDecimal(t,e){return lr.startDecimal(e),lr.addScale(e,t.scale),lr.addPrecision(e,t.precision),lr.addBitWidth(e,t.bitWidth),lr.endDecimal(e)}visitDate(t,e){return bs.startDate(e),bs.addUnit(e,t.unit),bs.endDate(e)}visitTime(t,e){return Br.startTime(e),Br.addUnit(e,t.unit),Br.addBitWidth(e,t.bitWidth),Br.endTime(e)}visitTimestamp(t,e){let i=t.timezone&&e.createString(t.timezone)||void 0;return Ur.startTimestamp(e),Ur.addUnit(e,t.unit),i!==void 0&&Ur.addTimezone(e,i),Ur.endTimestamp(e)}visitInterval(t,e){return As.startInterval(e),As.addUnit(e,t.unit),As.endInterval(e)}visitList(t,e){return zl.startList(e),zl.endList(e)}visitStruct(t,e){return Hl.startStruct_(e),Hl.endStruct_(e)}visitUnion(t,e){Wi.startTypeIdsVector(e,t.typeIds.length);let i=Wi.createTypeIdsVector(e,t.typeIds);return Wi.startUnion(e),Wi.addMode(e,t.mode),Wi.addTypeIds(e,i),Wi.endUnion(e)}visitDictionary(t,e){let i=this.visit(t.indices,e);return ar.startDictionaryEncoding(e),ar.addId(e,new i1(t.id,0)),ar.addIsOrdered(e,t.isOrdered),i!==void 0&&ar.addIndexType(e,i),ar.endDictionaryEncoding(e)}visitFixedSizeBinary(t,e){return Ms.startFixedSizeBinary(e),Ms.addByteWidth(e,t.byteWidth),Ms.endFixedSizeBinary(e)}visitFixedSizeList(t,e){return ws.startFixedSizeList(e),ws.addListSize(e,t.listSize),ws.endFixedSizeList(e)}visitMap(t,e){return Es.startMap(e),Es.addKeysSorted(e,t.keysSorted),Es.endMap(e)}},Yh=new Fm;function Kx(n,t=new Map){return new he(r1(n,t),jh(n.customMetadata),t)}function Bm(n){return new dn(n.count,t0(n.columns),e0(n.columns))}function Qx(n){return new On(Bm(n.data),n.id,n.isDelta)}function r1(n,t){return(n.fields||[]).filter(Boolean).map(e=>ne.fromJSON(e,t))}function $x(n,t){return(n.children||[]).filter(Boolean).map(e=>ne.fromJSON(e,t))}function t0(n){return(n||[]).reduce((t,e)=>[...t,new qi(e.count,s1(e.VALIDITY)),...t0(e.children)],[])}function e0(n,t=[]){for(let e=-1,i=(n||[]).length;++e<i;){let r=n[e];r.VALIDITY&&t.push(new Un(t.length,r.VALIDITY.length)),r.TYPE&&t.push(new Un(t.length,r.TYPE.length)),r.OFFSET&&t.push(new Un(t.length,r.OFFSET.length)),r.DATA&&t.push(new Un(t.length,r.DATA.length)),t=e0(r.children,t)}return t}function s1(n){return(n||[]).reduce((t,e)=>t+ +(e===0),0)}function n0(n,t){let e,i,r,s,o,a;return!t||!(s=n.dictionary)?(o=Jx(n,$x(n,t)),r=new ne(n.name,o,n.nullable,jh(n.customMetadata))):t.has(e=s.id)?(i=(i=s.indexType)?Zx(i):new nr,a=new $n(t.get(e),i,e,s.isOrdered),r=new ne(n.name,a,n.nullable,jh(n.customMetadata))):(i=(i=s.indexType)?Zx(i):new nr,t.set(e,o=Jx(n,$x(n,t))),a=new $n(o,i,e,s.isOrdered),r=new ne(n.name,a,n.nullable,jh(n.customMetadata))),r||null}function jh(n){return new Map(Object.entries(n||{}))}function Zx(n){return new We(n.isSigned,n.bitWidth)}function Jx(n,t){let e=n.type.name;switch(e){case"NONE":return new En;case"null":return new En;case"binary":return new Tr;case"utf8":return new Ar;case"bool":return new Er;case"list":return new Oi((t||[])[0]);case"struct":return new Te(t||[]);case"struct_":return new Te(t||[])}switch(e){case"int":{let i=n.type;return new We(i.isSigned,i.bitWidth)}case"floatingpoint":{let i=n.type;return new Pn(Ie[i.precision])}case"decimal":{let i=n.type;return new Cr(i.scale,i.precision,i.bitWidth)}case"date":{let i=n.type;return new Ir(un[i.unit])}case"time":{let i=n.type;return new Ui(ie[i.unit],i.bitWidth)}case"timestamp":{let i=n.type;return new Rr(ie[i.unit],i.timezone)}case"interval":{let i=n.type;return new Dr(An[i.unit])}case"union":{let i=n.type;return new Ni(ke[i.mode],i.typeIds||[],t||[])}case"fixedsizebinary":{let i=n.type;return new Pr(i.byteWidth)}case"fixedsizelist":{let i=n.type;return new ki(i.listSize,(t||[])[0])}case"map":{let i=n.type;return new zi((t||[])[0],i.keysSorted)}}throw new Error(`Unrecognized type: "${e}"`)}var uo=hn,o1=no,a1=Kn,Nn=class n{constructor(t,e,i,r){this._version=e,this._headerType=i,this.body=new Uint8Array(0),r&&(this._createHeader=()=>r),this._bodyLength=typeof t=="number"?t:t.low}static fromJSON(t,e){let i=new n(0,rn.V4,e);return i._createHeader=l1(t,e),i}static decode(t){t=new a1(kt(t));let e=Xi.getRootAsMessage(t),i=e.bodyLength(),r=e.version(),s=e.headerType(),o=new n(i,r,s);return o._createHeader=c1(e,s),o}static encode(t){let e=new o1,i=-1;return t.isSchema()?i=he.encode(e,t.header()):t.isRecordBatch()?i=dn.encode(e,t.header()):t.isDictionaryBatch()&&(i=On.encode(e,t.header())),Xi.startMessage(e),Xi.addVersion(e,rn.V4),Xi.addHeader(e,i),Xi.addHeaderType(e,t.headerType),Xi.addBodyLength(e,new uo(t.bodyLength,0)),Xi.finishMessageBuffer(e,Xi.endMessage(e)),e.asUint8Array()}static from(t,e=0){if(t instanceof he)return new n(0,rn.V4,ce.Schema,t);if(t instanceof dn)return new n(e,rn.V4,ce.RecordBatch,t);if(t instanceof On)return new n(e,rn.V4,ce.DictionaryBatch,t);throw new Error(`Unrecognized Message header: ${t}`)}get type(){return this.headerType}get version(){return this._version}get headerType(){return this._headerType}get bodyLength(){return this._bodyLength}header(){return this._createHeader()}isSchema(){return this.headerType===ce.Schema}isRecordBatch(){return this.headerType===ce.RecordBatch}isDictionaryBatch(){return this.headerType===ce.DictionaryBatch}},dn=class{constructor(t,e,i){this._nodes=e,this._buffers=i,this._length=typeof t=="number"?t:t.low}get nodes(){return this._nodes}get length(){return this._length}get buffers(){return this._buffers}},On=class{constructor(t,e,i=!1){this._data=t,this._isDelta=i,this._id=typeof e=="number"?e:e.low}get id(){return this._id}get data(){return this._data}get isDelta(){return this._isDelta}get length(){return this.data.length}get nodes(){return this.data.nodes}get buffers(){return this.data.buffers}},Un=class{constructor(t,e){this.offset=typeof t=="number"?t:t.low,this.length=typeof e=="number"?e:e.low}},qi=class{constructor(t,e){this.length=typeof t=="number"?t:t.low,this.nullCount=typeof e=="number"?e:e.low}};function l1(n,t){return(()=>{switch(t){case ce.Schema:return he.fromJSON(n);case ce.RecordBatch:return dn.fromJSON(n);case ce.DictionaryBatch:return On.fromJSON(n)}throw new Error(`Unrecognized Message type: { name: ${ce[t]}, type: ${t} }`)})}function c1(n,t){return(()=>{switch(t){case ce.Schema:return he.decode(n.header(new Ln));case ce.RecordBatch:return dn.decode(n.header(new ti),n.version());case ce.DictionaryBatch:return On.decode(n.header(new Wr),n.version())}throw new Error(`Unrecognized Message type: { name: ${ce[t]}, type: ${t} }`)})}ne.encode=v1;ne.decode=_1;ne.fromJSON=n0;he.encode=x1;he.decode=u1;he.fromJSON=Kx;dn.encode=b1;dn.decode=f1;dn.fromJSON=Bm;On.encode=S1;On.decode=h1;On.fromJSON=Qx;qi.encode=M1;qi.decode=p1;Un.encode=w1;Un.decode=d1;function u1(n,t=new Map){let e=y1(n,t);return new he(e,$h(n),t)}function f1(n,t=rn.V4){if(n.compression()!==null)throw new Error("Record batch compression not implemented");return new dn(n.length(),m1(n),g1(n,t))}function h1(n,t=rn.V4){return new On(dn.decode(n.data(),t),n.id(),n.isDelta())}function d1(n){return new Un(n.offset(),n.length())}function p1(n){return new qi(n.length(),n.nullCount())}function m1(n){let t=[];for(let e,i=-1,r=-1,s=n.nodesLength();++i<s;)(e=n.nodes(i))&&(t[++r]=qi.decode(e));return t}function g1(n,t){let e=[];for(let i,r=-1,s=-1,o=n.buffersLength();++r<o;)(i=n.buffers(r))&&(t<rn.V4&&(i.bb_pos+=8*(r+1)),e[++s]=Un.decode(i));return e}function y1(n,t){let e=[];for(let i,r=-1,s=-1,o=n.fieldsLength();++r<o;)(i=n.fields(r))&&(e[++s]=ne.decode(i,t));return e}function i0(n,t){let e=[];for(let i,r=-1,s=-1,o=n.childrenLength();++r<o;)(i=n.children(r))&&(e[++s]=ne.decode(i,t));return e}function _1(n,t){let e,i,r,s,o,a;return!t||!(a=n.dictionary())?(r=s0(n,i0(n,t)),i=new ne(n.name(),r,n.nullable(),$h(n))):t.has(e=a.id().low)?(s=(s=a.indexType())?r0(s):new nr,o=new $n(t.get(e),s,e,a.isOrdered()),i=new ne(n.name(),o,n.nullable(),$h(n))):(s=(s=a.indexType())?r0(s):new nr,t.set(e,r=s0(n,i0(n,t))),o=new $n(r,s,e,a.isOrdered()),i=new ne(n.name(),o,n.nullable(),$h(n))),i||null}function $h(n){let t=new Map;if(n)for(let e,i,r=-1,s=Math.trunc(n.customMetadataLength());++r<s;)(e=n.customMetadata(r))&&(i=e.key())!=null&&t.set(i,e.value());return t}function r0(n){return new We(n.isSigned(),n.bitWidth())}function s0(n,t){let e=n.typeType();switch(e){case De.NONE:return new En;case De.Null:return new En;case De.Binary:return new Tr;case De.Utf8:return new Ar;case De.Bool:return new Er;case De.List:return new Oi((t||[])[0]);case De.Struct_:return new Te(t||[])}switch(e){case De.Int:{let i=n.type(new Gi);return new We(i.isSigned(),i.bitWidth())}case De.FloatingPoint:{let i=n.type(new Ts);return new Pn(i.precision())}case De.Decimal:{let i=n.type(new lr);return new Cr(i.scale(),i.precision(),i.bitWidth())}case De.Date:{let i=n.type(new bs);return new Ir(i.unit())}case De.Time:{let i=n.type(new Br);return new Ui(i.unit(),i.bitWidth())}case De.Timestamp:{let i=n.type(new Ur);return new Rr(i.unit(),i.timezone())}case De.Interval:{let i=n.type(new As);return new Dr(i.unit())}case De.Union:{let i=n.type(new Wi);return new Ni(i.mode(),i.typeIdsArray()||[],t||[])}case De.FixedSizeBinary:{let i=n.type(new Ms);return new Pr(i.byteWidth())}case De.FixedSizeList:{let i=n.type(new ws);return new ki(i.listSize(),(t||[])[0])}case De.Map:{let i=n.type(new Es);return new zi((t||[])[0],i.keysSorted())}}throw new Error(`Unrecognized type: "${De[e]}" (${e})`)}function x1(n,t){let e=t.fields.map(s=>ne.encode(n,s));Ln.startFieldsVector(n,e.length);let i=Ln.createFieldsVector(n,e),r=t.metadata&&t.metadata.size>0?Ln.createCustomMetadataVector(n,[...t.metadata].map(([s,o])=>{let a=n.createString(`${s}`),l=n.createString(`${o}`);return Ke.startKeyValue(n),Ke.addKey(n,a),Ke.addValue(n,l),Ke.endKeyValue(n)})):-1;return Ln.startSchema(n),Ln.addFields(n,i),Ln.addEndianness(n,T1?vs.Little:vs.Big),r!==-1&&Ln.addCustomMetadata(n,r),Ln.endSchema(n)}function v1(n,t){let e=-1,i=-1,r=-1,s=t.type,o=t.typeId;Et.isDictionary(s)?(o=s.dictionary.typeId,r=Yh.visit(s,n),i=Yh.visit(s.dictionary,n)):i=Yh.visit(s,n);let a=(s.children||[]).map(u=>ne.encode(n,u)),l=xn.createChildrenVector(n,a),c=t.metadata&&t.metadata.size>0?xn.createCustomMetadataVector(n,[...t.metadata].map(([u,f])=>{let h=n.createString(`${u}`),p=n.createString(`${f}`);return Ke.startKeyValue(n),Ke.addKey(n,h),Ke.addValue(n,p),Ke.endKeyValue(n)})):-1;return t.name&&(e=n.createString(t.name)),xn.startField(n),xn.addType(n,i),xn.addTypeType(n,o),xn.addChildren(n,l),xn.addNullable(n,!!t.nullable),e!==-1&&xn.addName(n,e),r!==-1&&xn.addDictionary(n,r),c!==-1&&xn.addCustomMetadata(n,c),xn.endField(n)}function b1(n,t){let e=t.nodes||[],i=t.buffers||[];ti.startNodesVector(n,e.length);for(let o of e.slice().reverse())qi.encode(n,o);let r=n.endVector();ti.startBuffersVector(n,i.length);for(let o of i.slice().reverse())Un.encode(n,o);let s=n.endVector();return ti.startRecordBatch(n),ti.addLength(n,new uo(t.length,0)),ti.addNodes(n,r),ti.addBuffers(n,s),ti.endRecordBatch(n)}function S1(n,t){let e=dn.encode(n,t.data);return Wr.startDictionaryBatch(n),Wr.addId(n,new uo(t.id,0)),Wr.addIsDelta(n,t.isDelta),Wr.addData(n,e),Wr.endDictionaryBatch(n)}function M1(n,t){return wa.createFieldNode(n,new uo(t.length,0),new uo(t.nullCount,0))}function w1(n,t){return Ma.createBuffer(n,new uo(t.offset,0),new uo(t.length,0))}var T1=(()=>{let n=new ArrayBuffer(2);return new DataView(n).setInt16(0,256,!0),new Int16Array(n)[0]===256})();var Om=n=>`Expected ${ce[n]} Message in stream, but was null or length 0.`,Nm=n=>`Header pointer of flatbuffer-encoded ${ce[n]} Message is null or length 0.`,o0=(n,t)=>`Expected to read ${n} metadata bytes, but only read ${t}.`,a0=(n,t)=>`Expected to read ${n} bytes for message body, but only read ${t}.`,Aa=class{constructor(t){this.source=t instanceof ur?t:new ur(t)}[Symbol.iterator](){return this}next(){let t;return(t=this.readMetadataLength()).done?Ae:t.value===-1&&(t=this.readMetadataLength()).done?Ae:(t=this.readMetadata(t.value)).done?Ae:t}throw(t){return this.source.throw(t)}return(t){return this.source.return(t)}readMessage(t){let e;if((e=this.next()).done)return null;if(t!=null&&e.value.headerType!==t)throw new Error(Om(t));return e.value}readMessageBody(t){if(t<=0)return new Uint8Array(0);let e=kt(this.source.read(t));if(e.byteLength<t)throw new Error(a0(t,e.byteLength));return e.byteOffset%8===0&&e.byteOffset+e.byteLength<=e.buffer.byteLength?e:e.slice()}readSchema(t=!1){let e=ce.Schema,i=this.readMessage(e),r=i?.header();if(t&&!r)throw new Error(Nm(e));return r}readMetadataLength(){let t=this.source.read(Zh),e=t&&new Kn(t),i=e?.readInt32(0)||0;return{done:i===0,value:i}}readMetadata(t){let e=this.source.read(t);if(!e)return Ae;if(e.byteLength<t)throw new Error(o0(t,e.byteLength));return{done:!1,value:Nn.decode(e)}}},gc=class{constructor(t,e){this.source=t instanceof yi?t:Ff(t)?new Cs(t,e):new yi(t)}[Symbol.asyncIterator](){return this}next(){return ut(this,void 0,void 0,function*(){let t;return(t=yield this.readMetadataLength()).done?Ae:t.value===-1&&(t=yield this.readMetadataLength()).done?Ae:(t=yield this.readMetadata(t.value)).done?Ae:t})}throw(t){return ut(this,void 0,void 0,function*(){return yield this.source.throw(t)})}return(t){return ut(this,void 0,void 0,function*(){return yield this.source.return(t)})}readMessage(t){return ut(this,void 0,void 0,function*(){let e;if((e=yield this.next()).done)return null;if(t!=null&&e.value.headerType!==t)throw new Error(Om(t));return e.value})}readMessageBody(t){return ut(this,void 0,void 0,function*(){if(t<=0)return new Uint8Array(0);let e=kt(yield this.source.read(t));if(e.byteLength<t)throw new Error(a0(t,e.byteLength));return e.byteOffset%8===0&&e.byteOffset+e.byteLength<=e.buffer.byteLength?e:e.slice()})}readSchema(t=!1){return ut(this,void 0,void 0,function*(){let e=ce.Schema,i=yield this.readMessage(e),r=i?.header();if(t&&!r)throw new Error(Nm(e));return r})}readMetadataLength(){return ut(this,void 0,void 0,function*(){let t=yield this.source.read(Zh),e=t&&new Kn(t),i=e?.readInt32(0)||0;return{done:i===0,value:i}})}readMetadata(t){return ut(this,void 0,void 0,function*(){let e=yield this.source.read(t);if(!e)return Ae;if(e.byteLength<t)throw new Error(o0(t,e.byteLength));return{done:!1,value:Nn.decode(e)}})}},yc=class extends Aa{constructor(t){super(new Uint8Array(0)),this._schema=!1,this._body=[],this._batchIndex=0,this._dictionaryIndex=0,this._json=t instanceof Xl?t:new Xl(t)}next(){let{_json:t}=this;if(!this._schema)return this._schema=!0,{done:!1,value:Nn.fromJSON(t.schema,ce.Schema)};if(this._dictionaryIndex<t.dictionaries.length){let e=t.dictionaries[this._dictionaryIndex++];return this._body=e.data.columns,{done:!1,value:Nn.fromJSON(e,ce.DictionaryBatch)}}if(this._batchIndex<t.batches.length){let e=t.batches[this._batchIndex++];return this._body=e.columns,{done:!1,value:Nn.fromJSON(e,ce.RecordBatch)}}return this._body=[],Ae}readMessageBody(t){return e(this._body);function e(i){return(i||[]).reduce((r,s)=>[...r,...s.VALIDITY&&[s.VALIDITY]||[],...s.TYPE&&[s.TYPE]||[],...s.OFFSET&&[s.OFFSET]||[],...s.DATA&&[s.DATA]||[],...e(s.children)],[])}}readMessage(t){let e;if((e=this.next()).done)return null;if(t!=null&&e.value.headerType!==t)throw new Error(Om(t));return e.value}readSchema(){let t=ce.Schema,e=this.readMessage(t),i=e?.header();if(!e||!i)throw new Error(Nm(t));return i}},Zh=4,Um="ARROW1",Ea=new Uint8Array(Um.length);for(let n=0;n<Um.length;n+=1)Ea[n]=Um.codePointAt(n);function Jh(n,t=0){for(let e=-1,i=Ea.length;++e<i;)if(Ea[e]!==n[t+e])return!1;return!0}var Ca=Ea.length,km=Ca+Zh,l0=Ca*2+Zh;var ei=class n extends io{constructor(t){super(),this._impl=t}get closed(){return this._impl.closed}get schema(){return this._impl.schema}get autoDestroy(){return this._impl.autoDestroy}get dictionaries(){return this._impl.dictionaries}get numDictionaries(){return this._impl.numDictionaries}get numRecordBatches(){return this._impl.numRecordBatches}get footer(){return this._impl.isFile()?this._impl.footer:null}isSync(){return this._impl.isSync()}isAsync(){return this._impl.isAsync()}isFile(){return this._impl.isFile()}isStream(){return this._impl.isStream()}next(){return this._impl.next()}throw(t){return this._impl.throw(t)}return(t){return this._impl.return(t)}cancel(){return this._impl.cancel()}reset(t){return this._impl.reset(t),this._DOMStream=void 0,this._nodeStream=void 0,this}open(t){let e=this._impl.open(t);return Yn(e)?e.then(()=>this):this}readRecordBatch(t){return this._impl.isFile()?this._impl.readRecordBatch(t):null}[Symbol.iterator](){return this._impl[Symbol.iterator]()}[Symbol.asyncIterator](){return this._impl[Symbol.asyncIterator]()}toDOMStream(){return cn.toDOMStream(this.isSync()?{[Symbol.iterator]:()=>this}:{[Symbol.asyncIterator]:()=>this})}toNodeStream(){return cn.toNodeStream(this.isSync()?{[Symbol.iterator]:()=>this}:{[Symbol.asyncIterator]:()=>this},{objectMode:!0})}static throughNode(t){throw new Error('"throughNode" not available in this environment')}static throughDOM(t,e){throw new Error('"throughDOM" not available in this environment')}static from(t){return t instanceof n?t:Pf(t)?E1(t):Ff(t)?R1(t):Yn(t)?ut(this,void 0,void 0,function*(){return yield n.from(yield t)}):Bf(t)||wl(t)||Of(t)||di(t)?I1(new yi(t)):C1(new ur(t))}static readAll(t){return t instanceof n?t.isSync()?c0(t):u0(t):Pf(t)||ArrayBuffer.isView(t)||Pi(t)||Lf(t)?c0(t):u0(t)}},Xr=class extends ei{constructor(t){super(t),this._impl=t}readAll(){return[...this]}[Symbol.iterator](){return this._impl[Symbol.iterator]()}[Symbol.asyncIterator](){return qn(this,arguments,function*(){yield Ht(yield*oa(Di(this[Symbol.iterator]())))})}},fo=class extends ei{constructor(t){super(t),this._impl=t}readAll(){var t,e;return ut(this,void 0,void 0,function*(){let i=new Array;try{for(var r=Di(this),s;s=yield r.next(),!s.done;){let o=s.value;i.push(o)}}catch(o){t={error:o}}finally{try{s&&!s.done&&(e=r.return)&&(yield e.call(r))}finally{if(t)throw t.error}}return i})}[Symbol.iterator](){throw new Error("AsyncRecordBatchStreamReader is not Iterable")}[Symbol.asyncIterator](){return this._impl[Symbol.asyncIterator]()}},ho=class extends Xr{constructor(t){super(t),this._impl=t}},Kh=class extends fo{constructor(t){super(t),this._impl=t}},Qh=class{constructor(t=new Map){this.closed=!1,this.autoDestroy=!0,this._dictionaryIndex=0,this._recordBatchIndex=0,this.dictionaries=t}get numDictionaries(){return this._dictionaryIndex}get numRecordBatches(){return this._recordBatchIndex}isSync(){return!1}isAsync(){return!1}isFile(){return!1}isStream(){return!1}reset(t){return this._dictionaryIndex=0,this._recordBatchIndex=0,this.schema=t,this.dictionaries=new Map,this}_loadRecordBatch(t,e){let i=this._loadVectors(t,e,this.schema.fields),r=Gt({type:new Te(this.schema.fields),length:t.length,children:i});return new He(this.schema,r)}_loadDictionaryBatch(t,e){let{id:i,isDelta:r}=t,{dictionaries:s,schema:o}=this,a=s.get(i);if(r||!a){let l=o.dictionaries.get(i),c=this._loadVectors(t.data,e,[l]);return(a&&r?a.concat(new se(c)):new se(c)).memoize()}return a.memoize()}_loadVectors(t,e,i){return new $l(e,t.nodes,t.buffers,this.dictionaries).visitMany(i)}},Ia=class extends Qh{constructor(t,e){super(e),this._reader=Pf(t)?new yc(this._handle=t):new Aa(this._handle=t)}isSync(){return!0}isStream(){return!0}[Symbol.iterator](){return this}cancel(){!this.closed&&(this.closed=!0)&&(this.reset()._reader.return(),this._reader=null,this.dictionaries=null)}open(t){return this.closed||(this.autoDestroy=f0(this,t),this.schema||(this.schema=this._reader.readSchema())||this.cancel()),this}throw(t){return!this.closed&&this.autoDestroy&&(this.closed=!0)?this.reset()._reader.throw(t):Ae}return(t){return!this.closed&&this.autoDestroy&&(this.closed=!0)?this.reset()._reader.return(t):Ae}next(){if(this.closed)return Ae;let t,{_reader:e}=this;for(;t=this._readNextMessageAndValidate();)if(t.isSchema())this.reset(t.header());else if(t.isRecordBatch()){this._recordBatchIndex++;let i=t.header(),r=e.readMessageBody(t.bodyLength);return{done:!1,value:this._loadRecordBatch(i,r)}}else if(t.isDictionaryBatch()){this._dictionaryIndex++;let i=t.header(),r=e.readMessageBody(t.bodyLength),s=this._loadDictionaryBatch(i,r);this.dictionaries.set(i.id,s)}return this.schema&&this._recordBatchIndex===0?(this._recordBatchIndex++,{done:!1,value:new co(this.schema)}):this.return()}_readNextMessageAndValidate(t){return this._reader.readMessage(t)}},Ra=class extends Qh{constructor(t,e){super(e),this._reader=new gc(this._handle=t)}isAsync(){return!0}isStream(){return!0}[Symbol.asyncIterator](){return this}cancel(){return ut(this,void 0,void 0,function*(){!this.closed&&(this.closed=!0)&&(yield this.reset()._reader.return(),this._reader=null,this.dictionaries=null)})}open(t){return ut(this,void 0,void 0,function*(){return this.closed||(this.autoDestroy=f0(this,t),this.schema||(this.schema=yield this._reader.readSchema())||(yield this.cancel())),this})}throw(t){return ut(this,void 0,void 0,function*(){return!this.closed&&this.autoDestroy&&(this.closed=!0)?yield this.reset()._reader.throw(t):Ae})}return(t){return ut(this,void 0,void 0,function*(){return!this.closed&&this.autoDestroy&&(this.closed=!0)?yield this.reset()._reader.return(t):Ae})}next(){return ut(this,void 0,void 0,function*(){if(this.closed)return Ae;let t,{_reader:e}=this;for(;t=yield this._readNextMessageAndValidate();)if(t.isSchema())yield this.reset(t.header());else if(t.isRecordBatch()){this._recordBatchIndex++;let i=t.header(),r=yield e.readMessageBody(t.bodyLength);return{done:!1,value:this._loadRecordBatch(i,r)}}else if(t.isDictionaryBatch()){this._dictionaryIndex++;let i=t.header(),r=yield e.readMessageBody(t.bodyLength),s=this._loadDictionaryBatch(i,r);this.dictionaries.set(i.id,s)}return this.schema&&this._recordBatchIndex===0?(this._recordBatchIndex++,{done:!1,value:new co(this.schema)}):yield this.return()})}_readNextMessageAndValidate(t){return ut(this,void 0,void 0,function*(){return yield this._reader.readMessage(t)})}},td=class extends Ia{constructor(t,e){super(t instanceof ql?t:new ql(t),e)}get footer(){return this._footer}get numDictionaries(){return this._footer?this._footer.numDictionaries:0}get numRecordBatches(){return this._footer?this._footer.numRecordBatches:0}isSync(){return!0}isFile(){return!0}open(t){if(!this.closed&&!this._footer){this.schema=(this._footer=this._readFooter()).schema;for(let e of this._footer.dictionaryBatches())e&&this._readDictionaryBatch(this._dictionaryIndex++)}return super.open(t)}readRecordBatch(t){var e;if(this.closed)return null;this._footer||this.open();let i=(e=this._footer)===null||e===void 0?void 0:e.getRecordBatch(t);if(i&&this._handle.seek(i.offset)){let r=this._reader.readMessage(ce.RecordBatch);if(r?.isRecordBatch()){let s=r.header(),o=this._reader.readMessageBody(r.bodyLength);return this._loadRecordBatch(s,o)}}return null}_readDictionaryBatch(t){var e;let i=(e=this._footer)===null||e===void 0?void 0:e.getDictionaryBatch(t);if(i&&this._handle.seek(i.offset)){let r=this._reader.readMessage(ce.DictionaryBatch);if(r?.isDictionaryBatch()){let s=r.header(),o=this._reader.readMessageBody(r.bodyLength),a=this._loadDictionaryBatch(s,o);this.dictionaries.set(s.id,a)}}}_readFooter(){let{_handle:t}=this,e=t.size-km,i=t.readInt32(e),r=t.readAt(e-i,i);return Or.decode(r)}_readNextMessageAndValidate(t){var e;if(this._footer||this.open(),this._footer&&this._recordBatchIndex<this.numRecordBatches){let i=(e=this._footer)===null||e===void 0?void 0:e.getRecordBatch(this._recordBatchIndex);if(i&&this._handle.seek(i.offset))return this._reader.readMessage(t)}return null}},zm=class extends Ra{constructor(t,...e){let i=typeof e[0]!="number"?e.shift():void 0,r=e[0]instanceof Map?e.shift():void 0;super(t instanceof Cs?t:new Cs(t,i),r)}get footer(){return this._footer}get numDictionaries(){return this._footer?this._footer.numDictionaries:0}get numRecordBatches(){return this._footer?this._footer.numRecordBatches:0}isFile(){return!0}isAsync(){return!0}open(t){let e=Object.create(null,{open:{get:()=>super.open}});return ut(this,void 0,void 0,function*(){if(!this.closed&&!this._footer){this.schema=(this._footer=yield this._readFooter()).schema;for(let i of this._footer.dictionaryBatches())i&&(yield this._readDictionaryBatch(this._dictionaryIndex++))}return yield e.open.call(this,t)})}readRecordBatch(t){var e;return ut(this,void 0,void 0,function*(){if(this.closed)return null;this._footer||(yield this.open());let i=(e=this._footer)===null||e===void 0?void 0:e.getRecordBatch(t);if(i&&(yield this._handle.seek(i.offset))){let r=yield this._reader.readMessage(ce.RecordBatch);if(r?.isRecordBatch()){let s=r.header(),o=yield this._reader.readMessageBody(r.bodyLength);return this._loadRecordBatch(s,o)}}return null})}_readDictionaryBatch(t){var e;return ut(this,void 0,void 0,function*(){let i=(e=this._footer)===null||e===void 0?void 0:e.getDictionaryBatch(t);if(i&&(yield this._handle.seek(i.offset))){let r=yield this._reader.readMessage(ce.DictionaryBatch);if(r?.isDictionaryBatch()){let s=r.header(),o=yield this._reader.readMessageBody(r.bodyLength),a=this._loadDictionaryBatch(s,o);this.dictionaries.set(s.id,a)}}})}_readFooter(){return ut(this,void 0,void 0,function*(){let{_handle:t}=this;t._pending&&(yield t._pending);let e=t.size-km,i=yield t.readInt32(e),r=yield t.readAt(e-i,i);return Or.decode(r)})}_readNextMessageAndValidate(t){return ut(this,void 0,void 0,function*(){if(this._footer||(yield this.open()),this._footer&&this._recordBatchIndex<this.numRecordBatches){let e=this._footer.getRecordBatch(this._recordBatchIndex);if(e&&(yield this._handle.seek(e.offset)))return yield this._reader.readMessage(t)}return null})}},Vm=class extends Ia{constructor(t,e){super(t,e)}_loadVectors(t,e,i){return new Mh(e,t.nodes,t.buffers,this.dictionaries).visitMany(i)}};function f0(n,t){return t&&typeof t.autoDestroy=="boolean"?t.autoDestroy:n.autoDestroy}function*c0(n){let t=ei.from(n);try{if(!t.open({autoDestroy:!1}).closed)do yield t;while(!t.reset().open().closed)}finally{t.cancel()}}function u0(n){return qn(this,arguments,function*(){let e=yield Ht(ei.from(n));try{if(!(yield Ht(e.open({autoDestroy:!1}))).closed)do yield yield Ht(e);while(!(yield Ht(e.reset().open())).closed)}finally{yield Ht(e.cancel())}})}function E1(n){return new Xr(new Vm(n))}function C1(n){let t=n.peek(Ca+7&-8);return t&&t.byteLength>=4?Jh(t)?new ho(new td(n.read())):new Xr(new Ia(n)):new Xr(new Ia((function*(){})()))}function I1(n){return ut(this,void 0,void 0,function*(){let t=yield n.peek(Ca+7&-8);return t&&t.byteLength>=4?Jh(t)?new ho(new td(yield n.read())):new fo(new Ra(n)):new fo(new Ra((function(){return qn(this,arguments,function*(){})})()))})}function R1(n){return ut(this,void 0,void 0,function*(){let{size:t}=yield n.stat(),e=new Cs(n,t);return t>=l0&&Jh(yield e.readAt(0,Ca+7&-8))?new Kh(new zm(e)):new fo(new Ra(e))})}var Xe=class n extends It{constructor(){super(),this._byteLength=0,this._nodes=[],this._buffers=[],this._bufferRegions=[]}static assemble(...t){let e=r=>r.flatMap(s=>Array.isArray(s)?e(s):s instanceof He?s.data.children:s.data),i=new n;return i.visitMany(e(t)),i}visit(t){if(t instanceof se)return this.visitMany(t.data),this;let{type:e}=t;if(!Et.isDictionary(e)){let{length:i,nullCount:r}=t;if(i>2147483647)throw new RangeError("Cannot write arrays larger than 2^31 - 1 in length");Et.isNull(e)||Yi.call(this,r<=0?new Uint8Array(0):pa(t.offset,i,t.nullBitmap)),this.nodes.push(new qi(i,r))}return super.visit(t)}visitNull(t){return this}visitDictionary(t){return this.visit(t.clone(t.type.indices))}get nodes(){return this._nodes}get buffers(){return this._buffers}get byteLength(){return this._byteLength}get bufferRegions(){return this._bufferRegions}};function Yi(n){let t=n.byteLength+7&-8;return this.buffers.push(n),this.bufferRegions.push(new Un(this._byteLength,t)),this._byteLength+=t,this}function D1(n){let{type:t,length:e,typeIds:i,valueOffsets:r}=n;if(Yi.call(this,i),t.mode===ke.Sparse)return Hm.call(this,n);if(t.mode===ke.Dense){if(n.offset<=0)return Yi.call(this,r),Hm.call(this,n);{let s=i.reduce((u,f)=>Math.max(u,f),i[0]),o=new Int32Array(s+1),a=new Int32Array(s+1).fill(-1),l=new Int32Array(e),c=Tl(-r[0],e,r);for(let u,f,h=-1;++h<e;)(f=a[u=i[h]])===-1&&(f=a[u]=c[u]),l[h]=c[h]-f,++o[u];Yi.call(this,l);for(let u,f=-1,h=t.children.length;++f<h;)if(u=n.children[f]){let p=t.typeIds[f],g=Math.min(e,o[p]);this.visit(u.slice(a[p],g))}}}return this}function P1(n){let t;return n.nullCount>=n.length?Yi.call(this,new Uint8Array(0)):(t=n.values)instanceof Uint8Array?Yi.call(this,pa(n.offset,n.length,t)):Yi.call(this,Qs(n.values))}function Is(n){return Yi.call(this,n.values.subarray(0,n.length*n.stride))}function h0(n){let{length:t,values:e,valueOffsets:i}=n,r=i[0],s=i[t],o=Math.min(s-r,e.byteLength-r);return Yi.call(this,Tl(-i[0],t,i)),Yi.call(this,e.subarray(r,r+o)),this}function Gm(n){let{length:t,valueOffsets:e}=n;return e&&Yi.call(this,Tl(e[0],t,e)),this.visit(n.children[0])}function Hm(n){return this.visitMany(n.type.children.map((t,e)=>n.children[e]).filter(Boolean))[0]}Xe.prototype.visitBool=P1;Xe.prototype.visitInt=Is;Xe.prototype.visitFloat=Is;Xe.prototype.visitUtf8=h0;Xe.prototype.visitBinary=h0;Xe.prototype.visitFixedSizeBinary=Is;Xe.prototype.visitDate=Is;Xe.prototype.visitTimestamp=Is;Xe.prototype.visitTime=Is;Xe.prototype.visitDecimal=Is;Xe.prototype.visitList=Gm;Xe.prototype.visitStruct=Hm;Xe.prototype.visitUnion=D1;Xe.prototype.visitInterval=Is;Xe.prototype.visitFixedSizeList=Gm;Xe.prototype.visitMap=Gm;var po=class extends io{constructor(t){super(),this._position=0,this._started=!1,this._sink=new cr,this._schema=null,this._dictionaryBlocks=[],this._recordBatchBlocks=[],this._dictionaryDeltaOffsets=new Map,Tn(t)||(t={autoDestroy:!0,writeLegacyIpcFormat:!1}),this._autoDestroy=typeof t.autoDestroy=="boolean"?t.autoDestroy:!0,this._writeLegacyIpcFormat=typeof t.writeLegacyIpcFormat=="boolean"?t.writeLegacyIpcFormat:!1}static throughNode(t){throw new Error('"throughNode" not available in this environment')}static throughDOM(t,e){throw new Error('"throughDOM" not available in this environment')}toString(t=!1){return this._sink.toString(t)}toUint8Array(t=!1){return this._sink.toUint8Array(t)}writeAll(t){return Yn(t)?t.then(e=>this.writeAll(e)):di(t)?Xm(this,t):Wm(this,t)}get closed(){return this._sink.closed}[Symbol.asyncIterator](){return this._sink[Symbol.asyncIterator]()}toDOMStream(t){return this._sink.toDOMStream(t)}toNodeStream(t){return this._sink.toNodeStream(t)}close(){return this.reset()._sink.close()}abort(t){return this.reset()._sink.abort(t)}finish(){return this._autoDestroy?this.close():this.reset(this._sink,this._schema),this}reset(t=this._sink,e=null){return t===this._sink||t instanceof cr?this._sink=t:(this._sink=new cr,t&&U_(t)?this.toDOMStream({type:"bytes"}).pipeTo(t):t&&O_(t)&&this.toNodeStream({objectMode:!1}).pipe(t)),this._started&&this._schema&&this._writeFooter(this._schema),this._started=!1,this._dictionaryBlocks=[],this._recordBatchBlocks=[],this._dictionaryDeltaOffsets=new Map,(!e||!lo(e,this._schema))&&(e==null?(this._position=0,this._schema=null):(this._started=!0,this._schema=e,this._writeSchema(e))),this}write(t){let e=null;if(this._sink){if(t==null)return this.finish()&&void 0;if(t instanceof Bn&&!(e=t.schema))return this.finish()&&void 0;if(t instanceof He&&!(e=t.schema))return this.finish()&&void 0}else throw new Error("RecordBatchWriter is closed");if(e&&!lo(e,this._schema)){if(this._started&&this._autoDestroy)return this.close();this.reset(this._sink,e)}t instanceof He?t instanceof co||this._writeRecordBatch(t):t instanceof Bn?this.writeAll(t.batches):Pi(t)&&this.writeAll(t)}_writeMessage(t,e=8){let i=e-1,r=Nn.encode(t),s=r.byteLength,o=this._writeLegacyIpcFormat?4:8,a=s+o+i&~i,l=a-s-o;return t.headerType===ce.RecordBatch?this._recordBatchBlocks.push(new Nr(a,t.bodyLength,this._position)):t.headerType===ce.DictionaryBatch&&this._dictionaryBlocks.push(new Nr(a,t.bodyLength,this._position)),this._writeLegacyIpcFormat||this._write(Int32Array.of(-1)),this._write(Int32Array.of(a-o)),s>0&&this._write(r),this._writePadding(l)}_write(t){if(this._started){let e=kt(t);e&&e.byteLength>0&&(this._sink.write(e),this._position+=e.byteLength)}return this}_writeSchema(t){return this._writeMessage(Nn.from(t))}_writeFooter(t){return this._writeLegacyIpcFormat?this._write(Int32Array.of(0)):this._write(Int32Array.of(-1,0))}_writeMagic(){return this._write(Ea)}_writePadding(t){return t>0?this._write(new Uint8Array(t)):this}_writeRecordBatch(t){let{byteLength:e,nodes:i,bufferRegions:r,buffers:s}=Xe.assemble(t),o=new dn(t.numRows,i,r),a=Nn.from(o,e);return this._writeDictionaries(t)._writeMessage(a)._writeBodyBuffers(s)}_writeDictionaryBatch(t,e,i=!1){this._dictionaryDeltaOffsets.set(e,t.length+(this._dictionaryDeltaOffsets.get(e)||0));let{byteLength:r,nodes:s,bufferRegions:o,buffers:a}=Xe.assemble(new se([t])),l=new dn(t.length,s,o),c=new On(l,e,i),u=Nn.from(c,r);return this._writeMessage(u)._writeBodyBuffers(a)}_writeBodyBuffers(t){let e,i,r;for(let s=-1,o=t.length;++s<o;)(e=t[s])&&(i=e.byteLength)>0&&(this._write(e),(r=(i+7&-8)-i)>0&&this._writePadding(r));return this}_writeDictionaries(t){for(let[e,i]of t.dictionaries){let r=this._dictionaryDeltaOffsets.get(e)||0;if(r===0||(i=i?.slice(r)).length>0)for(let s of i.data)this._writeDictionaryBatch(s,e,r>0),r+=s.length}return this}},mo=class n extends po{static writeAll(t,e){let i=new n(e);return Yn(t)?t.then(r=>i.writeAll(r)):di(t)?Xm(i,t):Wm(i,t)}},go=class n extends po{static writeAll(t){let e=new n;return Yn(t)?t.then(i=>e.writeAll(i)):di(t)?Xm(e,t):Wm(e,t)}constructor(){super(),this._autoDestroy=!0}_writeSchema(t){return this._writeMagic()._writePadding(2)}_writeFooter(t){let e=Or.encode(new Or(t,rn.V4,this._recordBatchBlocks,this._dictionaryBlocks));return super._writeFooter(t)._write(e)._write(Int32Array.of(e.byteLength))._writeMagic()}};function Wm(n,t){let e=t;t instanceof Bn&&(e=t.batches,n.reset(void 0,t.schema));for(let i of e)n.write(i);return n.finish()}function Xm(n,t){var e,i,r,s;return ut(this,void 0,void 0,function*(){try{for(e=Di(t);i=yield e.next(),!i.done;){let o=i.value;n.write(o)}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=e.return)&&(yield s.call(e))}finally{if(r)throw r.error}}return n.finish()})}function d0(n,t){if(di(n))return F1(n,t);if(Pi(n))return L1(n,t);throw new Error("toDOMStream() must be called with an Iterable or AsyncIterable")}function L1(n,t){let e=null,i=t?.type==="bytes"||!1,r=t?.highWaterMark||Math.pow(2,24);return new ReadableStream(Object.assign(Object.assign({},t),{start(o){s(o,e||(e=n[Symbol.iterator]()))},pull(o){e?s(o,e):o.close()},cancel(){(e?.return&&e.return()||!0)&&(e=null)}}),Object.assign({highWaterMark:i?r:void 0},t));function s(o,a){let l,c=null,u=o.desiredSize||null;for(;!(c=a.next(i?u:null)).done;)if(ArrayBuffer.isView(c.value)&&(l=kt(c.value))&&(u!=null&&i&&(u=u-l.byteLength+1),c.value=l),o.enqueue(c.value),u!=null&&--u<=0)return;o.close()}}function F1(n,t){let e=null,i=t?.type==="bytes"||!1,r=t?.highWaterMark||Math.pow(2,24);return new ReadableStream(Object.assign(Object.assign({},t),{start(o){return ut(this,void 0,void 0,function*(){yield s(o,e||(e=n[Symbol.asyncIterator]()))})},pull(o){return ut(this,void 0,void 0,function*(){e?yield s(o,e):o.close()})},cancel(){return ut(this,void 0,void 0,function*(){(e?.return&&(yield e.return())||!0)&&(e=null)})}}),Object.assign({highWaterMark:i?r:void 0},t));function s(o,a){return ut(this,void 0,void 0,function*(){let l,c=null,u=o.desiredSize||null;for(;!(c=yield a.next(i?u:null)).done;)if(ArrayBuffer.isView(c.value)&&(l=kt(c.value))&&(u!=null&&i&&(u=u-l.byteLength+1),c.value=l),o.enqueue(c.value),u!=null&&--u<=0)return;o.close()})}}function g0(n){return new qm(n)}var qm=class{constructor(t){this._numChunks=0,this._finished=!1,this._bufferedSize=0;let{["readableStrategy"]:e,["writableStrategy"]:i,["queueingStrategy"]:r="count"}=t,s=F_(t,["readableStrategy","writableStrategy","queueingStrategy"]);this._controller=null,this._builder=so(s),this._getSize=r!=="bytes"?p0:m0;let{["highWaterMark"]:o=r==="bytes"?Math.pow(2,14):1e3}=Object.assign({},e),{["highWaterMark"]:a=r==="bytes"?Math.pow(2,14):1e3}=Object.assign({},i);this.readable=new ReadableStream({cancel:()=>{this._builder.clear()},pull:l=>{this._maybeFlush(this._builder,this._controller=l)},start:l=>{this._maybeFlush(this._builder,this._controller=l)}},{highWaterMark:o,size:r!=="bytes"?p0:m0}),this.writable=new WritableStream({abort:()=>{this._builder.clear()},write:()=>{this._maybeFlush(this._builder,this._controller)},close:()=>{this._maybeFlush(this._builder.finish(),this._controller)}},{highWaterMark:a,size:l=>this._writeValueAndReturnChunkSize(l)})}_writeValueAndReturnChunkSize(t){let e=this._bufferedSize;return this._bufferedSize=this._getSize(this._builder.append(t)),this._bufferedSize-e}_maybeFlush(t,e){e!=null&&(this._bufferedSize>=e.desiredSize&&++this._numChunks&&this._enqueue(e,t.toVector()),t.finished&&((t.length>0||this._numChunks===0)&&++this._numChunks&&this._enqueue(e,t.toVector()),!this._finished&&(this._finished=!0)&&this._enqueue(e,null)))}_enqueue(t,e){this._bufferedSize=0,this._controller=null,e==null?t.close():t.enqueue(e)}},p0=n=>{var t;return(t=n?.length)!==null&&t!==void 0?t:0},m0=n=>{var t;return(t=n?.byteLength)!==null&&t!==void 0?t:0};function ed(n,t){let e=new cr,i=null,r=new ReadableStream({cancel(){return ut(this,void 0,void 0,function*(){yield e.close()})},start(a){return ut(this,void 0,void 0,function*(){yield o(a,i||(i=yield s()))})},pull(a){return ut(this,void 0,void 0,function*(){i?yield o(a,i):a.close()})}});return{writable:new WritableStream(e,Object.assign({highWaterMark:Math.pow(2,14)},n)),readable:r};function s(){return ut(this,void 0,void 0,function*(){return yield(yield ei.from(e)).open(t)})}function o(a,l){return ut(this,void 0,void 0,function*(){let c=a.desiredSize,u=null;for(;!(u=yield l.next()).done;)if(a.enqueue(u.value),c!=null&&--c<=0)return;a.close()})}}function nd(n,t){let e=new this(n),i=new yi(e),r=new ReadableStream({cancel(){return ut(this,void 0,void 0,function*(){yield i.cancel()})},pull(o){return ut(this,void 0,void 0,function*(){yield s(o)})},start(o){return ut(this,void 0,void 0,function*(){yield s(o)})}},Object.assign({highWaterMark:Math.pow(2,14)},t));return{writable:new WritableStream(e,n),readable:r};function s(o){return ut(this,void 0,void 0,function*(){let a=null,l=o.desiredSize;for(;a=yield i.read(l||null);)if(o.enqueue(a),l!=null&&(l-=a.byteLength)<=0)return;o.close()})}}function Rs(n){let t=ei.from(n);return Yn(t)?t.then(e=>Rs(e)):t.isAsync()?t.readAll().then(e=>new Bn(e)):new Bn(t.readAll())}function Da(n,t="stream"){return(t==="stream"?mo:go).writeAll(n).toUint8Array(!0)}var B1=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},rm),Im),vm),sm),tm),xm),{compareSchemas:lo,compareFields:Gx,compareTypes:Wx});cn.toDOMStream=d0;Re.throughDOM=g0;ei.throughDOM=ed;ho.throughDOM=ed;Xr.throughDOM=ed;po.throughDOM=nd;go.throughDOM=nd;mo.throughDOM=nd;var id=(function(){function n(t,e,i,r){var s=this;this.getCell=function(o,a){var l=o<s.headerRows&&a<s.headerColumns,c=o>=s.headerRows&&a<s.headerColumns,u=o<s.headerRows&&a>=s.headerColumns;if(l){var f=["blank"];return a>0&&f.push("level"+o),{type:"blank",classNames:f.join(" "),content:""}}else if(u){var h=a-s.headerColumns,f=["col_heading","level"+o,"col"+h];return{type:"columns",classNames:f.join(" "),content:s.getContent(s.columnsTable,h,o)}}else if(c){var p=o-s.headerRows,f=["row_heading","level"+a,"row"+p];return{type:"index",id:"T_".concat(s.uuid,"level").concat(a,"_row").concat(p),classNames:f.join(" "),content:s.getContent(s.indexTable,p,a)}}else{var p=o-s.headerRows,h=a-s.headerColumns,f=["data","row"+p,"col"+h],g=s.styler?s.getContent(s.styler.displayValuesTable,p,h):s.getContent(s.dataTable,p,h);return{type:"data",id:"T_".concat(s.uuid,"row").concat(p,"_col").concat(h),classNames:f.join(" "),content:g}}},this.getContent=function(o,a,l){var c=o.getChildAt(l);if(c===null)return"";var u=s.getColumnTypeId(o,l);switch(u){case P.Timestamp:return s.nanosToDate(c.get(a));default:return c.get(a)}},this.dataTable=Rs(t),this.indexTable=Rs(e),this.columnsTable=Rs(i),this.styler=r?{caption:r.caption,displayValuesTable:Rs(r.displayValues),styles:r.styles,uuid:r.uuid}:void 0}return Object.defineProperty(n.prototype,"rows",{get:function(){return this.indexTable.numRows+this.columnsTable.numCols},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"columns",{get:function(){return this.indexTable.numCols+this.columnsTable.numRows},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"headerRows",{get:function(){return this.rows-this.dataRows},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"headerColumns",{get:function(){return this.columns-this.dataColumns},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"dataRows",{get:function(){return this.dataTable.numRows},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"dataColumns",{get:function(){return this.dataTable.numCols},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"uuid",{get:function(){return this.styler&&this.styler.uuid},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"caption",{get:function(){return this.styler&&this.styler.caption},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"styles",{get:function(){return this.styler&&this.styler.styles},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"table",{get:function(){return this.dataTable},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"index",{get:function(){return this.indexTable},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"columnTable",{get:function(){return this.columnsTable},enumerable:!1,configurable:!0}),n.prototype.serialize=function(){return{data:Da(this.dataTable),index:Da(this.indexTable),columns:Da(this.columnsTable)}},n.prototype.getColumnTypeId=function(t,e){return t.schema.fields[e].type.typeId},n.prototype.nanosToDate=function(t){return new Date(t/1e6)},n})();var _c=function(){return _c=Object.assign||function(n){for(var t,e=1,i=arguments.length;e<i;e++){t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_c.apply(this,arguments)},xc;(function(n){n.COMPONENT_READY="streamlit:componentReady",n.SET_COMPONENT_VALUE="streamlit:setComponentValue",n.SET_FRAME_HEIGHT="streamlit:setFrameHeight"})(xc||(xc={}));var xi=(function(){function n(){}return n.API_VERSION=1,n.RENDER_EVENT="streamlit:render",n.events=new EventTarget,n.registeredMessageListener=!1,n.setComponentReady=function(){n.registeredMessageListener||(window.addEventListener("message",n.onMessageEvent),n.registeredMessageListener=!0),n.sendBackMsg(xc.COMPONENT_READY,{apiVersion:n.API_VERSION})},n.setFrameHeight=function(t){t===void 0&&(t=document.body.scrollHeight),t!==n.lastFrameHeight&&(n.lastFrameHeight=t,n.sendBackMsg(xc.SET_FRAME_HEIGHT,{height:t}))},n.setComponentValue=function(t){var e;t instanceof id?(e="dataframe",t=t.serialize()):O1(t)?(e="bytes",t=new Uint8Array(t.buffer)):t instanceof ArrayBuffer?(e="bytes",t=new Uint8Array(t)):e="json",n.sendBackMsg(xc.SET_COMPONENT_VALUE,{value:t,dataType:e})},n.onMessageEvent=function(t){var e=t.data.type;switch(e){case n.RENDER_EVENT:n.onRenderMessage(t.data);break}},n.onRenderMessage=function(t){var e=t.args;e==null&&(console.error("Got null args in onRenderMessage. This should never happen"),e={});var i=t.dfs&&t.dfs.length>0?n.argsDataframeToObject(t.dfs):{};e=_c(_c({},e),i);var r=!!t.disabled,s=t.theme;s&&U1(s);var o={disabled:r,args:e,theme:s},a=new CustomEvent(n.RENDER_EVENT,{detail:o});n.events.dispatchEvent(a)},n.argsDataframeToObject=function(t){var e=t.map(function(i){var r=i.key,s=i.value;return[r,n.toArrowTable(s)]});return Object.fromEntries(e)},n.toArrowTable=function(t){var e,i=(e=t.data,e.data),r=e.index,s=e.columns,o=e.styler;return new id(i,r,s,o)},n.sendBackMsg=function(t,e){window.parent.postMessage(_c({isStreamlitMessage:!0,type:t},e),"*")},n})(),U1=function(n){var t=document.createElement("style");document.head.appendChild(t),t.innerHTML=`
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
  `)};function O1(n){var t=!1;try{t=n instanceof BigInt64Array||n instanceof BigUint64Array}catch{}return n instanceof Int8Array||n instanceof Uint8Array||n instanceof Uint8ClampedArray||n instanceof Int16Array||n instanceof Uint16Array||n instanceof Int32Array||n instanceof Uint32Array||n instanceof Float32Array||n instanceof Float64Array||t}var N1=(function(){var n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(i,r){i.__proto__=r}||function(i,r){for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(i[s]=r[s])},n(t,e)};return function(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");n(t,e);function i(){this.constructor=t}t.prototype=e===null?Object.create(e):(i.prototype=e.prototype,new i)}})(),z1=(function(n){N1(t,n);function t(){return n!==null&&n.apply(this,arguments)||this}return t.prototype.componentDidMount=function(){xi.setFrameHeight()},t.prototype.componentDidUpdate=function(){xi.setFrameHeight()},t})(y0.default.PureComponent);var _0=(n,t,e=[])=>{let i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(t).forEach(r=>{i.setAttribute(r,String(t[r]))}),e.length&&e.forEach(r=>{let s=_0(...r);i.appendChild(s)}),i},x0=([n,t,e])=>_0(n,t,e);var V1=n=>Array.from(n.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}),H1=n=>typeof n=="string"?n:!n||!n.class?"":n.class&&typeof n.class=="string"?n.class.split(" "):n.class&&Array.isArray(n.class)?n.class:"",G1=n=>n.flatMap(H1).map(e=>e.trim()).filter(Boolean).filter((e,i,r)=>r.indexOf(e)===i).join(" "),W1=n=>n.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,i)=>e.toUpperCase()+i.toLowerCase()),Ym=(n,{nameAttr:t,icons:e,attrs:i})=>{let r=n.getAttribute(t);if(r==null)return;let s=W1(r),o=e[s];if(!o)return console.warn(`${n.outerHTML} icon name was not found in the provided icons object.`);let a=V1(n),[l,c,u]=o,f={...c,"data-lucide":r,...i,...a},h=G1(["lucide",`lucide-${r}`,a,i]);h&&Object.assign(f,{class:h});let p=x0([l,f,u]);return n.parentNode?.replaceChild(p,n)};var rd={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var jm=["svg",rd,[["circle",{cx:"12",cy:"12",r:"3"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}]]];var $m=["svg",rd,[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]]];var v0=({icons:n={},nameAttr:t="data-lucide",attrs:e={}}={})=>{if(!Object.values(n).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");let i=document.querySelectorAll(`[${t}]`);if(Array.from(i).forEach(r=>Ym(r,{nameAttr:t,icons:n,attrs:e})),t==="data-lucide"){let r=document.querySelectorAll("[icon-name]");r.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(r).forEach(s=>Ym(s,{nameAttr:"icon-name",icons:n,attrs:e})))}};function sd(n,t,e,i=[0,0,0]){return e.map((r,s)=>n.center[s]+t*(r-n.center[s])+i[s])}function b0(n,t,e,i={}){let r=new Map(n.map(o=>[o.part_id,o])),s=Object.fromEntries(n.map(o=>[String(o.part_id),[0,0,0]]));for(let o of e){let a=r.get(o.parent_id),l=r.get(o.child_id),c=sd(a,t[String(a.part_id)],o.anchor,s[String(a.part_id)]),u=sd(l,t[String(l.part_id)],o.anchor);s[String(l.part_id)]=c.map((f,h)=>f-u[h])}return Object.fromEntries(n.map(o=>{let a=String(o.part_id);return[a,s[a].map((l,c)=>l+(i[a]?.[c]??0))]}))}function S0(n,t,e){return Object.fromEntries(n.filter(i=>i.center).map(i=>{let r=t[String(i.part_id)];return[String(i.part_id),{scale:r,shift:i.center.map((s,o)=>(1-r)*s+e[String(i.part_id)][o])}]}))}function X1(n,t,e,i){let r=n.vertices[t],s=e[String(n.part_id)],o=r.map((l,c)=>s.scale*l+s.shift[c]),a=[...o];for(let l of i?.influences??[]){let c=l.weights[t];if(!c)continue;let u=e[String(l.reference_part_id)];for(let f=0;f<3;f+=1)a[f]+=c*(u.scale*r[f]+u.shift[f]-o[f])}return a}function M0(n,t,e,i){let r=t[String(n.part_id)];for(let s=0;s<n.vertices.length;s+=1){let o=n.vertices[s];for(let a=0;a<3;a+=1){let l=r.scale*o[a]+r.shift[a],c=l;for(let u of e.influences){let f=t[String(u.reference_part_id)];c+=u.weights[s]*(f.scale*o[a]+f.shift[a]-l)}i[s*3+a]=c-n.center[a]}}}function w0(n,t,e,i,r){let s=t.get(n.part_id),o=[0,0,0];for(let[a,l]of n.indices.entries()){let c=X1(s,l,e,i.parts[String(s.part_id)]);for(let u=0;u<3;u+=1)o[u]+=n.weights[a]*c[u]}return o.map((a,l)=>a+r[String(s.part_id)][l])}function T0(n,t){if(n==null)return{parts:{},anchors:{}};let e=new Map(t.map(o=>[o.part_id,o])),i=n.parts??{},r=n.anchors??{},s=()=>{throw new Error("\u5883\u754C\u306A\u3058\u307E\u305B\u306E\u9802\u70B9\u5BFE\u5FDC\u307E\u305F\u306F\u91CD\u307F\u304C\u4E0D\u6B63\u3067\u3059\u3002")};for(let[o,a]of Object.entries(i)){let l=e.get(Number(o));(!l?.center||!Array.isArray(a?.influences))&&s();let c=new Float64Array(l.vertices.length),u=new Set;for(let f of a.influences){(!e.get(f.reference_part_id)?.center||u.has(f.reference_part_id)||!Array.isArray(f.weights)||f.weights.length!==l.vertices.length)&&s(),u.add(f.reference_part_id);for(let[h,p]of f.weights.entries())(typeof p!="number"||!Number.isFinite(p)||p<0||p>1)&&s(),c[h]+=p,c[h]>1+1e-8&&s()}}for(let o of Object.values(r)){(!Array.isArray(o)||o.length!==2)&&s();for(let a of o){let l=e.get(a?.part_id);(!l?.center||!Array.isArray(a.indices)||!a.indices.length||!Array.isArray(a.weights)||a.indices.length!==a.weights.length)&&s();let c=0;for(let[u,f]of a.indices.entries()){let h=a.weights[u];(!Number.isInteger(f)||f<0||f>=l.vertices.length||typeof h!="number"||!Number.isFinite(h)||h<0)&&s(),c+=h}Math.abs(c-1)>1e-8&&s()}}return{...n,parts:i,anchors:r}}function vc(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)?n:{}}function q1(n){let t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let s of n)for(let o of s.vertices)for(let a=0;a<3;a+=1)t[a]=Math.min(t[a],o[a]),e[a]=Math.max(e[a],o[a]);let i=Math.max(...e.map((s,o)=>s-t[o])),r=Number.isFinite(i)&&i>0?i:1;return{limit:r,step:r/1e3}}function A0(n){let t=vc(n);if(!Array.isArray(t.parts)||!t.parts.length||typeof t.source_key!="string"||!t.source_key)throw new Error("\u7DE8\u96C6\u7528\u306E\u30D1\u30FC\u30C4\u30C7\u30FC\u30BF\u3092\u53D7\u3051\u53D6\u308C\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u753B\u9762\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002");let e=vc(t.scales),i=vc(t.offsets),r={},s={};for(let f of t.parts){let h=String(f.part_id),p=e[h]??1,g=i[h]??[0,0,0];if(typeof p!="number"||!Number.isFinite(p)||p<.1||p>3)throw new Error("\u30D1\u30FC\u30C4\u306E\u500D\u7387\u304C\u4E0D\u6B63\u3067\u3059\u3002");if(!Array.isArray(g)||g.length!==3||!g.every(_=>typeof _=="number"&&Number.isFinite(_)))throw new Error("\u30D1\u30FC\u30C4\u306EX/Y/Z\u79FB\u52D5\u91CF\u304C\u4E0D\u6B63\u3067\u3059\u3002");r[h]=p,s[h]=[...g]}let o=vc(t.movement),a=Number.isFinite(o.limit)&&o.limit>0&&Number.isFinite(o.step)&&o.step>0,l=a?{limit:o.limit,step:o.step}:q1(t.parts),c=vc(t.layout),u={...c,connections:Array.isArray(c.connections)?c.connections:[],attachments:Array.isArray(c.attachments)?c.attachments:[]};return{...t,scales:r,offsets:s,movement:l,layout:u,blending:T0(t.blending,t.parts),blending_key:t.blending_key??"legacy",source_key:t.source_key,sequence:Number.isInteger(t.sequence)&&t.sequence>=0?t.sequence:0,layout_key:t.layout_key??JSON.stringify(u),up_dir:/^[+-][XYZ]$/.test(t.up_dir)?t.up_dir:"+Z",follow:t.follow===!0,show_anchors:t.show_anchors===!0,supports_movement:a&&t.offsets!==null&&typeof t.offsets=="object"&&!Array.isArray(t.offsets)}}var Zm=document.getElementById("viewport"),E0=document.getElementById("sliders"),ad=document.getElementById("error"),Y1=.1,j1=3,ld=null,Sc=0,Yr={},vo={},od={limit:1,step:.001},bo=!1,Fa=!0,C0=0,La=new R,So=new Map,Ba=new Map,qr=null,Pa=[],xo={connections:[],attachments:[]},Jm=null,bc={parts:{},anchors:{}},I0=null,tg=!1,cd=!1,vi=null,yo=null,_o=null,R0=1,an,jr,on,bi,Ds;v0({icons:{RotateCcw:$m,Focus:jm}});function Km(n){console.error("Part editor render failed",n),ad.hidden=!1,ad.textContent=`3D\u8868\u793A\u3092\u958B\u59CB\u3067\u304D\u307E\u305B\u3093\uFF1A${n.message||n}`,xi.setFrameHeight(document.getElementById("workspace").offsetHeight+4)}try{an=new gf({antialias:!0,preserveDrawingBuffer:!0}),an.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),an.setClearColor(16317179),an.outputColorSpace=Sn,Zm.appendChild(an.domElement),an.domElement.setAttribute("aria-label","\u30D1\u30FC\u30C4\u7DE8\u96C6\u306E3D\u8868\u793A"),an.domElement.addEventListener("webglcontextlost",n=>{n.preventDefault(),Km(new Error("WebGL\u306E\u63A5\u7D9A\u304C\u5931\u308F\u308C\u307E\u3057\u305F\u3002\u753B\u9762\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002"))}),jr=new el,on=new yn(38,1,.001,1e4),jr.add(new cl(16777215,12898518,2.3));for(let[n,t]of[[[3,-4,5],2.8],[[-4,2,1],1.2]]){let e=new fl(16777215,t);e.position.set(...n),jr.add(e)}Ds=new _r,jr.add(Ds),on.position.set(3,-4,3)}catch(n){Km(n)}function Mc(){if(!an||!bi||!So.size)return;Ds.updateMatrixWorld(!0);let n=new li().setFromObject(Ds),t=n.getCenter(new R),e=Math.max(n.getSize(new R).length()/2,1e-8),i=on.position.clone().sub(bi.target).normalize();i.lengthSq()||i.set(1,-1,.8).normalize();let r=Math.min(on.fov*Math.PI/360,Math.atan(Math.tan(on.fov*Math.PI/360)*on.aspect)),s=e/Math.sin(r)*1.25;on.position.copy(t).addScaledVector(i,s),on.near=e/1e3,on.far=e*1e3,on.updateProjectionMatrix(),bi.target.copy(t),bi.minDistance=e/20,bi.maxDistance=e*100,bi.update(),C0=e,Fa=!0}function $1(){if(!an||!bi||!So.size)return;Ds.updateMatrixWorld(!0);let n=new li().setFromObject(Ds);n.getSize(new R).length()/2+n.getCenter(new R).distanceTo(bi.target)>C0*1.25&&Mc()}function wc(){let n=b0(Pa,Yr,tg?xo.attachments:[]),t=Object.fromEntries(Pa.map(r=>{let s=String(r.part_id);return[s,n[s].map((o,a)=>o+vo[s][a])]})),e=S0(Pa,Yr,n),i=new Map(Pa.map(r=>[r.part_id,r]));for(let r of Pa){let s=So.get(String(r.part_id));if(!s)continue;let o=String(r.part_id),a=bc.parts[o];if(a){let l=s.geometry.getAttribute("position");M0(r,e,a,l.array),l.needsUpdate=!0,s.geometry.computeVertexNormals(),s.geometry.computeBoundingBox(),s.geometry.computeBoundingSphere(),s.scale.setScalar(1),s.position.set(...r.center).add(new R(...vo[o])).sub(La)}else s.scale.setScalar(Yr[o]),s.position.set(...r.center).add(new R(...t[o])).sub(La)}if(vi){let r=vi.getAttribute("position"),s=vi.getAttribute("color");for(let[o,a]of xo.connections.entries()){let l=bc.anchors[String(a.connection_id)],c=l?l.map(h=>w0(h,i,e,bc,vo)):[a.part_a,a.part_b].map(h=>sd(i.get(h),Yr[String(h)],a.anchor,t[String(h)])),u=new R(...c[0]).distanceTo(new R(...c[1])),f=new Jt(u<=R0*1e-7?555107:14377010);for(let h=0;h<2;h+=1){let p=new R(...c[h]).sub(La);r.setXYZ(o*2+h,p.x,p.y,p.z),s.setXYZ(o*2+h,f.r,f.g,f.b)}}r.needsUpdate=!0,s.needsUpdate=!0,vi.computeBoundingSphere(),yo.visible=cd,_o.visible=cd}Fa=!0,$1()}function ud(n,t,e=!0){let i=String(n);Yr[i]=t;let r=Ba.get(i);r&&(r.input.value=String(t),r.output.value=`${t.toFixed(2)}\xD7`),e&&wc()}function Z1(n){return`${n>0?"+":""}${Number(n.toPrecision(6))}`}function fd(n,t,e,i=!0){let r=String(n);vo[r][t]=e;let s=Ba.get(r);s&&(s.moveInputs[t].value=String(e),s.moveOutputs[t].value=Z1(e)),i&&wc()}function Qm(){ld&&(bo=!1,Sc+=1,xi.setComponentValue({source_key:ld,sequence:Sc,scales:{...Yr},offsets:Object.fromEntries(Object.entries(vo).map(([n,t])=>[n,[...t]]))}))}function J1(n){ld=n.source_key,Sc=Number(n.sequence)||0,Yr={...n.scales},vo=Object.fromEntries(n.parts.map(i=>[String(i.part_id),[...n.offsets?.[String(i.part_id)]??[0,0,0]]])),od=n.movement,Pa=n.parts,xo=n.layout,Jm=n.layout_key,bc=n.blending,I0=n.blending_key,tg=n.follow,cd=n.show_anchors,Ba.clear(),E0.replaceChildren();for(let i of So.values())Ds?.remove(i),i.geometry.dispose(),i.material.dispose();So.clear(),vi&&(jr.remove(yo,_o),vi.dispose(),yo.material.dispose(),_o.material.dispose(),vi=yo=_o=null),qr&&(jr.remove(qr),qr.geometry.dispose(),qr.material.dispose(),qr=null);let t=new li;for(let i of n.parts)for(let r of i.vertices)t.expandByPoint(new R(...r));La=t.getCenter(new R);let e=new R;if(e[n.up_dir.slice(-1).toLowerCase()]=n.up_dir.startsWith("-")?-1:1,on){on.up.copy(e);let i=Math.abs(e.x)>.9?new R(0,1,0):new R(1,0,0),r=new R().crossVectors(i,e).normalize();on.position.copy(i).multiplyScalar(3).addScaledVector(r,4).addScaledVector(e,3),bi?.dispose(),bi=r_(on,an.domElement,e),bi.addEventListener("change",()=>{Fa=!0})}for(let i of n.parts){let r=String(i.part_id),s=!i.faces.length,o=document.createElement("div");o.className=s?"part empty":"part",o.dataset.partId=r;let a=document.createElement("div");a.className="part-heading";let l=document.createElement("span");l.className="swatch",l.style.backgroundColor=i.color;let c=document.createElement("label");c.className="part-name",c.textContent=i.name,c.htmlFor=`scale-${r}`;let u=document.createElement("output");u.htmlFor=`scale-${r}`;let f=document.createElement("input");if(f.type="range",f.id=`scale-${r}`,f.min=String(Y1),f.max=String(j1),f.step="0.01",f.value=String(Yr[r]??1),f.disabled=s,f.setAttribute("aria-label",i.name),f.addEventListener("pointerdown",()=>{bo=!0}),f.addEventListener("input",()=>ud(r,Number(f.value))),f.addEventListener("change",Qm),f.addEventListener("pointercancel",()=>{bo=!1}),a.append(l,c,u),o.append(a,f),s){let _=document.createElement("div");_.className="empty-label",_.textContent="\u9762\u306A\u3057",o.appendChild(_)}let h=document.createElement("div");h.className="endpoints";for(let _ of["0.10","3.00"]){let m=document.createElement("span");m.textContent=_,h.appendChild(m)}o.appendChild(h);let p=[],g=[];for(let[_,m]of["X","Y","Z"].entries()){let d=document.createElement("div");d.className="translation",d.dataset.axis=m;let A=document.createElement("div");A.className="translation-heading";let w=document.createElement("label");w.textContent=`${m} \u79FB\u52D5`,w.htmlFor=`move-${r}-${m}`;let S=document.createElement("output");S.htmlFor=w.htmlFor;let E=document.createElement("input");E.type="range",E.id=w.htmlFor,E.min=String(-od.limit),E.max=String(od.limit),E.step=String(od.step),E.disabled=s,E.setAttribute("aria-label",`${i.name} ${m}\u79FB\u52D5`),E.addEventListener("pointerdown",()=>{bo=!0}),E.addEventListener("input",()=>fd(r,_,Number(E.value))),E.addEventListener("change",Qm),A.append(w,S),d.append(A,E),o.appendChild(d),p.push(E),g.push(S)}if(E0.appendChild(o),Ba.set(r,{input:f,output:u,empty:s,moveInputs:p,moveOutputs:g}),!s&&an){let _=new R(...i.center),m=new Float32Array(i.vertices.length*3);i.vertices.forEach((S,E)=>{m[E*3]=S[0]-_.x,m[E*3+1]=S[1]-_.y,m[E*3+2]=S[2]-_.z});let d=new In;d.setAttribute("position",new Mn(m,3)),d.setIndex(i.faces),d.computeVertexNormals();let A=new ol({color:i.color,metalness:.02,roughness:.8,side:ci}),w=new Rn(d,A);w.name=i.name,w.position.copy(_).sub(La),w.userData.partId=i.part_id,Ds.add(w),So.set(r,w)}ud(r,Number(Yr[r]??1),!1);for(let _=0;_<3;_+=1)fd(r,_,Number(vo[r][_]),!1)}if(an){let i=Math.max(t.getSize(new R).length(),1e-8);R0=i,xo.connections.length&&(vi=new In,vi.setAttribute("position",new ln(new Float32Array(xo.connections.length*6),3)),vi.setAttribute("color",new ln(new Float32Array(xo.connections.length*6),3)),yo=new nl(vi,new jo({size:9,sizeAttenuation:!1,vertexColors:!0,depthTest:!1,depthWrite:!1})),_o=new Yo(vi,new Hs({vertexColors:!0,depthTest:!1,depthWrite:!1})),yo.renderOrder=21,_o.renderOrder=20,jr.add(yo,_o)),qr=new hl(i*1.6,12,12964824,15002092),qr.quaternion.setFromUnitVectors(new R(0,1,0),e);let r=1/0;for(let s of n.parts)for(let o of s.vertices)r=Math.min(r,new R(...o).sub(La).dot(e));qr.position.copy(e).multiplyScalar(r-i*.015),jr.add(qr),wc(),eg(),Mc()}}function eg(){if(an){let n=Math.max(Zm.clientWidth,1),t=Math.max(Zm.clientHeight,1);an.setSize(n,t,!1);let e=Math.abs(on.aspect-n/t)>.01;on.aspect=n/t,on.updateProjectionMatrix(),e&&So.size&&Mc(),Fa=!0}xi.setFrameHeight(document.getElementById("workspace").offsetHeight+4)}document.getElementById("reset").addEventListener("click",()=>{for(let n of Ba.keys()){ud(n,1,!1);for(let t=0;t<3;t+=1)fd(n,t,0,!1)}wc(),Qm()});document.getElementById("fit").addEventListener("click",Mc);window.addEventListener("pointerup",()=>{bo=!1});window.addEventListener("pointercancel",()=>{bo=!1});new ResizeObserver(eg).observe(document.getElementById("workspace"));xi.events.addEventListener(xi.RENDER_EVENT,n=>{try{let t=A0(n.detail?.args);if(t.source_key!==ld||t.blending_key!==I0)J1(t);else{let i=Jm!==t.layout_key;if(xo=t.layout,Jm=t.layout_key,tg=t.follow,cd=t.show_anchors,bc=t.blending,!bo&&Number(t.sequence)>=Sc){Sc=Number(t.sequence);for(let[r,s]of Object.entries(t.scales))ud(r,Number(s),!1);for(let[r,s]of Object.entries(t.offsets))for(let o=0;o<3;o+=1)fd(r,o,Number(s[o]),!1)}wc(),i&&Mc()}for(let i of Ba.values()){i.input.disabled=i.empty||!!n.detail.disabled;for(let r of i.moveInputs)r.disabled=i.empty||!!n.detail.disabled||!t.supports_movement}let e=document.getElementById("compatibility");e.hidden=t.supports_movement,e.textContent=t.supports_movement?"":"\u79FB\u52D5\u6A5F\u80FD\u306E\u66F4\u65B0\u304C\u53CD\u6620\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002Windows\u5074\u306EStreamlit\u3092\u518D\u8D77\u52D5\u3057\u3001\u753B\u9762\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002",an&&!an.getContext().isContextLost()&&(ad.hidden=!0,ad.textContent=""),eg()}catch(t){Km(t)}});function D0(){requestAnimationFrame(D0),an&&(bi?.update(),Fa&&(an.render(jr,on),Fa=!1))}D0();xi.setComponentReady();xi.setFrameHeight(540);
/*! For license information please see editor.js.LEGAL.txt */
