# Guia de Marca QDDO - Quadrado Central Hub

Documento de referência para uso consistente da identidade visual da marca QDDO.

---

## 🎨 Paleta de Cores

### Cores Principais

| Cor | Hex | Uso |
|-----|-----|-----|
| **Preto** | `#1d1d1b` | Fundo principal, base do design |
| **Branco** | `#ffffff` | Texto principal, elementos em destaque |
| **Laranja** | `#e94e1b` | Cor de destaque, CTAs, acentos, destaques importantes |

### Cores Secundárias (Tons de Cinza)

Para criar hierarquia e contraste em fundo escuro:

| Cor | Hex | Uso |
|-----|-----|-----|
| Cinza 50 | `#2a2a28` | Backgrounds secundários, cards |
| Cinza 100 | `#3a3a38` | Bordas, divisores |
| Cinza 200-300 | `#4a4a48` - `#5a5a58` | Elementos desabilitados, textos secundários |
| Cinza 400-500 | `#6a6a68` - `#7a7a78` | Textos terciários, placeholders |
| Cinza 600+ | `#8a8a88`+ | Apenas para elementos muito sutis |

### Variantes do Laranja

| Variante | Hex | Uso |
|----------|-----|-----|
| Laranja Hover | `#d43e0b` | Estados hover de botões e links |
| Laranja Dark | `#c02e0a` | Estados ativos, pressão |
| Laranja Light | `rgba(233, 78, 27, 0.1)` | Backgrounds sutis, highlights |

---

## 🎯 Princípios de Design

### 1. Fundo Escuro como Base
- **Sempre** usar fundo preto (`#1d1d1b`) como base
- O fundo escuro cria contraste e destaca o conteúdo
- Elementos brancos e laranja ganham destaque naturalmente

### 2. Laranja para Destaques
- Use laranja **esparsamente** e com propósito
- Aplicar em:
  - CTAs principais
  - Textos que precisam de destaque
  - Elementos interativos (hover, active)
  - Ícones e elementos gráficos importantes
  - Gradientes e overlays

### 3. Alto Contraste
- Texto branco sobre fundo preto para máxima legibilidade
- Laranja sobre preto para elementos de destaque
- Evitar textos claros sobre fundos claros

### 4. Minimalismo
- Design limpo e direto
- Espaçamento generoso
- Tipografia bold e impactante
- Menos é mais

---

## 📐 Tipografia

### Famílias de Fonte

O QDDO utiliza três famílias tipográficas distintas, cada uma com seu propósito:

#### 1. **Aileron** - Fonte Principal (Sans-serif)
- **Uso**: Texto padrão, corpo, navegação, botões, elementos de interface
- **Características**: Moderna, limpa, legível, versátil
- **Pesos disponíveis**: Thin (100), UltraLight (200), Light (300), Regular (400), SemiBold (600), Bold (700), Heavy (800), Black (900)
- **Estilos**: Normal e Itálico
- **CSS Variable**: `var(--font-aileron)` ou `var(--font-family-sans)`

#### 2. **Lora** - Fonte Formal (Serif)
- **Uso**: 
  - **Detalhes especiais**: Elementos que precisam de destaque sutil, informações complementares
  - **Formalidade específica**: Textos que requerem tom mais sério, elegante ou editorial
  - **Citações**: Depoimentos, frases de impacto, citações de founders
  - **Conteúdo editorial**: Artigos, posts, textos longos que precisam de seriedade
  - **Logo**: Marca QDDO no header (já aplicado)
- **Características**: Elegante, clássica, legível em textos longos, transmite confiança e seriedade
- **Pesos disponíveis**: Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Estilos**: Normal e Itálico
- **CSS Variable**: `var(--font-lora)` ou `var(--font-family-serif)`
- **Quando usar**: Use Lora esparsamente, apenas quando precisar criar contraste ou adicionar formalidade a elementos específicos

#### 3. **Extenda** - Títulos (Display)
- **Uso**: Títulos principais, hero sections, headlines impactantes
- **Características**: Bold, impactante, chamativa, ideal para grandes títulos
- **Peso**: Regular (400)
- **CSS Variable**: `var(--font-extenda)` ou `var(--font-family-display)`

### Hierarquia Tipográfica

