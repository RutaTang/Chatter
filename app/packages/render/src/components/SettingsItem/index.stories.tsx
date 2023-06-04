import { Meta, StoryObj } from "@storybook/react";
import Index from "./index";

const meta: Meta<typeof Index> = {
    component: Index,
}

export default meta


type Story = StoryObj<typeof Index>

export const Default: Story = {
    render: () => <Index title="Choose the theme" description="Choose a theme to change the theme" />
}
