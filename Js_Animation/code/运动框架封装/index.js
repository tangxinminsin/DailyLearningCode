/**
 * @Author: tangxinmin
 * @Date: 2021-07-06 14:37:28
 * @LastEditTime: 2021-07-06 15:51:27
 * @LastEditors: tangxinmin
 * @Description: file content
 */

var timer = null
function startMove(obj, value, fn) {
  clearInterval(obj.timer);//关闭定时器，防止多次调用生成多个定时器
  obj.timer = setInterval(function () {
    var flag = true
    for (const attr in value) {
      var icur = null;//当前要改变的的元素值
      if (attr == 'opacity') {
        // Math.round 返回四舍五入整数
        icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
      } else {
        icur = parseInt(getStyle(obj, attr));
      }
      var speed = (value[attr] - icur) / 8; // 运动速度采用缓冲
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (icur != value[attr]) {
        flag = false
      }
      if (attr == 'opacity') {
        obj.style.filter = 'opacity(' + (icur + speed) + ')';
        obj.style.opacity = (icur + speed) / 100;
      } else {
        obj.style[attr] = icur + speed + 'px';
      }

    }
    if (flag) {
      clearInterval(obj.timer);
      fn ? fn() : null //函数回调
    }
  }, 30);
}
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}