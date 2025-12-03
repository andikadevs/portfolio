import { Article } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IconCalendar, IconCamera } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";

export const ArticleCard = ({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) => {
  // Format the date to a readable format
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        "group flex flex-col h-full rounded-2xl bg-[var(--dark)]/90 backdrop-blur-md border border-[var(--foreground)]/10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-[var(--accent)]/30 hover:-translate-y-1 overflow-hidden",
        className
      )}
    >
      {/* Image with gradient overlay and border separation */}
      <div className="relative h-52 md:h-56 w-full overflow-hidden border-b border-[var(--foreground)]/5">
        {article.image_url ? (
          <>
            <Image
              src={article.image_url}
              alt={article.title}
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay - appears on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-[var(--foreground)]/5 flex items-center justify-center">
            <span className="text-[var(--text)]/30 font-mono text-sm">No Preview</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-6">
        {/* Title Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
          {/* Expanding Accent Line */}
          <div className="h-1 w-12 bg-[var(--accent)]/50 rounded-full mt-3 transition-all duration-500 group-hover:w-full"></div>
        </div>

        {/* Metadata Chips (Date & Author) */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--text)]/60 mb-4">
          <span className="flex items-center bg-[var(--foreground)]/5 px-2.5 py-1 rounded-md border border-[var(--foreground)]/5">
            <IconCalendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {formattedDate}
          </span>
          {article.image_author && (
            <span className="flex items-center bg-[var(--foreground)]/5 px-2.5 py-1 rounded-md border border-[var(--foreground)]/5">
              <IconCamera className="w-3.5 h-3.5 mr-1.5 opacity-70" />
              {article.image_author}
            </span>
          )}
        </div>

        {/* Description */}
        {article.meta_description && (
          <div className="text-[var(--text)]/70 text-sm line-clamp-3 leading-relaxed mb-6">
            <ReactMarkdown
              components={{
                p: ({ children }) => <>{children}</>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-[var(--text)]">
                    {children}
                  </strong>
                ),
              }}
            >
              {article.meta_description}
            </ReactMarkdown>
          </div>
        )}

        {/* Footer / Read More Action */}
        <div className="mt-auto pt-4 border-t border-[var(--foreground)]/10 flex items-center justify-between group/footer">
          <span className="text-sm font-medium text-[var(--text)] group-hover/footer:text-[var(--accent)] transition-colors">
            Read article
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-[var(--accent)] transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};