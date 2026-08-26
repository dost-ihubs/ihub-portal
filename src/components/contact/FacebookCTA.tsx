export default function FacebookCTA() {
    return (
        <section className="mt-20">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#003F6A] px-8 py-10 md:px-12 md:py-12">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white text-[#1877F2] flex items-center justify-center">
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
                                </svg>
                            </div>

                            <span className="font-dmsans text-white/70 text-sm">
                                Follow us on Facebook
                            </span>
                        </div>

                        <h2 className="font-poppins text-3xl md:text-4xl font-medium text-white mb-3">
                            Stay in the loop with the latest from iHubs
                        </h2>

                        <p className="font-dmsans text-white/70 leading-relaxed">
                            Keep up with the latest iHub activities, startup opportunities,
                            events, and stories happening across the country.
                        </p>
                    </div>

                    <a
                        href="https://www.facebook.com/profile.php?id=61593523025331"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center px-7 py-3 border-2 border-white rounded-full font-dmsans text-sm font-semibold text-white hover:bg-white hover:text-[#003F6A] transition-colors whitespace-nowrap w-fit"
                    >
                        Follow on Facebook
                    </a>
                </div>
            </div>
        </section>
    );
}