import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchArticleBySlug } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import { IconBrandGithub, IconBrandInstagram } from "@tabler/icons-react";
import { Calendar, ChevronLeft } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AuthorInfo, ArticleDetailProps } from "@/types";
import Link from "next/link";
import { Metadata } from "next";
import { Share } from "@/components/app";
import { generateArticleSchema } from "@/lib/structuredData";
import Script from "next/script";

export async function generateMetadata({
  params,
}: ArticleDetailProps): Promise<Metadata> {
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
  github: "andikadevs",
  instagram: "andikads__",
  avatarUrl: "/static/img/person.webp",
};

export default async function ArticleDetail({ params }: ArticleDetailProps) {
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

  const articleUrl = `${baseUrl}/articles/${article.slug}`;

  return (
    <div className="flex w-full flex-col items-center bg-background min-h-screen pb-20">
      {/* Add structured data */}
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />

      {/* Hero Header */}
      <div className="w-full relative h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        {article.image_url && (
          <Image
            alt={article.title}
            className="w-full h-full object-cover z-0"
            src={article.image_url}
            fill
            priority
          />
        )}

        <div className="absolute bottom-0 left-0 w-full z-20 pb-10 pt-20 bg-gradient-to-t from-background to-transparent">
          <div className="max-w-4xl mx-auto px-6">
            <Link
              className="mb-6 hover:bg-transparent text-[var(--accent)] font-medium cursor-pointer flex items-center gap-2"
              href="/articles"
            >
              <ChevronLeft className="mr-2 w-4 h-4" />
              Kembali ke Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-medium text-[var(--background)] bg-[var(--accent)] rounded-full">
                Blog
              </span>
              <div className="flex items-center gap-1 text-sm text-[var(--text)]/70">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-[var(--text)] mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-between border-t border-[var(--text)]/20 pt-6">
              <div className="flex items-center gap-3">
                <Image
                  src={authorInfo.avatarUrl}
                  alt={authorInfo.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-[var(--text)] font-semibold">
                    {authorInfo.name}
                  </span>
                  <span className="text-[var(--text)]/70 text-sm">Penulis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="w-full max-w-4xl px-6 mt-8">
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-[var(--text)]
            prose-p:text-[var(--text)]/80 prose-p:leading-relaxed
            prose-a:text-[var(--accent)] hover:prose-a:text-[var(--accent)]/80
            prose-strong:text-[var(--text)]
            prose-img:rounded-xl prose-img:shadow-lg"
        >
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
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-dark rounded px-2 py-1 text-sm text-[var(--text)]"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
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
                className="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded-full"
                loading="lazy"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-[var(--text)] mb-2 text-center sm:text-start">
                  Created by {authorInfo.name}
                </h2>
                <p className="text-[var(--text)] mb-4 text-sm leading-relaxed text-center sm:text-start">
                  {authorInfo.bio}
                </p>

                <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
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
      </article>

      <Share
        url={`${process.env.NEXT_PUBLIC_APP_URL}/articles/${article.slug}`}
        title={article.title}
      />
    </div>
  );
}
