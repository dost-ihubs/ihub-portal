export default function CTASection() {
    return (
        <section className="py-12 px-6 lg:px-12 bg-white pb-24">
            <div className="max-w-[1200px] mx-auto rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch bg-sky-400">
                <div className="relative z-10 p-10 lg:p-14 text-white flex-1 flex flex-col justify-center">
                    <h2 className="text-4xl md:text-[56px] font-poppins font-medium mb-3 leading-tight">
                        Collect your iMugs
                    </h2>

                    <p className="font-dmsans text-white text-base mb-6 leading-relaxed max-w-sm">
                        Experience innovation across
                        the Philippines. Visit
                        Innovation Hubs, discover local
                        innovators, and collect an iMug
                        along the way.
                    </p>

                    <button
                        type="button"
                        className="inline-flex items-center px-6 py-2.5 border-2 border-white rounded-full text-sm font-dmsans font-medium text-white hover:bg-white hover:text-sky-500 transition-colors w-fit"
                    >
                        Start collecting
                    </button>
                </div>

                <div className="relative flex-1 min-h-[220px] lg:min-h-0 overflow-hidden">
                    <img
                        src="/assets/iMugs.jpg"
                        alt="iMugs Collection"
                        className="w-full h-full object-cover object-center"
                    />

                    <div className="absolute inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-sky-400 to-transparent" />
                </div>
            </div>
        </section>
    );
}