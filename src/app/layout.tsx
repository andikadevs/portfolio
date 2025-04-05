import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Hud, Navbar, Footer } from "@/components/app";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Andika Dwi Saputra | Fullstack Developer",
  description: "Personal portfolio of Andika Dwi Saputra, a Fullstack Developer with expertise in web development and modern technologies.",
  keywords: [
    "Andika Dwi Saputra",
    "fullstack developer",
    "web development",
    "portfolio",
    "React",
    "Next.js",
    "Laravel",
  ],
  authors: [{ name: "Andika Dwi Saputra" }],
  creator: "Andika Dwi Saputra",
  publisher: "Andika Dwi Saputra",
  metadataBase: new URL("https://andikads.cloud"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Andika Dwi Saputra | Fullstack Developer",
    description: "Personal portfolio of Andika Dwi Saputra, a Fullstack Developer with expertise in web development and modern technologies.",
    siteName: "Andika Dwi Saputra Portfolio",
    images: [
      {
        url: "/static/img/person.webp",
        width: 1200,
        height: 630,
        alt: "Andika Dwi Saputra - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andika Dwi Saputra | Fullstack Developer",
    description:
      "Personal portfolio of Andika Dwi Saputra, a Fullstack Developer with expertise in web development and modern technologies.",
    images: ["/static/img/person.webp"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Footer />
          <Hud />
          <Navbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
