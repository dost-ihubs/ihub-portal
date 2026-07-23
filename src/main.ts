import "./index.css";
import L from "leaflet";
import type { MapState, GeoJsonCollection, CustomFeatureProperties, IHub } from "./types";
import { mockRegions, mockIHubs } from "./data/mockData";
import { mergeNegrosIslandRegion } from "./utils/geo";
// import { fetchFromGoogleSheets } from "./utils/csv";
import { fetchFromSupabase } from "./utils/supabase";
import { initMap, renderRegionsLayer, renderProvincesLayer, renderMapPins } from "./components/map";
import { populateSidebarCards } from "./components/sidebar";
import { updateDashboardStats } from "./components/dashboard";
import { openIHubModal, closeIHubModal } from "./components/modal";
import { openConfigDrawer, closeConfigDrawer, showConfigStatus, clearConfigStatus } from "./components/drawer";

// Application State
const DEFAULT_SHEET_ID = "1fI0WJ9A4qU3LAL4zG6YPdpR8U7NdClwtIlw2mXeSerA";

const state: MapState = {
  activeRegion: null,
  activeProvince: null,
  activeIHub: null,
  showAllPinsNationwide: false,
  database: { regions: [], ihubs: [] },
  markersMap: {},
  currentSheetId: DEFAULT_SHEET_ID,
  dbSource: "mock"
};

let map: L.Map;
let regionsGeoJsonData: GeoJsonCollection;
let provincesGeoJsonData: GeoJsonCollection;
let regionsLayer: L.GeoJSON | null = null;
let provincesLayer: L.GeoJSON | null = null;
let markersGroup: L.LayerGroup;

// DOM Elements
let btnBack: HTMLButtonElement;
let searchInput: HTMLInputElement;
let sidebarTitle: HTMLElement;
let sidebarContent: HTMLElement;
let infoOverlay: HTMLElement;
let dbBadge: HTMLElement;

let statTotalHubs: HTMLElement;
let statRegionalHubs: HTMLElement;
let statProvincialHubs: HTMLElement;
let statRegionsCovered: HTMLElement;

let configDrawer: HTMLElement;
let btnConfigOpen: HTMLElement;
let btnConfigClose: HTMLElement;
let drawerBackdrop: HTMLElement;
let configForm: HTMLFormElement;
let txtSheetId: HTMLInputElement;
let configStatus: HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
  initDOMElements();
  map = initMap();
  markersGroup = L.layerGroup().addTo(map);
  loadData();
});

function initDOMElements(): void {
  btnBack = document.getElementById("btn-back") as HTMLButtonElement;
  searchInput = document.getElementById("search-input") as HTMLInputElement;
  sidebarTitle = document.getElementById("sidebar-title")!;
  sidebarContent = document.getElementById("sidebar-content")!;
  infoOverlay = document.getElementById("info-overlay")!;
  dbBadge = document.getElementById("db-source-badge")!;

  statTotalHubs = document.getElementById("stat-total-hubs")!;
  statRegionalHubs = document.getElementById("stat-regional-hubs")!;
  statProvincialHubs = document.getElementById("stat-provincial-hubs")!;
  statRegionsCovered = document.getElementById("stat-regions-covered")!;

  configDrawer = document.getElementById("config-drawer")!;
  btnConfigOpen = document.getElementById("btn-config-open")!;
  btnConfigClose = document.getElementById("btn-config-close")!;
  drawerBackdrop = document.getElementById("drawer-backdrop")!;
  configForm = document.getElementById("config-form") as HTMLFormElement;
  txtSheetId = document.getElementById("txt-sheet-id") as HTMLInputElement;
  configStatus = document.getElementById("config-status")!;

  btnBack.addEventListener("click", resetToNationalView);
  searchInput.addEventListener("input", handleSearch);

  btnConfigOpen.addEventListener("click", () =>
    openConfigDrawer(configDrawer, drawerBackdrop, txtSheetId, state.currentSheetId, () => clearConfigStatus(configStatus))
  );
  btnConfigClose.addEventListener("click", () => closeConfigDrawer(configDrawer, drawerBackdrop));
  drawerBackdrop.addEventListener("click", () => closeConfigDrawer(configDrawer, drawerBackdrop));
  configForm.addEventListener("submit", saveConfig);

  txtSheetId.value = state.currentSheetId;

  document.getElementById("ihub-modal-close")?.addEventListener("click", closeIHubModal);

  const chkShowAllPins = document.getElementById("chk-show-all-pins") as HTMLInputElement;
  chkShowAllPins?.addEventListener("change", (e) => {
    state.showAllPinsNationwide = (e.target as HTMLInputElement).checked;
    renderMapPins(map, markersGroup, state, focusOnIHub);
  });
}

