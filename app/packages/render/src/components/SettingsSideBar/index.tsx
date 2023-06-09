interface Props {
    sections?: {
        title: string;
        items: {
            id: number;
            title: string;
        }[]
    }[];
    activeItemId?: number;
    onClick?: (id: number) => void;
}
export default function({ sections, activeItemId: activeItem, onClick }: Props) {
    return (
        <div className="w-full h-full overflow-y-scroll px-6 py-6 select-none space-y-5">
            {
                sections?.map((section) => {
                    return (
                        <div className="space-y-2 w-full" key={section.title}>
                            <h3 className="text-sm opacity-70">{section.title}</h3>
                            <ul className="w-full space-y-2">
                                {
                                    section.items?.map((item) => {
                                        return (
                                            <li
                                                key={item.id}
                                                className={`w-full hover:bg-primary px-2 py-1 transition-all rounded-md cursor-pointer hover:bg-opacity-80 hover:text-primary-content ${(activeItem && activeItem == item.id) && "bg-primary text-primary-content"} `}
                                                onClick={() => {
                                                    onClick && onClick(item.id)
                                                }}
                                            >
                                                {item.title}
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
