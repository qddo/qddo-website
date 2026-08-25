# QDDO Central Hub — instruções para o Claude Code

Este é um protótipo de site estilo editorial (inspirado em vorszk.com),
construído em **HTML + React via Babel Standalone** (sem build step).
**Não rode `npm install` — não há `package.json`.** Tudo carrega via `<script src>`.

## Como rodar localmente

Servidor estático qualquer. Recomendado:
```bash
python3 -m http.server 8080
# ou: npx serve
```
Depois abrir `http://localhost:8080` (ou a porta que o servidor escolher).

## Arquitetura

- `index.html` é o ponto de entrada. Carrega React, Babel, Lenis, GSAP e os JSX.
- Cada `.jsx` é transpilado no browser pelo Babel Standalone (`<script type="text/babel">`).
- **Componentes são expostos via `Object.assign(window, {...})` no fim de cada arquivo**
  para serem usados por outros arquivos. Cada script tem seu próprio escopo no Babel,
  então **sempre que criar um novo componente em outro arquivo, registre em `window`** e
  declare no `/* global ... */` do consumidor.
- Não use `import`/`export` — não há bundler.

## Ordem de carga dos scripts (`index.html`)

```
React → ReactDOM → Babel → Lenis → GSAP → ScrollTrigger
  ↓
tweaks-panel.jsx    (Tweaks panel + useTweaks hook)
components.jsx      (QddoLogo, SectionHeader, Reveal, PhotoPlaceholder, Metric — legados pré-Vorszk, não usados)
vorszk-core.jsx     (CustomCursor, SpotlightCursor, LiquidButton, Loader, TopBar, MenuToggle, MenuWord, DropMenu, RevealText, FadeIn, DividerRow, Marquee, MediaTile, EditorialPhoto, MediaSlot, Parallax, CountUp, ArrowUpRight, FadingVideo, BlurText, ScrollEngine)
vorszk-sections.jsx (VHero, VPillars, VMarquee, VManifesto, VHowItWorks, VStats — e VAudienceIntent, VMosaic estacionadas)
vorszk-sections2.jsx(VLife, VApply, VForFounders, VForMaintainers, VFounderPlatform, VFinalCTA, VFooter — e VCommunity, VEvents, VNotThis, VBlog, VBigStatement estacionadas)
app.jsx             (App raiz, renderiza tudo, Tweaks panel)
```

Ordem das seções renderizadas: Intro → Hero → Marquee → Pillars → Stats → Logos →
HowItWorks → Life → Cases → ForFounders → ForMaintainers → Manifesto →
FounderPlatform → FinalCTA → Apply → Footer.
Seções "estacionadas" continuam registradas em `window` mas fora do `<main>` —
aguardando conteúdo real (comunidade, blog).

## Sistema de mídia (fotos/vídeos reais)

- `<MediaSlot id="hero-01" kind="photo|video" label spec ratio focus />` procura
  `assets/media/<id>.jpg` (foto) ou `.mp4` (vídeo). Arquivo existe → renderiza;
  não existe → placeholder marcado com o nome do slot.
- **`focus="X% Y%"` é o ponto focal do corte** (vira `object-position`, lido
  pela var `--media-pos`). Toda moldura é `cover`, então o centro puro joga o
  rosto na borda quando a pessoa não está no meio da foto. Os valores em uso
  foram **medidos**: posição do rosto na imagem → cálculo do `focus` que leva
  esse ponto ao centro daquela moldura. Só o eixo cortado conta; o outro fica
  em `50%` e é inerte. **Trocar a foto de um slot invalida o `focus` dele.**
  Exceção: `founder-*` já vem recortada em 2,4:1, com os 3:2 originais em
  `assets/media/_originais/`, e por isso não leva `focus`. **O recorte é
  ancorado no rosto** (refeito em 20/08/2026): janela centrada na linha dos
  olhos no eixo X e com os olhos a 40% da altura da faixa. Isso é o que
  mantém o rosto em 50% x / 39% y da moldura **em qualquer aspecto dela** —
  e a moldura varia de 1,76 (janela alta, altura no teto de 330px) a 2,47
  (janela baixa), porque `height: clamp(180px, 30vh, 330px)` muda com a tela
  enquanto a largura vem da coluna. Foto centrada no quadro em vez do rosto
  perde o rosto quando o `cover` corta. Ao trocar uma dessas fotos, medir a
  linha dos olhos no original e refazer a janela.
