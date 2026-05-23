import { useState, useEffect, useRef } from "react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

:root {
  --bg:      #070707;
  --bg2:     #0C0C0C;
  --bg3:     #111111;
  --surf:    #161616;
  --surf2:   #1E1E1E;
  --bdr:     #1E1E1E;
  --bdr2:    #2C2C2C;
  --gold:    #C9A550;
  --gold2:   #E8C96A;
  --gold3:   #9A7A30;
  --glow:    rgba(201,165,80,0.10);
  --orange:  #E85D04;
  --orangeg: rgba(232,93,4,0.12);
  --txt:     #EFE9DF;
  --txt2:    #9A9080;
  --txt3:    #4A4438;
}

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--txt);font-family:'DM Sans',sans-serif;overflow-x:hidden;}

.bb{font-family:'Bebas Neue',sans-serif;}
.cg{font-family:'Cormorant Garamond',serif;}
.mm{font-family:'DM Mono',monospace;}

.gt{
  background:linear-gradient(130deg,var(--gold3) 0%,var(--gold) 45%,var(--gold2) 60%,var(--gold) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.ot{
  background:linear-gradient(130deg,#E85D04,#FF8C00);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}

@keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 20px rgba(232,93,4,.35),0 0 60px rgba(232,93,4,.1)}50%{box-shadow:0 0 32px rgba(232,93,4,.55),0 0 90px rgba(232,93,4,.2)}}
@keyframes goldPulse{0%,100%{box-shadow:0 0 0 0 rgba(201,165,80,.35)}50%{box-shadow:0 0 0 10px rgba(201,165,80,0)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes lineGrow{from{transform:scaleX(0);transform-origin:left}to{transform:scaleX(1);transform-origin:left}}

.vis{animation:fadeUp .8s ease forwards;}
.vis-d1{animation:fadeUp .8s .1s ease both;}
.vis-d2{animation:fadeUp .8s .2s ease both;}
.vis-d3{animation:fadeUp .8s .3s ease both;}
.vis-d4{animation:fadeUp .8s .4s ease both;}

.tag{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);border:1px solid var(--gold3);padding:5px 14px;display:inline-block;}

.ctap{background:var(--orange);color:#fff;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:2px;text-transform:uppercase;transition:all .3s;animation:pulseGlow 3s ease-in-out infinite;border-radius:2px;}
.ctap:hover{background:#ff6a15;transform:translateY(-2px);}
.ctao{background:transparent;color:var(--gold);border:1px solid var(--gold3);cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:2px;text-transform:uppercase;transition:all .3s;border-radius:2px;}
.ctao:hover{background:var(--glow);border-color:var(--gold);color:var(--gold2);}

a.nl{color:var(--txt2);text-decoration:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;position:relative;transition:color .3s;}
a.nl::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--gold);transition:width .3s;}
a.nl:hover{color:var(--txt);}
a.nl:hover::after{width:100%;}

.domain-card{transition:transform .3s,border-color .3s,background .3s;}
.domain-card:hover{transform:translateY(-6px);}
.phase-card{transition:border-color .3s,background .3s;}
.phase-card:hover{border-color:var(--gold) !important;background:var(--glow) !important;}

.plan-card{transition:transform .3s,border-color .3s;}
.plan-card:hover{transform:translateY(-4px);}

input,textarea{background:var(--surf);border:1px solid var(--bdr2);color:var(--txt);font-family:'DM Sans',sans-serif;padding:14px 18px;font-size:14px;width:100%;outline:none;transition:border-color .3s;border-radius:2px;}
input:focus,textarea:focus{border-color:var(--gold3);}
input::placeholder,textarea::placeholder{color:var(--txt3);}

::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:var(--bg2);}
::-webkit-scrollbar-thumb{background:var(--gold3);}

.hero-grid{
  background-image:linear-gradient(rgba(201,165,80,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,165,80,.025) 1px,transparent 1px);
  background-size:72px 72px;
}

.shimmer-line{
  height:1px;
  background:linear-gradient(90deg,transparent,var(--gold),transparent);
  background-size:200% 100%;
  animation:shimmer 3s linear infinite;
}

@media(max-width:768px){
  .hide-mob{display:none!important;}
  .mob-col{flex-direction:column!important;}
  .mob-full{width:100%!important;}
  .mob-center{text-align:center!important;align-items:center!important;}
  .mob-p{padding:60px 24px!important;}
  .mob-text-sm{font-size:64px!important;}
}
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { val: "500+", label: "Clients Transformed" },
  { val: "8+",   label: "Years of Method Mastery" },
  { val: "94%",  label: "Client Retention Rate" },
  { val: "3×",   label: "Avg Results vs Generic Coaching" },
];

const PHASES = [
  {
    n: "01", name: "DECODE", sub: "The Total Body Audit",
    desc: "Before a single rep is programmed, Tawfiq conducts an exhaustive audit of your physiology, biomechanics, hormonal baseline, lifestyle load, sleep architecture, movement dysfunction, and nutritional patterns. Most coaches skip this phase entirely — the TQ Blueprint treats it as non-negotiable.",
    detail: "Postural & movement screening  ·  Metabolic profiling  ·  Lifestyle & stress audit  ·  Sleep quality analysis  ·  Goal architecture & timeline mapping",
  },
  {
    n: "02", name: "BLUEPRINT", sub: "Custom Architecture",
    desc: "Using the decoded data, a fully bespoke training and nutrition architecture is designed from scratch. Not a template. Not an adaptation. A precision instrument built entirely around your physiology, schedule, history, and goals — with every variable set with clear intent.",
    detail: "Training periodization  ·  Nutritional protocol design  ·  Recovery scheduling  ·  KPI benchmarking  ·  Progressive overload modelling",
  },
  {
    n: "03", name: "FORGE", sub: "The Build Phase",
    desc: "The execution phase. Systematic, progressive training that builds your foundation — structural strength, correct motor patterns, metabolic efficiency. Tawfiq coaches you through every session with real-time feedback, form analysis, and micro-adjustments that compound over time.",
    detail: "Strength & hypertrophy programming  ·  Movement technique coaching  ·  Metabolic conditioning  ·  Weekly strategy calls  ·  Form video review cycles",
  },
  {
    n: "04", name: "CALIBRATE", sub: "Optimization & Refinement",
    desc: "This is the phase that separates the TQ Blueprint from everything else. Using biometric data and performance metrics, the program is constantly refined — load, volume, nutrition, and recovery all adjusted in response to your evolving physiology. No plateau survives a properly executed recalibration.",
    detail: "Biometric tracking analysis  ·  Volume & intensity adjustment  ·  Nutrition periodization  ·  Deload & supercompensation cycles  ·  Adaptive plateau protocols",
  },
  {
    n: "05", name: "EMBED", sub: "Lifestyle Integration & Permanence",
    desc: "Phase five ensures your transformation is not temporary. Tawfiq rewires your relationship with fitness, food, and discipline until they are not things you do — they are part of who you are. Identity-level change, backed by behaviour science and permanent habit architecture.",
    detail: "Habit & identity architecture  ·  Long-term maintenance programming  ·  Mindset & discipline rewiring  ·  Independence protocols  ·  Future strategy planning",
  },
];

const DOMAINS = [
  {
    title: "Strength & Hypertrophy",
    icon: "◈", accent: "#C9A550",
    tag: "BUILD WHAT LASTS",
    desc: "Tawfiq's approach to strength and muscle is rooted in biomechanical precision and progressive overload science. Forget random splits — this is a calculated architecture designed to build maximum lean mass while preserving joint health and movement quality for decades.",
    bullets: ["Full periodized programming (linear, block, undulating)","Movement pattern mastery: push, pull, hinge, squat","Targeted hypertrophy protocols per muscle group","Injury prevention woven into every training cycle","Functional strength — built to perform, not just look the part"],
  },
  {
    title: "Fat Loss & Body Recomposition",
    icon: "◆", accent: "#E85D04",
    tag: "REDEFINE YOUR COMPOSITION",
    desc: "The TQ approach to fat loss is metabolically intelligent. Muscle is preserved, hormonal health is protected, and a caloric deficit is created through strategic training and precision nutrition — not deprivation. Sustainable, permanent, and built around your real life.",
    bullets: ["Metabolic rate assessment & management","Muscle-preserving deficit protocols","Hormonal health & cortisol management","Body recomposition: lose fat, gain muscle simultaneously","Reverse dieting & intelligent diet break programming"],
  },
  {
    title: "Athletic Performance",
    icon: "◇", accent: "#6BA3FF",
    tag: "UNLOCK YOUR CEILING",
    desc: "For athletes and high performers, Tawfiq designs sport-specific protocols that enhance explosiveness, agility, power output, and conditioning — built around your competition calendar and performance targets. Performance coaching at the level most professionals never access.",
    bullets: ["Sport-specific strength & conditioning architecture","Explosive power development protocols","Speed, agility & reactive training","In-season vs. off-season programme management","Peak performance timing & competition preparation"],
  },
  {
    title: "Nutrition & Metabolic Science",
    icon: "⬡", accent: "#C9A550",
    tag: "FOOD AS STRATEGY",
    desc: "Tawfiq does not prescribe generic meal plans with arbitrary numbers. He architects a nutritional strategy that works with your metabolism, schedule, preferences, and lifestyle — periodized alongside your training for maximal effect and long-term adherence.",
    bullets: ["Macronutrient precision & temporal periodization","Meal timing & circadian nutrition principles","Evidence-based supplement protocols only","Gut health & microbiome optimization","Real-world strategies: travel, social, and high-stress nutrition"],
  },
  {
    title: "Mobility, Recovery & Longevity",
    icon: "○", accent: "#88D498",
    tag: "BUILT TO LAST",
    desc: "Most coaches treat recovery as an afterthought. Tawfiq treats it as 50% of the programme. Sleep, mobility, soft tissue work, breathwork, and deload cycles are all programmed with the same precision as training days — because they are training.",
    bullets: ["Comprehensive mobility & flexibility programming","Sleep quality protocols & circadian optimization","Active recovery & soft tissue maintenance","Breathwork & nervous system regulation techniques","Longevity-focused joint health & structural balance"],
  },
  {
    title: "Mental Fortitude & Discipline",
    icon: "◉", accent: "#B088D4",
    tag: "THE UNSEEN VARIABLE",
    desc: "Your body is only as strong as the mind directing it. Tawfiq works on the mental architecture of high performance — building discipline systems, resilience to setbacks, intrinsic motivation, and an identity that extends far beyond the gym walls.",
    bullets: ["Performance psychology & mindset coaching","Identity-based habit building (not willpower-based)","Setback & plateau resilience training","Daily discipline architecture & routine design","Stress management & cognitive performance optimization"],
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus Alderman", role: "Finance Executive · Dubai",
    result: "−28kg in 6 Months",
    quote: "I've worked with six coaches across three years. None came close to what Tawfiq delivered. He didn't just change my body — he changed the way I think about health entirely. The Blueprint method is genuinely different. I'm four years in and still progressing.",
    stats: [{ l: "Fat Lost", v: "28kg" }, { l: "Muscle Added", v: "6kg" }, { l: "Duration", v: "6 months" }],
  },
  {
    name: "Leila Nassif", role: "Surgeon · Beirut",
    result: "Complete Body Recomposition",
    quote: "As a surgeon, I understand anatomy. What I didn't understand was how to apply it to my own body. Tawfiq's method is the most evidence-based coaching I've encountered. He's not just a coach — he's an architect of human potential.",
    stats: [{ l: "Body Fat", v: "−14%" }, { l: "Strength", v: "+80%" }, { l: "Programme", v: "12 months" }],
  },
  {
    name: "Jake Whitfield", role: "Semi-Pro Footballer · UK",
    result: "+22% Athletic Performance",
    quote: "Tawfiq has a completely different understanding of athletic development. He optimised not just my training but my entire lifestyle architecture. Sprint speed, recovery time, and power output all hit personal bests within 4 months.",
    stats: [{ l: "Sprint Speed", v: "+18%" }, { l: "Power Output", v: "+22%" }, { l: "Injuries", v: "0" }],
  },
  {
    name: "Rania Al-Hassan", role: "Entrepreneur · Amman",
    result: "Zero to Elite in 9 Months",
    quote: "I started with zero fitness background. The DECODE phase revealed things about my movement and metabolism I had no idea about. Tawfiq built me a programme that created not just a body — but a relationship with fitness I'll carry for life.",
    stats: [{ l: "Baseline", v: "Zero" }, { l: "Duration", v: "9 months" }, { l: "Still Going", v: "Year 3" }],
  },
];

const PLANS = [
  {
    name: "FOUNDATION", duration: "3 Months", price: "$199", period: "/month",
    line: "Begin the Transformation",
    hot: false,
    features: [
      "Full DECODE assessment",
      "Custom 3-month training programme",
      "Nutritional guidelines & macro targets",
      "Bi-weekly 30-min check-in calls",
      "Email coaching support (48h response)",
      "Form video review (1× per week)",
      "TQ Blueprint app access",
      "Monthly progress analysis report",
    ],
    missing: ["Daily messaging access","Nutrition periodization","CALIBRATE optimization phase"],
    cta: "Start Foundation",
  },
  {
    name: "ARCHITECT", duration: "6 Months", price: "$349", period: "/month",
    line: "The Full TQ Method",
    hot: true, badge: "MOST POPULAR",
    features: [
      "Full DECODE + BLUEPRINT phases",
      "Custom 6-month periodized programme",
      "Full nutrition architecture & periodization",
      "Weekly 45-min strategy calls",
      "Daily WhatsApp coaching access",
      "Unlimited form video reviews",
      "CALIBRATE optimization cycles",
      "Monthly biometric analysis",
      "Recovery & mobility programming",
      "TQ Blueprint app — full access",
      "Evidence-based supplement protocol",
    ],
    missing: ["In-person sessions","Mental performance coaching module"],
    cta: "Become an Architect",
  },
  {
    name: "BLUEPRINT ELITE", duration: "12 Months", price: "$499", period: "/month",
    line: "Total Life Transformation",
    hot: false,
    features: [
      "All 5 TQ Blueprint phases delivered",
      "Full 12-month periodized programme",
      "Complete nutrition + lifestyle architecture",
      "Twice-weekly 1:1 coaching calls",
      "Priority 24/7 coaching access",
      "Unlimited form reviews + video analysis",
      "Mental performance coaching module",
      "Quarterly body composition deep-dives",
      "EMBED phase: habit & identity rewiring",
      "Annual review & next-phase strategy",
      "Exclusive TQ Elite client community",
    ],
    missing: [],
    cta: "Go Elite",
  },
  {
    name: "PRIVATE CLIENT", duration: "Custom", price: "From $800", period: "/month",
    line: "Fully Bespoke Experience",
    hot: false, badge: "EXCLUSIVE",
    features: [
      "Everything in Blueprint Elite",
      "Unlimited 1:1 personal coaching",
      "In-person sessions (Dubai / travel available)",
      "Daily personalised check-ins",
      "Dedicated private comms channel",
      "Lab work & hormone panel integration",
      "Executive lifestyle & performance optimisation",
      "Elite sport-specific performance protocols",
      "Optional family wellness programme",
      "Exclusive TQ Private network access",
    ],
    missing: [],
    cta: "Apply for Private",
    apply: true,
  },
];

const FAQS = [
  {
    q: "What makes the TQ Blueprint different from other coaching programmes?",
    a: "Most coaching programmes hand you a template and call it personalisation. The TQ Blueprint begins with an exhaustive DECODE assessment — mapping your physiology, biomechanics, lifestyle, and psychology before a single workout is designed. The result is a programme that is uniquely yours. The 5-phase structure also means your programme evolves continuously rather than going stale at week 8.",
  },
  {
    q: "Do I need to be in Dubai, or can coaching be done remotely?",
    a: "The TQ Blueprint is globally delivered. The majority of Tawfiq's clients train remotely — receiving the same depth of coaching through video check-ins, form analysis, the TQ app, and regular strategy calls. In-person sessions are available for clients in Dubai or through Tawfiq's international coaching availability.",
  },
  {
    q: "How much time do I need to commit per week?",
    a: "This is determined during the DECODE phase and is entirely built around your schedule. Programmes can be structured for 3 training days per week (Foundation clients) up to 6 days (Elite and Performance clients). What's non-negotiable is session quality: every session in the TQ Blueprint is intentional and worth doing.",
  },
  {
    q: "Can I join if I'm a complete beginner?",
    a: "Absolutely. Starting with the TQ Blueprint as a beginner is a genuine advantage — correct movement patterns, habits, and metabolic foundations are built from day one. You avoid years of bad habits, wasted effort, and ingrained dysfunction that most people spend years trying to undo.",
  },
  {
    q: "What happens if I hit a plateau?",
    a: "Plateaus are anticipated and built into the methodology — specifically in the CALIBRATE phase. When adaptation occurs, Tawfiq adjusts variables systematically: training load, volume, nutritional periodization, recovery protocol. No plateau survives a properly executed recalibration. This is a core differentiator of the method.",
  },
  {
    q: "What does the nutrition coaching actually involve?",
    a: "Beyond macros and calories — meal timing, food quality, gut health, metabolic optimization, evidence-based supplement protocols, and real-world strategies for travel and social eating. In Blueprint Elite, nutrition is fully periodized alongside your training phase for maximum compounding effect.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Yes — each plan has a minimum commitment matching its duration (3, 6, or 12 months). This is not about locking you in — the TQ Blueprint is a structured methodology with phases that require time to execute properly. Genuine transformation doesn't happen in 30 days, and Tawfiq won't pretend otherwise.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the contact form below or reach out directly via WhatsApp or Instagram. Every new client begins with a free 20-minute discovery call where Tawfiq personally assesses your goals, history, and fit with the programme. There is no hard sell — the method speaks for itself.",
  },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function useCounter(target, duration = 1800, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    let start = 0;
    const step = numeric / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, numeric);
      setCount(Math.floor(start) + suffix);
      if (start >= numeric) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger]);
  return count || "0";
}

