import { Bot, Rocket, User } from "lucide-react"
import { Role } from "../types"

export const ROLE_ICON_MAP: {
    [key in Role]: React.ReactNode
} = {
    system: <Rocket size={30} />,
    user: <User size={30} />,
    assistant: <Bot size={30} />,
}
