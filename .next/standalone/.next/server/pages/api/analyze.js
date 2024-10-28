"use strict";(()=>{var e={};e.id=516,e.ids=[516],e.modules={9993:e=>{e.exports=require("googleapis")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2079:e=>{e.exports=import("openai")},7147:e=>{e.exports=require("fs")},5687:e=>{e.exports=require("https")},1017:e=>{e.exports=require("path")},6249:(e,n)=>{Object.defineProperty(n,"l",{enumerable:!0,get:function(){return function e(n,t){return t in n?n[t]:"then"in n&&"function"==typeof n.then?n.then(n=>e(n,t)):"function"==typeof n&&"default"===t?n:void 0}}})},526:(e,n,t)=>{t.a(e,async(e,i)=>{try{t.r(n),t.d(n,{config:()=>u,default:()=>c,routeModule:()=>m});var a=t(1802),r=t(7153),s=t(6249),o=t(9649),l=e([o]);o=(l.then?(await l)():l)[0];let c=(0,s.l)(o,"default"),u=(0,s.l)(o,"config"),m=new a.PagesAPIRouteModule({definition:{kind:r.x.PAGES_API,page:"/api/analyze",pathname:"/api/analyze",bundlePath:"",filename:""},userland:o});i()}catch(e){i(e)}})},9649:(e,n,t)=>{t.a(e,async(e,i)=>{try{t.r(n),t.d(n,{default:()=>g});var a=t(9993),r=t(2079),s=t(7147),o=t.n(s),l=t(1017),c=t.n(l);t(5687);var u=e([r]);let h=new(r=(u.then?(await u)():u)[0]).default({apiKey:"your_openai_key"}),b=()=>{let e=new a.google.auth.OAuth2("your_client_id","your_client_secret","your_redirect_uri");return e.setCredentials({refresh_token:"your_refresh_token"}),a.google.drive({version:"v3",auth:e})};async function m(e,n,t){return new Promise((i,a)=>{e.files.get({fileId:n,alt:"media"},{responseType:"stream"},(e,n)=>{if(e){a(e);return}let r=o().createWriteStream(t);n.data.on("end",()=>i(t)).on("error",e=>a(e)).pipe(r)})})}async function d(e){try{let n=new FormData;n.append("file",o().createReadStream(e));let t=await fetch("https://api.openai.com/v1/engines/whisper/transcribe",{method:"POST",headers:{Authorization:"Bearer your_openai_key"},body:n});return(await t.json()).text}catch(e){throw console.error("Error extracting text from PDF:",e),Error("Failed to extract text from PDF")}}async function p(e,n){let t=`
    Analyze this startup based on the following information:
    
    Company Information:
    ${JSON.stringify(e.companyInfo,null,2)}
    
    Team Information:
    ${JSON.stringify(e.teamInfo,null,2)}
    
    Business Information:
    ${JSON.stringify(e.businessInfo,null,2)}
    
    Financial Information:
    ${JSON.stringify(e.financialInfo,null,2)}
    
    Additional Context from Pitch Deck:
    ${n}
    
    Provide a detailed analysis covering:
    1. Market opportunity and potential
    2. Team capability and experience
    3. Product/solution viability
    4. Financial projections and funding requirements
    5. Competition and market positioning
    6. Key risks and mitigation strategies
    7. Investment recommendation
    
    Format the response as JSON with the following structure:
    {
      "marketAnalysis": { "score": number, "explanation": string },
      "teamAnalysis": { "score": number, "explanation": string },
      "productAnalysis": { "score": number, "explanation": string },
      "financialAnalysis": { "score": number, "explanation": string },
      "competitiveAnalysis": { "score": number, "explanation": string },
      "riskAnalysis": { "risks": string[], "mitigations": string[] },
      "investmentRecommendation": { "recommendation": string, "rationale": string },
      "overallScore": number
    }
  `,i=await h.chat.completions.create({model:"gpt-4-turbo-preview",messages:[{role:"system",content:"You are an expert venture capital analyst with deep expertise in startup evaluation and market analysis."},{role:"user",content:t}],temperature:.7,max_tokens:2500,response_format:{type:"json_object"}});return JSON.parse(i.choices[0].message.content)}async function f(e,n){let t=`
    Analyze the following financial information:
    
    Financial Metrics:
    ${JSON.stringify(e.financialInfo,null,2)}
    
    Additional Financial Details:
    ${n}
    
    Provide a detailed financial analysis covering:
    1. Burn rate and runway analysis
    2. Revenue projections and growth metrics
    3. Unit economics
    4. Funding requirements and use of funds
    5. Key financial risks
    
    Format the response as JSON with the following structure:
    {
      "burnAnalysis": { "monthlyBurn": number, "runwayMonths": number, "analysis": string },
      "revenueAnalysis": { "projectedGrowth": number, "analysis": string },
      "unitEconomics": { "cac": number, "ltv": number, "analysis": string },
      "fundingAnalysis": { "recommendation": string, "rationale": string },
      "financialRisks": string[],
      "keyMetrics": {
        "grossMargin": number,
        "cacPayback": number,
        "revenueMultiple": number
      }
    }
  `,i=await h.chat.completions.create({model:"gpt-4-turbo-preview",messages:[{role:"system",content:"You are an expert financial analyst specializing in startup financials and metrics."},{role:"user",content:t}],temperature:.7,max_tokens:2e3,response_format:{type:"json_object"}});return JSON.parse(i.choices[0].message.content)}async function y(e,n){let t=`
    Analyze the competitive landscape based on:
    
    Industry: ${e.companyInfo.industry}
    Business Model: ${e.businessInfo.businessModel}
    Competition: ${e.businessInfo.competition}
    
    Additional Context:
    ${n}
    
    Provide a detailed competitor analysis covering:
    1. Direct and indirect competitors
    2. Competitive advantages and disadvantages
    3. Market positioning
    4. Barriers to entry
    
    Format the response as JSON with the following structure:
    {
      "directCompetitors": [{ "name": string, "strengths": string[], "weaknesses": string[] }],
      "indirectCompetitors": [{ "name": string, "threat": string, "mitigation": string }],
      "competitiveAdvantages": string[],
      "marketPositioning": { "current": string, "recommended": string },
      "barriersToEntry": string[],
      "competitiveThreatLevel": "LOW" | "MEDIUM" | "HIGH"
    }
  `,i=await h.chat.completions.create({model:"gpt-4-turbo-preview",messages:[{role:"system",content:"You are an expert in competitive analysis and market research."},{role:"user",content:t}],temperature:.7,max_tokens:2e3,response_format:{type:"json_object"}});return JSON.parse(i.choices[0].message.content)}async function g(e,n){if("POST"!==e.method)return n.status(405).json({error:"Method not allowed"});let{submissionId:t}=e.body;if(!t)return n.status(400).json({error:"Submission ID is required"});try{let e=b(),i=await e.files.list({q:`name contains '${t}_Metadata.json'`,fields:"files(id, name)"});if(!i.data.files.length)return n.status(404).json({error:"Submission not found"});let a=c().join(process.cwd(),"tmp"),r=c().join(a,"metadata.json");await m(e,i.data.files[0].id,r);let s=JSON.parse(o().readFileSync(r,"utf8")),l=c().join(a,"pitch_deck.pdf");await m(e,s.fileIds.pitchDeckId,l);let u=await d(l),g="";if(s.fileIds.financialsId){let n=c().join(a,"financials.pdf");await m(e,s.fileIds.financialsId,n),g=await d(n)}let[h,w,v]=await Promise.all([p(s,u),f(s,g),y(s,u)]),P={submissionId:t,timestamp:new Date().toISOString(),companyName:s.companyInfo.name,metrics:h,financials:w,competitors:v};await e.files.create({requestBody:{name:`${s.companyInfo.name}_Analysis.json`,parents:[s.fileIds.companyFolderId]},media:{mimeType:"application/json",body:JSON.stringify(P,null,2)}}),o().unlinkSync(r),o().unlinkSync(l),s.fileIds.financialsId&&o().unlinkSync(c().join(a,"financials.pdf")),n.status(200).json({success:!0,analysis:P})}catch(e){console.error("Analysis error:",e),n.status(500).json({success:!1,error:"Failed to analyze submission",details:e.message})}}i()}catch(e){i(e)}})},7153:(e,n)=>{var t;Object.defineProperty(n,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},1802:(e,n,t)=>{e.exports=t(145)}};var n=require("../../webpack-api-runtime.js");n.C(e);var t=n(n.s=526);module.exports=t})();