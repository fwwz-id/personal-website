import type { Metadata } from "next";
import { Inter, Bodoni_Moda, Space_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./(misc)/context/ThemeContext";
import ThemeLayout from "./(misc)/layout/ThemeLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bodoni_moda = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
});

export const metadata: Metadata = {
  title: "Homepage | Fawwaz Abdurrahim",
  description: "Fawwaz's internet corner.",
};

const space_mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bodoni_moda.variable} ${space_mono.variable}`}
      >
        <ThemeProvider>
          <ThemeLayout>{children}</ThemeLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
