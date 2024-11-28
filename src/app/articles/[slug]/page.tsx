/** @format */

import { Navbar, Footer } from "@/components/Global";
import { getArticle } from "@/utils/Global";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { Share } from "@/components/Article";

interface AuthorInfo {
  name: string;
  bio: string;
  github: string;
  instagram?: string;
  avatarUrl: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: article.title,
    description: article.meta_description,
    openGraph: {
      title: article.title,
      description: article.meta_description,
      type: 'article',
      publishedTime: article.created_at,
      images: [
        {
          url: article.image_url,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.meta_description,
      images: [article.image_url],
    },
    authors: [{ name: article.image_author }],
    alternates: {
      canonical: `/articles/${params.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const authorInfo: AuthorInfo = {
    name: "Andika's AI Assistant",
    bio: "Full-stack developer passionate about building great user experiences. Writing about web development, React, and everything in between.",
    github: "Andikss",
    instagram: "andikads__",
    avatarUrl: "https://avatars.githubusercontent.com/Andikss",
  };

  // Get the full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const fullUrl = `${baseUrl}/articles/${params.slug}`;

  return (
    <main className="bg-main min-h-screen">
      <Navbar />

      {/* Share Component */}
      <Share url={fullUrl} title={article.title} />

      <article 
        className="container mx-auto px-4 py-24 max-w-4xl text-gray-300"
        itemScope 
        itemType="http://schema.org/Article"
      >
        {/* Hero Image */}
        <div className="relative w-full h-[300px] md:h-[500px] mb-8">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover object-[center_30%] rounded-xl shadow-xl"
            itemProp="image"
            loading="eager"
            width={1200}
            height={630}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent rounded-xl" />
        </div>

        <div className="prose prose-lg prose-invert mx-auto !text-gray-300">
          {/* Image Attribution and Date */}
          <div className="flex flex-row flex-wrap gap-2 justify-between sm:items-center mb-10 text-sm text-gray-300">
            <p className="italic mb-2 sm:mb-0 hover:text-gray-100 transition-colors">
              Photo by <span itemProp="author">{article.image_author}</span>
            </p>
            <time 
              dateTime={article.created_at}
              itemProp="datePublished" 
              className="hover:text-gray-100 transition-colors"
            >
              {new Date(article.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {/* Title */}
          <h1 
            itemProp="headline" 
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-100 leading-tight text-center sm:text-left"
          >
            {article.title}
          </h1>

          {/* Description */}
          <p 
            itemProp="description" 
            className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed border-l-4 border-accent pl-4 italic"
          >
            {article.meta_description}
          </p>

          {/* Main Content */}
          <ReactMarkdown
            components={{
              h1: ({children}) => (
                <h2 className="hidden">
                  {children}
                </h2>
              ),
              h2: ({children}) => (
                <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-12 text-gray-100 leading-tight">
                  {children}
                </h2>
              ),
              h3: ({children}) => (
                <h3 className="text-xl md:text-2xl font-bold mb-4 mt-8 text-gray-300 leading-tight">
                  {children}
                </h3>
              ),
              p: ({children}) => (
                <p className="text-base md:text-lg mb-6 leading-relaxed text-gray-300 tracking-wide">
                  {children}
                </p>
              ),
              ul: ({children}) => (
                <ul className="list-disc ml-8 mb-6 space-y-3 text-gray-300">
                  {children}
                </ul>
              ),
              li: ({children}) => (
                <li className="text-gray-300 leading-relaxed">
                  {children}
                </li>
              ),
              strong: ({children}) => (
                <strong className="font-bold text-gray-100">
                  {children}
                </strong>
              ),
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-accent pl-4 italic text-gray-400 my-8">
                  {children}
                </blockquote>
              ),
              code: ({children}) => (
                <code className="bg-dark rounded px-2 py-1 text-sm text-gray-300">
                  {children}
                </code>
              ),
              pre: ({children}) => (
                <pre className="bg-dark rounded-lg p-4 overflow-x-auto my-8 text-gray-300">
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
              <img
                src={authorInfo.avatarUrl}
                alt={authorInfo.name}
                className="w-16 h-16 rounded-full"
                loading="lazy"
              />
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-100 mb-2">
                  Created by {authorInfo.name}
                </h2>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {authorInfo.bio}
                </p>
                
                <div className="flex gap-4">
                  <a
                    href={`https://github.com/${authorInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-colors text-sm"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>Follow on GitHub</span>
                  </a>
                  
                  {authorInfo.instagram && (
                    <a
                      href={`https://instagram.com/${authorInfo.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-colors text-sm"
                    >
                      <FaInstagram className="w-5 h-5" />
                      <span>Follow on Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
