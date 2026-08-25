'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para detectar media queries
 * Útil para responsividade e condicionais baseadas em tamanho de tela
 */
export function useMediaQuery(query: string): boolean {
  // Inicializa com false para SSR, será atualizado no useEffect
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // Verifica se está no cliente
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    
    // Atualiza o estado inicial
    const updateMatches = () => {
      setMatches(media.matches);
    };
    
    updateMatches();

    // Listener para mudanças
    const listener = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };

    // Adiciona listener (compatibilidade com navegadores antigos)
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Fallback para navegadores antigos
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}
