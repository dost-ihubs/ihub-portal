import type { NewsArticle } from "../../types";
import type { Page } from "../Header";

import LatestNewsCard from "./LatestNewsCard";

interface LatestNewsSectionProps {
  articles: NewsArticle[];

  onNavigate: (
    page: Page,
    articleId?: string
  ) => void;
}

export default function LatestNewsSection({
  articles,
  onNavigate,
}: LatestNewsSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-24 px-6 lg:px-12 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-poppins font-semibold text-[#003F6A]">
            Latest News
          </h2>

          <button
            type="button"
            onClick={() =>
              onNavigate("news")
            }
            className="inline-flex items-center text-sky-500 font-dmsans font-semibold hover:text-sky-600 transition-colors text-sm"
          >
            View all

            <span className="ml-1.5">
              →
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map(
            (article) => (
              <LatestNewsCard
                key={article.id}
                article={article}
                onNavigate={
                  onNavigate
                }
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}