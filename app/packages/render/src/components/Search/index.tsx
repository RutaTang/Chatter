import { useState } from "react"

interface Props {
    placeholder?: string
    onEnterKey?: (value: string) => void
}

/**
 * Renders an input field for searching with optional placeholder text and an onEnterKey callback function.
 *
 * @param {Object} props - The props object containing the following properties:
 * @param {string} [props.placeholder="Search..."] - The optional placeholder text to display in the input field.
 * @param {function} props.onEnterKey - The callback function to be called when the user presses the Enter key while the input field is in focus.
 * @returns {JSX.Element} - Returns a JSX element representing the input field.
 *
 * @example
 * <Search placeholder="Search Chat" onEnterKey={(value) => {} />
 */
export default function({ placeholder = "Search...", onEnterKey }: Props): JSX.Element {
    const [value, setValue] = useState("")
    return (
        <input type="text" className="w-full focus:outline-none px-2 py-1" placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
                e.preventDefault()
                onEnterKey && onEnterKey(value)
            }
        }} />
    )
}

