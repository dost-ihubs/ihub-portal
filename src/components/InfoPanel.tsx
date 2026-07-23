import DashboardStats from "./DashboardStats";

export default function InfoPanel() {
  return (
    <aside
      id="info-panel"
      className="w-full lg:w-[550px] flex-shrink-0 bg-slate-100 border-r border-slate-200 p-4 order-1 overflow-hidden"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card h-full overflow-y-auto p-6 space-y-6">

        {/* Hero */}
        <div className="hero-section">
          <h1 className="font-poppins text-[32px] font-bold text-sky-500 mb-2">Innovation Starts Here</h1>
          <p className="font-poppins text-sm text-slate-600 mb-5">
            The DOST Innovation Hub (iHub) plays a critical role in the overall development and success of startups,
            strengthening the Philippine innovation ecosystem from the ground up.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-poppins font-medium bg-sky-500 hover:bg-brand-hover text-white shadow-md transition-all">
              Find an iHub near you
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-poppins font-medium bg-white hover:bg-slate-50 text-brand-dark border-2 border-brand-dark transition-all">
              Learn more about iHub
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        <hr className="border-slate-200" />

        <div>
          <h2 className="font-poppins text-lg font-bold text-blue-900 mb-2">About iHub</h2>
          <p className="font-poppins font-regular text-xs text-slate-600">
            The iHub Program is a joint initiative of the Department of Science and Technology (DOST) and its
            partner organizations, established to build a nationwide network of innovation spaces that support
            Filipino entrepreneurs, startups, and inventors at every stage of their journey.
          </p>
        </div>

        <hr className="border-slate-200" />

        <div>
          <h2 className="font-poppins text-lg font-bold text-blue-900 mb-2">What is an iHub?</h2>
          <p className="font-poppins font-regular text-xs text-slate-600">
            The iHub or Innovation Hub is a space where individuals and groups can meet, interact, develop new ideas,
            and find solutions that address economic and social problems and be ready to become innovative startups.
            It is a nationwide initiative of the Department of Science and Technology (DOST) to establish iHubs in
            every province in the Philippines.
          </p>
        </div>

        <hr className="border-slate-200" />

        <div className="journey-4is">
          <h2 className="font-poppins text-lg font-bold text-blue-900 mb-2">The 4Is Journey</h2>
          <p className="font-poppins text-xs text-slate-500 mb-4">Our simple path to help turn your ideas into impact.</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { img: "/assets/4.png", label: "Inspire" },
              { img: "/assets/2.png", label: "Initiate" },
              { img: "/assets/3.png", label: "Interact" },
              { img: "/assets/1.png", label: "Ideate" },
            ].map((step) => (
              <div key={step.label} className="flex flex-col items-center gap-1.5">
                <img src={step.img} alt="" className="rounded-lg w-full" />
                <span className="text-[11px] font-bold text-slate-700">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Hardcoded to match the original updateDashboardStats() values in dashboard.ts */}
        <DashboardStats total={59} regional={5} provincial={54} regionsCovered={18} />

        <div className="relative overflow-hidden rounded-2xl bg-sky-500 text-white p-5 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-poppins text-base font-extrabold mb-1">Collect your iMugs</h3>
            <p className="font-poppins text-xs text-white/85 leading-snug mb-3">
              Experience Innovation in Every Region. Visit our iHubs Nationwide.
            </p>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm font-poppins font-medium hover:underline">
              Start collecting
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <img src="/assets/iMugs.jpg" alt="iHub collectible mugs" className="w-28 h-20 object-cover rounded-lg shadow-lg flex-shrink-0" />
        </div>

      </div>
    </aside>
  );
}
