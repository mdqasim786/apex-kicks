import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   IMAGE SOURCES  (all free-to-use via Unsplash CDN)
   To use your own images:
     1. Download from Unsplash / Nike press kit / your own photos
     2. Place PNGs/JPGs inside  /public/shoes/
     3. Replace each `img` URL with e.g. "/shoes/shoe1.png"
   Recommended free sources:
     • https://unsplash.com/s/photos/sneaker
     • https://www.pexels.com/search/sneakers/
     • https://stocksnap.io (search "shoes")
───────────────────────────────────────────────────────────────── */
const HERO_SHOES = [
  {
    id: 1,
    name: "APEX FORCE",
    sub: "Performance Series",
    tagline: "Defying Gravity",
    price: "$220",
    oldPrice: "$280",
    color: "#E8320A",
    glow: "rgba(232,50,10,0.38)",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=85",
    badge: "BEST SELLER",
  },
  {
    id: 2,
    name: "VOID RUNNER",
    sub: "Street Edition",
    tagline: "Born in the Dark",
    price: "$195",
    oldPrice: "$240",
    color: "#0AF0D8",
    glow: "rgba(10,240,216,0.32)",
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&auto=format&fit=crop&q=85",
    badge: "NEW DROP",
  },
  {
    id: 3,
    name: "SOLAR STRIKE",
    sub: "Elite Court Series",
    tagline: "Pure Velocity",
    price: "$240",
    oldPrice: "$300",
    color: "#E69B00",
    glow: "rgba(245,196,0,0.35)",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "LIMITED",
  },
];

const COLLECTION = [
  {
    name: "AIR PHANTOM",
    category: "Running",
    price: "$175",
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=700&auto=format&fit=crop&q=80",
    color: "#E8320A",
  },
  {
    name: "STEALTH PRO",
    category: "Basketball",
    price: "$210",
    img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1170&auto=format&fit=crop&q=80",
    color: "#0AF0D8",
  },
  {
    name: "NOVA DRIFT",
    category: "Lifestyle",
    price: "$160",
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=700&auto=format&fit=crop&q=80",
    color: "#F5C400",
  },
  {
    name: "URBAN EDGE",
    category: "Street",
    price: "$185",
    img: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=700&auto=format&fit=crop&q=80",
    color: "#E8320A",
  },
];

const NAV_LINKS = ["Home", "Collection", "Athletes", "Stories", "Contact"];

/* ── Inline SVG icons — zero emojis ── */
const IcSun = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const IcMoon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const IcCart = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);
const IcArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IcStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ── Logo mark SVG ── */
const Logo = ({ accent, bg }) => (
  <svg width="34" height="34" viewBox="0 0 34 34">
    <polygon points="17,2 32,17 17,32 2,17" fill={accent}/>
    <polygon points="17,9 25,17 17,25 9,17" fill={bg}/>
  </svg>
);

