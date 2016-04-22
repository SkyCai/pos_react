var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require('html-webpack-plugin');

var path = require('path');

var ROOT_PATH = path.resolve(__dirname);

var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, '../build');

//Template的文件夹路径
var TEM_PATH = path.resolve(ROOT_PATH, '../build/pkg');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry : {
    "main":SRC_PATH+'/js/main.js',
	  "detail":SRC_PATH+'/js/detail.js',
    "greay":SRC_PATH+'/js/greay.js',
    "search":SRC_PATH+'/js/search.js'
  },
  output :{
    path: BUILD_PATH+"/assets",
    //publicPath:"/",
    filename: '[name].[chunkhash:5].js'
    //chunkFilename: "[name].js"
  },
  externals:{
    lib : 'lib',  
    jquery : 'jquery',
    jquerySlide : 'jquerySlide'
  },
  plugins:[ 
    //new webpack.optimize.CommonsChunkPlugin('vendors','vendors_3rd.js'),
    new CommonsChunkPlugin('commons.[chunkhash:5].js',["main","detail","greay","search"]), 
    //new webpack.optimize.UglifyJsPlugin({minimize:true}),
    new webpack.optimize.UglifyJsPlugin({    //压缩代码
         compress: {
             warnings: false
         },
         except: ['$super', '$', 'exports', 'require']    //排除关键字
     }),
    new ExtractTextPlugin("[name].[chunkhash:5].css"),
    new webpack.NoErrorsPlugin(),
    /*new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        TouchSlide: "jquerySlide",
        "window.jQuery": "jquery"
    }),*/
    new HtmlwebpackPlugin({
      title: 'POS',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: '../index.html',
      chunks: ['main','commons.[chunkhash:5].js'],
      inject: 'body',
      //hash:true,
      minify: {
        removeComments:true,
        collapseWhitespace:true
      }
    }),
    new HtmlwebpackPlugin({
      title: 'POS详情页',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: '../detail.html',
      chunks: ['detail','commons.[chunkhash:5].js'],
      inject: 'body',
      minify: {
        removeComments:true,
        collapseWhitespace:true
      }
    }),
    new HtmlwebpackPlugin({
      title: 'POS_greay',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: '../greay.html',
      chunks: ['greay','commons.[chunkhash:5].js'],
      inject: 'body',
      minify: {
        removeComments:true,
        collapseWhitespace:true
      }
    }),
    new HtmlwebpackPlugin({
      title: 'POS搜索页',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: '../search.html',
      chunks: ['search','commons.[chunkhash:5].js'],
      inject: 'body',
      minify: {
        removeComments:true,
        collapseWhitespace:true
      }
    })
  ],
  resolve: {
    root: path.resolve(__dirname, ''),
    extensions: ['', '.js', '.json', '.scss'],
    modulesDirectories: [
      'node_modules'
    ],  
    fallback: path.join(__dirname, "node_modules"), 
    alias: {
        lib : SRC_PATH+'/js/lib/lib.js',//后续直接 require('main') 即可  
        jquery : SRC_PATH+'/js/lib/jquery-2.2.0.min.js',
        jquerySlide : SRC_PATH+'/js/lib/jquery.SuperSlide.js'
    }
  },
  //resolveLoader: { fallback: path.join(__dirname, "node_modules") },
  /*devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase:BUILD_PATH
  },*/
  module: {
    loaders: [
      {test: /\.js$/,exclude: [node_modules_dir],loader:'babel',query: {presets: ['react', 'es2015']}},
      {test: /\.css$/,loader: 'style!css'}, 
      {test: /\.scss$/,loader: ExtractTextPlugin.extract("css-loader!sass-loader")},
      //{test: /\.html$/, loader: "handlebars-loader"},
      {test: /\.(png|jpg)$/,loader: 'url-loader?limit=8192'}
    ]
  }
};

module.exports = config;
