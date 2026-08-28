/* global React, RevealText, FadeIn, MediaTile, EditorialPhoto, Marquee, MediaSlot, Parallax, CountUp, DividerRow,
   ArrowUpRight, FadingVideo, BlurText, useScrollProgress, useSectionProgress, qdBeat, LiquidButton, LogoSlot, SlidingNumber,
   AsciiArt */
/* QDDO · Vorszk Edition — Section components (part 1: hero → stats) */

const { useState: vsS, useEffect: vsE, useRef: vsR } = React;

// ============================================================
// INTRO — abertura em parallax. A palavra QUADRADO em bastonada
// pesada se afasta conforme rola, a logo entra no lugar e a
// página começa. Substitui o loader como porta de entrada.
// ============================================================
function VIntro() {
  const secRef = vsR(null);
  const stageRef = vsR(null);
  const [bg, setBg] = vsS("pending");   // pending | ok | missing
  const [fg, setFg] = vsS("pending");

  // A abertura é primeira tela limpa: menu e barra lateral só entram
  // depois que ela começa a sair. A trava vale desde a montagem.
  vsE(() => {
    document.documentElement.classList.add("qd-intro-lock");
    return () => document.documentElement.classList.remove("qd-intro-lock");
  }, []);

  useScrollProgress(secRef, (p) => {
    if (stageRef.current) stageRef.current.style.setProperty("--ip", p.toFixed(3));
    document.documentElement.classList.toggle("qd-intro-lock", p < 0.55);
  });

  const wordRef = vsR(null);
  const tagRef = vsR(null);
  const titleRef = vsR(null);
  const fgRef = vsR(null);

  // Altura do peito do rapaz do primeiro plano, como fração da altura do
  // intro-fg.png (medida no arquivo: gorro 0,255 · ombros 0,337 ·
  // peito 0,395 · laptop 0,50 · pés 0,78).
  const PEITO_FG = 0.395;
  // A tagline fica um pouco mais estreita que QUADRADO, não rente às duas
  // pontas: encostar nas bordas exatas da palavra lia como régua.
  const TAG_LARGURA = 0.95;

  // Duas medições, nesta ordem (a segunda depende da altura do bloco, que
  // a primeira muda):
  //
  // 1. a tagline acompanha a largura de QUADRADO × TAG_LARGURA: mede a
  //    palavra, mede o rótulo num corpo de referência e escala. O
  //    `letter-spacing` é em em, então a relação é linear e uma passada
  //    basta. Mede com a mono já carregada — na fonte de fallback a linha
  //    sai curta.
  // 2. a palavra é ancorada na altura do peito. Sem isso ela fica em
  //    `top: 50%` da tela enquanto a pessoa sobe e desce com a proporção
  //    da janela (o PNG é `cover`): em 1503x778 a palavra caía 93px abaixo
  //    do peito, na altura do laptop.
  //
  // Tudo em geometria de layout (`offset*` / `client*`), nunca em
  // `getBoundingClientRect`: as duas camadas carregam transform de
  // parallax, e medir o rect devolveria a posição do quadro atual do
  // scroll em vez da de repouso.
  vsE(() => {
    const w = wordRef.current, t = tagRef.current;
    const stage = stageRef.current, title = titleRef.current, img = fgRef.current;
    if (!w || !t) return;
    const REF = 16;

    const TRAIL = 0.22;  // = o letter-spacing da .qd-intro-tag, em em
    const escalaTag = () => {
      // `offsetWidth`, não `getBoundingClientRect`: o bloco do título
      // carrega o `scale` do parallax, e o rect devolveria a largura já
      // escalada — a conta sairia errada a cada quadro do scroll.
      const alvo = w.offsetWidth * TAG_LARGURA;
      if (!alvo) return false;
      // O avanço dos glifos não escala linear com o corpo (hinting e
      // arredondamento sub-pixel), então uma conta fechada erra: a mesma
      // razão pela qual o RevealWord do rodapé faz segunda passada. Aqui
      // convergimos em poucas voltas, medindo a tinta (a caixa inclui o
      // tracking que sobra depois da última letra).
      let corpo = REF;
      for (let i = 0; i < 4; i++) {
        t.style.fontSize = corpo.toFixed(2) + "px";
        const tinta = t.offsetWidth - TRAIL * corpo;
        if (tinta <= 0) return false;
        const erro = alvo / tinta;
        if (Math.abs(erro - 1) < 0.004) break;
        corpo *= erro;
      }
      return true;
    };

    const ancora = () => {
      if (!stage || !title || !img || !img.naturalWidth) return;
      const boxW = stage.clientWidth, boxH = stage.clientHeight;
      if (!boxW || !boxH) return;
      // o recorte `cover` do primeiro plano, na mão
      const s = Math.max(boxW / img.naturalWidth, boxH / img.naturalHeight);
      const alturaEscalada = img.naturalHeight * s;
      const py = (parseFloat(getComputedStyle(img).objectPosition.split(" ")[1]) || 0) / 100;
      const peitoY = PEITO_FG * alturaEscalada - (alturaEscalada - boxH) * py;
      // centro da palavra em repouso: `top: 50%` menos o translate de -50%
      const centroPalavra = title.offsetTop - title.offsetHeight / 2
        + w.offsetTop + w.offsetHeight / 2;
      stage.style.setProperty("--title-dy", Math.round(peitoY - centroPalavra) + "px");
    };

    const ajusta = () => { escalaTag(); ancora(); };
    ajusta();
    if (document.fonts && document.fonts.load) {
      document.fonts.load('16px "Geist Mono"').then(ajusta).catch(() => {});
      document.fonts.load('800 16px "Rethink Sans"').then(ajusta).catch(() => {});
    }
    // A primeira passada pode cair antes de o layout ter tamanho (largura
    // 0 devolve escala 1 e âncora nenhuma). Uma repescagem no frame
    // seguinte cobre isso sem ficar em laço.
    const rafId = requestAnimationFrame(ajusta);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(ajusta) : null;
    if (ro) { ro.observe(w); if (stage) ro.observe(stage); }
    addEventListener("resize", ajusta);
    return () => {
      cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
      removeEventListener("resize", ajusta);
    };
  }, [fg]);

  return (
    <section id="intro" className="qd-intro" ref={secRef}>
      <div className="qd-intro-stage" ref={stageRef} data-media={bg === "ok" ? "on" : "off"}>
        {/* 1. fundo: paisagem, a camada mais lenta */}
        <div className="qd-intro-layer qd-intro-bg" aria-hidden="true">
          {bg !== "missing" && (
            <img src="assets/media/intro-bg.jpg" alt=""
              style={{ opacity: bg === "ok" ? 1 : 0, transition: "opacity 900ms var(--ease-out)" }}
              onLoad={() => setBg("ok")} onError={() => setBg("missing")} />
          )}
          {bg !== "ok" && <><span className="grid"></span><span className="qd-intro-glow"></span></>}
        </div>

        <div className="qd-intro-veil" aria-hidden="true"></div>

        {/* 2. o nome e a tagline, no meio das camadas. Os dois vivem no
            mesmo bloco para dividirem o mesmo parallax: a tagline
            posicionada por conta própria descolaria da palavra, cujo
            corpo varia de 2,4rem a 11,5rem. */}
        <div className="qd-intro-title" ref={titleRef}>
          <p className="qd-intro-word" ref={wordRef}>Quadrado</p>
          <p className="qd-intro-tag" ref={tagRef}>O vértice dos founders de Brasília</p>
        </div>

        {/* 3. primeiro plano: recorte que passa por cima do nome */}
        {fg !== "missing" && (
          <div className="qd-intro-layer qd-intro-fg" aria-hidden="true">
            <img src="assets/media/intro-fg.png" alt="" ref={fgRef}
              style={{ opacity: fg === "ok" ? 1 : 0, transition: "opacity 900ms var(--ease-out)" }}
              onLoad={() => setFg("ok")} onError={() => setFg("missing")} />
          </div>
        )}

        {/* rodapé das imagens dissolvendo no preto do site */}
        <div className="qd-intro-fade" aria-hidden="true"></div>

        {/* indicação de scroll: só o fio com a luz descendo */}
        <div className="qd-intro-hint" aria-hidden="true"></div>
        {(bg !== "ok" || fg !== "ok") && (
          <span className="qd-hero3-slot-tag">◻ intro-bg.jpg · intro-fg.png</span>
        )}
      </div>
    </section>
  );
}

