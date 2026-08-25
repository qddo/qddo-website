/**
 * Configurações SEO centralizadas
 * Seguindo padrão do guia de boas práticas
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://qddo.com.br';

export const companyData = {
  name: 'QDDO',
  fullName: 'Quadrado Central Hub',
  description: 'Comunidade para founders. Conectando empreendedores, compartilhando conhecimento e construindo o futuro.',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  twitter: '@qddo',
};

/**
 * Schema.org Organization
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyData.fullName,
    url: companyData.url,
    logo: companyData.logo,
    description: companyData.description,
    sameAs: [
      'https://twitter.com/qddo',
      'https://linkedin.com/company/qddo',
    ],
  };
}

/**
 * Schema.org WebSite
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: companyData.fullName,
    url: companyData.url,
    description: companyData.description,
    publisher: {
      '@type': 'Organization',
      name: companyData.name,
    },
  };
}

/**
 * Helper para gerar metadata completa
 */
export function getPageMetadata({
  title,
  description,
  path = '',
  image,
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image ? `${SITE_URL}${image}` : companyData.logo;

  return {
    title: `${title} | ${companyData.name}`,
    description,
    keywords: keywords.length > 0 ? keywords : ['founders', 'empreendedores', 'comunidade', 'startup', 'networking'],
    openGraph: {
      title: `${title} | ${companyData.name}`,
      description,
      type: 'website',
      locale: 'pt_BR',
      url,
      siteName: companyData.fullName,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${companyData.name}`,
      description,
      images: [imageUrl],
      creator: companyData.twitter,
    },
    alternates: {
      canonical: url,
    },
  };
}
