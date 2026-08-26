import { useMemo, useState } from "react";
import type { NewsArticle } from "../types";

export function useNewsPage(news: NewsArticle[]) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedProvince, setSelectedProvince] = useState("all");

    const sortedNews = useMemo(() => {
        return [...news].sort(
            (a, b) =>
                new Date(b.date).getTime() -
                new Date(a.date).getTime()
        );
    }, [news]);

    const featuredArticle = sortedNews[0];

    const otherArticles = sortedNews.slice(1);

    const regions = useMemo(() => {
        return Array.from(
            new Set(
                otherArticles
                    .map((item) => item.region)
                    .filter(Boolean)
            )
        ).sort();
    }, [otherArticles]);

    const provinces = useMemo(() => {
        return Array.from(
            new Set(
                otherArticles
                    .filter(
                        (item) =>
                            selectedRegion === "all" ||
                            item.region === selectedRegion
                    )
                    .map((item) => item.province)
                    .filter(Boolean)
            )
        ).sort();
    }, [otherArticles, selectedRegion]);

    const filteredNews = useMemo(() => {
        const query = searchQuery
            .toLowerCase()
            .trim();

        return otherArticles.filter((item) => {
            const matchesSearch =
                !query ||
                item.title
                    ?.toLowerCase()
                    .includes(query) ||
                item.content
                    ?.toLowerCase()
                    .includes(query) ||
                item.author
                    ?.toLowerCase()
                    .includes(query) ||
                item.region
                    ?.toLowerCase()
                    .includes(query) ||
                item.province
                    ?.toLowerCase()
                    .includes(query);

            const matchesRegion =
                selectedRegion === "all" ||
                item.region === selectedRegion;

            const matchesProvince =
                selectedProvince === "all" ||
                item.province === selectedProvince;

            return (
                matchesSearch &&
                matchesRegion &&
                matchesProvince
            );
        });
    }, [
        otherArticles,
        searchQuery,
        selectedRegion,
        selectedProvince,
    ]);

    const handleRegionChange = (
        region: string
    ) => {
        setSelectedRegion(region);
        setSelectedProvince("all");
    };

    return {
        sortedNews,

        featuredArticle,
        filteredNews,

        regions,
        provinces,

        searchQuery,
        selectedRegion,
        selectedProvince,

        setSearchQuery,
        setSelectedProvince,
        handleRegionChange,
    };
}