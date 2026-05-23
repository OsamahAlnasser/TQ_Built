import { useState, useEffect, useRef } from 'react';
import en from './translations/en';
import ar from './translations/ar';

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Tajawal:wght@400;500;700;800&display=swap');

:root {
  --latin-font: 'DM Sans', sans-serif;
  --arabic-font: 'Tajawal', 'DM Sans', sans-serif;
  --display-font: 'Bebas Neue', sans-serif;
  --serif-font: 'Cormorant Garamond', serif;
  --mono-font: 'DM Mono', monospace;
  --fs-base: clamp(1rem, 0.95rem + 0.25vw, 1.1rem);
  --lh-body: 1.72;
}

:root[data-theme='dark'] {
  --bg: #070707;
  --bg2: #0C0C0C;
  --bg3: #111111;
  --surface: #0E0E0E;
  --surface-2: #161616;
  --border-soft: #1A1A1A;
  --border: #1E1E1E;
  --border-strong: #2C2C2C;
  --primary: #C9A550;
  --primary-strong: #E8C96A;
  --primary-deep: #9A7A30;
  --accent: #E85D04;
  --accent-strong: #FF8C00;
  --focus-ring: #F2C86C;
  --on-accent: #fff;
  --text: #EFE9DF;
  --text-muted: #9A9080;
  --text-soft: #7A7060;
  --text-faint: #4A4438;
  --text-subtle: #3A3028;
  --gold-glow: rgba(201,165,80,0.10);
  --accent-glow: rgba(232,93,4,0.12);
  --nav-bg: rgba(7,7,7,0.96);
  --nav-overlay: rgba(7,7,7,0.98);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.45);
}

:root[data-theme='light'] {
  --bg: #F5F1EA;
  --bg2: #FDFBF7;
  --bg3: #EFE8DE;
  --surface: #FFFFFF;
  --surface-2: #F7F2EA;
  --border-soft: #E5DBCE;
  --border: #D6C8B7;
  --border-strong: #BCA993;
  --primary: #8D6A24;
  --primary-strong: #6C4F16;
  --primary-deep: #71521A;
  --accent: #A64300;
  --accent-strong: #8E3600;
  --focus-ring: #784700;
  --on-accent: #fff;
  --text: #1C140C;
  --text-muted: #3D3021;
  --text-soft: #5A4735;
  --text-faint: #6D5A47;
  --text-subtle: #7F6D5A;
  --gold-glow: rgba(141,106,36,0.12);
  --accent-glow: rgba(166,67,0,0.12);
  --nav-bg: rgba(245,241,234,0.96);
  --nav-overlay: rgba(245,241,234,0.98);
  --shadow-lg: 0 12px 28px rgba(61, 38, 14, 0.16);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--latin-font);
  font-size: var(--fs-base);
  line-height: var(--lh-body);
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color .3s ease, color .3s ease;
}

.bb { font-family: var(--display-font); }
.cg { font-family: var(--serif-font); }
.mm { font-family: var(--mono-font); }

.gt{
  background:linear-gradient(130deg,var(--primary-deep) 0%,var(--primary) 45%,var(--primary-strong) 60%,var(--primary) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.ot{
  background:linear-gradient(130deg,var(--accent),var(--accent-strong));
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

.tag{font-family:var(--mono-font);font-size:0.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--primary);border:1px solid var(--primary-deep);padding:6px 14px;display:inline-block;}

.ctap,.ctao,.icon-btn{
  min-height:42px;
  font-family:var(--latin-font);
  font-weight:600;
  letter-spacing:.1em;
  text-transform:uppercase;
  transition:all .3s;
  border-radius:6px;
}
.ctap{background:var(--accent);color:var(--on-accent);border:none;cursor:pointer;animation:pulseGlow 3s ease-in-out infinite;}
.ctap:hover{background:var(--accent-strong);transform:translateY(-2px);}
.ctao{background:transparent;color:var(--primary);border:1px solid var(--primary-deep);cursor:pointer;}
.ctao:hover{background:var(--gold-glow);border-color:var(--primary);color:var(--primary-strong);}
.ctap:focus-visible,.ctao:focus-visible,.icon-btn:focus-visible,.lang-toggle button:focus-visible{
  outline:2px solid var(--focus-ring);
  outline-offset:2px;
}

a.nl{color:var(--text-soft);text-decoration:none;font-size:0.8rem;letter-spacing:.16em;text-transform:uppercase;position:relative;transition:color .3s;}
a.nl::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--primary);transition:width .3s;}
a.nl:hover{color:var(--text);}
a.nl:hover::after{width:100%;}

