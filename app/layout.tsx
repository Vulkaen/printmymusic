import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Playfair_Display, DM_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dmsans', display: 'swap' });
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'PrintMyMusic — Turn your favorite albums into wall art',
  description: 'Create personalized, print-ready album posters from any album in seconds.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="de">
        <head>
          {/* Verhindert kurzes Aufblitzen des falschen Farbmodus beim Laden:
              wendet die gespeicherte Theme-Einstellung an, bevor React
              hydratisiert. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  var stored = localStorage.getItem('printmymusic-theme');
                  var theme = stored ? JSON.parse(stored).state.theme : 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              `
            }}
          />
        </head>
        <body
          className={`${inter.variable} ${playfair.variable} ${dmSans.variable} ${grotesk.variable} font-sans`}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
