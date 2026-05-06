/**
 * Types e interfaces TypeScript do projeto
 */

/**
 * Tipo para itens de navegação
 */
export interface NavItem {
  href: string;
  label: string;
}

/**
 * Tipo para links sociais
 */
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

/**
 * Tipo genérico para componentes com children
 */
export interface WithChildren {
  children: React.ReactNode;
}

/**
 * Tipo para variantes de componentes
 */
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';
