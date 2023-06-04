import { ReactNode, createContext, useState } from "react";
import Modal from "../components/Modal";
import { createPortal } from "react-dom";


interface Props {
    show: (children: ReactNode) => void;
}

const ModalContext = createContext({} as Props)


const ModalProvider = ({ children }: {
    children: ReactNode
}) => {

    // States
    const [isShow, setIsShow] = useState(false)
    const [modal, setModal] = useState<ReactNode>(null)

    // Functions
    const hide = () => {
        setIsShow(false)
        setModal(null)
    }
    const show = (children: ReactNode) => {
        setModal(children)
        setIsShow(true)
    }

    return (
        <ModalContext.Provider value={{ show }}>
            {children}
            {createPortal(<Modal show={isShow} children={modal} hide={hide} />, document.body)}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider }
