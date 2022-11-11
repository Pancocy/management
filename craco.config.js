/* craco.config.js */
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: 
                        { 
                            '@primary-color': '#9999FF' ,
                            '@link-color':'  #816f6f'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    babel: {
        plugins: [
            ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
    }
};