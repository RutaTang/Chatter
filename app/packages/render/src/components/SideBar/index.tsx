import { ReactNode } from "react";
import ChatItem from "../ChatItem";
import NewChatButton from "../NewChatBtn";

interface RequiredID {
    id: number
    title: string
}

interface Props<T extends Required<RequiredID>> {
    chatList?: T[]
    defaultSelectedChat?: T
    optionList?: ReactNode[]
    onNewChat?: () => void
    onSelectChat?: (chat: T) => void
    onDeleteChat?: (chat: T) => void
    onUpdateChatTitle?: (chat: T, newTitle: string) => void
}

/**
 * Renders a cutomizable Sidebar component with a list of chats and a list of options.
 */
export default function <T extends Required<RequiredID>>({ chatList, optionList, defaultSelectedChat, onSelectChat, onDeleteChat, onUpdateChatTitle, onNewChat }: Props<T>): JSX.Element {
    return (
        <div className="w-full h-full bg-base-200 text-base-content flex flex-col">
            <div className="px-3 py-3">
                <NewChatButton onClick={() => {
                    onNewChat && onNewChat()
                }} />
            </div>
            <ul className="grow overflow-scroll px-3 space-y-3">
                {
                    chatList?.map((item) => {
                        return (
                            <li key={item.id} onClick={() => {
                                onSelectChat && onSelectChat(item)
                            }}>
                                <ChatItem
                                    title={item.title}
                                    isActivated={item.id == defaultSelectedChat?.id}
                                    onDelete={() => onDeleteChat && onDeleteChat(item)}
                                    onUpdateTitle={(newTitle) => onUpdateChatTitle && onUpdateChatTitle(item, newTitle)} />
                            </li>
                        )
                    })
                }
            </ul>
            <ul className="px-3 space-y-2 py-3">
                {
                    optionList?.map((item, idx) => {
                        return (
                            <li key={idx}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
