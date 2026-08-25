import { ThreeDPhotoCarousel } from "../Carousel";

export default function AboutHero() {
    return (
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-16">
            <div className="relative overflow-hidden rounded-[2rem] px-8 md:px-14 pt-12 md:pt-14 pb-0">
                <img
                    src="/assets/wv_ihub.jpg"
                    alt="DOST Innovation Hub"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#235494]/90 to-[#002E6A]/85" />

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <h1 className="font-poppins text-3xl md:text-5xl text-white leading-tight">
                        Built to strengthen the Philippine innovation ecosystem
                    </h1>

                    <p className="mt-4 max-w-xl mx-auto text-white/90 text-sm md:text-base font-dmsans">
                        The Innovation Hub (iHub) is a nationwide DOST initiative that gives
                        every province and region a space to turn ideas into startups.
                    </p>
                </div>

                <div className="relative z-10 mt-4 max-w-5xl mx-auto">
                    <ThreeDPhotoCarousel />
                </div>
            </div>
        </section>
    );
}