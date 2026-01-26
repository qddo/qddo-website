import { getPageMetadata } from '@/lib/seo';
import { PortfolioSection } from '@/components/features/PortfolioSection/PortfolioSection';

export const metadata = getPageMetadata({
  title: 'Portfólio',
  description: 'Conheça o portfólio de empresas e projetos dos membros do QDDO Central Hub.',
  path: '/portfolio',
  keywords: ['portfólio', 'empresas', 'projetos', 'startups', 'founders'],
});

export default function PortfolioPage() {
  return <PortfolioSection />;
}
