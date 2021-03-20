module.exports = {
    // publicPath: '/film',
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://118.25.8.143',
                // target: 'http://47.96.175.28',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/management_api': ''
                // }
            }
        }
    }
}