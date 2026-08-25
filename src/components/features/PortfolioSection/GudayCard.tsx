// 1. React e Next.js
import Link from 'next/link';
import Image from 'next/image';

// 2. Utilitários e libs
import { PORTFOLIO_ITEMS } from '@/lib/constants';

// 3. Estilos
import styles from './GudayCard.module.css';

export function GudayCard() {
  const guday = PORTFOLIO_ITEMS.find((item) => item.id === 'guday');

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop"
            alt="Mulher com produto GUDAY"
            width={600}
            height={800}
            className={styles.image}
          />
          <div className={styles.productOverlay}>
            <div className={styles.productContainer}>
              <div className={styles.productBottle}></div>
              <span className={styles.productText}>GUDAY</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.logo}>{guday?.logo || 'GUDAY'}</span>
        <Link href={guday?.link || '#'} className={styles.viewMore}>
          Ver mais <span className={styles.arrow}>&gt;</span>
        </Link>
      </div>
    </div>
  );
}
