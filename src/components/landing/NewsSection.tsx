import type { NewsArticle } from "../../types";
import type { Page } from "../Header";

interface NewsSectionProps {
    news?: NewsArticle[];
    onNavigate?: (
        page: Page,
        articleId?: string
    ) => void;
}

export default function NewsSection({
    news = [],
    onNavigate,
}: NewsSectionProps) {
    const displayNews = news.map(
        (article) => ({
            id: article.id,
            title: article.title,
            tag: `${article.region}, ${article.province}`,
            author: article.author,

            date: new Date(
                article.date
            ).toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }
            ),

            readTime: article.read_time,

            img:
                article.img_url ||
                "/assets/placeholderImage.png",
        })
    );

    const featured =
        displayNews[0];

    const others =
        displayNews.slice(1, 3);

    return (
        <section className="py-24 px-6 lg:px-12 bg-white">
            <div className="max-w-[1250px] mx-auto w-full">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-sky-50 text-[#003F6A] border border-sky-100 rounded-full text-sm font-dmsans font-medium mb-6">
                            Newsroom
                        </span>

                        <h2 className="text-4xl md:text-[54px] leading-[1.2] font-poppins font-medium text-[#003F6A]">
                            Latest news and
                            <br />
                            updates
                        </h2>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-slate-700 text-lg font-dmsans leading-relaxed mb-4">
                            Discover the latest news,
                            activities, and developments
                            from Innovation Hubs across
                            the Philippines.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                onNavigate?.("news")
                            }
                            className="inline-flex items-center px-6 py-2.5 border-2 border-sky-500 rounded-full text-sm font-dmsans font-medium text-sky-500 hover:bg-sky-50 transition-colors"
                        >
                            View all news
                        </button>
                    </div>
                </div>

                {featured && (
                    <div className="flex flex-col lg:flex-row gap-6 lg:h-[540px]">
                        <NewsCard
                            article={featured}
                            featured
                            onNavigate={
                                onNavigate
                            }
                        />

                        <div className="flex flex-col gap-6 lg:flex-1">
                            {others.map(
                                (article) => (
                                    <NewsCard
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
                )}
            </div>
        </section>
    );
}

interface NewsCardProps {
    article: {
        id: string;
        title: string;
        tag: string;
        author: string;
        date: string;
        readTime: string;
        img: string;
    };

    featured?: boolean;

    onNavigate?: (
        page: Page,
        articleId?: string
    ) => void;
}

function NewsCard({
    article,
    featured = false,
    onNavigate,
}: NewsCardProps) {
    return (
        <article
            onClick={() =>
                onNavigate?.(
                    "article",
                    article.id
                )
            }
            className={`
        relative rounded-3xl
        overflow-hidden group
        cursor-pointer
        ${featured
                    ? "min-h-[400px] lg:min-h-0 lg:flex-1"
                    : "flex-1 min-h-[220px] lg:min-h-0"
                }
      `}
        >
            <img
                src={article.img}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />

            <div
                className={`absolute bottom-0 left-0 right-0 text-white ${featured ? "p-8" : "p-6"
                    }`}
            >
                <span className="inline-block px-3 py-1 bg-white text-slate-800 rounded-full text-xs font-semibold mb-3">
                    {article.tag}
                </span>

                <h3
                    className={`font-bold leading-tight mb-2 pr-12 ${featured
                        ? "text-2xl lg:text-3xl"
                        : "text-lg"
                        }`}
                >
                    {article.title}
                </h3>

                <p className="text-slate-200 text-sm font-dmsans">
                    By {article.author}
                    {" • "}
                    {article.date}
                    {" • "}
                    {article.readTime}
                </p>
            </div>

            <div
                className={`absolute bg-white rounded-full flex items-center justify-center text-slate-800 shadow-lg transition-transform duration-300 group-hover:scale-110 ${featured
                    ? "bottom-8 right-8 w-10 h-10"
                    : "bottom-6 right-6 w-9 h-9"
                    }`}
            >
                →
            </div>
        </article>
    );
}