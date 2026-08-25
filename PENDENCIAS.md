# Pendências antes de publicar

Duas coisas travam a publicação, e as duas dependem de uma informação que
ainda não existe. Este arquivo é a lista exata do que muda quando cada uma
chegar, para não virar caça ao tesouro depois.

Atualizado em 24/08/2026.

---

## 1. Domínio  ·  aguardando definição

Enquanto não houver domínio, o site funciona, mas **a prévia de link não**:
quem colar a URL no WhatsApp, LinkedIn ou Slack não vê a imagem de capa,
porque `og:image` exige URL absoluta. Os buscadores também não têm sitemap
válido (caminho relativo em sitemap é ignorado).

### Os 6 lugares que mudam

Trocar `SEU-DOMINIO.com.br` pelo domínio real (sem barra no fim):

| # | Arquivo | Linha / tag | O que fazer |
|---|---|---|---|
| 1 | `index.html` | `og:image` | virar absoluta: `https://DOMINIO/assets/media/og-cover.jpg` |
| 2 | `index.html` | — | **adicionar** `<meta property="og:url" content="https://DOMINIO/" />` |
| 3 | `index.html` | — | **adicionar** `<link rel="canonical" href="https://DOMINIO/" />` |
| 4 | `robots.txt` | linha 8 | `Sitemap: https://DOMINIO/sitemap.xml` |
| 5 | `sitemap.xml` | os dois `<loc>` | `https://DOMINIO/` e `https://DOMINIO/termos.html` |
| 6 | `termos.html` | — | **adicionar** `og:url` e `canonical` da própria página |

Depois de trocar, validar em duas frentes:

- prévia de link: colar a URL no WhatsApp e ver se a capa aparece
- `https://DOMINIO/robots.txt` e `/sitemap.xml` respondendo 200

### Enquanto isso

Nada quebra. As tags relativas simplesmente não produzem prévia. O
`SEU-DOMINIO.com.br` está marcado em comentário nos dois arquivos de raiz,
então uma busca por essa string encontra tudo.

---

## 2. Destino do formulário  ·  aguardando escolha do serviço

Hoje `APPLY_ENDPOINT` (em `vorszk-sections2.jsx`) está vazio: o formulário
valida, escreve no console e mostra a tela de sucesso **sem enviar**. Uma
aplicação preenchida agora é perdida, e quem preencheu acha que deu certo.

### O que o código exige do serviço

O `fetch` já está escrito e manda:

```
POST <APPLY_ENDPOINT>
Accept: application/json
body: FormData (multipart/form-data) com os 9 campos
```

e trata a resposta por `r.ok`. Então o serviço precisa **aceitar POST de HTML
próprio e responder JSON**. Isso descarta o Tally, onde o formulário é a
página deles, embutida por iframe: adotá-lo significa trocar a seção pelo
widget, não preencher a constante.

### Serve

| Serviço | Grátis | Conta | Painel de respostas |
|---|---|---|---|
| **Formspree** | ~50 envios/mês | sim | sim |
| **Web3Forms** | ~250 envios/mês | só confirmar e-mail | não (só e-mail) |
| **Basin** | limitado | sim | sim |
| **Getform** | limitado | sim | sim |

Os quatro são hospedados fora do Brasil, o que é **transferência
internacional de dados** para efeito de LGPD. Não impede nada, mas o item 04
de `termos.html` precisa nomear o serviço escolhido quando ele existir.

### Quando o endpoint chegar

1. preencher `APPLY_ENDPOINT` (1 linha)
2. nomear o serviço no item 04 de `termos.html`
3. enviar uma aplicação de teste de ponta a ponta e confirmar que caiu na caixa
4. conferir a mensagem de erro: derrubar a rede e ver se a tela de falha aparece

### Decisões operacionais que vêm junto

- **qual caixa recebe** (hoje o site só divulga `contato@qddo.com.br`)
- **quem lê e responde**, e em quanto tempo (o `termos.html` promete 15 dias
  para pedidos de LGPD, não para aplicações)
- **onde fica o registro**: e-mail resolve no começo; planilha ajuda quando
  o volume subir. Planilha via Google Apps Script é possível, mas exige
  mudança no código (o Apps Script responde com redirect e quebra a leitura
  de `r.ok`), então não é troca de uma linha.

---

## 3. Itens fechados que ainda pedem seu aval

- **`termos.html`**: escrito e no ar, mas os prazos de retenção (item 05) e o
  item 07 não passaram por revisão jurídica. O aviso está na própria página.
- **Faixa de parceiros**: as oito marcas de terceiros continuam por decisão
  sua (24/08/2026), como provisório. A lista `parceiro-01…06` está comentada
  em `VLogos`, e a seção sai do `<main>` com uma linha quando você quiser.
- **Vídeo do hero**: em 1080p, 12s, 18,8 MB. A diretriz do `MEDIA-GUIA.md`
  pede menos de 12 MB; a diferença agora é só bitrate, e o site não depende
  disso para funcionar (o arquivo inteiro cabe no buffer, que era o problema
  real). Se quiser fechar, é reencodar com CRF mais alto.
