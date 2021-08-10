/**
 * @Author: tangxinmin
 * @Date: 2021-07-10 14:57:37
 * @LastEditTime: 2021-07-10 15:06:11
 * @LastEditors: tangxinmin
 * @Description: file content
 */

var age = 29;
var sayAge = () => alert(this.age);

// alert(window.age); // 29
// sayAge();          // 29
// window.sayAge();   // 29


var top = window.top
var left = window.left
// alert(`top:${top}`, `left:${left}`)
window.moveTo(10, 10)