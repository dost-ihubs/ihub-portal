const OFFER_CARD_RAW_WIDTH_BY_DISTANCE = [
    58,
    18,
    11,
    7,
    4,
    2,
];

const OFFER_GAP_PX = 8;

export type OfferLayout = {
    left: string;
    width: string;
    distance: number;
};

export function getOfferTrackLayout(
    active: number,
    offers: unknown[]
): Record<number, OfferLayout> {
    const total = offers.length;
    const half = Math.floor(total / 2);

    const items = offers.map((_, i) => {
        const diff =
            (((i - active + half) % total) + total) %
            total -
            half;

        const distance = Math.abs(diff);

        const rawWidth =
            OFFER_CARD_RAW_WIDTH_BY_DISTANCE[
            distance
            ] ??
            OFFER_CARD_RAW_WIDTH_BY_DISTANCE[
            OFFER_CARD_RAW_WIDTH_BY_DISTANCE.length -
            1
            ];

        return {
            i,
            diff,
            distance,
            rawWidth,
        };
    });

    const totalRawWidth = items.reduce(
        (sum, item) => sum + item.rawWidth,
        0
    );

    const withPercent = items.map((item) => ({
        ...item,
        percent:
            (item.rawWidth / totalRawWidth) * 100,
    }));

    const ordered = [...withPercent].sort(
        (a, b) => a.diff - b.diff
    );

    const pxAdjust = (percent: number) =>
        (percent / 100) *
        (total - 1) *
        OFFER_GAP_PX;

    let cumulativePercent = 0;
    let cumulativePxAdjust = 0;

    const layout: Record<number, OfferLayout> =
        {};

    ordered.forEach((item, rank) => {
        const widthPxAdjust = pxAdjust(
            item.percent
        );

        const leftPxOffset =
            rank * OFFER_GAP_PX -
            cumulativePxAdjust;

        layout[item.i] = {
            left: `calc(${cumulativePercent}% + ${leftPxOffset}px)`,

            width: `calc(${item.percent}% - ${widthPxAdjust}px)`,

            distance: item.distance,
        };

        cumulativePercent += item.percent;
        cumulativePxAdjust += widthPxAdjust;
    });

    return layout;
}