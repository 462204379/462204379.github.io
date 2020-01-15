module.exports = {
    devServer: {
        port: '9000',
        open: true,
        proxy: {
            '/api': {//前端路由匹配模式
                target: 'http://192.168.0.47:9011',  //后端请求服务域名和端口http://192.168.0.47:9011  http://122.112.230.41/back
                changeOrigin: true,   //设置请求头
                ws: true,
                pathRewrite: {
                    '^/api': ''   //路径重写  前端/flask-api 对应 后端/
                }
            }
        }
    },
    baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: process.env.outputDir,
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            config.externals = {
                vue: "Vue",
                vuex: "Vuex",
                "vue-router": "VueRouter",
                "element-ui": "ELEMENT"
            };
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].template = process.env.template;
            return args;
        });
    }
};
