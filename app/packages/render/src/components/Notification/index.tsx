import { XCircle } from "lucide-react"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import "./index.css"

interface Props {
    messages: string[]
}

export default function({ messages }: Props) {
    return (
        <TransitionGroup className={"toast toast-bottom toast-end z-50"}>
            {
                messages.map((message) => {
                    return (
                        <CSSTransition key={message} timeout={1500} classNames="item">
                            <div className="alert alert-error">
                                <XCircle size={18} />
                                <span>{message}</span>
                            </div>
                        </CSSTransition>
                    )
                })
            }
        </TransitionGroup>
    )
}
