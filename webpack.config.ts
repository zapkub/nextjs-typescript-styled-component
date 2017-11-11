const path = require('path')
// webpack.config.js
import { ReactLoadablePlugin } from 'react-loadable/webpack';

module.exports = {
  entry: [
    'babel-polyfill',
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
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: './public/react-loadable.json'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/public/',
    path: path.resolve(__dirname, 'dist')
  }
}