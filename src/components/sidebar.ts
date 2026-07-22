import type { Database, IHub } from "../types";
import { openIHubModal } from "./modal";

export function populateSidebarCards(
  sidebarContent: HTMLElement,
  database: Database,
  activeRegion: string | null,
  activeProvince: string | null,
  activeIHub: string | null,
  onRegionSelect: (regionIso: string) => void,
  filteredHubs: IHub[] | null = null
): void {
  sidebarContent.innerHTML = "";

  // National view with no search active -> show region grid buttons
  if (filteredHubs === null && !activeRegion) {
    renderRegionButtonsGrid(sidebarContent, database, onRegionSelect);
    return;
  }

  let hubsToShow: IHub[] = [];
  if (filteredHubs !== null) {
    hubsToShow = filteredHubs;
  } else if (activeRegion) {
    hubsToShow = database.ihubs.filter(hub => hub.region_iso === activeRegion);
  }

  if (hubsToShow.length === 0) {
    sidebarContent.innerHTML = `
      <div class="flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <svg class="w-12 h-12 text-slate-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <div class="font-title font-bold text-slate-700 text-base mb-1">No Innovation Hubs found</div>
        <div class="text-xs text-slate-500">Try modifying your search or select another region.</div>
      </div>
    `;
    return;
  }

  const grouped = groupBy(hubsToShow, "province");

  Object.keys(grouped).forEach(provName => {
    const provinceIso = grouped[provName][0].province_iso;

    const sectionHeader = document.createElement("div");
    sectionHeader.className = `font-title text-xs font-extrabold uppercase tracking-wider text-slate-400 my-2 px-1 ${
      activeProvince === provinceIso ? "text-brand-blue" : ""
    }`;
    sectionHeader.textContent = provName.toUpperCase();
    sidebarContent.appendChild(sectionHeader);

    grouped[provName].forEach(hub => {
      const card = document.createElement("div");
      const isActive = activeIHub === hub.id;
      card.className = `ihub-card group flex items-start justify-between gap-3 p-3.5 bg-white border border-slate-200/80 rounded-xl cursor-pointer transition-all duration-200 hover:border-brand-blue hover:shadow-card-hover ${
        isActive ? "border-brand-blue ring-2 ring-brand-blue/20 bg-brand-light/30" : ""
      }`;
      card.id = `card-${hub.id}`;

      const badgeClass = hub.type === "Regional iHub"
        ? "bg-brand-blue/10 text-brand-blue font-semibold"
        : "bg-emerald-50 text-emerald-700 font-semibold";
      const imageUrl = hub.image_url || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=120&q=80";

      card.innerHTML = `
        <div class="flex-1 min-w-0">
          <div class="font-title font-bold text-slate-800 text-sm group-hover:text-brand-blue transition-colors leading-snug">${hub.name}</div>
          <div class="text-xs font-medium text-slate-600 mt-0.5 truncate">${hub.institution}</div>
          <div class="text-[11px] text-slate-400 mt-1 line-clamp-1">${hub.address}</div>
          <div class="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide mt-2 ${badgeClass}">${hub.type}</div>
        </div>
        <img class="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-slate-100" src="${imageUrl}" alt="${hub.name}" onerror="this.src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=120&q=80'">
      `;

      card.addEventListener("click", () => {
        openIHubModal(hub);
      });

      sidebarContent.appendChild(card);
    });
  });
}

export function renderRegionButtonsGrid(
  sidebarContent: HTMLElement,
  database: Database,
  onRegionSelect: (regionIso: string) => void
): void {
  const gridWrap = document.createElement("div");
  gridWrap.className = "grid grid-cols-1 gap-2 p-1";

  database.regions.forEach(region => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "flex items-center justify-between w-full p-3 bg-white hover:bg-brand-light/50 border border-slate-200 rounded-xl transition-all duration-200 group text-left";
    btn.innerHTML = `
      <span class="font-title font-bold text-sm text-slate-700 group-hover:text-brand-blue">${region.region_name}</span>
      <svg class="w-4 h-4 text-slate-400 group-hover:text-brand-blue transform group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;

    btn.addEventListener("click", () => {
      onRegionSelect(region.region_iso);
    });

    gridWrap.appendChild(btn);
  });

  sidebarContent.appendChild(gridWrap);
}

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, currentValue) => {
    const groupKey = String(currentValue[key]);
    (result[groupKey] = result[groupKey] || []).push(currentValue);
    return result;
  }, {} as Record<string, T[]>);
}
