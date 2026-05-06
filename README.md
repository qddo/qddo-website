# QDDO - Quadrado Central Hub

Site da comunidade QDDO para founders. Construído com Next.js 14+, TypeScript, CSS Modules e foco em performance e acessibilidade.

## Stack Técnica

- **Framework:** Next.js 16+ (App Router)
- **Linguagem:** TypeScript (strict mode)
- **Estilização:** CSS Modules
- **Componentes:** Radix UI (acessibilidade) + Lucide React (ícones)
- **Data Fetching:** React Query (TanStack) + React Server Components
- **Validação:** Zod + React Hook Form
- **Estado Global:** Zustand (quando necessário)
- **Fontes:** Inter via `next/font`

## Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js)
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Home page
│   ├── sobre/             # Página Sobre
│   └── comunidade/        # Página Comunidade
├── components/
│   ├── ui/                # Componentes primitivos (Button, Card, Input)
│   └── features/          # Componentes compostos (Header, Footer, Hero)
├── lib/                   # Utilitários, constantes, validações
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types/interfaces
└── styles/                # Estilos globais e variáveis CSS
```

## Como Executar

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build de Produção

```bash
npm run build
npm start
```

## Boas Práticas Implementadas

1. **React Server Components:** 80% do HTML renderizado no servidor
2. **Semântica HTML5:** Uso correto de `<main>`, `<nav>`, `<article>`, etc.
3. **Acessibilidade:** Componentes Radix UI com ARIA completo
4. **Performance:** Fontes otimizadas, imagens com `next/image`, LCP otimizado
5. **TypeScript Strict:** Sem uso de `any`, tipagem completa

## Design System

O projeto utiliza CSS Custom Properties para cores, espaçamentos, tipografia e outros tokens de design. Inspirado em comunidades de founders (Y Combinator, Indie Hackers) com estilo minimalista e profissional.

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa ESLint

## Licença

Privado - QDDO
