# QDDO Central Hub — Site

Protótipo do site institucional do **QDDO Central Hub**, estilo editorial inspirado em vorszk.com.
Paleta preto / branco / laranja, Geist + Instrument Serif, animações com Lenis + GSAP.

---

## 🚀 Como rodar no seu computador (passo a passo, para leigos)

Este site não precisa de instalação complicada — é HTML puro com React/Babel
sendo carregado direto do navegador. **Só precisa de um servidor local simples
para abrir os arquivos.**

### Opção 1 — VS Code + extensão Live Server (mais fácil)

1. Instale o **[VS Code](https://code.visualstudio.com/)** (se ainda não tem).
2. Abra o VS Code → vá em **Extensions** (ícone de quadradinhos à esquerda)
   → procure por **"Live Server"** (autor: Ritwick Dey) → clique em **Install**.
3. Abra a pasta deste projeto no VS Code (**File → Open Folder…**).
4. Na barra de arquivos à esquerda, clique com o botão direito em **`index.html`**
   → escolha **"Open with Live Server"**.
5. Pronto — abre automaticamente em `http://127.0.0.1:5500`.

**Toda vez que você salvar um arquivo, a página recarrega sozinha.**

### Opção 2 — Terminal com Python (Mac / Linux)

O Python já vem instalado no macOS e na maioria dos Linux. No terminal:

```bash
cd /caminho/para/a/pasta/qddo
python3 -m http.server 8080
```

Abra no navegador: **http://localhost:8080**

(Para parar o servidor, aperte `Ctrl + C` no terminal.)

### Opção 3 — Terminal com Node.js

Se você já tem Node.js instalado:

```bash
cd /caminho/para/a/pasta/qddo
npx serve
```

Ele vai te dar uma URL tipo **http://localhost:3000** — só clicar.

---

## ✏️ Como editar com o Claude Code

1. No terminal, navegue até a pasta do projeto:
   ```bash
   cd /caminho/para/a/pasta/qddo
   ```
2. Rode o Claude Code:
   ```bash
   claude
   ```
3. O Claude vai ler automaticamente o arquivo **`CLAUDE.md`** desta pasta —
   ele tem todas as instruções de como o projeto está organizado.
4. Peça mudanças em linguagem natural, por exemplo:
   - *"Mude o tom de laranja para um pouco mais avermelhado"*
   - *"Adicione uma nova seção entre o manifesto e a expertise"*
   - *"Faça o título do hero ter parallax no scroll"*

**Mantenha o servidor local rodando em outra aba do terminal** —
assim você vê as mudanças ao salvar.

---

## 📁 Estrutura dos arquivos

```
qddo/
├── index.html              ← ponto de entrada
├── app.jsx                 ← componente raiz + Tweaks
├── components.jsx          ← logo, primitivas reaproveitáveis
├── tweaks-panel.jsx        ← painel de tweaks (cores, fontes)
├── vorszk-core.jsx         ← cursor, loader, sidenav, marquee, reveals
├── vorszk-sections.jsx     ← Hero, Manifesto, Expertise, Mosaico, Stats
├── vorszk-sections2.jsx    ← Founders, Mantenedores, Comunidade, Footer...
├── styles/
│   ├── tokens.css          ← cores, tipografia, espaçamento (variáveis)
│   └── vorszk.css          ← estilos editoriais (cursor, marquee, etc)
└── assets/                 ← logos e ícones em PNG
```

### O que cada arquivo controla

| Quero mudar... | Edite... |
| --- | --- |
| Cores, fontes, espaçamento (tokens globais) | `styles/tokens.css` |
| Estilo das animações, cursor, divisórias | `styles/vorszk.css` |
| Hero, manifesto, expertise, mosaico, stats | `vorszk-sections.jsx` |
| Founders, mantenedores, comunidade, footer | `vorszk-sections2.jsx` |
| Cursor, loader, sidenav, marquee (primitivas) | `vorszk-core.jsx` |
| Ordem das seções na home | `app.jsx` |

---

## 🛠️ Tech stack

- **HTML + JSX inline** transpilado pelo **Babel Standalone** (sem build step)
- **React 18** (UMD via CDN)
- **Lenis 1.1.20** — smooth scroll
- **GSAP 3.12.5 + ScrollTrigger** — animações no scroll
- **Geist** + **Instrument Serif** (Google Fonts)

**Não tem `package.json` nem `npm install`.** Tudo é carregado por `<script src>`
direto no `index.html`. Quando for migrar pra produção de verdade (Next.js,
Vite, etc.), você vai converter os `.jsx` em arquivos React normais.

---

## 🐛 Problemas comuns

- **"Tela em branco"** → abriu `index.html` direto com duplo clique?
  Não funciona. Precisa do servidor local (Opções 1, 2 ou 3 acima).
- **Página não recarrega ao salvar** → só recarrega automaticamente no
  Live Server (Opção 1). Nas outras, dê `Ctrl+R` ou `Cmd+R`.
- **JSX não carrega** → Babel pode demorar 1–2 s na primeira vez.
- **Quero mais devagar/rápido** → no `vorszk-core.jsx`, busque por
  `new window.Lenis({` e ajuste `duration: 1.15`.
