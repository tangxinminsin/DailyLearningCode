/**
 * @Author: tangxinmin
 * @Date: 2021-09-15 20:05:39
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-09-15 20:38:16
 * @Description: file content
 */
const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;
const RADIUS = 8;
const MARGIN_TOP = 60;
const MARGIN_LEFT = 30;
window.onload = () => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext("2d");

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  const init = setInterval(() => {
    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    render(hours, minutes, seconds, context)
  }, 50)
  return () => {
    clearInterval(init)
  }

}
const render = (hours, minutes, seconds, cxt) => {

  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);//不断清除画布内容再绘制，形成动画效果

  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);
}
const renderDigit = (x, y, num, cxt) => {

  cxt.fillStyle = "rgb(0,102,153)";

  for (var i = 0; i < digit[num].length; i++)
    for (var j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        cxt.beginPath();
        cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
        cxt.closePath()
        cxt.fill()
      }
}
