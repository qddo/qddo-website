/**
 * Configuração de fontes locais do projeto
 * Aileron - Fonte principal
 * Lora - Fonte formal
 * Extenda - Títulos
 */

import localFont from 'next/font/local';

// Aileron - Fonte principal (sans-serif)
export const aileron = localFont({
  src: [
    {
      path: '../../public/fonts/aileron/Aileron-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/aileron/Aileron-UltraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/aileron/Aileron-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/aileron/Aileron-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/aileron/Aileron-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/aileron/Aileron-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/aileron/Aileron-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/aileron/Aileron-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/aileron/Aileron-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/fonts/aileron/Aileron-UltraLightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/aileron/Aileron-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/aileron/Aileron-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/aileron/Aileron-SemiBoldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/aileron/Aileron-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/aileron/Aileron-HeavyItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/aileron/Aileron-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-aileron',
  display: 'swap',
});

// Lora - Fonte formal (serif)
export const lora = localFont({
  src: [
    {
      path: '../../public/fonts/lora/static/Lora-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/lora/static/Lora-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/lora/static/Lora-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/lora/static/Lora-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/lora/static/Lora-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/lora/static/Lora-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/lora/static/Lora-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/lora/static/Lora-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-lora',
  display: 'swap',
});

// Extenda - Títulos (display)
export const extenda = localFont({
  src: [
    {
      path: '../../public/fonts/extenda/extenda-30-deca.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-extenda',
  display: 'swap',
});
