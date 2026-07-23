import { useEffect, useRef } from "react";
import L from "leaflet";
import type { GeoJsonCollection, CustomFeatureProperties, Database, IHub } from "../types";
import { provinceToRegionMap } from "../utils/geo";
import InfoOverlay from "./InfoOverlay";

interface MapViewProps {
  regionsGeoJsonData: GeoJsonCollection | null;
  provincesGeoJsonData: GeoJsonCollection | null;
  database: Database;
  activeRegion: string | null;
  activeProvince: string | null;
  activeIHub: string | null;
  showAllPinsNationwide: boolean;
  onToggleShowAllPins: (checked: boolean) => void;
  onRegionSelect: (regionIso: string) => void;
  onProvinceSelect: (provIso: string) => void;
  onHubClick: (hub: IHub) => void;
  hoverInfo: { visible: boolean; label: string; count: number; iso: string | null };
  onRegionHover: (props: CustomFeatureProperties) => void;
  onRegionLeave: () => void;
}

function styleRegionFeature(props: CustomFeatureProperties | undefined, activeRegion: string | null): L.PathOptions {
  if (!props) return {};
  const isSelected = activeRegion !== null && props.ISO === activeRegion;
  const isDimmed = activeRegion !== null && props.ISO !== activeRegion;

  return {
    fillColor: isSelected ? "transparent" : isDimmed ? "#d0e6ff" : "var(--color-region-default, #9ec5fe)",
    fillOpacity: isSelected ? 0 : isDimmed ? 0.6 : 0.85,
    color: isSelected ? "transparent" : "var(--color-region-border, #003b8e)",
    weight: isSelected ? 0 : 1,
    className: "region-path" + (isSelected ? " active" : ""),
  };
}

function styleProvinceFeature(props: CustomFeatureProperties | undefined, activeProvince: string | null): L.PathOptions {
  if (!props) return {};
  const provIso = props.ISO;
  const isActive = activeProvince === provIso;
  const hash = provIso.split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const color = hash % 2 === 0 ? "var(--color-province-default-1, #28a745)" : "var(--color-province-default-2, #208838)";

  return {
    fillColor: color,
    fillOpacity: isActive ? 1.0 : 0.85,
    color: isActive ? "#ffffff" : "var(--color-province-border, #ffffff)",
    weight: isActive ? 1.75 : 0.75,
    className: "province-path" + (isActive ? " active" : ""),
  };
}

