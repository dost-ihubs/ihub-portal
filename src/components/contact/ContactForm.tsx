export default function ContactForm() {
    return (
        <div className="bg-slate-50 rounded-[2rem] p-7 sm:p-9 lg:p-10">
            <h2 className="font-poppins text-xl font-medium text-[#003F6A] mb-2">
                Send us a message
            </h2>

            <p className="font-dmsans text-slate-500 mb-8">
                Fill out the form below and we’ll get back to you as soon as possible.
            </p>

            <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                        label="First name"
                        type="text"
                        placeholder="First name"
                    />

                    <FormField
                        label="Last name"
                        type="text"
                        placeholder="Last name"
                    />
                </div>

                <FormField
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                />

                <FormField
                    label="Subject"
                    type="text"
                    placeholder="What is your inquiry about?"
                />

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
    );
}

interface FormFieldProps {
    label: string;
    type: string;
    placeholder: string;
}

function FormField({
    label,
    type,
    placeholder,
}: FormFieldProps) {
    return (
        <div>
            <label className="block font-dmsans text-sm font-medium text-slate-700 mb-2">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 font-dmsans text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
            />
        </div>
    );
}