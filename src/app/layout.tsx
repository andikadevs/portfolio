import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Andika Dwi Saputra",
  description:
    "Cultivated Junior Fullstack Software Engineer with a big passion for building software applications with engaging user interfaces and robust technical structures. Proficient in utilizing various frameworks following industrial standards. Always eager to learn and improve in the fast-paced world of technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Head>
        <meta
          name="description"
          content="Cultivated Junior Fullstack Software Engineer with a big passion for building software applications with engaging user interfaces and robust technical structures. Proficient in utilizing various frameworks following industrial standards. Always eager to learn and improve in the fast-paced world of technology."
        />
        <meta
          name="keywords"
          content="GitHub, portfolio, profile, projects, software development, programming, laravel, phpmyadmin, software engineer"
        />
        <meta name="author" content="Andika Dwi Saputra" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:title" content="AndikaDS" />
        <meta
          property="og:description"
          content="Cultivated Junior Fullstack Software Engineer with a big passion for building software applications with engaging user interfaces and robust technical structures. Proficient in utilizing various frameworks following industrial standards. Always eager to learn and improve in the fast-paced world of technology."
        />
        <meta property="og:image" content="./assets/img/person.webp" />
        <meta property="og:url" content="https://github.com/Andikss" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Andika Dwi Saputra" />
        <meta property="og:locale" content="id_ID" />
      </Head>
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
