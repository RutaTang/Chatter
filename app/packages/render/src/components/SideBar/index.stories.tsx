import { Meta, StoryObj } from '@storybook/react'
import Index from './index'
import { Bot } from 'lucide-react'
import OptionBtn from '../OptionBtn'

const meta: Meta<typeof Index> = {
    component: Index,
    decorators: [
        (Story) => {
            return (
                <div className="h-screen w-[30%]">
                    <Story />
                </div>
            )
        }
    ],
    parameters: {
        layout: 'fullscreen'
    }
}

export default meta


type Story = StoryObj<typeof Index>;
export const Default: Story = {
    render: () => <Index />
}

export const WithBtns: Story = {
    render: () => <Index chatList={[
        {
            id: "1",
            title: "Chat 1",
        },
        {
            id: "2",
            title: "Chat 2",
        }
    ]}
        optionList={[
            <OptionBtn title={'Models'} leftIcon={<Bot size={20} />} />
        ]}
    />
}



