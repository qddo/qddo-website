/* global React, FadeIn, RevealText, EditorialPhoto, MediaTile, MediaSlot, Parallax, DividerRow,
   useScrollProgress, useSectionProgress, qdBeat, LiquidButton, ElasticGallery, StackedPanels, RevealWord, ArrowUpRight */
/* QDDO · Vorszk Edition — Section components (part 2: founders → footer) */

// Redes sociais — preencher com as URLs reais; chips só aparecem quando preenchidas
// Só os canais que existem hoje entram: os chips do rodapé são
// renderizados por presença, então campo vazio não vira link morto.
const SOCIAL = {
  instagram: "https://www.instagram.com/quadrado.central/",
  linkedin: "",
  youtube: "",
};
const CONTACT_EMAIL = "contato@qddo.com.br";
// Termos e condições — página ainda não escrita. O link já está no
// formulário; quando a página existir, trocar só esta constante.
const TERMS_URL = "termos.html";

// ============================================================
// FOR FOUNDERS — split layout, sticky title
// ============================================================
function VForFounders() {
  // `slot` reaproveita os slots de mídia já pedidos no MEDIA-GUIA: a
  // foto que ilustra o benefício troca junto com o texto.
  const benefits = [
    // Sem `focus` aqui: os arquivos founder-* já vêm recortados em 2,4:1,
    // a mesma faixa da moldura, com o rosto posicionado no próprio corte
    // (originais 3:2 em assets/media/_originais/). Forçar object-position
    // por cima só empurraria o rosto para fora do centro já escolhido.
    { t: "Espaço gratuito", d: "Sala no Centro de Convenções Ulysses Guimarães, sem custo.", slot: "founder-01", sl: "founder no palco" },
    { t: "Equity-free", d: "Sua cap table não é o preço de entrada. Nunca foi.", slot: "founder-02", sl: "founder no palco" },
    { t: "Curadoria séria", d: "Entra quem constrói, não quem comparece. O critério é progresso.", slot: "founder-03", sl: "founder no palco" },
    { t: "Founders Night", d: "Encontro mensal com pares, operadores e convidados.", slot: "founder-04", sl: "founder no palco" },
    { t: "Mentorias e office hours", d: "Acesso direto a quem já resolveu o seu problema.", slot: "founder-05", sl: "founder no palco" },
    { t: "Workshops técnicos", d: "Produto, vendas, captação e narrativa, mão na massa.", slot: "founder-06", sl: "founder no palco" },
    { t: "Plataforma do founder", d: "Agenda, benefícios e desafios num lugar só.", slot: "founder-07", sl: "founder no palco" },
    // única do lote que é conversa de corredor, não palco: rótulo próprio
    { t: "Desafios reais", d: "Problemas de empresas mantenedoras para você validar.", slot: "founder-08", sl: "founders · corredor" },
  ];
  const secRef = React.useRef(null);
  const itemRefs = React.useRef([]);
  const frameRefs = React.useRef([]);
  const railRefs = React.useRef([]);

  // Um benefício por vez: o próximo entra no lugar do anterior, e a
  // foto acima do texto troca no mesmo passo. São oito passos, a maior
  // sequência do site. Mesmo com o pin de 300vh, dá 32vh por benefício:
  // um pouco mais rápido que os 40vh do Sight, que é o preço de ter
  // oito estados num pin só.
  useSectionProgress(secRef, (p) => {
    const n = benefits.length;
    const active = Math.floor(qdBeat(p, n) + 1e-6);
    itemRefs.current.forEach((el, i) => el && el.setAttribute("data-on", i === active ? "true" : "false"));
    frameRefs.current.forEach((el, i) => el && el.setAttribute("data-on", i === active ? "true" : "false"));
    railRefs.current.forEach((el, i) => el && el.setAttribute("data-on", i <= active ? "true" : "false"));
  });

  return (
    <section id="founders" className="qd-benefits" ref={secRef}>
      <div className="qd-benefits-stage">
        <div className="container qd-benefits-grid">
          <div className="qd-benefits-copy">
            <FadeIn><span className="qd-eyebrow">Para founders</span></FadeIn>
            {/* Duas linhas de largura parecida (391 e 383px em 1440):
                as três afirmações couberam em duas linhas com o itálico
                serif só no "Equity-free". */}
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              lines={[
                <>Gratuito e curado.</>,
                <><em>Equity-free</em> sempre.</>,
              ]} />
            <FadeIn delay={200}>
              <p className="lede" style={{maxWidth: "34ch"}}>
                Espaço, comunidade e progresso.<br />
                Entrar é gratuito. Ficar se conquista.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
                <LiquidButton href="#aplicar">Aplicar para o Quadrado <ArrowUpRight className="arrow" /></LiquidButton>
              </div>
            </FadeIn>
          </div>
          <div className="qd-benefits-side">
            {/* a foto do passo ativo fica acima do texto e troca com ele */}
            <div className="qd-benefits-media">
              {benefits.map((b, i) => (
                <div key={b.t} className="qd-benefits-frame" data-on={i === 0 ? "true" : "false"}
                  ref={(el) => { frameRefs.current[i] = el; }}>
                  <MediaSlot id={b.slot} label={b.sl} focus={b.focus} />
                </div>
              ))}
            </div>
            <div className="qd-benefits-stack">
              {benefits.map((b, i) => (
                <div key={b.t} className="qd-benefit" data-on={i === 0 ? "true" : "false"}
                  ref={(el) => { itemRefs.current[i] = el; }}>
                  <span className="n">{String(i + 1).padStart(2, "0")} / {String(benefits.length).padStart(2, "0")}</span>
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                </div>
              ))}
            </div>
            <div className="qd-benefits-rail" aria-hidden="true">
              {benefits.map((b, i) => (
                <span key={b.t} data-on={i === 0 ? "true" : "false"}
                  ref={(el) => { railRefs.current[i] = el; }}></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOR MAINTAINERS — 5 numbered entry-paths, hover reveal
// ============================================================
function VForMaintainers() {
  const plans = [
    { n: "01", tag: "Institucional", t: <><em>Mantenedor</em> Institucional</>, d: "Marca presente e relacionamento contínuo com a comunidade." },
    { n: "02", tag: "Vertical", t: <><em>Sala</em> Temática</>, d: "Ambiente com sua marca e curadoria por vertical." },
    { n: "03", tag: "Eventos", t: <>Patrocínio de <em>Eventos</em></>, d: "Founders Night, workshops e ativações setoriais." },
    { n: "04", tag: "Validação", t: <>Desafios e <em>Hackathons</em></>, d: "Seu problema real virando piloto com startups da casa." },
    { n: "05", tag: "Parceria", t: <>Programa <em>Co-criado</em></>, d: "Trilha anual construída junto: bolsas, mentorias, indicadores." },
  ];
  return (
    <section id="mantenedores" className="qd-section qd-section-dark">
      <div className="container">
        <div className="qd-section-head qd-head-split">
          <div style={{display:"grid", gap: 24}}>
            <FadeIn><span className="qd-eyebrow">Para sua empresa</span></FadeIn>
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              lines={[
                <>Não é o espaço.</>,
                <>São os <em>founders</em>.</>,
              ]} />
          </div>
          <FadeIn delay={200} className="qd-lede-right">
            <p className="lede">
              Cinco caminhos de entrada, do desafio pontual ao programa anual co-criado.
            </p>
          </FadeIn>
        </div>
        <div className="qd-num-list">
          {plans.map(p => (
            <a key={p.n} href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(p.tag + " · Quadrado")}`} className="qd-num-row" data-cursor="hover">
              <span className="num">{p.n} / 05</span>
              <span className="body">
                <span className="tagline">{p.tag}</span>
                <span className="title">{p.t}</span>
                <span className="desc">{p.d}</span>
              </span>
              <span className="arrow">→</span>
              <span className="preview"><MediaTile label={p.tag.toLowerCase()} /></span>
            </a>
          ))}
        </div>
        <FadeIn delay={200}>
          <div style={{
            marginTop: 64, padding: 36,
            border: "1px solid var(--border-subtle)", borderRadius: "var(--r-xl)",
            display:"flex", flexWrap:"wrap", gap: 32, alignItems:"center", justifyContent:"space-between",
            background: "var(--bg-card)",
          }}>
            <div>
              <h3 className="serif" style={{margin: "0 0 8px", fontSize: "clamp(1.4rem, 1rem + 1vw, 2rem)", fontStyle: "italic", letterSpacing:"-0.018em"}}>
                Conversamos sobre o que faz <em>sentido</em> para sua empresa.
              </h3>
              <p style={{margin: 0, color: "var(--text-tertiary)", fontSize: 15}}>
                Os planos não são prateleira. São pontos de entrada para construir junto.
              </p>
            </div>
            <LiquidButton href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Mantenedor · Quadrado")}`}>Falar com o Quadrado <ArrowUpRight className="arrow" /></LiquidButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================
// VIDA NO QDDO — mosaico de fotos com parallax + filmstrip de
// clipes + cadência de eventos (fusão de VMosaic + VEvents)
// ============================================================
function VLife() {
  // Galeria elástica: eram quatro slots de vídeo (clip-01..04) esperando
  // aftermovie. Como o acervo é de foto, virou foto: quatro registros que
  // o mosaico acima não cobre (palco, networking, coworking, dupla).
  const clips = [
    { id: "vida-05", label: "founders night · palco", focus: "37% 50%" },
    { id: "vida-06", label: "networking · café",      focus: "63% 50%" },
    { id: "vida-07", label: "coworking · rotina",     focus: "11% 50%" },
    { id: "vida-08", label: "dupla · mesa de trabalho", focus: "76% 50%" },
  ];
  const rhythm = [
    { f: "Mensal",    t: "Founders Night", d: "A comunidade inteira, uma vez por mês." },
    { f: "Semanal",   t: "Office hours",   d: "Mentoria aberta com operadores." },
    { f: "Quinzenal", t: "Workshops",      d: "Produto, vendas, captação, narrativa." },
  ];
  return (
    <section id="vida" className="qd-section">
      <div className="container">
        <div className="qd-section-head qd-head-split">
          <div style={{display:"grid", gap: 24}}>
            <FadeIn><span className="qd-eyebrow">Vida no Quadrado</span></FadeIn>
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              lines={[
                <>A comunidade</>,
                <>acontece <em>ao vivo</em>.</>,
              ]} />
          </div>
          <FadeIn delay={200} className="qd-lede-right">
            <p className="lede">
              O registro, não o discurso.
            </p>
          </FadeIn>
        </div>

        {/* Mosaico assimétrico com parallax interno */}
        <FadeIn>
          <div className="qd-mosaic">
            <div className="qd-mosaic-cell">
              <Parallax speed={0.08} style={{height: "116%", marginTop: "-8%"}}>
                <MediaSlot id="vida-01" label="founders night · palco" spec="retrato alto" focus="61% 50%" />
              </Parallax>
            </div>
            <div className="qd-mosaic-cell">
              <Parallax speed={0.11} style={{height: "116%", marginTop: "-8%"}}>
                <MediaSlot id="vida-02" label="networking · plano aberto" spec="paisagem" focus="30% 50%" />
              </Parallax>
            </div>
            <div className="qd-mosaic-cell">
              <Parallax speed={0.09} style={{height: "116%", marginTop: "-8%"}}>
                <MediaSlot id="vida-03" label="mentoria · mesa" spec="quadrado" focus="54% 50%" />
              </Parallax>
            </div>
            <div className="qd-mosaic-cell">
              <Parallax speed={0.13} style={{height: "116%", marginTop: "-8%"}}>
                <MediaSlot id="vida-04" label="espaço · bastidores" spec="quadrado" focus="50% 9%" />
              </Parallax>
            </div>
          </div>
        </FadeIn>

        {/* Galeria elástica: o painel sob o cursor abre, os vizinhos cedem */}
        <FadeIn delay={150}>
          <ElasticGallery items={clips} />
        </FadeIn>

        {/* Cadência de programação — sem datas que envelhecem */}
        <div className="qd-split" style={{marginTop: "clamp(64px, 9vw, 120px)"}}>
          <div>
            <h3 className="mono" style={{fontSize: 11, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--text-tertiary)", margin: "0 0 8px"}}>A cadência</h3>
            <div style={{borderTop: "1px solid var(--border-subtle)"}}>
              {rhythm.map((r, i) => (
                <FadeIn key={r.t} delay={i * 60}>
                  <div className="qd-rhythm-row">
                    <span className="freq">{r.f}</span>
                    <div>
                      <h3 className="serif" style={{margin: "0 0 4px", fontSize: 24, fontStyle: "italic", letterSpacing: "-0.014em"}}>{r.t}</h3>
                      <p style={{margin: 0, fontSize: 14, color: "var(--text-tertiary)", lineHeight: 1.5}}>{r.d}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={200}>
            <div style={{padding: 28, border: "1px dashed var(--border-default)", borderRadius: "var(--r-md)", display:"grid", gap: 12}}>
              <span className="mono" style={{fontSize: 11, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--text-tertiary)"}}>Em expansão</span>
              <p style={{margin: 0, fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6}}>
                Hackathons, Demo Day e encontros setoriais, ativados com as empresas.
              </p>
              <a href="#mantenedores" className="qd-explore" style={{justifySelf: "start"}}>Ativar com sua empresa →</a>
            </div>
          </FadeIn>
        </div>

        <DividerRow eyebrow="Território">
          Brasília é a única capital com vocação de testar políticas, marcas e produtos em <em>escala nacional</em> desde o dia um.
        </DividerRow>
      </div>
    </section>
  );
}

// ============================================================
// PORTFÓLIO — leque de painéis que reage ao cursor.
// O rótulo da seção é **Portfólio**, não "Cases" (pedido do Ed,
// 21/08/2026): são empresas da comunidade com produto no ar, não
// estudos de caso. O id `#cases` e o nome `VCases` ficaram como estão
// para não quebrar as âncoras já espalhadas pelo site.
// Conteúdo é estrutura: os cases reais entram no lugar destes
// Cinco startups reais da comunidade (20/08/2026). O slot leva o nome da
// startup (`case-<startup>.jpg`) em vez de número: a foto de cada uma é
// específica, e slot numerado convida a trocar a ordem e desencontrar
// foto e texto. Os antigos `case-01..05.jpg` ficaram órfãos em disco.
//
// Pesquisa: ProfPlay (profplay.com.br), Polus (polusbrasil.com.br) e
// SporTickets (sportickets.com.br) foram confirmadas na web — daí os
// números e o verbo de cada descrição. Cotia e PrimoraInc não têm
// presença pública encontrável: a descrição delas é só o que o Ed
// passou, sem nada inventado em cima. Conferir com os founders.
// ============================================================
function VCases() {
  const cases = [
    // `d` é um par de linhas, não uma frase: duas linhas de largura
    // parecida, quebra declarada (a mesma regra dos títulos de seção). O
    // painel é estreito, então o texto corrido caía em três linhas com a
    // última órfã. Alvo: ≤ 30 caracteres por linha e desvio ≤ 10%.
    { tag: "EngTech",    t: "Cotia",       d: ["Tecnologia na engenharia,", "do projeto até o canteiro."],
      slot: "case-cotia",       sl: "canteiro de obra visto de cima" },
    { tag: "SportsTech", t: "SporTickets", d: ["Inscrição e ingresso", "no esporte amador."],
      slot: "case-sportickets", sl: "campo de futebol visto de cima" },
    { tag: "RetailTech", t: "PrimoraInc",  d: ["Recompra automática,", "o cliente volta sozinho."],
      slot: "case-primora",     sl: "latas em linha, vistas de cima" },
    { tag: "EventTech",  t: "ProfPlay",    d: ["O evento corporativo inteiro.", "Inscrição, check-in, certificado."],
      slot: "case-profplay",    sl: "sala de treinamento vista de cima" },
    { tag: "EnergyTech", t: "Polus",       d: ["Câmara fria gerida por IA,", "até 25% menos energia."],
      slot: "case-polus",       sl: "casa de máquinas vista de cima" },
  ];
  return (
    <section id="cases" className="qd-section qd-section-dark">
      <div className="container">
        <div className="qd-section-head qd-head-split">
          <div style={{display:"grid", gap: 24}}>
            <FadeIn><span className="qd-eyebrow">Portfólio</span></FadeIn>
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              lines={[<>O que <em>cresce</em> conosco.</>]} />
          </div>
          <FadeIn delay={200} className="qd-lede-right">
            {/* Era "Desafio de empresa, founder da casa, piloto rodando",
                escrito para cases fictícios de desafio corporativo. As
                cinco startups reais não são pilotos de desafio: são
                empresas da comunidade com produto no ar. */}
            <p className="lede">
              Startups da comunidade com produtos no ar.
            </p>
          </FadeIn>
        </div>
        <FadeIn>
          <StackedPanels items={cases} />
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================
// COMMUNITY — filterable grid with photo cards
// ============================================================
function VCommunity() {
  const verticals = ["Todos", "GovTech", "AgTech", "HealthTech", "FinTech", "EdTech", "Retail", "Sustainability", "Creator"];
  const startups = [
    { n: "Plantio.ai", v: "AgTech", st: "residente", d: "Visão computacional para manejo de safra." },
    { n: "Civis",      v: "GovTech", st: "membro",    d: "Plataforma de transparência para municípios." },
    { n: "Heran",      v: "HealthTech", st: "residente", d: "Triagem clínica assistida por IA." },
    { n: "Pixie",      v: "Creator",  st: "comunidade", d: "Studio para criadores monetizarem comunidade." },
    { n: "Pilar",      v: "FinTech",  st: "membro",    d: "Crédito estruturado para o agronegócio familiar." },
    { n: "Curupira",   v: "Sustainability", st: "membro", d: "MRV de carbono para projetos de restauração." },
    { n: "Kosmos",     v: "EdTech",   st: "comunidade", d: "Tutor adaptativo para ensino básico público." },
    { n: "Brasa",      v: "Retail",   st: "residente", d: "Operações in-store guiadas por dados." },
  ];
  const [active, setActive] = React.useState("Todos");
  const filtered = active === "Todos" ? startups : startups.filter(s => s.v === active);
  return (
    <section id="comunidade" className="qd-section">
      <div className="container">
        <div className="qd-section-head" style={{display:"grid", gridTemplateColumns:"minmax(0, 1fr) minmax(0, 1.2fr)", gap: 48, alignItems:"end"}}>
          <div style={{display:"grid", gap: 24}}>
            <FadeIn><span className="qd-eyebrow">Comunidade</span></FadeIn>
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              style={{fontSize: "clamp(2rem, 1.2rem + 3.6vw, 4.8rem)"}} lines={[
                <>A prova não é a <em>lista</em>.</>,
                <>É quem está <em>dentro</em>.</>,
              ]} />
          </div>
          <FadeIn delay={200}>
            <p className="lede" style={{maxWidth: "44ch"}}>
              Founders e startups que fazem parte do QDDO, em oito verticais. Curadoria contínua: presença, contribuição e progresso.
            </p>
          </FadeIn>
        </div>

        <FadeIn>
          <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom: 40}}>
            {verticals.map(v => (
              <button key={v} onClick={()=>setActive(v)} data-cursor="hover" style={{
                padding: "8px 16px",
                borderRadius: "var(--r-full)",
                border: "1px solid " + (active === v ? "var(--accent)" : "var(--border-default)"),
                background: active === v ? "var(--accent)" : "transparent",
                color: active === v ? "var(--white-000)" : "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                fontSize: 11, letterSpacing:"0.12em", textTransform:"uppercase",
                transition: "all var(--d-fast) var(--ease-out)",
              }}>{v}</button>
            ))}
          </div>
        </FadeIn>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap: 24}}>
          {filtered.map((s, i) => (
            <FadeIn key={s.n} delay={i*60}>
              <a href="#startup" data-cursor="hover" style={{
                display:"block",
                borderRadius: "var(--r-md)",
                overflow:"hidden",
                background:"var(--bg-canvas)",
                border:"1px solid var(--border-subtle)",
                transition: "border-color 280ms var(--ease-out), transform 380ms var(--ease-out-expo)",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "none"; }}>
                <div style={{aspectRatio: "4/3", position:"relative"}}>
                  <EditorialPhoto label={s.n.toLowerCase()} variant={(i % 4) + 1} style={{borderRadius: 0, border: 0}} />
                </div>
                <div style={{padding: 22, display:"grid", gap: 10}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                    <h3 className="serif" style={{margin:0, fontSize: 22, fontStyle:"italic", letterSpacing:"-0.014em"}}>{s.n}</h3>
                    <span className="mono" style={{fontSize: 10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--accent)"}}>{s.v}</span>
                  </div>
                  <p style={{margin: 0, fontSize: 13.5, color:"var(--text-tertiary)", lineHeight: 1.5}}>{s.d}</p>
                  <span className="mono" style={{marginTop: 4, fontSize: 10, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.14em"}}>{s.st}</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
        <div style={{marginTop: 56, textAlign:"center"}}>
          <a href="#comunidade-todas" className="qd-explore">Ver toda a comunidade →</a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// EVENTS — list + upcoming
// ============================================================
function VEvents() {
  const active = [
    { d: "QUI · 14 MAI", t: "Founders Night #08", l: "CCUG · Brasília" },
    { d: "TER · 19 MAI", t: "Office Hours · Captação", l: "QDDO Hub" },
    { d: "QUA · 27 MAI", t: "Workshop · Sales para early-stage", l: "QDDO Hub" },
  ];
  const upcoming = [
    { t: "Hackathon Mantenedor", d: "Desafio real, time misto, resolução em 48h." },
    { t: "Demo Day", d: "Vitrine curada para investidores e executivos." },
    { t: "Encontros setoriais", d: "Verticais reunindo founders e empresas." },
  ];
  return (
    <section id="eventos" className="qd-section qd-section-dark">
      <div className="container">
        <div className="qd-section-head" style={{display:"grid", gridTemplateColumns:"minmax(0, 1fr) minmax(0, 1.2fr)", gap: 48, alignItems:"end"}}>
          <div style={{display:"grid", gap: 24}}>
            <FadeIn><span className="qd-eyebrow">Programação</span></FadeIn>
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              style={{fontSize: "clamp(2.2rem, 1.2rem + 4vw, 5rem)"}} lines={[
                <>Encontros <em>recorrentes</em>.</>,
                <>Comunidade com <em>cadência</em>.</>,
              ]} />
          </div>
          <FadeIn delay={200}>
            <p className="lede" style={{maxWidth: "42ch"}}>
              Eventos não são fim. São o ritmo que mantém a comunidade conectada, e o canal por onde mantenedores ativam relacionamento.
            </p>
          </FadeIn>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"minmax(0, 1.4fr) minmax(0, 1fr)", gap: 80}}>
          <div>
            <h3 className="mono" style={{fontSize: 11, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--text-tertiary)", margin: "0 0 24px"}}>Em operação</h3>
            <div style={{borderTop: "1px solid var(--border-subtle)"}}>
              {active.map((e, i) => (
                <FadeIn key={i} delay={i*60}>
                  <a href="#evento" data-cursor="hover" style={{
                    display:"grid", gridTemplateColumns:"160px minmax(0, 1fr) auto",
                    gap: 24, padding: "24px 0", borderBottom: "1px solid var(--border-subtle)",
                    alignItems: "center", transition: "padding 280ms var(--ease-out)",
                  }} onMouseEnter={ev=>ev.currentTarget.style.paddingLeft="14px"} onMouseLeave={ev=>ev.currentTarget.style.paddingLeft="0"}>
                    <span className="mono" style={{fontSize: 12, letterSpacing:"0.12em", color: "var(--accent)"}}>{e.d}</span>
                    <div>
                      <h3 className="serif" style={{margin: "0 0 4px", fontSize: 26, fontStyle: "italic", letterSpacing:"-0.014em"}}>{e.t}</h3>
                      <span style={{fontSize: 13, color:"var(--text-tertiary)"}}>{e.l}</span>
                    </div>
                    <span style={{fontSize: 20, color: "var(--text-tertiary)"}}>↗</span>
                  </a>
                </FadeIn>
              ))}
            </div>
            <a href="#agenda" className="qd-explore" style={{marginTop: 28, display:"inline-flex"}}>Agenda completa →</a>
          </div>
          <div>
            <h3 className="mono" style={{fontSize: 11, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--text-tertiary)", margin: "0 0 24px"}}>Em expansão</h3>
            <div style={{display:"grid", gap: 14}}>
              {upcoming.map((u, i) => (
                <FadeIn key={i} delay={i*60}>
                  <div style={{padding: 24, border: "1px dashed var(--border-default)", borderRadius: "var(--r-md)"}}>
                    <h3 className="serif" style={{margin: "0 0 8px", fontSize: 18, fontStyle: "italic", letterSpacing: "-0.014em"}}>{u.t}</h3>
                    <p style={{margin: 0, fontSize: 13.5, color:"var(--text-tertiary)", lineHeight: 1.5}}>{u.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOUNDER PLATFORM — featured card with mock dashboard
// ============================================================
function VFounderPlatform() {
  const secRef = React.useRef(null);
  const mockRef = React.useRef(null);

  // A tela começa deitada em perspectiva e se levanta conforme a
  // seção atravessa a viewport (--cs vai de 1 a 0).
  useScrollProgress(secRef, (p) => {
    if (mockRef.current) mockRef.current.style.setProperty("--cs", (1 - p).toFixed(3));
  }, { start: "top bottom", end: "top 38%" });

  return (
    <section id="plataforma" className="qd-section" ref={secRef}>
      <div className="container">
        <FadeIn>
          <div className="qd-platform-grid" style={{
            background: `linear-gradient(180deg, var(--bg-elevated) 0%, var(--bg-subtle) 100%)`,
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--r-2xl)",
            padding: "clamp(48px, 7vw, 96px)",
            position: "relative", overflow: "hidden",
          }}>
            <div aria-hidden style={{
              position:"absolute", top: -160, right: -160, width: 480, height: 480, borderRadius: "50%",
              background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)", opacity: 0.18,
            }}></div>
            <div style={{position:"relative", display: "grid", gap: 24}}>
              <span className="qd-eyebrow">Plataforma do Founder</span>
              {/* Duas linhas de largura parecida (325 e 335px em 1440).
                  O <br /> fixa a quebra: solto, o texto caía em
                  275/416px, porque "membros aprovados." sozinho já mede
                  416 e nenhuma primeira linha curta empata com isso. */}
              <h2 className="qd-statement">
                A plataforma é<br />de quem <em>passou</em>.
              </h2>
              <p className="lede" style={{maxWidth: 520}}>
                Agenda, oportunidades, desafios e conexões. Acesso após curadoria.
              </p>
              <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
                <LiquidButton href="#aplicar">Aplicar para acessar <ArrowUpRight className="arrow" /></LiquidButton>
              </div>
            </div>
            <Parallax speed={0.08} style={{position:"relative"}}>
              <div ref={mockRef} className="qd-platform-mock" style={{
                background: "var(--black-900)", border: "1px solid var(--border-default)",
                borderRadius: "var(--r-md)", padding: 20, fontFamily: "var(--font-mono)", fontSize: 12,
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              }}>
                <div style={{display:"flex", gap: 6, marginBottom: 18, alignItems:"center"}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:"#444"}}></span>
                  <span style={{width:8,height:8,borderRadius:"50%",background:"#444"}}></span>
                  <span style={{width:8,height:8,borderRadius:"50%",background:"var(--accent)"}}></span>
                  <span style={{marginLeft: "auto", color:"var(--text-muted)", fontSize: 11}}>plataforma.qddo.com.br</span>
                </div>
                <div style={{display:"grid", gap: 10}}>
                  {[
                    ["Founders Night #08", "14 mai", "var(--accent)"],
                    ["Desafio · Banco do Brasil", "aberto", "var(--text-tertiary)"],
                    ["Mentoria · Captação Seed", "2 vagas", "var(--text-tertiary)"],
                    ["Benefício · AWS Activate", "resgatar", "var(--text-tertiary)"],
                  ].map(([k, v, c], i) => (
                    <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"12px 14px", background:"var(--black-850)", borderRadius: 8}}>
                      <span style={{color:"var(--text-secondary)"}}>{k}</span>
                      <span style={{color: c}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Parallax>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================
// NOT THIS — what we're not
// ============================================================
function VNotThis() {
  const items = [
    "Não somos apenas um coworking",
    "Não somos consultoria tradicional",
    "Não somos evento pontual",
    "Não prometemos resultado instantâneo",
    "Não substituímos times de inovação",
    "Não aceitamos qualquer founder para crescer número",
  ];
  return (
    <section className="qd-section">
      <div className="container-narrow">
        <div className="qd-section-head" style={{display:"grid", gap: 28}}>
          <FadeIn><span className="qd-eyebrow">Para preservar a comunidade</span></FadeIn>
          <RevealText
            as="h2"
            className="qd-statement"
            stagger={110}
            style={{fontSize: "clamp(2.4rem, 1.4rem + 4.8vw, 6rem)"}} lines={[
              <>O que o QDDO</>,
              <><em>não</em> é.</>,
            ]} />
          <FadeIn delay={300}>
            <p className="lede">Clareza de posicionamento é parte do produto. Saber o que somos exige saber o que não somos.</p>
          </FadeIn>
        </div>
        <ul style={{listStyle:"none", padding: 0, margin: 0}}>
          {items.map((it, i) => (
            <FadeIn key={i} delay={i*60} as="li">
              <div style={{
                display:"grid", gridTemplateColumns:"56px 1fr", gap: 20, alignItems:"center",
                padding: "24px 0", borderTop: "1px solid var(--border-subtle)",
                fontSize: "clamp(1.25rem, 1rem + 0.8vw, 1.625rem)", color: "var(--text-secondary)",
                fontFamily: "var(--font-sans)", fontWeight: 400, letterSpacing: "-0.01em",
              }}>
                <span style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "1px solid var(--border-default)",
                  display:"inline-flex", alignItems:"center", justifyContent:"center",
                  color: "var(--accent)", fontSize: 18,
                }}>×</span>
                <span>{it}</span>
              </div>
            </FadeIn>
          ))}
          <li style={{borderTop: "1px solid var(--border-subtle)"}}></li>
        </ul>
        <FadeIn delay={200}>
          <p className="serif" style={{
            marginTop: 56, fontSize: "clamp(1.4rem, 1rem + 1vw, 1.875rem)", lineHeight: 1.3,
            letterSpacing:"-0.014em", maxWidth: "44ch", fontStyle: "italic",
          }}>
            O QDDO é <span style={{color:"var(--accent)"}}>infraestrutura de longo prazo</span> para quem quer construir inovação com presença, comunidade e validação.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================
// BLOG
// ============================================================
function VBlog() {
  const posts = [
    { cat: "Ecossistema", t: "Por que Brasília precisa de um sandbox de inovação aberta", d: "11 mai · 6 min" },
    { cat: "Founder", t: "Plantio.ai: como uma agtech do DF está validando com o agro de Goiás", d: "04 mai · 8 min" },
    { cat: "Mantenedores", t: "O que muda quando empresa testa com founder, não com fornecedor", d: "29 abr · 5 min" },
  ];
  return (
    <section id="blog" className="qd-section">
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"end", marginBottom: 64, gap: 24, flexWrap:"wrap"}}>
          <div style={{display:"grid", gap: 24}}>
            <FadeIn><span className="qd-eyebrow">Blog · Notícias</span></FadeIn>
            <FadeIn delay={100}>
              <h2 className="qd-statement" style={{fontSize: "clamp(2rem, 1.2rem + 3vw, 4.2rem)"}}>
                Conteúdo <em>vivo</em> do ecossistema.
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={200}><a href="#blog-todos" className="qd-explore">Ver todos os posts →</a></FadeIn>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap: 24}}>
          {posts.map((p, i) => (
            <FadeIn key={i} delay={i*60}>
              <a href="#post" data-cursor="hover" style={{
                display:"block", borderRadius: "var(--r-md)", overflow:"hidden",
                border: "1px solid var(--border-subtle)",
                transition: "border-color 280ms, transform 380ms var(--ease-out-expo)",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border-subtle)"; e.currentTarget.style.transform="none";}}>
                <div style={{aspectRatio: "16/10"}}>
                  <EditorialPhoto label={p.cat.toLowerCase()} variant={(i%4)+1} style={{borderRadius:0, border:0}} />
                </div>
                <div style={{padding: 28, display:"grid", gap: 12}}>
                  <span className="mono" style={{fontSize: 11, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--accent)"}}>{p.cat}</span>
                  <h3 className="serif" style={{margin: 0, fontSize: 24, lineHeight: 1.15, letterSpacing:"-0.014em", fontStyle: "italic"}}>{p.t}</h3>
                  <span style={{fontSize: 12, color: "var(--text-tertiary)", fontFamily:"var(--font-mono)", letterSpacing:"0.1em"}}>{p.d}</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BIG FINAL STATEMENT (before CTA)
// ============================================================
function VBigStatement() {
  return (
    <section className="qd-section">
      <div className="container-narrow" style={{textAlign:"center"}}>
        <FadeIn><span className="qd-eyebrow" style={{justifyContent:"center"}}>O futuro</span></FadeIn>
        <RevealText
          as="h2"
          className="qd-statement"
          stagger={120}
          style={{marginTop: 32, fontSize: "clamp(2.6rem, 1.4rem + 6.4vw, 8rem)"}} lines={[
            <>O futuro é</>,
            <>feito de <em>escolhas</em>.</>,
          ]} />
        <FadeIn delay={400}>
          <p className="lede" style={{maxWidth: "44ch", margin: "32px auto 0", textAlign:"center"}}>
            Inovação real exige presença real. Veja como o QDDO pode caminhar com você.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================
// APLICAÇÃO — formulário real dentro do site + critérios
// ============================================================
// Cole aqui a URL do endpoint (Formspree, Tally, backend próprio).
// Vazio = modo protótipo: valida, loga no console e mostra sucesso,
// mas NÃO envia para lugar nenhum.
const APPLY_ENDPOINT = "";

function VApply() {
  const [status, setStatus] = React.useState("idle"); // idle | sending | ok | error

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("website")) return; // honeypot anti-spam
    setStatus("sending");
    const done = () => setStatus("ok");
    const fail = () => setStatus("error");
    if (APPLY_ENDPOINT) {
      fetch(APPLY_ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } })
        .then((r) => (r.ok ? done() : fail()))
        .catch(fail);
    } else {
      console.log("[QDDO] Aplicação (modo protótipo):", Object.fromEntries(fd));
      setTimeout(done, 700);
    }
  };

  const criteria = [
    { n: "01", t: "Founder em movimento", d: "Produto, validação ou operação ativos." },
    { n: "02", t: "Presença real", d: "Rotina presencial em Brasília / Centro-Oeste." },
    { n: "03", t: "Contribuição", d: "Dar antes de receber." },
    { n: "04", t: "Progresso mensurável", d: "Permanência reavaliada pela evolução." },
  ];

  return (
    <section id="aplicar" className="qd-section qd-section-dark">
      <div className="container">
        <div className="qd-split">
          <div className="qd-split-sticky">
            <FadeIn><span className="qd-eyebrow">Aplicação</span></FadeIn>
            <RevealText
              as="h2"
              className="qd-statement"
              stagger={110}
              lines={[
                <>Destrave o <em>crescimento</em>.</>,
              ]} />
            <FadeIn delay={200}>
              <p className="lede" style={{maxWidth: "40ch"}}>
                Cinco minutos de formulário. Uma conversa com a curadoria.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <div id="criterios" style={{display:"grid", gap: 0, borderTop: "1px solid var(--border-subtle)"}}>
                {criteria.map((c) => (
                  <div key={c.n} style={{display:"grid", gridTemplateColumns:"48px 1fr", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--border-subtle)"}}>
                    <span className="mono" style={{fontSize: 11, letterSpacing:"0.16em", color:"var(--text-tertiary)"}}>{c.n}</span>
                    <div>
                      <h3 style={{margin: "0 0 4px", fontFamily:"var(--font-sans)", fontWeight: 500, fontSize: 15.5, letterSpacing:"-0.01em"}}>{c.t}</h3>
                      <p style={{margin: 0, fontSize: 13.5, color:"var(--text-tertiary)", lineHeight: 1.5}}>{c.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={150}>
            {status === "ok" ? (
              <div className="qd-form-ok">
                <span className="qd-eyebrow">Aplicação recebida</span>
                <h3 className="qd-statement" style={{fontSize: "clamp(1.8rem, 1.2rem + 2vw, 3rem)"}}>
                  Agora é com a <em>curadoria</em>.
                </h3>
                <p className="lede" style={{maxWidth: "44ch"}}>
                  Vamos olhar sua aplicação com atenção e retornar pelo e-mail ou
                  WhatsApp informado. Enquanto isso, apareça em um Founders Night.
                </p>
              </div>
            ) : (
              <form className="qd-form-card" onSubmit={onSubmit}>
                <div className="qd-form-head">
                  <span className="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                      <path d="M9 14h6M9 18h4" />
                    </svg>
                  </span>
                  <div>
                    <h3>Formulário de aplicação</h3>
                    <p>Leva cinco minutos. A curadoria responde por e-mail ou WhatsApp.</p>
                  </div>
                </div>
                <div className="qd-form">
                <div className="qd-field">
                  <label htmlFor="ap-nome">Nome completo *</label>
                  <input id="ap-nome" name="nome" required placeholder="Seu nome" />
                </div>
                <div className="qd-field">
                  <label htmlFor="ap-email">E-mail *</label>
                  <input id="ap-email" name="email" type="email" required placeholder="voce@startup.com" />
                </div>
                <div className="qd-field">
                  <label htmlFor="ap-zap">WhatsApp</label>
                  <input id="ap-zap" name="whatsapp" placeholder="(61) 9…" />
                </div>
                <div className="qd-field">
                  <label htmlFor="ap-startup">Startup / projeto *</label>
                  <input id="ap-startup" name="startup" required placeholder="Nome do que você constrói" />
                </div>
                <div className="qd-field is-select">
                  <label htmlFor="ap-estagio">Estágio *</label>
                  <select id="ap-estagio" name="estagio" required defaultValue="">
                    <option value="" disabled>Selecione…</option>
                    <option>Ideia validando</option>
                    <option>MVP no ar</option>
                    <option>Operação com clientes</option>
                    <option>Tração / crescimento</option>
                  </select>
                </div>
                <div className="qd-field is-select">
                  <label htmlFor="ap-vertical">Vertical</label>
                  <select id="ap-vertical" name="vertical" defaultValue="">
                    <option value="">Selecione…</option>
                    <option>GovTech</option>
                    <option>AgTech</option>
                    <option>HealthTech</option>
                    <option>FinTech</option>
                    <option>EdTech</option>
                    <option>Retail</option>
                    <option>Sustainability</option>
                    <option>Creator</option>
                    <option>Outra</option>
                  </select>
                </div>
                <div className="qd-field full">
                  <label htmlFor="ap-link">Link (site, deck ou LinkedIn)</label>
                  <input id="ap-link" name="link" placeholder="https://…" />
                  {/* o que aceitamos, no padrão dos chips do card de referência */}
                  <div className="qd-form-chips" aria-hidden="true">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
                      </svg>
                      Site
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                      </svg>
                      Deck
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4" />
                      </svg>
                      LinkedIn
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7v.01" />
                      </svg>
                      Instagram
                    </span>
                  </div>
                </div>
                <div className="qd-field full">
                  <label htmlFor="ap-motivo">Por que o Quadrado, e o que você traz? *</label>
                  <textarea id="ap-motivo" name="motivacao" required placeholder="Direto ao ponto: o que você busca e o que contribui." />
                </div>
                <label className="qd-hp" aria-hidden="true">
                  Não preencher <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                {status === "error" && (
                  <p className="full" style={{margin: 0, color: "var(--accent)", fontSize: 14}}>
                    Algo falhou no envio. Tente de novo ou escreva para {CONTACT_EMAIL}.
                  </p>
                )}
                </div>

                {/* Rodapé do cartão: fio, aviso à esquerda, ação à direita.
                    TERMS_URL: a página ainda não existe. Quando existir,
                    é só apontar a constante no topo do arquivo. */}
                <div className="qd-form-foot">
                  <span className="fineprint">
                    Ao aplicar, você concorda com os{" "}
                    <a href={TERMS_URL} data-cursor="hover">termos e condições</a>.
                  </span>
                  <LiquidButton type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Enviando…" : <>Enviar aplicação <ArrowUpRight className="arrow" /></>}
                  </LiquidButton>
                </div>
              </form>
            )}
          </FadeIn>
        </div>

        {/* Fecha a seção com a sala cheia: é para essa comunidade que a
            aplicação aponta. Fora do `.qd-split` de propósito — dentro da
            coluna dos critérios ela passava dos 100vh e matava o `sticky`
            da coluna em qualquer notebook. */}
        <FadeIn delay={150}>
          <MediaSlot id="aplicar-01" label="a comunidade no auditório"
            className="qd-apply-photo" focus="50% 35%" />
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA — three paths
// ============================================================
function VFinalCTA() {
  const paths = [
    // Títulos em duas linhas de tamanho parecido, na bastonada de display.
    // Três tags curtas por cartão: precisam caber na mesma linha do
    // rótulo, senão o título desce e os cartões desalinham.
    { t: "Founder",     h: ["Aplicar para", "o Quadrado"],  d: "Espaço, mentorias e progresso. Zero equity.", href: "#aplicar",
      tags: ["Espaço", "Mentorias", "Sem equity"] },
    { t: "Mantenedor",  h: ["Falar com",    "o Quadrado"],  d: "Founders, desafios reais e relacionamento.", href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Mantenedor · Quadrado")}`,
      tags: ["Acesso", "Desafios", "Eventos"] },
    { t: "Imprensa",    h: ["Acessar",      "mídia kit"],   d: "Releases, fotos e números.", href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Imprensa · Quadrado")}`,
      tags: ["Releases", "Fotos", "Vídeos"] },
  ];
  return (
    <section id="caminhos" className="qd-section">
      <div className="container">
        <div className="qd-section-head" style={{textAlign:"center", marginInline:"auto", justifyItems: "center"}}>
          <FadeIn><span className="qd-eyebrow">Caminhos</span></FadeIn>
          <RevealText
            as="h2"
            className="qd-statement"
            stagger={110}
            style={{margin: 0, textAlign:"center"}} lines={[
              <>Formas de se <em>aplicar</em>.</>,
            ]} />
        </div>
        <div className="qd-paths">
          {paths.map((p, i) => (
            <FadeIn key={p.t} delay={i*80}>
              <a href={p.href} data-cursor="hover" className="qd-path-card">
                <div className="top">
                  <span className="kicker">{p.t}</span>
                  <span className="tags">
                    {p.tags.map(tg => <span key={tg}>{tg}</span>)}
                  </span>
                </div>
                <h3>{p.h.map((linha) => <span key={linha}>{linha}</span>)}</h3>
                <p>{p.d}</p>
                <span className="go">→</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function VFooter() {
  return (
    <footer className="qd-footer-min">
      <div className="container">
        <div className="qd-footer-top">
          <div>
            <p style={{fontSize: 13.5, color:"var(--text-secondary)", maxWidth: "26ch", lineHeight: 1.6, margin: 0}}>
              Centro de Convenções Ulysses Guimarães<br/>
              SDC Lote 5 · Brasília · DF
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} data-cursor="hover"
              style={{display:"inline-block", marginTop: 18, fontSize: 14, color:"var(--text-primary)", borderBottom:"1px solid var(--border-default)", paddingBottom: 3}}>
              {CONTACT_EMAIL}
            </a>
            {[SOCIAL.instagram, SOCIAL.linkedin, SOCIAL.youtube].some(Boolean) && (
              <div style={{display:"flex", gap: 10, marginTop: 22}}>
                {[["IG", SOCIAL.instagram], ["LI", SOCIAL.linkedin], ["YT", SOCIAL.youtube]]
                  .filter(([, u]) => u)
                  .map(([s, u]) => (
                    <a key={s} href={u} target="_blank" rel="noreferrer" data-cursor="hover" style={{
                      width: 34, height: 34, borderRadius: "var(--r-chip)",
                      border: "1px solid var(--border-default)",
                      display:"inline-flex", alignItems:"center", justifyContent:"center",
                      fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em",
                      color:"var(--text-tertiary)",
                    }}>{s}</a>
                  ))}
              </div>
            )}
          </div>
          {[
            { t: "Navegar", l: [["Como funciona", "#como-funciona"], ["Vida no Quadrado", "#vida"], ["Portfólio", "#cases"], ["Manifesto", "#manifesto"]] },
            { t: "Entrar", l: [["Para founders", "#founders"], ["Para empresas", "#mantenedores"], ["Aplicar", "#aplicar"]] },
            { t: "Contato", l: [["Imprensa", `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Imprensa · Quadrado")}`], ["Voltar ao topo", "#top"]] },
          ].map(c => (
            <div key={c.t}>
              {/* h3, não h4: com h4 a página saltava de h2 para h4, o
                  único furo de hierarquia que a checagem encontrou. */}
              <h3>{c.t}</h3>
              <ul>
                {c.l.map(([label, href]) => (
                  <li key={label}><a href={href} data-cursor="hover">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Fecho: fora do container, a palavra ocupa a largura da tela.
          Sob o cursor cada letra recua e abre uma janela para a foto. */}
      <div className="qd-footer-word">
        <RevealWord text="QUADRADO" fit />
      </div>

      <div className="container">
        <div className="qd-footer-base">
          <span className="fineprint">© 2026 QDDO Central Hub</span>
          <span className="fineprint">Brasília · Centro-Oeste · Brasil</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  VLife, VApply, VCases,
  VForFounders, VForMaintainers, VCommunity, VEvents, VFounderPlatform,
  VNotThis, VBlog, VBigStatement, VFinalCTA, VFooter,
});
