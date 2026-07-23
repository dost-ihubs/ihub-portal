import type { DBSource } from "../types";

interface HeaderProps {
  dbSource: DBSource;
}

export default function Header({ dbSource }: HeaderProps) {
  const isLive = dbSource === "live";

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-white text-slate-800 shadow-sm border-b border-slate-200"
    >
      <div className="flex items-center gap-3">
        <img src="/assets/iHubLogo.png" alt="iHub Logo" className="h-14 w-auto object-contain" />
        <div className="flex items-center gap-3">
          <h1 className="font-poppins text-[30px] font-bold text-sky-500">PORTAL</h1>
          <span
            className={
              "px-2.5 py-0.5 rounded-full text-[11px] font-bold border " +
              (isLive
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-amber-100 text-amber-700 border-amber-200")
            }
          >
            {isLive ? "Live Supabase Data" : "Demo Offline Mode"}
          </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-7 font-poppins text-sm text-slate-700" aria-label="Main Navigation">
        <a href="#" className="hover:text-brand-blue transition-colors">About iHubs</a>
        <a href="#" className="hover:text-brand-blue transition-colors">How It Works</a>
        <a href="#" className="text-sky-500 font-semibold">Find an iHub</a>
        <a href="#" className="hover:text-brand-blue transition-colors">Programs</a>
        <a href="#" className="hover:text-brand-blue transition-colors">Resources</a>
        <a href="#" className="hover:text-brand-blue transition-colors">Contact</a>
      </nav>
    </header>
  );
}
