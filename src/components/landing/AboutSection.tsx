import {
    useCallback,
    useEffect,
    useState,
} from "react";

import type { IHub } from "../../types";
import type { Page } from "../Header";

import IHubModal from "../IHubModal";

interface AboutSectionProps {
    hubs?: IHub[];
    onNavigate?: (page: Page) => void;
}

const CAROUSEL_SIZE = 4;
const ROTATE_INTERVAL = 10000;
const FADE_DURATION = 500;

function pickRandomHubs(
    hubs: IHub[],
    count: number
): IHub[] {
    const shuffled = [...hubs].sort(
        () => Math.random() - 0.5
    );

    return shuffled.slice(0, count);
}

function hasWorkingImage(
    url: string
): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () =>
            resolve(true);

        img.onerror = () =>
            resolve(false);

        img.src = url;
    });
}

export default function AboutSection({
    hubs = [],
    onNavigate,
}: AboutSectionProps) {
    const [validHubs, setValidHubs] =
        useState<IHub[]>([]);

    const [featured, setFeatured] =
        useState<IHub[]>([]);

    const [fadeOut, setFadeOut] =
        useState(false);

    const [activeIndex, setActiveIndex] =
        useState(0);

    const [selectedHub, setSelectedHub] =
        useState<IHub | null>(null);

    /*
     * Validate images.
     * Only keep hubs with working image URLs.
     */
    useEffect(() => {
        let cancelled = false;

        async function validateImages() {
            const hubsWithUrls =
                hubs.filter(
                    (hub) =>
                        hub.image_url &&
                        hub.image_url.trim() !== ""
                );

            const results =
                await Promise.all(
                    hubsWithUrls.map(
                        async (hub) => {
                            const valid =
                                await hasWorkingImage(
                                    hub.image_url!
                                );

                            return valid
                                ? hub
                                : null;
                        }
                    )
                );

            if (cancelled) {
                return;
            }

            const workingHubs =
                results.filter(
                    (
                        hub
                    ): hub is IHub =>
                        hub !== null
                );

            setValidHubs(
                workingHubs
            );
        }

        validateImages();

        return () => {
            cancelled = true;
        };
    }, [hubs]);

    /*
     * Select the initial set of hubs.
     */
    useEffect(() => {
        if (
            validHubs.length === 0
        ) {
            setFeatured([]);
            return;
        }

        setFeatured(
            pickRandomHubs(
                validHubs,
                CAROUSEL_SIZE
            )
        );

        setActiveIndex(0);
    }, [validHubs]);

    /*
     * Rotate the displayed hubs.
     */
    const rotate = useCallback(() => {
        if (
            validHubs.length <=
            CAROUSEL_SIZE
        ) {
            return;
        }

        setFadeOut(true);

        window.setTimeout(
            () => {
                setFeatured(
                    pickRandomHubs(
                        validHubs,
                        CAROUSEL_SIZE
                    )
                );

                setActiveIndex(0);
                setFadeOut(false);
            },
            FADE_DURATION
        );
    }, [validHubs]);

    /*
     * Auto rotate.
     */
    useEffect(() => {
        if (
            validHubs.length <=
            CAROUSEL_SIZE
        ) {
            return;
        }

        const interval =
            window.setInterval(
                rotate,
                ROTATE_INTERVAL
            );

        return () => {
            window.clearInterval(
                interval
            );
        };
    }, [
        rotate,
        validHubs.length,
    ]);

    return (
        <>
            <section className="py-24 px-6 lg:px-12 bg-white max-w-[1250px] mx-auto w-full">
                {/* Section badge */}
                <div className="flex justify-center mb-16">
                    <div className="px-6 py-2 bg-sky-50 text-[#003F6A] border border-sky-100 rounded-full text-sm font-dmsans font-medium">
                        About iHubs
                    </div>
                </div>

                {/* Intro */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">
                    <h2 className="text-4xl md:text-[64px] font-poppins font-medium text-[#003F6A] tracking-tight">
                        What is an iHub?
                    </h2>

                    <div className="pt-2">
                        <p className="text-slate-700 font-dmsans text-lg leading-relaxed mb-4">
                            The iHub or Innovation
                            Hub is a space where
                            individuals and groups
                            can meet, interact,
                            develop new ideas, and
                            find solutions that
                            address economic and
                            social problems and be
                            ready to become
                            innovative startups. It
                            is a nationwide
                            initiative of the
                            Department of Science
                            and Technology (DOST)
                            to establish iHubs in
                            every province in the
                            Philippines.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                onNavigate?.(
                                    "about"
                                )
                            }
                            className="
                                inline-flex
                                items-center
                                px-6
                                py-2.5
                                border-2
                                border-sky-500
                                rounded-full
                                text-sm
                                font-dmsans
                                font-medium
                                text-sky-500
                                hover:bg-sky-50
                                transition-colors
                            "
                        >
                            Learn more
                        </button>
                    </div>
                </div>

                {/* Featured hubs */}
                {featured.length > 0 && (
                    <div
                        className={`
                            flex
                            flex-col
                            md:flex-row
                            gap-4
                            h-auto
                            md:h-[440px]
                            transition-opacity
                            duration-300

                            ${fadeOut
                                ? "opacity-0"
                                : "opacity-100"
                            }
                        `}
                    >
                        {featured.map(
                            (
                                hub,
                                index
                            ) => {
                                const isActive =
                                    index ===
                                    activeIndex;

                                return (
                                    <div
                                        key={
                                            hub.id
                                        }
                                        onMouseEnter={() =>
                                            setActiveIndex(
                                                index
                                            )
                                        }
                                        onClick={() =>
                                            setSelectedHub(
                                                hub
                                            )
                                        }
                                        className="
                                            group
                                            relative
                                            rounded-[2rem]
                                            overflow-hidden
                                            cursor-pointer
                                            h-[260px]
                                            md:h-full
                                            transition-[flex-grow]
                                            duration-500
                                            ease-out
                                        "
                                        style={{
                                            flexGrow:
                                                isActive
                                                    ? 3.2
                                                    : 1,
                                            flexBasis:
                                                0,
                                            flexShrink:
                                                1,
                                            minWidth:
                                                0,
                                        }}
                                    >
                                        <img
                                            src={
                                                hub.image_url!
                                            }
                                            alt={
                                                hub.name
                                            }
                                            className="
                                                absolute
                                                inset-0
                                                w-full
                                                h-full
                                                object-cover
                                                transition-transform
                                                duration-700
                                                group-hover:scale-105
                                            "
                                        />

                                        {/* Image overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                                            <h3
                                                className={`
                                                    font-dmsans
                                                    font-semibold
                                                    text-white
                                                    transition-all
                                                    duration-300

                                                    ${isActive
                                                        ? "text-xl"
                                                        : "text-sm line-clamp-2"
                                                    }
                                                `}
                                            >
                                                {
                                                    hub.name
                                                }
                                            </h3>

                                            <p
                                                className={`
                                                    font-dmsans
                                                    text-slate-200
                                                    text-sm
                                                    mt-1
                                                    transition-all
                                                    duration-300

                                                    ${isActive
                                                        ? "opacity-100 mb-3"
                                                        : "opacity-0 h-0 overflow-hidden"
                                                    }
                                                `}
                                            >
                                                {
                                                    hub.address
                                                }
                                            </p>

                                            <div
                                                className={`
                                                    font-dmsans
                                                    text-[11px]
                                                    text-white/60
                                                    transition-all
                                                    duration-300

                                                    ${isActive
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                    }
                                                `}
                                            >
                                                Click to view
                                                details
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                )}
            </section>

            {/* Existing iHub Modal */}
            <IHubModal
                hub={selectedHub}
                onClose={() =>
                    setSelectedHub(null)
                }
            />
        </>
    );
}