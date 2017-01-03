//我们这里使用CommonJS的风格
/*
function writeText() {
  var element = document.createElement('h2');
  element.innerHTML = "我是h2标签";
  return element;
}
module.exports = writeText;
*/

//ES6 风格
export default function() {
  var element = document.createElement('h2');
  element.innerHTML = "我是h2标签";
  return element;
}

