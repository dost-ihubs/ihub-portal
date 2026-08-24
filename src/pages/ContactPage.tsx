import React from "react";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-[1250px] mx-auto">

        {/* CONTACT SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT */}
          <div className="lg:pt-6">
            <span className="inline-block px-4 py-1.5 bg-sky-50 text-[#003F6A] border border-sky-100 rounded-full text-sm font-dmsans font-medium mb-6">
              Contact Us
            </span>

            <h1 className="font-poppins text-[48px] font-medium text-[#003F6A] leading-[1.05] tracking-tight mb-6">
              Get in touch with us
            </h1>

            <p className="font-dmsans text-slate-600 text-lg leading-relaxed max-w-lg mb-12">
              Have questions about DOST Innovation Hubs, our services, partnerships,
              or innovation support initiatives? Reach out to us and our team will be glad to assist you.
            </p>

            <div className="space-y-8">

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                </div>

                <div>
                  <p className="font-dmsans text-sm text-slate-500 mb-1">
                    Email
                  </p>
                  <p className="font-dmsans font-semibold text-[#003F6A]">
                    dostihubs@gmail.com
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>

                <div>
                  <p className="font-dmsans text-sm text-slate-500 mb-1">
                    Phone
                  </p>
                  <p className="font-dmsans font-semibold text-[#003F6A]">
                    +63 977 014 2783
                  </p>
                </div>
              </div>

              {/* HOURS */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5"
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
                  <p className="font-dmsans text-sm text-slate-500 mb-1">
                    Operating hours
                  </p>
                  <p className="font-dmsans font-semibold text-[#003F6A]">
                    Monday – Friday
                  </p>
                  <p className="font-dmsans text-sm text-slate-500 mt-1">
                    8:00 AM – 5:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="bg-slate-50 rounded-[2rem] p-7 sm:p-9 lg:p-10">
            <h2 className="font-poppins text-xl font-medium text-[#003F6A] mb-2">
              Send us a message
            </h2>

            <p className="font-dmsans text-slate-500 mb-8">
              Fill out the form below and we’ll get back to you as soon as
              possible.
            </p>

            <form className="space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-dmsans text-sm font-medium text-slate-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 font-dmsans text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                  />
                </div>

                <div>
                  <label className="block font-dmsans text-sm font-medium text-slate-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 font-dmsans text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-dmsans text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 font-dmsans text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                />
              </div>

              <div>
                <label className="block font-dmsans text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is your inquiry about?"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 font-dmsans text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                />
              </div>

              <div>
                <label className="block font-dmsans text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 font-dmsans text-sm outline-none resize-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center px-7 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-dmsans text-sm font-semibold transition-colors"
              >
                Send message
              </button>

            </form>
          </div>
        </section>

        {/* FACEBOOK CARD */}
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

      </div>
    </main>
  );
}