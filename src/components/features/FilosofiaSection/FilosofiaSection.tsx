// 1. React e Next.js
// (sem imports necessários)

// 2. Bibliotecas externas
import { Briefcase, Heart, Sparkles } from 'lucide-react';

// 3. Utilitários e libs
import { FILOSOFIA_COPY } from '@/lib/constants';

// 4. Estilos
import styles from './FilosofiaSection.module.css';

const icons = {
  work: Briefcase,
  live: Heart,
  play: Sparkles,
};

export function FilosofiaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{FILOSOFIA_COPY.title}</h2>
          <p className={styles.subtitle}>{FILOSOFIA_COPY.subtitle}</p>
        </div>
        <div className={styles.grid}>
          {FILOSOFIA_COPY.pillars.map((pillar) => {
            const Icon = icons[pillar.id as keyof typeof icons];
            return (
              <div key={pillar.id} className={styles.pillar}>
                <div className={styles.iconWrapper}>
                  <Icon size={48} className={styles.icon} />
                </div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDescription}>{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
