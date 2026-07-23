import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function fetchFromSupabase(): Promise<Database> {
    const [{ data: regions, error: regionsErr }, { data: ihubs, error: ihubsErr }] =
        await Promise.all([
            supabase.from("regions").select("*"),
            supabase.from("ihubs").select("*")
        ]);

    if (regionsErr) throw regionsErr;
    if (ihubsErr) throw ihubsErr;

    return { regions: regions ?? [], ihubs: ihubs ?? [] };
}