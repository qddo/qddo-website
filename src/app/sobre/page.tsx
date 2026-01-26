import { getPageMetadata } from '@/lib/seo';

export const metadata = getPageMetadata({
  title: 'Sobre',
  description: 'Conheça mais sobre o QDDO - Quadrado Central Hub. Uma comunidade criada para founders que buscam conectar-se, aprender e crescer juntos.',
  path: '/sobre',
  keywords: ['sobre', 'quem somos', 'missão', 'comunidade founders'],
});

export default function SobrePage() {
  return (
    <article style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: 'var(--spacing-20) var(--spacing-6)',
    }}>
      <h1 style={{ 
        fontSize: 'var(--font-size-4xl)', 
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--spacing-6)',
        color: 'var(--color-white)'
      }}>
        Sobre o QDDO
      </h1>
      <div style={{ 
        fontSize: 'var(--font-size-lg)',
        lineHeight: 'var(--line-height-relaxed)',
        color: 'var(--color-gray-400)'
      }}>
        <p style={{ marginBottom: 'var(--spacing-6)' }}>
          O QDDO - Quadrado Central Hub é uma comunidade criada para founders que buscam 
          conectar-se, aprender e crescer juntos.
        </p>
        <p style={{ marginBottom: 'var(--spacing-6)' }}>
          Acreditamos que o empreendedorismo é uma jornada que não precisa ser solitária. 
          Por isso, criamos um espaço onde founders podem compartilhar experiências, 
          trocar conhecimento e construir relacionamentos duradouros.
        </p>
        <p>
          Nossa missão é simples: conectar pessoas reais, com histórias reais, 
          construindo um ecossistema de apoio mútuo para o crescimento de todos.
        </p>
      </div>
    </article>
  );
}
