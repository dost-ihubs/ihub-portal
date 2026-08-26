import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function SectionReveal({
    children,
    delay = 0,
    className = "",
}: SectionRevealProps) {
    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}