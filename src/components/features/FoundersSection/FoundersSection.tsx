// 1. React e Next.js
// (sem imports necessários)

// 2. Bibliotecas externas
import { GraduationCap, Network, Users } from 'lucide-react';

// 3. Componentes internos
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// 4. Utilitários e libs
import { FOUNDERS_BENEFITS } from '@/lib/constants';

// 5. Estilos
import styles from './FoundersSection.module.css';

const icons = {
  '1': GraduationCap,
  '2': Network,
  '3': Users,
};

export function FoundersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>O Hub de quem faz</h2>
          <p className={styles.subtitle}>
            Onde o faturamento é detalhe, e a <span className={styles.highlight}>execução é regra</span>.
          </p>
        </div>
        <div className={styles.grid}>
          {FOUNDERS_BENEFITS.map((benefit) => {
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
          <Button variant="outline" size="lg" className={styles.cta}>
            Aplicar para a próxima coorte de Founders
          </Button>
        </div>
      </div>
    </section>
  );
}
