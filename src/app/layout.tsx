import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Hud, Navbar, Footer, Statistics } from "@/components/app";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  title: "Andika Dwi Saputra | Fullstack Developer",
  description:
    "Personal portfolio of Andika Dwi Saputra, a Fullstack Developer with expertise in web development and modern technologies.",
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
  metadataBase: new URL("https://andikads.vercel.app"),
  verification: {
    google: "google09b0413a67f3be1d.html",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Andika Dwi Saputra | Fullstack Developer",
    description:
      "Personal portfolio of Andika Dwi Saputra, a Fullstack Developer with expertise in web development and modern technologies.",
    siteName: "Andika Dwi Saputra Portfolio",
    images: [
      {
        url: "/static/img/person.webp",
        width: 1200,
        height: 630,
        alt: "Andika Dwi Saputra - Fullstack Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andika Dwi Saputra | Fullstack Developer",
    description:
      "Personal portfolio of Andika Dwi Saputra, a Fullstack Developer with expertise in web development and modern technologies.",
    images: ["/static/img/person.webp"],
    creator: "@andikads__",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://andikads.vercel.app" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Footer />
          <Hud />
          <Navbar />
          <Statistics />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--dark)",
                color: "var(--text)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
              success: {
                iconTheme: {
                  primary: "var(--accent)",
                  secondary: "var(--background)",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
