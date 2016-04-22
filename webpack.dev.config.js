var webpack = require('webpack');
var config = require('./webpack.config.js');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

config.devServer = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase:BUILD_PATH
  },

module.exports = config;
