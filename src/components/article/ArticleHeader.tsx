import type { NewsArticle } from "../../types";
import type { Page } from "../Header";

import {
    formatNewsDate,
} from "../../utils/newsUtils";

interface ArticleHeaderProps {
    article: NewsArticle;

    onNavigate: (
        page: Page,
        articleId?: string
    ) => void;
}

export default function ArticleHeader({
    article,
    onNavigate,
}: ArticleHeaderProps) {
    return (
        <header className="max-w-[1250px] mx-auto px-6 lg:px-12 mb-12">
            <button
                type="button"
                onClick={() => onNavigate("news")}
                className="inline-flex items-center text-sky-500 font-semibold font-dmsans hover:text-sky-600 transition-colors mb-8"
            >
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>

                Back to all news
            </button>

            <h1 className="text-[30px] md:text-[40px] font-poppins font-semibold text-[#003F6A] leading-tight mb-6">
                {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm border-b border-slate-100 pb-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
                        {article.author
                            ?.charAt(0)
                            .toUpperCase()}
                    </div>

                    <span className="font-medium font-dmsans text-[#003F6A]">
                        {article.author}
                    </span>
                </div>

                <span>•</span>

                <span className="font-medium font-dmsans text-[#003F6A]">
                    {formatNewsDate(article.date)}
                </span>

                <span>•</span>

                <span className="font-medium font-dmsans text-[#003F6A]">
                    {article.read_time}
                </span>
            </div>
        </header>
    );
}