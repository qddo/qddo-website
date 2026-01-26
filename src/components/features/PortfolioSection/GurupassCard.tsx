// 1. React e Next.js
import Link from 'next/link';
import Image from 'next/image';

// 2. Utilitários e libs
import { PORTFOLIO_ITEMS } from '@/lib/constants';

// 3. Estilos
import styles from './GurupassCard.module.css';

export function GurupassCard() {
  const gurupass = PORTFOLIO_ITEMS.find((item) => item.id === 'gurupass');

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop"
            alt="Smartphone com app Gurupass"
            width={400}
            height={600}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.logo}>{gurupass?.logo || 'Gurupass'}</span>
        <Link href={gurupass?.link || '#'} className={styles.viewMore}>
          Ver mais <span className={styles.arrow}>&gt;</span>
        </Link>
      </div>
    </div>
  );
}
