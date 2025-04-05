import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Hud, Navbar, Footer } from "@/components/app";
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
  metadataBase: new URL("https://andikads.cloud"),
  verification: {
    google: "verification_token", // Replace with your Google verification token
    yandex: "verification_token", // Replace with your Yandex verification token
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
        <link rel="canonical" href="https://andikads.cloud" />
      </head>
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
