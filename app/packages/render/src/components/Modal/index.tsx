import { useSpring, animated, config } from "@react-spring/web"
import { ReactNode, useEffect, useState } from "react"

interface Props {
    children?: ReactNode
    show?: boolean
    hide?: () => void
}

export default function({ children, show = false, hide }: Props) {
    // States
    const [inAnimation, setInAnimation] = useState(false)

    // Animations 
    const [animationStyles, animationApi] = useSpring(() => ({
        opacity: 0,
        scale: 0.8,
    }))
    const animateHide = () => {
        animationApi.start({
            from: {
                opacity: 1,
                scale: 1
            },
            to: {
                opacity: 0,
                scale: 0.8
            },
            config: config.wobbly,
            onStart: () => {
                setInAnimation(true)
            },
            onRest: () => {
                setInAnimation(false)
                hide?.()
            }
        })
    }
    const animateShow = () => {
        animationApi.start({
            from: {
                opacity: 0,
                scale: 0.8
            },
            to: {
                opacity: 1,
                scale: 1
            },
            onStart: () => {
                setInAnimation(true)
            },
            onRest: () => {
                setInAnimation(false)
            },
            config: config.wobbly,
        })
    }

    // Effects
    useEffect(() => {
        if (show) {
            animateShow()
        }
    }, [show])

    return (
        show ? (
            <animated.div style={animationStyles} className={`w-screen h-screen fixed top-0 left-0 flex items-center bg-base-300 justify-center z-999`} onClick={(e) => {
                e.stopPropagation()
                if (!inAnimation) {
                    animateHide()
                }
            }}>
                {children}
            </animated.div>
        ) : null
    )
}
