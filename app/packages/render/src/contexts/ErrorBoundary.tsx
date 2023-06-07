import { ReactElement, createContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { removeOldestMessage } from "../store/errorSlice";
import Notification from "../components/Notification";


const ErrorBoundaryContext = createContext<null>(null);


const ErrorBoundary = ({ children }: { children: ReactElement }) => {

    // States
    const messages = useAppSelector((state) => state.error.messages)

    // dispatch
    const dispatch = useAppDispatch()
    const dispathcRemoveOldMessage = () => {
        dispatch(removeOldestMessage())
    }

    // Effects
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(dispathcRemoveOldMessage, 3000)
        }
    }, [messages])

    return (
        <ErrorBoundaryContext.Provider value={null}>
            <Notification messages={messages} />
            {children}
        </ErrorBoundaryContext.Provider>
    )
}

export { ErrorBoundaryContext, ErrorBoundary }
