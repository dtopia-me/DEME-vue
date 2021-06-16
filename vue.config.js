'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    devServer: {
        proxy:  {
            '/api': { //本地
                pathRewrite:{'^/api': 'http://flipnfts.cn'},
                target: 'http://flipnfts.cn',
                changeOrigin: true,

            }
        },
        // Various Dev Server settings
        host: '192.168.0.108', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined

    }
}
