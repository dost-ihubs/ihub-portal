import { motion } from "framer-motion";

const partners = [
    {
        name: "DevCon",
        logo: "/assets/devcon_logo.png",
    },
    {
        name: "GDAP",
        logo: "/assets/gdap_logo.webp",
    },
    {
        name: "LeaveANestPH",
        logo: "/assets/leaveanestlogo.webp",
    },
    {
        name: "PCCI Logo",
        logo: "/assets/pcci_logo.webp",
    },
    {
        name: "wadwhaniLogo",
        logo: "/assets/wadwhaniLogo.png",
    },
];

export default function PartnersSection() {
    // Duplicate the logos so the ticker can loop seamlessly
    const tickerItems = [...partners, ...partners];

    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="max-w-[1250px] mx-auto px-6 lg:px-12">
                <motion.div
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
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 bg-sky-50 text-[#003F6A] border border-sky-100 rounded-full text-sm font-dmsans font-medium mb-5">
                        Our Partners
                    </span>

                    <h2 className="font-poppins text-3xl md:text-4xl font-medium text-[#003F6A]">
                        Collaborating for innovation
                    </h2>
                </motion.div>
            </div>

            {/* Ticker */}
            <div className="relative w-full overflow-hidden group">
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="partner-ticker flex w-max">
                    {tickerItems.map((partner, index) => (
                        <div
                            key={`${partner.name}-${index}`}
                            className="
                flex
                items-center
                justify-center
                min-w-[190px]
                md:min-w-[230px]
                px-8
                py-6
              "
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="
                  max-h-14
                  md:max-h-16
                  max-w-[150px]
                  md:max-w-[180px]
                  object-contain
                  opacity-100
                  transition-all
                  duration-300
                  hover:scale-105
                "
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style>
                {`
          @keyframes partnerTicker {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          .partner-ticker {
            animation: partnerTicker 25s linear infinite;
          }

          .group:hover .partner-ticker {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .partner-ticker {
              animation: none;
            }
          }
        `}
            </style>
        </section>
    );
}