// ============================================================
// HERO 3.0 — vídeo full-bleed (slot hero-bg.mp4) + scrim escuro,
// copy mínima estilo YC, números discretos na base.
// Sem o vídeo: fallback escuro elegante com grid sutil.
// ============================================================
function VHero() {
  const copyRef = vsR(null);
  const bgRef = vsR(null);
  const [vid, setVid] = vsS("pending"); // pending | ok | missing

  vsE(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = [copyRef.current].filter(Boolean);
    const t1 = window.gsap.to(targets, {
      y: -60, opacity: 0, ease: "none",
      scrollTrigger: { trigger: "#top", start: "top top", end: "75% top", scrub: true },
    });
    const t2 = bgRef.current ? window.gsap.to(bgRef.current, {
      yPercent: 10, scale: 1.06, ease: "none",
      scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
    }) : null;
    return () => {
      [t1, t2].filter(Boolean).forEach(t => { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); });
    };
  }, []);

  return (
    <section id="top" className="qd-hero3">
      <div className="qd-hero3-bg" ref={bgRef} aria-hidden="true">
        {vid !== "missing" && (
          <FadingVideo
            src="assets/media/hero-bg.mp4"
            max={0.4}
            onReady={() => setVid("ok")}
            onError={() => setVid("missing")} />
        )}
        {/* Mesmo fundo de caracteres do #destrava, aqui em tela cheia e um
            pouco mais presente: sem o hero-bg.mp4 é ele que dá movimento
            à abertura. Opacidade e cor vêm do CSS (.qd-ascii). */}
        {vid !== "ok" && <AsciiArt />}
        <div className="qd-hero3-scrim"></div>
      </div>
      {vid !== "ok" && <span className="qd-hero3-slot-tag">▶ hero-bg.mp4 · 1080p · 10–20s · loop mudo</span>}

      <div className="container">
        <div className="qd-hero3-copy" ref={copyRef}>
          <FadeIn delay={200}>
            <div className="qd-solid qd-badge">
              <span>Aplicações abertas · Brasília · 2026</span>
            </div>
          </FadeIn>
          <BlurText
            as="h1"
            className="qd-hero3-title"
            delayBase={400}
            stagger={100}
            lines={[["Founder", "não"], ["cresce", { w: "sozinho.", em: true }]]} />
          <FadeIn delay={900}>
            <p className="qd-hero3-lede">
              Conecte-se a founders, operadores, empresas e investidores para
              validar desafios e fazer sua startup avançar.
            </p>
          </FadeIn>
          <FadeIn delay={1050}>
            <div className="qd-hero3-ctas">
              <LiquidButton href="#aplicar">
                Aplicar para o Quadrado <ArrowUpRight className="arrow" />
              </LiquidButton>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={650} className="qd-hero-benefits">
          <div className="qd-hero-benefits-head">
            <span className="dot"></span>
            <span>Benefícios de estar na comunidade</span>
          </div>
          <article className="qd-hero-benefit is-primary">
            <span className="n">01</span>
            <div><h2>Decisões com contexto.</h2><p>Founders compartilham aprendizados reais para você avançar sem construir no escuro.</p></div>
            <span className="go" aria-hidden="true">↗</span>
          </article>
          <div className="qd-hero-benefits-pair">
            <article className="qd-hero-benefit">
              <span className="n">02</span>
              <div><h2>Acesso a quem executa.</h2><p>Operadores e especialistas próximos dos desafios.</p></div>
            </article>
            <article className="qd-hero-benefit is-accent">
              <span className="n">03</span>
              <div><h2>Oportunidades em movimento.</h2><p>Empresas, investidores e eventos com contexto.</p></div>
            </article>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================
// AUDIENCE INTENT — appears below hero, reacts to switcher
// ============================================================
function VAudienceIntent({ audience }) {
  const copy = {
    founders: {
      headline: <>Uma comunidade <em>curada</em> de founders <em>em movimento</em>.</>,
      lede: "Espaço gratuito no CCUG, programação recorrente, mentorias e acesso a desafios reais. Equity-free. A entrada é gratuita; a permanência exige presença, colaboração e progresso.",
      cta: { primary: ["Aplicar para o Quadrado Central", "#aplicar"], secondary: ["Conhecer a comunidade", "#comunidade"] },
    },
    mantenedores: {
      headline: <>Você não <em>compra</em> espaço. Você <em>acessa</em> founders.</>,
      lede: "Empresas entram para ativar desafios, gerar relacionamento e participar da construção do ecossistema. Cinco caminhos de entrada: escolha o que conversa com sua tese.",
      cta: { primary: ["Falar com o Quadrado Central", "#mantenedores"], secondary: ["Ver planos", "#mantenedores"] },
    },
  }[audience];
  return (
    <section className="qd-section-tight" style={{paddingTop: 0}}>
      <div className="container" style={{textAlign: "center"}}>
        <div key={audience} style={{
          maxWidth: 880, marginInline: "auto",
          animation: "qd-audience-fade 480ms var(--ease-out)",
        }}>
          <h2 className="qd-statement" style={{fontSize: "clamp(2rem, 1.2rem + 3vw, 4.4rem)"}}>
            {copy.headline}
          </h2>
          <p className="lede" style={{margin: "32px auto 0", maxWidth: 620}}>
            {copy.lede}
          </p>
          <div style={{display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginTop: 44}}>
            <LiquidButton href={copy.cta.primary[1]}>{copy.cta.primary[0]} <ArrowUpRight className="arrow" /></LiquidButton>
            <LiquidButton href={copy.cta.secondary[1]} variant="quiet">{copy.cta.secondary[0]}</LiquidButton>
          </div>
        </div>
      </div>
      <style>{`@keyframes qd-audience-fade { from {opacity:0; transform:translateY(10px);} to {opacity:1; transform:none;} }`}</style>
    </section>
  );
}

// ============================================================
// MARQUEE STRIP — values flowing
// ============================================================
function VMarquee() {
  const items = [
    "Comunidade <em>curada</em>",
    "Outros <em>builders</em>",
    "Eventos <em>recorrentes</em>",
    "Espaço e <em>infraestrutura</em>",
    "<em>Equity-free</em>",
    "Ecossistema de <em>inovação</em>",
  ];
  return <Marquee items={items} speed={80} />;
}

// ============================================================
// PILLARS — "O que o Quadrado destrava": seção cinematográfica
// full-height com vídeo de fundo + 3 cards glass (os 3 pilares
// prometidos no hero). Padrão "Capabilities" adaptado.
// ============================================================
function VPillars() {
  const secRef = vsR(null);
  const cardRefs = vsR([]);
  const bgRefs = vsR([]);

  // Entrada em cascata: o card 01 aparece, depois o 02 entra e desfoca
  // o 01, depois o 03 entra e desfoca os dois. O foco é sempre o último
  // que entrou. Cadência: 84vh de rolagem por card (o pin tem 200vh),
  // praticamente os 80vh do depth-columns do Sight.
  useSectionProgress(secRef, (p) => {
    const n = 4;
    const raw = qdBeat(p, n);                                  // 0..n-1
    // o card em foco é o que está entrando; raw sai de i-1 para i
    const active = raw <= 0 ? 0 : Math.min(n - 1, Math.ceil(raw - 1e-6));
    const frac = active === 0 ? 1 : raw - (active - 1);
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      let e, d;
      if (i < active)      { e = 1; d = 1; }                        // já entrou, desfocado
      else if (i > active) { e = 0; d = 1; }                        // ainda não entrou
      else {
        // entrando: aparece ao longo de 70% do próprio trecho. Os 30%
        // que sobram são a espera antes do próximo card; mais que isso
        // e o pin fica parado no fim, esperando para soltar.
        e = Math.min(1, frac / 0.70);
        d = 0;
      }
      el.style.setProperty("--e", e.toFixed(3));
      el.style.setProperty("--d", d.toFixed(3));
      el.setAttribute("data-in", e > 0.02 ? "true" : "false");
    });
    bgRefs.current.forEach((el, i) => {
      if (el) el.setAttribute("data-on", i === active ? "true" : "false");
    });
  });

  const icons = {
    community: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </svg>
    ),
    builders: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    events: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  };

  const cards = [
    { icon: icons.community, photo: "vida-01", focus: "61% 50%", t: ["Comunidade", "curada"], tags: ["Seleção", "Colaboração"], d: "Founders em movimento, selecionados pela capacidade de construir, colaborar e fazer a comunidade avançar." },
    { icon: icons.builders, photo: "vida-02", focus: "30% 50%", t: ["Conexão entre", "founders"], tags: ["Founders", "Operadores"], d: "Encontre pessoas que constroem, acesse operadores e especialistas e compartilhe desafios com quem entende a jornada." },
    { icon: icons.events, photo: "vida-03", focus: "54% 50%", t: ["Rotina de", "eventos"], tags: ["Encontros", "Desafios"], d: "Consultoria coletiva, trocas de inovação, desafios de empresas e encontros com outras startups." },
    { icon: icons.community, photo: "vida-04", focus: "50% 9%", t: ["Espaço e", "infraestrutura"], tags: ["CCUG", "Equity-free"], d: "Um lugar para trabalhar, encontrar a comunidade e participar da rotina do ecossistema, sem abrir mão de equity." },
  ];

  return (
    <section id="destrava" className="qd-pillars" ref={secRef}>
      <div className="qd-pillars-stage">
        <div className="qd-pillars-bg" aria-hidden="true">
          {cards.map((card, i) => (
            <div key={card.photo} className="qd-pillars-photo"
              data-on={i === 0 ? "true" : "false"}
              ref={(el) => { bgRefs.current[i] = el; }}>
              <img src={`assets/media/${card.photo}.jpg`} alt=""
                style={{objectPosition: card.focus}} />
            </div>
          ))}
          {/* Sem vídeo de fundo aqui (decisão do Ed, 24/08/2026): o slot
              bg-02.mp4 foi cancelado e o quadriculado é o fundo definitivo. */}
          {/* Fundo estático aqui (pedido do Ed, 20/08/2026): o campo de
              caracteres animado atrás dos cards de vidro é a combinação
              cara da página, porque cada card com backdrop-filter
              re-desfoca o canvas a cada frame dentro do palco pinado. */}
          <div className="qd-hero-grid"></div>
          <div className="qd-pillars-scrim"></div>
          {/* Quadriculado industrial. Depois do scrim de propósito: o véu é
              preto opaco no centro, então embaixo dele a malha sumiria. */}
          <div className="qd-pillars-paper"></div>
        </div>

        <div className="container">
          <FadeIn><span className="qd-eyebrow">O que entregamos</span></FadeIn>
          <div style={{marginTop: 24}}>
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              lines={[
                <>Estrutura, conexões</>,
                <>e rotina para <em>avançar</em>.</>,
              ]} />
          </div>

          <div className="qd-pillars-grid is-depth">
            {cards.map((c, i) => (
              <div key={c.t.join(" ")} className="qd-glass qd-grow qd-pillar-card"
                data-in={i === 0 ? "true" : "false"}
                style={{ "--e": i === 0 ? 1 : 0, "--d": 0 }}
                ref={(el) => { cardRefs.current[i] = el; }}>
                <div className="qd-pillar-top">
                  <span className="qd-glass qd-pillar-icon">{c.icon}</span>
                  <span className="qd-pillar-tags">
                    {c.tags.map((tg) => (
                      <span className="qd-glass qd-pillar-tag" key={tg}>{tg}</span>
                    ))}
                  </span>
                </div>
                {/* quebra declarada: cada linha do título é um span em bloco */}
                <h3>{c.t.map((linha) => <span key={linha}>{linha}</span>)}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MANIFESTO — pinned (sticky) editorial layout
// ============================================================
function VManifesto() {
  // Regras de operação que decorrem da crença do título. Cada uma diz
  // algo que nenhuma outra seção diz: ajuda mútua, o modelo de duas
  // pontas, e evento como validação em vez de vitrine.
  const principles = [
    { icon: "↗", h: [<>Founder se conecta</>, <>com <em>founder</em>.</>], d: "Boas mentes dividem contexto, abrem conversas e aceleram decisões." },
    { icon: "◎", h: [<>Ecossistema gratuito.</>, <>Acesso <em>sem equity</em>.</>], d: "Para quem participa, colabora e faz o coletivo avançar." },
    { icon: "▶", h: [<>Menos palco.</>, <>Mais <em>bastidores</em>.</>], d: "Ideias saem do discurso, encontram pessoas reais e começam a rodar." },
  ];
  return (
    <section id="manifesto" className="qd-section">
      <div className="container">
        {/* Mesmo cabeçalho do #mantenedores: eyebrow e título à esquerda,
            texto complementar encostado na margem direita. */}
        <div className="qd-section-head qd-head-split">
          <div style={{display:"grid", gap: 24}}>
            <FadeIn><span className="qd-eyebrow">Manifesto</span></FadeIn>
            {/* O chamado de abertura do manifesto original, palavra por
                palavra. Duas linhas de largura parecida. */}
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={120}
              lines={[
                <>Para quem cansou</>,
                <>de construir <em>sozinho</em>.</>,
              ]} />
          </div>
          {/* O manifesto inteiro condensado em três linhas: quem é o
              convidado, o movimento que já aconteceu e a tese sobre
              Brasília. Os números vivem no hero e no #numeros. */}
          <FadeIn delay={150} className="qd-lede-right" style={{maxWidth: "48ch"}}>
            <p className="lede">
              Para founders inquietos que querem construir ao lado de boas mentes, no coração de Brasília — fortalecendo o DF como polo de negócios, inovação e novas empresas.
            </p>
          </FadeIn>
        </div>

        {/* Princípios em uma linha cada. Sem marginTop próprio: o respiro
            vem do margin-bottom padrão do .qd-section-head, igual ao
            #mantenedores. */}
        <div className="qd-manifesto-cards">
          {principles.map((p, i) => (
            <FadeIn key={p.icon} delay={i * 150} className="qd-manifesto-card qd-showup-card">
              <span className="icon" aria-hidden="true">{p.icon}</span>
              <h3 className="ph-title">{p.h.map((line, i) => <span key={i}>{line}</span>)}</h3>
              <p>{p.d}</p>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

// ============================================================
// MOSAIC — Brasília · Centro-Oeste image grid (asymmetric 4-up)
// ============================================================
function VMosaic() {
  return (
    <section className="qd-section">
      <div className="container">
        <div className="qd-section-head">
          <FadeIn><span className="qd-eyebrow">Centro-Oeste · Tese territorial</span></FadeIn>
          <RevealText
            as="h2"
            className="qd-statement"
            stagger={110}
            style={{fontSize: "clamp(2.4rem, 1.4rem + 5vw, 6rem)"}} lines={[
              <>Brasília não é</>,
              <><em>coadjuvante</em>.</>,
              <>Centro-Oeste tem <em>tese</em>.</>,
            ]} />
        </div>
        <FadeIn>
          <div className="qd-mosaic">
            <EditorialPhoto label="founders night · brasília" variant={1} />
            <EditorialPhoto label="ccug · sdc lote 5" variant={2} />
            <EditorialPhoto label="comunidade · em movimento" variant={3} />
            <EditorialPhoto label="200m²" variant={4} />
          </div>
        </FadeIn>
        <FadeIn delay={300}>
          <p className="lede" style={{marginTop: 64, maxWidth: "58ch"}}>
            O Quadrado Central nasce com uma ambição territorial: fortalecer a economia de inovação do Centro-Oeste, gerar conexões qualificadas e ampliar a capacidade de empresas, founders e instituições testarem soluções reais.
          </p>
        </FadeIn>

        <DividerRow eyebrow="Exclusividade">
          Onde a maioria vê <em>limite</em>, nós enxergamos <em>infraestrutura</em>. Brasília é a única capital do país com a vocação de testar políticas, marcas e produtos em escala nacional desde o dia um.
        </DividerRow>
      </div>
    </section>
  );
}

// ============================================================
// COMO FUNCIONA — a jornada do founder em 5 movimentos,
// com foto real no hover (ex-VExpertise)
// ============================================================
function VHowItWorks() {
  const secRef = vsR(null);
  const fillRef = vsR(null);
  const stepRefs = vsR([]);
  const frameRefs = vsR([]);

  // Só número e título: o verbo do passo já se explica, e a linha de apoio
  // repetia o que a headline da seção diz.
  // `focus` = object-position do corte. Não é chute: para cada foto foi
  // medida a posição do rosto na imagem e calculado o ponto que joga esse
  // rosto no centro desta moldura (4:3 aqui). Só o eixo cortado importa;
  // no outro o valor é inerte. Ver MEDIA-GUIA.md.
  const steps = [
    { n:"01", t:<>Aplique em <em>5 minutos</em></>, slot:"hero-01", sl:"founders · close", focus:"50% 16%" },
    { n:"02", t:<>Passe pela <em>curadoria</em></>, slot:"hero-03", sl:"ccug · espaço", focus:"50% 100%" },
    { n:"03", t:<>Entre na <em>comunidade</em></>, slot:"vida-03", sl:"mentoria · mesa", focus:"64% 50%" },
    { n:"04", t:<>Viva a <em>rotina</em></>, slot:"vida-04", sl:"espaço · bastidores", focus:"50% 33%" },
    { n:"05", t:<>Resolva <em>desafios reais</em></>, slot:"hero-02", sl:"evento · plano aberto", focus:"50% 50%" },
  ];

  // O trilho preenche conforme rola e os passos acendem em sequência;
  // a mídia da direita troca para a do passo ativo. Cinco passos a 40vh
  // cada, a cadência do scroll-beats do Sight (ver useSectionProgress).
  useSectionProgress(secRef, (p) => {
    const n = steps.length;
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    const active = Math.floor(qdBeat(p, n) + 1e-6);
    stepRefs.current.forEach((el, i) => el && el.setAttribute("data-on", i <= active ? "true" : "false"));
    frameRefs.current.forEach((el, i) => el && el.setAttribute("data-on", i === active ? "true" : "false"));
  });
  return (
    <section id="como-funciona" className="qd-steps" ref={secRef}>
      <div className="qd-steps-stage">
        <div className="container">
          <div className="qd-steps-head">
            <FadeIn><span className="qd-eyebrow">Como funciona</span></FadeIn>
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              lines={[<>Da aplicação ao <em>piloto</em>.</>]} />
          </div>

          <div className="qd-steps-body">
            <div className="qd-steps-list">
              <span className="qd-steps-rail" aria-hidden="true">
                <span className="fill" ref={fillRef}></span>
              </span>
              {steps.map((s, i) => (
                <div key={s.n} className="qd-step" data-on={i === 0 ? "true" : "false"}
                  ref={(el) => { stepRefs.current[i] = el; }}>
                  <span className="n">{s.n} / 05</span>
                  <h3>{s.t}</h3>
                </div>
              ))}
            </div>

            <div className="qd-steps-media">
              {steps.map((s, i) => (
                <div key={s.n} className="qd-steps-frame" data-on={i === 0 ? "true" : "false"}
                  ref={(el) => { frameRefs.current[i] = el; }}>
                  <MediaSlot id={s.slot} label={s.sl} focus={s.focus} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ECOSYSTEM PROOF — stat row editorial
// ============================================================
function VStats() {
  // Seis números, três colunas, duas linhas, mesmo peso visual.
  // O rótulo mono saiu (decisão do Ed, 18/08/2026): a descrição embaixo
  // já diz o que o número conta, então o rótulo era a mesma informação
  // duas vezes. Cada descrição fecha em duas linhas de largura parecida.
  const stats = [
    { id: "conexoes",  v: "+500",    s: "Conexões geradas por meio dos nossos eventos." },
    { id: "eventos",   v: "+20",     s: "Eventos realizados para founders e a comunidade de inovação." },
    { id: "pessoas",   v: "+900",    s: "Pessoas que já passaram pelo espaço do Quadrado." },
    { id: "founders",  v: "+80",     s: "Founders ativos, aferidos mês a mês na nossa comunidade." },
    { id: "verticais", v: "08",      s: "Verticais de negócio abraçadas, de govtech a creator economy." },
    { id: "views",     v: "+1,5 mi", s: "Visualizações de alcance orgânico nas redes sociais.", accent: true },
  ];
  return (
    <section id="numeros" className="qd-section qd-section-dark">
      <div className="container">
        <div className="qd-section-head" style={{display:"flex", justifyContent:"space-between", alignItems:"end", gap: 24, flexWrap:"wrap", marginBottom: 0}}>
          <div style={{display:"grid", gap: 24}}>
            <FadeIn><span className="qd-eyebrow">Prova de ecossistema</span></FadeIn>
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              lines={[<>A comunidade já <em>existe</em>.</>]} />
          </div>
          <FadeIn delay={200}>
            <span className="mono" style={{color:"var(--text-tertiary)", fontSize: 11, letterSpacing:"0.18em", textTransform:"uppercase"}}>
              dados de operação · 2026
            </span>
          </FadeIn>
        </div>

        {/* o próprio FadeIn é a célula do grid: sem div intermediária,
            senão os spans voltam a fluir inline */}
        <div className="qd-stat-row">
          {stats.map((m, i) => (
            <FadeIn key={m.id} delay={i * 60}>
              <span className={"val" + (m.accent ? " is-accent" : "")}>
                <SlidingNumber value={m.v} delay={200 + i * 90} />
              </span>
              <span className="sub">{m.s}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LOGOS — quem constrói junto. Cada logo é um slot:
// assets/logos/<id>.svg. Sem arquivo, mostra o nome em mono.
// ============================================================
function VLogos() {
  // ⚠️ PLACEHOLDER — marcas de terceiros só para dar volume visual à
  // faixa enquanto não existe parceiro real. NÃO PUBLICAR ASSIM: colocar
  // essas logos numa seção de "quem constrói junto" sugere parceria que
  // não existe. Para limpar: apagar `assets/logos/demo-*.svg` e voltar a
  // lista para parceiro-01…06 (comentada abaixo).
  // Arquivos: Simple Icons (SVG em CC0); as marcas são dos donos.
  const logos = [
    { id: "demo-cocacola", name: "Coca-Cola" },
    { id: "demo-nike",     name: "Nike" },
    { id: "demo-adidas",   name: "Adidas" },
    { id: "demo-samsung",  name: "Samsung" },
    { id: "demo-spotify",  name: "Spotify" },
    { id: "demo-netflix",  name: "Netflix" },
    { id: "demo-visa",     name: "Visa" },
    { id: "demo-uber",     name: "Uber" },
  ];
  // const logos = [
  //   { id: "parceiro-01", name: "Parceiro 01" },
  //   { id: "parceiro-02", name: "Parceiro 02" },
  //   { id: "parceiro-03", name: "Parceiro 03" },
  //   { id: "parceiro-04", name: "Parceiro 04" },
  //   { id: "parceiro-05", name: "Parceiro 05" },
  //   { id: "parceiro-06", name: "Parceiro 06" },
  // ];
  return (
    <section id="parceiros" className="qd-section-tight">
      <div className="container">
        <FadeIn>
          <span className="qd-eyebrow">Quem constrói junto</span>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="qd-logos-row">
            {logos.map((l) => <LogoSlot key={l.id} id={l.id} name={l.name} />)}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

Object.assign(window, {
  VIntro, VHero, VPillars, VLogos, VAudienceIntent, VMarquee, VManifesto, VMosaic, VHowItWorks, VStats,
});
