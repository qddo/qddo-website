// 1. React e Next.js
import Link from 'next/link';
import Image from 'next/image';
import { Plane } from 'lucide-react';

// 2. Utilitários e libs
import { PORTFOLIO_ITEMS, PORTFOLIO_DESTINATIONS } from '@/lib/constants';

// 3. Estilos
import styles from './FlybyCard.module.css';

export function FlybyCard() {
  const flyby = PORTFOLIO_ITEMS.find((item) => item.id === 'flyby');

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.destinations}>
          {PORTFOLIO_DESTINATIONS.map((destination) => (
            <div key={destination.id} className={styles.destination}>
              <div className={styles.destinationImageWrapper}>
                <Image
                  src={destination.image}
                  alt={destination.city}
                  width={400}
                  height={600}
                  className={styles.destinationImage}
                />
                <div className={styles.destinationOverlay}>
                  <div className={styles.destinationHeader}>
                    <Plane size={16} className={styles.planeIcon} />
                    <span className={styles.destinationCity}>{destination.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.logo}>{flyby?.logo || 'FLYBY'}</span>
        <Link href={flyby?.link || '#'} className={styles.viewMore}>
          Ver mais <span className={styles.arrow}>&gt;</span>
        </Link>
      </div>
    </div>
  );
}
