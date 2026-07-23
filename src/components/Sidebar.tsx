import type { Database, IHub } from "../types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=120&q=80";

interface SidebarProps {
  database: Database;
  activeRegion: string | null;
  activeProvince: string | null;
  activeIHub: string | null;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onRegionSelect: (regionIso: string) => void;
  onHubClick: (hub: IHub) => void;
  onBack: () => void;
  sidebarTitle: string;
}

const REGION_ORDER: Record<string, number> = {
  "PH-00": 0,  // NCR
  "PH-15": 1,  // CAR
  "PH-01": 2,  // Region I
  "PH-02": 3,  // Region II
  "PH-03": 4,  // Region III
  "PH-40": 5,  // Region IV-A (CALABARZON)
  "PH-41": 6,  // Region IV-B (MIMAROPA)
  "PH-05": 7,  // Region V
  "PH-06": 8,  // Region VI
  "PH-18": 9,  // NIR (Negros Island Region)
  "PH-07": 10, // Region VII
  "PH-08": 11, // Region VIII
  "PH-09": 12, // Region IX
  "PH-10": 13, // Region X
  "PH-11": 14, // Region XI
  "PH-12": 15, // Region XII
  "PH-13": 16, // Region XIII (Caraga)
  "PH-14": 17, // BARMM
};

function regionSortKey(region: { region_iso: string }): number {
  return REGION_ORDER[region.region_iso] ?? 999;
}

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    (result[groupKey] = result[groupKey] || []).push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export default function Sidebar({
  database,
  activeRegion,
  activeProvince,
  activeIHub,
  searchQuery,
  onSearchChange,
  onRegionSelect,
  onHubClick,
  onBack,
  sidebarTitle,
}: SidebarProps) {
  const isSearching = searchQuery.trim() !== "";

  let hubsToShow: IHub[] = [];
  if (isSearching) {
    const q = searchQuery.toLowerCase().trim();
    hubsToShow = database.ihubs.filter(
      (hub) =>
        hub.name.toLowerCase().includes(q) ||
        hub.province.toLowerCase().includes(q) ||
        hub.institution.toLowerCase().includes(q) ||
        hub.address.toLowerCase().includes(q)
    );
  } else if (activeRegion) {
    hubsToShow = database.ihubs.filter((hub) => hub.region_iso === activeRegion);
  }

  const showRegionGrid = !isSearching && !activeRegion;
  const grouped = groupBy(hubsToShow, "province");

  return (
    <aside
      id="sidebar-section"
      className="w-full lg:w-[400px] flex-shrink-0 bg-slate-100 border-l border-slate-200 p-4 min-h-[500px] lg:h-full lg:min-h-0 order-3 overflow-hidden"
      aria-label="iHubs Directory Listings"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card h-full flex flex-col overflow-hidden">
        <div className="sidebar-header p-5 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-2 mb-4">
            {activeRegion && (
              <button
                onClick={onBack}
                className="btn-back w-8 h-8 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors"
                title="Go Back to National Map"
                aria-label="Back to National Map"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
            )}
            <h2 className="font-title text-lg font-extrabold text-brand-blue tracking-tight">{sidebarTitle}</h2>
          </div>

          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
              type="search"
              placeholder="Search for an iHub..."
              aria-label="Search Innovation Hubs"
            />
          </div>
        </div>

        <div id="sidebar-content" className="flex-1 min-h-0 p-4 overflow-y-auto space-y-2">
          {showRegionGrid && (
            <div className="grid grid-cols-1 gap-2 p-1">
              {[...database.regions]
                .sort((a, b) => regionSortKey(a) - regionSortKey(b))
                .map((region) => (
                  <button
                    key={region.region_iso}
                    type="button"
                    onClick={() => onRegionSelect(region.region_iso)}
                    className="flex items-center justify-between w-full p-3 bg-white hover:bg-brand-light/50 border border-slate-200 rounded-xl transition-all duration-200 group text-left"
                  >
                    <span className="font-title font-bold text-sm text-slate-700 group-hover:text-brand-blue">{region.region_name}</span>
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transform group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                ))}
            </div>
          )}

          {!showRegionGrid && hubsToShow.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <svg className="w-12 h-12 text-slate-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="font-title font-bold text-slate-700 text-base mb-1">No Innovation Hubs found</div>
              <div className="text-xs text-slate-500">Try modifying your search or select another region.</div>
            </div>
          )}

          {!showRegionGrid &&
            Object.keys(grouped).map((provName) => {
              const provinceIso = grouped[provName][0].province_iso;
              return (
                <div key={provName}>
                  <div
                    className={
                      "font-title text-xs font-extrabold uppercase tracking-wider text-slate-400 my-2 px-1 " +
                      (activeProvince === provinceIso ? "text-brand-blue" : "")
                    }
                  >
                    {provName.toUpperCase()}
                  </div>
                  {grouped[provName].map((hub) => {
                    const isActive = activeIHub === hub.id;
                    const badgeClass =
                      hub.type === "Regional iHub"
                        ? "bg-brand-blue/10 text-brand-blue font-semibold"
                        : "bg-emerald-50 text-emerald-700 font-semibold";
                    return (
                      <div
                        key={hub.id}
                        id={`card-${hub.id}`}
                        onClick={() => onHubClick(hub)}
                        className={
                          "ihub-card group flex items-start justify-between gap-3 p-3.5 bg-white border border-slate-200/80 rounded-xl cursor-pointer transition-all duration-200 hover:border-brand-blue hover:shadow-card-hover mb-2 " +
                          (isActive ? "border-brand-blue ring-2 ring-brand-blue/20 bg-brand-light/30" : "")
                        }
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-title font-bold text-slate-800 text-sm group-hover:text-brand-blue transition-colors leading-snug">{hub.name}</div>
                          <div className="text-xs font-medium text-slate-600 mt-0.5 truncate">{hub.institution}</div>
                          <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{hub.address}</div>
                          <div className={"inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide mt-2 " + badgeClass}>{hub.type}</div>
                        </div>
                        <img
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-slate-100"
                          src={hub.image_url || FALLBACK_IMAGE}
                          alt={hub.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </aside>
  );
}
