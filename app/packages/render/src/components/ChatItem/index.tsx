import "./index.css"

import { Check, Edit3, MessageSquare, Trash, X } from "lucide-react"
import { animated, config, useSpring } from '@react-spring/web'
import { useState } from "react"

interface Props {
    title: string
    isActivated?: boolean
    onDelete?: () => void
    onUpdateTitle?: (title: string) => void
    onSelect?: () => void
}

/**
 * Renders a chat item component with options edit, delete.
 */
export default function({ title, onDelete, onUpdateTitle, onSelect, isActivated: activated }: Props): JSX.Element {

    const [inDeleteStatus, setInDeleteStatus] = useState(false)
    const [inEditStatus, setInEditStatus] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(title)

    // Animations
    const [rightBtnsAnimationStyles, rightBtnsAnimationApi] = useSpring(() => ({
        opacity: 1,
        transform: "translateX(0px)"
    }))
    const animateRightBtns = () => {
        rightBtnsAnimationApi.start({
            from: {
                opacity: 0,
                transform: "translateX(15px)"
            },
            to: {
                opacity: 1,
                transform: "translateX(0px)"
            },
            config: config.wobbly
        })
    }
    const [leftBtnsAnimationStyles, leftBtnsAnimationApi] = useSpring(() => ({
        opacity: 1,
        transform: "translateX(0px)"
    }))
    const animateLeftBtns = () => {
        leftBtnsAnimationApi.start({
            from: {
                opacity: 0,
                transform: "translateX(-15px)"
            },
            to: {
                opacity: 1,
                transform: "translateX(0px)"
            },
            config: config.wobbly
        })
    }
    const [clickAnimationStyles, clickAnimationApi] = useSpring(() => ({
        scale: 1,
        opacity: 1,
    }))
    const animateClick = () => {
        clickAnimationApi.start({
            from: {
                scale: 0.9,
                opacity: 0.9,
            },
            to: {
                scale: 1,
                opacity: 1,
            },
            config: config.wobbly
        })
    }

    return (
        <animated.div
            className={[
                `w-full flex flex-row justify-between space-x-3 items-center px-3 py-2 select-none rounded transition ${!inEditStatus && "cursor-pointer"} ease-in-out duration-300`,
                activated ? "bg-primary text-primary-content" : "hover:bg-primary hover:bg-opacity-80 hover:text-primary-content",
            ].join(' ')
            }
            style={clickAnimationStyles}
            onClick={() => {
                onSelect && onSelect()
                animateClick()
            }}>
            <animated.div style={leftBtnsAnimationStyles}>
                {
                    !inDeleteStatus ? (
                        <MessageSquare size={20} />
                    ) : (
                        <Trash size={20} />
                    )
                }
            </animated.div>
            {
                !inEditStatus
                    ?
                    <p className="grow line-clamp-1 focus:outline-none empty-height-invarant">{currentTitle}</p>
                    :
                    <input className="grow shrink line-clamp-1 focus:outline-none empty-height-invarant bg-transparent" autoFocus value={currentTitle} onChange={e => setCurrentTitle(e.target.value)} />
            }
            <animated.div
                className={`flex flex-row items-center space-x-3 [&>div]:cursor-pointer ${activated ? "visible" : "invisible"}`}
                onClick={e => {
                    e.stopPropagation()
                    animateRightBtns()
                }}
                style={rightBtnsAnimationStyles}
            >
                {
                    !inDeleteStatus && !inEditStatus && (
                        <>
                            <div onClick={() => {
                                setInEditStatus(true);
                            }}><Edit3 size={18} /></div>
                            <div onClick={() => {
                                setInDeleteStatus(true);
                                animateLeftBtns()
                            }}><Trash size={18} /></div>
                        </>
                    )
                }
                {
                    inDeleteStatus && (
                        <>
                            <div onClick={() => {
                                onDelete && onDelete();
                                setInDeleteStatus(false);
                                animateLeftBtns()
                            }}><Check size={18} /></div>
                            <div onClick={() => {
                                setInDeleteStatus(false);
                                animateLeftBtns()
                            }}><X size={18} /></div>
                        </>
                    )
                }
                {
                    inEditStatus && (
                        <>
                            <div onClick={() => {
                                onUpdateTitle && onUpdateTitle(currentTitle)
                                setInEditStatus(false)

                            }}><Check size={18} /></div>
                            <div onClick={() => {
                                setInEditStatus(false);
                            }}><X size={18} /></div>
                        </>
                    )
                }
            </animated.div>
        </animated.div >
    )
}
