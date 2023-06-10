import { ReactNode, useContext, useEffect, useState, } from "react"
import { ChevronDown, ChevronUp, Settings, Trash } from "lucide-react";

import SideBar from "../components/SideBar"
import Dialogue from "../components/Dialogue"
import { ROLE_ICON_MAP } from "../constants"
import { useAppDispatch, useAppSelector } from "../store"
import { addConversation, addMessage, deleteConversation, loadConversations, updateConversationTitle, completeMessages, listMessages, addMessageAndCompleteChat, loadAllModels, getModelForCurrentConversation, updateModelForCurrentConversation, moveMessageUpOrDown, updateMessageRole, deleteMessage, getActors } from "../store/conversationSlice/thunks"
import { selectChat } from "../store/conversationSlice";
import { Conversation, Message, Role } from "../types";
import OptionBtn from "../components/OptionBtn";
import SettingsPage from "./Settings";
import { ModalContext } from "../contexts/Modal";
import { Omit } from "@react-spring/web";

import type { Props as DialogueItemProps } from "../components/DialogueItem"

export default function() {

    // States 
    const chats = useAppSelector(state => state.chat.chats)
    const messages = useAppSelector(state => state.chat.currentChatMessages)
    const models = useAppSelector(state => state.chat.models)
    const currentModel = useAppSelector(state => state.chat.currentModel)
    const currentChatId = useAppSelector(state => state.chat.currentChatId)
    const actors = useAppSelector(state => state.chat.currentActors)

    const [currentChat, setCurrentChat] = useState<Conversation | undefined>(undefined)

    // Contexts
    const { show } = useContext(ModalContext)

    // Dispath
    const dispatch = useAppDispatch()
    const dispatchAddChat = () => {
        dispatch(addConversation(
            {
                title: "New Chat",
                updatedAt: new Date().getTime(),
                createdAt: new Date().getTime(),
            }
        ))
    }
    const dispatchDeleteChat = (chatId: Conversation['id']) => {
        dispatch(deleteConversation(chatId))
    }
    const dispatchUpdateChatTitle = (chatId: Conversation['id'], newTitle: Conversation['title']) => {
        dispatch(updateConversationTitle({
            chatId: chatId,
            newTitle: newTitle
        }))
    }
    const distpatchSelectChat = (chatId: Conversation['id']) => {
        dispatch(selectChat(chatId))
    }
    const dispatchAddMessage = (message: Omit<Message, 'id'>) => {
        if (!currentChat) {
            return
        }
        return dispatch(addMessage({
            conversationId: currentChat.id,
            message: message
        }))
    }
    const dispatchDeleteMessage = (messageId: Message['id']) => {
        if (!currentChat) {
            return
        }
        dispatch(deleteMessage({
            conversationId: currentChat.id,
            messageId: messageId
        }))
    }
    const dispathLoadChats = () => {
        dispatch(loadConversations())
    }
    const dispatchCompleteChat = () => {
        if (!currentChat || !messages) {
            return
        }
        dispatch(completeMessages({
            model: currentModel || "",
            conversationId: currentChat.id,
        }))
    }
    const disptachListMessages = () => {
        if (!currentChat) {
            return
        }
        dispatch(listMessages(currentChat.id))
    }
    const dispatchAddMessageAndCompleteChat = (message: Omit<Message, "id">) => {
        if (!currentChat) {
            return
        }
        dispatch(addMessageAndCompleteChat({
            model: currentModel || "",
            conversationId: currentChat.id,
            message: message
        }))
    }
    const dispatchLoadAllModels = () => {
        dispatch(loadAllModels())
    }
    const dispatchGetModelForCurrentConversation = () => {
        if (!currentChat?.id) {
            return
        }
        dispatch(getModelForCurrentConversation(currentChat.id))
    }

    const distpatchUpdateModelForCurrentConversation = (model: string) => {
        if (!currentChat) {
            return
        }
        dispatch(updateModelForCurrentConversation({
            conversationId: currentChat.id,
            model: model
        }))
    }

    const dispatchMoveMessageUpOrDown = (messageId: Message['id'], direction: "up" | "down") => {
        if (!currentChat) {
            return
        }
        dispatch(moveMessageUpOrDown({
            direction,
            conversationId: currentChat.id,
            messageId
        }))
    }
    const disptachUpdateMessageRole = (messageId: Message['id'], role: string) => {
        dispatch(updateMessageRole({
            messageId,
            role
        }))
    }
    const dispatchGetActors = () => {
        if (!currentChat) {
            return
        }
        dispatch(getActors({ conversationId: currentChat.id }))
    }

    // More UIs
    const sideBarOptionList = [
        <div onClick={() => {
            // Click to show Setting Modal
            show(
                <div className="flex flex-col w-[90%] h-[80%] bg-base-300 items-center justify-center space-y-5 rounded-md shadow shadow-base-300 overflow-hidden" onClick={e => e.stopPropagation()}>
                    <SettingsPage />
                </div>
            )
        }}>
            <OptionBtn title={"Settings"} leftIcon={<Settings size={20} />} />
        </div>
    ]
    const conversationItemFeaturesBtns: DialogueItemProps['btns'] = [
        // Move message up
        ({
            id
        }) => {
            return (
                <div onClick={() => {
                    dispatchMoveMessageUpOrDown(id, "up")
                }}>
                    <ChevronUp size={16} />
                </div>
            )
        }
        ,
        // Move message down
        ({
            id
        }) => {
            return (
                <div onClick={() => {
                    dispatchMoveMessageUpOrDown(id, "down")
                }}>
                    <ChevronDown size={16} />
                </div >
            )
        },
        ({
            id
        }) => {
            return (
                <div onClick={() => {
                    dispatchDeleteMessage(id)
                }}>
                    <Trash size={15} />
                </div>
            )
        },
    ]


    // Effects
    useEffect(() => {
        // Load chats
        dispathLoadChats()
        // Load all models
        dispatchLoadAllModels()
    }, [])

    useEffect(() => {
        if (currentChat) {
            dispatchGetActors()
            disptachListMessages()
            dispatchGetModelForCurrentConversation()
        }
    }, [currentChat])

    useEffect(() => {
        if (currentChatId) {
            setCurrentChat(chats.find(chat => chat.id === currentChatId))
        } else {
            setCurrentChat(undefined)
        }
    }, [currentChatId, chats])

    return (
        <div className="flex flex-row w-full h-full">
            {/* SideBar */}
            <div className="grow-0 w-[25%]">
                <SideBar chatList={chats}
                    defaultSelectedChat={currentChat}
                    onSelectChat={(chat) => {
                        distpatchSelectChat(chat.id)
                    }}
                    onNewChat={() => {
                        dispatchAddChat()
                    }}
                    onDeleteChat={(chat) => {
                        dispatchDeleteChat(chat.id)
                    }}
                    onUpdateChatTitle={(chat, newTitle) => {
                        dispatchUpdateChatTitle(chat.id, newTitle)
                    }}
                    optionList={sideBarOptionList}
                />
            </div>
            {/* Divider */}
            <div className="divider divider-horizontal px-0 mx-0 w-[1px] opacity-50"></div>
            {/* Dialogue */}
            <div className="w-[75%] grow shrink-0">
                {
                    currentChat ? (
                        <Dialogue
                            btns={conversationItemFeaturesBtns}
                            title={currentChat?.title || ""}
                            isCompleting={currentChat?.isInCompleting}
                            defaultDialogueInputRole={Role.User}
                            roles={
                                Object.values(Role)
                            }
                            agentIcon={function({ role }: { role: string }): ReactNode {
                                return ROLE_ICON_MAP[role as Role]
                            }}
                            onRoleChange={(id, role) => {
                                disptachUpdateMessageRole(id, role)
                            }}
                            messages={messages}
                            onAdd={(message) => {
                                dispatchAddMessage(message)
                            }}
                            onComplete={() => {
                                dispatchCompleteChat()
                            }}
                            onAddAndComplete={(message) => {
                                dispatchAddMessageAndCompleteChat(message)
                            }}
                            // Model related
                            models={models}
                            defaultModel={currentModel}
                            onSelectModel={model => {
                                distpatchUpdateModelForCurrentConversation(model)
                            }}
                            // Actor related
                            actors={actors}
                            onCheckActor={(actor, enabled) => {
                                console.log(actor, enabled)
                            }}
                            disableChangeActors={messages && messages.length > 0}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full select-none">
                            <span className="text-2xl font-semibold opacity-50">Select a conversation to start!</span>
                        </div>
                    )
                }

            </div>
        </div>
    )
}
