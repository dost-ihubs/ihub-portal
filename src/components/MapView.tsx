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
  hideLegend?: boolean;
  forceShowAllPins?: boolean;
  scrollZoom?: boolean;
  disableHover?: boolean;   // ← new
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
  hideLegend,
  forceShowAllPins,
  scrollZoom = true,
  disableHover = false,
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
      scrollWheelZoom: scrollZoom,
      minZoom: 5.5,
      maxZoom: 12,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
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
          ...(disableHover ? {} : {
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
          }),
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
  }, [regionsGeoJsonData, activeRegion, disableHover]);

  // Provinces layer: only present while a region is selected
  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    if (provincesLayerRef.current) {
      map.removeLayer(provincesLayerRef.current);
      provincesLayerRef.current = null;
    }

    if (!activeRegion || !provincesGeoJsonData) return;

    const layer = L.geoJSON(
      provincesGeoJsonData as any,
      {
        filter: (feature) =>
          provinceToRegionMap[
          feature.properties?.ISO
          ] === activeRegion,

        style: (feature) =>
          styleProvinceFeature(
            feature?.properties,
            activeProvince
          ),

        onEachFeature: (
          feature,
          provinceLayer
        ) => {
          const props =
            feature.properties as CustomFeatureProperties;

          provinceLayer.on({
            mouseover: (e) => {
              const target =
                e.target as L.Path;

              target.setStyle({
                fillColor: "#4d9400ff",
                fillOpacity: 1,
                color: "#ffffff",
                weight: 2,
              });

              target.bringToFront();

              const hubInProvince =
                database.ihubs.find(
                  (hub) =>
                    hub.province_iso ===
                    props.ISO
                );

              if (hubInProvince) {
                markersMapRef.current[
                  hubInProvince.id
                ]?.openPopup();
              }
            },

            mouseout: (e) => {
              const target =
                e.target as L.Path;

              target.setStyle(
                styleProvinceFeature(
                  props,
                  activeProvince
                )
              );

              const hubInProvince =
                database.ihubs.find(
                  (hub) =>
                    hub.province_iso ===
                    props.ISO
                );

              if (hubInProvince) {
                markersMapRef.current[
                  hubInProvince.id
                ]?.closePopup();
              }
            },

            click: () => {
              onProvinceSelect(props.ISO);
            },
          });
        },
      }
    ).addTo(map);

    provincesLayerRef.current =
      layer;

    // Keep province polygons above the region layer
    layer.bringToFront();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    provincesGeoJsonData,
    activeRegion,
    activeProvince,
  ]);

  // Pins: re-render whenever the filtered hub set changes
  useEffect(() => {
    const group = markersGroupRef.current;
    if (!group) return;

    group.clearLayers();
    markersMapRef.current = {};

    let hubs: IHub[] = [];
    if (activeRegion && !forceShowAllPins) {
      hubs = database.ihubs.filter((hub) => hub.region_iso === activeRegion);
    } else if (showAllPinsNationwide || forceShowAllPins) {
      hubs = database.ihubs;
    }

    hubs.forEach((hub) => {
      if (!hub.latitude || !hub.longitude) return;

      const typeClass = hub.type === "Regional iHub" ? "regional" : "provincial";
      const pinIcon = L.divIcon({
        className: "custom-pin-container",
        html: `<div class="pin-marker ${typeClass}"></div><div class="pin-pulse ${typeClass}"></div>`,
        iconSize: [28, 28],
        iconAnchor: [16, 28],
      });

      const marker = L.marker([hub.latitude, hub.longitude], { icon: pinIcon })
        .addTo(group)
        .on("click", () => onHubClick(hub));

      marker.bindPopup(
        `
          <div style="
            font-family: var(--font-body);
            width: 240px;
            padding: 4px 2px;
          ">
          <div style="
            display: flex;
            flex-direction: column;
            gap: 10px;
          ">
              <div style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 100px;
                padding: 4px 10px;
                border-radius: 999px;
                background: #e0f2fe;
                color: #0369a1;
                font-size: 10px;
                font-weight: 600;
                font-family: 'DM Sans', sans-serif
              ">
                ${hub.type}
              </div>

              <h4 style="
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                line-height: 1.35;
                font-weight: 600;
                color: #002f6c;
                margin-bottom: 12px;
              ">
                ${hub.name}
              </h4>
            </div>

            ${hub.institution
          ? `
                    <div>
                      <div style="
                      font-family: 'DM Sans', sans-serif;
                        font-size: 9px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: .06em;
                        color: #94a3b8;
                        margin-bottom: 2px;
                      ">
                        Institution
                      </div>

                      <div style="
                        font-size: 11px;
                        line-height: 1.45;
                        color: #475569;
                        font-weight: 500;
                        font-family: 'DM Sans', sans-serif
                      ">
                        ${hub.institution}
                      </div>
                    </div>
                  </div>
                `
          : ""
        }

            ${hub.address
          ? `

                    <div>
                      <div style="
                        font-size: 9px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: .06em;
                        color: #94a3b8;
                        margin-bottom: 2px;
                        font-family: 'DM Sans', sans-serif
                      ">
                        Location
                      </div>

                      <div style="
                        font-size: 11px;
                        line-height: 1.45;
                        color: #475569;
                        font-family: 'DM Sans', sans-serif
                      ">
                        ${hub.address}
                      </div>
                    </div>
                  </div>
                `
          : ""
        }

            <div style="
              margin-top: 2px;
              padding-top: 10px;
              border-top: 1px solid #e2e8f0;
              font-size: 10px;
              color: #94a3b8;
              font-family: 'DM Sans', sans-serif
            ">
              Click the marker or directory card for more details.
            </div>
          </div>
        </div>
        `,
        {
          offset: L.point(0, -20),
          maxWidth: 270,
          minWidth: 240,
        }
      );

      markersMapRef.current[hub.id] = marker;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [database, activeRegion, showAllPinsNationwide, forceShowAllPins]);

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
      className="w-full h-full relative bg-[#DBEFFF] flex flex-col min-h-[400px]"
      aria-label="Interactive Map of the Philippines"
    >
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {!hideLegend && (
        <div
          className="legend-overlay absolute top-4 left-4 z-10 bg-white px-4 py-3 rounded-2xl shadow-card border border-slate-200 flex flex-col gap-2 text-xs font-semibold text-slate-700"
          aria-label="Map Legend"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500 inline-block font-dmsans"></span>
            <span className="font-dmsans text-slate-700">Regional iHub</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block font-dmsans"></span>
            <span className="font-dmsans text-slate-700">Provincial iHub</span>
          </div>
          <label className="flex items-center gap-2 pt-2 border-t border-slate-200 cursor-pointer font-normal text-[11px] text-slate-600">
            <input
              type="checkbox"
              checked={showAllPinsNationwide}
              onChange={(e) => onToggleShowAllPins(e.target.checked)}
              className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
            />
            <span className="font-dmsans text-slate-700">Show all pins nationwide</span>
          </label>
        </div>
      )}

      <InfoOverlay
        visible={hoverInfo.visible}
        label={hoverInfo.label}
        count={hoverInfo.count}
        regionInfo={database.regions.find((r) => r.region_iso === hoverInfo.iso)}
      />
    </main>
  );
}
