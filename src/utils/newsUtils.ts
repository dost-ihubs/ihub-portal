import type { NewsArticle } from "../types";

export function formatNewsDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

/**
 * Parses and normalizes an image collection into an array of non-empty image URL strings.
 */
export function parseImageArray(images: unknown): string[] {
    if (!images) return [];

    if (Array.isArray(images)) {
        return images.filter(
            (img): img is string =>
                typeof img === "string" && img.trim().length > 0
        );
    }

    if (typeof images === "string") {
        const trimmed = images.trim();
        if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) {
                    return parsed.filter(
                        (img): img is string =>
                            typeof img === "string" && img.trim().length > 0
                    );
                }
            } catch {
                // ignore JSON parse error
            }
        }
        if (trimmed.includes(",")) {
            return trimmed
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
        }
        if (trimmed.length > 0) {
            return [trimmed];
        }
    }

    return [];
}

/**
 * Extracts gallery/carousel images specifically intended for in-content display.
 */
export function getArticleGalleryImages(article?: NewsArticle | null): string[] {
    if (!article) return [];

    const candidates = [
        article.images,
    ];

    for (const cand of candidates) {
        const parsed = parseImageArray(cand);
        if (parsed.length > 0) {
            return parsed;
        }
    }

    return [];
}

/**
 * Extracts an array of image URLs from a NewsArticle, supporting
 * single strings, arrays, JSON-encoded strings, and various property names.
 */
export function getArticleImages(article?: NewsArticle | null): string[] {
    if (!article) return ["/assets/placeholderImage.png"];

    const rawList: unknown[] = [];

    // Check potential fields
    const candidates = [
        article.img_url,
        article.images,
    ];

    for (const val of candidates) {
        if (!val) continue;

        const parsed = parseImageArray(val);
        rawList.push(...parsed);
    }

    const cleaned = Array.from(
        new Set(
            rawList
                .filter(
                    (item): item is string =>
                        typeof item === "string" && item.trim().length > 0
                )
                .map((item) => item.trim())
        )
    );

    return cleaned.length > 0 ? cleaned : ["/assets/placeholderImage.png"];
}

