import React from 'react';

export function HeroSection({ mapComponent }: { mapComponent?: React.ReactNode }) {
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
            <a href="#" className="inline-flex items-center text-[14px] font-poppins font-semibold text-white hover:text-sky-300 transition-colors">
              Check directory
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
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

export function AboutSection() {
  const hubs = [
    {
      title: "Masuerte Zamboanga Region IX iHub",
      location: "Zamboanga City",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Antique Provincial iHub",
      location: "Antique",
      img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Aklan Provincial iHub",
      location: "Aklan",
      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-white max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <span className="text-brand-blue font-semibold tracking-wider uppercase text-sm mb-3 block">Learn More</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">What is an iHub?</h2>
        </div>
        <p className="text-slate-600 max-w-xl text-lg leading-relaxed">
          The iHub or Innovation Hub is a space where individuals and groups can meet, interact, develop new ideas,
          and find solutions that address economic and social problems and be ready to become innovative startups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hubs.map((hub, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-4">
              <img src={hub.img} alt={hub.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-brand-blue transition-colors">{hub.title}</h3>
            <p className="text-slate-500 text-sm">{hub.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NewsSection() {
  const news = [
    {
      title: "CoffeINation connects startups with national innovation leaders",
      tag: "NEWS",
      date: "Aug 10, 2024",
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "DOST starts up P5M tech hub in Aklan",
      tag: "NEWS",
      date: "Jul 22, 2024",
      img: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "DOST strengthens local tech startups through capability building",
      tag: "NEWS",
      date: "Jun 15, 2024",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-brand-blue font-semibold tracking-wider uppercase text-sm mb-3 block">Updates</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">Latest news and<br />updates</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured News (First item) */}
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer lg:row-span-2">
            <img src={news[0].img} alt={news[0].title} className="w-full h-full min-h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4 tracking-wider">{news[0].tag}</span>
              <h3 className="text-3xl font-bold leading-tight mb-2 group-hover:text-sky-300 transition-colors">{news[0].title}</h3>
              <p className="text-slate-300 text-sm">{news[0].date}</p>
            </div>
            <div className="absolute bottom-8 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>

          {/* Other News Items */}
          <div className="grid grid-rows-2 gap-6">
            {news.slice(1).map((item, idx) => (
              <div key={idx} className="relative rounded-3xl overflow-hidden group cursor-pointer flex">
                <img src={item.img} alt={item.title} className="w-full h-full absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3 tracking-wider">{item.tag}</span>
                  <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-sky-300 transition-colors pr-12">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.date}</p>
                </div>
                <div className="absolute bottom-8 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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

export function CTASection() {
  return (
    <section className="py-12 px-6 lg:px-12 bg-white pb-24">
      <div className="max-w-[1200px] mx-auto relative rounded-[40px] overflow-hidden bg-gradient-to-r from-sky-400 to-blue-500 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-12 lg:p-20 text-white z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Collect your iMugs</h2>
            <p className="text-blue-50 text-lg mb-8 max-w-md">Experience innovation in every region. Visit our iHubs nationwide and collect them all.</p>
            <button className="px-8 py-3 bg-white text-brand-blue rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Learn more
            </button>
          </div>
          <div className="relative h-64 lg:h-full">
            {/* We position the mug image appropriately */}
            <img src="/assets/iMugs.jpg" alt="iMugs Collection" className="absolute inset-0 w-full h-full object-cover object-left lg:object-center mix-blend-luminosity opacity-40 lg:opacity-100 lg:mix-blend-normal" />
            {/* Add a gradient fade on desktop to blend the image into the blue background */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent w-1/2"></div>
          </div>
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
          <img src="/assets/iHubLogo.png" alt="iHub" className="h-8 w-auto grayscale opacity-70" />
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
