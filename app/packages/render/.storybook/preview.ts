import type { Preview } from "@storybook/react";
import ThemeDecorator from "./decorators/Theme";
import '../src/index.css'

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                // The label to show for this toolbar item
                title: 'Theme',
                icon: 'circlehollow',
                // Array of plain string values or MenuItem shape (see below)
                items: ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula'],
                // Change title based on selected value
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        ThemeDecorator
    ]
};

export default preview;
