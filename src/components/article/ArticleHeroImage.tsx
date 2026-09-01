import type { NewsArticle } from "../../types";

interface ArticleHeroImageProps {
    article: NewsArticle;
}

export default function ArticleHeroImage({
    article,
}: ArticleHeroImageProps) {
    if (!article.img_url) return null;

    const hasCaption =
        Boolean(article.img_caption?.trim()) ||
        Boolean(article.img_credit?.trim());

    return (
        <section className="px-6 lg:px-8">
            <div className="max-w-[1100px] mx-auto">
                <figure>
                    {/* Cover Image */}
                    <div className="overflow-hidden rounded-[28px] bg-slate-100">
                        <img
                            src={article.img_url}
                            alt={
                                article.img_caption ||
                                article.title ||
                                "Article cover image"
                            }
                            className="
                w-full
                aspect-[16/9]
                object-cover
              "
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                    "/assets/placeholderImage.png";
                            }}
                        />
                    </div>

                    {/* Caption + Photo Credit */}
                    {hasCaption && (
                        <figcaption className="mt-3 px-1">
                            <p
                                className="
                  font-dmsans
                  text-[13px]
                  leading-5
                  text-slate-500
                "
                            >
                                {article.img_caption}

                                {article.img_caption &&
                                    article.img_credit && (
                                        <span className="text-slate-400">
                                            {" "}—{" "}
                                        </span>
                                    )}

                                {article.img_credit && (
                                    <span className="text-slate-400">
                                        Photo by{" "}
                                        <span className="font-medium">
                                            {article.img_credit}
                                        </span>
                                    </span>
                                )}
                            </p>
                        </figcaption>
                    )}
                </figure>
            </div>
        </section>
    );
}