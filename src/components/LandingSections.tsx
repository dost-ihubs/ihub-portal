import React from 'react';

import { type Page } from './Header';

export function HeroSection({ mapComponent, onNavigate }: { mapComponent?: React.ReactNode; onNavigate?: (page: Page) => void }) {
  return (
    <section className="relative w-full min-h-[850px] flex items-center bg-slate-900 overflow-hidden pt-40 pb-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src='/assets/wv_ihub.jpg'
          alt="Modern Co-working Space"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#003F6A] opacity-65"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
        {/* Left Column */}
        <div className="space-y-16">
          <h1 className="font-neue text-[96px] font-medium leading-[1.1] tracking-[0] text-white mt-">
            Innovation Starts Here
          </h1>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] shadow-2xl max-w-sm">
            {/* Map Block */}
            <div className="w-full h-48  rounded-2xl mb-5 overflow-hidden flex items-center justify-center relative shadow-inner">
              {mapComponent ? (
                <div className="absolute inset-0 z-0 origin-center opacity-90 mix-blend-luminosity">
                  {mapComponent}
                </div>
              ) : (
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map Placeholder" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-70" />
              )}
              {!mapComponent && <div className="absolute inset-0 bg-brand-blue/20"></div>}
            </div>

            <h3 className="font-neue font-medium text-white text-2xl mb-2">iHub Directory</h3>
            <p className="font-poppins text-blue-100 text-[16px] tracking-[0] mb-5 pr-4">Experience Innovation in Every Region. Visit Our iHubs Nationwide.</p>
            <button onClick={() => onNavigate && onNavigate("find")} className="inline-flex items-center text-[14px] font-poppins font-semibold text-white hover:text-sky-300 transition-colors">
              Check directory
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-10 pb-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
            <div>
              <p className="font-poppins text-blue-100 text-xs md:text-sm font-regular mb-1">Total iHubs</p>
              <p className="text-white text-4xl md:text-5xl font-bold">59</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20"></div>
            <div>
              <p className="font-poppins text-blue-100 text-xs md:text-sm font-regular mb-1">Regional iHubs</p>
              <p className="text-white text-4xl md:text-5xl font-bold">5</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20"></div>
            <div>
              <p className="font-poppins text-blue-100 text-xs md:text-sm font-regular mb-1">Provincial iHubs</p>
              <p className="text-white text-4xl md:text-5xl font-bold">54</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20"></div>
            <div>
              <p className="font-poppins text-blue-100 text-xs md:text-sm font-regular mb-1">Regions</p>
              <p className="text-white text-4xl md:text-5xl font-bold">18</p>
            </div>
          </div>

          <p className="font-poppins text-white text-lg md:text-xl font-light leading-relaxed max-w-xl">
            The DOST Innovation Hub (iHub) plays a critical role in the overall development and success of startups, strengthening the Philippine innovation ecosystem from the ground up.
          </p>

          <button className="font-poppins text-[14px] px-8 py-3 bg-sky-500 hover:bg-sky-400 transition-colors text-white rounded-full font-semibold shadow-lg">
            Learn more
          </button>
        </div>
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

function pickRandomHubs(hubs: IHub[]): IHub[] {
  const withImages = hubs.filter((h) => !!h.image_url);
  const shuffled = [...withImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export function AboutSection({ hubs = [] }: { hubs?: IHub[] }) {
  const [featured, setFeatured] = useState<IHub[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setFeatured(pickRandomHubs(hubs));
  }, [hubs]);

  const rotate = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setFeatured(pickRandomHubs(hubs));
      setFadeOut(false);
    }, FADE_DURATION);
  }, [hubs]);

  useEffect(() => {
    if (hubs.length <= 3) return; // nothing to rotate through
    const interval = setInterval(rotate, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [rotate, hubs.length]);

  return (
    <section className="py-24 px-6 lg:px-12 bg-white max-w-[1400px] mx-auto w-full">
      <div className="flex justify-center mb-16">
        <div className="px-6 py-2 bg-sky-50 text-slate-800 border border-sky-100 rounded-full text-sm font-medium">
          About iHubs
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">
        <div>
          <h2 className="text-5xl lg:text-6xl font-medium text-[#003F6A] tracking-tight">
            What is an iHub?
          </h2>
        </div>
        <div className="pt-2">
          <p className="text-slate-700 text-lg leading-relaxed mb-4">
            The iHub or Innovation Hub is a space where individuals and groups can meet, interact, develop new ideas, and find solutions that address economic and social problems and be ready to become innovative startups. It is a nationwide initiative of the Department of Science and Technology (DOST) to establish iHubs in every province in the Philippines.
          </p>
          <a href="#" className="inline-flex items-center text-sky-500 font-medium hover:text-sky-600 transition-colors">
            Learn more about iHubs
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      <div
        className={
          "grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 " +
          (fadeOut ? "opacity-0" : "opacity-100")
        }
      >
        {featured.map((hub) => (
          <div key={hub.id} className="group cursor-pointer">
            <div className="rounded-[32px] overflow-hidden aspect-[3/4] mb-6">
              <img
                src={hub.image_url || FALLBACK_IMAGE}
                alt={hub.name}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (img.src !== FALLBACK_IMAGE) img.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="font-medium text-xl text-[#003F6A] mb-1 group-hover:text-sky-500 transition-colors">
              {hub.name}
            </h3>
            <p className="text-slate-700 text-sm">{hub.address}</p>
          </div>
        ))}
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
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-sky-50 text-slate-800 border border-sky-100 rounded-full text-sm font-medium mb-6">
              Newsroom
            </span>
            <h2 className="text-4xl lg:text-6xl font-medium text-[#003F6A] tracking-tight leading-[1.1]">
              Latest news and<br />updates
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              Discover the latest news, activities, and developments from Innovation Hubs across the Philippines, and stay informed about initiatives supporting innovation and entrepreneurship.
            </p>
            <button onClick={() => onNavigate && onNavigate("news")} className="inline-flex items-center text-sky-500 font-medium hover:text-sky-600 transition-colors">
              View all news
              <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
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
      <span className="text-slate-400 font-semibold tracking-wider uppercase text-sm mb-3 block">Partners</span>
      <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight mb-16">Powered by a growing ecosystem</h2>

      <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 max-w-[1200px] mx-auto">
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
          <h2 className="text-[56px] font-neue font-medium mb-3 leading-tight">Collect your iMugs</h2>
          <p className="font-poppins text-blue-50 text-[16px]sm lg:text-base mb-6 leading-relaxed max-w-sm">
            Experience innovation across the Philippines. Visit Innovation Hubs, discover local innovators, and collect an iMug along the way.
          </p>
          <a href="#" className="inline-flex items-center text-white font-semibold hover:text-blue-50 transition-colors w-fit">
            Start collecting
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
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
