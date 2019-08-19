const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.PORT || 3000;
const path = require('path');
const UitSpritesmithWebpack = require('@uit-spritesmith/webpack');

const protocol = 'http';
const host = 'localhost';
const staticPath = `${protocol}://${host}:${port}`

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js',
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
      imgURL: `${staticPath}/assets/img/sprite`,
      prefix: 'sp_'
    })
  ],
  devServer: {
    host,
    port,
    historyApiFallback: true,
    open: true
  }
}
