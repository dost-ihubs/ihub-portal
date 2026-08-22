import React from "react";
import type { IHub, NewsArticle } from "../types";
import {
  HeroSection,
  IHubNetworkSection,
  AboutSection,
  NewsSection,
  PartnersSection,
  CTASection,
  FooterSection
} from "../components/LandingSections";

import { type Page } from "../components/Header";

interface LandingPageProps {
  heroMapComponent?: React.ReactNode;
  /** @deprecated Map now renders inside the hero via `heroMapComponent`. Kept for backward compatibility. */
  mapComponent?: React.ReactNode;
  /** @deprecated No longer rendered now that the map lives inside the hero card. */
  sidebarComponent?: React.ReactNode;
  hubs: IHub[];
  news: NewsArticle[];
  onNavigate?: (page: Page) => void;
}

export default function LandingPage({ heroMapComponent, mapComponent, hubs, news, onNavigate }: LandingPageProps) {
  return (
    <div className="flex flex-col bg-white overflow-x-hidden relative">
      <HeroSection
        mapComponent={heroMapComponent || mapComponent}
        onNavigate={onNavigate}
      />

      <div className="relative">
        <div className="absolute inset-0 -top-16 bg-[linear-gradient(180deg,#1A467E_0%,#2BB1FF_66%,#FFFFFF_99%)]" />

        <div className="relative">
          <IHubNetworkSection onNavigate={onNavigate} />
        </div>
      </div>

      <AboutSection hubs={hubs} />
      <NewsSection news={news} onNavigate={onNavigate} />
      <PartnersSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}