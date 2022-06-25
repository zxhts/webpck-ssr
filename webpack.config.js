const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "[name]-server.js",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader", 
                    "less-loader"
                ],
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                            esModule: false
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            inject: true,
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash:8].css",
        }),
    ],


}


