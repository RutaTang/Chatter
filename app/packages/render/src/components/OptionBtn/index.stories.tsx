import { Meta, StoryObj } from "@storybook/react";
import Index from "./index";
import { Bot, MoreHorizontal, } from "lucide-react";

const meta: Meta<typeof Index> = {
    component: Index,
}
export default meta;


type Story = StoryObj<typeof Index>;

export const Default: Story = {
    render: () => <Index leftIcon={<Bot size={20} />} title="Models" />
}

export const WithRightIcon: Story = {
    render: () => <Index leftIcon={<Bot size={20} />} title="Models" rightIcon={<MoreHorizontal size={20} />} />
}
