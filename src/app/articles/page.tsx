/** @format */

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getArticles } from "@/utils/Global";
import { Navbar, Footer } from "@/components/Global";
import ArticlesList from "./ArticleList";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="bg-main min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24 pb-36">
        <ArticlesList articles={articles} />
      </div>
      <Footer />
    </main>
  );
}
