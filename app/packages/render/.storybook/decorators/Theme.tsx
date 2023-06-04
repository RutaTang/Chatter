import React from 'react'
import { Story, StoryContext } from '@storybook/react'

export default function(Story: Story, context: StoryContext) {
    const theme = context.globals.theme;
    return (
        <div data-theme={theme}> <Story /> </div>
    )
}