- A lista completa de slots + specs de exportação está em `MEDIA-GUIA.md`.
- Tratamento visual: mídias entram em P&B (`grayscale`) e ganham cor no hover.
- `<Parallax speed={0.1}>` = deslocamento no scroll (GSAP scrub), inerte com
  `prefers-reduced-motion`. `<CountUp value="160k" />` = número que conta ao entrar.

## Formulário de aplicação

`VApply` (`#aplicar`) tem um form real com 9 campos. `APPLY_ENDPOINT` em
`vorszk-sections2.jsx` define o destino. Vazio = modo protótipo: valida, loga
no console e mostra sucesso **sem enviar de verdade**.

**O destino precisa aceitar POST de HTML próprio** (`multipart/form-data` com
`Accept: application/json`), que é o que o `fetch` do componente manda.
Formspree, Web3Forms, Basin e Getform servem. **Tally não serve para isso**:
lá o formulário é a página deles, embutida por iframe. Adotar Tally significa
trocar esta seção pelo widget e perder o desenho, não preencher a constante.

## Estilo / design system

- **Tokens** em `styles/tokens.css`. Todas as cores, fontes, espaçamento usam CSS vars
  (`--accent`, `--text-primary`, `--bg-canvas`, `--font-sans`, etc.). Sempre usar via
  `var(--...)`. Nunca chumbar hex no JSX.
- **Budget de acento (regra premium)**: itálicos `<em>` são brancos por padrão
  (herdam a cor do pai). Laranja SÓ em: o número-herói do VStats, estados de
  hover e o dot da marca. **CTAs não têm cor**: são vidro líquido com rótulo
  branco (`<LiquidButton>`). Não adicionar `var(--accent)` em botão.
- **Liquid glass — escopo restrito**: `.qd-glass` vive **apenas na seção
  `#destrava` (VPillars)**: cards, quadradinho do ícone e tags. Em todo o
  resto do site, superfície sólida: `.qd-solid` (chrome escuro translúcido
  com borda) no hero/navbar, ou `var(--bg-card)` + `--border-subtle` nos
  cards. Não espalhar vidro para novas seções sem pedir.
- **Growth no hover**: `.qd-grow` = `scale(1.04)` em 0.22s com
  `cubic-bezier(0.34, 1.4, 0.64, 1)` (overshoot leve) e `scale(0.98)` no
  `:active`. Padrão vindo do projeto Sight. Em cima de `.qd-glass` o anel
  de borda também acende. Botões primários usam a mesma mola em 1.02.
- **Movimento preso ao scroll** (exigência recorrente do Ed): fade de entrada
  sozinho não conta. Seções com mecânica real: `#destrava` (foco por
  profundidade), `#como-funciona` (trilho + troca de mídia), `#founders`
  (um benefício por vez), `#plataforma` (a tela se levanta). Base:
  `useScrollProgress(ref, cb, opts)`, que entrega progresso 0..1 por callback
  e escreve direto no DOM (CSS vars / `data-on`), sem re-render a 60fps.
- **Palco pinado é o padrão** (decisão do Ed, 17/08/2026, portada do
  Sight-2026). O ciclo que ele pediu, na ordem: a seção sobe, **prende quando
  está inteira na tela**, o efeito roda preso ao scroll, e **solta assim que o
  efeito termina**. Isso é seção alta (`height: N vh`, `padding-block: 0`) com
  palco `position: sticky; top: 0; min-height: 100vh` centrado em flex. O
  conteúdo do palco **precisa caber em 100vh**: ritmo vertical em `vh`, com
  aperto em `@media (max-height: 760px)` — palco mais alto que a tela escorrega
  dentro do pin e corta a base. Em ≤900px e com `prefers-reduced-motion`,
  `height: auto` + palco `position: static` + efeito desligado.
- **`useSectionProgress(ref, cb, span)` é o motor.** `p = 0` no topo da seção
  no topo da tela (o pin começa), `p = 1` na base da seção na base da tela (o
  pin solta). Duração do pin = `altura − 100vh`. O span recorta a janela útil;
  padrão `[0.10, 0.94]`, os 10% iniciais sendo a folga entre travar e começar.
  Combine com `qdBeat(q, n)`, que divide por `n-1` (o `foco` do depth-columns):
  o primeiro estado já está na tela quando prende e o último acende no fim da
  janela. Dividir por `n` deixa um passo inteiro de pin parado no fim.
