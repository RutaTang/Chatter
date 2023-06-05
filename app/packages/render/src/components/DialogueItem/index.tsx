import { animated, config, useSpring } from "@react-spring/web";
import hljs from 'highlight.js'
import { micromark } from 'micromark'
import { useState, useEffect } from "react";


export interface Props {
    agentIcon: ({ role }: { role: string }) => React.ReactNode;
    id: string;
    content: string;
    roles: string[];
    defaultRole?: string;
    className?: string;
    btns?: ((message: {
        id: string;
        role: string;
        content: string;
    }) => React.ReactNode)[];
}

/**
 * Renders a chat dialogue component with an agent icon, selectable roles, and customizable buttons.
 * 
 * @param {Object} props - The props object.
 * @param {Function} props.agentIcon - A function that returns the agent icon component. Must accept a `role` prop.
 * @param {ReactNode} props.content - The content to be displayed in the chat dialogue.
 * @param {Array} props.roles - An array of roles to be displayed in the role select dropdown.
 * @param {string} props.defaultRole - The default role to be selected in the role select dropdown.
 * @param {string} props.className - An optional class name to be applied to the root div element.
 * @param {Array} props.btns - An optional array of custom button components to be displayed in the chat dialogue.
 * 
 * @returns {JSX.Element} The chat dialogue component.
 */
export default function({ agentIcon, content, roles, defaultRole, className = "", btns, id }: Props): JSX.Element {

    // Guards
    if (!roles || roles.length === 0) {
        throw new Error("Roles cannot be empty")
    }


    // Operate on props
    content = micromark(content)


    // States
    const [currentRole, setCurrentRole] = useState<string>("")


    // Animations
    const [rightBtnsAnimationStyles, rightBtnsAnimationApi] = useSpring(() => ({
        scale: 1,
        opacity: 0,
    }))
    const animateRightBtns = (reverse?: boolean) => {
        rightBtnsAnimationApi.start({
            from: {
                scale: 0.8,
                opacity: 0,
            },
            to: {
                scale: 1,
                opacity: 1,
            },
            config: config.wobbly,
            reverse,
        })
    }
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

    // Effects
    useEffect(() => {
        import("highlight.js/styles/github-dark.css")
        hljs.highlightAll()
    }, [content])
    useEffect(() => {
        setCurrentRole(defaultRole || roles[0])
    }, [defaultRole])

    return (
        <div className={[
            `w-full flex flex-row space-x-5`,
            "text-base-content",
            className,
        ].join(' ')}
            onMouseEnter={() => {
                animateRightBtns()
            }}
            onMouseLeave={() => {
                animateRightBtns(true)
            }}
        >
            {/* Agent Icon */}
            <animated.div style={agentIconAnimationStyles}>
                {agentIcon({ role: currentRole })}
            </animated.div>
            {/* Chat Dialogue */}
            <div className="grow flex flex-col justify-center space-y-3">
                {/* Options */}
                <div className="w-full flex flex-row justify-between">
                    {/* Chat role */}
                    <select className="select select-sm border focus:outline-none bg-transparent" value={currentRole} onChange={e => {
                        setCurrentRole(e.target.value)
                        animateAgentIcon()
                    }}>
                        {
                            roles.map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))
                        }
                    </select>
                    {/* Chat functions */}
                    <animated.div className="flex flex-row space-x-3 [&>*]:cursor-pointer" style={rightBtnsAnimationStyles}>
                        {
                            btns?.map((btn, idx) => <div key={idx}>{btn({
                                id: id,
                                role: currentRole,
                                content,
                            })}</div>)
                        }
                    </animated.div>
                </div>
                {/* Chat content */}
                <article className="w-full prose" dangerouslySetInnerHTML={{ __html: content }}>
                </article>
            </div>
        </div >
    )
}
