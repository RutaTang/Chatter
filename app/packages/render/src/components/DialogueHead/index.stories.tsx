import { Meta, StoryObj } from "@storybook/react";
import Index from "./index";

const meta: Meta<typeof Index> = {
    component: Index,
}

export default meta

type Story = StoryObj<typeof Index>;

export const Default: Story = {
    render: () => <Index
        title="Conversation"
        models={["test", "test2"]}
        defaultModel="test2"
        onSelectModel={(model) => {
            console.log(model)
        }}
    />
}
