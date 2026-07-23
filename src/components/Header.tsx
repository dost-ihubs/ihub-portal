import type { DBSource } from "../types";

export type Page = "find" | "about" | "how-it-works" | "programs" | "resources" | "contact";

interface HeaderProps {
  dbSource: DBSource;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: "About iHubs", page: "about" },
  { label: "How It Works", page: "how-it-works" },
  { label: "Find an iHub", page: "find" },
  { label: "Programs", page: "programs" },
  { label: "Resources", page: "resources" },
  { label: "Contact", page: "contact" },
];

export default function Header({ dbSource, activePage, onNavigate }: HeaderProps) {
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
          {/* <span
            className={
              "px-2.5 py-0.5 rounded-full text-[11px] font-bold border " +
              (isLive
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-amber-100 text-amber-700 border-amber-200")
            }
          >
            {isLive ? "Live Supabase Data" : "Demo Offline Mode"}
          </span> */}
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-7 font-poppins text-sm text-slate-700" aria-label="Main Navigation">
        {NAV_ITEMS.map(({ label, page }) => (
          <button
            key={page}
            type="button"
            onClick={() => onNavigate(page)}
            className={
              "transition-colors " +
              (activePage === page
                ? "text-sky-500 font-semibold"
                : "hover:text-brand-blue")
            }
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
