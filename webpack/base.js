var path = require('path');
var createVendorChunk = require('webpack-create-vendor-chunk');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.tsx'
    },
    output: {
        path: './build/client',
        filename: '[name].[chunkhash].js'
    },

    plugins: [
        // Creates a chunk for js libraries coming from node_modules.
        // https://www.npmjs.com/package/webpack-create-vendor-chunk
        createVendorChunk(),

        // Creates a chunk for css files compiled by the less and css loaders (see below)
        new ExtractTextPlugin('[name].[chunkhash].css'),

        // After chunks are created, tell webpack to modify our resulting index.html
        // by appending script tags that reference the bundled js from the vendor and app chunks (in that order)
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: ['vendor', 'app'],
        })
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // When importing a dependency, try appending these extensions when looking for a match.
        // The empty string '' allows us to explicitly specify the extension in the import statement if we want.
        extensions: ['', '.jsx', '.js', '.tsx', '.ts'],

        alias: {
            '__root': process.cwd(),
        },

        // Together with tsconfig's baseUrl, allows imports to be referenced assuming that './src' is the root.
        root: path.resolve(process.cwd(), 'src')
    },

    module: {
        loaders: [
            // All ts or tsx files will be handled by awesome-typescript-loader
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            // All less files will be handled by extract-text-webpack-plugin
            // https://www.npmjs.com/package/extract-text-webpack-plugin
            // First, less gets compiled to css, then css gets bundled into a single file.
            {
                test: /\.css$|\.less$/,
                loader: ExtractTextPlugin.extract(['css', 'less']),
            },
            // Any required dependencies with these extensions (images) will be included by
            // the url-loader and be inlined as data-urls
            {
                test: /\.(jpg|png)$/,
                loader: 'url-loader',
                options: {
                    // inline data-urls as long as the file size is < 25K
                    // if it's greater, the image will not be loaded
                    limit: 25000
                }
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // In order for this to work, we've included these as dependencies with a script tag
    // in our index.html - this is what actually makes them global variables on the page.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
};
