import { ReactNode, useContext, useEffect, } from "react"
import { ChevronDown, ChevronUp, Settings } from "lucide-react";

import SideBar from "../components/SideBar"
import Dialogue from "../components/Dialogue"
import { ROLE_ICON_MAP } from "../constants"
import { useAppDispatch, useAppSelector } from "../store"
import { addConversation, addMessage, deleteConversation, loadConversations, updateConversationTitle, completeMessages, listMessages, addMessageAndCompleteChat, loadAllModels, getModelForCurrentConversation, updateModelForCurrentConversation, moveMessageUpOrDown } from "../store/conversationSlice/thunks"
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
    const currentChat = useAppSelector(state => state.chat.currentChat)
    const messages = useAppSelector(state => state.chat.currentChatMessages)
    const isCompleting = useAppSelector(state => state.chat.isCompleting)
    const models = useAppSelector(state => state.chat.models)
    const currentModel = useAppSelector(state => state.chat.currentModel)

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
        if (!currentChat?.id) {
            return
        }
        return dispatch(addMessage({
            conversationId: currentChat.id,
            message: message
        }))
    }
    const dispathLoadChats = () => {
        dispatch(loadConversations())
    }
    const dispatchCompleteChat = () => {
        if (!currentChat?.id || !messages) {
            return
        }
        dispatch(completeMessages({
            model: currentModel || "",
            conversationId: currentChat.id,
            messages: messages
        }))
    }
    const disptachListMessages = () => {
        if (!currentChat?.id) {
            return
        }
        dispatch(listMessages(currentChat.id))
    }
    const dispatchAddMessageAndCompleteChat = (message: Omit<Message, "id">) => {
        if (!currentChat?.id) {
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
        if (!currentChat?.id) {
            return
        }
        dispatch(updateModelForCurrentConversation({
            conversationId: currentChat.id,
            model: model
        }))
    }

    const dispatchMoveMessageUpOrDown = (messageId: Message['id'], direction: "up" | "down") => {
        if (!currentChat?.id) {
            return
        }
        dispatch(moveMessageUpOrDown({
            direction,
            conversationId: currentChat.id,
            messageId
        }))
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

        }
    ]


    // Effects
    useEffect(() => {
        // Load chats
        dispathLoadChats()
        // Load all models
        dispatchLoadAllModels()
    }, [])

    useEffect(() => {
        if (currentChat && currentChat.id) {
            disptachListMessages()
            dispatchGetModelForCurrentConversation()
        }
    }, [currentChat])

    useEffect(() => {
        // console.log(currentModel)
    }, [currentModel])

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
                            isCompleting={isCompleting}
                            defaultDialogueInputRole={Role.User}
                            roles={
                                Object.values(Role)
                            }
                            agentIcon={function({ role }: { role: string }): ReactNode {
                                return ROLE_ICON_MAP[role as Role]
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
