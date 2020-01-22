const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
    console.log('NODE_ENV: ', env.NODE_ENV) // true
    if (env.NODE_ENV === 'production') {
        console.log("!!!RELEASE!!!");
    }
    else {
        console.log("debug");
    }
    var plugins = [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!.nojekyll', '!.git/**', '!img/**']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: path.resolve(__dirname, './src/img/favicon.ico')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        // new CopyWebpackPlugin([
        //   { from: 'src/img/item', to: 'img/item' },
        //   { from: 'src/img/quest', to: 'img/quest' }
        // ]),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: "data",
        // })
    ];

    return {
        mode: env.NODE_ENV || 'production',
        entry: {
            main: './src/index.js'
        },
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'murakumoindustries.github.io')
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                //publicPath: '../'
                            }
                        },
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 16384
                        }
                    }]
                }
            ]
        },
        plugins: plugins
    };
};