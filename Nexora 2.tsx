import React, { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const QUOTES = [
  "Your future begins with one opportunity.",
  "Study beyond borders.",
  "Dreams deserve direction.",
  "The world is larger than your hometown.",
  "Education opens invisible doors.",
  "Your ambition deserves a global path.",
  "Scholarships change lives.",
  "Travel. Learn. Become.",
];

const SD = [
  { id:1, name:"Aga Khan Foundation Scholarship", univ:"Various Universities", country:"Global", flag:"🌍", funding:"Fully Funded", deadline:"Mar 31, 2026", tags:["Fully Funded","Africa","Global"], match:97, color:"#4F46E5", desc:"One of the world's most prestigious postgraduate scholarships for students from developing countries, covering all costs and living expenses.", coverage:["Full tuition","Monthly stipend","Travel allowance","Health insurance"], elig:["Citizens of select developing countries","Bachelor's degree holders","Below age 30","Demonstrated financial need"], docs:["Passport copy","Academic transcripts","2 recommendation letters","Motivation letter","Financial statement"], tl:{opens:"Oct 2025",closes:"Mar 31, 2026",results:"Jun 2026"}, contact:{web:"akdn.org/scholarships",email:"scholarships@akfed.org"}, tip:"Focus your motivation letter on community impact. Aga Khan prioritizes students who plan to return and contribute to their home communities." },
  { id:2, name:"Erasmus Mundus Joint Masters", univ:"European Consortium", country:"Europe", flag:"🇪🇺", funding:"Full Tuition + €1,400/mo", deadline:"Jan 15, 2026", tags:["Europe","Fully Funded","Research"], match:91, color:"#0EA5E9", desc:"A prestigious joint master's degree across leading European universities with full funding and a generous monthly stipend for all nationalities.", coverage:["Full tuition","€1,400/month stipend","Travel grant","Installation allowance"], elig:["Non-EU nationals preferred","Bachelor's degree required","Strong academic record","Language proficiency"], docs:["Transcripts","Motivation letter","2 references","Language certificate","CV"], tl:{opens:"Sep 2025",closes:"Jan 15, 2026",results:"Apr 2026"}, contact:{web:"erasmus-mundus.ec.europa.eu",email:"info@erasmusmundus.eu"}, tip:"Apply to multiple Erasmus programs simultaneously. Students combining AI with sustainability have the best acceptance rates this cycle." },
  { id:3, name:"Vanier Canada Graduate Scholarship", univ:"Canadian Universities", country:"Canada", flag:"🇨🇦", funding:"$50,000 / year", deadline:"Nov 1, 2025", tags:["Canada","Research","Prestigious"], match:88, color:"#10B981", desc:"Canada's most prestigious doctoral scholarship, designed to attract and retain world-class researchers and leaders from around the globe.", coverage:["$50,000 CAD/year","3-year duration","Research support","Conference funding"], elig:["PhD students only","GPA 3.7+","University nomination required","All nationalities"], docs:["Research proposal","University nomination","Transcripts","3 reference letters","CV"], tl:{opens:"Aug 2025",closes:"Nov 1, 2025",results:"Mar 2026"}, contact:{web:"vanier.gc.ca",email:"vanier@cihr-irsc.gc.ca"}, tip:"You must be nominated by a Canadian university. Secure a faculty supervisor and contact graduate admissions before the deadline." },
  { id:4, name:"Gates Cambridge Scholarship", univ:"University of Cambridge", country:"UK", flag:"🇬🇧", funding:"Full Cost of Study", deadline:"Oct 12, 2025", tags:["UK","Fully Funded","Prestigious","Leadership"], match:84, color:"#8B5CF6", desc:"Full-cost scholarships at Cambridge for exceptional international applicants. One of the most competitive and prestigious awards in the world.", coverage:["Full tuition fees","Maintenance allowance","Return flights","Visa fees"], elig:["Non-UK citizens only","Apply to Cambridge first","Outstanding academics","Clear leadership potential"], docs:["Cambridge application","Personal statement","2 academic references","Research proposal","Transcripts"], tl:{opens:"Sep 2025",closes:"Oct 12, 2025",results:"Jan 2026"}, contact:{web:"gatescambridge.org",email:"info@gatescambridge.org"}, tip:"Gates Cambridge has a 0.5% acceptance rate. Your essay must clearly articulate how your research will improve lives at a meaningful scale." },
  { id:5, name:"DAAD Scholarship Programme", univ:"German Universities", country:"Germany", flag:"🇩🇪", funding:"€934/month", deadline:"Oct 15, 2025", tags:["Europe","Germany","Research"], match:79, color:"#F59E0B", desc:"Germany's largest scholarship program supporting international students and researchers to study at top German universities.", coverage:["€934/month stipend","Health insurance","Travel subsidy","German language course"], elig:["Bachelor's degree required","Above-average grades","All nationalities","Work experience for some programs"], docs:["Application form","Transcripts","Motivation letter","Reference letter","Language certificate","CV"], tl:{opens:"Aug 2025",closes:"Oct 15, 2025",results:"Feb 2026"}, contact:{web:"daad.de",email:"international@daad.de"}, tip:"Apply for basic German language courses before submitting. DAAD values candidates who show commitment to integrating into German academic culture." },
  { id:6, name:"Chevening Scholarship", univ:"UK Universities", country:"UK", flag:"🇬🇧", funding:"Fully Funded", deadline:"Nov 5, 2025", tags:["UK","Fully Funded","Leadership"], match:86, color:"#6366F1", desc:"The UK government's flagship scholarship for outstanding individuals with demonstrated leadership potential from eligible countries worldwide.", coverage:["Full tuition","Living allowance","Travel costs","Visa fee refund"], elig:["Eligible country nationals","2+ years work experience","Bachelor's degree","Return home commitment"], docs:["Application form","2 references","Transcripts","Essay answers","Employment records"], tl:{opens:"Aug 2025",closes:"Nov 5, 2025",results:"Jun 2026"}, contact:{web:"chevening.org",email:"chevening@britishcouncil.org"}, tip:"Each of the four Chevening essays must tell a specific leadership story with measurable outcomes. Generic answers are disqualified immediately." },
  { id:7, name:"Australia Awards Scholarship", univ:"Australian Universities", country:"Australia", flag:"🇦🇺", funding:"Full Tuition + Living", deadline:"Apr 30, 2026", tags:["Australia","Fully Funded"], match:77, color:"#14B8A6", desc:"Long-term development awards by the Australian Government for emerging leaders from developing countries.", coverage:["Full tuition","Living allowance","Return airfare","Establishment allowance"], elig:["Developing country nationals","Bachelor's degree","Not currently in Australia","Health clearance"], docs:["Application form","Transcripts","Employment references","Motivation statement","English test results"], tl:{opens:"Feb 2026",closes:"Apr 30, 2026",results:"Oct 2026"}, contact:{web:"australiaawards.gov.au",email:"awards@dfat.gov.au"}, tip:"Connect your studies directly to your home country's development priorities. Reviewers want a concrete plan for impact after you return." },
  { id:8, name:"Swedish Institute Scholarships", univ:"Swedish Universities", country:"Sweden", flag:"🇸🇪", funding:"SEK 11,000/month", deadline:"Feb 15, 2026", tags:["Europe","Sweden","Sustainability","Research"], match:75, color:"#3B82F6", desc:"Study in Sweden with full financial support. SI prioritizes candidates committed to sustainable development and positive global change.", coverage:["SEK 11,000/month","Travel grant","Insurance","SI alumni network"], elig:["Eligible country citizens","Bachelor's degree","Professional experience preferred","English B2+"], docs:["Application form","Transcripts","Motivation letter","Reference letter","CV","Work certificates"], tl:{opens:"Nov 2025",closes:"Feb 15, 2026",results:"May 2026"}, contact:{web:"si.se/scholarships",email:"scholarships@si.se"}, tip:"Align your research with the UN SDGs. Swedish Institute strongly prioritizes climate, education, and gender equality research topics." },
  { id:9, name:"Orange Knowledge Programme", univ:"Dutch Universities", country:"Netherlands", flag:"🇳🇱", funding:"Full Scholarship", deadline:"Mar 1, 2026", tags:["Europe","Netherlands","Development"], match:80, color:"#F97316", desc:"Dutch scholarship supporting mid-career professionals from developing countries to strengthen skills at leading Dutch institutions.", coverage:["Full tuition","Living allowance","Travel costs","Health insurance"], elig:["Mid-career professionals","Bachelor's degree","Work experience required","Employer endorsement letter"], docs:["Application form","Transcripts","Employer letter","Motivation letter","CV","References"], tl:{opens:"Dec 2025",closes:"Mar 1, 2026",results:"Jun 2026"}, contact:{web:"nuffic.nl/okp",email:"okp@nuffic.nl"}, tip:"OKP requires formal employer endorsement. Secure this letter early — it must explain clearly how your studies will benefit your organization." },
  { id:10, name:"Aga Khan Foundation Portugal", univ:"Portuguese Universities", country:"Portugal", flag:"🇵🇹", funding:"Partial + Living Allowance", deadline:"Apr 30, 2026", tags:["Portugal","Europe","Africa"], match:82, color:"#EF4444", desc:"Opportunity for African students to pursue studies in Portugal with financial support, fostering cultural exchange and academic growth.", coverage:["Partial tuition","Living allowance","Cultural integration support"], elig:["African students","Portuguese language or commitment to learn","Academic merit","Demonstrated financial need"], docs:["Passport","Transcripts","Motivation letter","Proof of admission","Financial declaration"], tl:{opens:"Jan 2026",closes:"Apr 30, 2026",results:"Jul 2026"}, contact:{web:"akdn.org/portugal",email:"scholarships-pt@akfed.org"}, tip:"Learning basic Portuguese before applying shows deep commitment. Reference historical ties between Africa and Portugal in your motivation letter." },
];

const CATS = [
  { l:"Fully Funded", i:"💰" }, { l:"Europe", i:"🌍" }, { l:"Canada", i:"🇨🇦" },
  { l:"UK", i:"🇬🇧" }, { l:"Germany", i:"🇩🇪" }, { l:"Portugal", i:"🇵🇹" },
  { l:"Africa", i:"✊" }, { l:"Research", i:"🔬" }, { l:"Leadership", i:"🏆" },
  { l:"Australia", i:"🇦🇺" }, { l:"Prestigious", i:"⭐" }, { l:"Sustainability", i:"🌱" },
];

const ONBOARD = [
  { k:"origin", i:"🌍", q:"Where are you from?", s:"We'll find scholarships open to your country.", t:"select", o:["Nigeria","Brazil","India","Kenya","Ghana","Morocco","Ethiopia","Indonesia","Pakistan","Vietnam","Colombia","Egypt","Other"] },
  { k:"field", i:"📚", q:"What do you want to study?", s:"We'll match you with the right scholarships.", t:"select", o:["Medicine","Engineering","Business","AI & Technology","Law","Arts & Design","Environment","Education","Social Sciences","Not sure yet"] },
  { k:"destination", i:"✈️", q:"Where do you dream of studying?", s:"Pick your top destination.", t:"select", o:["Europe 🇪🇺","Canada 🇨🇦","UK 🇬🇧","Germany 🇩🇪","Australia 🇦🇺","USA 🇺🇸","Portugal 🇵🇹","Netherlands 🇳🇱","Sweden 🇸🇪","Any country"] },
  { k:"level", i:"🎓", q:"What's your academic level?", s:"Scholarships vary — we'll filter correctly.", t:"select", o:["Undergraduate","Master's","PhD / Doctorate","Professional Degree","Short Course"] },
  { k:"priorities", i:"⭐", q:"What matters most to you?", s:"Select all that apply.", t:"multi", o:["Fully funded only","Partial is okay","Research focus","Leadership focus","Study + work permit","Prestigious name","Quick deadline"] },
];

const NOTIFS = [
  { id:1, icon:"⏰", title:"Erasmus Mundus deadline in 5 days", sub:"Don't miss Jan 15, 2026", time:"2h ago", sid:2 },
  { id:2, icon:"✦", title:"New AI match: Gates Cambridge", sub:"84% match based on your profile", time:"1d ago", sid:4 },
  { id:3, icon:"🎉", title:"AI Application Tip", sub:"Apply 2 weeks early to improve your chances", time:"3d ago", sid:null },
  { id:4, icon:"📋", title:"Complete your profile", sub:"Add more details to improve matches", time:"5d ago", sid:null },
];

// ─── THEME ──────────────────────────────────────────────────────────────────

const LT = { bg:"#EEF2FF", sf:"#F0F4FF", cd:"#FFFFFF", t1:"#0F172A", t2:"#64748B", t3:"#94A3B8", bd:"#F1F5F9", ac:"#4F46E5", as:"rgba(79,70,229,.1)", ib:"#F8FAFC", ibr:"#E2E8F0", nv:"rgba(255,255,255,.92)", sb:"#FFFFFF", pl:"#FFFFFF", pt:"#374151", tg:"#F1F5F9", tt:"#64748B", wb:"#FEF3C7", wt:"#92400E", gr:"linear-gradient(135deg,#4F46E5,#7C3AED)", sh:"rgba(0,0,0,.06)" };
const DK = { bg:"#0D1526", sf:"#111827", cd:"#1A2235", t1:"#E2E8FF", t2:"#8894B8", t3:"#4A5880", bd:"#1E2D47", ac:"#6366F1", as:"rgba(99,102,241,.15)", ib:"#1E2D47", ibr:"#2A3A5C", nv:"rgba(13,21,38,.94)", sb:"#111827", pl:"#1A2235", pt:"#8894B8", tg:"#1E2D47", tt:"#8894B8", wb:"#2A2010", wt:"#D97706", gr:"linear-gradient(135deg,#6366F1,#8B5CF6)", sh:"rgba(0,0,0,.3)" };

const getStatus = (dark) => ({
  applied:   { l:"Applied",   bg: dark ? "rgba(99,102,241,.2)"  : "#EEF2FF", c: dark ? "#818CF8" : "#4F46E5" },
  pending:   { l:"Pending",   bg: dark ? "rgba(234,179,8,.15)"  : "#FEF9C3", c: dark ? "#FDE047" : "#A16207" },
  interview: { l:"Interview", bg: dark ? "rgba(139,92,246,.15)" : "#FAF5FF", c: dark ? "#C4B5FD" : "#7C3AED" },
  accepted:  { l:"Accepted",  bg: dark ? "rgba(34,197,94,.15)"  : "#DCFCE7", c: dark ? "#86EFAC" : "#15803D" },
  denied:    { l:"Denied",    bg: dark ? "rgba(239,68,68,.15)"  : "#FEF2F2", c: dark ? "#FCA5A5" : "#B91C1C" },
});

// ─── GLOBAL CSS ─────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  body { overscroll-behavior: none; }
  ::-webkit-scrollbar { width: 0; height: 0; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideUpBig { from { opacity:0; transform:translateY(44px); } to { opacity:1; transform:translateY(0); } }
  @keyframes scaleIn { from { opacity:0; transform:scale(.95); } to { opacity:1; transform:scale(1); } }
  @keyframes slideRight { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideFromRight { from { transform:translateX(100%); } to { transform:translateX(0); } }
  @keyframes panelDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes sheetUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
  @keyframes glowPulse { 0%,100% { box-shadow:0 0 0 0 rgba(79,70,229,.3); } 50% { box-shadow:0 0 0 10px rgba(79,70,229,0); } }
  @keyframes bounceDot { 0%,80%,100% { transform:translateY(0); opacity:.4; } 40% { transform:translateY(-7px); opacity:1; } }
  @keyframes stagger { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes wiggle { 0%,100% { transform:rotate(-.8deg); } 50% { transform:rotate(.8deg); } }

  .fade-up { animation: fadeUp .4s ease both; }
  .slide-up { animation: slideUpBig .5s cubic-bezier(.16,1,.3,1) both; }
  .scale-in { animation: scaleIn .35s cubic-bezier(.16,1,.3,1) both; }
  .slide-right { animation: slideRight .38s ease both; }
  .detail-enter { animation: slideFromRight .38s cubic-bezier(.16,1,.3,1); }
  .panel-enter { animation: panelDown .3s ease; }
  .sheet-enter { animation: sheetUp .35s cubic-bezier(.16,1,.3,1); }
  .s1 { animation: stagger .4s ease .05s both; }
  .s2 { animation: stagger .4s ease .10s both; }
  .s3 { animation: stagger .4s ease .15s both; }
  .s4 { animation: stagger .4s ease .20s both; }
  .s5 { animation: stagger .4s ease .25s both; }
  .s6 { animation: stagger .4s ease .30s both; }
  .ai-glow { animation: glowPulse 2.5s infinite; }
  .d1 { animation: bounceDot 1.2s infinite ease-in-out 0s; display:inline-block; width:8px; height:8px; border-radius:50%; }
  .d2 { animation: bounceDot 1.2s infinite ease-in-out .15s; display:inline-block; width:8px; height:8px; border-radius:50%; }
  .d3 { animation: bounceDot 1.2s infinite ease-in-out .3s; display:inline-block; width:8px; height:8px; border-radius:50%; }
  .wiggle-el { animation: wiggle .35s ease-in-out infinite; }

  .tap { transition: transform .15s ease, opacity .15s ease; cursor: pointer; }
  .tap:active { transform: scale(.94); opacity: .85; }
  .card-el { transition: transform .25s ease, box-shadow .25s ease; cursor: pointer; }
  .card-el:hover { transform: translateY(-3px); }
  .card-el:active { transform: scale(.98); }
  .pill { transition: all .2s ease; white-space: nowrap; cursor: pointer; border: none; outline: none; font-family: 'DM Sans', sans-serif; }
  .pill:active { transform: scale(.94); }

  .nex-input { font-family: 'DM Sans', sans-serif; background: none; border: none; outline: none; color: inherit; width: 100%; }
  .nex-input::placeholder { color: #94A3B8; }
  .nex-ta { font-family: 'DM Sans', sans-serif; background: none; border: none; outline: none; color: inherit; width: 100%; resize: none; }
  .nex-ta::placeholder { color: #94A3B8; }

  .nav-btn { background: none; border: none; outline: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; padding: 6px 12px; transition: transform .2s ease; flex: 1; }
  .nav-btn:active { transform: scale(.88); }
  .sb-item { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 12px; cursor: pointer; transition: all .2s; text-align: left; width: 100%; border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 14px; }

  .pad { padding: clamp(16px,4vw,24px); padding-bottom: 110px; }
  .grid { display: flex; flex-direction: column; gap: 14px; }
  .sidebar { display: none !important; }
  .bot-nav { display: flex !important; }

  @media (min-width: 768px) and (max-width: 1023px) {
    .grid { display: grid !important; grid-template-columns: 1fr 1fr; gap: 14px; }
    .pad { padding: 24px; padding-bottom: 110px; }
  }
  @media (min-width: 1024px) {
    .sidebar { display: flex !important; }
    .bot-nav { display: none !important; }
    .pad { padding: 32px; padding-bottom: 48px; margin-left: 250px; }
    .grid { display: grid !important; grid-template-columns: 1fr 1fr; gap: 16px; }
    .dmax { max-width: 880px; }
  }
`;

// ─── ICONS ──────────────────────────────────────────────────────────────────

const IcSearch = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const IcBell = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IcBk = ({ f }) => <svg width="16" height="16" viewBox="0 0 24 24" fill={f ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>;
const IcStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>;
const IcChevR = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const IcChevL = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const IcHome = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcDisc = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const IcSave = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>;
const IcAI = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>;
const IcUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcX = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcSend = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>;
const IcEdit = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcMoon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const IcSun = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;

// ─── TOGGLE ─────────────────────────────────────────────────────────────────

function Toggle({ on, fn, t }) {
  return (
    <div
      onClick={fn}
      style={{ width:48, height:28, borderRadius:14, background: on ? t.ac : "#CBD5E1", cursor:"pointer", position:"relative", transition:"background .3s", flexShrink:0 }}
    >
      <div style={{ position:"absolute", top:3, left: on ? 22 : 3, width:22, height:22, borderRadius:"50%", background:"#fff", boxShadow:"0 2px 4px rgba(0,0,0,.2)", transition:"left .25s cubic-bezier(.16,1,.3,1)" }} />
    </div>
  );
}

// ─── BOTTOM SHEET ───────────────────────────────────────────────────────────

function Sheet({ t, visible, onClose, title, children }) {
  if (!visible) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:700, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.5)", backdropFilter:"blur(6px)" }} onClick={onClose} />
      <div className="sheet-enter" style={{ position:"relative", width:"100%", maxWidth:580, background:t.cd, borderRadius:"28px 28px 0 0", padding:"20px 24px 48px", zIndex:1, maxHeight:"80vh", overflowY:"auto" }}>
        <div style={{ width:36, height:4, background:t.bd, borderRadius:2, margin:"0 auto 20px" }} />
        {title && <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700, color:t.t1, marginBottom:16 }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

// ─── SCHOLARSHIP CARD ───────────────────────────────────────────────────────

function Card({ s, t, dk, saved, onSave, appStatus, onClick, editMode, onDelete, idx }) {
  const i = idx || 0;
  const cls = ["s1","s2","s3","s4","s5","s6"][i % 6];
  const sc = getStatus(dk);
  const st = appStatus ? sc[appStatus] : null;
  const timer = useRef(null);

  const handleMouseDown = () => { timer.current = setTimeout(() => { if (onDelete) onDelete(); }, 600); };
  const handleMouseUp = () => clearTimeout(timer.current);

  return (
    <div
      className={`card-el ${cls}${editMode ? " wiggle-el" : ""}`}
      style={{ background:t.cd, borderRadius:24, padding:"clamp(14px,2.5vw,20px)", boxShadow:`0 2px 20px ${t.sh}`, position:"relative", overflow:"visible", userSelect:"none" }}
      onClick={() => { if (!editMode && onClick) onClick(s); }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${s.color},${s.color}88)`, borderRadius:"24px 24px 0 0" }} />

      {editMode && (
        <div
          onClick={(e) => { e.stopPropagation(); if (onDelete) onDelete(); }}
          style={{ position:"absolute", top:-8, right:-8, width:26, height:26, background:"#FF3B30", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14, fontWeight:700, zIndex:10, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,.3)" }}
        >✕</div>
      )}

      {st && (
        <div style={{ position:"absolute", top:14, right:16, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:999, background:st.bg, color:st.c }}>{st.l}</div>
      )}

      <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:10, paddingTop:4 }}>
        <div style={{ width:44, height:44, borderRadius:14, background:`${s.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{s.flag}</div>
        <div style={{ flex:1, minWidth:0, paddingRight: appStatus ? 60 : 0 }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(13px,2vw,15px)", fontWeight:700, color:t.t1, lineHeight:1.25, marginBottom:2 }}>{s.name}</div>
          <div style={{ fontSize:12, color:t.t2 }}>{s.univ}</div>
        </div>
        {!appStatus && (
          <button className="tap" onClick={(e) => { e.stopPropagation(); onSave(s.id); }} style={{ background:"none", border:"none", color: saved ? "#4F46E5" : "#CBD5E1", padding:4, marginTop:-2, flexShrink:0 }}>
            <IcBk f={saved} />
          </button>
        )}
      </div>

      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
        <span style={{ fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:999, background:`${s.color}18`, color:s.color }}>{s.funding}</span>
        <span style={{ fontSize:11, fontWeight:500, padding:"3px 9px", borderRadius:999, background:t.tg, color:t.tt }}>{s.country}</span>
        <span style={{ fontSize:11, fontWeight:500, padding:"3px 9px", borderRadius:999, background:t.wb, color:t.wt }}>Due {s.deadline}</span>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:11, color:t.t3, fontWeight:500, flexShrink:0 }}>AI Match</span>
        <div style={{ flex:1, height:5, background:t.tg, borderRadius:999, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${s.match}%`, background:`linear-gradient(90deg,${s.color},${s.color}bb)`, borderRadius:999 }} />
        </div>
        <span style={{ fontSize:13, fontWeight:700, color:s.color, flexShrink:0 }}>{s.match}%</span>
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS PANEL ────────────────────────────────────────────────────

function NotifPanel({ t, onClose, onOpenDetail }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:500 }} onClick={onClose}>
      <div className="panel-enter" onClick={(e) => e.stopPropagation()} style={{ position:"absolute", top:0, left:0, right:0, maxWidth:480, margin:"0 auto", background:t.cd, borderRadius:"0 0 28px 28px", boxShadow:`0 16px 48px ${t.sh}`, overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 20px 14px", borderBottom:`1px solid ${t.bd}` }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700, color:t.t1 }}>Notifications</div>
          <button className="tap" onClick={onClose} style={{ width:32, height:32, borderRadius:"50%", background:t.tg, border:"none", display:"flex", alignItems:"center", justifyContent:"center", color:t.t2 }}><IcX /></button>
        </div>
        {NOTIFS.map((n) => (
          <div
            key={n.id}
            className="tap"
            onClick={() => { if (n.sid) { onOpenDetail(SD.find(s => s.id === n.sid)); onClose(); } }}
            style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 20px", borderBottom:`1px solid ${t.bd}` }}
          >
            <div style={{ width:40, height:40, borderRadius:14, background:t.as, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{n.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:t.t1, marginBottom:3 }}>{n.title}</div>
              <div style={{ fontSize:12, color:t.t2 }}>{n.sub}</div>
            </div>
            <div style={{ fontSize:11, color:t.t3, flexShrink:0, paddingTop:2 }}>{n.time}</div>
          </div>
        ))}
        <div style={{ padding:"12px 20px", textAlign:"center" }}>
          <span style={{ fontSize:13, color:t.t3 }}>You're all caught up ✓</span>
        </div>
      </div>
    </div>
  );
}

// ─── SCHOLARSHIP DETAIL ─────────────────────────────────────────────────────

function Detail({ s, t, dk, saved, onSave, apps, onApply, onUpdate, onBack, onAI }) {
  const [tab, setTab] = useState("about");
  const [showStatus, setShowStatus] = useState(false);
  const appRec = apps[s.id];
  const sc = getStatus(dk);
  const TABS = ["about","eligibility","documents","timeline"];
  const TL = { about:"About", eligibility:"Eligibility", documents:"Documents", timeline:"Timeline" };

  return (
    <div className="detail-enter" style={{ position:"fixed", inset:0, zIndex:400, background:t.bg, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", background:t.cd, borderBottom:`1px solid ${t.bd}`, flexShrink:0 }}>
        <button className="tap" onClick={onBack} style={{ width:40, height:40, borderRadius:"50%", background:t.tg, border:"none", display:"flex", alignItems:"center", justifyContent:"center", color:t.t1 }}><IcChevL /></button>
        <div style={{ flex:1, fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:t.t1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</div>
        <button className="tap" onClick={() => onSave(s.id)} style={{ width:40, height:40, borderRadius:"50%", background:t.tg, border:"none", display:"flex", alignItems:"center", justifyContent:"center", color: saved ? "#4F46E5" : "#CBD5E1" }}><IcBk f={saved} /></button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch" }}>
        {/* Hero */}
        <div style={{ background:s.color, padding:"24px 20px 28px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-30, right:-30, width:160, height:160, background:"rgba(255,255,255,.08)", borderRadius:"50%" }} />
          <div style={{ fontSize:48, marginBottom:12 }}>{s.flag}</div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(18px,3vw,22px)", fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:8 }}>{s.name}</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", marginBottom:16 }}>{s.univ} · {s.country}</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[s.funding, `⏰ Due ${s.deadline}`, `✦ ${s.match}% Match`].map((tag) => (
              <span key={tag} style={{ fontSize:12, fontWeight:600, padding:"5px 12px", borderRadius:999, background:"rgba(255,255,255,.2)", color:"#fff" }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Apply button */}
        <div style={{ padding:"16px 20px", background:t.cd, borderBottom:`1px solid ${t.bd}` }}>
          {!appRec ? (
            <button className="tap" onClick={() => onApply(s.id)} style={{ width:"100%", padding:"15px", borderRadius:999, border:"none", background:t.gr, color:"#fff", fontSize:16, fontWeight:700, fontFamily:"'DM Sans',sans-serif", cursor:"pointer", boxShadow:`0 8px 24px ${t.as}` }}>
              Apply Now →
            </button>
          ) : (
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <div style={{ flex:1, padding:"13px 16px", borderRadius:14, background:sc[appRec.status]?.bg, textAlign:"center" }}>
                <div style={{ fontSize:13, fontWeight:700, color:sc[appRec.status]?.c }}>Status: {sc[appRec.status]?.l}</div>
                <div style={{ fontSize:11, color:t.t3, marginTop:2 }}>Applied {appRec.date}</div>
              </div>
              <button className="tap" onClick={() => setShowStatus(true)} style={{ padding:"13px 16px", borderRadius:14, background:t.as, border:"none", color:t.ac, fontSize:13, fontWeight:600, cursor:"pointer" }}>Update</button>
            </div>
          )}
        </div>

        {/* Tab bar */}
        <div style={{ display:"flex", background:t.cd, borderBottom:`1px solid ${t.bd}`, overflowX:"auto" }}>
          {TABS.map((tb) => (
            <button key={tb} className="pill" onClick={() => setTab(tb)} style={{ flex:"0 0 auto", padding:"14px 18px", fontSize:14, fontWeight: tab === tb ? 600 : 400, color: tab === tb ? t.ac : t.t2, borderBottom:`2px solid ${tab === tb ? t.ac : "transparent"}`, background:"none", margin:0, transition:"all .2s" }}>
              {TL[tb]}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding:"20px", maxWidth:640, margin:"0 auto" }}>
          {tab === "about" && (
            <div>
              <p style={{ fontSize:15, color:t.t2, lineHeight:1.7, marginBottom:20 }}>{s.desc}</p>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:t.t1, marginBottom:12 }}>What it covers</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
                {s.coverage.map((c) => (
                  <div key={c} style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:t.tg, borderRadius:12 }}>
                    <span style={{ color:t.ac, fontSize:16 }}>✓</span>
                    <span style={{ fontSize:14, color:t.t1, fontWeight:500 }}>{c}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:t.as, borderRadius:20, padding:"18px", border:`1px solid ${t.ac}28` }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <div style={{ width:28, height:28, background:t.gr, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12 }}><IcStar /></div>
                  <span style={{ fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, color:t.ac }}>AI Application Tip</span>
                </div>
                <p style={{ fontSize:14, color:t.t1, lineHeight:1.65 }}>{s.tip}</p>
                <button className="tap" onClick={onAI} style={{ marginTop:12, padding:"8px 16px", borderRadius:999, background:t.ac, color:"#fff", border:"none", fontSize:12, fontWeight:600, cursor:"pointer" }}>Ask AI more →</button>
              </div>
            </div>
          )}
          {tab === "eligibility" && (
            <div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:t.t1, marginBottom:14 }}>Requirements</div>
              {s.elig.map((e, idx) => (
                <div key={idx} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"13px 0", borderBottom:`1px solid ${t.bd}` }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:t.as, color:t.ac, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, flexShrink:0 }}>{idx + 1}</div>
                  <span style={{ fontSize:14, color:t.t1, lineHeight:1.5, paddingTop:2 }}>{e}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "documents" && (
            <div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:t.t1, marginBottom:14 }}>Required Documents</div>
              {s.docs.map((d, idx) => (
                <div key={idx} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:t.tg, borderRadius:12, marginBottom:8 }}>
                  <span style={{ fontSize:16 }}>📄</span>
                  <span style={{ fontSize:14, color:t.t1, fontWeight:500 }}>{d}</span>
                </div>
              ))}
              <div style={{ marginTop:16, padding:"14px", background:t.wb, borderRadius:14 }}>
                <div style={{ fontSize:13, fontWeight:600, color:t.wt }}>⚠️ Prepare all documents at least 3 weeks before the deadline to avoid last-minute stress.</div>
              </div>
            </div>
          )}
          {tab === "timeline" && (
            <div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:t.t1, marginBottom:16 }}>Key Dates</div>
              {[
                { label:"Applications Open", val:s.tl.opens, icon:"📅" },
                { label:"Deadline", val:s.tl.closes, icon:"⏰" },
                { label:"Results Announced", val:s.tl.results, icon:"🎉" },
              ].map((row, idx, arr) => (
                <div key={idx} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 0", borderBottom: idx < arr.length - 1 ? `1px solid ${t.bd}` : "none" }}>
                  <div style={{ width:44, height:44, borderRadius:14, background:t.tg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{row.icon}</div>
                  <div>
                    <div style={{ fontSize:12, color:t.t3, marginBottom:3 }}>{row.label}</div>
                    <div style={{ fontSize:16, fontWeight:700, color:t.t1 }}>{row.val}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:20, padding:"14px 16px", background:t.as, borderRadius:14 }}>
                <div style={{ fontSize:13, fontWeight:600, color:t.ac, marginBottom:4 }}>Contact</div>
                <div style={{ fontSize:13, color:t.t2 }}>🌐 {s.contact.web}</div>
                <div style={{ fontSize:13, color:t.t2, marginTop:4 }}>✉️ {s.contact.email}</div>
              </div>
            </div>
          )}
          <div style={{ height:40 }} />
        </div>
      </div>

      <Sheet t={t} visible={showStatus} onClose={() => setShowStatus(false)} title="Update Application Status">
        {Object.entries(getStatus(dk)).map(([k, v]) => (
          <button key={k} className="tap" onClick={() => { onUpdate(s.id, k); setShowStatus(false); }} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderRadius:14, border:`2px solid ${appRec?.status === k ? t.ac : t.bd}`, background: appRec?.status === k ? t.as : t.cd, marginBottom:8, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:10, height:10, borderRadius:"50%", background:v.c, display:"inline-block" }} />
              <span style={{ fontSize:15, fontWeight:600, color:t.t1 }}>{v.l}</span>
            </div>
            {appRec?.status === k && <span style={{ fontSize:14, color:t.ac }}>✓</span>}
          </button>
        ))}
      </Sheet>
    </div>
  );
}

// ─── ONBOARDING ─────────────────────────────────────────────────────────────

function Onboarding({ t, onDone }) {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [sel, setSel] = useState(null);
  const [multi, setMulti] = useState([]);
  const [sk, setSk] = useState(0);

  const cur = ONBOARD[step];
  const progress = step < 0 ? 0 : (step / ONBOARD.length) * 100;
  const canGo = step < 0 ? true : cur.t === "multi" ? multi.length > 0 : !!sel;

  const next = () => {
    if (step === -1) { setStep(0); return; }
    const val = cur.t === "multi" ? multi : sel;
    const a = { ...answers, [cur.k]: val };
    setAnswers(a);
    if (step < ONBOARD.length - 1) {
      setStep(s => s + 1); setSel(null); setMulti([]); setSk(k => k + 1);
    } else {
      onDone(a);
    }
  };

  if (step === -1) {
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#4F46E5 0%,#7C3AED 55%,#0F172A 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center" }}>
        <div className="slide-up">
          <div style={{ width:84, height:84, background:"rgba(255,255,255,.14)", borderRadius:26, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px", backdropFilter:"blur(12px)" }}>
            <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:40, color:"#fff" }}>N</span>
          </div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:"clamp(34px,8vw,46px)", color:"#fff", marginBottom:14, letterSpacing:"-.02em" }}>Nexora</div>
          <div style={{ fontSize:"clamp(15px,3vw,18px)", color:"rgba(255,255,255,.7)", marginBottom:52, lineHeight:1.6, maxWidth:320 }}>
            Discover scholarships that match your ambitions.<br />Study anywhere. Become everything.
          </div>
          <button className="tap" onClick={next} style={{ background:"#fff", color:"#4F46E5", border:"none", borderRadius:999, padding:"17px 44px", fontSize:16, fontWeight:700, fontFamily:"'DM Sans',sans-serif", boxShadow:"0 8px 32px rgba(0,0,0,.2)" }}>
            Get Started →
          </button>
          <div style={{ marginTop:18, fontSize:13, color:"rgba(255,255,255,.35)" }}>Free · No credit card needed</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:t.sf, display:"flex", flexDirection:"column" }}>
      <div style={{ height:3, background:t.bd }}>
        <div style={{ height:"100%", width:`${progress}%`, background:t.gr, transition:"width .5s ease", borderRadius:"0 2px 2px 0" }} />
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px" }}>
        <button className="tap" onClick={() => { if (step > 0) { setStep(s => s - 1); setSel(null); setMulti([]); } else { setStep(-1); } }} style={{ background:t.tg, border:"none", borderRadius:999, padding:"8px 16px", fontSize:13, fontWeight:600, color:t.t2 }}>← Back</button>
        <span style={{ fontSize:13, color:t.t3, fontWeight:500 }}>{step + 1} / {ONBOARD.length}</span>
        <button className="tap" onClick={() => onDone(answers)} style={{ background:"none", border:"none", fontSize:13, color:t.t3, cursor:"pointer" }}>Skip</button>
      </div>
      <div key={sk} className="slide-right" style={{ flex:1, padding:"20px 24px 0", maxWidth:540, margin:"0 auto", width:"100%" }}>
        <div style={{ fontSize:44, marginBottom:16 }}>{cur.i}</div>
        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(22px,5vw,28px)", fontWeight:700, color:t.t1, marginBottom:8, lineHeight:1.2 }}>{cur.q}</div>
        <div style={{ fontSize:15, color:t.t2, marginBottom:28, lineHeight:1.5 }}>{cur.s}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {cur.o.map((opt) => {
            const on = cur.t === "multi" ? multi.includes(opt) : sel === opt;
            return (
              <button key={opt} className="tap" onClick={() => { if (cur.t === "multi") { setMulti(p => p.includes(opt) ? p.filter(x => x !== opt) : [...p, opt]); } else { setSel(opt); } }} style={{ textAlign:"left", padding:"13px 18px", borderRadius:14, border:`2px solid ${on ? t.ac : t.bd}`, background: on ? t.as : t.cd, color: on ? t.ac : t.t1, fontWeight: on ? 600 : 400, fontSize:15, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                {opt}{on && <span style={{ fontSize:16 }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding:"20px 24px 36px", maxWidth:540, margin:"0 auto", width:"100%" }}>
        <button className="tap" onClick={next} disabled={!canGo} style={{ width:"100%", padding:"16px", borderRadius:999, border:"none", background: canGo ? t.gr : t.tg, color: canGo ? "#fff" : t.t3, fontSize:16, fontWeight:700, fontFamily:"'DM Sans',sans-serif", cursor: canGo ? "pointer" : "default", transition:"all .3s ease", boxShadow: canGo ? `0 8px 24px ${t.as}` : "none" }}>
          {step === ONBOARD.length - 1 ? "See My Scholarships ✦" : "Continue →"}
        </button>
      </div>
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────

function Home({ t, dk, saved, onSave, nav, onOpenDetail, onShowNotifs, apps }) {
  const [qi, setQi] = useState(0);
  const [qv, setQv] = useState(true);
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setQv(false);
      setTimeout(() => { setQi(i => (i + 1) % QUOTES.length); setQv(true); }, 550);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const list = cat ? SD.filter(s => s.tags.includes(cat)) : SD.slice(0, 6);

  return (
    <div className="pad fade-up">
      <div className="dmax" style={{ margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22, paddingTop:4 }}>
          <div>
            <div style={{ fontSize:13, color:t.t2, marginBottom:4 }}>Good morning ☀️</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(22px,5vw,30px)", fontWeight:800, color:t.t1, lineHeight:1.1 }}>Find Your<br />Scholarship</div>
          </div>
          <button className="tap" onClick={onShowNotifs} style={{ width:44, height:44, background:t.cd, borderRadius:"50%", border:"none", display:"flex", alignItems:"center", justifyContent:"center", color:t.t1, boxShadow:`0 2px 10px ${t.sh}`, marginTop:4, position:"relative" }}>
            <IcBell />
            <div style={{ position:"absolute", top:9, right:10, width:8, height:8, background:"#EF4444", borderRadius:"50%", border:`2px solid ${t.cd}` }} />
          </button>
        </div>

        <div style={{ background:t.gr, borderRadius:24, padding:"clamp(18px,3vw,24px)", marginBottom:18, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-24, right:-24, width:120, height:120, background:"rgba(255,255,255,.06)", borderRadius:"50%" }} />
          <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(255,255,255,.18)", borderRadius:999, padding:"4px 12px", marginBottom:12, fontSize:11, fontWeight:600, color:"rgba(255,255,255,.9)", textTransform:"uppercase", letterSpacing:".04em" }}>
            <IcStar /> Daily inspiration
          </div>
          <p style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(16px,3.5vw,21px)", fontWeight:600, color:"#fff", lineHeight:1.35, opacity: qv ? 1 : 0, transition:"opacity .4s ease" }}>
            "{QUOTES[qi]}"
          </p>
        </div>

        <div onClick={() => nav("search")} className="tap" style={{ display:"flex", alignItems:"center", gap:12, background:t.cd, borderRadius:999, padding:"0 20px", height:54, boxShadow:`0 2px 14px ${t.sh}`, marginBottom:22, cursor:"pointer" }}>
          <span style={{ color:t.t3 }}><IcSearch /></span>
          <span style={{ fontSize:15, color:t.t3 }}>Search scholarships, countries, fields…</span>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <span style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(15px,2vw,17px)", fontWeight:700, color:t.t1 }}>Categories</span>
          {cat && <button className="tap" onClick={() => setCat(null)} style={{ fontSize:12, color:t.ac, background:"none", border:"none", fontWeight:600 }}>Clear ✕</button>}
        </div>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:22, WebkitOverflowScrolling:"touch" }}>
          {CATS.map((c) => {
            const on = cat === c.l;
            return (
              <button key={c.l} className="pill" onClick={() => setCat(on ? null : c.l)} style={{ padding:"9px 16px", borderRadius:999, fontSize:13, fontWeight:500, background: on ? t.ac : t.pl, color: on ? "#fff" : t.pt, flexShrink:0, boxShadow: on ? `0 4px 14px ${t.as}` : `0 1px 4px ${t.sh}` }}>
                {c.i} {c.l}
              </button>
            );
          })}
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <span style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(15px,2vw,17px)", fontWeight:700, color:t.t1 }}>{cat ? `${cat} Scholarships` : "Top Matches For You"}</span>
          <button className="tap" onClick={() => nav("search")} style={{ display:"flex", alignItems:"center", gap:3, fontSize:13, fontWeight:600, color:t.ac, background:"none", border:"none" }}>View all <IcChevR /></button>
        </div>

        <div className="grid">
          {list.map((s, i) => (
            <Card key={s.id} s={s} t={t} dk={dk} saved={saved.includes(s.id)} onSave={onSave} appStatus={apps[s.id]?.status} onClick={onOpenDetail} idx={i} />
          ))}
          {list.length === 0 && (
            <div style={{ textAlign:"center", padding:"48px 20px", color:t.t3 }}>
              <div style={{ fontSize:44, marginBottom:12 }}>🔍</div>
              <div style={{ fontSize:15, fontWeight:500 }}>No scholarships in this category.</div>
            </div>
          )}
        </div>

        <div className="card-el tap s1" onClick={() => nav("ai")} style={{ display:"flex", alignItems:"center", gap:14, background:t.cd, borderRadius:20, padding:"18px 20px", boxShadow:`0 2px 16px ${t.as}`, border:`1px solid ${t.as}`, marginTop:20 }}>
          <div className="ai-glow" style={{ width:46, height:46, background:t.gr, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink:0 }}><IcStar /></div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:t.t1 }}>Ask Nexora AI</div>
            <div style={{ fontSize:12, color:t.t2, marginTop:2 }}>Get personalized scholarship advice</div>
          </div>
          <span style={{ color:t.t3 }}><IcChevR /></span>
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────

function Search({ t, dk, saved, onSave, onOpenDetail }) {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState([]);
  const ref = useRef(null);
  useEffect(() => { setTimeout(() => ref.current?.focus(), 220); }, []);

  const FTAGS = ["Fully Funded","Europe","Canada","UK","Germany","Research","Prestigious","Leadership"];
  const toggleF = (f) => setFilters(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

  const results = SD.filter(s => {
    const lq = q.toLowerCase();
    const mq = !lq || [s.name, s.country, s.univ, s.funding, ...s.tags].some(x => x.toLowerCase().includes(lq));
    const mf = filters.length === 0 || filters.every(f => s.tags.includes(f));
    return mq && mf;
  });

  return (
    <div className="pad fade-up">
      <div className="dmax" style={{ margin:"0 auto" }}>
        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(20px,4vw,26px)", fontWeight:800, color:t.t1, marginBottom:18, paddingTop:4 }}>Discover</div>
        <div style={{ display:"flex", alignItems:"center", gap:12, background:t.cd, borderRadius:20, padding:"12px 20px", boxShadow:`0 2px 14px ${t.sh}`, marginBottom:14 }}>
          <span style={{ color:t.t3, flexShrink:0 }}><IcSearch /></span>
          <input ref={ref} className="nex-input" style={{ fontSize:16 }} placeholder="Country, field, university, keyword…" value={q} onChange={(e) => setQ(e.target.value)} />
          {q && <button className="tap" onClick={() => setQ("")} style={{ background:t.tg, border:"none", borderRadius:"50%", width:26, height:26, display:"flex", alignItems:"center", justifyContent:"center", color:t.t2, flexShrink:0 }}><IcX /></button>}
        </div>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:18, WebkitOverflowScrolling:"touch" }}>
          {FTAGS.map((f) => (
            <button key={f} className="pill" onClick={() => toggleF(f)} style={{ padding:"7px 14px", borderRadius:999, fontSize:13, fontWeight:500, flexShrink:0, background: filters.includes(f) ? t.ac : t.pl, color: filters.includes(f) ? "#fff" : t.pt, boxShadow: filters.includes(f) ? `0 4px 12px ${t.as}` : `0 1px 4px ${t.sh}` }}>{f}</button>
          ))}
        </div>
        {filters.length > 0 && (
          <div style={{ marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:13, color:t.t2 }}>Filtering: <strong style={{ color:t.ac }}>{filters.join(", ")}</strong></span>
            <button className="tap" onClick={() => setFilters([])} style={{ fontSize:12, color:t.t3, background:"none", border:"none", cursor:"pointer" }}>Clear all</button>
          </div>
        )}
        <div style={{ fontSize:13, color:t.t2, marginBottom:14, fontWeight:500 }}>{results.length} scholarship{results.length !== 1 ? "s" : ""} found</div>
        <div className="grid">
          {results.map((s, i) => (
            <Card key={s.id} s={s} t={t} dk={dk} saved={saved.includes(s.id)} onSave={onSave} onClick={onOpenDetail} idx={i} />
          ))}
          {results.length === 0 && (
            <div style={{ textAlign:"center", padding:"60px 20px", color:t.t3 }}>
              <div style={{ fontSize:48, marginBottom:14 }}>🔍</div>
              <div style={{ fontSize:17, fontWeight:600, color:t.t1, marginBottom:8 }}>No results found</div>
              <div style={{ fontSize:14 }}>Try removing a filter or different keyword</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SAVED WORKSPACE ────────────────────────────────────────────────────────

function SavedWS({ t, dk, savedIds, onSave, apps, onUpdate, onRemove, onOpenDetail }) {
  const [tab, setTab] = useState("saved");
  const [editMode, setEditMode] = useState(false);
  const [statusTarget, setStatusTarget] = useState(null);
  const sc = getStatus(dk);

  const TABS = [
    { k:"saved", l:"Saved" }, { k:"applied", l:"Applied" }, { k:"pending", l:"Pending" },
    { k:"accepted", l:"Accepted" }, { k:"denied", l:"Denied" },
  ];

  const getList = (k) => k === "saved" ? SD.filter(s => savedIds.includes(s.id)) : SD.filter(s => apps[s.id]?.status === k);
  const counts = TABS.reduce((a, tb) => ({ ...a, [tb.k]: getList(tb.k).length }), {});
  const list = getList(tab);

  return (
    <div className="pad fade-up" style={{ paddingTop:0 }}>
      <div className="dmax" style={{ margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"clamp(16px,4vw,24px)", marginBottom:4 }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:"clamp(20px,4vw,26px)", fontWeight:800, color:t.t1 }}>My Scholarships</div>
          <button className="tap" onClick={() => setEditMode(e => !e)} style={{ padding:"8px 14px", borderRadius:999, background: editMode ? t.ac : t.tg, color: editMode ? "#fff" : t.t2, border:"none", fontSize:13, fontWeight:600, cursor:"pointer" }}>{editMode ? "Done" : "Edit"}</button>
        </div>
        {editMode && <div style={{ fontSize:13, color:t.t2, marginBottom:12 }}>Long-press any card to remove it.</div>}

        <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:4, marginBottom:20, WebkitOverflowScrolling:"touch" }}>
          {TABS.map((tb) => {
            const on = tab === tb.k;
            const cnt = counts[tb.k];
            const stC = tb.k !== "saved" && sc[tb.k] ? sc[tb.k].c : t.ac;
            return (
              <button key={tb.k} className="pill" onClick={() => { setTab(tb.k); setEditMode(false); }} style={{ padding:"8px 14px", borderRadius:999, fontSize:13, fontWeight: on ? 700 : 500, flexShrink:0, background: on ? t.ac : t.pl, color: on ? "#fff" : t.pt, boxShadow: on ? `0 4px 12px ${t.as}` : `0 1px 4px ${t.sh}`, display:"flex", alignItems:"center", gap:5 }}>
                {tb.l}
                {cnt > 0 && <span style={{ background: on ? "rgba(255,255,255,.25)" : t.as, borderRadius:999, padding:"1px 7px", fontSize:11, fontWeight:700, color: on ? "#fff" : stC }}>{cnt}</span>}
              </button>
            );
          })}
        </div>

        {list.length === 0 ? (
          <div style={{ textAlign:"center", padding:"72px 24px", color:t.t3 }}>
            <div style={{ fontSize:52, marginBottom:16 }}>{tab === "saved" ? "🔖" : tab === "accepted" ? "🎉" : tab === "denied" ? "😔" : "⏳"}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700, color:t.t1, marginBottom:10 }}>
              {tab === "saved" ? "Nothing saved yet" : tab === "accepted" ? "No acceptances yet" : tab === "denied" ? "No denials" : "Nothing here yet"}
            </div>
            <div style={{ fontSize:14, lineHeight:1.6 }}>
              {tab === "saved" ? "Tap the bookmark on any scholarship to save it here." : "Track your applications here as you apply."}
            </div>
          </div>
        ) : (
          <div className="grid">
            {list.map((s, i) => (
              <div key={s.id}>
                <Card s={s} t={t} dk={dk} saved={savedIds.includes(s.id)} onSave={onSave} appStatus={apps[s.id]?.status} onClick={!editMode ? onOpenDetail : null} editMode={editMode} onDelete={() => { if (tab === "saved") { onSave(s.id); } else { onRemove(s.id); } }} idx={i} />
                {tab !== "saved" && !editMode && (
                  <button className="tap" onClick={() => setStatusTarget(s.id)} style={{ width:"100%", padding:"9px", borderRadius:"0 0 18px 18px", background:t.as, border:"none", fontSize:13, fontWeight:600, color:t.ac, cursor:"pointer", marginTop:-6 }}>Update Status ↓</button>
                )}
              </div>
            ))}
          </div>
        )}

        <Sheet t={t} visible={!!statusTarget} onClose={() => setStatusTarget(null)} title="Update Status">
          {Object.entries(sc).map(([k, v]) => (
            <button key={k} className="tap" onClick={() => { onUpdate(statusTarget, k); setStatusTarget(null); }} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderRadius:14, border:`2px solid ${apps[statusTarget]?.status === k ? t.ac : t.bd}`, background: apps[statusTarget]?.status === k ? t.as : t.cd, marginBottom:8, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ width:10, height:10, borderRadius:"50%", background:v.c, display:"inline-block" }} />
                <span style={{ fontSize:15, fontWeight:600, color:t.t1 }}>{v.l}</span>
              </div>
              {apps[statusTarget]?.status === k && <span style={{ fontSize:14, color:t.ac }}>✓</span>}
            </button>
          ))}
        </Sheet>
      </div>
    </div>
  );
}

