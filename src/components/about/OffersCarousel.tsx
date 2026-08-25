import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    OFFERS,
    OFFERS_AUTO_ADVANCE_MS,
} from "../../data/aboutData";

import {
    getOfferTrackLayout,
} from "../../utils/offerLayout";

export default function OffersCarousel() {
    const [activeOffer, setActiveOffer] =
        useState(0);

    const intervalRef =
        useRef<ReturnType<
            typeof setInterval
        > | null>(null);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(
                intervalRef.current
            );
        }

        intervalRef.current =
            setInterval(() => {
                setActiveOffer(
                    (current) =>
                        (current + 1) %
                        OFFERS.length
                );
            }, OFFERS_AUTO_ADVANCE_MS);

        return () => {
            if (intervalRef.current) {
                clearInterval(
                    intervalRef.current
                );
            }
        };
    }, [activeOffer]);

    const trackLayout =
        getOfferTrackLayout(
            activeOffer,
            OFFERS
        );

    return (
        <section className="bg-gradient-to-b from-sky-100 to-sky-300 py-16 px-6">
            <h2 className="font-poppins text-4xl md:text-5xl font-semibold text-[#002E6A] text-center mb-10">
                What iHub Offers
            </h2>

            <div className="max-w-6xl mx-auto px-2">
                <div className="relative h-[340px] md:h-[420px]">
                    {OFFERS.map(
                        (offer, index) => {
                            const {
                                left,
                                width,
                                distance,
                            } =
                                trackLayout[index];

                            const active =
                                distance === 0;

                            return (
                                <button
                                    key={offer.title}
                                    type="button"
                                    onClick={() =>
                                        setActiveOffer(index)
                                    }
                                    aria-pressed={active}
                                    aria-label={offer.title}
                                    className={`
                    absolute
                    top-0 bottom-0
                    overflow-hidden
                    rounded-[2rem]
                    bg-white
                    shadow-lg
                    transition-all
                    duration-700
                    ease-in-out
                    ${active
                                            ? ""
                                            : "hover:opacity-90"
                                        }
                  `}
                                    style={{
                                        left,
                                        width,
                                        zIndex:
                                            10 - distance,
                                    }}
                                >
                                    {active ? (
                                        <div className="h-full grid md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-6 items-center text-left">
                                            <div className="min-w-0">
                                                <h3 className="font-poppins text-xl md:text-3xl font-semibold text-[#00375D] mb-3">
                                                    {offer.title}
                                                </h3>

                                                <p className="text-slate-500 text-sm md:text-base font-dmsans leading-relaxed">
                                                    {
                                                        offer.description
                                                    }
                                                </p>
                                            </div>

                                            <img
                                                src={offer.image}
                                                alt={offer.title}
                                                className="hidden md:block w-full h-full min-h-0 rounded-2xl object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={offer.image}
                                            alt={offer.title}
                                            className="h-full w-full object-cover"
                                        />
                                    )}
                                </button>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
}