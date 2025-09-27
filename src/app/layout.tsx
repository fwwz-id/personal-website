import type { Metadata } from "next";

import "./global.css";

import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "~/providers/ThemeProvider";

const space_grotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const jetbrains_mono = JetBrains_Mono({
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Fawwaz Abdurrahim | Homepage",
  description: "FWWZ — Creative Developer: AI Engineer × Full-Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${space_grotesk.variable} ${jetbrains_mono.variable} min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
