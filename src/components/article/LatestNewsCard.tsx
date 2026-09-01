import type { NewsArticle } from "../../types";
import type { Page } from "../Header";

import {
    formatNewsDate,
    getArticleImages,
} from "../../utils/newsUtils";

interface LatestNewsCardProps {
    article: NewsArticle;

    onNavigate: (
        page: Page,
        articleId?: string
    ) => void;
}



export default function LatestNewsCard({
    article,
    onNavigate,
}: LatestNewsCardProps) {
    const cardImage = getArticleImages(article)[0] || "/assets/placeholderImage.png";

    return (
        <article
            onClick={() =>
                onNavigate(
                    "article",
                    article.id
                )
            }
            className="relative rounded-3xl overflow-hidden group cursor-pointer bg-white shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl transition-all duration-300"
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                    src={cardImage}
                    alt={article.title}
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                            "/assets/placeholderImage.png";
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#003F6A] rounded-full text-xs font-dmsans font-semibold shadow-sm">
                        {article.region}
                    </span>

                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-poppins font-semibold text-[#003F6A] leading-tight mb-4 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {article.title}
                </h3>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold font-dmsans text-slate-800">
                            By {article.author}
                        </span>

                        <span className="text-xs text-slate-500 font-dmsans">
                            {formatNewsDate(
                                article.date
                            )}{" "}
                            • {article.read_time}
                        </span>
                    </div>

                    <div
                        className="
                            w-8
                            h-8
                            rounded-full
                            bg-slate-50
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            transition-all
                            duration-300
                            group-hover:bg-sky-500
                            group-hover:text-white
                            group-hover:scale-110
                        "
                    >
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                            →
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}