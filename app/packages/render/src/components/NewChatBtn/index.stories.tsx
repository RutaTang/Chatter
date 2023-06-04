import { Meta, StoryObj } from "@storybook/react";
import Index from "./index";

const meta: Meta<typeof Index> = {
    component: Index,
}

export default meta;


type story = StoryObj<typeof Index>;
export const Default: story = {
    render: () => <Index />
}

export const OverrideClassName: story = {
    render: () => <Index className="hover:bg-gray-800 hover:text-gray-100" />
}
