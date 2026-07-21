// =========================================
// Philippines iHubs Directory Logic Engine
// =========================================

// Province-to-Region mapping dictionary (based on ISO codes from superset GeoJSON)
const provinceToRegionMap = {
  // NCR
  'PH-MNL': 'PH-00',
  // CAR
  'PH-ABR': 'PH-15', 'PH-APA': 'PH-15', 'PH-BEN': 'PH-15', 'PH-IFU': 'PH-15', 'PH-KAL': 'PH-15', 'PH-MOU': 'PH-15',
  // Region I
  'PH-ILN': 'PH-01', 'PH-ILS': 'PH-01', 'PH-LUN': 'PH-01', 'PH-PAN': 'PH-01',
  // Region II
  'PH-BTN': 'PH-02', 'PH-CAG': 'PH-02', 'PH-ISA': 'PH-02', 'PH-NUV': 'PH-02', 'PH-QUI': 'PH-02',
  // Region III
  'PH-AUR': 'PH-03', 'PH-BAN': 'PH-03', 'PH-BUL': 'PH-03', 'PH-NUE': 'PH-03', 'PH-PAM': 'PH-03', 'PH-TAR': 'PH-03', 'PH-ZMB': 'PH-03',
  // Region IV-A
  'PH-BTG': 'PH-40', 'PH-CAV': 'PH-40', 'PH-LAG': 'PH-40', 'PH-QUE': 'PH-40', 'PH-RIZ': 'PH-40',
  // Region IV-B (MIMAROPA)
  'PH-MAD': 'PH-41', 'PH-MDC': 'PH-41', 'PH-MDR': 'PH-41', 'PH-PLW': 'PH-41', 'PH-ROM': 'PH-41',
  // Region V
  'PH-ALB': 'PH-05', 'PH-CAN': 'PH-05', 'PH-CAS': 'PH-05', 'PH-CAT': 'PH-05', 'PH-MAS': 'PH-05', 'PH-SOR': 'PH-05',
  // Region VI (Negros Occidental & Bacolod City moved out to Negros Island Region, see PH-18 below)
  'PH-AKL': 'PH-06', 'PH-ANT': 'PH-06', 'PH-CAP': 'PH-06', 'PH-GUI': 'PH-06', 'PH-ILI': 'PH-06',
  // Region VII (Negros Oriental & Siquijor moved out to Negros Island Region, see PH-18 below)
  'PH-BOH': 'PH-07', 'PH-CEB': 'PH-07', 'PH-MDE': 'PH-07', 'PH-LAP': 'PH-07',
  // Negros Island Region (NIR) - Negros Occidental, Bacolod City, Negros Oriental, Siquijor merged
  'PH-NEC': 'PH-18', 'PH-BCD': 'PH-18', 'PH-NER': 'PH-18', 'PH-SIG': 'PH-18',
  // Region VIII
  'PH-BIL': 'PH-08', 'PH-EAS': 'PH-08', 'PH-LEY': 'PH-08', 'PH-NSA': 'PH-08', 'PH-WSA': 'PH-08', 'PH-SLE': 'PH-08',
  // Region IX
  'PH-ZAN': 'PH-09', 'PH-ZAS': 'PH-09', 'PH-ZSI': 'PH-09',
  // Region X
  'PH-BUK': 'PH-10', 'PH-CAM': 'PH-10', 'PH-LAN': 'PH-10', 'PH-MSC': 'PH-10', 'PH-MSR': 'PH-10',
  // Region XI
  'PH-COM': 'PH-11', 'PH-DAV': 'PH-11', 'PH-DAS': 'PH-11', 'PH-DAO': 'PH-11',
  // Region XII
  'PH-NCO': 'PH-12', 'PH-SAR': 'PH-12', 'PH-SCO': 'PH-12', 'PH-SUK': 'PH-12',
  // Region XIII (Caraga)
  'PH-AGN': 'PH-13', 'PH-AGS': 'PH-13', 'PH-SUN': 'PH-13', 'PH-SUR': 'PH-13',
  // BARMM (ARMM)
  'PH-BAS': 'PH-14', 'PH-LAS': 'PH-14', 'PH-MAG': 'PH-14', 'PH-SLU': 'PH-14', 'PH-TAW': 'PH-14'
};

// Application State
let map;
let regionsGeoJsonData;
let provincesGeoJsonData;

let regionsLayer;
let provincesLayer;
let markersGroup;

let activeRegion = null;
let activeProvince = null;
let activeIHub = null;
let showAllPinsNationwide = false; // add near your other state variables (activeRegion, activeProvince, etc.)

let database = { regions: [], ihubs: [] };
let markersMap = {}; // Maps iHub ID -> Leaflet marker instance

// Fallback logic
const DEFAULT_SHEET_ID = "1fI0WJ9A4qU3LAL4zG6YPdpR8U7NdClwtIlw2mXeSerA"; // ← put your real Sheet ID here
let currentSheetId = DEFAULT_SHEET_ID; // was: localStorage.getItem("ph_ihubs_sheet_id") || ""
let dbSource = "mock"; // "live" or "mock"

// DOM Elements
let btnBack, searchInput, sidebarTitle, sidebarContent, infoOverlay, dbBadge;
let statTotalHubs, statRegionalHubs, statProvincialHubs, statRegionsCovered;
let configDrawer, btnConfigOpen, btnConfigClose, drawerBackdrop, configForm, txtSheetId, configStatus;

// Document Ready Init
document.addEventListener("DOMContentLoaded", () => {
  initDOMElements();
  initMap();
  loadData();
});

function initDOMElements() {
  btnBack = document.getElementById("btn-back");
  searchInput = document.getElementById("search-input");
  sidebarTitle = document.getElementById("sidebar-title");
  sidebarContent = document.getElementById("sidebar-content");
  infoOverlay = document.getElementById("info-overlay");
  dbBadge = document.getElementById("db-source-badge");

  statTotalHubs = document.getElementById("stat-total-hubs");
  statRegionalHubs = document.getElementById("stat-regional-hubs");
  statProvincialHubs = document.getElementById("stat-provincial-hubs");
  statRegionsCovered = document.getElementById("stat-regions-covered");

  // Config slide-over drawer
  configDrawer = document.getElementById("config-drawer");
  btnConfigOpen = document.getElementById("btn-config-open");
  btnConfigClose = document.getElementById("btn-config-close");
  drawerBackdrop = document.getElementById("drawer-backdrop");
  configForm = document.getElementById("config-form");
  txtSheetId = document.getElementById("txt-sheet-id");
  configStatus = document.getElementById("config-status");

  // Setup Back navigation
  btnBack.addEventListener("click", resetToNationalView);

  // Setup Search filter
  searchInput.addEventListener("input", handleSearch);

  // Setup config drawer events
  btnConfigOpen.addEventListener("click", openConfigDrawer);
  btnConfigClose.addEventListener("click", closeConfigDrawer);
  drawerBackdrop.addEventListener("click", closeConfigDrawer);
  configForm.addEventListener("submit", saveConfig);

  txtSheetId.value = currentSheetId;

  document.getElementById("ihub-modal-close").addEventListener("click", closeIHubModal);
  document.getElementById("chk-show-all-pins").addEventListener("change", (e) => {
  showAllPinsNationwide = e.target.checked;
  renderMapPins();
});
}

function initMap() {
  // Center of the Philippines
  map = L.map("map", {
    zoomControl: false,
    minZoom: 5.5,
    maxZoom: 12,
    maxBounds: [[4.0, 114.0], [22.0, 128.0]],
    maxBoundsViscosity: 1.0
  });

  map.setView([12.5, 122.0], 6);

  // Add zoom control in top-right
  L.control.zoom({ position: "topright" }).addTo(map);

  markersGroup = L.layerGroup().addTo(map);

  // --- Fix: Leaflet caches the #map container's pixel size at init time.
  // Because #map now sits in a flexbox layout (next to the info panel and
  // sidebar), its final size can shift slightly after first paint — e.g.
  // once web fonts finish loading and the info panel text reflows. Without
  // telling Leaflet to re-measure, the map renders shifted/off-center even
  // though its container is sized correctly. invalidateSize() fixes that.
  window.addEventListener("load", () => map.invalidateSize());
  window.addEventListener("resize", () => map.invalidateSize());
  setTimeout(() => map.invalidateSize(), 250);

  if (window.ResizeObserver) {
    const mapResizeObserver = new ResizeObserver(() => map.invalidateSize());
    mapResizeObserver.observe(document.getElementById("map-section"));
  }
}

