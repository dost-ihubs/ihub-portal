import React, {
    useEffect,
    useRef,
    useState,
} from "react";
import {
    ChevronLeft,
    ChevronRight,
    Images,
    Maximize2,
    X,
} from "lucide-react";

export function parseImageArray(
    input: unknown
): string[] {
    if (!input) return [];

    if (Array.isArray(input)) {
        return input.filter(
            (item): item is string =>
                typeof item === "string" &&
                item.trim().length > 0
        );
    }

    if (typeof input === "string") {
        const trimmed = input.trim();

        if (!trimmed) return [];

        // PostgreSQL array format:
        // {"url1","url2"}
        if (
            trimmed.startsWith("{") &&
            trimmed.endsWith("}")
        ) {
            const inner = trimmed.slice(1, -1);

            return inner
                .split(",")
                .map((item) =>
                    item
                        .replace(/^"|"$/g, "")
                        .trim()
                )
                .filter(Boolean);
        }

        // JSON array format:
        // ["url1", "url2"]
        if (
            trimmed.startsWith("[") &&
            trimmed.endsWith("]")
        ) {
            try {
                const parsed = JSON.parse(trimmed);

                if (Array.isArray(parsed)) {
                    return parsed.filter(
                        (item): item is string =>
                            typeof item === "string" &&
                            item.trim().length > 0
                    );
                }
            } catch {
                // Continue to comma-separated fallback
            }
        }

        // Comma-separated fallback
        return trimmed
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [];
}

interface ImageCarouselProps {
    images: unknown;
    className?: string;
    title?: string;
}

export default function ImageCarousel({
    images,
    className = "",
    title = "Article Gallery",
}: ImageCarouselProps) {
    const validImages =
        parseImageArray(images);

    const scrollContainerRef =
        useRef<HTMLDivElement>(null);

    const [lightboxIndex, setLightboxIndex] =
        useState<number | null>(null);

    const [canScrollLeft, setCanScrollLeft] =
        useState(false);

    const [canScrollRight, setCanScrollRight] =
        useState(false);

    const checkScrollButtons = () => {
        const container =
            scrollContainerRef.current;

        if (!container) return;

        const {
            scrollLeft,
            scrollWidth,
            clientWidth,
        } = container;

        setCanScrollLeft(scrollLeft > 5);

        setCanScrollRight(
            scrollLeft <
            scrollWidth - clientWidth - 5
        );
    };

    useEffect(() => {
        checkScrollButtons();

        const handleResize = () => {
            checkScrollButtons();
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, [validImages.length]);

    const handleScroll = (
        direction: "left" | "right"
    ) => {
        const container =
            scrollContainerRef.current;

        if (!container) return;

        /*
         * Desktop:
         * card = 250px
         * gap = 12px
         * total = 262px
         *
         * On smaller screens we read the actual
         * first card width so scrolling stays accurate.
         */
        const firstCard =
            container.firstElementChild as
            | HTMLElement
            | null;

        const cardWidth =
            firstCard?.offsetWidth ?? 250;

        const gap = 12;

        const scrollAmount =
            cardWidth + gap;

        container.scrollBy({
            left:
                direction === "left"
                    ? -scrollAmount
                    : scrollAmount,
            behavior: "smooth",
        });
    };

    if (validImages.length === 0) {
        return null;
    }

    /*
     * SINGLE IMAGE
     */
    if (validImages.length === 1) {
        return (
            <>
                <div
                    className={`
                        my-6
                        max-w-md
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        shadow-sm
                        ${className}
                    `}
                >
                    <div
                        onClick={() =>
                            setLightboxIndex(0)
                        }
                        className="
                            group
                            relative
                            aspect-[16/10]
                            w-full
                            cursor-pointer
                            overflow-hidden
                            bg-slate-100
                        "
                    >
                        <img
                            src={
                                validImages[0]
                            }
                            alt={title}
                            onError={(e) => {
                                e.currentTarget.onerror =
                                    null;

                                e.currentTarget.src =
                                    "/assets/placeholderImage.png";
                            }}
                            className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-500
                                ease-out
                                group-hover:scale-105
                            "
                        />

                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                                bg-black/30
                                opacity-0
                                transition-opacity
                                duration-300
                                group-hover:opacity-100
                            "
                        >
                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    bg-white/95
                                    px-3
                                    py-1.5
                                    font-dmsans
                                    text-xs
                                    font-semibold
                                    text-slate-800
                                    shadow-md
                                "
                            >
                                <Maximize2
                                    size={13}
                                />
                                Click to enlarge
                            </span>
                        </div>
                    </div>
                </div>

                {lightboxIndex !== null && (
                    <LightboxModal
                        images={validImages}
                        currentIndex={
                            lightboxIndex
                        }
                        title={title}
                        onClose={() =>
                            setLightboxIndex(
                                null
                            )
                        }
                        onIndexChange={
                            setLightboxIndex
                        }
                    />
                )}
            </>
        );
    }

    /*
     * MULTIPLE IMAGES
     */
    return (
        <>
            <div
                className={`
                    my-6
                    rounded-2xl
                    border
                    border-slate-200/90
                    bg-slate-50/80
                    p-3
                    shadow-sm
                    sm:p-4
                    ${className}
                `}
            >
                {/* Gallery header */}
                <div
                    className="
                        mb-3
                        flex
                        items-center
                        justify-between
                        px-1
                    "
                >
                    <div className="flex items-center gap-2">
                        <span
                            className="
                                flex
                                h-6
                                w-6
                                items-center
                                justify-center
                                rounded-lg
                                bg-sky-100
                                text-sky-700
                            "
                        >
                            <Images size={13} />
                        </span>

                        <span
                            className="
                                font-dmsans
                                text-xs
                                font-bold
                                uppercase
                                tracking-wider
                                text-slate-700
                            "
                        >
                            Photo Gallery
                        </span>

                        <span
                            className="
                                rounded-full
                                bg-slate-200/80
                                px-2
                                py-0.5
                                font-dmsans
                                text-[11px]
                                font-semibold
                                text-slate-600
                            "
                        >
                            {
                                validImages.length
                            }{" "}
                            photos
                        </span>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() =>
                                handleScroll(
                                    "left"
                                )
                            }
                            disabled={
                                !canScrollLeft
                            }
                            aria-label="Scroll gallery left"
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-slate-200
                                bg-white
                                text-slate-600
                                shadow-sm
                                transition-all
                                duration-200
                                hover:bg-slate-100
                                hover:text-sky-600
                                active:scale-95
                                disabled:pointer-events-none
                                disabled:opacity-30
                            "
                        >
                            <ChevronLeft
                                size={17}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                handleScroll(
                                    "right"
                                )
                            }
                            disabled={
                                !canScrollRight
                            }
                            aria-label="Scroll gallery right"
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-slate-200
                                bg-white
                                text-slate-600
                                shadow-sm
                                transition-all
                                duration-200
                                hover:bg-slate-100
                                hover:text-sky-600
                                active:scale-95
                                disabled:pointer-events-none
                                disabled:opacity-30
                            "
                        >
                            <ChevronRight
                                size={17}
                            />
                        </button>
                    </div>
                </div>

                {/* Scroll track */}
                <div
                    ref={scrollContainerRef}
                    onScroll={
                        checkScrollButtons
                    }
                    className="
                        flex
                        gap-3
                        overflow-x-auto
                        scroll-smooth
                        pb-2
                        pt-0.5
                        snap-x
                        snap-mandatory
                        scrollbar-thin
                        scrollbar-thumb-slate-300
                        scrollbar-track-transparent
                    "
                    style={{
                        scrollbarWidth:
                            "thin",
                    }}
                >
                    {validImages.map(
                        (src, idx) => (
                            <div
                                key={`${src}-${idx}`}
                                onClick={() =>
                                    setLightboxIndex(
                                        idx
                                    )
                                }
                                className="
                                    group
                                    relative
                                    flex-none
                                    w-[200px]
                                    cursor-pointer
                                    snap-start
                                    aspect-[16/11]
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-200
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    sm:w-[230px]
                                    md:w-[250px]
                                    hover:-translate-y-0.5
                                    hover:border-sky-300
                                    hover:shadow-md
                                "
                            >
                                <img
                                    src={src}
                                    alt={`${title} - photo ${idx + 1
                                        }`}
                                    loading="lazy"
                                    onError={(
                                        e
                                    ) => {
                                        e.currentTarget.onerror =
                                            null;

                                        e.currentTarget.src =
                                            "/assets/placeholderImage.png";
                                    }}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-500
                                        ease-out
                                        group-hover:scale-105
                                    "
                                />

                                {/* Hover */}
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        bg-black/30
                                        opacity-0
                                        backdrop-blur-[1px]
                                        transition-opacity
                                        duration-300
                                        group-hover:opacity-100
                                    "
                                >
                                    <span
                                        className="
                                            inline-flex
                                            items-center
                                            gap-1
                                            rounded-full
                                            bg-white/95
                                            px-2.5
                                            py-1
                                            font-dmsans
                                            text-[11px]
                                            font-semibold
                                            text-slate-800
                                            shadow-sm
                                        "
                                    >
                                        <Maximize2
                                            size={11}
                                        />
                                        View
                                    </span>
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div className="mt-2 text-center">
                    <p className="font-dmsans text-[11px] text-slate-400">
                        Swipe or use the arrows
                        to view more • Click any
                        photo to enlarge
                    </p>
                </div>
            </div>

            {lightboxIndex !== null && (
                <LightboxModal
                    images={validImages}
                    currentIndex={
                        lightboxIndex
                    }
                    title={title}
                    onClose={() =>
                        setLightboxIndex(null)
                    }
                    onIndexChange={
                        setLightboxIndex
                    }
                />
            )}
        </>
    );
}

/*
 * LIGHTBOX
 */

interface LightboxModalProps {
    images: string[];
    currentIndex: number;
    title: string;
    onClose: () => void;
    onIndexChange: (
        index: number
    ) => void;
}

function LightboxModal({
    images,
    currentIndex,
    title,
    onClose,
    onIndexChange,
}: LightboxModalProps) {
    const handlePrev = (
        e?: React.MouseEvent
    ) => {
        e?.stopPropagation();

        onIndexChange(
            currentIndex === 0
                ? images.length - 1
                : currentIndex - 1
        );
    };

    const handleNext = (
        e?: React.MouseEvent
    ) => {
        e?.stopPropagation();

        onIndexChange(
            currentIndex ===
                images.length - 1
                ? 0
                : currentIndex + 1
        );
    };

    useEffect(() => {
        const handleKeyDown = (
            e: KeyboardEvent
        ) => {
            if (e.key === "Escape") {
                onClose();
            }

            if (e.key === "ArrowLeft") {
                handlePrev();
            }

            if (e.key === "ArrowRight") {
                handleNext();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [currentIndex]);

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/90
                p-4
                backdrop-blur-sm
                select-none
            "
            onClick={onClose}
        >
            <div
                className="
                    relative
                    flex
                    w-full
                    max-w-5xl
                    flex-col
                    items-center
                "
                onClick={(e) =>
                    e.stopPropagation()
                }
            >
                {/* Header */}
                <div
                    className="
                        mb-3
                        flex
                        w-full
                        items-center
                        justify-between
                        px-2
                        text-white
                    "
                >
                    <span
                        className="
                            rounded-full
                            bg-white/10
                            px-3
                            py-1
                            font-dmsans
                            text-sm
                            font-medium
                            backdrop-blur-sm
                        "
                    >
                        Photo{" "}
                        {currentIndex + 1} of{" "}
                        {images.length}
                    </span>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close gallery"
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-white/10
                            text-white
                            transition-colors
                            hover:bg-white/25
                        "
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Main image */}
                <div
                    className="
                        relative
                        flex
                        w-full
                        max-h-[70vh]
                        aspect-[16/10]
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-black
                        shadow-2xl
                    "
                >
                    <img
                        key={
                            images[currentIndex]
                        }
                        src={
                            images[currentIndex]
                        }
                        alt={`${title} - photo ${currentIndex + 1
                            }`}
                        onError={(e) => {
                            e.currentTarget.onerror =
                                null;

                            e.currentTarget.src =
                                "/assets/placeholderImage.png";
                        }}
                        className="
                            max-h-full
                            max-w-full
                            object-contain
                        "
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={
                                    handlePrev
                                }
                                aria-label="Previous photo"
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    flex
                                    h-11
                                    w-11
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-black/50
                                    text-white
                                    backdrop-blur-sm
                                    transition-all
                                    hover:scale-105
                                    hover:bg-black/80
                                    active:scale-95
                                "
                            >
                                <ChevronLeft
                                    size={24}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleNext
                                }
                                aria-label="Next photo"
                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    flex
                                    h-11
                                    w-11
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-black/50
                                    text-white
                                    backdrop-blur-sm
                                    transition-all
                                    hover:scale-105
                                    hover:bg-black/80
                                    active:scale-95
                                "
                            >
                                <ChevronRight
                                    size={24}
                                />
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div
                        className="
                            mt-4
                            flex
                            max-w-full
                            gap-2
                            overflow-x-auto
                            px-2
                            py-1
                        "
                    >
                        {images.map(
                            (src, idx) => (
                                <button
                                    key={`${src}-${idx}`}
                                    type="button"
                                    onClick={() =>
                                        onIndexChange(
                                            idx
                                        )
                                    }
                                    aria-label={`View photo ${idx + 1
                                        }`}
                                    className={`
                                        relative
                                        h-14
                                        w-20
                                        flex-none
                                        overflow-hidden
                                        rounded-lg
                                        border-2
                                        transition-all
                                        duration-200

                                        ${idx ===
                                            currentIndex
                                            ? "border-sky-400 scale-105 opacity-100 shadow-md"
                                            : "border-transparent opacity-50 hover:opacity-100"
                                        }
                                    `}
                                >
                                    <img
                                        src={
                                            src
                                        }
                                        alt=""
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}