// 1. React e Next.js
// (sem imports necessários)

// 3. Estilos
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <span className={styles.titleExtenda}>QDDO</span>
            <br />
            <span className={styles.titleLora}>Central.Hub</span>
          </h1>
          <p className={styles.subtitle}>
            Uma comunidade exclusiva de jovens empreendedores que buscam conexões estratégicas 
            para acelerar seu crescimento e construir o futuro juntos.
          </p>
        </div>
      </div>
    </section>
  );
}
