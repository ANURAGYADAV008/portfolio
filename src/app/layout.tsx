import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description:
    "A single-page portfolio: ask a tiny transformer — prompt, encoder, decoder, answer — and watch it respond token by token. Built from scratch, no ML libraries.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        {children}
        <footer className="border-t border-nn-line">
          <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-6 text-xs text-nn-muted sm:px-6">
            <p>© 2026 {site.name}</p>
            <p>built from scratch — no ML libraries, the attention math is real</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