| Elemento | Fonte | Tamanho | Peso | Uso |
|----------|-------|--------|------|-----|
| Hero Title | Extenda | `3rem - 3.75rem` (48px - 60px) | Regular (400) | Títulos principais, hero |
| H1 | Extenda ou Aileron Bold | `2.25rem - 3rem` (36px - 48px) | Bold (700) | Títulos de página |
| H2 | Aileron | `1.875rem` (30px) | SemiBold (600) | Subtítulos |
| H3 | Aileron | `1.5rem` (24px) | SemiBold (600) | Seções |
| Body Large | Aileron | `1.125rem - 1.25rem` (18px - 20px) | Regular (400) | Textos importantes |
| Body | Aileron | `1rem` (16px) | Regular (400) | Texto padrão |
| Body Formal | Lora | `1rem` (16px) | Regular (400) | Textos formais, editoriais |
| Small | Aileron | `0.875rem` (14px) | Regular (400) | Textos secundários |
| XS | Aileron | `0.75rem` (12px) | Regular (400) | Labels, captions |

### Regras de Uso

- **Títulos Principais (Hero)**: Use **Extenda** para máximo impacto
- **Títulos de Seção**: Use **Aileron Bold** ou **SemiBold**
- **Corpo de Texto**: Use **Aileron Regular** para textos gerais (padrão)
- **Detalhes e Formalidade**: Use **Lora** para:
  - Elementos que precisam de destaque sutil
  - Textos que requerem tom mais sério/elegante
  - Citações e depoimentos
  - Informações complementares importantes
  - Logo da marca
- **Cores**: Títulos sempre em branco ou laranja (para destaque)
- **Line Height**: 1.5 para corpo, 1.25 para títulos
- **Letter Spacing**: Títulos podem usar `-0.02em` para visual mais compacto

### Exemplos de Aplicação

```css
/* Hero Title com Extenda */
.hero-title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-5xl);
  font-weight: 400;
  color: var(--color-white);
}

/* Título de seção com Aileron */
.section-title {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-white);
}

/* Corpo de texto padrão */
.body-text {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: 400;
  color: var(--color-white);
  line-height: var(--line-height-normal);
}

/* Texto formal com Lora - para detalhes e formalidade */
.formal-text {
  font-family: var(--font-lora), Georgia, 'Times New Roman', serif;
  font-size: var(--font-size-base);
  font-weight: 400;
  color: var(--color-white);
  line-height: var(--line-height-relaxed);
}

/* Citação ou depoimento com Lora */
.quote {
  font-family: var(--font-lora), Georgia, 'Times New Roman', serif;
  font-size: var(--font-size-lg);
  font-style: italic;
  font-weight: 400;
  color: var(--color-gray-400);
  line-height: var(--line-height-relaxed);
}

/* Detalhe especial com Lora */
.detail-text {
  font-family: var(--font-lora), Georgia, 'Times New Roman', serif;
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--color-gray-400);
  font-style: italic;
}
```

### Quando Usar Cada Fonte

#### Aileron (Padrão - 90% do conteúdo)
- ✅ Navegação
- ✅ Botões
- ✅ Textos de corpo
- ✅ Cards e componentes
- ✅ Formulários
- ✅ Footer
- ✅ Subtítulos (h2, h3, h4, etc)

#### Lora (Detalhes e Formalidade - 5-10% do conteúdo)
- ✅ Logo da marca
- ✅ Citações e depoimentos
- ✅ Textos que precisam de tom mais sério/elegante
- ✅ Detalhes especiais que precisam de destaque sutil
- ✅ Informações complementares importantes
- ✅ Textos editoriais longos
- ✅ Elementos que precisam criar contraste com Aileron

#### Extenda (Títulos Principais - 1-2% do conteúdo)
- ✅ Título principal do Hero
- ✅ Headlines muito impactantes
- ✅ Títulos de página principais (h1 grandes)

### Exemplos Práticos de Uso da Lora

```css
/* Logo - já aplicado */
.logo {
  font-family: var(--font-lora), Georgia, serif;
}

/* Citação de founder */
.founder-quote {
  font-family: var(--font-lora), Georgia, serif;
  font-style: italic;
  font-size: var(--font-size-lg);
  color: var(--color-gray-400);
}

/* Detalhe especial em card */
.card-detail {
  font-family: var(--font-lora), Georgia, serif;
  font-size: var(--font-size-sm);
  font-style: italic;
  color: var(--color-gray-400);
}

/* Texto editorial/artigo */
.editorial-text {
  font-family: var(--font-lora), Georgia, serif;
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-white);
}
```

---

## 🎨 Uso de Cores em Componentes

### Botões

```css
/* Botão Primário (Laranja) */
background: var(--color-orange);
color: var(--color-white);

/* Botão Secundário (Outline) */
background: transparent;
border: 1px solid var(--color-gray-100);
color: var(--color-white);

/* Botão Ghost */
background: transparent;
color: var(--color-white);
```

### Cards

```css
background: var(--color-gray-50); /* Cinza muito escuro */
border: 1px solid var(--color-gray-100);
color: var(--color-white);
```

