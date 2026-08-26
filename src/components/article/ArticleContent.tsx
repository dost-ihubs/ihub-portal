import type { NewsArticle } from "../../types";

interface ArticleContentProps {
    article: NewsArticle;
}

export default function ArticleContent({
    article,
}: ArticleContentProps) {
    return (
        <section className="max-w-[1080px] mx-auto px-6 lg:px-12 mb-24">
            <div className="prose prose-lg prose-slate max-w-none font-dmsans whitespace-pre-wrap">
                {article.content ? (
                    <p className="text-slate-700 leading-relaxed">
                        {article.content}
                    </p>
                ) : (
                    <p className="text-slate-400 italic">
                        No content provided for this article.
                    </p>
                )}
            </div>
        </section>
    );
}