"use strict";(()=>{var e={};e.id=508,e.ids=[508],e.modules={9993:e=>{e.exports=require("googleapis")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},518:(e,t,r)=>{r.r(t),r.d(t,{config:()=>p,default:()=>d,routeModule:()=>c});var o={};r.r(o),r.d(o,{authHandler:()=>l,default:()=>s});var i=r(1802),n=r(7153),a=r(6249);let u=new(r(9993)).google.auth.OAuth2("your_client_id","your_client_secret","your_redirect_uri"),l=(e,t)=>{if("GET"!==e.method)return t.status(405).json({error:"Method not allowed"});let r=u.generateAuthUrl({access_type:"offline",scope:["https://www.googleapis.com/auth/drive.file","https://www.googleapis.com/auth/drive.metadata.readonly","https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"],prompt:"consent",state:e.query.redirect||"/"});t.redirect(r)},s=l,d=(0,a.l)(o,"default"),p=(0,a.l)(o,"config"),c=new i.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/auth",pathname:"/api/auth",bundlePath:"",filename:""},userland:o})},7153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,t,r)=>{e.exports=r(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=518);module.exports=r})();