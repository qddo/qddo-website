// 1. React e Next.js
// (sem imports necessários)

// 2. Bibliotecas externas
// (sem imports necessários)

// 3. Utilitários e libs
import { BRASILIA_COPY } from '@/lib/constants';

// 4. Estilos
import styles from './BrasiliaSection.module.css';

export function BrasiliaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{BRASILIA_COPY.title}</h2>
        <div className={styles.content}>
          <p className={styles.text}>{BRASILIA_COPY.content}</p>
          <p className={styles.highlight}>{BRASILIA_COPY.highlight}</p>
        </div>
      </div>
    </section>
  );
}
