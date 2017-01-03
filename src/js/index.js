//require('../css/main.css');

/*
require('../sass/main.scss');

var $ = require('jquery');

var moment = require('moment');

var sub = require('./sub');
var app  = document.createElement('div');

app.innerHTML = '<h1>你好，欢迎学习webpack！</h1>';
app.appendChild(sub());
document.body.appendChild(app);

$('body').append('<p>jquery and moment test:look at me! now is ' + moment().format() + '</p>');

*/





import '../sass/main.scss';
import generateText from './sub';
import moment from 'moment';
import _ from 'lodash';
/*
 * 引入jquery plugin 有两种方法
 * 第一种把jQuery直接作成一个全局变量 这样在每个脚本中都可以直接使用
 * $,jQuery,window.jQuery这几个变量 配置在webpack.config.js中可以看到
 * 使用了 webpack.ProvidePlugin
 * 第二种方法使用imports-loader,这个插件会给引入的文件前面自动插入一个require,
 * 这里我就把jQuery这个变量插到了plugin.js的最前面
 * 也可以在config.js中module.loaders里面配置
*/

//第一种方法 请看webpack.config.js 
//使用第一种时候,可以完全注释掉第二种

//2nd way start
import $ from 'jquery';
//注意这种写法 我们把jQuery这个变量直接插入到plugin.js里面了
//相当于在这个文件的开始添加了 var jQuery = require('jquery');
import 'imports?jQuery=jquery!./plugin.js';
//2nd way end

const div  = document.createElement('div');
div.innerHTML = '<h1>你好，欢迎学习webpack！</h1>';
document.body.appendChild(div);
div.appendChild(generateText());

const myPromise = Promise.resolve(42);
myPromise.then((number) => {
  const testArrStr = _.map([1, 2, 3], function(n) { return n * 3; }).toString();
  const currentTime = moment().format();
  //testing template strings
  $('body').append(`<p> promise result is ${number}, now is ${currentTime}, lodash result is ${testArrStr}`);
  //call our jquery plugin!
  $('p').greenify();
});

$('body').append('<p><a href="/mobile.html" target="_self">跳转到 mobile</a></p>');


