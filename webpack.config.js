const path = require('path');
const production = (process.env.WEBPACK_ENV || process.env.NODE_ENV) === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: production ? 'production' : 'development',
    entry: path.join(__dirname, 'static', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.less', '.html']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.html$/,
                loader: 'handlebars-loader',
                include: path.resolve(__dirname, 'src')
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'static/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'static/assets', to: 'assets' },
            ],
        }),
    ],
    devServer: {
        historyApiFallback: true,
        compress: true,
        port: 3000
    }
};

