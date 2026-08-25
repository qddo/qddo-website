/* global React */
const { useState, useEffect, useRef } = React;

// === Logo — official horizontal white wordmark ===
function QddoLogo({ width = 64 }) {
  return (
    <img
      src="assets/logo-horizontal-white.png"
      alt="QDDO Central Hub"
      width={width}
      style={{
        width: width,
        height: "auto",
        display: "block",
        userSelect: "none",
      }}
      draggable="false"
    />
  );
}

// === Section wrapper with eyebrow ===
function SectionHeader({ eyebrow, title, lede, align = "left", maxTitle = "16ch" }) {
  return (
    <div style={{
      display: "grid",
      gap: 28,
      textAlign: align,
      justifyItems: align === "center" ? "center" : "start",
      maxWidth: align === "center" ? 880 : 920,
      margin: align === "center" ? "0 auto" : undefined,
      marginBottom: 56
    }}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2 className="h-display" style={{margin:0, fontSize:"var(--text-display-lg)", maxWidth: maxTitle, paddingBottom: "0.12em"}} dangerouslySetInnerHTML={{__html: title}} />}
      {lede && <p className="lede" style={{margin:0, marginTop: 4}}>{lede}</p>}
    </div>
  );
}

// === Reveal on scroll ===
function Reveal({ children, delay = 0, as: Tag = "div", style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          io.disconnect();
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className="reveal" style={style}>{children}</Tag>;
}

// === Photo placeholder (B&W, organic) ===
function PhotoPlaceholder({ aspect = "4/3", label = "foto · b&w", radius = "var(--r-lg)", style, dense = false }) {
  // Editorial B&W placeholder using CSS only — geometric figure suggesting a person/space
  return (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: aspect,
      borderRadius: radius,
      overflow: "hidden",
      background: `
        radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.10), transparent 60%),
        radial-gradient(80% 60% at 80% 90%, rgba(255,255,255,0.05), transparent 60%),
        linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)
      `,
      border: "1px solid var(--border-subtle)",
      ...style
    }}>
      {/* simulated subject silhouette */}
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{position:"absolute", inset:0, width:"100%", height:"100%", opacity: dense ? 0.6 : 0.42}}>
        <defs>
          <linearGradient id="ph" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02"/>
          </linearGradient>
        </defs>
        <circle cx="280" cy="120" r="55" fill="url(#ph)"/>
        <path d="M180 300 Q 200 200 280 200 Q 360 200 380 300 Z" fill="url(#ph)"/>
        <rect x="20" y="240" width="120" height="60" fill="url(#ph)" />
        <line x1="0" y1="240" x2="400" y2="240" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1"/>
      </svg>
      <span style={{
        position:"absolute", left:14, bottom:12,
        fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase",
        color: "rgba(255,255,255,0.5)"
      }}>{label}</span>
      <span style={{
        position:"absolute", right:14, top:12,
        width: 8, height: 8, borderRadius: "50%", background: "var(--accent)"
      }}></span>
    </div>
  );
}

// === Metric card ===
function Metric({ value, label, sub, accent = false }) {
  return (
    <div style={{
      padding: "28px 24px",
      borderTop: "1px solid var(--border-subtle)",
      display: "grid",
      gap: 10,
      minHeight: 168,
      position: "relative"
    }}>
      <span className="mono" style={{fontSize: 11, letterSpacing:"0.12em", textTransform:"uppercase", color: "var(--text-tertiary)"}}>{label}</span>
      <span className="serif" style={{
        fontSize: "clamp(2.5rem, 1.6rem + 3vw, 4.25rem)",
        lineHeight: 0.95,
        letterSpacing: "-0.03em",
        color: accent ? "var(--accent)" : "var(--text-primary)"
      }}>{value}</span>
      {sub && <span style={{fontSize: 14, color: "var(--text-tertiary)", maxWidth: "26ch"}}>{sub}</span>}
    </div>
  );
}

Object.assign(window, { QddoLogo, SectionHeader, Reveal, PhotoPlaceholder, Metric });
