import type { Meta, StoryObj } from '@storybook/react';

import Index from './index';
import { useState } from 'react';

const meta: Meta<typeof Index> = {
    component: Index,
    tags: ['autodocs'],
};

export default meta;



type Story = StoryObj<typeof Index>;

export const ShortTitle: Story = {
    render: () => <Index title='Chat Title' />,
};


export const LongTitle: Story = {
    render: () => <Index title='Chat Title with a very long name that should be truncated. Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.' />,
}

export const Editable: Story = {
    render: () => {
        const [title, setTitle] = useState('Chat Title')
        return <Index title={title} isActivated={true} onUpdateTitle={(title) => { setTitle(title) }} />
    },
}

export const Deletable: Story = {
    render: () => {
        const [deleted, setDeleted] = useState(false)
        return deleted ? <></> : <Index title='Chat Title' isActivated={true} onDelete={() => { setDeleted(true) }} />
    }
}

export const Activated: Story = {
    render: () => <Index title='Chat Title' isActivated={true} />,
}
