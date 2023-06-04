import { Meta, StoryObj } from "@storybook/react";
import Index from "./index";

const meta: Meta<typeof Index> = {
    component: Index,
}

export default meta


type Story = StoryObj<typeof Index>

export const Default: Story = {
    render: () => <Index sections={[
        {
            title: "Options",
            items: [
                {
                    id: "theme",
                    title: "Theme",
                    description: "Choose a theme to change the theme",
                },
                {
                    id: "language",
                    title: "Language",
                    description: "Choose a language to change the language",
                }
            ]
        },
        {
            title: "Plugins",
            items: [
                {
                    id: "plugin1",
                    title: "Plugin 1",
                    description: "Plugin 1 description",
                }
            ]
        }
    ]} />
}
