import type { NewsArticle } from "../../types";
import type { Page } from "../Header";

import { formatNewsDate } from "../../utils/newsUtils";

interface NewsCardProps {
    article: NewsArticle;
    onNavigate: (
        page: Page,
        articleId?: string
    ) => void;
}

export default function NewsCard({
    article,
    onNavigate,
}: NewsCardProps) {
    return (
        <article
            onClick={() =>
                onNavigate(
                    "article",
                    article.id
                )
            }
            className="
        group
        cursor-pointer
        bg-white
        border
        border-slate-100
        rounded-[1.75rem]
        overflow-hidden
        flex
        flex-col
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                    src={
                        article.img_url ||
                        "/assets/placeholderImage.png"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 font-dmsans text-[11px] font-semibold text-[#003F6A]">
                    {article.region}
                    {article.province
                        ? `, ${article.province}`
                        : ""}
                </span>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <p className="font-dmsans text-xs text-slate-400 mb-3">
                    {formatNewsDate(article.date)}
                </p>

                <h3 className="font-poppins text-xl font-semibold text-[#003F6A] leading-snug mb-4 group-hover:text-sky-500 line-clamp-2 transition-colors">
                    {article.title}
                </h3>

                {article.content && (
                    <p className="font-dmsans text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                        {article.content}
                    </p>
                )}

                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center">
                            <span className="font-poppins text-xs font-semibold text-sky-600">
                                {article.author
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </span>
                        </div>

                        <div>
                            <p className="font-dmsans text-xs font-semibold text-slate-700">
                                By {article.author}
                            </p>

                            <p className="font-dmsans text-xs text-slate-400 mt-1">
                                {article.read_time}
                            </p>
                        </div>
                    </div>

                    <span className="w-9 h-9 rounded-full bg-slate-50 text-[#003F6A] flex items-center justify-center group-hover:bg-[#003F6A] group-hover:text-white transition-colors">
                        →
                    </span>
                </div>
            </div>
        </article>
    );
}