- **A cadência define a altura, não o contrário.** O Sight gasta 40vh a 80vh de
  rolagem por passo (`depth-columns` 80, `scroll-beats` 39, `notification-stack`
  41). Some `passos × cadência` e devolva `+100vh`. Hoje: `#destrava` 300vh
  (pin 200, 84vh/card), `#como-funciona` 340vh (pin 240, 50vh/passo),
  `#founders` 400vh (pin 300, 36vh/benefício — oito estados não cabem nos 40vh
  sem uma seção de 480vh; cortar benefícios é o que devolve a cadência).
  Ao mexer numa das duas pontas, medir a outra.
- **Tempo das transições de estado**: `--d-beat: 700ms` para entrada de passo
  (é o `.ps-step` do Sight), `--d-beat-swap: 550ms` para troca em cadência
  rápida (mídia do `#como-funciona`, pilha do `#founders`), `--d-beat-detail:
  400ms` para cor e detalhe. Não usar `--d-slow` (480ms) nesses estados: fica
  curto e o movimento parece nervoso.
- **`overflow: hidden` mata `position: sticky`.** Vale para o body
  (`overflow-x` é `clip`, nunca `hidden`) **e para a seção que hospeda o
  palco**: `hidden` a transforma em contêiner de rolagem, o palco computa
  `position: sticky` e simplesmente não fixa. O sintoma engana, porque o
  `getComputedStyle` diz `sticky` — a prova é ler `stage.getBoundingClientRect().top`
  ao longo do pin: tem que ficar em 0. Foi assim que o `#destrava` passou
  rodadas com a cascata acontecendo fora da tela. Quem recorta vídeo de fundo é
  o palco, que tem o seu próprio `overflow: hidden`, nunca a seção.
- O `#intro` (2,2 telas) segue o mesmo modelo pinado, com a diferença de ser
  parallax contínuo em vez de passos.
- **Vídeos de fundo**: usar `<FadingVideo src religiosamente>` (crossfade rAF no
  loop — fade 500ms, saída 0,55s antes do fim, loop manual). Nunca `loop` cru
  nem transition CSS de opacity em vídeo.
- **`<AsciiArt />` é o fundo enquanto o vídeo não existe** — nas duas seções
  com slot de vídeo: `#top` (hero, no lugar de `hero-bg.mp4`; entrou em
  20/08/2026 a pedido do Ed) e `#destrava` (fundo definitivo desde 24/08/2026, quando o slot bg-02.mp4 foi cancelado). Campo de
  caracteres em loop contínuo num canvas: três senos defasados formam a
  densidade, que vira caractere pela rampa `" .·:-=+*#%@"` e escorre para o
  rodapé. Custa **um `fillText` por linha**, não por caractere, porque a
  monoespaçada alinha as colunas sozinha (tela de 120x40 = 40 chamadas por
  quadro em vez de 4.800); teto de 24fps, dorme fora da tela por
  `IntersectionObserver` e fica parado com `prefers-reduced-motion`. Cor,
  fonte e opacidade saem do CSS (`.qd-ascii`), que o canvas lê por
  `getComputedStyle`: **0.10** atrás dos cards de vidro do `#destrava` e
  **0.16** no hero, onde ele é o fundo. Acima disso disputa com o H1.
  Quando o `.mp4` do slot existir, o vídeo entra no lugar dele.
- **Quadriculado industrial** (`.qd-pillars-paper`, pedido do Ed, 20/08/2026):
  papel milimetrado atrás dos cards do `#destrava`, só CSS. Malha fina
  (`--pg`, 20 a 28px) e mestra em `calc(var(--pg) * 4)` — a razão inteira é o
  que impede as duas de saírem de fase —, mais um ponto na cruz da mestra
  deslocado `2 × --pg` (o círculo do `radial-gradient` nasce no centro do
  ladrilho, não no canto). Vive **acima** do `.qd-pillars-scrim`: o véu é
  preto opaco no centro, então embaixo dele a malha só apareceria nas bordas.
  Alfa 0.03 / 0.06 e máscara que tira 45% no miolo. Textura de fundo é aqui;
  não espalhar para outras seções sem pedir.
  **Cuidado com o nome**: `.qd-pillars-grid` **não** é malha de fundo, é a
  **grade dos três cards** (`display: grid` + `is-depth`). A textura nasceu
  com esse nome e a regra `position: absolute; inset: 0` sequestrou a grade:
  os cards saíram do fluxo e foram parar em cima do título. Camada nova de
  fundo em `#destrava` leva nome próprio, e antes de criar classe aqui vale
  um `grep` no `vorszk.css`.
