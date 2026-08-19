import React from "react";
import type { NewsArticle } from "../types";
import type { Page } from "../components/Header";

interface NewsPageProps {
  news: NewsArticle[];
  onNavigate: (page: Page, articleId?: string) => void;
}

export default function NewsPage({ news, onNavigate }: NewsPageProps) {
  const displayNews = news.length > 0 ? news : [];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-50 text-slate-800 border border-sky-100 rounded-full text-sm font-medium mb-6">
            Newsroom
          </span>
          <h1 className="text-5xl lg:text-6xl font-medium text-[#003F6A] tracking-tight leading-[1.1]">
            All News and Updates
          </h1>
          <p className="mt-6 text-slate-700 text-lg leading-relaxed max-w-2xl">
            Stay up to date with the latest activities, achievements, and developments from our DOST Innovation Hubs across the Philippines.
          </p>
        </div>

        {displayNews.length === 0 ? (
          <div className="bg-white p-16 rounded-[2rem] border border-slate-200 text-center shadow-sm">
            <h3 className="text-xl font-medium text-slate-800 mb-2">No news articles yet</h3>
            <p className="text-slate-500">Check back later for the latest updates from the iHub community.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayNews.map((item) => {
              const formattedDate = new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

              return (
                <div 
                  key={item.id} 
                  onClick={() => onNavigate("article", item.id)}
                  className="relative rounded-3xl overflow-hidden group cursor-pointer bg-white shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                      <img
                        src={item.img_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                          const fallback = document.createElement('span');
                          fallback.textContent = 'Image unavailable';
                          fallback.className = 'text-slate-400 text-sm font-medium';
                          e.currentTarget.parentElement?.appendChild(fallback);
                        }}
                      />
                      ...
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 rounded-full text-xs font-semibold shadow-sm">
                        {item.region}, {item.province}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight mb-4 group-hover:text-sky-600 transition-colors">
                      {item.title}
                    </h3>

                    {item.content && (
                      <p className="text-slate-600 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                        {item.content}
                      </p>
                    )}

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-800">By {item.author}</span>
                        <span className="text-xs text-slate-500">{formattedDate} • {item.read_time}</span>
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
        )}
      </div>
    </div>
  );
}
