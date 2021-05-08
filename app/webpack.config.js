const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    watchOptions: {
        ignored: /node_modules/
    },
    entry: {
        editor: './buildfiles/tsc/fyp-app/fyp-app.js',
        splash: './buildfiles/tsc/splash/splash.js',
        mini: './buildfiles/tsc/mini/mini.js',
        tut: './buildfiles/tsc/tut/tut.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'buildfiles/webpack')
    },
    devServer: {
        contentBase: './buildfiles/webpack',
        watchContentBase: true,
        publicPath: '/'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: '*.html',
                    context: path.resolve(__dirname, 'src'),
                    to: path.resolve(__dirname, 'buildfiles/webpack/')
                },
                { from: 'node_modules/codemirror/**/*.css', to: path.resolve(__dirname, 'buildfiles/webpack')},
                { from: "assets/manifest.json", to: path.resolve(__dirname, 'buildfiles/webpack/manifest.json') },
                { from: "assets/favicon.ico", to: path.resolve(__dirname, 'buildfiles/webpack/favicon.ico') },
                {
                    from: "node_modules/@webcomponents/webcomponentsjs/",
                    to: path.resolve(__dirname, "buildfiles/webpack/node_modules/@webcomponents/webcomponentsjs/")
                },
                { from: "assets/", to: path.resolve(__dirname, "buildfiles/webpack/assets") },
                { from: "buildfiles/tut/", to: path.resolve(__dirname, "buildfiles/webpack/tut") }
            ]
        }),
    ]
};
