// 1. React e Next.js
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

// 2. Componentes internos
import { Button } from '@/components/ui';

// 3. Utilitários e libs
import { NAV_ITEMS } from '@/lib/constants';

// 4. Estilos
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegação principal">
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            QDDO
          </Link>
          <div className={styles.navCenter}>
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.navRight}>
            <Button asChild variant="outline" size="lg" className={styles.ctaButton}>
              <Link href="/comunidade" className={styles.ctaLink}>
                <span>QUERO PARTICIPAR</span>
                <ArrowUpRight size={18} className={styles.ctaIcon} />
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
