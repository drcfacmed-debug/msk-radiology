import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SRIM | Radiología MSK · Nuevo León',
  description: 'Sociedad de Radiólogos de Imagen Musculoesquelética del Estado de Nuevo León. Formación en ultrasonido, TC, RM, radiografía, artro-RM e intervencionismo MSK.',
  keywords: ['radiología', 'musculoesquelético', 'MSK', 'ultrasonido', 'resonancia magnética', 'Nuevo León'],
  openGraph: {
    title: 'SRIM | Radiología MSK · Nuevo León',
    description: 'Educación e investigación en radiología musculoesquelética.',
    url: 'https://msk-radiology.vercel.app',
    siteName: 'SRIM',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
