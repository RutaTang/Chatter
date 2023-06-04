module.exports = {
    packagerConfig: {
        extraResource: [
            "../plugins",
        ],
        ignore: [
            /\.sqlite$/,
            /\.log$/,
        ],
        icon: "./assets/icon",
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {},
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
};