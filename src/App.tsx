import { useEffect, useState, useCallback } from "react";
import type { GeoJsonCollection, Database, IHub, DBSource, CustomFeatureProperties } from "./types";
import { mockRegions, mockIHubs } from "./data/mockData";
import { mergeNegrosIslandRegion } from "./utils/geo";
import { fetchFromSupabase } from "./utils/supabase";
import Header from "./components/Header";
import InfoPanel from "./components/InfoPanel";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import IHubModal from "./components/IHubModal";

interface HoverInfo {
  visible: boolean;
  label: string;
  count: number;
  iso: string | null;
}

export default function App() {
  const [regionsGeoJsonData, setRegionsGeoJsonData] = useState<GeoJsonCollection | null>(null);
  const [provincesGeoJsonData, setProvincesGeoJsonData] = useState<GeoJsonCollection | null>(null);

  const [database, setDatabase] = useState<Database>({ regions: [], ihubs: [] });
  const [dbSource, setDbSource] = useState<DBSource>("mock");

  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeProvince, setActiveProvince] = useState<string | null>(null);
  const [activeIHub, setActiveIHub] = useState<string | null>(null);
  const [showAllPinsNationwide, setShowAllPinsNationwide] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [modalHub, setModalHub] = useState<IHub | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>({ visible: false, label: "", count: 0, iso: null });
  const [loading, setLoading] = useState(true);

  // ----- Initial data load (geojson + Supabase, mirrors loadData() in main.ts) -----
  useEffect(() => {
    async function loadData() {
      try {
        const isLocalFile = window.location.protocol === "file:";
        const regionsUrl = isLocalFile
          ? "https://raw.githubusercontent.com/apache/superset/master/superset-frontend/plugins/legacy-plugin-chart-country-map/src/countries/philippines_regions.geojson"
          : "/data/philippines_regions.geojson";
        const provincesUrl = isLocalFile
          ? "https://raw.githubusercontent.com/apache/superset/master/superset-frontend/plugins/legacy-plugin-chart-country-map/src/countries/philippines.geojson"
          : "/data/philippines_provinces.geojson";

        const [regionsRes, provincesRes] = await Promise.all([fetch(regionsUrl), fetch(provincesUrl)]);
        const regionsJson: GeoJsonCollection = await regionsRes.json();
        const provincesJson: GeoJsonCollection = await provincesRes.json();

        mergeNegrosIslandRegion(regionsJson, provincesJson);

        setRegionsGeoJsonData(regionsJson);
        setProvincesGeoJsonData(provincesJson);

        try {
          const data = await fetchFromSupabase();
          setDatabase(data);
          setDbSource("live");
        } catch (err) {
          console.warn("Supabase load failed, using fallback mock data.", err);
          setDatabase({ regions: mockRegions, ihubs: mockIHubs });
          setDbSource("mock");
        }
      } catch (error) {
        console.error("Error loading application data:", error);
        setDatabase({ regions: mockRegions, ihubs: mockIHubs });
        setDbSource("mock");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ----- Handlers (mirror the functions in main.ts) -----

  const resetToNationalView = useCallback(() => {
    setActiveRegion(null);
    setActiveProvince(null);
    setActiveIHub(null);
    setSearchQuery("");
    setHoverInfo({ visible: false, label: "", count: 0, iso: null });
  }, []);

  const selectRegion = useCallback((regionIso: string) => {
    setActiveRegion(regionIso);
    setHoverInfo({ visible: false, label: "", count: 0, iso: null });
  }, []);

  const selectProvince = useCallback(
    (provIso: string) => {
      setActiveProvince(provIso);
      setActiveIHub(null);
      const provinceHub = database.ihubs.find((h) => h.province_iso === provIso);
      if (provinceHub) setModalHub(provinceHub);
    },
    [database]
  );

  const focusOnIHub = useCallback((hub: IHub) => {
    setActiveIHub(hub.id);
    setActiveProvince(hub.province_iso);
    setActiveRegion(hub.region_iso);
    setModalHub(hub);
  }, []);

  const handleRegionHover = useCallback(
    (props: CustomFeatureProperties) => {
      const count = database.ihubs.filter((hub) => hub.region_iso === props.ISO).length;
      setHoverInfo({ visible: true, label: props.NAME_1, count, iso: props.ISO });
    },
    [database]
  );

  const handleRegionLeave = useCallback(() => {
    setHoverInfo((prev) => ({ ...prev, visible: false }));
  }, []);

  const sidebarTitle = activeRegion
    ? `${database.regions.find((r) => r.region_iso === activeRegion)?.region_name || activeRegion} iHubs`
    : "Find an iHub near you";

  return (
    <div className="h-full flex flex-col bg-slate-50 text-slate-800 font-body antialiased selection:bg-brand-blue selection:text-white">
      <Header dbSource={dbSource} />

      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative">
        <InfoPanel />

        <MapView
          regionsGeoJsonData={regionsGeoJsonData}
          provincesGeoJsonData={provincesGeoJsonData}
          database={database}
          activeRegion={activeRegion}
          activeProvince={activeProvince}
          activeIHub={activeIHub}
          showAllPinsNationwide={showAllPinsNationwide}
          onToggleShowAllPins={setShowAllPinsNationwide}
          onRegionSelect={selectRegion}
          onProvinceSelect={selectProvince}
          onHubClick={focusOnIHub}
          hoverInfo={hoverInfo}
          onRegionHover={handleRegionHover}
          onRegionLeave={handleRegionLeave}
        />

        <Sidebar
          database={database}
          activeRegion={activeRegion}
          activeProvince={activeProvince}
          activeIHub={activeIHub}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRegionSelect={selectRegion}
          onHubClick={(hub) => setModalHub(hub)}
          onBack={resetToNationalView}
          sidebarTitle={sidebarTitle}
        />
      </div>

      <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs font-medium text-slate-500">Powered by a Growing Innovation Ecosystem</span>
        <div className="flex flex-wrap items-center gap-6 opacity-80">
          <img src="/assets/wadwhaniLogo.png" alt="Wadhwani Foundation" className="h-6 w-auto object-contain" />
          <img src="/assets/pcci_logo.webp" alt="Philippine Chamber of Commerce and Industry" className="h-7 w-auto object-contain" />
          <img src="/assets/devcon_logo.png" alt="DEVCON" className="h-5 w-auto object-contain" />
          <img src="/assets/leaveanestlogo.webp" alt="Leave a Nest" className="h-5 w-auto object-contain" />
          <img src="/assets/gdap_logo.webp" alt="Game Developers Association of the Philippines" className="h-6 w-auto object-contain" />
        </div>
      </footer>

      <IHubModal hub={modalHub} onClose={() => setModalHub(null)} />

      {loading && (
        <div className="fixed inset-0 z-[60] bg-white/70 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border-3 border-slate-200 border-t-brand-blue rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