// ─── INTERSECTION OBSERVER HOOK ───────────────────────────────────────────────
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function Nav({ scrolled }) {
  const [mob, setMob] = useState(false);
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(7,7,7,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,165,80,0.08)" : "none",
        transition: "all .4s ease",
        padding: "0 48px", height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span className="bb" style={{ fontSize: "30px", letterSpacing: "4px", color: "#C9A550", textShadow: "0 0 30px rgba(201,165,80,.4)" }}>TQ</span>
          <span className="bb" style={{ fontSize: "21px", letterSpacing: "7px", color: "#EFE9DF" }}>BUILT</span>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#E85D04", display: "inline-block", marginBottom: 5 }} />
        </a>
        <div className="hide-mob" style={{ display: "flex", gap: 40 }}>
          {[["The Method","#method"],["Domains","#domains"],["Results","#results"],["Plans","#plans"],["Contact","#contact"]].map(([l,h]) => (
            <a key={h} href={h} className="nl">{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="#contact" className="hide-mob" style={{ textDecoration: "none" }}>
            <button className="ctap" style={{ padding: "10px 26px", fontSize: 11 }}>Begin Here</button>
          </a>
          <button onClick={() => setMob(!mob)} style={{ background: "none", border: "none", color: "#C9A550", fontSize: 22, cursor: "pointer", padding: 4 }}>
            {mob ? "✕" : "☰"}
          </button>
        </div>
      </nav>
      {mob && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, zIndex: 999,
          background: "rgba(7,7,7,0.98)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid #1E1E1E", padding: "32px 48px",
          display: "flex", flexDirection: "column", gap: 28,
        }}>
          {[["The Method","#method"],["Domains","#domains"],["Results","#results"],["Plans","#plans"],["Contact","#contact"]].map(([l,h]) => (
            <a key={h} href={h} className="nl" onClick={() => setMob(false)} style={{ fontSize: 13 }}>{l}</a>
          ))}
          <a href="#contact" style={{ textDecoration: "none" }}>
            <button className="ctap" style={{ padding: "12px 32px", fontSize: 11, width: "100%" }}>Begin Your Transformation</button>
          </a>
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="hero-grid" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: `radial-gradient(ellipse 65% 55% at 70% 45%, rgba(201,165,80,.06) 0%, transparent 65%),
                   radial-gradient(ellipse 45% 65% at 15% 85%, rgba(232,93,4,.04) 0%, transparent 55%),
                   #070707`,
      position: "relative", overflow: "hidden", padding: "120px 48px 80px",
    }}>
      {/* Decorative vertical line */}
      <div style={{ position: "absolute", left: 180, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, transparent, rgba(201,165,80,.15), transparent)" }} className="hide-mob" />
      {/* Large decorative TQ watermark */}
      <div className="bb hide-mob" style={{
        position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)",
        fontSize: 520, color: "rgba(201,165,80,.022)", letterSpacing: -20, lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>TQ</div>

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative" }}>
        <div className="vis" style={{ marginBottom: 28 }}>
          <span className="tag">Tawfiq Morrar · Personal Coach</span>
        </div>
        <div className="vis-d1">
          <h1 className="bb mob-text-sm" style={{ fontSize: 130, lineHeight: .9, letterSpacing: 2, marginBottom: 32, color: "#EFE9DF" }}>
            BUILT<br />
            <span className="gt">DIFFERENT.</span><br />
            BUILT<br />
            FOR LIFE.
          </h1>
        </div>
        <div className="vis-d2" style={{ display: "flex", gap: 40, alignItems: "flex-start", marginBottom: 48, flexWrap: "wrap" }}>
          <div style={{ width: 2, minHeight: 80, background: "linear-gradient(180deg,var(--gold),transparent)", flexShrink: 0, marginTop: 4 }} className="hide-mob" />
          <p className="cg" style={{ fontSize: 22, lineHeight: 1.6, color: "#9A9080", maxWidth: 540, fontStyle: "italic" }}>
            Tawfiq Morrar doesn't give you a plan. He gives you a system — a proprietary 5-phase methodology that rewires how you move, eat, think, and live. Not for 12 weeks. <em style={{ color: "#C9A550" }}>For the rest of your life.</em>
          </p>
        </div>
        <div className="vis-d3" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 80 }}>
          <a href="#contact" style={{ textDecoration: "none" }}>
            <button className="ctap" style={{ padding: "16px 36px", fontSize: 12 }}>Start Your Transformation</button>
          </a>
          <a href="#method" style={{ textDecoration: "none" }}>
            <button className="ctao" style={{ padding: "16px 36px", fontSize: 12 }}>Discover the Blueprint</button>
          </a>
        </div>
        {/* Stats */}
        <div className="vis-d4" style={{ display: "flex", gap: 0, flexWrap: "wrap", borderTop: "1px solid #1E1E1E", paddingTop: 40 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: "1 1 160px", padding: "0 32px 0 0",
              borderRight: i < STATS.length - 1 ? "1px solid #1E1E1E" : "none",
              marginRight: 32, marginBottom: 20,
            }}>
              <div className="bb gt" style={{ fontSize: 44, letterSpacing: 2 }}>{s.val}</div>
              <div className="mm" style={{ fontSize: 10, letterSpacing: 2, color: "#4A4438", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom shimmer */}
      <div className="shimmer-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const [ref, vis] = useVisible();
  return (
    <section id="about" ref={ref} style={{ background: "#0C0C0C", padding: "120px 48px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "radial-gradient(circle, rgba(201,165,80,.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }}>

        {/* Portrait placeholder */}
        <div className={vis ? "vis" : ""} style={{ flex: "0 0 340px", position: "relative" }}>
          <div style={{
            width: 340, height: 440,
            background: "linear-gradient(145deg, #161616, #111)",
            border: "1px solid #2C2C2C",
            position: "relative", overflow: "hidden",
          }}>
            {/* Gold corner accents */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: 40, borderTop: "2px solid #C9A550", borderLeft: "2px solid #C9A550" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 40, height: 40, borderBottom: "2px solid #C9A550", borderRight: "2px solid #C9A550" }} />
            {/* Silhouette graphic */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid #2C2C2C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 36, color: "#C9A550" }}>TM</span>
              </div>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: "#4A4438", textTransform: "uppercase" }}>Tawfiq Morrar</div>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: "#4A4438", textTransform: "uppercase" }}>TQ Built · Founder</div>
            </div>
          </div>
          {/* Floating credential badges */}
          <div style={{ position: "absolute", top: -16, right: -24, background: "#E85D04", color: "#fff", padding: "8px 16px", fontSize: 10, fontFamily: "DM Mono, monospace", letterSpacing: 2 }}>8+ YEARS</div>
          <div style={{ position: "absolute", bottom: 40, left: -24, background: "#161616", border: "1px solid #2C2C2C", padding: "12px 18px" }}>
            <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#C9A550" }}>CERTIFIED IN</div>
            <div style={{ fontSize: 11, color: "#EFE9DF", marginTop: 4 }}>Strength · Nutrition · Performance</div>
          </div>
        </div>

        {/* Content */}
        <div className={vis ? "vis-d2" : ""} style={{ flex: "1 1 380px" }}>
          <span className="tag" style={{ marginBottom: 24, display: "inline-block" }}>About Tawfiq</span>
          <h2 className="bb" style={{ fontSize: 64, lineHeight: .95, letterSpacing: 1, marginBottom: 28, color: "#EFE9DF" }}>
            THE COACH<br />BEHIND THE<br /><span className="gt">BLUEPRINT.</span>
          </h2>
          <div style={{ width: 48, height: 2, background: "linear-gradient(90deg,#C9A550,transparent)", marginBottom: 28 }} />
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#9A9080", marginBottom: 20 }}>
            Tawfiq Morrar is not your average personal trainer. With over eight years spent obsessively studying human performance — across biomechanics, metabolic science, sports psychology, and nutritional biochemistry — he has distilled his knowledge into a singular, proprietary methodology.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#9A9080", marginBottom: 32 }}>
            Based between Dubai and serving clients globally, Tawfiq has transformed over 500 individuals — from complete beginners to professional athletes, executives to surgeons. His philosophy is simple: <span style={{ color: "#EFE9DF" }}>real results come from real understanding, not cookie-cutter programmes.</span>
          </p>
          {/* Credentials grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
            {[
              "NSCA Certified Strength & Conditioning Specialist",
              "Precision Nutrition Level 2 Coach",
              "FMS Level 2 Movement Specialist",
              "Sports Psychology Practitioner",
              "NASM Performance Enhancement Specialist",
              "CSCS — Weightlifting & Power Development",
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#C9A550", fontSize: 10, marginTop: 4, flexShrink: 0 }}>◈</span>
                <span style={{ fontSize: 12, color: "#7A7060", lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>
          <blockquote className="cg" style={{ borderLeft: "2px solid #C9A550", paddingLeft: 20, fontStyle: "italic", fontSize: 17, color: "#9A9080", lineHeight: 1.7 }}>
            "I don't sell fitness. I architect transformation — from the inside out, from the ground up, and for the rest of your life."
            <div style={{ marginTop: 8, fontSize: 13, color: "#4A4438", fontStyle: "normal" }}>— Tawfiq Morrar</div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// ─── METHOD ───────────────────────────────────────────────────────────────────
function Method() {
  const [ref, vis] = useVisible(.08);
  return (
    <section id="method" ref={ref} style={{ background: "#070707", padding: "120px 48px", position: "relative", overflow: "hidden" }}>
      {/* Background radial */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, background: "radial-gradient(circle, rgba(201,165,80,.04) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ display: "flex", gap: 80, alignItems: "flex-end", marginBottom: 80, flexWrap: "wrap" }}>
          <div className={vis ? "vis" : ""}>
            <span className="tag" style={{ marginBottom: 20, display: "inline-block" }}>The TQ Blueprint</span>
            <h2 className="bb" style={{ fontSize: 80, lineHeight: .9, letterSpacing: 1, color: "#EFE9DF" }}>
              THE METHOD<br />THAT CHANGES<br /><span className="gt">EVERYTHING.</span>
            </h2>
          </div>
          <div className={vis ? "vis-d2" : ""} style={{ maxWidth: 380, paddingBottom: 8 }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#9A9080" }}>
              The TQ Blueprint is a proprietary 5-phase coaching methodology developed over 8 years of working with high-performers, athletes, and transformation clients worldwide. It is not a programme. It is a complete system — and there is nothing else like it.
            </p>
          </div>
        </div>

        {/* Phase cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {PHASES.map((p, i) => (
            <PhaseCard key={i} phase={p} idx={i} vis={vis} />
          ))}
        </div>

        {/* Bottom callout */}
        <div className={vis ? "vis-d4" : ""} style={{
          marginTop: 64, padding: "40px 48px",
          border: "1px solid #1E1E1E",
          background: "linear-gradient(135deg, #0C0C0C, #111)",
          display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap",
        }}>
          <div className="bb gt" style={{ fontSize: 80, lineHeight: 1, flexShrink: 0 }}>WHY<br/>IT<br/>WORKS</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
              {[
                ["No Templates", "Every programme is built from zero using your personal data — not adapted from a stock plan."],
                ["Continuous Evolution", "The CALIBRATE phase ensures the programme never plateaus — it adapts as you do."],
                ["Full-Spectrum Coaching", "Training, nutrition, recovery, and mindset are integrated — not siloed."],
                ["Permanent Results", "The EMBED phase rewires identity and habits at a level most coaches never reach."],
              ].map(([title, text], i) => (
                <div key={i} style={{ borderLeft: "1px solid #2C2C2C", paddingLeft: 16 }}>
                  <div className="mm" style={{ fontSize: 10, letterSpacing: 2, color: "#C9A550", marginBottom: 8, textTransform: "uppercase" }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#7A7060", lineHeight: 1.6 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ phase: p, idx, vis }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`phase-card ${vis ? `vis-d${Math.min(idx + 1, 4)}` : ""}`}
      onClick={() => setOpen(!open)}
      style={{
        border: "1px solid #1E1E1E",
        background: open ? "rgba(201,165,80,.05)" : "#0C0C0C",
        padding: "32px 40px", cursor: "pointer",
        borderColor: open ? "#9A7A30" : "#1E1E1E",
        transition: "all .3s",
      }}
    >
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <span className="bb" style={{ fontSize: 48, color: "#1E1E1E", lineHeight: 1, flexShrink: 0, minWidth: 60 }}>{p.n}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "baseline", flexWrap: "wrap" }}>
            <span className="bb gt" style={{ fontSize: 30, letterSpacing: 3 }}>{p.name}</span>
            <span className="cg" style={{ fontSize: 16, color: "#7A7060", fontStyle: "italic" }}>— {p.sub}</span>
          </div>
          {open && (
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#9A9080", marginBottom: 16 }}>{p.desc}</p>
              <div className="mm" style={{ fontSize: 10, letterSpacing: 1.5, color: "#4A4438", borderTop: "1px solid #1E1E1E", paddingTop: 14 }}>{p.detail}</div>
            </div>
          )}
        </div>
        <span style={{ color: open ? "#C9A550" : "#2C2C2C", fontSize: 20, transition: "all .3s", flexShrink: 0 }}>{open ? "−" : "+"}</span>
      </div>
    </div>
  );
}

// ─── DOMAINS ─────────────────────────────────────────────────────────────────
function Domains() {
  const [ref, vis] = useVisible(.06);
  return (
    <section id="domains" ref={ref} style={{ background: "#0C0C0C", padding: "120px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className={vis ? "vis" : ""} style={{ marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: "inline-block" }}>Coaching Domains</span>
          <div style={{ display: "flex", gap: 60, alignItems: "flex-end", flexWrap: "wrap" }}>
            <h2 className="bb" style={{ fontSize: 72, lineHeight: .9, letterSpacing: 1, color: "#EFE9DF" }}>
              EVERY<br />DOMAIN.<br /><span className="gt">MASTERED.</span>
            </h2>
            <p style={{ maxWidth: 420, fontSize: 15, lineHeight: 1.8, color: "#7A7060", paddingBottom: 8 }}>
              The TQ Blueprint spans every dimension of human performance. Each domain is not a separate offering — it is an integrated layer of a single, unified approach to building a better human.
            </p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 2 }}>
          {DOMAINS.map((d, i) => (
            <DomainCard key={i} d={d} vis={vis} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DomainCard({ d, vis, idx }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={`domain-card ${vis ? `vis-d${Math.min(idx % 4 + 1, 4)}` : ""}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#111" : "#0E0E0E",
        border: `1px solid ${hov ? d.accent + "44" : "#1A1A1A"}`,
        padding: "40px 36px",
        transition: "all .3s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <span style={{ fontSize: 32, color: d.accent }}>{d.icon}</span>
        <span className="mm" style={{ fontSize: 9, letterSpacing: 2, color: d.accent, opacity: .6, textTransform: "uppercase" }}>{d.tag}</span>
      </div>
      <h3 className="bb" style={{ fontSize: 24, letterSpacing: 2, color: "#EFE9DF", marginBottom: 16 }}>{d.title}</h3>
      <div style={{ width: 32, height: 1, background: d.accent, opacity: .4, marginBottom: 16 }} />
      <p style={{ fontSize: 13, lineHeight: 1.8, color: "#7A7060", marginBottom: 24 }}>{d.desc}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {d.bullets.map((b, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: d.accent, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>
            <span style={{ fontSize: 12, color: "#5A5448", lineHeight: 1.5 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Results() {
  const [ref, vis] = useVisible(.08);
  const [active, setActive] = useState(0);
  return (
    <section id="results" ref={ref} style={{ background: "#070707", padding: "120px 48px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,165,80,.2), transparent)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className={vis ? "vis" : ""} style={{ marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: "inline-block" }}>Client Results</span>
          <h2 className="bb" style={{ fontSize: 72, lineHeight: .9, letterSpacing: 1, color: "#EFE9DF" }}>
            REAL PEOPLE.<br /><span className="gt">REAL RESULTS.</span><br />NO ASTERISKS.
          </h2>
        </div>

        {/* Testimonial showcase */}
        <div className={vis ? "vis-d2" : ""} style={{
          border: "1px solid #1E1E1E",
          background: "#0C0C0C",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}>
          {/* Left: testimonial content */}
          <div style={{ padding: "60px 56px", borderRight: "1px solid #1E1E1E" }}>
            <div style={{ fontSize: 64, color: "#1E1E1E", fontFamily: "Georgia, serif", lineHeight: 1, marginBottom: 8 }}>"</div>
            <blockquote className="cg" style={{ fontSize: 18, lineHeight: 1.7, color: "#9A9080", fontStyle: "italic", marginBottom: 36 }}>
              {TESTIMONIALS[active].quote}
            </blockquote>
            <div style={{ borderTop: "1px solid #1E1E1E", paddingTop: 24 }}>
              <div style={{ fontWeight: 600, color: "#EFE9DF", fontSize: 15 }}>{TESTIMONIALS[active].name}</div>
              <div className="mm" style={{ fontSize: 10, letterSpacing: 1.5, color: "#4A4438", marginTop: 4 }}>{TESTIMONIALS[active].role}</div>
              <div style={{ marginTop: 12, padding: "6px 14px", background: "rgba(232,93,4,.12)", border: "1px solid rgba(232,93,4,.2)", display: "inline-block" }}>
                <span className="mm" style={{ fontSize: 10, letterSpacing: 2, color: "#E85D04" }}>{TESTIMONIALS[active].result}</span>
              </div>
            </div>
          </div>

          {/* Right: stats + selector */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Stats */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 40px", gap: 32 }}>
              {TESTIMONIALS[active].stats.map((s, i) => (
                <div key={i} style={{ borderBottom: "1px solid #1A1A1A", paddingBottom: 20 }}>
                  <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#4A4438", marginBottom: 6, textTransform: "uppercase" }}>{s.l}</div>
                  <div className="bb gt" style={{ fontSize: 40, letterSpacing: 2 }}>{s.v}</div>
                </div>
              ))}
            </div>
            {/* Selector buttons */}
            <div style={{ borderTop: "1px solid #1E1E1E", display: "flex" }}>
              {TESTIMONIALS.map((t, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  flex: 1, padding: "14px 8px",
                  background: active === i ? "rgba(201,165,80,.08)" : "transparent",
                  border: "none", borderRight: i < 3 ? "1px solid #1E1E1E" : "none",
                  borderTop: active === i ? "2px solid #C9A550" : "2px solid transparent",
                  cursor: "pointer", transition: "all .3s",
                }}>
                  <div style={{ fontSize: 11, color: active === i ? "#C9A550" : "#4A4438", fontFamily: "DM Sans, sans-serif", fontWeight: 600 }}>{t.name.split(" ")[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom trust badges */}
        <div className={vis ? "vis-d3" : ""} style={{ display: "flex", gap: 0, marginTop: 2, flexWrap: "wrap" }}>
          {[["500+","Transformations Worldwide"],["6 Years","Average Client Relationship"],["3 Continents","Clients Coached Across"],["0","Cookie-Cutter Templates Used"]].map(([v, l], i) => (
            <div key={i} style={{ flex: "1 1 200px", padding: "28px 32px", background: "#0C0C0C", border: "1px solid #1A1A1A", borderTop: "none" }}>
              <div className="bb gt" style={{ fontSize: 36 }}>{v}</div>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#4A4438", marginTop: 6, textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function Pricing() {
  const [ref, vis] = useVisible(.05);
  return (
    <section id="plans" ref={ref} style={{ background: "#0A0A0A", padding: "120px 48px" }}>
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>
        <div className={vis ? "vis" : ""} style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: "inline-block" }}>Investment Plans</span>
          <h2 className="bb" style={{ fontSize: 72, lineHeight: .95, letterSpacing: 1, color: "#EFE9DF", marginBottom: 20 }}>
            CHOOSE YOUR<br /><span className="gt">BLUEPRINT.</span>
          </h2>
          <p style={{ maxWidth: 520, margin: "0 auto", fontSize: 15, lineHeight: 1.8, color: "#7A7060" }}>
            Every plan includes the full TQ Blueprint methodology. The difference is the depth of access, the duration of the engagement, and the speed of your results.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 2 }}>
          {PLANS.map((plan, i) => (
            <PlanCard key={i} plan={plan} vis={vis} idx={i} />
          ))}
        </div>

        <div className={vis ? "vis-d4" : ""} style={{ marginTop: 40, padding: "28px 40px", border: "1px solid #1A1A1A", background: "#0C0C0C", textAlign: "center" }}>
          <span className="mm" style={{ fontSize: 11, letterSpacing: 2, color: "#4A4438" }}>
            All plans include a free 20-minute discovery call · No contracts, no hidden fees · Cancel after minimum term · Results guaranteed or continued coaching at no charge
          </span>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, vis, idx }) {
  return (
    <div
      className={`plan-card ${vis ? `vis-d${Math.min(idx + 1, 4)}` : ""}`}
      style={{
        background: plan.hot ? "#101010" : "#0C0C0C",
        border: `1px solid ${plan.hot ? "#9A7A30" : "#1A1A1A"}`,
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
      }}
    >
      {plan.hot && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #C9A550, transparent)" }} />}

      {plan.badge && (
        <div style={{ position: "absolute", top: 16, right: 16, background: plan.hot ? "#C9A550" : "#1E1E1E", color: plan.hot ? "#070707" : "#7A7060", padding: "4px 10px", fontSize: 8, fontFamily: "DM Mono, monospace", letterSpacing: 2 }}>{plan.badge}</div>
      )}

      <div style={{ padding: "36px 32px 28px" }}>
        <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: plan.hot ? "#C9A550" : "#4A4438", marginBottom: 8, textTransform: "uppercase" }}>{plan.duration}</div>
        <div className="bb" style={{ fontSize: 26, letterSpacing: 2, color: "#EFE9DF", marginBottom: 4 }}>{plan.name}</div>
        <div className="cg" style={{ fontSize: 13, color: "#7A7060", fontStyle: "italic", marginBottom: 24 }}>{plan.line}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
          <span className="bb" style={{ fontSize: 48, letterSpacing: 1, color: plan.hot ? "#C9A550" : "#EFE9DF" }}>{plan.price}</span>
          <span className="mm" style={{ fontSize: 11, color: "#4A4438" }}>{plan.period}</span>
        </div>
        <div style={{ height: 1, background: "#1A1A1A", margin: "24px 0" }} />
      </div>

      <div style={{ padding: "0 32px", flex: 1 }}>
        <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#4A4438", marginBottom: 14, textTransform: "uppercase" }}>Included</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {plan.features.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#C9A550", fontSize: 10, marginTop: 3, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 12, color: "#7A7060", lineHeight: 1.5 }}>{f}</span>
            </div>
          ))}
        </div>
        {plan.missing.length > 0 && (
          <>
            <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#2C2C2C", marginBottom: 10, marginTop: 16, textTransform: "uppercase" }}>Not Included</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {plan.missing.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#2C2C2C", fontSize: 10, marginTop: 3, flexShrink: 0 }}>−</span>
                  <span style={{ fontSize: 12, color: "#3A3028", lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ padding: "28px 32px 36px" }}>
        <a href="#contact" style={{ textDecoration: "none", display: "block" }}>
          <button className={plan.hot ? "ctap" : "ctao"} style={{ width: "100%", padding: "14px", fontSize: 11 }}>
            {plan.cta}
          </button>
        </a>
        {plan.apply && (
          <div className="mm" style={{ fontSize: 9, letterSpacing: 1.5, color: "#3A3028", textAlign: "center", marginTop: 10 }}>Applications reviewed within 48 hours</div>
        )}
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [ref, vis] = useVisible(.08);
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" ref={ref} style={{ background: "#070707", padding: "120px 48px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className={vis ? "vis" : ""} style={{ marginBottom: 64 }}>
          <span className="tag" style={{ marginBottom: 20, display: "inline-block" }}>Questions</span>
          <h2 className="bb" style={{ fontSize: 64, lineHeight: .95, letterSpacing: 1, color: "#EFE9DF" }}>
            EVERYTHING<br />YOU NEED TO<br /><span className="gt">KNOW.</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className={vis ? `vis-d${Math.min(i % 3 + 1, 4)}` : ""}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", background: open === i ? "#0D0D0D" : "#0A0A0A",
                border: "1px solid", borderColor: open === i ? "#9A7A30" : "#1A1A1A",
                padding: "24px 32px", cursor: "pointer", textAlign: "left",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
                transition: "all .3s",
              }}>
                <span style={{ fontSize: 14, color: "#EFE9DF", fontFamily: "DM Sans, sans-serif", fontWeight: 500, lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: open === i ? "#C9A550" : "#2C2C2C", fontSize: 20, flexShrink: 0, transition: "all .3s" }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div style={{ background: "#0D0D0D", borderLeft: "1px solid #9A7A30", borderRight: "1px solid #9A7A30", borderBottom: "1px solid #9A7A30", padding: "24px 32px" }}>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "#7A7060" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, vis] = useVisible(.08);
  const [form, setForm] = useState({ name: "", email: "", goal: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email) setSent(true);
  };

  return (
    <section id="contact" ref={ref} style={{ background: "#0C0C0C", padding: "120px 48px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,165,80,.2), transparent)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(232,93,4,.04) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", flexWrap: "wrap" }}>
        {/* Left */}
        <div className={vis ? "vis" : ""}>
          <span className="tag" style={{ marginBottom: 24, display: "inline-block" }}>Start Now</span>
          <h2 className="bb" style={{ fontSize: 72, lineHeight: .9, letterSpacing: 1, color: "#EFE9DF", marginBottom: 32 }}>
            YOUR FIRST<br />STEP STARTS<br /><span className="ot">HERE.</span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#7A7060", marginBottom: 48 }}>
            Every transformation begins with a conversation. Fill out the form and Tawfiq will personally reach out within 24 hours to schedule your free 20-minute discovery call.
          </p>

          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
            {[
              ["✉", "Email", "tawfiq@tqbuilt.com"],
              ["📱", "WhatsApp", "+971 50 123 4567"],
              ["📍", "Location", "Dubai, UAE · Worldwide Remote"],
              ["📸", "Instagram", "@tqbuilt"],
            ].map(([icon, label, val], i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, border: "1px solid #1E1E1E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#4A4438", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, color: "#9A9080" }}>{val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof strip */}
          <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: 32 }}>
            <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#3A3028", marginBottom: 16, textTransform: "uppercase" }}>Trusted by professionals from</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {["Finance","Medicine","Sport","Law","Entrepreneurship","Architecture"].map((f, i) => (
                <span key={i} style={{ padding: "4px 12px", border: "1px solid #1A1A1A", fontSize: 11, color: "#4A4438", fontFamily: "DM Mono, monospace" }}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className={vis ? "vis-d2" : ""} style={{ background: "#0E0E0E", border: "1px solid #1A1A1A", padding: "48px 44px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>◈</div>
              <div className="bb gt" style={{ fontSize: 32, letterSpacing: 2, marginBottom: 16 }}>MESSAGE RECEIVED</div>
              <p style={{ fontSize: 14, color: "#7A7060", lineHeight: 1.7 }}>Tawfiq will personally review your submission and be in touch within 24 hours to schedule your discovery call.</p>
            </div>
          ) : (
            <>
              <div className="bb" style={{ fontSize: 22, letterSpacing: 3, color: "#EFE9DF", marginBottom: 8 }}>BEGIN YOUR BLUEPRINT</div>
              <p className="cg" style={{ fontSize: 14, color: "#7A7060", fontStyle: "italic", marginBottom: 36 }}>Free 20-minute discovery call included</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#4A4438", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Full Name *</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#4A4438", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#4A4438", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Primary Goal</label>
                  <select value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} style={{ background: "#161616", border: "1px solid #2C2C2C", color: form.goal ? "#EFE9DF" : "#4A4438", fontFamily: "DM Sans, sans-serif", padding: "14px 18px", fontSize: 14, width: "100%", outline: "none", borderRadius: 2, cursor: "pointer" }}>
                    <option value="">Select your primary goal</option>
                    <option>Fat Loss & Body Recomposition</option>
                    <option>Strength & Muscle Building</option>
                    <option>Athletic Performance</option>
                    <option>Complete Lifestyle Transformation</option>
                    <option>Nutrition & Metabolic Health</option>
                    <option>Mobility & Longevity</option>
                  </select>
                </div>
                <div>
                  <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#4A4438", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Tell Tawfiq About You</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Your current situation, experience level, biggest challenges, and what you want to achieve..." style={{ resize: "vertical" }} />
                </div>
                <div>
                  <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: "#4A4438", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Preferred Plan</label>
                  <select style={{ background: "#161616", border: "1px solid #2C2C2C", color: "#7A7060", fontFamily: "DM Sans, sans-serif", padding: "14px 18px", fontSize: 14, width: "100%", outline: "none", borderRadius: 2, cursor: "pointer" }}>
                    <option>Not sure yet — help me decide</option>
                    <option>Foundation (3 months)</option>
                    <option>Architect (6 months)</option>
                    <option>Blueprint Elite (12 months)</option>
                    <option>Private Client</option>
                  </select>
                </div>
                <button onClick={handleSubmit} className="ctap" style={{ padding: "16px", fontSize: 12, marginTop: 8 }}>
                  Send — Begin the Conversation
                </button>
                <div className="mm" style={{ fontSize: 9, letterSpacing: 1.5, color: "#2C2C2C", textAlign: "center" }}>
                  Your information is never shared or sold · Tawfiq personally reads every submission
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#070707", borderTop: "1px solid #1A1A1A", padding: "60px 48px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48, flexWrap: "wrap", gap: 40 }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
              <span className="bb" style={{ fontSize: 32, letterSpacing: 4, color: "#C9A550" }}>TQ</span>
              <span className="bb" style={{ fontSize: 22, letterSpacing: 7, color: "#EFE9DF" }}>BUILT</span>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#E85D04", display: "inline-block", marginBottom: 5 }} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#4A4438" }}>
              Where science meets obsession. The TQ Blueprint — a proprietary 5-phase methodology for permanent human transformation.
            </p>
          </div>

          {/* Links */}
          {[
            ["Navigate", [["The Method", "#method"], ["Fitness Domains", "#domains"], ["Client Results", "#results"], ["Investment Plans", "#plans"], ["Contact", "#contact"]]],
            ["Programmes", [["Foundation (3 months)", "#plans"], ["Architect (6 months)", "#plans"], ["Blueprint Elite (12 months)", "#plans"], ["Private Client", "#contact"]]],
            ["Connect", [["Instagram · @tqbuilt", "#"], ["WhatsApp · +971 50 123 4567", "#"], ["Email · tawfiq@tqbuilt.com", "#"], ["Based in Dubai, UAE", "#"]]],
          ].map(([title, links]) => (
            <div key={title}>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: "#4A4438", textTransform: "uppercase", marginBottom: 20 }}>{title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(([l, h]) => (
                  <a key={l} href={h} style={{ textDecoration: "none", fontSize: 13, color: "#7A7060", transition: "color .3s" }}
                    onMouseEnter={e => e.target.style.color = "#C9A550"}
                    onMouseLeave={e => e.target.style.color = "#7A7060"}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span className="mm" style={{ fontSize: 10, letterSpacing: 1.5, color: "#2C2C2C" }}>
            © 2025 TQ Built · Tawfiq Morrar · All Rights Reserved
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(l => (
              <a key={l} href="#" style={{ textDecoration: "none", fontSize: 10, color: "#2C2C2C", fontFamily: "DM Mono, monospace", letterSpacing: 1.5 }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── DIVIDER BANNER ───────────────────────────────────────────────────────────
function MarqueeBanner() {
  const words = ["STRENGTH", "DISCIPLINE", "PRECISION", "RESULTS", "METHOD", "TRANSFORMATION", "ELITE", "BUILT"];
  return (
    <div style={{ background: "#C9A550", padding: "14px 0", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", gap: 48, animation: "marquee 25s linear infinite", whiteSpace: "nowrap" }}>
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="bb" style={{ fontSize: 14, letterSpacing: 6, color: "#070707", flexShrink: 0 }}>
            {w} <span style={{ color: "rgba(7,7,7,.3)" }}>·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function TQBuilt() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#070707", minHeight: "100vh" }}>
      <style>{STYLES}</style>
      <Nav scrolled={scrolled} />
      <Hero />
      <MarqueeBanner />
      <About />
      <Method />
      <Domains />
      <Results />
      <MarqueeBanner />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
