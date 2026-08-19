import React from "react";
import type { IHub, NewsArticle } from "../types";
import {
  HeroSection,
  AboutSection,
  NewsSection,
  PartnersSection,
  CTASection,
  FooterSection
} from "../components/LandingSections";

import { type Page } from "../components/Header";

interface LandingPageProps {
  heroMapComponent?: React.ReactNode;
  mapComponent?: React.ReactNode;
  sidebarComponent?: React.ReactNode;
  hubs: IHub[];
  news: NewsArticle[];
  onNavigate?: (page: Page) => void;
}

export default function LandingPage({ heroMapComponent, mapComponent, sidebarComponent, hubs, news, onNavigate }: LandingPageProps) {
  return (
    <div className="flex flex-col bg-white overflow-x-hidden relative">
      <HeroSection mapComponent={heroMapComponent} onNavigate={onNavigate} />

      {/* Map Section */}
      <section className="py-24 px-6 lg:px-12 bg-slate-50 flex flex-col items-center">
        <span className="text-brand-blue font-neue tracking-wider uppercase text-sm mb-3 block text-center">Explore</span>
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight text-center mb-12">Find an iHub near you</h2>

        {/* Map Container */}
        <div className="w-full max-w-[1400px] h-[700px] bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-200 flex flex-col lg:grid lg:grid-cols-[1fr_380px] relative">
          {mapComponent}
          {sidebarComponent}
        </div>
      </section>

      <AboutSection hubs={hubs} />
      <NewsSection news={news} onNavigate={onNavigate} />
      <PartnersSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}