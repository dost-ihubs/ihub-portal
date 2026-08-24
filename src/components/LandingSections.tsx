import React from 'react';

import { type Page } from './Header';

export function HeroSection({ mapComponent, onNavigate }: { mapComponent?: React.ReactNode; onNavigate?: (page: Page) => void }) {
  return (
    <section className="relative z-10 w-full bg-white rounded-b-[2.5rem] lg:rounded-b-[4rem] overflow-hidden pt-20 md:pt-32 pb-16 px-4 sm:px-6 lg:px-12">      <div className="max-w-[1370px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Left Card: Intro */}
      <div className="relative rounded-[2rem] overflow-hidden min-h-[500px] sm:min-h-[560px] lg:min-h-[calc(100dvh-180px)] flex flex-col items-center justify-center text-center p-8 sm:p-10 lg:p-12">
        <img
          src="/assets/wv_ihub.jpg"
          alt="Modern Co-working Space"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#235494]/90 to-[#002E6A]/85"></div>

        <div className="relative z-10 flex flex-col items-center space-y-6 max-w-md">
          <span className="inline-block px-5 py-1.5 border border-white/50 text-white rounded-full text-xs font-poppins font-medium tracking-wide uppercase w-fit">
            DOST iHubs
          </span>

          <h1 className="font-poppins text-[72px] leading-[1.1] text-white">
            Innovation Starts Here
          </h1>

          <p className="font-dmsans text-white lg:text-lg leading-snug">
            The DOST Innovation Hub (iHub) plays a critical role in the overall development and success of startups, strengthening the Philippine innovation ecosystem from the ground up.
          </p>

          <button className="font-dmsans text-sm px-7 py-3 bg-sky-500 hover:bg-sky-400 transition-colors text-white rounded-full font-semibold shadow-lg w-fit">
            Learn more
          </button>
        </div>
      </div>

      {/* Right Card: Map */}
      <div className="relative rounded-[2rem] overflow-hidden min-h-[400px] sm:min-h-[480px] lg:min-h-[calc(100dvh-180px)] bg-[#DBEFFF]">

        {/* Top-left: latest events card, arrow badge overlapping its corner */}
        <div className="absolute top-6 left-6 z-20">
          <div className="relative w-48 bg-white rounded-2xl shadow-sm p-4 pr-8">
            <p className="text-slate-800 text-sm font-dmsans font-medium leading-snug">
              Find out about the latest events
            </p>
            <span className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-[#002E6A] text-white flex items-center justify-center shadow-md">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </div>
        </div>

        {/* Top-right, offset lower: directory pill */}
        <button
          onClick={() => onNavigate && onNavigate("find")}
          className="absolute top-[190px] right-6 z-20 inline-flex items-center bg-[#002E6A] hover:bg-[#00375d] transition-colors text-white px-5 py-2.5 rounded-full text-xs font-dmsans font-medium shadow-sm"
        >
          Check out directory
        </button>

        {/* Map — full opacity, bleeding slightly past the right edge */}
        <div className="absolute inset-0 flex items-center justify-center ">
          {mapComponent ? (
            <div className="w-full h-full flex items-center justify-center">
              {mapComponent}
            </div>
          ) : (
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
              alt="Philippines Map"
              className="w-[85%] h-[110%] object-contain translate-x-4 "
            />
          )}
        </div>

        {/* Bottom-left: social badge */}
        <div className="absolute bottom-6 left-6 z-20">

          <a href="#"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-800 pl-1.5 pr-4 py-1.5 rounded-full text-xs font-dmsans font-medium shadow-sm hover:bg-white transition-colors w-fit"
          >
            <span className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" /></svg>
            </span>
            Find us on social networks
          </a>
        </div>

      </div>

    </div>
    </section>
  );
}

export function IHubNetworkSection({
  onNavigate,
  totalHubs = 59,
  regionalHubs = 5,
  provincialHubs = 54,
  regions = 17,
}: {
  onNavigate?: (page: Page) => void;
  totalHubs?: number;
  regionalHubs?: number;
  provincialHubs?: number;
  regions?: number;
}) {
  const stats = [
    { label: "Total No. of iHubs in the Philippines", value: totalHubs, color: "text-[#00AEEF]", tilt: "-rotate-3" },
    { label: "Regional iHubs", value: regionalHubs, color: "text-[#86E21D]", tilt: "rotate-2" },
    { label: "Provincial iHubs", value: provincialHubs, color: "text-[#C77DFF]", tilt: "-rotate-2" },
    { label: "Regions", value: regions, color: "text-[#F16A64]", tilt: "rotate-3" },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 flex flex-col items-center">
      <h2 className="font-poppins text-[64px] text-white tracking-tight text-center mb-4">The iHub Network</h2>
      <p className="text-white text-[16px] font-dmsans font-medium text-center max-w-xl mb-8 leading-relaxed">
        The current iHub network spans 17 regions, with 59 hubs established nationwide. Explore the iHub Directory to discover the hubs across the country.
      </p>
      <button
        onClick={() => onNavigate && onNavigate("find")}
        className="mb-12 px-6 py-2.5 border-2 border-white rounded-full text-sm font-dmsans font-medium text-white hover:bg-sky-500 transition-colors"
      >
        Explore directory
      </button>

      <div className="w-full max-w-[1000px] grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-3xl border border-slate-100 shadow-md p-6 flex flex-col gap-2 transform-gpu ${stat.tilt} hover:rotate-0 hover:-translate-y-1 hover:shadow-xl transition-transform duration-300 ease-out will-change-transform`}
          >
            <p className="text-[#002E6A] text-[16px] font-dmsans font-semibold leading-snug">{stat.label}</p>
            <p className={`font-dmsans text-[96px] font-semibold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useMemo } from 'react';
import type { IHub, NewsArticle } from '../types';
import { useState, useEffect, useCallback } from 'react';


const FALLBACK_IMAGE = "/assets/placeholderImage.png";
const ROTATE_INTERVAL = 5000;
const FADE_DURATION = 300;

function pickRandomHubs(hubs: IHub[], count: number): IHub[] {
  const withImages = hubs.filter((h) => !!h.image_url);
  const shuffled = [...withImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const CAROUSEL_SIZE = 4;

export function AboutSection({
  hubs = [],
  onNavigate,
}: {
  hubs?: IHub[];
  onNavigate?: (page: Page) => void;
}) {
  const [featured, setFeatured] = useState<IHub[]>([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setFeatured(pickRandomHubs(hubs, CAROUSEL_SIZE));
  }, [hubs]);

  const rotate = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setFeatured(pickRandomHubs(hubs, CAROUSEL_SIZE));
      setActiveIndex(0);
      setFadeOut(false);
    }, FADE_DURATION);
  }, [hubs]);

  useEffect(() => {
    if (hubs.length <= CAROUSEL_SIZE) return; // nothing to rotate through
    const interval = setInterval(rotate, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [rotate, hubs.length]);

  return (
    <section className="py-24 px-6 lg:px-12 bg-white max-w-[1250px] mx-auto w-full">
      <div className="flex justify-center mb-16">
        <div className="px-6 py-2 bg-sky-50 text-slate-800 border border-sky-100 rounded-full text-sm font-medium">
          About iHubs
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">
        <div>
          <h2 className="text-[64px] font-poppins font-medium text-[#003F6A] tracking-tight">
            What is an iHub?
          </h2>
        </div>
        <div className="pt-2">
          <p className="text-slate-700 font-dmsans text-lg leading-relaxed mb-4">
            The iHub or Innovation Hub is a space where individuals and groups can meet, interact, develop new ideas, and find solutions that address economic and social problems and be ready to become innovative startups. It is a nationwide initiative of the Department of Science and Technology (DOST) to establish iHubs in every province in the Philippines.
          </p>
          <button
            onClick={() => onNavigate && onNavigate("about")}
            className="inline-flex items-center px-6 py-2.5 border-2 border-sky-500 rounded-full text-[14px] font-dmsans font-medium text-sky-500 hover:bg-white transition-colors"
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Expanding carousel */}
      <div
        className={
          "flex flex-col md:flex-row gap-4 h-auto md:h-[440px] transition-opacity duration-300 " +
          (fadeOut ? "opacity-0" : "opacity-100")
        }
      >
        {featured.map((hub, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={hub.id}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className="group relative rounded-[2rem] overflow-hidden cursor-pointer h-[260px] md:h-full transition-[flex-grow] duration-500 ease-out"
              style={{ flexGrow: isActive ? 3.2 : 1, flexBasis: 0, flexShrink: 1, minWidth: 0 }}
            >
              <img
                src={hub.image_url || FALLBACK_IMAGE}
                alt={hub.name}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (img.src !== FALLBACK_IMAGE) img.src = FALLBACK_IMAGE;
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3
                  className={
                    "font-semibold font-dmsans text-white mb-1 transition-all duration-300 " +
                    (isActive ? "text-xl opacity-100" : "text-sm opacity-90 line-clamp-2")
                  }
                >
                  {hub.name}
                </h3>
                <p
                  className={
                    "font-medium font-dmsans text-slate-200 text-xs mb-3 transition-opacity duration-300 " +
                    (isActive ? "opacity-100" : "opacity-0 h-0")
                  }
                >
                  {hub.address}
                </p>
                <span
                  className={
                    "inline-flex items-center gap-1.5 bg-white text-[#0C366D] rounded-full text-[11px] font-dmsans font-semibold px-3 py-1.5 transition-all duration-300 " +
                    (isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none")
                  }
                >
                  EXPLORE IHUB
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}



export function NewsSection({ news: dbNews, onNavigate }: { news?: NewsArticle[], onNavigate?: (page: Page, articleId?: string) => void }) {
  const fallbackNews = [
    {
      title: "CaffeiNation connects startups with national innovation leaders",
      tag: "NCR, Metro Manila",
      author: "DOST Writer",
      date: "July 10, 2026",
      readTime: "5 min read",
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "DOST and partners unite to strengthen support through iHubs",
      tag: "Region VI, Iloilo",
      author: "iHub Coordinator",
      date: "July 10, 2026",
      readTime: "5 min read",
      img: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "DOST strengthens nationwide startup support through capability-building for iHub focal persons",
      tag: "Region VII, Cebu",
      author: "Tech Reporter",
      date: "July 10, 2026",
      readTime: "5 min read",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    },
  ];

  // Map DB news to the format expected by the UI, or use fallback if empty
  const displayNews = dbNews && dbNews.length > 0
    ? dbNews.map(n => ({
      id: n.id,
      title: n.title,
      tag: `${n.region}, ${n.province}`,
      author: n.author,
      date: new Date(n.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: n.read_time,
      img: n.img_url
    }))
    : fallbackNews.map(n => ({ ...n, id: null as null }));

  // We ensure we have at least one featured and some other items to match the grid structure
  const featured = displayNews[0];
  const others = displayNews.slice(1, 3); // take next two for the grid

  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-[1250px] mx-auto w-full">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-sky-50 text-slate-800 border border-sky-100 rounded-full text-sm font-dmsans font-medium mb-6">
              Newsroom
            </span>
            <h2 className="text-[64px] font-poppins font-medium text-[#003F6A] tracking-tight">
              Latest news and<br />updates
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-slate-700 text-lg font-dmsans leading-relaxed mb-4">
              Discover the latest news, activities, and developments from Innovation Hubs across the Philippines, and stay informed about initiatives supporting innovation and entrepreneurship.
            </p>
            <button
              onClick={() => onNavigate && onNavigate("news")}
              className="inline-flex items-center px-6 py-2.5 border-2 border-sky-500 rounded-full text-[14px] font-dmsans font-medium text-sky-500 hover:bg-white transition-colors"
            >
              View all news
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[540px]">
          {/* Featured News (First item) */}
          <div onClick={() => featured?.id && onNavigate && onNavigate("article", featured.id)} className={`relative rounded-3xl overflow-hidden group min-h-[400px] lg:min-h-0 lg:flex-1 ${featured?.id ? 'cursor-pointer' : ''}`}>
            <img src={featured?.img} alt={featured?.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block px-3 py-1 bg-white text-slate-800 rounded-full text-xs font-semibold mb-4">
                {featured?.tag}
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-3 pr-16">{featured?.title}</h3>
              <p className="text-slate-200 text-sm">By {featured?.author} &nbsp;•&nbsp; {featured?.date} &nbsp;•&nbsp; {featured?.readTime}</p>
            </div>
            <div className="absolute bottom-8 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

          {/* Other News Items */}
          <div className="flex flex-col gap-6 lg:flex-1">
            {others.map((item, idx) => (
              <div key={idx} onClick={() => item.id && onNavigate && onNavigate("article", item.id)} className={`relative rounded-3xl overflow-hidden group flex-1 min-h-[220px] lg:min-h-0 ${item.id ? 'cursor-pointer' : ''}`}>
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block px-3 py-1 bg-white text-slate-800 rounded-full text-xs font-semibold mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold leading-tight mb-2 pr-12">{item.title}</h3>
                  <p className="text-slate-200 text-sm">By {item.author} &nbsp;•&nbsp; {item.date} &nbsp;•&nbsp; {item.readTime}</p>
                </div>
                <div className="absolute bottom-6 right-6 w-9 h-9 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-white text-center">
      <span className="inline-block px-4 py-1.5 bg-sky-50 text-slate-800 border border-sky-100 rounded-full text-sm font-dmsans font-medium mb-6">
        Partners
      </span>
      <h2 className="max-w-[700px] mx-auto text-[32px] font-poppins font-medium text-[#003F6A] tracking-tight">Powered by a growing ecosystem</h2>

      <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 max-w-[1200px] mx-auto mt-12">
        <img src="/assets/wadwhaniLogo.png" alt="Wadhwani Foundation" className="h-16 w-auto object-contain" />
        <img src="/assets/pcci_logo.webp" alt="PCCI" className="h-20 w-auto object-contain" />
        <img src="/assets/devcon_logo.png" alt="DEVCON" className="h-12 w-auto object-contain" />
        <img src="/assets/leaveanestlogo.webp" alt="Leave a Nest" className="h-12 w-auto object-contain" />
        <img src="/assets/gdap_logo.webp" alt="GDAP" className="h-16 w-auto object-contain" />
      </div>
    </section>
  );
}

// export function PartnersSection() {
//   const partners = [
//     { src: "/assets/wadwhaniLogo.png", alt: "Wadhwani Foundation", className: "h-16" },
//     { src: "/assets/pcci_logo.webp", alt: "PCCI", className: "h-20" },
//     { src: "/assets/devcon_logo.png", alt: "DEVCON", className: "h-12" },
//     { src: "/assets/leaveanestlogo.webp", alt: "Leave a Nest", className: "h-12" },
//     { src: "/assets/gdap_logo.webp", alt: "GDAP", className: "h-16" },
//   ];

//   return (
//     <section className="py-24 px-6 lg:px-12 bg-white text-center">
//       <div className="flex justify-center mb-6">
//         <span className="inline-block px-4 py-1.5 bg-sky-50 text-slate-800 border border-sky-100 rounded-full text-sm font-medium">
//           Partners
//         </span>
//       </div>
//       <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-16">Powered by a growing ecosystem</h2>

//       <div className="overflow-hidden">
//         <div className="flex items-center gap-12 lg:gap-20 w-max animate-marquee">
//           {[...partners, ...partners].map((partner, idx) => (
//             <img
//               key={`${partner.alt}-${idx}`}
//               src={partner.src}
//               alt={partner.alt}
//               className={`${partner.className} w-auto object-contain flex-shrink-0`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export function CTASection() {
//   return (
//     <section className="py-12 px-6 lg:px-12 bg-white pb-24">
//       <div className="max-w-[1200px] mx-auto relative rounded-[40px] overflow-hidden bg-gradient-to-r from-sky-400 to-blue-500 shadow-2xl">
//         <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
//           <div className="p-12 lg:p-20 text-white z-10">
//             <h2 className="text-4xl lg:text-5xl font-bold mb-4">Collect your iMugs</h2>
//             <p className="text-blue-50 text-lg mb-8 max-w-md">Experience innovation in every region. Visit our iHubs nationwide and collect them all.</p>
//             <button className="px-8 py-3 bg-white text-brand-blue rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
//               Learn more
//             </button>
//           </div>
//           <div className="relative h-64 lg:h-full">
//             {/* We position the mug image appropriately */}
//             <img src="/assets/iMugs.jpg" alt="iMugs Collection" className="absolute inset-0 w-full h-full object-cover object-left lg:object-center mix-blend-luminosity opacity-40 lg:opacity-100 lg:mix-blend-normal" />
//             {/* Add a gradient fade on desktop to blend the image into the blue background */}
//             <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent w-1/2"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

export function CTASection() {
  return (
    <section className="py-12 px-6 lg:px-12 bg-white pb-24">
      <div className="max-w-[1200px] mx-auto rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch bg-sky-400">
        {/* Left: solid blue text panel */}
        <div className="relative z-10 p-10 lg:p-14 text-white flex-1 flex flex-col justify-center">
          <h2 className="text-[56px] font-poppins font-medium mb-3 leading-tight">Collect your iMugs</h2>
          <p className="font-dmsans text-white text-[16px]sm lg:text-base mb-6 leading-relaxed max-w-sm">
            Experience innovation across the Philippines. Visit Innovation Hubs, discover local innovators, and collect an iMug along the way.
          </p>
          <button
            className="inline-flex items-center px-6 py-2.5 border-2 border-white rounded-full text-sm font-dmsans font-medium text-white hover:bg-white hover:text-sky-500 transition-colors w-fit"
          >
            Start collecting
          </button>
        </div>

        {/* Right: contained image, not stretched */}
        <div className="relative flex-1 min-h-[220px] lg:min-h-0 overflow-hidden">
          <img
            src="/assets/iMugs.jpg"
            alt="iMugs Collection"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient fade where the image meets the blue panel */}
          <div className="absolute inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-sky-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
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
  );
}
