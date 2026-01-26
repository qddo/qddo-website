'use client';

// 1. React e Next.js
import * as React from 'react';

// 2. Bibliotecas externas
import { Slot } from '@radix-ui/react-slot';

// 3. Utilitários e libs
import { cn } from '@/lib/utils';
import type { Variant, Size } from '@/types';

// 4. Estilos
import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          styles.button,
          styles[`button--${variant}`],
          styles[`button--${size}`],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
