/* Wealth Lab Gold Standard · Edition 2 continuation engine.
   Upgrades an EXISTING six-part chapter in place. Old part indices and
   answer keys remain aligned; new parts and final checks only append.
   No changes to local persistence or route IDs. */
(function(){
"use strict";
const records={};
const validQuestion=q=>q&&typeof q.q==="string"&&Array.isArray(q.options)&&q.options.length===4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&typeof q.why==="string"&&q.why.length>=40;
const validPart=p=>p&&typeof p.heading==="string"&&p.heading.length>12&&p.concept?.length>40&&Array.isArray(p.paragraphs)&&p.paragraphs.length>=4&&p.paragraphs.every(x=>x.length>=140)&&Array.isArray(p.example)&&p.example.length>=3&&p.pitfall?.length>=75&&p.exercise?.length>=90&&Array.isArray(p.terms)&&p.terms.length>=2&&Array.isArray(p.checks)&&p.checks.length===2&&p.checks.every(validQuestion)&&Array.isArray(p.insight)&&p.insight.length===4;
window.WealthLabUpgradeChapter=function(config){
 const id=config.id,t=TEXTBOOK[id],checks=PART_CHECKS[id],terms=PART_TERMS[id],notes=PRACTITIONER_NOTES[id],final=TEXTBOOK_CHECKS[id];
 if(!t||t.pages.length!==6||!Array.isArray(checks)||checks.length!==6||!Array.isArray(terms)||terms.length!==6||!notes||!Array.isArray(final))throw Error("Edition baseline inconsistent for "+id);
 if(records[id])throw Error("Already upgraded "+id);
 if(!Array.isArray(config.enrich)||config.enrich.length!==6||!Array.isArray(config.extraParts)||config.extraParts.length!==6||!Array.isArray(config.finalChecks)||config.finalChecks.length<4||!config.finalChecks.every(validQuestion))throw Error("Edition schema invalid "+id);
 if(!Array.isArray(config.sources)||config.sources.length<2||!config.sources.every(x=>/^https:\/\//.test(x)))throw Error("Sources missing "+id);
 const baseline={headings:t.pages.map(p=>p.heading),questions:checks.map(row=>row.map(q=>q.q)),finalQuestions:final.map(q=>q.q)};
 config.enrich.forEach((d,i)=>{
  if(!Array.isArray(d.paragraphs)||d.paragraphs.length<2||d.paragraphs.some(x=>x.length<140)||!Array.isArray(d.example)||d.example.length<3||d.pitfall?.length<75||d.exercise?.length<90)throw Error("Invalid original enrichment "+id+" part "+(i+1));
  t.pages[i].paragraphs.push(...d.paragraphs);
  t.pages[i].example=d.example;t.pages[i].pitfall=d.pitfall;t.pages[i].exercise=d.exercise;
 });
 for(const p of config.extraParts){
  if(!validPart(p))throw Error("Incomplete advanced part in "+id+" : "+(p?.heading||"unknown"));
  t.pages.push({heading:p.heading,concept:p.concept,paragraphs:p.paragraphs,example:p.example,pitfall:p.pitfall,exercise:p.exercise});
  checks.push(p.checks);terms.push(p.terms);
  notes[t.pages.length-1]=p.insight;
 }
 final.push(...config.finalChecks);
 if(!config.caseStudy?.title||config.caseStudy?.steps?.length<8||!config.caseStudy.decision||!config.caseStudy.scenario)throw Error("Insufficient professional case in "+id);
 CASE_FILES[id]=config.caseStudy;
 t.sources=[...new Set([...config.sources,...t.sources])];
 records[id]={edition:"2.0",parts:t.pages.length,baseline,newPartQuestions:config.extraParts.length*2,newFinalQuestions:config.finalChecks.length};
 window.WealthLabGoldEditionCatalog=records;
};
})();