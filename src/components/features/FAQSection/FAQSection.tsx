'use client';

// 1. React e Next.js
// (sem imports necessários)

// 2. Bibliotecas externas
import * as Accordion from '@radix-ui/react-accordion';
import { HelpCircle, ChevronDown } from 'lucide-react';

// 3. Utilitários e libs
import { FAQ_ITEMS } from '@/lib/constants';

// 4. Estilos
import styles from './FAQSection.module.css';

export function FAQSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>
          <HelpCircle size={16} className={styles.labelIcon} />
          <span>FAQ</span>
        </div>
        <h2 className={styles.title}>Perguntas frequentes</h2>
        <Accordion.Root
          type="single"
          collapsible
          className={styles.accordion}
        >
          {FAQ_ITEMS.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              className={styles.accordionItem}
            >
              <Accordion.Trigger className={styles.accordionTrigger}>
                <span className={styles.question}>{item.question}</span>
                <ChevronDown className={styles.chevron} aria-hidden />
              </Accordion.Trigger>
              <Accordion.Content className={styles.accordionContent}>
                <div className={styles.answer}>
                  {item.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
