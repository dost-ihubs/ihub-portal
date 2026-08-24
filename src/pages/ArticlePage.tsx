import React from "react";
import type { NewsArticle } from "../types";
import type { Page } from "../components/Header";

interface ArticlePageProps {
  articleId: string | null;
  news: NewsArticle[];
  onNavigate: (page: Page, articleId?: string) => void;
}

export default function ArticlePage({ articleId, news, onNavigate }: ArticlePageProps) {
  const article = news.find(n => n.id === articleId);

  if (!article) {
    return (
      <div className="bg-slate-50 min-h-screen pt-32 pb-24 px-6 lg:px-12 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Article not found</h2>
        <button
          onClick={() => onNavigate("news")}
          className="px-6 py-2 bg-sky-500 text-white font-dmsans rounded-full font-semibold hover:bg-sky-600 transition-colors"
        >
          Back to News
        </button>
      </div>
    );
  }

  // Get up to 3 other articles; if fewer exist, pad with nulls so we always render 3 slots
  const rawOthers = news.filter(n => n.id !== articleId).slice(0, 3);
  const otherArticles: (NewsArticle | null)[] = [
    rawOthers[0] ?? null,
    rawOthers[1] ?? null,
    rawOthers[2] ?? null,
  ];
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      {/* Article Header */}
      <div className="max-w-[1250px] mx-auto px-6 lg:px-12 mb-12">
        <button
          onClick={() => onNavigate("news")}
          className="inline-flex items-center text-sky-500 font-semibold font-dmsans hover:text-sky-600 transition-colors mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all news
        </button>

        {/* <div className="mb-6">
          <span className="inline-block px-4 py-1.5 bg-sky-50 text-[#003F6A] border border-sky-100 rounded-full text-sm font-medium">
            {article.region}, {article.province}
          </span>
        </div> */}

        <h1 className="text-[30px] font-poppins font-semibold text-[#003F6A] leading-tight mb-6">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm border-b border-slate-100 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
              {article.author.charAt(0)}
            </div>
            <span className="font-medium font-dmsans text-[#003F6A]">{article.author}</span>
          </div>
          <span>•</span>
          <span className="font-medium font-dmsans text-[#003F6A]">{formattedDate}</span>
          <span>•</span>
          <span className="font-medium font-dmsans text-[#003F6A]">{article.read_time}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12 mb-16">
        <div className="w-full aspect-[21/9] rounded-[1rem] overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
          <img
            src={article.img_url}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
              const fallback = document.createElement('span');
              fallback.textContent = 'Image unavailable';
              fallback.className = 'text-slate-400 font-medium';
              e.currentTarget.parentElement?.appendChild(fallback);
            }}
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12 mb-24">
        <div className="prose prose-lg prose-slate max-w-none font-body whitespace-pre-wrap">
          {article.content ? (
            <p className="text-slate-700 leading-relaxed">{article.content}</p>
          ) : (
            <p className="text-slate-400 italic">No content provided for this article.</p>
          )}
        </div>
      </div>

      {/* Latest News Section — always shown, always 3 cards */}
      <div className="bg-slate-50 py-24 px-6 lg:px-12 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl font-poppins font-semibold text-[#003F6A]">Latest News</h2>
            <button onClick={() => onNavigate("news")} className="inline-flex items-center text-sky-500 font-dmsans font-semibold hover:text-sky-600 transition-colors text-sm">
              View all
              <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherArticles.map((item, idx) => {
              if (!item) {
                // Skeleton placeholder card
                return (
                  <div key={`placeholder-${idx}`} className="rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100 flex flex-col h-full">
                    <div className="aspect-[16/10] bg-slate-100 animate-pulse" />
                    <div className="p-8 flex flex-col gap-3">
                      <div className="h-4 bg-slate-100 rounded-full animate-pulse w-3/4" />
                      <div className="h-4 bg-slate-100 rounded-full animate-pulse w-full" />
                      <div className="h-4 bg-slate-100 rounded-full animate-pulse w-1/2" />
                      <div className="mt-4 h-3 bg-slate-100 rounded-full animate-pulse w-1/3" />
                    </div>
                  </div>
                );
              }
              const itemDate = new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate("article", item.id)}
                  className="relative rounded-3xl overflow-hidden group cursor-pointer bg-white shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={item.img_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-[#003F6A] rounded-full text-xs font-dmsans font-semibold shadow-sm">
                        {item.region}, {item.province}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-poppins font-semibold text-[#003F6A] leading-tight mb-4 group-hover:text-sky-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold font-dmsans text-slate-800">By {item.author}</span>
                        <span className="text-xs text-slate-500 font-dmsans">{itemDate} • {item.read_time}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6 lg:px-12 text-slate-500 text-sm">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img src="/assets/iHubLogo.png" alt="iHub" className="h-8 w-auto" />
            <p>© 2024 iHub Portal. All rights reserved.</p>
          </div>
          <div className="flex gap-6 font-semibold">
            <a href="#" className="hover:text-brand-blue transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
