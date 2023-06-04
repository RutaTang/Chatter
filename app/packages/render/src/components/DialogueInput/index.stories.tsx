import { ReactNode } from 'react';
import Index from './index'
import { Meta, StoryObj } from '@storybook/react'
import { Bot, User } from 'lucide-react';

const meta: Meta<typeof Index> = {
    component: Index,
}

export default meta


type Story = StoryObj<typeof Index>;
export const Default: Story = {
    render: () => <Index agentIcon={function({ role }: { role: string; }): ReactNode {
        switch (role) {
            case "system": return <Bot size={30} />
            case "user": return <User size={30} />
            case "assistant": return <Bot size={30} />
        }
    }} roles={[
        "system",
        "user",
        "assistant"
    ]} />
}
