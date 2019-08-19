const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UitSpritesmithWebpack = require('@uit-spritesmith/webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'static/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_module/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new UitSpritesmithWebpack({
      spriteSrc: path.resolve(__dirname, 'assets/sprite'),
      spriteDest: path.resolve(__dirname, 'assets/img/sprite'),
      cssDest: path.resolve(__dirname, 'assets/scss/sprite'),
      imgURL: './assets/img/sprite',
      prefix: 'sp_'
    })
  ]
}
