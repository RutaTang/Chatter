import { Bot, User } from 'lucide-react';
import Index from './index';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Index> = {
    component: Index,
    parameters: {
        layout: 'fullscreen'
    },
    decorators: [
        (Story) => {
            return (
                <div className="h-screen w-[70%] ml-auto mr-0">
                    <Story />
                </div>
            )
        }
    ]
}

export default meta


type Story = StoryObj<typeof Index>;

export const Default: Story = {
    render: () => <Index
        title='Test'
        messages={[
            {
                role: "system",
                content: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            },
            {
                role: "user",
                content: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
            }
        ]}
        agentIcon={({ role }) => {
            switch (role) {
                case "system": return <Bot size={30} />
                case "user": return <User size={30} />
                case "assistant": return <Bot size={30} />
            }
        }}
        roles={["system", "user", "assistant"]}
        isCompleting={true}
    />
}
