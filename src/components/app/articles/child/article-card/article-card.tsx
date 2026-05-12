import { Article } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IconCalendar } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";

const tapeColors = ["var(--tape-yellow)", "var(--tape-blue)", "var(--tape-pink)"];

export const ArticleCard = ({
  article,
  className,
  index = 0,
}: {
  article: Article;
  className?: string;
  index?: number;
}) => {
  const formattedDate = new Date(article.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const tapeColor = tapeColors[index % 3];
  const rotation = [-0.8, 0.6, -0.4][index % 3];

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn("group block h-full cursor-pointer", className)}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "rotate(0deg) translateY(-4px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "4px 6px 18px rgba(36,22,16,0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = `rotate(${rotation}deg)`;
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
      }}
    >
      <div
        className="flex flex-col h-full overflow-hidden"
        style={{
          background: "var(--paper)",
          border: "1px solid rgba(184,151,106,0.40)",
          boxShadow: "2px 3px 10px rgba(36,22,16,0.12)",
        }}
      >
        {/* Tape top strip */}
        <div className="h-3 w-full" style={{ background: tapeColor }} />

        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden">
          {article.image_url ? (
            <Image
              src={article.image_url}
              alt={article.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "var(--foreground)" }}
            >
              <span className="font-mono text-xs text-text/30">no preview</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="flex flex-col flex-grow p-4"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 23px, rgba(184,151,106,0.12) 23px, rgba(184,151,106,0.12) 24px)",
            backgroundSize: "100% 24px",
            backgroundPositionY: "8px",
          }}
        >
          <h3 className="font-caveat text-xl font-bold text-text group-hover:text-accent transition-colors line-clamp-2 mb-1">
            {article.title}
          </h3>
          <div
            className="h-1.5 w-10 rounded-sm mb-3 transition-all duration-500 group-hover:w-full"
            style={{ background: "var(--accent)", opacity: 0.5 }}
          />

          <div className="flex items-center gap-1 text-xs text-text/55 mb-3 font-mono">
            <IconCalendar className="w-3 h-3" />
            {formattedDate}
          </div>

          {article.meta_description && (
            <div className="text-text/65 text-sm line-clamp-3 leading-relaxed mb-4">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <>{children}</>,
                  strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
                }}
              >
                {article.meta_description}
              </ReactMarkdown>
            </div>
          )}

          <div
            className="mt-auto pt-3 border-t flex items-center justify-between group/link"
            style={{ borderColor: "rgba(184,151,106,0.25)" }}
          >
            <span className="font-caveat text-base text-accent group-hover/link:text-text transition-colors">
              Read article →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
