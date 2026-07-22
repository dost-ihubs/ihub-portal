import L from "leaflet";
import type { GeoJsonCollection, MapState, IHub, CustomFeatureProperties } from "../types";
import { provinceToRegionMap } from "../utils/geo";
import { openIHubModal } from "./modal";

export function initMap(): L.Map {
  const map = L.map("map", {
    zoomControl: false,
    minZoom: 5.5,
    maxZoom: 12,
    maxBounds: [[4.0, 114.0], [22.0, 128.0]],
    maxBoundsViscosity: 1.0
  });

  map.setView([12.5, 122.0], 6);
  L.control.zoom({ position: "topright" }).addTo(map);

  window.addEventListener("load", () => map.invalidateSize());
  window.addEventListener("resize", () => map.invalidateSize());
  setTimeout(() => map.invalidateSize(), 250);

  const mapSection = document.getElementById("map-section");
  if (mapSection && window.ResizeObserver) {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(mapSection);
  }

  return map;
}

export function renderRegionsLayer(
  map: L.Map,
  regionsGeoJsonData: GeoJsonCollection,
  state: MapState,
  onRegionHover: (props: CustomFeatureProperties, layer: L.Layer) => void,
  onRegionLeave: (layer: L.Layer) => void,
  onRegionClick: (iso: string, bounds: L.LatLngBounds) => void
): L.GeoJSON {
  const layer = L.geoJSON(regionsGeoJsonData as any, {
    style: (feature) => styleRegionFeature(feature?.properties, state),
    onEachFeature: (feature, layer) => {
      const props = feature.properties as CustomFeatureProperties;
      layer.on({
        mouseover: (e) => {
          if (state.activeRegion === null) {
            onRegionHover(props, e.target);
          }
        },
        mouseout: (e) => {
          if (state.activeRegion === null) {
            onRegionLeave(e.target);
          }
        },
        click: () => {
          if (props.ISO !== state.activeRegion) {
            const geoLayer = layer as L.Path;
            if (typeof (layer as any).getBounds === "function") {
              onRegionClick(props.ISO, (layer as any).getBounds());
            }
          }
        }
      });
    }
  }).addTo(map);

  return layer;
}

function styleRegionFeature(props: CustomFeatureProperties | undefined, state: MapState): L.PathOptions {
  if (!props) return {};
  const isSelected = state.activeRegion !== null && props.ISO === state.activeRegion;
  const isDimmed = state.activeRegion !== null && props.ISO !== state.activeRegion;

  return {
    fillColor: isSelected ? "transparent" : (isDimmed ? "#d0e6ff" : "var(--color-region-default, #9ec5fe)"),
    fillOpacity: isSelected ? 0 : (isDimmed ? 0.6 : 0.85),
    color: isSelected ? "transparent" : "var(--color-region-border, #003b8e)",
    weight: isSelected ? 0 : 1,
    className: "region-path" + (isSelected ? " active" : "")
  };
}

export function renderProvincesLayer(
  map: L.Map,
  provincesGeoJsonData: GeoJsonCollection,
  state: MapState,
  onProvinceClick: (provIso: string, provName: string) => void
): L.GeoJSON {
  const layer = L.geoJSON(provincesGeoJsonData as any, {
    filter: (feature) => {
      const provIso = feature.properties?.ISO;
      const regIso = provinceToRegionMap[provIso];
      return regIso === state.activeRegion;
    },
    style: (feature) => styleProvinceFeature(feature?.properties, state),
    onEachFeature: (feature, layer) => {
      const props = feature.properties as CustomFeatureProperties;
      layer.on({
        click: () => {
          onProvinceClick(props.ISO, props.NAME_1);
        }
      });
    }
  }).addTo(map);

  return layer;
}

function styleProvinceFeature(props: CustomFeatureProperties | undefined, state: MapState): L.PathOptions {
  if (!props) return {};
  const provIso = props.ISO;
  const isActive = state.activeProvince === provIso;

  const hash = provIso.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = hash % 2 === 0 ? "var(--color-province-default-1, #28a745)" : "var(--color-province-default-2, #208838)";

  return {
    fillColor: color,
    fillOpacity: isActive ? 1.0 : 0.85,
    color: isActive ? "#ffffff" : "var(--color-province-border, #ffffff)",
    weight: isActive ? 1.75 : 0.75,
    className: "province-path" + (isActive ? " active" : "")
  };
}

export function renderMapPins(
  map: L.Map,
  markersGroup: L.LayerGroup,
  state: MapState,
  onMarkerClick: (hub: IHub) => void
): void {
  markersGroup.clearLayers();
  state.markersMap = {};

  let regionHubs: IHub[] = [];
  if (state.activeRegion) {
    regionHubs = state.database.ihubs.filter(hub => hub.region_iso === state.activeRegion);
  } else if (state.showAllPinsNationwide) {
    regionHubs = state.database.ihubs;
  }

  regionHubs.forEach(hub => {
    if (!hub.latitude || !hub.longitude) return;

    const typeClass = hub.type === "Regional iHub" ? "regional" : "provincial";

    const pinIcon = L.divIcon({
      className: "custom-pin-container",
      html: `
        <div class="pin-marker ${typeClass}"></div>
        <div class="pin-pulse ${typeClass}"></div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 28]
    });

    const marker = L.marker([hub.latitude, hub.longitude], { icon: pinIcon })
      .addTo(markersGroup)
      .on("click", () => {
        onMarkerClick(hub);
      });

    const popupContent = `
      <div style="font-family: var(--font-body); padding: 4px;">
        <h4 style="font-family: var(--font-title); font-size: 14px; font-weight: 800; color: #002f6c; margin-bottom: 2px;">${hub.name}</h4>
        <p style="font-size: 11px; font-weight: 600; color: #0072bc; margin-bottom: 4px;">${hub.type}</p>
        <p style="font-size: 11px; color: #64748b; line-height: 1.3;">${hub.institution}</p>
      </div>
    `;
    marker.bindPopup(popupContent, { offset: L.point(0, -20) });

    state.markersMap[hub.id] = marker;
  });
}
