import type { NewsArticle } from "../../types";

interface ArticleHeroImageProps {
    article: NewsArticle;
}

export default function ArticleHeroImage({
    article,
}: ArticleHeroImageProps) {
    const coverUrl = article.img_url || "/assets/placeholderImage.png";

    return (
        <div className="max-w-[1080px] mx-auto px-6 lg:px-12 mb-14">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
                <img
                    src={coverUrl}
                    alt={article.title}
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                            "/assets/placeholderImage.png";
                    }}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}