import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types";

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function fetchFromSupabase(): Promise<Database> {
    const {
        data: sessionData,
    } = await supabase.auth.getSession();

    console.log(
        "PUBLIC SITE SESSION:",
        sessionData.session
    );

    const [
        { data: regions, error: regionsErr },
        { data: ihubs, error: ihubsErr },
        { data: news, error: newsErr },
    ] = await Promise.all([
        supabase.from("regions").select("*"),

        supabase.from("ihubs").select("*"),

        supabase
            .from("news")
            .select("*")
            .order("created_at", {
                ascending: false,
            }),
    ]);

    console.log("REGIONS:", regions);
    console.log("IHUBS:", ihubs);
    console.log("IHUB ERROR:", ihubsErr);
    console.log("NEWS:", news);

    if (regionsErr) throw regionsErr;
    if (ihubsErr) throw ihubsErr;

    if (newsErr) {
        console.warn(
            "News error:",
            newsErr
        );
    }

    return {
        regions: regions ?? [],
        ihubs: ihubs ?? [],
        news: news ?? [],
    };
}