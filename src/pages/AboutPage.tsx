import AboutHero from "../components/about/AboutHero";
import VisionMission from "../components/about/VisionMission";
import StrategyOverview from "../components/about/StrategyOverview";
import StrategyServicesSection from "../components/about/StrategyServiceSection";
import OffersCarousel from "../components/about/OffersCarousel";
import Footer from "../components/Footer";
import type { Page } from "../components/Header";

interface AboutPageProps {
  onNavigate?: (page: Page) => void;
}

import {
  STRATEGIES,
} from "../data/aboutData";

export default function AboutPage({
  onNavigate,
}: AboutPageProps) {
  return (
    <div className="bg-slate-50">
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.985);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>

      <AboutHero />

      <VisionMission />

      <StrategyOverview />

      <section className="bg-white">
        {STRATEGIES.map(
          (strategy, index) => (
            <StrategyServicesSection
              key={strategy.id}
              strategy={strategy}
              reverse={
                index % 2 === 1
              }
            />
          )
        )}
      </section>

      <OffersCarousel />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}