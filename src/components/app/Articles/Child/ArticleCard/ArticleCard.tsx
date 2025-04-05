import { Article } from "@/lib/supabase";
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
        "group block rounded-xl overflow-hidden bg-foreground/5 border border-foreground/10 transition-all duration-300 hover:shadow-lg hover:bg-foreground/10 hover:border-foreground/20 h-full",
        className
      )}
    >
      {/* Image with gradient overlay */}
      <div className="relative h-52 md:h-56 w-full overflow-hidden">
        {article.image_url ? (
          <>
            <Image
              src={article.image_url}
              alt={article.title}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
            <span className="text-text/50">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-text group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>

        {article.meta_description && (
          <div className="text-text/80 text-sm line-clamp-3 leading-relaxed">
            <ReactMarkdown
              components={{
                p: ({ children }) => <>{children}</>,
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
              }}
            >
              {article.meta_description}
            </ReactMarkdown>
          </div>
        )}

        <div className="flex items-center text-text/60 text-xs pt-3 space-x-4">
          <span className="flex items-center">
            <IconCalendar className="w-3.5 h-3.5 mr-1.5 inline" />
            {formattedDate}
          </span>
          {article.image_author && (
            <span className="flex items-center">
              <IconCamera className="w-3.5 h-3.5 mr-1.5 inline" />
              {article.image_author}
            </span>
          )}
        </div>
      </div>

      {/* Read more indicator */}
      <div className="px-6 py-3 border-t border-foreground/10">
        <span className="text-accent text-sm font-medium flex items-center">
          Read article
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
        </span>
      </div>
    </Link>
  );
};
