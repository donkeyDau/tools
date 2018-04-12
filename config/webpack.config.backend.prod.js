const webpack = require('webpack');
const paths = require('./paths');

const nodeExternals = require('webpack-node-externals');

const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    bail: true,
    output: {
        path: paths.projectBuild,
        filename: 'index.js',
        libraryTarget: 'commonjs',
    },
    entry: paths.projectIndexJs,
    target: 'node',
    node: false,
    externals: [nodeExternals()],
    devtool: 'sourcemap',
    mode: 'production',
    resolve: {
        modules: ['node_modules', paths.selfNodeModules],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                require.resolve('babel-preset-env'),
                                {
                                    targets: {
                                        node: '8.2',
                                    },
                                },
                            ],
                        ],
                        plugins: [require.resolve('babel-plugin-syntax-trailing-function-commas')],
                    },
                },
            },
            {
                exclude: /node_modules/,
                test: /\.graphql$/,
                use: [{ loader: 'graphql-import-loader' }],
            },
        ],
    },
    plugins: [
        // TODO Get this working along nodemon
        // new CleanWebpackPlugin([paths.projectBuild], {
        //     root: paths.projectRoot,
        //     watch: true,
        //     beforeEmit: true,
        // }),
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),
        new CopyWebpackPlugin([
            { from: '.env' },
            // { from: './src/graphql/public/types/*.graphql', to: path.join(BUILD, 'graphql/public/types') },
        ]),
        new ProgressBarPlugin({
            format:
                '\u001b[90m\u001b[44mBuild\u001b[49m\u001b[39m [:bar] \u001b[32m\u001b[1m:percent\u001b[22m\u001b[39m (:elapseds) \u001b[2m:msg\u001b[22m',
            renderThrottle: 100,
            summary: false,
            clear: true,
        }),
    ],
    devtool: 'sourcemap',
};
