import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    motion,
    useInView,
} from "framer-motion";

import type { Page } from "../Header";

interface IHubNetworkSectionProps {
    onNavigate?: (page: Page) => void;
    totalHubs?: number;
    regionalHubs?: number;
    provincialHubs?: number;
    regions?: number;
}

function AnimatedNumber({
    value,
    duration = 1200,
}: {
    value: number;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement | null>(null);

    const isInView = useInView(ref, {
        once: true,
        amount: 0.6,
    });

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        let frameId: number;

        const animate = (time: number) => {
            if (startTime === null) {
                startTime = time;
            }

            const elapsed = time - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 3);

            setDisplayValue(
                Math.round(value * eased)
            );

            if (progress < 1) {
                frameId =
                    requestAnimationFrame(animate);
            }
        };

        frameId =
            requestAnimationFrame(animate);

        return () =>
            cancelAnimationFrame(frameId);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {displayValue}
        </span>
    );
}

export default function IHubNetworkSection({
    onNavigate,
    totalHubs = 59,
    regionalHubs = 5,
    provincialHubs = 54,
    regions = 17,
}: IHubNetworkSectionProps) {
    const stats = [
        {
            label:
                "Total No. of iHubs in the Philippines",
            value: totalHubs,
            color: "text-[#00AEEF]",
            circle: "bg-[#CFF3FF]",
            tilt: "-rotate-3",
        },
        {
            label: "Regional iHubs",
            value: regionalHubs,
            color: "text-[#86E21D]",
            circle: "bg-[#E3F8C8]",
            tilt: "rotate-2",
        },
        {
            label: "Provincial iHubs",
            value: provincialHubs,
            color: "text-[#C77DFF]",
            circle: "bg-[#EDD9FF]",
            tilt: "-rotate-2",
        },
        {
            label: "Regions",
            value: regions,
            color: "text-[#F16A64]",
            circle: "bg-[#FFD8D4]",
            tilt: "rotate-3",
        },
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 35,
            scale: 0.96,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
        },
    };

    return (
        <section className="relative overflow-hidden py-24 px-6 lg:px-12 flex flex-col items-center">

            {/* Background glow */}
            <motion.div
                animate={{
                    y: [0, -18, 0],
                    x: [0, 12, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-10 left-[8%] w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none"
            />

            <motion.div
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-10 right-[8%] w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"
            />

            {/* Heading */}
            <motion.h2
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.5,
                }}
                transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 font-poppins text-4xl md:text-[64px] text-white tracking-tight text-center mb-4"
            >
                The iHub Network
            </motion.h2>

            {/* Description */}
            <motion.p
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.5,
                }}
                transition={{
                    duration: 0.65,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 text-white text-[16px] font-dmsans font-medium text-center max-w-xl mb-8 leading-relaxed"
            >
                The current iHub network spans {regions} regions, with{" "}
                {totalHubs} hubs established nationwide. Explore the iHub
                Directory to discover the hubs across the country.
            </motion.p>

            {/* Button */}
            <motion.button
                type="button"
                onClick={() =>
                    onNavigate?.("find")
                }
                initial={{
                    opacity: 0,
                    y: 15,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,
                }}
                whileHover={{
                    scale: 1.04,
                }}
                whileTap={{
                    scale: 0.97,
                }}
                className="relative z-10 mb-12 px-6 py-2.5 border-2 border-white rounded-full text-sm font-dmsans font-medium text-white hover:bg-white hover:text-[#003F6A] transition-colors"
            >
                Explore directory
            </motion.button>

            {/* Cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true,
                    amount: 0.2,
                }}
                className="relative z-10 w-full max-w-[1000px] grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            >
                {stats.map(
                    (stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={cardVariants}
                            transition={{
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                            }}
                            className={`
                group
                relative
                overflow-hidden
                bg-white
                rounded-3xl
                border
                border-slate-100
                shadow-md
                p-6
                flex
                flex-col
                gap-2
                transform-gpu
                ${stat.tilt}
                hover:rotate-0
                hover:shadow-xl
                transition-all
                duration-300
              `}
                        >
                            {/* Pastel circle - completely hidden until hover */}
                            <div
                                className={`
                  absolute
                  -top-5
                  -right-5
                  w-20
                  h-20
                  rounded-full
                  ${stat.circle}
                  pointer-events-none

                  opacity-0
                  scale-50
                  translate-x-4
                  -translate-y-4

                  transition-all
                  duration-300
                  ease-out

                  group-hover:opacity-100
                  group-hover:scale-100
                  group-hover:translate-x-0
                  group-hover:translate-y-0
                `}
                            />

                            {/* Label */}
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.45,
                                    delay:
                                        0.1 +
                                        index * 0.08,
                                }}
                                className="relative z-10 text-[#002E6A] text-[16px] font-dmsans font-semibold leading-snug"
                            >
                                {stat.label}
                            </motion.p>

                            {/* Count */}
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay:
                                        0.18 +
                                        index * 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`
                  relative
                  z-10
                  font-dmsans
                  text-[72px]
                  sm:text-[84px]
                  lg:text-[96px]
                  leading-none
                  font-semibold
                  ${stat.color}
                `}
                            >
                                <AnimatedNumber
                                    value={stat.value}
                                />
                            </motion.p>
                        </motion.div>
                    )
                )}
            </motion.div>
        </section>
    );
}