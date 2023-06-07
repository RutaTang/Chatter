import { animated, config, useSpring } from "@react-spring/web"
import { useState } from "react"

interface Props {
    title: string
    models?: string[]
    defaultModel?: string
    onSelectModel?: (model: string) => void
}
export default function({ title, models = [], onSelectModel = () => { }, defaultModel }: Props) {
    const [showTools, setShowTools] = useState(false)

    const [animationStyles, _] = useSpring({
        from: {
            opacity: 0,
            scale: 0.9,
            transform: "translateY(-5px)",
        },
        to: {
            opacity: 1,
            scale: 1,
            transform: "translateY(0px)",
        },
        config: config.gentle,
        reset: true,
    }, [showTools, title])

    return (
        <div
            className="w-full h-full [&>div]:h-12 min-h-12 flex justify-center items-center"
            onMouseEnter={() => {
                setShowTools(true)
            }}
            onMouseLeave={() => {
                setShowTools(false)
            }}
        >
            {
                showTools ? (
                    <animated.div style={animationStyles} className="flex justify-center items-center">
                        {/* Models */}
                        <div className="flex justify-center items-center space-x-2">
                            <select
                                className="focus:outline-none bg-transparent"
                                value={defaultModel}
                                onChange={e => {
                                    onSelectModel(e.target.value)
                                }}>
                                <option value="" disabled>Select Model</option>
                                {
                                    models.map((model, idx) => {
                                        return (
                                            <option key={idx} value={model}>{model}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {/* TODO: Actions */}
                        <div></div>
                    </animated.div>
                ) : (

                    <animated.div style={animationStyles} className="flex justify-center items-center">
                        <h1>
                            {title}
                        </h1>
                    </animated.div>
                )
            }
        </div >
    )
}
