# MEDIA-GUIA — garimpo de fotos e vídeos para o site

## Como funciona

Cada espaço de mídia do site é um **slot** com nome fixo. Basta salvar o arquivo
na pasta `assets/media/` com o **nome exato** do slot que ele entra no lugar do
placeholder automaticamente — **sem tocar em código**.

- **Fotos:** `.jpg` — ex.: `assets/media/hero-01.jpg`
- **Vídeos:** `.mp4` — ex.: `assets/media/clip-01.mp4`

O site aplica P&B (grayscale) automaticamente nas mídias; a cor volta no hover.
Não precisa tratar as fotos antes — só escolher bem.

## Especificações gerais

| Tipo | Spec |
|------|------|
| Fotos | JPG, lado maior ≥ 1600px, qualidade ~80. Preferir luz de evento real, gente em movimento. |
| Vídeos (loops) | MP4 (H.264), 720p ou 1080p, **6–12 segundos**, sem áudio, < 8MB cada. |
| OG (compartilhamento) | JPG 1200×630, foto forte com respiro para não cortar em preview. |

## Ponto focal do corte (`focus`)

Toda moldura do site é `object-fit: cover`: a foto preenche a caixa e sobra é
cortada. No corte pelo centro o rosto encosta na borda quando o fotógrafo
enquadrou a pessoa fora do meio. Por isso cada `<MediaSlot>` leva um
`focus="X% Y%"`, que vira `object-position`.

Os valores em uso **não são chute**: para cada foto foi medida a posição do
rosto (fração da imagem) e calculado o `focus` que joga esse ponto no centro
desta moldura. Só o eixo que sobra é cortado, então **um dos dois números é
inerte** (fica em `50%`) — foto retrato em moldura larga corta em cima/embaixo,
foto paisagem em moldura alta corta nos lados.

Trocar o arquivo de um slot por outra foto **invalida o `focus` daquele slot**:
é preciso medir de novo. As fotos `founder-*` são a exceção: elas já vêm
recortadas em 2,4:1, a faixa da própria moldura, então não levam `focus`
(os 3:2 originais ficam em `assets/media/_originais/`).

## Lista de slots

| Arquivo | Onde aparece | Corte | O que garimpar no Drive |
|---------|--------------|-------|--------------------------|
| `intro-bg.jpg` | **Abertura, camada de fundo** ✅ *no ar* | 2400px de largura · JPG | Paisagem/ambiente amplo, de preferência levemente desfocado. É a camada que se move mais devagar. |
| `intro-fg.png` | **Abertura, primeiro plano** ✅ *no ar* | 2400px de largura · **PNG com transparência** | Recorte do que fica na frente (pessoa, silhueta, borda de terreno) com o resto transparente. É o que passa por cima da palavra QUADRADO. |
| `hero-bg.mp4` | **Fundo do hero, tela cheia** | 16:9 · 1080p · **10–20s** · < 12MB | Cena ampla de evento com movimento contínuo (plateia, palco, circulação). É o plano mais importante do site. Enquanto o arquivo não existe o fundo é o campo de caracteres em loop (`<AsciiArt />`, igual ao `#destrava`), não a malha estática; o vídeo entra no lugar dele quando chegar. |
| `bg-02.mp4` | **Fundo da seção "O que o Quadrado destrava"** | 16:9 · 1080p · 10–20s · < 12MB | Cena diferente do hero: ambiente, timelapse ou networking — vai atrás de cards de vidro, então movimento suave funciona melhor. |
| `hero-01.jpg` ✅ *no ar* | Passo 01 (Como funciona) · benefício 02 (Para founders) | 3:4 retrato | Founders conversando, close com energia |
| `hero-02.jpg` ✅ *no ar* | Passo 05 · benefício 06 | 4:3 paisagem | Plano aberto de evento (palco + plateia) |
| `hero-03.jpg` ✅ *no ar* | Passo 02 · benefício 01 | 3:4 retrato | O espaço / arquitetura do CCUG |
| `vida-01.jpg` ✅ *no ar* | Mosaico grande (esq.) · benefício 04 | retrato alto | Founders Night: palco, momento forte |
| `vida-02.jpg` ✅ *no ar* | Mosaico largo (dir.) · benefício 08 | paisagem | Networking, plano aberto, muita gente |
| `vida-03.jpg` ✅ *no ar* | Mosaico (baixo) · passo 03 · benefício 05 | ~quadrado | Mentoria / mesa de trabalho, mãos e laptops |
| `vida-04.jpg` ✅ *no ar* | Mosaico (baixo) · passo 04 · benefício 07 | ~quadrado | Bastidores / detalhe do espaço |
| `vida-05.jpg` … `vida-08.jpg` ✅ *no ar* | Galeria elástica da "Vida no Quadrado" (painel abre no hover) | paisagem, 1600px | Eram quatro slots de vídeo (`clip-01..04`, aftermovie) que nunca tiveram arquivo; em 19/08/2026 viraram foto, porque o acervo é fotográfico. Registros que o mosaico acima não cobre: palco/abraço, networking com café, coworking, dupla na mesa. Em repouso a célula é uma coluna estreita, então o assunto tem que aguentar corte vertical (é o que o `focus` resolve). |
| `aplicar-01.jpg` ✅ *no ar* | Seção "Aplicação", fecho da coluna dos critérios | 16:9 | A sala cheia: é para essa comunidade que a aplicação aponta. Plano aberto de auditório com gente de frente. |
| `case-cotia.jpg` · `case-sportickets.jpg` · `case-primora.jpg` · `case-profplay.jpg` · `case-polus.jpg` ✅ *no ar* | Painéis empilhados da seção Cases, um por startup | **3:4 · 1200×1600 já recortado** | Uma foto por startup, entregue **já em pé** na proporção exata do painel de desktop (3:4), então não levam `focus`; no mobile o painel é 4:5 e o corte que sobra é pequeno. Origem: os arquivos do Ed em `D:\Downloads\` (`Cotia.jpg`, `SportsTicket.jpg`, `Primora.jpg`, `ProfPlay.jpg`, `Polus.jpg`), quatro deles em paisagem — o recorte para retrato foi feito em 20/08/2026 com âncora horizontal por foto (Cotia 0,52 · Polus 0,55 · resto centrado) e os originais estão em `assets/media/_originais/`. O slot leva o nome da startup, não número: foto e texto não podem se desencontrar numa troca de ordem. Os antigos `case-01.jpg`…`case-05.jpg` ficaram **órfãos** (fotos de evento, dos cases fictícios) — podem ser apagados. |
| `founder-01.jpg` … `founder-08.jpg` ✅ *no ar* | Seção "Para founders", uma por benefício | **2,4:1 já recortado** · 900–1400px de largura | Founders no palco do Demo Day, um por slot. O último (`founder-08`) era a foto do grupo; em 20/08/2026 o Ed escolheu outro founder no palco para fechar, então a sequência é de oito rostos. A moldura da seção é ~2,2:1, então os arquivos entram já cortados nessa faixa, com o rosto a ~40% da altura: corte pelo centro de um 3:2 decapita todo mundo. Os 3:2 originais ficam em `assets/media/_originais/`. |
| `footer-word-01.jpg` … `footer-word-08.jpg` ✅ *no ar* | Dentro das letras de QUADRADO no fecho (uma foto por letra, aparece no hover) | **3:4 · 1000×1333** | Oito recortes bem diferentes entre si: rosto, palco, espaço, mãos, plateia. Cada foto é vista por uma fenda estreita, então o assunto tem que estar no centro e o fundo pode ser qualquer coisa. **Foto clara é requisito, não gosto**: a letra é um vão sobre preto, e trecho escuro lê como buraco no glifo. Os oito arquivos de hoje saem das fotos mais claras do acervo com a gama levantada até a luminância média bater ~165 (as escolhas anteriores iam de 17 a 134; os arquivos originais ficam em `assets/media/_originais/`). Sem os arquivos, entra a marcação `_placeholder-word.svg`. |
| `og-cover.jpg` ✅ *no ar* | Preview ao compartilhar o link (WhatsApp etc.) | 1200×630 | Foto de evento icônica, com espaço de respiro |

## Logos dos parceiros

Ficam em `assets/logos/`, não em `assets/media/`. Nome do arquivo = id do slot.

| Arquivo | Onde aparece |
|---------|--------------|
| `parceiro-01.svg` … `parceiro-06.svg` | Faixa "Quem constrói junto", logo abaixo dos números |

### ⚠️ Logos de marcação (temporárias)

A faixa está hoje preenchida com **oito marcas de terceiros só para visualizar o
layout**: `demo-cocacola`, `demo-nike`, `demo-adidas`, `demo-samsung`,
`demo-spotify`, `demo-netflix`, `demo-visa`, `demo-uber`. São SVGs monocromáticos
brancos do Simple Icons (arquivos em CC0; as marcas pertencem aos donos).

**Não publicar o site assim**: numa seção "Quem constrói junto", essas logos
afirmam uma parceria que não existe. Para limpar:

```bash
rm assets/logos/demo-*.svg
```

e voltar a lista de `VLogos` (em `vorszk-sections.jsx`) para os slots
`parceiro-01`…`parceiro-06`, que estão comentados logo abaixo dela.

- **SVG de preferência** (PNG com fundo transparente também serve, mas troque a
  extensão no componente). Altura útil de 34px, então o logo precisa funcionar pequeno.
- As logos entram em P&B e ganham cor no hover, como as fotos.
- Enquanto o arquivo não existe, o slot mostra o nome do parceiro em mono.

**Total: 21 fotos + 6 vídeos** (2 já no ar: `intro-bg.jpg` e `intro-fg.png`).

> **Atalho do fecho do rodapé**: as oito fotos das letras podem ser uma só. Em
> `VFooter`, `<RevealWord text="QUADRADO" fit />` aceita
> `images="assets/media/footer-word.jpg"` e usa a mesma foto em todas as letras.
> Enquanto nenhuma existe, aparece `_placeholder-word.svg` como marcação.

A seção "Para founders" tem oito benefícios e reaproveita oito slots já pedidos
acima (um por benefício), então ela não pede foto nova: entra sozinha conforme o
garimpo avança.

O `hero-bg.mp4` é o prioritário — sozinho, ele muda o site inteiro. O `bg-02.mp4` vem em segundo.

> Os vídeos de fundo têm **crossfade automático no loop** (fade de 0,5s no fim e no
> começo) — não precisa exportar com fade embutido; corte seco no arquivo funciona.

## Dicas de seleção

- Priorize fotos com **rosto e movimento** — é isso que mata o "cheiro de PDF".
- Melhor 8 fotos excelentes do que 20 medianas; os slots são poucos de propósito.
- Nos vídeos, prefira trechos que funcionem **mudos e em loop** (gesto, aplauso,
  gente circulando). Evite falas que dependem de contexto.
- Se um corte não bater exato com a proporção, sem problema — o site corta pelo
  centro (`object-fit: cover`). Só evite elemento importante nas bordas.