export default function SneakersLanding() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const [counts, setCounts] = useState({ pairs: 0, athletes: 0, countries: 0 });
  const statsRef = useRef(null);
  const counted = useRef(false);

  const S = HERO_SHOES[active];
  const A = S.color; // accent

  useEffect(() => {
    setTimeout(() => setHeroIn(true), 100);
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !counted.current) {
          counted.current = true;
          anim("pairs", 2400000, 2000);
          anim("athletes", 340, 1600);
          anim("countries", 87, 1300);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  function anim(k, to, ms) {
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / ms, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts((c) => ({ ...c, [k]: Math.floor(to * e) }));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const T = dark
    ? { bg: "#080808", surf: "#101010", card: "#151515", border: "#1F1F1F", text: "#F0F0F0", muted: "#666", navBg: "rgba(8,8,8,0.92)" }
    : { bg: "#F3F2EE", surf: "#FFFFFF", card: "#E8E7E3", border: "#D2D1CC", text: "#0A0A0A", muted: "#686868", navBg: "rgba(243,242,238,0.94)" };

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif", minHeight: "100vh", overflowX: "hidden", transition: "background .4s, color .4s" }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:${T.bg}}
        ::-webkit-scrollbar-thumb{background:${A};border-radius:2px}

        .nl{color:${T.muted};font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:color .22s;font-family:'Barlow Condensed',sans-serif}
        .nl:hover{color:${A}}

        .cp{clip-path:polygon(14px 0%,100% 0%,calc(100% - 14px) 100%,0% 100%)}

        .bp{background:${A};color:#fff;border:none;padding:15px 46px;font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:3px;cursor:pointer;transition:transform .18s,filter .18s;white-space:nowrap}
        .bp:hover{transform:scale(1.04);filter:brightness(1.12)}

        .bg{background:transparent;color:${T.text};border:1.5px solid ${T.border};padding:14px 46px;font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:3px;cursor:pointer;transition:border-color .22s,color .22s;white-space:nowrap}
        .bg:hover{border-color:${A};color:${A}}

        .ch{transition:transform .32s,box-shadow .32s;cursor:pointer}
        .ch:hover{transform:translateY(-10px) scale(1.016);box-shadow:0 30px 72px rgba(0,0,0,.32)}

        .mq{display:flex;gap:64px;animation:mqr 22s linear infinite;white-space:nowrap}
        @keyframes mqr{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        @keyframes float{0%,100%{transform:translateY(0) scale(1.02)}50%{transform:translateY(-24px) scale(1)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.2}50%{opacity:.65}}

        .simg{animation:float 5s ease-in-out infinite;filter:drop-shadow(0 40px 90px ${S.glow});transition:filter .5s}

        .gl{background-image:linear-gradient(${T.border} 1px,transparent 1px),linear-gradient(90deg,${T.border} 1px,transparent 1px);background-size:72px 72px;opacity:.2;pointer-events:none}

        @media(max-width:900px){
          .col-g{grid-template-columns:repeat(2,1fr)!important}
          .feat-g{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:768px){
          .hr{flex-direction:column!important;padding-top:90px!important}
          .hm{display:none!important}
          .sp{width:100%!important;height:320px!important;margin-top:16px}
          .sg{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:480px){
          .col-g{grid-template-columns:1fr!important}
          .feat-g{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ════════════════════════════════════
          NAVBAR
      ════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
        height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%",
        background: scrolled ? T.navBg : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        transition: "all .35s",
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <Logo accent={A} bg={dark ? "#080808" : "#F3F2EE"} />
          <span style={{ fontSize: 22, letterSpacing: 4 }}>APEXKICK</span>
        </div>

        {/* Desktop nav */}
        <div className="hm" style={{ display: "flex", gap: 40 }}>
          {NAV_LINKS.map(l => <span key={l} className="nl">{l}</span>)}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Toggle */}
          <button onClick={() => setDark(!dark)} aria-label="Toggle theme" style={{
            background: T.card, border: `1px solid ${T.border}`, borderRadius: 40,
            width: 52, height: 26, cursor: "pointer", position: "relative", transition: "background .3s",
          }}>
            <div style={{
              position: "absolute", top: 3, left: dark ? 27 : 3,
              width: 20, height: 20, borderRadius: "50%", background: A,
              transition: "left .3s", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}>
              {dark ? <IcSun /> : <IcMoon />}
            </div>
          </button>

          {/* Cart */}
          <button className="hm" style={{
            background: "transparent", border: `1.5px solid ${T.border}`, color: T.text,
            padding: "7px 18px", borderRadius: 3, fontFamily: "'Barlow',sans-serif",
            fontWeight: 600, fontSize: 12, letterSpacing: 2, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8, transition: "border-color .2s,color .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
          >
            <IcCart /> Cart (0)
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{
              background: "transparent", border: "none", cursor: "pointer", padding: 4,
              display: "none", flexDirection: "column", gap: 5,
            }}
            className="ham"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2, background: T.text, borderRadius: 2,
                transition: "transform .3s,opacity .3s",
                transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>
      <style>{`@media(max-width:768px){.ham{display:flex!important}}`}</style>

      {/* Mobile drawer */}
      <div style={{
        position: "fixed", top: 68, left: 0, right: 0, zIndex: 299,
        background: T.surf, borderBottom: `1px solid ${T.border}`,
        maxHeight: menuOpen ? 380 : 0, overflow: "hidden",
        transition: "max-height .4s cubic-bezier(.16,1,.3,1)",
        padding: menuOpen ? "20px 5% 30px" : "0 5%",
      }}>
        {NAV_LINKS.map((l, i) => (
          <div key={l} onClick={() => setMenuOpen(false)} style={{
            padding: "13px 0",
            borderBottom: i < NAV_LINKS.length - 1 ? `1px solid ${T.border}` : "none",
            fontSize: 34, cursor: "pointer", transition: "color .2s", color: T.text,
          }}
            onMouseEnter={e => e.target.style.color = A}
            onMouseLeave={e => e.target.style.color = T.text}>
            {l}
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", padding: "68px 5% 0", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Grid */}
        <div className="gl" style={{ position: "absolute", inset: 0 }} />

        {/* Glow orb */}
        <div style={{
          position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)",
          width: 640, height: 640, borderRadius: "50%",
          background: `radial-gradient(circle,${S.glow} 0%,transparent 68%)`,
          pointerEvents: "none", transition: "background .65s",
        }} />

        <div className="hr" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 32, position: "relative", zIndex: 2 }}>

          {/* LEFT */}
          <div style={{ flex: 1, maxWidth: 640 }}>
            {/* Eyebrow */}
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase",
              color: A, marginBottom: 22, fontFamily: "'Barlow Condensed',sans-serif",
              display: "flex", alignItems: "center", gap: 12,
              opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(16px)",
              transition: "all .55s .06s",
            }}>
              <span style={{ width: 28, height: 1, background: A, display: "inline-block" }} />
              NEW DROP — SS 2025
            </div>

            {/* Main title */}
            <h1 style={{
              fontSize: "clamp(64px,11vw,152px)", fontWeight: 400, lineHeight: .86,
              letterSpacing: "-1px", textTransform: "uppercase",
              opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(55px)",
              transition: "all .88s cubic-bezier(.16,1,.3,1) .14s",
            }}>
              <span style={{ color: A }}>{S.name.split(" ").slice(0, 2).join(" ")}<br /></span>
              <span>{S.name.split(" ").slice(2).join(" ")}</span>
            </h1>

            {/* Sub */}
            <p style={{
              marginTop: 22, fontSize: 15, fontWeight: 300, lineHeight: 1.82, color: T.muted,
              maxWidth: 400, fontFamily: "'Barlow',sans-serif",
              opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(20px)",
              transition: "all .65s .4s",
            }}>
              Engineered for those who refuse limits. Every stitch, every sole —
              crafted for dominance on any court, any street, any surface.
            </p>

            {/* CTAs */}
            <div style={{
              display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap",
              opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(20px)",
              transition: "all .65s .54s",
            }}>
              <button className="bp cp">Shop Now</button>
              <button className="bg cp" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                View Collection <IcArrow />
              </button>
            </div>

            {/* Colorway dots */}
            <div style={{
              marginTop: 44, display: "flex", alignItems: "center", gap: 18,
              opacity: heroIn ? 1 : 0, transition: "opacity .5s .7s",
            }}>
              <span style={{ fontSize: 9, letterSpacing: 4, color: T.muted, textTransform: "uppercase", fontFamily: "'Barlow Condensed',sans-serif" }}>Colorway</span>
              {HERO_SHOES.map((s, i) => (
                <button key={s.id} onClick={() => setActive(i)} style={{
                  width: 26, height: 26, borderRadius: "50%", background: s.color,
                  border: "none", cursor: "pointer",
                  outline: active === i ? `2.5px solid ${s.color}` : "none", outlineOffset: 4,
                  transform: active === i ? "scale(1.3)" : "scale(1)",
                  transition: "transform .22s,outline .22s,box-shadow .22s",
                  boxShadow: active === i ? `0 0 18px ${s.glow}` : "none",
                }} />
              ))}
            </div>
          </div>

          {/* RIGHT — shoe image */}
          <div className="sp" style={{
            width: "46%", height: "84vh", position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateX(72px)",
            transition: "all .95s cubic-bezier(.16,1,.3,1) .22s",
          }}>
            {/* Decorative rings */}
            <div style={{ position: "absolute", width: "72%", aspectRatio: "1", borderRadius: "50%", border: `1px solid ${A}20`, animation: "spin 28s linear infinite" }} />
            <div style={{ position: "absolute", width: "52%", aspectRatio: "1", borderRadius: "50%", border: `1px dashed ${A}40`, animation: "spin 15s linear infinite reverse" }} />

            {/* Actual shoe photo */}
            <img
              className="simg"
              src={S.img}
              alt={S.name}
              style={{
                width: "88%", maxWidth: 510,
                objectFit: "contain",
                borderRadius: 10,
                position: "relative", zIndex: 3,
              }}
            />

            {/* Price */}
            <div style={{
              position: "absolute", bottom: "8%", right: "2%",
              background: A, color: "#fff", padding: "12px 26px",
              fontFamily: "'Bebas Neue',sans-serif", fontSize: 30, letterSpacing: 3,
              clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
              zIndex: 4, boxShadow: `0 8px 36px ${S.glow}`,
            }}>
              {S.price}
            </div>

            {/* Tagline */}
            <div style={{
              position: "absolute", top: "9%", left: "0",
              background: T.card, border: `1px solid ${T.border}`,
              padding: "10px 22px", fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 10, fontWeight: 800, letterSpacing: 5, textTransform: "uppercase", color: A,
              zIndex: 4,
            }}>
              {S.tagline}
            </div>

            {/* Badge */}
            <div style={{
              position: "absolute", top: "9%", right: "6%",
              background: A, color: "#fff", padding: "6px 16px",
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 9, fontWeight: 900, letterSpacing: 4, textTransform: "uppercase",
              borderRadius: 2, zIndex: 4,
            }}>
              {S.badge}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: .4 }}>
          <span style={{ fontSize: 8, letterSpacing: 4, textTransform: "uppercase", fontFamily: "'Barlow Condensed',sans-serif" }}>Scroll</span>
          <div style={{ width: 1, height: 44, background: `linear-gradient(${T.muted},transparent)`, animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ════════════════════════════════════
          TICKER
      ════════════════════════════════════ */}
      <div style={{ background: A, padding: "15px 0", overflow: "hidden", display: "flex" }}>
        <div className="mq">
          {Array(12).fill(["FREE WORLDWIDE SHIPPING", "—", "LIMITED EDITION", "—", "NEW DROP LIVE", "—", "PREMIUM CRAFTSMANSHIP", "—"]).flat().map((t, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 800, letterSpacing: 5, textTransform: "uppercase", color: "#fff", opacity: t === "—" ? .4 : 1, fontFamily: "'Barlow Condensed',sans-serif" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          COLLECTION
      ════════════════════════════════════ */}
      <section style={{ padding: "110px 5%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 6, color: A, fontWeight: 800, textTransform: "uppercase", marginBottom: 16, fontFamily: "'Barlow Condensed',sans-serif", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: 1, background: A, display: "inline-block" }} />Featured
            </div>
            <h2 style={{ fontSize: "clamp(44px,7vw,96px)", lineHeight: .88, textTransform: "uppercase" }}>
              THE<br /><span style={{ color: A }}>COLLECTION</span>
            </h2>
          </div>
          <button className="bg cp" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            View All <IcArrow />
          </button>
        </div>

        <div className="col-g" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {COLLECTION.map((s, i) => (
            <div key={i} className="ch" style={{ background: T.card, border: `1px solid ${T.border}`, overflow: "hidden" }}>
              {/* Image */}
              <div style={{ height: 230, overflow: "hidden", background: T.surf, position: "relative" }}>
                <img
                  src={s.img} alt={s.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s", display: "block" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${T.card}bb 0%,transparent 55%)` }} />
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: s.color, color: "#fff", padding: "4px 12px",
                  fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase",
                  fontFamily: "'Barlow Condensed',sans-serif",
                }}>
                  {s.category}
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: "22px 22px 26px" }}>
                <div style={{ fontSize: 19, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{s.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 24, color: s.color }}>{s.price}</span>
                  <button style={{
                    background: s.color, border: "none", color: "#fff",
                    padding: "9px 18px", fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 800, fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                    cursor: "pointer", clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                    transition: "filter .2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.15)"}
                    onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
                  >Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          STATS
      ════════════════════════════════════ */}
      <section ref={statsRef} style={{ background: T.surf, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "90px 5%" }}>
        <div className="sg" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40, textAlign: "center" }}>
          {[
            { val: counts.pairs.toLocaleString() + "+", label: "Pairs Sold Worldwide" },
            { val: counts.athletes + "+", label: "Pro Athletes" },
            { val: counts.countries + "", label: "Countries Reached" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: "clamp(44px,7vw,90px)", color: A, lineHeight: 1, letterSpacing: 2, transition: "color .4s" }}>{s.val}</div>
              <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: T.muted, marginTop: 12, fontFamily: "'Barlow Condensed',sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          FEATURES
      ════════════════════════════════════ */}
      <section style={{ padding: "110px 5%" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ fontSize: 10, letterSpacing: 6, color: A, fontWeight: 800, textTransform: "uppercase", marginBottom: 18, fontFamily: "'Barlow Condensed',sans-serif" }}>Technology</div>
          <h2 style={{ fontSize: "clamp(40px,6vw,90px)", textTransform: "uppercase", lineHeight: .9 }}>
            BUILT <span style={{ color: A }}>DIFFERENT</span>
          </h2>
        </div>
        <div className="feat-g" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
          {[
            {
              icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
              title: "ReactFoam Sole",
              desc: "87% energy return with every step. Our patented compression foam outlasts every competitor.",
            },
            {
              icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
              title: "AerShield Upper",
              desc: "Full-grain leather fused with micro-mesh panels — maximum protection, zero heat buildup.",
            },
            {
              icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="10" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /></svg>,
              title: "PrecisionFit",
              desc: "Anatomical insole maps your foot's natural arch. Zero break-in period, instant comfort.",
            },
            {
              icon: <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2.5 2v6h6M21.5 22v-6h-6" /><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" /></svg>,
              title: "Eco Crafted",
              desc: "30% recycled materials. Zero-waste packaging. Full carbon offset on every order shipped.",
            },
          ].map(f => (
            <div key={f.title} style={{
              background: T.card, padding: "48px 28px", borderLeft: `3px solid ${A}`,
              transition: "background .25s", cursor: "default",
            }}
              onMouseEnter={e => e.currentTarget.style.background = `${A}12`}
              onMouseLeave={e => e.currentTarget.style.background = T.card}
            >
              <div style={{ color: A, marginBottom: 22 }}>{f.icon}</div>
              <div style={{ fontSize: 18, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>{f.title}</div>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: T.muted, fontFamily: "'Barlow',sans-serif" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          LIFESTYLE BANNER
      ════════════════════════════════════ */}
      <section style={{ margin: "0 5%", position: "relative", height: 500, overflow: "hidden", borderRadius: 4 }}>
        <img
          src="https://plus.unsplash.com/premium_photo-1664304770925-6f9a1386d7b9?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Athlete in action"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.22) 60%,transparent 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "5%", transform: "translateY(-50%)" }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: A, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, marginBottom: 16 }}>THE ATHLETE SERIES</div>
          <h3 style={{ fontSize: "clamp(34px,5vw,72px)", color: "#fff", lineHeight: .9, marginBottom: 30 }}>
            PERFORMANCE<br />WITHOUT<br />COMPROMISE
          </h3>
          <button className="bp cp">Explore Series</button>
        </div>
      </section>

      {/* ════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════ */}
      <section style={{ background: T.surf, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "110px 5%", marginTop: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 10, letterSpacing: 6, color: A, fontWeight: 800, textTransform: "uppercase", marginBottom: 18, fontFamily: "'Barlow Condensed',sans-serif" }}>Reviews</div>
          <h2 style={{ fontSize: "clamp(40px,6vw,88px)", textTransform: "uppercase", lineHeight: .9 }}>
            THEY SAID <span style={{ color: A }}>IT</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {[
            { name: "Marcus T.", role: "NBA Guard", text: "These are the only kicks I wear on court. The grip and cushion is on another level — nothing else compares." },
            { name: "Zara K.", role: "Olympic Sprinter", text: "Shaved 0.4 seconds off my sprint time since switching. The foam technology is genuinely incredible." },
            { name: "Dom R.", role: "Sneaker Curator", text: "Finest materials I have ever handled. The leather ages beautifully and the stitching is absolutely immaculate." },
          ].map(r => (
            <div key={r.name} style={{ background: T.card, border: `1px solid ${T.border}`, padding: "36px 30px" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 20, color: A }}>
                {[...Array(5)].map((_, i) => <IcStar key={i} />)}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: T.muted, fontFamily: "'Barlow',sans-serif", marginBottom: 28 }}>
                "{r.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", background: A,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, color: "#fff", letterSpacing: 1,
                }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, fontFamily: "'Barlow Condensed',sans-serif" }}>{r.name}</div>
                  <div style={{ fontSize: 10, color: T.muted, letterSpacing: 3, marginTop: 4, fontFamily: "'Barlow Condensed',sans-serif" }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA
      ════════════════════════════════════ */}
      <section style={{ padding: "130px 5%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center,${A}18 0%,transparent 62%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, letterSpacing: 6, color: A, fontWeight: 800, textTransform: "uppercase", marginBottom: 22, fontFamily: "'Barlow Condensed',sans-serif" }}>Limited Drop</div>
          <h2 style={{ fontSize: "clamp(52px,11vw,140px)", textTransform: "uppercase", lineHeight: .84, marginBottom: 36 }}>
            DON'T<br /><span style={{ color: A }}>SLEEP</span><br />ON IT
          </h2>
          <p style={{ color: T.muted, fontSize: 15, maxWidth: 400, margin: "0 auto 48px", lineHeight: 1.8, fontFamily: "'Barlow',sans-serif" }}>
            Join 120,000+ sneakerheads who get early access to every drop, exclusive colourways and member-only pricing.
          </p>
          <div style={{ display: "flex", maxWidth: 460, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input type="email" placeholder="your@email.com" style={{
              flex: 1, minWidth: 200, padding: "16px 20px",
              background: T.card, border: `1.5px solid ${T.border}`, borderRight: "none",
              color: T.text, fontFamily: "'Barlow',sans-serif", fontSize: 14, outline: "none",
            }} />
            <button className="bp" style={{ clipPath: "none", borderRadius: 0 }}>Get Early Access</button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
      ════════════════════════════════════ */}
      <footer style={{ background: T.surf, borderTop: `1px solid ${T.border}`, padding: "72px 5% 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 48, marginBottom: 60 }}>
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <Logo accent={A} bg={dark ? "#101010" : "#FFFFFF"} />
              <span style={{ fontSize: 20, letterSpacing: 4 }}>APEXKICK</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: T.muted, fontFamily: "'Barlow',sans-serif" }}>
              Born on the court.<br />Built for the streets.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              {[
                <svg key="ig" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>,
                <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>,
                <svg key="yt" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" /></svg>,
              ].map((ic, i) => (
                <div key={i} style={{
                  width: 34, height: 34, border: `1px solid ${T.border}`, borderRadius: 3,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.muted, cursor: "pointer", transition: "border-color .2s,color .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = A; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
                  {ic}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: "Shop", links: ["New Arrivals", "Men", "Women", "Kids", "Sale", "Collabs"] },
            { title: "Company", links: ["About Us", "Careers", "Press", "Sustainability", "Investors"] },
            { title: "Support", links: ["FAQ", "Shipping Info", "Returns", "Size Guide", "Track Order"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 5, textTransform: "uppercase", marginBottom: 22, color: A, fontFamily: "'Barlow Condensed',sans-serif" }}>{col.title}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize: 13, color: T.muted, marginBottom: 13, cursor: "pointer", fontFamily: "'Barlow',sans-serif", transition: "color .18s" }}
                  onMouseEnter={e => e.target.style.color = A}
                  onMouseLeave={e => e.target.style.color = T.muted}>
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 11, color: T.muted, fontFamily: "'Barlow',sans-serif" }}>© 2025 ApexKick Inc. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(l => (
              <span key={l} style={{ fontSize: 11, color: T.muted, cursor: "pointer", fontFamily: "'Barlow',sans-serif", transition: "color .18s" }}
                onMouseEnter={e => e.target.style.color = A}
                onMouseLeave={e => e.target.style.color = T.muted}>{l}</span>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}