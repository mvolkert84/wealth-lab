/* Wealth Lab · Gold conversion of existing short-form sections into academic
   textbooks. Never creates new lesson IDs or overwrites the canonical single
   question or notes. Each page gets practical depth and independent checks. */
(function(){
"use strict";
const validQ=q=>q&&typeof q.q==="string"&&Array.isArray(q.options)&&q.options.length===4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&typeof q.why==="string"&&q.why.length>=40;
window.WealthLabConvertShortChapter=function(config){
 const id=config?.id;
 if(!ALL_SECTIONS.some(s=>s.id===id)||TEXTBOOK[id])throw Error("Short conversion requires an existing, unexpanded lesson ID: "+id);
 if(!Array.isArray(config.pages)||config.pages.length!==12)throw Error("Short conversion needs twelve authored textbook parts: "+id);
 if(!Array.isArray(config.finalChecks)||config.finalChecks.length<6||!config.finalChecks.every(validQ))throw Error("Missing cumulative mastery in short conversion "+id);
 if(!Array.isArray(config.sources)||config.sources.length<2||!config.sources.every(x=>/^https:\/\//.test(x)))throw Error("Official sources required for "+id);
 if(!config.caseStudy?.title||!config.caseStudy?.scenario||!config.caseStudy?.decision||config.caseStudy?.steps?.length<8)throw Error("Detailed practical case required: "+id);
 for(const [idx,p] of config.pages.entries()){
  const gaps=[];
  if(!p.heading||p.heading.length<12)gaps.push("heading");
  if(!p.concept||p.concept.length<45)gaps.push("concept");
  if(!Array.isArray(p.paragraphs)||p.paragraphs.length<4)gaps.push("paragraph count");
  else{
    const small=p.paragraphs.map((x,i)=>({i,length:x?.length||0})).filter(x=>x.length<140);
    if(small.length)gaps.push("short paragraphs "+small.map(x=>(x.i+1)+"="+x.length).join(","));
    const words=p.paragraphs.join(" ").trim().split(/\s+/).length;
    if(words<240)gaps.push("reading words "+words);
  }
  if(!p.pitfall||p.pitfall.length<75)gaps.push("pitfall "+(p.pitfall?.length||0));
  if(!p.exercise||p.exercise.length<90)gaps.push("exercise "+(p.exercise?.length||0));
  if(!Array.isArray(p.example)||p.example.length<3)gaps.push("example count");
  if(!Array.isArray(p.terms)||p.terms.length<2)gaps.push("terms count");
  if(!Array.isArray(p.checks)||p.checks.length!==2)gaps.push("checks count");
  else if(!p.checks.every(validQ))gaps.push("check formatting / explanations");
  if(!Array.isArray(p.insight)||p.insight.length!==4)gaps.push("practitioner insight");
  if(gaps.length)throw Error("Incomplete short-form Gold part "+id+" part "+(idx+1)+": "+gaps.join("; "));
 }
 const pages=config.pages;
 TEXTBOOK[id]={title:config.title,pages:pages.map(({heading,concept,paragraphs,example,pitfall,exercise})=>({heading,concept,paragraphs,example,pitfall,exercise})),sources:config.sources};
 PART_CHECKS[id]=pages.map(p=>p.checks);
 PART_TERMS[id]=pages.map(p=>p.terms);
 PRACTITIONER_NOTES[id]=pages.map(p=>p.insight);
 CASE_FILES[id]=config.caseStudy;
 TEXTBOOK_CHECKS[id]=config.finalChecks;
 window.WealthLabConvertedShortIds=(window.WealthLabConvertedShortIds||[]).concat(id);
};
})();