export default function MapView({
  regionsGeoJsonData,
  provincesGeoJsonData,
  database,
  activeRegion,
  activeProvince,
  activeIHub,
  showAllPinsNationwide,
  onToggleShowAllPins,
  onRegionSelect,
  onProvinceSelect,
  onHubClick,
  hoverInfo,
  onRegionHover,
  onRegionLeave,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const regionsLayerRef = useRef<L.GeoJSON | null>(null);
  const provincesLayerRef = useRef<L.GeoJSON | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const markersMapRef = useRef<Record<string, L.Marker>>({});

  // Create the map once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      minZoom: 5.5,
      maxZoom: 12,
      maxBounds: [
        [4.0, 114.0],
        [22.0, 128.0],
      ],
      maxBoundsViscosity: 1.0,
    });
    map.setView([12.5, 122.0], 6);
    L.control.zoom({ position: "topright" }).addTo(map);

    mapRef.current = map;
    markersGroupRef.current = L.layerGroup().addTo(map);

    const invalidate = () => map.invalidateSize();
    window.addEventListener("load", invalidate);
    window.addEventListener("resize", invalidate);
    const t = setTimeout(invalidate, 250);

    let observer: ResizeObserver | undefined;
    if (containerRef.current.parentElement && window.ResizeObserver) {
      observer = new ResizeObserver(invalidate);
      observer.observe(containerRef.current.parentElement);
    }

    return () => {
      window.removeEventListener("load", invalidate);
      window.removeEventListener("resize", invalidate);
      clearTimeout(t);
      observer?.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Regions layer: re-render whenever the geojson or active region changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !regionsGeoJsonData) return;

    if (regionsLayerRef.current) {
      map.removeLayer(regionsLayerRef.current);
    }

    const layer = L.geoJSON(regionsGeoJsonData as any, {
      style: (feature) => styleRegionFeature(feature?.properties, activeRegion),
      onEachFeature: (feature, layer) => {
        const props = feature.properties as CustomFeatureProperties;
        layer.on({
          mouseover: (e) => {
            if (activeRegion !== null) return;
            onRegionHover(props);
            const target = e.target as L.Path;
            target.setStyle({
              fillColor: "var(--color-region-hover, #6ba8f7)",
              fillOpacity: 0.95,
            });
            target.bringToFront();
          },
          mouseout: (e) => {
            if (activeRegion !== null) return;
            onRegionLeave();
            const target = e.target as L.Path;
            target.setStyle(styleRegionFeature(props, activeRegion));
          },
          click: () => {
            if (props.ISO !== activeRegion) onRegionSelect(props.ISO);
          },
        });
      },
    }).addTo(map);

    regionsLayerRef.current = layer;

    // Fit bounds to the selected region using this layer's own geometry,
    // same approach as getRegionLayerBounds() in the original main.ts
    if (activeRegion) {
      let bounds: L.LatLngBounds | null = null;
      layer.eachLayer((l) => {
        const feat = (l as any).feature;
        if (feat?.properties?.ISO === activeRegion && typeof (l as any).getBounds === "function") {
          bounds = (l as any).getBounds();
        }
      });
      if (bounds) map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8.5 });
    } else {
      map.setView([12.5, 122.0], 6);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionsGeoJsonData, activeRegion]);

  // Provinces layer: only present while a region is selected
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (provincesLayerRef.current) {
      map.removeLayer(provincesLayerRef.current);
      provincesLayerRef.current = null;
    }

    if (!activeRegion || !provincesGeoJsonData) return;

    const layer = L.geoJSON(provincesGeoJsonData as any, {
      filter: (feature) => provinceToRegionMap[feature.properties?.ISO] === activeRegion,
      style: (feature) => styleProvinceFeature(feature?.properties, activeProvince),
      onEachFeature: (feature, layer) => {
        const props = feature.properties as CustomFeatureProperties;
        layer.on({
          click: () => onProvinceSelect(props.ISO),
        });
      },
    }).addTo(map);

    provincesLayerRef.current = layer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provincesGeoJsonData, activeRegion, activeProvince]);

  // Pins: re-render whenever the filtered hub set changes
  useEffect(() => {
    const group = markersGroupRef.current;
    if (!group) return;

    group.clearLayers();
    markersMapRef.current = {};

    let hubs: IHub[] = [];
    if (activeRegion) {
      hubs = database.ihubs.filter((hub) => hub.region_iso === activeRegion);
    } else if (showAllPinsNationwide) {
      hubs = database.ihubs;
    }

    hubs.forEach((hub) => {
      if (!hub.latitude || !hub.longitude) return;

      const typeClass = hub.type === "Regional iHub" ? "regional" : "provincial";
      const pinIcon = L.divIcon({
        className: "custom-pin-container",
        html: `<div class="pin-marker ${typeClass}"></div><div class="pin-pulse ${typeClass}"></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 28],
      });

      const marker = L.marker([hub.latitude, hub.longitude], { icon: pinIcon })
        .addTo(group)
        .on("click", () => onHubClick(hub));

      marker.bindPopup(
        `<div style="font-family: var(--font-body); padding: 4px;">
          <h4 style="font-family: var(--font-title); font-size: 14px; font-weight: 800; color: #002f6c; margin-bottom: 2px;">${hub.name}</h4>
          <p style="font-size: 11px; font-weight: 600; color: #0072bc; margin-bottom: 4px;">${hub.type}</p>
          <p style="font-size: 11px; color: #64748b; line-height: 1.3;">${hub.institution}</p>
        </div>`,
        { offset: L.point(0, -20) }
      );

      markersMapRef.current[hub.id] = marker;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [database, activeRegion, showAllPinsNationwide]);

  // Focus + open popup when a specific hub becomes active (e.g. clicked from the sidebar)
  useEffect(() => {
    if (!activeIHub) return;
    const map = mapRef.current;
    const marker = markersMapRef.current[activeIHub];
    const hub = database.ihubs.find((h) => h.id === activeIHub);
    if (map && hub?.latitude && hub?.longitude) {
      map.setView([hub.latitude, hub.longitude], 9);
    }
    marker?.openPopup();
  }, [activeIHub, database]);

  return (
    <main
      id="map-section"
      className="flex-1 relative bg-[#eaf4ff] flex flex-col min-h-[450px] lg:min-h-0 order-2"
      aria-label="Interactive Map of the Philippines"
    >
      <div id="map" ref={containerRef} className="absolute inset-0 z-0" />

      <div
        className="legend-overlay absolute top-4 left-4 z-10 bg-white px-4 py-3 rounded-2xl shadow-card border border-slate-200 flex flex-col gap-2 text-xs font-semibold text-slate-700"
        aria-label="Map Legend"
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
          <span>Regional iHub</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span>Provincial iHub</span>
        </div>
        <label className="flex items-center gap-2 pt-2 border-t border-slate-200 cursor-pointer font-normal text-[11px] text-slate-600">
          <input
            type="checkbox"
            checked={showAllPinsNationwide}
            onChange={(e) => onToggleShowAllPins(e.target.checked)}
            className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
          />
          <span>Show all pins nationwide</span>
        </label>
      </div>

      <InfoOverlay
        visible={hoverInfo.visible}
        label={hoverInfo.label}
        count={hoverInfo.count}
        regionInfo={database.regions.find((r) => r.region_iso === hoverInfo.iso)}
      />
    </main>
  );
}
