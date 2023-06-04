import { animated, config, useSpring } from "@react-spring/web"
import { useState } from "react"

type Message = Required<{
    role: string;
    content: string;
}>

interface Props {
    agentIcon: ({ role }: { role: string }) => React.ReactNode
    roles: string[]
    defaultRole?: string
    className?: string
    onComplete?: (message: Message) => void
    onAdd?: (message: Message) => void
    onAddAndComplete?: (message: Message) => void
}

/**
 * Renders a message input component with submit and save buttons.
 */
export default function({ className = "", onComplete: onComplete, onAdd: onAdd, roles, defaultRole, agentIcon, onAddAndComplete }: Props): JSX.Element {
    // Guards
    if (!roles || roles.length === 0) {
        throw new Error("Roles cannot be empty")
    }
    // States
    const [content, setContent] = useState("")
    const [currentRole, setCurrentRole] = useState(defaultRole || roles[0])

    // Animations
    const [agentIconAnimationStyles, agentIconAnimationApi] = useSpring(() => ({
        scale: 1,
        opacity: 1,
    }))
    const animateAgentIcon = () => {
        agentIconAnimationApi.start({
            from: {
                scale: 0.9,
                opacity: 0.6,
            },
            to: {
                scale: 1,
                opacity: 1,
            },
            config: config.wobbly,
        })
    }

    return (
        <div className={`w-full flex flex-row space-x-5 bg-base-100 text-base-content ${className}`}>
            <animated.div style={agentIconAnimationStyles}>
                {agentIcon({ role: currentRole })}
            </animated.div>
            <div className="w-full flex flex-col items-center space-y-5">
                {/* Header */}
                <div className="flex flex-row justify-between items-center w-full">
                    <select className="focus:outline-none select bg-transparent border select-sm" value={currentRole} onChange={(e) => {
                        setCurrentRole(e.target.value)
                        animateAgentIcon()
                    }}>
                        {roles.map(item => {
                            return <option key={item} value={item}>{item}</option>
                        }
                        )}
                    </select>
                    <p className="text-sm italic">
                        {/* Tokens: 500 */}
                    </p>
                </div>
                {/* Input */}
                <textarea className="w-full h-20 bg-transparent bg-opacity-80 text-base-content rounded p-3 focus:outline-none placeholder:text-base-content" placeholder="Type your message here..." value={content} onChange={e => setContent(e.target.value)} />
                {/* Submit & Save */}
                <div className="flex flex-row justify-start items-center w-full space-x-5">
                    <button className="btn btn-secondary" onClick={() => {
                        onAddAndComplete && onAddAndComplete({
                            role: currentRole,
                            content,
                        })
                        setContent("")
                    }}>Add & Complete</button>
                    <button className="btn btn-primary" onClick={() => {
                        onComplete && onComplete({
                            role: currentRole,
                            content,
                        })
                        setContent("")
                    }}>Complete</button>
                    <button className="btn" onClick={() => {
                        onAdd && onAdd({
                            role: currentRole,
                            content,
                        })
                        setContent("")
                    }}>Add</button>
                </div>
            </div>
        </div>
    )
}
