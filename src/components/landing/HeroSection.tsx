import type React from "react";
import type { Page } from "../Header";
import { motion } from "framer-motion";

interface HeroSectionProps {
  mapComponent?: React.ReactNode;
  onNavigate?: (page: Page) => void;
}

export default function HeroSection({
  mapComponent,
  onNavigate,
}: HeroSectionProps) {
  return (
    <section className="relative z-10 w-full bg-white rounded-b-[2.5rem] lg:rounded-b-[4rem] overflow-hidden pt-20 md:pt-32 pb-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1370px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Intro */}
        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative rounded-[2rem] overflow-hidden min-h-[500px] sm:min-h-[560px] lg:min-h-[calc(100dvh-180px)] flex flex-col items-center justify-center text-center p-8 sm:p-10 lg:p-12"
        >
          <img
            src="/assets/wv_ihub.jpg"
            alt="Modern co-working space"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#235494]/90 to-[#002E6A]/85" />

          <div className="relative z-10 flex flex-col items-center space-y-6 max-w-md">
            <motion.span
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.25,
              }}
              className="inline-block px-5 py-1.5 border border-white/50 text-white rounded-full text-xs font-poppins font-medium tracking-wide uppercase"
            >
              DOST iHubs
            </motion.span>

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-poppins text-5xl sm:text-6xl lg:text-[72px] leading-[1.1] text-white"
            >
              Innovation Starts Here
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.45,
              }}
              className="font-dmsans text-white/90 lg:text-lg leading-snug"
            >
              The DOST Innovation Hub (iHub) plays a critical role in the
              development and success of startups, strengthening the Philippine
              innovation ecosystem from the ground up.
            </motion.p>

            <motion.button
              type="button"
              onClick={() => onNavigate?.("about")}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.55,
              }}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="font-dmsans text-sm px-7 py-3 bg-sky-500 hover:bg-sky-400 transition-colors text-white rounded-full font-semibold shadow-lg"
            >
              Learn more
            </motion.button>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative rounded-[2rem] overflow-hidden min-h-[400px] sm:min-h-[480px] lg:min-h-[calc(100dvh-180px)] bg-[#DBEFFF]"
        >
          {/* Latest events card */}
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.45,
            }}
            className="absolute top-6 left-6 z-20"
          >
            <div className="relative w-48 bg-white rounded-2xl shadow-sm p-4 pr-8">
              <p className="text-slate-800 text-sm font-dmsans font-medium leading-snug">
                Find out about the latest events
              </p>

              <motion.button
                type="button"
                onClick={() => onNavigate?.("news")}
                whileHover={{
                  scale: 1.08,
                  rotate: 3,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-[#002E6A] text-white flex items-center justify-center shadow-md hover:bg-sky-500 transition-colors"
                aria-label="View news"
              >
                ↗
              </motion.button>
            </div>
          </motion.div>

          {/* Directory button */}
          <motion.button
            type="button"
            onClick={() => onNavigate?.("find")}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.55,
            }}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="absolute top-[190px] right-6 z-20 inline-flex items-center bg-[#002E6A] hover:bg-sky-500 transition-colors text-white px-5 py-2.5 rounded-full text-xs font-dmsans font-medium shadow-sm"
          >
            Check out directory
          </motion.button>

          {/* Map */}
          <div className="absolute inset-0 flex items-center justify-center">
            {mapComponent ? (
              <div className="w-full h-full flex items-center justify-center">
                {mapComponent}
              </div>
            ) : (
              <img
                src="/assets/placeholderImage.png"
                alt="Philippines map"
                className="w-[85%] h-[110%] object-contain translate-x-4"
              />
            )}
          </div>

          {/* Facebook */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.65,
            }}
            className="absolute bottom-6 left-6 z-20"
          >
            <motion.a
              href="https://www.facebook.com/profile.php?id=61593523025331"
              target="_blank"
              rel="noreferrer"
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-800 pl-1.5 pr-4 py-1.5 rounded-full text-xs font-dmsans font-medium shadow-sm hover:bg-white transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold">
                f
              </span>

              Find us on social networks
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}