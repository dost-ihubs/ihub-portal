import { useState } from "react";
import { supabase } from "../../utils/supabase";

interface ContactFormData {
    first_name: string;
    last_name: string;
    email: string;
    subject: string;
    message: string;
}

const initialForm: ContactFormData = {
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
};

export default function ContactForm() {
    const [form, setForm] = useState<ContactFormData>(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (submitting) return;

        setSubmitting(true);
        setSuccess(false);
        setErrorMessage("");

        try {
            const { error } = await supabase
                .from("contact_messages")
                .insert({
                    first_name: form.first_name.trim(),
                    last_name: form.last_name.trim(),
                    email: form.email.trim(),
                    subject: form.subject.trim(),
                    message: form.message.trim(),
                });

            if (error) {
                console.error("CONTACT ERROR:", error);
                console.error("MESSAGE:", error.message);
                console.error("DETAILS:", error.details);
                console.error("HINT:", error.hint);
                console.error("CODE:", error.code);

                setErrorMessage(
                    "We couldn't submit your message. Please try again."
                );

                return;
            }

            setForm(initialForm);
            setSuccess(true);
        } catch (error) {
            console.error(
                "Unexpected contact form error:",
                error
            );

            setErrorMessage(
                "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-slate-50 rounded-[2rem] p-7 sm:p-9 lg:p-10">
            <h2 className="font-poppins text-xl font-medium text-[#003F6A] mb-2">
                Send us a message
            </h2>

            <p className="font-dmsans text-slate-500 mb-8">
                Fill out the form below and we’ll get back to you as soon as possible.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                        label="First name"
                        name="first_name"
                        type="text"
                        placeholder="First name"
                        value={form.first_name}
                        onChange={handleChange}
                    />

                    <FormField
                        label="Last name"
                        name="last_name"
                        type="text"
                        placeholder="Last name"
                        value={form.last_name}
                        onChange={handleChange}
                    />
                </div>

                <FormField
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                />

                <FormField
                    label="Subject"
                    name="subject"
                    type="text"
                    placeholder="What is your inquiry about?"
                    value={form.subject}
                    onChange={handleChange}
                />

                <div>
                    <label className="block font-dmsans text-sm font-medium text-slate-700 mb-2">
                        Message
                    </label>

                    <textarea
                        name="message"
                        rows={6}
                        required
                        maxLength={5000}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        className="
              w-full
              px-4
              py-3.5
              rounded-xl
              bg-white
              border
              border-slate-200
              font-dmsans
              text-sm
              outline-none
              resize-none
              focus:border-sky-400
              focus:ring-2
              focus:ring-sky-100
              transition
            "
                    />
                </div>

                {success && (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 font-dmsans text-sm text-emerald-700">
                        Your message has been submitted successfully. Our team will review your inquiry.
                    </div>
                )}

                {errorMessage && (
                    <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 font-dmsans text-sm text-red-600">
                        {errorMessage}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="
            inline-flex
            items-center
            justify-center
            px-7
            py-3
            bg-sky-500
            hover:bg-sky-600
            disabled:bg-sky-300
            disabled:cursor-not-allowed
            text-white
            rounded-full
            font-dmsans
            text-sm
            font-semibold
            transition-colors
          "
                >
                    {submitting
                        ? "Sending..."
                        : "Send message"}
                </button>
            </form>
        </div>
    );
}

interface FormFieldProps {
    label: string;
    name: keyof ContactFormData;
    type: string;
    placeholder: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

function FormField({
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
}: FormFieldProps) {
    return (
        <div>
            <label className="block font-dmsans text-sm font-medium text-slate-700 mb-2">
                {label}
            </label>

            <input
                name={name}
                type={type}
                required
                maxLength={
                    name === "subject"
                        ? 200
                        : 255
                }
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
          w-full
          px-4
          py-3.5
          rounded-full
          bg-white
          border
          border-slate-200
          font-dmsans
          text-sm
          outline-none
          focus:border-sky-400
          focus:ring-2
          focus:ring-sky-100
          transition
        "
            />
        </div>
    );
}