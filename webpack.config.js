var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'MyBundle.js'
  }
};