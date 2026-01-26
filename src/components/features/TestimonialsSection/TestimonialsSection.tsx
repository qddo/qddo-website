'use client';

// 1. React e Next.js
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

// 2. Bibliotecas externas
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 3. Componentes internos
import { Button } from '@/components/ui';

// 4. Utilitários e libs
import { TESTIMONIALS } from '@/lib/constants';

// 5. Estilos
import styles from './TestimonialsSection.module.css';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(TESTIMONIALS.length); // Começa no primeiro card real (após os clones)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingRef = useRef(false);

  // Cria array com clones no início e fim para loop infinito
  const allCards = [
    ...TESTIMONIALS.slice(-3), // Últimos 3 cards no início
    ...TESTIMONIALS, // Cards originais
    ...TESTIMONIALS.slice(0, 3), // Primeiros 3 cards no fim
  ];

  const realIndexStart = 3; // Índice onde começam os cards reais
  const realIndexEnd = realIndexStart + TESTIMONIALS.length - 1;

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isScrollingRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const centerPoint = scrollLeft + containerWidth / 2;
    
    // Encontra o card mais próximo do centro
    let closestIndex = realIndexStart;
    let closestDistance = Infinity;
    
    cardRefs.current.forEach((card, index) => {
      if (card) {
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const cardCenter = cardLeft + cardWidth / 2;
        const distance = Math.abs(centerPoint - cardCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      }
    });
    
    // Reset para posição real se estiver nos clones
    if (closestIndex < realIndexStart) {
      // Está nos clones do início, reset para o equivalente no fim
      const equivalentIndex = closestIndex + TESTIMONIALS.length;
      if (cardRefs.current[equivalentIndex] && scrollContainerRef.current) {
        const card = cardRefs.current[equivalentIndex];
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;
        
        isScrollingRef.current = true;
        scrollContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'auto',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
        closestIndex = equivalentIndex;
      }
    } else if (closestIndex > realIndexEnd) {
      // Está nos clones do fim, reset para o equivalente no início
      const equivalentIndex = closestIndex - TESTIMONIALS.length;
      if (cardRefs.current[equivalentIndex] && scrollContainerRef.current) {
        const card = cardRefs.current[equivalentIndex];
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;
        
        isScrollingRef.current = true;
        scrollContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'auto',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
        closestIndex = equivalentIndex;
      }
    }
    
    setCurrentIndex(closestIndex);
  }, [realIndexStart, realIndexEnd]);

  const scrollToIndex = useCallback((index: number) => {
    // Normaliza o índice para o range real (0 a maxIndex)
    let realIndex = index;
    if (realIndex < 0) {
      realIndex = TESTIMONIALS.length - 1;
    } else if (realIndex >= TESTIMONIALS.length) {
      realIndex = 0;
    }
    
    // Converte para índice no array completo (com clones)
    const targetIndex = realIndex + realIndexStart;
    setCurrentIndex(targetIndex);
    
    const card = cardRefs.current[targetIndex];
    const container = scrollContainerRef.current;
    
    if (card && container) {
      isScrollingRef.current = true;
      
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  }, [realIndexStart]);

  const handlePrev = useCallback(() => {
    const realIndex = currentIndex - realIndexStart;
    scrollToIndex(realIndex - 1);
  }, [currentIndex, scrollToIndex, realIndexStart]);

  const handleNext = useCallback(() => {
    const realIndex = currentIndex - realIndexStart;
    scrollToIndex(realIndex + 1);
  }, [currentIndex, scrollToIndex, realIndexStart]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
    return undefined;
  }, [handleScroll]);

  // Centraliza o primeiro card real ao montar o componente
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardRefs.current[realIndexStart] && scrollContainerRef.current) {
        const card = cardRefs.current[realIndexStart];
        const container = scrollContainerRef.current;
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'auto',
        });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [realIndexStart]);

  return (
    <section className={styles.section}>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer} ref={scrollContainerRef}>
          <div className={styles.carouselTrack}>
            {allCards.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={600}
                    height={600}
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.quote}>{testimonial.quote}</p>
                  <Button variant="outline" size="sm" className={styles.readMoreButton}>
                    Ler história completa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.navigation}>
          <button
            type="button"
            onClick={handlePrev}
            className={styles.navButton}
            aria-label="Depoimento anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={styles.navButton}
            aria-label="Próximo depoimento"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
