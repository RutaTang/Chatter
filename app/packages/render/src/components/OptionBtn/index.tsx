interface Props {
    title: string;
    leftIcon: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
}

/**
 * Renders a customizable Option component with a title, left icon, and optional right icon.
 * 
 * @param {Object} props - The props object containing the following properties:
 * @param {string} props.title - The title to display in the header.
 * @param {ReactNode} props.leftIcon - The icon to display on the left side of the header.
 * @param {ReactNode} props.rightIcon - The icon to display on the right side of the header.
 * @param {string} [props.className=""] - An optional class name to apply to the header container.
 * 
 * @returns {JSX.Element} - A JSX element representing the custom header component.
 */
export default function({ title, leftIcon: icon, rightIcon: more, className = "" }: Props): JSX.Element {
    return (
        <div className={[
            `w-full px-3 py-2 flex flex-row items-center space-x-3 justify-between select-none rounded cursor-pointer`,
            `hover:bg-primary hover:bg-opacity-80 hover:text-primary-content transition ease-in-out duration-300`,
            className
        ].join(' ')}>
            {icon}
            <span className="grow line-clamp-1">{title}</span>
            {more}
        </div>
    )
}