### Links

```css
/* Link padrão */
color: var(--color-white);

/* Link hover */
color: var(--color-orange);

/* Link destacado */
color: var(--color-orange);
```

---

## 🌈 Gradientes e Efeitos

### Gradiente Laranja
Use para criar profundidade e interesse visual:

```css
background: linear-gradient(135deg, var(--color-orange) 0%, var(--color-primary-dark) 100%);
```

### Glow Laranja
Para elementos que precisam de destaque especial:

```css
box-shadow: var(--shadow-orange-md);
/* ou */
box-shadow: 0 4px 16px rgba(233, 78, 27, 0.3);
```

### Overlay Laranja
Para imagens e backgrounds:

```css
background: linear-gradient(
  to bottom,
  rgba(233, 78, 27, 0.1) 0%,
  rgba(29, 29, 27, 0.9) 100%
);
```

---

## 📱 Espaçamento

Sistema baseado em 4px (0.25rem):

- `--spacing-1`: 4px
- `--spacing-2`: 8px
- `--spacing-4`: 16px
- `--spacing-6`: 24px
- `--spacing-8`: 32px
- `--spacing-12`: 48px
- `--spacing-16`: 64px
- `--spacing-20`: 80px
- `--spacing-24`: 96px

**Regra**: Use espaçamento generoso para respiração visual.

---

## 🎭 Estados e Interações

### Hover
- Links: Branco → Laranja
- Botões: Laranja → Laranja Dark (`#d43e0b`)
- Cards: Adicionar borda laranja sutil ou glow

### Active/Pressed
- Botões: Laranja Dark (`#c02e0a`)
- Feedback visual imediato

### Focus
- Sempre usar outline laranja para acessibilidade
- `outline: 2px solid var(--color-orange)`

### Disabled
- Opacidade reduzida (0.5)
- Cor cinza (não laranja)

---

## 🖼️ Imagens e Gráficos

### Tratamento de Imagens
- Imagens devem ter contraste adequado
- Overlays escuros podem ser necessários para legibilidade de texto
- Use gradientes laranja sutilmente em overlays

### Elementos Gráficos
- Formas geométricas simples
- Linhas e bordas limpas
- Uso de laranja para elementos destacados

### Ícones
- Branco para ícones padrão
- Laranja para ícones de destaque/ação
- Tamanho mínimo: 16px para legibilidade

---

## 📋 Checklist de Aplicação

Ao criar novos componentes ou páginas:

- [ ] Fundo escuro (`#1d1d1b`) como base
- [ ] Texto branco para máxima legibilidade
- [ ] Laranja usado esparsamente e com propósito
- [ ] Alto contraste mantido
- [ ] Espaçamento generoso
- [ ] Tipografia bold para títulos
- [ ] Estados hover/active definidos
- [ ] Focus states acessíveis (outline laranja)
- [ ] Responsivo (mobile-first)

---

## 🚫 O que Evitar

❌ **NÃO** usar:
- Fundos claros como base
- Texto preto sobre fundo preto
- Laranja em excesso (perde impacto)
- Cores que não estão na paleta
- Baixo contraste
- Tipografia muito pequena (< 12px)
- Espaçamento apertado

---

## 📚 Exemplos de Uso

### Hero Section
```css
background: var(--color-black);
color: var(--color-white);
/* Título principal pode ter palavras em laranja */
```

### Card de Evento
```css
background: var(--color-gray-50);
border: 1px solid var(--color-gray-100);
/* Título do evento em laranja */
/* Data/localização em branco */
```

### CTA Button
```css
background: var(--color-orange);
color: var(--color-white);
/* Hover: background: var(--color-primary-hover) */
```

### Texto Destacado
```css
color: var(--color-orange);
/* Use para frases importantes, CTAs no texto */
```

---

## 🎯 Mensagem da Marca

A identidade visual QDDO comunica:
- **Ousadia**: Laranja vibrante em fundo escuro
- **Clareza**: Alto contraste, tipografia bold
- **Foco**: Minimalismo, sem distrações
- **Energia**: Cores vibrantes, design dinâmico
- **Profissionalismo**: Design limpo e moderno

---

## 📖 Referências Visuais

Baseado nos materiais de referência:
- Posters com fundo preto e texto branco/laranja
- Eventos (FOUNDER NIGHT) com gradientes laranja
- Mensagens motivacionais com destaque em laranja
- Elementos arquitetônicos (Catedral de Brasília) em escala de cinza

---

**Última atualização**: Janeiro 2025

Este guia deve ser consultado sempre que houver dúvidas sobre uso de cores, tipografia ou elementos visuais da marca QDDO.
