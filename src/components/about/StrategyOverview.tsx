import { useState } from "react";

import {
    STRATEGIES,
} from "../../data/aboutData";

export default function StrategyOverview() {
    const [strategyIndex, setStrategyIndex] =
        useState(0);

    const strategy =
        STRATEGIES[strategyIndex];

    const selectStrategy = (
        index: number
    ) => {
        if (index === strategyIndex) return;

        setStrategyIndex(index);
    };

    const scrollToServices = () => {
        document
            .getElementById(
                `${strategy.id}-services`
            )
            ?.scrollIntoView({
                behavior: "smooth",
            });
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 to-sky-200 py-16 px-6">
            <h2 className="font-poppins text-4xl md:text-5xl font-semibold text-[#002E6A] text-center">
                The 4Is Strategy
            </h2>

            {/* Strategy selector */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                {STRATEGIES.map(
                    (item, index) => {
                        const active =
                            index === strategyIndex;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() =>
                                    selectStrategy(index)
                                }
                                aria-pressed={active}
                                aria-label={`Show ${item.label} strategy`}
                                className={`
                  h-20 w-20
                  rounded-2xl
                  border-4 border-white
                  flex items-center justify-center
                  overflow-hidden
                  transition-all duration-500
                  ${active
                                        ? "scale-110 shadow-lg"
                                        : "opacity-60 hover:opacity-100"
                                    }
                `}
                            >
                                <img
                                    src={item.icon}
                                    alt=""
                                    className={`
                    h-full w-full
                    object-cover
                    transition-all duration-500
                    ${active
                                            ? "grayscale-0"
                                            : "grayscale"
                                        }
                  `}
                                />
                            </button>
                        );
                    }
                )}
            </div>

            {/* Active strategy */}
            <div className="mt-10 max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 mb-4">
                        <img
                            src={strategy.icon}
                            alt=""
                            className="h-8 w-8 object-contain rounded-md"
                        />

                        <span className="font-poppins font-semibold text-[#00375D]">
                            {strategy.label}
                        </span>
                    </div>

                    <p
                        key={strategy.id}
                        className="font-poppins text-2xl md:text-3xl font-semibold text-[#002E6A] leading-tight"
                    >
                        {strategy.headline}
                    </p>

                    <button
                        type="button"
                        onClick={scrollToServices}
                        className="inline-flex items-center px-5 py-2.5 border-2 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-80 mt-6"
                        style={{
                            color: strategy.accent,
                            borderColor:
                                strategy.accent,
                        }}
                    >
                        Explore {strategy.label} services
                    </button>
                </div>

                {/* Image */}
                <div
                    className="relative rounded-[2rem] p-4 md:p-6 transition-colors duration-700 ease-in-out"
                    style={{
                        backgroundColor:
                            strategy.color,
                    }}
                >
                    <div
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-24 w-10 rounded-full opacity-60 transition-colors duration-700"
                        style={{
                            backgroundColor:
                                strategy.accent,
                        }}
                    />

                    <div
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-24 w-10 rounded-full opacity-60 transition-colors duration-700"
                        style={{
                            backgroundColor:
                                strategy.accent,
                        }}
                    />

                    <img
                        key={strategy.image}
                        src={strategy.image}
                        alt={`${strategy.label} activity`}
                        className="relative w-full rounded-[1.5rem] object-cover aspect-[4/3]"
                    />
                </div>
            </div>
        </section>
    );
}