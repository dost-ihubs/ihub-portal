export type IhubService = {
    title: string;
    description: string;
    image: string;
};

export type IhubStrategy = {
    id: string;
    label: string;
    headline: string;
    color: string;
    accent: string;
    image: string;
    icon: string;
    services: IhubService[];
};

export type IHubOffer = {
    title: string;
    description: string;
    image: string;
};

export const STRATEGIES: IhubStrategy[] = [
    {
        id: "inspire",
        label: "Inspire",
        headline: "Discover ideas, opportunities, and technologies.",
        color: "#FDE8B8",
        accent: "#F5B72F",
        image: "/assets/inspire_pic.JPG",
        icon: "/assets/inspire.svg",
        services: [
            {
                title: "Camp Fire Sessions",
                image: "/assets/campfire.png",
                description:
                    "Networking sessions that inspire collaboration and entrepreneurial ideas.",
            },
            {
                title: "Fireside Chats",
                image: "/assets/firesidechat.png",
                description:
                    "Interactive discussion among nascent startups and resource persons on a specific topic.",
            },
        ],
    },

    {
        id: "interact",
        label: "Interact",
        headline: "Connect innovators with mentors, peers, and industry.",
        color: "#FFB8B5",
        accent: "#F16A64",
        image: "/assets/interact_pic.JPG",
        icon: "/assets/interact.svg",
        services: [
            {
                title: "Idea Pitching",
                image: "/assets/pitching.JPG",
                description:
                    "Presenting ideas to gain support from investors, partners, and stakeholders.",
            },
            {
                title: "Reverse Pitching",
                image: "/assets/reversepitching.png",
                description:
                    "MSMEs and stakeholders present challenges and opportunities to experts.",
            },
            {
                title: "Talent Matching",
                image: "/assets/talent-matching.JPG",
                description:
                    "Connecting startups with skilled teams to build impactful solutions.",
            },
        ],
    },

    {
        id: "ideate",
        label: "Ideate",
        headline: "Shape raw ideas into testable concepts.",
        color: "#E3D8FB",
        accent: "#8B5CF6",
        image: "/assets/capacity_building.JPG",
        icon: "/assets/ideate.svg",
        services: [
            {
                title: "Design Thinking Sessions",
                image: "/assets/capacity_building.JPG",
                description:
                    "Presenting ideas to gain support from investors, partners, and stakeholders.",
            },
            {
                title: "One-on-one Consultation",
                image: "/assets/1on1_consult.jpeg",
                description:
                    "One-on-one mentoring to refine ideas and support startup growth.",
            },
            {
                title: "Group Sessions",
                image: "/assets/group_session.png",
                description:
                    "Collaborative sessions for sharing ideas, insights, and experiences.",
            },
            {
                title: "Hackathon",
                image: "/assets/hackathon.jpg",
                description:
                    "Bringing developers, data scientists, and AI enthusiasts to solve real-world problems.",
            },
        ],
    },

    {
        id: "initiate",
        label: "Initiate",
        headline: "Launch your project, startup, or technology.",
        color: "#D3F3E3",
        accent: "#10B981",
        image: "/assets/mapping.png",
        icon: "/assets/initiate.svg",
        services: [
            {
                title: "Crafting of Business Model Canvas",
                image: "/assets/mapping.png",
                description:
                    "Presenting ideas to gain support from investors, partners, and stakeholders.",
            },
            {
                title: "Connecting Startups with Suitable TBIs",
                image: "/assets/tbimatching.png",
                description:
                    "Connecting and endorsing startups to the most suitable Technology Business Incubator (TBI).",
            },
        ],
    },
];

export const OFFERS: IHubOffer[] = [
    {
        title: "Collaborative Space",
        description:
            "Modern and flexible spaces designed for teamwork, creativity, and productivity.",
        image: "/assets/wv_ihub.jpg",
    },
    {
        title: "Mentorship & Coaching",
        description:
            "Connect with experienced mentors and experts to guide your startup journey.",
        image: "/assets/mentoring.JPG",
    },
    {
        title: "Capacity Building",
        description:
            "Access training, workshops, and bootcamps to build your skills and knowledge.",
        image: "/assets/capacity_building.JPG",
    },
    {
        title: "Networking Opportunities",
        description:
            "Meet innovators, investors, and partners to grow your network and collaborations.",
        image: "/assets/networking.JPG",
    },
    {
        title: "Programs and Events",
        description:
            "Join programs, challenges, and events that spark ideas and drive innovation.",
        image: "/assets/events.jpg",
    },
];

export const AUTO_ADVANCE_MS = 6000;
export const TICK_MS = 100;
export const OFFERS_AUTO_ADVANCE_MS = 5000;