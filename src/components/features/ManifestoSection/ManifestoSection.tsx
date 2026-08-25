// 1. React e Next.js
// (sem imports necessários)

// 2. Bibliotecas externas
// (sem imports necessários)

// 3. Utilitários e libs
import { MANIFESTO_COPY } from '@/lib/constants';

// 4. Estilos
import styles from './ManifestoSection.module.css';

export function ManifestoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{MANIFESTO_COPY.title}</h2>
        <div className={styles.content}>
          <p className={styles.text}>{MANIFESTO_COPY.content}</p>
          <p className={styles.highlight}>{MANIFESTO_COPY.highlight}</p>
          <p className={styles.highlightSubtext}>{MANIFESTO_COPY.highlightSubtext}</p>
        </div>
      </div>
    </section>
  );
}
