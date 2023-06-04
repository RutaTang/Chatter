import { Meta, StoryObj } from "@storybook/react";
import Index from "./index";

const meta: Meta<typeof Index> = {
    component: Index,
    decorators: [
        (Story) => (
            <div className="w-[30%] h-screen">
                <Story />
            </div>
        )
    ],
    parameters: {
        layout: "fullscreen"
    }
}


export default meta


type Story = StoryObj<typeof Index>
export const Default: Story = {
    render: () => <Index
        sections={[
            {
                title: "Options",
                items: [
                    {
                        id: "theme",
                        title: "Theme",
                    },
                    {
                        id: "language",
                        title: "Language",
                    }
                ]
            },
            {
                title: "Plugins",
                items: [
                    {
                        id: "plugin1",
                        title: "Plugin 1",
                    }
                ]
            }
        ]}
        activeOption="Theme"
        onClick={console.log}
    />
}

export const Overflow: Story = {
    render: () => <Index sections={[
        {
            title: "Options",
            items: [
                {
                    id: "theme",
                    title: "Theme",
                },
                {
                    id: "language",
                    title: "Language",
                },
                {
                    id: "about",
                    title: "About",
                }
            ]
        },
        {
            title: "Plugins",
            items: [
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
                {
                    id: "plugin1",
                    title: "Plugin",
                },
            ]
        }
    ]} />
}
