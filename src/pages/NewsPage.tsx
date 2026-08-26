import type {
  NewsArticle,
} from "../types";

import type {
  Page,
} from "../components/Header";

import NewsHero from "../components/news/NewsHero";
import FeaturedArticle from "../components/news/FeaturedArticle";
import NewsFilters from "../components/news/NewsFilters";
import NewsGrid from "../components/news/NewsGrid";
import Footer from "../components/Footer";

import {
  useNewsPage,
} from "../hooks/useNewsPage";

interface NewsPageProps {
  news: NewsArticle[];

  onNavigate: (
    page: Page,
    articleId?: string
  ) => void;
}

export default function NewsPage({
  news,
  onNavigate,
}: NewsPageProps) {
  const {
    sortedNews,

    featuredArticle,
    filteredNews,

    regions,
    provinces,

    searchQuery,
    selectedRegion,
    selectedProvince,

    setSearchQuery,
    setSelectedProvince,
    handleRegionChange,
  } = useNewsPage(news);

  return (
    <main className="bg-white min-h-screen pt-28">
      <NewsHero />

      {sortedNews.length === 0 ? (
        <section className="px-6 lg:px-12 py-20">
          <div className="max-w-[1250px] mx-auto bg-slate-50 p-16 rounded-[2rem] text-center">
            <h3 className="text-xl font-dmsans font-semibold text-slate-800 mb-2">
              No news articles yet
            </h3>

            <p className="font-dmsans text-slate-500">
              Check back later for the latest
              updates from the iHub community.
            </p>
          </div>
        </section>
      ) : (
        <>
          {featuredArticle && (
            <FeaturedArticle
              article={
                featuredArticle
              }
              onNavigate={
                onNavigate
              }
            />
          )}

          <section className="px-6 lg:px-12 pb-24">
            <div className="max-w-[1250px] mx-auto">
              <h2 className="font-poppins text-[#003F6A] text-[32px] font-medium tracking-tight mb-10">
                More News and Updates
              </h2>

              <NewsFilters
                searchQuery={
                  searchQuery
                }
                selectedRegion={
                  selectedRegion
                }
                selectedProvince={
                  selectedProvince
                }
                regions={regions}
                provinces={provinces}
                onSearchChange={
                  setSearchQuery
                }
                onRegionChange={
                  handleRegionChange
                }
                onProvinceChange={
                  setSelectedProvince
                }
              />

              <div className="flex items-center justify-between mb-6">
                <p className="font-dmsans text-sm text-slate-500">
                  {filteredNews.length}{" "}
                  {filteredNews.length ===
                    1
                    ? "article"
                    : "articles"}
                </p>

                <p className="font-dmsans text-sm text-slate-400">
                  Latest first
                </p>
              </div>

              <NewsGrid
                articles={
                  filteredNews
                }
                onNavigate={
                  onNavigate
                }
              />
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}