const CONTACT_ITEMS = [
    {
        label: "Email",
        value: "dostihubs@gmail.com",
        icon: "email",
    },
    {
        label: "Phone",
        value: "+63 977 014 2783",
        icon: "phone",
    },
    {
        label: "Operating hours",
        value: "Monday – Friday",
        secondary: "8:00 AM – 5:00 PM",
        icon: "clock",
    },
];

export default function ContactDetails() {
    return (
        <div className="space-y-8">
            {CONTACT_ITEMS.map((item) => (
                <div
                    key={item.label}
                    className="flex items-start gap-4"
                >
                    <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
                        <ContactIcon type={item.icon} />
                    </div>

                    <div>
                        <p className="font-dmsans text-sm text-slate-500 mb-1">
                            {item.label}
                        </p>

                        <p className="font-dmsans font-semibold text-[#003F6A]">
                            {item.value}
                        </p>

                        {item.secondary && (
                            <p className="font-dmsans text-sm text-slate-500 mt-1">
                                {item.secondary}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function ContactIcon({
    type,
}: {
    type: string;
}) {
    if (type === "email") {
        return (
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
        );
    }

    if (type === "phone") {
        return (
            <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
            </svg>
        );
    }

    return (
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
    );
}