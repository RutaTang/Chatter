import { animated, config, useSpring } from "@react-spring/web";
import { Plus } from "lucide-react";

interface Props {
    className?: string;
    onClick?: () => void;
}


/**
 * Renders a button for creating a new chat. The button includes animations and can be customized with a className and onClick function.
 * 
 * @param {Object} props - The props object.
 * @param {string} [props.className] - An optional className to add to the button.
 * @param {function} [props.onClick] - An optional onClick function to call when the button is clicked.
 * 
 * @returns {JSX.Element} - Returns a JSX element representing the new chat button.
 */
export default function NewChatButton({ className = "", onClick }: Props): JSX.Element {
    // Animations
    const [animationStyles, animationApi] = useSpring(() => ({
        opacity: 1,
        scale: 1,
        rotate: 0,
    }));

    return (
        <animated.div
            className={[
                "w-full flex flex-row items-center justify-center space-x-3 transition py-2 rounded cursor-pointer select-none bg-primary text-primary-content",
                className,
            ].join(" ")}
            style={animationStyles}
            onClick={() => {
                onClick && onClick();
                animationApi.start({
                    from: { scale: 0.9, opacity: 0.9, rotate: -3 },
                    to: { scale: 1, opacity: 1, rotate: 0 },
                    config: config.wobbly,
                })
            }}
        >
            <Plus size={20} />
            <span>New Chat</span>
        </animated.div>
    );
}
