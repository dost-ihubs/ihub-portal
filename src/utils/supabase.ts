import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types";

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function fetchFromSupabase(): Promise<Database> {
    const [{ data: regions, error: regionsErr }, { data: ihubs, error: ihubsErr }, { data: news, error: newsErr }] =
        await Promise.all([
            supabase.from("regions").select("*"),
            supabase.from("ihubs").select("*"),
            supabase.from("news").select("*").order("created_at", { ascending: false })
        ]);

    if (regionsErr) throw regionsErr;
    if (ihubsErr) throw ihubsErr;
    
    if (newsErr) {
        console.warn("News table might not exist yet, ignoring error:", newsErr);
    }

    return { regions: regions ?? [], ihubs: ihubs ?? [], news: news ?? [] };
}