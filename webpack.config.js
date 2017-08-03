
//HtmlwebpackPlugin : 自动创建html
//extract-text-webpack-plugin : 提取css到单独的文件

var path = require('path') 
  , webpack = require('webpack')
  , HtmlwebpackPlugin = require('html-webpack-plugin')  //webpack html模板插件
  , ExtractTextPlugin = require('extract-text-webpack-plugin');  //css提取插件

//var CleanPlugin = require('clean-webpack-plugin') //webpack插件，用于清除目录文件
//var prod = process.env.NODE_ENV === 'production' ? true : false;

//定义一些常用文件夹的路径
var ROOT_PATH = path.resolve(__dirname)
  , SRC_PATH = path.resolve(ROOT_PATH, 'src')
  , BUILD_PATH = path.resolve(ROOT_PATH, "build" )
  , TEM_PATH = path.resolve(SRC_PATH, 'templates')
  , BOWER_PATH = path.resolve(ROOT_PATH, 'bower_components');


module.exports = {
  entry: {
    app: path.resolve(SRC_PATH, 'js/index.js'),
    mobile: path.resolve(SRC_PATH, 'js/mobile.js'),
    vendors: ['jquery', 'moment', 'lodash']
  },
  output: {
    path: BUILD_PATH,
    //注意 我们修改了bundle.js 用一个数组[name]来代替，他会根据entry的入口文件名称生成多个js文件，这里就是(app.js,mobile.js和vendors.js)
    filename : "js/[name].js",
    //生成Hash名称的script来防止缓存
    //只要在filename:[name].加上hash这个参数就可以了
    //filename: '[name].[hash].js'
  },
  //配置别名
  resolve: {
    alias: {
      lodash: path.resolve(BOWER_PATH, 'lodash/lodash.js')
    }
  },
  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback : true, 
    // Enable special support for Hot Module Replacement
    hot: true,
    inline: false,
    // Set this if you want to enable gzip compression for assets
    compress: true
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: SRC_PATH,
        loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: SRC_PATH,
        query: {
          presets: ['es2015']
        }
      },
      /*
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        include: SRC_PATH
      },
      */
      /*
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: "css-loader"
        }),
        include: SRC_PATH
      },
      */
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader"),
        include: SRC_PATH
      },

      { 
        test: /\.scss$/i, 
        loader: ExtractTextPlugin.extract(['css','sass']),
        include: SRC_PATH
      },
      { 
        test: /\.less$/i, 
        loader: ExtractTextPlugin.extract(['css','less']),
        include: SRC_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }
    ]
  },

  //custom jshint options
  // any jshint option http://www.jshint.com/docs/options/
  jshint: {
    "esnext": true
  },
  plugins: [
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
      chunks: [ 'mobile', 'vendors'],
      inject: 'body'
    }),
    //webpack自带了压缩插件UglifyJsPlugin，只需要在配置文件中引入即可
    //一般只在生产环境启用。另外，服务器端还可以开启 gzip 压缩，优化的效果更明显
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: true
    }),
    */


    // multiple extract instances
    new ExtractTextPlugin("css/[name].css", {allChunks: true}),
    //new ExtractTextPlugin('css/[name].scss'),
    //new ExtractTextPlugin('css/[name].less'),

    /* 公共库 */
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js')

    //provide $, jQuery and window.jQuery to every script
    /*
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
    */
  ]
};
