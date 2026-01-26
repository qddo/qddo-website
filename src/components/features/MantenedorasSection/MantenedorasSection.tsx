// 1. React e Next.js
// (sem imports necessários)

// 2. Bibliotecas externas
import { TrendingUp, Search, Heart, FlaskConical } from 'lucide-react';

// 3. Componentes internos
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// 4. Utilitários e libs
import { MANTENEDORAS_BENEFITS } from '@/lib/constants';

// 5. Estilos
import styles from './MantenedorasSection.module.css';

const icons = {
  '1': TrendingUp,
  '2': Search,
  '3': Heart,
  '4': FlaskConical,
};

export function MantenedorasSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Transforme seu Budget de Inovação em Vantagem Competitiva
          </h2>
          <p className={styles.subtitle}>
            No QDDO, sua corporação não é uma patrocinadora; é uma <span className={styles.highlight}>Âncora de Vertical</span>.
          </p>
        </div>
        <div className={styles.grid}>
          {MANTENEDORAS_BENEFITS.map((benefit) => {
            const Icon = icons[benefit.id as keyof typeof icons];
            return (
              <Card key={benefit.id} className={styles.card}>
                <CardHeader>
                  <div className={styles.iconWrapper}>
                    <Icon size={32} className={styles.icon} />
                  </div>
                  <CardTitle className={styles.cardTitle}>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={styles.cardDescription}>{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className={styles.ctaWrapper}>
          <Button variant="primary" size="lg" className={styles.cta}>
            Quero ser um Mantenedor Âncora
          </Button>
        </div>
      </div>
    </section>
  );
}
