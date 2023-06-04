import { animated, useSpring } from "@react-spring/web";
import { Cat } from "lucide-react";
import { useState } from "react";

export default function() {

    const [reverse, setReverse] = useState(false)
    const loadingAnimationStyles = useSpring({
        from: { opacity: 0.8, scale: 0.99, },
        to: { opacity: 1, scale: 1, },
        loop: true,
        reset: true,
        reverse: reverse,
        config: {
            duration: 800,
        },
        onRest: () => setReverse(!reverse),
    })

    return (
        <div className="w-full h-full flex justify-center items-center select-none">
            <animated.div style={loadingAnimationStyles} className="flex justify-center items-center space-x-5">
                <Cat size={32} />
                <span className="ml-2 tracking-[8px]">Completing...</span>
            </animated.div>
        </div>
    )
}