// Data loading manager (fetches local GeoJSON and retrieves Google Sheet/mock database)
async function loadData() {
  try {
    showLoadingState();

    // 1. Fetch GeoJSON layers (use remote CDN if loaded via file:// protocol to bypass CORS restrictions)
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

    // 1b. Merge Negros Occidental, Negros Oriental & Siquijor into one
    //     "Negros Island Region" polygon on the regions layer.
    mergeNegrosIslandRegion();

    // 2. Load database (Spreadsheet or Fallback mockData)
    if (currentSheetId) {
      await fetchFromGoogleSheets(currentSheetId);
    } else {
      useFallbackMockData();
    }

    // 3. Render map & update dashboard
    updateDashboardStats();
    renderRegionsLayer();
    resetToNationalView();

  } catch (error) {
    console.error("Error loading application data:", error);
    showErrorState("Failed to load map data. Please check your local files.");
  }
}

// Fetch Google Sheet data as CSV using PapaParse
async function fetchFromGoogleSheets(sheetId) {
  try {
    const ihubsUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=iHubs`;
    const regionsUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Regions`;

    const [ihubsRes, regionsRes] = await Promise.all([
      fetch(ihubsUrl),
      fetch(regionsUrl)
    ]);

    if (!ihubsRes.ok || !regionsRes.ok) {
      throw new Error("Spreadsheet fetch failed. Check sharing settings.");
    }

    const ihubsCsv = await ihubsRes.text();
    const regionsCsv = await regionsRes.text();

    const parsedIHubs = parseCSV(ihubsCsv);
    const parsedRegions = parseCSV(regionsCsv);

    if (parsedIHubs.length === 0 || parsedRegions.length === 0) {
      throw new Error("Fetched tables are empty or formatted incorrectly.");
    }

    // Assign to active database
    database.ihubs = parsedIHubs;
    database.regions = parsedRegions;
    dbSource = "live";

    dbBadge.textContent = "Live Google Sheet";
    dbBadge.className = "db-source-badge live";

  } catch (error) {
    console.warn("Google Sheet sync failed. Falling back to local mock data.", error);
    useFallbackMockData();
    showConfigWarning("Spreadsheet synchronization failed. Displaying offline demo data.");
  }
}

function parseCSV(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  });
  return result.data;
}

function useFallbackMockData() {
  database.ihubs = window.iHubDatabase.ihubs;
  database.regions = window.iHubDatabase.regions;
  dbSource = "mock";

  dbBadge.textContent = "Demo Offline Mode";
  dbBadge.className = "db-source-badge mock";
}

// Builds a merged "Negros Island Region" (NIR) polygon out of Negros Occidental,
// Negros Oriental, and Siquijor, adds it to regionsGeoJsonData as ISO "PH-18",
// and clips those three provinces out of the existing Region VI (PH-06) and
// Region VII (PH-07) polygons so they don't get drawn twice.
// Requires Turf.js (https://cdnjs.cloudflare.com/ajax/libs/Turf.js/6.5.0/turf.min.js)
// to be loaded on the page before this script runs.
function mergeNegrosIslandRegion() {
  if (typeof turf === "undefined") {
    console.warn("Turf.js not found — skipping Negros Island Region merge. " +
      "Add <script src='https://cdnjs.cloudflare.com/ajax/libs/Turf.js/6.5.0/turf.min.js'></script> before app.js.");
    return;
  }

  const NIR_PROVINCE_ISOS = ["PH-NEC", "PH-NER", "PH-SIG", "PH-BCD"];

  const provinceFeatures = provincesGeoJsonData.features.filter(f =>
    NIR_PROVINCE_ISOS.includes(f.properties.ISO)
  );

  if (provinceFeatures.length < 4) {
    console.warn("mergeNegrosIslandRegion: could not find all 4 provinces in provincesGeoJsonData.", provinceFeatures.map(f => f.properties.ISO));
    return;
  }

  // 1. Union the three province shapes into a single Negros Island Region polygon
  let nirGeometry = provinceFeatures[0];
  for (let i = 1; i < provinceFeatures.length; i++) {
    try {
      nirGeometry = turf.union(nirGeometry, provinceFeatures[i]);
    } catch (err) {
      console.warn("turf.union failed while merging Negros Island Region:", err);
      return;
    }
  }

  const nirFeature = {
    type: "Feature",
    properties: {
      ISO: "PH-18",
      NAME_1: "Negros Island Region"
    },
    geometry: nirGeometry.geometry
  };

  // 2. Clip the same provinces out of the Region VI / Region VII polygons
  //    (feature.properties.ISO on the regions geojson is the region code, e.g. PH-06 / PH-07)
  regionsGeoJsonData.features = regionsGeoJsonData.features.map(regionFeature => {
    const regionIso = regionFeature.properties.ISO;
    if (regionIso !== "PH-06" && regionIso !== "PH-07") {
      return regionFeature;
    }

  const provincesToRemove = regionIso === "PH-06"
    ? provinceFeatures.filter(p => ["PH-NEC", "PH-BCD"].includes(p.properties.ISO))
    : provinceFeatures.filter(p => ["PH-NER", "PH-SIG"].includes(p.properties.ISO));

    let clipped = regionFeature;
    for (const prov of provincesToRemove) {
      try {
        const result = turf.difference(clipped, prov);
        if (result) clipped = result;
      } catch (err) {
        console.warn(`turf.difference failed while clipping ${prov.properties.ISO} from ${regionIso}:`, err);
      }
    }
    // Preserve original region properties, keep updated geometry
    return { ...regionFeature, geometry: clipped.geometry };
  });

  // 3. Add the new merged region to the regions layer data
  regionsGeoJsonData.features.push(nirFeature);
}

