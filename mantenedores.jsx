/* global React, FadeIn, RevealText, LiquidButton, ArrowUpRight, MediaSlot, SlidingNumber */

const MAINTAINER_FORM_ENDPOINT = "https://formsubmit.co/ed.ribeiro@h4ndslab.com";
const MAINTAINER_SUCCESS_URL = "https://qddo.github.io/qddo-website/mantenedores-obrigado.html";
const MAINTAINER_FORM_URL = "https://qddo.github.io/qddo-website/mantenedores.html#contato";
const MAINTAINER_AUTORESPONSE = `Olá! Recebemos seu contato sobre uma parceria com o Quadrado Central.

Nossa equipe vai analisar o contexto e retornar para entender os objetivos da sua organização e a forma de atuação mais adequada.

Obrigado pelo interesse em construir o ecossistema junto com o Quadrado.

Equipe Quadrado Central`;

function MHero() {
  return (
    <section id="top" className="qd-maint-hero">
      <div className="qd-maint-hero-media" aria-hidden="true">
        <MediaSlot id="vida-02" label="comunidade Quadrado Central" focus="30% 50%" />
        <div className="qd-maint-hero-scrim"></div>
      </div>
      <div className="container qd-maint-hero-content">
        <FadeIn delay={180}><span className="qd-eyebrow">Para mantenedores</span></FadeIn>
        <RevealText as="h1" className="qd-maint-title" stagger={100} lines={[
          <>Sua empresa não assiste</>,
          <>ao ecossistema. <em>Constrói com ele.</em></>,
        ]} />
        <FadeIn delay={500}>
          <p className="qd-maint-lede">
            Aproxime sua organização de founders selecionados, desafios reais e novas oportunidades de negócio em Brasília.
          </p>
        </FadeIn>
        <FadeIn delay={650}>
          <div className="qd-maint-actions">
            <LiquidButton href="#contato">Quero ser mantenedor <ArrowUpRight className="arrow" /></LiquidButton>
            <a href="#valor" className="qd-link-plain" data-cursor="hover">Entender a parceria <span>↓</span></a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function MValue() {
  const outcomes = [
    { n: "01", t: "Encontre quem constrói", d: "Acesse founders selecionados e startups em movimento — com contexto para a conversa acontecer." },
    { n: "02", t: "Leve desafios à mesa", d: "Conecte problemas da organização a quem pode investigar, testar e propor novos caminhos." },
    { n: "03", t: "Crie relações úteis", d: "Gere conversas com potencial para virar piloto, parceria, cliente, fornecedor ou aprendizado." },
    { n: "04", t: "Ocupe um papel relevante", d: "Esteja presente na rotina da comunidade por meio de encontros, conteúdo e colaboração." },
  ];
  return (
    <section id="valor" className="qd-section qd-section-dark">
      <div className="container">
        <div className="qd-section-head qd-head-split">
          <div style={{display:"grid", gap:24}}>
            <FadeIn><span className="qd-eyebrow">Proposta de valor</span></FadeIn>
            <RevealText as="h2" className="qd-statement" stagger={110} lines={[
              <>Presença que abre</>,
              <>conversas e gera <em>movimento</em>.</>,
            ]} />
          </div>
          <FadeIn delay={180} className="qd-lede-right">
            <p className="lede">O valor não está em exibir uma marca. Está no que a sua empresa consegue construir com as pessoas certas.</p>
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
    { n:"01", k:"Presença", t:"Mantenedor institucional", d:"Relacionamento contínuo com a comunidade e participação na agenda do Quadrado Central." },
    { n:"02", k:"Conexão", t:"Encontros e conteúdo", d:"Conversas, workshops e experiências desenhadas em torno de um objetivo claro." },
    { n:"03", k:"Execução", t:"Desafios e pilotos", d:"Um problema real conectado a founders capazes de investigar, prototipar e validar soluções." },
    { n:"04", k:"Estratégia", t:"Programa co-criado", d:"Uma jornada própria, com público, agenda, entregas e indicadores definidos em conjunto." },
  ];
  return (
    <section id="atuacao" className="qd-section">
      <div className="container">
        <div className="qd-section-head qd-head-split">
          <div style={{display:"grid", gap:24}}>
            <FadeIn><span className="qd-eyebrow">Formas de atuação</span></FadeIn>
            <RevealText as="h2" className="qd-statement" stagger={110} lines={[
              <>Quatro formas de</>,
              <>começar a <em>construir</em>.</>,
            ]} />
          </div>
          <FadeIn delay={180} className="qd-lede-right">
            <p className="lede">O formato acompanha o objetivo — de uma presença contínua a um desafio com começo, meio e resultado.</p>
          </FadeIn>
        </div>
        <div className="qd-maint-way-list">
          {ways.map((item, i) => (
            <FadeIn key={item.n} delay={i * 55}>
              <article className="qd-maint-way-row">
                <span className="n">{item.n} / 04</span>
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
          <>Objetivo claro.</>,
          <>Ativação com <em>contexto</em>.</>,
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
            <p className="lede">A comunidade já existe, se encontra e gera conexões. O mantenedor entra para ampliar o que ela pode realizar.</p>
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
              <>O que sua empresa quer</>,
              <>construir com o <em>ecossistema</em>?</>,
            ]} />
            <FadeIn delay={180}><p className="lede" style={{maxWidth:"38ch"}}>Conte o objetivo. Nós desenhamos o primeiro movimento juntos.</p></FadeIn>
          </div>
          <FadeIn delay={120}>
            <form className="qd-form-card" action={MAINTAINER_FORM_ENDPOINT} method="POST">
              <input type="hidden" name="_subject" value="Novo contato de mantenedor: Quadrado Central" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={MAINTAINER_SUCCESS_URL} />
              <input type="hidden" name="_url" value={MAINTAINER_FORM_URL} />
              <input type="hidden" name="_autoresponse" value={MAINTAINER_AUTORESPONSE} />
              <div className="qd-form-head"><div><h3>Conversa de parceria</h3><p>Retornaremos para entender o contexto e o objetivo da sua organização.</p></div></div>
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
                <LiquidButton type="submit">Iniciar conversa <ArrowUpRight className="arrow" /></LiquidButton>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MHero, MValue, MWays, MProcess, MResults, MContact });
