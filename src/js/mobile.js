import '../sass/main.scss';
import $ from 'jquery';
import 'imports?jQuery=jquery!./plugin.js';

$(document).ready(function() {
  let app  = document.createElement('div');
  app.innerHTML = '<h1>大家好,我是你的朋友王平</h1>';
  document.body.appendChild(app);
  $('h1').greenify();

  $('body').append('<p><a href="/" target="_self">跳转到index</a></p>');
});
