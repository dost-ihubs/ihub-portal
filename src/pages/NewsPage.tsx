import React, { useMemo, useState } from "react";
import type { NewsArticle } from "../types";
import type { Page } from "../components/Header";

interface NewsPageProps {
  news: NewsArticle[];
  onNavigate: (page: Page, articleId?: string) => void;
}

export default function NewsPage({ news, onNavigate }: NewsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("all");

  // Sort ALL news by latest date first
  const sortedNews = useMemo(() => {
    return [...news].sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [news]);

  // Latest article becomes featured
  const featuredArticle = sortedNews[0];

  // Everything except featured article
  const otherArticles = sortedNews.slice(1);

  // Get unique regions
  const regions = useMemo(() => {
    return Array.from(
      new Set(otherArticles.map((item) => item.region).filter(Boolean))
    ).sort();
  }, [otherArticles]);

  // Get provinces based on selected region
  const provinces = useMemo(() => {
    return Array.from(
      new Set(
        otherArticles
          .filter(
            (item) =>
              selectedRegion === "all" ||
              item.region === selectedRegion
          )
          .map((item) => item.province)
          .filter(Boolean)
      )
    ).sort();
  }, [otherArticles, selectedRegion]);

  // Search + filters
  const filteredNews = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return otherArticles.filter((item) => {
      const matchesSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.content?.toLowerCase().includes(query) ||
        item.author?.toLowerCase().includes(query) ||
        item.region?.toLowerCase().includes(query) ||
        item.province?.toLowerCase().includes(query);

      const matchesRegion =
        selectedRegion === "all" ||
        item.region === selectedRegion;

      const matchesProvince =
        selectedProvince === "all" ||
        item.province === selectedProvince;

      return matchesSearch && matchesRegion && matchesProvince;
    });
  }, [
    otherArticles,
    searchQuery,
    selectedRegion,
    selectedProvince,
  ]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <main className="bg-white min-h-screen pt-28 pb-24">

      {/* =====================================================
          SEMI HERO
      ===================================================== */}
      <section className="px-4 sm:px-6 lg:px-12">
        <div
          className="
            relative
            max-w-[1250px]
            mx-auto
            min-h-[260px]
            md:min-h-[200px]
            rounded-[2rem]
            lg:rounded-[2.5rem]
            overflow-hidden
            flex
            items-center
            justify-center
            text-center
          "
        >
          {/* Background image */}
          <img
            src="/assets/wv_ihub.jpg"
            alt="DOST Innovation Hubs News"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Blue overlay */}
          <div className="absolute inset-0 bg-[#003F7D]/85" />

          {/* Content */}
          <div className="relative z-10 px-6 max-w-3xl mx-auto">
            <h1 className="font-poppins text-3xl md:text-5xl text-white leading-tight">
              All News and Updates
            </h1>

            <p className="font-dmsans text-white/90 text-sm md:text-base mt-5 max-w-xl mx-auto leading-relaxed">
              Stay up to date with the latest activities, achievements,
              and developments from our DOST Innovation Hubs across the
              Philippines.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          NO ARTICLES
      ===================================================== */}
      {sortedNews.length === 0 ? (
        <section className="px-6 lg:px-12 mt-16">
          <div className="max-w-[1250px] mx-auto bg-slate-50 p-16 rounded-[2rem] text-center">
            <h3 className="text-xl font-dmsans font-semibold text-slate-800 mb-2">
              No news articles yet
            </h3>

            <p className="font-dmsans text-slate-500">
              Check back later for the latest updates from the iHub
              community.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* =====================================================
              FEATURED ARTICLE
          ===================================================== */}
          {featuredArticle && (
            <section className="px-6 lg:px-12 py-20">
              <div className="max-w-[1250px] mx-auto">

                {/* Section label */}
                <div className="mb-7">
                  <span className="inline-flex px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#003F6A] font-dmsans text-sm font-medium">
                    Featured Article
                  </span>
                </div>

                <article
                  onClick={() => onNavigate("article", featuredArticle.id)}
                  className="
                            group
                            cursor-pointer
                            grid
                            grid-cols-1
                            lg:grid-cols-[1.2fr_1fr]
                            bg-[#F4F9FC]
                            rounded-[2rem]
                            overflow-hidden
                            h-[320px]
                            lg:h-[420px]
                          "
                >
                  {/* Image */}
                  <div className="relative h-full overflow-hidden bg-slate-200">
                    <img
                      src={featuredArticle.img_url}
                      alt={featuredArticle.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute top-6 left-6">
                      <span className="inline-flex bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-dmsans font-semibold text-[#003F6A] shadow-sm">
                        {featuredArticle.region}, {featuredArticle.province}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                    <p className="font-dmsans text-sm text-sky-500 font-medium mb-5">
                      {formatDate(featuredArticle.date)}
                    </p>

                    <h2 className="font-poppins text-[#003F6A] text-[24px] font-semibold leading-[1.15] mb-6 group-hover:text-sky-500 transition-colors">
                      {featuredArticle.title}
                    </h2>

                    {featuredArticle.content && (
                      <p className="font-dmsans text-slate-600 text-base leading-relaxed line-clamp-3 mb-8">
                        {featuredArticle.content}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-4 mt-auto">
                      <div className="font-dmsans">
                        <p className="text-sm font-dmsans font-semibold text-slate-700">
                          By {featuredArticle.author}
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          {featuredArticle.read_time}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="
                          w-11
                          h-11
                          rounded-full
                          bg-[#003F6A]
                          text-white
                          flex
                          items-center
                          justify-center
                          transition-all
                          duration-300
                          group-hover:bg-sky-500
                          group-hover:translate-x-1
                        "
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}

          {/* =====================================================
              OTHER NEWS
          ===================================================== */}
          <section className="px-6 lg:px-12 pb-16">
            <div className="max-w-[1250px] mx-auto">

              {/* Header */}
              <div className="mb-10">
                <h2 className="font-poppins text-[#003F6A] text-[32px] font-medium tracking-tight">
                  More News and Updates
                </h2>
              </div>

              {/* SEARCH + FILTERS */}
              <div className="flex flex-col lg:flex-row gap-3 mb-10">

                {/* Search */}
                <div className="relative flex-1">
                  <svg
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news and updates"
                    className="
                        w-full
                        h-12
                        pl-12
                        pr-5
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        font-dmsans
                        text-sm
                        text-slate-700
                        outline-none
                        transition
                        focus:border-sky-400
                        focus:ring-2
                        focus:ring-sky-100
                        "
                  />
                </div>

                {/* Region */}
                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(e) => {
                      setSelectedRegion(e.target.value);
                      setSelectedProvince("all");
                    }}
                    className="
                          h-12
                          pl-5
                          pr-10
                          rounded-full
                          border
                          border-slate-200
                          bg-white
                          font-dmsans
                          text-sm
                          text-slate-700
                          outline-none
                          cursor-pointer
                          appearance-none
                          focus:border-sky-400
                        "
                  >
                    <option value="all">All Regions</option>

                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>

                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>


                {/* Province */}
                <div className="relative">
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="
                              h-12
                              pl-5
                              pr-10
                              rounded-full
                              border
                              border-slate-200
                              bg-white
                              font-dmsans
                              text-sm
                              text-slate-700
                              outline-none
                              cursor-pointer
                              appearance-none
                              focus:border-sky-400
                            "
                  >
                    <option value="all">All Provinces</option>

                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>

                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Results information */}
              <div className="flex items-center justify-between mb-6">
                <p className="font-dmsans text-sm text-slate-500">
                  {filteredNews.length}{" "}
                  {filteredNews.length === 1 ? "article" : "articles"}
                </p>

                <p className="font-dmsans text-sm text-slate-400">
                  Latest first
                </p>
              </div>

              {/* NEWS GRID */}
              {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {filteredNews.map((item) => (
                    <article
                      key={item.id}
                      onClick={() =>
                        onNavigate("article", item.id)
                      }
                      className="
                        group
                        cursor-pointer
                        bg-white
                        border
                        border-slate-100
                        rounded-[1.75rem]
                        overflow-hidden
                        flex
                        flex-col
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-xl
                      "
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                        <img
                          src={item.img_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 font-dmsans text-[11px] font-semibold text-[#003F6A]">
                          {item.region}, {item.province}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <p className="font-dmsans text-xs text-slate-400 mb-3">
                          {formatDate(item.date)}
                        </p>

                        <h3 className="font-poppins text-xl font-semibold text-[#003F6A] leading-snug mb-4 group-hover:text-sky-500 line-clamp-2 transition-colors">
                          {item.title}
                        </h3>

                        {item.content && (
                          <p className="font-dmsans text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                            {item.content}
                          </p>
                        )}

                        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
                              <span className="font-poppins text-xs font-semibold text-sky-600">
                                {item.author?.charAt(0).toUpperCase()}
                              </span>
                            </div>

                            <div>
                              <p className="font-dmsans text-xs font-semibold text-slate-700">
                                By {item.author}
                              </p>

                              <p className="font-dmsans text-xs text-slate-400 mt-1">
                                {item.read_time}
                              </p>
                            </div>
                          </div>

                          <span className="w-9 h-9 rounded-full bg-slate-50 text-[#003F6A] flex items-center justify-center group-hover:bg-[#003F6A] group-hover:text-white transition-colors">
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line
                                x1="5"
                                y1="12"
                                x2="19"
                                y2="12"
                              />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="py-20 bg-slate-50 rounded-[2rem] text-center">
                  <h3 className="font-dmsans text-lg font-semibold text-slate-700">
                    No articles found
                  </h3>

                  <p className="font-dmsans text-sm text-slate-500 mt-2">
                    Try changing your search or location filters.
                  </p>
                </div>
              )}
            </div>
          </section>

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
        </>
      )
      }
    </main >
  );
}