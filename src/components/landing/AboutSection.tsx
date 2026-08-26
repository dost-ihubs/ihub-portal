import { useState } from "react";

import type { IHub } from "../../types";
import type { Page } from "../Header";

interface AboutSectionProps {
    hubs?: IHub[];
    onNavigate?: (page: Page) => void;
}

export default function AboutSection({
    hubs = [],
    onNavigate,
}: AboutSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const featured = hubs.slice(0, 4);

    return (
        <section className="py-24 px-6 lg:px-12 bg-white max-w-[1250px] mx-auto w-full">
            <div className="flex justify-center mb-16">
                <div className="px-6 py-2 bg-sky-50 text-[#003F6A] border border-sky-100 rounded-full text-sm font-dmsans font-medium">
                    About iHubs
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">
                <h2 className="text-4xl md:text-[64px] font-poppins font-medium text-[#003F6A] tracking-tight">
                    What is an iHub?
                </h2>

                <div className="pt-2">
                    <p className="text-slate-700 font-dmsans text-lg leading-relaxed mb-4">
                        The iHub or Innovation Hub is a space where individuals and groups
                        can meet, interact, develop new ideas, and find solutions that
                        address economic and social problems and be ready to become
                        innovative startups. It is a nationwide initiative of the
                        Department of Science and Technology (DOST) to establish iHubs in
                        every province in the Philippines.
                    </p>

                    <button
                        type="button"
                        onClick={() => onNavigate?.("about")}
                        className="inline-flex items-center px-6 py-2.5 border-2 border-sky-500 rounded-full text-sm font-dmsans font-medium text-sky-500 hover:bg-sky-50 transition-colors"
                    >
                        Learn more
                    </button>
                </div>
            </div>

            {/* iHub cards */}
            {featured.length > 0 && (
                <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[440px]">
                    {featured.map((hub, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={hub.id}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => setActiveIndex(index)}
                                className="
                  group
                  relative
                  rounded-[2rem]
                  overflow-hidden
                  cursor-pointer
                  h-[260px] md:h-full
                  transition-[flex-grow]
                  duration-500
                  ease-out
                "
                                style={{
                                    flexGrow: isActive ? 3.2 : 1,
                                    flexBasis: 0,
                                    flexShrink: 1,
                                    minWidth: 0,
                                }}
                            >
                                <img
                                    src={
                                        hub.image_url ||
                                        "/assets/placeholderImage.png"
                                    }
                                    alt={hub.name}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src =
                                            "/assets/placeholderImage.png";
                                    }}
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

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />

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
                                        {hub.name}
                                    </h3>

                                    <p
                                        className={`
                      font-dmsans
                      text-slate-200
                      text-xs
                      mt-1
                      transition-all
                      duration-300
                      ${isActive
                                                ? "opacity-100 mb-3"
                                                : "opacity-0 h-0 overflow-hidden"
                                            }
                    `}
                                    >
                                        {hub.address}
                                    </p>

                                    <span
                                        className={`
                      inline-flex
                      items-center
                      bg-white
                      text-[#0C366D]
                      rounded-full
                      text-[11px]
                      font-dmsans
                      font-semibold
                      px-3
                      py-1.5
                      transition-all
                      duration-300
                      ${isActive
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-2 pointer-events-none"
                                            }
                    `}
                                    >
                                        EXPLORE IHUB
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}