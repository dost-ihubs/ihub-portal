import type { DBSource } from "../types";

export type Page = "home" | "about" | "programs" | "news" | "contact" | "find" | "how-it-works" | "resources" | "admin" | "article";

interface HeaderProps {
  dbSource: DBSource;
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About iHubs", page: "about" },
  { label: "Find an iHub", page: "find" },
  { label: "News", page: "news" },
  { label: "Contact", page: "contact" },
];

export default function Header({ dbSource, activePage, onNavigate }: HeaderProps) {
  const isLive = dbSource === "live";

  return (
    <div className="absolute top-6 left-0 right-0 z-50 flex justify-center px-6">
      <header
        id="top-navbar"
        className="grid grid-cols-3 items-center w-full max-w-[1400px] px-8 py-3 bg-white text-slate-800 rounded-full shadow-lg"
      >
        <div className="flex items-center gap-3">
          <img src="/assets/iHubLogo.png" alt="iHub Logo" className="h-10 w-auto object-contain cursor-pointer" onClick={() => onNavigate("home")} />
        </div>

        <nav className="flex items-center justify-center gap-8 font-poppins text-sm font-semibold text-slate-800" aria-label="Main Navigation">
          {NAV_ITEMS.map(({ label, page }) => (
            <button
              key={page}
              type="button"
              onClick={() => onNavigate(page)}
              className={
                "transition-colors " +
                (activePage === page
                  ? "text-sky-500"
                  : "hover:text-sky-500")
              }
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center justify-end gap-3">
          <button onClick={() => onNavigate("find")} className="px-6 py-2.5 bg-sky-500 text-white text-[14px] font-semibold text-poppins rounded-full hover:bg-sky-400 transition-colors shadow-md">
            Find an iHub
          </button>
        </div>
      </header>
    </div>
  );
}
