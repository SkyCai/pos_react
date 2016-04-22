//var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require('html-webpack-plugin');

var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  /*entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },*/

  entry : {
    "main":'js/main.js',//path.resolve(__dirname, 'app/main.js'),
    "detail":'js/detail.js',
    "greay":'js/greay.js',
    "search":'js/search.js',
    vendors:['jquery','lib']
  },
  output :{
    path: './build',//path.resolve(__dirname, './build'),
    filename: '[name].js'
    // chunkFilename: "[name].js"
  },
  plugins:[
    new CommonsChunkPlugin('commons.js',["main","detail","greay","search"]),
    //new webpack.optimize.UglifyJsPlugin({minimize:true}),
    //new ExtractTextPlugin("test.css", {allChunks: true}),
    //new webpack.NoErrorsPlugin(),
    //provide $, jQuery and window.jQuery to every script


//这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
    new ExtractTextPlugin("[name].css")
  ],
  resolve: {
    root: path.resolve(__dirname, ''),
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.json', '.scss'],
    modulesDirectories: [
      'node_modules'
    ],  
    fallback: path.join(__dirname, "node_modules"), 
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
        lib : 'js/lib/lib.js',//后续直接 require('main') 即可   
    }
  },
  //resolveLoader: { fallback: path.join(__dirname, "node_modules") },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    /*proxy: {
              '/api/*': {
                  target: 'http://localhost:5000',
                  secure: false
              }
            }*/
      },
  devtool: 'eval-source-map',
  module: {
     //和loaders一样的语法
    perLoaders: [
        {
            test: /\.jsx?$/,
            include: APP_PATH,
            loader: 'jshint-loader'
        }
    ],
    //配置jshint的选项，支持es6的校验
    jshint: {
      "esnext": true
    },
    loaders: [{
      test: /\.js$/,
      // There is not need to run the loader through
      // vendors
      exclude: [node_modules_dir],
      loader:'babel',
      query: {
          presets: ['react', 'es2015']
        }
    }, {
      test: /\.css$/,
      //loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      loader: 'style!css'
    }, {
      test: /\.scss$/,
      //loader: ExtractTextPlugin.extract('css!sass')
      loader: ExtractTextPlugin.extract("css-loader!sass-loader")
      //loader: 'style!css!sass'
    },{ 
      test: /\.(png|jpg)$/, 
      loader: 'url-loader?limit=8192'
    }]
  }
};

module.exports = config;

/*var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');

var deps = [
  'react/dist/react.min.js'
];

var config = {
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, './app/main.js')],
  resolve: {
    alias: {}
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    noParse: [],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  }
};

deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;*/