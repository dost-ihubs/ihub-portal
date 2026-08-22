import { useEffect, useState, useCallback } from "react";
import type { GeoJsonCollection, Database, IHub, DBSource, CustomFeatureProperties } from "./types";
import { mockRegions, mockIHubs } from "./data/mockData";
import { mergeNegrosIslandRegion } from "./utils/geo";
import { fetchFromSupabase } from "./utils/supabase";
import Header, { type Page } from "./components/Header";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import IHubModal from "./components/IHubModal";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ProgramsPage from "./pages/ProgramsPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import FindPage from "./pages/FindPage";
import NewsPage from "./pages/NewsPage";
import ArticlePage from "./pages/ArticlePage";
import AdminPage from "./pages/AdminPage";

interface HoverInfo {
  visible: boolean;
  label: string;
  count: number;
  iso: string | null;
}

export default function App() {
  const [regionsGeoJsonData, setRegionsGeoJsonData] = useState<GeoJsonCollection | null>(null);
  const [provincesGeoJsonData, setProvincesGeoJsonData] = useState<GeoJsonCollection | null>(null);

  const [database, setDatabase] = useState<Database>({ regions: [], ihubs: [], news: [] });
  const [dbSource, setDbSource] = useState<DBSource>("mock");

  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeProvince, setActiveProvince] = useState<string | null>(null);
  const [activeIHub, setActiveIHub] = useState<string | null>(null);
  const [showAllPinsNationwide, setShowAllPinsNationwide] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [modalHub, setModalHub] = useState<IHub | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>({ visible: false, label: "", count: 0, iso: null });
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<Page>("home");
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const navigate = useCallback((page: Page, articleId?: string) => {
    setActivePage(page);
    setActiveArticleId(articleId ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
          setDatabase({ regions: mockRegions, ihubs: mockIHubs, news: [] });
          setDbSource("mock");
        }
      } catch (error) {
        console.error("Error loading application data:", error);
        setDatabase({ regions: mockRegions, ihubs: mockIHubs, news: [] });
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
      <Header dbSource={dbSource} activePage={activePage} onNavigate={navigate} />

      <div className="flex-1 overflow-y-auto">
        {activePage === "about" && <AboutPage />}
        {activePage === "how-it-works" && <HowItWorksPage />}
        {activePage === "programs" && <ProgramsPage />}
        {activePage === "resources" && <ResourcesPage />}
        {activePage === "contact" && <ContactPage />}
        {activePage === "news" && <NewsPage news={database.news} onNavigate={navigate} />}
        {activePage === "article" && <ArticlePage articleId={activeArticleId} news={database.news} onNavigate={navigate} />}
        {activePage === "admin" && <AdminPage />}

        {activePage === "home" && (
          <LandingPage
            hubs={database.ihubs}
            news={database.news}
            onNavigate={navigate}
            heroMapComponent={
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
                hideLegend={true}
                forceShowAllPins={true}
                scrollZoom={true}
                disableHover={true}

              />
            }
            mapComponent={
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
            }
            sidebarComponent={
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
            }
          />
        )}

        {activePage === "find" && (
          <FindPage
            mapComponent={
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
            }
            sidebarComponent={
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
            }
          />
        )}
      </div>

      <IHubModal hub={modalHub} onClose={() => setModalHub(null)} />

      {loading && (
        <div className="fixed inset-0 z-[60] bg-white/70 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border-3 border-slate-200 border-t-brand-blue rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