- **BlurText**: headline palavra a palavra (`words={["a","b",{w:"c",em:true}]}`) —
  usado no H1 do hero; para linhas inteiras continue com `<RevealText>`.
- **Cantos quadrados** (padrão Sight): nada de pílula. `--r-btn: 10px` para
  botões, `--r-chip: 8px` para chips/tags, `--r-xl: 16px` para cards.
  `--r-full` só para pontos redondos de verdade (cursor, dots).
- **Todo botão do site é `<LiquidButton>`**: vidro líquido em 4 camadas
  (backdrop refratado pelo filtro SVG `#qd-glass-distort` do index.html, tint,
  anel de brilho em box-shadows empilhadas, rótulo). Não existe mais botão
  branco sólido: `.btn-primary` e `.btn-ghost` continuam em `tokens.css` como
  legado, mas não use em seção nova. Variantes: `variant="quiet"` (secundário,
  mesmo vidro com menos luz, para quando dois botões dividem a linha) e
  `size="sm"` (escala da topbar). A camada de vidro sangra 24px para fora
  (clipada pelo `overflow: hidden` do botão) para o deslocamento ter conteúdo
  de onde puxar nas bordas. Não reduzir essa sangria.
- **A topbar usa a geometria do `.container`** (decisão do Ed, 18/08/2026):
  `max-width: var(--container)` + `margin-inline: auto` + `padding-inline:
  var(--gutter)`. Logo, CTA e botão do menu nascem na mesma margem das
  seções, não na borda da tela: antes a logo ficava em 48px enquanto o
  conteúdo começava 368px adentro (viewport de 1839). O `.qd-drop` segue a
  mesma conta, `calc((100% - min(100%, var(--container))) / 2 + var(--gutter))`
  — em `position: fixed`, `100%` é o viewport de layout, já sem a barra de
  rolagem, então casa com o padding do container. Toda seção preta usa
  `.container`, então a margem é uniforme de ponta a ponta; o intro (foto
  sangrada) e o fecho do rodapé são as exceções combinadas.
- **Véu do topo** (`.qd-topbar-scrim`, decisão do Ed, 18/08/2026): gradiente
  preto de 30% na borda de cima a 0% em 120px, atrás do chrome, só para
  segurar o contraste da logo e dos botões sobre o preto do site. Liga
  quando o topo do `#top` cruza o topo da tela e fica ligado até o fim da
  página; sobre a foto do intro fica desligado (lá o `drop-shadow` resolve).
  É **irmão** da `.qd-topbar`, não filho: a barra recebe `transform` no
  intro-lock, e transform vira bloco de contenção para `position: fixed`,
  o que faria o véu deixar de medir a tela inteira. O gate é
  `ScrollTrigger` (o Lenis é o dono do scroll aqui; listener de `scroll`
  nativo sai do relógio do site) e usa `onEnter`/`onLeaveBack`, **não**
  `onToggle`: com `end: "max"` o progresso chega a 1 no último pixel e
  `isActive` vira falso, apagando o véu exatamente no fim do rodapé.
- **Navegação invisível** (decisão do Ed, 17/08/2026): não existe barra
  lateral. O chrome do topo é só a logo à esquerda e, à direita, o CTA
  `Aplicar` (`LiquidButton size="sm"`) + `<MenuToggle>`: dois traços que viram
  X, espessura por prop (`strokeWidth` → var `--mt-w`). O menu é o
  `<DropMenu>`, painel `.qd-solid` que desce do botão (`transform-origin:
  top right`), com véu de clique em `z-index: 60` (abaixo da topbar, então o X
  e o CTA seguem clicáveis). Fecha no Esc, no véu e ao escolher destino.
  A marca é a logo horizontal inline (`BrandFull`, 34px de altura, do
  `assets/logo-horizontal.svg`); em ≤760px entra o símbolo (`BrandMark`,
  30px, o mesmo desenho do `assets/favicon.svg`). Os dois vêm inline com
  `fill: currentColor` para herdarem a inversão do tema claro, que um
  `<img>` não acompanharia. **A logo não troca de cor no hover** (decisão
  do Ed, 18/08/2026): ela cresce `scale(1.05)` na mola de sempre
  (`cubic-bezier(0.34, 1.4, 0.64, 1)`), com `transform-origin: left center`
  para o crescimento não invadir a margem. O favicon é o SVG, com
  `prefers-color-scheme: light` dentro do arquivo: o desenho é branco e
  sumiria na aba clara.
  Os rótulos usam `<MenuWord text>`: letras entram em cascata quando o painel
  abre (`--i` do item, `--j` da letra) e no hover sobem em onda a partir do
  centro da palavra (`--k` = distância até o centro). Uppercase 800 em
  `--font-sans`; display fica reservado ao intro e ao footer.
