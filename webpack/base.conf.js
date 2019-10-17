/**
  webpack基础配置
**/

var path = require('path'),
    webpack = require('webpack'),
    HtmlPlugin = require('html-webpack-plugin'),
    utils = require('./utils');

module.exports = function (options) {
    var conf = {
        // 上下文信息
        context: path.join(options.root, 'src'),

        // 入口信息
        entry: {
            // 热更新
            app: options.environment === 'dev' 
                ? [ './app.js', 'webpack-hot-middleware/client?noInfo=true&reload=true' ]
                : 'app.js'
        },

        // 输出信息
        output: {
            path: path.join(options.root, 'dist'),
            filename: options.filename,
            publicPath: options.publicPath,
            chunkFilename: '[name].js'
        },

        // 模块解析规则
        resolve: {
            // 方便于一次修改
            alias: {
                // 容器组件目录
                '@containers': path.join(options.root, 'src/containers'),
                // 展示组件的目录，方便于一次修改
                '@components': path.join(options.root, 'src/components'),
                // 高阶组件目录
                '@hocs': path.join(options.root, 'src/hocs'),
                // 页面级组件目录
                '@pages': path.join(options.root, 'src/pages'),
                // 布局组件目录
                '@layouts': path.join(options.root, 'src/layouts'),
                // content组件目录
                '@contents': path.join(options.root, 'src/contents'),
                // fetch
                '@fetch': path.join(options.root, 'src/fetch'),
                // helper
                '@helper': path.join(options.root, 'src/helper'),
                // middlewares
                '@middlewares': path.join(options.root, 'src/middlewares'),
                // routes
                '@routes': path.join(options.root, 'src/routes'),
                // store
                '@store': path.join(options.root, 'src/store'),
                // 静态资源
                '@statics': path.join(options.root, 'src/statics')
            },

            // 根据数组的后缀名的顺序，依次查找模块
            extensions: [ '.js', '.jsx', '.json' ]
        },

        // loader
        module: {
            rules: [
                {
                    test: /\.jsx?$/i,
                    // 非第三方模块，增快打包速度
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                },
                utils.createLoaderMatcher(/\.css$/i, options.styleLoader.useCssModule),
                utils.createLoaderMatcher(/\.css$/i, options.styleLoader.dontUseCssModule),
                utils.createLoaderMatcher(/\.(jpe?g|png|gif|svg)/i, utils.imageFontAssetLoaderRule()),
                utils.createLoaderMatcher(/\.(woff|woff2|eot|ttf|otf)/i, utils.imageFontAssetLoaderRule())
            ]
        },

        devServer: options.environment === 'dev' ? options.devServer : null,

        // 代码调试
        devtool: options.devtool,

        // 插件，做对打包好的模块做额外的功能，比如压缩
        plugins: (options.beforePlugins || []).concat([
            new webpack.DefinePlugin(options.globals),
            new HtmlPlugin({
                title: '基于React的webapp',
                template: path.join(options.root, 'src/index.html'),
                filename: 'index.html',
                inject: true
            })
        ])
    };

    return conf;
}