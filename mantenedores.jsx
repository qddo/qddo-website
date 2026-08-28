/* global React, FadeIn, RevealText, LiquidButton, ArrowUpRight, MediaSlot, SlidingNumber */

const MAINTAINER_FORM_ENDPOINT = "https://formsubmit.co/ed.ribeiro@h4ndslab.com";
const MAINTAINER_SUCCESS_URL = "https://qddo.github.io/qddo-website/mantenedores-obrigado.html";
const MAINTAINER_FORM_URL = "https://qddo.github.io/qddo-website/mantenedores.html#contato";
const MAINTAINER_AUTORESPONSE = `Olá! Recebemos seu contato sobre uma parceria com o QDDO Central Hub.

Nossa equipe vai analisar o contexto e retornar para entender os objetivos da sua organização e a forma de atuação mais adequada.

Obrigado pelo interesse em construir o ecossistema junto com o Quadrado.

Equipe QDDO Central Hub`;

function MHero() {
  return (
    <section id="top" className="qd-maint-hero">
      <div className="qd-maint-hero-media" aria-hidden="true">
        <MediaSlot id="vida-02" label="comunidade QDDO" focus="30% 50%" />
        <div className="qd-maint-hero-scrim"></div>
      </div>
      <div className="container qd-maint-hero-content">
        <FadeIn delay={180}><span className="qd-eyebrow">Para mantenedores</span></FadeIn>
        <RevealText as="h1" className="qd-maint-title" stagger={100} lines={[
          <>Sua empresa dentro</>,
          <>do ecossistema que <em>constrói</em>.</>,
        ]} />
        <FadeIn delay={500}>
          <p className="qd-maint-lede">
            O QDDO conecta empresas a founders, desafios e oportunidades reais.
            Construímos parcerias que geram relacionamento, aprendizado e inovação aplicada no Centro-Oeste.
          </p>
        </FadeIn>
        <FadeIn delay={650}>
          <div className="qd-maint-actions">
            <LiquidButton href="#contato">Construir uma parceria <ArrowUpRight className="arrow" /></LiquidButton>
            <a href="#atuacao" className="qd-link-plain" data-cursor="hover">Ver formas de atuação <span>↓</span></a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function MValue() {
  const outcomes = [
    { n: "01", t: "Acesso qualificado", d: "Relacionamento com founders curados, startups em movimento e atores relevantes do ecossistema." },
    { n: "02", t: "Inovação aplicada", d: "Desafios reais aproximados de soluções, testes, pilotos e novos aprendizados para a organização." },
    { n: "03", t: "Presença com propósito", d: "Marca inserida na rotina da comunidade por meio de conteúdo, encontros e contribuição concreta." },
    { n: "04", t: "Inteligência de ecossistema", d: "Contato próximo com novas tecnologias, modelos de negócio, talentos e movimentos do mercado." },
  ];
  return (
    <section id="valor" className="qd-section qd-section-dark">
      <div className="container">
        <div className="qd-section-head qd-head-split">
          <div style={{display:"grid", gap:24}}>
            <FadeIn><span className="qd-eyebrow">Proposta de valor</span></FadeIn>
            <RevealText as="h2" className="qd-statement" stagger={110} lines={[
              <>Mais que exposição.</>,
              <>Uma posição <em>ativa</em>.</>,
            ]} />
          </div>
          <FadeIn delay={180} className="qd-lede-right">
            <p className="lede">Sua empresa não entra para assistir ao ecossistema. Entra para construir valor com ele.</p>
          </FadeIn>
        </div>
        <div className="qd-maint-value-grid">
          {outcomes.map((item, i) => (
            <FadeIn key={item.n} delay={i * 70}>
              <article className="qd-maint-value-card">
                <span className="n">{item.n} / 04</span>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MWays() {
  const ways = [
    { n:"01", k:"Ecossistema", t:"Mantenedor institucional", d:"Presença contínua na comunidade, relacionamento com founders e participação na agenda do QDDO." },
    { n:"02", k:"Especialidade", t:"Vertical temática", d:"Uma frente de atuação conectada ao setor da sua empresa, com curadoria, conteúdo e conexões dedicadas." },
    { n:"03", k:"Relacionamento", t:"Eventos e experiências", d:"Founders Nights, workshops, encontros executivos e ativações desenhadas para gerar troca relevante." },
    { n:"04", k:"Inovação", t:"Desafios e pilotos", d:"Problemas reais da organização conectados a founders capazes de investigar, prototipar e validar caminhos." },
    { n:"05", k:"Longo prazo", t:"Programa co-criado", d:"Uma jornada própria com objetivos, agenda, seleção, mentorias e indicadores construídos em conjunto." },
  ];
  return (
    <section id="atuacao" className="qd-section">
      <div className="container">
        <div className="qd-section-head qd-head-split">
          <div style={{display:"grid", gap:24}}>
            <FadeIn><span className="qd-eyebrow">Formas de atuação</span></FadeIn>
            <RevealText as="h2" className="qd-statement" stagger={110} lines={[
              <>Um ponto de entrada.</>,
              <>Uma parceria feita <em>junto</em>.</>,
            ]} />
          </div>
          <FadeIn delay={180} className="qd-lede-right">
            <p className="lede">Partimos do objetivo da organização. O formato vem depois.</p>
          </FadeIn>
        </div>
        <div className="qd-maint-way-list">
          {ways.map((item, i) => (
            <FadeIn key={item.n} delay={i * 55}>
              <article className="qd-maint-way-row">
                <span className="n">{item.n} / 05</span>
                <span className="k">{item.k}</span>
                <div><h3>{item.t}</h3><p>{item.d}</p></div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MProcess() {
  const steps = [
    ["01", "Entender", "Objetivos, desafios, públicos e o papel que a empresa deseja ocupar no ecossistema."],
    ["02", "Desenhar", "Uma proposta de atuação com escopo, contrapartidas, agenda e indicadores coerentes."],
    ["03", "Ativar", "Conexões, conteúdos, encontros ou desafios executados com curadoria e acompanhamento."],
    ["04", "Aprender", "Leitura dos resultados, registro das conexões e evolução do próximo ciclo."],
  ];
  return (
    <section id="processo" className="qd-section qd-section-dark">
      <div className="container">
        <FadeIn><span className="qd-eyebrow">Como trabalhamos</span></FadeIn>
        <RevealText as="h2" className="qd-statement" stagger={110} lines={[
          <>Clareza antes da ativação.</>,
          <>Relação antes da <em>exposição</em>.</>,
        ]} />
        <div className="qd-maint-process">
          {steps.map(([n,t,d], i) => (
            <FadeIn key={n} delay={i * 70}>
              <article><span>{n}</span><h3>{t}</h3><p>{d}</p></article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MResults() {
  const stats = [
    ["+80", "founders ativos na comunidade"],
    ["+500", "conexões geradas"],
    ["+20", "eventos realizados"],
    ["08", "verticais representadas"],
  ];
  return (
    <section id="resultados" className="qd-section">
      <div className="container">
        <div className="qd-section-head qd-head-split">
          <div style={{display:"grid", gap:24}}>
            <FadeIn><span className="qd-eyebrow">Base para construir</span></FadeIn>
            <RevealText as="h2" className="qd-statement" stagger={110} lines={[
              <>A comunidade não</>,
              <>começa no <em>contrato</em>.</>,
            ]} />
          </div>
          <FadeIn delay={180} className="qd-lede-right">
            <p className="lede">Ela já existe, se encontra e gera conexões. A parceria amplia essa capacidade.</p>
          </FadeIn>
        </div>
        <div className="qd-maint-stats">
          {stats.map(([v,l], i) => (
            <FadeIn key={l} delay={i*60}><span className="v"><SlidingNumber value={v} delay={180+i*80} /></span><span className="l">{l}</span></FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MContact() {
  return (
    <section id="contato" className="qd-section qd-section-dark">
      <div className="container">
        <div className="qd-split">
          <div className="qd-split-sticky">
            <FadeIn><span className="qd-eyebrow">Vamos conversar</span></FadeIn>
            <RevealText as="h2" className="qd-statement" stagger={110} lines={[
              <>Que papel sua empresa</>,
              <>quer ocupar no <em>ecossistema</em>?</>,
            ]} />
            <FadeIn delay={180}><p className="lede" style={{maxWidth:"38ch"}}>Conte o objetivo. Nós ajudamos a desenhar a forma de atuação.</p></FadeIn>
          </div>
          <FadeIn delay={120}>
            <form className="qd-form-card" action={MAINTAINER_FORM_ENDPOINT} method="POST">
              <input type="hidden" name="_subject" value="Novo contato de mantenedor — QDDO" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={MAINTAINER_SUCCESS_URL} />
              <input type="hidden" name="_url" value={MAINTAINER_FORM_URL} />
              <input type="hidden" name="_autoresponse" value={MAINTAINER_AUTORESPONSE} />
              <div className="qd-form-head"><div><h3>Contato de parceria</h3><p>Retornaremos para entender o contexto da sua organização.</p></div></div>
              <div className="qd-form">
                <div className="qd-field"><label htmlFor="mt-nome">Nome completo *</label><input id="mt-nome" name="nome" required /></div>
                <div className="qd-field"><label htmlFor="mt-email">E-mail corporativo *</label><input id="mt-email" name="email" type="email" required /></div>
                <div className="qd-field"><label htmlFor="mt-empresa">Empresa / organização *</label><input id="mt-empresa" name="empresa" required /></div>
                <div className="qd-field"><label htmlFor="mt-cargo">Cargo *</label><input id="mt-cargo" name="cargo" required /></div>
                <div className="qd-field full is-select">
                  <label htmlFor="mt-objetivo">Principal objetivo *</label>
                  <select id="mt-objetivo" name="objetivo" required defaultValue="">
                    <option value="" disabled>Selecione…</option>
                    <option>Relacionamento com o ecossistema</option>
                    <option>Inovação aberta e desafios</option>
                    <option>Posicionamento de marca</option>
                    <option>Eventos e conteúdo</option>
                    <option>Programa co-criado</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div className="qd-field full"><label htmlFor="mt-mensagem">O que vocês querem construir? *</label><textarea id="mt-mensagem" name="mensagem" required placeholder="Contexto, desafio ou oportunidade que motivou o contato." /></div>
                <label className="qd-hp" aria-hidden="true">Não preencher <input name="_honey" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <div className="qd-form-foot">
                <span className="fineprint">Ao enviar, você concorda com os <a href="termos.html">termos e condições</a>.</span>
                <LiquidButton type="submit">Enviar contato <ArrowUpRight className="arrow" /></LiquidButton>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MHero, MValue, MWays, MProcess, MResults, MContact });
