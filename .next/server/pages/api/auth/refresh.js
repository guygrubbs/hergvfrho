"use strict";(()=>{var e={};e.id=615,e.ids=[615],e.modules={4802:e=>{e.exports=require("cookie")},9993:e=>{e.exports=require("googleapis")},9344:e=>{e.exports=require("jsonwebtoken")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,r)=>{Object.defineProperty(r,"l",{enumerable:!0,get:function(){return function e(r,t){return t in r?r[t]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,t)):"function"==typeof r&&"default"===t?r:void 0}}})},1037:(e,r,t)=>{t.r(r),t.d(r,{config:()=>P,default:()=>p,routeModule:()=>h});var o={};t.r(o),t.d(o,{default:()=>f});var n=t(1802),s=t(7153),i=t(6249),u=t(9993),a=t(9344),c=t.n(a),d=t(4802);let l=new u.google.auth.OAuth2("your_client_id","your_client_secret","your_redirect_uri");async function f(e,r){if("POST"!==e.method)return r.status(405).json({error:"Method not allowed"});try{let t=e.cookies.auth_token;if(!t)return r.status(401).json({error:"No token provided"});let o=c().verify(t,"your_secure_random_string");l.setCredentials({refresh_token:o.refreshToken});let{credentials:n}=await l.refreshAccessToken(),s=c().sign({...o,accessToken:n.access_token},"your_secure_random_string",{expiresIn:"7d"});r.setHeader("Set-Cookie",(0,d.serialize)("auth_token",s,{httpOnly:!0,secure:!0,sameSite:"lax",path:"/",maxAge:604800})),r.status(200).json({success:!0})}catch(e){console.error("Token refresh error:",e),r.status(401).json({error:"Failed to refresh token"})}}let p=(0,i.l)(o,"default"),P=(0,i.l)(o,"config"),h=new n.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/auth/refresh",pathname:"/api/auth/refresh",bundlePath:"",filename:""},userland:o})},7153:(e,r)=>{var t;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},1802:(e,r,t)=>{e.exports=t(145)}};var r=require("../../../webpack-api-runtime.js");r.C(e);var t=r(r.s=1037);module.exports=t})();