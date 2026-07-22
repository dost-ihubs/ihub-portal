import type { FeatureCollection, Feature, Geometry } from "geojson";
import type { LayerGroup, Layer, Marker } from "leaflet";

export type HubType = "Regional iHub" | "Provincial iHub";

export interface Region {
  region_iso: string;
  region_name: string;
  focal_person?: string;
  position?: string;
  contact_number?: string;
  email?: string;
}

export interface IHub {
  id: string;
  name: string;
  type: HubType;
  region: string;
  region_iso: string;
  province: string;
  province_iso: string;
  institution: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  focal_person?: string;
  contact_number?: string;
  email?: string;
  launch_date?: string;
  connectivity_status?: string;
  isp?: string;
  ict_assistance?: string;
  image_url?: string;
}

export interface Database {
  regions: Region[];
  ihubs: IHub[];
}

export type DBSource = "live" | "mock";

export interface CustomFeatureProperties {
  ISO: string;
  NAME_1: string;
  [key: string]: any;
}

export type GeoJsonFeature = Feature<Geometry, CustomFeatureProperties>;
export type GeoJsonCollection = FeatureCollection<Geometry, CustomFeatureProperties>;

export interface MapState {
  activeRegion: string | null;
  activeProvince: string | null;
  activeIHub: string | null;
  showAllPinsNationwide: boolean;
  database: Database;
  markersMap: Record<string, Marker>;
  currentSheetId: string;
  dbSource: DBSource;
}
