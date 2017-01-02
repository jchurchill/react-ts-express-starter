const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./base');

const nodeModules = {};

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

module.exports = Object.assign(baseConfig, {
    entry: {
        test: './src/test/test_runner.js',
    },

    target: 'node',

    output: {
        path: './build/test',
        filename: '[name].bundle.js'
    },

    devtool: 'inline-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"test"'
            }
        }),
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.BannerPlugin('require("source-map-support").install();',
                                { raw: true, entryOnly: false })
    ],

    externals: nodeModules
});