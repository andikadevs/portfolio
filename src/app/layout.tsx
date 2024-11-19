import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PageStatistic } from "@/components/Analytics";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Andika Dwi Saputra | Full Stack Developer & Software Engineer",
  description: "Innovative Full Stack Developer specializing in React, Next.js, Laravel, and modern web technologies. Creating scalable, user-centric applications with clean code practices. Explore my portfolio featuring responsive web applications, REST APIs, and cloud-based solutions.",
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Web Development",
    "Laravel Expert",
    "React Developer",
    "Next.js Developer",
    "PHP Development",
    "JavaScript Engineer",
    "TypeScript Developer",
    "Andika Dwi Saputra",
    "Frontend Development",
    "Backend Development",
    "REST API Development",
    "UI/UX Implementation",
    "Cloud Solutions"
  ],
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
    title: "Andika Dwi Saputra | Full Stack Developer & Software Engineer",
    description: "Full Stack Developer crafting exceptional digital experiences with React, Next.js, and Laravel. View my portfolio showcasing modern web applications, clean architecture, and innovative solutions.",
    url: 'https://github.com/Andikss',
    siteName: 'Andika Dwi Saputra Portfolio',
    images: [
      {
        url: '/assets/img/formal.webp',
        width: 1200,
        height: 630,
        alt: 'Andika Dwi Saputra - Full Stack Developer',
      },
    ],
    locale: 'id_ID',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Andika Dwi Saputra | Full Stack Developer",
    description: "Discover the work of Andika Dwi Saputra - A Full Stack Developer building modern web applications with React, Next.js, and Laravel. Featuring projects with clean architecture and innovative solutions.",
    images: ['/assets/img/formal.webp'],
  },
  alternates: {
    canonical: 'https://github.com/Andikss',
  },
};

const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andika Dwi Saputra",
    jobTitle: "Full Stack Developer",
    url: "https://andikads.my.id",
    sameAs: [
      "https://github.com/Andikss",
      "https://linkedin.com/in/andikadwisaputra",
      "https://instagram.com/andikads__",
      "https://andikss.github.io",
      "https://andikads.cloud",
      "https://andikads.my.id",
      "https://www.andikads.my.id",
      "https://www.andikads.cloud",
    ],
    email: "andikadwisaputra.dev@gmail.com",
    description: "Full Stack Developer with expertise in React, Next.js, and Laravel. Specializing in building scalable web applications with modern architecture, responsive design, and optimal performance. Passionate about creating innovative solutions and maintaining clean, efficient codebases.",
    knowsAbout: [
      "Web Development",
      "React & Next.js Development",
      "Laravel Framework",
      "PHP Backend Development",
      "JavaScript/TypeScript",
      "RESTful API Design",
      "Database Management",
      "UI/UX Implementation",
      "Clean Code Practices",
      "Cloud Services",
      "Performance Optimization",
      "Responsive Design"
    ],
    skills: [
      "Frontend Development",
      "Backend Development",
      "Database Design",
      "API Development",
      "Cloud Computing",
      "Version Control",
      "Agile Methodologies"
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link 
          rel="preload"
          href="/assets/static/img/avatar.webp"
          as="image"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <PageStatistic />
        {children}
      </body>
    </html>
  );
}
