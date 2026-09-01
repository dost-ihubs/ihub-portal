import type { NewsArticle } from "../../types";
import { getArticleGalleryImages } from "../../utils/newsUtils";
import ImageCarousel from "./ImageCarousel";

interface ArticleContentProps {
    article: NewsArticle;
}

export default function ArticleContent({
    article,
}: ArticleContentProps) {
    const validGallery = getArticleGalleryImages(article);

    const renderContent = () => {
        const hasContent = Boolean(article.content && article.content.trim());
        const hasGallery = validGallery.length > 0;

        if (!hasContent && !hasGallery) {
            return (
                <p className="font-dmsans text-[16px] leading-8 text-slate-400 italic">
                    No content provided for this article.
                </p>
            );
        }

        if (!hasContent && hasGallery) {
            return (
                <div className="space-y-6">
                    <ImageCarousel
                        images={validGallery}
                        title={article.title}
                    />
                </div>
            );
        }

        if (hasContent && !hasGallery) {
            return (
                <div className="font-dmsans text-[16px] md:text-[17px] leading-8 text-slate-700 whitespace-pre-line space-y-4">
                    {article.content}
                </div>
            );
        }

        // Split by paragraph breaks (double newline or multiple linebreaks)
        const paragraphs = (article.content || "")
            .split(/\n\s*\n/)
            .filter((p) => p.trim().length > 0);

        if (paragraphs.length <= 1) {
            return (
                <div className="font-dmsans text-[16px] md:text-[17px] leading-8 text-slate-700 space-y-6">
                    <p className="whitespace-pre-line">{article.content}</p>
                    <ImageCarousel
                        images={validGallery}
                        title={article.title}
                    />
                </div>
            );
        }

        // Split and place carousel in between paragraphs
        const splitIndex = Math.max(1, Math.floor(paragraphs.length / 2));
        const firstHalf = paragraphs.slice(0, splitIndex);
        const secondHalf = paragraphs.slice(splitIndex);

        return (
            <div className="font-dmsans text-[16px] md:text-[17px] leading-8 text-slate-700 space-y-6">
                {firstHalf.map((para, i) => (
                    <p key={`p-1-${i}`} className="whitespace-pre-line">
                        {para}
                    </p>
                ))}

                <ImageCarousel
                    images={validGallery}
                    title={article.title}
                />

                {secondHalf.map((para, i) => (
                    <p key={`p-2-${i}`} className="whitespace-pre-line">
                        {para}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <section className="max-w-[1080px] mx-auto px-6 lg:px-12 mb-24">
            <div className="max-w-none">
                {renderContent()}
            </div>
        </section>
    );
}