var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var nodeModules = {};

/*
 * Prevent bundling of node modules
 */
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: {
        server: './src/server/main.ts',
    },

    target: 'node',

    output: {
        path: './build/server',
        filename: '[name].bundle.js'
    },

    resolve: {
        extensions: ['', '.js', '.ts'],

        alias: {
            '__root': process.cwd(),
        },

        root: path.resolve(process.cwd(), "src")
    },

    devtool: 'source-map',

    externals: nodeModules,

    plugins: [
        new webpack.BannerPlugin('require("source-map-support").install();',
                                { raw: true, entryOnly: false })
    ],

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules\/)/,
                loader: 'babel-loader',
            }
        ]
    }
};