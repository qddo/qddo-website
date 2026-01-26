/**
 * Schemas de validação Zod
 */

import { z } from 'zod';

/**
 * Schema para formulário de contato
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Schema para newsletter
 */
export const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
