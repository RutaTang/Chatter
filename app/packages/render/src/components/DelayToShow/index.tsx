import { ReactNode, useEffect, useState } from "react"

interface Props {
    delay: number
    children: ReactNode
}

export default function({ delay, children }: Props) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true)
        }, delay >= 0 ? delay : 0)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            {
                show && children
            }
        </div>
    )
}
