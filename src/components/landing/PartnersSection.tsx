const PARTNERS = [
    {
        name: "Wadhwani Foundation",
        image: "/assets/wadwhaniLogo.png",
        className: "h-16",
    },
    {
        name: "PCCI",
        image: "/assets/pcci_logo.webp",
        className: "h-20",
    },
    {
        name: "DEVCON",
        image: "/assets/devcon_logo.png",
        className: "h-12",
    },
    {
        name: "Leave a Nest",
        image: "/assets/leaveanestlogo.webp",
        className: "h-12",
    },
    {
        name: "GDAP",
        image: "/assets/gdap_logo.webp",
        className: "h-16",
    },
];

export default function PartnersSection() {
    return (
        <section className="py-24 px-6 lg:px-12 bg-white text-center">
            <span className="inline-block px-4 py-1.5 bg-sky-50 text-[#003F6A] border border-sky-100 rounded-full text-sm font-dmsans font-medium mb-6">
                Partners
            </span>

            <h2 className="max-w-[700px] mx-auto text-[32px] font-poppins font-medium text-[#003F6A] tracking-tight">
                Powered by a growing ecosystem
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 max-w-[1200px] mx-auto mt-12">
                {PARTNERS.map(
                    (partner) => (
                        <img
                            key={partner.name}
                            src={partner.image}
                            alt={partner.name}
                            className={`${partner.className} w-auto object-contain`}
                        />
                    )
                )}
            </div>
        </section>
    );
}