// Renders the region SVG overlay
function renderRegionsLayer() {
  if (regionsLayer) {
    map.removeLayer(regionsLayer);
  }

  regionsLayer = L.geoJSON(regionsGeoJsonData, {
    style: styleRegionFeature,
    onEachFeature: onEachRegionFeature
  }).addTo(map);
}

function styleRegionFeature(feature) {
  const isSelected = activeRegion !== null && feature.properties.ISO === activeRegion;
  const isDimmed = activeRegion !== null && feature.properties.ISO !== activeRegion;

  return {
    fillColor: isSelected ? "transparent" : (isDimmed ? "#d0e6ff" : "var(--color-region-default)"),
    fillOpacity: isSelected ? 0 : (isDimmed ? 0.6 : 0.85),
    color: isSelected ? "transparent" : "var(--color-region-border)",
    weight: isSelected ? 0 : 1,
    className: "region-path" + (isSelected ? " active" : "")
  };
}

function onEachRegionFeature(feature, layer) {
  layer.on({
    mouseover: (e) => {
      if (activeRegion === null) {
        highlightRegion(feature.properties, e.target);
      }
    },
    mouseout: (e) => {
      if (activeRegion === null) {
        unhighlightRegion(e.target);
      }
    },
    click: () => {
      if (feature.properties.ISO !== activeRegion) {
        selectRegion(feature.properties.ISO, layer.getBounds());
      }
    }
  });
}

// Renders detailed province SVG overlay inside a clicked region
function renderProvincesLayer() {
  if (provincesLayer) {
    map.removeLayer(provincesLayer);
  }

  provincesLayer = L.geoJSON(provincesGeoJsonData, {
    filter: (feature) => {
      // Show only provinces belonging to active region
      const provIso = feature.properties.ISO;
      const regIso = provinceToRegionMap[provIso];
      return regIso === activeRegion;
    },
    style: styleProvinceFeature,
    onEachFeature: onEachProvinceFeature
  }).addTo(map);
}

function styleProvinceFeature(feature) {
  const provIso = feature.properties.ISO;
  const isActive = activeProvince === provIso;
  
  // Assign green shades based on ISO name hashes to distinguish provinces
  const hash = provIso.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = hash % 2 === 0 ? "var(--color-province-default-1)" : "var(--color-province-default-2)";

  return {
    fillColor: color,
    fillOpacity: isActive ? 1.0 : 0.85,
    color: isActive ? "#ffffff" : "var(--color-province-border)",
    weight: isActive ? 1.75 : 0.75,
    className: "province-path" + (isActive ? " active" : "")
  };
}

function onEachProvinceFeature(feature, layer) {
  layer.on({
    mouseover: () => {
      // Optional highlight effect
    },
    click: () => {
      selectProvince(feature.properties.ISO, feature.properties.NAME_1);
    }
  });
}

