import { animated, config, useSpring } from "@react-spring/web"
import { useState } from "react"
import "./index.css"

export interface Props {
    title: string
    // Models
    models?: string[]
    defaultModel?: string
    onSelectModel?: (model: string) => void
    // Actors
    actors?: {
        name: string
        enabled?: boolean
    }[]
    disableChangeActors?: boolean
    onCheckActor?: (actor: string, enabled: boolean) => void
}
export default function({ title, models = [], onSelectModel = () => { }, defaultModel, actors = [], disableChangeActors: disableCheckActors = false, onCheckActor = () => { } }: Props) {
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

    // console.log(disableCheckActors, actors)

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
                    <animated.div style={animationStyles} className="w-full flex justify-start items-center space-x-8 overflow-x-scroll no-scrollbar">
                        {/* Models */}
                        <div className="flex justify-center items-center space-x-2">
                            <span className="font-semibold">Model:</span>
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
                        {/* Actors */}
                        <div className="flex justify-center items-center space-x-3">
                            <span className="font-semibold">Actors:</span>
                            <div className="flex items-center space-x-3">
                                {
                                    [...actors]
                                        .sort((a, _) => {
                                            return disableCheckActors ? a.enabled ? -1 : 1 : 0
                                        })
                                        .map((actor) => {
                                            return (
                                                <label key={actor.name} className="label cursor-pointer space-x-2 whitespace-nowrap">
                                                    <input type="checkbox" className="checkbox checkbox-sm" checked={actor.enabled} disabled={disableCheckActors} onChange={(e) => {
                                                        onCheckActor(actor.name, e.target.checked)
                                                    }} />
                                                    <span className="label-text text-base">{actor.name}</span>
                                                </label>
                                            )
                                        })
                                }
                                {
                                    actors.length === 0 && (
                                        <span className="">No available actors</span>
                                    )
                                }
                            </div>
                        </div>
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
