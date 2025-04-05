import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchArticleBySlug } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconArrowLeft,
} from "@tabler/icons-react";
import { AuthorInfo } from "@/types";
import Link from "next/link";
import { Metadata } from "next";
import { Share } from "@/components/app";
import { generateArticleSchema } from "@/lib/structuredData";
import Script from "next/script";

type Props = {
  params: any;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const article = await fetchArticleBySlug(params.slug);

    if (!article) {
      return {
        title: "Article Not Found | Andika Dwi Saputra",
        description:
          "The article you are looking for doesn't exist or has been removed.",
      };
    }

    const authorName = "Andika Dwi Saputra";
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://andikads.cloud";
    const articleUrl = `${baseUrl}/articles/${article.slug}`;

    return {
      title: `${article.title} | Andika Dwi Saputra`,
      description:
        article.meta_description ||
        `Read ${article.title} by Andika Dwi Saputra, fullstack developer and tech enthusiast.`,
      keywords: [
        "web development",
        "programming",
        "technology",
        "Andika Dwi Saputra",
        article.title,
      ],
      authors: [{ name: authorName }],
      alternates: {
        canonical: articleUrl,
      },
      openGraph: {
        title: `${article.title} | Andika Dwi Saputra`,
        description:
          article.meta_description ||
          `Read ${article.title} by Andika Dwi Saputra, fullstack developer and tech enthusiast.`,
        type: "article",
        url: articleUrl,
        images: article.image_url
          ? [
              {
                url: article.image_url,
                alt: article.title,
                width: 1200,
                height: 630,
              },
            ]
          : undefined,
        authors: [authorName],
        publishedTime: article.created_at,
      },
      twitter: {
        card: "summary_large_image",
        title: `${article.title} | Andika Dwi Saputra`,
        description:
          article.meta_description ||
          `Read ${article.title} by Andika Dwi Saputra.`,
        images: article.image_url ? [article.image_url] : undefined,
      },
    };
  } catch {
    return {
      title: "Article Not Found | Andika Dwi Saputra",
    };
  }
}

const authorInfo: AuthorInfo = {
  name: "Andika's AI Assistant",
  bio: "Full-stack developer passionate about building great user experiences. Writing about web development, React, and everything in between.",
  github: "Andikss",
  instagram: "andikads__",
  avatarUrl: "/static/img/person.webp",
};

export default async function ArticleDetail({ params }: Props) {
  const article = await fetchArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Generate structured data for this article
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://andikads.cloud";
  const articleStructuredData = generateArticleSchema(
    {
      title: article.title,
      description:
        article.meta_description ||
        `Read ${article.title} by Andika Dwi Saputra, fullstack developer and tech enthusiast.`,
      slug: article.slug,
      imageUrl: article.image_url || undefined,
      publishedDate: article.created_at,
    },
    baseUrl
  );

  return (
    <article className="min-h-screen">
      {/* Add structured data */}
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-colors mb-8 group"
          >
            <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Articles</span>
          </Link>

          {/* Article Header */}
          <header className="text-center mb-12">
            <h1 className="text-2xl md:text-5xl font-bold mb-6 text-[var(--text)] leading-tight tracking-tight">
              {article.title}
            </h1>
          </header>

          {/* Featured Image */}
          {article.image_url && (
            <div className="relative w-full h-[10rem] md:h-[30rem] rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          )}

          <div className="text-text italic mb-12 mt-4 text-sm md:text-base flex items-center justify-between">
            <time dateTime={article.created_at}>{formattedDate}</time>
            {article.image_author && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Photo by {article.image_author}</span>
              </>
            )}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h2 className="hidden">{children}</h2>,
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-12 text-[var(--text)] leading-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-bold mb-4 mt-8 text-[var(--text)] leading-tight">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-base md:text-lg mb-6 leading-relaxed text-[var(--text)] tracking-wide">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc ml-8 mb-6 space-y-3 text-[var(--text)]">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="text-[var(--text)] leading-relaxed">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-[var(--text)]">
                    {children}
                  </strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-accent pl-4 italic text-[var(--text)] my-8">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-dark rounded px-2 py-1 text-sm text-[var(--text)]">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-dark rounded-lg p-4 overflow-x-auto my-8 text-[var(--text)]">
                    {children}
                  </pre>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <div className="container w-full mt-16 shadow-sm">
            <div className="border border-gray-700 rounded-lg p-6 bg-dark/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Image
                  src={authorInfo.avatarUrl}
                  alt={authorInfo.name}
                  width={240}
                  height={240}
                  className="w-16 h-16 rounded-full"
                  loading="lazy"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[var(--text)] mb-2 text-center">
                    Created by {authorInfo.name}
                  </h2>
                  <p className="text-[var(--text)] mb-4 text-sm leading-relaxed">
                    {authorInfo.bio}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`https://github.com/${authorInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors text-sm"
                    >
                      <IconBrandGithub className="w-5 h-5" />
                      <span>Follow on GitHub</span>
                    </a>

                    {authorInfo.instagram && (
                      <a
                        href={`https://instagram.com/${authorInfo.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors text-sm"
                      >
                        <IconBrandInstagram className="w-5 h-5" />
                        <span>Follow on Instagram</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Share
        url={`${process.env.NEXT_PUBLIC_APP_URL}/articles/${article.slug}`}
        title={article.title}
      />
    </article>
  );
}
