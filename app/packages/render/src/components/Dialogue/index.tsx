import { ReactNode, useEffect, useRef } from "react";

import DialogueItem from "../DialogueItem";
import DialogueInput from "../DialogueInput";
import InCompleting from "../InCompleting";
import DialogueHead from "../DialogueHead";

import type { Props as DialoguItemPros } from '../DialogueItem';
import type { Message as DialogueInputMessage } from '../DialogueInput'
import type { Props as DialogueHeadProps } from '../DialogueHead'
import DelayToShow from "../DelayToShow";


interface Props {
    title: string
    roles: string[]
    agentIcon: ({ role }: { role: string; }) => ReactNode
    defaultDialogueInputRole?: string
    messages?: {
        id: number
        role: string
        content: string
    }[]
    onRoleChange?: DialoguItemPros['onRoleChange']

    // Item features
    btns?: DialoguItemPros['btns']

    // Completing
    onComplete?: (message: DialogueInputMessage) => void
    onAdd?: (message: DialogueInputMessage) => void
    onAddAndComplete?: (message: DialogueInputMessage) => void
    isCompleting?: boolean

    // Models 
    models?: string[]
    defaultModel?: string
    onSelectModel?: (model: string) => void

    // Actors
    actors?: DialogueHeadProps['actors']
    disableChangeActors?: DialogueHeadProps['disableChangeActors']
    onCheckActor?: DialogueHeadProps['onCheckActor']
}

export default function({
    messages, roles, agentIcon, onComplete, onAdd, defaultDialogueInputRole, onAddAndComplete, title, isCompleting = false, models, onSelectModel, defaultModel,
    btns, onRoleChange, actors, disableChangeActors, onCheckActor
}: Props) {


    // Ref
    const myRef = useRef<HTMLDivElement>(null)

    // Scroll to bottom
    const scrollToBottom = () => {
        window.requestAnimationFrame(() => {
            myRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            })
        })
    }

    //Effects
    useEffect(() => {
        if (myRef.current) {
            scrollToBottom()
        }
    }, [isCompleting])

    return (
        <div className="w-full h-full overflow-scroll" >
            {/* Head */}
            <div className="bg-base-200 text-md h-16 line-clamp-1 px-10 empty-height-invarant font-semibold">
                <DialogueHead
                    title={title}
                    models={models}
                    defaultModel={defaultModel}
                    onSelectModel={onSelectModel}
                    actors={actors}
                    disableChangeActors={disableChangeActors}
                    onCheckActor={onCheckActor}
                />
            </div>

            {/* Divider */}
            <div className="divider py-0 my-0 h-[1px] opacity-80"></div>

            {/* Body */}
            <ul >
                {
                    messages?.map((message, idx) => {
                        return (
                            <li key={message.id}>
                                <DialogueItem
                                    id={message.id}
                                    className={`px-10 py-10 ${idx % 2 == 0 && "bg-base-200"}`}
                                    agentIcon={agentIcon}
                                    btns={btns}
                                    content={message.content}
                                    defaultRole={message.role}
                                    onRoleChange={onRoleChange}
                                    roles={roles} />

                            </li>
                        )
                    })
                }
            </ul>
            {/* Loading */}
            {
                isCompleting && (
                    <DelayToShow delay={200}>
                        <div className="bg-base-200 px-10 py-10 opacity-30">
                            <InCompleting />
                        </div>
                    </DelayToShow>
                )
            }
            {/* Input */}
            <div className={`${messages && messages.length > 0 && "border-t"}`} ref={myRef}>
                <DialogueInput
                    defaultRole={defaultDialogueInputRole}
                    agentIcon={agentIcon}
                    roles={roles}
                    className={`px-10 py-10`}
                    onComplete={(message) => {
                        onComplete && onComplete(message)
                        scrollToBottom()
                    }}
                    onAdd={(message) => {
                        onAdd && onAdd(message)
                        scrollToBottom()
                    }}
                    onAddAndComplete={(message) => {
                        onAddAndComplete && onAddAndComplete(message)
                        scrollToBottom()
                    }}
                />
            </div>
        </div >
    )
}