// Interactive highlighting (Hover Region)
function highlightRegion(props, layer) {
  layer.setStyle({
    fillColor: "var(--color-region-hover)",
    fillOpacity: 0.95
  });

  // Calculate stats
  const count = getRegionIHubsCount(props.ISO);
  const regionDbInfo = database.regions.find(r => r.region_iso === props.ISO);

  // Update Glassmorphic Info Overlay (Bottom Left)
  document.getElementById("info-label").textContent = props.NAME_1;
  document.getElementById("info-badge-num").textContent = count;
  
  const detailsEl = document.getElementById("info-details-rows");
  if (regionDbInfo) {
    detailsEl.innerHTML = `
      <div class="info-row"><span class="info-row-key">Focal Person:</span><span class="info-row-val">${regionDbInfo.focal_person || "N/A"}</span></div>
      <div class="info-row"><span class="info-row-key">Position:</span><span class="info-row-val">${regionDbInfo.position || "N/A"}</span></div>
      <div class="info-row"><span class="info-row-key">Contact No:</span><span class="info-row-val">${regionDbInfo.contact_number || "N/A"}</span></div>
      <div class="info-row"><span class="info-row-key">Email:</span><span class="info-row-val">${regionDbInfo.email || "N/A"}</span></div>
    `;
  } else {
    detailsEl.innerHTML = `
      <div class="info-row"><span class="info-row-key">Focal Person:</span><span class="info-row-val">N/A</span></div>
      <div class="info-row"><span class="info-row-key">Contact No:</span><span class="info-row-val">N/A</span></div>
    `;
  }

  infoOverlay.classList.add("visible");
}

function unhighlightRegion(layer) {
  if (activeRegion === null) {
    regionsLayer.resetStyle(layer);
    infoOverlay.classList.remove("visible");
  }
}

// Selection & Navigation Actions
function selectRegion(regionIso, bounds) {
  activeRegion = regionIso;
  
  // Smoothly zoom in to the selected region
  map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8.5 });

  // Update Region styling (fade out active region, dim others)
  regionsLayer.eachLayer(layer => {
    regionsLayer.resetStyle(layer);
  });

  // Load Provinces layer and Pins
  renderProvincesLayer();
  renderMapPins();

  // Populate UI panels
  btnBack.style.display = "flex";
  
  const regionData = database.regions.find(r => r.region_iso === regionIso);
  const regionName = regionData ? regionData.region_name : regionIso;
  sidebarTitle.textContent = `${regionName} iHubs`;

  populateSidebarCards();
}

function resetToNationalView() {
  activeRegion = null;
  activeProvince = null;
  activeIHub = null;
  let showAllPinsNationwide = false; // add near your other state variables (activeRegion, activeProvince, etc.)
  


  // Zoom back out to Philippines map view
  map.setView([12.5, 122.0], 6);

  // Reset SVG Layers
  if (provincesLayer) {
    map.removeLayer(provincesLayer);
    provincesLayer = null;
  }
  regionsLayer.eachLayer(layer => {
    regionsLayer.resetStyle(layer);
  });

  // Clear Map Pins
  // markersGroup.clearLayers();
  // markersMap = {};

  renderMapPins();

  // Reset UI elements
  btnBack.style.display = "none";
  searchInput.value = "";
  sidebarTitle.textContent = "Find an iHub near you";
  infoOverlay.classList.remove("visible");

  populateSidebarCards();
}

function selectProvince(provIso, provName) {
  console.log("selectProvince called with", provIso, provName);
  activeProvince = provIso;
  activeIHub = null;

  // Highlight province polygon on the map
  if (provincesLayer) {
    provincesLayer.eachLayer(layer => {
      provincesLayer.resetStyle(layer);
    });
  }

  // Focus and zoom sidebar to the matching cards
  populateSidebarCards();

  // Pulse and bounce matching map pins
  highlightMapPinsForProvince(provIso);

  const provinceHub = database.ihubs.find(h => h.province_iso === provIso);
  console.log("found hub:", provinceHub);
  openIHubModal(provinceHub);
}

