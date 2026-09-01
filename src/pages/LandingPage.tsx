import type React from "react";

import type {
  IHub,
  NewsArticle,
} from "../types";

import type { Page } from "../components/Header";

import HeroSection from "../components/landing/HeroSection";
import IHubNetworkSection from "../components/landing/IHubNetworkSection";
import AboutSection from "../components/landing/AboutSection";
import NewsSection from "../components/landing/NewsSection";
import PartnersSection from "../components/landing/PartnersSection";
import CTASection from "../components/landing/CTASection";
import SectionReveal from "../components/SectionReveal";

import Footer from "../components/Footer";
interface LandingPageProps {
  heroMapComponent?: React.ReactNode;
  mapComponent?: React.ReactNode;
  hubs: IHub[];
  news: NewsArticle[];
  onNavigate?: (
    page: Page,
    articleId?: string
  ) => void;
}

export default function LandingPage({
  heroMapComponent,
  mapComponent,
  hubs,
  news,
  onNavigate,
}: LandingPageProps) {
  return (
    <div className="flex flex-col bg-white overflow-x-hidden relative">
      <HeroSection
        mapComponent={
          heroMapComponent ||
          mapComponent
        }
        onNavigate={onNavigate}
      />

      <SectionReveal>
        <div className="relative">
          <div className="absolute inset-0 -top-16 bg-[linear-gradient(180deg,#1A467E_0%,#2BB1FF_66%,#FFFFFF_99%)]" />

          <div className="relative">
            <IHubNetworkSection
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </SectionReveal>

      <SectionReveal>
        <AboutSection
          hubs={hubs}
          onNavigate={onNavigate}
        />
      </SectionReveal>

      <SectionReveal>
        <NewsSection
          news={news}
          onNavigate={onNavigate}
        />
      </SectionReveal>

      <SectionReveal>
        <PartnersSection />
      </SectionReveal>

      <SectionReveal>
        <CTASection />
      </SectionReveal>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}