.domain-card{transition:transform .3s,border-color .3s,background .3s;}
.domain-card:hover{transform:translateY(-6px);}
.phase-card{transition:border-color .3s,background .3s;}
.phase-card:hover{border-color:var(--primary) !important;background:var(--gold-glow) !important;}

.plan-card{transition:transform .3s,border-color .3s;}
.plan-card:hover{transform:translateY(-4px);}

input,textarea,select{
  background:var(--surface-2);
  border:1px solid var(--border-strong);
  color:var(--text);
  font-family:var(--latin-font);
  padding:14px 18px;
  font-size:1rem;
  width:100%;
  outline:none;
  transition:border-color .3s,background-color .3s,color .3s;
  border-radius:8px;
}
input:focus,textarea:focus,select:focus{border-color:var(--focus-ring);}
input::placeholder,textarea::placeholder{color:var(--text-faint);}

::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:var(--bg2);}
::-webkit-scrollbar-thumb{background:var(--primary-deep);}

.hero-grid{
  background-image:linear-gradient(rgba(201,165,80,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,165,80,.025) 1px,transparent 1px);
  background-size:72px 72px;
}

.shimmer-line{
  height:1px;
  background:linear-gradient(90deg,transparent,var(--primary),transparent);
  background-size:200% 100%;
  animation:shimmer 3s linear infinite;
}

.about-grid,.method-header,.domains-header,.contact-grid,.results-grid,.form-grid{
  width:100%;
}

@media(max-width:1024px){
  .results-grid,.contact-grid{grid-template-columns:1fr!important;}
  .testimonials-side{border-inline-end:none!important;border-bottom:1px solid var(--border)!important;}
}

@media(max-width:768px){
  .hide-mob{display:none!important;}
  .mob-col{flex-direction:column!important;}
  .mob-full{width:100%!important;}
  .mob-center{text-align:center!important;align-items:center!important;}
  section[id]{padding:84px 20px!important;}
  footer{padding:52px 20px 28px!important;}
  h1.bb{font-size:clamp(2.85rem,14vw,4.35rem)!important;line-height:1!important;letter-spacing:1px!important;}
  section h2.bb{font-size:clamp(2rem,10vw,3.2rem)!important;line-height:1.05!important;letter-spacing:.5px!important;}
  .mob-p{padding:72px 20px!important;}
  .mob-text-sm{font-size:clamp(2.85rem,14vw,4.35rem)!important;line-height:1!important;}
  .about-grid,.method-header,.domains-header,.contact-grid{gap:28px!important;}
  .form-grid{grid-template-columns:1fr!important;}
  .testimonials-side{padding:32px 20px!important;}
  .testimonial-stats{padding:28px 20px!important;}
  nav{padding:0 20px!important;}
  .mobile-menu{padding:28px 20px!important;}
}
`;

const EXTRA_STYLES = `
.lang-toggle{display:flex;border:1px solid var(--border-strong);overflow:hidden;border-radius:8px}
.lang-toggle button{background:var(--surface);border:none;color:var(--text-soft);padding:8px 12px;font-size:.76rem;cursor:pointer;font-family:var(--mono-font);letter-spacing:.1em;min-height:38px}
.lang-toggle button.active{background:var(--primary);color:var(--bg)}
.icon-btn{border:1px solid var(--border-strong);background:var(--surface);color:var(--primary);padding:8px 12px;cursor:pointer;font-size:1rem}

