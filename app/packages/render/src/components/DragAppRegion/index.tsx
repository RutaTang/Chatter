import './index.css'

interface Props {
    className?: string
}

export default function({ className = "" }: Props) {
    return (
        <div className={`h-8 w-screen fixed top-0 bg-base-200 app-region ${className}`}>
        </div>
    )
}
