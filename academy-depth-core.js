/* Wealth Lab Academy — deep textbook chapter registration.
   Loaded after canonical curriculum/assessments and before the app reader.
   Each chapter is a first-class enhancement of an EXISTING stable section ID.
   No localStorage schema changes, no generated quiz results, and no new route IDs. */
(function () {
  "use strict";
  const existing = new Set(ALL_SECTIONS.map(s=>s.id));
  const questionValid = q => q && typeof q.q==="string" && Array.isArray(q.options) &&
    q.options.length===4 && Number.isInteger(q.answer) &&
    q.answer>=0 && q.answer<4 && typeof q.why==="string";
  window.WealthLabRegisterDeepChapter = function (d) {
    if(!d || !existing.has(d.id)) throw new Error("Unknown Wealth Lab lesson ID");
    if(TEXTBOOK[d.id]) throw new Error("Chapter already expanded: "+d.id);
    if(!Array.isArray(d.parts) || d.parts.length!==6) throw new Error("Chapter requires six fully written parts: "+d.id);
    if(!Array.isArray(d.finalChecks) || d.finalChecks.length!==3 || !d.finalChecks.every(questionValid)) throw new Error("Invalid final chapter assessment: "+d.id);
    if(!Array.isArray(d.sources) || d.sources.length<2 || !d.sources.every(u => /^https:\/\//.test(u))) throw new Error("Sources required: "+d.id);
    for(const [i,p] of d.parts.entries()){
      if(!p.heading || !p.concept || !Array.isArray(p.paragraphs) || p.paragraphs.length<3 ||
        !p.paragraphs.every(x=>typeof x==="string" && x.length>=70) ||
        !Array.isArray(p.example) || p.example.length<3 ||
        !p.pitfall || !p.exercise || !Array.isArray(p.terms) || p.terms.length<2 ||
        !Array.isArray(p.checks) || p.checks.length!==2 || !p.checks.every(questionValid) ||
        !Array.isArray(p.insight) || p.insight.length!==4) throw new Error("Incomplete textbook part "+(i+1)+" of "+d.id);
    }
    if(!d.caseStudy?.title || !d.caseStudy?.scenario ||
       !Array.isArray(d.caseStudy.steps) || d.caseStudy.steps.length<3 ||
       !d.caseStudy.decision) throw new Error("Professional case missing: "+d.id);
    TEXTBOOK[d.id] = {
      title:d.title,
      pages:d.parts.map(p=>({
        heading:p.heading,concept:p.concept,paragraphs:p.paragraphs,
        example:p.example,pitfall:p.pitfall,exercise:p.exercise
      })),
      sources:d.sources
    };
    PART_CHECKS[d.id]=d.parts.map(p=>p.checks);
    PART_TERMS[d.id]=d.parts.map(p=>p.terms);
    PRACTITIONER_NOTES[d.id]=d.parts.map(p=>p.insight);
    CASE_FILES[d.id]=d.caseStudy;
    TEXTBOOK_CHECKS[d.id]=d.finalChecks;
    window.WealthLabDeepChapterIds=(window.WealthLabDeepChapterIds||[]).concat(d.id);
  };
})();
