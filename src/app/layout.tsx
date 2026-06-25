import type { Metadata, Viewport } from "next";
import { Big_Shoulders, DM_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

/*
 * Big Shoulders Display  → headlines (condensed bold, Gothic ATF feel)
 * DM Mono                → body / detail text (technical, Eds Market feel)
 */
/*
 * Variáveis com nomes distintos para não conflitar com --f-display/--f-body.
 * Globals.css usa essas como fallback quando Headline Gothic ATF / Eds Market
 * ainda não foram carregadas (arquivos .woff2 ausentes).
 */
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucaspnbrz.dev"),
  title: {
    default: "Lucas Barros — Arquiteto de Software",
    template: "%s | Lucas Barros",
  },
  description:
    "Portfolio - Lucas Barros — desenvolvendo softwares empresariais que escalam",
  keywords: ["developer", "portfolio", "development", "Next.js", "Three.js", "frontend", "Video Editor", "sites"],
  authors: [{ name: "Lucas Barros", url: "https://lucaspnbrz.dev" }],
  creator: "Lucas Barros",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lucaspnbrz.dev",
    siteName: "Lucas Barros",
    title: "Lucas Barros — Desenvolvimento de Software e Edição de Vídeos",
    description: "Portfolio - Lucas Barros — desenvolvendo softwares empresariais que escalam",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lucas Barros Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Barros — Developer & Designer",
    description: "Portfolio of Lucas Barros — creative developer.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#07080e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`h-full overflow-x-hidden ${bigShoulders.variable} ${dmMono.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
