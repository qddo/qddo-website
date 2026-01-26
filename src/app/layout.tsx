// 1. React e Next.js
import type { Metadata } from "next";

// 2. Componentes internos
import { Header } from "@/components/features/Header/Header";
import { Footer } from "@/components/features/Footer/Footer";

// 3. Utilitários e libs
import { getPageMetadata, getOrganizationSchema, getWebSiteSchema, SITE_URL } from "@/lib/seo";
import { aileron, lora, extenda } from "@/lib/fonts";
import { viewport } from "./viewport";

// 4. Estilos
import "./globals.css";

// Metadata centralizada seguindo padrão do guia
const baseMetadata = getPageMetadata({
  title: "QDDO - Quadrado Central Hub",
  description: "Comunidade para founders. Conectando empreendedores, compartilhando conhecimento e construindo o futuro.",
  keywords: ["founders", "empreendedores", "comunidade", "startup", "networking"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...baseMetadata,
  authors: [{ name: "QDDO" }],
  creator: "QDDO",
  publisher: "QDDO",
};

// Export viewport
export { viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${aileron.variable} ${lora.variable} ${extenda.variable} antialiased`}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
        {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
