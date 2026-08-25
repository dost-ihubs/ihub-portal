export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6 lg:px-12 text-slate-500 text-sm">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <img
                        src="/assets/iHubLogo.png"
                        alt="iHub"
                        className="h-8 w-auto"
                    />

                    <p>© 2026 iHub Portal. All rights reserved.</p>
                </div>

                <div className="flex gap-6 font-semibold">
                    <a
                        href="#"
                        className="hover:text-[#00375D] transition-colors"
                    >
                        Terms
                    </a>

                    <a
                        href="#"
                        className="hover:text-[#00375D] transition-colors"
                    >
                        Privacy
                    </a>

                    <a
                        href="#"
                        className="hover:text-[#00375D] transition-colors"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}