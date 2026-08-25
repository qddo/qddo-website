/* global React, Lenis, gsap, ScrollTrigger */
/* QDDO · Vorszk Edition — Core primitives */

const { useState: cuS, useEffect: cuE, useRef: cuR, useLayoutEffect: cuL } = React;

// ============================================================
// SCROLL ENGINE — Lenis smooth scroll + GSAP ScrollTrigger
// (mirrors Vorszk's stack: Lenis + GSAP)
// ============================================================
let __qdScrollReady = false;
function ScrollEngine() {
  cuE(() => {
    if (typeof window === "undefined") return;
    if (!window.gsap || !window.ScrollTrigger || !window.Lenis) {
      // Libraries didn't load — gracefully fallback to plain IntersectionObserver elsewhere
      console.warn("[QDDO] Lenis/GSAP not available — using IO fallback");
      return;
    }
    window.gsap.registerPlugin(window.ScrollTrigger);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      __qdScrollReady = true;
      window.dispatchEvent(new Event("qd:scroll-ready"));
      return;
    }

    const lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
    });
    window.__qdLenis = lenis;

    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add((time) => lenis.raf(time * 1000));
    window.gsap.ticker.lagSmoothing(0);

    __qdScrollReady = true;
    window.dispatchEvent(new Event("qd:scroll-ready"));

    // Refresh after fonts/loader
    setTimeout(() => window.ScrollTrigger.refresh(), 1700);

    // Pause Lenis during overlay menu open (body has overflow:hidden)
    const obs = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      obs.disconnect();
      lenis.destroy();
      window.ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
  return null;
}

// Helper used by FadeIn / RevealText: attaches a scroll trigger that
// adds an `.in` class when the element enters the viewport.
function qdAttachTrigger(el, opts = {}) {
  if (!el) return () => {};
  const start = opts.start || "top 86%";
  if (window.gsap && window.ScrollTrigger) {
    const st = window.ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => el.classList.add("in"),
    });
    return () => st.kill();
  }
  // Fallback: IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        el.classList.add("in");
        io.disconnect();
      }
    });
  }, { threshold: opts.ioThreshold || 0.15, rootMargin: opts.ioRootMargin || "0px 0px -10% 0px" });
  io.observe(el);
  return () => io.disconnect();
}

