import type { Page } from "./Header";

interface FooterProps {
    onNavigate?: (page: Page) => void;
}

export default function Footer({
    onNavigate,
}: FooterProps) {
    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="max-w-[1250px] mx-auto px-6 lg:px-12 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_1.1fr] gap-10 lg:gap-16">

                    {/* Brand */}
                    <div>
                        <img
                            src="/assets/iHubLogo.png"
                            alt="DOST Innovation Hubs"
                            className="h-10 w-auto mb-5"
                        />

                        <p className="font-dmsans text-sm text-slate-500 leading-relaxed max-w-sm">
                            DOST Innovation Hubs support innovators, startups, and communities
                            through collaborative spaces, programs, and innovation support
                            services across the Philippines.
                        </p>

                        <div className="flex items-center gap-3 mt-6">
                            <a
                                href="https://www.facebook.com/profile.php?id=61593523025331"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
                            >
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="font-poppins text-sm font-semibold text-[#003F6A] mb-5">
                            Explore
                        </h3>

                        <div className="flex flex-col items-start gap-3">

                            <button
                                type="button"
                                onClick={() => onNavigate?.("about")}
                                className="font-dmsans text-sm text-slate-500 hover:text-sky-500 transition-colors text-left"
                            >
                                About iHubs
                            </button>

                            <button
                                type="button"
                                onClick={() => onNavigate?.("find")}
                                className="font-dmsans text-sm text-slate-500 hover:text-sky-500 transition-colors text-left"
                            >
                                Find an iHub
                            </button>

                            <button
                                type="button"
                                onClick={() => onNavigate?.("news")}
                                className="font-dmsans text-sm text-slate-500 hover:text-sky-500 transition-colors text-left"
                            >
                                News
                            </button>

                            <button
                                type="button"
                                onClick={() => onNavigate?.("contact")}
                                className="font-dmsans text-sm text-slate-500 hover:text-sky-500 transition-colors text-left"
                            >
                                Contact
                            </button>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-poppins text-sm font-semibold text-[#003F6A] mb-5">
                            Contact Us
                        </h3>

                        <div className="space-y-4">
                            <a
                                href="mailto:dostihubs@gmail.com"
                                className="flex items-start gap-3 group"
                            >
                                <div className="mt-0.5 text-sky-500">
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <polyline points="3 7 12 13 21 7" />
                                    </svg>
                                </div>

                                <p className="font-dmsans text-sm text-slate-500 group-hover:text-sky-500 transition-colors">
                                    dostihubs@gmail.com
                                </p>
                            </a>

                            <a
                                href="tel:+639770142783"
                                className="flex items-start gap-3 group"
                            >
                                <div className="mt-0.5 text-sky-500">
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>

                                <p className="font-dmsans text-sm text-slate-500 group-hover:text-sky-500 transition-colors">
                                    +63 977 014 2783
                                </p>
                            </a>

                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-sky-500">
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="12" r="9" />
                                        <polyline points="12 7 12 12 15 14" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="font-dmsans text-sm text-slate-500">
                                        Monday – Friday
                                    </p>

                                    <p className="font-dmsans text-xs text-slate-400 mt-1">
                                        8:00 AM – 5:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-200">
                <div className="max-w-[1250px] mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-dmsans text-xs text-slate-400">
                        © 2026 DOST Innovation Hubs. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        <a
                            href="#"
                            className="font-dmsans text-xs text-slate-400 hover:text-sky-500 transition-colors"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="font-dmsans text-xs text-slate-400 hover:text-sky-500 transition-colors"
                        >
                            Terms of Use
                        </a>

                        <a
                            href="#"
                            className="font-dmsans text-xs text-slate-400 hover:text-sky-500 transition-colors"
                        >
                            Site Map
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}