// ─── AI SCREEN ───────────────────────────────────────────────────────────────

function AIScreen({ t, onBack }) {
  const [msgs, setMsgs] = useState([{ role:"assistant", text:"Hi! I'm Nexora AI — your personal scholarship guide. ✦\n\nAsk me anything: eligibility, motivation letters, country comparisons, or what your chances are." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const txt = input.trim();
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";
    setMsgs(p => [...p, { role:"user", text:txt }]);
    setLoading(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are Nexora AI, a warm, expert scholarship discovery assistant. Help students find scholarships, understand eligibility, write motivation letters, and plan study abroad. Be concise (2–4 sentences unless detail needed), encouraging, and inspiring. Use line breaks for key info. Never mention Claude.",
          messages: msgs.map(m => ({ role:m.role, content:m.text })).concat([{ role:"user", content:txt }]),
        }),
      });
      const d = await r.json();
      const reply = d.content?.filter(b => b.type === "text").map(b => b.text).join("") || "I'm here to help — could you rephrase that?";
      setMsgs(p => [...p, { role:"assistant", text:reply }]);
    } catch {
      setMsgs(p => [...p, { role:"assistant", text:"Connection issue — please try again." }]);
    }
    setLoading(false);
  };

  const SUGG = ["Can I get a scholarship in Germany?","Help me write a motivation letter","Best fully funded scholarships?","Am I eligible for Erasmus?"];

  return (
    <div className="scale-in" style={{ display:"flex", flexDirection:"column", height:"100vh", background:t.sf, position:"fixed", inset:0, zIndex:500 }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", background:t.cd, borderBottom:`1px solid ${t.bd}`, flexShrink:0 }}>
        <button className="tap" onClick={onBack} style={{ width:40, height:40, borderRadius:"50%", background:t.tg, border:"none", display:"flex", alignItems:"center", justifyContent:"center", color:t.t1 }}><IcChevL /></button>
        <div style={{ width:40, height:40, background:t.gr, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink:0 }}><IcStar /></div>
        <div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:16, fontWeight:700, color:t.t1 }}>Nexora AI</div>
          <div style={{ fontSize:12, color:"#10B981", fontWeight:500 }}>● Online · Ready to help</div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"18px 16px", display:"flex", flexDirection:"column", gap:14, WebkitOverflowScrolling:"touch" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems:"flex-end", gap:8 }}>
            {m.role === "assistant" && (
              <div style={{ width:30, height:30, background:t.gr, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12, flexShrink:0 }}><IcStar /></div>
            )}
            <div style={{ maxWidth:"78%", padding:"12px 16px", background: m.role === "user" ? t.gr : t.cd, color: m.role === "user" ? "#fff" : t.t1, borderRadius: m.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px", fontSize:14, lineHeight:1.55, boxShadow: m.role === "user" ? `0 4px 16px ${t.as}` : `0 2px 10px ${t.sh}`, whiteSpace:"pre-wrap" }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
            <div style={{ width:30, height:30, background:t.gr, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12 }}><IcStar /></div>
            <div style={{ padding:"14px 18px", background:t.cd, borderRadius:"20px 20px 20px 4px", boxShadow:`0 2px 10px ${t.sh}`, display:"flex", gap:6, alignItems:"center" }}>
              <span className="d1" style={{ background:t.t3 }} />
              <span className="d2" style={{ background:t.t3 }} />
              <span className="d3" style={{ background:t.t3 }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {msgs.length <= 2 && (
        <div style={{ padding:"0 16px 10px", display:"flex", gap:8, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
          {SUGG.map((s) => (
            <button key={s} className="pill" onClick={() => setInput(s)} style={{ padding:"8px 14px", borderRadius:999, fontSize:12, fontWeight:500, background:t.cd, color:t.ac, border:`1px solid ${t.as}`, flexShrink:0 }}>{s}</button>
          ))}
        </div>
      )}

      <div style={{ padding:"12px 16px", background:t.cd, borderTop:`1px solid ${t.bd}`, paddingBottom:"max(12px,env(safe-area-inset-bottom))", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"flex-end", gap:10, background:t.ib, borderRadius:20, padding:"10px 12px 10px 18px", border:`1.5px solid ${t.ibr}` }}>
          <textarea
            ref={taRef}
            className="nex-ta"
            rows={1}
            style={{ fontSize:15, maxHeight:120, lineHeight:1.5 }}
            placeholder="Ask anything about scholarships…"
            value={input}
            onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          />
          <button className="tap" onClick={send} disabled={!input.trim() || loading} style={{ width:36, height:36, borderRadius:"50%", border:"none", background: input.trim() ? t.gr : "#E2E8F0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s ease", boxShadow: input.trim() ? `0 4px 12px ${t.as}` : "none", cursor:"pointer" }}>
            <IcSend />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────

function ProfileScreen({ t, dk, setDark, profile, setProfile, onReset, apps, savedCount }) {
  const [editField, setEditField] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [notifs, setNotifs] = useState({ deadlines:true, matches:true, tips:false, updates:true });

  const appCount = Object.keys(apps).length;
  const accepted = Object.values(apps).filter(a => a.status === "accepted").length;

  const FIELDS = [
    { k:"level", l:"Academic Level", i:"🎓" },
    { k:"field", l:"Field of Study", i:"📚" },
    { k:"origin", l:"Origin Country", i:"🌍" },
    { k:"destination", l:"Dream Destination", i:"✈️" },
  ];

  const openEdit = (k, v) => { setEditField(k); setEditVal(Array.isArray(v) ? v.join(", ") : v || ""); };
  const saveEdit = () => { if (editField) setProfile(p => ({ ...p, [editField]: editVal })); setEditField(null); };

  return (
    <div className="pad fade-up">
      <div className="dmax" style={{ margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:24, paddingTop:4 }}>
          <div style={{ width:76, height:76, background:t.gr, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:32 }}>🎓</div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontSize:20, fontWeight:700, color:t.t1 }}>Your Profile</div>
          <div style={{ fontSize:13, color:t.t2, marginTop:3 }}>Tap any field to edit</div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
          {[{ n:savedCount, l:"Saved", i:"🔖" }, { n:appCount, l:"Applied", i:"📋" }, { n:accepted, l:"Accepted", i:"🎉" }].map((s) => (
            <div key={s.l} style={{ background:t.cd, borderRadius:18, padding:"14px 10px", textAlign:"center", boxShadow:`0 2px 12px ${t.sh}` }}>
              <div style={{ fontSize:22, marginBottom:4 }}>{s.i}</div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:t.ac }}>{s.n}</div>
              <div style={{ fontSize:11, color:t.t2, fontWeight:500 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ background:t.cd, borderRadius:24, overflow:"hidden", boxShadow:`0 2px 14px ${t.sh}`, marginBottom:16 }}>
          {FIELDS.map((f, i) => (
            <div key={f.k} className="tap" onClick={() => openEdit(f.k, profile?.[f.k])} style={{ display:"flex", alignItems:"center", gap:14, padding:"15px 18px", borderBottom: i < FIELDS.length - 1 ? `1px solid ${t.bd}` : "none", cursor:"pointer" }}>
              <span style={{ fontSize:20 }}>{f.i}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, color:t.t3, fontWeight:500, marginBottom:2 }}>{f.l}</div>
                <div style={{ fontSize:15, fontWeight:600, color:t.t1 }}>
                  {profile?.[f.k] ? (Array.isArray(profile[f.k]) ? profile[f.k].slice(0, 2).join(", ") : profile[f.k]) : <span style={{ color:t.t3, fontWeight:400 }}>Not set</span>}
                </div>
              </div>
              <span style={{ color:t.t3 }}><IcEdit /></span>
            </div>
          ))}
        </div>

        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:15, fontWeight:700, color:t.t1, marginBottom:12, paddingLeft:4 }}>Settings</div>

        <div style={{ background:t.cd, borderRadius:24, overflow:"hidden", boxShadow:`0 2px 14px ${t.sh}`, marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, padding:"15px 18px" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:t.as, display:"flex", alignItems:"center", justifyContent:"center", color:t.ac }}>{dk ? <IcMoon /> : <IcSun />}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:600, color:t.t1 }}>{dk ? "Dark Mode" : "Light Mode"}</div>
              <div style={{ fontSize:12, color:t.t2, marginTop:1 }}>Switch appearance theme</div>
            </div>
            <Toggle on={dk} fn={() => setDark(d => !d)} t={t} />
          </div>
        </div>

        <div style={{ background:t.cd, borderRadius:24, overflow:"hidden", boxShadow:`0 2px 14px ${t.sh}`, marginBottom:14 }}>
          <div style={{ padding:"13px 18px", borderBottom:`1px solid ${t.bd}` }}>
            <div style={{ fontSize:12, fontWeight:700, color:t.t3, textTransform:"uppercase", letterSpacing:".05em" }}>Notifications</div>
          </div>
          {[
            { k:"deadlines", l:"Deadline Alerts", s:"Reminded before applications close" },
            { k:"matches", l:"New Matches", s:"Notified of new scholarship matches" },
            { k:"tips", l:"AI Tips", s:"Weekly application advice" },
            { k:"updates", l:"Status Updates", s:"Track your application progress" },
          ].map((item, i, arr) => (
            <div key={item.k} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", borderBottom: i < arr.length - 1 ? `1px solid ${t.bd}` : "none" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:600, color:t.t1 }}>{item.l}</div>
                <div style={{ fontSize:12, color:t.t2, marginTop:1 }}>{item.s}</div>
              </div>
              <Toggle on={notifs[item.k]} fn={() => setNotifs(p => ({ ...p, [item.k]: !p[item.k] }))} t={t} />
            </div>
          ))}
        </div>

        <div style={{ background:t.cd, borderRadius:24, overflow:"hidden", boxShadow:`0 2px 14px ${t.sh}`, marginBottom:14 }}>
          {[
            { icon:"🌐", l:"Language", s:"English", ac:false },
            { icon:"🗺️", l:"Region", s:"Global", ac:false },
            { icon:"💎", l:"Upgrade to Pro", s:"Unlimited AI · Advanced filters · Priority alerts", ac:true },
          ].map((item, i, arr) => (
            <div key={item.l} className="tap" style={{ display:"flex", alignItems:"center", gap:14, padding:"15px 18px", borderBottom: i < arr.length - 1 ? `1px solid ${t.bd}` : "none", cursor:"pointer" }}>
              <div style={{ width:36, height:36, borderRadius:10, background: item.ac ? t.gr : t.tg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{item.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:600, color: item.ac ? t.ac : t.t1 }}>{item.l}</div>
                <div style={{ fontSize:12, color:t.t2, marginTop:1 }}>{item.s}</div>
              </div>
              <span style={{ color:t.t3 }}><IcChevR /></span>
            </div>
          ))}
        </div>

        <button className="tap" onClick={onReset} style={{ width:"100%", padding:"14px", borderRadius:14, background:t.tg, border:"none", color:t.t2, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
          ↩ Redo Onboarding
        </button>
      </div>

      <Sheet t={t} visible={!!editField} onClose={() => setEditField(null)} title={`Edit ${FIELDS.find(f => f.k === editField)?.l || ""}`}>
        <div style={{ display:"flex", alignItems:"center", gap:12, background:t.ib, borderRadius:14, padding:"12px 16px", border:`1.5px solid ${t.ibr}`, marginBottom:20 }}>
          <input className="nex-input" style={{ fontSize:16 }} value={editVal} onChange={(e) => setEditVal(e.target.value)} placeholder="Enter value…" autoFocus />
        </div>
        <button className="tap" onClick={saveEdit} style={{ width:"100%", padding:"14px", borderRadius:999, border:"none", background:t.gr, color:"#fff", fontSize:15, fontWeight:700, fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>Save Changes</button>
      </Sheet>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

function Sidebar({ t, screen, nav }) {
  const items = [
    { k:"home", l:"Home", I:IcHome }, { k:"search", l:"Discover", I:IcDisc },
    { k:"saved", l:"My Scholarships", I:IcSave }, { k:"ai", l:"AI Guide", I:IcAI }, { k:"profile", l:"Profile", I:IcUser },
  ];
  return (
    <aside className="sidebar" style={{ position:"fixed", left:0, top:0, bottom:0, width:250, background:t.sb, borderRight:`1px solid ${t.bd}`, flexDirection:"column", padding:"26px 14px", zIndex:100, transition:"background .3s" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:34, paddingLeft:8 }}>
        <div style={{ width:36, height:36, background:t.gr, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:18, fontFamily:"'Sora',sans-serif" }}>N</div>
        <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:20, color:t.t1 }}>Nexora</span>
      </div>
      <nav style={{ display:"flex", flexDirection:"column", gap:4, flex:1 }}>
        {items.map((item) => (
          <button key={item.k} className="sb-item tap" onClick={() => nav(item.k)} style={{ background: screen === item.k ? t.as : "none", color: screen === item.k ? t.ac : t.t2, fontWeight: screen === item.k ? 600 : 400 }}>
            <item.I />{item.l}
          </button>
        ))}
      </nav>
      <div style={{ borderTop:`1px solid ${t.bd}`, paddingTop:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:8 }}>
          <div style={{ width:34, height:34, background:t.gr, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:14 }}>S</div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:t.t1 }}>Student</div>
            <div style={{ fontSize:11, color:t.t3 }}>Free plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────

function BottomNav({ t, screen, nav }) {
  const items = [
    { k:"home", l:"Home", I:IcHome }, { k:"search", l:"Search", I:IcDisc },
    { k:"saved", l:"Saved", I:IcSave }, { k:"ai", l:"AI", I:IcAI }, { k:"profile", l:"Profile", I:IcUser },
  ];
  return (
    <nav className="bot-nav" style={{ position:"fixed", bottom:16, left:"50%", transform:"translateX(-50%)", width:"min(90%,430px)", height:68, background:t.nv, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderRadius:999, boxShadow:`0 8px 32px ${t.sh}, 0 0 0 1px rgba(255,255,255,.06)`, zIndex:200, alignItems:"center", justifyContent:"space-around", transition:"background .3s" }}>
      {items.map((item) => (
        <button key={item.k} className="nav-btn" onClick={() => nav(item.k)}>
          <span style={{ color: screen === item.k ? t.ac : t.t3, filter: screen === item.k ? `drop-shadow(0 0 6px ${t.ac}88)` : "none", transition:"all .2s", display:"flex" }}>
            <item.I />
          </span>
          <span style={{ fontSize:10, fontWeight:600, color: screen === item.k ? t.ac : t.t3, transition:"color .2s" }}>{item.l}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function Nexora() {
  const [dk, setDk] = useState(false);
  const t = dk ? DK : LT;
  const [screen, setScreen] = useState("onboarding");
  const [sk, setSk] = useState(0);
  const [detail, setDetail] = useState(null);
  const [saved, setSaved] = useState([]);
  const [apps, setApps] = useState({});
  const [profile, setProfile] = useState(null);
  const [showNotifs, setShowNotifs] = useState(false);

  const nav = (to) => {
    setScreen(to);
    setSk(k => k + 1);
    setDetail(null);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const toggleSave = (id) => setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const applyTo = (id) => setApps(p => ({ ...p, [id]: { ...(p[id] || {}), status:"applied", date: new Date().toLocaleDateString() } }));
  const updateApp = (id, status) => setApps(p => ({ ...p, [id]: { ...p[id], status } }));
  const removeApp = (id) => { const np = { ...apps }; delete np[id]; setApps(np); };

  const isAI = screen === "ai";
  const isOnboard = screen === "onboarding";
  const showChrome = !isAI && !isOnboard;

  return (
    <div style={{ background:t.bg, minHeight:"100vh", color:t.t1, fontFamily:"'DM Sans',sans-serif", transition:"background .3s,color .3s" }}>
      <style>{CSS}</style>

      {showNotifs && (
        <NotifPanel t={t} onClose={() => setShowNotifs(false)} onOpenDetail={(s) => { setShowNotifs(false); setDetail(s); }} />
      )}

      {detail && (
        <Detail s={detail} t={t} dk={dk} saved={saved} onSave={toggleSave} apps={apps} onApply={applyTo} onUpdate={updateApp} onBack={() => setDetail(null)} onAI={() => { setDetail(null); nav("ai"); }} />
      )}

      {isAI && <AIScreen t={t} onBack={() => nav("home")} />}
      {isOnboard && <Onboarding t={t} onDone={(a) => { setProfile(a); nav("home"); }} />}

      {showChrome && (
        <div>
          <Sidebar t={t} screen={screen} nav={nav} />
          <div key={sk}>
            {screen === "home" && <Home t={t} dk={dk} saved={saved} onSave={toggleSave} nav={nav} onOpenDetail={setDetail} onShowNotifs={() => setShowNotifs(true)} apps={apps} />}
            {screen === "search" && <Search t={t} dk={dk} saved={saved} onSave={toggleSave} onOpenDetail={setDetail} />}
            {screen === "saved" && <SavedWS t={t} dk={dk} savedIds={saved} onSave={toggleSave} apps={apps} onUpdate={updateApp} onRemove={removeApp} onOpenDetail={setDetail} />}
            {screen === "profile" && <ProfileScreen t={t} dk={dk} setDark={setDk} profile={profile} setProfile={setProfile} onReset={() => nav("onboarding")} apps={apps} savedCount={saved.length} />}
          </div>
          <BottomNav t={t} screen={screen} nav={nav} />
        </div>
      )}
    </div>
  );
}
