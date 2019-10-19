module.exports = {
    // publicPath: '/film',
    // publicPath: './film',
    devServer: {
        proxy: {
            '/ap': {
                target: 'http://47.96.175.28',
                // target: 'http://39.97.33.178'
                changeOrigin: true,
                // pathRewrite: {     // pathRewrite表示路径重写，key表示一个正则，value表示别名 
                //     '^/api': '/api'   // 即用 '/api'表示'http://localhost:3000/api'
                //   }
            }
        }
    }
}