async function loadData(): Promise<void> {
  try {
    showLoadingState();

    const isLocalFile = window.location.protocol === "file:";
    const regionsUrl = isLocalFile
      ? "https://raw.githubusercontent.com/apache/superset/master/superset-frontend/plugins/legacy-plugin-chart-country-map/src/countries/philippines_regions.geojson"
      : "data/philippines_regions.geojson";
    const provincesUrl = isLocalFile
      ? "https://raw.githubusercontent.com/apache/superset/master/superset-frontend/plugins/legacy-plugin-chart-country-map/src/countries/philippines.geojson"
      : "data/philippines_provinces.geojson";

    const [regionsRes, provincesRes] = await Promise.all([
      fetch(regionsUrl),
      fetch(provincesUrl)
    ]);

    regionsGeoJsonData = await regionsRes.json();
    provincesGeoJsonData = await provincesRes.json();

    mergeNegrosIslandRegion(regionsGeoJsonData, provincesGeoJsonData);

    if (state.currentSheetId) {
      await loadFromSpreadsheet(state.currentSheetId);
    } else {
      useFallbackMockData();
    }

    updateDashboardStats(statTotalHubs, statRegionalHubs, statProvincialHubs, statRegionsCovered);
    renderRegions();
    resetToNationalView();

  } catch (error) {
    console.error("Error loading application data:", error);
    useFallbackMockData();
    updateDashboardStats(statTotalHubs, statRegionalHubs, statProvincialHubs, statRegionsCovered);
    renderRegions();
    resetToNationalView();
  }
}

async function loadFromSpreadsheet(sheetId: string): Promise<void> {
  try {
    // const data = await fetchFromGoogleSheets(sheetId);
    const data = await fetchFromSupabase();
    state.database = data;
    state.dbSource = "live";
    dbBadge.textContent = "Live Google Sheet";
    dbBadge.className = "db-source-badge live px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200";
  } catch (err) {
    console.warn("Spreadsheet load failed, using fallback mock data.", err);
    useFallbackMockData();
  }
}

function useFallbackMockData(): void {
  state.database = {
    regions: mockRegions,
    ihubs: mockIHubs
  };
  state.dbSource = "mock";
  dbBadge.textContent = "Demo Offline Mode";
  dbBadge.className = "db-source-badge mock px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200";
}

function renderRegions(): void {
  if (regionsLayer) {
    map.removeLayer(regionsLayer);
  }
  regionsLayer = renderRegionsLayer(
    map,
    regionsGeoJsonData,
    state,
    highlightRegionHover,
    unhighlightRegionHover,
    selectRegion
  );
}

function highlightRegionHover(props: CustomFeatureProperties, layer: L.Layer): void {
  (layer as L.Path).setStyle({
    fillColor: "var(--color-region-hover, #0072bc)",
    fillOpacity: 0.95
  });

  const count = state.database.ihubs.filter(hub => hub.region_iso === props.ISO).length;
  const regionDbInfo = state.database.regions.find(r => r.region_iso === props.ISO);

  const labelEl = document.getElementById("info-label");
  const badgeEl = document.getElementById("info-badge-num");
  const detailsEl = document.getElementById("info-details-rows");

  if (labelEl) labelEl.textContent = props.NAME_1;
  if (badgeEl) badgeEl.textContent = count.toString();

  if (detailsEl) {
    if (regionDbInfo) {
      detailsEl.innerHTML = `
        <div class="flex justify-between gap-4 text-xs py-1 border-b border-white/10"><span class="font-poppins font-medium text-slate-500">Focal Person:</span><span class="font-poppins font-medium text-black truncate">${regionDbInfo.focal_person || "N/A"}</span></div>
        <div class="flex justify-between gap-4 text-xs py-1 border-b border-white/10"><span class="font-poppins font-medium text-slate-500">Position:</span><span class="font-poppins font-medium text-black truncate">${regionDbInfo.position || "N/A"}</span></div>
        <div class="flex justify-between gap-4 text-xs py-1 border-b border-white/10"><span class="font-poppins font-medium text-slate-500">Contact No:</span><span class="font-poppins font-medium text-black truncate">${regionDbInfo.contact_number || "N/A"}</span></div>
        <div class="flex justify-between gap-4 text-xs py-1"><span class="font-poppins font-medium text-slate-500">Email:</span><span class="font-poppins font-medium text-black truncate">${regionDbInfo.email || "N/A"}</span></div>
      `;
    } else {
      detailsEl.innerHTML = `
        <div class="flex justify-between gap-4 text-xs py-1 border-b border-white/10"><span class="font-medium text-slate-300">Focal Person:</span><span class="font-semibold text-white">N/A</span></div>
        <div class="flex justify-between gap-4 text-xs py-1"><span class="font-medium text-slate-300">Contact No:</span><span class="font-semibold text-white">N/A</span></div>
      `;
    }
  }

  infoOverlay.classList.add("visible");
}

function unhighlightRegionHover(layer: L.Layer): void {
  if (state.activeRegion === null && regionsLayer) {
    regionsLayer.resetStyle(layer);
    infoOverlay.classList.remove("visible");
  }
}

