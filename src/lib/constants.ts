/**
 * Constantes do projeto
 */

export const SITE_NAME = 'QDDO';
export const SITE_DESCRIPTION = 'Onde a Inovação deixa de ser Storytelling e vira Execução. O QDDO Central Hub é o ponto de convergência entre o capital intelectual das corporações e a agilidade das startups de elite.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://qddo.com.br';

export const NAV_ITEMS = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/portfolio', label: 'Portfólio' },
] as const;

export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/5511999999999',
  instagram: 'https://instagram.com/qddo',
  linkedin: 'https://linkedin.com/company/qddo',
} as const;

export const FOOTER_ADDRESS = {
  street: 'St. de Grandes Áreas Norte, 901',
  neighborhood: 'Asa Norte',
  city: 'Brasília - DF',
  zipCode: '70070-900',
  location: 'Ulysses Guimarães Centro de Convenções',
} as const;

export interface MemberCompany {
  id: string;
  name: string;
  logo?: string; // URL da imagem do logo (opcional)
}

export const MEMBER_COMPANIES: MemberCompany[] = [
  { id: '1', name: 'versa' },
  { id: '2', name: 'gurupass' },
  { id: '3', name: 'Umatch' },
  { id: '4', name: 'patta' },
  { id: '5', name: 'e.pipi' },
  { id: '6', name: 'DIO' },
  { id: '7', name: 'gaio' },
  { id: '8', name: 'CAFELLOW' },
  { id: '9', name: 'KOELLES' },
  { id: '10', name: 'GUIPA' },
  { id: '11', name: 'the SIX' },
  { id: '12', name: 'StartupX' },
] as const;

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'Como funciona o sistema de Créditos de Conhecimento?',
    answer: 'O acesso ao QDDO não custa dinheiro; custa inteligência. Operamos sob uma Governança de Contribuição, onde você paga sua permanência entregando mentorias, rituais de accountability e abrindo portas. É um sistema de troca de valor intelectual que mantém a barra alta e garante que todos contribuam para o ecossistema.',
  },
  {
    id: '2',
    question: 'O que é uma Vertical de Inovação?',
    answer: 'Uma Vertical de Inovação é quando uma corporação mantém uma sala dedicada no QDDO, assumindo o protagonismo em setores específicos como HealthTech, FinTech ou GovTech. Ao ser uma Âncora de Vertical, sua empresa não é apenas uma patrocinadora; ela se posiciona no epicentro do empreendedorismo do DF, gerando equity, impacto social e visibilidade de marca.',
  },
  {
    id: '3',
    question: 'Qual o investimento para ser Mantenedor Âncora?',
    answer: 'O investimento varia conforme a vertical e o nível de envolvimento desejado. Trabalhamos com orçamentos de inovação que vão de R$ 5k a R$ 20k mensais, dependendo do escopo. O importante é entender que isso não é um custo de patrocínio, mas um investimento em P&D externo que gera vantagem competitiva real. Entre em contato para uma proposta personalizada.',
  },
  {
    id: '4',
    question: 'Como funciona o processo de seleção de founders?',
    answer: 'Não aceitamos todos. Aceitamos os certos. O processo de seleção é rigoroso e focado em founders que já estão executando, não apenas planejando. Avaliamos tração, execução real e potencial de contribuição para o ecossistema. O QDDO é para quem faz, não para quem fala.',
  },
  {
    id: '5',
    question: 'O que é a Rede Única de Negócios (RUB)?',
    answer: 'A RUB é nossa estrutura de networking que transforma conexões em contratos reais. No QDDO, o networking não é casual; é estruturado para gerar deal flow real com as maiores corporações do país. Conexões aqui viram negócios, não apenas trocas de cartão.',
  },
  {
    id: '6',
    question: 'O QDDO é um coworking?',
    answer: 'Não. Não somos um coworking. Somos um Laboratório de Execução a Céu Aberto. Aqui, grandes empresas não apenas assistem ao mercado; elas orbitam o futuro ao lado de quem está resolvendo problemas reais agora. É um ecossistema de alta densidade onde a inovação deixa de ser storytelling e vira execução.',
  },
] as const;

// Copy para as sections
export const HERO_COPY = {
  headline: 'Onde a Inovação deixa de ser Storytelling e vira Execução',
  subheadline: 'O QDDO Central Hub é o ponto de convergência entre o capital intelectual das corporações e a agilidade das startups de elite. Um ecossistema de alta densidade em Brasília para quem constrói empresas reais, sem filtros corporativos.',
  ctaPrimary: 'Liderar uma Vertical de Inovação',
  ctaSecondary: 'Aplicar como Founder',
} as const;

export const MANIFESTO_COPY = {
  title: 'A verdade sobre a inovação no Brasil',
  content: 'A inovação aberta virou um teatro: eventos que não geram notas fiscais, hackathons que terminam em pizza e scouting que entrega volume, mas não valor. O QDDO nasceu para preencher o vácuo entre a intenção estratégica e o resultado aplicado.',
  highlight: 'Não somos um coworking. Somos um Laboratório de Execução a Céu Aberto.',
  highlightSubtext: 'Aqui, grandes empresas não apenas assistem ao mercado; elas orbitam o futuro ao lado de quem está resolvendo problemas reais agora.',
} as const;

