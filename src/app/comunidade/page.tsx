import { getPageMetadata } from '@/lib/seo';

export const metadata = getPageMetadata({
  title: 'Comunidade',
  description: 'Faça parte da comunidade QDDO e conecte-se com outros founders. Eventos, meetups, grupos de discussão e muito mais.',
  path: '/comunidade',
  keywords: ['comunidade', 'networking', 'eventos', 'meetups', 'founders'],
});

export default function ComunidadePage() {
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
        Nossa Comunidade
      </h1>
      <div style={{ 
        fontSize: 'var(--font-size-lg)',
        lineHeight: 'var(--line-height-relaxed)',
        color: 'var(--color-gray-400)'
      }}>
        <p style={{ marginBottom: 'var(--spacing-6)' }}>
          A comunidade QDDO é formada por founders de diferentes estágios, setores e 
          experiências. Todos unidos pelo desejo de construir algo significativo.
        </p>
        <p style={{ marginBottom: 'var(--spacing-6)' }}>
          Aqui você encontra:
        </p>
        <ul style={{ 
          listStyle: 'disc',
          paddingLeft: 'var(--spacing-6)',
          marginBottom: 'var(--spacing-6)'
        }}>
          <li style={{ marginBottom: 'var(--spacing-2)' }}>
            Eventos e meetups regulares
          </li>
          <li style={{ marginBottom: 'var(--spacing-2)' }}>
            Grupos de discussão e networking
          </li>
          <li style={{ marginBottom: 'var(--spacing-2)' }}>
            Recursos e conteúdo exclusivo
          </li>
          <li style={{ marginBottom: 'var(--spacing-2)' }}>
            Oportunidades de mentoria e colaboração
          </li>
        </ul>
        <p>
          Junte-se a nós e faça parte dessa comunidade que está transformando 
          o ecossistema empreendedor.
        </p>
      </div>
    </article>
  );
}
