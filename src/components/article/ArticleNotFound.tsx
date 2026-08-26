import type { Page } from "../Header";

interface ArticleNotFoundProps {
    onNavigate: (
        page: Page,
        articleId?: string
    ) => void;
}

export default function ArticleNotFound({
    onNavigate,
}: ArticleNotFoundProps) {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-24 px-6 lg:px-12 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-poppins font-semibold text-slate-800 mb-4">
                Article not found
            </h2>

            <button
                type="button"
                onClick={() => onNavigate("news")}
                className="px-6 py-2.5 bg-sky-500 text-white font-dmsans rounded-full font-semibold hover:bg-sky-600 transition-colors"
            >
                Back to News
            </button>
        </div>
    );
}