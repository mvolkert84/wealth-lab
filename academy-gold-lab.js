/* Wealth Lab Academy · Interactive Gold Standard worksheet · L1.S1.
   Demo numbers only. Does not collect or store user's financial entries.
   Works in the shared Examples tab; keeps existing progress keys untouched. */
(function(){
"use strict";
const id="L1.S1";
const defaults={cash:5000,retirement:12000,vehicle:10000,home:0,auto:7000,card:3000,mortgage:0,bills:2400,reserve:2000};
const safe=(x)=>String(x).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const money=n=>Number.isFinite(n)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(n):"—";
function field(name,label){
 return '<label class="wlg-field"><span>'+safe(label)+'</span><span class="wlg-money-input"><b aria-hidden="true">$</b><input type="number" inputmode="decimal" min="0" step="100" data-wlg-field="'+name+'" value="'+defaults[name]+'" aria-label="'+safe(label)+'"></span></label>';
}
window.WealthLabGoldLabMarkup=function(s){
 if(!s||s.id!==id)return "";
 return '<section class="wlg-lab" aria-label="Wealth Equation interactive workbook">'+
 '<div class="wlg-label">INTERACTIVE FINANCIAL WORKBOOK · L1.S1</div>'+
 '<h3>Build a balance sheet. Check your reasoning.</h3>'+
 '<p class="wlg-intro">Use the fictional starting values or change them. All calculations happen on this screen; the worksheet does not save financial entries. Write conclusions in Notes if you want to keep them.</p>'+
 '<div class="wlg-worksheet" data-wlg-workbook>'+
 '<details open class="wlg-details"><summary>01 · Assets and liabilities</summary>'+
 '<div class="wlg-grid">'+
 '<fieldset><legend>Assets (what the household owns)</legend>'+
 field("cash","Cash and bank accounts")+field("retirement","Retirement and investments")+field("vehicle","Vehicle resale estimate")+field("home","Property market value")+
 '</fieldset><fieldset><legend>Liabilities (what the household owes)</legend>'+
 field("auto","Vehicle loan payoff")+field("card","Credit-card debt")+field("mortgage","Mortgage principal owed")+
 '</fieldset></div>'+
 '<div class="wlg-metrics" aria-live="polite">'+
 '<div><span>Total assets</span><strong data-wlg-output="assets">—</strong></div>'+
 '<div><span>Total liabilities</span><strong data-wlg-output="liabilities">—</strong></div>'+
 '<div class="wlg-focus"><span>Net worth · assets − debts</span><strong data-wlg-output="networth">—</strong></div>'+
 '<div><span>Vehicle and property equity</span><strong data-wlg-output="equity">—</strong></div>'+
 '</div></details>'+
 '<details class="wlg-details"><summary>02 · Cash you can actually use</summary>'+
 '<p>Assign upcoming obligations and emergency funds before estimating flexible cash. Do not count home equity, retirement funds or unused credit as checking-account money.</p>'+
 '<div class="wlg-grid">'+field("bills","Bills due before next income")+field("reserve","Protected emergency reserve")+'</div>'+
 '<div class="wlg-metrics" aria-live="polite">'+
 '<div><span>Bank cash</span><strong data-wlg-output="cash">—</strong></div>'+
 '<div><span>After scheduled bills</span><strong data-wlg-output="afterbills">—</strong></div>'+
 '<div class="wlg-focus"><span>Unassigned bank cash after reserve</span><strong data-wlg-output="unassigned">—</strong></div>'+
 '</div>'+
 '<p class="wlg-caution" data-wlg-warning role="status"></p></details>'+
 '<details class="wlg-details"><summary>03 · Prove it without multiple choice</summary>'+
 '<p>Do the calculation before using Check. Each answer is evaluated against the figures currently entered above.</p>'+
 '<div class="wlg-challenges">'+
 '<label>1. Calculate current net worth from the asset and debt amounts.<input type="number" inputmode="decimal" step="0.01" data-wlg-answer="worth" placeholder="Enter dollars without a $ sign"></label>'+
 '<label>2. Pay $400 cash: $360 principal and $40 interest. What is net worth immediately afterward?<input type="number" inputmode="decimal" step="0.01" data-wlg-answer="repayment" placeholder="New net worth in dollars"></label>'+
 '<label>3. Borrow $5,000 and deposit it into checking. What is net worth immediately afterward?<input type="number" inputmode="decimal" step="0.01" data-wlg-answer="loan" placeholder="New net worth in dollars"></label>'+
 '<button type="button" class="wlg-check" data-wlg-check>Check my three calculations</button>'+
 '<div class="wlg-feedback" data-wlg-feedback role="status" aria-live="polite">No calculations checked yet.</div>'+
 '</div></details>'+
 '<div class="wlg-footer"><button type="button" class="wlg-reset" data-wlg-reset>Restore example values</button><span>Nothing entered here changes course mastery or financial accounts.</span></div>'+
 '</div></section>';
};
function values(root){let v={};for(const key of Object.keys(defaults)){const input=root.querySelector('[data-wlg-field="'+key+'"]');const raw=input?.value||"";v[key]=raw.trim()===""?NaN:Number(raw);if(!Number.isFinite(v[key])||v[key]<0)v[key]=NaN}return v}
function calculate(root){
 const v=values(root);const all=Object.values(v).every(Number.isFinite);
 const assets=v.cash+v.retirement+v.vehicle+v.home,liabilities=v.auto+v.card+v.mortgage;
 const networth=assets-liabilities,afterbills=v.cash-v.bills,unassigned=afterbills-v.reserve,equity=v.vehicle+v.home-v.auto-v.mortgage;
 const results={assets,liabilities,networth,afterbills,unassigned,cash:v.cash,equity};
 for(const [name,n] of Object.entries(results)){const node=root.querySelector('[data-wlg-output="'+name+'"]');if(node)node.textContent=money(n);}
 const warning=root.querySelector('[data-wlg-warning]');
 if(warning)warning.textContent=!all?"Enter nonnegative numbers in every field to calculate the worksheet.":unassigned<0?"Warning: bills and protected reserves exceed the available bank cash. The shortfall is "+money(-unassigned)+".":"The assigned bills and reserve fit within the entered bank cash; check dates and other unlisted expenses before investing.";
 return {all,networth,assets,liabilities}
}
function check(root){
 const calc=calculate(root), box=root.querySelector("[data-wlg-feedback]");
 if(!box)return;
 if(!calc.all){box.textContent="Complete the worksheet with valid nonnegative figures before checking.";return}
 const expected={
  worth:{value:calc.networth,why:"Assets minus liabilities: "+money(calc.assets)+" − "+money(calc.liabilities)+" = "+money(calc.networth)+"."},
  repayment:{value:calc.networth-40,why:"Cash decreases $400 and loan principal decreases $360. Net worth therefore changes by −$40 in interest."},
  loan:{value:calc.networth,why:"New borrowing adds $5,000 cash and $5,000 debt. Net worth is initially unchanged."}
 };
 let ok=0,html=[];
 for(const [k,e] of Object.entries(expected)){
  const input=root.querySelector('[data-wlg-answer="'+k+'"]');
  const val=input?.value?.trim()||"";
  const correct=val!==""&&Number.isFinite(Number(val))&&Math.abs(Number(val)-e.value)<0.011;
  ok+=Number(correct);
  html.push((correct?"✓":"Review")+" #"+(html.length+1)+": "+e.why+" Correct value: "+money(e.value)+".");
 }
 box.textContent=ok+" of 3 correct. "+html.join(" ");
}
document.addEventListener("input",ev=>{
 const root=ev.target?.closest?.("[data-wlg-workbook]");
 if(root&&ev.target.matches("[data-wlg-field]"))calculate(root);
});
document.addEventListener("click",ev=>{
 const button=ev.target?.closest?.("[data-wlg-check],[data-wlg-reset]");
 if(!button)return;
 const root=button.closest("[data-wlg-workbook]");
 if(!root)return;
 if(button.hasAttribute("data-wlg-check"))check(root);
 if(button.hasAttribute("data-wlg-reset")){
  for(const [k,value] of Object.entries(defaults)){
   const input=root.querySelector('[data-wlg-field="'+k+'"]');
   if(input)input.value=value;
  }
  for(const input of root.querySelectorAll("[data-wlg-answer]"))input.value="";
  const feedback=root.querySelector("[data-wlg-feedback]");
  if(feedback)feedback.textContent="Example restored. Recalculate each answer independently.";
  calculate(root);
 }
});
const observer=new MutationObserver(()=>{
 for(const root of document.querySelectorAll("[data-wlg-workbook]")){
  if(root.dataset.wlgInitialized)return;
  root.dataset.wlgInitialized="true";calculate(root);
 }
});
if(document.documentElement)observer.observe(document.documentElement,{childList:true,subtree:true});
})();
