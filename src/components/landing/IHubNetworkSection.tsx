import type { Page } from "../Header";

interface IHubNetworkSectionProps {
    onNavigate?: (page: Page) => void;
    totalHubs?: number;
    regionalHubs?: number;
    provincialHubs?: number;
    regions?: number;
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
            label: "Total iHubs",
            value: totalHubs,
            color: "text-[#00AEEF]",
            tilt: "-rotate-3",
        },
        {
            label: "Regional iHubs",
            value: regionalHubs,
            color: "text-[#86E21D]",
            tilt: "rotate-2",
        },
        {
            label: "Provincial iHubs",
            value: provincialHubs,
            color: "text-[#C77DFF]",
            tilt: "-rotate-2",
        },
        {
            label: "Regions",
            value: regions,
            color: "text-[#F16A64]",
            tilt: "rotate-3",
        },
    ];

    return (
        <section className="py-24 px-6 lg:px-12 flex flex-col items-center">
            <h2 className="font-poppins text-4xl md:text-[64px] text-white tracking-tight text-center mb-4">
                The iHub Network
            </h2>

            <p className="text-white/90 text-base font-dmsans font-medium text-center max-w-xl mb-8 leading-relaxed">
                Explore the current iHub network and discover Innovation Hubs across the
                Philippines.
            </p>

            <button
                type="button"
                onClick={() => onNavigate?.("find")}
                className="mb-12 px-6 py-2.5 border-2 border-white rounded-full text-sm font-dmsans font-medium text-white hover:bg-sky-500 transition-colors"
            >
                Explore directory
            </button>

            <div className="w-full max-w-[1000px] grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className={`bg-white rounded-3xl border border-slate-100 shadow-md p-6 flex flex-col gap-2 transform-gpu ${stat.tilt} hover:rotate-0 hover:-translate-y-1 hover:shadow-xl transition-transform duration-300`}
                    >
                        <p className="text-[#002E6A] text-base font-dmsans font-semibold leading-snug">
                            {stat.label}
                        </p>

                        <p
                            className={`font-dmsans text-6xl md:text-[96px] font-semibold ${stat.color}`}
                        >
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}