.rtl{
  font-family:var(--arabic-font);
  --fs-base: clamp(1.06rem, 1rem + 0.25vw, 1.18rem);
  --lh-body: 1.85;
}
.rtl .bb,.rtl .cg,.rtl .mm{font-family:var(--arabic-font)}
.rtl .mm{font-size:clamp(.82rem,2.7vw,.96rem)!important;letter-spacing:.08em!important}
.rtl a.nl::after{left:auto;right:0}
.rtl blockquote{border-left:none!important;border-right:2px solid var(--primary)!important;padding-left:0!important;padding-right:20px!important}
.rtl .rtl-right{border-right:1px solid var(--border)!important;border-left:none!important}
.rtl .rtl-divider{border-right:1px solid var(--border-strong)!important;border-left:none!important;padding-right:16px!important;padding-left:0!important}
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

function Nav({ scrolled, t, language, onLanguageChange, theme, onThemeToggle }) {
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
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
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
          <span className="bb" style={{ fontSize: '30px', letterSpacing: '4px', color: 'var(--primary)', textShadow: '0 0 30px rgba(201,165,80,.4)' }}>
            TQ
          </span>
          <span className="bb" style={{ fontSize: '21px', letterSpacing: '7px', color: 'var(--text)' }}>
            BUILT
          </span>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', marginBottom: 5 }} />
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
          <button type="button" className="icon-btn" onClick={onThemeToggle} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? '☀︎' : '☾'}
          </button>
          <a href="#contact" className="hide-mob" style={{ textDecoration: 'none' }}>
            <button className="ctap" style={{ padding: '10px 26px', fontSize: 11 }}>
              {t.nav.beginHere}
            </button>
          </a>
          <button type="button" className="icon-btn" onClick={() => setMob(!mob)} aria-label={mob ? 'Close menu' : 'Open menu'} style={{ fontSize: 22, padding: '4px 10px' }}>
            {mob ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {mob && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: 72,
            left: 0,
            right: 0,
            zIndex: 999,
            background: 'var(--nav-overlay)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--border)',
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
          <button type="button" className="icon-btn" onClick={onThemeToggle} style={{ width: '100%' }}>
            {theme === 'dark' ? '☀︎ Light' : '☾ Dark'}
          </button>
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
                   var(--bg)`,
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
          <h1 className="bb mob-text-sm" style={{ fontSize: 130, lineHeight: 0.9, letterSpacing: 2, marginBottom: 32, color: 'var(--text)' }}>
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
          <div style={{ width: 2, minHeight: 80, background: 'linear-gradient(180deg,var(--primary),transparent)', flexShrink: 0, marginTop: 4 }} className="hide-mob" />
          <p className="cg" style={{ fontSize: 22, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 540, fontStyle: 'italic' }}>
            {t.hero.description} <em style={{ color: 'var(--primary)' }}>{t.hero.descriptionEmphasis}</em>
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
        <div className="vis-d4" style={{ display: 'flex', gap: 0, flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: 40 }}>
          {t.hero.stats.map((s, i) => (
            <div
              key={i}
              style={{
                flex: '1 1 160px',
                paddingInlineEnd: 32,
                borderInlineEnd: i < t.hero.stats.length - 1 ? '1px solid var(--border)' : 'none',
                marginInlineEnd: 32,
                marginBottom: 20,
              }}
            >
              <div className="bb gt" style={{ fontSize: 44, letterSpacing: 2 }}>
                {s.val}
              </div>
              <div className="mm" style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-faint)', textTransform: 'uppercase', marginTop: 4 }}>
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
    <section id="about" ref={ref} style={{ background: 'var(--bg2)', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div className="about-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 80, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className={vis ? 'vis' : ''} style={{ flex: '0 0 340px', position: 'relative' }}>
          <div
            style={{
              width: 340,
              height: 440,
              background: 'linear-gradient(145deg, var(--surface-2), var(--surface-2))',
              border: '1px solid var(--border-strong)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: 40, height: 40, borderTop: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 40, height: 40, borderBottom: '2px solid var(--primary)', borderRight: '2px solid var(--primary)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 36, color: 'var(--primary)' }}>TM</span>
              </div>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                {t.about.portraitName}
              </div>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                {t.about.portraitRole}
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: -16, right: -24, background: 'var(--accent)', color: 'var(--on-accent)', padding: '8px 16px', fontSize: 10, fontFamily: 'DM Mono, monospace', letterSpacing: 2 }}>
            {t.about.badgeYears}
          </div>
          <div style={{ position: 'absolute', bottom: 40, left: -24, background: 'var(--surface-2)', border: '1px solid var(--border-strong)', padding: '12px 18px' }}>
            <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--primary)' }}>
              {t.about.certifiedIn}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text)', marginTop: 4 }}>{t.about.certifiedAreas}</div>
          </div>
        </div>

        <div className={vis ? 'vis-d2' : ''} style={{ flex: '1 1 380px' }}>
          <span className="tag" style={{ marginBottom: 24, display: 'inline-block' }}>
            {t.about.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 64, lineHeight: 0.95, letterSpacing: 1, marginBottom: 28, color: 'var(--text)' }}>
            {t.about.title[0]}
            <br />
            {t.about.title[1]}
            <br />
            <span className="gt">{t.about.title[2]}</span>
          </h2>
          <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg,var(--primary),transparent)', marginBottom: 28 }} />
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 20 }}>{t.about.p1}</p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 32 }}>
            {t.about.p2Prefix} <span style={{ color: 'var(--text)' }}>{t.about.p2Emphasis}</span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16, marginBottom: 36 }}>
            {t.about.credentials.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--primary)', fontSize: 10, marginTop: 4, flexShrink: 0 }}>◈</span>
                <span style={{ fontSize: 12, color: 'var(--text-soft)', lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>
          <blockquote className="cg" style={{ borderLeft: '2px solid var(--primary)', paddingLeft: 20, fontStyle: 'italic', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            "{t.about.quote}"
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--text-faint)', fontStyle: 'normal' }}>{t.about.quoteBy}</div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Method({ t }) {
  const [ref, vis] = useVisible(0.08);
  return (
    <section id="method" ref={ref} style={{ background: 'var(--bg)', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(201,165,80,.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div className="method-header" style={{ display: 'flex', gap: 80, alignItems: 'flex-end', marginBottom: 80, flexWrap: 'wrap' }}>
          <div className={vis ? 'vis' : ''}>
            <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
              {t.method.tag}
            </span>
            <h2 className="bb" style={{ fontSize: 80, lineHeight: 0.9, letterSpacing: 1, color: 'var(--text)' }}>
              {t.method.title[0]}
              <br />
              {t.method.title[1]}
              <br />
              <span className="gt">{t.method.title[2]}</span>
            </h2>
          </div>
          <div className={vis ? 'vis-d2' : ''} style={{ maxWidth: 380, paddingBottom: 8 }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-muted)' }}>{t.method.intro}</p>
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
            border: '1px solid var(--border)',
            background: 'linear-gradient(135deg, var(--bg2), var(--surface-2))',
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
                <div key={i} className="rtl-divider" style={{ borderLeft: '1px solid var(--border-strong)', paddingLeft: 16 }}>
                  <div className="mm" style={{ fontSize: 10, letterSpacing: 2, color: 'var(--primary)', marginBottom: 8, textTransform: 'uppercase' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.6 }}>{text}</div>
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
        border: '1px solid var(--border)',
        background: open ? 'var(--gold-glow)' : 'var(--bg2)',
        padding: '32px 40px',
        cursor: 'pointer',
        borderColor: open ? 'var(--primary-deep)' : 'var(--border)',
        transition: 'all .3s',
      }}
    >
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <span className="bb" style={{ fontSize: 48, color: 'var(--border)', lineHeight: 1, flexShrink: 0, minWidth: 60 }}>
          {p.n}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span className="bb gt" style={{ fontSize: 30, letterSpacing: 3 }}>
              {p.name}
            </span>
            <span className="cg" style={{ fontSize: 16, color: 'var(--text-soft)', fontStyle: 'italic' }}>
              — {p.sub}
            </span>
          </div>
          {open && (
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 16 }}>{p.desc}</p>
              <div className="mm" style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--text-faint)', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                {p.detail}
              </div>
            </div>
          )}
        </div>
        <span style={{ color: open ? 'var(--primary)' : 'var(--border-strong)', fontSize: 20, transition: 'all .3s', flexShrink: 0 }}>{open ? '−' : '+'}</span>
      </div>
    </div>
  );
}

function Domains({ t }) {
  const [ref, vis] = useVisible(0.06);
  return (
    <section id="domains" ref={ref} style={{ background: 'var(--bg2)', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className={vis ? 'vis' : ''} style={{ marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
            {t.domains.tag}
          </span>
          <div className="domains-header" style={{ display: 'flex', gap: 60, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <h2 className="bb" style={{ fontSize: 72, lineHeight: 0.9, letterSpacing: 1, color: 'var(--text)' }}>
              {t.domains.title[0]}
              <br />
              {t.domains.title[1]}
              <br />
              <span className="gt">{t.domains.title[2]}</span>
            </h2>
            <p style={{ maxWidth: 420, fontSize: 15, lineHeight: 1.8, color: 'var(--text-soft)', paddingBottom: 8 }}>{t.domains.intro}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 2 }}>
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
        background: hov ? 'var(--surface-2)' : 'var(--surface)',
        border: `1px solid ${hov ? `${d.accent}44` : 'var(--border-soft)'}`,
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
      <h3 className="bb" style={{ fontSize: 24, letterSpacing: 2, color: 'var(--text)', marginBottom: 16 }}>
        {d.title}
      </h3>
      <div style={{ width: 32, height: 1, background: d.accent, opacity: 0.4, marginBottom: 16 }} />
      <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--text-soft)', marginBottom: 24 }}>{d.desc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {d.bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: d.accent, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>
            <span style={{ fontSize: 12, color: 'var(--text-soft)', lineHeight: 1.5 }}>{b}</span>
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
    <section id="results" ref={ref} style={{ background: 'var(--bg)', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,165,80,.2), transparent)' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className={vis ? 'vis' : ''} style={{ marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
            {t.results.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 72, lineHeight: 0.9, letterSpacing: 1, color: 'var(--text)' }}>
            {t.results.title[0]}
            <br />
            <span className="gt">{t.results.title[1]}</span>
            <br />
            {t.results.title[2]}
          </h2>
        </div>

        <div className={`${vis ? 'vis-d2' : ''} results-grid`} style={{ border: '1px solid var(--border)', background: 'var(--bg2)', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
          <div className="rtl-right testimonials-side" style={{ padding: '60px 56px', borderRight: '1px solid var(--border)' }}>
            <div style={{ fontSize: 64, color: 'var(--border)', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: 8 }}>
              "
            </div>
            <blockquote className="cg" style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 36 }}>
              {testimonials[active].quote}
            </blockquote>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15 }}>{testimonials[active].name}</div>
              <div className="mm" style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--text-faint)', marginTop: 4 }}>
                {testimonials[active].role}
              </div>
              <div style={{ marginTop: 12, padding: '6px 14px', background: 'rgba(232,93,4,.12)', border: '1px solid rgba(232,93,4,.2)', display: 'inline-block' }}>
                <span className="mm" style={{ fontSize: 10, letterSpacing: 2, color: 'var(--accent)' }}>
                  {testimonials[active].result}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="testimonial-stats" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px', gap: 32 }}>
              {testimonials[active].stats.map((s, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: 20 }}>
                  <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-faint)', marginBottom: 6, textTransform: 'uppercase' }}>
                    {s.l}
                  </div>
                  <div className="bb gt" style={{ fontSize: 40, letterSpacing: 2 }}>
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', display: 'flex' }}>
              {testimonials.map((testimonial, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    flex: 1,
                    padding: '14px 8px',
                    background: active === i ? 'var(--gold-glow)' : 'transparent',
                    border: 'none',
                    borderRight: i < testimonials.length - 1 ? '1px solid var(--border)' : 'none',
                    borderTop: active === i ? '2px solid var(--primary)' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all .3s',
                  }}
                >
                  <div style={{ fontSize: 11, color: active === i ? 'var(--primary)' : 'var(--text-faint)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
                    {testimonial.name.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={vis ? 'vis-d3' : ''} style={{ display: 'flex', gap: 0, marginTop: 2, flexWrap: 'wrap' }}>
          {t.results.trustBadges.map(([v, l], i) => (
            <div key={i} style={{ flex: '1 1 200px', padding: '28px 32px', background: 'var(--bg2)', border: '1px solid var(--border-soft)', borderTop: 'none' }}>
              <div className="bb gt" style={{ fontSize: 36 }}>
                {v}
              </div>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-faint)', marginTop: 6, textTransform: 'uppercase' }}>
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
    <section id="plans" ref={ref} style={{ background: 'var(--bg3)', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1260, margin: '0 auto' }}>
        <div className={vis ? 'vis' : ''} style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
            {t.plans.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 72, lineHeight: 0.95, letterSpacing: 1, color: 'var(--text)', marginBottom: 20 }}>
            {t.plans.title[0]}
            <br />
            <span className="gt">{t.plans.title[1]}</span>
          </h2>
          <p style={{ maxWidth: 520, margin: '0 auto', fontSize: 15, lineHeight: 1.8, color: 'var(--text-soft)' }}>{t.plans.intro}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 2 }}>
          {t.plans.items.map((plan, i) => (
            <PlanCard key={i} plan={plan} vis={vis} idx={i} labels={t.plans} />
          ))}
        </div>

        <div className={vis ? 'vis-d4' : ''} style={{ marginTop: 40, padding: '28px 40px', border: '1px solid var(--border-soft)', background: 'var(--bg2)', textAlign: 'center' }}>
          <span className="mm" style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text-faint)' }}>
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
        background: plan.hot ? 'var(--surface)' : 'var(--bg2)',
        border: `1px solid ${plan.hot ? 'var(--primary-deep)' : 'var(--border-soft)'}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {plan.hot && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />}

      {plan.badge && (
        <div style={{ position: 'absolute', top: 16, right: 16, background: plan.hot ? 'var(--primary)' : 'var(--border)', color: plan.hot ? 'var(--bg)' : 'var(--text-soft)', padding: '4px 10px', fontSize: 8, fontFamily: 'DM Mono, monospace', letterSpacing: 2 }}>
          {plan.badge}
        </div>
      )}

      <div style={{ padding: '36px 32px 28px' }}>
        <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: plan.hot ? 'var(--primary)' : 'var(--text-faint)', marginBottom: 8, textTransform: 'uppercase' }}>
          {plan.duration}
        </div>
        <div className="bb" style={{ fontSize: 26, letterSpacing: 2, color: 'var(--text)', marginBottom: 4 }}>
          {plan.name}
        </div>
        <div className="cg" style={{ fontSize: 13, color: 'var(--text-soft)', fontStyle: 'italic', marginBottom: 24 }}>
          {plan.line}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
          <span className="bb" style={{ fontSize: 48, letterSpacing: 1, color: plan.hot ? 'var(--primary)' : 'var(--text)' }}>
            {plan.price}
          </span>
          <span className="mm" style={{ fontSize: 11, color: 'var(--text-faint)' }}>
            {plan.period}
          </span>
        </div>
        <div style={{ height: 1, background: 'var(--border-soft)', margin: '24px 0' }} />
      </div>

      <div style={{ padding: '0 32px', flex: 1 }}>
        <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-faint)', marginBottom: 14, textTransform: 'uppercase' }}>
          {labels.included}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {plan.features.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--primary)', fontSize: 10, marginTop: 3, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 12, color: 'var(--text-soft)', lineHeight: 1.5 }}>{f}</span>
            </div>
          ))}
        </div>
        {plan.missing.length > 0 && (
          <>
            <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--border-strong)', marginBottom: 10, marginTop: 16, textTransform: 'uppercase' }}>
              {labels.notIncluded}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {plan.missing.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--border-strong)', fontSize: 10, marginTop: 3, flexShrink: 0 }}>−</span>
                  <span style={{ fontSize: 12, color: 'var(--text-subtle)', lineHeight: 1.5 }}>{f}</span>
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
          <div className="mm" style={{ fontSize: 9, letterSpacing: 1.5, color: 'var(--text-subtle)', textAlign: 'center', marginTop: 10 }}>
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
    <section id="faq" ref={ref} style={{ background: 'var(--bg)', padding: '120px 48px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className={vis ? 'vis' : ''} style={{ marginBottom: 64 }}>
          <span className="tag" style={{ marginBottom: 20, display: 'inline-block' }}>
            {t.faq.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 64, lineHeight: 0.95, letterSpacing: 1, color: 'var(--text)' }}>
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
                  background: open === i ? 'var(--bg3)' : 'var(--bg3)',
                  border: '1px solid',
                  borderColor: open === i ? 'var(--primary-deep)' : 'var(--border-soft)',
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
                <span style={{ fontSize: 14, color: 'var(--text)', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: open === i ? 'var(--primary)' : 'var(--border-strong)', fontSize: 20, flexShrink: 0, transition: 'all .3s' }}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div style={{ background: 'var(--bg3)', borderLeft: '1px solid var(--primary-deep)', borderRight: '1px solid var(--primary-deep)', borderBottom: '1px solid var(--primary-deep)', padding: '24px 32px' }}>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-soft)' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function shouldApplyLtrClass(val) {
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
    <section id="contact" ref={ref} style={{ background: 'var(--bg2)', padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,165,80,.2), transparent)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(232,93,4,.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="contact-grid" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', flexWrap: 'wrap' }}>
        <div className={vis ? 'vis' : ''}>
          <span className="tag" style={{ marginBottom: 24, display: 'inline-block' }}>
            {t.contact.tag}
          </span>
          <h2 className="bb" style={{ fontSize: 72, lineHeight: 0.9, letterSpacing: 1, color: 'var(--text)', marginBottom: 32 }}>
            {t.contact.title[0]}
            <br />
            {t.contact.title[1]}
            <br />
            <span className="ot">{t.contact.title[2]}</span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-soft)', marginBottom: 48 }}>{t.contact.intro}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
            {t.contact.info.map(([icon, label, val], i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 2 }}>
                    {label}
                  </div>
                  <div className={shouldApplyLtrClass(val) ? 'ltr' : ''} style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {val}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: 32 }}>
            <div className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-subtle)', marginBottom: 16, textTransform: 'uppercase' }}>
              {t.contact.trustedBy}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {t.contact.trustedFields.map((f, i) => (
                <span key={i} style={{ padding: '4px 12px', border: '1px solid var(--border-soft)', fontSize: 11, color: 'var(--text-faint)', fontFamily: 'DM Mono, monospace' }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={vis ? 'vis-d2' : ''} style={{ background: 'var(--surface)', border: '1px solid var(--border-soft)', padding: '48px 44px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>◈</div>
              <div className="bb gt" style={{ fontSize: 32, letterSpacing: 2, marginBottom: 16 }}>
                {t.contact.receivedTitle}
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.7 }}>{t.contact.receivedBody}</p>
            </div>
          ) : (
            <>
              <div className="bb" style={{ fontSize: 22, letterSpacing: 3, color: 'var(--text)', marginBottom: 8 }}>
                {t.contact.formTitle}
              </div>
              <p className="cg" style={{ fontSize: 14, color: 'var(--text-soft)', fontStyle: 'italic', marginBottom: 36 }}>
                {t.contact.formSubtitle}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-faint)', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                      {t.contact.labels.fullName}
                    </label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.contact.placeholders.fullName} />
                  </div>
                  <div>
                    <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-faint)', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                      {t.contact.labels.email}
                    </label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.contact.placeholders.email} />
                  </div>
                </div>
                <div>
                  <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-faint)', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                    {t.contact.labels.primaryGoal}
                  </label>
                  <select
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border-strong)',
                      color: form.goal ? 'var(--text)' : 'var(--text-faint)',
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
                  <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-faint)', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
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
                  <label className="mm" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--text-faint)', display: 'block', marginBottom: 8, textTransform: 'uppercase' }}>
                    {t.contact.labels.preferredPlan}
                  </label>
                  <select style={{ background: 'var(--surface-2)', border: '1px solid var(--border-strong)', color: 'var(--text-soft)', fontFamily: 'DM Sans, sans-serif', padding: '14px 18px', fontSize: 14, width: '100%', outline: 'none', borderRadius: 2, cursor: 'pointer' }}>
                    {t.contact.preferredPlans.map((plan) => (
                      <option key={plan}>{plan}</option>
                    ))}
                  </select>
                </div>
                <button onClick={handleSubmit} className="ctap" style={{ padding: '16px', fontSize: 12, marginTop: 8 }}>
                  {t.contact.submit}
                </button>
                <div className="mm" style={{ fontSize: 9, letterSpacing: 1.5, color: 'var(--border-strong)', textAlign: 'center' }}>
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
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-soft)', padding: '60px 48px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 40 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
              <span className="bb" style={{ fontSize: 32, letterSpacing: 4, color: 'var(--primary)' }}>
                TQ
              </span>
              <span className="bb" style={{ fontSize: 22, letterSpacing: 7, color: 'var(--text)' }}>
                BUILT
              </span>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', marginBottom: 5 }} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-faint)' }}>{t.footer.description}</p>
          </div>

          {t.footer.columns.map(([title, links]) => (
            <div key={title}>
              <div className="mm" style={{ fontSize: 9, letterSpacing: 3, color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: 20 }}>
                {title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(([l, h]) => (
                  <a
                    key={l}
                    href={h}
                    className={shouldApplyLtrClass(l) ? 'ltr' : ''}
                    style={{ textDecoration: 'none', fontSize: 13, color: 'var(--text-soft)', transition: 'color .3s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-soft)';
                    }}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span className="mm" style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--border-strong)' }}>
            {t.footer.copyright}
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {t.footer.policies.map((l) => (
              <a key={l} href="#" style={{ textDecoration: 'none', fontSize: 10, color: 'var(--border-strong)', fontFamily: 'DM Mono, monospace', letterSpacing: 1.5 }}>
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
    <div style={{ background: 'var(--primary)', padding: '14px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', gap: 48, animation: 'marquee 25s linear infinite', whiteSpace: 'nowrap' }}>
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="bb" style={{ fontSize: 14, letterSpacing: 6, color: 'var(--bg)', flexShrink: 0 }}>
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
  const [theme, setTheme] = useState(() => {
    const fromDom = document.documentElement.getAttribute('data-theme');
    if (fromDom === 'light' || fromDom === 'dark') return fromDom;
    const saved = localStorage.getItem('tq-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tq-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={t.dir === 'rtl' ? 'rtl' : ''} style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)', transition: 'background-color .3s ease,color .3s ease' }}>
      <style>{STYLES}</style>
      <style>{EXTRA_STYLES}</style>
      <Nav scrolled={scrolled} t={t} language={language} onLanguageChange={setLanguage} theme={theme} onThemeToggle={handleThemeToggle} />
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
