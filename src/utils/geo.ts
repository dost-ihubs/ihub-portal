import * as turf from "@turf/turf";
import type { GeoJsonCollection, GeoJsonFeature } from "../types";

export const provinceToRegionMap: Record<string, string> = {
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
  // Region VI
  'PH-AKL': 'PH-06', 'PH-ANT': 'PH-06', 'PH-CAP': 'PH-06', 'PH-GUI': 'PH-06', 'PH-ILI': 'PH-06',
  // Region VII
  'PH-BOH': 'PH-07', 'PH-CEB': 'PH-07', 'PH-MDE': 'PH-07', 'PH-LAP': 'PH-07',
  // Negros Island Region (NIR) - PH-18
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
  // BARMM
  'PH-BAS': 'PH-14', 'PH-LAS': 'PH-14', 'PH-MAG': 'PH-14', 'PH-SLU': 'PH-14', 'PH-TAW': 'PH-14'
};

export function mergeNegrosIslandRegion(
  regionsGeoJsonData: GeoJsonCollection,
  provincesGeoJsonData: GeoJsonCollection
): void {
  const NIR_PROVINCE_ISOS = ["PH-NEC", "PH-NER", "PH-SIG", "PH-BCD"];

  const provinceFeatures = provincesGeoJsonData.features.filter(f =>
    NIR_PROVINCE_ISOS.includes(f.properties?.ISO)
  );

  if (provinceFeatures.length < 4) {
    console.warn("mergeNegrosIslandRegion: missing province features.");
    return;
  }

  // Union province shapes into a single NIR polygon
  let nirGeometry = provinceFeatures[0];
  for (let i = 1; i < provinceFeatures.length; i++) {
    try {
      const unionResult = turf.union(nirGeometry as any, provinceFeatures[i] as any);
      if (unionResult) {
        nirGeometry = unionResult as any;
      }
    } catch (err) {
      console.warn("turf.union failed while merging Negros Island Region:", err);
      return;
    }
  }

  const nirFeature: GeoJsonFeature = {
    type: "Feature",
    properties: {
      ISO: "PH-18",
      NAME_1: "Negros Island Region"
    },
    geometry: nirGeometry.geometry
  };

  // Clip provinces out of Region VI (PH-06) and VII (PH-07)
  regionsGeoJsonData.features = regionsGeoJsonData.features.map(regionFeature => {
    const regionIso = regionFeature.properties?.ISO;
    if (regionIso !== "PH-06" && regionIso !== "PH-07") {
      return regionFeature;
    }

    const provincesToRemove = regionIso === "PH-06"
      ? provinceFeatures.filter(p => ["PH-NEC", "PH-BCD"].includes(p.properties?.ISO))
      : provinceFeatures.filter(p => ["PH-NER", "PH-SIG"].includes(p.properties?.ISO));

    let clipped: GeoJsonFeature = regionFeature;
    for (const prov of provincesToRemove) {
      try {
        const result = turf.difference(clipped as any, prov as any);
        if (result) {
          clipped = result as any;
        }
      } catch (err) {
        console.warn(`turf.difference failed while clipping ${prov.properties?.ISO}:`, err);
      }
    }
    return { ...regionFeature, geometry: clipped.geometry };
  });

  regionsGeoJsonData.features.push(nirFeature);
}
