import { useState, useEffect, useRef } from 'react';
import en from './translations/en';
import ar from './translations/ar';

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

const EXTRA_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

.lang-toggle{display:flex;border:1px solid #2C2C2C;overflow:hidden;border-radius:2px}
.lang-toggle button{background:#111;border:none;color:#7A7060;padding:6px 10px;font-size:10px;cursor:pointer;font-family:'DM Mono',monospace;letter-spacing:1.5px}
.lang-toggle button.active{background:#C9A550;color:#070707}

.rtl{font-family:'Tajawal','DM Sans',sans-serif}
.rtl .bb,.rtl .cg,.rtl .mm{font-family:'Tajawal','DM Sans',sans-serif}
.rtl a.nl::after{left:auto;right:0}
.rtl blockquote{border-left:none!important;border-right:2px solid #C9A550!important;padding-left:0!important;padding-right:20px!important}
.rtl .rtl-right{border-right:1px solid #1E1E1E!important;border-left:none!important}
.rtl .rtl-divider{border-right:1px solid #2C2C2C!important;border-left:none!important;padding-right:16px!important;padding-left:0!important}
.ltr{direction:ltr;unicode-bidi:isolate;display:inline-block}
`;

function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Nav({ scrolled, t, language, onLanguageChange }) {
  const [mob, setMob] = useState(false);
  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(7,7,7,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,165,80,0.08)' : 'none',
          transition: 'all .4s ease',
          padding: '0 48px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span className="bb" style={{ fontSize: '30px', letterSpacing: '4px', color: '#C9A550', textShadow: '0 0 30px rgba(201,165,80,.4)' }}>
            TQ
          </span>
          <span className="bb" style={{ fontSize: '21px', letterSpacing: '7px', color: '#EFE9DF' }}>
            BUILT
          </span>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#E85D04', display: 'inline-block', marginBottom: 5 }} />
        </a>
        <div className="hide-mob" style={{ display: 'flex', gap: 40 }}>
          {t.nav.links.map(([l, h]) => (
            <a key={h} href={h} className="nl">
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="lang-toggle" aria-label="Language Toggle">
            <button type="button" className={language === 'ar' ? 'active' : ''} onClick={() => onLanguageChange('ar')}>
              {t.languageSwitch.ar}
            </button>
            <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => onLanguageChange('en')}>
              {t.languageSwitch.en}
            </button>
          </div>
          <a href="#contact" className="hide-mob" style={{ textDecoration: 'none' }}>
            <button className="ctap" style={{ padding: '10px 26px', fontSize: 11 }}>
              {t.nav.beginHere}
            </button>
          </a>
          <button onClick={() => setMob(!mob)} style={{ background: 'none', border: 'none', color: '#C9A550', fontSize: 22, cursor: 'pointer', padding: 4 }}>
            {mob ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {mob && (
        <div
          style={{
            position: 'fixed',
            top: 72,
            left: 0,
            right: 0,
            zIndex: 999,
            background: 'rgba(7,7,7,0.98)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid #1E1E1E',
            padding: '32px 48px',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          {t.nav.links.map(([l, h]) => (
            <a key={h} href={h} className="nl" onClick={() => setMob(false)} style={{ fontSize: 13 }}>
              {l}
            </a>
          ))}
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="ctap" style={{ padding: '12px 32px', fontSize: 11, width: '100%' }}>
              {t.nav.beginTransformation}
            </button>
          </a>
        </div>
      )}
    </>
  );
}

function Hero({ t }) {
  return (
    <section
      id="home"
      className="hero-grid"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `radial-gradient(ellipse 65% 55% at 70% 45%, rgba(201,165,80,.06) 0%, transparent 65%),
                   radial-gradient(ellipse 45% 65% at 15% 85%, rgba(232,93,4,.04) 0%, transparent 55%),
                   #070707`,
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 48px 80px',
      }}
    >
      <div style={{ position: 'absolute', left: 180, top: 0, bottom: 0, width: 1, background: 'linear-gradient(180deg, transparent, rgba(201,165,80,.15), transparent)' }} className="hide-mob" />
      <div
        className="bb hide-mob"
        style={{
          position: 'absolute',
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 520,
          color: 'rgba(201,165,80,.022)',
          letterSpacing: -20,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        TQ
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative' }}>
        <div className="vis" style={{ marginBottom: 28 }}>
          <span className="tag">{t.hero.tag}</span>
        </div>
        <div className="vis-d1">
          <h1 className="bb mob-text-sm" style={{ fontSize: 130, lineHeight: 0.9, letterSpacing: 2, marginBottom: 32, color: '#EFE9DF' }}>
            {t.hero.title[0]}
            <br />
            <span className="gt">{t.hero.title[1]}</span>
            <br />
            {t.hero.title[2]}
            <br />
            {t.hero.title[3]}
          </h1>
        </div>
        <div className="vis-d2" style={{ display: 'flex', gap: 40, alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap' }}>
          <div style={{ width: 2, minHeight: 80, background: 'linear-gradient(180deg,var(--gold),transparent)', flexShrink: 0, marginTop: 4 }} className="hide-mob" />
          <p className="cg" style={{ fontSize: 22, lineHeight: 1.6, color: '#9A9080', maxWidth: 540, fontStyle: 'italic' }}>
            {t.hero.description} <em style={{ color: '#C9A550' }}>{t.hero.descriptionEmphasis}</em>
          </p>
        </div>
        <div className="vis-d3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 80 }}>
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="ctap" style={{ padding: '16px 36px', fontSize: 12 }}>
              {t.hero.ctaPrimary}
            </button>
          </a>
          <a href="#method" style={{ textDecoration: 'none' }}>
            <button className="ctao" style={{ padding: '16px 36px', fontSize: 12 }}>
              {t.hero.ctaSecondary}
            </button>
          </a>
        </div>
        <div className="vis-d4" style={{ display: 'flex', gap: 0, flexWrap: 'wrap', borderTop: '1px solid #1E1E1E', paddingTop: 40 }}>
          {t.hero.stats.map((s, i) => (
            <div
              key={i}
              style={{
                flex: '1 1 160px',
                padding: '0 32px 0 0',
                borderRight: i < t.hero.stats.length - 1 ? '1px solid #1E1E1E' : 'none',
                marginRight: 32,
                marginBottom: 20,
              }}
            >
              <div className="bb gt" style={{ fontSize: 44, letterSpacing: 2 }}>
                {s.val}
              </div>
              <div className="mm" style={{ fontSize: 10, letterSpacing: 2, color: '#4A4438', textTransform: 'uppercase', marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shimmer-line" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

function About({ t }) {
  const [ref, vis] = useVisible();
  return (
    <section id="about" ref={ref} style={{ background: '#0C0C0C', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: 'radial-gradient(circle, rgba(201,165,80,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className={vis ? 'vis' : ''} style={{ flex: '0 0 340px', position: 'relative' }}>
          <div
            style={{
              width: 340,
              height: 440,
              background: 'linear-gradient(145deg, #161616, #111)',
              border: '1px solid #2C2C2C',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTop: '2px solid #C9A550', borderLeft: '2px solid #C9A550' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottom: '2px solid #C9A550', borderRight: '2px solid #C9A550' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid #2C2C2C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 36, color: '#C9A550' }}>TM</span>
              </div>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: '#4A4438', textTransform: 'uppercase' }}>
                {t.about.portraitName}
              </div>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: '#4A4438', textTransform: 'uppercase' }}>
                {t.about.portraitRole}
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: -16, right: -24, background: '#E85D04', color: '#fff', padding: '8px 16px', fontSize: 10, fontFamily: 'DM Mono, monospace', letterSpacing: 2 }}>
            {t.about.badgeYears}
          </div>
          <div style={{ position: 'absolute', bottom: 40, left: -24, background: '#161616', border: '1px solid #2C2C2C', padding: '12px 18px' }}>
            <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#C9A550' }}>
              {t.about.certifiedIn}
            </div>
            <div style={{ fontSize: 11, color: '#EFE9DF', marginTop: 4 }}>{t.about.certifiedAreas}</div>
          </div>
        </div>

        <div className={vis ? 'vis-d2' : ''} style={{ flex: '1 1 380px' }}>
          <span className="tag" style={{ marginBottom: 24, display: 'inline-block' }}>
            {t.about.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 64, lineHeight: 0.95, letterSpacing: 1, marginBottom: 28, color: '#EFE9DF' }}>
            {t.about.title[0]}
            <br />
            {t.about.title[1]}
            <br />
            <span className="gt">{t.about.title[2]}</span>
          </h2>
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg,#C9A550,transparent)', marginBottom: 28 }} />
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#9A9080', marginBottom: 20 }}>{t.about.p1}</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#9A9080', marginBottom: 32 }}>
            {t.about.p2Prefix} <span style={{ color: '#EFE9DF' }}>{t.about.p2Emphasis}</span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 36 }}>
            {t.about.credentials.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#C9A550', fontSize: 10, marginTop: 4, flexShrink: 0 }}>◈</span>
                <span style={{ fontSize: 12, color: '#7A7060', lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>
          <blockquote className="cg" style={{ borderLeft: '2px solid #C9A550', paddingLeft: 20, fontStyle: 'italic', fontSize: 17, color: '#9A9080', lineHeight: 1.7 }}>
            "{t.about.quote}"
            <div style={{ marginTop: 8, fontSize: 13, color: '#4A4438', fontStyle: 'normal' }}>{t.about.quoteBy}</div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Method({ t }) {
  const [ref, vis] = useVisible(0.08);
  return (
    <section id="method" ref={ref} style={{ background: '#070707', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(201,165,80,.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', gap: 80, alignItems: 'flex-end', marginBottom: 80, flexWrap: 'wrap' }}>
          <div className={vis ? 'vis' : ''}>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
              {t.method.tag}
            </span>
            <h2 className="bb" style={{ fontSize: 80, lineHeight: 0.9, letterSpacing: 1, color: '#EFE9DF' }}>
              {t.method.title[0]}
              <br />
              {t.method.title[1]}
              <br />
              <span className="gt">{t.method.title[2]}</span>
            </h2>
          </div>
          <div className={vis ? 'vis-d2' : ''} style={{ maxWidth: 380, paddingBottom: 8 }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#9A9080' }}>{t.method.intro}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {t.method.phases.map((p, i) => (
            <PhaseCard key={i} phase={p} idx={i} vis={vis} />
          ))}
        </div>

        <div
          className={vis ? 'vis-d4' : ''}
          style={{
            marginTop: 64,
            padding: '40px 48px',
            border: '1px solid #1E1E1E',
            background: 'linear-gradient(135deg, #0C0C0C, #111)',
            display: 'flex',
            gap: 48,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div className="bb gt" style={{ fontSize: 80, lineHeight: 1, flexShrink: 0 }}>
            {t.method.whyTitle[0]}
            <br />
            {t.method.whyTitle[1]}
            <br />
            {t.method.whyTitle[2]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              {t.method.whyItems.map(([title, text], i) => (
                <div key={i} className="rtl-divider" style={{ borderLeft: '1px solid #2C2C2C', paddingLeft: 16 }}>
                  <div className="mm" style={{ fontSize: 10, letterSpacing: 2, color: '#C9A550', marginBottom: 8, textTransform: 'uppercase' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 13, color: '#7A7060', lineHeight: 1.6 }}>{text}</div>
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
      className={`phase-card ${vis ? `vis-d${Math.min(idx + 1, 4)}` : ''}`}
      onClick={() => setOpen(!open)}
      style={{
        border: '1px solid #1E1E1E',
        background: open ? 'rgba(201,165,80,.05)' : '#0C0C0C',
        padding: '32px 40px',
        cursor: 'pointer',
        borderColor: open ? '#9A7A30' : '#1E1E1E',
        transition: 'all .3s',
      }}
    >
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <span className="bb" style={{ fontSize: 48, color: '#1E1E1E', lineHeight: 1, flexShrink: 0, minWidth: 60 }}>
          {p.n}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span className="bb gt" style={{ fontSize: 30, letterSpacing: 3 }}>
              {p.name}
            </span>
            <span className="cg" style={{ fontSize: 16, color: '#7A7060', fontStyle: 'italic' }}>
              — {p.sub}
            </span>
          </div>
          {open && (
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: '#9A9080', marginBottom: 16 }}>{p.desc}</p>
              <div className="mm" style={{ fontSize: 10, letterSpacing: 1.5, color: '#4A4438', borderTop: '1px solid #1E1E1E', paddingTop: 14 }}>
                {p.detail}
              </div>
            </div>
          )}
        </div>
        <span style={{ color: open ? '#C9A550' : '#2C2C2C', fontSize: 20, transition: 'all .3s', flexShrink: 0 }}>{open ? '−' : '+'}</span>
      </div>
    </div>
  );
}

function Domains({ t }) {
  const [ref, vis] = useVisible(0.06);
  return (
    <section id="domains" ref={ref} style={{ background: '#0C0C0C', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className={vis ? 'vis' : ''} style={{ marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
            {t.domains.tag}
          </span>
          <div style={{ display: 'flex', gap: 60, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <h2 className="bb" style={{ fontSize: 72, lineHeight: 0.9, letterSpacing: 1, color: '#EFE9DF' }}>
              {t.domains.title[0]}
              <br />
              {t.domains.title[1]}
              <br />
              <span className="gt">{t.domains.title[2]}</span>
            </h2>
            <p style={{ maxWidth: 420, fontSize: 15, lineHeight: 1.8, color: '#7A7060', paddingBottom: 8 }}>{t.domains.intro}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 2 }}>
          {t.domains.items.map((d, i) => (
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
      className={`domain-card ${vis ? `vis-d${Math.min((idx % 4) + 1, 4)}` : ''}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#111' : '#0E0E0E',
        border: `1px solid ${hov ? `${d.accent}44` : '#1A1A1A'}`,
        padding: '40px 36px',
        transition: 'all .3s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <span style={{ fontSize: 32, color: d.accent }}>{d.icon}</span>
        <span className="mm" style={{ fontSize: 9, letterSpacing: 2, color: d.accent, opacity: 0.6, textTransform: 'uppercase' }}>
          {d.tag}
        </span>
      </div>
      <h3 className="bb" style={{ fontSize: 24, letterSpacing: 2, color: '#EFE9DF', marginBottom: 16 }}>
        {d.title}
      </h3>
      <div style={{ width: 32, height: 1, background: d.accent, opacity: 0.4, marginBottom: 16 }} />
      <p style={{ fontSize: 13, lineHeight: 1.8, color: '#7A7060', marginBottom: 24 }}>{d.desc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {d.bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: d.accent, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>
            <span style={{ fontSize: 12, color: '#5A5448', lineHeight: 1.5 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Results({ t }) {
  const [ref, vis] = useVisible(0.08);
  const [active, setActive] = useState(0);
  const testimonials = t.results.testimonials;

  return (
    <section id="results" ref={ref} style={{ background: '#070707', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,165,80,.2), transparent)' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className={vis ? 'vis' : ''} style={{ marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
            {t.results.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 72, lineHeight: 0.9, letterSpacing: 1, color: '#EFE9DF' }}>
            {t.results.title[0]}
            <br />
            <span className="gt">{t.results.title[1]}</span>
            <br />
            {t.results.title[2]}
          </h2>
        </div>

        <div className={vis ? 'vis-d2' : ''} style={{ border: '1px solid #1E1E1E', background: '#0C0C0C', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
          <div className="rtl-right" style={{ padding: '60px 56px', borderRight: '1px solid #1E1E1E' }}>
            <div style={{ fontSize: 64, color: '#1E1E1E', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: 8 }}>
              "
            </div>
            <blockquote className="cg" style={{ fontSize: 18, lineHeight: 1.7, color: '#9A9080', fontStyle: 'italic', marginBottom: 36 }}>
              {testimonials[active].quote}
            </blockquote>
            <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: 24 }}>
              <div style={{ fontWeight: 600, color: '#EFE9DF', fontSize: 15 }}>{testimonials[active].name}</div>
              <div className="mm" style={{ fontSize: 10, letterSpacing: 1.5, color: '#4A4438', marginTop: 4 }}>
                {testimonials[active].role}
              </div>
              <div style={{ marginTop: 12, padding: '6px 14px', background: 'rgba(232,93,4,.12)', border: '1px solid rgba(232,93,4,.2)', display: 'inline-block' }}>
                <span className="mm" style={{ fontSize: 10, letterSpacing: 2, color: '#E85D04' }}>
                  {testimonials[active].result}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px', gap: 32 }}>
              {testimonials[active].stats.map((s, i) => (
                <div key={i} style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: 20 }}>
                  <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#4A4438', marginBottom: 6, textTransform: 'uppercase' }}>
                    {s.l}
                  </div>
                  <div className="bb gt" style={{ fontSize: 40, letterSpacing: 2 }}>
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #1E1E1E', display: 'flex' }}>
              {testimonials.map((testimonial, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    flex: 1,
                    padding: '14px 8px',
                    background: active === i ? 'rgba(201,165,80,.08)' : 'transparent',
                    border: 'none',
                    borderRight: i < testimonials.length - 1 ? '1px solid #1E1E1E' : 'none',
                    borderTop: active === i ? '2px solid #C9A550' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all .3s',
                  }}
                >
                  <div style={{ fontSize: 11, color: active === i ? '#C9A550' : '#4A4438', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
                    {testimonial.name.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={vis ? 'vis-d3' : ''} style={{ display: 'flex', gap: 0, marginTop: 2, flexWrap: 'wrap' }}>
          {t.results.trustBadges.map(([v, l], i) => (
            <div key={i} style={{ flex: '1 1 200px', padding: '28px 32px', background: '#0C0C0C', border: '1px solid #1A1A1A', borderTop: 'none' }}>
              <div className="bb gt" style={{ fontSize: 36 }}>
                {v}
              </div>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#4A4438', marginTop: 6, textTransform: 'uppercase' }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ t }) {
  const [ref, vis] = useVisible(0.05);
  return (
    <section id="plans" ref={ref} style={{ background: '#0A0A0A', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1260, margin: '0 auto' }}>
        <div className={vis ? 'vis' : ''} style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
            {t.plans.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 72, lineHeight: 0.95, letterSpacing: 1, color: '#EFE9DF', marginBottom: 20 }}>
            {t.plans.title[0]}
            <br />
            <span className="gt">{t.plans.title[1]}</span>
          </h2>
          <p style={{ maxWidth: 520, margin: '0 auto', fontSize: 15, lineHeight: 1.8, color: '#7A7060' }}>{t.plans.intro}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 2 }}>
          {t.plans.items.map((plan, i) => (
            <PlanCard key={i} plan={plan} vis={vis} idx={i} labels={t.plans} />
          ))}
        </div>

        <div className={vis ? 'vis-d4' : ''} style={{ marginTop: 40, padding: '28px 40px', border: '1px solid #1A1A1A', background: '#0C0C0C', textAlign: 'center' }}>
          <span className="mm" style={{ fontSize: 11, letterSpacing: 2, color: '#4A4438' }}>
            {t.plans.allPlansNote}
          </span>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan, vis, idx, labels }) {
  return (
    <div
      className={`plan-card ${vis ? `vis-d${Math.min(idx + 1, 4)}` : ''}`}
      style={{
        background: plan.hot ? '#101010' : '#0C0C0C',
        border: `1px solid ${plan.hot ? '#9A7A30' : '#1A1A1A'}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {plan.hot && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #C9A550, transparent)' }} />}

      {plan.badge && (
        <div style={{ position: 'absolute', top: 16, right: 16, background: plan.hot ? '#C9A550' : '#1E1E1E', color: plan.hot ? '#070707' : '#7A7060', padding: '4px 10px', fontSize: 8, fontFamily: 'DM Mono, monospace', letterSpacing: 2 }}>
          {plan.badge}
        </div>
      )}

      <div style={{ padding: '36px 32px 28px' }}>
        <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: plan.hot ? '#C9A550' : '#4A4438', marginBottom: 8, textTransform: 'uppercase' }}>
          {plan.duration}
        </div>
        <div className="bb" style={{ fontSize: 26, letterSpacing: 2, color: '#EFE9DF', marginBottom: 4 }}>
          {plan.name}
        </div>
        <div className="cg" style={{ fontSize: 13, color: '#7A7060', fontStyle: 'italic', marginBottom: 24 }}>
          {plan.line}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
          <span className="bb" style={{ fontSize: 48, letterSpacing: 1, color: plan.hot ? '#C9A550' : '#EFE9DF' }}>
            {plan.price}
          </span>
          <span className="mm" style={{ fontSize: 11, color: '#4A4438' }}>
            {plan.period}
          </span>
        </div>
        <div style={{ height: 1, background: '#1A1A1A', margin: '24px 0' }} />
      </div>

      <div style={{ padding: '0 32px', flex: 1 }}>
        <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#4A4438', marginBottom: 14, textTransform: 'uppercase' }}>
          {labels.included}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {plan.features.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#C9A550', fontSize: 10, marginTop: 3, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 12, color: '#7A7060', lineHeight: 1.5 }}>{f}</span>
            </div>
          ))}
        </div>
        {plan.missing.length > 0 && (
          <>
            <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#2C2C2C', marginBottom: 10, marginTop: 16, textTransform: 'uppercase' }}>
              {labels.notIncluded}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {plan.missing.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#2C2C2C', fontSize: 10, marginTop: 3, flexShrink: 0 }}>−</span>
                  <span style={{ fontSize: 12, color: '#3A3028', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '28px 32px 36px' }}>
        <a href="#contact" style={{ textDecoration: 'none', display: 'block' }}>
          <button className={plan.hot ? 'ctap' : 'ctao'} style={{ width: '100%', padding: '14px', fontSize: 11 }}>
            {plan.cta}
          </button>
        </a>
        {plan.apply && (
          <div className="mm" style={{ fontSize: 9, letterSpacing: 1.5, color: '#3A3028', textAlign: 'center', marginTop: 10 }}>
            {labels.applyReviewed}
          </div>
        )}
      </div>
    </div>
  );
}

function FAQ({ t }) {
  const [ref, vis] = useVisible(0.08);
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" ref={ref} style={{ background: '#070707', padding: '120px 48px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className={vis ? 'vis' : ''} style={{ marginBottom: 64 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
            {t.faq.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 64, lineHeight: 0.95, letterSpacing: 1, color: '#EFE9DF' }}>
            {t.faq.title[0]}
            <br />
            {t.faq.title[1]}
            <br />
            <span className="gt">{t.faq.title[2]}</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {t.faq.items.map((faq, i) => (
            <div key={i} className={vis ? `vis-d${Math.min((i % 3) + 1, 4)}` : ''}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  background: open === i ? '#0D0D0D' : '#0A0A0A',
                  border: '1px solid',
                  borderColor: open === i ? '#9A7A30' : '#1A1A1A',
                  padding: '24px 32px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 24,
                  transition: 'all .3s',
                }}
              >
                <span style={{ fontSize: 14, color: '#EFE9DF', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: open === i ? '#C9A550' : '#2C2C2C', fontSize: 20, flexShrink: 0, transition: 'all .3s' }}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div style={{ background: '#0D0D0D', borderLeft: '1px solid #9A7A30', borderRight: '1px solid #9A7A30', borderBottom: '1px solid #9A7A30', padding: '24px 32px' }}>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#7A7060' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function needsLtr(val) {
  return /[@+]|\b(Instagram|WhatsApp|Email|Dubai|UAE|tqbuilt|\.com)\b/i.test(val);
}

function Contact({ t }) {
  const [ref, vis] = useVisible(0.08);
  const [form, setForm] = useState({ name: '', email: '', goal: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email) setSent(true);
  };

  return (
    <section id="contact" ref={ref} style={{ background: '#0C0C0C', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,165,80,.2), transparent)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(232,93,4,.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', flexWrap: 'wrap' }}>
        <div className={vis ? 'vis' : ''}>
          <span className="tag" style={{ marginBottom: 24, display: 'inline-block' }}>
            {t.contact.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 72, lineHeight: 0.9, letterSpacing: 1, color: '#EFE9DF', marginBottom: 32 }}>
            {t.contact.title[0]}
            <br />
            {t.contact.title[1]}
            <br />
            <span className="ot">{t.contact.title[2]}</span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#7A7060', marginBottom: 48 }}>{t.contact.intro}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
            {t.contact.info.map(([icon, label, val], i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, border: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#4A4438', textTransform: 'uppercase', marginBottom: 2 }}>
                    {label}
                  </div>
                  <div className={needsLtr(val) ? 'ltr' : ''} style={{ fontSize: 13, color: '#9A9080' }}>
                    {val}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #1A1A1A', paddingTop: 32 }}>
            <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#3A3028', marginBottom: 16, textTransform: 'uppercase' }}>
              {t.contact.trustedBy}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {t.contact.trustedFields.map((f, i) => (
                <span key={i} style={{ padding: '4px 12px', border: '1px solid #1A1A1A', fontSize: 11, color: '#4A4438', fontFamily: 'DM Mono, monospace' }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={vis ? 'vis-d2' : ''} style={{ background: '#0E0E0E', border: '1px solid #1A1A1A', padding: '48px 44px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>◈</div>
              <div className="bb gt" style={{ fontSize: 32, letterSpacing: 2, marginBottom: 16 }}>
                {t.contact.receivedTitle}
              </div>
              <p style={{ fontSize: 14, color: '#7A7060', lineHeight: 1.7 }}>{t.contact.receivedBody}</p>
            </div>
          ) : (
            <>
              <div className="bb" style={{ fontSize: 22, letterSpacing: 3, color: '#EFE9DF', marginBottom: 8 }}>
                {t.contact.formTitle}
              </div>
              <p className="cg" style={{ fontSize: 14, color: '#7A7060', fontStyle: 'italic', marginBottom: 36 }}>
                {t.contact.formSubtitle}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#4A4438', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                      {t.contact.labels.fullName}
                    </label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.contact.placeholders.fullName} />
                  </div>
                  <div>
                    <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#4A4438', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                      {t.contact.labels.email}
                    </label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.contact.placeholders.email} />
                  </div>
                </div>
                <div>
                  <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#4A4438', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                    {t.contact.labels.primaryGoal}
                  </label>
                  <select
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    style={{
                      background: '#161616',
                      border: '1px solid #2C2C2C',
                      color: form.goal ? '#EFE9DF' : '#4A4438',
                      fontFamily: 'DM Sans, sans-serif',
                      padding: '14px 18px',
                      fontSize: 14,
                      width: '100%',
                      outline: 'none',
                      borderRadius: 2,
                      cursor: 'pointer',
                    }}
                  >
                    <option value="">{t.contact.placeholders.primaryGoal}</option>
                    {t.contact.goals.map((goal) => (
                      <option key={goal}>{goal}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#4A4438', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                    {t.contact.labels.aboutYou}
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.contact.placeholders.message}
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <div>
                  <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: '#4A4438', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                    {t.contact.labels.preferredPlan}
                  </label>
                  <select style={{ background: '#161616', border: '1px solid #2C2C2C', color: '#7A7060', fontFamily: 'DM Sans, sans-serif', padding: '14px 18px', fontSize: 14, width: '100%', outline: 'none', borderRadius: 2, cursor: 'pointer' }}>
                    {t.contact.preferredPlans.map((plan) => (
                      <option key={plan}>{plan}</option>
                    ))}
                  </select>
                </div>
                <button onClick={handleSubmit} className="ctap" style={{ padding: '16px', fontSize: 12, marginTop: 8 }}>
                  {t.contact.submit}
                </button>
                <div className="mm" style={{ fontSize: 9, letterSpacing: 1.5, color: '#2C2C2C', textAlign: 'center' }}>
                  {t.contact.privacy}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer style={{ background: '#070707', borderTop: '1px solid #1A1A1A', padding: '60px 48px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 40 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
              <span className="bb" style={{ fontSize: 32, letterSpacing: 4, color: '#C9A550' }}>
                TQ
              </span>
              <span className="bb" style={{ fontSize: 22, letterSpacing: 7, color: '#EFE9DF' }}>
                BUILT
              </span>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#E85D04', display: 'inline-block', marginBottom: 5 }} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#4A4438' }}>{t.footer.description}</p>
          </div>

          {t.footer.columns.map(([title, links]) => (
            <div key={title}>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: '#4A4438', textTransform: 'uppercase', marginBottom: 20 }}>
                {title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(([l, h]) => (
                  <a
                    key={l}
                    href={h}
                    className={needsLtr(l) ? 'ltr' : ''}
                    style={{ textDecoration: 'none', fontSize: 13, color: '#7A7060', transition: 'color .3s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#C9A550';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#7A7060';
                    }}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #1A1A1A', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span className="mm" style={{ fontSize: 10, letterSpacing: 1.5, color: '#2C2C2C' }}>
            {t.footer.copyright}
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {t.footer.policies.map((l) => (
              <a key={l} href="#" style={{ textDecoration: 'none', fontSize: 10, color: '#2C2C2C', fontFamily: 'DM Mono, monospace', letterSpacing: 1.5 }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function MarqueeBanner({ t }) {
  const words = t.marqueeWords;
  return (
    <div style={{ background: '#C9A550', padding: '14px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', gap: 48, animation: 'marquee 25s linear infinite', whiteSpace: 'nowrap' }}>
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="bb" style={{ fontSize: 14, letterSpacing: 6, color: '#070707', flexShrink: 0 }}>
            {w} <span style={{ color: 'rgba(7,7,7,.3)' }}>·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

const TRANSLATIONS = { en, ar };

export default function TQBuilt() {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('ar');
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = t.code;
    document.documentElement.dir = t.dir;
  }, [t.code, t.dir]);

  return (
    <div className={t.dir === 'rtl' ? 'rtl' : ''} style={{ background: '#070707', minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <style>{EXTRA_STYLES}</style>
      <Nav scrolled={scrolled} t={t} language={language} onLanguageChange={setLanguage} />
      <Hero t={t} />
      <MarqueeBanner t={t} />
      <About t={t} />
      <Method t={t} />
      <Domains t={t} />
      <Results t={t} />
      <MarqueeBanner t={t} />
      <Pricing t={t} />
      <FAQ t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
