export default function NewsHero() {
    return (
        <section className="px-4 sm:px-6 lg:px-12">
            <div className="
        relative
        max-w-[1250px]
        mx-auto
        min-h-[260px]
        md:min-h-[200px]
        rounded-[2rem]
        lg:rounded-[2.5rem]
        overflow-hidden
        flex
        items-center
        justify-center
        text-center
      ">
                <img
                    src="/assets/wv_ihub.jpg"
                    alt="DOST Innovation Hubs News"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-[#003F7D]/85" />

                <div className="relative z-10 px-6 max-w-3xl mx-auto">
                    <h1 className="font-poppins text-3xl md:text-5xl text-white leading-tight">
                        All News and Updates
                    </h1>

                    <p className="font-dmsans text-white/90 text-sm md:text-base mt-5 max-w-xl mx-auto leading-relaxed">
                        Stay up to date with the latest activities,
                        achievements, and developments from our DOST
                        Innovation Hubs across the Philippines.
                    </p>
                </div>
            </div>
        </section>
    );
}