import { Meta, StoryObj } from "@storybook/react";
import Index from "./index";

const meta: Meta<typeof Index> = {
    component: Index,
    tags: ['autodocs']
}
export default meta;


type Story = StoryObj<typeof Index>;
export const Default: Story = {
    render: () => <Index />
}

export const WithPlaceholder: Story = {
    render: () => <Index placeholder="Search Chat" />
}

export const WithOnEnterKey: Story = {
    render: () => {
        return <Index placeholder="Search Chat" onEnterKey={(value) => {
            window.alert(`You searched for ${value}`)
        }} />
    }
}
