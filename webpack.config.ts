const path = require('path')
// webpack.config.js
import { ReactLoadablePlugin } from 'react-loadable/webpack';
var webpack = require('webpack');


module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    'react-hot-loader/patch',
    './components/index.js'
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },
  devServer: {
    contentBase: './public',
     hot: true
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new ReactLoadablePlugin({
      filename: './public/react-loadable.json'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/public/',
    path: path.resolve(__dirname, 'dist')
  }
}