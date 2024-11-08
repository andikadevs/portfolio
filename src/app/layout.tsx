import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Andika Dwi Saputra | Full Stack Software Engineer",
  description: "Cultivated Junior Fullstack Software Engineer with a big passion for building software applications with engaging user interfaces and robust technical structures. Proficient in utilizing various frameworks following industrial standards. Always eager to learn and improve in the fast-paced world of technology.",
  keywords: ["Full Stack Developer", "Software Engineer", "Web Development", "Laravel", "React", "Next.js", "PHP", "JavaScript", "TypeScript", "Andika Dwi Saputra"],
  authors: [{ name: "Andika Dwi Saputra" }],
  creator: "Andika Dwi Saputra",
  publisher: "Andika Dwi Saputra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Andika Dwi Saputra | Full Stack Software Engineer",
    description: "Cultivated Junior Fullstack Software Engineer with a big passion for building software applications with engaging user interfaces and robust technical structures.",
    url: 'https://github.com/Andikss',
    siteName: 'Andika Dwi Saputra Portfolio',
    images: [
      {
        url: '/assets/img/formal.webp',
        width: 1200,
        height: 630,
        alt: 'Andika Dwi Saputra - Full Stack Software Engineer',
      },
    ],
    locale: 'id_ID',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Andika Dwi Saputra | Full Stack Software Engineer",
    description: "Cultivated Junior Fullstack Software Engineer with a big passion for building software applications with engaging user interfaces and robust technical structures.",
    images: ['/assets/img/formal.webp'],
  },
  alternates: {
    canonical: 'https://github.com/Andikss',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
