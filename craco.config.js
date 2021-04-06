const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#2F9264',
                            '@border-radius-base': '5px',
                            '@font-family': 'Poppins, sans-serif',
                            '@layout-header-background': '#fff',
                            '@layout-header-padding': '0px'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};