import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    AUTO_ADVANCE_MS,
    TICK_MS,
    type IhubStrategy,
} from "../../data/aboutData";

interface StrategyServicesSectionProps {
    strategy: IhubStrategy;
    reverse?: boolean;
}

export default function StrategyServicesSection({
    strategy,
    reverse = false,
}: StrategyServicesSectionProps) {
    const [activeService, setActiveService] =
        useState(0);

    const [progress, setProgress] =
        useState(0);

    const intervalRef =
        useRef<ReturnType<
            typeof setInterval
        > | null>(null);

    useEffect(() => {
        setProgress(0);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setProgress((previous) => {
                const next =
                    previous +
                    (TICK_MS / AUTO_ADVANCE_MS) * 100;

                if (next >= 100) {
                    setActiveService(
                        (current) =>
                            (current + 1) %
                            strategy.services.length
                    );

                    return 0;
                }

                return next;
            });
        }, TICK_MS);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [
        activeService,
        strategy.services.length,
    ]);

    const selectService = (
        index: number
    ) => {
        if (index === activeService) return;

        setActiveService(index);
        setProgress(0);
    };

    const service =
        strategy.services[activeService];

    return (
        <div
            id={`${strategy.id}-services`}
            className="scroll-mt-24 border-b border-slate-100 last:border-b-0"
        >
            <div
                className={`
          max-w-6xl mx-auto
          px-6 py-16 md:py-24
          grid md:grid-cols-2
          gap-10 md:gap-16
          items-center
          ${reverse
                        ? "md:[&>*:first-child]:order-2"
                        : ""
                    }
        `}
            >
                {/* Service information */}
                <div>
                    <div className="inline-flex items-center gap-3 mb-5">
                        <span
                            className="h-12 w-12 rounded-2xl flex items-center justify-center"
                            style={{
                                backgroundColor:
                                    strategy.color,
                            }}
                        >
                            <img
                                src={strategy.icon}
                                alt=""
                                className="h-full w-full rounded-[1rem] object-contain"
                            />
                        </span>

                        <span
                            className="font-dmsans text-sm font-bold uppercase tracking-[0.18em]"
                            style={{
                                color: strategy.accent,
                            }}
                        >
                            {strategy.label}
                        </span>
                    </div>

                    <h2 className="font-poppins text-3xl md:text-4xl font-semibold text-[#00375D] leading-tight">
                        {strategy.headline}
                    </h2>

                    <div className="mt-8 space-y-3">
                        {strategy.services.map(
                            (item, index) => {
                                const active =
                                    index === activeService;

                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() =>
                                            selectService(index)
                                        }
                                        aria-pressed={active}
                                        className={`
                      w-full
                      text-left
                      rounded-2xl
                      px-5 py-4
                      transition-all duration-500
                      ${active
                                                ? "bg-white shadow-md"
                                                : "hover:bg-white/60"
                                            }
                    `}
                                    >
                                        <div className="min-w-0">
                                            <h3
                                                className={`
                          font-poppins font-bold
                          transition-colors duration-300
                          ${active
                                                        ? "text-[#002E6A]"
                                                        : "text-slate-400"
                                                    }
                        `}
                                            >
                                                {item.title}
                                            </h3>

                                            <div
                                                className={`
                          grid
                          transition-all
                          duration-500
                          ease-in-out
                          ${active
                                                        ? "grid-rows-[1fr] opacity-100 mt-1"
                                                        : "grid-rows-[0fr] opacity-0"
                                                    }
                        `}
                                            >
                                                <div className="overflow-hidden">
                                                    <p className="text-sm text-slate-500 font-dmsans leading-relaxed">
                                                        {
                                                            item.description
                                                        }
                                                    </p>

                                                    <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${active
                                                                    ? progress
                                                                    : 0
                                                                    }%`,

                                                                backgroundColor:
                                                                    strategy.accent,

                                                                transition:
                                                                    "width 100ms linear",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>

                {/* Active service image */}
                <div
                    className="
            relative
            rounded-[2rem]
            p-5 md:p-8
            overflow-hidden
            transition-colors
            duration-700
            ease-in-out
          "
                    style={{
                        backgroundColor: strategy.color,
                    }}
                >
                    <div
                        className="absolute -left-8 top-12 h-28 w-28 rounded-full opacity-30"
                        style={{
                            backgroundColor:
                                strategy.accent,
                        }}
                    />

                    <div
                        className="absolute -right-10 bottom-8 h-36 w-36 rounded-full opacity-25"
                        style={{
                            backgroundColor:
                                strategy.accent,
                        }}
                    />

                    <img
                        key={service.image}
                        src={service.image}
                        alt={`${service.title} activity`}
                        className="
              relative
              w-full
              rounded-2xl
              shadow-lg
              object-cover
              aspect-[4/3]
              animate-[fadeIn_500ms_ease-in-out]
            "
                    />
                </div>
            </div>
        </div>
    );
}