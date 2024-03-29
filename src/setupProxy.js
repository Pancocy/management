const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware ('/api', {  // api是需要转发的请求（所有带有 /api 前缀的请求都会转发给5000）
            target: 'http://localhost:5000', // 配置转发目标帝制（能返回数据的服务器地址）
            changeOrigin: true,  // 控制服务器收到的请求头中 host 字段的值
            /*
            changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
            changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
            changeOrigin默认值为false，但我们一般将changeOrigin设置为true
            */
            pathRewrite: { '^/api': '' }  // 去除请求前缀，保证交给后端服务器的是正常请求帝制（必须配置）
        })
    )
}
