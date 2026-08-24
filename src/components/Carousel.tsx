"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
    AnimatePresence,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
    defaultValue?: boolean
    initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
    query: string,
    {
        defaultValue = false,
        initializeWithValue = true,
    }: UseMediaQueryOptions = {}
): boolean {
    const getMatches = (query: string): boolean => {
        if (IS_SERVER) {
            return defaultValue
        }
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState<boolean>(() => {
        if (initializeWithValue) {
            return getMatches(query)
        }
        return defaultValue
    })

    const handleChange = () => {
        setMatches(getMatches(query))
    }

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query)
        handleChange()

        matchMedia.addEventListener("change", handleChange)

        return () => {
            matchMedia.removeEventListener("change", handleChange)
        }
    }, [query])

    return matches
}

const keywords = [
    "night",
    "city",
    "sky",
    "sunset",
    "sunrise",
    "winter",
    "skyscraper",
    "building",
    "cityscape",
    "architecture",
    "street",
    "lights",
    "downtown",
    "bridge",
]

const duration = 0.15
const transition = {
    duration,
    ease: [0.32, 0.72, 0, 1] as const,
}

const transitionOverlay = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1] as const,
}

const Carousel = memo(
    ({
        controls,
        cards,
    }: {
        controls: any
        cards: string[]
    }) => {
        const isScreenSizeSm = useMediaQuery("(max-width: 700px)")
        const cylinderWidth = isScreenSizeSm ? 1100 : 1800
        const faceCount = cards.length
        const faceWidth = cylinderWidth / faceCount
        const radius = cylinderWidth / (2 * Math.PI)
        const rotation = useMotionValue(0)
        const transform = useTransform(
            rotation,
            (value: number) => `rotate3d(0, 1, 0, ${value}deg)`
        )

        return (
            <div
                className="flex h-full items-center justify-center bg-mauve-dark-2"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                <motion.div
                    drag="x"
                    className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
                    style={{
                        transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    onDrag={(_, info) =>
                        rotation.set(rotation.get() + info.offset.x * 0.05)
                    }
                    onDragEnd={(_, info) =>
                        controls.start({
                            rotateY: rotation.get() + info.velocity.x * 0.05,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 30,
                                mass: 0.1,
                            },
                        })
                    }
                    animate={controls}
                >
                    {cards.map((imgUrl, i) => (
                        <motion.div
                            key={`key-${imgUrl}-${i}`}
                            className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-transparent p-2"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)
                                    }deg) translateZ(${radius}px)`,
                            }}
                        >
                            <motion.img
                                src={imgUrl}
                                alt={`keyword_${i} ${imgUrl}`}
                                layoutId={`img-${imgUrl}`}
                                className="pointer-events-none  w-full rounded-xl object-cover aspect-square"
                                initial={{ filter: "blur(4px)" }}
                                layout="position"
                                animate={{ filter: "blur(0px)" }}
                                transition={transition}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        )
    }
)

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`
function ThreeDPhotoCarousel() {
    const controls = useAnimation()
    const cards = useMemo(
        () => ["https://lh3.googleusercontent.com/d/1VPAH2MpgCtOvzeOdF9BbV18L8tSae3jX",
            "https://lh3.googleusercontent.com/d/1V2DwajCM2nvShtmgL7BOGewCsVwzYz-B",
            "https://lh3.googleusercontent.com/d/18um4e_dcQKw6XDgVdnBI8DG5LDUzndKn",
            "https://lh3.googleusercontent.com/d/1KS_6wV99OKFgu05Neloa9uAfQ_JsBMeE",
            "https://lh3.googleusercontent.com/d/1kJEFNcBgEzixJr2BdhcscNf92wKg7hQ9",
            "https://lh3.googleusercontent.com/d/13K2QZB17APxm8fhlNhfNE_Z_tw830EyR",
            "https://lh3.googleusercontent.com/d/1PFawQ9f_dZe-IkfMg8IP4wpV6A-nspGE",
            "https://lh3.googleusercontent.com/d/1ZkaZd7I0Pm7-5RdxsxrObpWQd19smDe8",
            "https://lh3.googleusercontent.com/d/1G1GRjdGdNRvTjRJdkWlDOWxtyu7Mmt_0",
            "https://lh3.googleusercontent.com/d/1-FHoWjD0DZjKvPCLEaT5OCAVhUMkncR3",
            "https://lh3.googleusercontent.com/d/10R1XM5GfaJvPE2CVMN2_HMDcPbVrhfIz",
            "https://lh3.googleusercontent.com/d/1ZcY4ZBxLUIfq-tFGoiQdRQrbrGG4qcXO",
            "https://lh3.googleusercontent.com/d/19oVgBAxTWVoumeDGQMqVspfNT22qDB4d"
        ],
        []
    )

    useEffect(() => {
        console.log("Cards loaded:", cards)
    }, [cards])

    return (
        <motion.div layout className="relative">
            <div className="relative h-[220px] w-full overflow-hidden">
                <Carousel
                    controls={controls}
                    cards={cards}
                />
            </div>
        </motion.div>
    )
}

export { ThreeDPhotoCarousel };
