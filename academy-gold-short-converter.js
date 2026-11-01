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
  if(!p.heading||p.heading.length<12||!p.concept||p.concept.length<45||
    !Array.isArray(p.paragraphs)||p.paragraphs.length<4||p.paragraphs.some(x=>typeof x!=="string"||x.length<140)||
    p.paragraphs.join(" ").trim().split(/\s+/).length<240||
    !p.pitfall||p.pitfall.length<75||!p.exercise||p.exercise.length<90||
    !Array.isArray(p.example)||p.example.length<3||
    !Array.isArray(p.terms)||p.terms.length<2||
    !Array.isArray(p.checks)||p.checks.length!==2||!p.checks.every(validQ)||
    !Array.isArray(p.insight)||p.insight.length!==4)throw Error("Incomplete short-form Gold part "+id+" part "+(idx+1));
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