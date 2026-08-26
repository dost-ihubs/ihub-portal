import type { NewsArticle } from "../../types";
import type { Page } from "../Header";

import NewsCard from "./NewsCard";

interface NewsGridProps {
    articles: NewsArticle[];

    onNavigate: (
        page: Page,
        articleId?: string
    ) => void;
}

export default function NewsGrid({
    articles,
    onNavigate,
}: NewsGridProps) {
    if (articles.length === 0) {
        return (
            <div className="py-20 bg-slate-50 rounded-[2rem] text-center">
                <h3 className="font-dmsans text-lg font-semibold text-slate-700">
                    No articles found
                </h3>

                <p className="font-dmsans text-sm text-slate-500 mt-2">
                    Try changing your search or
                    location filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {articles.map((article) => (
                <NewsCard
                    key={article.id}
                    article={article}
                    onNavigate={onNavigate}
                />
            ))}
        </div>
    );
}