// 1. React e Next.js
// (sem imports necessários)

// 2. Bibliotecas externas
import { ArrowUpRight } from 'lucide-react';

// 3. Componentes internos
import { Button } from '@/components/ui';

// 4. Utilitários e libs
import { MEMBER_COMPANIES } from '@/lib/constants';

// 5. Estilos
import styles from './MembersSection.module.css';

export function MembersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textColumn}>
            <h2 className={styles.title}>
              <span className={styles.titleAileron}>Empresas dos</span>
              <br />
              <span className={styles.titleLora}>nossos membros</span>
            </h2>
            <p className={styles.description}>
              Conheça algumas das empresas dos nossos membros que estão transformando
              o ecossistema empreendedor e construindo o futuro.
            </p>
            <Button variant="outline" size="lg" className={styles.viewAllButton}>
              <span>Ver todos</span>
              <ArrowUpRight size={18} className={styles.viewAllIcon} />
            </Button>
          </div>
          <div className={styles.gridColumn}>
            <div className={styles.grid}>
              {MEMBER_COMPANIES.map((company) => (
                <div key={company.id} className={styles.companyCard}>
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className={styles.companyLogo}
                    />
                  ) : (
                    <span className={styles.companyName}>{company.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
