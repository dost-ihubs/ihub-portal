import type { IHub } from "../types";

export const FALLBACK_IMAGE =
    "/assets/placeholderImage.png";

export const HUB_ROTATE_INTERVAL = 5000;
export const HUB_FADE_DURATION = 300;
export const FEATURED_HUB_COUNT = 4;

export function pickRandomHubs(
    hubs: IHub[],
    count: number
): IHub[] {
    const shuffled = [...hubs].sort(
        () => Math.random() - 0.5
    );

    return shuffled.slice(0, count);
}