function selectRegion(regionIso: string, bounds?: L.LatLngBounds): void {
  state.activeRegion = regionIso;

  if (bounds) {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8.5 });
  } else {
    const targetBounds = getRegionLayerBounds(regionIso);
    if (targetBounds) map.fitBounds(targetBounds, { padding: [50, 50], maxZoom: 8.5 });
  }

  renderRegions();

  if (provincesLayer) {
    map.removeLayer(provincesLayer);
  }
  provincesLayer = renderProvincesLayer(map, provincesGeoJsonData, state, selectProvince);
  renderMapPins(map, markersGroup, state, focusOnIHub);

  btnBack.style.display = "flex";

  const regionData = state.database.regions.find(r => r.region_iso === regionIso);
  const regionName = regionData ? regionData.region_name : regionIso;
  sidebarTitle.textContent = `${regionName} iHubs`;

  populateCards();
}

function getRegionLayerBounds(regionIso: string): L.LatLngBounds | null {
  let bounds: L.LatLngBounds | null = null;
  if (regionsLayer) {
    regionsLayer.eachLayer(layer => {
      const feat = (layer as any).feature;
      if (feat && feat.properties?.ISO === regionIso && typeof (layer as any).getBounds === "function") {
        bounds = (layer as any).getBounds();
      }
    });
  }
  return bounds;
}

function resetToNationalView(): void {
  state.activeRegion = null;
  state.activeProvince = null;
  state.activeIHub = null;

  map.setView([12.5, 122.0], 6);

  if (provincesLayer) {
    map.removeLayer(provincesLayer);
    provincesLayer = null;
  }
  renderRegions();
  renderMapPins(map, markersGroup, state, focusOnIHub);

  btnBack.style.display = "none";
  searchInput.value = "";
  sidebarTitle.textContent = "Find an iHub near you";
  infoOverlay.classList.remove("visible");

  populateCards();
}

function selectProvince(provIso: string, provName: string): void {
  state.activeProvince = provIso;
  state.activeIHub = null;

  populateCards();

  const provinceHub = state.database.ihubs.find(h => h.province_iso === provIso);
  openIHubModal(provinceHub);
}

function focusOnIHub(hub: IHub): void {
  state.activeIHub = hub.id;
  state.activeProvince = hub.province_iso;
  state.activeRegion = hub.region_iso;

  if (hub.latitude && hub.longitude) {
    map.setView([hub.latitude, hub.longitude], 9);
    const marker = state.markersMap[hub.id];
    if (marker) marker.openPopup();
  }

  populateCards();
  openIHubModal(hub);
}

function populateCards(filtered: IHub[] | null = null): void {
  populateSidebarCards(
    sidebarContent,
    state.database,
    state.activeRegion,
    state.activeProvince,
    state.activeIHub,
    (regionIso) => selectRegion(regionIso),
    filtered
  );
}

function handleSearch(e: Event): void {
  const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
  if (query === "") {
    populateCards();
    return;
  }

  const filtered = state.database.ihubs.filter(hub =>
    hub.name.toLowerCase().includes(query) ||
    hub.province.toLowerCase().includes(query) ||
    hub.institution.toLowerCase().includes(query) ||
    hub.address.toLowerCase().includes(query)
  );

  populateCards(filtered);
}

async function saveConfig(e: Event): Promise<void> {
  e.preventDefault();
  const inputId = txtSheetId.value.trim();

  if (inputId === "") {
    state.currentSheetId = "";
    showConfigStatus(configStatus, "Resetting to offline demo data...", "warning");
    useFallbackMockData();
    updateDashboardStats(statTotalHubs, statRegionalHubs, statProvincialHubs, statRegionsCovered);
    if (state.activeRegion) {
      selectRegion(state.activeRegion);
    } else {
      resetToNationalView();
    }
    setTimeout(() => {
      showConfigStatus(configStatus, "Successfully reset to offline data.", "success");
    }, 800);
    return;
  }

  showConfigStatus(configStatus, "Connecting to Google Sheets...", "warning");
  try {
    await loadFromSpreadsheet(inputId);
    state.currentSheetId = inputId;
    showConfigStatus(configStatus, "Google Sheets synchronized successfully!", "success");
    updateDashboardStats(statTotalHubs, statRegionalHubs, statProvincialHubs, statRegionsCovered);
    if (state.activeRegion) {
      selectRegion(state.activeRegion);
    } else {
      resetToNationalView();
    }
  } catch (err) {
    showConfigStatus(configStatus, "Sync failed. Check Sheet ID and Sharing settings.", "error");
  }
}

function showLoadingState(): void {
  sidebarContent.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full text-slate-500 py-12">
      <div class="w-8 h-8 border-3 border-slate-200 border-t-brand-blue rounded-full animate-spin mb-3"></div>
      <div class="text-xs font-semibold tracking-wide">Loading Directory...</div>
    </div>
  `;
}