function openIHubModal(hub) {

  console.log("openIHubModal called with", hub);

  if (!hub) return;

  document.getElementById("ihub-modal-img").src = hub.image_url || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80";
  document.getElementById("ihub-modal-img").alt = hub.name;
  document.getElementById("ihub-modal-title").textContent = hub.name;
  document.getElementById("ihub-modal-address").textContent = hub.address;
  document.getElementById("ihub-modal-launch-date").textContent = hub.launch_date || "N/A";
  document.getElementById("ihub-modal-focal").textContent = hub.focal_person || "N/A";
  document.getElementById("ihub-modal-contact").textContent = hub.contact_number || "N/A";
  document.getElementById("ihub-modal-email").textContent = hub.email || "N/A";
  document.getElementById("ihub-modal-connectivity").textContent = hub.connectivity_status || "N/A";
  document.getElementById("ihub-modal-isp").textContent = hub.isp || "N/A";
  document.getElementById("ihub-modal-ict").textContent = hub.ict_assistance || "N/A";

  document.getElementById("ihub-modal-overlay").classList.add("visible");
}

function closeIHubModal() {
  document.getElementById("ihub-modal-overlay").classList.remove("visible");
}

// Renders the pulsing animated custom markers for active region's iHubs
function renderMapPins() {
  markersGroup.clearLayers();
  markersMap = {};

  // const regionHubs = database.ihubs.filter(hub => hub.region_iso === activeRegion);
  let regionHubs = [];
  if (activeRegion) {
    regionHubs = database.ihubs.filter(hub => hub.region_iso === activeRegion);
  } else if (showAllPinsNationwide) {
    regionHubs = database.ihubs; // toggle is on at national view → show everything
  }
  // else: no active region and toggle off → regionHubs stays empty

  regionHubs.forEach(hub => {
    if (!hub.latitude || !hub.longitude) return;

    const typeClass = hub.type === "Regional iHub" ? "regional" : "provincial";

    // Custom Teardrop SVG Marker with pulsing ring beneath it
    const pinIcon = L.divIcon({
      className: "custom-pin-container",
      html: `
        <div class="pin-marker ${typeClass}"></div>
        <div class="pin-pulse ${typeClass}"></div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 28] // Teardrop tip sits at the location
    });

    const marker = L.marker([hub.latitude, hub.longitude], { icon: pinIcon })
      .addTo(markersGroup)
      .on("click", () => {
        focusOnIHub(hub.id);
      });

    // Add marker info binding
    const popupContent = `
      <div style="font-family: var(--font-body); padding: 4px;">
        <h4 style="font-family: var(--font-title); font-size: 14px; font-weight: 800; color: var(--color-dark-blue); margin-bottom: 2px;">${hub.name}</h4>
        <p style="font-size: 11px; font-weight: 600; color: var(--color-primary-blue); margin-bottom: 4px;">${hub.type}</p>
        <p style="font-size: 11px; color: var(--color-text-muted); line-height: 1.3;">${hub.institution}</p>
      </div>
    `;
    marker.bindPopup(popupContent, { offset: L.point(0, -20) });

    markersMap[hub.id] = marker;
  });
}

function highlightMapPinsForProvince(provIso) {
  // Loop markersMap and toggle bounce/pulse animations
  database.ihubs.forEach(hub => {
    const marker = markersMap[hub.id];
    if (!marker) return;

    const element = marker.getElement();
    if (!element) return;

    if (hub.province_iso === provIso) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

// Side Panel Card Populator
function populateSidebarCards(filteredHubs = null) {
  sidebarContent.innerHTML = "";

   // National view with no search active → show region buttons instead of a hub list
  if (filteredHubs === null && !activeRegion) {
    renderRegionButtonsGrid();
    return;
  }

  // 1. Get hubs list
  let hubsToShow = [];
  if (filteredHubs !== null) {
    hubsToShow = filteredHubs;
  } else if (activeRegion) {
    hubsToShow = database.ihubs.filter(hub => hub.region_iso === activeRegion);
  }

  // 2. Render cards
  if (hubsToShow.length === 0) {
    sidebarContent.innerHTML = `
      <div class="empty-state">
        <svg class="empty-state-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <div class="empty-state-title">No Innovation Hubs found</div>
        <div class="empty-state-desc">Try modifying your search or select another region.</div>
      </div>
    `;
    return;
  }

  // Group by province to match Mall Directory card listings
  const grouped = groupBy(hubsToShow, "province");

  Object.keys(grouped).forEach(provName => {
    const provinceIso = grouped[provName][0].province_iso;
    
    // Create header segment
    const sectionHeader = document.createElement("div");
    sectionHeader.className = "sidebar-province-header" + (activeProvince === provinceIso ? " active" : "");
    sectionHeader.style.cssText = "font-family: var(--font-title); font-size: 14px; font-weight: 750; color: var(--color-text-muted); margin-top: 12px; margin-bottom: 6px; padding: 0 4px;";
    sectionHeader.textContent = provName.toUpperCase();
    sidebarContent.appendChild(sectionHeader);

    grouped[provName].forEach(hub => {
      const card = document.createElement("div");
      card.className = "ihub-card" + (activeIHub === hub.id ? " active" : "");
      card.id = `card-${hub.id}`;

      const badgeClass = hub.type === "Regional iHub" ? "regional" : "provincial";
      const imageUrl = hub.image_url || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=120&q=80";

      card.innerHTML = `
        <div class="ihub-card-details">
          <div>
            <div class="ihub-card-title">${hub.name}</div>
            <div class="ihub-card-inst">${hub.institution}</div>
            <div class="ihub-card-addr">${hub.address}</div>
          </div>
          <div class="ihub-card-badge ${badgeClass}">${hub.type}</div>
        </div>
        <img class="ihub-card-img" src="${imageUrl}" alt="${hub.name}" onerror="this.src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=120&q=80'">
      `;

      card.addEventListener("click", () => {
        // focusOnIHub(hub.id);
        openIHubModal(hub);
      });

      sidebarContent.appendChild(card);
    });
  });
}

function focusOnIHub(hubId) {
  activeIHub = hubId;
  const hub = database.ihubs.find(h => h.id === hubId);
  if (!hub) return;

  // Set active province and highlight map polygon
  activeProvince = hub.province_iso;
  activeRegion = hub.region_iso;

  // Zoom map to the marker coordinates
  if (hub.latitude && hub.longitude) {
    map.setView([hub.latitude, hub.longitude], 9);
    
    // Open marker popup
    const marker = markersMap[hubId];
    if (marker) {
      marker.openPopup();
    }
  }

  // Trigger sidebar cards refresh and highlight matching pins
  populateSidebarCards();
  highlightMapPinsForProvince(hub.province_iso);

  // Scroll matching card into view in sidebar
  const cardElement = document.getElementById(`card-${hubId}`);
  if (cardElement) {
    cardElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// Search & Filtering logic
function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  if (query === "") {
    populateSidebarCards();
    return;
  }

  // Search across names, provinces, addresses, and institutions
  const filtered = database.ihubs.filter(hub => 
    hub.name.toLowerCase().includes(query) ||
    hub.province.toLowerCase().includes(query) ||
    hub.institution.toLowerCase().includes(query) ||
    hub.address.toLowerCase().includes(query)
  );

  populateSidebarCards(filtered);
}

// Dashboard statistics count updates
function updateDashboardStats() {
  // const total = database.ihubs.length;
  // const regionalCount = database.ihubs.filter(h => h.type === "Regional iHub").length;
  // const provincialCount = database.ihubs.filter(h => h.type === "Provincial iHub").length;
  // const provincialCount = database.ihubs.filter(h => h.type === "Provincial iHub").length;

  const total = 59;          
  const regionalCount = 5;   
  const provincialCount = 54; 
  const regionsCovered = 18; 


  // Count distinct regions that actually have at least one iHub
  // const regionsCovered = new Set(database.ihubs.map(h => h.region_iso)).size;

  // Animate counters
  animateCounter(statTotalHubs, total);
  animateCounter(statRegionalHubs, regionalCount);
  animateCounter(statProvincialHubs, provincialCount);
  animateCounter(statRegionsCovered, regionsCovered);
}

function animateCounter(element, targetValue) {
  let currentValue = 0;
  const duration = 1200; // ms
  const stepTime = Math.abs(Math.floor(duration / targetValue));
  
  // Guard for divide by zero or negative stepTime
  const delay = isNaN(stepTime) || stepTime < 10 ? 15 : stepTime;

  const timer = setInterval(() => {
    currentValue += 1;
    element.textContent = currentValue;
    if (currentValue >= targetValue) {
      element.textContent = targetValue;
      clearInterval(timer);
    }
  }, delay);
}

// Database configuration settings
function openConfigDrawer() {
  configDrawer.classList.add("open");
  drawerBackdrop.classList.add("visible");
  txtSheetId.value = currentSheetId;
  clearConfigStatus();
}

function closeConfigDrawer() {
  configDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("visible");
}

async function saveConfig(e) {
  e.preventDefault();
  const inputId = txtSheetId.value.trim();

  if (inputId === "") {
    // Reset to local mock database
    // localStorage.removeItem("ph_ihubs_sheet_id");
    currentSheetId = "";
    showConfigStatus("Resetting to offline demo data...", "warning");
    
    useFallbackMockData();
    updateDashboardStats();
    if (activeRegion) {
      selectRegion(activeRegion, map.getBounds());
    } else {
      resetToNationalView();
    }
    
    setTimeout(() => {
      showConfigStatus("Successfully reset to offline data.", "success");
    }, 800);
    return;
  }

  showConfigStatus("Connecting to Google Sheets...", "warning");

  try {
    // Validate sheet by loading first
    await fetchFromGoogleSheets(inputId);
    
    // Save to local storage
    localStorage.setItem("ph_ihubs_sheet_id", inputId);
    currentSheetId = inputId;
    
    showConfigStatus("Google Sheets synchronized successfully!", "success");
    
    // Refresh layers
    updateDashboardStats();
    if (activeRegion) {
      renderProvincesLayer();
      renderMapPins();
      populateSidebarCards();
    } else {
      resetToNationalView();
    }

  } catch (error) {
    showConfigStatus("Sync failed. Check Sheet ID and Sharing settings.", "error");
  }
}

// Status utility functions
function showConfigStatus(message, type) {
  configStatus.className = `config-status ${type}`;
  configStatus.innerHTML = `<span>${message}</span>`;
  configStatus.style.display = "block";
}

function clearConfigStatus() {
  configStatus.style.display = "none";
}

function showConfigWarning(message) {
  // Show standard warning alert in config status
  showConfigStatus(message, "error");
}

function showLoadingState() {
  sidebarContent.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--color-text-muted);">
      <div style="border: 3px solid #f3f3f3; border-top: 3px solid var(--color-primary-blue); border-radius: 50%; width: 28px; height: 28px; animation: spin 1s linear infinite; margin-bottom: 12px;"></div>
      <div style="font-size: 13px; font-weight: 500;">Loading Directory...</div>
    </div>
  `;
}

function showErrorState(message) {
  sidebarContent.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-title" style="color: var(--color-red);">Connection Error</div>
      <div class="empty-state-desc">${message}</div>
    </div>
  `;
}

// Helpers
function getRegionIHubsCount(regionIso) {
  return database.ihubs.filter(hub => hub.region_iso === regionIso).length;
}

function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, {});
}

// Inject keyframe animation for loader spin
const spinStyle = document.createElement("style");
spinStyle.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinStyle);

function getRegionLayerBounds(regionIso) {
  let bounds = null;
  regionsLayer.eachLayer(layer => {
    if (layer.feature && layer.feature.properties.ISO === regionIso) {
      bounds = layer.getBounds();
    }
  });
  return bounds;
}

function renderRegionButtonsGrid() {
  const gridWrap = document.createElement("div");
  gridWrap.className = "region-buttons-grid";

  database.regions.forEach(region => {
    const count = getRegionIHubsCount(region.region_iso);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "region-select-btn";
    btn.innerHTML = `
      <span class="region-select-btn-name">${region.region_name}</span>
      <svg class="region-select-btn-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;

    btn.addEventListener("click", () => {
      const bounds = getRegionLayerBounds(region.region_iso);
      if (bounds) {
        selectRegion(region.region_iso, bounds);
      } else {
        console.warn(`No polygon found for ${region.region_iso}; showing cards without map zoom.`);
        activeRegion = region.region_iso;
        btnBack.style.display = "flex";
        sidebarTitle.textContent = `${region.region_name} iHubs`;
        populateSidebarCards();
      }
    });

    gridWrap.appendChild(btn);
  });

  sidebarContent.appendChild(gridWrap);
}