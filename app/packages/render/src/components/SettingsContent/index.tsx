import SettingsItem from "../SettingsItem";

interface Props {
    sections?: {
        title: string
        items?: {
            id: any
            title: string
            description?: string
            value: any
        }[]
    }[]
    onActionValueChange?: (contentItemId: any, value: any) => void
}

export default function({ sections, onActionValueChange = () => { } }: Props) {
    return (
        <div className="w-full space-y-10 h-full">
            {/* When sections is undefined, it will show hint: */}
            {
                !sections && (
                    <div className="w-full h-full flex justify-center items-center select-none">
                        <span className="opacity-60">Select left sidebar to manipulate settings</span>
                    </div>
                )
            }
            {/* Show sections */}
            {
                sections?.map((section) => {
                    return (
                        <div key={section.title}>
                            <h1 className="font-bold">{section.title}</h1>
                            <div className="divider my-1"></div>
                            <ul className="space-y-3">
                                {
                                    section.items?.map((item) => {
                                        return (
                                            <li key={item.title}>
                                                <SettingsItem
                                                    title={item.title}
                                                    description={item.description}
                                                    value={item.value}
                                                    onChange={(value) => {
                                                        onActionValueChange(item.id, value)
                                                    }}
                                                />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}
