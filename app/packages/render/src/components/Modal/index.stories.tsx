import { Meta, StoryObj } from "@storybook/react";
import Index from "./index";
import { useState } from "react";

const meta: Meta<typeof Index> = {
    component: Index,
}

export default meta

type Story = StoryObj<typeof Index>
export const Default: Story = {
    render: () => {
        const [show, setShow] = useState(true)
        return (
            <Index show={show} children={
                <div className="w-96 h-96 bg-base-300 px-10 py-10" onClick={e => e.stopPropagation()}>
                    Default
                </div>
            } hide={() => setShow(false)} />
        )
    }
}