- **Cursor**: só uma bolinha branca, sem anel. Diâmetro de repouso em
  `--cursor-d: 0.375rem` (6px) no `.qd-cursor`; sobre interativos soma
  `0.15rem` (8.4px) e sobre texto vira caret de 2px. Mexer no tamanho é mexer
  na var, não nas regras. Junto vem `<SpotlightCursor />` (dentro de `CustomCursor`): canvas
  `position: fixed` de tela cheia que pinta um foco de luz radial seguindo o
  ponteiro com amortecimento. Renderiza em meia resolução, mede o próprio
  canvas via `ResizeObserver` (o evento `resize` não é confiável aqui) e o rAF
  dorme quando o foco assenta. Inerte com `prefers-reduced-motion` e em
  `pointer: coarse`; oculto no tema claro.
- **Peças interativas**: `<ElasticGallery items>` (painel sob o cursor abre e os
  vizinhos cedem), `<StackedPanels items>` (leque que segue o cursor via
  `--mx`/`--my`), `<LogoSlot id name>` (mesmo contrato do MediaSlot,
  lê `assets/logos/<id>.svg`).
- **`<RevealWord text fit images slot>`** é o fecho do footer. Letras entram uma
  a uma; **o hover é por letra, uma de cada vez**: só a que está sob o cursor
  recua para o próprio centro (mola de 600ms) e abre o glifo como janela para a
  foto (`background-clip: text`, wipe de baixo para cima, sem atraso). Quem
  recebe o `:hover` é a caixa da letra (`.ltr`), que **não** muda de tamanho;
  quem encolhe é a camada de dentro (`.anim`). Escalar o próprio alvo do hover
  tira o ponteiro da caixa perto da borda e o estado pisca. Por isso a entrada
  usa a propriedade individual `translate` e não `transform`: a animação tem
  `fill: forwards` e venceria a transição na mesma propriedade.
  `fit` ocupa a largura da tela: o JS mede a
  soma das letras num tamanho de referência e escala o `font-size` até encostar
  nas duas bordas, com uma segunda passada porque o avanço dos glifos não escala
  linear. **Mede com a fonte de display já carregada** (`document.fonts.load`,
  não só `fonts.ready`, que resolve antes de a face ser pedida): medir na fonte
  de fallback deixa a palavra ~6% curta. Por isso a palavra vive **fora do
  `.container`**, como filha direta do `<footer>`. As fotos são um slot por
  letra (`footer-word-01.jpg` …), com `assets/media/_placeholder-word.svg` de
  marcação enquanto não existem. `url()` dentro de custom property resolve
  relativo ao **CSS**, não ao documento: o src vai absolutizado por `rwAbs()`.
  **A camada da foto (`.pic`) sangra para fora da caixa da letra**
  (`inset: -0.08em -0.12em` + `padding` igual, `box-sizing: border-box`):
  a caixa é o avanço do glifo **menos** o `letter-spacing: -0.05em`, então a
  tinta sobra até 0.055em à direita e essa fatia saía transparente, com a
  letra parecendo meio vazia. O padding devolve a caixa de conteúdo ao lugar,
  então o glifo não se move. **A foto do slot tem que ser clara**: a letra é
  uma fenda estreita sobre preto e trecho escuro da foto lê como buraco.
