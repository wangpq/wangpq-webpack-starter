
var path = require('path') 
  , HtmlwebpackPlugin = require('html-webpack-plugin') 
  , webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname) 
  , SRC_PATH = path.resolve(ROOT_PATH, 'src') 
  , TEM_PATH = path.resolve(ROOT_PATH, 'templates') 
  , BUILD_PATH = path.resolve(ROOT_PATH, 'build') 
  , BOWER_PATH = path.resolve(ROOT_PATH, 'bower_components');

module.exports = {
  entry: {
    app: path.resolve(SRC_PATH, 'index.js'),
    mobile: path.resolve(SRC_PATH, 'mobile.js'),
    vendors: ['jquery', 'moment', 'lodash']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].js'
  },
  resolve: {
    alias: {
      lodash: path.resolve(BOWER_PATH, 'lodash/lodash.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: SRC_PATH,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: SRC_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }
    ]
  },
  plugins: [
    //enable uglify
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //split vendors script
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
    //generate two pages
    new HtmlwebpackPlugin({
      title: 'Hello webpack app',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'Hello Mobile app',
      template: path.resolve(TEM_PATH, 'mobile.html'),
      filename: 'mobile.html',
      chunks: ['mobile', 'vendors'],
      inject: 'body'
    })
    //provide $, jQuery and window.jQuery to every script
    /*new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })*/
  ]
};
