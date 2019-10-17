/**
  开发环境配置文件
  主要是创建web服务器，文件变更，自动打包，热更新
  对css模块直接通过内联插入页面
  静态资源的相对访问路径publicPath
  定义开发环境下的环境变量
**/
var path = require('path'),
    webpack = require('webpack'),
    utils = require('./utils');

module.exports = function (options) {
    var conf = {   
        root: options.root,
        environment: options.environment,
        devtool: 'source-map',

        // 输出文件名，可以使用占位符
        filename: 'scripts/[name].js',

        // 创建web服务器，当文件变更，自动刷新浏览器
        devServer: {
            // webpack-dev-server服务的根目录，使用webpack-dev-server默认不会将模块输出到output中
            // 里面有个publicPath，是webpack-dev-server对打包后的html文件在浏览器访问的相对路径
            // contentBase webpack-dev-server的根目录
            // 通过inline方式实现自动刷新浏览器
            inline: true,
            // 启动热替换
            hot: true,
            // 服务端口
            port: 7878,
            // 出现404的时候，将url替换为devServer.publicPath + 'index.html'
            // 如果需要替换为其他页面，那么{ index: '其他页面的地址' }
            historyApiFallback: true,
            // 跨域数据请求代理
            proxy: {}
        },

        // 静态资源模块在浏览器访问的相对路径
        publicPath: '/',

        styleLoader: {
            // 使用css module创建css模块
            useCssModule: {
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]-[name]_[base64:contenthash:4]'
                        }
                    }
                ],
                exclude: /node_modules/
            },
            // 不使用css module，比如引用ant design的全局css
            dontUseCssModule: {
                use: [ 'style-loader', 'css-loader' ],
                include: /node_modules/
            }        
        },

        // 开发环境的全局变量
        globals: {
            'process.env.NODE_ENV': JSON.stringify(options.env),
            'process.env.VERSION': JSON.stringify(utils.accessVersion()),
            'process.env.API_BASE_URL': JSON.stringify('http://localhost:8888/api')
        },

        beforePlugins: [
            new webpack.HotModuleReplacementPlugin
        ]
    };

    return require('./base.conf')(conf);
}