- **Números**: `<SlidingNumber value="+500" />` nos big numbers (dígitos rolam
  como odômetro, coluna 0-9 duplicada para todo dígito dar uma volta).
  Vale para o hero também (grade 2x2 da coluna de apoio), **com os mesmos
  parâmetros do `#numeros`**: duração e stagger de dígito no padrão do
  componente (1500ms / 70ms) e um número por vez (`delay + i * 90`). No hero
  o `delay` base é 1250ms, o tempo de a cascata de entrada trazer o painel.
  `<CountUp>` continua registrado em `window`, mas não está em uso em
  nenhuma seção.
- **Entrada em cascata dos pilares**: cada card entra na vez (`--e`) e o foco é
  sempre o último que entrou, desfocando os anteriores (`--d`). As entradas
  terminam em 82% do percurso; o resto é dwell.
- **Título de seção único**: todo statement de seção usa o tamanho padrão de
  `.qd-statement` (≈52px desktop). Não sobrescrever `font-size` inline — display
  grande só no hero (`.qd-hero3-title`).
- **Copy YC-style**: frases declarativas curtas, fatos e números no lugar de
  adjetivos, parágrafos de apoio ≤ 60 caracteres quando possível.
- **Sem travessão (—)** em copy visível: usar ponto, vírgula, ponto e vírgula
  ou dois-pontos. Regra herdada do projeto Sight; vale para o site inteiro
  (comentários de código podem manter).
- **Todo título de seção é 2 linhas de largura parecida** (decisão do Ed,
  18/08/2026). Nunca 3 linhas. Título que caiba numa linha só fica como está.
  A métrica é **largura renderizada em px, não contagem de palavra ou letra**:
  `<em>` vira Instrument Serif itálico, que é ~35% mais estreito que o Geist
  no mesmo corpo, então contar caracteres engana. Alvo: **desvio ≤ 10%** entre
  as duas linhas. Hoje o site está em 1% a 10% (medido em 375, 1024, 1280 e
  1440px). Em `RevealText`/`BlurText` a quebra é declarada em
  `lines={[...]}`; em `<h2>` solto, com `<br />`.
- **Como medir**: `.qd-rt` é `display: inline-block`, então a largura dele é
  shrink-to-fit e **não** serve de caixa disponível (use a do elemento pai).
  Para a largura de cada linha, junte os rects de **nós de texto** agrupados
  por faixa de meia entrelinha: um Range sobre o elemento inteiro devolve
  também a caixa de bloco do `.line` (largura total, falso positivo de quebra)
  e um rect duplicado para cada `<em>` (que fica alguns px deslocado por ser
  outra fonte, e cai em outro bucket se o agrupamento for fino).
  Cuidado com transições congeladas e com a barra de rolagem ao comparar com
  `innerWidth`: as duas já geraram diagnóstico falso aqui.
- **Subheadline: na margem direita, em 2 linhas parecidas** (decisão do Ed,
  18/08/2026). O texto complementar que segue a headline de seção usa
  `<FadeIn className="qd-lede-right">` em volta do `<p className="lede">`,
  dentro de um `.qd-head-split`. Isso encosta o bloco na **margem direita da
  seção** (`justify-self: end` + `width: fit-content`; o `.qd-head-split`
  precisa de `max-width: none` para vencer os 980px do `.qd-section-head`).
  O balanceamento vem do `text-wrap: balance` da `.lede` em `tokens.css`;
  quem decide **quantas** linhas saem é o `max-width` (44ch padrão, 46ch no
  manifesto para segurar em três). Subheadline de uma linha continua em uma
  linha, porque a caixa encolhe para o conteúdo. Em ≤860px volta para a
  esquerda: sem duas colunas não existe margem direita.
  **`balance` já entrega o ótimo para um texto dado** — quando a diferença
  entre as linhas continua grande, o que resolve é a copy, não o CSS
  (foi assim que "programa co-criado" virou "programa anual co-criado":
  19% de diferença para 4%).
- **Naming da marca**: em texto corrido, a marca se escreve **"Quadrado"**
  (Q maiúsculo) — ex.: "Aplicar para o Quadrado", "Vida no Quadrado".
  "QDDO" fica reservado para logo/lockups (© copyright, nome oficial
  "QDDO Central Hub" no title/OG).
- **A seção do acervo se chama "Portfólio"** (decisão do Ed, 21/08/2026),
  no rótulo e no menu do rodapé. Não é "Cases": as cinco são empresas da
  comunidade com produto no ar, não estudo de caso. O id `#cases` e o
  componente `VCases` continuam com o nome antigo de propósito, para não
  quebrar as âncoras. Grafia correta em português é **Portfólio**, sem o
  "i" ("portifólio" é erro comum).
