import { Meta, StoryObj } from '@storybook/react'
import Index from './index'
import { Bot, ChevronDown, ChevronUp, User } from 'lucide-react';

const meta: Meta<typeof Index> = {
    component: Index,
}
export default meta


type Story = StoryObj<typeof Index>;

export const Default: Story = {
    render: () => <Index agentIcon={({ role }) => {
        switch (role) {
            case "system": return <Bot size={30} />
            case "user": return <User size={30} />
            case "assistant": return <Bot size={30} />
        }
    }} roles={["system", "user", "assistant"]} defaultRole='system' content='Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.' />
}

export const WithBtns: Story = {
    render: () => <Index agentIcon={({ role }) => {
        switch (role) {
            case "system": return <Bot size={30} />
            case "user": return <User size={30} />
            case "assistant": return <Bot size={30} />
        }
    }} roles={["system", "user", "assistant"]} defaultRole='system' content='Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.' btns={[
        <button><ChevronUp size={20} /></button>,
        <button><ChevronDown size={20} /></button>,
    ]} />
}
