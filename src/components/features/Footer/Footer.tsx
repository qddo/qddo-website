// 1. React e Next.js
import Link from 'next/link';

// 2. Bibliotecas externas
import { MessageCircle, Instagram, Linkedin } from 'lucide-react';

// 3. Utilitários e libs
import { SITE_NAME, SOCIAL_LINKS, FOOTER_ADDRESS } from '@/lib/constants';

// 5. Estilos
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    whatsapp: MessageCircle,
    instagram: Instagram,
    linkedin: Linkedin,
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <h2 className={styles.brandName}>{SITE_NAME}.</h2>
            <p className={styles.tagline}>A networking company.</p>
          </div>
          <div className={styles.address}>
            <h3 className={styles.addressTitle}>Endereço</h3>
            <p className={styles.addressText}>
              {FOOTER_ADDRESS.street} - {FOOTER_ADDRESS.neighborhood}, {FOOTER_ADDRESS.city}, {FOOTER_ADDRESS.zipCode}
              <br />
              ({FOOTER_ADDRESS.location})
            </p>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} {SITE_NAME} all rights reserved
          </p>
          <div className={styles.socialLinks}>
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
              const Icon = socialIcons[platform as keyof typeof socialIcons];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Visite nosso ${platform}`}
                >
                  {Icon && <Icon size={18} className={styles.socialIcon} />}
                  <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                </a>
              );
            })}
            <Link href="/privacidade" className={styles.privacyLink}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