- **`<Loader />` é o 3D box loader** (quatro cubos isométricos em ciclo,
  `.qd-boxes`), **ligado por padrão** no `TWEAK_DEFAULTS`. Foi desligado em
  18/08/2026 e o Ed pediu de volta no mesmo dia: a abertura com os cubos é
  parte da entrada, não um custo a otimizar. Não é barra falsa nem
  contador: ele **espera as imagens da abertura** (`QD_LOADER_ASSETS` em
  `vorszk-core.jsx`) resolverem por `load` **ou** por `error`, porque no
  protótipo os slots podem estar vazios. `QD_LOADER_MIN` (700ms) evita
  piscada, `QD_LOADER_MAX` (4s) evita que um asset pendurado prenda a tela.
  Fundo em `--black-1000`, igual ao `#intro`, então a saída é só o fade dos
  cubos. Faces em escala de cinza: laranja fica fora por causa do budget de
  acento.
- **Números de impacto** (hero + #numeros): +500 conexões geradas ·
  +20 eventos realizados · +900 pessoas · +80 founders ativos · 08 verticais ·
  +1,5 mi de views orgânicos. Metragem (200m²) é informação de apoio, nunca
  número-destaque. O hero mostra os quatro primeiros: **mesmo número nos dois
  lugares**, senão a mesma métrica aparece com dois valores na mesma página.
- **#numeros não tem rótulo** (decisão do Ed, 18/08/2026): cada quadrante é só
  o número grande e uma descrição de **duas linhas de largura parecida** que já
  diz o que ele conta (o rótulo mono repetia a informação). A descrição vive em
  `.sub` (max-width 30ch + `text-wrap: balance`); o texto precisa passar de ~40
  caracteres para quebrar em duas linhas nessa caixa. Com o rótulo fora, a
  altura do quadrante caiu para `clamp(170px, 22vh, 205px)` e o alinhamento
  virou `align-content: end`: em `space-between` sobrava um vão de 60 a 80px
  entre o número e o texto.
- **Estilos editoriais** (cursor, loader, marquee, divisórias, mosaico, lista numerada)
  em `styles/vorszk.css`.
- **Bastonada de display**: `var(--font-display)` = **Rethink Sans** (peso 800),
  usada só nas palavras grandes (QUADRADO do intro, fecho do footer).
  **Número nenhum usa display** (decisão do Ed, 18/08/2026, revendo a da
  manhã): o hero passou por serif itálico e por display 800 e voltou para o
  mesmo tratamento do `#numeros` — `--font-sans` em peso 400,
  `letter-spacing: -0.04em`. O resto do site também é `--font-sans`.
- **Intro em 3 camadas de parallax** (`VIntro`): fundo (`intro-bg.jpg`, mais
  lento), o nome QUADRADO no meio, e primeiro plano (`intro-fg.png`, PNG com
  transparência) que passa por cima do nome. Sem os arquivos, cai para malha +
  brilho. Velocidades: fundo +7vh, nome −34vh, primeiro plano −7vh.
- **A palavra QUADRADO é ancorada no peito do rapaz** (decisão do Ed,
  20/08/2026), não em `top: 50%`. O PNG do primeiro plano é `cover`, então a
  pessoa sobe e desce conforme a proporção da janela, e uma porcentagem fixa
  errava o alvo em quase toda tela: em 1503x778 a palavra caía 93px abaixo do
  peito, na altura do laptop. `VIntro` calcula o recorte `cover` na mão e
  escreve `--title-dy` (px) no palco; a marcação do PNG está em `PEITO_FG`
  (gorro 0,255 · ombros 0,337 · **peito 0,395** · laptop 0,50 · pés 0,78).
  Trocar o `intro-fg.png` por outra foto exige remarcar essa fração.
- **A tagline do intro mede 95% da largura de QUADRADO** (`TAG_LARGURA` em
  `VIntro`), colada embaixo. Duas armadilhas já pagas: (1) o avanço dos glifos
  não escala linear com o corpo, então a escala converge por iteração e não por
  conta fechada (mesmo problema do `RevealWord`); (2) medir a palavra por
  `getBoundingClientRect` mede o `scale` do parallax, e medir a caixa do
  `<p>` media o **pai** — que é `max-content`, logo a largura da própria
  tagline quando ela era a mais larga. Por isso `.qd-intro-word` é
  `width: fit-content` e a medição usa `offsetWidth`.
- **Motion reduzido**: quem carrega o parallax do intro é o `.qd-intro-title`,
  não o `.qd-intro-word`. `useScrollProgress` entrega `--ip: 1` de uma vez
  quando `prefers-reduced-motion` está ligado, então a regra que desliga o
  parallax tem que citar o `.qd-intro-title` — senão o título nasce no estado
  de saída (13vh acima, escala 1,04, opacidade 0,65). O `--title-dy` fica de
  pé: é posição, não animação.
- Tipografia mistura **sans display + serif itálico no acento**.
  Padrão: `<h2 className="qd-statement">Texto <em>em itálico colorido</em>.</h2>`
- Paleta: preto/branco/laranja (`--orange-500: #E85420` por padrão; tweakável).

## Padrões de animação

- **Lenis** já está inicializado por `<ScrollEngine />` em `app.jsx`. Não criar outro.
- **GSAP ScrollTrigger** está integrado ao Lenis. Para reveal-on-scroll, use:
  - `<FadeIn>` — fade + slide up quando o elemento entra na viewport
  - `<RevealText lines={[...]}>` — split por linhas, cada linha sobe com stagger
  - `<DividerRow eyebrow="LABEL">corpo grande</DividerRow>` — fecho de seção:
    hairline no topo, rótulo mono em cima e texto editorial embaixo, os dois
    rentes à margem esquerda. Segue o ritmo do `.qd-section-head` (gap 24px).
    Era duas colunas (label à esquerda, texto à direita, herança do Vorszk);
    virou empilhado em 18/08/2026 porque o vão entre os dois lia como erro
    quando o texto é curto.
- Trigger padrão é `top 86%` da viewport. Pode passar `start="top 70%"` etc.
- Fallback para `IntersectionObserver` se GSAP não carregar.

## Tweaks (painel de ajustes interno)

`TWEAK_DEFAULTS` em `app.jsx` é a fonte da verdade. Está dentro de marcadores
`/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` que o painel reescreve em disco quando
o usuário muda valores no preview. Mantenha sempre como JSON válido.

## Páginas fora da home

`termos.html` e `404.html` são HTML estático, sem React. Carregam
`tokens.css` + `styles/pagina.css` e **não** carregam `vorszk.css`: lá o
`body` é `cursor: none`, que só faz sentido com o cursor custom do React
ligado — sem ele a página fica sem cursor nenhum. A margem é a mesma da
home (container 1200 + gutter), e o chrome é só a logo e o link de volta.
O texto de `termos.html` descreve os 9 campos reais do formulário; se o
formulário mudar, o item 02 da página muda também.

## Não sobe para o servidor

`assets/media/_originais/` (61 MB, os 3:2 dos founders) e `_archive/`
(88 MB, versões anteriores) estão no `.gitignore`. O vídeo antigo do hero
(58s/85 MB) está em `_archive/assets-anteriores/` e pode ser apagado.

## Convenções

- Em texto, **emphases vão em `<em>` ou `<i>`**: o CSS automaticamente troca para
  Instrument Serif itálico laranja dentro de `.qd-statement`, `.h-display`,
  `.qd-num-row .title`, `.qd-divider-body`, etc.
- Cards/seções alternam fundo via `.qd-section` (canvas) e `.qd-section-dark` (subtle).
  Cantos arredondados arquitetônicos são automáticos via CSS (`.qd-section-dark`
  recebe `border-radius` inferior, a próxima seção encaixa por cima).
- Sempre numere expertises/etapas com padding mono `01`, `02`, `03`…

## Quando adicionar uma nova seção

1. Crie o componente em `vorszk-sections.jsx` ou `vorszk-sections2.jsx`.
   Use `<RevealText>`, `<FadeIn>`, `<DividerRow>` para animações.
2. Registre em `window` no `Object.assign(window, { ... })` no fim do arquivo.
3. Declare no `/* global ... */` do `app.jsx`.
4. Adicione `<NomeNovo />` no `<main>` do `App` em `app.jsx`.

## Quando NÃO usar este padrão

Se for fazer migração pra produção (Next.js, Vite, etc.), converta os JSX em
módulos ES normais, remova `<script type="text/babel">`, e use bundler.
Este setup é só pra prototipagem / iteração rápida.
