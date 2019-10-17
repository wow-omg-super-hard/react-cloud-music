/**
  webpack配置文件入口
  根据环境变量加载开发、生产配置文件，并且传入对应的配置文件是否是生产和开发的变量
**/

module.exports = function () {
    var environment = (process.env.NODE_ENV || 'dev').toLowerCase(), 
        __DEV__ = environment !== 'prod', 
        __PROD__ = environment === 'prod';

    return require(`./webpack/${ environment }.conf.js`)({
        root: __dirname,
        environment,
        __DEV__,
        __PROD__
    });
};

