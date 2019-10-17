var fs = require('fs');

exports.imageFontAssetLoaderRule = function () {
    return {
            use: {
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: '[path][name].[ext]?[hash:8]'
            }
        }
    };
};

exports.createLoaderMatcher = function (suffixExp, conf) { 
    return Object.assign({}, { test: suffixExp }, conf);
};

exports.assessVersion = function () {
    const version = +String(fs.readFileSync('./version.txt'));
    fs.writeFileSync('./version.txt', 'utf-8', version + 1);

    return version + 1;
};