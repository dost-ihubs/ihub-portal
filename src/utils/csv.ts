import Papa from "papaparse";
import type { IHub, Region } from "../types";

export function parseCSV<T>(csvText: string): T[] {
  const result = Papa.parse<T>(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  });
  return result.data;
}

export async function fetchFromGoogleSheets(sheetId: string): Promise<{ ihubs: IHub[]; regions: Region[] }> {
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

  const parsedIHubs = parseCSV<IHub>(ihubsCsv);
  const parsedRegions = parseCSV<Region>(regionsCsv);

  if (parsedIHubs.length === 0 || parsedRegions.length === 0) {
    throw new Error("Fetched tables are empty or formatted incorrectly.");
  }

  return {
    ihubs: parsedIHubs,
    regions: parsedRegions
  };
}
