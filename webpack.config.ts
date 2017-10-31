const path = require('path')


module.exports = {
  entry: [
    'babel-polyfill',
    './components/index.js'
  ],
  plugins: [
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist')
  }
}