export const MANTENEDORAS_BENEFITS = [
  {
    id: '1',
    title: 'Acesso ao Topo da Pirâmide',
    description: 'Esteja a um passo dos founders que estão definindo os novos padrões do mercado.',
  },
  {
    id: '2',
    title: 'Scouting Passivo e Qualificado',
    description: 'As soluções certas não chegam por e-mail; elas são validadas nos rituais diários do hub.',
  },
  {
    id: '3',
    title: 'Cultura de Give-Back',
    description: 'Posicione sua marca no epicentro do empreendedorismo do DF, gerando equity, impacto social e visibilidade de marca.',
  },
  {
    id: '4',
    title: 'Ambiente de Exploração',
    description: 'Um espaço fora da burocracia corporativa para testar teses, rodar POCs e treinar seus talentos internos com quem executa em alta velocidade.',
  },
] as const;

export const FOUNDERS_BENEFITS = [
  {
    id: '1',
    title: 'Sistema de Créditos de Conhecimento',
    description: 'Você paga sua permanência entregando mentorias, rituais de accountability e abrindo portas. O acesso não custa dinheiro; custa inteligência.',
  },
  {
    id: '2',
    title: 'Rede Única de Negócios (RUB)',
    description: 'Conexões que viram contratos. No QDDO, o networking é estruturado para gerar deal flow real com as maiores corporações do país.',
  },
  {
    id: '3',
    title: 'Pares de Alta Performance',
    description: 'Saia da solidão do home office para um ambiente de "foco protegido" e troca de experiências brutas entre fundadores de diferentes estágios.',
  },
] as const;

export const FILOSOFIA_COPY = {
  title: 'Onde a vida e o trabalho convergem para o propósito',
  subtitle: 'Acreditamos que empresas saudáveis são construídas por fundadores saudáveis.',
  pillars: [
    {
      id: 'work',
      title: 'Work',
      description: 'Silêncio para criar, rituais para entregar.',
    },
    {
      id: 'live',
      title: 'Live',
      description: 'Conexão real e bem-estar coletivo (GymRats e rituais de saúde).',
    },
    {
      id: 'play',
      title: 'Play',
      description: 'Celebramos marcos, não intenções. A serendipidade aqui é planejada em cada evento e Happy Hour.',
    },
  ],
} as const;

export const BRASILIA_COPY = {
  title: 'Do Quadrado para o Mundo',
  content: 'Brasília sempre teve densidade intelectual. Agora, tem um porto seguro para a execução. Estamos provando que o DF é um celeiro de scale-ups globais.',
  highlight: 'O QDDO é o marco zero das empresas que sairão daqui para liderar seus mercados.',
} as const;

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  image: string; // URL da imagem (Unsplash inicialmente)
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'João Silva',
    role: 'Founder & CEO',
    company: 'TechStart',
    quote: 'O QDDO transformou minha forma de pensar sobre networking. Aqui, cada conexão tem propósito e gera resultado real. Não é conversa; é execução.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Maria Santos',
    role: 'Co-founder',
    company: 'InnovaCorp',
    quote: 'O sistema de Créditos de Conhecimento é genial. Você contribui com o que sabe e recebe acesso a um ecossistema de elite. É win-win real.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    role: 'Founder',
    company: 'ScaleUp',
    quote: 'A Rede Única de Negócios me trouxe contratos que eu nunca conseguiria sozinho. O QDDO não é networking; é deal flow estruturado.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Ana Costa',
    role: 'Founder & CTO',
    company: 'DataFlow',
    quote: 'Encontrei meus pares de alta performance aqui. A troca de experiências brutas entre founders acelera o crescimento de forma exponencial.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'Pedro Almeida',
    role: 'Founder',
    company: 'GreenTech',
    quote: 'Brasília finalmente tem um hub de execução. O QDDO provou que o DF pode ser o centro de gravidade do empreendedorismo brasileiro.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
] as const;

export interface PortfolioDestination {
  id: string;
  city: string;
  image: string;
  airline: string;
  price: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  logo: string;
  link: string;
}

export const PORTFOLIO_DESTINATIONS: PortfolioDestination[] = [
  {
    id: '1',
    city: 'MILÃO',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=600&fit=crop',
    airline: 'executiva - latam',
    price: 'USD 2500 + taxas',
  },
  {
    id: '2',
    city: 'MIAMI',
    image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=400&h=600&fit=crop',
    airline: 'executiva - latam',
    price: 'USD 2500 + taxas',
  },
  {
    id: '3',
    city: 'LISBOA',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=600&fit=crop',
    airline: 'executiva - latam',
    price: 'USD 2199 + taxas',
  },
] as const;

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'guday',
    name: 'GUDAY',
    logo: 'GUDAY',
    link: '#',
  },
  {
    id: 'flyby',
    name: 'FLYBY',
    logo: 'FLYBY',
    link: '#',
  },
  {
    id: 'gurupass',
    name: 'Gurupass',
    logo: 'Gurupass',
    link: '#',
  },
] as const;
