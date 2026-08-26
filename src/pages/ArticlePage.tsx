import type {
  NewsArticle,
} from "../types";

import type {
  Page,
} from "../components/Header";

import ArticleHeader from "../components/article/ArticleHeader";
import ArticleHeroImage from "../components/article/ArticleHeroImage";
import ArticleContent from "../components/article/ArticleContent";
import LatestNewsSection from "../components/article/LatestNewsSection";
import ArticleNotFound from "../components/article/ArticleNotFound";

import Footer from "../components/Footer";

interface ArticlePageProps {
  articleId: string | null;

  news: NewsArticle[];

  onNavigate: (
    page: Page,
    articleId?: string
  ) => void;
}

export default function ArticlePage({
  articleId,
  news,
  onNavigate,
}: ArticlePageProps) {
  const article = news.find(
    (item) =>
      item.id === articleId
  );

  if (!article) {
    return (
      <ArticleNotFound
        onNavigate={onNavigate}
      />
    );
  }

  const latestArticles = news
    .filter(
      (item) =>
        item.id !== article.id
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 3);

  return (
    <main className="bg-white min-h-screen pt-32">
      <ArticleHeader
        article={article}
        onNavigate={onNavigate}
      />

      <ArticleHeroImage
        article={article}
      />

      <ArticleContent
        article={article}
      />

      <LatestNewsSection
        articles={latestArticles}
        onNavigate={onNavigate}
      />

      <Footer />
    </main>
  );
}