// ============================================================
// SPOTLIGHT CURSOR — canvas de tela cheia com um foco de luz
// que segue o ponteiro com amortecimento. Renderiza em meia
// resolução (o gradiente é suave, não precisa de DPR) e dorme
// quando o foco alcança o alvo.
// ============================================================
function SpotlightCursor({ radius = 320, brightness = 0.13, smoothing = 0.32 }) {
  const ref = cuR(null);

  cuE(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (matchMedia("(pointer: coarse)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const SCALE = 0.5; // meia resolução: barato e ainda liso
    let w = 0, h = 0, sx = SCALE, sy = SCALE, raf = 0, visible = false, last = 0;
    const spot = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    // Mede pelo próprio canvas (fixed inset:0), não por innerWidth: o
    // observer abaixo dispara mesmo quando o evento resize não vem.
    const resize = () => {
      const cw = canvas.clientWidth || innerWidth || 1;
      const ch = canvas.clientHeight || innerHeight || 1;
      w = Math.max(1, Math.ceil(cw * SCALE));
      h = Math.max(1, Math.ceil(ch * SCALE));
      canvas.width = w;
      canvas.height = h;
      sx = w / cw; sy = h / ch;
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      if (!visible) return;
      const x = spot.x * sx, y = spot.y * sy, r = radius * sx;
      // halo largo
      let g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(255,255,255,${brightness})`);
      g.addColorStop(0.45, `rgba(255,255,255,${brightness * 0.35})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // núcleo quente, bem menor
      g = ctx.createRadialGradient(x, y, 0, x, y, r * 0.28);
      g.addColorStop(0, `rgba(255,255,255,${brightness * 0.9})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    // `smoothing` é a fração da distância comida em um frame de 60fps.
    // O dt corrige isso: em 144Hz a luz não fica mais rápida, e depois de
    // um engasgo do rAF ela não dá um salto seco.
    const tick = (now) => {
      const dt = last ? Math.min(64, now - last) : 16.667;
      last = now;
      const dx = spot.tx - spot.x, dy = spot.ty - spot.y;
      const dist = Math.hypot(dx, dy);
      const base = 1 - Math.pow(1 - smoothing, dt / 16.667);
      // salto grande cola mais rápido; movimento curto mantém a maciez
      const k = Math.min(1, base * (1 + dist / 900));
      spot.x += dx * k;
      spot.y += dy * k;
      paint();
      // dorme quando assentou; o próximo pointermove reacende
      if (dist < 0.3) { raf = 0; last = 0; return; }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onMove = (e) => {
      if (!visible) { // primeiro movimento: nasce já embaixo do ponteiro
        visible = true;
        spot.x = e.clientX; spot.y = e.clientY;
        spot.tx = e.clientX; spot.ty = e.clientY;
        paint(); // acende no mesmo tick, sem esperar frame
        return;
      }
      spot.tx = e.clientX; spot.ty = e.clientY;
      wake();
    };
    const onOut = (e) => {
      if (e.relatedTarget || e.toElement) return;
      visible = false;
      paint();
    };
    const onResize = () => { resize(); paint(); };

    resize();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    if (ro) ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onOut);
    window.addEventListener("resize", onResize);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [radius, brightness, smoothing]);

  return <canvas className="qd-spotlight" ref={ref} aria-hidden="true"></canvas>;
}

// ============================================================
// ASCII ART — fundo vivo em caracteres, no lugar do vídeo enquanto
// o slot está vazio. Campo de senos sobrepostos escorrendo devagar
// (o "sky wash"), em monoespaçada, mais denso em cima.
// Barato de propósito: um `fillText` por LINHA, não por caractere —
// a monoespaçada alinha as colunas sozinha, então uma tela de
// 120x40 custa 40 chamadas por frame em vez de 4.800.
// Cor, fonte e opacidade vêm do CSS (.qd-ascii), não daqui.
// ============================================================
const QD_ASCII_RAMP = " .·:-=+*#%@";

// `esc` = escala do buffer: o canvas guarda metade dos pixels e o CSS
// amplia. São 4x menos pixels para compor a cada frame, e a 7% de
// opacidade a suavidade extra não aparece.
function AsciiArt({ className = "", cell = 13, fps = 18, speed = 1, esc = 0.5 }) {
  const ref = cuR(null);

  cuE(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rampa = QD_ASCII_RAMP;
    const fim = rampa.length - 1;
    const linhaH = cell * 1.55 * esc;
    let w = 0, h = 0, cols = 0, rows = 0, raf = 0, anterior = 0, t = 0, visivel = true;

    const medir = () => {
      const cs = getComputedStyle(canvas);
      w = canvas.width = Math.max(1, Math.round(canvas.clientWidth * esc));
      h = canvas.height = Math.max(1, Math.round(canvas.clientHeight * esc));
      ctx.font = (cell * esc) + "px " + (cs.fontFamily || "monospace");
      ctx.fillStyle = cs.color;
      ctx.textBaseline = "top";
      // avanço real do glifo na fonte carregada, não um palpite de 0.6em
      const avanco = ctx.measureText("M").width || cell * esc * 0.6;
      cols = Math.ceil(w / avanco) + 2;
      rows = Math.ceil(h / linhaH) + 1;
    };

    const campo = (c, r, tt) => {
      const x = c * 0.11, y = r * 0.17;
      let v = Math.sin(x + tt) + Math.sin(y * 0.9 - tt * 0.7) + Math.sin((x + y) * 0.6 + tt * 0.45);
      v = (v / 3 + 1) / 2;                       // 0..1
      const wash = 1 - r / Math.max(1, rows);    // escorre para o rodapé
      return Math.pow(v, 1.35) * (0.3 + 0.8 * wash);
    };

    const pinta = () => {
      ctx.clearRect(0, 0, w, h);
      for (let r = 0; r < rows; r++) {
        let linha = "";
        for (let c = 0; c < cols; c++) {
          const i = Math.round(campo(c, r, t) * fim);
          linha += rampa[i < 0 ? 0 : i > fim ? fim : i];
        }
        ctx.fillText(linha, 0, r * linhaH);
      }
    };

    const intervalo = 1000 / fps;
    const tick = (agora) => {
      raf = requestAnimationFrame(tick);
      if (agora - anterior < intervalo) return;   // teto de fps
      anterior = agora;
      t += 0.045 * speed;
      pinta();
    };

    medir();
    pinta();
    if (!reduz) raf = requestAnimationFrame(tick);

    const onResize = () => { medir(); pinta(); };
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    if (ro) ro.observe(canvas);
    // fora da tela não precisa girar: o loop dorme e volta ao entrar
    const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((es) => {
      es.forEach((e) => {
        visivel = e.isIntersecting;
        if (reduz) return;
        if (visivel && !raf) raf = requestAnimationFrame(tick);
        if (!visivel && raf) { cancelAnimationFrame(raf); raf = 0; }
      });
    }, { rootMargin: "10% 0px" }) : null;
    if (io) io.observe(canvas);
    window.addEventListener("resize", onResize);

    return () => {
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cell, fps, speed]);

  return <canvas ref={ref} className={"qd-ascii" + (className ? " " + className : "")} aria-hidden="true"></canvas>;
}

// ============================================================
// CUSTOM CURSOR — só a bolinha branca (sem anel) + spotlight
// ============================================================
function CustomCursor() {
  const dotRef = cuR(null);

  cuE(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const onOver = (e) => {
      const el = e.target.closest("a, button, [data-cursor='hover'], .qd-num-row, [role='tab']");
      const text = e.target.closest("input, textarea, [data-cursor='text']");
      let state = "";
      if (text) state = "text";
      else if (el) state = "hover";
      if (dotRef.current) dotRef.current.dataset.state = state;
    };
    const onLeave = () => {
      if (dotRef.current) dotRef.current.dataset.state = "";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <>
      <SpotlightCursor />
      <div className="qd-cursor" ref={dotRef}></div>
    </>
  );
}

// ============================================================
// LOADER — brief intro with counter
// ============================================================
// Quatro cubos isométricos girando em ciclo (o "3D box loader").
// Não é contador nem barra falsa: ele fica no ar enquanto as imagens
// da abertura carregam e sai quando elas resolvem, por load OU por
// erro (no protótipo os slots podem estar vazios). MIN evita piscada,
// MAX garante que um asset pendurado não prenda a tela.
const QD_LOADER_MIN = 700;
const QD_LOADER_MAX = 4000;
const QD_LOADER_ASSETS = ["assets/media/intro-bg.jpg", "assets/media/intro-fg.png"];

function Loader() {
  const [out, setOut] = cuS(false);

  cuE(() => {
    const t0 = performance.now();
    let done = false;
    let saida = 0;
    const finish = () => {
      if (done) return;
      done = true;
      const espera = Math.max(0, QD_LOADER_MIN - (performance.now() - t0));
      saida = setTimeout(() => setOut(true), espera);
    };
    let faltam = QD_LOADER_ASSETS.length;
    const conta = () => { if (--faltam <= 0) finish(); };
    QD_LOADER_ASSETS.forEach((src) => {
      const img = new Image();
      // handlers antes do src: imagem em cache também dispara load
      img.onload = conta;
      img.onerror = conta;
      img.src = src;
    });
    const guarda = setTimeout(finish, QD_LOADER_MAX);
    return () => { clearTimeout(guarda); clearTimeout(saida); };
  }, []);

  return (
    <div className={"qd-loader" + (out ? " out" : "")} role="status" aria-label="Carregando">
      <div className="qd-boxes" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div className="box" key={i}>
            <div></div><div></div><div></div><div></div>
          </div>
        ))}
      </div>
      <p className="qd-loader-line">
        loading your founder journey
        <span className="qd-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      </p>
    </div>
  );
}

// ============================================================
// MENU TOGGLE — dois traços que viram X. A espessura vem por
// prop (strokeWidth) e vira a var --mt-w do stroke.
// ============================================================
function MenuToggle({ open = false, onOpenChange, strokeWidth = 2, className = "" }) {
  return (
    <button type="button"
      className={"qd-menutoggle qd-grow" + (open ? " on" : "") + (className ? " " + className : "")}
      onClick={() => onOpenChange && onOpenChange(!open)}
      data-cursor="hover"
      aria-expanded={open}
      aria-controls="qd-dropmenu"
      aria-label={open ? "Fechar menu" : "Abrir menu"}>
      <svg viewBox="0 0 24 24" aria-hidden="true" style={{ "--mt-w": strokeWidth }}>
        <line className="t" x1="3.5" y1="9" x2="20.5" y2="9" />
        <line className="b" x1="3.5" y1="15" x2="20.5" y2="15" />
      </svg>
    </button>
  );
}

// ============================================================
// MENU WORD — rótulo do dropdown letra a letra. As letras entram
// em cascata quando o menu abre e, no hover, sobem em onda a
// partir do centro da palavra (center) ou da primeira letra.
// Quebra por palavra: cada palavra é um bloco que não racha.
// ============================================================
function MenuWord({ text = "", center = true, className = "" }) {
  const full = String(text);
  const mid = (full.length - 1) / 2;
  let cursor = 0;
  const words = full.split(" ").map((w) => {
    const start = cursor;
    cursor += w.length + 1;
    return { w, start };
  });
  return (
    <span className={"qd-mword" + (className ? " " + className : "")} aria-label={full}>
      {words.map(({ w, start }, wi) => (
        <span className="wd" key={wi}>
          {w.split("").map((ch, j) => (
            <span className="ch" key={j} aria-hidden="true"
              style={{ "--j": start + j, "--k": center ? Math.abs(start + j - mid) : start + j }}>
              <span className="gl">{ch}</span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

// ============================================================
// TOPBAR — chrome invisível: marca, CTA e o botão do menu.
// Sem pill, sem barra: só os elementos flutuando sobre a página.
// ============================================================
// Marca do topo. Os dois desenhos vêm inline, não como <img>, para
// herdarem `currentColor`: assim seguem respondendo ao hover e à
// inversão do tema claro, que o <img> não acompanharia.
// Fonte: assets/logo-horizontal.svg e assets/favicon.svg.
function BrandFull() {
  return (
    <svg className="qd-brand-full" viewBox="0 0 140 36" fill="currentColor"
      role="img" aria-hidden="true" focusable="false">
      <path d="M122.55,3.15c-8.34,0-15.12,6.78-15.12,15.12s6.78,15.12,15.12,15.12,15.12-6.78,15.12-15.12-6.78-15.12-15.12-15.12ZM122.55,28.96c-5.9,0-10.69-4.8-10.69-10.69s4.8-10.69,10.69-10.69,10.69,4.8,10.69,10.69-4.8,10.69-10.69,10.69Z"/>
      <path d="M63.75,7.59c-2.74-2.74-6.52-4.44-10.69-4.44-8.34,0-15.12,6.78-15.12,15.12s6.78,15.12,15.12,15.12,15.12-6.78,15.12-15.12c0-.43-.02-.85-.05-1.27h.05V3.15h-4.42v4.44ZM53.06,28.96c-5.9,0-10.69-4.8-10.69-10.69s4.8-10.69,10.69-10.69,10.69,4.8,10.69,10.69-4.8,10.69-10.69,10.69Z"/>
      <path d="M98.49,7.59c-2.74-2.74-6.52-4.44-10.69-4.44-8.34,0-15.12,6.78-15.12,15.12s6.78,15.12,15.12,15.12,15.12-6.78,15.12-15.12c0-.43-.02-.85-.05-1.27h.05V3.15h-4.43v4.44ZM87.8,28.96c-5.9,0-10.69-4.8-10.69-10.69s4.8-10.69,10.69-10.69,10.69,4.8,10.69,10.69-4.8,10.69-10.69,10.69Z"/>
      <path d="M25.01,25.83c-1.94,1.94-4.61,3.13-7.56,3.13-5.89,0-10.69-4.8-10.69-10.69s4.8-10.69,10.69-10.69,10.69,4.8,10.69,10.69c0,2.95-1.2,5.62-3.13,7.56.8-.8,1.91-1.3,3.13-1.3.99,0,1.9.33,2.64.87,1.14-2.13,1.79-4.55,1.79-7.13,0-8.34-6.78-15.12-15.12-15.12S2.33,9.93,2.33,18.27s6.78,15.12,15.12,15.12c2.58,0,5.01-.65,7.13-1.79-.55-.74-.87-1.65-.87-2.64,0-1.22.5-2.33,1.3-3.13Z"/>
      <path d="M30.78,25.4c-1.41,2.62-3.58,4.79-6.2,6.2.81,1.09,2.1,1.79,3.56,1.79,2.45,0,4.43-1.98,4.43-4.43,0-1.46-.7-2.75-1.79-3.56Z"/>
    </svg>
  );
}

function BrandMark() {
  return (
    <svg className="qd-brand-mark" viewBox="0 0 52 52" fill="currentColor"
      role="img" aria-hidden="true" focusable="false">
      <path d="M38.38,38.38c-3.17,3.17-7.55,5.14-12.39,5.14-9.66,0-17.52-7.86-17.52-17.52s7.86-17.52,17.52-17.52,17.52,7.86,17.52,17.52c0,4.83-1.96,9.21-5.14,12.39,1.32-1.31,3.13-2.13,5.14-2.13,1.62,0,3.12.53,4.33,1.43,1.87-3.49,2.93-7.46,2.93-11.69,0-13.66-11.11-24.77-24.78-24.77S1.22,12.33,1.22,25.99s11.11,24.78,24.77,24.78c4.23,0,8.2-1.06,11.69-2.93-.89-1.21-1.43-2.71-1.43-4.33,0-2,.81-3.82,2.13-5.14Z"/>
      <path d="M47.84,37.68c-2.31,4.3-5.86,7.85-10.16,10.16,1.32,1.78,3.44,2.94,5.83,2.94,4.01,0,7.26-3.25,7.26-7.26,0-2.39-1.15-4.51-2.94-5.83Z"/>
    </svg>
  );
}

function TopBar({ menuOpen, onMenuToggle }) {
  // Véu preto atrás do chrome, só a partir do hero: dali até o fim a
  // topbar corre sobre o preto do site, e o gradiente é o que segura o
  // contraste da logo e dos botões. Sobre a foto do intro ele fica
  // desligado (lá o drop-shadow já resolve).
  const [scrim, setScrim] = cuS(false);
  cuE(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    // ScrollTrigger e não listener de scroll: o Lenis é quem manda no
    // scroll aqui (`lenis.on("scroll", ScrollTrigger.update)`), então
    // pendurar no evento nativo sai do relógio do resto do site.
    // start "top top" = topo do hero no topo da tela; end "max" = fim da
    // página, para o véu ficar ligado dali até o rodapé.
    if (window.gsap && window.ScrollTrigger) {
      // Sem `onToggle`/`isActive`: no último pixel da página o progresso
      // chega a 1 e o ScrollTrigger deixa de estar "ativo", o que apagava
      // o véu justo no fim do rodapé. Liga na entrada e só desliga
      // voltando acima do hero; `progress > 0` cobre o refresh.
      const st = window.ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "max",
        onEnter: () => setScrim(true),
        onEnterBack: () => setScrim(true),
        onLeaveBack: () => setScrim(false),
        onRefresh: (self) => setScrim(self.progress > 0),
      });
      setScrim(st.progress > 0);
      return () => st.kill();
    }
    // Fallback sem GSAP: travessia calculada na mão
    let ligado = false;
    const checa = () => {
      const on = hero.getBoundingClientRect().top <= 0;
      if (on !== ligado) { ligado = on; setScrim(on); }
    };
    checa();
    window.addEventListener("scroll", checa, { passive: true });
    window.addEventListener("resize", checa);
    return () => {
      window.removeEventListener("scroll", checa);
      window.removeEventListener("resize", checa);
    };
  }, []);

  return (
    <>
    {/* Irmão da barra, não filho: a topbar recebe transform no
        intro-lock, e transform vira bloco de contenção para
        position: fixed — o véu deixaria de medir a tela inteira. */}
    <div className="qd-topbar-scrim" data-on={scrim ? "true" : "false"} aria-hidden="true"></div>
    <div className="qd-topbar">
      <a href="#top" className="qd-topbar-mark" data-cursor="hover" aria-label="Quadrado: voltar ao topo">
        <BrandFull />
        <BrandMark />
      </a>
      <div className="qd-topbar-right">
        <LiquidButton href="#aplicar" size="sm" className="qd-topbar-cta"
          onClick={() => onMenuToggle && onMenuToggle(false)}>
          Aplicar <ArrowUpRight />
        </LiquidButton>
        <MenuToggle open={menuOpen} onOpenChange={onMenuToggle} strokeWidth={2} />
      </div>
    </div>
    </>
  );
}

// ============================================================
// DROP MENU — painel que desce a partir do botão. Fecha no Esc,
// no clique fora e ao escolher um destino.
// ============================================================
function DropMenu({ open, onClose }) {
  cuE(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  const links = [
    ["01", "Como funciona", "#como-funciona"],
    ["02", "Vida no Quadrado", "#vida"],
    ["03", "Para founders", "#founders"],
    ["04", "Para sua empresa", "#mantenedores"],
    ["05", "Manifesto", "#manifesto"],
    ["06", "Plataforma", "#plataforma"],
    ["07", "Aplicar", "#aplicar"],
  ];
  return (
    <>
      <div className={"qd-drop-scrim" + (open ? " on" : "")} onClick={onClose} aria-hidden="true"></div>
      <div id="qd-dropmenu" className={"qd-drop qd-solid" + (open ? " open" : "")}
        role="dialog" aria-label="Navegação" aria-hidden={!open}>
        <ul className="qd-drop-nav">
          {links.map(([n, label, href], i) => (
            <li key={n} style={{ "--i": i }}>
              <a href={href} onClick={onClose} data-cursor="hover" tabIndex={open ? 0 : -1}>
                <span className="n">{n}</span>
                <MenuWord text={label} />
              </a>
            </li>
          ))}
        </ul>
        <div className="qd-drop-foot">
          <span>contato@qddo.com.br</span>
          <span>Brasília · DF</span>
        </div>
      </div>
    </>
  );
}

// ============================================================
// REVEAL TEXT — split a string into <span class="line">
// Triggers reveal when in viewport. Each line has staggered delay.
// ============================================================
function RevealText({ as: Tag = "h2", className = "", style, lines = [], children, delayBase = 0, stagger = 90, start }) {
  const ref = cuR(null);
  cuE(() => qdAttachTrigger(ref.current, { start }), [start]);
  // Prefer `lines` prop (array); fallback to children
  const arr = lines && lines.length ? lines : (Array.isArray(children) ? children : [children]);
  return (
    <Tag ref={ref} className={"qd-rt " + className} style={style}>
      {arr.map((ln, i) => (
        <span className="line" key={i}>
          <span style={{ "--qd-delay": (delayBase + i * stagger) + "ms" }}>{ln}</span>
        </span>
      ))}
    </Tag>
  );
}

// Lightweight on-scroll fade for blocks (Lenis+GSAP if available, IO fallback)
function FadeIn({ children, delay = 0, as: Tag = "div", className = "", style, start }) {
  const ref = cuR(null);
  cuE(() => qdAttachTrigger(ref.current, { start }), [start]);
  return (
    <Tag ref={ref} className={"qd-fade " + className} style={{...style, "--qd-delay": delay + "ms"}}>
      {children}
    </Tag>
  );
}

// ============================================================
// DIVIDER ROW — eyebrow left + body right with a horizontal rule
// (the "EXCLUSIVITY | longer paragraph" pattern from Vorszk)
// ============================================================
function DividerRow({ eyebrow, children, align = "baseline", delay = 0, style }) {
  const ref = cuR(null);
  cuE(() => qdAttachTrigger(ref.current), []);
  return (
    <div ref={ref} className="qd-fade qd-divider-row" style={{...style, "--qd-delay": delay + "ms", alignItems: align}}>
      <span className="qd-divider-eyebrow">{eyebrow}</span>
      <div className="qd-divider-body">{children}</div>
    </div>
  );
}

// ============================================================
// MARQUEE — duplicated track for seamless loop
// ============================================================
function Marquee({ items = [], speed = 45 }) {
  const track = (
    <div className="qd-marquee-track" style={{ animationDuration: speed + "s" }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span className="qd-marquee-item" dangerouslySetInnerHTML={{__html: it}} />
          <span className="qd-marquee-dot" aria-hidden="true"></span>
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div className="qd-marquee qd-marquee-edge">
      {track}
      {React.cloneElement(track, { "aria-hidden": "true" })}
    </div>
  );
}

// ============================================================
// MEDIA TILE — placeholder used inside hover-reveal previews
// ============================================================
function MediaTile({ label }) {
  return (
    <div className="qd-media-tile">
      <span className="label">{label}</span>
      <span className="dot"></span>
    </div>
  );
}

// ============================================================
// EDITORIAL PHOTO — B&W placeholder used in mosaic / cards
// ============================================================
function EditorialPhoto({ label = "foto · b&w", style, variant = 1 }) {
  // four variants of subject silhouettes
  const subjects = {
    1: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18"/><stop offset="100%" stopColor="#ffffff" stopOpacity="0.02"/>
        </linearGradient></defs>
        <circle cx="280" cy="110" r="55" fill="url(#g1)"/>
        <path d="M180 300 Q 200 200 280 200 Q 360 200 380 300 Z" fill="url(#g1)"/>
        <line x1="0" y1="240" x2="400" y2="240" stroke="#ffffff" strokeOpacity="0.10"/>
      </svg>
    ),
    2: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14"/><stop offset="100%" stopColor="#ffffff" stopOpacity="0.03"/>
        </linearGradient></defs>
        <rect x="20" y="40" width="180" height="220" fill="url(#g2)"/>
        <rect x="220" y="100" width="160" height="160" fill="url(#g2)"/>
        <line x1="0" y1="260" x2="400" y2="260" stroke="#ffffff" strokeOpacity="0.08"/>
      </svg>
    ),
    3: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16"/><stop offset="100%" stopColor="#ffffff" stopOpacity="0.02"/>
        </linearGradient></defs>
        <circle cx="120" cy="140" r="80" fill="url(#g3)"/>
        <circle cx="280" cy="180" r="60" fill="url(#g3)" opacity="0.7"/>
        <line x1="0" y1="260" x2="400" y2="260" stroke="#ffffff" strokeOpacity="0.10"/>
      </svg>
    ),
    4: (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16"/><stop offset="100%" stopColor="#ffffff" stopOpacity="0.02"/>
        </linearGradient></defs>
        <path d="M0 220 L120 140 L240 200 L400 100 L400 300 L0 300 Z" fill="url(#g4)"/>
        <circle cx="100" cy="80" r="22" fill="url(#g4)"/>
      </svg>
    ),
  };
  return (
    <div className="qd-photo" style={style}>
      {subjects[variant] || subjects[1]}
      <span className="label">{label}</span>
      <span className="dot"></span>
    </div>
  );
}

// ============================================================
// ARROW UP-RIGHT — ícone inline estilo lucide (stroke currentColor)
// ============================================================
function ArrowUpRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

// ============================================================
// FADING VIDEO — crossfade rAF no loop (spec: FADE_MS 500,
// FADE_OUT_LEAD 0.55s, loop manual via `ended`, sem transition CSS).
// Cada fade retoma da opacidade atual e cancela o rAF anterior.
// ============================================================
// `max` é o teto do crossfade: o rAF escreve style.opacity direto, então
// opacidade de fundo tem que passar por aqui e não pelo CSS, senão o
// próximo quadro do fade a apaga.
function FadingVideo({ src, className, style, onReady, onError, fadeMs = 500, fadeOutLead = 0.55, max = 1 }) {
  const ref = cuR(null);
  cuE(() => {
    const v = ref.current;
    if (!v) return;
    let rafId = 0;
    let fadingOut = false;
    let killed = false;
    let resetTimer = 0;

    const fadeTo = (target, duration = fadeMs) => {
      cancelAnimationFrame(rafId);
      const from = parseFloat(v.style.opacity || "0");
      const t0 = performance.now();
      const step = (t) => {
        if (killed) return;
        const p = Math.min(1, (t - t0) / duration);
        v.style.opacity = String(from + (target - from) * p);
        if (p < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    };

    const safePlay = () => { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); };
    const onLoaded = () => {
      v.style.opacity = "0";
      safePlay();
      fadeTo(max);
      if (onReady) onReady();
    };
    const onTime = () => {
      if (!fadingOut && v.duration && v.duration - v.currentTime <= fadeOutLead && v.duration - v.currentTime > 0) {
        fadingOut = true;
        fadeTo(0);
      }
    };
    const onEnded = () => {
      v.style.opacity = "0";
      resetTimer = setTimeout(() => {
        if (killed) return;
        v.currentTime = 0;
        safePlay();
        fadingOut = false;
        fadeTo(max);
      }, 100);
    };
    const onErr = () => { if (onError) onError(); };

    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", onErr);
    return () => {
      killed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(resetTimer);
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("error", onErr);
    };
  }, [src]);
  // loop proposital OFF — o loop é manual via `ended` para permitir o crossfade
  return (
    <video ref={ref} src={src} className={className} style={{ ...style, opacity: 0 }}
      muted playsInline autoPlay preload="auto" />
  );
}

// ============================================================
// BLUR TEXT — headline palavra a palavra (blur 10→5→0, sobe em
// 3 passos, stagger 100ms). words aceita string ou {w, em:true}.
// ============================================================
function BlurText({ as: Tag = "p", words = [], lines = null, className = "", style, delayBase = 0, stagger = 100 }) {
  const ref = cuR(null);
  cuE(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("in"); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
      });
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const word = (w, i) => {
    const isObj = typeof w === "object";
    const txt = isObj ? w.w : w;
    return (
      <span className="word" key={i} style={{ "--bt-delay": (delayBase + i * stagger) + "ms" }}>
        {isObj && w.em ? <em>{txt}</em> : txt}
      </span>
    );
  };

  // `lines` força a quebra (duas linhas de tamanho parecido);
  // `words` deixa o texto quebrar sozinho conforme a largura.
  let content, hasLines = false;
  if (lines && lines.length) {
    hasLines = true;
    let i = 0;
    content = lines.map((ln, li) => (
      <span className="bt-line" key={li}>{ln.map((w) => word(w, i++))}</span>
    ));
  } else {
    content = words.map(word);
  }
  return (
    <Tag ref={ref} className={"qd-blurtext " + (hasLines ? "has-lines " : "") + className} style={style}>
      {content}
    </Tag>
  );
}

// ============================================================
// MEDIA SLOT — foto/vídeo real com fallback para placeholder marcado.
// Convenção: salvar o arquivo em assets/media/<id>.jpg (foto) ou
// assets/media/<id>.mp4 (vídeo). Quando o arquivo existir, ele entra
// no lugar do placeholder automaticamente — sem tocar em código.
// Ver MEDIA-GUIA.md para a lista completa de slots.
// ============================================================
function MediaSlot({ id, kind = "photo", label, spec, ratio, className = "", style, color = false, focus }) {
  const [state, setState] = cuS("pending"); // pending | ok | missing
  const src = "assets/media/" + id + (kind === "video" ? ".mp4" : ".jpg");
  return (
    <figure
      className={"qd-media" + (color ? " is-color" : "") + (className ? " " + className : "")}
      style={{ ...style, ...(ratio ? { aspectRatio: ratio } : null), ...(focus ? { "--media-pos": focus } : null) }}
      data-state={state}>
      {state !== "missing" && (kind === "video" ? (
        <FadingVideo src={src}
          onReady={() => setState("ok")} onError={() => setState("missing")} />
      ) : (
        <img src={src} alt={label || id} loading="lazy"
          onLoad={() => setState("ok")} onError={() => setState("missing")} />
      ))}
      {state !== "ok" && (
        <figcaption className="qd-media-ph">
          <span className="kind">{kind === "video" ? "▶ vídeo" : "◻ foto"}</span>
          <span className="slot">{id}</span>
          {(label || spec) && <span className="spec">{[label, spec].filter(Boolean).join(" · ")}</span>}
        </figcaption>
      )}
      {/* Nada de rótulo sobre a foto que existe (decisão do Ed, 20/08/2026):
          "FOUNDER NO PALCO" e afins liam como marcação de protótipo em cima
          de imagem real. O `label` continua servindo o `alt` da imagem e a
          legenda do placeholder, que é como o slot diz qual arquivo falta. */}
      <span className="qd-media-dot" aria-hidden="true"></span>
    </figure>
  );
}

// ============================================================
// PARALLAX — desloca o conteúdo no scroll (GSAP scrub).
// Inerte com prefers-reduced-motion ou sem GSAP.
// ============================================================
function Parallax({ children, speed = 0.14, className = "", style }) {
  const ref = cuR(null);
  cuE(() => {
    const el = ref.current;
    if (!el || !window.gsap || !window.ScrollTrigger) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dist = () => ((el.parentElement && el.parentElement.offsetHeight) || 400) * speed;
    const tween = window.gsap.fromTo(el, { y: () => -dist() }, {
      y: () => dist(), ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { if (tween.scrollTrigger) tween.scrollTrigger.kill(); tween.kill(); };
  }, [speed]);
  return <div ref={ref} className={"qd-parallax " + className} style={style}>{children}</div>;
}

// ============================================================
// LIQUID BUTTON — CTA de vidro líquido. Camadas: backdrop
// distorcido (filtro SVG em index.html) + tint + brilho + rótulo.
// ============================================================
function LiquidButton({ href, children, className = "", type, onClick, disabled,
                        variant = "primary", size, ariaLabel }) {
  const Tag = href ? "a" : "button";
  const extra = href ? { href } : { type: type || "button", disabled };
  const mods = (variant === "quiet" ? " lq-quiet" : "") + (size === "sm" ? " lq-sm" : "");
  return (
    <Tag className={"btn btn-liquid" + mods + " " + className}
      data-cursor="hover" onClick={onClick} aria-label={ariaLabel} {...extra}>
      <span className="lq-layer" aria-hidden="true"></span>
      <span className="lq-tint" aria-hidden="true"></span>
      <span className="lq-shine" aria-hidden="true"></span>
      <span className="lq-label">{children}</span>
    </Tag>
  );
}

// ============================================================
// LOGO SLOT — logo real em assets/logos/<id>.(svg|png).
// Sem arquivo, mostra o nome em mono. Mesmo contrato do MediaSlot.
// ============================================================
function LogoSlot({ id, name, ext = "svg" }) {
  const [state, setState] = cuS("pending");
  return (
    <div className="qd-logo" title={name}>
      {state !== "missing" && (
        <img src={"assets/logos/" + id + "." + ext} alt={name}
          style={{ display: state === "ok" ? "block" : "none" }}
          onLoad={() => setState("ok")} onError={() => setState("missing")} />
      )}
      {state !== "ok" && <span className="ph">{name}</span>}
    </div>
  );
}

// ============================================================
// ELASTIC GALLERY — painéis que abrem elasticamente no hover.
// items: [{ id, label, kind }]
// ============================================================
function ElasticGallery({ items = [] }) {
  return (
    <div className="qd-egal">
      {items.map((it) => (
        <div className="cell" key={it.id} data-cursor="hover">
          <MediaSlot id={it.id} kind={it.kind || "photo"} label={it.label} spec={it.spec} focus={it.focus} />
          {/* idem: a legenda no hover era a mesma marcação, em outro lugar */}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// STACKED PANELS — leque de painéis que reage ao cursor.
// ============================================================
function StackedPanels({ items = [] }) {
  const ref = cuR(null);
  cuE(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(pointer: coarse)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  const n = items.length;
  return (
    <div className="qd-stack" ref={ref}>
      {items.map((it, i) => (
        <article className="panel" key={it.t}
          style={{ "--off": (i - (n - 1) / 2).toFixed(2), zIndex: n - Math.abs(i - (n - 1) / 2) }}>
          <MediaSlot id={it.slot} label={it.sl} focus={it.focus} />
          <div className="body">
            <span className="tag">{it.tag}</span>
            <h3>{it.t}</h3>
            {/* `d` pode ser string ou par de linhas: o par vem com a quebra
                declarada, para as duas linhas ficarem de largura parecida. */}
            <p>{Array.isArray(it.d)
              ? it.d.map((l, k) => <React.Fragment key={k}>{k ? <br /> : null}{l}</React.Fragment>)
              : it.d}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

// ============================================================
// REVEAL WORD — palavra letra a letra, com camada de acento que
// se apaga na entrada. O hover é por letra: só a que está sob o
// cursor recua e abre uma janela, com a foto do slot aparecendo
// dentro do próprio desenho do glifo (background-clip: text),
// subindo de baixo para cima. Uma letra de cada vez.
//   fit    → o JS calcula o font-size para o texto encostar nas
//            duas bordas do pai (uma linha só).
//   images → um src por letra. String = a mesma para todas.
//            Padrão: slots footer-word-01.jpg … -0N.jpg, com
//            marcação temporária quando o arquivo não existe.
// ============================================================
const RW_PLACEHOLDER = "assets/media/_placeholder-word.svg";

// url() dentro de custom property resolve relativo ao arquivo CSS que
// usa a var (styles/), não ao documento. Absolutiza antes de escrever.
function rwAbs(src) {
  try { return new URL(src, document.baseURI).href; } catch (e) { return src; }
}

function RevealWord({
  text = "QUADRADO",
  className = "",
  letterDelay = 70,   // cascata de entrada
  spring = 600,       // mola da letra sob o cursor
  fit = false,
  images,
  slot = "footer-word",
}) {
  const ref = cuR(null);
  const letters = String(text).split("");

  // um src por letra; sem prop, cai nos slots numerados do slot base
  const wanted = letters.map((_, i) => (
    Array.isArray(images) ? images[i % images.length]
      : typeof images === "string" ? images
        : "assets/media/" + slot + "-" + String(i + 1).padStart(2, "0") + ".jpg"
  ));
  const [found, setFound] = cuS({}); // src -> true quando a foto real existe

  // entrada em cascata quando a palavra aparece
  cuE(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("in"); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // mesmo contrato do MediaSlot: arquivo existe → entra; não existe → marcação
  const probe = wanted.join("|");
  cuE(() => {
    let alive = true;
    Array.from(new Set(wanted.filter(Boolean))).forEach((src) => {
      const img = new Image();
      img.onload = () => { if (alive) setFound((s) => (s[src] ? s : { ...s, [src]: true })); };
      img.src = src;
    });
    return () => { alive = false; };
  }, [probe]);

  // ocupa a largura toda: mede a palavra num tamanho de referência
  // e escala o font-size pela razão. Refaz quando a fonte de display
  // termina de carregar e quando a largura do pai muda.
  cuE(() => {
    if (!fit) return;
    const el = ref.current;
    const host = el && el.parentElement;
    if (!el || !host) return;
    let lastW = -1;
    const sum = () => Array.from(el.children)
      .reduce((a, c) => a + c.getBoundingClientRect().width, 0);
    const measure = (force) => {
      const avail = host.clientWidth;
      if (!avail) return;                       // painel fechado / medida 0
      if (!force && avail === lastW) return;    // só reage a mudança de largura
      lastW = avail;
      el.style.fontSize = "100px";
      const w = sum();
      if (!w) return;
      const fs = 100 * avail / w;
      el.style.fontSize = fs.toFixed(2) + "px";
      // segunda passada: o avanço dos glifos não escala 100% linear,
      // então corrige o resíduo com a largura realmente obtida
      const got = sum();
      if (got) el.style.fontSize = (fs * avail / got).toFixed(2) + "px";
    };
    measure(true);
    // medir com a fonte de display carregada, não com a de fallback:
    // fonts.ready pode resolver antes de a face ser pedida, então
    // pede a face explicitamente (métrica errada = palavra curta).
    if (document.fonts) {
      if (document.fonts.load) {
        document.fonts.load('800 100px "Rethink Sans"').then(() => measure(true), () => {});
      }
      if (document.fonts.ready) document.fonts.ready.then(() => measure(true));
    }
    const ro = new ResizeObserver(() => measure(false));
    ro.observe(host);
    return () => ro.disconnect();
  }, [fit, text]);

  return (
    <h2
      ref={ref}
      className={"qd-revealword" + (fit ? " is-fit" : "") + (className ? " " + className : "")}
      style={{ "--rw-spring": spring + "ms" }}
      aria-label={text}>
      {letters.map((ch, i) => (
        <span className="ltr" key={i} aria-hidden="true"
          style={{
            "--rw-d": (i * letterDelay) + "ms",
            "--rw-img":'url("' + rwAbs(found[wanted[i]] ? wanted[i] : RW_PLACEHOLDER) + '")',
          }}>
          <span className="anim">
            {ch}
            <span className="ov">{ch}</span>
            <span className="pic">{ch}</span>
          </span>
        </span>
      ))}
    </h2>
  );
}

// ============================================================
// SLIDING NUMBER — dígitos rolam como odômetro até o valor final.
// Cada dígito é uma coluna 0-9 repetida duas vezes, então todo
// dígito gira uma volta inteira antes de assentar. Preserva
// prefixo ("+500"), zero à esquerda ("08") e sufixo ("200m²").
// ============================================================
function SlidingNumber({ value, duration = 1500, delay = 300, stagger = 70 }) {
  const ref = cuR(null);
  const s = String(value);
  const m = s.match(/^([^\d]*)(\d+)(.*)$/);

  cuE(() => {
    const el = ref.current;
    if (!el || !m) return;
    const run = () => el.classList.add("in");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { run(); return; }
    let io = null;
    const onVis = () => { if (!document.hidden) { document.removeEventListener("visibilitychange", onVis); run(); } };
    const startWhenVisible = () => {
      if (document.hidden) document.addEventListener("visibilitychange", onVis);
      else run();
    };
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startWhenVisible();
    } else {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { io.disconnect(); startWhenVisible(); } });
      }, { threshold: 0.4 });
      io.observe(el);
    }
    return () => {
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (!m) return <span>{s}</span>;
  const digits = m[2].split("");
  return (
    <span className="qd-slidenum" ref={ref} aria-label={s}>
      {m[1] ? <span aria-hidden="true">{m[1]}</span> : null}
      {digits.map((ch, i) => (
        <span className="qd-slide-digit" key={i} aria-hidden="true">
          <span className="col" style={{
            "--t": 10 + Number(ch),
            "--sn-dur": duration + "ms",
            "--sn-delay": (delay + i * stagger) + "ms",
          }}>
            {Array.from({ length: 20 }, (_, k) => <span key={k}>{k % 10}</span>)}
          </span>
        </span>
      ))}
      {m[3] ? <span aria-hidden="true">{m[3]}</span> : null}
    </span>
  );
}

// ============================================================
// USE SCROLL PROGRESS — progresso 0..1 da travessia de uma seção,
// entregue por callback (imperativo, sem re-render a 60fps).
// Base das seções pinadas: trilho, foco por profundidade e a
// tela que se levanta. Com prefers-reduced-motion entrega 1 uma vez.
// ============================================================
function useScrollProgress(ref, cb, opts = {}) {
  const cbRef = cuR(cb);
  cbRef.current = cb;
  const start = opts.start || "top top";
  const end = opts.end || "bottom bottom";
  cuE(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { cbRef.current(1); return; }

    if (window.gsap && window.ScrollTrigger) {
      const st = window.ScrollTrigger.create({
        trigger: el, start, end,
        onUpdate: (self) => cbRef.current(self.progress),
        onRefresh: (self) => cbRef.current(self.progress),
      });
      cbRef.current(st.progress || 0);
      return () => st.kill();
    }
    // Fallback sem GSAP: travessia calculada na mão
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      cbRef.current(total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [start, end]);
}

// ============================================================
// USE SECTION PROGRESS — o padrão do site, portado do Sight-2026
// (depth-columns, scroll-beats, notification-stack).
//
// A seção é alta (`height: N vh`) com um palco `position: sticky`.
// O ciclo é: a seção sobe, **prende quando está inteira na tela**, o
// efeito roda preso ao scroll, e a seção só solta quando o efeito
// terminou. É a mesma conta do Sight:
//
//   p = 0  -> topo da seção no topo da tela (o pin começa)
//   p = 1  -> base da seção na base da tela (o pin acaba, a seção sai)
//   duração do pin = altura da seção − 100vh
//
// O span recorta a JANELA ÚTIL dentro do pin. O padrão [0.10, 0.94] é
// o do scroll-beats: 10% de folga antes do primeiro passo (a seção
// prende, você registra que ela travou, e só então o efeito começa) e
// 6% + um passo de folga no fim, para o último estado respirar antes
// de soltar. Com `Math.floor(q * n)`, o passo i acende em
// p = 0.10 + i × 0.84/n — exatamente os 0.10 / 0.38 / 0.66 do Sight
// para três itens.
//
// A CADÊNCIA é o que define a altura da seção, não o contrário:
// o Sight gasta 40vh a 80vh de rolagem por passo. Some
// `passos × cadência` e devolva `+ 100vh` na altura. Hoje:
//   #destrava       3 passos · 300vh (pin 200) · 56vh por card
//   #como-funciona  5 passos · 340vh (pin 240) · 40vh por passo
//   #founders       8 passos · 400vh (pin 300) · 32vh por benefício
// ============================================================
function useSectionProgress(ref, cb, span) {
  const a = (span && span[0] != null) ? span[0] : 0.10;
  const b = (span && span[1] != null) ? span[1] : 0.94;
  useScrollProgress(ref, (p) => {
    cb(Math.max(0, Math.min(1, (p - a) / (b - a))));
  }, { start: "top top", end: "bottom bottom" });
}

// Passo fracionário 0..n-1 preso ao progresso 0..1 da janela útil.
// Divide por (n-1), como o `foco` do depth-columns do Sight: o primeiro
// estado já está na tela quando o pin começa e o último acende no fim
// da janela, então a seção solta logo depois de terminar. Dividir por n
// (o jeito do scroll-beats) deixa um passo inteiro de espera parada
// antes de soltar, que é justamente o que o Ed não quer.
function qdBeat(q, n) {
  if (n <= 1) return 0;
  return Math.max(0, Math.min(n - 1, q * (n - 1)));
}

// ============================================================
// COUNT-UP — número que conta ao entrar na viewport (stats).
// Preserva prefixo ("+500"), zero à esquerda ("08") e sufixo
// ("200m²", "160k").
// ============================================================
function CountUp({ value, duration = 1300 }) {
  const ref = cuR(null);
  const m = String(value).match(/^([^\d]*)(\d+)(.*)$/);
  const [disp, setDisp] = cuS(m ? m[1] + "0".padStart(m[2].length, "0") + m[3] : String(value));
  cuE(() => {
    if (!m) return;
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setDisp(String(value)); return; }
    const pre = m[1], end = parseInt(m[2], 10), pad = m[2].length, suf = m[3];
    let raf, started = false;
    let io = null;
    const start = () => {
      if (started) return;
      started = true;
      if (io) io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisp(pre + String(Math.round(eased * end)).padStart(pad, "0") + suf);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    // Aba em background congela rAF — adia a contagem até ficar visível,
    // para o momento da animação não ser desperdiçado.
    const onVis = () => { if (!document.hidden) { document.removeEventListener("visibilitychange", onVis); start(); } };
    const startWhenVisible = () => {
      if (document.hidden) document.addEventListener("visibilitychange", onVis);
      else start();
    };
    // Já está na viewport (ex.: hero no load)? Conta imediatamente,
    // sem depender do IntersectionObserver.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startWhenVisible();
    } else {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) startWhenVisible(); });
      }, { threshold: 0.4 });
      io.observe(el);
    }
    return () => {
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <span ref={ref}>{disp}</span>;
}

Object.assign(window, {
  ScrollEngine,
  CustomCursor, SpotlightCursor, AsciiArt, Loader, TopBar, MenuToggle, MenuWord, DropMenu,
  RevealText, FadeIn, DividerRow, Marquee, MediaTile, EditorialPhoto,
  MediaSlot, Parallax, CountUp,
  ArrowUpRight, FadingVideo, BlurText, useScrollProgress, useSectionProgress, qdBeat,
  LiquidButton, LogoSlot, ElasticGallery, StackedPanels, RevealWord, SlidingNumber,
});
