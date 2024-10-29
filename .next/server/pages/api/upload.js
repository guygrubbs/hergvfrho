"use strict";(()=>{var e={};e.id=39,e.ids=[39],e.modules={9993:e=>{e.exports=require("googleapis")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2048:e=>{e.exports=require("fs")},5315:e=>{e.exports=require("path")},6705:e=>{e.exports=import("formidable")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,a){return a in t?t[a]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,a)):"function"==typeof t&&"default"===a?t:void 0}}})},1014:(e,t,a)=>{a.a(e,async(e,i)=>{try{a.r(t),a.d(t,{config:()=>d,default:()=>u,routeModule:()=>l});var n=a(1802),r=a(7153),o=a(6249),s=a(94),c=e([s]);s=(c.then?(await c)():c)[0];let u=(0,o.l)(s,"default"),d=(0,o.l)(s,"config"),l=new n.PagesAPIRouteModule({definition:{kind:r.x.PAGES_API,page:"/api/upload",pathname:"/api/upload",bundlePath:"",filename:""},userland:s});i()}catch(e){i(e)}})},94:(e,t,a)=>{a.a(e,async(e,i)=>{try{a.r(t),a.d(t,{config:()=>y,default:()=>f});var n=a(9993),r=a(6705),o=a(2048),s=a.n(o),c=a(5315),u=a.n(c),d=e([r]);r=(d.then?(await d)():d)[0];let y={api:{bodyParser:!1}},g=()=>{let e=new n.google.auth.OAuth2("your_client_id","your_client_secret","your_redirect_uri");return e.setCredentials({refresh_token:"your_refresh_token"}),n.google.drive({version:"v3",auth:e})};async function l(e,t){try{let a=await e.files.create({requestBody:{name:t,mimeType:"application/vnd.google-apps.folder",parents:["your_google_drive_folder_id"]},fields:"id"}),i={};for(let t of["Pitch_Deck","Financials","Analysis"]){let n=await e.files.create({requestBody:{name:t,mimeType:"application/vnd.google-apps.folder",parents:[a.data.id]},fields:"id"});i[t]=n.data.id}return{companyFolderId:a.data.id,...i}}catch(e){throw console.error("Error creating folder structure:",e),Error("Failed to create folder structure in Google Drive")}}async function p(e,t,a,i,n){try{return(await e.files.create({requestBody:{name:a,parents:[i]},media:{mimeType:n,body:s().createReadStream(t)}})).data.id}catch(e){throw console.error("Error uploading file:",e),Error("Failed to upload file to Google Drive")}}async function m(e,t){return{submissionId:Date.now().toString(),...e,...t}}async function f(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let a=(0,r.default)({uploadDir:u().join(process.cwd(),"tmp"),keepExtensions:!0,maxFileSize:10485760}),[i,n]=await new Promise((t,i)=>{a.parse(e,(e,a,n)=>{e&&i(e),t([a,n])})}),o=g(),c=await l(o,i.companyName),d={};n.pitchDeck&&(d.pitchDeckId=await p(o,n.pitchDeck.filepath,`${i.companyName}_PitchDeck${u().extname(n.pitchDeck.originalFilename)}`,c.Pitch_Deck,n.pitchDeck.mimetype)),n.financials&&(d.financialsId=await p(o,n.financials.filepath,`${i.companyName}_Financials${u().extname(n.financials.originalFilename)}`,c.Financials,n.financials.mimetype));let f=await m(i,d);Object.values(n).forEach(e=>{s().unlinkSync(e.filepath)});let y={submissionDate:new Date().toISOString(),companyInfo:{name:i.companyName,website:i.website,industry:i.industry,stage:i.stage,foundedYear:i.foundedYear,location:i.location},teamInfo:{teamSize:i.teamSize,founderNames:i.founderNames,keyHires:i.keyHires},businessInfo:{problem:i.problem,solution:i.solution,targetMarket:i.targetMarket,businessModel:i.businessModel,competition:i.competition,traction:i.traction},financialInfo:{currentRevenue:i.currentRevenue,burnRate:i.burnRate,runwayMonths:i.runwayMonths,fundingNeeded:i.fundingNeeded,useOfFunds:i.useOfFunds},fileIds:d,submissionId:f.submissionId};await o.files.create({requestBody:{name:`${i.companyName}_Metadata.json`,parents:[c.companyFolderId]},media:{mimeType:"application/json",body:JSON.stringify(y,null,2)}}),t.status(200).json({success:!0,submissionId:f.submissionId,message:"Submission successfully processed"})}catch(e){console.error("Upload error:",e),t.status(500).json({success:!1,error:"Failed to process submission",details:e.message})}}i()}catch(e){i(e)}})},7153:(e,t)=>{var a;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return a}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(a||(a={}))},1802:(e,t,a)=>{e.exports=a(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var a=t(t.s=1014);module.exports=a})();