"use client";

import { useEffect, useRef, useState } from "react";
import { ThreeDPhotoCarousel } from "../components/Carousel";

// Small inline icons so this file has zero extra dependencies.
// Swap this for `lucide-react`'s <Star /> any time —
// just `npm install lucide-react` and restore the import above.
function Star({
  className,
  style,
  fill = "none",
}: {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill={fill}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type IhubService = {
  title: string;
  description: string;
  image: string;
};

type IhubStrategy = {
  id: string;
  label: string;
  headline: string;
  color: string; // pastel frame background
  accent: string; // solid accent used for icon + progress bar
  image: string;
  icon: string; // path to the badge SVG (e.g. /icons/inspire.svg)
  services: IhubService[];
};

const STRATEGIES: IhubStrategy[] = [
  {
    id: "inspire",
    label: "Inspire",
    headline: "Discover ideas, opportunities, and technologies.",
    color: "#FDE8B8",
    accent: "#F5B72F",
    image: "/assets/inspire_pic.JPG",
    icon: "/assets/inspire.svg",
    services: [
      {
        title: "Camp Fire Sessions",
        image: "/assets/campfire.png",
        description:
          "Networking sessions that inspire collaboration and entrepreneurial ideas.",
      },
      {
        title: "Fireside Chats",
        image: "/assets/firesidechat.png",
        description:
          "Interactive discussion among nascent startups and resource persons on a specific topic.",
      },
    ],
  },
  {
    id: "interact",
    label: "Interact",
    headline: "Connect innovators with mentors, peers, and industry.",
    color: "#FFB8B5",
    accent: "#F16A64",
    image: "/assets/interact_pic.JPG",
    icon: "/assets/interact.svg",
    services: [
      {
        title: "Idea Pitching",
        image: "/assets/pitching.png",
        description:
          "Presenting ideas to gain support from investors, partners, and stakeholders.",
      },
      {
        title: "Reverse Pitching",
        image: "/assets/reversepitching.png",
        description:
          "MSMEs and stakeholders present challenges and opportunities to experts.",
      },
      {
        title: "Talent Matching",
        image: "https://picsum.photos/seed/ihub-talent-matching/700/520",
        description:
          "Connecting startups with skilled teams to build impactful solutions.",
      },
    ],
  },
  {
    id: "ideate",
    label: "Ideate",
    headline: "Shape raw ideas into testable concepts.",
    color: "#E3D8FB",
    accent: "#8B5CF6",
    image: "/assets/capacity_building.JPG",
    icon: "/assets/ideate.svg",
    services: [
      {
        title: "Design Thinking Sessions",
        image: "/assets/capacity_building.JPG",
        description:
          "Presenting ideas to gain support from investors, partners, and stakeholders.",
      },
      {
        title: "One-on-one consultation",
        image: "https://picsum.photos/seed/ihub-consultation/700/520",
        description:
          "One-on-one mentoring to refine ideas and support startup growth.",
      },
      {
        title: "Group Sessions",
        image: "/assets/group_session.png",
        description:
          "Collaborative sessions for sharing ideas, insights, and experiences.",
      },
      {
        title: "Hackathon ",
        image: "/assets/hackathon.png",
        description:
          "Bringing developers, data scientists, and AI enthusiasts  to solve real-world problems.",
      },
    ],
  },
  {
    id: "initiate",
    label: "Initiate",
    headline: "Launch your project, startup, or technology.",
    color: "#D3F3E3",
    accent: "#10B981",
    image: "/assets/mapping.png",
    icon: "/assets/initiate.svg",
    services: [
      {
        title: "Crafting of Business Model Canvas",
        image: "/assets/mapping.png",
        description:
          "Presenting ideas to gain support from investors, partners, and stakeholders.",
      },
      {
        title: "Connecting startups with suitable TBIs.",
        image: "/assets/tbimatching.png",
        description:
          "Connecting and endorsing startups to the most suitable Technology Business Incubator (TBI).",
      },
    ],
  },
];

const OFFERS = [
  {
    title: "Collaborative Space",
    description:
      "Modern and flexible spaces designed for teamwork, creativity, and productivity.",
    image: "/assets/wv_ihub.jpg",
  },
  {
    title: "Mentorship & Coaching",
    description:
      "Connect with experienced mentors and experts to guide your startup journey",
    image: "/assets/mentoring.JPG",
  },
  {
    title: "Capacity Building",
    description:
      "Access training, workshops, and bootcamps to build your skills and knowledge.",
    image: "/assets/capacity_building.JPG",
  },
  {
    title: "Networking Opportunities",
    description:
      "Meet innovators, investors, and partners to grow your network and collaborations",
    image: "/assets/networking.JPG",
  },
  {
    title: "Program and Events",
    description:
      "Join programs, challenges, and events that spark ideas and drive innovation.",
    image: "/assets/events.jpg",
  },
];

// ---------------------------------------------------------------------------
// Timing
// ---------------------------------------------------------------------------

const AUTO_ADVANCE_MS = 6000;
const TICK_MS = 100;
const OFFERS_AUTO_ADVANCE_MS = 5000;

// Raw (unnormalized) width weight for a card at a given circular distance
// from the active card — index 0 = active, 1 = nearest neighbor, etc.
// These are always renormalized to sum to 100% below, so any card count
// works: for exactly 4 cards the distances are {0,1,1,2}, which already
// sums to 100 with these numbers (46+20+20+14), so nothing changes from
// before; for other counts (e.g. 6, which reaches distance 3) it now
// rescales instead of silently reusing the last value and overflowing
// past 100% — which is what was causing the misaligned/overlapping cards.
const OFFER_CARD_RAW_WIDTH_BY_DISTANCE = [58, 18, 11, 7, 4, 2];
const OFFER_GAP_PX = 8;

type OfferLayout = { left: string; width: string; distance: number };

// Computes every card's left offset + width so the active card stays
// centered and its neighbors shrink symmetrically on either side, like
// a coverflow — including a fixed-px gap between cards. Pure function
// of (activeIndex, offers) — no DOM measurement needed. The gap stays
// exactly OFFER_GAP_PX regardless of container size because each
// card's %-width is trimmed by a matching px amount via calc().
function getOfferTrackLayout(
  active: number,
  offers: unknown[]
): Record<number, OfferLayout> {
  const total = offers.length;
  const half = Math.floor(total / 2);

  const items = offers.map((_, i) => {
    // Signed distance from the active card, wrapped into (-half, total-half].
    const diff = (((i - active + half) % total) + total) % total - half;
    const distance = Math.abs(diff);
    const rawWidth =
      OFFER_CARD_RAW_WIDTH_BY_DISTANCE[distance] ??
      OFFER_CARD_RAW_WIDTH_BY_DISTANCE[OFFER_CARD_RAW_WIDTH_BY_DISTANCE.length - 1];
    return { i, diff, distance, rawWidth };
  });

  // Normalize so the widths always sum to exactly 100%, no matter how
  // many offers there are or how far the distances reach.
  const totalRawWidth = items.reduce((sum, item) => sum + item.rawWidth, 0);
  const withPercent = items.map((item) => ({
    ...item,
    percent: (item.rawWidth / totalRawWidth) * 100,
  }));

  // Left-to-right visual order = ascending signed distance from active.
  const ordered = [...withPercent].sort((a, b) => a.diff - b.diff);
  const pxAdjust = (p: number) => (p / 100) * (total - 1) * OFFER_GAP_PX;

  let cumPercent = 0;
  let cumPxAdjust = 0;
  const layout: Record<number, OfferLayout> = {};

  ordered.forEach((item, rank) => {
    const widthPxAdjust = pxAdjust(item.percent);
    const leftPxOffset = rank * OFFER_GAP_PX - cumPxAdjust;

    layout[item.i] = {
      left: `calc(${cumPercent}% + ${leftPxOffset}px)`,
      width: `calc(${item.percent}% - ${widthPxAdjust}px)`,
      distance: item.distance,
    };

    cumPercent += item.percent;
    cumPxAdjust += widthPxAdjust;
  });

  return layout;
}

function StrategyServicesSection({
  strategy,
  reverse = false,
}: {
  strategy: IhubStrategy;
  reverse?: boolean;
}) {
  const [activeService, setActiveService] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_MS / AUTO_ADVANCE_MS) * 100;
        if (next >= 100) {
          setActiveService((current) =>
            (current + 1) % strategy.services.length
          );
          return 0;
        }
        return next;
      });
    }, TICK_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeService, strategy.services.length]);

  function selectService(index: number) {
    if (index === activeService) return;
    setActiveService(index);
    setProgress(0);
  }

  const service = strategy.services[activeService];

  return (
    <div
      id={`${strategy.id}-services`}
      className="scroll-mt-24 border-b border-slate-100 last:border-b-0"
    >
      <div
        className={`max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
      >
        <div>
          <div className="inline-flex items-center gap-3 mb-5">
            <span
              className="h-12 w-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: strategy.color }}
            >
              <img src={strategy.icon} alt="" className="h-21 w-21 rounded-[1rem] object-contain" />
            </span>
            <span
              className="font-poppins text-sm font-bold uppercase tracking-[0.18em]"
              style={{ color: strategy.accent }}
            >
              {strategy.label}
            </span>
          </div>

          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
            {strategy.headline}
          </h2>

          <div className="mt-8 space-y-3">
            {strategy.services.map((item, index) => {
              const active = index === activeService;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => selectService(index)}
                  aria-pressed={active}
                  className={`w-full text-left rounded-2xl px-5 py-4 transition-all duration-500 ${active
                    ? "bg-white shadow-md"
                    : "hover:bg-white/60"
                    }`}
                >
                  <div className="flex items-start gap-4">

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`font-poppins font-bold transition-colors duration-300 ${active ? "text-slate-800" : "text-slate-400"
                          }`}
                      >
                        {item.title}
                      </h3>

                      <div
                        className={`grid transition-all duration-500 ease-in-out ${active
                          ? "grid-rows-[1fr] opacity-100 mt-1"
                          : "grid-rows-[0fr] opacity-0"
                          }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm text-slate-500 font-body leading-relaxed">
                            {item.description}
                          </p>

                          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${active ? progress : 0}%`,
                                backgroundColor: strategy.accent,
                                transition: "width 100ms linear",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="relative rounded-[2rem] p-5 md:p-8 overflow-hidden transition-colors duration-700 ease-in-out"
          style={{ backgroundColor: strategy.color }}
        >
          <div
            className="absolute -left-8 top-12 h-28 w-28 rounded-full opacity-30"
            style={{ backgroundColor: strategy.accent }}
          />
          <div
            className="absolute -right-10 bottom-8 h-36 w-36 rounded-full opacity-25"
            style={{ backgroundColor: strategy.accent }}
          />
          <img
            key={service.image}
            src={service.image}
            alt={`${service.title} activity`}
            className="relative w-full rounded-2xl shadow-lg object-cover aspect-[4/3] animate-[fadeIn_500ms_ease-in-out]"
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AboutPage() {
  const [strategyIndex, setStrategyIndex] = useState(0);
  const [activeOffer, setActiveOffer] = useState(0);

  const strategy = STRATEGIES[strategyIndex];
  function selectStrategy(index: number) {
    if (index === strategyIndex) return;
    setStrategyIndex(index);
  }


  // Auto-advance the offers carousel — same pattern as the strategy
  // section above, just without a visible progress bar.
  const offersIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  useEffect(() => {
    if (offersIntervalRef.current) clearInterval(offersIntervalRef.current);
    offersIntervalRef.current = setInterval(() => {
      setActiveOffer((i) => (i + 1) % OFFERS.length);
    }, OFFERS_AUTO_ADVANCE_MS);
    return () => {
      if (offersIntervalRef.current) clearInterval(offersIntervalRef.current);
    };
    // Resetting on activeOffer means a manual click restarts the clock
    // instead of jumping again a moment later.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOffer]);

  return (
    <div className="bg-slate-50">
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.985); } to { opacity: 1; transform: scale(1); } }`}</style>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <div className="relative overflow-hidden rounded-[2rem] px-8 md:px-14 pt-12 md:pt-14 pb-0">

          <img
            src="/assets/wv_ihub.jpg"
            alt="DOST Innovation Hub"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#235494]/90 to-[#002E6A]/85" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h1 className="font-poppins text-3xl md:text-5xl text-white leading-tight">
              Built to strengthen the Philippine innovation ecosystem
            </h1>

            <p className="mt-4 max-w-xl mx-auto text-white/90 text-sm md:text-base font-body">
              The Innovation Hub (iHub) is a nationwide DOST initiative that gives
              every province and region a space to turn ideas into startups.
            </p>
          </div>

          <div className="relative z-10 mt-4 max-w-5xl mx-auto">
            <ThreeDPhotoCarousel />
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Vision & Mission */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-6 pb-20 space-y-10">
        <div className="grid md:grid-cols-[220px_1fr] gap-4 items-start">
          <h2 className="font-poppins text-3xl font-bold text-slate-800">
            Our Vision
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-body">
            To be the leading STI Center for collaboration and innovation
            towards impactful solutions for sustainable economic growth.
          </p>
        </div>
        <div className="grid md:grid-cols-[220px_1fr] gap-4 items-start">
          <h2 className="font-poppins text-3xl font-bold text-slate-800">
            Our Mission
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-body">
            To attain an innovative startup ecosystem by providing
            collaborative spaces and access to resources.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* The 4Is Strategy */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 to-sky-200 py-16 px-6">
        <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white text-center">
          The 4Is Strategy
        </h2>

        {/* Icon switcher */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {STRATEGIES.map((s, i) => {
            const active = i === strategyIndex;
            return (
              <button
                key={s.id}
                onClick={() => selectStrategy(i)}
                aria-pressed={active}
                aria-label={`Show ${s.label} strategy`}
                className={`h-20 w-20 rounded-2xl border-4 border-white flex items-center justify-center overflow-hidden transition-all duration-500 ${active ? "scale-110" : "opacity-60 hover:opacity-100"
                  }`}
              >
                <img
                  src={s.icon}
                  alt=""
                  className={`h-full w-full object-cover transition-all duration-500 ${active ? "grayscale-0" : "grayscale"
                    }`}
                />
              </button>
            );
          })}
        </div>

        {/* Strategy detail card */}
        <div className="mt-10 max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 mb-4">
                <img src={strategy.icon} alt="" className="h-8 w-8 object-contain rounded-md" />
                <span className="font-poppins font-semibold text-slate-800">
                  {strategy.label}
                </span>
              </div>
            </div>
            <p
              key={strategy.id}
              className="font-poppins text-2xl md:text-3xl font-semibold text-slate-800 mb-2 transition-opacity duration-500"
            >
              {strategy.headline}
            </p>
            <a
              href={`#${strategy.id}-services`}
              className="inline-flex text-sm font-semibold transition-colors duration-500 hover:opacity-75"
              style={{ color: strategy.accent }}
            >
              Explore {strategy.label} services &rarr;
            </a>
          </div>

          {/* Photo with animated pastel frame */}
          <div
            className="relative rounded-[2rem] p-4 md:p-6 transition-colors duration-700 ease-in-out"
            style={{ backgroundColor: strategy.color }}
          >
            <div
              className="absolute left-2 top-1/2 -translate-y-1/2 h-24 w-10 rounded-full opacity-60 transition-colors duration-700"
              style={{ backgroundColor: strategy.accent }}
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 h-24 w-10 rounded-full opacity-60 transition-colors duration-700"
              style={{ backgroundColor: strategy.accent }}
            />
            <img
              key={strategy.image}
              src={strategy.image}
              alt={`${strategy.label} activity`}
              className="relative w-full rounded-[1.5rem] object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Animated service sections for all 4Is */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white">
        {STRATEGIES.map((item, index) => (
          <StrategyServicesSection
            key={item.id}
            strategy={item}
            reverse={index % 2 === 1}
          />
        ))}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* What iHub Offers — collapsible list */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-to-b from-sky-100 to-sky-300 py-16 px-6">
        <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white text-center mb-10">
          What iHub Offers
        </h2>

        <div className="max-w-6xl mx-auto px-2">
          <div className="relative h-[340px] md:h-[420px]">
            {(() => {
              const trackLayout = getOfferTrackLayout(activeOffer, OFFERS);
              return OFFERS.map((offer, i) => {
                const { left, width, distance } = trackLayout[i];
                const active = distance === 0;

                return (
                  <button
                    key={offer.title}
                    onClick={() => setActiveOffer(i)}
                    aria-pressed={active}
                    aria-label={offer.title}
                    className={`absolute top-0 bottom-0 overflow-hidden rounded-[2rem] bg-white shadow-lg transition-all duration-700 ease-in-out ${active ? "" : "hover:opacity-90"
                      }`}
                    style={{ left, width, zIndex: 10 - distance }}
                  >
                    {active ? (
                      <div className="h-full grid md:grid-cols-2 gap-4 md:gap-8 p-2 md:p-6 items-center text-left">
                        <div>
                          <h3 className="font-poppins text-xl md:text-3xl font-bold text-slate-800 mb-3">
                            {offer.title}
                          </h3>
                          <p className="text-slate-500 text-sm md:text-base font-body">
                            {offer.description}
                          </p>
                        </div>
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="hidden md:block w-full h-full rounded-2xl object-cover"
                        />
                      </div>
                    ) : (
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </button>
                );
              });
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}
