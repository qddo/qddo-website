// 1. React e Next.js
// (sem imports necessários)

// 2. Bibliotecas externas
// (sem imports necessários)

// 3. Utilitários e libs
import { getPageMetadata } from '@/lib/seo';
import { FAQSection } from '@/components/features/FAQSection/FAQSection';

// 4. Estilos
import styles from './SobrePage.module.css';

export const metadata = getPageMetadata({
  title: 'Sobre',
  description: 'Conheça o manifesto do QDDO - Quadrado Central Hub. Descubra nosso propósito, o que nos motivou e os valores que nos movem.',
  path: '/sobre',
  keywords: ['sobre', 'quem somos', 'missão', 'manifesto', 'propósito', 'comunidade founders'],
});

export default function SobrePage() {
  return (
    <article className={styles.page}>
      <div className={styles.container}>
        {/* Hero/Introdução */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Onde a Inovação deixa de ser Storytelling e vira Execução
          </h1>
        </section>

        {/* Manifesto - Texto Corrido */}
        <section className={styles.manifesto}>
          <div className={styles.manifestoContent}>
            <p className={styles.paragraph}>
              A verdade sobre a inovação no Brasil é dura: a inovação aberta virou um teatro. 
              Eventos que não geram notas fiscais, hackathons que terminam em pizza e scouting 
              que entrega volume, mas não valor. Grandes corporações gastam fortunas com 
              programas de inovação e não veem ROI real. Foi diante dessa realidade que o QDDO 
              nasceu para preencher o vácuo entre a intenção estratégica e o resultado aplicado. 
              Não somos um coworking. Somos um Laboratório de Execução a Céu Aberto, o ponto de 
              convergência entre o capital intelectual das corporações e a agilidade das startups 
              de elite. Um ecossistema de alta densidade em Brasília para quem constrói empresas 
              reais, sem filtros corporativos. Aqui, grandes empresas não apenas assistem ao 
              mercado; elas orbitam o futuro ao lado de quem está resolvendo problemas reais agora.
            </p>

            <p className={styles.paragraph}>
              No QDDO, transformamos o budget de inovação em vantagem competitiva. Para as 
              corporações, ser uma Âncora de Vertical significa assumir o protagonismo em setores 
              como HealthTech, FinTech ou GovTech, mantendo uma sala dedicada que funciona como 
              um ativo de P&D externo. É acesso ao topo da pirâmide, scouting passivo e qualificado, 
              e um ambiente de exploração fora da burocracia corporativa para testar teses, rodar 
              POCs e treinar talentos internos com quem executa em alta velocidade. Para os founders, 
              o QDDO é o hub de quem faz, onde o faturamento é detalhe e a execução é regra. O 
              acesso não custa dinheiro; custa inteligência. Operamos sob uma Governança de 
              Contribuição, onde você paga sua permanência entregando mentorias, rituais de 
              accountability e abrindo portas. A Rede Única de Negócios transforma conexões em 
              contratos reais com as maiores corporações do país, enquanto você encontra pares de 
              alta performance em um ambiente de foco protegido, saindo da solidão do home office 
              para trocar experiências brutas entre fundadores de diferentes estágios.
            </p>

            <p className={styles.paragraph}>
              Acreditamos que empresas saudáveis são construídas por fundadores saudáveis. Por isso, 
              o QDDO é onde a vida e o trabalho convergem para o propósito: silêncio para criar e 
              rituais para entregar no Work, conexão real e bem-estar coletivo no Live, e celebração 
              de marcos reais, não intenções, no Play. Brasília sempre teve densidade intelectual. 
              Agora, tem um porto seguro para a execução. Estamos provando que o DF é um celeiro de 
              scale-ups globais, e o QDDO é o marco zero das empresas que sairão daqui para liderar 
              seus mercados. Do Quadrado para o Mundo. Não aceitamos todos. Aceitamos os certos. 
              Seja você um Diretor de Inovação buscando o próximo salto da sua empresa ou um Founder 
              pronto para escalar, o QDDO exige compromisso. Porque aqui, a inovação deixa de ser 
              storytelling e vira execução.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.section}>
          <FAQSection />
        </section>
      </div>
    </article>
  );
}
