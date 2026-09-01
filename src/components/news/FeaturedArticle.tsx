import type { NewsArticle } from "../../types";
import type { Page } from "../Header";

import { formatNewsDate, getArticleImages } from "../../utils/newsUtils";

interface FeaturedArticleProps {
    article: NewsArticle;
    onNavigate: (
        page: Page,
        articleId?: string
    ) => void;
}

export default function FeaturedArticle({
    article,
    onNavigate,
}: FeaturedArticleProps) {
    const heroImage = getArticleImages(article)[0] || "/assets/placeholderImage.png";

    return (
        <section className="px-6 lg:px-12 py-20">
            <div className="max-w-[1250px] mx-auto">
                <div className="mb-7">
                    <span className="inline-flex px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#003F6A] font-dmsans text-sm font-medium">
                        Featured Article
                    </span>
                </div>

                <article
                    onClick={() =>
                        onNavigate("article", article.id)
                    }
                    className="
            group
            cursor-pointer
            grid
            grid-cols-1
            lg:grid-cols-[1.2fr_1fr]
            bg-[#F4F9FC]
            rounded-[2rem]
            overflow-hidden
            h-[320px]
            lg:h-[420px]
          "
                >
                    <div className="relative h-full overflow-hidden bg-slate-200">
                        <img
                            src={heroImage}
                            alt={article.title}
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src =
                                    "/assets/placeholderImage.png";
                            }}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute top-6 left-6">
                            <span className="inline-flex bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-dmsans font-semibold text-[#003F6A] shadow-sm">
                                {article.region}
                            </span>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                        <p className="font-dmsans text-sm text-sky-500 font-medium mb-5">
                            {formatNewsDate(article.date)}
                        </p>

                        <h2 className="font-poppins text-[#003F6A] text-2xl font-semibold leading-[1.15] mb-6 group-hover:text-sky-500 transition-colors">
                            {article.title}
                        </h2>

                        {article.content && (
                            <p className="font-dmsans text-slate-600 text-base leading-relaxed line-clamp-3 mb-8">
                                {article.content}
                            </p>
                        )}

                        <div className="flex items-center justify-between gap-4 mt-auto">
                            <div>
                                <p className="font-dmsans text-sm font-semibold text-slate-700">
                                    By {article.author}
                                </p>

                                <p className="font-dmsans text-sm text-slate-500 mt-1">
                                    {article.read_time}
                                </p>
                            </div>

                            <span className="w-11 h-11 rounded-full bg-[#003F6A] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500 group-hover:translate-x-1">
                                →
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}