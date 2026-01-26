// 1. Componentes internos
import { GudayCard } from './GudayCard';
import { FlybyCard } from './FlybyCard';
import { GurupassCard } from './GurupassCard';

// 2. Estilos
import styles from './PortfolioSection.module.css';

export function PortfolioSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Nosso portfólio</h1>
        <div className={styles.cardsGrid}>
          <GudayCard />
          <FlybyCard />
          <GurupassCard />
        </div>
      </div>
    </section>
  );
}
