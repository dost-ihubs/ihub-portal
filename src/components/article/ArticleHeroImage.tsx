import type { NewsArticle } from "../../types";

interface ArticleHeroImageProps {
    article: NewsArticle;
}

export default function ArticleHeroImage({
    article,
}: ArticleHeroImageProps) {
    return (
        <div className="max-w-[1080px] mx-auto px-6 lg:px-12 mb-16">
            <div className="w-full aspect-[21/9] rounded-[1rem] overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
                <img
                    src={
                        article.img_url ||
                        "/assets/placeholderImage.png"
                    }
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