import { useState } from "react"

interface Props {
    title: string
    description?: string
    value?: string
    onChange?: (value: any) => void
}

export default function({ title, description, value, onChange = () => { } }: Props) {
    const [inputValue, setInputValue] = useState(value)
    return (
        <div className="w-full flex justify-between items-center space-x-5">
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm opacity-80">{description}</p>
            </div>
            <div>
                <input
                    type="text"
                    className="input input-primary input-sm"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        onChange(e.target.value);
                    }}
                />
            </div>
        </div>
    )
}
