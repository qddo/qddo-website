'use client';

// 1. React e Next.js
import * as React from 'react';

// 2. Bibliotecas externas
import * as Label from '@radix-ui/react-label';

// 3. Utilitários e libs
import { cn } from '@/lib/utils';

// 4. Estilos
import styles from './Input.module.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <Label.Root htmlFor={inputId} className={styles.label}>
            {label}
          </Label.Root>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            styles.input,
            error && styles.inputError,
            className
          )}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperId}
          {...props}
        />
        {error && (
          <span id={errorId} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={helperId} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
